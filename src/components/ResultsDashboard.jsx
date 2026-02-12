import { useMemo } from 'react'
import {
  calculateBMR,
  calculateTDEE,
  poundsToKg,
  feetInchesToCm,
  calculateDailyCalorieDelta,
  calculateBurgerFrequency,
  validatePlan,
  getHumorousMessage,
  formatBurgerFrequency
} from '../utils/calculations'

export default function ResultsDashboard({ userInfo, mealSelection, onRecalculate, onStartOver }) {
  const goal = userInfo.goal || 'lose'

  // Calculate all the results
  const results = useMemo(() => {
    // Convert units if needed
    const weightKg = userInfo.unit === 'imperial'
      ? poundsToKg(parseFloat(userInfo.currentWeight))
      : parseFloat(userInfo.currentWeight)

    const targetWeightKg = userInfo.unit === 'imperial'
      ? poundsToKg(parseFloat(userInfo.targetWeight))
      : parseFloat(userInfo.targetWeight)

    const heightCm = userInfo.unit === 'imperial'
      ? feetInchesToCm(parseFloat(userInfo.heightFeet), parseFloat(userInfo.heightInches || 0))
      : parseFloat(userInfo.heightCm)

    // Calculate BMR and TDEE
    const bmr = calculateBMR(weightKg, heightCm, parseInt(userInfo.age), userInfo.gender)
    const tdee = calculateTDEE(bmr, userInfo.activityLevel)

    // Daily delta: positive = deficit (cut), negative = surplus (bulk)
    const dailyDelta = calculateDailyCalorieDelta(weightKg, targetWeightKg, parseInt(userInfo.weeks))

    // Validate plan (cut or bulk)
    const validation = validatePlan(tdee, dailyDelta, goal, userInfo.gender)

    // Calculate burger frequency (same formula: budget = tdee - dailyDelta)
    const burgerStats = calculateBurgerFrequency(
      tdee,
      dailyDelta,
      mealSelection.totalCalories,
      parseInt(userInfo.weeks)
    )

    // Get humorous message (goal-aware)
    const message = getHumorousMessage(
      burgerStats.burgersPerWeek,
      burgerStats.totalBurgers,
      parseInt(userInfo.weeks),
      burgerStats.mealTooBig,
      goal
    )

    const isBulk = goal === 'gain'
    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      dailyDelta,
      // For display: deficit (cut) or surplus (bulk) as positive number
      displayDelta: Math.round(Math.abs(dailyDelta)),
      deficitOrSurplusLabel: isBulk ? 'Daily Caloric Surplus' : 'Daily Caloric Deficit',
      weightLabel: isBulk ? 'Weight to Gain' : 'Weight to Lose',
      caloriesLeftLabel: isBulk ? 'Extra calories to eat per week' : 'Calories Left Per Week',
      dailyRemainingLabel: isBulk ? 'Daily avg additional' : 'Daily Avg Remaining',
      remainingDescription: isBulk ? 'Additional food to eat to hit your surplus.' : 'Use this for the rest of your meals and snacks.',
      weeklyTargetDescription: isBulk ? 'To gain, eat this many calories per week in total.' : 'To stay on track, eat this many calories per week in total.',
      validation,
      ...burgerStats,
      message
    }
  }, [userInfo, mealSelection, goal])

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Main Results Card */}
        <div className="results-card mb-8">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-6 uppercase">
            🍔 Your Meal Plan 🍔
          </h2>

          {/* Humorous Message */}
          <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            {results.message}
          </p>
          
          {/* Main Stat: Meals Per Week */}
          <div className="mb-6">
            <p className="results-number">{results.burgersPerWeek}</p>
            <p className="results-label">Meals Per Week</p>
            {results.mealTooBig && (
              <p className="text-fg-error font-semibold mt-2">Meal too big</p>
            )}
          </div>

          {/* Your Meal Summary */}
          <div className="mb-8">
            <h3 className="font-heading text-2xl font-bold mb-4 uppercase text-fg-red-primary">
              Your Meal ({mealSelection.totalCalories} calories)
            </h3>
            <div className="text-gray-700 space-y-1">
              <p>{mealSelection.mainName}</p>
              {mealSelection.toppings?.length > 0 && (
                <p>{mealSelection.toppings.map(t => t.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())).join(', ')}</p>
              )}
              {mealSelection.fries !== 'none' && (
                <p>{mealSelection.fries.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
              )}
              {mealSelection.drink !== 'none' && (
                <p>{mealSelection.drink.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
              )}
              {mealSelection.shake !== 'none' && (
                <p>{mealSelection.shake.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
              )}
            </div>
          </div>
          
          {/* Secondary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/80 rounded-lg p-4">
              <p className="text-3xl sm:text-4xl font-heading font-black text-fg-red-primary">
                {results.totalBurgers}
              </p>
              <p className="text-sm text-gray-600 uppercase tracking-wide mt-1">
                Total Meals<br/>({userInfo.weeks} weeks)
              </p>
            </div>
            
            <div className="bg-white/80 rounded-lg p-4">
              <p className="text-3xl sm:text-4xl font-heading font-black text-fg-red-primary">
                {results.remainingCaloriesPerWeek.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 uppercase tracking-wide mt-1">
                {results.caloriesLeftLabel}
              </p>
            </div>
            
            <div className="bg-white/80 rounded-lg p-4">
              <p className="text-3xl sm:text-4xl font-heading font-black text-fg-red-primary">
                {results.dailyRemaining.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 uppercase tracking-wide mt-1">
                {results.dailyRemainingLabel}
              </p>
            </div>
          </div>
        </div>

        {/* Meal Too Big error (cut only) */}
        {goal === 'lose' && results.mealTooBig && (
          <div className="bg-fg-error-light border-2 border-fg-error rounded-xl p-6 mb-8">
            <h3 className="font-heading text-xl font-bold text-fg-error mb-3">
              Meal Too Big
            </h3>
            <p className="text-gray-700">
              One of your chosen meals ({mealSelection.totalCalories.toLocaleString()} cal) is more than your weekly calorie target ({results.weeklyTargetCalories.toLocaleString()} cal). Choose a smaller meal or adjust your plan so you can fit at least one meal per week.
            </p>
          </div>
        )}

        {/* Your Plan Details */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
          <h3 className="font-heading text-2xl font-bold mb-4 uppercase text-fg-red-primary">
            Your Plan Details
          </h3>

          {/* Section A: Weekly (to hit your goal) */}
          <div className="mb-8">
            <h4 className="font-heading text-lg font-semibold text-gray-800 mb-4">
              Weekly — to hit your goal
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-700">
              <div className="bg-fg-cream/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-700 mb-1">Your weekly calorie target</p>
                <p className="text-2xl font-heading font-black text-fg-red-primary">{results.weeklyTargetCalories.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">{results.weeklyTargetDescription}</p>
              </div>
              <div className="bg-fg-cream/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-700 mb-1">Calories from your chosen meals (per week)</p>
                <p className="text-2xl font-heading font-black text-fg-red-primary">{results.weeklyMealCalories.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">
                  From {results.burgersPerWeek} meals per week at {mealSelection.totalCalories.toLocaleString()} cal each.
                </p>
              </div>
              <div className="bg-fg-cream/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-700 mb-1">{goal === 'gain' ? 'Additional for other food (per week)' : 'Remaining for other food (per week)'}</p>
                <p className="text-2xl font-heading font-black text-fg-red-primary">{results.remainingCaloriesPerWeek.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">{results.remainingDescription}</p>
              </div>
            </div>
          </div>

          {/* Section B: Daily (reference) */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-gray-800 mb-4">
              Daily numbers (for reference)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <div>
                <p className="text-sm text-gray-500">Basal Metabolic Rate (BMR)</p>
                <p className="text-xl font-bold">{results.bmr} cal/day</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Daily Energy Expenditure (TDEE)</p>
                <p className="text-xl font-bold">{results.tdee} cal/day</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{results.deficitOrSurplusLabel}</p>
                <p className="text-xl font-bold">{results.displayDelta} cal/day</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Daily Intake Goal</p>
                <p className="text-xl font-bold">{results.validation.dailyIntake} cal/day</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Target Timeline</p>
                <p className="text-xl font-bold">{userInfo.weeks} weeks</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{results.weightLabel}</p>
                <p className="text-xl font-bold">
                  {Math.abs(parseFloat(userInfo.currentWeight) - parseFloat(userInfo.targetWeight)).toFixed(1)} {userInfo.unit === 'imperial' ? 'lbs' : 'kg'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onRecalculate}
            className="btn-secondary flex-1"
          >
            Change My Meal
          </button>
          <button
            onClick={onStartOver}
            className="btn-ghost flex-1"
          >
            Start Over
          </button>
        </div>

        {/* Warnings (if any) */}
        {results.validation.warnings.length > 0 && (
          <div className="bg-fg-warning-light border-2 border-fg-warning rounded-xl p-6 mt-8">
            <h3 className="font-heading text-xl font-bold text-fg-warning mb-3 flex items-center">
              ⚠️ Important Notes
            </h3>
            <ul className="space-y-2">
              {results.validation.warnings.map((warning, index) => (
                <li key={index} className="text-gray-700">
                  • {warning.message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
