(function (root, factory) {
  const gameLogic = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = gameLogic;
  }

  root.GameLogic = gameLogic;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function isTouching(a, b, size) {
    return (
      a.x < b.x + size &&
      a.x + size > b.x &&
      a.y < b.y + size &&
      a.y + size > b.y
    );
  }

  function keepInside(value, max) {
    return Math.max(0, Math.min(value, max));
  }

  function answerRouteQuestion(choiceIndex, correctChoice, health) {
    const isCorrect = choiceIndex === correctChoice;

    return {
      isCorrect,
      health: isCorrect ? health : health - 1,
      message: isCorrect
        ? "Correct! The sea route is revealed."
        : "Wrong answer! The sea path is still hidden."
    };
  }

  function applyDamage(state) {
    if (state.shieldCharges > 0) {
      return {
        health: state.health,
        shieldCharges: state.shieldCharges - 1,
        cooldown: state.cooldown,
        blocked: true,
        gameOver: false
      };
    }

    const nextHealth = state.health - 1;

    return {
      health: nextHealth,
      shieldCharges: state.shieldCharges,
      cooldown: state.damageCooldown,
      blocked: false,
      gameOver: nextHealth <= 0
    };
  }

  function getPlayerSpeed(baseSpeed, hasStrongSail, activePowerUpId) {
    let speed = hasStrongSail ? baseSpeed + 45 : baseSpeed;

    if (activePowerUpId === "wind") {
      speed += 70;
    }

    return speed;
  }

  function buyUpgrade(wallet, purchasedUpgrades, upgrade) {
    if (!upgrade || purchasedUpgrades.includes(upgrade.id)) {
      return {
        wallet,
        purchasedUpgrades: [...purchasedUpgrades],
        purchased: false,
        reason: "already-purchased"
      };
    }

    if (wallet < upgrade.cost) {
      return {
        wallet,
        purchasedUpgrades: [...purchasedUpgrades],
        purchased: false,
        reason: "not-enough-coins"
      };
    }

    return {
      wallet: wallet - upgrade.cost,
      purchasedUpgrades: [...purchasedUpgrades, upgrade.id],
      purchased: true,
      reason: "purchased"
    };
  }

  function canSelectIsland(index, mapFragments) {
    return index <= mapFragments;
  }

  function getUnlockedIslandIndex(mapFragments, routeLength) {
    return Math.min(mapFragments, routeLength - 1);
  }

  function getNextIslandName(mapFragments, route) {
    const nextIndex = getUnlockedIslandIndex(mapFragments, route.length);
    return route[nextIndex] ? route[nextIndex].name : "";
  }

  function applyCookHeal(health, maxHealth, hasCook) {
    if (!hasCook || health >= maxHealth) {
      return health;
    }

    return Math.min(health + 1, maxHealth);
  }

  function attackBoss(player, boss, options) {
    if (options.cooldown > 0) {
      return {
        hit: false,
        bossHp: boss.hp,
        cooldown: options.cooldown,
        defeated: false,
        reason: "cooldown"
      };
    }

    const playerCenter = {
      x: player.x + options.spriteSize / 2,
      y: player.y + options.spriteSize / 2
    };
    const bossCenter = {
      x: boss.x + options.spriteSize / 2,
      y: boss.y + options.spriteSize / 2
    };
    const distance = Math.hypot(playerCenter.x - bossCenter.x, playerCenter.y - bossCenter.y);

    if (distance > options.range) {
      return {
        hit: false,
        bossHp: boss.hp,
        cooldown: options.missCooldown,
        defeated: false,
        reason: "out-of-range"
      };
    }

    const nextHp = Math.max(0, boss.hp - options.damage);

    return {
      hit: true,
      bossHp: nextHp,
      cooldown: options.hitCooldown,
      defeated: nextHp === 0,
      reason: "hit"
    };
  }

  return {
    isTouching,
    keepInside,
    answerRouteQuestion,
    applyDamage,
    getPlayerSpeed,
    buyUpgrade,
    canSelectIsland,
    getUnlockedIslandIndex,
    getNextIslandName,
    applyCookHeal,
    attackBoss
  };
});
