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

  function collectHeartShard(shardCount, health, maxHealth, requiredShards, maximumHealth) {
    const target = Number.isFinite(requiredShards) ? requiredShards : 3;
    const healthLimit = Number.isFinite(maximumHealth) ? maximumHealth : Infinity;

    if (maxHealth >= healthLimit) {
      return {
        shardCount: 0,
        health,
        maxHealth,
        upgraded: false,
        capped: true
      };
    }

    const nextShardCount = shardCount + 1;

    if (nextShardCount < target) {
      return {
        shardCount: nextShardCount,
        health,
        maxHealth,
        upgraded: false,
        capped: false
      };
    }

    const nextMaxHealth = Math.min(maxHealth + 1, healthLimit);
    return {
      shardCount: 0,
      health: Math.min(nextMaxHealth, health + 1),
      maxHealth: nextMaxHealth,
      upgraded: true,
      capped: false
    };
  }

  function refreshBuffTimer(timers, buffName, duration) {
    return {
      ...timers,
      [buffName]: Math.max(0, Number(duration) || 0)
    };
  }

  function updateBuffTimers(timers, deltaTime) {
    const elapsed = Math.max(0, Number(deltaTime) || 0);
    return Object.fromEntries(
      Object.entries(timers).map(([name, timer]) => [name, Math.max(0, timer - elapsed)])
    );
  }

  function claimEnemyReward(alreadyRewarded) {
    return {
      rewarded: true,
      shouldDrop: !alreadyRewarded
    };
  }

  function addCompletedIsland(completedIslands, islandName) {
    return completedIslands.includes(islandName)
      ? [...completedIslands]
      : [...completedIslands, islandName];
  }

  function registerComboHit(comboState, comboWindow, powerDuration) {
    const nextCount = comboState.count + 1;
    return {
      count: nextCount,
      timer: comboWindow,
      damageTimer: nextCount === 2 ? powerDuration : comboState.damageTimer,
      bonusCoinReady: comboState.bonusCoinReady || nextCount === 3
    };
  }

  function updateComboState(comboState, deltaTime) {
    const elapsed = Math.max(0, Number(deltaTime) || 0);
    const timer = Math.max(0, comboState.timer - elapsed);
    const damageTimer = Math.max(0, comboState.damageTimer - elapsed);

    if (timer === 0) {
      return {
        count: 0,
        timer: 0,
        damageTimer,
        bonusCoinReady: false
      };
    }

    return {
      ...comboState,
      timer,
      damageTimer
    };
  }

  function resetComboState() {
    return {
      count: 0,
      timer: 0,
      damageTimer: 0,
      bonusCoinReady: false
    };
  }

  function consumeComboBonus(comboState) {
    return {
      comboState: {
        ...comboState,
        bonusCoinReady: false
      },
      shouldDrop: comboState.bonusCoinReady
    };
  }

  function getEnemyWeaknessBonus(weakness, attackContext) {
    if (weakness === "swordFlame") {
      return attackContext.attackType === "sword" && attackContext.swordFlameActive ? 1 : 0;
    }

    if (weakness === "focus") {
      return attackContext.focusActive ? 1 : 0;
    }

    if (weakness === "pirateGun") {
      return attackContext.attackType === "gun" ? 1 : 0;
    }

    if (weakness === "swordCombo") {
      return attackContext.attackType === "sword" && attackContext.comboCount >= 2 ? 1 : 0;
    }

    return 0;
  }

  function getPlayerSpeed(baseSpeed, hasStrongSail, activePowerUpId) {
    let speed = hasStrongSail ? baseSpeed + 45 : baseSpeed;

    if (activePowerUpId === "wind") {
      speed += 60;
    }

    return speed;
  }

  function getBuffedCooldown(baseCooldown, focusActive) {
    return focusActive ? baseCooldown * 0.7 : baseCooldown;
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

  function normalizeRareCollection(collection) {
    const source = collection && typeof collection === "object" ? collection : {};
    const goldenCompassPieces = Math.min(3, Math.max(0, Math.floor(Number(source.goldenCompassPieces) || 0)));
    const ancientCoins = Math.min(3, Math.max(0, Math.floor(Number(source.ancientCoins) || 0)));
    const pirateBadge = Boolean(source.pirateBadge);
    const unlockedSkins = ["classic"];

    if (ancientCoins >= 3) {
      unlockedSkins.push("goldenPirate");
    }

    return {
      goldenCompassPieces,
      ancientCoins,
      pirateBadge,
      unlockedSkins,
      selectedSkin: unlockedSkins.includes(source.selectedSkin) ? source.selectedSkin : "classic",
      secretEndingUnlocked: goldenCompassPieces >= 3
    };
  }

  function collectRareTreasure(collection, rewardType) {
    const next = normalizeRareCollection(collection);

    if (rewardType === "goldenCompassPiece") {
      next.goldenCompassPieces = Math.min(3, next.goldenCompassPieces + 1);
    } else if (rewardType === "ancientCoin") {
      next.ancientCoins = Math.min(3, next.ancientCoins + 1);
    } else if (rewardType === "pirateBadge") {
      next.pirateBadge = true;
    }

    return normalizeRareCollection(next);
  }

  return {
    isTouching,
    keepInside,
    answerRouteQuestion,
    applyDamage,
    applyHeartReward,
    addShieldCharge,
    collectHeartShard,
    refreshBuffTimer,
    updateBuffTimers,
    claimEnemyReward,
    addCompletedIsland,
    registerComboHit,
    updateComboState,
    resetComboState,
    consumeComboBonus,
    getEnemyWeaknessBonus,
    getPlayerSpeed,
    getBuffedCooldown,
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
    pickWeightedReward,
    normalizeRareCollection,
    collectRareTreasure
  };
});
