import { useState } from 'react';
import { UserProfile, WeightEntry, calculateTDEE, calculateMacros } from '@/hooks/useAppData';
import { Scale, TrendingUp, RotateCcw, User, Flame, Dumbbell, Equal } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface ProfilePageProps {
  profile: UserProfile;
  weightHistory: WeightEntry[];
  onAddWeight: (weight: number) => void;
  onUpdateProfile: (profile: Partial<UserProfile>) => void;
  onReset: () => void;
}

type Goal = 'fat_loss' | 'muscle_gain' | 'maintenance';

const goalConfig: Record<Goal, { label: string; icon: React.ComponentType<{ className?: string }>; desc: string }> = {
  fat_loss: { label: 'Cutting', icon: Flame, desc: 'TDEE − 500 kcal' },
  muscle_gain: { label: 'Bulking', icon: Dumbbell, desc: 'TDEE + 300 kcal' },
  maintenance: { label: 'Maintain', icon: Equal, desc: 'TDEE = target' },
};

const ProfilePage = ({ profile, weightHistory, onAddWeight, onUpdateProfile, onReset }: ProfilePageProps) => {
  const [newWeight, setNewWeight] = useState(profile.weight.toString());
  const macros = calculateMacros(profile);
  const tdee = calculateTDEE(profile);

  const handleLogWeight = () => {
    const w = parseFloat(newWeight);
    if (w > 0 && w < 300) {
      onAddWeight(w);
      setNewWeight(w.toString());
    }
  };

  const chartData = weightHistory.slice(-14).map(e => ({
    date: e.date.slice(5),
    weight: e.weight,
  }));

  return (
    <div className="px-5 pt-6 pb-24 safe-top animate-slide-up">
      <h1 className="font-display text-2xl font-bold mb-6">Profile</h1>

      {/* User Info */}
      <div className="glass-surface rounded-2xl p-5 mb-4 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
          <User className="w-7 h-7 text-primary" />
        </div>
        <div>
          <div className="font-display font-semibold">{profile.gender === 'male' ? '♂' : '♀'} {profile.age} years</div>
          <div className="text-muted-foreground text-sm">{profile.height}cm · {profile.weight}kg</div>
        </div>
      </div>

      {/* Goal Switcher */}
      <div className="glass-surface rounded-2xl p-5 mb-4">
        <h3 className="font-display font-semibold text-sm mb-3">Training Phase</h3>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(goalConfig) as Goal[]).map(g => {
            const { label, icon: Icon, desc } = goalConfig[g];
            const active = profile.goal === g;
            return (
              <button
                key={g}
                onClick={() => onUpdateProfile({ goal: g })}
                className={`haptic-press flex flex-col items-center p-3 rounded-xl transition-all ${
                  active ? 'bg-primary text-primary-foreground neon-glow' : 'bg-muted text-muted-foreground'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="font-display font-semibold text-xs">{label}</span>
                <span className={`text-[9px] mt-0.5 ${active ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="glass-surface rounded-2xl p-4">
          <div className="text-muted-foreground text-xs mb-1">Daily TDEE</div>
          <div className="font-display font-bold text-xl">{tdee} <span className="text-sm text-muted-foreground">kcal</span></div>
        </div>
        <div className="glass-surface rounded-2xl p-4">
          <div className="text-muted-foreground text-xs mb-1">Target Calories</div>
          <div className="font-display font-bold text-xl neon-text">{macros.calories} <span className="text-sm text-muted-foreground">kcal</span></div>
        </div>
      </div>

      {/* Weight Tracker */}
      <div className="glass-surface rounded-2xl p-5 mb-4">
        <h3 className="font-display font-semibold text-sm flex items-center gap-2 mb-4">
          <Scale className="w-4 h-4 text-primary" />
          Weight Tracker
        </h3>
        <div className="flex gap-3 mb-4">
          <input
            type="number"
            value={newWeight}
            onChange={e => setNewWeight(e.target.value)}
            className="flex-1 h-12 rounded-xl bg-muted px-4 text-sm font-display font-semibold outline-none focus:ring-2 focus:ring-primary transition-all"
            placeholder="Weight (kg)"
          />
          <button
            onClick={handleLogWeight}
            className="haptic-press touch-target h-12 px-5 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm"
          >
            Log
          </button>
        </div>

        {chartData.length > 1 ? (
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(0 0% 55%)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'hsl(0 0% 55%)' }} axisLine={false} tickLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
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
                  dataKey="weight"
                  stroke="hsl(73, 100%, 60%)"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(73, 100%, 60%)', r: 4 }}
                  activeDot={{ r: 6, fill: 'hsl(73, 100%, 60%)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-32 flex items-center justify-center text-muted-foreground text-sm">
            <TrendingUp className="w-5 h-5 mr-2" />
            Log weight daily to see your progress
          </div>
        )}
      </div>

      {/* Reset */}
      <button
        onClick={onReset}
        className="haptic-press touch-target w-full h-14 rounded-2xl bg-destructive/10 text-destructive font-display font-semibold flex items-center justify-center gap-2"
      >
        <RotateCcw className="w-5 h-5" />
        Reset All Data
      </button>
    </div>
  );
};

export default ProfilePage;
