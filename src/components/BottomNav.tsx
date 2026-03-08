import { Home, Dumbbell, UtensilsCrossed, User } from 'lucide-react';

interface BottomNavProps {
  active: string;
  onNavigate: (tab: string) => void;
}

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'workout', label: 'Workout', icon: Dumbbell },
  { id: 'meals', label: 'Meals', icon: UtensilsCrossed },
  { id: 'profile', label: 'Profile', icon: User },
];

const BottomNav = ({ active, onNavigate }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-surface safe-bottom z-50">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`haptic-press flex flex-col items-center justify-center gap-0.5 w-16 h-14 rounded-xl transition-all ${
              active === id ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Icon className={`w-5 h-5 transition-all ${active === id ? 'scale-110' : ''}`} />
            <span className="text-[10px] font-medium">{label}</span>
            {active === id && (
              <div className="w-1 h-1 rounded-full bg-primary animate-pulse-neon" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
