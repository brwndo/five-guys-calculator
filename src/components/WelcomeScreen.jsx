import { RiRestaurant2Line } from '@remixicon/react'

export default function WelcomeScreen({ onStart }) {
  return (
    <section className="bg-gradient-to-br from-white to-fg-cream py-12 sm:py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        {/* Hero Title */}
        <h1 className="font-heading text-hero font-black text-black leading-none tracking-tight mb-6 uppercase flex items-center justify-center gap-3 flex-wrap">
          <RiRestaurant2Line className="text-fg-red-primary" size={48} />
          Eat Burgers. Crush Goals.
        </h1>
        
        {/* Subtitle */}
        <p className="text-base sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-body">
          Cutting or bulking. Let's do the math on getting there with burgers. 
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="border-2 border-fg-gray-300 rounded-lg p-6">
            <h3 className="font-heading text-lg font-bold mb-2">Customize Your Meal</h3>
            <p className="text-sm text-gray-600">Pick your burger, toppings, fries, and more</p>
          </div>
          
          <div className="border-2 border-fg-gray-300 rounded-lg p-6">
            <h3 className="font-heading text-lg font-bold mb-2">Get Your Plan</h3>
            <p className="text-sm text-gray-600">See exactly how often you can indulge</p>
          </div>
          
          <div className="border-2 border-fg-gray-300 rounded-lg p-6">
            <h3 className="font-heading text-lg font-bold mb-2">Get Shredded</h3>
            <p className="text-sm text-gray-600">Well, hopefully...</p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="btn-primary text-lg sm:text-xl px-12 py-5"
        >
          Calculate My Burger Allowance
        </button>

      </div>
    </section>
  )
}
