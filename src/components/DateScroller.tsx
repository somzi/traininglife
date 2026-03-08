import { useMemo } from 'react';

interface DateScrollerProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const DateScroller = ({ selectedDate, onSelectDate }: DateScrollerProps) => {
  const dates = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 14 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - 7 + i);
      return {
        date: d.toISOString().split('T')[0],
        day: d.toLocaleDateString('en', { weekday: 'short' }),
        num: d.getDate(),
        isToday: d.toISOString().split('T')[0] === today.toISOString().split('T')[0],
      };
    });
  }, []);

  return (
    <div className="flex gap-1.5 overflow-x-auto pb-3 -mx-5 px-5">
      {dates.map(d => (
        <button
          key={d.date}
          onClick={() => onSelectDate(d.date)}
          className={`haptic-press flex flex-col items-center min-w-[44px] py-2 px-1.5 rounded-xl transition-all ${
            selectedDate === d.date
              ? 'bg-primary text-primary-foreground neon-glow'
              : d.isToday
                ? 'bg-muted text-foreground ring-1 ring-primary/30'
                : 'bg-muted/50 text-muted-foreground'
          }`}
        >
          <span className="text-[9px] font-medium uppercase">{d.day}</span>
          <span className="font-display font-bold text-base">{d.num}</span>
        </button>
      ))}
    </div>
  );
};

export default DateScroller;
