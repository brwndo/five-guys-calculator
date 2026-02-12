export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 px-4 mt-auto">
      <div className="container mx-auto max-w-4xl text-center">
        {/* Main Disclaimer */}
        <div className="mb-6">
          <p className="text-xs text-gray-500 mb-3">
            <strong>Disclaimer:</strong> This calculator is for entertainment and educational purposes only and is not medical advice. 
            The results are estimates based on standard metabolic formulas and should not replace professional medical guidance. For official dietary guidelines, visit: <a
              href="https://www.fda.gov/food/nutrition-education-resources-materials/dietary-guidelines-americans"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-red-light hover:underline"
            >
              FDA Dietary Guidelines
            </a>
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Five Guys Weight Goal Calculator. Not affiliated with Five Guys Enterprises, LLC.
            <br />
            Made with 🍔 by <a href="https://www.brandonarthur.xyz/" target="_blank" rel="noopener noreferrer" className="text-fg-red-light hover:underline">Brandon Arthur</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
