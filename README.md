# Five Guys Weight Loss Calculator

A fun, practical web app that calculates how many Five Guys burgers you can eat while still achieving your weight loss goals. Built with React, Vite, and Tailwind CSS.

## 🍔 Features

- **Personalized Calculations**: BMR and TDEE calculations using the Mifflin-St Jeor equation
- **Full Menu Customization**: Choose your burger, toppings, fries, drinks, and shakes
- **Real-time Results**: See exactly how many burgers per week you can eat
- **Safety Validations**: Warnings for unrealistic or unhealthy weight loss goals
- **Trade-off Analysis**: Compare different meal combinations
- **Humorous Tone**: Lighthearted messaging throughout
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Five Guys Branding**: Authentic design system based on the official website

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. **Clone or download the project folder**

2. **Navigate to the project directory**
   ```bash
   cd five-guys-calculator
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   The app should automatically open at `http://localhost:5173`
   
   If not, manually navigate to the URL shown in your terminal.

## 📦 Build for Production

To create a production-ready build:

```bash
npm run build
```

The optimized files will be in the `dist/` folder.

To preview the production build locally:

```bash
npm run preview
```

## 🎨 Design System

The app uses the official Five Guys design system:

- **Primary Color**: `#E51937` (Five Guys Red)
- **Typography**: Impact/Arial Black for headings, system fonts for body
- **Components**: Buttons, forms, cards all styled to match Five Guys branding

## 📁 Project Structure

```
five-guys-calculator/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── WelcomeScreen.jsx
│   │   ├── UserInfoForm.jsx
│   │   ├── MenuBuilder.jsx
│   │   ├── ResultsDashboard.jsx
│   │   └── Footer.jsx
│   ├── utils/            # Utility functions
│   │   ├── calculations.js  # BMR, TDEE, burger frequency
│   │   └── validators.js    # Form validation
│   ├── data/             # Menu data
│   │   └── menu.json
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles + Tailwind
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🧮 How It Works

### 1. User Input Collection
- Age, gender, height, weight (current and target)
- Activity level (sedentary to extra active)
- Timeline (weeks to reach goal)

### 2. Metabolic Calculations
- **BMR**: Calculated using Mifflin-St Jeor equation
  - Men: `(10 × weight_kg) + (6.25 × height_cm) - (5 × age) + 5`
  - Women: `(10 × weight_kg) + (6.25 × height_cm) - (5 × age) - 161`
- **TDEE**: BMR × activity multiplier (1.2 to 1.9)
- **Daily Deficit**: Based on weight to lose and timeframe

### 3. Burger Frequency Calculation
- Weekly deficit = Daily deficit × 7
- Burgers per week = Weekly deficit / Meal calories
- Total burgers = Burgers per week × Number of weeks

### 4. Safety Validations
- Maximum deficit: 1000 cal/day (2 lbs/week)
- Minimum intake: 1200 cal/day (women), 1500 cal/day (men)
- Warnings for unrealistic goals

## 🎯 Features Roadmap

### Current (v1.0)
- [x] User info form with validation
- [x] Full Five Guys menu selection
- [x] BMR/TDEE calculations
- [x] Burger frequency results
- [x] Safety validations
- [x] Responsive design

### Future Enhancements
- [ ] Trade-off comparison widget (real-time switching)
- [ ] Calendar view of burger days
- [ ] Save/share results functionality
- [ ] Weekly meal planner
- [ ] Add other restaurant chains
- [ ] Exercise equivalents display
- [ ] Social media sharing
- [ ] Progressive Web App (PWA)

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool (fast!)
- **Tailwind CSS** - Utility-first CSS
- **JavaScript (ES6+)** - No TypeScript (for simplicity)

## 📝 Nutritional Data

All nutritional information is sourced from the official Five Guys Nutrition & Allergen Guide (January 2024). The data is stored in `src/data/menu.json`.

## ⚠️ Disclaimers

This calculator is for entertainment and educational purposes only. It is not medical advice and should not replace professional medical guidance. Always consult with a healthcare provider before starting any diet program.

Calorie calculations are estimates based on standard formulas. Individual results vary based on metabolism, genetics, and other factors.

This project is not affiliated with Five Guys Enterprises, LLC.

## 🤝 Contributing

This is a learning/portfolio project. If you'd like to add features or improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this code for your own projects!

## 🙏 Acknowledgments

- Five Guys for making delicious burgers
- Nutritional formulas based on peer-reviewed research
- Design inspired by the official Five Guys website

---

**Made with ❤️ and 🍔**

Enjoy responsibly!
# five-guys-calculator
