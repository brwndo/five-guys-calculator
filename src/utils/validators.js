/**
 * Validate user info form inputs
 * @param {object} formData - User form data
 * @returns {object} Validation errors
 */
export function validateUserInfo(formData) {
  const errors = {};
  
  // Age validation
  if (!formData.age || formData.age < 18 || formData.age > 100) {
    errors.age = 'Age must be between 18 and 100 years';
  }
  
  // Gender validation
  if (!formData.gender) {
    errors.gender = 'Please select your gender';
  }
  
  // Weight validation (lbs)
  if (!formData.currentWeight || formData.currentWeight <= 0) {
    errors.currentWeight = 'Please enter your current weight';
  } else if (formData.currentWeight < 80 || formData.currentWeight > 500) {
    errors.currentWeight = 'Weight must be between 80 and 500 lbs';
  }
  
  // Goal validation
  if (!formData.goal || !['lose', 'gain'].includes(formData.goal)) {
    errors.goal = 'Please select your goal (lose or gain weight)';
  }

  // Target weight validation (goal-aware)
  if (!formData.targetWeight || formData.targetWeight <= 0) {
    errors.targetWeight = 'Please enter your target weight';
  } else if (formData.goal === 'lose' && parseFloat(formData.targetWeight) >= parseFloat(formData.currentWeight)) {
    errors.targetWeight = 'Target weight must be less than current weight for a cut';
  } else if (formData.goal === 'gain' && parseFloat(formData.targetWeight) <= parseFloat(formData.currentWeight)) {
    errors.targetWeight = 'Target weight must be greater than current weight for a bulk';
  }
  
  // Height validation (feet and inches)
  if (!formData.heightFeet || formData.heightFeet < 4 || formData.heightFeet > 7) {
    errors.height = 'Height must be between 4 and 7 feet';
  }
  if (formData.heightInches < 0 || formData.heightInches >= 12) {
    errors.height = 'Inches must be between 0 and 11';
  }
  
  // Activity level validation
  if (!formData.activityLevel) {
    errors.activityLevel = 'Please select your activity level';
  }
  
  // Timeframe validation
  if (!formData.weeks || formData.weeks < 1 || formData.weeks > 52) {
    errors.weeks = 'Timeframe must be between 1 and 52 weeks';
  }
  
  return errors;
}

/**
 * Validate meal selection
 * @param {object} mealData - Meal selection data
 * @returns {object} Validation errors
 */
export function validateMealSelection(mealData) {
  const errors = {};
  
  // Main (burger, hot dog, or sandwich) validation
  if (!mealData.main) {
    errors.main = 'Please select a main';
  }
  
  // Note: Toppings, fries, drinks, and shakes are optional
  
  return errors;
}

/**
 * Check if object has any errors
 * @param {object} errors - Errors object
 * @returns {boolean} True if there are any errors
 */
export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}

/**
 * Format number for display
 * @param {number} num - Number to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted number
 */
export function formatNumber(num, decimals = 0) {
  return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Sanitize input to prevent XSS
 * @param {string} input - User input
 * @returns {string} Sanitized input
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  return input.replace(/[<>]/g, '');
}
