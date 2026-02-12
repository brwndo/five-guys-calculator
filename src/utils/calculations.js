/**
 * Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @param {number} age - Age in years
 * @param {string} gender - 'male', 'female', or 'other'
 * @returns {number} BMR in calories per day
 */
export function calculateBMR(weight, height, age, gender) {
  // Mifflin-St Jeor Equation
  // Men: BMR = (10 × weight_kg) + (6.25 × height_cm) - (5 × age) + 5
  // Women: BMR = (10 × weight_kg) + (6.25 × height_cm) - (5 × age) - 161
  
  const baseBMR = (10 * weight) + (6.25 * height) - (5 * age);
  
  if (gender === 'male') {
    return baseBMR + 5;
  } else if (gender === 'female') {
    return baseBMR - 161;
  } else {
    // For 'other', return average of male and female
    return (baseBMR + 5 + baseBMR - 161) / 2;
  }
}

/**
 * Calculate TDEE (Total Daily Energy Expenditure)
 * @param {number} bmr - Basal Metabolic Rate
 * @param {string} activityLevel - Activity level key
 * @returns {number} TDEE in calories per day
 */
export function calculateTDEE(bmr, activityLevel) {
  const activityMultipliers = {
    sedentary: 1.2,         // Little or no exercise
    lightly: 1.375,         // Light exercise 1-3 days/week
    moderately: 1.55,       // Moderate exercise 3-5 days/week
    very: 1.725,            // Hard exercise 6-7 days/week
    extra: 1.9              // Physical job + exercise
  };
  
  return bmr * (activityMultipliers[activityLevel] || 1.2);
}

/**
 * Convert pounds to kilograms
 * @param {number} pounds
 * @returns {number} kilograms
 */
export function poundsToKg(pounds) {
  return pounds * 0.453592;
}

/**
 * Convert feet and inches to centimeters
 * @param {number} feet
 * @param {number} inches
 * @returns {number} centimeters
 */
export function feetInchesToCm(feet, inches) {
  const totalInches = (feet * 12) + inches;
  return totalInches * 2.54;
}

/**
 * Convert inches to centimeters
 * @param {number} inches
 * @returns {number} centimeters
 */
export function inchesToCm(inches) {
  return inches * 2.54;
}

/**
 * Calculate daily caloric delta: positive = deficit (cut), negative = surplus (bulk).
 * Same formula for both: (currentWeight - targetWeight) * 7700 / days.
 * Pass result into calculateBurgerFrequency as-is (weeklyBudget = 7 * (tdee - dailyDelta)).
 * @param {number} currentWeight - in kg
 * @param {number} targetWeight - in kg
 * @param {number} weeks - timeframe in weeks
 * @returns {number} daily caloric deficit (positive for cut) or negative of surplus (negative for bulk)
 */
export function calculateDailyCalorieDelta(currentWeight, targetWeight, weeks) {
  const weightDelta = currentWeight - targetWeight;
  // 1 kg of fat ≈ 7700 calories
  const totalCalories = weightDelta * 7700;
  const days = weeks * 7;
  return totalCalories / days;
}

/**
 * @deprecated Use calculateDailyCalorieDelta instead (same result for cut; bulk uses negative delta).
 */
export function calculateDailyDeficit(currentWeight, targetWeight, weeks) {
  return calculateDailyCalorieDelta(currentWeight, targetWeight, weeks);
}

/**
 * Calculate burger frequency and related metrics
 * @param {number} tdee - Total Daily Energy Expenditure
 * @param {number} dailyDeficit - Daily caloric deficit
 * @param {number} mealCalories - Total calories in the burger meal
 * @param {number} weeks - Total weeks in the plan
 * @returns {object} Results including burgers per week, total burgers, and remaining calories
 */
export function calculateBurgerFrequency(tdee, dailyDeficit, mealCalories, weeks) {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/471ef067-e2fe-4887-9652-a1160cbdd17b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'calculations.js:calculateBurgerFrequency',message:'inputs',data:{tdee, dailyDeficit, mealCalories, weeks, tdeeType:typeof tdee, dailyDeficitType:typeof dailyDeficit, mealCaloriesType:typeof mealCalories},timestamp:Date.now(),hypothesisId:'H1_H3'})}).catch(()=>{});
  // #endregion
  // Weekly calorie budget to still hit the target deficit: (TDEE - deficit) per day × 7
  const weeklyBudget = 7 * (tdee - dailyDeficit);
  // Only "meal too big" when budget is positive and meal exceeds it; avoid flagging when plan is impossible (budget <= 0)
  const mealTooBig = weeklyBudget > 0 && mealCalories > weeklyBudget;
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/471ef067-e2fe-4887-9652-a1160cbdd17b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'calculations.js:calculateBurgerFrequency',message:'weeklyBudget and comparison',data:{weeklyBudget, mealTooBig, dailyTargetIntake: tdee - dailyDeficit, runId:'post-fix'},timestamp:Date.now(),hypothesisId:'H2_H4_H5'})}).catch(()=>{});
  // #endregion

  let mealsPerWeek;
  let weeklyMealCalories;
  let remainingCaloriesPerWeek;

  if (mealTooBig || mealCalories <= 0 || weeklyBudget <= 0) {
    mealsPerWeek = 0;
    weeklyMealCalories = 0;
    remainingCaloriesPerWeek = Math.max(0, Math.round(weeklyBudget));
  } else {
    mealsPerWeek = Math.max(0, Math.floor(weeklyBudget / mealCalories));
    weeklyMealCalories = mealsPerWeek * mealCalories;
    remainingCaloriesPerWeek = Math.max(0, weeklyBudget - weeklyMealCalories);
  }

  const totalBurgers = Math.max(0, Math.floor(mealsPerWeek * weeks));
  const dailyRemaining = remainingCaloriesPerWeek / 7;

  return {
    burgersPerWeek: mealsPerWeek,
    totalBurgers,
    remainingCaloriesPerWeek: Math.round(remainingCaloriesPerWeek),
    dailyRemaining: Math.round(dailyRemaining),
    daysPerBurger: mealsPerWeek > 0 ? 7 / mealsPerWeek : 0,
    mealTooBig,
    weeklyTargetCalories: Math.max(0, Math.round(weeklyBudget)),
    weeklyMealCalories
  };
}

/**
 * Validate plan for cut or bulk. dailyDelta: positive = deficit (cut), negative = surplus (bulk).
 * @param {number} tdee - Total Daily Energy Expenditure
 * @param {number} dailyDelta - Daily caloric deficit (positive) or negative of surplus (negative)
 * @param {string} goal - 'lose' (cut) or 'gain' (bulk)
 * @param {string} gender - User's gender
 * @returns {object} Validation result with warnings and dailyIntake
 */
export function validatePlan(tdee, dailyDelta, goal, gender) {
  const warnings = [];
  const minIntakeMale = 1500;
  const minIntakeFemale = 1200;
  const maxDeficit = 1000; // Maximum recommended daily deficit (2 lbs/week)
  const maxSurplus = 500;  // Maximum recommended daily surplus for lean gain

  const dailyIntake = tdee - dailyDelta;
  const minIntake = gender === 'female' ? minIntakeFemale : minIntakeMale;

  if (goal === 'lose' || dailyDelta > 0) {
    // Cut: dailyDelta is positive (deficit)
    if (dailyDelta > maxDeficit) {
      warnings.push({
        type: 'aggressive',
        message: `Your daily deficit of ${Math.round(dailyDelta)} calories exceeds the recommended maximum of ${maxDeficit} calories per day. This may not be sustainable or healthy.`,
        severity: 'high'
      });
    }
    if (dailyIntake < minIntake) {
      warnings.push({
        type: 'low-intake',
        message: `Your daily calorie intake would be ${Math.round(dailyIntake)} calories, which is below the recommended minimum of ${minIntake} calories. This could lead to nutritional deficiencies.`,
        severity: 'high'
      });
    }
    if (dailyDelta > 0 && dailyDelta < 200) {
      warnings.push({
        type: 'slow',
        message: `Your daily deficit of ${Math.round(dailyDelta)} calories is quite small. Weight loss will be very gradual, which is fine, but be patient!`,
        severity: 'low'
      });
    }
  } else if (goal === 'gain' || dailyDelta < 0) {
    // Bulk: dailyDelta is negative; surplus = -dailyDelta
    const surplus = -dailyDelta;
    if (surplus > maxSurplus) {
      warnings.push({
        type: 'aggressive-surplus',
        message: `Your daily surplus of ${Math.round(surplus)} calories exceeds the recommended maximum of ${maxSurplus} calories per day. Gaining too fast may add more fat than muscle.`,
        severity: 'high'
      });
    }
  }

  const isRealistic = warnings.filter(w => w.severity === 'high').length === 0;

  return {
    isRealistic,
    warnings,
    dailyIntake: Math.round(dailyIntake)
  };
}

/**
 * @deprecated Use validatePlan(tdee, dailyDelta, goal, gender) instead.
 */
export function validateWeightLossPlan(tdee, dailyDeficit, gender) {
  return validatePlan(tdee, dailyDeficit, 'lose', gender);
}

/**
 * Generate trade-off scenarios for different meal combinations
 * @param {number} tdee - Total Daily Energy Expenditure
 * @param {number} dailyDeficit - Daily caloric deficit
 * @param {number} weeks - Total weeks in the plan
 * @param {object} currentMeal - Currently selected meal configuration
 * @returns {array} Array of trade-off scenarios
 */
export function generateTradeoffs(tdee, dailyDeficit, weeks, currentMeal) {
  const tradeoffs = [];
  
  // Calculate current meal scenario
  const current = calculateBurgerFrequency(tdee, dailyDeficit, currentMeal.totalCalories, weeks);
  tradeoffs.push({
    ...currentMeal,
    ...current,
    label: 'Your Current Selection',
    isCurrent: true
  });
  
  // Scenario 1: Just the burger (no sides)
  if (currentMeal.fries > 0 || currentMeal.drink > 0 || currentMeal.shake > 0) {
    const burgerOnlyCalories = currentMeal.burger + currentMeal.toppings;
    const burgerOnly = calculateBurgerFrequency(tdee, dailyDeficit, burgerOnlyCalories, weeks);
    tradeoffs.push({
      burger: currentMeal.burger,
      toppings: currentMeal.toppings,
      fries: 0,
      drink: 0,
      shake: 0,
      totalCalories: burgerOnlyCalories,
      ...burgerOnly,
      label: 'Just the Burger',
      description: 'Skip the sides, burger more often'
    });
  }
  
  // Scenario 2: Add small fries if not selected
  if (currentMeal.fries === 0) {
    const withLittleFries = currentMeal.totalCalories + 526; // Little Fries
    const result = calculateBurgerFrequency(tdee, dailyDeficit, withLittleFries, weeks);
    tradeoffs.push({
      ...currentMeal,
      fries: 526,
      totalCalories: withLittleFries,
      ...result,
      label: 'Add Little Fries',
      description: 'Treat yourself, slightly less often'
    });
  }
  
  // Scenario 3: Upgrade to regular fries if currently small
  if (currentMeal.fries === 526) {
    const withRegularFries = currentMeal.totalCalories - 526 + 953; // Regular Fries
    const result = calculateBurgerFrequency(tdee, dailyDeficit, withRegularFries, weeks);
    tradeoffs.push({
      ...currentMeal,
      fries: 953,
      totalCalories: withRegularFries,
      ...result,
      label: 'Upgrade to Regular Fries',
      description: 'Go bigger, less frequently'
    });
  }
  
  // Scenario 4: Add a shake if not selected
  if (currentMeal.shake === 0 && tradeoffs.length < 4) {
    const withShake = currentMeal.totalCalories + 670; // Vanilla shake
    const result = calculateBurgerFrequency(tdee, dailyDeficit, withShake, weeks);
    tradeoffs.push({
      ...currentMeal,
      shake: 670,
      totalCalories: withShake,
      ...result,
      label: 'Add a Shake',
      description: 'Full experience, less often'
    });
  }
  
  return tradeoffs.slice(0, 4); // Return max 4 scenarios
}

/**
 * Format burger frequency for display
 * @param {number} burgersPerWeek
 * @returns {string} Formatted frequency text
 */
export function formatBurgerFrequency(burgersPerWeek) {
  if (burgersPerWeek >= 1) {
    return `${burgersPerWeek.toFixed(1)} times per week`;
  } else if (burgersPerWeek > 0) {
    const daysPerBurger = 7 / burgersPerWeek;
    return `Once every ${daysPerBurger.toFixed(1)} days`;
  } else {
    return 'Not achievable with current goals';
  }
}

/**
 * Get humorous message based on burger frequency and goal (cut or bulk)
 * @param {number} burgersPerWeek
 * @param {number} totalBurgers
 * @param {number} weeks
 * @param {boolean} [mealTooBig=false]
 * @param {string} [goal='lose'] - 'lose' (cut) or 'gain' (bulk)
 * @returns {string} Humorous message
 */
export function getHumorousMessage(burgersPerWeek, totalBurgers, weeks, mealTooBig = false, goal = 'lose') {
  const isBulk = goal === 'gain';

  if (mealTooBig) {
    return isBulk
      ? `Your meal is larger than your weekly budget. Try a smaller meal or a longer timeline.`
      : `Your meal is larger than your weekly budget. Try a smaller meal or a longer timeline.`;
  }
  if (burgersPerWeek >= 3) {
    return isBulk
      ? `Holy burger heaven! You can have Five Guys ${burgersPerWeek} times a week and STILL hit your gain goal. That's practically a lifestyle. 🍔`
      : `Holy burger heaven! You can have Five Guys ${burgersPerWeek} times a week and STILL hit your goal. That's practically a lifestyle. 🍔`;
  } else if (burgersPerWeek >= 1) {
    return isBulk
      ? `Good news: You can treat yourself ${burgersPerWeek} times a week. That's ${totalBurgers} meals over your ${weeks}-week bulk. Math doesn't lie. 🎉`
      : `Good news: You can treat yourself ${burgersPerWeek} times a week. That's ${totalBurgers} meals over your ${weeks}-week plan. Math doesn't lie. 🎉`;
  } else if (burgersPerWeek >= 0.5) {
    const daysPerMeal = Math.round(7 / burgersPerWeek);
    return isBulk
      ? `You can enjoy a Five Guys meal every ${daysPerMeal} days and still hit your surplus. Add more food elsewhere to hit your gain goal. 💯`
      : `You can enjoy a Five Guys meal every ${daysPerMeal} days. Is it as often as you'd like? Maybe not. Is it worth it? Absolutely. 💯`;
  } else if (burgersPerWeek > 0) {
    const daysPerMeal = Math.round(7 / burgersPerWeek);
    return isBulk
      ? `You can have a Five Guys meal every ${daysPerMeal} days. Fill the rest of your calories to hit your bulk. 🤷`
      : `Listen, you can have a Five Guys meal every ${daysPerMeal} days. We know it's not ideal, but hey, quality over quantity, right? 🤷`;
  } else {
    return isBulk
      ? `Your plan allows plenty of room for Five Guys—eat more to hit your surplus. Still, dreaming about burgers is calorie-free! 😅`
      : `Okay, we need to talk. Your current plan doesn't really allow for Five Guys meals. Maybe adjust your timeline or target weight? Still, dreaming about burgers is calorie-free! 😅`;
  }
}
