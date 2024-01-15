import '/socket.io/socket.io.js';

const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restartButton');
let circleTurn;

startGame();

let counter = 0;

const socket = io({
	auth: {
		serverOffset: 0,
	},
	ackTimeout: 10000,
});

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	if (input.value) {
		const clientOffset = `${socket.id}-${counter++}`;
		socket.emit('chat message', input.value, clientOffset);
		input.value = '';
	}
});

socket.on('chat message', (msg, serverOffset) => {
	const item = document.createElement('li');
	item.textContent = msg;
	messages.appendChild(item);
	window.scrollTo(0, document.body.scrollHeight);
	socket.auth.serverOffset = serverOffset;
});

restartButton.addEventListener('click', restartGame);

function startGame() {
	circleTurn = false;
	cellElements.forEach((cell) => {
		cell.addEventListener('click', handleClick, { once: true });
	});
	setBoardHoverClass();
}

function handleClick(e) {
	const cell = e.target;
	const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

	placeMark(cell, currentClass);

	if (calculateWinner(currentClass)) {
		endGame(false);
	} else if (isDraw()) {
		endGame(true);
	} else {
		swapTurns();
		setBoardHoverClass();
	}
}

function setBoardHoverClass() {
	board.classList.remove(X_CLASS);
	board.classList.remove(CIRCLE_CLASS);

	if (circleTurn) {
		board.classList.add(CIRCLE_CLASS);
	} else {
		board.classList.add(X_CLASS);
	}
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass);
}

function swapTurns() {
	circleTurn = !circleTurn;
}

function endGame(draw) {
	if (draw) {
		winningMessageTextElement.innerText = `Draw!`;
	} else {
		winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
	}

	winningMessageElement.classList.add('show');
}

function restartGame(e) {
	winningMessageElement.classList.remove('show');

	cellElements.forEach((cell) => {
		cell.classList.remove(X_CLASS);
		cell.classList.remove(CIRCLE_CLASS);
	});

	startGame();
}

function calculateWinner(currentClass) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (
			cellElements.item(a).classList.value == `cell ${currentClass}` &&
			cellElements.item(a).classList.value === cellElements.item(b).classList.value &&
			cellElements.item(a).classList.value === cellElements.item(c).classList.value
		) {
			return currentClass;
		}
	}

	return null;
}

function isDraw() {
	for (const cell of cellElements) {
		if (!(cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS))) {
			return false;
		}
	}

	return true;
}
