import { calculateMacros } from '@/hooks/useAppData';
import type { UserProfile, DailyLog, CalorieHistoryEntry, WeightEntry } from '@/hooks/useAppData';
import CircularProgress from '@/components/CircularProgress';
import MacroBar from '@/components/MacroBar';
import { Flame, Target, TrendingUp, Zap, Award } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface HomePageProps {
  profile: UserProfile;
  todayLog: DailyLog;
  calorieHistory: CalorieHistoryEntry[];
  weightHistory: WeightEntry[];
}

const HomePage = ({ profile, todayLog, calorieHistory, weightHistory }: HomePageProps) => {
  const macros = calculateMacros(profile);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Rise and Grind' : hour < 18 ? 'Keep Pushing' : 'Finish Strong';
  const subGreeting = hour < 12 ? 'Morning warrior' : hour < 18 ? 'Stay focused' : 'End it right';

  // Weekly chart data (last 7 days including today)
  const today = new Date();
  const weekData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en', { weekday: 'short' });
    const entry = calorieHistory.find(h => h.date === dateStr);
    const isToday = dateStr === today.toISOString().split('T')[0];
    return {
      day: dayName,
      calories: isToday ? todayLog.calories : (entry?.calories || 0),
      target: macros.calories,
    };
  });

  // Calorie streak
  const streak = (() => {
    let count = 0;
    for (let i = calorieHistory.length - 1; i >= 0; i--) {
      if (calorieHistory[i].calories > 0) count++;
      else break;
    }
    if (todayLog.calories > 0) count++;
    return count;
  })();

  // Average weight
  const avgWeight = weightHistory.length > 0
    ? (weightHistory.slice(-7).reduce((a, b) => a + b.weight, 0) / Math.min(weightHistory.length, 7)).toFixed(1)
    : profile.weight.toFixed(1);

  const phaseLabel = profile.goal === 'fat_loss' ? 'Cutting' : profile.goal === 'muscle_gain' ? 'Bulking' : 'Maintain';

  return (
    <div className="px-5 pt-6 pb-24 safe-top animate-slide-up">
      {/* Header */}
      <div className="mb-6">
        <p className="text-muted-foreground text-sm">{subGreeting}</p>
        <h1 className="font-display text-2xl font-bold">{greeting} 💪</h1>
      </div>

      {/* Calorie Ring */}
      <div className="flex justify-center mb-6">
        <CircularProgress
          value={todayLog.calories}
          max={macros.calories}
          size={200}
          strokeWidth={14}
          label="Daily Goal"
        />
      </div>

      {/* Macro Bars */}
      <div className="glass-surface rounded-2xl p-5 mb-5 space-y-4">
        <h3 className="font-display font-semibold text-sm flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" />
          Macro Targets
        </h3>
        <MacroBar label="Protein" value={todayLog.protein} max={macros.protein} color="hsl(73, 100%, 60%)" />
        <MacroBar label="Carbs" value={todayLog.carbs} max={macros.carbs} color="hsl(200, 80%, 55%)" />
        <MacroBar label="Fats" value={todayLog.fats} max={macros.fats} color="hsl(35, 90%, 55%)" />
      </div>

      {/* Weekly Consistency Chart */}
      <div className="glass-surface rounded-2xl p-5 mb-5">
        <h3 className="font-display font-semibold text-sm flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-primary" />
          Weekly Consistency
        </h3>
        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weekData}>
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'hsl(0 0% 55%)' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: 'hsl(0 0% 7%)',
                  border: '1px solid hsl(0 0% 15%)',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="hsl(0 0% 25%)"
                strokeWidth={1}
                strokeDasharray="4 4"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="calories"
                stroke="hsl(73, 100%, 60%)"
                strokeWidth={2}
                dot={{ fill: 'hsl(73, 100%, 60%)', r: 3 }}
                activeDot={{ r: 5, fill: 'hsl(73, 100%, 60%)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-surface rounded-2xl p-4 text-center">
          <Award className="w-5 h-5 text-primary mx-auto mb-2" />
          <div className="font-display font-bold text-lg">{streak}</div>
          <div className="text-muted-foreground text-[10px]">Day Streak</div>
        </div>
        <div className="glass-surface rounded-2xl p-4 text-center">
          <Zap className="w-5 h-5 text-primary mx-auto mb-2" />
          <div className="font-display font-bold text-lg">{avgWeight}</div>
          <div className="text-muted-foreground text-[10px]">Avg Weight</div>
        </div>
        <div className="glass-surface rounded-2xl p-4 text-center">
          <Flame className="w-5 h-5 text-primary mx-auto mb-2" />
          <div className="font-display font-bold text-lg">{phaseLabel}</div>
          <div className="text-muted-foreground text-[10px]">Phase</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
