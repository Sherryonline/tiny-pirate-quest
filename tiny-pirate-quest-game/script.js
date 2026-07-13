const gameArea = document.getElementById("gameArea");
const gameWrap = document.querySelector(".game-wrap");
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
const activeSkillBar = document.getElementById("activeSkillBar");
const skillShield = document.getElementById("skillShield");
const skillShards = document.getElementById("skillShards");
const skillWind = document.getElementById("skillWind");
const skillSword = document.getElementById("skillSword");
const skillFocus = document.getElementById("skillFocus");
const comboMeter = document.getElementById("comboMeter");
const swordCooldownElement = document.getElementById("swordCooldown");
const gunCooldownElement = document.getElementById("gunCooldown");
const dashCooldownElement = document.getElementById("dashCooldown");
const questPanel = document.querySelector(".quest-panel");
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
const npcDialogue = document.getElementById("npcDialogue");
const npcDialogueFace = document.getElementById("npcDialogueFace");
const npcDialogueName = document.getElementById("npcDialogueName");
const npcDialogueText = document.getElementById("npcDialogueText");
const npcDialogueActions = document.getElementById("npcDialogueActions");
const statusElement = document.getElementById("status");
const restartButton = document.getElementById("restartButton");
const helpElement = document.querySelector(".bottom-controls .help");
const testSoundButton = document.getElementById("testSoundButton");
const muteButton = document.getElementById("muteButton");
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
const continueAdventureButton = document.getElementById("continueAdventureButton");
const continueSaveHint = document.getElementById("continueSaveHint");
const hallOfFameOverlay = document.getElementById("hallOfFameOverlay");
const hallCompletionSection = document.getElementById("hallCompletionSection");
const hallLeaderboardSection = document.getElementById("hallLeaderboardSection");
const pirateNameInput = document.getElementById("pirateNameInput");
const saveAchievementButton = document.getElementById("saveAchievementButton");
const hallEmptyMessage = document.getElementById("hallEmptyMessage");
const hallLeaderboardTable = document.getElementById("hallLeaderboardTable");
const hallLeaderboardRows = document.getElementById("hallLeaderboardRows");
const hallOfFameActions = document.getElementById("hallOfFameActions");
const hallPlayAgainButton = document.getElementById("hallPlayAgainButton");
const hallViewButton = document.getElementById("hallViewButton");
const hallOfFameCloseButton = document.getElementById("hallOfFameCloseButton");
const hallOfFameButton = document.getElementById("hallOfFameButton");
const introHallOfFameButton = document.getElementById("introHallOfFameButton");

const gameWidth = 720;
const gameHeight = 480;
const spriteSize = 34;
const basePlayerSpeed = 220;
const baseMaxHealth = 3;
const bossAttackRange = 60;
const bossAttackThickness = 50;
const bossChaseDuration = 3;
const gunCooldownDuration = 0.7;
const minimumGunCooldown = 0.45;
const bulletSpeed = 420;
const bulletLifetime = 1.35;
const bulletSize = 12;
const ghostBulletSpeed = 250;
const enemyProjectileSpeed = 230;
const rewardDropSize = 28;
const rewardDropLifetime = 10;
const maxShieldCharges = 3;
const maxPlayerHealth = 6;
const heartShardsPerUpgrade = 3;
const windBuffDuration = 7;
const swordBuffDuration = 8;
const focusBuffDuration = 8;
const comboWindowDuration = 2.5;
const comboDamageDuration = 3;
const dashDistance = 90;
const dashCooldownDuration = 2;
const chestPosition = { x: 626, y: 398 };
const playerStartPosition = { x: 46, y: 400 };
const saveKey = "tinyPirateQuestSave";
const leaderboardKey = "tinyPirateQuestLeaderboard";
const audioPreferenceKey = "tinyPirateQuestAudioMuted";
const audioVolumePreferenceKey = "tinyPirateQuestAudioVolume";

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
let ghostBullets = [];
let enemyProjectiles = [];
let rewardDrops = [];
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
let completedIslands = [];
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
let heartShardCount = 0;
let rewardSkillTimers = { wind: 0, sword: 0, focus: 0 };
let comboState = { count: 0, timer: 0, damageTimer: 0, bonusCoinReady: false };
let finalIslandActive = false;
let ghostPirateDefeated = false;
let finalAdventureCompleted = false;
let bossDefeatToken = 0;
let introActive = true;
let defeatedEnemyIndexes = [];
let audioContext = null;
let masterGain = null;
let sfxGain = null;
let musicGain = null;
let musicInterval = null;
let currentMusicMode = "off";
let musicStep = 0;
let audioUnlocked = false;
let audioMuted = loadAudioMutedPreference();
let audioVolume = loadAudioVolumePreference();
const lastSoundTimes = {};

function loadAudioMutedPreference() {
  try {
    return localStorage.getItem(audioPreferenceKey) === "true";
  } catch (error) {
    return false;
  }
}

function saveAudioMutedPreference() {
  try {
    localStorage.setItem(audioPreferenceKey, String(audioMuted));
  } catch (error) {
    // Audio preference is best-effort.
  }
}

function loadAudioVolumePreference() {
  try {
    const savedVolume = Number(localStorage.getItem(audioVolumePreferenceKey));
    return Number.isFinite(savedVolume) ? keepInside(savedVolume, 1) : 0.45;
  } catch (error) {
    return 0.45;
  }
}

function saveAudioVolumePreference() {
  try {
    localStorage.setItem(audioVolumePreferenceKey, String(audioVolume));
  } catch (error) {
    // Audio preference is best-effort.
  }
}

function initAudioContext() {
  if (audioContext) {
    return audioContext;
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    console.warn("Tiny Pirate Quest audio is not supported in this browser.");
    return null;
  }

  try {
    console.log("Creating AudioContext after user gesture");
    audioContext = new AudioContextClass();
    masterGain = audioContext.createGain();
    sfxGain = audioContext.createGain();
    musicGain = audioContext.createGain();
    masterGain.gain.value = audioMuted ? 0 : audioVolume;
    sfxGain.gain.value = 0.75;
    musicGain.gain.value = 0.16;
    sfxGain.connect(masterGain);
    musicGain.connect(masterGain);
    masterGain.connect(audioContext.destination);
    return audioContext;
  } catch (error) {
    console.warn("Tiny Pirate Quest audio could not start.", error);
    return null;
  }
}

function initAudio() {
  return initAudioContext();
}

async function unlockAudio() {
  console.log("Audio unlock requested");
  const context = initAudioContext();

  if (!context) {
    return false;
  }

  console.log(`AudioContext state before resume: ${context.state}`);

  try {
    if (context.state === "suspended") {
      await context.resume();
    }

    console.log(`AudioContext state after resume: ${context.state}`);

    if (context.state === "running") {
      audioUnlocked = true;
      console.log("Audio unlocked");
      console.log(`AudioContext state: ${context.state}`);
      updateMusicForGameState();
      return true;
    }

    audioUnlocked = false;
    console.warn(`AudioContext state: ${context.state}`);
    return false;
  } catch (error) {
    audioUnlocked = false;
    console.warn(`Audio play failed: ${error}`);
    return false;
  }
}

function setVolume(value) {
  const nextVolume = Number(value);

  if (!Number.isFinite(nextVolume)) {
    return;
  }

  audioVolume = keepInside(nextVolume, 1);
  saveAudioVolumePreference();

  if (masterGain && audioContext) {
    masterGain.gain.setTargetAtTime(audioMuted ? 0 : audioVolume, audioContext.currentTime, 0.02);
  }
}

function setAudioMuted(nextMuted) {
  audioMuted = nextMuted;
  saveAudioMutedPreference();
  syncMuteButton();
  console.log(audioMuted ? "Audio muted" : "Audio unmuted");

  if (masterGain) {
    masterGain.gain.setTargetAtTime(audioMuted ? 0 : audioVolume, audioContext.currentTime, 0.02);
  }

  if (audioMuted) {
    stopMusicLoop();
    return;
  }

  AudioManager.unlockAudio().then(() => updateMusicForGameState());
}

function toggleMute() {
  setAudioMuted(!audioMuted);

  if (!audioMuted) {
    AudioManager.playSound("button");
  }
}

function syncMuteButton() {
  if (!muteButton) {
    return;
  }

  muteButton.textContent = audioMuted ? "🔇 Muted" : "🔊 Sound On";
  muteButton.setAttribute("aria-pressed", String(audioMuted));
  muteButton.classList.toggle("is-muted", audioMuted);
}

function playTone(frequency, duration, type = "sine", volume = 0.18, toFrequency = null) {
  if (audioMuted || !audioUnlocked) {
    return false;
  }

  const options = typeof type === "object" ? type : { type, volume, toFrequency };

  if (!options.type) {
    options.type = "sine";
  }

  const context = audioContext;

  if (!context || !sfxGain) {
    return false;
  }

  try {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;
    const volume = options.volume || 0.18;

    oscillator.type = options.type || "sine";
    oscillator.frequency.setValueAtTime(frequency, now);

    if (options.toFrequency) {
      oscillator.frequency.exponentialRampToValueAtTime(Math.max(20, options.toFrequency), now + duration);
    }

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.connect(gain);
    gain.connect(sfxGain);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.03);
    return true;
  } catch (error) {
    console.warn(`Audio play failed: ${error}`);
    return false;
  }
}

function playNoise(duration, options = {}) {
  if (audioMuted || !audioUnlocked) {
    return;
  }

  const context = audioContext;

  if (!context || !sfxGain) {
    return;
  }

  try {
    const sampleRate = context.sampleRate;
    const buffer = context.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);

    for (let index = 0; index < data.length; index += 1) {
      data[index] = (Math.random() * 2 - 1) * (1 - index / data.length);
    }

    const noise = context.createBufferSource();
    const gain = context.createGain();
    const now = context.currentTime;

    noise.buffer = buffer;
    gain.gain.setValueAtTime(options.volume || 0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    noise.connect(gain);
    gain.connect(sfxGain);
    noise.start(now);
  } catch (error) {
    console.warn(`Audio play failed: ${error}`);
  }
}

function playSound(name) {
  if (audioMuted) {
    console.log("Audio muted");
    return false;
  }

  if (!audioUnlocked) {
    console.warn("Tiny Pirate Quest audio is waiting for player interaction.");
    return false;
  }

  const now = performance.now();
  const minimumGap = name === "bossWarning" ? 450 : 65;

  if (lastSoundTimes[name] && now - lastSoundTimes[name] < minimumGap) {
    return false;
  }

  lastSoundTimes[name] = now;
  console.log(`Playing sound: ${name}`);

  if (name === "coin") {
    playTone(880, 0.08, "sine", 0.14, 1320);
    playTone(1320, 0.09, "sine", 0.1);
  } else if (name === "hurt") {
    playTone(220, 0.22, "sawtooth", 0.12, 110);
  } else if (name === "dash" || name === "sword") {
    playNoise(0.12, { volume: 0.06 });
    playTone(420, 0.09, "triangle", 0.08, 760);
  } else if (name === "slash") {
    playNoise(0.08, { volume: 0.06 });
    playTone(520, 0.08, "triangle", 0.08, 300);
  } else if (name === "gun") {
    playNoise(0.1, { volume: 0.09 });
    playTone(130, 0.08, "square", 0.08, 80);
  } else if (name === "enemyDefeated") {
    playTone(520, 0.08, "sine", 0.1);
    setTimeout(() => playTone(780, 0.12, "sine", 0.1), 70);
  } else if (name === "combo") {
    playTone(700, 0.06, "triangle", 0.08, 940);
    setTimeout(() => playTone(1040, 0.08, "sine", 0.07), 55);
  } else if (name === "bossWarning") {
    playTone(170, 0.12, "triangle", 0.1);
    setTimeout(() => playTone(130, 0.14, "triangle", 0.1), 130);
  } else if (name === "bossHit") {
    playTone(300, 0.08, "square", 0.1, 190);
  } else if (name === "bossDefeated") {
    [392, 523, 659, 784].forEach((frequency, index) => {
      setTimeout(() => playTone(frequency, 0.16, "sine", 0.11), index * 95);
    });
  } else if (name === "button") {
    playTone(520, 0.05, "sine", 0.07);
  } else if (name === "purchase") {
    playTone(660, 0.09, "sine", 0.1);
    setTimeout(() => playTone(990, 0.13, "sine", 0.1), 90);
  } else if (name === "routeCorrect") {
    playTone(740, 0.09, "sine", 0.1);
    setTimeout(() => playTone(1046, 0.13, "sine", 0.1), 90);
  } else if (name === "routeWrong") {
    playTone(260, 0.12, "sawtooth", 0.1, 160);
  }

  return true;
}

async function testSound() {
  if (audioMuted) {
    console.log("Audio muted");
    showToast("Sound is muted.");
    return false;
  }

  const unlocked = await unlockAudio();

  if (!unlocked) {
    showToast("Audio blocked by browser. Click Test Sound or Start Adventure.");
    return false;
  }

  if (!audioContext || audioContext.state !== "running") {
    showToast("Audio blocked. Click Test Sound again.");
    return false;
  }

  console.log("Playing test sound");
  const didPlay = playTone(660, 0.16, "sine", 0.28);
  setTimeout(() => playTone(880, 0.16, "sine", 0.28), 120);
  setTimeout(() => playTone(1100, 0.2, "sine", 0.28), 240);

  if (didPlay) {
    showToast("Sound works!");
    return true;
  }

  showToast("Audio blocked. Click Test Sound again.");
  return false;
}

function stopMusicLoop() {
  if (musicInterval) {
    clearInterval(musicInterval);
    musicInterval = null;
  }
}

function stopMusic() {
  setMusicMode("off");
}

function playMusic(name) {
  setMusicMode(name);
}

function setMusicMode(mode) {
  if (currentMusicMode === mode && musicInterval) {
    return;
  }

  currentMusicMode = mode;
  musicStep = 0;
  stopMusicLoop();

  if (mode === "off" || audioMuted || !audioUnlocked) {
    return;
  }

  try {
    musicInterval = setInterval(playMusicStep, mode === "boss" ? 360 : 440);
    playMusicStep();
  } catch (error) {
    console.warn("Tiny Pirate Quest music failed to start.", error);
  }
}

function playMusicStep() {
  if (audioMuted || !audioUnlocked || currentMusicMode === "off") {
    return;
  }

  const context = audioContext;

  if (!context || !musicGain) {
    return;
  }

  const patterns = {
    island: [523, 659, 784, 659, 587, 659, 523, 440],
    boss: [196, 220, 196, 165, 247, 220, 196, 147],
    victory: [523, 659, 784, 1046, 784, 659, 880, 1046]
  };
  const pattern = patterns[currentMusicMode] || patterns.island;
  const frequency = pattern[musicStep % pattern.length];
  const now = context.currentTime;
  try {
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = currentMusicMode === "boss" ? "triangle" : "sine";
    oscillator.frequency.setValueAtTime(frequency, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(currentMusicMode === "boss" ? 0.08 : 0.06, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
    oscillator.connect(gain);
    gain.connect(musicGain);
    oscillator.start(now);
    oscillator.stop(now + 0.24);
    musicStep += 1;
  } catch (error) {
    console.warn("Tiny Pirate Quest music note failed.", error);
  }
}

function updateMusicForGameState() {
  if (audioMuted || !audioUnlocked) {
    return;
  }

  if (introActive || isUpgradeMenuOpen() || isWorldMapOpen() || isRouteQuestionOpen()) {
    setMusicMode("off");
    return;
  }

  if (!hallOfFameOverlay.classList.contains("hidden")) {
    setMusicMode(finalAdventureCompleted ? "victory" : "off");
    return;
  }

  if (!gameOverlay.classList.contains("hidden")) {
    setMusicMode(overlayTitle.textContent === "Grand Treasure Found" ? "victory" : "off");
    return;
  }

  if (finalAdventureCompleted) {
    setMusicMode("victory");
    return;
  }

  setMusicMode(bossActive ? "boss" : "island");
}

const AudioManager = {
  get audioContext() {
    return audioContext;
  },
  get isUnlocked() {
    return audioUnlocked;
  },
  get isMuted() {
    return audioMuted;
  },
  get masterVolume() {
    return audioVolume;
  },
  initAudio,
  unlockAudio,
  playTone,
  playSound,
  playMusic,
  stopMusic,
  toggleMute,
  setVolume,
  testSound
};

const bossBehaviorConfigs = {
  crab: {
    type: "crab",
    difficulty: "easy",
    hp: 5,
    stunDuration: 0.8,
    restDuration: 1.1,
    enragedRestDuration: 0.75,
    chaseDuration: 3,
    enragedSpeedBonus: 28,
    hint: "Dodge the charge, then attack.",
    chargeCooldown: 2.5,
    chargeWarning: 0.65,
    chargeDistance: 132
  },
  ghost: {
    type: "ghost",
    difficulty: "medium",
    hp: 7,
    stunDuration: 0.6,
    restDuration: 0.9,
    chaseDuration: 2.7,
    hint: "Wait for the ghost to reappear, then attack.",
    fadeCooldown: 3.6,
    fadeDuration: 1,
    reformWarning: 0.75
  },
  lava: {
    type: "lava",
    difficulty: "hard",
    hp: 9,
    stunDuration: 0.5,
    restDuration: 0.7,
    chaseDuration: 2.4,
    hint: "Move out of warning zones!",
    lavaBurstCooldown: 2.6,
    lavaBurstEnragedCooldown: 2,
    warningDuration: 0.85,
    activeDuration: 0.55
  },
  ghostPirate: {
    type: "ghostPirate",
    difficulty: "final",
    hp: 12,
    stunDuration: 0.4,
    restDuration: 0.6,
    chaseDuration: 2.2,
    phaseTwoHp: 6,
    phaseTwoSpeedBonus: 24,
    hint: "Dash away from slash warnings and dodge ghost shots.",
    dashCooldown: 3,
    dashWarning: 0.75,
    dashDistance: 150,
    bulletCooldown: 2.4
  }
};

const enemyBehaviorConfigs = {
  crabPatrol: {
    name: "Crab Patrol",
    icon: "\uD83E\uDD80",
    hp: 1,
    speed: 95,
    damageMessage: "Ouch! The crab pinched you.",
    defeatMessage: "Enemy defeated! +1 coin",
    rewardCoins: 1,
    detectionRange: 0,
    behavior: "patrol"
  },
  fogSpirit: {
    name: "Fog Spirit",
    icon: "\uD83D\uDC7B",
    hp: 2,
    speed: 110,
    chaseSpeed: 142,
    damageMessage: "A Fog Spirit chilled you!",
    defeatMessage: "Enemy defeated! +1 coin",
    rewardCoins: 1,
    detectionRange: 130,
    chaseDuration: 2,
    cooldownDuration: 1.2,
    behavior: "chase"
  },
  fireImp: {
    name: "Fire Imp",
    icon: "\uD83D\uDD25",
    hp: 2,
    speed: 120,
    damageMessage: "A Fire Imp burned you!",
    defeatMessage: "Enemy defeated! +1 coin",
    rewardCoins: 1,
    detectionRange: 180,
    warningDuration: 0.65,
    attackCooldown: 2.6,
    projectileLifetime: 2.5,
    behavior: "projectile"
  },
  ghostMinion: {
    name: "Ghost Minion",
    icon: "\uD83D\uDC7B",
    hp: 2,
    speed: 82,
    chaseSpeed: 118,
    damageMessage: "A Ghost Minion clawed you!",
    defeatMessage: "Enemy defeated! +1 coin",
    rewardCoins: 1,
    detectionRange: 160,
    chaseDuration: 2.4,
    cooldownDuration: 0.8,
    behavior: "chase"
  }
};

const rewardTypes = {
  coin: { icon: "\uD83E\uDE99", floatingText: "+1 Coin", toast: "Coin reward collected!" },
  heart: { icon: "\u2764\uFE0F", floatingText: "+1 HP", toast: "Heart reward collected!" },
  shieldOrb: { icon: "\uD83D\uDEE1\uFE0F", floatingText: "Shield +1", toast: "Shield charge +1!" },
  heartShard: { icon: "\uD83D\uDC97", floatingText: "Heart Shard!", toast: "Heart Shard collected!" },
  windLeaf: { icon: "\uD83C\uDF43", floatingText: "Wind Leaf!", toast: "Wind Leaf collected!" },
  swordFlame: { icon: "\uD83D\uDD25", floatingText: "Sword Flame!", toast: "Sword Flame collected!" },
  focusStar: { icon: "\u2B50", floatingText: "Focus!", toast: "Focus Star collected!" }
};

const islandRewardTables = {
  coconut: [
    { type: "coin", weight: 0.55 },
    { type: "heart", weight: 0.2 },
    { type: "shieldOrb", weight: 0.1 },
    { type: "heartShard", weight: 0.05 },
    { type: null, weight: 0.1 }
  ],
  mist: [
    { type: "coin", weight: 0.35 },
    { type: "windLeaf", weight: 0.25 },
    { type: "shieldOrb", weight: 0.2 },
    { type: "heart", weight: 0.1 },
    { type: "heartShard", weight: 0.05 },
    { type: null, weight: 0.05 }
  ],
  volcano: [
    { type: "coin", weight: 0.35 },
    { type: "swordFlame", weight: 0.25 },
    { type: "heartShard", weight: 0.2 },
    { type: "heart", weight: 0.1 },
    { type: "shieldOrb", weight: 0.05 },
    { type: null, weight: 0.05 }
  ],
  final: [
    { type: "coin", weight: 0.35 },
    { type: "focusStar", weight: 0.25 },
    { type: "heartShard", weight: 0.15 },
    { type: "shieldOrb", weight: 0.1 },
    { type: "swordFlame", weight: 0.05 },
    { type: "heart", weight: 0.05 },
    { type: null, weight: 0.05 }
  ],
  generic: [
    { type: "coin", weight: 0.45 },
    { type: "heart", weight: 0.2 },
    { type: "shieldOrb", weight: 0.1 },
    { type: "heartShard", weight: 0.1 },
    { type: null, weight: 0.15 }
  ]
};

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
      boss: { name: "Giant Crab", type: "crab", icon: "\uD83E\uDD80", x: 560, y: 118, speed: 95 },
      enemies: [
        { type: "crabPatrol", x: 318, y: 260, minX: 210, maxX: 515, speed: 95 }
      ],
      coinPositions: [
        { x: 95, y: 382 },
        { x: 150, y: 350 },
        { x: 210, y: 322 },
        { x: 270, y: 292 },
        { x: 330, y: 254 },
        { x: 390, y: 220 },
        { x: 452, y: 178 },
        { x: 525, y: 150 },
        { x: 615, y: 188 },
        { x: 650, y: 280 }
      ],
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
      boss: { name: "Fog Ghost", type: "ghost", icon: "\uD83D\uDC7B", x: 565, y: 95, speed: 105 },
      enemies: [
        { type: "fogSpirit", x: 190, y: 176, minX: 92, maxX: 360, speed: 118 },
        { type: "fogSpirit", x: 512, y: 342, minX: 405, maxX: 658, speed: 128 }
      ],
      coinPositions: [
        { x: 104, y: 365 },
        { x: 168, y: 300 },
        { x: 255, y: 350 },
        { x: 330, y: 292 },
        { x: 428, y: 330 },
        { x: 575, y: 374 },
        { x: 640, y: 288 },
        { x: 560, y: 212 },
        { x: 472, y: 150 },
        { x: 370, y: 118 },
        { x: 255, y: 92 },
        { x: 118, y: 142 }
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
      boss: { name: "Lava Beast", type: "lava", icon: "\uD83D\uDD25", x: 548, y: 92, speed: 120 },
      enemies: [
        { type: "fireImp", x: 184, y: 170, minX: 92, maxX: 322, speed: 120 },
        { type: "fireImp", x: 500, y: 326, minX: 405, maxX: 642, speed: 132 },
        { type: "fireImp", x: 372, y: 250, minX: 295, maxX: 505, speed: 112 }
      ],
      coinPositions: [
        { x: 92, y: 382 },
        { x: 152, y: 318 },
        { x: 230, y: 350 },
        { x: 298, y: 292 },
        { x: 378, y: 365 },
        { x: 455, y: 306 },
        { x: 610, y: 342 },
        { x: 648, y: 245 },
        { x: 585, y: 172 },
        { x: 505, y: 124 },
        { x: 390, y: 135 },
        { x: 312, y: 92 },
        { x: 198, y: 112 },
        { x: 124, y: 208 },
        { x: 348, y: 224 }
      ],
      lavaTraps: [
        { x: 258, y: 208 },
        { x: 445, y: 210 },
        { x: 535, y: 265 }
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
    description: "Unlock ranged attack. Left click inside the map to shoot."
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
  x: 540,
  y: 120,
  speed: 112
};

const sideQuestConfigs = [
  {
    island: "Coconut Island",
    npcName: "Shell Scout",
    npcIcon: "🧑",
    npc: { x: 92, y: 342 },
    objective: "Collect 3 shells",
    itemName: "shells",
    itemIcon: "🐚",
    target: 3,
    reward: "3 coins",
    positions: [
      { x: 150, y: 410 },
      { x: 255, y: 170 },
      { x: 642, y: 336 }
    ]
  },
  {
    island: "Mist Island",
    npcName: "Fog Keeper",
    npcIcon: "🧙",
    npc: { x: 92, y: 350 },
    objective: "Collect 2 ghost lights",
    itemName: "ghost lights",
    itemIcon: "✨",
    target: 2,
    reward: "heal 1 HP",
    positions: [
      { x: 252, y: 255 },
      { x: 604, y: 148 }
    ]
  },
  {
    island: "Volcano Island",
    npcName: "Ash Miner",
    npcIcon: "⛏️",
    npc: { x: 90, y: 354 },
    objective: "Collect 2 fire stones",
    itemName: "fire stones",
    itemIcon: "🪨",
    target: 2,
    reward: "4 coins and a boss hint",
    positions: [
      { x: 218, y: 268 },
      { x: 616, y: 178 }
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
  { x: 360, y: 320 },
  { x: 512, y: 260 },
  { x: 430, y: 392 }
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

const keys = {
  up: false,
  down: false,
  left: false,
  right: false
};

function startGame(options = {}) {
  const shouldClearSave = options.clearSave !== false;

  if (shouldClearSave) {
    clearSavedGame();
  }

  currentLevelIndex = 0;
  finalAdventureCompleted = false;
  mapFragments = 0;
  completedIslands = [];
  totalCoins = 0;
  maxHealth = baseMaxHealth;
  shieldCharges = 0;
  heartShardCount = 0;
  resetRewardSkillTimers();
  crew = [];
  purchasedUpgrades = [];
  sideQuestState = sideQuestConfigs.map((quest) => ({
    island: quest.island,
    progress: 0,
    rewarded: false
  }));
  defeatedEnemyIndexes = [];
  startLevel();
  updateContinueControls();

  if (shouldClearSave) {
    showToast("New adventure started");
  }
}

function startAdventure() {
  introActive = false;
  introOverlay.classList.add("hidden");
  resetMovementKeys();
  syncIntroUiVisibility();
  updateHud("Collect coins to begin your quest.");
  focusGame();
  saveGame();
}

function startNewAdventure() {
  startGame({ clearSave: true });
  startAdventure();
}

function continueAdventure() {
  const savedState = loadGame();

  if (!savedState) {
    showToast("No saved game found.");
    updateContinueControls();
    return;
  }

  restoreGameState(savedState);
  introActive = false;
  introOverlay.classList.add("hidden");
  resetMovementKeys();
  syncIntroUiVisibility();
  focusGame();
  showToast("Adventure continued");
  updateHud("Adventure continued.");
}

function syncIntroUiVisibility() {
  gameWrap.classList.toggle("pre-start", introActive);
}

function hasSavedGame() {
  return Boolean(loadGame());
}

function loadGame() {
  try {
    const rawSave = localStorage.getItem(saveKey);
    return rawSave ? JSON.parse(rawSave) : null;
  } catch (error) {
    return null;
  }
}

function clearSavedGame() {
  try {
    localStorage.removeItem(saveKey);
  } catch (error) {
    // Ignore storage cleanup errors.
  }
  updateContinueControls();
}

function sanitizePirateName(value) {
  return GameLogic.sanitizePirateName(value, 20);
}

function formatLeaderboardDate(date) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(date);
  } catch (error) {
    return date.toLocaleDateString();
  }
}

function normalizeLeaderboardRecord(record) {
  if (!record || typeof record !== "object") {
    return null;
  }

  const completedAtDate = new Date(record.completedAt || record.completedDate);
  const completedAt = Number.isNaN(completedAtDate.getTime())
    ? new Date(0).toISOString()
    : completedAtDate.toISOString();
  const coins = Number(record.coins);
  const fragments = Number(record.mapFragments);

  return {
    playerName: sanitizePirateName(record.playerName),
    completedDate: typeof record.completedDate === "string" && record.completedDate.trim()
      ? record.completedDate.trim()
      : formatLeaderboardDate(new Date(completedAt)),
    completedAt,
    coins: Number.isFinite(coins) ? Math.max(0, Math.floor(coins)) : 0,
    mapFragments: Number.isFinite(fragments) ? Math.max(0, Math.floor(fragments)) : 0
  };
}

function loadLeaderboard() {
  try {
    const rawLeaderboard = localStorage.getItem(leaderboardKey);
    const parsedLeaderboard = rawLeaderboard ? JSON.parse(rawLeaderboard) : [];

    if (!Array.isArray(parsedLeaderboard)) {
      return [];
    }

    return GameLogic.getTopLeaderboard(
      parsedLeaderboard.map(normalizeLeaderboardRecord).filter(Boolean),
      5
    );
  } catch (error) {
    return [];
  }
}

function saveLeaderboardRecord(record) {
  const records = GameLogic.getTopLeaderboard([
    ...loadLeaderboard(),
    normalizeLeaderboardRecord(record)
  ].filter(Boolean), 5);

  try {
    localStorage.setItem(leaderboardKey, JSON.stringify(records));
    return { records, saved: true };
  } catch (error) {
    return { records, saved: false };
  }
}

function createLeaderboardRecord(playerName) {
  const completedAt = new Date();

  return {
    playerName: sanitizePirateName(playerName),
    completedDate: formatLeaderboardDate(completedAt),
    completedAt: completedAt.toISOString(),
    coins: totalCoins,
    mapFragments
  };
}

function getLeaderboardRank(index) {
  const rankBadges = ["\uD83E\uDD47", "\uD83E\uDD48", "\uD83E\uDD49", "4", "5"];
  return rankBadges[index] || String(index + 1);
}

function renderLeaderboard(records = loadLeaderboard()) {
  hallLeaderboardRows.replaceChildren();
  hallEmptyMessage.classList.toggle("hidden", records.length > 0);
  hallLeaderboardTable.classList.toggle("hidden", records.length === 0);

  records.forEach((record, index) => {
    const row = document.createElement("div");
    const rank = document.createElement("span");
    const playerName = document.createElement("span");
    const completedDate = document.createElement("span");
    const coins = document.createElement("span");

    row.className = "hall-leaderboard-row";
    rank.className = "hall-rank";
    playerName.className = "hall-player-name";
    completedDate.className = "hall-date";
    coins.className = "hall-coins";

    rank.textContent = getLeaderboardRank(index);
    playerName.textContent = record.playerName;
    completedDate.textContent = record.completedDate;
    coins.textContent = `${record.coins} coins`;

    row.append(rank, playerName, completedDate, coins);
    hallLeaderboardRows.appendChild(row);
  });
}

function showHallOfFame(options = {}) {
  const isCompletionFlow = Boolean(options.completion);

  resetMovementKeys();
  hallOfFameOverlay.classList.remove("hidden");
  hallCompletionSection.classList.toggle("hidden", !isCompletionFlow);
  hallLeaderboardSection.classList.toggle("hidden", isCompletionFlow);
  hallOfFameActions.classList.toggle("hidden", isCompletionFlow);
  hallOfFameCloseButton.classList.toggle("hidden", isCompletionFlow);
  updateMusicForGameState();

  if (isCompletionFlow) {
    pirateNameInput.value = "";
    setTimeout(() => pirateNameInput.focus(), 0);
    return;
  }

  renderLeaderboard();
}

function saveHallOfFameAchievement() {
  const record = createLeaderboardRecord(pirateNameInput.value);
  const result = saveLeaderboardRecord(record);

  if (!result.saved) {
    showToast("Leaderboard could not be saved in this browser.");
    return;
  }

  pirateNameInput.value = record.playerName;
  pirateNameInput.blur();
  hallCompletionSection.classList.add("hidden");
  hallLeaderboardSection.classList.remove("hidden");
  hallOfFameActions.classList.remove("hidden");
  hallOfFameCloseButton.classList.remove("hidden");
  renderLeaderboard(result.records);
  showToast("Achievement saved!");
}

function closeHallOfFame() {
  hallOfFameOverlay.classList.add("hidden");
  resetMovementKeys();
  updateMusicForGameState();

  if (!introActive && !gameOver) {
    focusGame();
  }
}

function playAgainFromHallOfFame() {
  closeHallOfFame();
  startNewAdventure();
}

function refreshHallOfFame() {
  hallCompletionSection.classList.add("hidden");
  hallLeaderboardSection.classList.remove("hidden");
  hallOfFameActions.classList.remove("hidden");
  hallOfFameCloseButton.classList.remove("hidden");
  renderLeaderboard();
}

function saveGame() {
  if (introActive) {
    return;
  }

  const state = {
    version: 2,
    currentLevelIndex,
    finalIslandActive,
    player: player ? { x: player.x, y: player.y } : { ...playerStartPosition },
    health,
    maxHealth,
    score,
    collectedCoinIndexes: coins.map((coin, index) => coin.collected ? index : null).filter((index) => index !== null),
    totalCoins,
    mapFragments,
    completedIslands: [...completedIslands],
    crew: [...crew],
    purchasedUpgrades: [...purchasedUpgrades],
    sideQuestState: sideQuestState.map((quest) => ({ ...quest })),
    routeUnlocked,
    routeQuestionShown,
    bossActive,
    bossHp: boss ? boss.hp : null,
    bossType: boss ? boss.type : null,
    bossEventStarted,
    defeatedEnemyIndexes: [...defeatedEnemyIndexes],
    rewardDrops: rewardDrops.map((reward) => ({
      x: reward.x,
      y: reward.y,
      type: reward.type,
      expiresAt: reward.expiresAt
    })),
    shieldCharges,
    heartShardCount,
    ghostPirateDefeated,
    activePowerUpId: null
  };

  try {
    localStorage.setItem(saveKey, JSON.stringify(state));
    updateContinueControls();
  } catch (error) {
    // Saving is best-effort so gameplay still works if storage is unavailable.
  }
}

function restoreGameState(savedState) {
  currentLevelIndex = keepInside(savedState.currentLevelIndex || 0, levels.length - 1);
  finalIslandActive = Boolean(savedState.finalIslandActive);
  maxHealth = Math.min(maxPlayerHealth, Math.max(baseMaxHealth, Number(savedState.maxHealth) || baseMaxHealth));
  health = Math.min(Number.isFinite(Number(savedState.health)) ? Number(savedState.health) : maxHealth, maxHealth);
  totalCoins = Math.max(0, Number(savedState.totalCoins) || 0);
  const savedFragmentCount = keepInside(Number(savedState.mapFragments) || 0, levels.length);
  completedIslands = Array.isArray(savedState.completedIslands)
    ? [...new Set(savedState.completedIslands)].filter((name) => levels.some((level) => level.name === name))
    : levels.slice(0, savedFragmentCount).map((level) => level.name);
  mapFragments = completedIslands.length;
  crew = Array.isArray(savedState.crew) ? [...savedState.crew] : [];
  purchasedUpgrades = Array.isArray(savedState.purchasedUpgrades)
    ? savedState.purchasedUpgrades.filter((id) => shipUpgrades.some((upgrade) => upgrade.id === id && !upgrade.consumable))
    : [];
  sideQuestState = sideQuestConfigs.map((config) => {
    const savedQuest = Array.isArray(savedState.sideQuestState)
      ? savedState.sideQuestState.find((quest) => quest.island === config.island)
      : null;
    return {
      island: config.island,
      progress: Math.min(config.target, Math.max(0, Number(savedQuest && savedQuest.progress) || 0)),
      rewarded: Boolean(savedQuest && savedQuest.rewarded)
    };
  });
  ghostPirateDefeated = Boolean(savedState.ghostPirateDefeated);
  activePowerUp = null;
  powerUpTimer = 0;
  shieldCharges = 0;
  heartShardCount = Math.max(0, Number(savedState.heartShardCount) || 0) % heartShardsPerUpgrade;
  resetRewardSkillTimers();

  defeatedEnemyIndexes = Array.isArray(savedState.defeatedEnemyIndexes) ? [...savedState.defeatedEnemyIndexes] : [];

  if (finalIslandActive) {
    startFinalTreasureIsland({ fromSave: true });
  } else {
    startLevel({ fromSave: true });
  }

  score = savedState.score || 0;
  health = Math.min(Number.isFinite(Number(savedState.health)) ? Number(savedState.health) : maxHealth, maxHealth);
  routeUnlocked = Boolean(savedState.routeUnlocked);
  routeQuestionShown = Boolean(savedState.routeQuestionShown);
  bossEventStarted = Boolean(savedState.bossEventStarted);

  if (savedState.player) {
    playerX = keepInside(savedState.player.x || playerStartPosition.x, gameWidth - spriteSize);
    playerY = keepInside(savedState.player.y || playerStartPosition.y, gameHeight - spriteSize);
    player.x = playerX;
    player.y = playerY;
  }

  if (Array.isArray(savedState.collectedCoinIndexes)) {
    savedState.collectedCoinIndexes.forEach((index) => {
      if (coins[index]) {
        coins[index].collected = true;
      }
    });
  }

  shieldCharges = Math.min(maxShieldCharges, Math.max(0, Number(savedState.shieldCharges) || 0));
  restoreRewardDrops(savedState.rewardDrops);

  if (routeUnlocked && !finalIslandActive) {
    chestElement.classList.remove("hidden");
    chestElement.classList.add("open");
  } else if (routeQuestionShown && !finalIslandActive) {
    routeQuestionShown = false;
    showRouteQuestion(levels[currentLevelIndex]);
  }

  if (savedState.bossActive && !finalIslandActive) {
    bossActive = true;
    createBoss(levels[currentLevelIndex].boss);
    if (boss && savedState.bossHp !== null) {
      boss.hp = Math.max(1, savedState.bossHp);
    }
  } else if (savedState.bossActive && finalIslandActive && boss) {
    bossActive = true;
    if (savedState.bossHp !== null) {
      boss.hp = Math.max(1, savedState.bossHp);
    }
  }

  ghostPirateDefeated = Boolean(savedState.ghostPirateDefeated);

  if (finalIslandActive && ghostPirateDefeated) {
    bossActive = false;
    removeBoss();
    if (grandTreasure && grandTreasure.element) {
      grandTreasure.element.classList.remove("locked");
    }
  }

  clearTemporaryCombatState();
  gameOver = false;
  drawSprites();
}

function updateContinueControls() {
  let hasSave = false;

  try {
    hasSave = Boolean(localStorage.getItem(saveKey));
  } catch (error) {
    hasSave = false;
  }

  if (!continueAdventureButton || !continueSaveHint || !startAdventureButton) {
    return;
  }

  continueAdventureButton.classList.toggle("hidden", !hasSave);
  continueSaveHint.classList.toggle("hidden", !hasSave);
  startAdventureButton.textContent = hasSave ? "Start New Adventure" : "Start Adventure";
  startAdventureButton.classList.toggle("action-primary", !hasSave);
  startAdventureButton.classList.toggle("action-secondary", hasSave);
  continueAdventureButton.classList.toggle("action-primary", hasSave);
}

function clearTemporaryCombatState() {
  attackCooldown = 0;
  dashCooldown = 0;
  gunCooldown = 0;
  enemyHitCooldown = 0;
  resetCombo();
  clearBullets();
  clearGhostBullets();
  clearEnemyProjectiles();
  clearLavaBursts();
}

function clearRewardDrops() {
  rewardDrops.forEach((reward) => reward.element.remove());
  rewardDrops = [];
}

function focusGame() {
  gameArea.setAttribute("tabindex", "-1");
  gameArea.focus({ preventScroll: true });
}

function startLevel(options = {}) {
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
  resetRewardSkillTimers();
  resetCombo();

  if (!options.fromSave) {
    defeatedEnemyIndexes = [];
  }

  playerElement.classList.remove("damaged", "dashing");
  gameArea.classList.remove("shake");
  chestElement.classList.remove("open");
  chestElement.classList.add("hidden");
  routePanel.classList.add("hidden");
  closeNpcDialogue();
  worldMap.classList.add("hidden");
  upgradeMenu.classList.add("hidden");
  gameOverlay.classList.add("hidden");
  sailingOverlay.classList.add("hidden");
  removeBoss();
  removeMysteryFruit();
  removeGrandTreasure();
  clearRewardDrops();
  clearBullets();
  clearGhostBullets();
  clearEnemyProjectiles();
  clearLavaBursts();
  chestElement.style.left = `${chestPosition.x}px`;
  chestElement.style.top = `${chestPosition.y}px`;

  applyLevelStyle(level);
  createCoins(level);
  createCombatEnemies(level.enemies);
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

function createCoins(level) {
  document.querySelectorAll(".coin").forEach((coin) => coin.remove());

  const positions = level.coinPositions || coinPositions;

  coins = positions.slice(0, level.coinCount).map((position) => {
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

function createCombatEnemies(enemySettings) {
  document.querySelectorAll(".extra-enemy").forEach((enemy) => enemy.remove());
  enemyElement.className = "sprite enemy";
  enemyElement.style.display = enemySettings.length > 0 ? "grid" : "none";

  enemies = enemySettings.map((settings, index) => {
    const behavior = enemyBehaviorConfigs[settings.type || "crabPatrol"] || enemyBehaviorConfigs.crabPatrol;
    const element = index === 0 ? enemyElement : document.createElement("div");

    element.className = index === 0 ? "sprite enemy" : "sprite enemy extra-enemy";
    element.classList.add(`enemy-${settings.type || "crabPatrol"}`);
    element.textContent = settings.icon || behavior.icon;
    element.style.display = defeatedEnemyIndexes.includes(index) ? "none" : "grid";

    if (index > 0) {
      gameArea.appendChild(element);
    }

    return {
      ...behavior,
      ...settings,
      type: settings.type || "crabPatrol",
      maxHp: settings.hp || behavior.hp,
      hp: settings.hp || behavior.hp,
      baseSpeed: settings.speed || behavior.speed,
      spawnIndex: index,
      direction: 1,
      state: "patrol",
      stunTimer: 0,
      chaseTimer: 0,
      cooldownTimer: 0,
      warningTimer: 0,
      projectileVector: null,
      rewarded: false,
      defeated: defeatedEnemyIndexes.includes(index),
      element
    };
  });
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

function startFinalTreasureIsland(options = {}) {
  finalIslandActive = true;
  if (!options.fromSave) {
    ghostPirateDefeated = false;
    defeatedEnemyIndexes = [];
  }
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
  activePowerUp = null;
  powerUpTimer = 0;
  resetRewardSkillTimers();
  resetCombo();
  playerElement.classList.remove("damaged", "dashing");
  routePanel.classList.add("hidden");
  worldMap.classList.add("hidden");
  upgradeMenu.classList.add("hidden");
  closeNpcDialogue();
  gameOverlay.classList.add("hidden");
  sailingOverlay.classList.add("hidden");
  chestElement.classList.add("hidden");
  enemyElement.style.display = "none";
  removeBoss();
  removeMysteryFruit();
  removeGrandTreasure();
  clearRewardDrops();
  clearBullets();
  clearGhostBullets();
  clearEnemyProjectiles();
  clearLavaBursts();
  clearLevelObjects();
  gameArea.classList.remove("level-coconut", "level-mist", "level-volcano");
  gameArea.classList.add("level-treasure");
  createGrandTreasure();
  createCombatEnemies(getFinalIslandEnemies());
  startBossEvent({ boss: ghostPirateBoss });
  updateHud("Defeat the Ghost Pirate to unlock the Grand Treasure!");
  drawSprites();
}

function clearLevelObjects() {
  document.querySelectorAll(".coin, .lava, .extra-enemy, .enemy-projectile, .reward-drop").forEach((element) => element.remove());
  coins = [];
  lavaTraps = [];
  enemies = [];
  clearEnemyProjectiles();
  rewardDrops = [];
  clearSideQuestObjects();
}

function getFinalIslandEnemies() {
  return [
    { type: "ghostMinion", x: 185, y: 140, minX: 120, maxX: 330, speed: 82 },
    { type: "ghostMinion", x: 438, y: 330, minX: 360, maxX: 610, speed: 92 }
  ];
}

function createGrandTreasure() {
  const element = document.createElement("div");
  element.className = "sprite grand-treasure locked";
  element.textContent = "💎";
  gameArea.appendChild(element);

  grandTreasure = {
    x: 612,
    y: 228,
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

  syncIntroUiVisibility();
  levelElement.textContent = finalIslandActive ? "Final - Treasure Island" : `${currentLevelIndex + 1} - ${level.name}`;
  scoreElement.textContent = score;
  coinGoalElement.textContent = finalIslandActive ? 0 : level.coinCount;
  totalCoinsElement.textContent = totalCoins;
  fragmentsElement.textContent = `${mapFragments}/3`;
  crewElement.textContent = crew.length > 0 ? crew.join(", ") : "None";
  activeFruitElement.textContent = getActiveFruitText();
  statusElement.textContent = message;
  syncGameAreaCursor();
  updateControlGuide();
  updateHpLabels();
  updateHeartHealth();
  updateActiveSkillBar();
  updateCombatStatusUi();
  updateQuestPanel();
  updateBattlePanel();
  updateMusicForGameState();
}

function updateHeartHealth() {
  const currentHearts = Math.max(0, health);
  const emptyHearts = Math.max(0, maxHealth - currentHearts);
  heartHealthElement.textContent = `${"\u2764\uFE0F".repeat(currentHearts)}${"\u2661".repeat(emptyHearts)}` || "No hearts";
  heartHealthElement.title = `${health}/${maxHealth} HP`;
}

function updateActiveSkillBar() {
  const activeSkills = [
    [skillShield, shieldCharges > 0, `\uD83D\uDEE1\uFE0F Shield x${shieldCharges}`],
    [skillShards, heartShardCount > 0, `\uD83D\uDC97 Shards ${heartShardCount}/${heartShardsPerUpgrade}`],
    [skillWind, rewardSkillTimers.wind > 0 || (activePowerUp && activePowerUp.id === "wind"), `\uD83C\uDF43 Wind ${Math.ceil(Math.max(rewardSkillTimers.wind, activePowerUp && activePowerUp.id === "wind" ? powerUpTimer : 0))}s`],
    [skillSword, rewardSkillTimers.sword > 0, `\uD83D\uDD25 Sword ${Math.ceil(rewardSkillTimers.sword)}s`],
    [skillFocus, rewardSkillTimers.focus > 0, `\u2B50 Focus ${Math.ceil(rewardSkillTimers.focus)}s`]
  ];
  let visibleSkillCount = 0;

  activeSkills.forEach(([element, isVisible, label]) => {
    element.textContent = label;
    element.classList.toggle("hidden", !isVisible);
    visibleSkillCount += isVisible ? 1 : 0;
  });

  activeSkillBar.classList.toggle("hidden", visibleSkillCount === 0);
}

function updateCombatStatusUi() {
  if (comboState.count > 0) {
    let comboMessage = `Combo x${comboState.count}`;

    if (comboState.bonusCoinReady) {
      comboMessage += " - Bonus Coin Ready!";
    } else if (comboState.damageTimer > 0) {
      comboMessage += " - Power Strike!";
    }

    comboMeter.textContent = `${comboMessage} ${comboState.timer.toFixed(1)}s`;
    comboMeter.classList.remove("hidden");
  } else {
    comboMeter.classList.add("hidden");
  }

  updateCooldownChip(swordCooldownElement, "\u2694", attackCooldown);
  updateCooldownChip(dashCooldownElement, "\uD83D\uDCA8", dashCooldown);

  if (purchasedUpgrades.includes("pirateGun")) {
    updateCooldownChip(gunCooldownElement, "\uD83D\uDD2B", gunCooldown);
  } else {
    gunCooldownElement.textContent = "\uD83D\uDD2B Locked";
    gunCooldownElement.classList.remove("ready", "cooling");
    gunCooldownElement.classList.add("locked");
  }
}

function updateCooldownChip(element, icon, cooldown) {
  const isReady = cooldown <= 0;
  element.textContent = isReady ? `${icon} Ready` : `${icon} ${cooldown.toFixed(1)}s`;
  element.classList.toggle("ready", isReady);
  element.classList.toggle("cooling", !isReady);
  element.classList.remove("locked");
}

function syncGameAreaCursor() {
  gameArea.classList.toggle("has-pirate-gun", purchasedUpgrades.includes("pirateGun") && !introActive);
}

function updateControlGuide() {
  if (!helpElement) {
    return;
  }

  helpElement.textContent = purchasedUpgrades.includes("pirateGun")
    ? "Move: WASD/Arrows | Sword: Space | Shoot: Left Click | Dash: Shift | Talk: E"
    : "Move: WASD/Arrows | Sword: Space | Dash: Shift | Talk: E | Buy Pirate Gun to shoot | Sound starts after Start";
}

function updateQuestPanel() {
  const level = levels[currentLevelIndex];
  const coinGoal = finalIslandActive ? 0 : level.coinCount;

  questPanel.classList.toggle("is-suppressed", shouldSuppressQuestPanel());
  questIslandElement.textContent = finalIslandActive ? "Final Treasure Island" : level.name;
  questObjectiveElement.textContent = getQuestObjective();
  questCoinsElement.textContent = score;
  questCoinGoalElement.textContent = coinGoal;
  questFragmentsElement.textContent = `${mapFragments}/3`;
  questSideObjectiveElement.textContent = getMissionSideQuestText();
  questSideProgressElement.textContent = getSideQuestProgressText();
  questWalletElement.textContent = `${totalCoins} coins`;
  questNextActionElement.textContent = getNextActionText();
  questHintElement.textContent = getQuestHint();
}

function shouldSuppressQuestPanel() {
  return introActive ||
    isUpgradeMenuOpen() ||
    isWorldMapOpen() ||
    isRouteQuestionOpen() ||
    !gameOverlay.classList.contains("hidden");
}

function getQuestObjective() {
  if (finalIslandActive) {
    return ghostPirateDefeated ? "Open treasure" : "Defeat Ghost Pirate";
  }

  if (isUpgradeMenuOpen()) {
    return "Shop or Sail";
  }

  if (isWorldMapOpen()) {
    return mapFragments >= 3 ? "Sail to treasure" : "Choose island";
  }

  if (isRouteQuestionOpen()) {
    return "Answer clue";
  }

  if (bossActive) {
    return "Defeat boss";
  }

  if (score < levels[currentLevelIndex].coinCount) {
    return "Collect coins";
  }

  if (routeUnlocked) {
    return "Open World Map";
  }

  return "Explore";
}

function getQuestHint() {
  let hint;

  if (introActive) {
    hint = "Press Start Adventure when ready.";
    return hint;
  }

  if (finalIslandActive) {
    return ghostPirateDefeated
      ? "Open the Grand Treasure."
      : "Dash away from warning attacks.";
  }

  if (isUpgradeMenuOpen()) {
    return "Buy upgrades or open map.";
  }

  if (isWorldMapOpen()) {
    return "Choose the highlighted unlocked island.";
  }

  if (isRouteQuestionOpen()) {
    return "Use the clue to pick the answer.";
  }

  if (bossActive) {
    return "Attack during rest or stun.";
  }

  if (score < levels[currentLevelIndex].coinCount) {
    return "Collect coins to summon boss.";
  }

  return "Follow the next action.";
}

function getNextActionText() {
  if (introActive) {
    return "Start Adventure";
  }
  if (isUpgradeMenuOpen()) {
    return "Shop or Sail";
  }
  if (isWorldMapOpen()) {
    return "Choose island";
  }
  if (isRouteQuestionOpen()) {
    return "Answer clue";
  }
  if (bossActive) {
    return purchasedUpgrades.includes("pirateGun") ? "Sword or Click" : "Defeat boss";
  }
  if (finalIslandActive) {
    return ghostPirateDefeated ? "Open treasure" : "Fight boss";
  }
  if (npc && isTouching(player, npc)) {
    return "Talk to NPC";
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

function getSideQuestText() {
  const config = getCurrentSideQuestConfig();
  const state = getCurrentSideQuestState();

  if (!config || !state) {
    return "None";
  }

  if (state.rewarded) {
    return `Complete — ${config.reward}`;
  }

  return `${config.objective} — ${state.progress}/${config.target}`;
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

function getMissionSideQuestText() {
  const config = getCurrentSideQuestConfig();
  const state = getCurrentSideQuestState();

  if (!config || !state) {
    return "No side quest";
  }

  if (state.rewarded) {
    return `Complete - ${config.reward}`;
  }

  return `${getSideQuestShortName(config)} ${state.progress}/${config.target}`;
}

function getSideQuestShortName(config) {
  if (config.itemName === "shells") {
    return "Shells";
  }
  if (config.itemName === "ghost lights") {
    return "Ghost lights";
  }
  if (config.itemName === "fire stones") {
    return "Fire stones";
  }

  return config.objective.replace(/^Collect\s+/i, "");
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
    return "Faded";
  }

  if (boss.vulnerableWarningTimer > 0) {
    return "Faded";
  }

  if (lavaBursts.some((burst) => burst.state === "active")) {
    return "Lava Burst";
  }

  if (lavaBursts.some((burst) => burst.state === "warning")) {
    return "Charging Lava";
  }

  if (boss.type === "crab" && boss.hp <= 2) {
    return "Enraged";
  }

  if (boss.type === "ghostPirate" && boss.hp <= boss.phaseTwoHp) {
    return "Ghost Rage";
  }

  return boss.phase === "rest" ? "Resting" : "Chasing";
}

function getBattleHintText() {
  if (!boss) {
    return "";
  }

  if (purchasedUpgrades.includes("pirateGun")) {
    return "Sword: Space · Shoot: Left Click";
  }

  if (boss.invulnerableTimer > 0) {
    return boss.hint;
  }

  if (boss.vulnerableWarningTimer > 0) {
    return boss.hint;
  }

  if (boss.warningAttackTimer > 0 || boss.crabChargeWarningTimer > 0 || lavaBursts.some((burst) => burst.state === "warning")) {
    return boss.hint;
  }

  if (boss.stunTimer > 0 || boss.phase === "rest") {
    return "Attack now!";
  }

  return boss.hint || (purchasedUpgrades.includes("pirateGun") ? "Dodge, then aim with Click." : "Attack during rest or stun!");
}

function showToast(message) {
  const toast = document.createElement("div");

  toast.className = "toast";
  toast.textContent = message;
  toastContainer.appendChild(toast);

  while (toastContainer.children.length > 3) {
    toastContainer.firstElementChild.remove();
  }

  setTimeout(() => toast.remove(), 1800);
}

function drawSprites() {
  playerElement.style.left = `${player.x}px`;
  playerElement.style.top = `${player.y}px`;

  enemies.forEach((enemy) => {
    enemy.element.style.left = `${enemy.x}px`;
    enemy.element.style.top = `${enemy.y}px`;
    enemy.element.style.display = enemy.defeated ? "none" : "grid";
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

  rewardDrops.forEach((reward) => {
    reward.element.style.left = `${reward.x}px`;
    reward.element.style.top = `${reward.y}px`;
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

  chestElement.style.left = `${chestPosition.x}px`;
  chestElement.style.top = `${chestPosition.y}px`;

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

  if (keys.up) {
    moveY -= 1;
  }
  if (keys.down) {
    moveY += 1;
  }
  if (keys.left) {
    moveX -= 1;
  }
  if (keys.right) {
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
  AudioManager.playSound("dash");
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
  if (key === "up" || key === "arrowup" || key === "w") {
    lastDirection = "up";
  } else if (key === "down" || key === "arrowdown" || key === "s") {
    lastDirection = "down";
  } else if (key === "left" || key === "arrowleft" || key === "a") {
    lastDirection = "left";
  } else if (key === "right" || key === "arrowright" || key === "d") {
    lastDirection = "right";
  }
}

function getSpriteCenter(sprite) {
  return {
    x: sprite.x + spriteSize / 2,
    y: sprite.y + spriteSize / 2
  };
}

function moveEnemies(deltaTime) {
  enemies.forEach((enemy) => {
    if (enemy.defeated) {
      return;
    }

    if (enemy.stunTimer > 0) {
      enemy.stunTimer = Math.max(0, enemy.stunTimer - deltaTime);
      enemy.state = "stunned";
      return;
    }

    enemy.cooldownTimer = Math.max(0, enemy.cooldownTimer - deltaTime);

    if (enemy.warningTimer > 0) {
      enemy.warningTimer = Math.max(0, enemy.warningTimer - deltaTime);

      if (enemy.warningTimer === 0 && enemy.projectileVector) {
        createEnemyProjectile(enemy, enemy.projectileVector);
        enemy.projectileVector = null;
        enemy.state = "cooldown";
        enemy.cooldownTimer = enemy.attackCooldown;
        enemy.element.classList.remove("warning");
      }

      return;
    }

    if (enemy.behavior === "projectile") {
      updateProjectileEnemy(enemy, deltaTime);
      return;
    }

    if (enemy.behavior === "chase") {
      updateChasingEnemy(enemy, deltaTime);
      return;
    }

    patrolEnemy(enemy, deltaTime);
  });
}

function patrolEnemy(enemy, deltaTime) {
  enemy.state = "patrol";
  enemy.x += enemy.direction * enemy.baseSpeed * deltaTime;

  if (enemy.x <= enemy.minX || enemy.x >= enemy.maxX) {
    enemy.direction *= -1;
    enemy.x = keepInside(enemy.x, gameWidth - spriteSize);
  }
}

function updateChasingEnemy(enemy, deltaTime) {
  const distance = getDistance(enemy, player);

  if (enemy.state === "chase") {
    enemy.chaseTimer = Math.max(0, enemy.chaseTimer - deltaTime);
    moveEnemyTowardPlayer(enemy, enemy.chaseSpeed, deltaTime);

    if (enemy.chaseTimer === 0) {
      enemy.state = "cooldown";
      enemy.cooldownTimer = enemy.cooldownDuration;
      enemy.element.classList.remove("chasing", "warning");
    }

    return;
  }

  if (enemy.cooldownTimer === 0 && distance <= enemy.detectionRange) {
    enemy.state = "chase";
    enemy.chaseTimer = enemy.chaseDuration;
    enemy.element.classList.add("chasing", "warning");
    return;
  }

  enemy.element.classList.remove("chasing", "warning");
  patrolEnemy(enemy, deltaTime);
}

function updateProjectileEnemy(enemy, deltaTime) {
  const distance = getDistance(enemy, player);

  if (enemy.cooldownTimer === 0 && distance <= enemy.detectionRange) {
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    const vectorDistance = Math.hypot(dx, dy) || 1;

    enemy.state = "attack";
    enemy.warningTimer = enemy.warningDuration;
    enemy.projectileVector = { x: dx / vectorDistance, y: dy / vectorDistance };
    enemy.element.classList.add("warning");
    showToast("Fireball incoming!");
    AudioManager.playSound("bossWarning");
    return;
  }

  patrolEnemy(enemy, deltaTime);
}

function moveEnemyTowardPlayer(enemy, speed, deltaTime) {
  const dx = player.x - enemy.x;
  const dy = player.y - enemy.y;
  const distance = Math.hypot(dx, dy) || 1;

  enemy.x = keepInside(enemy.x + (dx / distance) * speed * deltaTime, gameWidth - spriteSize);
  enemy.y = keepInside(enemy.y + (dy / distance) * speed * deltaTime, gameHeight - spriteSize);
}

function getDistance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function keepInside(value, max) {
  return GameLogic.keepInside(value, max);
}

function rectanglesOverlap(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function checkCollisions(deltaTime) {
  if (enemyHitCooldown > 0) {
    enemyHitCooldown = Math.max(0, enemyHitCooldown - deltaTime);
  }

  checkRegularEnemyDamage();
  checkEnemyProjectileDamage();
  collectTouchedRewardDrops();

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
      AudioManager.playSound("coin");
      showToast("Coin collected!");
      saveGame();
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

  if (enemyHitCooldown === 0 && ghostBullets.some((bullet) => isTouching(player, bullet))) {
    takeDamage("Ghost shot! Keep moving.", "Ghost fire ended your quest.", {
      knockbackFrom: boss || player,
      flash: true,
      playerDamageText: true
    });
  }

  if (routeUnlocked && isTouching(player, chestPosition)) {
    completeLevel();
  }
}

function checkRegularEnemyDamage() {
  const touchedEnemy = enemies.find((enemy) => !enemy.defeated && isTouching(player, enemy));

  if (enemyHitCooldown > 0 || !touchedEnemy) {
    return;
  }

  takeDamage(touchedEnemy.damageMessage, `${touchedEnemy.name} ended your quest.`, {
    knockbackFrom: touchedEnemy,
    flash: true,
    playerDamageText: true
  });
}

function checkEnemyProjectileDamage() {
  const projectile = enemyProjectiles.find((item) => !item.done && isTouching(player, item));

  if (enemyHitCooldown > 0 || !projectile) {
    return;
  }

  projectile.done = true;
  takeDamage("Fireball hit! Keep moving.", "A fireball ended your quest.", {
    shake: true,
    playerDamageText: true
  });
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
    showNpcDialogue(config, state, {
      expression: "😎",
      message: "Thanks again, matey! The Tiny Sea is safer with you around.",
      actions: [
        { label: "Close", style: "secondary", onClick: closeNpcDialogue }
      ]
    });
    updateHud(`${config.npcName} already gave your reward.`);
    return;
  }

  if (state.progress < config.target) {
    const hasStarted = state.progress > 0;
    showNpcDialogue(config, state, {
      expression: hasStarted ? "🥺" : "😊",
      message: hasStarted
        ? `${config.objective}. You have ${state.progress}/${config.target}.`
        : `Can you help me? ${config.objective}, please!`,
      actions: [
        { label: hasStarted ? "Continue" : "Accept Quest", onClick: closeNpcDialogue },
        { label: "Close", style: "secondary", onClick: closeNpcDialogue }
      ]
    });
    updateHud(`${config.npcName} wants ${config.objective.toLowerCase()}. Progress: ${state.progress}/${config.target}.`);
    return;
  }

  showNpcDialogue(config, state, {
    expression: "🎉",
    message: `You did it! Claim your reward: ${config.reward}.`,
    actions: [
      {
        label: "Continue",
        onClick: () => {
          closeNpcDialogue();
          grantSideQuestReward(config, state);
        }
      }
    ]
  });
}

function showNpcDialogue(config, state, options) {
  npcDialogueFace.textContent = options.expression;
  npcDialogueName.textContent = config.npcName;
  npcDialogueText.textContent = options.message;
  npcDialogueActions.innerHTML = "";

  options.actions.forEach((action) => {
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = action.label;
    if (action.style === "secondary") {
      button.classList.add("secondary");
    }
    button.addEventListener("click", action.onClick);
    npcDialogueActions.appendChild(button);
  });

  positionNpcDialogue();
  npcDialogue.classList.remove("hidden");
  resetMovementKeys();
}

function positionNpcDialogue() {
  if (!npc) {
    return;
  }

  const left = keepInside(npc.x - 22, gameWidth - 250);
  const top = keepInside(npc.y - 124, gameHeight - 120);

  npcDialogue.style.left = `${left}px`;
  npcDialogue.style.top = `${top}px`;
}

function closeNpcDialogue() {
  npcDialogue.classList.add("hidden");
}

function isNpcDialogueOpen() {
  return !npcDialogue.classList.contains("hidden");
}

function grantSideQuestReward(config, state) {
  state.rewarded = true;

  if (config.island === "Coconut Island") {
    totalCoins += 3;
    showToast("Side quest complete! +3 coins");
    updateHud("Shell Scout rewarded you with 3 coins.");
    saveGame();
    return;
  }

  if (config.island === "Mist Island") {
    const oldHealth = health;
    health = Math.min(maxHealth, health + 1);
    showToast(health > oldHealth ? "Side quest complete! HP +1" : "Side quest complete!");
    updateHud(health > oldHealth ? "Fog Keeper healed 1 HP." : "Fog Keeper tried to heal you, but HP is full.");
    saveGame();
    return;
  }

  totalCoins += 4;
  showToast("Side quest complete! +4 coins");
  updateHud("Ash Miner says: Lava Beast warns before bursts. Watch the ground!");
  saveGame();
}

function startBossEvent(level) {
  if (bossEventStarted) {
    return;
  }

  bossEventStarted = true;
  bossActive = true;
  createBoss(level.boss);
  showToast("Boss appeared!");
  AudioManager.playSound("bossWarning");
  updateHud(`${level.boss.name} appeared! Press Space near the boss to attack.`);
  saveGame();
}

function createBoss(settings) {
  removeBoss();

  const behavior = bossBehaviorConfigs[settings.type] || {};
  const element = document.createElement("div");
  element.className = "sprite boss";
  element.textContent = settings.icon;
  gameArea.appendChild(element);

  boss = {
    ...behavior,
    ...settings,
    hp: settings.hp || behavior.hp,
    maxHp: settings.hp || behavior.hp,
    phase: "chase",
    phaseTimer: behavior.chaseDuration || bossChaseDuration,
    stunTimer: 0,
    invulnerableTimer: 0,
    fadeCooldown: settings.type === "ghost" ? 2.4 : 0,
    fadeBaseCooldown: behavior.fadeCooldown || 3.6,
    vulnerableWarningTimer: 0,
    warningAttackTimer: 0,
    crabChargeCooldown: settings.type === "crab" ? 1.8 : 0,
    crabChargeWarningTimer: 0,
    crabChargeDirection: 1,
    dashAttackCooldown: settings.type === "ghostPirate" ? 2.6 : 0,
    dashAttackVector: null,
    ghostBulletCooldown: settings.type === "ghostPirate" ? 2.1 : 0,
    lavaBurstCooldown: settings.type === "lava" ? 2.1 : 0,
    lavaBurstBaseCooldown: behavior.lavaBurstCooldown || 2.6,
    enragedAnnounced: false,
    ghostRageAnnounced: false,
    element
  };
}

function removeBoss() {
  if (boss && boss.element) {
    boss.element.remove();
  }

  boss = null;
  bossHpLabel.classList.add("hidden");
  document.querySelectorAll(".crab-charge-warning, .dash-attack-warning, .ghost-reform-warning").forEach((warning) => warning.remove());
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
      const reappearPosition = getGhostReappearPosition();
      boss.x = reappearPosition.x;
      boss.y = reappearPosition.y;
      boss.vulnerableWarningTimer = boss.reformWarning;
      boss.element.classList.remove("invulnerable");
      boss.element.classList.add("reforming");
      showReformWarning();
      showToast("Fog Ghost is reforming!");
      AudioManager.playSound("bossWarning");
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
    boss.phaseTimer = getBossRestDuration();
  } else {
    boss.phase = "chase";
    boss.phaseTimer = boss.chaseDuration || bossChaseDuration;
  }
}

function canBossMove() {
  return boss.stunTimer === 0 &&
    boss.phase === "chase" &&
    boss.invulnerableTimer === 0 &&
    boss.vulnerableWarningTimer === 0 &&
    boss.warningAttackTimer === 0 &&
    boss.crabChargeWarningTimer === 0;
}

function updateBossSpecialAttacks(deltaTime) {
  updateLavaBursts(deltaTime);
  updateGhostBullets(deltaTime);

  updateBossPhaseAnnouncements();

  if (!boss || boss.stunTimer > 0 || boss.phase === "rest") {
    return;
  }

  if (boss.type === "crab") {
    updateCrabCharge(deltaTime);
  }

  if (boss.type === "ghost") {
    updateFogGhostFade(deltaTime);
  }

  if (boss.type === "lava") {
    updateLavaBeastBurst(deltaTime);
  }

  if (boss.type === "ghostPirate" && boss.hp <= boss.phaseTwoHp) {
    updateGhostPirateDash(deltaTime);
    updateGhostPirateBullets(deltaTime);
  }
}

function getBossRestDuration() {
  if (!boss) {
    return 1;
  }

  if (boss.type === "crab" && boss.hp <= 2) {
    return boss.enragedRestDuration;
  }

  return boss.restDuration || 1;
}

function updateBossPhaseAnnouncements() {
  if (!boss) {
    return;
  }

  if (boss.type === "crab" && boss.hp <= 2 && !boss.enragedAnnounced) {
    boss.enragedAnnounced = true;
    showToast("Boss enraged!");
  }

  if (boss.type === "ghostPirate" && boss.hp <= boss.phaseTwoHp && !boss.ghostRageAnnounced) {
    boss.ghostRageAnnounced = true;
    showToast("Ghost Pirate entered Ghost Rage!");
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

  boss.invulnerableTimer = boss.fadeDuration;
  boss.fadeCooldown = boss.fadeBaseCooldown;
  boss.element.classList.add("invulnerable");
  showToast("Fog Ghost faded away!");
}

function getGhostReappearPosition() {
  const offset = 92;
  const candidates = [
    { x: player.x + offset, y: player.y - 42 },
    { x: player.x - offset, y: player.y + 42 },
    { x: player.x + 42, y: player.y + offset },
    { x: player.x - 42, y: player.y - offset }
  ];

  return candidates
    .map((candidate) => ({
      x: keepInside(candidate.x, gameWidth - spriteSize),
      y: keepInside(candidate.y, gameHeight - spriteSize)
    }))
    .find((candidate) => Math.hypot(candidate.x - player.x, candidate.y - player.y) > 64) || {
      x: keepInside(player.x + offset, gameWidth - spriteSize),
      y: keepInside(player.y, gameHeight - spriteSize)
    };
}

function showReformWarning() {
  const warning = document.createElement("div");
  warning.className = "ghost-reform-warning";
  warning.style.left = `${keepInside(boss.x - 16, gameWidth - 66)}px`;
  warning.style.top = `${keepInside(boss.y - 16, gameHeight - 66)}px`;
  gameArea.appendChild(warning);
  setTimeout(() => warning.remove(), boss.reformWarning * 1000);
}

function updateCrabCharge(deltaTime) {
  if (boss.crabChargeWarningTimer > 0) {
    boss.crabChargeWarningTimer = Math.max(0, boss.crabChargeWarningTimer - deltaTime);

    if (boss.crabChargeWarningTimer === 0) {
      boss.x = keepInside(boss.x + boss.crabChargeDirection * boss.chargeDistance, gameWidth - spriteSize);
      boss.element.classList.remove("dash-warning");
    }

    return;
  }

  boss.crabChargeCooldown = Math.max(0, boss.crabChargeCooldown - deltaTime);

  if (boss.crabChargeCooldown > 0) {
    return;
  }

  boss.crabChargeDirection = player.x >= boss.x ? 1 : -1;
  boss.crabChargeWarningTimer = boss.chargeWarning;
  boss.crabChargeCooldown = boss.hp <= 2 ? boss.chargeCooldown * 0.78 : boss.chargeCooldown;
  boss.element.classList.add("dash-warning");
  AudioManager.playSound("bossWarning");
  showCrabChargeWarning();
}

function showCrabChargeWarning() {
  const warning = document.createElement("div");
  const warningWidth = Math.min(210, gameWidth - 20);
  const left = boss.crabChargeDirection > 0 ? boss.x : boss.x - warningWidth + spriteSize;

  warning.className = "crab-charge-warning";
  warning.style.left = `${keepInside(left, gameWidth - warningWidth)}px`;
  warning.style.top = `${keepInside(boss.y + spriteSize / 2 - 5, gameHeight - 10)}px`;
  warning.style.width = `${warningWidth}px`;
  gameArea.appendChild(warning);
  setTimeout(() => warning.remove(), boss.chargeWarning * 1000);
}

function updateLavaBeastBurst(deltaTime) {
  boss.lavaBurstCooldown = Math.max(0, boss.lavaBurstCooldown - deltaTime);

  if (boss.lavaBurstCooldown > 0) {
    return;
  }

  const burstPosition = getLavaBurstPosition();
  createLavaBurst(burstPosition.x, burstPosition.y);

  if (boss.hp <= 4) {
    const secondBurst = getLavaBurstPosition({ x: burstPosition.x, y: burstPosition.y });
    createLavaBurst(secondBurst.x, secondBurst.y);
  }

  boss.lavaBurstCooldown = boss.hp <= 4 ? boss.lavaBurstEnragedCooldown : boss.lavaBurstBaseCooldown;
  showToast("Lava burst incoming!");
  AudioManager.playSound("bossWarning");
}

function createLavaBurst(x, y) {
  const element = document.createElement("div");
  element.className = "lava-burst warning";
  gameArea.appendChild(element);

  lavaBursts.push({
    x: keepInside(x - 12, gameWidth - 58),
    y: keepInside(y - 12, gameHeight - 58),
    state: "warning",
    timer: boss.warningDuration,
    element
  });
}

function getLavaBurstPosition(avoidPosition) {
  const playerCenter = getSpriteCenter(player);
  const direction = getDirectionVector(lastDirection);
  const sideStep = direction.x === 0 ? 70 : 0;
  const verticalStep = direction.y === 0 ? 70 : 0;
  const candidates = [
    { x: player.x + direction.x * 82 + sideStep, y: player.y + direction.y * 82 + verticalStep },
    { x: player.x - direction.x * 82 - sideStep, y: player.y - direction.y * 82 - verticalStep },
    { x: player.x + 95, y: player.y - 65 },
    { x: player.x - 95, y: player.y + 65 }
  ];

  return candidates
    .map((candidate) => ({
      x: keepInside(candidate.x, gameWidth - 58),
      y: keepInside(candidate.y, gameHeight - 58)
    }))
    .find((candidate) => {
      const center = { x: candidate.x + 29, y: candidate.y + 29 };
      const awayFromPlayer = Math.hypot(center.x - playerCenter.x, center.y - playerCenter.y) > 58;
      const awayFromFirst = !avoidPosition || Math.hypot(candidate.x - avoidPosition.x, candidate.y - avoidPosition.y) > 72;
      return awayFromPlayer && awayFromFirst;
    }) || {
      x: keepInside(player.x + 92, gameWidth - 58),
      y: keepInside(player.y, gameHeight - 58)
    };
}

function updateLavaBursts(deltaTime) {
  lavaBursts.forEach((burst) => {
    burst.timer = Math.max(0, burst.timer - deltaTime);

    if (burst.timer > 0) {
      return;
    }

    if (burst.state === "warning") {
      burst.state = "active";
      burst.timer = boss ? boss.activeDuration : 0.55;
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
      boss.x = keepInside(boss.x + boss.dashAttackVector.x * boss.dashDistance, gameWidth - spriteSize);
      boss.y = keepInside(boss.y + boss.dashAttackVector.y * boss.dashDistance, gameHeight - spriteSize);
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
  boss.warningAttackTimer = boss.dashWarning;
  boss.dashAttackCooldown = boss.dashCooldown;
  boss.element.classList.add("dash-warning");
  AudioManager.playSound("bossWarning");
  showBossDashWarning();
}

function showBossDashWarning() {
  const warning = document.createElement("div");
  warning.className = "dash-attack-warning";
  warning.style.left = `${keepInside(player.x - 22, gameWidth - 78)}px`;
  warning.style.top = `${keepInside(player.y - 22, gameHeight - 78)}px`;
  gameArea.appendChild(warning);
  setTimeout(() => warning.remove(), boss.dashWarning * 1000);
}

function updateGhostPirateBullets(deltaTime) {
  boss.ghostBulletCooldown = Math.max(0, boss.ghostBulletCooldown - deltaTime);

  if (boss.ghostBulletCooldown > 0) {
    return;
  }

  const dx = player.x - boss.x;
  const dy = player.y - boss.y;
  const distance = Math.hypot(dx, dy) || 1;

  createGhostBullet(dx / distance, dy / distance);
  boss.ghostBulletCooldown = boss.bulletCooldown;
}

function createGhostBullet(dx, dy) {
  const element = document.createElement("div");
  element.className = "ghost-bullet";
  element.textContent = "•";
  gameArea.appendChild(element);

  ghostBullets.push({
    x: boss.x + spriteSize / 2 - 6,
    y: boss.y + spriteSize / 2 - 6,
    dx,
    dy,
    element
  });
}

function updateGhostBullets(deltaTime) {
  ghostBullets.forEach((bullet) => {
    bullet.x += bullet.dx * ghostBulletSpeed * deltaTime;
    bullet.y += bullet.dy * ghostBulletSpeed * deltaTime;
    bullet.element.style.left = `${bullet.x}px`;
    bullet.element.style.top = `${bullet.y}px`;

    if (bullet.x < -18 || bullet.x > gameWidth + 18 || bullet.y < -18 || bullet.y > gameHeight + 18) {
      bullet.done = true;
    }
  });

  ghostBullets
    .filter((bullet) => bullet.done)
    .forEach((bullet) => bullet.element.remove());
  ghostBullets = ghostBullets.filter((bullet) => !bullet.done);
}

function clearGhostBullets() {
  ghostBullets.forEach((bullet) => bullet.element.remove());
  ghostBullets = [];
}

function createEnemyProjectile(enemy, vector) {
  const element = document.createElement("div");
  element.className = "enemy-projectile";
  element.textContent = "•";
  gameArea.appendChild(element);

  enemyProjectiles.push({
    x: enemy.x + spriteSize / 2 - 5,
    y: enemy.y + spriteSize / 2 - 5,
    dx: vector.x,
    dy: vector.y,
    lifetime: enemy.projectileLifetime,
    sourceName: enemy.name,
    element
  });
}

function updateEnemyProjectiles(deltaTime) {
  enemyProjectiles.forEach((projectile) => {
    projectile.x += projectile.dx * enemyProjectileSpeed * deltaTime;
    projectile.y += projectile.dy * enemyProjectileSpeed * deltaTime;
    projectile.lifetime = Math.max(0, projectile.lifetime - deltaTime);
    projectile.element.style.left = `${projectile.x}px`;
    projectile.element.style.top = `${projectile.y}px`;

    if (
      projectile.lifetime === 0 ||
      projectile.x < -18 ||
      projectile.x > gameWidth + 18 ||
      projectile.y < -18 ||
      projectile.y > gameHeight + 18
    ) {
      projectile.done = true;
    }
  });

  enemyProjectiles
    .filter((projectile) => projectile.done)
    .forEach((projectile) => projectile.element.remove());
  enemyProjectiles = enemyProjectiles.filter((projectile) => !projectile.done);
}

function clearEnemyProjectiles() {
  enemyProjectiles.forEach((projectile) => projectile.element.remove());
  enemyProjectiles = [];
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

  if (boss.warningAttackTimer > 0 || boss.crabChargeWarningTimer > 0 || lavaBursts.some((burst) => burst.state === "warning")) {
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
    return boss.speed + boss.enragedSpeedBonus;
  }

  if (boss.type === "ghostPirate" && boss.hp <= boss.phaseTwoHp) {
    return boss.speed + boss.phaseTwoSpeedBonus;
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

  const attackDirection = lastDirection;

  if (isBossInvulnerable()) {
    showSlashEffect(GameLogic.getAttackArea(player, attackDirection, {
      spriteSize,
      range: bossAttackRange,
      thickness: bossAttackThickness
    }), attackDirection);
    showToast(`${boss.name} is invulnerable!`);
    updateHud("Wait for the warning to end before attacking.");
    return;
  }

  const meleeRange = purchasedUpgrades.includes("sharpSword") ? bossAttackRange + 22 : bossAttackRange;
  const meleeThickness = purchasedUpgrades.includes("sharpSword") ? bossAttackThickness + 16 : bossAttackThickness;
  const meleeDamage = Math.min(getMeleeDamage() + getComboDamageBonusForNextHit(), 3);
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
    hitCooldown: getCombatCooldown(0.6),
    missCooldown: getCombatCooldown(0.2)
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

  registerComboHit();
  boss.hp = result.bossHp;
  boss.stunTimer = boss.stunDuration;
  playBossHitEffect();
  showFloatingText(`-${meleeDamage} HP`, boss.x + 5, boss.y - 10, "damage");
  showToast("Boss hit!");
  AudioManager.playSound("bossHit");
  updateHud(`${boss.name} hit! Boss HP: ${boss.hp}/${boss.maxHp}`);
  saveGame();

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

  AudioManager.playSound("bossDefeated");
  bossDefeatToken = defeatToken;
  bossActive = false;
  attackCooldown = 0;
  clearGhostBullets();
  clearLavaBursts();

  if (finalIslandActive && defeatedBoss && defeatedBoss.type === "ghostPirate") {
    ghostPirateDefeated = true;
    showToast("Boss defeated!");

    if (defeatedBoss.element) {
      defeatedBoss.element.classList.add("defeated");
      showFloatingText("Defeated!", defeatedBoss.x - 4, defeatedBoss.y - 14, "defeat");
    }

    if (grandTreasure && grandTreasure.element) {
      grandTreasure.element.classList.remove("locked");
    }

    updateHud("The Ghost Pirate vanished. The Grand Treasure is unlocked!");
    saveGame();

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
  saveGame();

  setTimeout(() => {
    if (bossDefeatToken !== defeatToken || gameOver || finalIslandActive) {
      return;
    }

    removeBoss();
    showRouteQuestion(level);
    saveGame();
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
  const hasSwordFlame = rewardSkillTimers.sword > 0;

  slash.className = `slash-effect ${direction}${hasSwordFlame ? " flame" : ""}`;
  slash.textContent = hasSwordFlame ? "\uD83D\uDD25" : "\u2694";
  slash.style.left = `${keepInside(attackArea.x + attackArea.width / 2 - 17, gameWidth - 34)}px`;
  slash.style.top = `${keepInside(attackArea.y + attackArea.height / 2 - 17, gameHeight - 34)}px`;
  gameArea.appendChild(slash);
  setTimeout(() => slash.remove(), 260);
}

function performMeleeAttack() {
  AudioManager.playSound("sword");

  if (attackRegularEnemy()) {
    return;
  }

  attackBoss();
}

function attackRegularEnemy() {
  if (introActive || gameOver || attackCooldown > 0) {
    return false;
  }

  const target = getTargetEnemy();

  if (!target) {
    return false;
  }

  const attackDirection = lastDirection;
  const meleeRange = purchasedUpgrades.includes("sharpSword") ? bossAttackRange + 22 : bossAttackRange;
  const meleeThickness = purchasedUpgrades.includes("sharpSword") ? bossAttackThickness + 16 : bossAttackThickness;
  const meleeDamage = getMeleeDamage() + getComboDamageBonusForNextHit();
  const attackArea = GameLogic.getAttackArea(player, attackDirection, {
    spriteSize,
    range: meleeRange,
    thickness: meleeThickness
  });
  const enemyArea = {
    x: target.x,
    y: target.y,
    width: spriteSize,
    height: spriteSize
  };

  if (!rectanglesOverlap(attackArea, enemyArea)) {
    return false;
  }

  registerComboHit();
  attackCooldown = getCombatCooldown(0.45);
  target.hp = Math.max(0, target.hp - meleeDamage);
  target.stunTimer = 0.35;
  target.state = "stunned";
  target.element.classList.remove("hit");
  void target.element.offsetWidth;
  target.element.classList.add("hit");
  showSlashEffect(attackArea, attackDirection);
  showFloatingText(`-${meleeDamage} HP`, target.x + 2, target.y - 10, "damage");
  showToast("Enemy hit!");

  setTimeout(() => {
    if (target.element) {
      target.element.classList.remove("hit");
    }
  }, 360);

  if (target.hp === 0) {
    defeatEnemy(target);
  } else {
    saveGame();
  }

  return true;
}

function getTargetEnemy() {
  const attackDirection = lastDirection;
  const meleeRange = purchasedUpgrades.includes("sharpSword") ? bossAttackRange + 22 : bossAttackRange;
  const meleeThickness = purchasedUpgrades.includes("sharpSword") ? bossAttackThickness + 16 : bossAttackThickness;
  const attackArea = GameLogic.getAttackArea(player, attackDirection, {
    spriteSize,
    range: meleeRange,
    thickness: meleeThickness
  });

  return enemies
    .filter((enemy) => !enemy.defeated)
    .filter((enemy) => rectanglesOverlap(attackArea, {
      x: enemy.x,
      y: enemy.y,
      width: spriteSize,
      height: spriteSize
    }))
    .sort((a, b) => getDistance(a, player) - getDistance(b, player))[0] || null;
}

function defeatEnemy(enemy) {
  enemy.defeated = true;
  enemy.element.classList.add("defeated");
  enemy.element.classList.remove("warning", "chasing");
  AudioManager.playSound("enemyDefeated");
  showFloatingText("Defeated!", enemy.x - 4, enemy.y - 14, "defeat");

  if (!enemy.rewarded) {
    const reward = handleEnemyDefeated(enemy);
    const comboReward = consumeComboBonusCoin(enemy);
    if (!defeatedEnemyIndexes.includes(enemy.spawnIndex)) {
      defeatedEnemyIndexes.push(enemy.spawnIndex);
    }
    showToast("Enemy defeated!");
    updateHud(reward || comboReward ? `${enemy.name} defeated! A reward dropped.` : `${enemy.name} defeated!`);
    saveGame();
  }

  setTimeout(() => {
    if (enemy.element && enemy.element !== enemyElement) {
      enemy.element.remove();
    }

    enemies = enemies.filter((item) => item !== enemy);

    if (enemy.element === enemyElement && enemies.length > 0) {
      const replacement = enemies[0];
      enemyElement.className = replacement.element.className;
      enemyElement.textContent = replacement.element.textContent;
      enemyElement.style.left = `${replacement.x}px`;
      enemyElement.style.top = `${replacement.y}px`;
      replacement.element.remove();
      replacement.element = enemyElement;
      enemyElement.style.display = "grid";
    } else if (enemy.element === enemyElement) {
      enemyElement.style.display = "none";
    }
  }, 420);
}

function consumeComboBonusCoin(enemy) {
  const result = GameLogic.consumeComboBonus(comboState);
  comboState = result.comboState;

  if (!result.shouldDrop) {
    return null;
  }

  const reward = spawnRewardDrop(enemy.x + 18, enemy.y, "coin");
  showToast("Combo bonus coin dropped!");
  updateCombatStatusUi();
  return reward;
}

function handleEnemyDefeated(enemy) {
  const claim = GameLogic.claimEnemyReward(enemy.rewarded);
  enemy.rewarded = claim.rewarded;

  if (!claim.shouldDrop) {
    return null;
  }

  const rewardType = getEnemyReward(enemy);

  if (rewardType) {
    return spawnRewardDrop(enemy.x, enemy.y, rewardType);
  }

  return null;
}

function getEnemyReward(enemy) {
  const islandKey = finalIslandActive ? "final" : ["coconut", "mist", "volcano"][currentLevelIndex];
  const dropTable = islandRewardTables[islandKey] || islandRewardTables.generic;
  return GameLogic.pickWeightedReward(dropTable, Math.random());
}

function spawnRewardDrop(x, y, rewardType, expiresAt = Date.now() + rewardDropLifetime * 1000, exactPosition = false) {
  const config = rewardTypes[rewardType];

  if (!config || expiresAt <= Date.now()) {
    return null;
  }

  const element = document.createElement("div");
  element.className = `reward-drop reward-${rewardType}`;
  element.textContent = config.icon;
  element.setAttribute("aria-label", rewardType);
  gameArea.appendChild(element);

  const reward = {
    type: rewardType,
    x: keepInside(x + (exactPosition ? 0 : (spriteSize - rewardDropSize) / 2), gameWidth - rewardDropSize),
    y: keepInside(y + (exactPosition ? 0 : (spriteSize - rewardDropSize) / 2), gameHeight - rewardDropSize),
    lifetime: Math.max(0, (expiresAt - Date.now()) / 1000),
    expiresAt,
    collected: false,
    element
  };

  rewardDrops.push(reward);
  return reward;
}

function restoreRewardDrops(savedRewards) {
  clearRewardDrops();

  if (!Array.isArray(savedRewards)) {
    return;
  }

  savedRewards.forEach((reward) => {
    spawnRewardDrop(reward.x, reward.y, reward.type, Number(reward.expiresAt) || 0, true);
  });
}

function collectTouchedRewardDrops() {
  rewardDrops.forEach((reward) => {
    const rewardArea = { x: reward.x, y: reward.y, width: rewardDropSize, height: rewardDropSize };
    const playerArea = { x: player.x, y: player.y, width: spriteSize, height: spriteSize };

    if (!reward.collected && rectanglesOverlap(playerArea, rewardArea)) {
      collectRewardDrop(reward);
    }
  });
}

function collectRewardDrop(reward) {
  if (!reward || reward.collected) {
    return;
  }

  reward.collected = true;
  const config = rewardTypes[reward.type];

  let floatingText = config.floatingText;
  let toastMessage = config.toast;

  if (reward.type === "coin") {
    totalCoins += 1;
  } else if (reward.type === "heart") {
    const result = GameLogic.applyHeartReward(health, maxHealth);
    health = result.health;
    floatingText = result.healed ? "+1 HP" : "HP Full";
    toastMessage = result.healed ? "Heart restored 1 HP!" : "HP is already full.";
    playPlayerPickupEffect("heart");
  } else if (reward.type === "shieldOrb") {
    const previousCharges = shieldCharges;
    shieldCharges = GameLogic.addShieldCharge(shieldCharges, maxShieldCharges);
    floatingText = shieldCharges > previousCharges ? "Shield +1" : "Shield Full";
    toastMessage = shieldCharges > previousCharges ? "Shield charge +1!" : "Shield charges are full.";
    playPlayerPickupEffect("shield");
  } else if (reward.type === "heartShard") {
    const result = GameLogic.collectHeartShard(heartShardCount, health, maxHealth, heartShardsPerUpgrade, maxPlayerHealth);
    heartShardCount = result.shardCount;
    health = result.health;
    maxHealth = result.maxHealth;
    floatingText = result.capped ? "Max HP Cap" : (result.upgraded ? "Max HP +1" : `Shard ${heartShardCount}/${heartShardsPerUpgrade}`);
    toastMessage = result.capped ? `Maximum HP is ${maxPlayerHealth}.` : (result.upgraded ? "Three shards formed a new heart!" : "Heart Shard collected!");
    playPlayerPickupEffect("shard");
  } else if (reward.type === "windLeaf") {
    rewardSkillTimers = GameLogic.refreshBuffTimer(rewardSkillTimers, "wind", windBuffDuration);
    floatingText = "Wind Boost!";
    toastMessage = `Wind boost active for ${windBuffDuration}s!`;
  } else if (reward.type === "swordFlame") {
    rewardSkillTimers = GameLogic.refreshBuffTimer(rewardSkillTimers, "sword", swordBuffDuration);
    floatingText = "Sword Power!";
    toastMessage = `Sword Flame active for ${swordBuffDuration}s!`;
  } else if (reward.type === "focusStar") {
    rewardSkillTimers = GameLogic.refreshBuffTimer(rewardSkillTimers, "focus", focusBuffDuration);
    floatingText = "Focus!";
    toastMessage = `Focus active for ${focusBuffDuration}s!`;
  }

  reward.element.remove();
  rewardDrops = rewardDrops.filter((item) => item !== reward);
  syncActiveSkillEffects();
  showFloatingText(floatingText, player.x + 2, player.y - 10, "reward");
  showToast(toastMessage);
  AudioManager.playSound("coin");
  updateHud(toastMessage);
  saveGame();
}

function playPlayerPickupEffect(effectName) {
  const className = `pickup-${effectName}`;
  playerElement.classList.remove(className);
  void playerElement.offsetWidth;
  playerElement.classList.add(className);
  setTimeout(() => playerElement.classList.remove(className), 650);
}

function updateRewardDrops(deltaTime) {
  rewardDrops.forEach((reward) => {
    reward.lifetime = Math.max(0, reward.lifetime - deltaTime);

    if (reward.lifetime === 0 || reward.expiresAt <= Date.now()) {
      reward.element.remove();
    }
  });

  rewardDrops = rewardDrops.filter((reward) => reward.lifetime > 0 && reward.expiresAt > Date.now());
}

function shootPirateGun(targetX, targetY) {
  if (introActive || gameOver || !purchasedUpgrades.includes("pirateGun")) {
    return;
  }

  if (!bossActive && enemies.every((enemy) => enemy.defeated)) {
    return;
  }

  if (gunCooldown > 0) {
    showToast(`Gun ready in ${Math.ceil(gunCooldown)}s.`);
    return;
  }

  const playerCenter = getSpriteCenter(player);
  const dx = targetX - playerCenter.x;
  const dy = targetY - playerCenter.y;
  const distance = Math.hypot(dx, dy);

  if (distance === 0) {
    return;
  }

  const vector = {
    x: dx / distance,
    y: dy / distance
  };
  const element = document.createElement("div");
  element.className = "bullet-effect";
  element.textContent = "•";
  gameArea.appendChild(element);

  const startX = playerCenter.x - 6 + vector.x * 16;
  const startY = playerCenter.y - 6 + vector.y * 16;

  element.style.left = `${startX}px`;
  element.style.top = `${startY}px`;

  bullets.push({
    x: startX,
    y: startY,
    dx: vector.x,
    dy: vector.y,
    lifetime: bulletLifetime,
    element
  });

  showMuzzleFlash(playerCenter, vector);
  gunCooldown = getCombatCooldown(gunCooldownDuration, minimumGunCooldown);
  AudioManager.playSound("gun");
  showToast("Pirate Gun fired!");
}

function showMuzzleFlash(origin, vector) {
  const flash = document.createElement("div");
  const angle = Math.atan2(vector.y, vector.x) * 180 / Math.PI;

  flash.className = "muzzle-flash";
  flash.style.left = `${origin.x + vector.x * 12}px`;
  flash.style.top = `${origin.y + vector.y * 12}px`;
  flash.style.transform = `rotate(${angle}deg)`;
  gameArea.appendChild(flash);

  setTimeout(() => flash.remove(), 180);
}

function updateBullets(deltaTime) {
  bullets.forEach((bullet) => {
    bullet.x += bullet.dx * bulletSpeed * deltaTime;
    bullet.y += bullet.dy * bulletSpeed * deltaTime;
    bullet.lifetime = Math.max(0, bullet.lifetime - deltaTime);

    if (bullet.lifetime === 0 || bullet.x < -12 || bullet.x > gameWidth || bullet.y < -12 || bullet.y > gameHeight) {
      bullet.done = true;
      return;
    }

    if (bossActive && boss && !isBossInvulnerable() && bulletHitsSprite(bullet, boss)) {
      damageBoss(1, "Gun shot!");
      bullet.done = true;
      return;
    }

    const enemy = enemies.find((item) => !item.defeated && bulletHitsSprite(bullet, item));
    if (enemy) {
      damageEnemy(enemy, 1, "Gun shot!");
      bullet.done = true;
    }
  });

  bullets
    .filter((bullet) => bullet.done)
    .forEach((bullet) => bullet.element.remove());
  bullets = bullets.filter((bullet) => !bullet.done);
}

function bulletHitsSprite(bullet, sprite) {
  return (
    bullet.x < sprite.x + spriteSize &&
    bullet.x + bulletSize > sprite.x &&
    bullet.y < sprite.y + spriteSize &&
    bullet.y + bulletSize > sprite.y
  );
}

function clearBullets() {
  bullets.forEach((bullet) => bullet.element.remove());
  bullets = [];
}

function damageEnemy(enemy, damage, message) {
  registerComboHit();
  enemy.hp = Math.max(0, enemy.hp - damage);
  enemy.stunTimer = 0.35;
  enemy.element.classList.remove("hit");
  void enemy.element.offsetWidth;
  enemy.element.classList.add("hit");
  showFloatingText(`-${damage} HP`, enemy.x + 2, enemy.y - 10, "damage");
  showToast(message || "Enemy hit!");

  setTimeout(() => {
    if (enemy.element) {
      enemy.element.classList.remove("hit");
    }
  }, 360);

  if (enemy.hp === 0) {
    defeatEnemy(enemy);
  } else {
    saveGame();
  }
}

function damageBoss(damage, message) {
  if (!boss || isBossInvulnerable()) {
    return;
  }

  registerComboHit();
  boss.hp = Math.max(0, boss.hp - damage);
  boss.stunTimer = boss.stunDuration;
  playBossHitEffect();
  showFloatingText(`-${damage} HP`, boss.x + 5, boss.y - 10, "damage");
  showToast(message);
  AudioManager.playSound("bossHit");
  updateHud(`${boss.name} hit! Boss HP: ${boss.hp}/${boss.maxHp}`);
  saveGame();

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
  const speedPowerUp = rewardSkillTimers.wind > 0 ? "wind" : (activePowerUp ? activePowerUp.id : null);
  return GameLogic.getPlayerSpeed(
    basePlayerSpeed,
    purchasedUpgrades.includes("strongSail"),
    speedPowerUp
  );
}

function getMeleeDamage() {
  return (purchasedUpgrades.includes("sharpSword") ? 2 : 1) + (rewardSkillTimers.sword > 0 ? 1 : 0);
}

function getComboDamageBonusForNextHit() {
  const willActivatePowerStrike = comboState.count === 1 && comboState.timer > 0;
  return comboState.damageTimer > 0 || willActivatePowerStrike ? 1 : 0;
}

function registerComboHit() {
  comboState = GameLogic.registerComboHit(comboState, comboWindowDuration, comboDamageDuration);

  if (comboState.count === 2 || comboState.count === 3) {
    showFloatingText(`Combo x${comboState.count}!`, player.x - 4, player.y - 12, "combo");
    playComboFlash();
    AudioManager.playSound("combo");
  }

  updateCombatStatusUi();
}

function updateCombo(deltaTime) {
  comboState = GameLogic.updateComboState(comboState, deltaTime);
  updateCombatStatusUi();
}

function resetCombo() {
  comboState = GameLogic.resetComboState();
  playerElement.classList.remove("combo-flash");

  if (comboMeter) {
    updateCombatStatusUi();
  }
}

function playComboFlash() {
  playerElement.classList.remove("combo-flash");
  void playerElement.offsetWidth;
  playerElement.classList.add("combo-flash");
  setTimeout(() => playerElement.classList.remove("combo-flash"), 420);
}

function getCombatCooldown(baseCooldown, minimumCooldown = 0) {
  return Math.max(minimumCooldown, GameLogic.getBuffedCooldown(baseCooldown, rewardSkillTimers.focus > 0));
}

function activateMysteryFruit(fruit) {
  fruit.collected = true;
  activePowerUp = fruit;

  if (fruit.id === "shield") {
    shieldCharges = GameLogic.addShieldCharge(shieldCharges, maxShieldCharges);
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

function resetRewardSkillTimers() {
  rewardSkillTimers = { wind: 0, sword: 0, focus: 0 };
  syncActiveSkillEffects();
}

function updateActiveSkills(deltaTime) {
  const expiryMessages = {
    wind: "Wind faded",
    sword: "Sword Flame faded",
    focus: "Focus faded"
  };

  const previousTimers = rewardSkillTimers;
  rewardSkillTimers = GameLogic.updateBuffTimers(rewardSkillTimers, deltaTime);

  Object.keys(rewardSkillTimers).forEach((skill) => {
    const wasActive = previousTimers[skill] > 0;

    if (wasActive && rewardSkillTimers[skill] === 0) {
      showToast(expiryMessages[skill]);
    }
  });

  syncActiveSkillEffects();
  updateActiveSkillBar();
}

function syncActiveSkillEffects() {
  playerElement.classList.toggle("buff-wind", rewardSkillTimers.wind > 0);
  playerElement.classList.toggle("buff-sword", rewardSkillTimers.sword > 0);
  playerElement.classList.toggle("buff-focus", rewardSkillTimers.focus > 0);
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
  resetMovementKeys();
  updateQuestPanel();
  updateMusicForGameState();
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
    AudioManager.playSound("routeCorrect");
    updateHud(result.message);
    saveGame();
    focusGame();
    completeLevel();
    return;
  }

  health = result.health;
  resetCombo();
  showToast("Wrong answer! HP -1");
  AudioManager.playSound("routeWrong");
  updateHud(result.message);
  saveGame();

  if (health <= 0) {
    routePanel.classList.add("hidden");
    endGame("Game Over", "Wrong answer! The sea path is still hidden.");
  } else {
    focusGame();
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
    if (activePowerUp && activePowerUp.id === "shield") {
      activePowerUp = null;
    }
    showFloatingText("Blocked!", player.x - 2, player.y - 10, "blocked");
    playPlayerPickupEffect("shield-block");
    showToast("Shield blocked damage!");
    updateHud("Your shield blocked the hit!");
    saveGame();
    return;
  }

  resetCombo();

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

  AudioManager.playSound("hurt");
  showToast("HP -1");
  updateHud(statusMessage);
  saveGame();

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
  completedIslands = GameLogic.addCompletedIsland(completedIslands, completedLevelName);
  mapFragments = completedIslands.length;
  gameOver = true;
  showToast("Map fragment collected!");
  updateHud([
    `Sea Map Fragment found on ${completedLevelName}!`,
    `${score} coins added to your wallet.`,
    crewMessage,
    cookMessage
  ].filter(Boolean).join(" "));
  gameOver = false;
  saveGame();
  gameOver = true;
  showUpgradeMenu();
}

function showUpgradeMenu() {
  renderUpgradeChoices();
  upgradeWallet.textContent = `Wallet: ${totalCoins} coins`;
  upgradeMessage.textContent = getUpgradeMenuMessage();
  continueMapButton.textContent = "Open World Map";
  upgradeMenu.classList.remove("hidden");
  resetMovementKeys();
  updateQuestPanel();
  updateMusicForGameState();
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

  if (upgrade.id === "reinforcedHull" && maxHealth >= maxPlayerHealth) {
    showToast(`Maximum HP is ${maxPlayerHealth}.`);
    upgradeMessage.textContent = "Your hull cannot support more health.";
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
  const purchaseMessage = upgradeId === "pirateGun"
    ? "Pirate Gun unlocked! Left click inside the map to shoot."
    : `${upgrade.name} purchased!`;
  showToast(purchaseMessage);
  AudioManager.playSound("purchase");
  updateHud(purchaseMessage);
  upgradeMessage.textContent = `${purchaseMessage} Wallet: ${totalCoins} coins.`;
  upgradeWallet.textContent = `Wallet: ${totalCoins} coins`;
  renderUpgradeChoices();
  saveGame();
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
  AudioManager.playSound("purchase");
  updateHud(`Heart Potion restored 1 HP. Wallet: ${totalCoins} coins.`);
  upgradeMessage.textContent = `Heart Potion restored 1 HP. Wallet: ${totalCoins} coins.`;
  upgradeWallet.textContent = `Wallet: ${totalCoins} coins`;
  renderUpgradeChoices();
  saveGame();
}

function applyUpgradeEffect(upgradeId) {
  if (upgradeId === "reinforcedHull") {
    maxHealth = Math.min(maxPlayerHealth, maxHealth + 1);
    health = Math.min(health + 1, maxHealth);
  }
}

function continueToWorldMap() {
  upgradeMenu.classList.add("hidden");
  resetMovementKeys();
  saveGame();
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
  resetMovementKeys();
  updateQuestPanel();
  updateMusicForGameState();
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
  resetMovementKeys();
  saveGame();
  showSailingTransition(destination.name, () => {
    if (index === 3) {
      startFinalTreasureIsland();
      saveGame();
      return;
    }

    currentLevelIndex = index;
    startLevel();
    saveGame();
  });
}

function showSailingTransition(islandName, onComplete) {
  sailingMessage.textContent = `Sailing to ${islandName}...`;
  sailingOverlay.classList.remove("hidden");
  showToast(`Sailing to ${islandName}...`);

  setTimeout(() => {
    sailingOverlay.classList.add("hidden");
    focusGame();
    onComplete();
  }, 950);
}

function completeFinalAdventure() {
  gameOver = true;
  finalAdventureCompleted = true;
  finalIslandActive = false;
  removeGrandTreasure();
  overlayAction = "restart";
  clearSavedGame();
  gameOverlay.classList.add("hidden");
  updateHud("You found the Grand Treasure and became a legend of the Tiny Sea!");
  showToast("Grand Treasure found!");
  showHallOfFame({ completion: true });
  setMusicMode("victory");
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
  resetMovementKeys();
  updateQuestPanel();
  updateMusicForGameState();
}

function handleOverlayButton() {
  if (overlayAction === "next") {
    currentLevelIndex += 1;
    startLevel();
  } else {
    startGame();
  }
}

async function handleStartAdventureClick() {
  await AudioManager.unlockAudio();
  startNewAdventure();
}

async function handleContinueAdventureClick() {
  await AudioManager.unlockAudio();
  continueAdventure();
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

function isHallOfFameOpen() {
  return !hallOfFameOverlay.classList.contains("hidden");
}

function getMovementDirectionFromCode(code) {
  if (code === "KeyW" || code === "ArrowUp") {
    return "up";
  }

  if (code === "KeyS" || code === "ArrowDown") {
    return "down";
  }

  if (code === "KeyA" || code === "ArrowLeft") {
    return "left";
  }

  if (code === "KeyD" || code === "ArrowRight") {
    return "right";
  }

  return "";
}

function isGameplayBlocked() {
  return introActive || gameOver || isNpcDialogueOpen() || isRouteQuestionOpen() || isWorldMapOpen() || isUpgradeMenuOpen() || isHallOfFameOpen();
}

function resetMovementKeys() {
  keys.up = false;
  keys.down = false;
  keys.left = false;
  keys.right = false;
}

function gameLoop(currentTime) {
  const deltaTime = lastFrameTime ? (currentTime - lastFrameTime) / 1000 : 0;
  const safeDeltaTime = Math.min(deltaTime, 0.05);
  lastFrameTime = currentTime;

  if (!isGameplayBlocked()) {
    attackCooldown = Math.max(0, attackCooldown - safeDeltaTime);
    dashCooldown = Math.max(0, dashCooldown - safeDeltaTime);
    gunCooldown = Math.max(0, gunCooldown - safeDeltaTime);
    updateCombo(safeDeltaTime);
    movePlayer(safeDeltaTime);
    moveEnemies(safeDeltaTime);
    updatePowerUp(safeDeltaTime);
    updateActiveSkills(safeDeltaTime);
    updateBullets(safeDeltaTime);
    updateEnemyProjectiles(safeDeltaTime);
    updateRewardDrops(safeDeltaTime);
    checkCollisions(safeDeltaTime);
    updateBoss(safeDeltaTime);
    drawSprites();
  } else {
    resetMovementKeys();
  }

  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (event) => {
  AudioManager.unlockAudio();

  if (event.target === pirateNameInput) {
    if (event.key === "Enter") {
      event.preventDefault();
      saveHallOfFameAchievement();
    }
    return;
  }

  const movementDirection = getMovementDirectionFromCode(event.code);

  if (movementDirection) {
    event.preventDefault();

    if (!isGameplayBlocked()) {
      keys[movementDirection] = true;
      updateLastDirection(movementDirection);
    }

    return;
  }

  if (event.key === "Shift") {
    event.preventDefault();
    if (!event.repeat && !isGameplayBlocked()) {
      dashPlayer();
    }
    return;
  }

  if (event.code === "Space") {
    event.preventDefault();
    if (!isGameplayBlocked()) {
      performMeleeAttack();
    }
    return;
  }

  const key = event.key.toLowerCase();

  if (key === "e") {
    event.preventDefault();
    if (!isGameplayBlocked()) {
      interactWithNpc();
    }
    return;
  }
});

document.addEventListener("keyup", (event) => {
  const movementDirection = getMovementDirectionFromCode(event.code);

  if (movementDirection) {
    event.preventDefault();
    keys[movementDirection] = false;
  }
});

function handleGameAreaClick(event) {
  if (event.target.closest("button")) {
    return;
  }

  AudioManager.unlockAudio();

  if (isGameplayBlocked()) {
    return;
  }

  event.preventDefault();
  focusGame();

  if (!purchasedUpgrades.includes("pirateGun")) {
    showToast("Buy Pirate Gun to shoot!");
    return;
  }

  const rect = gameArea.getBoundingClientRect();
  const targetX = event.clientX - rect.left;
  const targetY = event.clientY - rect.top;

  shootPirateGun(targetX, targetY);
}

window.addEventListener("blur", resetMovementKeys);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    resetMovementKeys();
  }
});

document.addEventListener("click", (event) => {
  const clickedButton = event.target.closest("button");

  if (!clickedButton) {
    return;
  }

  AudioManager.unlockAudio();

  if (clickedButton !== muteButton && clickedButton !== testSoundButton) {
    AudioManager.playSound("button");
  }
}, true);

restartButton.addEventListener("click", startGame);
overlayRestartButton.addEventListener("click", handleOverlayButton);
continueMapButton.addEventListener("click", continueToWorldMap);
startAdventureButton.addEventListener("click", handleStartAdventureClick);
continueAdventureButton.addEventListener("click", handleContinueAdventureClick);
saveAchievementButton.addEventListener("click", saveHallOfFameAchievement);
hallOfFameCloseButton.addEventListener("click", closeHallOfFame);
hallPlayAgainButton.addEventListener("click", playAgainFromHallOfFame);
hallViewButton.addEventListener("click", refreshHallOfFame);
hallOfFameButton.addEventListener("click", () => showHallOfFame());
introHallOfFameButton.addEventListener("click", () => showHallOfFame());
testSoundButton.addEventListener("click", () => AudioManager.testSound());
muteButton.addEventListener("click", AudioManager.toggleMute);
gameArea.addEventListener("click", handleGameAreaClick);

startGame({ clearSave: false });
updateContinueControls();
syncMuteButton();
gameLoop();

