import { useState } from 'react'
import { validateWeightGoals, hasErrors } from '../utils/validators'

export default function WeightGoalsForm({ initialData, onSubmit, onBack }) {
  const [formData, setFormData] = useState({
    goal: initialData?.goal || '',
    currentWeight: initialData?.currentWeight || '',
    targetWeight: initialData?.targetWeight || '',
    weeks: initialData?.weeks || '8'
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateWeightGoals(formData)
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors)
      return
    }
    onSubmit(formData)
  }

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-fg-red-primary mb-3 uppercase">
              Weight Goals
            </h2>
            <p className="text-gray-600">Set your goal and timeframe — update anytime without re-entering your personal info</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Goal (Cut or Bulk) */}
            <div>
              <span className="input-label block mb-3">Goal *</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="radiogroup" aria-label="Select your goal">
                <label className={`tradeoff-card block ${formData.goal === 'lose' ? 'selected' : ''} ${errors.goal ? 'border-fg-error' : ''}`}>
                  <input
                    type="radio"
                    name="goal"
                    value="lose"
                    checked={formData.goal === 'lose'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <span className="font-heading font-bold text-lg block mb-1">Cut</span>
                  <span className="text-sm text-gray-600">Lose weight</span>
                </label>
                <label className={`tradeoff-card block ${formData.goal === 'gain' ? 'selected' : ''} ${errors.goal ? 'border-fg-error' : ''}`}>
                  <input
                    type="radio"
                    name="goal"
                    value="gain"
                    checked={formData.goal === 'gain'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <span className="font-heading font-bold text-lg block mb-1">Bulk</span>
                  <span className="text-sm text-gray-600">Gain weight</span>
                </label>
              </div>
              {errors.goal && <p className="text-fg-error text-sm mt-1">{errors.goal}</p>}
            </div>

            {/* Current Weight and Target Weight */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="currentWeight" className="input-label">Current Weight (lbs) *</label>
                <input
                  type="number"
                  id="currentWeight"
                  name="currentWeight"
                  value={formData.currentWeight}
                  onChange={handleInputChange}
                  className={`input-field ${errors.currentWeight ? 'error' : ''}`}
                  placeholder="e.g., 200"
                  step="0.1"
                />
                {errors.currentWeight && <p className="text-fg-error text-sm mt-1">{errors.currentWeight}</p>}
              </div>

              <div>
                <label htmlFor="targetWeight" className="input-label">Target Weight (lbs) *</label>
                <input
                  type="number"
                  id="targetWeight"
                  name="targetWeight"
                  value={formData.targetWeight}
                  onChange={handleInputChange}
                  className={`input-field ${errors.targetWeight ? 'error' : ''}`}
                  placeholder={formData.goal === 'gain' ? 'e.g., 220' : 'e.g., 180'}
                  step="0.1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.goal === 'gain' ? 'Higher than current for bulk.' : formData.goal === 'lose' ? 'Lower than current for cut.' : 'Lower for cut, higher for bulk.'}
                </p>
                {errors.targetWeight && <p className="text-fg-error text-sm mt-1">{errors.targetWeight}</p>}
              </div>
            </div>

            {/* Timeframe */}
            <div>
              <label htmlFor="weeks" className="input-label">Timeframe (weeks) *</label>
              <input
                type="number"
                id="weeks"
                name="weeks"
                value={formData.weeks}
                onChange={handleInputChange}
                className={`input-field ${errors.weeks ? 'error' : ''}`}
                placeholder="e.g., 8"
                min="1"
                max="52"
              />
              <p className="text-sm text-gray-500 mt-1">
                How many weeks to reach your target weight?
              </p>
              {errors.weeks && <p className="text-fg-error text-sm mt-1">{errors.weeks}</p>}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button type="button" onClick={onBack} className="btn-secondary flex-1">
                {initialData ? 'Cancel' : 'Back'}
              </button>
              <button type="submit" className="btn-primary flex-1">
                {initialData && formData.goal ? 'Save Weight Goals' : 'Next: Build Your Meal'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
