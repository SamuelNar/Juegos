import { useState, useCallback } from 'react'

const Dado = () => {
  const [dado1, setDado1] = useState(0);
  const [dado2, setDado2] = useState(0);
  const [rodando, setRodando] = useState(false);

  const dados = [
    'dado1.png', 'dado2.png', 'dado3.png', 'dado4.png', 'dado5.png', 'dado6.png',
  ];
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const eventHandler = useCallback(() => {
    setRodando(true);
    setDado1(random(0, 5));
    setDado2(random(0, 5));
    
    setTimeout(() => {
      setRodando(false);
    }, 500);
  });

  return (
    <div className="container">
      <div className="lista-dados">

        <img src={dados[dado1]} className={rodando ? 'rotate' : ''} />

        <img src={dados[dado2]} className={rodando ? 'rotate' : ''} />
      </div>
      
      <div className="boton-girar">
        <button className onClick={eventHandler}>Girar</button>
      </div>
    </div>
  )
}

export default Dado