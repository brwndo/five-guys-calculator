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
          Cutting or bulking. Find your BPW (Burgers Per Week) to hit your goal. 
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="border border-fg-gray-300 rounded-lg p-6">
            <h3 className="font-heading text-lg font-bold mb-2">01</h3>
            <p className="text-sm font-bold text-gray-700">Set your goal</p>
          </div>
          
          <div className="border border-fg-gray-300 rounded-lg p-6">
            <h3 className="font-heading text-lg font-bold mb-2">02</h3>
            <p className="text-sm font-bold text-gray-700">Build your burger</p>
          </div>
          
          <div className="border border-fg-gray-300 rounded-lg p-6">
            <h3 className="font-heading text-lg font-bold mb-2">03</h3>
            <p className="text-sm font-bold text-gray-700">Calculate Your BPW</p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="btn-primary text-lg sm:text-xl px-12 py-5"
        >
          Calculate My BPW
        </button>

      </div>
    </section>
  )
}
