import React from 'react';
import '../style/ScoredBoard.css';

const Scoreboard = ({ players }) => {
  return (
    <div className="scoreboard">
      <h3>Puntuaciones</h3>
      <table>
        <thead>
          <tr>
            <th>Jugador</th>
            <th>Puntuación</th>
            <th>Racha</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.score}</td>
              <td>
                {player.streak >= 3 && <span className="fire-emoji">🔥</span>}
                {player.streak}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Scoreboard;