const surveyData = {
  selectOpt: {
    mealCount: [
      { val: 3, text: "Three" },
      { val: 5, text: "Five" },
      { val: 2, text: "Two" },
    ],
    planType: [
      { val: 7, text: "Weekly" },
      { val: 30, text: "Monthly" },
    ],
  },
  dietSpec: [
    { name: "balanced", text: "Balanced Diet (Recommended)" },
    {
      name: "low-carb",
      text: "Low-Carb (Less than 20% of total calories from carbs)",
    },
    {
      name: "low-fat",
      text: "Low-Fat (Less than 15% of total calories from fat)",
    },
  ],
  healthSpec: [
    {
      name: "vegan",
      text: "Vegan (No meat, poultry, fish, dairy, eggs or honey)",
    },
    {
      name: "vegetarian",
      text: "Vegetarian (No wheat, can have gluten though)",
    },
    {
      name: "alcohol-free",
      text: "Alcohol-free (No alcohol used or contained)",
    },
    {
      name: "peanut-free",
      text: "Peanut Free (No peanuts or products containing peanuts)",
    },
  ],
  mealTypes: {
    3: ["Breakfast", "Lunch", "Dinner"],
    5: ["Breakfast Snack", "Breakfast", "Lunch", "Afternoon Snack", "Dinner"],
    2: ["Brunch", "Dinner"],
  },
  calories: {
    min: 1800,
    max: 2500,
  },
};
const API = {
  ID: "42733a5f",
  KEY: "b422d0387bdb76fb89992362b0667245",
  URL: "https://api.edamam.com/search?",
};
export { surveyData as Survey, API };
