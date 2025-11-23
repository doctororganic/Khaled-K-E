
import React, { useState, useEffect } from 'react';
import { gradesData } from './data';
import { TabType, QuestionItem, WritingTopic } from './types';
import { BookOpen, PenTool, Volume2, Eye, EyeOff, CheckCircle, ChevronRight, GraduationCap, AlertCircle, Languages, Globe, Lock } from 'lucide-react';

function App() {
  const [selectedGrade, setSelectedGrade] = useState<number>(10);
  const [selectedTab, setSelectedTab] = useState<TabType>(TabType.SET_BOOK);
  const [selectedUnitNumber, setSelectedUnitNumber] = useState<number>(1);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [revealedTranslations, setRevealedTranslations] = useState<Record<string, boolean>>({});
  const [showAllTranslation, setShowAllTranslation] = useState<boolean>(false);
  const [learnedItems, setLearnedItems] = useState<Record<string, boolean>>({});
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  // Check subscription status on mount and URL params
  useEffect(() => {
    // Check localStorage for subscription
    const subscribed = localStorage.getItem('isSubscribed') === 'true';
    setIsSubscribed(subscribed);

    // Check URL parameters for subscription confirmation
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('subscribed') === 'true') {
      localStorage.setItem('isSubscribed', 'true');
      setIsSubscribed(true);
      // Clean URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  // Load voices
  useEffect(() => {
    if (!window.speechSynthesis) {
      return;
    }
    
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      // Try to find a good US English voice (Google US English, Microsoft Zira, etc.)
      const preferredVoice = voices.find(v => v.name.includes('Google US English')) ||
                             voices.find(v => v.name.includes('Zira')) ||
                             voices.find(v => v.lang === 'en-US');
      setVoice(preferredVoice || null);
    };
    
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    // Cleanup: remove event listener on unmount
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // derived state
  const currentGradeData = gradesData.find(g => g.grade === selectedGrade);
  const currentUnit = currentGradeData?.units.find(u => u.unitNumber === selectedUnitNumber);
  const isLocked = selectedUnitNumber >= 4 && !isSubscribed;

  useEffect(() => {
    // Reset unit to 1 when grade changes
    setSelectedUnitNumber(1);
  }, [selectedGrade]);

  const toggleAnswer = (id: string) => {
    setRevealedAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleLearned = (id: string) => {
    setLearnedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleTranslation = (id: string) => {
    setRevealedTranslations(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const speakText = (text: string) => {
    if (!window.speechSynthesis) {
      console.warn('Speech synthesis is not supported in this browser');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) utterance.voice = voice;
    utterance.lang = 'en-US';
    utterance.rate = 0.9; // Slightly slower for educational purpose
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-purple-500 selection:text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border-b border-slate-800 sticky top-0 z-20 shadow-lg shadow-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center py-4 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3 group cursor-default">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-lg group-hover:shadow-purple-500/20 transition-all duration-300">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 tracking-tight">
                  The Expert
                </h1>
                <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">High School English Companion</p>
              </div>
            </div>

            {/* Grade Selector */}
            <div className="flex bg-slate-950/50 p-1 rounded-xl border border-slate-800 backdrop-blur-sm overflow-hidden">
              {[10, 11, 12].map((grade) => (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                    selectedGrade === grade
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-900/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Grade {grade}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex space-x-8 mt-4 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSelectedTab(TabType.SET_BOOK)}
              className={`flex items-center space-x-2 pb-3 border-b-2 transition-all duration-300 whitespace-nowrap ${
                selectedTab === TabType.SET_BOOK
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">Set Book Questions</span>
            </button>
            <button
              onClick={() => setSelectedTab(TabType.WRITING)}
              className={`flex items-center space-x-2 pb-3 border-b-2 transition-all duration-300 whitespace-nowrap ${
                selectedTab === TabType.WRITING
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <PenTool className="w-5 h-5" />
              <span className="font-medium">Writing Topics</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar: Units */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-800 p-4 sticky top-40 shadow-xl">
              <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4 ml-2 flex justify-between items-center">
                <span>Select Unit</span>
                <span className="text-blue-500/50 text-[10px]">G{selectedGrade}</span>
              </h3>
              <div className="space-y-2">
                {currentGradeData?.units.map((unit) => (
                  <button
                    key={unit.unitNumber}
                    onClick={() => setSelectedUnitNumber(unit.unitNumber)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between group ${
                      selectedUnitNumber === unit.unitNumber
                        ? 'bg-slate-800 text-white border border-slate-700 shadow-lg shadow-black/20'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent hover:border-slate-800'
                    }`}
                  >
                    <span className="font-medium truncate pr-2">
                      <span className="text-blue-500 mr-2 font-mono text-sm opacity-80">0{unit.unitNumber}</span> 
                      {unit.title}
                    </span>
                    {selectedUnitNumber === unit.unitNumber && (
                      <ChevronRight className="w-4 h-4 text-purple-500 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
              
              {/* Global Controls */}
              <div className="mt-8 pt-6 border-t border-slate-800 px-2">
                <button 
                  onClick={() => setShowAllTranslation(!showAllTranslation)}
                  className="flex items-center space-x-2 text-sm text-slate-400 hover:text-blue-400 transition-colors w-full group"
                >
                  <div className="p-1.5 rounded-md bg-slate-800 group-hover:bg-slate-700 transition-colors">
                    {showAllTranslation ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </div>
                  <span>{showAllTranslation ? "Hide All Translations" : "Show All Translations"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-end border-b border-slate-800 pb-4 gap-2">
              <div>
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
                  {currentUnit?.title}
                </h2>
                <p className="text-slate-500 text-sm mt-1">Unit {selectedUnitNumber}</p>
              </div>
              <div className="flex items-center space-x-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-800/50">
                <AlertCircle className="w-4 h-4 text-purple-500" />
                <span className="text-slate-400 text-xs font-medium">
                  {selectedTab === TabType.SET_BOOK 
                    ? `${currentUnit?.questions.length || 0} Questions`
                    : `${currentUnit?.writingTopics.length || 0} Topics`}
                </span>
              </div>
            </div>

            {selectedTab === TabType.SET_BOOK && (
              <div className="grid gap-6">
                {isLocked ? (
                  <SubscriptionLock onUnlock={() => setIsSubscribed(true)} />
                ) : (
                  currentUnit?.questions.map((q) => {
                  const isLearned = learnedItems[q.id];
                  const isRevealed = revealedAnswers[q.id];
                  const isTranslated = showAllTranslation || revealedTranslations[q.id];

                  return (
                    <div 
                      key={q.id} 
                      className={`group relative bg-slate-900 rounded-2xl border transition-all duration-300 overflow-hidden ${
                        isLearned 
                          ? 'border-green-900/30 opacity-60 hover:opacity-100 bg-slate-900/50' 
                          : 'border-slate-800 hover:border-blue-500/30 shadow-xl shadow-black/20'
                      }`}
                    >
                      {/* Card Header / Question */}
                      <div className="p-6 space-y-4">
                        <div className="flex justify-between items-start gap-4">
                          <div className="space-y-2 flex-1">
                            <h3 className="text-lg font-semibold text-slate-100 leading-relaxed">
                              {q.questionEn}
                            </h3>
                            <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isTranslated ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                              <div className="overflow-hidden">
                                <p className="text-right text-emerald-400/80 font-arabic text-lg leading-relaxed pt-2" dir="rtl">
                                  {q.questionAr}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                             <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleTranslation(q.id);
                                }}
                                className={`p-2.5 rounded-xl transition-all flex-shrink-0 ${
                                  isTranslated ? 'text-emerald-400 bg-emerald-400/10' : 'text-slate-500 hover:text-emerald-400 hover:bg-emerald-400/10'
                                }`}
                                title="Translate"
                              >
                                <Globe className="w-5 h-5" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  speakText(q.questionEn + ". " + q.answerEn);
                                }}
                                className="p-2.5 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-xl transition-all flex-shrink-0"
                                title="Listen to native pronunciation"
                              >
                                <Volume2 className="w-5 h-5" />
                              </button>
                          </div>
                        </div>
                      </div>

                      {/* Answer Section - Using Grid for clean expansion */}
                      <div 
                        className={`grid transition-[grid-template-rows] duration-500 ease-out border-t border-slate-800/50 bg-slate-950/30 ${
                          isRevealed ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="p-6 space-y-4">
                             <div className="space-y-4">
                              <div className="text-slate-300 leading-relaxed whitespace-pre-line pl-4 border-l-2 border-purple-500">
                                {q.answerEn}
                              </div>
                              <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isTranslated ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                <div className="overflow-hidden">
                                  <div className="text-right text-purple-400/80 font-arabic whitespace-pre-line text-lg leading-relaxed pr-4 border-r-2 border-emerald-500/50 pt-2" dir="rtl">
                                    {q.answerAr}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="px-6 py-3 bg-slate-950/50 border-t border-slate-800 flex justify-between items-center">
                        <button
                          onClick={() => toggleLearned(q.id)}
                          className={`flex items-center space-x-2 text-xs font-medium transition-colors px-2 py-1 rounded-md ${
                            isLearned 
                              ? 'text-green-500 bg-green-500/10' 
                              : 'text-slate-500 hover:text-green-400 hover:bg-green-500/5'
                          }`}
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>{isLearned ? "Learned" : "Mark as Learned"}</span>
                        </button>

                        <button
                          onClick={() => toggleAnswer(q.id)}
                          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 border shadow-lg ${
                            isRevealed 
                              ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700' 
                              : 'bg-blue-600/10 text-blue-400 border-blue-500/20 hover:bg-blue-600/20 hover:border-blue-500/40'
                          }`}
                        >
                          {isRevealed ? "Hide Answer" : "Show Answer"}
                        </button>
                      </div>
                      
                      {/* Progress Bar Decoration */}
                      <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 opacity-50" style={{ width: isRevealed ? '100%' : '0%' }} />
                    </div>
                  );
                }))}
              </div>
            )}

            {selectedTab === TabType.WRITING && (
              <div className="grid grid-cols-1 gap-6">
                {isLocked ? (
                  <SubscriptionLock onUnlock={() => setIsSubscribed(true)} />
                ) : (
                  currentUnit?.writingTopics.map((topic) => {

                   const isTranslated = showAllTranslation || revealedTranslations[topic.id];
                   
                   return (
                   <div key={topic.id} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-purple-500/30 transition-all duration-300 group shadow-xl shadow-black/20">
                     <div className="p-6 md:p-8 space-y-6">
                       <div className="flex justify-between items-start gap-4">
                         <div>
                            <div className="flex items-center space-x-3 mb-3">
                              <span className="inline-block px-3 py-1 rounded-full bg-purple-900/30 text-purple-300 text-[10px] font-bold tracking-wide border border-purple-500/20 uppercase">
                                Writing Topic
                              </span>
                            </div>
                            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                              {topic.titleEn}
                            </h3>
                            <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isTranslated ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                <div className="overflow-hidden">
                                  <h3 className="text-xl font-bold text-emerald-400/90 font-arabic text-right pt-1" dir="rtl">
                                    {topic.titleAr}
                                  </h3>
                                </div>
                            </div>
                         </div>
                         <div className="flex gap-2">
                            <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleTranslation(topic.id);
                                }}
                                className={`p-2.5 rounded-xl transition-all flex-shrink-0 ${
                                  isTranslated ? 'text-emerald-400 bg-emerald-400/10' : 'text-slate-500 hover:text-emerald-400 hover:bg-emerald-400/10'
                                }`}
                                title="Translate"
                              >
                                <Globe className="w-6 h-6" />
                              </button>
                           <button
                              onClick={() => speakText(topic.promptEn)}
                              className="p-2.5 text-slate-500 hover:text-purple-400 hover:bg-purple-400/10 rounded-xl transition-colors flex-shrink-0"
                            >
                              <Volume2 className="w-6 h-6" />
                            </button>
                         </div>
                       </div>

                       <div className="bg-slate-950/50 rounded-xl p-6 border border-slate-800/50 relative">
                         <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500/50 to-blue-500/50 rounded-l-xl"></div>
                         <p className="text-slate-300 leading-relaxed text-lg font-light pl-2">
                           {topic.promptEn}
                         </p>
                         <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isTranslated ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                            <div className="overflow-hidden">
                              <p className="text-right text-emerald-400/80 font-arabic text-lg leading-relaxed pt-4 pr-2 border-t border-slate-800 mt-4" dir="rtl">
                                {topic.promptAr}
                              </p>
                            </div>
                          </div>
                       </div>

                       <div className="space-y-4">
                         <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-800 pb-2">
                            <Languages className="w-4 h-4 text-blue-500" />
                            <span>Plan & Outline</span>
                         </h4>
                         <div className="grid grid-cols-1 gap-4">
                           {topic.plan.map((section, idx) => (
                             <div key={idx} className="rounded-lg bg-slate-800/20 border border-slate-700/30 p-4 hover:bg-slate-800/40 transition-colors">
                               <div className="mb-3 flex flex-col gap-1">
                                 <div className="flex items-center space-x-2">
                                   <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 text-xs font-bold border border-purple-500/20">
                                     {idx + 1}
                                   </div>
                                   <h5 className="text-blue-300 font-semibold text-sm">{section.sectionEn}</h5>
                                 </div>
                                 {isTranslated && (
                                   <h5 className="text-emerald-400/80 font-arabic text-sm font-semibold text-right pr-8" dir="rtl">
                                     {section.sectionAr}
                                   </h5>
                                 )}
                               </div>
                               <div className="space-y-3 pl-8">
                                  {section.tasks.map((task, tIdx) => (
                                    <div key={tIdx} className="flex flex-col gap-1">
                                      <div className="flex gap-2 items-start">
                                        <span className="text-slate-600 mt-1.5">•</span>
                                        <p className="text-slate-400 text-sm">{task.en}</p>
                                      </div>
                                      {isTranslated && (
                                        <p className="text-emerald-500/60 text-sm font-arabic text-right pr-4" dir="rtl">
                                          {task.ar}
                                        </p>
                                      )}
                                    </div>
                                  ))}
                               </div>
                             </div>
                           ))}
                         </div>
                       </div>
                     </div>
                   </div>
                 );
                  })
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// Subscription Lock Component
const SubscriptionLock: React.FC<{ onUnlock: () => void }> = ({ onUnlock }) => {
  const subscriptionFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScdZUjA4nsWqdFKXLDLi15EF7oLeTtpqbxQl7FDqAQZ81agSQ/viewform?usp=header';
  const [subscriptionStarted, setSubscriptionStarted] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Check if user has started subscription process
    const started = localStorage.getItem('subscriptionStarted') === 'true';
    setSubscriptionStarted(started);
  }, []);

  const handleSubscribe = () => {
    // Mark that user has started subscription process
    localStorage.setItem('subscriptionStarted', 'true');
    setSubscriptionStarted(true);
    // Open form in new tab
    window.open(subscriptionFormUrl, '_blank');
  };

  const handleUnlock = () => {
    // User confirms they've completed the form
    localStorage.setItem('isSubscribed', 'true');
    // Call parent callback to update state
    onUnlock();
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 rounded-2xl border-2 border-purple-500/30 p-8 md:p-12 shadow-2xl">
      <div className="flex flex-col items-center justify-center text-center space-y-6">
        {/* Lock Icon */}
        <div className="p-4 bg-purple-500/20 rounded-full border-2 border-purple-500/50">
          <Lock className="w-12 h-12 text-purple-400" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Subscribe to Get Full Content
          </h2>
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-400 font-arabic" dir="rtl">
            اشترك للحصول على المحتوى الكامل
          </h2>
        </div>

        {/* Benefits */}
        <div className="w-full max-w-2xl space-y-4">
          {/* Benefit 1 */}
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
              <div className="flex-1">
                <p className="text-slate-200 text-lg font-semibold">
                  Get all questions with answers
                </p>
                <p className="text-emerald-400/80 font-arabic text-lg mt-1" dir="rtl">
                  احصل على جميع الأسئلة مع الإجابات
                </p>
              </div>
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
              <div className="flex-1">
                <p className="text-slate-200 text-lg font-semibold">
                  Take all services and immediate translation with reading (no need to open extra sites to listen or translate)
                </p>
                <p className="text-emerald-400/80 font-arabic text-lg mt-1" dir="rtl">
                  احصل على جميع الخدمات والترجمة الفورية مع القراءة (لا حاجة لفتح مواقع إضافية للاستماع أو الترجمة)
                </p>
              </div>
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
              <div className="flex-1">
                <p className="text-slate-200 text-lg font-semibold">
                  Get full content (no need extra notes or books or pdf)
                </p>
                <p className="text-emerald-400/80 font-arabic text-lg mt-1" dir="rtl">
                  احصل على المحتوى الكامل (لا حاجة لملاحظات أو كتب أو ملفات PDF إضافية)
                </p>
              </div>
            </div>
          </div>

          {/* Benefit 4 */}
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
              <div className="flex-1">
                <p className="text-slate-200 text-lg font-semibold">
                  Save your time, money, and effort.
                </p>
                <p className="text-emerald-400/80 font-arabic text-lg mt-1" dir="rtl">
                  وفر وقتك وأموالك وجهدك
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Subscribe Button */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <button
            onClick={handleSubscribe}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transform hover:scale-105"
          >
            Subscribe Now / اشترك الآن
          </button>
          
          {subscriptionStarted && (
            <button
              onClick={handleUnlock}
              className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg shadow-emerald-500/50 hover:shadow-emerald-500/70 transform hover:scale-105"
            >
              I Completed the Form / أكملت النموذج
            </button>
          )}
        </div>

        {/* Note */}
        <div className="space-y-2">
          <p className="text-slate-400 text-sm">
            After completing the form, return to this page and click "I Completed the Form" to access all content
          </p>
          <p className="text-emerald-400/60 font-arabic text-sm" dir="rtl">
            بعد إكمال النموذج، ارجع إلى هذه الصفحة واضغط على "أكملت النموذج" للوصول إلى جميع المحتويات
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
