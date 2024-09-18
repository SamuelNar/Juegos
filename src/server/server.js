import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

const questions = [
  {
    question: "¿Cuál es la capital de Francia?",
    answers: ["Londres", "Berlín", "París", "Madrid"],
    correctAnswer: 2
  },
  {
    question: "¿Cuál es el planeta más grande del sistema solar?",
    answers: ["Marte", "Júpiter", "Saturno", "Tierra"],
    correctAnswer: 1
  },
  // Agrega más preguntas aquí
];

let players = [];
let currentQuestion = 0;
let currentPlayer = 0;

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinGame', (playerName) => {
    players.push({ id: socket.id, name: playerName, score: 0, streak: 0 });
    io.emit('updatePlayers', players);

    if (players.length === 1) {
      startGame();
    }
  });

  socket.on('answer', (answer) => {
    if (socket.id === players[currentPlayer].id) {
      const isCorrect = answer === questions[currentQuestion].correctAnswer;
      updateScore(socket.id, isCorrect);
      nextTurn();
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    players = players.filter(player => player.id !== socket.id);
    io.emit('updatePlayers', players);
  });
});

function startGame() {
  currentQuestion = 0;
  currentPlayer = 0;
  nextTurn();
}

function nextTurn() {
  if (currentQuestion < questions.length) {
    io.emit('newTurn', {
      question: questions[currentQuestion],
      currentPlayer: players[currentPlayer].id,
      playerName: players[currentPlayer].name
    });
  } else {
    io.emit('gameOver', players.sort((a, b) => b.score - a.score));
  }
}

function updateScore(playerId, isCorrect) {
  const player = players.find(p => p.id === playerId);
  if (isCorrect) {
    player.streak += 1;
    player.score += 50 + (player.streak >= 3 ? player.streak * 10 : 0);
  } else {
    player.streak = 0;
  }
  io.emit('updatePlayers', players);
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));