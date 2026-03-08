import { useState } from 'react';
import { meals, mealCategories } from '@/data/meals';
import { Search, Plus, Cherry, Egg, Wheat, Fish, Beef, Flame, GlassWater, Moon, CakeSlice, Cookie, Pencil, Target } from 'lucide-react';
import type { Meal } from '@/data/meals';
import type { MealEntry, DailyLog, UserProfile } from '@/hooks/useAppData';
import { calculateMacros } from '@/hooks/useAppData';
import MacroBar from '@/components/MacroBar';
import DateScroller from '@/components/DateScroller';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cherry, Egg, Wheat, Fish, Beef, Flame, GlassWater, Moon, CakeSlice, Cookie,
};

type MealSlot = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
const mealSlots: MealSlot[] = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

interface MealsPageProps {
  profile: UserProfile;
  selectedDate: string;
  onSelectDate: (date: string) => void;
  dayLog: DailyLog;
  onAddMeal: (entry: Omit<MealEntry, 'id' | 'timestamp'>) => void;
  onUpdateMeal: (entryId: string, updates: { calories: number; protein: number; carbs: number; fats: number }) => void;
}

const MealsPage = ({ profile, selectedDate, onSelectDate, dayLog, onAddMeal, onUpdateMeal }: MealsPageProps) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const [slotPicker, setSlotPicker] = useState<Meal | null>(null);
  const [editEntry, setEditEntry] = useState<MealEntry | null>(null);
  const [editValues, setEditValues] = useState({ calories: 0, protein: 0, carbs: 0, fats: 0 });

  const macros = calculateMacros(profile);

  const filtered = meals.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === 'All' || m.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const handleSelectSlot = (slot: MealSlot) => {
    if (!slotPicker) return;
    onAddMeal({
      mealId: slotPicker.id,
      name: slotPicker.name,
      slot,
      calories: slotPicker.calories,
      protein: slotPicker.protein,
      carbs: slotPicker.carbs,
      fats: slotPicker.fats,
    });
    setAddedIds(prev => new Set([...prev, slotPicker.id]));
    setSlotPicker(null);
    setTimeout(() => {
      setAddedIds(prev => {
        const next = new Set(prev);
        next.delete(slotPicker!.id);
        return next;
      });
    }, 1500);
  };

  const openEdit = (entry: MealEntry) => {
    setEditEntry(entry);
    setEditValues({ calories: entry.calories, protein: entry.protein, carbs: entry.carbs, fats: entry.fats });
  };

  const saveEdit = () => {
    if (!editEntry) return;
    onUpdateMeal(editEntry.id, editValues);
    setEditEntry(null);
  };

  const groupedMeals = mealSlots.reduce((acc, slot) => {
    acc[slot] = (dayLog.mealEntries || []).filter(e => e.slot === slot);
    return acc;
  }, {} as Record<MealSlot, MealEntry[]>);

  const hasMeals = (dayLog.mealEntries || []).length > 0;
  const dateLabel = new Date(selectedDate + 'T12:00:00').toLocaleDateString('en', { month: 'short', day: 'numeric' });

  return (
    <div className="px-5 pt-6 pb-24 safe-top">
      <div className="mb-4 animate-slide-up">
        <h1 className="font-display text-2xl font-bold mb-1">Meals</h1>
        <p className="text-muted-foreground text-sm">Track nutrition for {dateLabel}</p>
      </div>

      {/* Date Scroller */}
      <div className="mb-4">
        <DateScroller selectedDate={selectedDate} onSelectDate={onSelectDate} />
      </div>

      <div key={selectedDate} className="animate-slide-up">
        {/* Daily Totals */}
        <div className="glass-surface rounded-2xl p-4 mb-5">
          <h3 className="font-display font-semibold text-sm flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-primary" />
            {dateLabel} Progress
          </h3>
          <div className="grid grid-cols-4 gap-2 mb-3">
            <div className="text-center">
              <div className="font-display font-bold text-sm neon-text">{dayLog.calories}</div>
              <div className="text-[9px] text-muted-foreground">/{macros.calories} cal</div>
            </div>
            <div className="text-center">
              <div className="font-display font-bold text-sm">{dayLog.protein}g</div>
              <div className="text-[9px] text-muted-foreground">/{macros.protein}g P</div>
            </div>
            <div className="text-center">
              <div className="font-display font-bold text-sm">{dayLog.carbs}g</div>
              <div className="text-[9px] text-muted-foreground">/{macros.carbs}g C</div>
            </div>
            <div className="text-center">
              <div className="font-display font-bold text-sm">{dayLog.fats}g</div>
              <div className="text-[9px] text-muted-foreground">/{macros.fats}g F</div>
            </div>
          </div>
          <MacroBar label="Calories" value={dayLog.calories} max={macros.calories} color="hsl(73, 100%, 60%)" />
        </div>

        {/* Today's Logged Meals */}
        {hasMeals && (
          <div className="mb-5 space-y-3">
            {mealSlots.map(slot => {
              const entries = groupedMeals[slot];
              if (entries.length === 0) return null;
              return (
                <div key={slot}>
                  <div className="text-xs text-muted-foreground font-display font-semibold mb-2">{slot}</div>
                  {entries.map(entry => (
                    <div key={entry.id} className="glass-surface rounded-xl p-3 flex items-center gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-display font-semibold text-sm truncate">{entry.name}</div>
                        <div className="text-muted-foreground text-[10px]">
                          {entry.calories} cal · P{entry.protein}g · C{entry.carbs}g · F{entry.fats}g
                        </div>
                      </div>
                      <button onClick={() => openEdit(entry)} className="haptic-press w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                        <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search meals..." className="w-full h-12 rounded-2xl bg-muted pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary transition-all" />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 -mx-5 px-5">
          {['All', ...mealCategories].map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`haptic-press whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
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
              <div key={meal.id} className="glass-surface rounded-2xl p-4 flex items-center gap-3 animate-slide-up" style={{ animationDelay: `${index * 30}ms` }}>
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-semibold text-sm truncate">{meal.name}</div>
                  <div className="text-muted-foreground text-[10px]">{meal.calories} cal · P{meal.protein}g · C{meal.carbs}g · F{meal.fats}g</div>
                </div>
                <button onClick={() => setSlotPicker(meal)} className={`haptic-press touch-target w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isAdded ? 'bg-primary text-primary-foreground scale-110' : 'bg-muted text-foreground'}`}>
                  <Plus className={`w-5 h-5 transition-transform ${isAdded ? 'rotate-45' : ''}`} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slot Picker Dialog */}
      <Dialog open={!!slotPicker} onOpenChange={() => setSlotPicker(null)}>
        <DialogContent className="glass-surface border-border rounded-2xl max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="font-display">Add to meal</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">When are you having {slotPicker?.name}?</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 py-2">
            {mealSlots.map(slot => (
              <button key={slot} onClick={() => handleSelectSlot(slot)} className="haptic-press touch-target h-14 rounded-xl bg-muted font-display font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all">
                {slot}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Macro Dialog */}
      <Dialog open={!!editEntry} onOpenChange={() => setEditEntry(null)}>
        <DialogContent className="glass-surface border-border rounded-2xl max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="font-display">Edit Macros</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">Override {editEntry?.name} macros</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            {(['calories', 'protein', 'carbs', 'fats'] as const).map(field => (
              <div key={field}>
                <label className="text-xs text-muted-foreground capitalize mb-1 block">{field} {field !== 'calories' ? '(g)' : '(kcal)'}</label>
                <input type="number" value={editValues[field]} onChange={e => setEditValues(prev => ({ ...prev, [field]: Number(e.target.value) }))} className="w-full h-11 rounded-xl bg-muted px-4 text-sm font-display outline-none focus:ring-2 focus:ring-primary transition-all" />
              </div>
            ))}
          </div>
          <button onClick={saveEdit} className="haptic-press touch-target w-full h-12 rounded-xl bg-primary text-primary-foreground font-display font-semibold">
            Save Changes
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MealsPage;
