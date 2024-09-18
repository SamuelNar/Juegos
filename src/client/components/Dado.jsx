import { useEffect, useState, useCallback } from 'react';
import '../style/DiceGame.css';
const Dado = () => {
  const [dado1, setDado1] = useState(0);
  const [dado2, setDado2] = useState(0);
  const [rodando, setRodando] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState(''); 
  const [messageClass, setMessageClass] = useState('');
  
  const dados = ['dado1.png', 'dado2.png', 'dado3.png', 'dado4.png', 'dado5.png', 'dado6.png'];

  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  const eventHandler = useCallback(() => {
    if (attempts === 3) {
      setMessage("Has perdido. No te quedan más intentos.");
      setMessageClass('lose show');
      setAttempts(0);
      return;
    }

    setRodando(true);
    const newDado1 = random(0, 5);
    const newDado2 = random(0, 5);

    setDado1(newDado1);
    setDado2(newDado2);

    setTimeout(() => {
      setRodando(false);
      setAttempts(prev => prev + 1);
      
      if (newDado1 === newDado2) {
        setMessage("¡Ganaste!");
        setMessageClass('win show');
        setAttempts(0);
      } else {
        const remainingAttempts = 3 - (attempts + 1);
        if (remainingAttempts === 0) {
          setMessage("Has perdido. No te quedan más intentos.");
          setMessageClass('lose show');
        } else {
          setMessage(`Perdiste. Tienes ${remainingAttempts} intentos restantes.`);
          setMessageClass('lose show');
        }
      }
    }, 500);
  }, [attempts]);

  // useEffect para controlar el tiempo de los mensajes
  useEffect(() => {
    if (messageClass) {
      const timer = setTimeout(() => {
        setMessage('');
        setMessageClass('');
      }, 2000); // Limpiar después de 3 segundos

      return () => clearTimeout(timer); // Limpiar el timeout si el componente se desmonta
    }
  }, [messageClass]);

  return (
    <div className="container">
      <div className="lista-dados">
        <img src={dados[dado1]} className={rodando ? 'rotate' : ''} alt="Dado 1" />
        <img src={dados[dado2]} className={rodando ? 'rotate' : ''} alt="Dado 2" />
      </div>
      
      <div className="boton-girar">
        <button onClick={eventHandler}>Girar</button>
      </div>

      {message && <div className={`message ${messageClass}`}>{message}</div>}
    </div>
  );
};

export default Dado;
