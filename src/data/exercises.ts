export interface Exercise {
  id: string;
  name: string;
  muscle: string;
  sets: number;
  reps: string;
  icon: string; // lucide icon name
}

export const muscleGroups = ['Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core', 'Full Body'];

export const exercises: Exercise[] = [
  // Chest
  { id: 'e1', name: 'Barbell Bench Press', muscle: 'Chest', sets: 4, reps: '8-10', icon: 'Dumbbell' },
  { id: 'e2', name: 'Incline Dumbbell Press', muscle: 'Chest', sets: 3, reps: '10-12', icon: 'Dumbbell' },
  { id: 'e3', name: 'Cable Flyes', muscle: 'Chest', sets: 3, reps: '12-15', icon: 'Zap' },
  { id: 'e4', name: 'Push-Ups', muscle: 'Chest', sets: 3, reps: '15-20', icon: 'ArrowDown' },
  { id: 'e5', name: 'Dips', muscle: 'Chest', sets: 3, reps: '10-12', icon: 'ArrowDown' },
  // Back
  { id: 'e6', name: 'Deadlift', muscle: 'Back', sets: 4, reps: '5-6', icon: 'Dumbbell' },
  { id: 'e7', name: 'Pull-Ups', muscle: 'Back', sets: 4, reps: '8-12', icon: 'ArrowUp' },
  { id: 'e8', name: 'Barbell Rows', muscle: 'Back', sets: 4, reps: '8-10', icon: 'Dumbbell' },
  { id: 'e9', name: 'Lat Pulldown', muscle: 'Back', sets: 3, reps: '10-12', icon: 'ArrowDown' },
  { id: 'e10', name: 'Seated Cable Row', muscle: 'Back', sets: 3, reps: '10-12', icon: 'Zap' },
  // Shoulders
  { id: 'e11', name: 'Overhead Press', muscle: 'Shoulders', sets: 4, reps: '8-10', icon: 'Dumbbell' },
  { id: 'e12', name: 'Lateral Raises', muscle: 'Shoulders', sets: 3, reps: '12-15', icon: 'Zap' },
  { id: 'e13', name: 'Face Pulls', muscle: 'Shoulders', sets: 3, reps: '15-20', icon: 'Zap' },
  { id: 'e14', name: 'Arnold Press', muscle: 'Shoulders', sets: 3, reps: '10-12', icon: 'Dumbbell' },
  // Arms
  { id: 'e15', name: 'Barbell Curl', muscle: 'Arms', sets: 3, reps: '10-12', icon: 'Dumbbell' },
  { id: 'e16', name: 'Tricep Pushdown', muscle: 'Arms', sets: 3, reps: '12-15', icon: 'Zap' },
  { id: 'e17', name: 'Hammer Curls', muscle: 'Arms', sets: 3, reps: '10-12', icon: 'Dumbbell' },
  { id: 'e18', name: 'Skull Crushers', muscle: 'Arms', sets: 3, reps: '10-12', icon: 'Dumbbell' },
  { id: 'e19', name: 'Concentration Curls', muscle: 'Arms', sets: 3, reps: '12-15', icon: 'Dumbbell' },
  // Legs
  { id: 'e20', name: 'Barbell Squat', muscle: 'Legs', sets: 4, reps: '6-8', icon: 'Dumbbell' },
  { id: 'e21', name: 'Romanian Deadlift', muscle: 'Legs', sets: 4, reps: '8-10', icon: 'Dumbbell' },
  { id: 'e22', name: 'Leg Press', muscle: 'Legs', sets: 3, reps: '10-12', icon: 'Zap' },
  { id: 'e23', name: 'Walking Lunges', muscle: 'Legs', sets: 3, reps: '12/leg', icon: 'Footprints' },
  { id: 'e24', name: 'Leg Curl', muscle: 'Legs', sets: 3, reps: '12-15', icon: 'Zap' },
  { id: 'e25', name: 'Calf Raises', muscle: 'Legs', sets: 4, reps: '15-20', icon: 'Footprints' },
  // Core
  { id: 'e26', name: 'Plank Hold', muscle: 'Core', sets: 3, reps: '60s', icon: 'Timer' },
  { id: 'e27', name: 'Hanging Leg Raise', muscle: 'Core', sets: 3, reps: '12-15', icon: 'ArrowUp' },
  { id: 'e28', name: 'Cable Woodchop', muscle: 'Core', sets: 3, reps: '12/side', icon: 'Zap' },
  // Full Body
  { id: 'e29', name: 'Burpees', muscle: 'Full Body', sets: 3, reps: '15', icon: 'Flame' },
  { id: 'e30', name: 'Kettlebell Swings', muscle: 'Full Body', sets: 4, reps: '15-20', icon: 'Dumbbell' },
];
