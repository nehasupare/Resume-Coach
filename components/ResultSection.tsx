
import React from 'react';
import { AnalysisResult } from '../types';
import { ScoreGauge } from './ScoreGauge';

interface ResultSectionProps {
  result: AnalysisResult;
  onReset: () => void;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ result, onReset }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-800">Your Resume Analysis</h2>
          <p className="text-slate-500 mt-2 max-w-xl">{result.summary}</p>
        </div>
        <div className="flex-shrink-0 ml-8">
          <ScoreGauge score={result.score} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section Feedback */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Section Breakdown
          </h3>
          <div className="space-y-4">
            {result.feedback.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-slate-700">{item.section}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    item.rating === 'Good' ? 'bg-emerald-100 text-emerald-700' :
                    item.rating === 'Fair' ? 'bg-amber-100 text-amber-700' :
                    'bg-rose-100 text-rose-700'
                  }`}>
                    {item.rating}
                  </span>
                </div>
                <p className="text-sm text-slate-600">{item.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ATS Tips & Missing Sections */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Quick Improvements
            </h3>
            <div className="space-y-3">
              {result.missingSections.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-slate-700 mb-2">Consider Adding:</p>
                  <div className="flex flex-wrap gap-2">
                    {result.missingSections.map((s, i) => (
                      <span key={i} className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg border border-indigo-100 uppercase tracking-wider font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <ul className="space-y-2">
                {result.atsTips.map((tip, i) => (
                  <li key={i} className="flex items-start text-sm text-slate-600">
                    <svg className="w-4 h-4 mr-2 text-indigo-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg text-white">
            <h3 className="text-lg font-semibold mb-2">Need a Fresh Start?</h3>
            <p className="text-indigo-100 text-sm mb-4">You can re-upload or edit your resume text to see how your changes affect the score.</p>
            <button
              onClick={onReset}
              className="w-full py-2 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors"
            >
              Analyze New Resume
            </button>
          </div>
        </div>
      </div>

      {/* Improved Bullets */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
          <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          AI-Suggested Rewrites
        </h3>
        <div className="grid grid-cols-1 gap-6">
          {result.improvedBullets.map((bullet, idx) => (
            <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50">
              <div className="p-4 border-b border-slate-100 bg-white">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Original</span>
                <p className="text-slate-600 italic">"{bullet.original}"</p>
              </div>
              <div className="p-4 bg-emerald-50/30">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1 block">Improved (ATS Ready)</span>
                <p className="text-slate-800 font-medium">"{bullet.improved}"</p>
                <p className="text-xs text-slate-500 mt-2 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {bullet.reason}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
