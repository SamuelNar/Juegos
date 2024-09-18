import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import TriviaQuestion from './TriviaQuestion';
import Scoreboard from './Scoreboard';
import './style/Trivia.css';

const socket = io('http://localhost:5000');

const Trivia = () => {
  const [players, setPlayers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    socket.on('updatePlayers', (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });

    socket.on('newTurn', ({ question, currentPlayer, playerName }) => {
      setCurrentQuestion(question);
      setCurrentPlayer({ id: currentPlayer, name: playerName });
    });

    socket.on('gameOver', (finalPlayers) => {
      setPlayers(finalPlayers);
      setGameOver(true);
    });

    return () => {
      socket.off('updatePlayers');
      socket.off('newTurn');
      socket.off('gameOver');
    };
  }, []);

  const handleJoinGame = () => {
    if (playerName.trim() !== '') {
      socket.emit('joinGame', playerName);
      setJoined(true);
    }
  };

  const handleAnswer = (answer) => {
    socket.emit('answer', answer);
  };

  if (!joined) {
    return (
      <div className="join-game">
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Ingresa tu nombre"
        />
        <button onClick={handleJoinGame}>Unirse al juego</button>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="game-over">
        <h2>¡Juego terminado!</h2>
        <Scoreboard players={players} />
      </div>
    );
  }

  return (
    <div className="trivia-game">
      {currentQuestion && (
        <TriviaQuestion
          question={currentQuestion}
          onAnswer={handleAnswer}
          playerName={currentPlayer.name}
          isCurrentPlayer={socket.id === currentPlayer.id}
        />
      )}
      <Scoreboard players={players} />
    </div>
  );
};

export default Trivia;