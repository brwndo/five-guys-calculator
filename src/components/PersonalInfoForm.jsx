import { useState } from 'react'
import { validatePersonalInfo, hasErrors } from '../utils/validators'

export default function PersonalInfoForm({ initialData, onSubmit, onBack }) {
  const [formData, setFormData] = useState({
    age: initialData?.age || '',
    gender: initialData?.gender || '',
    heightFeet: initialData?.heightFeet || '',
    heightInches: initialData?.heightInches || '',
    activityLevel: initialData?.activityLevel || '',
    unit: 'imperial'
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
    const validationErrors = validatePersonalInfo(formData)
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
              Personal Information
            </h2>
            <p className="text-gray-600">Enter your details once — we'll remember them for next time</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Age and Height Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Age */}
              <div>
                <label htmlFor="age" className="input-label">Age *</label>
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
                <label className="input-label">Height *</label>
                <div className="grid grid-cols-2 gap-4">
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
                {errors.height && <p className="text-fg-error text-sm mt-1">{errors.height}</p>}
              </div>
            </div>

            {/* Gender */}
            <div>
              <span className="input-label block mb-3">Gender *</span>
              <div className="grid grid-cols-2 gap-3 w-full" role="radiogroup" aria-label="Select gender">
                <label className={`tradeoff-card block text-center ${formData.gender === 'male' ? 'selected' : ''} ${errors.gender ? 'border-fg-error' : ''}`}>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <span className="font-heading font-bold">Male</span>
                </label>
                <label className={`tradeoff-card block text-center ${formData.gender === 'female' ? 'selected' : ''} ${errors.gender ? 'border-fg-error' : ''}`}>
                  <input
                    type="radio"
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

            {/* Activity Level */}
            <div>
              <label htmlFor="activityLevel" className="input-label">Activity Level *</label>
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

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {onBack && (
                <button type="button" onClick={onBack} className="btn-secondary flex-1">
                  Cancel
                </button>
              )}
              <button type="submit" className="btn-primary flex-1">
                {onBack ? 'Save Personal Info' : 'Next: Weight Goals'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
