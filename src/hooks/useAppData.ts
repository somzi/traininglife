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

export interface AppData {
  profile: UserProfile;
  todayLog: DailyLog;
  weightHistory: WeightEntry[];
  calorieHistory: CalorieHistoryEntry[];
  scheduledWorkouts: WorkoutSession[];
}

const defaultProfile: UserProfile = {
  gender: 'male',
  weight: 75,
  height: 175,
  age: 25,
  goal: 'fat_loss',
  onboarded: false,
};

const getTodayStr = () => new Date().toISOString().split('T')[0];

const defaultDailyLog = (): DailyLog => ({
  date: getTodayStr(),
  calories: 0,
  protein: 0,
  carbs: 0,
  fats: 0,
  completedExercises: [],
  mealEntries: [],
});

const defaultData: AppData = {
  profile: defaultProfile,
  todayLog: defaultDailyLog(),
  weightHistory: [],
  calorieHistory: [],
  scheduledWorkouts: [],
};

export function calculateTDEE(profile: UserProfile) {
  let bmr: number;
  if (profile.gender === 'male') {
    bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
  } else {
    bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
  }
  const tdee = bmr * 1.55;
  return Math.round(tdee);
}

export function calculateMacros(profile: UserProfile) {
  const tdee = calculateTDEE(profile);
  let calories: number;

  if (profile.goal === 'fat_loss') {
    calories = tdee - 500;
  } else if (profile.goal === 'muscle_gain') {
    calories = tdee + 300;
  } else {
    calories = tdee;
  }

  const protein = Math.round(profile.weight * 2.2);
  const fats = Math.round((calories * 0.25) / 9);
  const carbs = Math.round((calories - protein * 4 - fats * 9) / 4);

  return { calories: Math.round(calories), protein, carbs, fats };
}

export function useAppData() {
  const [data, setData] = useState<AppData>(() => {
    try {
      const stored = localStorage.getItem('fitcoach_data');
      if (stored) {
        const parsed = JSON.parse(stored) as AppData;
        if (parsed.todayLog.date !== getTodayStr()) {
          // Save yesterday's calories before resetting
          if (parsed.todayLog.calories > 0) {
            const history = parsed.calorieHistory || [];
            history.push({ date: parsed.todayLog.date, calories: parsed.todayLog.calories });
            parsed.calorieHistory = history.slice(-30);
          }
          parsed.todayLog = defaultDailyLog();
        }
        // Ensure new fields exist
        if (!parsed.calorieHistory) parsed.calorieHistory = [];
        if (!parsed.scheduledWorkouts) parsed.scheduledWorkouts = [];
        if (!parsed.todayLog.mealEntries) parsed.todayLog.mealEntries = [];
        return parsed;
      }
    } catch {}
    return defaultData;
  });

  useEffect(() => {
    localStorage.setItem('fitcoach_data', JSON.stringify(data));
  }, [data]);

  const updateProfile = (profile: Partial<UserProfile>) => {
    setData(prev => {
      const newProfile = { ...prev.profile, ...profile };
      // If weight changed, also update weight history
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

  const addMealEntry = (entry: Omit<MealEntry, 'id' | 'timestamp'>) => {
    const newEntry: MealEntry = {
      ...entry,
      id: `me_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      timestamp: Date.now(),
    };
    setData(prev => ({
      ...prev,
      todayLog: {
        ...prev.todayLog,
        calories: prev.todayLog.calories + entry.calories,
        protein: prev.todayLog.protein + entry.protein,
        carbs: prev.todayLog.carbs + entry.carbs,
        fats: prev.todayLog.fats + entry.fats,
        mealEntries: [...prev.todayLog.mealEntries, newEntry],
      },
    }));
  };

  const updateMealEntry = (entryId: string, updates: { calories: number; protein: number; carbs: number; fats: number }) => {
    setData(prev => {
      const oldEntry = prev.todayLog.mealEntries.find(e => e.id === entryId);
      if (!oldEntry) return prev;
      const diffCal = updates.calories - oldEntry.calories;
      const diffP = updates.protein - oldEntry.protein;
      const diffC = updates.carbs - oldEntry.carbs;
      const diffF = updates.fats - oldEntry.fats;
      return {
        ...prev,
        todayLog: {
          ...prev.todayLog,
          calories: prev.todayLog.calories + diffCal,
          protein: prev.todayLog.protein + diffP,
          carbs: prev.todayLog.carbs + diffC,
          fats: prev.todayLog.fats + diffF,
          mealEntries: prev.todayLog.mealEntries.map(e =>
            e.id === entryId ? { ...e, ...updates } : e
          ),
        },
      };
    });
  };

  const addCalories = (cal: number, protein: number, carbs: number, fats: number) => {
    setData(prev => ({
      ...prev,
      todayLog: {
        ...prev.todayLog,
        calories: prev.todayLog.calories + cal,
        protein: prev.todayLog.protein + protein,
        carbs: prev.todayLog.carbs + carbs,
        fats: prev.todayLog.fats + fats,
      },
    }));
  };

  const toggleExercise = (exerciseId: string) => {
    setData(prev => {
      const completed = prev.todayLog.completedExercises;
      const newCompleted = completed.includes(exerciseId)
        ? completed.filter(id => id !== exerciseId)
        : [...completed, exerciseId];
      return {
        ...prev,
        todayLog: { ...prev.todayLog, completedExercises: newCompleted },
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

  const updateScheduledWorkout = (date: string, exercises: SessionExercise[]) => {
    setData(prev => ({
      ...prev,
      scheduledWorkouts: prev.scheduledWorkouts.map(w =>
        w.date === date ? { ...w, exercises } : w
      ),
    }));
  };

  const saveCalorieHistory = () => {
    setData(prev => {
      const history = [...prev.calorieHistory];
      const existing = history.findIndex(h => h.date === getTodayStr());
      if (existing >= 0) {
        history[existing].calories = prev.todayLog.calories;
      } else {
        history.push({ date: getTodayStr(), calories: prev.todayLog.calories });
      }
      return { ...prev, calorieHistory: history.slice(-30) };
    });
  };

  // Auto-save calorie history on changes
  useEffect(() => {
    if (data.todayLog.calories > 0) {
      saveCalorieHistory();
    }
  }, [data.todayLog.calories]);

  const resetData = () => {
    setData(defaultData);
    localStorage.removeItem('fitcoach_data');
  };

  return {
    data,
    updateProfile,
    addCalories,
    addMealEntry,
    updateMealEntry,
    toggleExercise,
    addWeight,
    scheduleWorkout,
    updateScheduledWorkout,
    resetData,
  };
}
