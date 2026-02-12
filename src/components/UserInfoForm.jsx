import { useState } from 'react'
import { validateUserInfo, hasErrors } from '../utils/validators'

export default function UserInfoForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    goal: '',
    currentWeight: '',
    targetWeight: '',
    heightFeet: '',
    heightInches: '',
    activityLevel: '',
    weeks: '8',
    unit: 'imperial'
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const validationErrors = validateUserInfo(formData)
    
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
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-fg-red-primary mb-3 uppercase">
              Tell Us About Yourself
            </h2>
            <p className="text-gray-600">We need a few details to calculate your personalized burger plan</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Age and Height Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Age */}
              <div>
                <label htmlFor="age" className="input-label">
                  Age *
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className={`input-field ${errors.age ? 'error' : ''}`}
                  placeholder="e.g., 30"
                  min="18"
                  max="100"
                />
                {errors.age && <p className="text-fg-error text-sm mt-1">{errors.age}</p>}
              </div>

              {/* Height */}
              <div>
                <label className="input-label">
                  Height *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="number"
                      name="heightFeet"
                      value={formData.heightFeet}
                      onChange={handleInputChange}
                      className={`input-field ${errors.height ? 'error' : ''}`}
                      placeholder="Feet"
                      min="4"
                      max="7"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      name="heightInches"
                      value={formData.heightInches}
                      onChange={handleInputChange}
                      className={`input-field ${errors.height ? 'error' : ''}`}
                      placeholder="Inches"
                      min="0"
                      max="11"
                    />
                  </div>
                </div>
                {errors.height && <p className="text-fg-error text-sm mt-1">{errors.height}</p>}
              </div>
            </div>

            {/* Gender */}
            <div>
              <span className="input-label block mb-3">Gender *</span>
              <div className="grid grid-cols-2 gap-3 w-full" role="radiogroup" aria-label="Select gender">
                <label
                  className={`tradeoff-card block text-center ${formData.gender === 'male' ? 'selected' : ''} ${errors.gender ? 'border-fg-error' : ''}`}
                >
                  <input
                    type="radio"
                    id="gender-male"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <span className="font-heading font-bold">Male</span>
                </label>
                <label
                  className={`tradeoff-card block text-center ${formData.gender === 'female' ? 'selected' : ''} ${errors.gender ? 'border-fg-error' : ''}`}
                >
                  <input
                    type="radio"
                    id="gender-female"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <span className="font-heading font-bold">Female</span>
                </label>
              </div>
              {errors.gender && <p className="text-fg-error text-sm mt-1">{errors.gender}</p>}
            </div>

            {/* Goal (Cut or Bulk) */}
            <div>
              <span className="input-label block mb-3">Goal *</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="radiogroup" aria-label="Select your goal">
                <label
                  className={`tradeoff-card block ${formData.goal === 'lose' ? 'selected' : ''} ${errors.goal ? 'border-fg-error' : ''}`}
                >
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
                <label
                  className={`tradeoff-card block ${formData.goal === 'gain' ? 'selected' : ''} ${errors.goal ? 'border-fg-error' : ''}`}
                >
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
                <label htmlFor="currentWeight" className="input-label">
                  Current Weight (lbs) *
                </label>
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
                <label htmlFor="targetWeight" className="input-label">
                  Target Weight (lbs) *
                </label>
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
                  {formData.goal === 'gain' ? 'Higher than current for bulk.' : formData.goal === 'lose' ? 'Lower than current for cut.' : 'Lower than current for cut, higher for bulk.'}
                </p>
                {errors.targetWeight && <p className="text-fg-error text-sm mt-1">{errors.targetWeight}</p>}
              </div>
            </div>

            {/* Activity Level */}
            <div>
              <label htmlFor="activityLevel" className="input-label">
                Activity Level *
              </label>
              <select
                id="activityLevel"
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleInputChange}
                className={`select-field ${errors.activityLevel ? 'error' : ''}`}
              >
                <option value="">Select your activity level</option>
                <option value="sedentary">Sedentary (little or no exercise)</option>
                <option value="lightly">Lightly Active (exercise 1-3 days/week)</option>
                <option value="moderately">Moderately Active (exercise 3-5 days/week)</option>
                <option value="very">Very Active (exercise 6-7 days/week)</option>
                <option value="extra">Extra Active (physical job + exercise)</option>
              </select>
              {errors.activityLevel && <p className="text-fg-error text-sm mt-1">{errors.activityLevel}</p>}
            </div>

            {/* Timeframe */}
            <div>
              <label htmlFor="weeks" className="input-label">
                Timeframe (weeks) *
              </label>
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
                How many weeks do you want to reach your target weight?
              </p>
              {errors.weeks && <p className="text-fg-error text-sm mt-1">{errors.weeks}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button type="submit" className="btn-primary w-full">
                Next: Build Your Meal
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
