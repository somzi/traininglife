import { useEffect, useState } from 'react';

const tips = [
  'AURA is calculating your optimal plan...',
  'Analyzing your macro targets...',
  'Building your personalized session...',
  'Optimizing for your goals...',
];

interface AuraLoaderProps {
  onComplete: () => void;
  duration?: number;
}

const AuraLoader = ({ onComplete, duration = 2200 }: AuraLoaderProps) => {
  const [tipIdx, setTipIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTipIdx(i => (i + 1) % tips.length), 800);
    const timer = setTimeout(onComplete, duration);
    return () => { clearInterval(interval); clearTimeout(timer); };
  }, [onComplete, duration]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/90 backdrop-blur-md animate-fade-in">
      {/* Pulsing orb */}
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full bg-primary/20 animate-pulse-neon flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-primary/40 animate-pulse-neon" style={{ animationDelay: '0.3s' }}>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="font-display font-bold text-primary-foreground text-xs">AI</span>
            </div>
          </div>
        </div>
        {/* Outer ring */}
        <div className="absolute inset-[-8px] rounded-full border-2 border-primary/30 animate-spin" style={{ animationDuration: '3s' }} />
        <div className="absolute inset-[-16px] rounded-full border border-primary/10 animate-spin" style={{ animationDuration: '5s', animationDirection: 'reverse' }} />
      </div>

      <p className="neon-text font-display font-semibold text-base mb-2 transition-all duration-300">
        {tips[tipIdx]}
      </p>
      <div className="flex gap-1.5 mt-3">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-primary animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default AuraLoader;
