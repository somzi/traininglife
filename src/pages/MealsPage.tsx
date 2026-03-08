import { useState } from 'react';
import { meals, mealCategories } from '@/data/meals';
import { Search, Plus, Cherry, Egg, Wheat, Fish, Beef, Flame, GlassWater, Moon, CakeSlice, Cookie } from 'lucide-react';
import type { Meal } from '@/data/meals';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cherry, Egg, Wheat, Fish, Beef, Flame, GlassWater, Moon, CakeSlice, Cookie,
};

interface MealsPageProps {
  onQuickAdd: (cal: number, protein: number, carbs: number, fats: number) => void;
}

const MealsPage = ({ onQuickAdd }: MealsPageProps) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const filtered = meals.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === 'All' || m.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const handleQuickAdd = (meal: Meal) => {
    onQuickAdd(meal.calories, meal.protein, meal.carbs, meal.fats);
    setAddedIds(prev => new Set([...prev, meal.id]));
    setTimeout(() => {
      setAddedIds(prev => {
        const next = new Set(prev);
        next.delete(meal.id);
        return next;
      });
    }, 1500);
  };

  return (
    <div className="px-5 pt-6 pb-24 safe-top animate-slide-up">
      <h1 className="font-display text-2xl font-bold mb-1">Meals</h1>
      <p className="text-muted-foreground text-sm mb-5">Track your nutrition</p>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search meals..."
          className="w-full h-12 rounded-2xl bg-muted pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary transition-all"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 -mx-5 px-5">
        {['All', ...mealCategories].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`haptic-press whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Meal List */}
      <div className="space-y-3">
        {filtered.map((meal, index) => {
          const Icon = iconMap[meal.icon] || Cherry;
          const isAdded = addedIds.has(meal.id);
          return (
            <div
              key={meal.id}
              className="card-surface p-4 flex items-center gap-3 animate-slide-up"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display font-semibold text-sm truncate">{meal.name}</div>
                <div className="text-muted-foreground text-[10px]">
                  {meal.calories} cal · P{meal.protein}g · C{meal.carbs}g · F{meal.fats}g
                </div>
              </div>
              <button
                onClick={() => handleQuickAdd(meal)}
                className={`haptic-press touch-target w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isAdded ? 'bg-primary text-primary-foreground scale-110' : 'bg-muted text-foreground'
                }`}
              >
                <Plus className={`w-5 h-5 transition-transform ${isAdded ? 'rotate-45' : ''}`} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MealsPage;
