import { useState } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import PersonalInfoForm from './components/PersonalInfoForm'
import WeightGoalsForm from './components/WeightGoalsForm'
import MenuBuilder from './components/MenuBuilder'
import ResultsDashboard from './components/ResultsDashboard'
import Footer from './components/Footer'

function loadFromStorage(key) {
  try {
    const s = localStorage.getItem(key)
    return s ? JSON.parse(s) : null
  } catch {
    return null
  }
}

function getInitialStep() {
  try {
    const p = localStorage.getItem('fgc_personal_info')
    const g = localStorage.getItem('fgc_weight_goals')
    const m = localStorage.getItem('fgc_meal_selection')
    if (p && g && m) return 'results'
    if (p && g) return 'menu'
    if (p) return 'weightGoals'
  } catch {
    // ignore
  }
  return 'welcome'
}

function App() {
  const [currentStep, setCurrentStep] = useState(getInitialStep)
  const [personalInfo, setPersonalInfo] = useState(() => loadFromStorage('fgc_personal_info'))
  const [weightGoals, setWeightGoals] = useState(() => loadFromStorage('fgc_weight_goals'))
  const [mealSelection, setMealSelection] = useState(() => loadFromStorage('fgc_meal_selection'))
  const [editReturnTo, setEditReturnTo] = useState(null)

  // Merged userInfo keeps ResultsDashboard and calculations.js unchanged
  const userInfo = personalInfo && weightGoals ? { ...personalInfo, ...weightGoals } : null

  const handleStartCalculator = () => setCurrentStep('personalInfo')

  const handlePersonalInfoSubmit = (data) => {
    localStorage.setItem('fgc_personal_info', JSON.stringify(data))
    setPersonalInfo(data)
    if (editReturnTo === 'results') {
      setEditReturnTo(null)
      setCurrentStep('results')
    } else {
      setCurrentStep('weightGoals')
    }
  }

  const handleWeightGoalsSubmit = (data) => {
    localStorage.setItem('fgc_weight_goals', JSON.stringify(data))
    setWeightGoals(data)
    if (editReturnTo === 'results') {
      setEditReturnTo(null)
      setCurrentStep('results')
    } else {
      setCurrentStep('menu')
    }
  }

  const handleMealSelection = (meal) => {
    localStorage.setItem('fgc_meal_selection', JSON.stringify(meal))
    setMealSelection(meal)
    setCurrentStep('results')
  }

  const handleEditPersonalInfo = () => {
    setEditReturnTo('results')
    setCurrentStep('personalInfo')
  }

  const handleEditWeightGoals = () => {
    setEditReturnTo('results')
    setCurrentStep('weightGoals')
  }

  const handleEditMeal = () => {
    setEditReturnTo('results')
    setCurrentStep('menu')
  }

  const handleEditCancel = () => {
    setEditReturnTo(null)
    setCurrentStep('results')
  }

  const handleStartOver = () => {
    try {
      localStorage.removeItem('fgc_personal_info')
      localStorage.removeItem('fgc_weight_goals')
      localStorage.removeItem('fgc_meal_selection')
    } catch {
      // ignore
    }
    setPersonalInfo(null)
    setWeightGoals(null)
    setMealSelection(null)
    setEditReturnTo(null)
    setCurrentStep('welcome')
  }

  return (
    <div className="min-h-screen flex flex-col bg-fg-gray-100">
      {/* Header */}
      <header className="bg-fg-red-primary text-white top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-body text-lg sm:text-lg font-body uppercase tracking-wide">
            (Unofficial) Five Guys Weight Goal Calculator
          </h1>
          {currentStep !== 'welcome' && (
            <button
              onClick={handleStartOver}
              className="text-sm sm:text-base hover:underline font-body"
            >
              Start Over
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {currentStep === 'welcome' && (
          <WelcomeScreen onStart={handleStartCalculator} />
        )}

        {currentStep === 'personalInfo' && (
          <PersonalInfoForm
            initialData={personalInfo}
            onSubmit={handlePersonalInfoSubmit}
            onBack={editReturnTo === 'results' ? handleEditCancel : null}
          />
        )}

        {currentStep === 'weightGoals' && (
          <WeightGoalsForm
            initialData={weightGoals}
            onSubmit={handleWeightGoalsSubmit}
            onBack={editReturnTo === 'results' ? handleEditCancel : () => setCurrentStep('personalInfo')}
          />
        )}

        {currentStep === 'menu' && (
          <MenuBuilder
            userInfo={userInfo}
            initialData={mealSelection}
            onSubmit={handleMealSelection}
            onBack={editReturnTo === 'results' ? handleEditCancel : () => setCurrentStep('weightGoals')}
          />
        )}

        {currentStep === 'results' && (
          <ResultsDashboard
            userInfo={userInfo}
            mealSelection={mealSelection}
            onEditPersonalInfo={handleEditPersonalInfo}
            onEditWeightGoals={handleEditWeightGoals}
            onEditMeal={handleEditMeal}
            onStartOver={handleStartOver}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
