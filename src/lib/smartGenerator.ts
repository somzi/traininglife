import { exercises, type Exercise } from '@/data/exercises';
import { meals, type Meal } from '@/data/meals';

/**
 * Smart Workout Generator
 * Picks 2-3 exercises per muscle group, prioritizing compound movements first.
 */
const compoundKeywords = ['bench', 'squat', 'deadlift', 'press', 'row', 'pull-up', 'dip', 'lunge'];

function isCompound(ex: Exercise): boolean {
  const lower = ex.name.toLowerCase();
  return compoundKeywords.some(k => lower.includes(k));
}

export function generateWorkout(muscleGroups: string[]) {
  const selected: Exercise[] = [];

  for (const group of muscleGroups) {
    const groupExercises = exercises.filter(e => e.muscle === group);
    const compounds = groupExercises.filter(isCompound);
    const isolations = groupExercises.filter(e => !isCompound(e));

    // Shuffle helper
    const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

    const shuffledCompounds = shuffle(compounds);
    const shuffledIsolations = shuffle(isolations);

    // Pick 1-2 compounds first, then fill to 2-3 total with isolations
    const picks: Exercise[] = [];
    const compoundCount = Math.min(shuffledCompounds.length, 2);
    picks.push(...shuffledCompounds.slice(0, compoundCount));

    const remaining = (compoundCount >= 2 ? 1 : 3 - compoundCount);
    picks.push(...shuffledIsolations.slice(0, Math.min(remaining, shuffledIsolations.length)));

    // If still under 2, fill with whatever's left
    if (picks.length < 2) {
      const usedIds = new Set(picks.map(p => p.id));
      const leftovers = groupExercises.filter(e => !usedIds.has(e.id));
      picks.push(...shuffle(leftovers).slice(0, 2 - picks.length));
    }

    selected.push(...picks);
  }

  return selected;
}

/**
 * Smart Meal Planner
 * Selects meals that best fit remaining macros for chosen slots.
 */
interface RemainingMacros {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const slotToCategoryMap: Record<string, string[]> = {
  Breakfast: ['Breakfast'],
  Lunch: ['Lunch'],
  Dinner: ['Dinner'],
  Snack: ['Snack', 'Shake'],
};

export function generateMealPlan(
  slots: string[],
  remaining: RemainingMacros
): { slot: string; meal: Meal }[] {
  const result: { slot: string; meal: Meal }[] = [];
  let budget = { ...remaining };

  // Distribute budget roughly equally across slots
  const perSlot = {
    calories: Math.max(0, Math.floor(budget.calories / slots.length)),
    protein: Math.max(0, Math.floor(budget.protein / slots.length)),
    carbs: Math.max(0, Math.floor(budget.carbs / slots.length)),
    fats: Math.max(0, Math.floor(budget.fats / slots.length)),
  };

  const usedMealIds = new Set<string>();

  for (const slot of slots) {
    const categories = slotToCategoryMap[slot] || [slot];
    const candidates = meals.filter(
      m => categories.includes(m.category) && !usedMealIds.has(m.id)
    );

    if (candidates.length === 0) continue;

    // Score each meal by how well it fits the per-slot budget
    // Weighted: protein match is most important
    const scored = candidates.map(m => {
      const calDiff = Math.abs(m.calories - perSlot.calories) / Math.max(perSlot.calories, 1);
      const protDiff = Math.abs(m.protein - perSlot.protein) / Math.max(perSlot.protein, 1);
      const carbDiff = Math.abs(m.carbs - perSlot.carbs) / Math.max(perSlot.carbs, 1);
      const fatDiff = Math.abs(m.fats - perSlot.fats) / Math.max(perSlot.fats, 1);

      // Penalize meals that exceed remaining budget
      const overCal = Math.max(0, m.calories - budget.calories) * 0.01;
      const overProt = Math.max(0, m.protein - budget.protein) * 0.02;

      const score = calDiff * 1 + protDiff * 2 + carbDiff * 0.8 + fatDiff * 0.8 + overCal + overProt;
      return { meal: m, score };
    });

    scored.sort((a, b) => a.score - b.score);
    const best = scored[0].meal;

    result.push({ slot, meal: best });
    usedMealIds.add(best.id);

    // Subtract from budget
    budget.calories = Math.max(0, budget.calories - best.calories);
    budget.protein = Math.max(0, budget.protein - best.protein);
    budget.carbs = Math.max(0, budget.carbs - best.carbs);
    budget.fats = Math.max(0, budget.fats - best.fats);
  }

  return result;
}
