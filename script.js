const gameArea = document.getElementById("gameArea");
const playerElement = document.getElementById("player");
const enemyElement = document.getElementById("enemy");
const chestElement = document.getElementById("chest");
const levelElement = document.getElementById("level");
const scoreElement = document.getElementById("score");
const coinGoalElement = document.getElementById("coinGoal");
const healthElement = document.getElementById("health");
const fragmentsElement = document.getElementById("fragments");
const statusElement = document.getElementById("status");
const restartButton = document.getElementById("restartButton");
const gameOverlay = document.getElementById("gameOverlay");
const overlayTitle = document.getElementById("overlayTitle");
const overlayMessage = document.getElementById("overlayMessage");
const overlayRestartButton = document.getElementById("overlayRestartButton");

const gameWidth = 600;
const gameHeight = 400;
const spriteSize = 34;
const playerSpeed = 220;

let player;
let playerX;
let playerY;
let enemies;
let lavaTraps;
let coins;
let score;
let health;
let gameOver;
let currentLevelIndex = 0;
let mapFragments = 0;
let enemyHitCooldown;
let lastFrameTime = 0;
let overlayAction = "restart";

const levels = [
  {
    name: "Coconut Island",
    className: "level-coconut",
    coinCount: 10,
    enemies: [{ x: 280, y: 190, minX: 120, maxX: 445, speed: 120 }],
    lavaTraps: []
  },
  {
    name: "Mist Island",
    className: "level-mist",
    coinCount: 12,
    enemies: [
      { x: 160, y: 120, minX: 80, maxX: 300, speed: 135 },
      { x: 430, y: 255, minX: 310, maxX: 520, speed: 150 }
    ],
    lavaTraps: []
  },
  {
    name: "Volcano Island",
    className: "level-volcano",
    coinCount: 15,
    enemies: [
      { x: 145, y: 110, minX: 60, maxX: 285, speed: 150 },
      { x: 420, y: 265, minX: 300, maxX: 525, speed: 165 }
    ],
    lavaTraps: [
      { x: 210, y: 135 },
      { x: 360, y: 190 },
      { x: 235, y: 275 }
    ]
  }
];

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
  { x: 250, y: 185 },
  { x: 535, y: 105 },
  { x: 365, y: 340 },
  { x: 95, y: 345 },
  { x: 515, y: 275 },
  { x: 330, y: 145 }
];

const keys = {};

function startGame() {
  currentLevelIndex = 0;
  mapFragments = 0;
  startLevel();
}

function startLevel() {
  const level = levels[currentLevelIndex];

  player = { x: 35, y: 330 };
  playerX = player.x;
  playerY = player.y;
  score = 0;
  health = 3;
  gameOver = false;
  enemyHitCooldown = 0;
  overlayAction = "restart";

  playerElement.classList.remove("damaged");
  gameArea.classList.remove("shake");
  chestElement.classList.remove("open");
  gameOverlay.classList.add("hidden");
  chestElement.style.left = "535px";
  chestElement.style.top = "335px";

  applyLevelStyle(level);
  createCoins(level.coinCount);
  createEnemies(level.enemies);
  createLavaTraps(level.lavaTraps);
  updateHud(`Collect all ${level.coinCount} coins!`);
  drawSprites();
}

function applyLevelStyle(level) {
  gameArea.classList.remove("level-coconut", "level-mist", "level-volcano");
  gameArea.classList.add(level.className);
}

function createCoins(coinCount) {
  document.querySelectorAll(".coin").forEach((coin) => coin.remove());

  coins = coinPositions.slice(0, coinCount).map((position) => {
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

function createEnemies(enemySettings) {
  document.querySelectorAll(".extra-enemy").forEach((enemy) => enemy.remove());
  enemyElement.className = "sprite enemy";
  enemyElement.textContent = "🦀";

  enemies = enemySettings.map((settings, index) => {
    const element = index === 0 ? enemyElement : document.createElement("div");

    if (index > 0) {
      element.className = "sprite enemy extra-enemy";
      element.textContent = "🦀";
      gameArea.appendChild(element);
    }

    return {
      ...settings,
      direction: 1,
      element
    };
  });
}

function createLavaTraps(trapSettings) {
  document.querySelectorAll(".lava").forEach((lava) => lava.remove());

  lavaTraps = trapSettings.map((settings) => {
    const element = document.createElement("div");
    element.className = "sprite lava";
    element.textContent = "🔥";
    gameArea.appendChild(element);

    return {
      ...settings,
      element
    };
  });
}

function updateHud(message) {
  const level = levels[currentLevelIndex];

  levelElement.textContent = `${currentLevelIndex + 1} - ${level.name}`;
  scoreElement.textContent = score;
  coinGoalElement.textContent = level.coinCount;
  healthElement.textContent = health;
  fragmentsElement.textContent = mapFragments;
  statusElement.textContent = message;
}

function drawSprites() {
  playerElement.style.left = `${player.x}px`;
  playerElement.style.top = `${player.y}px`;

  enemies.forEach((enemy) => {
    enemy.element.style.left = `${enemy.x}px`;
    enemy.element.style.top = `${enemy.y}px`;
  });

  coins.forEach((coin) => {
    coin.element.style.left = `${coin.x}px`;
    coin.element.style.top = `${coin.y}px`;
    coin.element.style.display = coin.collected ? "none" : "grid";
  });

  lavaTraps.forEach((lava) => {
    lava.element.style.left = `${lava.x}px`;
    lava.element.style.top = `${lava.y}px`;
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

function moveEnemies(deltaTime) {
  enemies.forEach((enemy) => {
    enemy.x += enemy.direction * enemy.speed * deltaTime;

    if (enemy.x <= enemy.minX || enemy.x >= enemy.maxX) {
      enemy.direction *= -1;
    }
  });
}

function keepInside(value, max) {
  return Math.max(0, Math.min(value, max));
}

function checkCollisions(deltaTime) {
  const level = levels[currentLevelIndex];

  coins.forEach((coin) => {
    if (!coin.collected && isTouching(player, coin)) {
      coin.collected = true;
      score += 1;
      updateHud(score === level.coinCount ? "All coins collected! Open the chest!" : "Nice coin grab!");
    }
  });

  if (enemyHitCooldown > 0) {
    enemyHitCooldown = Math.max(0, enemyHitCooldown - deltaTime);
  }

  const touchedEnemy = enemies.find((enemy) => isTouching(player, enemy));
  if (enemyHitCooldown === 0 && touchedEnemy) {
    takeDamage("Ouch! The crab pinched you.", "The crab wins this round.", {
      knockbackFrom: touchedEnemy,
      flash: true
    });
  }

  if (enemyHitCooldown === 0 && lavaTraps.some((lava) => isTouching(player, lava))) {
    takeDamage("Hot lava! Careful where you step.", "The lava ended your quest.", {
      shake: true
    });
  }

  const chest = { x: 535, y: 335 };
  if (score === level.coinCount && isTouching(player, chest)) {
    chestElement.classList.add("open");
    completeLevel();
  } else if (score < level.coinCount && isTouching(player, chest)) {
    updateHud("The chest is locked. Collect every coin first!");
  }
}

function takeDamage(statusMessage, gameOverMessage, options = {}) {
  health -= 1;
  enemyHitCooldown = 1;

  if (options.flash) {
    flashPlayer();
  }

  if (options.knockbackFrom) {
    knockPlayerBack(options.knockbackFrom);
  }

  if (options.shake) {
    shakeGameArea();
  }

  updateHud(statusMessage);

  if (health <= 0) {
    endGame("Game Over", gameOverMessage);
  }
}

function flashPlayer() {
  playerElement.classList.remove("damaged");
  void playerElement.offsetWidth;
  playerElement.classList.add("damaged");
}

function knockPlayerBack(source) {
  const dx = player.x - source.x || 1;
  const dy = player.y - source.y || 1;
  const distance = Math.hypot(dx, dy);
  const knockbackDistance = 45;

  playerX = keepInside(playerX + (dx / distance) * knockbackDistance, gameWidth - spriteSize);
  playerY = keepInside(playerY + (dy / distance) * knockbackDistance, gameHeight - spriteSize);
  player.x = playerX;
  player.y = playerY;
  drawSprites();
}

function shakeGameArea() {
  gameArea.classList.remove("shake");
  void gameArea.offsetWidth;
  gameArea.classList.add("shake");
}

function completeLevel() {
  mapFragments += 1;

  if (currentLevelIndex === levels.length - 1) {
    overlayAction = "restart";
    endGame(
      "Adventure Completed",
      "The Ancient Compass reveals the Treasure Island! Captain Hat earned."
    );
  } else {
    overlayAction = "next";
    endGame("You Win", `Sea Map Fragment found on ${levels[currentLevelIndex].name}!`);
    overlayRestartButton.textContent = `Start Level ${currentLevelIndex + 2}`;
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

function endGame(title, message) {
  gameOver = true;
  updateHud(message);
  overlayTitle.textContent = title;
  overlayMessage.textContent = message;
  if (overlayAction === "restart") {
    overlayRestartButton.textContent = "Restart Game";
  }
  gameOverlay.classList.remove("hidden");
}

function handleOverlayButton() {
  if (overlayAction === "next") {
    currentLevelIndex += 1;
    startLevel();
  } else {
    startGame();
  }
}

function gameLoop(currentTime) {
  const deltaTime = lastFrameTime ? (currentTime - lastFrameTime) / 1000 : 0;
  lastFrameTime = currentTime;

  if (!gameOver) {
    movePlayer(deltaTime);
    moveEnemies(deltaTime);
    checkCollisions(deltaTime);
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
overlayRestartButton.addEventListener("click", handleOverlayButton);

startGame();
gameLoop();
