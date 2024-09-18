import React, { useState, useEffect } from 'react';
import '../style/TriviaQuestion.css';

const TriviaQuestion = ({ question, onAnswer, playerName, isCurrentPlayer }) => {
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    let timer;
    if (isCurrentPlayer) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timer);
            onAnswer(null);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isCurrentPlayer, onAnswer]);

  const handleAnswer = (selectedAnswer) => {
    if (isCurrentPlayer) {
      onAnswer(selectedAnswer);
    }
  };

  return (
    <div className="question-card">
      <h2>Turno de: {playerName}</h2>
      <p className="question">{question.question}</p>
      <div className="answers">
        {question.answers.map((answer, index) => (
          <button 
            key={index} 
            onClick={() => handleAnswer(index)} 
            className="answer-button"
            disabled={!isCurrentPlayer}
          >
            {answer}
          </button>
        ))}
      </div>
      {isCurrentPlayer && (
        <>
          <div className="time-bar-container">
            <div className="time-bar" style={{width: `${(timeLeft / 20) * 100}%`}}></div>
          </div>
          <p className="time">Tiempo: {timeLeft}s</p>
        </>
      )}
    </div>
  );
};

export default TriviaQuestion;