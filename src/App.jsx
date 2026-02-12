import { useState } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import UserInfoForm from './components/UserInfoForm'
import MenuBuilder from './components/MenuBuilder'
import ResultsDashboard from './components/ResultsDashboard'
import Footer from './components/Footer'

function App() {
  const [currentStep, setCurrentStep] = useState('welcome') // welcome, userInfo, menu, results
  const [userInfo, setUserInfo] = useState(null)
  const [mealSelection, setMealSelection] = useState(null)
  const [results, setResults] = useState(null)

  const handleStartCalculator = () => {
    setCurrentStep('userInfo')
  }

  const handleUserInfoSubmit = (data) => {
    setUserInfo(data)
    setCurrentStep('menu')
  }

  const handleMealSelection = (meal) => {
    setMealSelection(meal)
    setCurrentStep('results')
  }

  const handleRecalculate = () => {
    setCurrentStep('menu')
  }

  const handleStartOver = () => {
    setUserInfo(null)
    setMealSelection(null)
    setResults(null)
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

        {currentStep === 'userInfo' && (
          <UserInfoForm onSubmit={handleUserInfoSubmit} />
        )}

        {currentStep === 'menu' && (
          <MenuBuilder
            userInfo={userInfo}
            onSubmit={handleMealSelection}
            onBack={() => setCurrentStep('userInfo')}
          />
        )}

        {currentStep === 'results' && (
          <ResultsDashboard
            userInfo={userInfo}
            mealSelection={mealSelection}
            onRecalculate={handleRecalculate}
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
