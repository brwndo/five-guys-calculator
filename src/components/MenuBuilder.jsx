import { useState, useEffect } from 'react'
import menuData from '../data/menu.json'

function getMainItem(menuData, id) {
  if (!id) return null
  const burger = menuData.burgers?.find(b => b.id === id)
  if (burger) return { item: burger, category: 'burger' }
  const hotdog = menuData.hotdogs?.find(h => h.id === id)
  if (hotdog) return { item: hotdog, category: 'hotdog' }
  const sandwich = menuData.sandwiches?.find(s => s.id === id)
  if (sandwich) return { item: sandwich, category: 'sandwich' }
  return null
}

export default function MenuBuilder({ userInfo, initialData, onSubmit, onBack }) {
  const [selectedMain, setSelectedMain] = useState(initialData?.main || '')
  const [selectedToppings, setSelectedToppings] = useState(initialData?.toppings || [])
  const [selectedFries, setSelectedFries] = useState(initialData?.fries || 'none')
  const [selectedDrink, setSelectedDrink] = useState(initialData?.drink || 'none')
  const [selectedShake, setSelectedShake] = useState(initialData?.shake || 'none')
  const [totalCalories, setTotalCalories] = useState(0)

  // Calculate total calories whenever selection changes
  useEffect(() => {
    let total = 0
    const mainResult = getMainItem(menuData, selectedMain)
    if (mainResult) total += mainResult.item.totalCalories

    selectedToppings.forEach(toppingId => {
      const topping = menuData.toppings.find(t => t.id === toppingId)
      if (topping) total += topping.calories
    })

    if (selectedFries !== 'none') {
      const fries = menuData.fries.find(f => f.id === selectedFries)
      if (fries) total += fries.calories
    }

    if (selectedDrink !== 'none') {
      const drink = menuData.drinks.find(d => d.id === selectedDrink)
      if (drink) total += drink.calories
    }

    if (selectedShake !== 'none') {
      const shake = menuData.milkshakes.find(s => s.id === selectedShake)
      if (shake) total += shake.calories
    }

    setTotalCalories(total)
  }, [selectedMain, selectedToppings, selectedFries, selectedDrink, selectedShake])

  const handleToppingToggle = (toppingId) => {
    setSelectedToppings(prev =>
      prev.includes(toppingId)
        ? prev.filter(id => id !== toppingId)
        : [...prev, toppingId]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!selectedMain) {
      alert('Please select a burger, hot dog, or sandwich')
      return
    }

    const mainResult = getMainItem(menuData, selectedMain)
    const meal = {
      main: selectedMain,
      mainCategory: mainResult?.category ?? 'burger',
      mainName: mainResult?.item?.name ?? '',
      toppings: selectedToppings,
      fries: selectedFries,
      drink: selectedDrink,
      shake: selectedShake,
      totalCalories
    }
    onSubmit(meal)
  }

  function MainOption({ item, isSelected }) {
    return (
      <label
        className={`card cursor-pointer ${isSelected ? 'border-4 border-fg-red-primary bg-fg-cream' : ''}`}
      >
        <input
          type="radio"
          name="main"
          value={item.id}
          checked={isSelected}
          onChange={(e) => setSelectedMain(e.target.value)}
          className="sr-only"
        />
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-heading font-bold text-lg">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.description}</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-fg-red-primary">{item.totalCalories}</p>
            <p className="text-xs text-gray-500">calories</p>
          </div>
        </div>
      </label>
    )
  }

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-fg-red-primary mb-3 uppercase">
              Build Your Meal
            </h2>
            <p className="text-gray-600">Pick your perfect Five Guys meal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Main Selection: Burgers, Hot Dogs, Sandwiches */}
            <div>
              <label className="input-label text-lg mb-4">
                Choose Your Main *
              </label>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Burgers</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {menuData.burgers.map(burger => (
                      <MainOption key={burger.id} item={burger} isSelected={selectedMain === burger.id} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Hot Dogs</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {menuData.hotdogs.map(hotdog => (
                      <MainOption key={hotdog.id} item={hotdog} isSelected={selectedMain === hotdog.id} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Sandwiches</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {menuData.sandwiches.map(sandwich => (
                      <MainOption key={sandwich.id} item={sandwich} isSelected={selectedMain === sandwich.id} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Toppings Selection */}
            <div>
              <label className="input-label text-lg mb-4">
                Add Toppings (Optional)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {menuData.toppings.map(topping => (
                  <label
                    key={topping.id}
                    className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedToppings.includes(topping.id)
                        ? 'border-fg-red-primary bg-fg-cream'
                        : 'border-fg-gray-200 hover:border-fg-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedToppings.includes(topping.id)}
                      onChange={() => handleToppingToggle(topping.id)}
                      className="mr-2"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{topping.name}</p>
                      <p className="text-xs text-gray-500">{topping.calories} cal</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Fries Selection */}
            <div>
              <label htmlFor="fries" className="input-label text-lg mb-4">
                Add Fries (Optional)
              </label>
              <select
                id="fries"
                value={selectedFries}
                onChange={(e) => setSelectedFries(e.target.value)}
                className="select-field"
              >
                {menuData.fries.map(fries => (
                  <option key={fries.id} value={fries.id}>
                    {fries.name} {fries.calories > 0 && `(${fries.calories} cal)`}
                  </option>
                ))}
              </select>
            </div>

            {/* Drink Selection */}
            <div>
              <label htmlFor="drink" className="input-label text-lg mb-4">
                Add a Drink (Optional)
              </label>
              <select
                id="drink"
                value={selectedDrink}
                onChange={(e) => setSelectedDrink(e.target.value)}
                className="select-field"
              >
                {menuData.drinks.map(drink => (
                  <option key={drink.id} value={drink.id}>
                    {drink.name} {drink.calories > 0 && `(${drink.calories} cal)`}
                  </option>
                ))}
              </select>
            </div>

            {/* Shake Selection */}
            <div>
              <label htmlFor="shake" className="input-label text-lg mb-4">
                Add a Shake (Optional)
              </label>
              <select
                id="shake"
                value={selectedShake}
                onChange={(e) => setSelectedShake(e.target.value)}
                className="select-field"
              >
                {menuData.milkshakes.map(shake => (
                  <option key={shake.id} value={shake.id}>
                    {shake.name} {shake.calories > 0 && `(${shake.calories} cal)`}
                  </option>
                ))}
              </select>
            </div>

            {/* Total Calories Display */}
            <div className="bg-gradient-to-br from-fg-red-primary to-fg-red-dark text-white rounded-xl p-6 text-center">
              <p className="text-sm font-semibold mb-2 uppercase tracking-wide">Total Meal Calories</p>
              <p className="font-heading text-5xl font-black">{totalCalories.toLocaleString()}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={onBack}
                className="btn-secondary flex-1"
              >
                Back
              </button>
              <button
                type="submit"
                className="btn-primary flex-1"
                disabled={!selectedMain}
              >
                Calculate My Plan
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
