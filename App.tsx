
import React, { useState } from 'react';
import { analyzeResume } from './services/geminiService';
import { AnalysisResult, AnalysisStatus } from './types';
import { ResultSection } from './components/ResultSection';

const App: React.FC = () => {
  const [resumeText, setResumeText] = useState('');
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;
    
    setStatus(AnalysisStatus.LOADING);
    setError(null);
    try {
      const data = await analyzeResume(resumeText);
      setResult(data);
      setStatus(AnalysisStatus.SUCCESS);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze resume. Please ensure your API key is valid and try again.');
      setStatus(AnalysisStatus.ERROR);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          setResumeText(text);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleReset = () => {
    setStatus(AnalysisStatus.IDLE);
    setResult(null);
    setResumeText('');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">ElevateCV</span>
            </div>
            <div className="hidden sm:flex space-x-4">
              <a href="#" className="text-slate-500 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">How it works</a>
              <a href="#" className="text-slate-500 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">Templates</a>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {status === AnalysisStatus.IDLE || status === AnalysisStatus.LOADING || status === AnalysisStatus.ERROR ? (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
                Score your resume for <span className="text-indigo-600">Entry-Level</span> success.
              </h1>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Built for students and freshers. Get instant feedback on your resume content, 
                identify missing sections, and rewrite weak points with AI.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
              <div className="p-8">
                <div className="mb-6">
                  <label htmlFor="resume-text" className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider">
                    Paste Resume Content
                  </label>
                  <textarea
                    id="resume-text"
                    rows={12}
                    className="block w-full rounded-2xl border-slate-200 bg-slate-50 shadow-inner focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 text-slate-700 placeholder:text-slate-400 transition-all resize-none"
                    placeholder="E.g. Full Name, Education, Experience, Skills..."
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    disabled={status === AnalysisStatus.LOADING}
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative group cursor-pointer">
                    <input
                      type="file"
                      accept=".txt"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      disabled={status === AnalysisStatus.LOADING}
                    />
                    <button className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 text-sm font-semibold transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span>Upload .txt file</span>
                    </button>
                  </div>

                  <button
                    onClick={handleAnalyze}
                    disabled={status === AnalysisStatus.LOADING || !resumeText.trim()}
                    className={`inline-flex items-center px-8 py-3.5 border border-transparent text-base font-bold rounded-2xl shadow-lg shadow-indigo-200 text-white ${
                      status === AnalysisStatus.LOADING || !resumeText.trim()
                        ? 'bg-indigo-300 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5'
                    } transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    {status === AnalysisStatus.LOADING ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing...
                      </>
                    ) : (
                      'Analyze My Resume'
                    )}
                  </button>
                </div>

                {error && (
                  <div className="mt-6 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center space-x-3">
                    <svg className="w-5 h-5 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-rose-700">{error}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="bg-indigo-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-slate-900 font-bold mb-1">Instant Results</h3>
                <p className="text-slate-500 text-sm">Real-time analysis powered by Gemini AI.</p>
              </div>
              <div>
                <div className="bg-indigo-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040L3 14.535a11.99 11.99 0 001.467 4.544C5.027 20.25 6.471 21.285 8 21.721m7.322-14.74a11.946 11.946 0 014.678 7.535 11.986 11.986 0 01-1.467 4.544c-.56 1.066-2.004 2.101-3.533 2.537" />
                  </svg>
                </div>
                <h3 className="text-slate-900 font-bold mb-1">ATS Friendly</h3>
                <p className="text-slate-500 text-sm">Optimize for recruitment algorithms.</p>
              </div>
              <div>
                <div className="bg-indigo-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-slate-900 font-bold mb-1">Entry-Level Focus</h3>
                <p className="text-slate-500 text-sm">Tailored for students & freshers.</p>
              </div>
            </div>
          </div>
        ) : (
          result && <ResultSection result={result} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">© 2024 ElevateCV. Powered by Google Gemini.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="text-slate-300 hover:text-slate-500 transition-colors">Privacy</a>
            <a href="#" className="text-slate-300 hover:text-slate-500 transition-colors">Terms</a>
            <a href="#" className="text-slate-300 hover:text-slate-500 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
