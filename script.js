const gameArea = document.getElementById("gameArea");
const playerElement = document.getElementById("player");
const enemyElement = document.getElementById("enemy");
const chestElement = document.getElementById("chest");
const levelElement = document.getElementById("level");
const scoreElement = document.getElementById("score");
const coinGoalElement = document.getElementById("coinGoal");
const totalCoinsElement = document.getElementById("totalCoins");
const healthElement = document.getElementById("health");
const fragmentsElement = document.getElementById("fragments");
const crewElement = document.getElementById("crew");
const statusElement = document.getElementById("status");
const restartButton = document.getElementById("restartButton");
const gameOverlay = document.getElementById("gameOverlay");
const overlayTitle = document.getElementById("overlayTitle");
const overlayMessage = document.getElementById("overlayMessage");
const overlayRestartButton = document.getElementById("overlayRestartButton");
const routePanel = document.getElementById("routePanel");
const routeClue = document.getElementById("routeClue");
const routeChoices = document.getElementById("routeChoices");
const worldMap = document.getElementById("worldMap");
const worldMapMessage = document.getElementById("worldMapMessage");
const worldMapIslands = document.getElementById("worldMapIslands");
const upgradeMenu = document.getElementById("upgradeMenu");
const upgradeMessage = document.getElementById("upgradeMessage");
const upgradeChoices = document.getElementById("upgradeChoices");
const continueMapButton = document.getElementById("continueMapButton");

const gameWidth = 600;
const gameHeight = 400;
const spriteSize = 34;
const basePlayerSpeed = 220;
const baseMaxHealth = 3;

let player;
let playerX;
let playerY;
let enemies;
let lavaTraps;
let coins;
let score;
let health;
let maxHealth = baseMaxHealth;
let totalCoins = 0;
let gameOver;
let currentLevelIndex = 0;
let mapFragments = 0;
let crew = [];
let purchasedUpgrades = [];
let enemyHitCooldown;
let lastFrameTime = 0;
let overlayAction = "restart";
let routeQuestionShown = false;
let routeUnlocked = false;

const levelConfig = {
  levels: [
    {
      name: "Coconut Island",
      className: "level-coconut",
      coinCount: 10,
      clue: "The path follows the soft shapes that drift above the coconut trees.",
      question: "Which island sign points to the next sea route?",
      choices: ["Clouds", "Lava", "Fog"],
      correctChoice: 0,
      enemies: [{ x: 280, y: 190, minX: 120, maxX: 445, speed: 120 }],
      lavaTraps: []
    },
    {
      name: "Mist Island",
      className: "level-mist",
      coinCount: 12,
      clue: "The hidden route appears where the gray veil rolls over the shore.",
      question: "What should the pirate follow through Mist Island?",
      choices: ["Coconut trees", "Fog", "Volcano smoke"],
      correctChoice: 1,
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
      clue: "The final route glows near the mountain that breathes smoke.",
      question: "What marks the final treasure route?",
      choices: ["Ocean waves", "Coconut leaves", "Volcano smoke"],
      correctChoice: 2,
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
  ]
};

const levels = levelConfig.levels;

const worldMapRoute = [
  { name: "Coconut Island", icon: "🥥" },
  { name: "Mist Island", icon: "🌫️" },
  { name: "Volcano Island", icon: "🌋" },
  { name: "Treasure Island", icon: "🏝️" }
];

const shipUpgrades = [
  {
    id: "strongSail",
    name: "Strong Sail",
    cost: 8,
    description: "Increase pirate movement speed."
  },
  {
    id: "reinforcedHull",
    name: "Reinforced Hull",
    cost: 10,
    description: "Increase max health by 1."
  },
  {
    id: "treasureRadar",
    name: "Treasure Radar",
    cost: 6,
    description: "Show a hint when only a few coins remain."
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
  totalCoins = 0;
  maxHealth = baseMaxHealth;
  crew = [];
  purchasedUpgrades = [];
  startLevel();
}

function startLevel() {
  const level = levels[currentLevelIndex];

  player = { x: 35, y: 330 };
  playerX = player.x;
  playerY = player.y;
  score = 0;
  health = maxHealth;
  gameOver = false;
  enemyHitCooldown = 0;
  overlayAction = "restart";
  routeQuestionShown = false;
  routeUnlocked = false;

  playerElement.classList.remove("damaged");
  gameArea.classList.remove("shake");
  chestElement.classList.remove("open");
  chestElement.classList.add("hidden");
  routePanel.classList.add("hidden");
  worldMap.classList.add("hidden");
  upgradeMenu.classList.add("hidden");
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
  totalCoinsElement.textContent = totalCoins;
  healthElement.textContent = health;
  fragmentsElement.textContent = mapFragments;
  crewElement.textContent = crew.length > 0 ? crew.join(", ") : "None";
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

  playerX += moveX * getPlayerSpeed() * deltaTime;
  playerY += moveY * getPlayerSpeed() * deltaTime;

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
      if (score === level.coinCount) {
        updateHud("All coins collected! Read the island clue.");
        showRouteQuestion(level);
      } else {
        updateHud(getCoinStatusMessage(level));
      }
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
  if (routeUnlocked && isTouching(player, chest)) {
    completeLevel();
  }
}

function getPlayerSpeed() {
  return purchasedUpgrades.includes("strongSail") ? basePlayerSpeed + 45 : basePlayerSpeed;
}

function getCoinStatusMessage(level) {
  if (purchasedUpgrades.includes("treasureRadar") && score >= level.coinCount - 2) {
    return "Treasure Radar: only a few coins remain!";
  }

  return "Nice coin grab!";
}

function showRouteQuestion(level) {
  if (routeQuestionShown) {
    return;
  }

  routeQuestionShown = true;
  routeClue.textContent = `${level.clue} ${level.question}`;
  routeChoices.innerHTML = "";

  level.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = choice;
    button.addEventListener("click", () => answerRouteQuestion(index));
    routeChoices.appendChild(button);
  });

  routePanel.classList.remove("hidden");
}

function answerRouteQuestion(choiceIndex) {
  const level = levels[currentLevelIndex];

  if (choiceIndex === level.correctChoice) {
    routeUnlocked = true;
    routePanel.classList.add("hidden");
    chestElement.classList.remove("hidden");
    chestElement.classList.add("open");
    updateHud("Correct! The sea route is revealed.");
    completeLevel();
    return;
  }

  health -= 1;
  updateHud("Wrong answer! The sea path is still hidden.");

  if (health <= 0) {
    routePanel.classList.add("hidden");
    endGame("Game Over", "Wrong answer! The sea path is still hidden.");
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
  const completedLevelName = levels[currentLevelIndex].name;
  const crewMessage = unlockCrewForIsland(completedLevelName);
  const cookMessage = applyCookEffect();

  totalCoins += score;
  mapFragments += 1;
  gameOver = true;
  updateHud([
    `Sea Map Fragment found on ${completedLevelName}!`,
    `${score} coins added to your wallet.`,
    crewMessage,
    cookMessage
  ].filter(Boolean).join(" "));
  showUpgradeMenu();
}

function showUpgradeMenu() {
  renderUpgradeChoices();
  upgradeMessage.textContent = `Wallet: ${totalCoins} coins. Spend coins before sailing onward.`;
  upgradeMenu.classList.remove("hidden");
}

function renderUpgradeChoices() {
  upgradeChoices.innerHTML = "";

  shipUpgrades.forEach((upgrade) => {
    const isPurchased = purchasedUpgrades.includes(upgrade.id);
    const canAfford = totalCoins >= upgrade.cost;
    const card = document.createElement("div");
    const button = document.createElement("button");

    card.className = "upgrade-card";
    card.innerHTML = `
      <div>
        <div class="upgrade-name">${upgrade.name} - ${upgrade.cost} coins</div>
        <div class="upgrade-description">${upgrade.description}</div>
      </div>
    `;

    button.type = "button";
    button.textContent = isPurchased ? "Purchased" : "Buy";
    button.disabled = isPurchased;
    button.addEventListener("click", () => buyUpgrade(upgrade.id));

    if (!isPurchased && !canAfford) {
      button.textContent = "Need Coins";
    }

    card.appendChild(button);
    upgradeChoices.appendChild(card);
  });
}

function buyUpgrade(upgradeId) {
  const upgrade = shipUpgrades.find((item) => item.id === upgradeId);

  if (!upgrade || purchasedUpgrades.includes(upgradeId)) {
    return;
  }

  if (totalCoins < upgrade.cost) {
    upgradeMessage.textContent = "Not enough coins for that upgrade.";
    return;
  }

  totalCoins -= upgrade.cost;
  purchasedUpgrades.push(upgradeId);
  applyUpgradeEffect(upgradeId);
  updateHud(`${upgrade.name} purchased!`);
  upgradeMessage.textContent = `${upgrade.name} applied immediately. Wallet: ${totalCoins} coins.`;
  renderUpgradeChoices();
}

function applyUpgradeEffect(upgradeId) {
  if (upgradeId === "reinforcedHull") {
    maxHealth += 1;
    health = Math.min(health + 1, maxHealth);
  }
}

function continueToWorldMap() {
  upgradeMenu.classList.add("hidden");
  showWorldMap();
}

function unlockCrewForIsland(islandName) {
  if (islandName === "Coconut Island") {
    return addCrewMember("Navigator");
  }

  if (islandName === "Mist Island") {
    return addCrewMember("Cook");
  }

  return "";
}

function addCrewMember(memberName) {
  if (crew.includes(memberName)) {
    return "";
  }

  crew.push(memberName);
  return `${memberName} joined your crew.`;
}

function applyCookEffect() {
  if (!crew.includes("Cook") || health >= 3) {
    return "";
  }

  health += 1;
  return "Cook restored 1 health.";
}

function showWorldMap() {
  const currentMapIndex = Math.min(mapFragments, worldMapRoute.length - 1);

  worldMapMessage.textContent = mapFragments === 3
    ? "All map fragments collected. The path to Treasure Island is revealed!"
    : getWorldMapMessage();
  worldMapIslands.innerHTML = "";

  worldMapRoute.forEach((island, index) => {
    const isCompleted = index < mapFragments && index < levels.length;
    const isUnlocked = index <= mapFragments;
    const isCurrent = index === currentMapIndex;
    const card = document.createElement("div");
    const status = getMapIslandStatus(index, isCompleted, isUnlocked, isCurrent);
    const button = document.createElement("button");

    card.className = `map-island ${isCompleted ? "completed" : ""} ${isCurrent ? "current" : ""} ${isUnlocked ? "" : "locked"}`;
    card.innerHTML = `
      <div class="map-icon">${island.icon}</div>
      <div class="map-name">${island.name}</div>
      <div class="map-status">${status}</div>
    `;

    button.type = "button";
    button.textContent = getMapButtonText(index, isCompleted, isUnlocked, isCurrent);
    button.disabled = !isCurrent || !isUnlocked;
    button.addEventListener("click", () => selectWorldMapIsland(index));
    card.appendChild(button);
    worldMapIslands.appendChild(card);
  });

  worldMap.classList.remove("hidden");
}

function getWorldMapMessage() {
  const baseMessage = "A new route is unlocked. Choose the next island.";
  const hint = getNavigatorHint();

  return hint ? `${baseMessage} Navigator hint: ${hint}` : baseMessage;
}

function getNavigatorHint() {
  if (!crew.includes("Navigator")) {
    return "";
  }

  const nextIsland = worldMapRoute[Math.min(mapFragments, worldMapRoute.length - 1)];

  if (!nextIsland || nextIsland.name === "Treasure Island") {
    return "The final route shines beyond the last island.";
  }

  return `Sail toward ${nextIsland.name}.`;
}

function getMapIslandStatus(index, isCompleted, isUnlocked, isCurrent) {
  if (isCompleted) {
    return "Completed";
  }
  if (!isUnlocked) {
    return "Locked";
  }
  if (index === 3) {
    return "Unlocked";
  }
  return isCurrent ? "Current route" : "Unlocked";
}

function getMapButtonText(index, isCompleted, isUnlocked, isCurrent) {
  if (isCompleted) {
    return "Completed";
  }
  if (!isUnlocked) {
    return "Locked";
  }
  if (!isCurrent) {
    return "Wait";
  }
  return index === 3 ? "Reveal Treasure Island" : "Sail Here";
}

function selectWorldMapIsland(index) {
  if (index > mapFragments) {
    return;
  }

  worldMap.classList.add("hidden");

  if (index === 3) {
    overlayAction = "restart";
    endGame(
      "Final Treasure Island Unlocked",
      "All map fragments collected. The path to Treasure Island is revealed!"
    );
    return;
  }

  currentLevelIndex = index;
  startLevel();
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

function isRouteQuestionOpen() {
  return !routePanel.classList.contains("hidden");
}

function isWorldMapOpen() {
  return !worldMap.classList.contains("hidden");
}

function isUpgradeMenuOpen() {
  return !upgradeMenu.classList.contains("hidden");
}

function gameLoop(currentTime) {
  const deltaTime = lastFrameTime ? (currentTime - lastFrameTime) / 1000 : 0;
  lastFrameTime = currentTime;

  if (!gameOver && !isRouteQuestionOpen() && !isWorldMapOpen() && !isUpgradeMenuOpen()) {
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
continueMapButton.addEventListener("click", continueToWorldMap);

startGame();
gameLoop();
