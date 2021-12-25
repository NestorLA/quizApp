import { useState, useEffect } from "react";
import "./App.css";
import "bootswatch/dist/quartz/bootstrap.min.css";

// components
import ShowQuestion from "./components/ShowQuestion.jsx";

function App() {
  const [questions, setQuestion] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  console.log(currentQuestion);

  const handleAnswer = (answer) => {
    if (!showAnswers) {
      if (answer === questions[currentQuestion].correct_answer) {
        setScore(score + 1);
      }
    }
    setShowAnswers(true);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setShowAnswers(false);
  };

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&category=9&type=multiple")
      .then((response) => response.json())
      .then((data) => {
        const questions = data.results.map((question) => ({
          ...question,
          answers: [question.correct_answer, ...question.incorrect_answers].sort(() =>
            Math.random() - 0.5
          ),
        }));
        setQuestion(questions);
      });
  }, []);

  return questions.length > 0 ? (
    <div className="App">
      <div className="container">
        {currentQuestion >= questions.length ? (
          <div className="d-flex flex-column align-items-center mt-4">
            <h2>GAME ENDED!</h2>
            <h3>Your score is: {score}</h3>
            <h3>
              Your percentage of correct answers is: {(score / 10) * 100}%
            </h3>
            <button
              className="btn btn-secondary"
              onClick={() => window.location.reload(false)}
            >
              Go Home
            </button>
          </div>
        ) : (
          <div>
            <h1 className="mt-2">Quiz App NLA</h1>
            <ShowQuestion
              data={questions[currentQuestion]}
              handleAnswer={handleAnswer}
              showAnswers={showAnswers}
              handleNextQuestion={handleNextQuestion}
            />
          </div>
        )}
      </div>
    </div>
  ) : (
    <h1 className="text-center mt-3">Loading...</h1>
  );
}

export default App;
