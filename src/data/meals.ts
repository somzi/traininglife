export interface Meal {
  id: string;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  icon: string;
  ingredients: string[];
  instructions: string[];
}

export const mealCategories = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Shake'];

export const meals: Meal[] = [
  // Breakfast
  {
    id: 'm1', name: 'Greek Yogurt & Berries', category: 'Breakfast', calories: 220, protein: 20, carbs: 25, fats: 5, icon: 'Cherry',
    ingredients: ['200g Greek yogurt (0% fat)', '80g mixed berries', '1 tbsp honey', '15g granola'],
    instructions: ['Add Greek yogurt to a bowl.', 'Top with mixed berries and granola.', 'Drizzle honey over the top.', 'Serve immediately.'],
  },
  {
    id: 'm2', name: 'Egg White Omelette', category: 'Breakfast', calories: 180, protein: 28, carbs: 4, fats: 6, icon: 'Egg',
    ingredients: ['6 egg whites', '30g spinach', '20g bell pepper, diced', '15g feta cheese', 'Salt & pepper'],
    instructions: ['Whisk egg whites with salt and pepper.', 'Heat a non-stick pan over medium heat.', 'Pour in egg whites, cook for 2 minutes.', 'Add spinach, peppers, and feta on one half.', 'Fold and cook 1 more minute until set.'],
  },
  {
    id: 'm3', name: 'Overnight Protein Oats', category: 'Breakfast', calories: 380, protein: 30, carbs: 45, fats: 8, icon: 'Wheat',
    ingredients: ['60g rolled oats', '1 scoop whey protein', '200ml almond milk', '1 tbsp chia seeds', '½ banana, sliced'],
    instructions: ['Mix oats, protein powder, and chia seeds in a jar.', 'Pour in almond milk and stir well.', 'Refrigerate overnight (8+ hours).', 'Top with sliced banana before serving.'],
  },
  {
    id: 'm4', name: 'Avocado Toast + Eggs', category: 'Breakfast', calories: 420, protein: 22, carbs: 35, fats: 22, icon: 'Egg',
    ingredients: ['2 slices sourdough bread', '½ ripe avocado', '2 eggs', 'Red pepper flakes', 'Lemon juice', 'Salt & pepper'],
    instructions: ['Toast the sourdough until golden.', 'Mash avocado with lemon juice, salt, and pepper.', 'Spread avocado on toast.', 'Fry or poach eggs to your liking.', 'Place eggs on toast, sprinkle red pepper flakes.'],
  },
  {
    id: 'm5', name: 'Protein Pancakes', category: 'Breakfast', calories: 350, protein: 32, carbs: 38, fats: 6, icon: 'CakeSlice',
    ingredients: ['1 scoop whey protein', '1 banana', '2 egg whites', '40g oat flour', '½ tsp baking powder'],
    instructions: ['Blend all ingredients until smooth.', 'Heat a non-stick pan over medium-low heat.', 'Pour small circles of batter.', 'Flip when bubbles form on top (~2 min).', 'Cook another minute. Serve with berries.'],
  },
  {
    id: 'm6', name: 'Turkey Bacon Wrap', category: 'Breakfast', calories: 310, protein: 28, carbs: 22, fats: 12, icon: 'Beef',
    ingredients: ['1 large whole wheat tortilla', '3 slices turkey bacon', '2 scrambled egg whites', '15g cheddar cheese', 'Hot sauce (optional)'],
    instructions: ['Cook turkey bacon until crispy.', 'Scramble egg whites in the same pan.', 'Warm the tortilla for 15 seconds.', 'Layer bacon, eggs, and cheese.', 'Roll tightly and slice in half.'],
  },
  {
    id: 'm7', name: 'Cottage Cheese Bowl', category: 'Breakfast', calories: 200, protein: 24, carbs: 10, fats: 6, icon: 'Cherry',
    ingredients: ['200g low-fat cottage cheese', '50g pineapple chunks', '10g pumpkin seeds', 'Pinch of cinnamon'],
    instructions: ['Scoop cottage cheese into a bowl.', 'Add pineapple chunks on top.', 'Sprinkle with pumpkin seeds and cinnamon.', 'Mix lightly and enjoy.'],
  },
  {
    id: 'm8', name: 'Smoothie Bowl', category: 'Breakfast', calories: 340, protein: 26, carbs: 42, fats: 8, icon: 'Cherry',
    ingredients: ['1 frozen banana', '100g frozen mixed berries', '1 scoop protein powder', '100ml almond milk', '15g granola', '1 tbsp coconut flakes'],
    instructions: ['Blend banana, berries, protein powder, and milk until thick.', 'Pour into a bowl (should be very thick).', 'Top with granola and coconut flakes.', 'Add any extra fruit and serve immediately.'],
  },
  // Lunch
  {
    id: 'm9', name: 'Grilled Chicken Salad', category: 'Lunch', calories: 380, protein: 42, carbs: 12, fats: 18, icon: 'Salad',
    ingredients: ['180g chicken breast', '100g mixed greens', '50g cherry tomatoes', '30g cucumber', '20g feta', '1 tbsp olive oil', '1 tbsp lemon juice'],
    instructions: ['Season chicken with salt, pepper, and garlic powder.', 'Grill chicken 6-7 minutes per side until cooked through.', 'Slice chicken and let rest 3 minutes.', 'Toss greens with tomatoes, cucumber, and feta.', 'Top with chicken and drizzle with oil and lemon.'],
  },
  {
    id: 'm10', name: 'Turkey & Quinoa Bowl', category: 'Lunch', calories: 450, protein: 38, carbs: 45, fats: 12, icon: 'Beef',
    ingredients: ['150g ground turkey', '100g cooked quinoa', '50g black beans', '50g corn', '30g avocado', 'Lime juice', 'Cumin & paprika'],
    instructions: ['Cook ground turkey with cumin and paprika until browned.', 'Warm quinoa and layer in a bowl.', 'Top with turkey, black beans, and corn.', 'Add sliced avocado and squeeze lime over everything.'],
  },
  {
    id: 'm11', name: 'Tuna Poke Bowl', category: 'Lunch', calories: 410, protein: 36, carbs: 40, fats: 10, icon: 'Fish',
    ingredients: ['150g sushi-grade tuna, cubed', '120g sushi rice', '50g edamame', '30g cucumber', '1 tbsp soy sauce', '1 tsp sesame oil', 'Sesame seeds'],
    instructions: ['Cook sushi rice and let cool slightly.', 'Marinate tuna cubes in soy sauce and sesame oil for 10 minutes.', 'Build the bowl: rice base, then tuna.', 'Add edamame, sliced cucumber.', 'Garnish with sesame seeds and serve.'],
  },
  {
    id: 'm12', name: 'Chicken Burrito Bowl', category: 'Lunch', calories: 520, protein: 42, carbs: 52, fats: 14, icon: 'Beef',
    ingredients: ['180g chicken breast, diced', '100g brown rice', '60g black beans', '40g salsa', '30g corn', '20g sour cream', 'Chili powder & cumin'],
    instructions: ['Season chicken with chili powder and cumin. Sauté until golden.', 'Cook brown rice according to package.', 'Layer rice in bowl, then chicken.', 'Add beans, corn, and salsa.', 'Finish with a dollop of sour cream.'],
  },
  {
    id: 'm13', name: 'Lentil Soup', category: 'Lunch', calories: 320, protein: 22, carbs: 42, fats: 6, icon: 'Soup',
    ingredients: ['150g red lentils', '1 carrot, diced', '1 celery stalk, diced', '½ onion, diced', '2 cloves garlic', '500ml vegetable broth', 'Cumin & turmeric'],
    instructions: ['Sauté onion, carrot, and celery in a pot for 5 minutes.', 'Add garlic, cumin, and turmeric. Cook 1 minute.', 'Add lentils and broth. Bring to a boil.', 'Reduce heat and simmer 20-25 minutes until lentils are soft.', 'Blend partially for a creamy texture or serve chunky.'],
  },
  {
    id: 'm14', name: 'Steak & Sweet Potato', category: 'Lunch', calories: 550, protein: 45, carbs: 40, fats: 20, icon: 'Beef',
    ingredients: ['200g sirloin steak', '1 medium sweet potato', '50g broccoli', '1 tbsp olive oil', 'Garlic powder', 'Salt & pepper'],
    instructions: ['Preheat oven to 200°C. Cube sweet potato and roast for 25 minutes.', 'Season steak with garlic powder, salt, and pepper.', 'Sear steak in a hot pan 3-4 minutes per side for medium-rare.', 'Let steak rest 5 minutes, then slice.', 'Serve with roasted sweet potato and steamed broccoli.'],
  },
  {
    id: 'm15', name: 'Shrimp Stir-Fry', category: 'Lunch', calories: 380, protein: 34, carbs: 32, fats: 10, icon: 'Fish',
    ingredients: ['200g shrimp, peeled', '100g brown rice noodles', '50g snap peas', '50g bell pepper', '2 tbsp soy sauce', '1 tsp sesame oil', '1 clove garlic'],
    instructions: ['Cook rice noodles according to package. Drain.', 'Heat sesame oil in a wok over high heat.', 'Stir-fry shrimp until pink, about 3 minutes. Remove.', 'Stir-fry vegetables and garlic for 2 minutes.', 'Return shrimp, add noodles and soy sauce. Toss well.'],
  },
  {
    id: 'm16', name: 'Salmon Rice Bowl', category: 'Lunch', calories: 480, protein: 38, carbs: 42, fats: 16, icon: 'Fish',
    ingredients: ['150g salmon fillet', '120g jasmine rice', '50g edamame', '30g pickled ginger', '1 tbsp soy sauce', '1 tsp sriracha mayo'],
    instructions: ['Cook jasmine rice and let rest.', 'Season salmon with salt and pepper. Pan-sear skin-side down 4 minutes.', 'Flip and cook another 3 minutes.', 'Flake salmon over rice.', 'Add edamame, pickled ginger, and drizzle with soy sauce and sriracha mayo.'],
  },
  // Dinner
  {
    id: 'm17', name: 'Grilled Salmon + Veggies', category: 'Dinner', calories: 450, protein: 40, carbs: 15, fats: 24, icon: 'Fish',
    ingredients: ['180g salmon fillet', '100g asparagus', '80g zucchini', '1 tbsp olive oil', '1 lemon', 'Dill & garlic'],
    instructions: ['Preheat grill to medium-high.', 'Season salmon with dill, garlic, salt, and pepper.', 'Toss vegetables in olive oil.', 'Grill salmon 5 minutes per side.', 'Grill veggies alongside until charred.', 'Serve with a squeeze of fresh lemon.'],
  },
  {
    id: 'm18', name: 'Chicken Breast & Rice', category: 'Dinner', calories: 480, protein: 45, carbs: 48, fats: 8, icon: 'Beef',
    ingredients: ['200g chicken breast', '120g basmati rice', '50g steamed broccoli', '1 tsp olive oil', 'Garlic, paprika, salt'],
    instructions: ['Season chicken with paprika, garlic, and salt.', 'Sear in a hot pan with olive oil, 6 min per side.', 'Rest chicken 5 minutes before slicing.', 'Cook basmati rice according to package.', 'Plate rice, sliced chicken, and steamed broccoli.'],
  },
  {
    id: 'm19', name: 'Lean Beef Stir-Fry', category: 'Dinner', calories: 420, protein: 38, carbs: 30, fats: 16, icon: 'Beef',
    ingredients: ['180g lean beef strips', '100g jasmine rice', '50g broccoli', '50g bell pepper', '2 tbsp oyster sauce', '1 tsp sesame oil'],
    instructions: ['Marinate beef in oyster sauce for 15 minutes.', 'Cook rice according to package.', 'Heat sesame oil in a wok over high heat.', 'Stir-fry beef strips 3-4 minutes.', 'Add broccoli and bell pepper, cook 2 more minutes.', 'Serve over rice.'],
  },
  {
    id: 'm20', name: 'Baked Cod & Asparagus', category: 'Dinner', calories: 320, protein: 36, carbs: 12, fats: 14, icon: 'Fish',
    ingredients: ['180g cod fillet', '100g asparagus', '1 tbsp butter', '1 lemon', 'Parsley', 'Salt & pepper'],
    instructions: ['Preheat oven to 190°C.', 'Place cod on a baking sheet with asparagus.', 'Top cod with butter, lemon slices, and parsley.', 'Bake 15-18 minutes until fish flakes easily.', 'Season asparagus with salt and pepper. Serve hot.'],
  },
  {
    id: 'm21', name: 'Turkey Meatballs + Pasta', category: 'Dinner', calories: 520, protein: 40, carbs: 55, fats: 12, icon: 'Beef',
    ingredients: ['200g ground turkey', '100g whole wheat pasta', '80ml marinara sauce', '1 egg white', '20g breadcrumbs', 'Italian seasoning'],
    instructions: ['Mix turkey, egg white, breadcrumbs, and Italian seasoning.', 'Form into 8 meatballs.', 'Bake at 190°C for 18 minutes.', 'Cook pasta al dente and drain.', 'Toss pasta with marinara and top with meatballs.'],
  },
  {
    id: 'm22', name: 'Tofu Teriyaki Bowl', category: 'Dinner', calories: 400, protein: 28, carbs: 45, fats: 12, icon: 'Wheat',
    ingredients: ['200g firm tofu, cubed', '120g brown rice', '50g edamame', '40g shredded carrot', '3 tbsp teriyaki sauce', '1 tsp sesame seeds'],
    instructions: ['Press tofu for 15 minutes to remove moisture.', 'Pan-fry tofu cubes until golden on all sides.', 'Toss with teriyaki sauce.', 'Cook brown rice according to package.', 'Build bowl: rice, tofu, edamame, carrot.', 'Garnish with sesame seeds.'],
  },
  {
    id: 'm23', name: 'Chicken Tikka Masala', category: 'Dinner', calories: 480, protein: 38, carbs: 35, fats: 18, icon: 'Flame',
    ingredients: ['200g chicken breast, cubed', '100ml coconut milk', '80g basmati rice', '60ml tomato passata', 'Tikka spice blend', '½ onion, diced', '2 cloves garlic'],
    instructions: ['Marinate chicken in tikka spice and yogurt for 30 minutes.', 'Sauté onion and garlic until soft.', 'Add chicken and cook until browned.', 'Pour in tomato passata and coconut milk.', 'Simmer 15 minutes until sauce thickens.', 'Serve over basmati rice.'],
  },
  {
    id: 'm24', name: 'Pork Tenderloin + Greens', category: 'Dinner', calories: 380, protein: 36, carbs: 10, fats: 20, icon: 'Beef',
    ingredients: ['180g pork tenderloin', '100g mixed greens', '50g roasted cherry tomatoes', '1 tbsp olive oil', 'Rosemary & thyme', 'Balsamic glaze'],
    instructions: ['Season pork with rosemary, thyme, salt, and pepper.', 'Sear in a hot pan 3 minutes per side.', 'Transfer to oven at 190°C for 12 minutes.', 'Rest 5 minutes, then slice.', 'Plate over mixed greens with roasted tomatoes.', 'Drizzle with balsamic glaze.'],
  },
  // Snacks
  {
    id: 'm25', name: 'Protein Bar', category: 'Snack', calories: 220, protein: 20, carbs: 24, fats: 8, icon: 'Cookie',
    ingredients: ['1 protein bar (store-bought or homemade)'],
    instructions: ['Unwrap and enjoy!', 'For homemade: mix oats, protein powder, honey, and nut butter. Press into a pan and refrigerate 2 hours.'],
  },
  {
    id: 'm26', name: 'Almonds (30g)', category: 'Snack', calories: 170, protein: 6, carbs: 6, fats: 15, icon: 'Nut',
    ingredients: ['30g raw almonds'],
    instructions: ['Measure out a 30g portion.', 'Eat raw or toast in a dry pan for 3 minutes for extra flavor.'],
  },
  {
    id: 'm27', name: 'Beef Jerky', category: 'Snack', calories: 160, protein: 24, carbs: 6, fats: 4, icon: 'Beef',
    ingredients: ['50g lean beef jerky'],
    instructions: ['Portion out 50g of beef jerky.', 'Great as a grab-and-go high-protein snack.'],
  },
  {
    id: 'm28', name: 'Rice Cakes + PB', category: 'Snack', calories: 200, protein: 8, carbs: 22, fats: 10, icon: 'Cookie',
    ingredients: ['2 plain rice cakes', '1 tbsp peanut butter'],
    instructions: ['Spread peanut butter evenly on each rice cake.', 'Optional: drizzle honey or add banana slices.'],
  },
  {
    id: 'm29', name: 'Hard Boiled Eggs (2)', category: 'Snack', calories: 140, protein: 12, carbs: 1, fats: 10, icon: 'Egg',
    ingredients: ['2 large eggs'],
    instructions: ['Place eggs in a pot, cover with cold water.', 'Bring to a boil, then cover and remove from heat.', 'Let sit 10-12 minutes.', 'Transfer to ice water, peel, and enjoy with a pinch of salt.'],
  },
  {
    id: 'm30', name: 'Edamame (1 cup)', category: 'Snack', calories: 190, protein: 18, carbs: 14, fats: 8, icon: 'Wheat',
    ingredients: ['1 cup frozen edamame (in pods)', 'Sea salt'],
    instructions: ['Boil edamame for 4-5 minutes.', 'Drain and sprinkle with sea salt.', 'Squeeze pods to eat the beans.'],
  },
  {
    id: 'm31', name: 'Banana + Almond Butter', category: 'Snack', calories: 250, protein: 6, carbs: 32, fats: 12, icon: 'Cherry',
    ingredients: ['1 medium banana', '1 tbsp almond butter'],
    instructions: ['Slice banana into rounds.', 'Drizzle or dip in almond butter.', 'Optional: sprinkle chia seeds on top.'],
  },
  {
    id: 'm32', name: 'Turkey Roll-Ups', category: 'Snack', calories: 120, protein: 18, carbs: 2, fats: 4, icon: 'Beef',
    ingredients: ['4 slices deli turkey', '1 slice Swiss cheese', 'Mustard', 'Lettuce leaves'],
    instructions: ['Lay out turkey slices on a board.', 'Add a strip of cheese and lettuce.', 'Spread a thin line of mustard.', 'Roll up tightly and secure with a toothpick.'],
  },
  // Shakes
  {
    id: 'm33', name: 'Whey Protein Shake', category: 'Shake', calories: 150, protein: 30, carbs: 4, fats: 2, icon: 'GlassWater',
    ingredients: ['1 scoop whey protein', '250ml cold water or milk'],
    instructions: ['Add liquid to a shaker bottle.', 'Add protein powder.', 'Shake vigorously for 20 seconds.', 'Drink within 30 minutes of training.'],
  },
  {
    id: 'm34', name: 'Mass Gainer Shake', category: 'Shake', calories: 650, protein: 50, carbs: 80, fats: 12, icon: 'GlassWater',
    ingredients: ['2 scoops mass gainer', '1 banana', '2 tbsp oats', '300ml whole milk', '1 tbsp peanut butter'],
    instructions: ['Add all ingredients to a blender.', 'Blend on high for 30 seconds until smooth.', 'Pour into a large glass.', 'Best consumed post-workout or between meals.'],
  },
  {
    id: 'm35', name: 'Green Protein Smoothie', category: 'Shake', calories: 280, protein: 28, carbs: 30, fats: 6, icon: 'GlassWater',
    ingredients: ['1 scoop vanilla protein', '1 cup spinach', '½ banana', '½ cup mango chunks', '200ml almond milk'],
    instructions: ['Add spinach and almond milk to blender first.', 'Blend until smooth, then add remaining ingredients.', 'Blend for 30 seconds.', 'Pour and drink immediately for best nutrient retention.'],
  },
  {
    id: 'm36', name: 'Casein Night Shake', category: 'Shake', calories: 160, protein: 28, carbs: 6, fats: 3, icon: 'Moon',
    ingredients: ['1 scoop casein protein', '200ml cold water'],
    instructions: ['Mix casein with water in a shaker.', 'Shake for 30 seconds — it will be thicker than whey.', 'Drink 30 minutes before bed for slow-release protein.'],
  },
  {
    id: 'm37', name: 'BCAA Recovery Drink', category: 'Shake', calories: 40, protein: 8, carbs: 2, fats: 0, icon: 'GlassWater',
    ingredients: ['1 scoop BCAA powder', '400ml cold water', 'Ice cubes'],
    instructions: ['Add BCAA powder to a shaker or bottle.', 'Pour in cold water and add ice.', 'Shake well and sip during or after workout.'],
  },
  {
    id: 'm38', name: 'Peanut Butter Shake', category: 'Shake', calories: 450, protein: 35, carbs: 30, fats: 22, icon: 'GlassWater',
    ingredients: ['1 scoop chocolate protein', '2 tbsp peanut butter', '1 banana', '250ml milk', '1 tsp cocoa powder'],
    instructions: ['Add all ingredients to a blender.', 'Blend until creamy and smooth.', 'Pour into a tall glass.', 'Top with a drizzle of peanut butter if desired.'],
  },
  {
    id: 'm39', name: 'Berry Blast Smoothie', category: 'Shake', calories: 260, protein: 26, carbs: 32, fats: 4, icon: 'Cherry',
    ingredients: ['1 scoop berry or vanilla protein', '100g frozen mixed berries', '100ml orange juice', '100ml water'],
    instructions: ['Combine all ingredients in a blender.', 'Blend on high for 30 seconds.', 'Add more water if too thick.', 'Serve cold for a refreshing post-workout drink.'],
  },
  {
    id: 'm40', name: 'Chocolate Oat Shake', category: 'Shake', calories: 380, protein: 32, carbs: 42, fats: 8, icon: 'GlassWater',
    ingredients: ['1 scoop chocolate protein', '40g rolled oats', '1 banana', '250ml milk', '1 tsp honey'],
    instructions: ['Add oats to blender and pulse to a flour.', 'Add remaining ingredients and blend until smooth.', 'Pour into a glass.', 'Perfect as a meal replacement or post-workout shake.'],
  },
];
