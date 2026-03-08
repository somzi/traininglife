interface MacroBarProps {
  label: string;
  value: number;
  max: number;
  color: string;
}

const MacroBar = ({ label, value, max, color }: MacroBarProps) => {
  const progress = Math.min((value / max) * 100, 100);

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-muted-foreground font-medium">{label}</span>
        <span className="text-xs font-display font-semibold">{value}g <span className="text-muted-foreground">/ {max}g</span></span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};

export default MacroBar;
