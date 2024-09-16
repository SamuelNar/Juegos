import { useState } from "react";
import "../style/DiceGame.css";

export default function DiceGame() {
    const [dice1, setDice1] = useState(1);
    const [dice2, setDice2] = useState(1);
    const [isRolling, setIsRolling] = useState(false);
    const [hasWon, setHasWon] = useState(false);

    const rollDice = () => {
        setIsRolling(true);
        const NewDice1 = Math.floor(Math.random() * 6) + 1;
        const NewDice2 = Math.floor(Math.random() * 6) + 1;
        setTimeout(() => {
            setDice1(NewDice1);
            setDice2(NewDice2);
            setIsRolling(false);
            setHasWon(NewDice1 === NewDice2);
        },1000)
    }

    return(
        <div className="dice-game">
            <h2>Juego de dados</h2>
            <div className="dice">
                <p>Dado 1: {dice1}</p>
                <p>Dado 2: {dice2}</p>
            </div>
            {hasWon === true && <p>Ganaste</p>}
            {hasWon === false && <p>Perdiste</p>}
            <button onClick={rollDice} disabled={isRolling}>
                {isRolling ? "Girando..." : "Tirar"}
            </button>
        </div>
    )
}