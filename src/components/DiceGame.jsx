import { useState } from 'react';
import '../style/DiceGame.css';

const Dice = ({ value }) => {
  return (
    <div className={`dice dice-${value}`}>
      {[...Array(value)].map((_, i) => (
        <div key={i} className="dot"></div>
      ))}
    </div>
  );
};

export default function DiceGame() {
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [hasWon, setHasWon] = useState(null);

  const rollDice = () => {
    setIsRolling(true);
    setHasWon(null);
    
    const rollDuration = 1000; // 1 segundo de animación

    setTimeout(() => {
      const newDice1 = Math.floor(Math.random() * 6) + 1;
      const newDice2 = Math.floor(Math.random() * 6) + 1;
      setDice1(newDice1);
      setDice2(newDice2);
      setIsRolling(false);
      setHasWon(newDice1 === newDice2);
    }, rollDuration);
  };

  return (
    <div className="dice-game">
      <h2>Juego de Dados</h2>
      <div className={`dice-container ${isRolling ? 'rolling' : ''}`}>
        <Dice value={dice1} />
        <Dice value={dice2} />
      </div>
      {hasWon !== null && (
        <p className={hasWon ? 'win-message' : 'lose-message'}>
          {hasWon ? '¡Ganaste!' : 'Perdiste. Inténtalo de nuevo.'}
        </p>
      )}
      <button onClick={rollDice} disabled={isRolling}>
        {isRolling ? 'Lanzando...' : 'Lanzar Dados'}
      </button>
    </div>
  );
}