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
    health: 3,
    message: "Correct! The sea route is revealed."
  });

  assert.deepEqual(GameLogic.answerRouteQuestion(0, 1, 3), {
    isCorrect: false,
    health: 2,
    message: "Wrong answer! The sea path is still hidden."
  });
});

test("damage uses shield before reducing health", () => {
  assert.deepEqual(GameLogic.applyDamage({ health: 2, shieldCharges: 1, cooldown: 0, damageCooldown: 1 }), {
    health: 2,
    shieldCharges: 0,
    cooldown: 0,
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
  assert.equal(GameLogic.getPlayerSpeed(220, true, "wind"), 335);
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
    range: 80,
    damage: 1,
    cooldown: 0,
    hitCooldown: 0.6,
    missCooldown: 0.2
  };

  assert.deepEqual(GameLogic.getAttackArea(player, "right", options), {
    x: 134,
    y: 100,
    width: 80,
    height: 34
  });
  assert.deepEqual(GameLogic.getAttackArea(player, "left", options), {
    x: 20,
    y: 100,
    width: 80,
    height: 34
  });
  assert.deepEqual(GameLogic.getAttackArea(player, "up", options), {
    x: 100,
    y: 20,
    width: 34,
    height: 80
  });
  assert.deepEqual(GameLogic.getAttackArea(player, "down", options), {
    x: 100,
    y: 134,
    width: 34,
    height: 80
  });

  assert.equal(GameLogic.attackBoss(player, { x: 150, y: 105, hp: 2 }, { ...options, direction: "right" }).reason, "hit");
  assert.equal(GameLogic.attackBoss(player, { x: 150, y: 105, hp: 2 }, { ...options, direction: "left" }).reason, "out-of-range");
  assert.equal(GameLogic.attackBoss(player, { x: 105, y: 50, hp: 2 }, { ...options, direction: "up" }).reason, "hit");
  assert.equal(GameLogic.attackBoss(player, { x: 105, y: 160, hp: 2 }, { ...options, direction: "down" }).reason, "hit");
});
