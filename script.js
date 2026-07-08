const gameArea = document.getElementById("gameArea");
const playerElement = document.getElementById("player");
const enemyElement = document.getElementById("enemy");
const chestElement = document.getElementById("chest");
const scoreElement = document.getElementById("score");
const healthElement = document.getElementById("health");
const statusElement = document.getElementById("status");
const restartButton = document.getElementById("restartButton");

const gameWidth = 600;
const gameHeight = 400;
const spriteSize = 34;
const playerSpeed = 220;

let player;
let playerX;
let playerY;
let enemy;
let coins;
let score;
let health;
let gameOver;
let enemyDirection;
let enemyHitCooldown;
let lastFrameTime = 0;

const coinPositions = [
  { x: 80, y: 70 },
  { x: 185, y: 45 },
  { x: 315, y: 80 },
  { x: 470, y: 55 },
  { x: 530, y: 170 },
  { x: 410, y: 250 },
  { x: 285, y: 320 },
  { x: 145, y: 285 },
  { x: 55, y: 210 },
  { x: 250, y: 185 }
];

const keys = {};

function startGame() {
  player = { x: 35, y: 330 };
  playerX = player.x;
  playerY = player.y;
  enemy = { x: 280, y: 190 };
  score = 0;
  health = 3;
  gameOver = false;
  enemyDirection = 1;
  enemyHitCooldown = 0;

  chestElement.classList.remove("open");
  chestElement.style.left = "535px";
  chestElement.style.top = "335px";

  createCoins();
  updateHud("Collect all 10 coins!");
  drawSprites();
}

function createCoins() {
  document.querySelectorAll(".coin").forEach((coin) => coin.remove());

  coins = coinPositions.map((position) => {
    const coinElement = document.createElement("div");
    coinElement.className = "sprite coin";
    coinElement.textContent = "🪙";
    gameArea.appendChild(coinElement);

    return {
      x: position.x,
      y: position.y,
      collected: false,
      element: coinElement
    };
  });
}

function updateHud(message) {
  scoreElement.textContent = score;
  healthElement.textContent = health;
  statusElement.textContent = message;
}

function drawSprites() {
  playerElement.style.left = `${player.x}px`;
  playerElement.style.top = `${player.y}px`;
  enemyElement.style.left = `${enemy.x}px`;
  enemyElement.style.top = `${enemy.y}px`;

  coins.forEach((coin) => {
    coin.element.style.left = `${coin.x}px`;
    coin.element.style.top = `${coin.y}px`;
    coin.element.style.display = coin.collected ? "none" : "grid";
  });
}

function movePlayer(deltaTime) {
  let moveX = 0;
  let moveY = 0;

  if (keys.arrowup || keys.w) {
    moveY -= 1;
  }
  if (keys.arrowdown || keys.s) {
    moveY += 1;
  }
  if (keys.arrowleft || keys.a) {
    moveX -= 1;
  }
  if (keys.arrowright || keys.d) {
    moveX += 1;
  }

  if (moveX !== 0 && moveY !== 0) {
    moveX *= Math.SQRT1_2;
    moveY *= Math.SQRT1_2;
  }

  playerX += moveX * playerSpeed * deltaTime;
  playerY += moveY * playerSpeed * deltaTime;

  playerX = keepInside(playerX, gameWidth - spriteSize);
  playerY = keepInside(playerY, gameHeight - spriteSize);

  player.x = playerX;
  player.y = playerY;
}

function moveEnemy() {
  enemy.x += enemyDirection * 3;

  if (enemy.x <= 120 || enemy.x >= 445) {
    enemyDirection *= -1;
  }
}

function keepInside(value, max) {
  return Math.max(0, Math.min(value, max));
}

function checkCollisions() {
  coins.forEach((coin) => {
    if (!coin.collected && isTouching(player, coin)) {
      coin.collected = true;
      score += 1;
      updateHud(score === 10 ? "All coins collected! Open the chest!" : "Nice coin grab!");
    }
  });

  if (enemyHitCooldown > 0) {
    enemyHitCooldown -= 1;
  }

  if (enemyHitCooldown === 0 && isTouching(player, enemy)) {
    health -= 1;
    enemyHitCooldown = 45;
    updateHud("Ouch! The crab pinched you.");

    if (health <= 0) {
      endGame("Game over! The crab wins this round.");
    }
  }

  const chest = { x: 535, y: 335 };
  if (score === 10 && isTouching(player, chest)) {
    chestElement.classList.add("open");
    endGame("You opened the treasure chest. You win!");
  } else if (score < 10 && isTouching(player, chest)) {
    updateHud("The chest is locked. Collect every coin first!");
  }
}

function isTouching(a, b) {
  return (
    a.x < b.x + spriteSize &&
    a.x + spriteSize > b.x &&
    a.y < b.y + spriteSize &&
    a.y + spriteSize > b.y
  );
}

function endGame(message) {
  gameOver = true;
  updateHud(message);
}

function gameLoop(currentTime) {
  const deltaTime = lastFrameTime ? (currentTime - lastFrameTime) / 1000 : 0;
  lastFrameTime = currentTime;

  if (!gameOver) {
    movePlayer(deltaTime);
    moveEnemy();
    checkCollisions();
    drawSprites();
  }

  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();

  if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].includes(key)) {
    event.preventDefault();
    keys[key] = true;
  }
});

document.addEventListener("keyup", (event) => {
  keys[event.key.toLowerCase()] = false;
});

restartButton.addEventListener("click", startGame);

startGame();
gameLoop();
