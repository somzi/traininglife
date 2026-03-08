import { useState, useCallback, useEffect, useRef } from 'react';
import { exercises, muscleGroups } from '@/data/exercises';
import { Dumbbell, Zap, ArrowUp, ArrowDown, Timer, Flame, Footprints, Plus, ShoppingCart, Check, ChevronLeft, Minus, Sparkles, Clock, Trophy, ExternalLink } from 'lucide-react';
import type { WorkoutSession, SessionExercise, ExerciseLogEntry } from '@/hooks/useAppData';
import { getExerciseHistory, getLastWeight, getExercisePR } from '@/hooks/useAppData';
import DateScroller from '@/components/DateScroller';
import AuraLoader from '@/components/AuraLoader';
import { generateWorkout } from '@/lib/smartGenerator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Dumbbell, Zap, ArrowUp, ArrowDown, Timer, Flame, Footprints,
};

interface WorkoutPageProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  scheduledWorkouts: WorkoutSession[];
  onScheduleWorkout: (workout: WorkoutSession) => void;
  onDeleteWorkout: (date: string) => void;
  onUpdateWorkout: (date: string, exercises: SessionExercise[]) => void;
  exerciseLogs: ExerciseLogEntry[];
  onLogExercise: (exerciseId: string, date: string, sets: { weight: number; reps: number }[]) => void;
}

// Confetti component
const PRConfetti = ({ show }: { show: boolean }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: i % 3 === 0 ? 'hsl(73, 100%, 60%)' : i % 3 === 1 ? 'hsl(45, 100%, 60%)' : 'hsl(200, 100%, 60%)',
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${1 + Math.random()}s`,
          }}
        />
      ))}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 animate-slide-up">
        <div className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-display font-bold text-sm flex items-center gap-2 neon-glow">
          <Trophy className="w-5 h-5" />
          NEW PERSONAL BEST!
        </div>
      </div>
    </div>
  );
};

// History modal content
const ExerciseHistoryModal = ({ exerciseId, exerciseName, logs }: { exerciseId: string; exerciseName: string; logs: ExerciseLogEntry[] }) => {
  const history = getExerciseHistory(logs, exerciseId, 5);

  if (history.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground text-sm">
        No history yet. Complete your first session!
      </div>
    );
  }

  return (
    <div className="space-y-2 py-2">
      {history.map((entry, idx) => {
        const bestSet = entry.sets.reduce((best, s) => (s.weight > best.weight ? s : best), { weight: 0, reps: 0 });
        const totalVolume = entry.sets.reduce((v, s) => v + s.weight * s.reps, 0);
        const prevEntry = history[idx + 1];
        const prevBest = prevEntry
          ? prevEntry.sets.reduce((best, s) => (s.weight > best.weight ? s : best), { weight: 0, reps: 0 }).weight
          : null;
        const improved = prevBest !== null && bestSet.weight > prevBest;

        return (
          <div key={entry.date} className="glass-surface rounded-xl p-3 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="font-display font-semibold text-xs text-muted-foreground">
                {new Date(entry.date + 'T12:00:00').toLocaleDateString('en', { month: 'short', day: 'numeric' })}
              </div>
              <div className="font-display text-sm mt-0.5">
                Best: <span className="font-bold">{bestSet.weight}kg × {bestSet.reps}</span>
              </div>
              <div className="text-muted-foreground text-[10px]">
                Volume: {totalVolume.toLocaleString()} kg
              </div>
            </div>
            {improved && (
              <div className="flex items-center gap-1 text-primary text-xs font-display font-semibold">
                <ArrowUp className="w-4 h-4" />
                ↑
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const WorkoutPage = ({ selectedDate, onSelectDate, scheduledWorkouts, onScheduleWorkout, onDeleteWorkout, onUpdateWorkout, exerciseLogs, onLogExercise }: WorkoutPageProps) => {
  const [selectedGroup, setSelectedGroup] = useState('Chest');
  const [cart, setCart] = useState<string[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAiDialog, setShowAiDialog] = useState(false);
  const [aiGroups, setAiGroups] = useState<Set<string>>(new Set());
  const [isGenerating, setIsGenerating] = useState(false);
  const [historyExercise, setHistoryExercise] = useState<{ id: string; name: string } | null>(null);
  const [showPR, setShowPR] = useState(false);
  const prTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const existingWorkout = scheduledWorkouts.find(w => w.date === selectedDate && w.confirmed);
  const filtered = exercises.filter(e => e.muscle === selectedGroup);

  // Auto-log exercises when sets are completed
  useEffect(() => {
    if (!existingWorkout) return;
    for (const ex of existingWorkout.exercises) {
      const completedSets = ex.sets.filter(s => s.completed && s.weight > 0 && s.reps > 0);
      if (completedSets.length > 0) {
        onLogExercise(ex.exerciseId, selectedDate, completedSets.map(s => ({ weight: s.weight, reps: s.reps })));
      }
    }
  }, [existingWorkout, selectedDate, onLogExercise]);

  const toggleCart = (id: string) => {
    setCart(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const confirmWorkout = () => {
    const sessionExercises: SessionExercise[] = cart.map(id => {
      const ex = exercises.find(e => e.id === id)!;
      const lastWt = getLastWeight(exerciseLogs, id);
      return {
        exerciseId: id,
        name: ex.name,
        sets: Array.from({ length: ex.sets }, () => ({ weight: lastWt, reps: 0, completed: false })),
      };
    });
    onScheduleWorkout({ date: selectedDate, exercises: sessionExercises, confirmed: true });
    setCart([]);
    setShowConfirm(false);
  };

  const toggleAiGroup = (group: string) => {
    setAiGroups(prev => {
      const next = new Set(prev);
      if (next.has(group)) next.delete(group); else next.add(group);
      return next;
    });
  };

  const handleAiGenerate = useCallback(() => {
    if (aiGroups.size === 0) return;
    setShowAiDialog(false);
    setIsGenerating(true);
  }, [aiGroups]);

  const onAiComplete = useCallback(() => {
    const selected = generateWorkout([...aiGroups]);
    const sessionExercises: SessionExercise[] = selected.map(ex => {
      const lastWt = getLastWeight(exerciseLogs, ex.id);
      return {
        exerciseId: ex.id,
        name: ex.name,
        sets: Array.from({ length: ex.sets }, () => ({ weight: lastWt, reps: 0, completed: false })),
      };
    });
    onScheduleWorkout({ date: selectedDate, exercises: sessionExercises, confirmed: true });
    setAiGroups(new Set());
    setIsGenerating(false);
  }, [aiGroups, selectedDate, onScheduleWorkout, exerciseLogs]);

  const updateSetLog = (exIdx: number, setIdx: number, field: 'weight' | 'reps', value: number) => {
    if (!existingWorkout) return;

    // Check for PR on weight change
    if (field === 'weight' && value > 0) {
      const ex = existingWorkout.exercises[exIdx];
      const currentPR = getExercisePR(exerciseLogs, ex.exerciseId);
      if (value > currentPR && currentPR > 0) {
        setShowPR(true);
        if (prTimeoutRef.current) clearTimeout(prTimeoutRef.current);
        prTimeoutRef.current = setTimeout(() => setShowPR(false), 2500);
      }
    }

    const updated = existingWorkout.exercises.map((ex, ei) => {
      if (ei !== exIdx) return ex;
      return { ...ex, sets: ex.sets.map((s, si) => si === setIdx ? { ...s, [field]: value } : s) };
    });
    onUpdateWorkout(selectedDate, updated);
  };

  const toggleSetComplete = (exIdx: number, setIdx: number) => {
    if (!existingWorkout) return;
    const updated = existingWorkout.exercises.map((ex, ei) => {
      if (ei !== exIdx) return ex;
      return { ...ex, sets: ex.sets.map((s, si) => si === setIdx ? { ...s, completed: !s.completed } : s) };
    });
    onUpdateWorkout(selectedDate, updated);
  };

  const handleBackToCalendar = () => {
    onDeleteWorkout(selectedDate);
  };

  const dateLabel = new Date(selectedDate + 'T12:00:00').toLocaleDateString('en', { month: 'long', day: 'numeric' });

  if (isGenerating) {
    return <AuraLoader onComplete={onAiComplete} />;
  }

  // Execution mode
  if (existingWorkout) {
    const totalSets = existingWorkout.exercises.reduce((a, e) => a + e.sets.length, 0);
    const doneSets = existingWorkout.exercises.reduce((a, e) => a + e.sets.filter(s => s.completed).length, 0);

    return (
      <div className="px-5 pt-6 pb-24 safe-top animate-slide-up">
        <PRConfetti show={showPR} />

        <div className="flex items-center gap-3 mb-4">
          <button onClick={handleBackToCalendar} className="haptic-press touch-target w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="font-display text-xl font-bold">Workout — {dateLabel}</h1>
            <p className="text-muted-foreground text-sm">{doneSets}/{totalSets} sets completed</p>
          </div>
        </div>

        <div className="mb-4">
          <DateScroller selectedDate={selectedDate} onSelectDate={onSelectDate} />
        </div>

        <div className="h-2 rounded-full bg-muted mb-6 overflow-hidden">
          <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${totalSets > 0 ? (doneSets / totalSets) * 100 : 0}%` }} />
        </div>

        <div key={selectedDate} className="space-y-4 animate-slide-up">
          {existingWorkout.exercises.map((ex, exIdx) => {
            const lastWt = getLastWeight(exerciseLogs, ex.exerciseId);
            const pr = getExercisePR(exerciseLogs, ex.exerciseId);

            return (
              <div key={ex.exerciseId} className="glass-surface rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-display font-semibold text-sm">{ex.name}</div>
                  <div className="flex items-center gap-2">
                    {pr > 0 && (
                      <span className="text-[10px] text-muted-foreground font-display">PR: {pr}kg</span>
                    )}
                    <a
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(ex.name + ' exercise tutorial')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="haptic-press w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center"
                      title="Watch Tutorial"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-destructive" />
                    </a>
                    <button
                      onClick={() => setHistoryExercise({ id: ex.exerciseId, name: ex.name })}
                      className="haptic-press w-8 h-8 rounded-lg bg-muted/60 flex items-center justify-center"
                    >
                      <Clock className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-[1fr_3fr_3fr_auto] gap-2 text-[10px] text-muted-foreground px-1">
                    <span>Set</span><span>Weight (kg)</span><span>Reps</span><span className="w-8" />
                  </div>
                  {ex.sets.map((set, setIdx) => (
                    <div key={setIdx} className="grid grid-cols-[1fr_3fr_3fr_auto] gap-2 items-center">
                      <span className="text-xs text-muted-foreground text-center font-display">{setIdx + 1}</span>
                      <input
                        type="number"
                        value={set.weight || ''}
                        onChange={e => updateSetLog(exIdx, setIdx, 'weight', Number(e.target.value))}
                        className="h-10 rounded-xl bg-muted px-3 text-sm font-display outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder={lastWt > 0 ? `${lastWt}` : '0'}
                      />
                      <input
                        type="number"
                        value={set.reps || ''}
                        onChange={e => updateSetLog(exIdx, setIdx, 'reps', Number(e.target.value))}
                        className="h-10 rounded-xl bg-muted px-3 text-sm font-display outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="0"
                      />
                      <button onClick={() => toggleSetComplete(exIdx, setIdx)} className={`haptic-press w-8 h-8 rounded-lg flex items-center justify-center transition-all ${set.completed ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* History Modal */}
        <Dialog open={!!historyExercise} onOpenChange={() => setHistoryExercise(null)}>
          <DialogContent className="glass-surface border-border rounded-2xl max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle className="font-display text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                {historyExercise?.name}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm">Last 5 sessions</DialogDescription>
            </DialogHeader>
            {historyExercise && (
              <ExerciseHistoryModal exerciseId={historyExercise.id} exerciseName={historyExercise.name} logs={exerciseLogs} />
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Planner mode
  return (
    <div className="px-5 pt-6 pb-24 safe-top">
      <div className="mb-4 animate-slide-up">
        <h1 className="font-display text-2xl font-bold">Plan Workout</h1>
        <p className="text-muted-foreground text-sm">Select a date & add exercises</p>
      </div>

      <div className="mb-4">
        <DateScroller selectedDate={selectedDate} onSelectDate={(d) => { onSelectDate(d); setCart([]); }} />
      </div>

      <button
        onClick={() => setShowAiDialog(true)}
        className="haptic-press w-full h-14 rounded-2xl mb-5 font-display font-semibold text-sm flex items-center justify-center gap-3 bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-all animate-pulse-neon"
      >
        <Sparkles className="w-5 h-5" />
        Generate with AURA AI
      </button>

      <div key={selectedDate} className="animate-slide-up">
        <div className="flex gap-2 overflow-x-auto pb-4 -mx-5 px-5">
          {muscleGroups.map(group => (
            <button key={group} onClick={() => setSelectedGroup(group)} className={`haptic-press whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedGroup === group ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              {group}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((exercise, index) => {
            const Icon = iconMap[exercise.icon] || Dumbbell;
            const inCart = cart.includes(exercise.id);
            const pr = getExercisePR(exerciseLogs, exercise.id);
            return (
              <div key={exercise.id} className={`glass-surface rounded-2xl p-4 flex items-center gap-4 animate-slide-up transition-all ${inCart ? 'border-primary/50' : ''}`} style={{ animationDelay: `${index * 50}ms` }}>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-semibold text-sm truncate">{exercise.name}</div>
                  <div className="text-muted-foreground text-xs">
                    {exercise.sets} sets × {exercise.reps}
                    {pr > 0 && <span className="ml-2 text-primary">PR: {pr}kg</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name + ' exercise tutorial')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="haptic-press w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center"
                    title="Watch Tutorial"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-destructive" />
                  </a>
                  <button
                    onClick={() => setHistoryExercise({ id: exercise.id, name: exercise.name })}
                    className="haptic-press w-8 h-8 rounded-lg bg-muted/60 flex items-center justify-center"
                  >
                    <Clock className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button onClick={() => toggleCart(exercise.id)} className={`haptic-press touch-target w-10 h-10 rounded-xl flex items-center justify-center transition-all ${inCart ? 'bg-primary text-primary-foreground scale-110' : 'bg-muted text-foreground'}`}>
                    {inCart ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 px-5 z-40 max-w-lg mx-auto">
          <button onClick={() => setShowConfirm(true)} className="haptic-press w-full h-14 rounded-2xl bg-primary text-primary-foreground font-display font-semibold text-base flex items-center justify-center gap-3 neon-glow">
            <ShoppingCart className="w-5 h-5" />
            Add to Workout ({cart.length})
          </button>
        </div>
      )}

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="glass-surface border-border rounded-2xl max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-lg">Confirm Workout</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">Schedule {cart.length} exercises for {dateLabel}?</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 max-h-48 overflow-y-auto py-2">
            {cart.map(id => {
              const ex = exercises.find(e => e.id === id);
              return ex ? (
                <div key={id} className="flex items-center gap-3 py-1.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">{ex.name}</span>
                  <span className="text-muted-foreground text-xs ml-auto">{ex.sets}×{ex.reps}</span>
                </div>
              ) : null;
            })}
          </div>
          <button onClick={confirmWorkout} className="haptic-press touch-target w-full h-12 rounded-xl bg-primary text-primary-foreground font-display font-semibold">
            Confirm for {dateLabel}
          </button>
        </DialogContent>
      </Dialog>

      <Dialog open={showAiDialog} onOpenChange={setShowAiDialog}>
        <DialogContent className="glass-surface border-border rounded-2xl max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Smart Workout
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">Select muscle groups and AURA will build your session</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 py-3">
            {muscleGroups.map(group => (
              <button key={group} onClick={() => toggleAiGroup(group)} className={`haptic-press touch-target h-12 rounded-xl font-display font-semibold text-sm transition-all ${aiGroups.has(group) ? 'bg-primary text-primary-foreground neon-glow' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                {group}
              </button>
            ))}
          </div>
          <button onClick={handleAiGenerate} disabled={aiGroups.size === 0} className="haptic-press touch-target w-full h-14 rounded-xl bg-primary text-primary-foreground font-display font-semibold flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none">
            <Sparkles className="w-4 h-4" />
            Generate ({aiGroups.size} groups)
          </button>
        </DialogContent>
      </Dialog>

      {/* History Modal in planner mode */}
      <Dialog open={!!historyExercise} onOpenChange={() => setHistoryExercise(null)}>
        <DialogContent className="glass-surface border-border rounded-2xl max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              {historyExercise?.name}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">Last 5 sessions</DialogDescription>
          </DialogHeader>
          {historyExercise && (
            <ExerciseHistoryModal exerciseId={historyExercise.id} exerciseName={historyExercise.name} logs={exerciseLogs} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkoutPage;
