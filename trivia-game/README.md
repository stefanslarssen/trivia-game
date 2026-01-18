# Trivia Game

A fun and interactive trivia game built with React and Vite. Test your knowledge with various questions and compete for high scores!

## Features

- 🎯 **Interactive Gameplay**: Answer multiple-choice trivia questions
- 🏆 **High Score Tracking**: Local storage-based high score system
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- 📱 **Responsive**: Works perfectly on desktop and mobile devices
- 🔀 **Randomized Questions**: Questions are shuffled for each game
- 💾 **Persistent Scores**: High scores are saved locally

## How to Play

1. Enter your name to start the game
2. Answer 10 trivia questions by clicking on your chosen answer
3. Get immediate feedback on whether your answer is correct
4. View your final score and percentage
5. Check the high scores leaderboard to see how you rank
6. Play again to improve your score!

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your system.

### Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd trivia-game
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Project Structure

```
trivia-game/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── main.jsx         # Application entry point
│   ├── index.css        # Global styles
│   └── questions.json   # Trivia questions data
├── index.html           # HTML template
├── package.json         # Project dependencies
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## Customization

### Adding New Questions

To add or modify questions, edit the `src/questions.json` file:

```json
{
  "id": 11,
  "question": "Your question here?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 0
}
```

- `id`: Unique identifier for the question
- `question`: The trivia question
- `options`: Array of 4 possible answers
- `correctAnswer`: Index of the correct answer (0-based)

### Styling

The game uses modern CSS with gradients and animations. You can customize the appearance by modifying:
- `src/App.css` for game-specific styles
- `src/index.css` for global styles

## Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **JavaScript ES6+**: Modern JavaScript features
- **CSS3**: Modern CSS with animations and gradients
- **LocalStorage**: Browser storage for high scores

## Game Features in Detail

### Score System
- Each correct answer awards 1 point
- Total possible score: 10 points
- Percentage calculation based on correct answers
- Top 10 high scores are saved and displayed

### Question Flow
- 10 questions per game
- Questions are randomly shuffled
- Immediate feedback on answer selection
- Progress bar showing current question
- Cannot change answer after selection

### High Score System
- Stores player name, score, and date
- Automatically sorts by score (highest first)
- Limited to top 10 scores
- Persistent across browser sessions

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.
