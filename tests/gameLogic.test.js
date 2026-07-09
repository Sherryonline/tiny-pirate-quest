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
