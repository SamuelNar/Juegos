import  { useState, useEffect } from 'react';
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
  const [showModal, setShowModal] = useState(false);

  const handleSpin = () => {
    setMustSpin(true);
    setPrizeNumber(Math.floor(Math.random() * data.length));
    setShowModal(false);
  };

  useEffect(() => {
    if (!mustSpin && prizeNumber !== null) {
      setTimeout(() => {
        setShowModal(true);
      }, 1000); // Espera 1 segundo después de que la ruleta se detiene para mostrar el modal
    }
  }, [mustSpin, prizeNumber]);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="roulette-container">
      <h2>Juego de la Ruleta</h2>
      <div className="roulette">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
          backgroundColors={['#3e3e3e', '#df3428']}
          textColors={['#ffffff']}
        />
      </div>
      <button onClick={handleSpin} disabled={mustSpin}>
        {mustSpin ? 'Girando...' : 'Girar'}
      </button>
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>¡Felicidades!</h3>
            <p>Has ganado:</p>
            <h2>{data[prizeNumber].option}</h2>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}