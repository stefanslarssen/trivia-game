import { useState, useEffect } from 'react'
import questionsData from './questions.json'
import './App.css'

function App() {
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [highScores, setHighScores] = useState([])
  const [showHighScores, setShowHighScores] = useState(false)

  useEffect(() => {
    const shuffledQuestions = [...questionsData].sort(() => Math.random() - 0.5)
    setQuestions(shuffledQuestions)
    
    const savedHighScores = localStorage.getItem('triviaHighScores')
    if (savedHighScores) {
      setHighScores(JSON.parse(savedHighScores))
    }
  }, [])

  const startGame = () => {
    if (playerName.trim()) {
      setGameStarted(true)
      setCurrentQuestion(0)
      setScore(0)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const handleAnswerClick = (answerIndex) => {
    setSelectedAnswer(answerIndex)
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      endGame()
    }
  }

  const endGame = () => {
    setShowResult(true)
    saveHighScore()
  }

  const saveHighScore = () => {
    const newHighScore = {
      name: playerName,
      score: score,
      date: new Date().toLocaleDateString()
    }
    
    const updatedHighScores = [...highScores, newHighScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
    
    setHighScores(updatedHighScores)
    localStorage.setItem('triviaHighScores', JSON.stringify(updatedHighScores))
  }

  const resetGame = () => {
    setGameStarted(false)
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setPlayerName('')
    const shuffledQuestions = [...questionsData].sort(() => Math.random() - 0.5)
    setQuestions(shuffledQuestions)
  }

  const toggleHighScores = () => {
    setShowHighScores(!showHighScores)
  }

  if (!gameStarted && !showHighScores) {
    return (
      <div className="app">
        <div className="start-screen">
          <h1>🎯 Trivia Game</h1>
          <p>Test your knowledge with fun trivia questions!</p>
          <div className="start-form">
            <input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="name-input"
            />
            <button onClick={startGame} className="start-btn" disabled={!playerName.trim()}>
              Start Game
            </button>
            <button onClick={toggleHighScores} className="high-scores-btn">
              View High Scores
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (showHighScores) {
    return (
      <div className="app">
        <div className="high-scores-screen">
          <h2>🏆 High Scores</h2>
          {highScores.length > 0 ? (
            <div className="scores-list">
              {highScores.map((score, index) => (
                <div key={index} className="score-item">
                  <span className="rank">#{index + 1}</span>
                  <span className="name">{score.name}</span>
                  <span className="score">{score.score}/10</span>
                  <span className="date">{score.date}</span>
                </div>
              ))}
            </div>
          ) : (
            <p>No high scores yet. Be the first to play!</p>
          )}
          <button onClick={toggleHighScores} className="back-btn">
            Back to Menu
          </button>
        </div>
      </div>
    )
  }

  if (showResult) {
    return (
      <div className="app">
        <div className="result-screen">
          <h2>🎉 Game Over!</h2>
          <div className="result-info">
            <p className="player-name">{playerName}</p>
            <p className="final-score">
              Your Score: <span>{score}</span> / {questions.length}
            </p>
            <p className="percentage">
              {Math.round((score / questions.length) * 100)}% Correct
            </p>
          </div>
          <div className="result-buttons">
            <button onClick={resetGame} className="play-again-btn">
              Play Again
            </button>
            <button onClick={toggleHighScores} className="view-scores-btn">
              View High Scores
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="game-container">
        <div className="game-header">
          <div className="player-info">Player: {playerName}</div>
          <div className="score-info">Score: {score}/{questions.length}</div>
        </div>
        
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="question-container">
          <h2>Question {currentQuestion + 1} of {questions.length}</h2>
          <p className="question">{questions[currentQuestion]?.question}</p>
        </div>

        <div className="answers-container">
          {questions[currentQuestion]?.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              className={`answer-btn ${
                selectedAnswer === index
                  ? index === questions[currentQuestion].correctAnswer
                    ? 'correct'
                    : 'incorrect'
                  : ''
              } ${selectedAnswer !== null && index === questions[currentQuestion].correctAnswer ? 'correct' : ''}`}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>

        {selectedAnswer !== null && (
          <button onClick={handleNextQuestion} className="next-btn">
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        )}
      </div>
    </div>
  )
}

export default App
