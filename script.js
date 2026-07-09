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
const heartHealthElement = document.getElementById("heartHealth");
const questIslandElement = document.getElementById("questIsland");
const questObjectiveElement = document.getElementById("questObjective");
const questCoinsElement = document.getElementById("questCoins");
const questCoinGoalElement = document.getElementById("questCoinGoal");
const questFragmentsElement = document.getElementById("questFragments");
const questSideObjectiveElement = document.getElementById("questSideObjective");
const questSideProgressElement = document.getElementById("questSideProgress");
const questWalletElement = document.getElementById("questWallet");
const questNextActionElement = document.getElementById("questNextAction");
const questHintElement = document.getElementById("questHint");
const battlePanel = document.getElementById("battlePanel");
const battleBossName = document.getElementById("battleBossName");
const battleBossHpText = document.getElementById("battleBossHpText");
const battleBossHpFill = document.getElementById("battleBossHpFill");
const battleBossPhase = document.getElementById("battleBossPhase");
const battleHint = document.getElementById("battleHint");
const toastContainer = document.getElementById("toastContainer");
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
const shipRoute = document.getElementById("shipRoute");
const sailingOverlay = document.getElementById("sailingOverlay");
const sailingMessage = document.getElementById("sailingMessage");
const upgradeMenu = document.getElementById("upgradeMenu");
const upgradeWallet = document.getElementById("upgradeWallet");
const upgradeMessage = document.getElementById("upgradeMessage");
const upgradeChoices = document.getElementById("upgradeChoices");
const continueMapButton = document.getElementById("continueMapButton");
const introOverlay = document.getElementById("introOverlay");
const startAdventureButton = document.getElementById("startAdventureButton");

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
const gunCooldownDuration = 0.9;
const bulletSpeed = 420;
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
let bullets = [];
let npc = null;
let sideQuestItems = [];
let lavaBursts = [];
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
let gunCooldown = 0;
let lastDirection = "right";
let activePowerUp = null;
let powerUpTimer = 0;
let shieldCharges = 0;
let finalIslandActive = false;
let ghostPirateDefeated = false;
let bossDefeatToken = 0;
let introActive = true;

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
      boss: { name: "Giant Crab", type: "crab", icon: "\uD83E\uDD80", x: 350, y: 145, speed: 95, hp: 5 },
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
      boss: { name: "Fog Ghost", type: "fog", icon: "\uD83D\uDC7B", x: 360, y: 110, speed: 105, hp: 7 },
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
      boss: { name: "Lava Beast", type: "lava", icon: "\uD83D\uDD25", x: 365, y: 115, speed: 120, hp: 9 },
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
  },
  {
    id: "sharpSword",
    name: "Sharp Sword",
    cost: 9,
    description: "Increase melee damage and swing size for close combat."
  },
  {
    id: "pirateGun",
    name: "Pirate Gun",
    cost: 12,
    description: "Unlock ranged attacks with J. Bullets have a cooldown."
  },
  {
    id: "heartPotion",
    name: "Heart Potion",
    cost: 4,
    description: "Restore 1 HP immediately. Can be bought multiple times.",
    consumable: true
  }
];

const ghostPirateBoss = {
  name: "Ghost Pirate",
  type: "ghostPirate",
  icon: "☠️",
  x: 370,
  y: 150,
  speed: 112,
  hp: 12
};

const sideQuestConfigs = [
  {
    island: "Coconut Island",
    npcName: "Shell Scout",
    npcIcon: "🧑",
    npc: { x: 95, y: 120 },
    objective: "Collect 3 shells",
    itemName: "shells",
    itemIcon: "🐚",
    target: 3,
    reward: "3 coins",
    positions: [
      { x: 120, y: 285 },
      { x: 420, y: 60 },
      { x: 615, y: 300 }
    ]
  },
  {
    island: "Mist Island",
    npcName: "Fog Keeper",
    npcIcon: "🧙",
    npc: { x: 105, y: 118 },
    objective: "Collect 2 ghost lights",
    itemName: "ghost lights",
    itemIcon: "✨",
    target: 2,
    reward: "heal 1 HP",
    positions: [
      { x: 250, y: 340 },
      { x: 600, y: 130 }
    ]
  },
  {
    island: "Volcano Island",
    npcName: "Ash Miner",
    npcIcon: "⛏️",
    npc: { x: 115, y: 118 },
    objective: "Collect 2 fire stones",
    itemName: "fire stones",
    itemIcon: "🪨",
    target: 2,
    reward: "4 coins and a boss hint",
    positions: [
      { x: 210, y: 300 },
      { x: 590, y: 185 }
    ]
  }
];

let sideQuestState = sideQuestConfigs.map((quest) => ({
  island: quest.island,
  progress: 0,
  rewarded: false
}));

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
  sideQuestState = sideQuestConfigs.map((quest) => ({
    island: quest.island,
    progress: 0,
    rewarded: false
  }));
  startLevel();
}

function startAdventure() {
  introActive = false;
  introOverlay.classList.add("hidden");
  updateHud("Collect coins to begin your quest.");
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
  gunCooldown = 0;
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
  sailingOverlay.classList.add("hidden");
  removeBoss();
  removeMysteryFruit();
  removeGrandTreasure();
  clearBullets();
  clearLavaBursts();
  chestElement.style.left = `${chestPosition.x}px`;
  chestElement.style.top = `${chestPosition.y}px`;

  applyLevelStyle(level);
  createCoins(level.coinCount);
  createEnemies(level.enemies);
  createLavaTraps(level.lavaTraps);
  createMysteryFruit();
  createSideQuest(level);
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

function createSideQuest(level) {
  clearSideQuestObjects();

  const config = sideQuestConfigs.find((quest) => quest.island === level.name);

  if (!config) {
    return;
  }

  const npcElement = document.createElement("div");
  npcElement.className = "sprite npc";
  npcElement.textContent = config.npcIcon;
  gameArea.appendChild(npcElement);

  npc = {
    ...config.npc,
    name: config.npcName,
    config,
    element: npcElement
  };

  sideQuestItems = config.positions.map((position) => {
    const element = document.createElement("div");
    element.className = "sprite side-quest-item";
    element.textContent = config.itemIcon;
    gameArea.appendChild(element);

    return {
      ...position,
      collected: false,
      element
    };
  });
}

function clearSideQuestObjects() {
  if (npc && npc.element) {
    npc.element.remove();
  }

  sideQuestItems.forEach((item) => item.element.remove());
  npc = null;
  sideQuestItems = [];
}

function startFinalTreasureIsland() {
  finalIslandActive = true;
  ghostPirateDefeated = false;
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
  gunCooldown = 0;
  lastDirection = "right";
  playerElement.classList.remove("damaged", "dashing");
  routePanel.classList.add("hidden");
  worldMap.classList.add("hidden");
  upgradeMenu.classList.add("hidden");
  gameOverlay.classList.add("hidden");
  sailingOverlay.classList.add("hidden");
  chestElement.classList.add("hidden");
  enemyElement.style.display = "none";
  removeBoss();
  removeMysteryFruit();
  removeGrandTreasure();
  clearBullets();
  clearLavaBursts();
  clearLevelObjects();
  gameArea.classList.remove("level-coconut", "level-mist", "level-volcano");
  gameArea.classList.add("level-treasure");
  createGrandTreasure();
  startBossEvent({ boss: ghostPirateBoss });
  updateHud("Defeat the Ghost Pirate to unlock the Grand Treasure!");
  drawSprites();
}

function clearLevelObjects() {
  document.querySelectorAll(".coin, .lava, .extra-enemy").forEach((element) => element.remove());
  coins = [];
  lavaTraps = [];
  enemies = [];
  clearSideQuestObjects();
}

function createGrandTreasure() {
  const element = document.createElement("div");
  element.className = "sprite grand-treasure locked";
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
  updateHeartHealth();
  updateQuestPanel();
  updateBattlePanel();
}

function updateHeartHealth() {
  const currentHearts = Math.max(0, health);
  heartHealthElement.textContent = currentHearts > 0 ? "\u2764\uFE0F".repeat(currentHearts) : "No hearts";
  heartHealthElement.title = `${health}/${maxHealth} HP`;
}

function updateQuestPanel() {
  const level = levels[currentLevelIndex];
  const coinGoal = finalIslandActive ? 0 : level.coinCount;

  questIslandElement.textContent = finalIslandActive ? "Final Treasure Island" : level.name;
  questObjectiveElement.textContent = getQuestObjective();
  questCoinsElement.textContent = score;
  questCoinGoalElement.textContent = coinGoal;
  questFragmentsElement.textContent = `${mapFragments}/3`;
  questSideObjectiveElement.textContent = getSideQuestObjectiveText();
  questSideProgressElement.textContent = getSideQuestProgressText();
  questWalletElement.textContent = `${totalCoins} coins`;
  questNextActionElement.textContent = getNextActionText();
  questHintElement.textContent = getQuestHint();
}

function getQuestObjective() {
  if (finalIslandActive) {
    return ghostPirateDefeated ? "Open the Grand Treasure" : "Defeat the Ghost Pirate";
  }

  if (isUpgradeMenuOpen()) {
    return "Buy upgrades or continue";
  }

  if (isWorldMapOpen()) {
    return mapFragments >= 3 ? "Sail to Treasure Island" : "Sail to next island";
  }

  if (isRouteQuestionOpen()) {
    return "Solve the route clue";
  }

  if (bossActive) {
    return "Boss appeared! Defeat the boss";
  }

  if (score < levels[currentLevelIndex].coinCount) {
    return "Collect all coins";
  }

  if (routeUnlocked) {
    return "Open World Map";
  }

  return "Explore the island";
}

function getQuestHint() {
  if (introActive) {
    return "Press Start Adventure when ready.";
  }

  if (finalIslandActive) {
    return ghostPirateDefeated
      ? "Reach the Grand Treasure and open it."
      : "Defeat the Ghost Pirate first. Dash away from warning attacks.";
  }

  if (isUpgradeMenuOpen()) {
    return "Spend wallet coins or open the World Map.";
  }

  if (isWorldMapOpen()) {
    return "Choose the highlighted unlocked island.";
  }

  if (isRouteQuestionOpen()) {
    return "Use the island clue to choose the correct answer.";
  }

  if (bossActive) {
    return "Attack during rest or stun. Dash away during chase.";
  }

  if (score < levels[currentLevelIndex].coinCount) {
    return "Collect every visible coin to summon the boss.";
  }

  return "Follow the next panel or map prompt.";
}

function getNextActionText() {
  if (introActive) {
    return "Start Adventure";
  }
  if (isUpgradeMenuOpen()) {
    return "Buy or continue";
  }
  if (isWorldMapOpen()) {
    return "Choose island";
  }
  if (isRouteQuestionOpen()) {
    return "Answer clue";
  }
  if (bossActive) {
    return purchasedUpgrades.includes("pirateGun") ? "Space or J" : "Attack boss";
  }
  if (finalIslandActive) {
    return ghostPirateDefeated ? "Open treasure" : "Fight boss";
  }
  if (npc && isTouching(player, npc)) {
    return "Press E";
  }
  if (score < levels[currentLevelIndex].coinCount) {
    return "Collect coins";
  }
  return routeUnlocked ? "Open map" : "Explore";
}

function getCurrentSideQuestConfig() {
  if (finalIslandActive) {
    return null;
  }

  return sideQuestConfigs.find((quest) => quest.island === levels[currentLevelIndex].name) || null;
}

function getCurrentSideQuestState() {
  const config = getCurrentSideQuestConfig();

  if (!config) {
    return null;
  }

  return sideQuestState.find((quest) => quest.island === config.island) || null;
}

function getSideQuestObjectiveText() {
  const config = getCurrentSideQuestConfig();
  const state = getCurrentSideQuestState();

  if (!config || !state) {
    return "None";
  }

  return state.rewarded ? "Complete" : config.objective;
}

function getSideQuestProgressText() {
  const config = getCurrentSideQuestConfig();
  const state = getCurrentSideQuestState();

  if (!config || !state) {
    return "-";
  }

  if (state.rewarded) {
    return `Rewarded: ${config.reward}`;
  }

  return `${state.progress}/${config.target}`;
}

function updateBattlePanel() {
  if (!bossActive || !boss) {
    battlePanel.classList.add("hidden");
    return;
  }

  const hpPercent = boss.maxHp > 0 ? (boss.hp / boss.maxHp) * 100 : 0;

  battleBossName.textContent = boss.name;
  battleBossHpText.textContent = `HP: ${boss.hp} / ${boss.maxHp}`;
  battleBossHpFill.style.width = `${Math.max(0, hpPercent)}%`;
  battleBossPhase.textContent = getBossPhaseLabel();
  battleHint.textContent = getBattleHintText();
  battlePanel.classList.remove("hidden");
}

function getBossPhaseLabel() {
  if (!boss) {
    return "None";
  }

  if (boss.stunTimer > 0) {
    return "Stunned";
  }

  if (boss.invulnerableTimer > 0) {
    return "Invulnerable";
  }

  if (boss.vulnerableWarningTimer > 0) {
    return "Reforming";
  }

  if (boss.type === "crab" && boss.hp <= 2) {
    return "Enraged";
  }

  if (boss.type === "ghostPirate" && boss.hp <= 6) {
    return "Ghost Rage";
  }

  if (boss.warningAttackTimer > 0 || lavaBursts.some((burst) => burst.state === "warning")) {
    return "Warning Attack";
  }

  return boss.phase === "rest" ? "Resting" : "Chasing";
}

function getBattleHintText() {
  if (!boss) {
    return "";
  }

  if (boss.invulnerableTimer > 0) {
    return "Invulnerable: dodge and wait.";
  }

  if (boss.vulnerableWarningTimer > 0) {
    return "Warning: attack window soon!";
  }

  if (boss.warningAttackTimer > 0 || lavaBursts.some((burst) => burst.state === "warning")) {
    return "Warning attack incoming. Dash clear!";
  }

  if (boss.stunTimer > 0 || boss.phase === "rest") {
    return "Attack now!";
  }

  return purchasedUpgrades.includes("pirateGun") ? "Dodge, then use Space or J." : "Attack during rest or stun!";
}

function showToast(message) {
  const toast = document.createElement("div");

  toast.className = "toast";
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => toast.remove(), 2500);
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

  sideQuestItems.forEach((item) => {
    item.element.style.left = `${item.x}px`;
    item.element.style.top = `${item.y}px`;
    item.element.style.display = item.collected ? "none" : "grid";
  });

  if (npc) {
    npc.element.style.left = `${npc.x}px`;
    npc.element.style.top = `${npc.y}px`;
  }

  lavaTraps.forEach((lava) => {
    lava.element.style.left = `${lava.x}px`;
    lava.element.style.top = `${lava.y}px`;
  });

  lavaBursts.forEach((burst) => {
    burst.element.style.left = `${burst.x}px`;
    burst.element.style.top = `${burst.y}px`;
  });

  bullets.forEach((bullet) => {
    bullet.element.style.left = `${bullet.x}px`;
    bullet.element.style.top = `${bullet.y}px`;
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
  if (introActive || gameOver || isRouteQuestionOpen() || isWorldMapOpen() || isUpgradeMenuOpen()) {
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
  if (enemyHitCooldown > 0) {
    enemyHitCooldown = Math.max(0, enemyHitCooldown - deltaTime);
  }

  if (finalIslandActive) {
    if (grandTreasure && ghostPirateDefeated && isTouching(player, grandTreasure)) {
      completeFinalAdventure();
    } else if (grandTreasure && !ghostPirateDefeated && isTouching(player, grandTreasure)) {
      updateHud("The Grand Treasure is locked by the Ghost Pirate.");
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
      showToast("Coin collected!");
      if (score === level.coinCount) {
        startBossEvent(level);
      } else {
        updateHud(getCoinStatusMessage(level));
      }
    }
  });

  sideQuestItems.forEach((item) => {
    if (item.collected || !isTouching(player, item)) {
      return;
    }

    item.collected = true;
    advanceSideQuest();
  });

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

  if (enemyHitCooldown === 0 && lavaBursts.some((burst) => burst.state === "active" && isTouching(player, burst))) {
    takeDamage("Lava burst! Watch the warning zones.", "A lava burst ended your quest.", {
      shake: true,
      playerDamageText: true
    });
  }

  if (routeUnlocked && isTouching(player, chestPosition)) {
    completeLevel();
  }
}

function advanceSideQuest() {
  const config = getCurrentSideQuestConfig();
  const state = getCurrentSideQuestState();

  if (!config || !state || state.rewarded) {
    return;
  }

  state.progress = Math.min(config.target, state.progress + 1);
  showToast(`${config.itemName} ${state.progress}/${config.target}`);
  updateHud(`${config.objective}: ${state.progress}/${config.target}`);
}

function interactWithNpc() {
  const config = getCurrentSideQuestConfig();
  const state = getCurrentSideQuestState();

  if (!config || !state || !npc || !isTouching(player, npc)) {
    return;
  }

  if (state.rewarded) {
    showToast(`${config.npcName}: Thanks again!`);
    updateHud(`${config.npcName} already gave your reward.`);
    return;
  }

  if (state.progress < config.target) {
    showToast(`${config.npcName}: ${config.objective}.`);
    updateHud(`${config.npcName} wants ${config.objective.toLowerCase()}. Progress: ${state.progress}/${config.target}.`);
    return;
  }

  grantSideQuestReward(config, state);
}

function grantSideQuestReward(config, state) {
  state.rewarded = true;

  if (config.island === "Coconut Island") {
    totalCoins += 3;
    showToast("Side quest complete! +3 coins");
    updateHud("Shell Scout rewarded you with 3 coins.");
    return;
  }

  if (config.island === "Mist Island") {
    const oldHealth = health;
    health = Math.min(maxHealth, health + 1);
    showToast(health > oldHealth ? "Side quest complete! HP +1" : "Side quest complete!");
    updateHud(health > oldHealth ? "Fog Keeper healed 1 HP." : "Fog Keeper tried to heal you, but HP is full.");
    return;
  }

  totalCoins += 4;
  showToast("Side quest complete! +4 coins");
  updateHud("Ash Miner says: Lava Beast warns before bursts. Watch the ground!");
}

function startBossEvent(level) {
  if (bossEventStarted) {
    return;
  }

  bossEventStarted = true;
  bossActive = true;
  createBoss(level.boss);
  showToast("Boss appeared!");
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
    invulnerableTimer: 0,
    fadeCooldown: settings.type === "fog" ? 2.4 : 0,
    vulnerableWarningTimer: 0,
    warningAttackTimer: 0,
    dashAttackCooldown: settings.type === "ghostPirate" ? 2.6 : 0,
    dashAttackVector: null,
    lavaBurstCooldown: settings.type === "lava" ? 2.1 : 0,
    element
  };
}

function removeBoss() {
  if (boss && boss.element) {
    boss.element.remove();
  }

  boss = null;
  bossHpLabel.classList.add("hidden");
  updateBattlePanel();
}

function updateBoss(deltaTime) {
  if (!bossActive || !boss) {
    return;
  }

  updateBossTimers(deltaTime);
  updateBossSpecialAttacks(deltaTime);

  if (canBossMove()) {
    moveBoss(deltaTime);
  }

  checkBossCollision();

  if (gameOver) {
    return;
  }

  updateHud(getBossFightStatus());
}

function updateBossTimers(deltaTime) {
  if (boss.stunTimer > 0) {
    boss.stunTimer = Math.max(0, boss.stunTimer - deltaTime);
    return;
  }

  if (boss.invulnerableTimer > 0) {
    boss.invulnerableTimer = Math.max(0, boss.invulnerableTimer - deltaTime);
    boss.element.classList.add("invulnerable");

    if (boss.invulnerableTimer === 0) {
      boss.vulnerableWarningTimer = 0.7;
      boss.element.classList.remove("invulnerable");
      boss.element.classList.add("reforming");
      showToast("Fog Ghost is reforming!");
    }

    return;
  }

  if (boss.vulnerableWarningTimer > 0) {
    boss.vulnerableWarningTimer = Math.max(0, boss.vulnerableWarningTimer - deltaTime);

    if (boss.vulnerableWarningTimer === 0) {
      boss.element.classList.remove("reforming");
    }

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
  return boss.stunTimer === 0 && boss.phase === "chase" && boss.invulnerableTimer === 0 && boss.vulnerableWarningTimer === 0;
}

function updateBossSpecialAttacks(deltaTime) {
  updateLavaBursts(deltaTime);

  if (!boss || boss.stunTimer > 0 || boss.phase === "rest") {
    return;
  }

  if (boss.type === "fog") {
    updateFogGhostFade(deltaTime);
  }

  if (boss.type === "lava") {
    updateLavaBeastBurst(deltaTime);
  }

  if (boss.type === "ghostPirate" && boss.hp <= 6) {
    updateGhostPirateDash(deltaTime);
  }
}

function updateFogGhostFade(deltaTime) {
  if (boss.invulnerableTimer > 0 || boss.vulnerableWarningTimer > 0) {
    return;
  }

  boss.fadeCooldown = Math.max(0, boss.fadeCooldown - deltaTime);

  if (boss.fadeCooldown > 0) {
    return;
  }

  boss.invulnerableTimer = 1;
  boss.fadeCooldown = 3.2;
  boss.element.classList.add("invulnerable");
  showToast("Fog Ghost faded away!");
}

function updateLavaBeastBurst(deltaTime) {
  boss.lavaBurstCooldown = Math.max(0, boss.lavaBurstCooldown - deltaTime);

  if (boss.lavaBurstCooldown > 0) {
    return;
  }

  createLavaBurst(player.x, player.y);
  boss.lavaBurstCooldown = boss.hp <= 4 ? 2.1 : 2.8;
}

function createLavaBurst(x, y) {
  const element = document.createElement("div");
  element.className = "lava-burst warning";
  gameArea.appendChild(element);

  lavaBursts.push({
    x: keepInside(x - 12, gameWidth - 58),
    y: keepInside(y - 12, gameHeight - 58),
    state: "warning",
    timer: 0.85,
    element
  });
}

function updateLavaBursts(deltaTime) {
  lavaBursts.forEach((burst) => {
    burst.timer = Math.max(0, burst.timer - deltaTime);

    if (burst.timer > 0) {
      return;
    }

    if (burst.state === "warning") {
      burst.state = "active";
      burst.timer = 0.55;
      burst.element.classList.remove("warning");
      burst.element.classList.add("active");
      return;
    }

    burst.element.remove();
    burst.done = true;
  });

  lavaBursts = lavaBursts.filter((burst) => !burst.done);
}

function clearLavaBursts() {
  lavaBursts.forEach((burst) => burst.element.remove());
  lavaBursts = [];
}

function updateGhostPirateDash(deltaTime) {
  if (boss.warningAttackTimer > 0) {
    boss.warningAttackTimer = Math.max(0, boss.warningAttackTimer - deltaTime);

    if (boss.warningAttackTimer === 0 && boss.dashAttackVector) {
      boss.x = keepInside(boss.x + boss.dashAttackVector.x * 145, gameWidth - spriteSize);
      boss.y = keepInside(boss.y + boss.dashAttackVector.y * 145, gameHeight - spriteSize);
      boss.dashAttackVector = null;
      boss.element.classList.remove("dash-warning");
    }

    return;
  }

  boss.dashAttackCooldown = Math.max(0, boss.dashAttackCooldown - deltaTime);

  if (boss.dashAttackCooldown > 0) {
    return;
  }

  const dx = player.x - boss.x;
  const dy = player.y - boss.y;
  const distance = Math.hypot(dx, dy) || 1;

  boss.dashAttackVector = { x: dx / distance, y: dy / distance };
  boss.warningAttackTimer = 0.75;
  boss.dashAttackCooldown = 3.1;
  boss.element.classList.add("dash-warning");
  showBossDashWarning();
}

function showBossDashWarning() {
  const warning = document.createElement("div");
  warning.className = "dash-attack-warning";
  warning.style.left = `${keepInside(player.x - 22, gameWidth - 78)}px`;
  warning.style.top = `${keepInside(player.y - 22, gameHeight - 78)}px`;
  gameArea.appendChild(warning);
  setTimeout(() => warning.remove(), 760);
}

function getBossFightStatus() {
  if (boss.stunTimer > 0) {
    return `${boss.name} is stunned! Attack while you can.`;
  }

  if (boss.invulnerableTimer > 0) {
    return `${boss.name} faded away. Dodge until it reforms.`;
  }

  if (boss.vulnerableWarningTimer > 0) {
    return `${boss.name} is about to become attackable again.`;
  }

  if (boss.warningAttackTimer > 0 || lavaBursts.some((burst) => burst.state === "warning")) {
    return "Warning attack incoming! Dash out of the marked zone.";
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

  boss.x = keepInside(boss.x + (dx / distance) * getBossSpeed() * deltaTime, gameWidth - spriteSize);
  boss.y = keepInside(boss.y + (dy / distance) * getBossSpeed() * deltaTime, gameHeight - spriteSize);
}

function getBossSpeed() {
  if (!boss) {
    return 0;
  }

  if (boss.type === "crab" && boss.hp <= 2) {
    return boss.speed + 28;
  }

  if (boss.type === "ghostPirate" && boss.hp <= 6) {
    return boss.speed + 18;
  }

  return boss.speed;
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
  return boss && boss.phase === "chase" && boss.stunTimer === 0 && boss.invulnerableTimer === 0 && boss.vulnerableWarningTimer === 0;
}

function attackBoss() {
  if (introActive || !bossActive || !boss || gameOver) {
    return;
  }

  if (isBossInvulnerable()) {
    showSlashEffect(GameLogic.getAttackArea(player, getDirectionToBoss(), {
      spriteSize,
      range: bossAttackRange,
      thickness: bossAttackThickness
    }), getDirectionToBoss());
    showToast(`${boss.name} is invulnerable!`);
    updateHud("Wait for the warning to end before attacking.");
    return;
  }

  const attackDirection = getDirectionToBoss();
  const meleeRange = purchasedUpgrades.includes("sharpSword") ? bossAttackRange + 22 : bossAttackRange;
  const meleeThickness = purchasedUpgrades.includes("sharpSword") ? bossAttackThickness + 16 : bossAttackThickness;
  const meleeDamage = purchasedUpgrades.includes("sharpSword") ? 2 : 1;
  const attackArea = GameLogic.getAttackArea(player, attackDirection, {
    spriteSize,
    range: meleeRange,
    thickness: meleeThickness
  });
  const result = GameLogic.attackBoss(player, boss, {
    spriteSize,
    range: meleeRange,
    thickness: meleeThickness,
    direction: attackDirection,
    attackArea,
    damage: meleeDamage,
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
    showToast("Move closer to attack the boss!");
    updateHud("Move closer to attack the boss!");
    return;
  }

  boss.hp = result.bossHp;
  boss.stunTimer = bossStunDuration;
  playBossHitEffect();
  showFloatingText(`-${meleeDamage} HP`, boss.x + 5, boss.y - 10, "damage");
  showToast("Boss hit!");
  updateHud(`${boss.name} hit! Boss HP: ${boss.hp}/${boss.maxHp}`);

  if (result.defeated) {
    finishBossEvent();
  }
}

function isBossInvulnerable() {
  return boss && (boss.invulnerableTimer > 0 || boss.vulnerableWarningTimer > 0);
}

function finishBossEvent() {
  const level = levels[currentLevelIndex];
  const defeatedBoss = boss;
  const defeatToken = bossDefeatToken + 1;

  bossDefeatToken = defeatToken;
  bossActive = false;
  attackCooldown = 0;

  if (finalIslandActive && defeatedBoss && defeatedBoss.type === "ghostPirate") {
    ghostPirateDefeated = true;
    showToast("Ghost Pirate defeated!");

    if (defeatedBoss.element) {
      defeatedBoss.element.classList.add("defeated");
      showFloatingText("Defeated!", defeatedBoss.x - 4, defeatedBoss.y - 14, "defeat");
    }

    if (grandTreasure && grandTreasure.element) {
      grandTreasure.element.classList.remove("locked");
    }

    updateHud("The Ghost Pirate vanished. The Grand Treasure is unlocked!");

    setTimeout(() => {
      if (bossDefeatToken === defeatToken && !gameOver) {
        removeBoss();
      }
    }, 750);
    return;
  }

  showToast("Boss defeated!");

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

function shootPirateGun() {
  if (introActive || gameOver || !bossActive || !boss || !purchasedUpgrades.includes("pirateGun")) {
    return;
  }

  if (gunCooldown > 0) {
    showToast(`Gun ready in ${Math.ceil(gunCooldown)}s.`);
    return;
  }

  const direction = getDirectionToBoss();
  const vector = getDirectionVector(direction);
  const element = document.createElement("div");
  element.className = "bullet-effect";
  element.textContent = "•";
  gameArea.appendChild(element);

  bullets.push({
    x: player.x + spriteSize / 2 - 5,
    y: player.y + spriteSize / 2 - 5,
    dx: vector.x,
    dy: vector.y,
    element
  });

  gunCooldown = gunCooldownDuration;
  showToast("Pirate Gun fired!");
}

function updateBullets(deltaTime) {
  bullets.forEach((bullet) => {
    bullet.x += bullet.dx * bulletSpeed * deltaTime;
    bullet.y += bullet.dy * bulletSpeed * deltaTime;

    if (bullet.x < -12 || bullet.x > gameWidth || bullet.y < -12 || bullet.y > gameHeight) {
      bullet.done = true;
      return;
    }

    if (bossActive && boss && !isBossInvulnerable() && isTouching({ x: bullet.x, y: bullet.y }, boss)) {
      damageBoss(1, "Gun shot!");
      bullet.done = true;
    }
  });

  bullets
    .filter((bullet) => bullet.done)
    .forEach((bullet) => bullet.element.remove());
  bullets = bullets.filter((bullet) => !bullet.done);
}

function clearBullets() {
  bullets.forEach((bullet) => bullet.element.remove());
  bullets = [];
}

function damageBoss(damage, message) {
  if (!boss || isBossInvulnerable()) {
    return;
  }

  boss.hp = Math.max(0, boss.hp - damage);
  boss.stunTimer = bossStunDuration;
  playBossHitEffect();
  showFloatingText(`-${damage} HP`, boss.x + 5, boss.y - 10, "damage");
  showToast(message);
  updateHud(`${boss.name} hit! Boss HP: ${boss.hp}/${boss.maxHp}`);

  if (boss.hp === 0) {
    finishBossEvent();
  }
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
    showToast("Shield Fruit active!");
    updateHud("Shield Fruit activated! It will block one hit.");
    return;
  }

  powerUpTimer = 5;
  showToast(`${fruit.name} active!`);
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
  showToast("Fruit effect ended.");
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
  updateQuestPanel();
}

function answerRouteQuestion(choiceIndex) {
  const level = levels[currentLevelIndex];
  const result = GameLogic.answerRouteQuestion(choiceIndex, level.correctChoice, health);

  if (result.isCorrect) {
    routeUnlocked = true;
    routePanel.classList.add("hidden");
    chestElement.classList.remove("hidden");
    chestElement.classList.add("open");
    showToast("Route unlocked!");
    updateHud(result.message);
    completeLevel();
    return;
  }

  health = result.health;
  showToast("Wrong answer! HP -1");
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
    showToast("Shield blocked damage!");
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

  showToast("HP -1");
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
  showToast("Map fragment collected!");
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
  upgradeWallet.textContent = `Wallet: ${totalCoins} coins`;
  upgradeMessage.textContent = getUpgradeMenuMessage();
  continueMapButton.textContent = "Open World Map";
  upgradeMenu.classList.remove("hidden");
  updateQuestPanel();
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
  upgradeWallet.textContent = `Wallet: ${totalCoins} coins`;

  shipUpgrades.forEach((upgrade) => {
    const isPurchased = !upgrade.consumable && purchasedUpgrades.includes(upgrade.id);
    const canAfford = totalCoins >= upgrade.cost;
    const card = document.createElement("div");
    const button = document.createElement("button");

    card.className = "upgrade-card";
    card.innerHTML = `
      <div>
        <div class="upgrade-name">${upgrade.name}</div>
        <div class="upgrade-price">Price: ${upgrade.cost} coins</div>
        <div class="upgrade-description">Effect: ${upgrade.description}</div>
        <div class="upgrade-owned">${isPurchased ? "Owned" : ""}</div>
      </div>
    `;

    button.type = "button";
    button.textContent = isPurchased ? "Owned" : "Buy";
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

  if (!upgrade) {
    return;
  }

  if (upgrade.id === "heartPotion") {
    buyHeartPotion(upgrade);
    return;
  }

  const result = GameLogic.buyUpgrade(totalCoins, purchasedUpgrades, upgrade);

  if (result.reason === "already-purchased") {
    return;
  }

  if (result.reason === "not-enough-coins") {
    showToast("Not enough coins!");
    upgradeMessage.textContent = "Not enough coins for that upgrade.";
    return;
  }

  totalCoins = result.wallet;
  purchasedUpgrades = result.purchasedUpgrades;
  applyUpgradeEffect(upgradeId);
  showToast("Upgrade purchased!");
  updateHud(`${upgrade.name} purchased!`);
  upgradeMessage.textContent = `${upgrade.name} applied immediately. Wallet: ${totalCoins} coins.`;
  upgradeWallet.textContent = `Wallet: ${totalCoins} coins`;
  renderUpgradeChoices();
}

function buyHeartPotion(upgrade) {
  if (health >= maxHealth) {
    showToast("HP is already full.");
    upgradeMessage.textContent = "HP is already full.";
    return;
  }

  if (totalCoins < upgrade.cost) {
    showToast("Not enough coins!");
    upgradeMessage.textContent = "Not enough coins for Heart Potion.";
    return;
  }

  totalCoins -= upgrade.cost;
  health = Math.min(maxHealth, health + 1);
  showToast("Heart Potion used! HP +1");
  updateHud(`Heart Potion restored 1 HP. Wallet: ${totalCoins} coins.`);
  upgradeMessage.textContent = `Heart Potion restored 1 HP. Wallet: ${totalCoins} coins.`;
  upgradeWallet.textContent = `Wallet: ${totalCoins} coins`;
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
  shipRoute.innerHTML = '<span class="ship-icon">⛵</span>';

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
  updateQuestPanel();
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

  const destination = worldMapRoute[index];

  worldMap.classList.add("hidden");
  showSailingTransition(destination.name, () => {
    if (index === 3) {
      startFinalTreasureIsland();
      return;
    }

    currentLevelIndex = index;
    startLevel();
  });
}

function showSailingTransition(islandName, onComplete) {
  sailingMessage.textContent = `Sailing to ${islandName}...`;
  sailingOverlay.classList.remove("hidden");
  showToast(`Sailing to ${islandName}...`);

  setTimeout(() => {
    sailingOverlay.classList.add("hidden");
    onComplete();
  }, 950);
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

  if (!introActive && !gameOver && !isRouteQuestionOpen() && !isWorldMapOpen() && !isUpgradeMenuOpen()) {
    attackCooldown = Math.max(0, attackCooldown - deltaTime);
    dashCooldown = Math.max(0, dashCooldown - deltaTime);
    gunCooldown = Math.max(0, gunCooldown - deltaTime);
    movePlayer(deltaTime);
    moveEnemies(deltaTime);
    updatePowerUp(deltaTime);
    updateBullets(deltaTime);
    checkCollisions(deltaTime);
    updateBoss(deltaTime);
    drawSprites();
  }

  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();

  if (introActive) {
    if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d", " "].includes(key) || event.key === "Shift") {
      event.preventDefault();
    }
    return;
  }

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

  if (key === "j") {
    event.preventDefault();
    shootPirateGun();
    return;
  }

  if (key === "e") {
    event.preventDefault();
    interactWithNpc();
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
startAdventureButton.addEventListener("click", startAdventure);

startGame();
gameLoop();

