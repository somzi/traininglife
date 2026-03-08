import { useEffect, useState } from 'react';

export interface UserProfile {
  gender: 'male' | 'female';
  weight: number;
  height: number;
  age: number;
  goal: 'fat_loss' | 'muscle_gain' | 'maintenance';
  onboarded: boolean;
}

export interface MealEntry {
  id: string;
  mealId: string;
  name: string;
  slot: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  timestamp: number;
}

export interface WorkoutSession {
  date: string;
  exercises: SessionExercise[];
  confirmed: boolean;
}

export interface SessionExercise {
  exerciseId: string;
  name: string;
  sets: SetLog[];
}

export interface SetLog {
  weight: number;
  reps: number;
  completed: boolean;
}

export interface DailyLog {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  completedExercises: string[];
  mealEntries: MealEntry[];
}

export interface WeightEntry {
  date: string;
  weight: number;
}

export interface CalorieHistoryEntry {
  date: string;
  calories: number;
}

export interface ExerciseLogEntry {
  exerciseId: string;
  date: string;
  sets: { weight: number; reps: number }[];
}

export interface AppData {
  profile: UserProfile;
  dailyLogs: Record<string, DailyLog>;
  weightHistory: WeightEntry[];
  calorieHistory: CalorieHistoryEntry[];
  scheduledWorkouts: WorkoutSession[];
  exerciseLogs: ExerciseLogEntry[];
}

const defaultProfile: UserProfile = {
  gender: 'male',
  weight: 75,
  height: 175,
  age: 25,
  goal: 'fat_loss',
  onboarded: false,
};

export const getTodayStr = () => new Date().toISOString().split('T')[0];

const emptyDailyLog = (date: string): DailyLog => ({
  date,
  calories: 0,
  protein: 0,
  carbs: 0,
  fats: 0,
  completedExercises: [],
  mealEntries: [],
});

const defaultData: AppData = {
  profile: defaultProfile,
  dailyLogs: {},
  weightHistory: [],
  calorieHistory: [],
  scheduledWorkouts: [],
  exerciseLogs: [],
};

export function calculateTDEE(profile: UserProfile) {
  let bmr: number;
  if (profile.gender === 'male') {
    bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
  } else {
    bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
  }
  return Math.round(bmr * 1.55);
}

export function calculateMacros(profile: UserProfile) {
  const tdee = calculateTDEE(profile);
  let calories: number;
  if (profile.goal === 'fat_loss') calories = tdee - 500;
  else if (profile.goal === 'muscle_gain') calories = tdee + 300;
  else calories = tdee;

  const protein = Math.round(profile.weight * 2.2);
  const fats = Math.round((calories * 0.25) / 9);
  const carbs = Math.round((calories - protein * 4 - fats * 9) / 4);
  return { calories: Math.round(calories), protein, carbs, fats };
}

// Helper: get history for a specific exercise
export function getExerciseHistory(logs: ExerciseLogEntry[], exerciseId: string, limit = 5): ExerciseLogEntry[] {
  return logs
    .filter(l => l.exerciseId === exerciseId)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}

// Helper: get the last logged weight for an exercise
export function getLastWeight(logs: ExerciseLogEntry[], exerciseId: string): number {
  const history = getExerciseHistory(logs, exerciseId, 1);
  if (history.length === 0) return 0;
  const bestSet = history[0].sets.reduce((best, s) => s.weight > best.weight ? s : best, { weight: 0, reps: 0 });
  return bestSet.weight;
}

// Helper: get all-time PR weight for an exercise
export function getExercisePR(logs: ExerciseLogEntry[], exerciseId: string): number {
  let maxWeight = 0;
  for (const log of logs) {
    if (log.exerciseId !== exerciseId) continue;
    for (const s of log.sets) {
      if (s.weight > maxWeight) maxWeight = s.weight;
    }
  }
  return maxWeight;
}

// Helper: calculate volume for a date range
export function calculateVolumeForRange(logs: ExerciseLogEntry[], startDate: string, endDate: string): number {
  return logs
    .filter(l => l.date >= startDate && l.date <= endDate)
    .reduce((total, log) => total + log.sets.reduce((s, set) => s + set.weight * set.reps, 0), 0);
}

export function useAppData() {
  const [data, setData] = useState<AppData>(() => {
    try {
      const stored = localStorage.getItem('fitcoach_data');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.todayLog && !parsed.dailyLogs) {
          parsed.dailyLogs = {};
          if (parsed.todayLog.date) {
            parsed.dailyLogs[parsed.todayLog.date] = parsed.todayLog;
          }
          delete parsed.todayLog;
        }
        if (!parsed.dailyLogs) parsed.dailyLogs = {};
        if (!parsed.calorieHistory) parsed.calorieHistory = [];
        if (!parsed.scheduledWorkouts) parsed.scheduledWorkouts = [];
        if (!parsed.exerciseLogs) parsed.exerciseLogs = [];
        return parsed as AppData;
      }
    } catch {}
    return defaultData;
  });

  useEffect(() => {
    localStorage.setItem('fitcoach_data', JSON.stringify(data));
  }, [data]);

  const getDailyLog = (date: string): DailyLog => {
    return data.dailyLogs[date] || emptyDailyLog(date);
  };

  const updateDailyLog = (date: string, updater: (log: DailyLog) => DailyLog) => {
    setData(prev => {
      const current = prev.dailyLogs[date] || emptyDailyLog(date);
      const updated = updater(current);
      const newLogs = { ...prev.dailyLogs, [date]: updated };
      const history = [...prev.calorieHistory];
      const idx = history.findIndex(h => h.date === date);
      if (idx >= 0) history[idx].calories = updated.calories;
      else if (updated.calories > 0) history.push({ date, calories: updated.calories });
      return { ...prev, dailyLogs: newLogs, calorieHistory: history.slice(-30) };
    });
  };

  const updateProfile = (profile: Partial<UserProfile>) => {
    setData(prev => {
      const newProfile = { ...prev.profile, ...profile };
      if (profile.weight && profile.weight !== prev.profile.weight) {
        const newHistory = [
          ...prev.weightHistory.filter(w => w.date !== getTodayStr()),
          { date: getTodayStr(), weight: profile.weight },
        ];
        return { ...prev, profile: newProfile, weightHistory: newHistory };
      }
      return { ...prev, profile: newProfile };
    });
  };

  const addMealEntry = (date: string, entry: Omit<MealEntry, 'id' | 'timestamp'>) => {
    const newEntry: MealEntry = {
      ...entry,
      id: `me_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      timestamp: Date.now(),
    };
    updateDailyLog(date, log => ({
      ...log,
      calories: log.calories + entry.calories,
      protein: log.protein + entry.protein,
      carbs: log.carbs + entry.carbs,
      fats: log.fats + entry.fats,
      mealEntries: [...log.mealEntries, newEntry],
    }));
  };

  const updateMealEntry = (date: string, entryId: string, updates: { calories: number; protein: number; carbs: number; fats: number }) => {
    updateDailyLog(date, log => {
      const oldEntry = log.mealEntries.find(e => e.id === entryId);
      if (!oldEntry) return log;
      return {
        ...log,
        calories: log.calories + (updates.calories - oldEntry.calories),
        protein: log.protein + (updates.protein - oldEntry.protein),
        carbs: log.carbs + (updates.carbs - oldEntry.carbs),
        fats: log.fats + (updates.fats - oldEntry.fats),
        mealEntries: log.mealEntries.map(e => e.id === entryId ? { ...e, ...updates } : e),
      };
    });
  };

  const addWeight = (weight: number) => {
    setData(prev => ({
      ...prev,
      profile: { ...prev.profile, weight },
      weightHistory: [
        ...prev.weightHistory.filter(w => w.date !== getTodayStr()),
        { date: getTodayStr(), weight },
      ],
    }));
  };

  const scheduleWorkout = (workout: WorkoutSession) => {
    setData(prev => ({
      ...prev,
      scheduledWorkouts: [
        ...prev.scheduledWorkouts.filter(w => w.date !== workout.date),
        workout,
      ],
    }));
  };

  const deleteWorkout = (date: string) => {
    setData(prev => ({
      ...prev,
      scheduledWorkouts: prev.scheduledWorkouts.filter(w => w.date !== date),
    }));
  };

  const updateScheduledWorkout = (date: string, exercises: SessionExercise[]) => {
    setData(prev => ({
      ...prev,
      scheduledWorkouts: prev.scheduledWorkouts.map(w =>
        w.date === date ? { ...w, exercises } : w
      ),
    }));
  };

  // Log completed exercise sets to history
  const logExercise = (exerciseId: string, date: string, sets: { weight: number; reps: number }[]) => {
    // Only log sets that have actual data
    const validSets = sets.filter(s => s.weight > 0 && s.reps > 0);
    if (validSets.length === 0) return;

    setData(prev => {
      // Remove existing log for same exercise+date, then add new
      const filtered = prev.exerciseLogs.filter(l => !(l.exerciseId === exerciseId && l.date === date));
      return {
        ...prev,
        exerciseLogs: [...filtered, { exerciseId, date, sets: validSets }].slice(-500), // keep last 500
      };
    });
  };

  const resetData = () => {
    setData(defaultData);
    localStorage.removeItem('fitcoach_data');
  };

  return {
    data,
    getDailyLog,
    updateProfile,
    addMealEntry,
    updateMealEntry,
    addWeight,
    scheduleWorkout,
    deleteWorkout,
    updateScheduledWorkout,
    logExercise,
    resetData,
  };
}
