const gameArea = document.getElementById("gameArea");
const playerElement = document.getElementById("player");
const enemyElement = document.getElementById("enemy");
const chestElement = document.getElementById("chest");
const levelElement = document.getElementById("level");
const scoreElement = document.getElementById("score");
const coinGoalElement = document.getElementById("coinGoal");
const totalCoinsElement = document.getElementById("totalCoins");
const fragmentsElement = document.getElementById("fragments");
const crewElement = document.getElementById("crew");
const activeFruitElement = document.getElementById("activeFruit");
const playerHpLabel = document.getElementById("playerHpLabel");
const bossHpLabel = document.getElementById("bossHpLabel");
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

const gameWidth = 720;
const gameHeight = 480;
const spriteSize = 34;
const basePlayerSpeed = 220;
const baseMaxHealth = 3;
const bossAttackRange = 100;
const bossAttackThickness = 70;
const bossLockOnRange = 130;
const bossStunDuration = 0.8;
const bossChaseDuration = 3;
const bossRestDuration = 1;
const dashDistance = 90;
const dashCooldownDuration = 2;
const chestPosition = { x: 650, y: 410 };
const playerStartPosition = { x: 35, y: 410 };

let player;
let playerX;
let playerY;
let enemies;
let lavaTraps;
let boss;
let mysteryFruit;
let grandTreasure;
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
let bossActive = false;
let bossEventStarted = false;
let attackCooldown = 0;
let dashCooldown = 0;
let lastDirection = "right";
let activePowerUp = null;
let powerUpTimer = 0;
let shieldCharges = 0;
let finalIslandActive = false;
let bossDefeatToken = 0;

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
      boss: { name: "Giant Crab", icon: "🦀", x: 350, y: 145, speed: 95, hp: 3 },
      enemies: [{ x: 330, y: 235, minX: 145, maxX: 585, speed: 120 }],
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
      boss: { name: "Fog Ghost", icon: "👻", x: 360, y: 110, speed: 105, hp: 5 },
      enemies: [
        { x: 180, y: 145, minX: 80, maxX: 350, speed: 135 },
        { x: 540, y: 325, minX: 410, maxX: 655, speed: 150 }
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
      boss: { name: "Lava Beast", icon: "🔥", x: 365, y: 115, speed: 120, hp: 7 },
      enemies: [
        { x: 170, y: 140, minX: 70, maxX: 340, speed: 150 },
        { x: 560, y: 330, minX: 410, maxX: 660, speed: 165 }
      ],
      lavaTraps: [
        { x: 255, y: 175 },
        { x: 445, y: 240 },
        { x: 305, y: 360 }
      ]
    }
  ]
};

const levels = levelConfig.levels;

const worldMapRoute = [
  { name: "Coconut Island", icon: "🥥" },
  { name: "Mist Island", icon: "🌫️" },
  { name: "Volcano Island", icon: "🌋" },
  { name: "Final Treasure Island", icon: "🏝️" }
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

const mysteryFruits = [
  { id: "wind", name: "Wind Fruit", icon: "🍃" },
  { id: "magnet", name: "Magnet Fruit", icon: "🧲" },
  { id: "shield", name: "Shield Fruit", icon: "🛡️" }
];

const fruitPositions = [
  { x: 135, y: 175 },
  { x: 545, y: 155 },
  { x: 385, y: 320 }
];

const coinPositions = [
  { x: 85, y: 70 },
  { x: 215, y: 50 },
  { x: 370, y: 85 },
  { x: 555, y: 65 },
  { x: 650, y: 190 },
  { x: 500, y: 295 },
  { x: 345, y: 390 },
  { x: 165, y: 350 },
  { x: 65, y: 255 },
  { x: 305, y: 225 },
  { x: 645, y: 115 },
  { x: 445, y: 425 },
  { x: 95, y: 420 },
  { x: 615, y: 350 },
  { x: 405, y: 165 }
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

  finalIslandActive = false;
  player = { ...playerStartPosition };
  playerX = player.x;
  playerY = player.y;
  score = 0;
  health = maxHealth;
  gameOver = false;
  enemyHitCooldown = 0;
  overlayAction = "restart";
  routeQuestionShown = false;
  routeUnlocked = false;
  bossActive = false;
  bossEventStarted = false;
  bossDefeatToken += 1;
  attackCooldown = 0;
  dashCooldown = 0;
  lastDirection = "right";
  activePowerUp = null;
  powerUpTimer = 0;
  shieldCharges = 0;

  playerElement.classList.remove("damaged", "dashing");
  gameArea.classList.remove("shake");
  chestElement.classList.remove("open");
  chestElement.classList.add("hidden");
  routePanel.classList.add("hidden");
  worldMap.classList.add("hidden");
  upgradeMenu.classList.add("hidden");
  gameOverlay.classList.add("hidden");
  removeBoss();
  removeMysteryFruit();
  removeGrandTreasure();
  chestElement.style.left = `${chestPosition.x}px`;
  chestElement.style.top = `${chestPosition.y}px`;

  applyLevelStyle(level);
  createCoins(level.coinCount);
  createEnemies(level.enemies);
  createLavaTraps(level.lavaTraps);
  createMysteryFruit();
  updateHud(`Collect all ${level.coinCount} coins!`);
  drawSprites();
}

function applyLevelStyle(level) {
  gameArea.classList.remove("level-coconut", "level-mist", "level-volcano", "level-treasure");
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
  enemyElement.style.display = "grid";

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

function createMysteryFruit() {
  removeMysteryFruit();

  const fruit = mysteryFruits[Math.floor(Math.random() * mysteryFruits.length)];
  const position = fruitPositions[currentLevelIndex] || fruitPositions[0];
  const element = document.createElement("div");

  element.className = "sprite fruit";
  element.textContent = fruit.icon;
  gameArea.appendChild(element);

  mysteryFruit = {
    ...fruit,
    x: position.x,
    y: position.y,
    collected: false,
    element
  };
}

function removeMysteryFruit() {
  if (mysteryFruit && mysteryFruit.element) {
    mysteryFruit.element.remove();
  }

  mysteryFruit = null;
}

function startFinalTreasureIsland() {
  finalIslandActive = true;
  currentLevelIndex = levels.length - 1;
  player = { ...playerStartPosition };
  playerX = player.x;
  playerY = player.y;
  score = 0;
  gameOver = false;
  enemyHitCooldown = 0;
  bossActive = false;
  bossEventStarted = false;
  bossDefeatToken += 1;
  attackCooldown = 0;
  dashCooldown = 0;
  lastDirection = "right";
  playerElement.classList.remove("damaged", "dashing");
  routePanel.classList.add("hidden");
  worldMap.classList.add("hidden");
  upgradeMenu.classList.add("hidden");
  gameOverlay.classList.add("hidden");
  chestElement.classList.add("hidden");
  enemyElement.style.display = "none";
  removeBoss();
  removeMysteryFruit();
  removeGrandTreasure();
  clearLevelObjects();
  gameArea.classList.remove("level-coconut", "level-mist", "level-volcano");
  gameArea.classList.add("level-treasure");
  createGrandTreasure();
  updateHud("Open the Grand Treasure to complete the adventure!");
  drawSprites();
}

function clearLevelObjects() {
  document.querySelectorAll(".coin, .lava, .extra-enemy").forEach((element) => element.remove());
  coins = [];
  lavaTraps = [];
  enemies = [];
}

function createGrandTreasure() {
  const element = document.createElement("div");
  element.className = "sprite grand-treasure";
  element.textContent = "💎";
  gameArea.appendChild(element);

  grandTreasure = {
    x: 585,
    y: 235,
    element
  };
}

function removeGrandTreasure() {
  if (grandTreasure && grandTreasure.element) {
    grandTreasure.element.remove();
  }

  grandTreasure = null;
}

function updateHud(message) {
  const level = levels[currentLevelIndex];

  levelElement.textContent = finalIslandActive ? "Final - Treasure Island" : `${currentLevelIndex + 1} - ${level.name}`;
  scoreElement.textContent = score;
  coinGoalElement.textContent = finalIslandActive ? 0 : level.coinCount;
  totalCoinsElement.textContent = totalCoins;
  fragmentsElement.textContent = mapFragments;
  crewElement.textContent = crew.length > 0 ? crew.join(", ") : "None";
  activeFruitElement.textContent = getActiveFruitText();
  statusElement.textContent = message;
  updateHpLabels();
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

  if (mysteryFruit) {
    mysteryFruit.element.style.left = `${mysteryFruit.x}px`;
    mysteryFruit.element.style.top = `${mysteryFruit.y}px`;
    mysteryFruit.element.style.display = mysteryFruit.collected ? "none" : "grid";
  }

  if (boss) {
    boss.element.style.left = `${boss.x}px`;
    boss.element.style.top = `${boss.y}px`;
  }

  if (grandTreasure) {
    grandTreasure.element.style.left = `${grandTreasure.x}px`;
    grandTreasure.element.style.top = `${grandTreasure.y}px`;
  }

  updateHpLabels();
}

function updateHpLabels() {
  playerHpLabel.textContent = `HP: ${health}`;
  playerHpLabel.style.left = `${keepInside(player.x - 7, gameWidth - 48)}px`;
  playerHpLabel.style.top = `${keepInside(player.y + spriteSize + 2, gameHeight - 16)}px`;

  if (bossActive && boss) {
    bossHpLabel.textContent = `Boss HP: ${boss.hp}`;
    bossHpLabel.style.left = `${keepInside(boss.x - 15, gameWidth - 72)}px`;
    bossHpLabel.style.top = `${keepInside(boss.y + 44, gameHeight - 16)}px`;
    bossHpLabel.classList.remove("hidden");
    return;
  }

  bossHpLabel.classList.add("hidden");
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

function dashPlayer() {
  if (gameOver || isRouteQuestionOpen() || isWorldMapOpen() || isUpgradeMenuOpen()) {
    return;
  }

  if (dashCooldown > 0) {
    updateHud(`Dash ready in ${Math.ceil(dashCooldown)}s.`);
    return;
  }

  const dashDirection = getDirectionVector(lastDirection);

  playerX = keepInside(playerX + dashDirection.x * dashDistance, gameWidth - spriteSize);
  playerY = keepInside(playerY + dashDirection.y * dashDistance, gameHeight - spriteSize);
  player.x = playerX;
  player.y = playerY;
  dashCooldown = dashCooldownDuration;
  playDashEffect();
  drawSprites();
  updateHud("Dash!");
}

function playDashEffect() {
  playerElement.classList.remove("dashing");
  void playerElement.offsetWidth;
  playerElement.classList.add("dashing");
  setTimeout(() => playerElement.classList.remove("dashing"), 180);
}

function getDirectionVector(direction) {
  if (direction === "left") {
    return { x: -1, y: 0 };
  }

  if (direction === "up") {
    return { x: 0, y: -1 };
  }

  if (direction === "down") {
    return { x: 0, y: 1 };
  }

  return { x: 1, y: 0 };
}

function updateLastDirection(key) {
  if (key === "arrowup" || key === "w") {
    lastDirection = "up";
  } else if (key === "arrowdown" || key === "s") {
    lastDirection = "down";
  } else if (key === "arrowleft" || key === "a") {
    lastDirection = "left";
  } else if (key === "arrowright" || key === "d") {
    lastDirection = "right";
  }
}

function getDirectionToBoss() {
  if (!bossActive || !boss) {
    return lastDirection;
  }

  const playerCenter = getSpriteCenter(player);
  const bossCenter = getSpriteCenter(boss);
  const dx = bossCenter.x - playerCenter.x;
  const dy = bossCenter.y - playerCenter.y;
  const distance = Math.hypot(dx, dy);

  if (distance > bossLockOnRange) {
    return lastDirection;
  }

  if (Math.abs(dx) >= Math.abs(dy)) {
    return dx < 0 ? "left" : "right";
  }

  return dy < 0 ? "up" : "down";
}

function getSpriteCenter(sprite) {
  return {
    x: sprite.x + spriteSize / 2,
    y: sprite.y + spriteSize / 2
  };
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
  return GameLogic.keepInside(value, max);
}

function checkCollisions(deltaTime) {
  if (finalIslandActive) {
    if (grandTreasure && isTouching(player, grandTreasure)) {
      completeFinalAdventure();
    }
    return;
  }

  const level = levels[currentLevelIndex];

  if (mysteryFruit && !mysteryFruit.collected && isTouching(player, mysteryFruit)) {
    activateMysteryFruit(mysteryFruit);
  }

  coins.forEach((coin) => {
    if (!coin.collected && isTouching(player, coin)) {
      coin.collected = true;
      score += 1;
      if (score === level.coinCount) {
        startBossEvent(level);
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

  if (routeUnlocked && isTouching(player, chestPosition)) {
    completeLevel();
  }
}

function startBossEvent(level) {
  if (bossEventStarted) {
    return;
  }

  bossEventStarted = true;
  bossActive = true;
  createBoss(level.boss);
  updateHud(`${level.boss.name} appeared! Press Space near the boss to attack.`);
}

function createBoss(settings) {
  removeBoss();

  const element = document.createElement("div");
  element.className = "sprite boss";
  element.textContent = settings.icon;
  gameArea.appendChild(element);

  boss = {
    ...settings,
    maxHp: settings.hp,
    phase: "chase",
    phaseTimer: bossChaseDuration,
    stunTimer: 0,
    element
  };
}

function removeBoss() {
  if (boss && boss.element) {
    boss.element.remove();
  }

  boss = null;
  bossHpLabel.classList.add("hidden");
}

function updateBoss(deltaTime) {
  if (!bossActive || !boss) {
    return;
  }

  updateBossTimers(deltaTime);

  if (canBossMove()) {
    moveBoss(deltaTime);
  }

  checkBossCollision();

  if (gameOver) {
    return;
  }

  statusElement.textContent = getBossFightStatus();
}

function updateBossTimers(deltaTime) {
  if (boss.stunTimer > 0) {
    boss.stunTimer = Math.max(0, boss.stunTimer - deltaTime);
    return;
  }

  boss.phaseTimer = Math.max(0, boss.phaseTimer - deltaTime);

  if (boss.phaseTimer > 0) {
    return;
  }

  if (boss.phase === "chase") {
    boss.phase = "rest";
    boss.phaseTimer = bossRestDuration;
  } else {
    boss.phase = "chase";
    boss.phaseTimer = bossChaseDuration;
  }
}

function canBossMove() {
  return boss.stunTimer === 0 && boss.phase === "chase";
}

function getBossFightStatus() {
  if (boss.stunTimer > 0) {
    return `${boss.name} is stunned! Attack while you can.`;
  }

  if (boss.phase === "rest") {
    return `${boss.name} is resting. Move in and attack!`;
  }

  return `${boss.name} HP: ${boss.hp}/${boss.maxHp}. Press Space to attack.`;
}

function moveBoss(deltaTime) {
  const dx = player.x - boss.x;
  const dy = player.y - boss.y;
  const distance = Math.hypot(dx, dy) || 1;

  boss.x = keepInside(boss.x + (dx / distance) * boss.speed * deltaTime, gameWidth - spriteSize);
  boss.y = keepInside(boss.y + (dy / distance) * boss.speed * deltaTime, gameHeight - spriteSize);
}

function checkBossCollision() {
  if (!canBossDamagePlayer()) {
    return;
  }

  if (enemyHitCooldown === 0 && isTouching(player, boss)) {
    takeDamage(`${boss.name} hit you! Keep dodging.`, `${boss.name} ended your quest.`, {
      knockbackFrom: boss,
      flash: true,
      playerDamageText: true
    });
  }
}

function canBossDamagePlayer() {
  return boss && boss.phase === "chase" && boss.stunTimer === 0;
}

function attackBoss() {
  if (!bossActive || !boss || gameOver) {
    return;
  }

  const attackDirection = getDirectionToBoss();
  const attackArea = GameLogic.getAttackArea(player, attackDirection, {
    spriteSize,
    range: bossAttackRange,
    thickness: bossAttackThickness
  });
  const result = GameLogic.attackBoss(player, boss, {
    spriteSize,
    range: bossAttackRange,
    thickness: bossAttackThickness,
    direction: attackDirection,
    attackArea,
    damage: 1,
    cooldown: attackCooldown,
    hitCooldown: 0.6,
    missCooldown: 0.2
  });

  attackCooldown = result.cooldown;

  if (result.reason === "cooldown") {
    return;
  }

  showSlashEffect(attackArea, attackDirection);

  if (!result.hit) {
    updateHud("Move closer to attack the boss!");
    return;
  }

  boss.hp = result.bossHp;
  boss.stunTimer = bossStunDuration;
  playBossHitEffect();
  showFloatingText("-1 HP", boss.x + 5, boss.y - 10, "damage");
  updateHud(`${boss.name} hit! Boss HP: ${boss.hp}/${boss.maxHp}`);

  if (result.defeated) {
    finishBossEvent();
  }
}

function finishBossEvent() {
  const level = levels[currentLevelIndex];
  const defeatedBoss = boss;
  const defeatToken = bossDefeatToken + 1;

  bossDefeatToken = defeatToken;
  bossActive = false;
  attackCooldown = 0;

  if (defeatedBoss && defeatedBoss.element) {
    defeatedBoss.element.classList.add("defeated");
    showFloatingText("Defeated!", defeatedBoss.x - 4, defeatedBoss.y - 14, "defeat");
  }

  updateHud(getBossDefeatMessage(level.boss.name));

  setTimeout(() => {
    if (bossDefeatToken !== defeatToken || gameOver || finalIslandActive) {
      return;
    }

    removeBoss();
    showRouteQuestion(level);
  }, 750);
}

function getBossDefeatMessage(bossName) {
  if (bossName === "Giant Crab") {
    return "The Giant Crab dropped a sea clue!";
  }

  if (bossName === "Fog Ghost") {
    return "The Fog Ghost vanished and revealed a hidden route!";
  }

  if (bossName === "Lava Beast") {
    return "The Lava Beast collapsed and the final clue appears!";
  }

  return `${bossName} defeated! Read the island clue.`;
}

function showSlashEffect(attackArea, direction) {
  const slash = document.createElement("div");

  slash.className = `slash-effect ${direction}`;
  slash.textContent = "⚔";
  slash.style.left = `${keepInside(attackArea.x + attackArea.width / 2 - 17, gameWidth - 34)}px`;
  slash.style.top = `${keepInside(attackArea.y + attackArea.height / 2 - 17, gameHeight - 34)}px`;
  gameArea.appendChild(slash);
  setTimeout(() => slash.remove(), 260);
}

function playBossHitEffect() {
  if (!boss || !boss.element) {
    return;
  }

  boss.element.classList.remove("hit");
  void boss.element.offsetWidth;
  boss.element.classList.add("hit");
  setTimeout(() => {
    if (boss && boss.element) {
      boss.element.classList.remove("hit");
    }
  }, 520);
}

function showFloatingText(text, x, y, type) {
  const floatingText = document.createElement("div");

  floatingText.className = `floating-text ${type || ""}`.trim();
  floatingText.textContent = text;
  floatingText.style.left = `${keepInside(x, gameWidth - 80)}px`;
  floatingText.style.top = `${keepInside(y, gameHeight - 20)}px`;
  gameArea.appendChild(floatingText);
  setTimeout(() => floatingText.remove(), 850);
}

function getPlayerSpeed() {
  return GameLogic.getPlayerSpeed(
    basePlayerSpeed,
    purchasedUpgrades.includes("strongSail"),
    activePowerUp ? activePowerUp.id : null
  );
}

function activateMysteryFruit(fruit) {
  fruit.collected = true;
  activePowerUp = fruit;

  if (fruit.id === "shield") {
    shieldCharges = 1;
    powerUpTimer = 0;
    updateHud("Shield Fruit activated! It will block one hit.");
    return;
  }

  powerUpTimer = 5;
  updateHud(`${fruit.name} activated for 5 seconds!`);
}

function updatePowerUp(deltaTime) {
  if (!activePowerUp) {
    return;
  }

  if (activePowerUp.id === "magnet") {
    pullNearbyCoins(deltaTime);
  }

  if (activePowerUp.id === "shield") {
    return;
  }

  powerUpTimer = Math.max(0, powerUpTimer - deltaTime);

  if (powerUpTimer === 0) {
    expirePowerUp();
  }
}

function pullNearbyCoins(deltaTime) {
  coins.forEach((coin) => {
    if (coin.collected) {
      return;
    }

    const dx = player.x - coin.x;
    const dy = player.y - coin.y;
    const distance = Math.hypot(dx, dy);

    if (distance > 150 || distance === 0) {
      return;
    }

    coin.x += (dx / distance) * 180 * deltaTime;
    coin.y += (dy / distance) * 180 * deltaTime;
  });
}

function expirePowerUp() {
  activePowerUp = null;
  powerUpTimer = 0;
  updateHud("Mystery Fruit effect faded.");
}

function getActiveFruitText() {
  if (!activePowerUp) {
    return "None";
  }

  if (activePowerUp.id === "shield") {
    return shieldCharges > 0 ? "Shield Fruit" : "None";
  }

  return `${activePowerUp.name} (${Math.ceil(powerUpTimer)}s)`;
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
  const result = GameLogic.answerRouteQuestion(choiceIndex, level.correctChoice, health);

  if (result.isCorrect) {
    routeUnlocked = true;
    routePanel.classList.add("hidden");
    chestElement.classList.remove("hidden");
    chestElement.classList.add("open");
    updateHud(result.message);
    completeLevel();
    return;
  }

  health = result.health;
  updateHud(result.message);

  if (health <= 0) {
    routePanel.classList.add("hidden");
    endGame("Game Over", "Wrong answer! The sea path is still hidden.");
  }
}

function takeDamage(statusMessage, gameOverMessage, options = {}) {
  const result = GameLogic.applyDamage({
    health,
    shieldCharges,
    cooldown: enemyHitCooldown,
    damageCooldown: 1
  });

  health = result.health;
  shieldCharges = result.shieldCharges;
  enemyHitCooldown = result.cooldown;
  updateHpLabels();

  if (result.blocked) {
    activePowerUp = null;
    updateHud("Shield Fruit blocked the hit!");
    return;
  }

  if (options.flash) {
    flashPlayer();
  }

  if (options.knockbackFrom) {
    knockPlayerBack(options.knockbackFrom);
  }

  if (options.shake) {
    shakeGameArea();
  }

  if (options.playerDamageText) {
    showFloatingText("-1 HP", player.x + 2, player.y - 9, "damage");
  }

  updateHud(statusMessage);

  if (result.gameOver) {
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
  upgradeMessage.textContent = getUpgradeMenuMessage();
  continueMapButton.textContent = "Open World Map";
  upgradeMenu.classList.remove("hidden");
}

function getUpgradeMenuMessage() {
  const nextIslandName = GameLogic.getNextIslandName(mapFragments, worldMapRoute);

  if (nextIslandName && nextIslandName !== "Final Treasure Island") {
    return `${nextIslandName} is unlocked. Wallet: ${totalCoins} coins. Buy upgrades or open the World Map.`;
  }

  return `Final Treasure Island is unlocked. Wallet: ${totalCoins} coins. Buy upgrades or open the World Map.`;
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
  const result = GameLogic.buyUpgrade(totalCoins, purchasedUpgrades, upgrade);

  if (!upgrade || result.reason === "already-purchased") {
    return;
  }

  if (result.reason === "not-enough-coins") {
    upgradeMessage.textContent = "Not enough coins for that upgrade.";
    return;
  }

  totalCoins = result.wallet;
  purchasedUpgrades = result.purchasedUpgrades;
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
  const nextHealth = GameLogic.applyCookHeal(health, maxHealth, crew.includes("Cook"));

  if (nextHealth === health) {
    return "";
  }

  health = nextHealth;
  return "Cook restored 1 health.";
}

function showWorldMap() {
  const currentMapIndex = GameLogic.getUnlockedIslandIndex(mapFragments, worldMapRoute.length);

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

  if (!nextIsland || nextIsland.name === "Final Treasure Island") {
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
  if (!GameLogic.canSelectIsland(index, mapFragments)) {
    return;
  }

  worldMap.classList.add("hidden");

  if (index === 3) {
    startFinalTreasureIsland();
    return;
  }

  currentLevelIndex = index;
  startLevel();
}

function completeFinalAdventure() {
  gameOver = true;
  finalIslandActive = false;
  removeGrandTreasure();
  overlayAction = "restart";
  endGame(
    "Grand Treasure Found",
    "Congratulations! You found the Grand Treasure and became the Captain of the Tiny Sea! Rewards: Pirate Captain Hat, Golden Compass, Grand Treasure."
  );
  overlayRestartButton.textContent = "Restart Adventure";
}

function isTouching(a, b) {
  return GameLogic.isTouching(a, b, spriteSize);
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
    attackCooldown = Math.max(0, attackCooldown - deltaTime);
    dashCooldown = Math.max(0, dashCooldown - deltaTime);
    movePlayer(deltaTime);
    moveEnemies(deltaTime);
    updatePowerUp(deltaTime);
    checkCollisions(deltaTime);
    updateBoss(deltaTime);
    drawSprites();
  }

  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();

  if (event.key === "Shift") {
    event.preventDefault();
    if (!event.repeat) {
      dashPlayer();
    }
    return;
  }

  if (event.code === "Space") {
    event.preventDefault();
    attackBoss();
    return;
  }

  if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].includes(key)) {
    event.preventDefault();
    updateLastDirection(key);
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
