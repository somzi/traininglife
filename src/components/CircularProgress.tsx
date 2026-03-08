interface CircularProgressProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  label: string;
  unit?: string;
}

const CircularProgress = ({ value, max, size = 200, strokeWidth = 12, label, unit = 'kcal' }: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min(value / max, 1);
  const offset = circumference - progress * circumference;
  const remaining = Math.max(max - value, 0);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
          style={{
            filter: progress > 0 ? 'drop-shadow(0 0 8px hsl(73 100% 60% / 0.5))' : 'none',
          }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="font-display text-4xl font-bold">{remaining}</div>
        <div className="text-muted-foreground text-sm">{unit} left</div>
        <div className="text-muted-foreground text-xs mt-1">{label}</div>
      </div>
    </div>
  );
};

export default CircularProgress;
