import { useState } from 'react';
import { exercises, muscleGroups } from '@/data/exercises';
import { Dumbbell, Zap, ArrowUp, ArrowDown, Timer, Flame, Footprints, CheckCircle2, Circle } from 'lucide-react';
import type { DailyLog } from '@/hooks/useAppData';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Dumbbell, Zap, ArrowUp, ArrowDown, Timer, Flame, Footprints,
};

interface WorkoutPageProps {
  todayLog: DailyLog;
  onToggleExercise: (id: string) => void;
}

const WorkoutPage = ({ todayLog, onToggleExercise }: WorkoutPageProps) => {
  const [selectedGroup, setSelectedGroup] = useState('Chest');
  const [workoutMode, setWorkoutMode] = useState(false);

  const filtered = exercises.filter(e => e.muscle === selectedGroup);
  const completedCount = todayLog.completedExercises.length;

  return (
    <div className="px-5 pt-6 pb-24 safe-top animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold">Workouts</h1>
          <p className="text-muted-foreground text-sm">{completedCount} exercises done today</p>
        </div>
        <button
          onClick={() => setWorkoutMode(!workoutMode)}
          className={`haptic-press touch-target px-4 py-2 rounded-xl font-display font-semibold text-sm transition-all ${
            workoutMode ? 'bg-primary text-primary-foreground neon-glow' : 'bg-muted text-foreground'
          }`}
        >
          {workoutMode ? 'End Workout' : 'Start Workout'}
        </button>
      </div>

      {/* Muscle Group Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 -mx-5 px-5">
        {muscleGroups.map(group => (
          <button
            key={group}
            onClick={() => setSelectedGroup(group)}
            className={`haptic-press whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedGroup === group
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {group}
          </button>
        ))}
      </div>

      {/* Exercise List */}
      <div className="space-y-3">
        {filtered.map((exercise, index) => {
          const Icon = iconMap[exercise.icon] || Dumbbell;
          const isCompleted = todayLog.completedExercises.includes(exercise.id);
          return (
            <div
              key={exercise.id}
              className="card-surface p-4 flex items-center gap-4 animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display font-semibold text-sm truncate">{exercise.name}</div>
                <div className="text-muted-foreground text-xs">{exercise.sets} sets × {exercise.reps}</div>
              </div>
              {workoutMode && (
                <button
                  onClick={() => onToggleExercise(exercise.id)}
                  className="haptic-press touch-target flex items-center justify-center"
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-7 h-7 text-primary" />
                  ) : (
                    <Circle className="w-7 h-7 text-muted-foreground" />
                  )}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkoutPage;
