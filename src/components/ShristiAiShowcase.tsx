import React, { useState } from 'react';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Send,
  Languages,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import {
  SupportedLanguage,
  SAMPLE_PROMPTS,
  getShristiResponse,
  ShristiResponse
} from '../utils/shristiAiEngine.ts';

interface ShristiAiShowcaseProps {
  onRequestDemo: () => void;
  onExploreErp: () => void;
}

export const ShristiAiShowcase: React.FC<ShristiAiShowcaseProps> = ({
  onRequestDemo,
  onExploreErp,
}) => {
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>('odia');
  const [inputQuery, setInputQuery] = useState(SAMPLE_PROMPTS[0].prompt);
  const [currentResponse, setCurrentResponse] = useState<ShristiResponse>(
    getShristiResponse(SAMPLE_PROMPTS[0].prompt, 'odia')
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleRunQuery = (query: string, lang = selectedLang) => {
    setIsProcessing(true);
    setInputQuery(query);
    setTimeout(() => {
      const resp = getShristiResponse(query, lang);
      setCurrentResponse(resp);
      setIsProcessing(false);
    }, 280);
  };

  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section id="shristi-ai" className="py-20 bg-slate-900/50 border-y border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pioneering Innovation</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Developed by Dhanexa Technologies</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ShristiAI: Odisha’s 1st Multilingual AI Assistant
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Technology should speak the language of the people. ShristiAI bridges the digital divide for 45+ million Odia speakers, empowering students, colleges, businesses, and government initiatives with voice and text AI in native Odia, English, and regional dialects.
          </p>
        </div>

        {/* Interactive ShristiAI Playground Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Mission & Prompt Selectors */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Languages className="w-4 h-4 text-emerald-400" />
                <span>Select Target Language</span>
              </h3>

              {/* Language Selector Buttons */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    setSelectedLang('odia');
                    handleRunQuery(SAMPLE_PROMPTS[0].prompt, 'odia');
                  }}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                    selectedLang === 'odia'
                      ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  ଓଡ଼ିଆ (Odia)
                </button>
                <button
                  onClick={() => {
                    setSelectedLang('english');
                    handleRunQuery(SAMPLE_PROMPTS[2].prompt, 'english');
                  }}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                    selectedLang === 'english'
                      ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => {
                    setSelectedLang('hindi');
                    handleRunQuery('कॉलेज उपस्थिति और छात्र रिकॉर्ड कैसे ट्रैक करें?', 'hindi');
                  }}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                    selectedLang === 'hindi'
                      ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  हिंदी (Hindi)
                </button>
              </div>

              {/* Curated Sample Queries */}
              <div className="mt-6">
                <div className="text-xs font-medium text-slate-400 mb-3">
                  Try Curated Domain Prompts:
                </div>
                <div className="space-y-2">
                  {SAMPLE_PROMPTS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleRunQuery(item.prompt, item.lang)}
                      className="w-full text-left p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800/90 text-xs text-slate-300 hover:text-white transition-colors group flex items-start justify-between gap-2"
                    >
                      <div>
                        <div className="font-semibold text-slate-200 group-hover:text-emerald-400">
                          {item.label}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate mt-0.5 max-w-[260px]">
                          {item.prompt}
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        {item.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Why Multilingual AI Matters Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-950 to-slate-900/40 border border-indigo-900/40">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Why ShristiAI Matters for Odisha</span>
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-slate-300 leading-normal">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                  <span><strong>Preserves Odia Language & Culture</strong> through authentic LLM fine-tuning on regional literature and government schemes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                  <span><strong>Empowers Non-English Speakers</strong> to access education, administrative notices, and agricultural advisories without barriers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                  <span><strong>Powers College ERP Parent Alerts</strong> in fluent Odia so every parent stays informed regardless of English literacy.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Live ShristiAI Sandbox Terminal */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-full min-h-[520px]">
              {/* Terminal Header */}
              <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-white">ShristiAI Core Engine v2.4</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-[11px] text-slate-400">Inference: {currentResponse.latencyMs}ms</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSpeak(currentResponse.responseText)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors ${
                      isSpeaking
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                    title="Text-to-Speech playback"
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5" />
                        <span>Stop Voice</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Listen Voice</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Chat Stream View */}
              <div className="p-6 flex-1 overflow-y-auto space-y-6">
                {/* User Message Bubble */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">
                    You
                  </div>
                  <div className="flex-1 p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200">
                    {inputQuery}
                  </div>
                </div>

                {/* ShristiAI Response */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-900/40 text-sm leading-relaxed text-slate-100 whitespace-pre-wrap font-sans">
                      {isProcessing ? (
                        <div className="flex items-center gap-2 text-slate-400">
                          <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                          <span>Generating response with ShristiAI Odia Linguistic Model...</span>
                        </div>
                      ) : (
                        currentResponse.responseText
                      )}
                    </div>

                    {/* Bilingual Translation Preview if query was in English */}
                    {currentResponse.odiaTranslation && !isProcessing && (
                      <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/30 text-xs text-emerald-300">
                        <div className="font-semibold text-emerald-400 mb-1 flex items-center gap-1.5">
                          <Languages className="w-3 h-3" />
                          <span>Odia Language Translation (ଓଡ଼ିଆ ଅନୁବାଦ):</span>
                        </div>
                        <p>{currentResponse.odiaTranslation}</p>
                      </div>
                    )}

                    {/* Action Triggers */}
                    {!isProcessing && currentResponse.suggestedActions.length > 0 && (
                      <div className="pt-2">
                        <div className="text-[11px] font-semibold uppercase text-slate-400 mb-2">
                          Suggested Next Steps:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {currentResponse.suggestedActions.map((action, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                if (action.includes('ERP') || action.includes('Simulator')) {
                                  onExploreErp();
                                } else {
                                  onRequestDemo();
                                }
                              }}
                              className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 hover:text-emerald-400 font-medium transition-colors flex items-center gap-1.5"
                            >
                              <span>{action}</span>
                              <ArrowRight className="w-3 h-3 text-slate-500" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Interactive Query Input Bar */}
              <div className="p-4 bg-slate-900 border-t border-slate-800">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (inputQuery.trim()) {
                      handleRunQuery(inputQuery);
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder="Ask ShristiAI in Odia, English, or Hindi..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    disabled={isProcessing || !inputQuery.trim()}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-sm transition-all flex items-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>Run</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
