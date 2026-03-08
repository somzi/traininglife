import { calculateMacros } from '@/hooks/useAppData';
import type { UserProfile, DailyLog } from '@/hooks/useAppData';
import CircularProgress from '@/components/CircularProgress';
import MacroBar from '@/components/MacroBar';
import { Flame, Target, TrendingUp, Zap } from 'lucide-react';

interface HomePageProps {
  profile: UserProfile;
  todayLog: DailyLog;
}

const HomePage = ({ profile, todayLog }: HomePageProps) => {
  const macros = calculateMacros(profile);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="px-5 pt-6 pb-24 safe-top animate-slide-up">
      {/* Header */}
      <div className="mb-8">
        <p className="text-muted-foreground text-sm">{greeting}</p>
        <h1 className="font-display text-2xl font-bold">Your Daily Coach</h1>
      </div>

      {/* Calorie Ring */}
      <div className="flex justify-center mb-6">
        <CircularProgress
          value={todayLog.calories}
          max={macros.calories}
          size={220}
          strokeWidth={14}
          label="Daily Goal"
        />
      </div>

      {/* Macro Bars */}
      <div className="card-surface p-5 mb-5 space-y-4">
        <h3 className="font-display font-semibold text-sm flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" />
          Macro Targets
        </h3>
        <MacroBar label="Protein" value={todayLog.protein} max={macros.protein} color="hsl(73, 100%, 60%)" />
        <MacroBar label="Carbs" value={todayLog.carbs} max={macros.carbs} color="hsl(200, 80%, 55%)" />
        <MacroBar label="Fats" value={todayLog.fats} max={macros.fats} color="hsl(35, 90%, 55%)" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card-surface p-4 text-center">
          <Flame className="w-5 h-5 text-primary mx-auto mb-2" />
          <div className="font-display font-bold text-lg">{macros.calories}</div>
          <div className="text-muted-foreground text-[10px]">Cal Target</div>
        </div>
        <div className="card-surface p-4 text-center">
          <Zap className="w-5 h-5 text-primary mx-auto mb-2" />
          <div className="font-display font-bold text-lg">{todayLog.completedExercises.length}</div>
          <div className="text-muted-foreground text-[10px]">Exercises</div>
        </div>
        <div className="card-surface p-4 text-center">
          <TrendingUp className="w-5 h-5 text-primary mx-auto mb-2" />
          <div className="font-display font-bold text-lg">{profile.goal === 'fat_loss' ? 'Cut' : 'Bulk'}</div>
          <div className="text-muted-foreground text-[10px]">Current Phase</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
