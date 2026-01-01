
import React from 'react';

interface ScoreGaugeProps {
  score: number;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
  const percentage = (score / 10) * 100;
  const strokeDashoffset = 440 - (440 * percentage) / 100;

  const getColor = () => {
    if (score >= 8) return 'text-emerald-500';
    if (score >= 5) return 'text-amber-500';
    return 'text-rose-500';
  };

  const getStrokeColor = () => {
    if (score >= 8) return '#10b981';
    if (score >= 5) return '#f59e0b';
    return '#f43f5e';
  };

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-48 h-48 transform -rotate-90">
        <circle
          cx="96"
          cy="96"
          r="70"
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          className="text-slate-100"
        />
        <circle
          cx="96"
          cy="96"
          r="70"
          stroke={getStrokeColor()}
          strokeWidth="12"
          fill="transparent"
          strokeDasharray="440"
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-out' }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-4xl font-bold ${getColor()}`}>{score}</span>
        <span className="text-slate-400 text-sm font-medium">Out of 10</span>
      </div>
    </div>
  );
};
