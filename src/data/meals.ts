export interface Meal {
  id: string;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  icon: string;
}

export const mealCategories = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Shake'];

export const meals: Meal[] = [
  // Breakfast
  { id: 'm1', name: 'Greek Yogurt & Berries', category: 'Breakfast', calories: 220, protein: 20, carbs: 25, fats: 5, icon: 'Cherry' },
  { id: 'm2', name: 'Egg White Omelette', category: 'Breakfast', calories: 180, protein: 28, carbs: 4, fats: 6, icon: 'Egg' },
  { id: 'm3', name: 'Overnight Protein Oats', category: 'Breakfast', calories: 380, protein: 30, carbs: 45, fats: 8, icon: 'Wheat' },
  { id: 'm4', name: 'Avocado Toast + Eggs', category: 'Breakfast', calories: 420, protein: 22, carbs: 35, fats: 22, icon: 'Egg' },
  { id: 'm5', name: 'Protein Pancakes', category: 'Breakfast', calories: 350, protein: 32, carbs: 38, fats: 6, icon: 'CakeSlice' },
  { id: 'm6', name: 'Turkey Bacon Wrap', category: 'Breakfast', calories: 310, protein: 28, carbs: 22, fats: 12, icon: 'Beef' },
  { id: 'm7', name: 'Cottage Cheese Bowl', category: 'Breakfast', calories: 200, protein: 24, carbs: 10, fats: 6, icon: 'Cherry' },
  { id: 'm8', name: 'Smoothie Bowl', category: 'Breakfast', calories: 340, protein: 26, carbs: 42, fats: 8, icon: 'Cherry' },
  // Lunch
  { id: 'm9', name: 'Grilled Chicken Salad', category: 'Lunch', calories: 380, protein: 42, carbs: 12, fats: 18, icon: 'Salad' },
  { id: 'm10', name: 'Turkey & Quinoa Bowl', category: 'Lunch', calories: 450, protein: 38, carbs: 45, fats: 12, icon: 'Beef' },
  { id: 'm11', name: 'Tuna Poke Bowl', category: 'Lunch', calories: 410, protein: 36, carbs: 40, fats: 10, icon: 'Fish' },
  { id: 'm12', name: 'Chicken Burrito Bowl', category: 'Lunch', calories: 520, protein: 42, carbs: 52, fats: 14, icon: 'Beef' },
  { id: 'm13', name: 'Lentil Soup', category: 'Lunch', calories: 320, protein: 22, carbs: 42, fats: 6, icon: 'Soup' },
  { id: 'm14', name: 'Steak & Sweet Potato', category: 'Lunch', calories: 550, protein: 45, carbs: 40, fats: 20, icon: 'Beef' },
  { id: 'm15', name: 'Shrimp Stir-Fry', category: 'Lunch', calories: 380, protein: 34, carbs: 32, fats: 10, icon: 'Fish' },
  { id: 'm16', name: 'Salmon Rice Bowl', category: 'Lunch', calories: 480, protein: 38, carbs: 42, fats: 16, icon: 'Fish' },
  // Dinner
  { id: 'm17', name: 'Grilled Salmon + Veggies', category: 'Dinner', calories: 450, protein: 40, carbs: 15, fats: 24, icon: 'Fish' },
  { id: 'm18', name: 'Chicken Breast & Rice', category: 'Dinner', calories: 480, protein: 45, carbs: 48, fats: 8, icon: 'Beef' },
  { id: 'm19', name: 'Lean Beef Stir-Fry', category: 'Dinner', calories: 420, protein: 38, carbs: 30, fats: 16, icon: 'Beef' },
  { id: 'm20', name: 'Baked Cod & Asparagus', category: 'Dinner', calories: 320, protein: 36, carbs: 12, fats: 14, icon: 'Fish' },
  { id: 'm21', name: 'Turkey Meatballs + Pasta', category: 'Dinner', calories: 520, protein: 40, carbs: 55, fats: 12, icon: 'Beef' },
  { id: 'm22', name: 'Tofu Teriyaki Bowl', category: 'Dinner', calories: 400, protein: 28, carbs: 45, fats: 12, icon: 'Wheat' },
  { id: 'm23', name: 'Chicken Tikka Masala', category: 'Dinner', calories: 480, protein: 38, carbs: 35, fats: 18, icon: 'Flame' },
  { id: 'm24', name: 'Pork Tenderloin + Greens', category: 'Dinner', calories: 380, protein: 36, carbs: 10, fats: 20, icon: 'Beef' },
  // Snacks
  { id: 'm25', name: 'Protein Bar', category: 'Snack', calories: 220, protein: 20, carbs: 24, fats: 8, icon: 'Cookie' },
  { id: 'm26', name: 'Almonds (30g)', category: 'Snack', calories: 170, protein: 6, carbs: 6, fats: 15, icon: 'Nut' },
  { id: 'm27', name: 'Beef Jerky', category: 'Snack', calories: 160, protein: 24, carbs: 6, fats: 4, icon: 'Beef' },
  { id: 'm28', name: 'Rice Cakes + PB', category: 'Snack', calories: 200, protein: 8, carbs: 22, fats: 10, icon: 'Cookie' },
  { id: 'm29', name: 'Hard Boiled Eggs (2)', category: 'Snack', calories: 140, protein: 12, carbs: 1, fats: 10, icon: 'Egg' },
  { id: 'm30', name: 'Edamame (1 cup)', category: 'Snack', calories: 190, protein: 18, carbs: 14, fats: 8, icon: 'Wheat' },
  { id: 'm31', name: 'Banana + Almond Butter', category: 'Snack', calories: 250, protein: 6, carbs: 32, fats: 12, icon: 'Cherry' },
  { id: 'm32', name: 'Turkey Roll-Ups', category: 'Snack', calories: 120, protein: 18, carbs: 2, fats: 4, icon: 'Beef' },
  // Shakes
  { id: 'm33', name: 'Whey Protein Shake', category: 'Shake', calories: 150, protein: 30, carbs: 4, fats: 2, icon: 'GlassWater' },
  { id: 'm34', name: 'Mass Gainer Shake', category: 'Shake', calories: 650, protein: 50, carbs: 80, fats: 12, icon: 'GlassWater' },
  { id: 'm35', name: 'Green Protein Smoothie', category: 'Shake', calories: 280, protein: 28, carbs: 30, fats: 6, icon: 'GlassWater' },
  { id: 'm36', name: 'Casein Night Shake', category: 'Shake', calories: 160, protein: 28, carbs: 6, fats: 3, icon: 'Moon' },
  { id: 'm37', name: 'BCAA Recovery Drink', category: 'Shake', calories: 40, protein: 8, carbs: 2, fats: 0, icon: 'GlassWater' },
  { id: 'm38', name: 'Peanut Butter Shake', category: 'Shake', calories: 450, protein: 35, carbs: 30, fats: 22, icon: 'GlassWater' },
  { id: 'm39', name: 'Berry Blast Smoothie', category: 'Shake', calories: 260, protein: 26, carbs: 32, fats: 4, icon: 'Cherry' },
  { id: 'm40', name: 'Chocolate Oat Shake', category: 'Shake', calories: 380, protein: 32, carbs: 42, fats: 8, icon: 'GlassWater' },
];
