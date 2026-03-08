import type { Meal } from '@/data/meals';
import { Cherry, Egg, Wheat, Fish, Beef, Flame, GlassWater, Moon, CakeSlice, Cookie, X, ChefHat } from 'lucide-react';
import MacroBar from './MacroBar';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cherry, Egg, Wheat, Fish, Beef, Flame, GlassWater, Moon, CakeSlice, Cookie,
};

interface RecipeDetailProps {
  meal: Meal;
  onClose: () => void;
}

const RecipeDetail = ({ meal, onClose }: RecipeDetailProps) => {
  const Icon = iconMap[meal.icon] || Cherry;
  const totalMacroG = meal.protein + meal.carbs + meal.fats;

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto animate-slide-up">
      <div className="max-w-lg mx-auto px-5 pt-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onClose}
            className="haptic-press w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
          <span className="text-xs text-muted-foreground font-display uppercase tracking-wider">{meal.category}</span>
        </div>

        {/* Hero */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold leading-tight">{meal.name}</h1>
            <p className="text-muted-foreground text-sm mt-0.5">{meal.calories} kcal per serving</p>
          </div>
        </div>

        {/* Macro Cards */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[
            { label: 'Calories', value: `${meal.calories}`, unit: 'kcal', color: 'hsl(73, 100%, 60%)' },
            { label: 'Protein', value: `${meal.protein}`, unit: 'g', color: 'hsl(200, 100%, 60%)' },
            { label: 'Carbs', value: `${meal.carbs}`, unit: 'g', color: 'hsl(45, 100%, 60%)' },
            { label: 'Fats', value: `${meal.fats}`, unit: 'g', color: 'hsl(0, 80%, 60%)' },
          ].map(m => (
            <div key={m.label} className="glass-surface rounded-xl p-3 text-center">
              <div className="font-display font-bold text-lg" style={{ color: m.color }}>{m.value}</div>
              <div className="text-[10px] text-muted-foreground">{m.unit}</div>
              <div className="text-[9px] text-muted-foreground mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Macro Bars */}
        <div className="glass-surface rounded-2xl p-4 mb-6 space-y-2">
          <MacroBar label="Protein" value={meal.protein} max={totalMacroG} color="hsl(200, 100%, 60%)" />
          <MacroBar label="Carbs" value={meal.carbs} max={totalMacroG} color="hsl(45, 100%, 60%)" />
          <MacroBar label="Fats" value={meal.fats} max={totalMacroG} color="hsl(0, 80%, 60%)" />
        </div>

        {/* Ingredients */}
        <div className="mb-6">
          <h2 className="font-display font-semibold text-base mb-3 flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
              <ChefHat className="w-3.5 h-3.5 text-primary" />
            </div>
            Ingredients
          </h2>
          <div className="glass-surface rounded-2xl p-4">
            <ul className="space-y-2.5">
              {meal.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-3 font-recipe text-sm leading-relaxed text-foreground/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {ing}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions */}
        <div>
          <h2 className="font-display font-semibold text-base mb-3">Instructions</h2>
          <div className="glass-surface rounded-2xl p-4">
            <ol className="space-y-4">
              {meal.instructions.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 font-display font-bold text-xs text-primary">
                    {i + 1}
                  </span>
                  <p className="font-recipe text-sm leading-relaxed text-foreground/90 pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
