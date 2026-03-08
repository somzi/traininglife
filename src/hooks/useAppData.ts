import { useEffect, useState } from 'react';

export interface UserProfile {
  gender: 'male' | 'female';
  weight: number; // kg
  height: number; // cm
  age: number;
  goal: 'fat_loss' | 'muscle_gain';
  onboarded: boolean;
}

export interface DailyLog {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  completedExercises: string[];
}

export interface WeightEntry {
  date: string;
  weight: number;
}

export interface AppData {
  profile: UserProfile;
  todayLog: DailyLog;
  weightHistory: WeightEntry[];
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
});

const defaultData: AppData = {
  profile: defaultProfile,
  todayLog: defaultDailyLog(),
  weightHistory: [],
};

export function calculateTDEE(profile: UserProfile) {
  // Mifflin-St Jeor
  let bmr: number;
  if (profile.gender === 'male') {
    bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
  } else {
    bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
  }
  const tdee = bmr * 1.55; // moderate activity
  return Math.round(tdee);
}

export function calculateMacros(profile: UserProfile) {
  const tdee = calculateTDEE(profile);
  let calories: number;
  
  if (profile.goal === 'fat_loss') {
    calories = tdee - 500;
  } else {
    calories = tdee + 300;
  }

  const protein = Math.round(profile.weight * 2.2); // g
  const fats = Math.round((calories * 0.25) / 9); // g
  const carbs = Math.round((calories - protein * 4 - fats * 9) / 4); // g

  return { calories: Math.round(calories), protein, carbs, fats };
}

export function useAppData() {
  const [data, setData] = useState<AppData>(() => {
    try {
      const stored = localStorage.getItem('fitcoach_data');
      if (stored) {
        const parsed = JSON.parse(stored) as AppData;
        // Reset daily log if new day
        if (parsed.todayLog.date !== getTodayStr()) {
          parsed.todayLog = defaultDailyLog();
        }
        return parsed;
      }
    } catch {}
    return defaultData;
  });

  useEffect(() => {
    localStorage.setItem('fitcoach_data', JSON.stringify(data));
  }, [data]);

  const updateProfile = (profile: Partial<UserProfile>) => {
    setData(prev => ({ ...prev, profile: { ...prev.profile, ...profile } }));
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
      weightHistory: [
        ...prev.weightHistory.filter(w => w.date !== getTodayStr()),
        { date: getTodayStr(), weight },
      ],
    }));
  };

  const resetData = () => {
    setData(defaultData);
    localStorage.removeItem('fitcoach_data');
  };

  return { data, updateProfile, addCalories, toggleExercise, addWeight, resetData };
}
