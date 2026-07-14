const assert = require("node:assert/strict");
const GameLogic = require("../gameLogic");

function test(name, fn) {
  try {
    fn();
    console.log(`ok - ${name}`);
  } catch (error) {
    console.error(`not ok - ${name}`);
    throw error;
  }
}

test("collision detects overlapping sprites", () => {
  assert.equal(GameLogic.isTouching({ x: 10, y: 10 }, { x: 30, y: 30 }, 34), true);
  assert.equal(GameLogic.isTouching({ x: 10, y: 10 }, { x: 80, y: 80 }, 34), false);
});

test("boundary clamps values inside the game area", () => {
  assert.equal(GameLogic.keepInside(-5, 100), 0);
  assert.equal(GameLogic.keepInside(50, 100), 50);
  assert.equal(GameLogic.keepInside(120, 100), 100);
});

test("route answers unlock only when correct", () => {
  assert.deepEqual(GameLogic.answerRouteQuestion(1, 1, 3), {
    isCorrect: true,
    state: "success",
    health: 3,
    gameOver: false,
    message: "Correct! The sea route is revealed."
  });

  assert.deepEqual(GameLogic.answerRouteQuestion(0, 1, 3), {
    isCorrect: false,
    state: "retry",
    health: 3,
    gameOver: false,
    message: "Not quite, pirate! Read the clue again."
  });
});

test("wrong route answers retry without forcing game over", () => {
  const result = GameLogic.answerRouteQuestion(0, 2, 1);

  assert.equal(result.state, "retry");
  assert.equal(result.health, 1);
  assert.equal(result.gameOver, false);
});

test("damage uses shield before reducing health", () => {
  assert.deepEqual(GameLogic.applyDamage({ health: 2, shieldCharges: 1, cooldown: 0, damageCooldown: 1 }), {
    health: 2,
    shieldCharges: 0,
    cooldown: 1,
    blocked: true,
    gameOver: false
  });

  assert.deepEqual(GameLogic.applyDamage({ health: 1, shieldCharges: 0, cooldown: 0, damageCooldown: 1 }), {
    health: 0,
    shieldCharges: 0,
    cooldown: 1,
    blocked: false,
    gameOver: true
  });
});

test("heart rewards heal without exceeding max health", () => {
  assert.deepEqual(GameLogic.applyHeartReward(2, 3), { health: 3, healed: true });
  assert.deepEqual(GameLogic.applyHeartReward(3, 3), { health: 3, healed: false });
});

test("shield rewards cap at three charges", () => {
  assert.equal(GameLogic.addShieldCharge(1, 3), 2);
  assert.equal(GameLogic.addShieldCharge(3, 3), 3);
});

test("three heart shards increase max health and heal one", () => {
  assert.deepEqual(GameLogic.collectHeartShard(1, 2, 3, 3), {
    shardCount: 2,
    health: 2,
    maxHealth: 3,
    upgraded: false,
    capped: false
  });
  assert.deepEqual(GameLogic.collectHeartShard(2, 2, 3, 3), {
    shardCount: 0,
    health: 3,
    maxHealth: 4,
    upgraded: true,
    capped: false
  });
});

test("heart shard health upgrades stop at the player health cap", () => {
  assert.deepEqual(GameLogic.collectHeartShard(2, 5, 6, 3, 6), {
    shardCount: 0,
    health: 5,
    maxHealth: 6,
    upgraded: false,
    capped: true
  });
});

test("buff timers decrease and refresh without stacking", () => {
  const active = { wind: 5, sword: 0, focus: 2 };
  assert.deepEqual(GameLogic.updateBuffTimers(active, 1.5), {
    wind: 3.5,
    sword: 0,
    focus: 0.5
  });
  assert.deepEqual(GameLogic.refreshBuffTimer(active, "wind", 7), {
    wind: 7,
    sword: 0,
    focus: 2
  });
});

test("an enemy reward can only be claimed once", () => {
  assert.deepEqual(GameLogic.claimEnemyReward(false), { rewarded: true, shouldDrop: true });
  assert.deepEqual(GameLogic.claimEnemyReward(true), { rewarded: true, shouldDrop: false });
});

test("completed islands remain unique when replayed", () => {
  assert.deepEqual(GameLogic.addCompletedIsland([], "Coconut Island"), ["Coconut Island"]);
  assert.deepEqual(GameLogic.addCompletedIsland(["Coconut Island"], "Coconut Island"), ["Coconut Island"]);
  assert.deepEqual(GameLogic.addCompletedIsland(["Coconut Island"], "Mist Island"), ["Coconut Island", "Mist Island"]);
});

test("combo hits refresh the window and unlock power rewards", () => {
  const emptyCombo = GameLogic.resetComboState();
  const firstHit = GameLogic.registerComboHit(emptyCombo, 2.5, 3);
  const secondHit = GameLogic.registerComboHit(firstHit, 2.5, 3);
  const thirdHit = GameLogic.registerComboHit(secondHit, 2.5, 3);

  assert.deepEqual(firstHit, { count: 1, timer: 2.5, damageTimer: 0, bonusCoinReady: false });
  assert.deepEqual(secondHit, { count: 2, timer: 2.5, damageTimer: 3, bonusCoinReady: false });
  assert.deepEqual(thirdHit, { count: 3, timer: 2.5, damageTimer: 3, bonusCoinReady: true });
});

test("combo expires after its hit window", () => {
  const activeCombo = { count: 3, timer: 1, damageTimer: 2, bonusCoinReady: true };
  assert.deepEqual(GameLogic.updateComboState(activeCombo, 0.4), {
    count: 3,
    timer: 0.6,
    damageTimer: 1.6,
    bonusCoinReady: true
  });
  assert.deepEqual(GameLogic.updateComboState(activeCombo, 1), {
    count: 0,
    timer: 0,
    damageTimer: 0,
    bonusCoinReady: false
  });
});

test("player damage reset clears the complete combo state", () => {
  const activeCombo = { count: 4, timer: 2.5, damageTimer: 3, bonusCoinReady: true };

  assert.deepEqual(GameLogic.resetComboState(activeCombo), {
    count: 0,
    timer: 0,
    damageTimer: 0,
    bonusCoinReady: false
  });
});

test("combo and weakness damage are capped while bosses ignore combo damage", () => {
  assert.equal(GameLogic.getBalancedAttackDamage(1, 1, 0, false), 2);
  assert.equal(GameLogic.getBalancedAttackDamage(1, 1, 1, false), 3);
  assert.equal(GameLogic.getBalancedAttackDamage(3, 1, 1, false), 3);
  assert.equal(GameLogic.getBalancedAttackDamage(1, 1, 0, true), 1);
  assert.equal(GameLogic.getBalancedAttackDamage(3, 1, 0, true), 2);
});

test("combo bonus coin readiness is consumed once", () => {
  const readyCombo = { count: 3, timer: 2, damageTimer: 2.5, bonusCoinReady: true };
  const firstClaim = GameLogic.consumeComboBonus(readyCombo);
  const secondClaim = GameLogic.consumeComboBonus(firstClaim.comboState);

  assert.equal(firstClaim.shouldDrop, true);
  assert.equal(firstClaim.comboState.bonusCoinReady, false);
  assert.equal(secondClaim.shouldDrop, false);
});

test("normal enemy weaknesses grant exactly one bonus damage", () => {
  assert.equal(GameLogic.getEnemyWeaknessBonus("swordFlame", {
    attackType: "sword", swordFlameActive: true, focusActive: false, comboCount: 0
  }), 1);
  assert.equal(GameLogic.getEnemyWeaknessBonus("focus", {
    attackType: "sword", swordFlameActive: false, focusActive: true, comboCount: 0
  }), 1);
  assert.equal(GameLogic.getEnemyWeaknessBonus("pirateGun", {
    attackType: "gun", swordFlameActive: false, focusActive: false, comboCount: 0
  }), 1);
  assert.equal(GameLogic.getEnemyWeaknessBonus("swordCombo", {
    attackType: "sword", swordFlameActive: false, focusActive: false, comboCount: 2
  }), 1);
});

test("non-weak attacks keep normal enemy damage", () => {
  assert.equal(GameLogic.getEnemyWeaknessBonus("swordFlame", {
    attackType: "gun", swordFlameActive: true, focusActive: false, comboCount: 0
  }), 0);
  assert.equal(GameLogic.getEnemyWeaknessBonus("pirateGun", {
    attackType: "sword", swordFlameActive: false, focusActive: false, comboCount: 3
  }), 0);
  assert.equal(GameLogic.getEnemyWeaknessBonus("swordCombo", {
    attackType: "sword", swordFlameActive: false, focusActive: false, comboCount: 1
  }), 0);
});

test("upgrades require enough coins and apply once", () => {
  const strongSail = { id: "strongSail", cost: 8 };

  assert.equal(GameLogic.buyUpgrade(5, [], strongSail).reason, "not-enough-coins");

  const purchased = GameLogic.buyUpgrade(10, [], strongSail);
  assert.equal(purchased.purchased, true);
  assert.equal(purchased.wallet, 2);
  assert.deepEqual(purchased.purchasedUpgrades, ["strongSail"]);

  assert.equal(GameLogic.buyUpgrade(10, ["strongSail"], strongSail).reason, "already-purchased");
});

test("speed combines Strong Sail and Wind Fruit", () => {
  assert.equal(GameLogic.getPlayerSpeed(220, false, null), 220);
  assert.equal(GameLogic.getPlayerSpeed(220, true, null), 265);
  assert.equal(GameLogic.getPlayerSpeed(220, true, "wind"), 325);
});

test("Focus reduces combat cooldowns by thirty percent", () => {
  assert.equal(GameLogic.getBuffedCooldown(1, false), 1);
  assert.equal(GameLogic.getBuffedCooldown(1, true), 0.7);
  assert.ok(Math.abs(GameLogic.getBuffedCooldown(0.7, true) - 0.49) < 0.000001);
});

test("island unlock follows map fragment count", () => {
  assert.equal(GameLogic.canSelectIsland(1, 0), false);
  assert.equal(GameLogic.canSelectIsland(1, 1), true);
  assert.equal(GameLogic.getUnlockedIslandIndex(3, 4), 3);
  assert.equal(
    GameLogic.getNextIslandName(3, [
      { name: "Coconut Island" },
      { name: "Mist Island" },
      { name: "Volcano Island" },
      { name: "Final Treasure Island" }
    ]),
    "Final Treasure Island"
  );
});

test("cook heals up to max health", () => {
  assert.equal(GameLogic.applyCookHeal(2, 4, true), 3);
  assert.equal(GameLogic.applyCookHeal(4, 4, true), 4);
  assert.equal(GameLogic.applyCookHeal(2, 4, false), 2);
});

test("boss attack requires range and cooldown", () => {
  const options = {
    spriteSize: 34,
    range: 60,
    damage: 1,
    cooldown: 0,
    hitCooldown: 0.6,
    missCooldown: 0.2
  };

  assert.deepEqual(GameLogic.attackBoss({ x: 10, y: 10 }, { x: 35, y: 20, hp: 2 }, options), {
    hit: true,
    bossHp: 1,
    cooldown: 0.6,
    defeated: false,
    reason: "hit"
  });

  assert.deepEqual(GameLogic.attackBoss({ x: 10, y: 10 }, { x: 35, y: 20, hp: 1 }, options), {
    hit: true,
    bossHp: 0,
    cooldown: 0.6,
    defeated: true,
    reason: "hit"
  });

  assert.equal(
    GameLogic.attackBoss({ x: 10, y: 10 }, { x: 200, y: 200, hp: 2 }, options).reason,
    "out-of-range"
  );
  assert.equal(
    GameLogic.attackBoss({ x: 10, y: 10 }, { x: 35, y: 20, hp: 2 }, { ...options, cooldown: 0.3 }).reason,
    "cooldown"
  );
});

test("boss attack uses directional attack area", () => {
  const player = { x: 100, y: 100 };
  const options = {
    spriteSize: 34,
    range: 100,
    thickness: 70,
    damage: 1,
    cooldown: 0,
    hitCooldown: 0.6,
    missCooldown: 0.2
  };

  assert.deepEqual(GameLogic.getAttackArea(player, "right", options), {
    x: 134,
    y: 82,
    width: 100,
    height: 70
  });
  assert.deepEqual(GameLogic.getAttackArea(player, "left", options), {
    x: 0,
    y: 82,
    width: 100,
    height: 70
  });
  assert.deepEqual(GameLogic.getAttackArea(player, "up", options), {
    x: 82,
    y: 0,
    width: 70,
    height: 100
  });
  assert.deepEqual(GameLogic.getAttackArea(player, "down", options), {
    x: 82,
    y: 134,
    width: 70,
    height: 100
  });

  assert.equal(GameLogic.attackBoss(player, { x: 150, y: 55, hp: 2 }, { ...options, direction: "right" }).reason, "hit");
  assert.equal(GameLogic.attackBoss(player, { x: 150, y: 105, hp: 2 }, { ...options, direction: "left" }).reason, "out-of-range");
  assert.equal(GameLogic.attackBoss(player, { x: 55, y: 50, hp: 2 }, { ...options, direction: "up" }).reason, "hit");
  assert.equal(GameLogic.attackBoss(player, { x: 145, y: 160, hp: 2 }, { ...options, direction: "down" }).reason, "hit");
});

test("pirate names are trimmed, limited, and defaulted", () => {
  assert.equal(GameLogic.sanitizePirateName("  Captain Sherry  ", 20), "Captain Sherry");
  assert.equal(GameLogic.sanitizePirateName("", 20), "Tiny Pirate");
  assert.equal(GameLogic.sanitizePirateName("1234567890123456789012345", 20), "12345678901234567890");
});

test("leaderboard ranks coins first and latest completion second", () => {
  const records = [
    { playerName: "Older", coins: 20, completedDate: "2026-07-09T10:00:00.000Z" },
    { playerName: "Most Coins", coins: 30, completedDate: "2026-07-08T10:00:00.000Z" },
    { playerName: "Newer", coins: 20, completedDate: "2026-07-10T10:00:00.000Z" }
  ];

  assert.deepEqual(
    GameLogic.sortLeaderboardRecords(records).map((record) => record.playerName),
    ["Most Coins", "Newer", "Older"]
  );
});

test("leaderboard stores only the top five records", () => {
  const records = Array.from({ length: 7 }, (_, index) => ({
    playerName: `Pirate ${index + 1}`,
    coins: index + 1,
    completedAt: `2026-07-${String(index + 1).padStart(2, "0")}T10:00:00.000Z`
  }));
  const topFive = GameLogic.getTopLeaderboard(records, 5);

  assert.equal(topFive.length, 5);
  assert.deepEqual(topFive.map((record) => record.coins), [7, 6, 5, 4, 3]);
});

test("adding a leaderboard record trims its name and keeps coin order", () => {
  const records = GameLogic.addLeaderboardRecord(
    [{ playerName: "Old Salt", coins: 4, completedDate: "2026-07-10T10:00:00.000Z" }],
    { playerName: "  New Legend  ", coins: 12, completedDate: "2026-07-11T10:00:00.000Z" },
    5
  );

  assert.equal(records[0].playerName, "New Legend");
  assert.deepEqual(records.map((record) => record.coins), [12, 4]);
});

test("adding an empty leaderboard name uses Tiny Pirate", () => {
  const records = GameLogic.addLeaderboardRecord([], {
    playerName: "   ",
    coins: 1,
    completedDate: "2026-07-11T10:00:00.000Z"
  }, 5);

  assert.equal(records[0].playerName, "Tiny Pirate");
});

test("audio playback stays disabled safely when muted or unavailable", () => {
  assert.equal(GameLogic.isAudioPlaybackReady(), false);
  assert.equal(GameLogic.isAudioPlaybackReady({ muted: false, unlocked: true }), false);
  assert.equal(GameLogic.isAudioPlaybackReady({
    muted: true,
    unlocked: true,
    context: {},
    gain: {}
  }), false);
  assert.equal(GameLogic.isAudioPlaybackReady({
    muted: false,
    unlocked: true,
    context: {},
    gain: {}
  }), true);
});

test("enemy rewards follow weighted drop table boundaries", () => {
  const table = [
    { type: "coin", weight: 0.5 },
    { type: "heart", weight: 0.2 },
    { type: "shieldOrb", weight: 0.1 },
    { type: null, weight: 0.2 }
  ];

  assert.equal(GameLogic.pickWeightedReward(table, 0), "coin");
  assert.equal(GameLogic.pickWeightedReward(table, 0.499), "coin");
  assert.equal(GameLogic.pickWeightedReward(table, 0.5), "heart");
  assert.equal(GameLogic.pickWeightedReward(table, 0.7), "shieldOrb");
  assert.equal(GameLogic.pickWeightedReward(table, 0.8), null);
});

test("rare treasure drop rates keep rare rewards uncommon", () => {
  const table = [
    { type: "goldenCompassPiece", weight: 0.03 },
    { type: "ancientCoin", weight: 0.04 },
    { type: "pirateBadge", weight: 0.02 },
    { type: null, weight: 0.91 }
  ];

  assert.equal(GameLogic.pickWeightedReward(table, 0.029), "goldenCompassPiece");
  assert.equal(GameLogic.pickWeightedReward(table, 0.03), "ancientCoin");
  assert.equal(GameLogic.pickWeightedReward(table, 0.07), "pirateBadge");
  assert.equal(GameLogic.pickWeightedReward(table, 0.091), null);
});

test("three Ancient Coins unlock the Golden Pirate skin", () => {
  let collection = GameLogic.normalizeRareCollection();
  collection = GameLogic.collectRareTreasure(collection, "ancientCoin");
  collection = GameLogic.collectRareTreasure(collection, "ancientCoin");
  collection = GameLogic.collectRareTreasure(collection, "ancientCoin");

  assert.equal(collection.ancientCoins, 3);
  assert.deepEqual(collection.unlockedSkins, ["classic", "goldenPirate"]);
  assert.equal(GameLogic.collectRareTreasure(collection, "ancientCoin").ancientCoins, 3);
});

test("three Compass Pieces unlock the secret ending and badge is permanent", () => {
  let collection = GameLogic.normalizeRareCollection();
  collection = GameLogic.collectRareTreasure(collection, "goldenCompassPiece");
  collection = GameLogic.collectRareTreasure(collection, "goldenCompassPiece");
  collection = GameLogic.collectRareTreasure(collection, "goldenCompassPiece");
  collection = GameLogic.collectRareTreasure(collection, "pirateBadge");

  assert.equal(collection.goldenCompassPieces, 3);
  assert.equal(collection.secretEndingUnlocked, true);
  assert.equal(collection.pirateBadge, true);
});

test("locked skin selection falls back to the classic pirate", () => {
  const locked = GameLogic.normalizeRareCollection({
    selectedSkin: "goldenPirate",
    unlockedSkins: ["classic", "goldenPirate"],
    secretEndingUnlocked: true
  });
  const unlocked = GameLogic.normalizeRareCollection({
    ancientCoins: 3,
    selectedSkin: "goldenPirate"
  });

  assert.equal(locked.selectedSkin, "classic");
  assert.equal(locked.secretEndingUnlocked, false);
  assert.equal(unlocked.selectedSkin, "goldenPirate");
});

test("companion follows smoothly and catches up without leaving the map", () => {
  const normalStep = GameLogic.getCompanionFollowPosition(
    { x: 20, y: 20 },
    { x: 100, y: 100 },
    { x: -30, y: -24 },
    0.1,
    { maxX: 692, maxY: 452 }
  );
  const edgeStep = GameLogic.getCompanionFollowPosition(
    { x: 680, y: 440 },
    { x: 720, y: 480 },
    { x: 30, y: 30 },
    1,
    { maxX: 692, maxY: 452 }
  );

  assert.ok(normalStep.x > 20 && normalStep.x < 70);
  assert.ok(normalStep.y > 20 && normalStep.y < 76);
  assert.deepEqual(edgeStep, { x: 692, y: 452 });
});

test("companion pickup requires both pet range and nearby player path", () => {
  const parrot = { x: 100, y: 100 };
  const player = { x: 130, y: 100 };

  assert.equal(GameLogic.canCompanionCollect(parrot, { x: 150, y: 100 }, player, 55, 100), true);
  assert.equal(GameLogic.canCompanionCollect(parrot, { x: 156, y: 100 }, player, 55, 100), false);
  assert.equal(GameLogic.canCompanionCollect(parrot, { x: 50, y: 100 }, { x: 300, y: 100 }, 55, 100), false);
});

test("parrot unlock restores from save or completed Coconut side quest", () => {
  const incompleteQuests = [{ island: "Coconut Island", rewarded: false }];
  const completedQuests = [{ island: "Coconut Island", rewarded: true }];

  assert.equal(GameLogic.isParrotUnlocked(false, incompleteQuests), false);
  assert.equal(GameLogic.isParrotUnlocked(true, incompleteQuests), true);
  assert.equal(GameLogic.isParrotUnlocked(false, completedQuests), true);
});

test("persistent rare unlockables survive a serialized save round trip", () => {
  const unlocked = GameLogic.normalizeRareCollection({
    goldenCompassPieces: 3,
    ancientCoins: 3,
    pirateBadge: true,
    selectedSkin: "goldenPirate"
  });
  const restored = GameLogic.normalizeRareCollection(JSON.parse(JSON.stringify(unlocked)));

  assert.deepEqual(restored, unlocked);
  assert.equal(restored.secretEndingUnlocked, true);
  assert.deepEqual(restored.unlockedSkins, ["classic", "goldenPirate"]);
});
