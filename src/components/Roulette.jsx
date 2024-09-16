// src/Roulette.jsx
import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import '../style/Roulette.css';

const data = [
  { option: 'Premio 1', style: { backgroundColor: '#f39c12', textColor: '#fff' } },
  { option: 'Premio 2', style: { backgroundColor: '#3498db', textColor: '#fff' } },
  { option: 'Premio 3', style: { backgroundColor: '#2ecc71', textColor: '#fff' } },
  { option: 'Premio 4', style: { backgroundColor: '#e74c3c', textColor: '#fff' } },
  { option: 'Premio 5', style: { backgroundColor: '#9b59b6', textColor: '#fff' } },
];

export default function Roulette() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(null);

  const handleSpin = () => {
    setMustSpin(true);
    setPrizeNumber(Math.floor(Math.random() * data.length)); // Número aleatorio entre 0 y 4
    setTimeout(() => {
      setMustSpin(false);
    }, 4000); // Simula el tiempo de giro
  };

  return (
    <div className="roulette-container">
      <h2>Juego de la Ruleta</h2>
      <div className="roulette">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={['#3e3e3e', '#df3428']}
          textColors={['#ffffff']}
        />
      </div>
      <button onClick={handleSpin} disabled={mustSpin}>
        {mustSpin ? 'Girando...' : 'Girar'}
      </button>
      {prizeNumber !== null && <p>¡La ruleta cayó en: {data[prizeNumber].option}!</p>}
    </div>
  );
}
