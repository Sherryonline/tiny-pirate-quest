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
        cooldown: state.damageCooldown,
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

  function applyHeartReward(health, maxHealth) {
    const healedHealth = Math.min(maxHealth, health + 1);

    return {
      health: healedHealth,
      healed: healedHealth > health
    };
  }

  function addShieldCharge(shieldCharges, maximum) {
    const limit = Number.isFinite(maximum) ? maximum : 3;
    return Math.min(limit, Math.max(0, shieldCharges) + 1);
  }

  function collectHeartShard(shardCount, health, maxHealth, requiredShards) {
    const target = Number.isFinite(requiredShards) ? requiredShards : 3;
    const nextShardCount = shardCount + 1;

    if (nextShardCount < target) {
      return {
        shardCount: nextShardCount,
        health,
        maxHealth,
        upgraded: false
      };
    }

    const nextMaxHealth = maxHealth + 1;
    return {
      shardCount: 0,
      health: Math.min(nextMaxHealth, health + 1),
      maxHealth: nextMaxHealth,
      upgraded: true
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

  function getAttackArea(player, direction, options) {
    const size = options.spriteSize;
    const range = options.range;
    const thickness = options.thickness || size;
    const centerOffset = (size - thickness) / 2;

    if (direction === "left") {
      return {
        x: player.x - range,
        y: player.y + centerOffset,
        width: range,
        height: thickness
      };
    }

    if (direction === "up") {
      return {
        x: player.x + centerOffset,
        y: player.y - range,
        width: thickness,
        height: range
      };
    }

    if (direction === "down") {
      return {
        x: player.x + centerOffset,
        y: player.y + size,
        width: thickness,
        height: range
      };
    }

    return {
      x: player.x + size,
      y: player.y + centerOffset,
      width: range,
      height: thickness
    };
  }

  function rectanglesOverlap(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
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

    const attackArea = options.attackArea || getAttackArea(player, options.direction || "right", options);
    const bossArea = {
      x: boss.x,
      y: boss.y,
      width: options.spriteSize,
      height: options.spriteSize
    };

    if (!rectanglesOverlap(attackArea, bossArea)) {
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

  function sanitizePirateName(value, maxLength) {
    const limit = Number.isFinite(maxLength) ? maxLength : 20;
    const trimmedName = String(value || "").trim().slice(0, limit);
    return trimmedName || "Tiny Pirate";
  }

  function sortLeaderboardRecords(records) {
    return [...records].sort((first, second) => {
      const firstCoins = Number(first.coins) || 0;
      const secondCoins = Number(second.coins) || 0;

      if (secondCoins !== firstCoins) {
        return secondCoins - firstCoins;
      }

      return new Date(second.completedAt).getTime() - new Date(first.completedAt).getTime();
    });
  }

  function getTopLeaderboard(records, limit) {
    const recordLimit = Number.isFinite(limit) ? limit : 5;
    return sortLeaderboardRecords(records).slice(0, recordLimit);
  }

  function pickWeightedReward(dropTable, roll) {
    const safeRoll = Math.max(0, Math.min(Number(roll) || 0, 0.999999));
    let totalWeight = 0;

    for (const entry of dropTable || []) {
      totalWeight += Number(entry.weight) || 0;

      if (safeRoll < totalWeight) {
        return entry.type || null;
      }
    }

    return null;
  }

  return {
    isTouching,
    keepInside,
    answerRouteQuestion,
    applyDamage,
    applyHeartReward,
    addShieldCharge,
    collectHeartShard,
    getPlayerSpeed,
    buyUpgrade,
    canSelectIsland,
    getUnlockedIslandIndex,
    getNextIslandName,
    applyCookHeal,
    getAttackArea,
    attackBoss,
    sanitizePirateName,
    sortLeaderboardRecords,
    getTopLeaderboard,
    pickWeightedReward
  };
});
