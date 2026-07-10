# Tiny Pirate Quest

Tiny Pirate Quest is a simple one-player 2D browser adventure game built with HTML, CSS, and JavaScript.

The player controls a young pirate, collects coins across island levels, defeats island bosses, unlocks sea routes, gathers map fragments, upgrades the ship, recruits crew members, and finally reaches Treasure Island.

## Play Online

After GitHub Pages deployment is enabled successfully, the game will be available here:

```text
https://sherryonline.github.io/tiny-pirate-quest/
```

## Game Objective

```text
Collect coins -> Defeat boss -> Solve route clue -> Complete island -> Collect map fragments -> Reach Treasure Island
```

## Story

You are a tiny pirate searching for the lost treasure of the Tiny Sea. Explore islands, defeat sea monsters, collect gold coins, find map fragments, and unlock the route to the final treasure.

## Main Features

- Top-down 2D browser game
- Larger 720px x 480px island map
- Keyboard movement with WASD and Arrow keys
- Shift dash with cooldown
- Story intro overlay before gameplay starts
- Beginner control guide on first load
- Quest Panel with island, objective, coin progress, fragments, and next hint
- Quest Panel support for side quest, side progress, wallet, and next action
- Battle Panel during boss fights with boss name, HP bar, phase, faded/enraged/lava/ghost-rage states, and attack hints
- Heart health GUI in the HUD
- Three main islands with different rules and visuals
- Final Treasure Island unlock
- Coin collection and wallet system
- Enemy, lava, and boss collision damage
- Player HP shown under the player
- Boss HP shown under the boss during boss fights
- Space key boss attack with cooldown
- Directional boss attacks with wider hitboxes and soft lock-on
- Pirate Gun ranged attack with `J` after purchase
- Boss hit, damage, and defeat effects
- Harder boss phase patterns with fair warning windows
- Treasure route clue questions
- World Map with locked, unlocked, current, and completed islands
- World Map ship route and sailing transition before island loads
- Sea Map Fragment progression
- Crew system with Navigator and Cook
- Ship upgrade menu
- Weapon shop items: Sharp Sword, Pirate Gun, and Heart Potion
- Optional NPC side quests on each main island
- Shop wallet display and clear item cards
- Toast messages for key feedback
- Mystery Fruit power-ups
- Restart Adventure flow
- Unit tests for core game logic

## Islands

| Level | Island | Goal | Hazards |
|---|---|---|---|
| 1 | Coconut Island | Collect 10 coins | 1 crab, Giant Crab boss |
| 2 | Mist Island | Collect 12 coins | 2 enemies, Fog Ghost boss |
| 3 | Volcano Island | Collect 15 coins | 2 enemies, lava traps, Lava Beast boss |
| Final | Treasure Island | Defeat Ghost Pirate, then open Grand Treasure | Ghost Pirate boss |

## How to Play

1. Open `index.html` in a browser.
2. Read the story intro and click **Start Adventure**.
3. Move the pirate around the island.
4. Collect all coins.
5. Fight and defeat the island boss using Space.
6. Answer the island clue question correctly.
7. Complete the island and collect a Sea Map Fragment.
8. Use the upgrade menu and World Map to continue.
9. Collect 3 Sea Map Fragments to reveal Final Treasure Island.
10. Defeat the Ghost Pirate.
11. Open the Grand Treasure to finish the adventure.

## Controls

| Action | Key |
|---|---|
| Move Up | `W` or `Arrow Up` |
| Move Down | `S` or `Arrow Down` |
| Move Left | `A` or `Arrow Left` |
| Move Right | `D` or `Arrow Right` |
| Attack Boss | `Space` |
| Shoot Pirate Gun | `J` |
| Dash | `Shift` |
| Interact with NPC | `E` |

## GUI Panels

### Quest Panel

The Quest Panel shows the current island, main objective, coin progress, collected map fragments, side quest objective, side quest progress, wallet, next action, and hint.

Example objectives:

- Collect all coins
- Boss appeared! Defeat the boss
- Solve the route clue
- Buy upgrades or continue
- Sail to next island
- Open the Grand Treasure
- Defeat the Ghost Pirate

### Battle Panel

The Battle Panel appears only during a boss fight. It shows the boss name, boss HP bar, current HP, max HP, phase, and a short fight hint.

Boss phases shown in the panel:

- Chasing
- Resting
- Stunned
- Enraged
- Faded
- Charging Lava
- Lava Burst
- Ghost Rage

### Heart Health

The HUD shows player health as heart icons. One heart equals one current HP, and the display supports higher max health from Reinforced Hull.

The existing HP label still follows the player inside the game area.

### Toast Messages

Short toast messages appear for important actions, including coin collection, boss hits, boss phase changes, lava warnings, boss defeat, route answers, damage, not enough coins, and upgrade purchases.

### Shop Wallet

The upgrade menu shows the current wallet as `Wallet: X coins`. Each upgrade card shows the name, price, effect, and either a buy button or owned state.

## Boss Fight Rules

| Rule | Result |
|---|---|
| Player collects all coins | Island boss appears |
| Player presses Space near boss | Attack aims toward the boss if it is within lock-on range |
| Boss overlaps the attack area | Boss loses 1 HP and is stunned briefly |
| Player presses Space too far away | Status shows a move-closer message |
| Boss is chasing and touches player | Player loses 1 HP after damage cooldown |
| Boss is resting or stunned | Boss does not damage the player |
| Boss HP reaches 0 | Boss defeat effect plays, then route clue appears |

Boss attacks use a directional hitbox:

| Direction | Attack Area |
|---|---|
| Left / Right | 100px wide x 70px high |
| Up / Down | 70px wide x 100px high |

Bosses follow a chase/rest rhythm, with boss-specific timing and phase behavior:

```text
Chase -> Rest -> Special attack windows -> Repeat
```

When hit, bosses are stunned briefly. Later bosses recover faster, so their attack windows are shorter. Bosses do not damage the player while stunned, resting, faded, or reforming.

| Boss | Difficulty | HP | Stun | Rest | Pattern |
|---|---|---:|---:|---:|---|
| Giant Crab | Easy | 5 | 0.8s | 1.1s | Enraged at 2 HP or less, moves faster, rests less, and uses warned horizontal charge |
| Fog Ghost | Medium | 7 | 0.6s | 0.9s | Fades for 1 second, ignores attacks, then reforms near the player with a warning |
| Lava Beast | Hard | 9 | 0.5s | 0.7s | Marks lava warning zones before active burst damage; low HP can add extra burst pressure |
| Ghost Pirate | Final | 12 | 0.4s | 0.6s | Ghost Rage at 6 HP or less adds warned dash slashes and dodgeable ghost bullets |

Strong attacks use visible warning zones before they can damage the player. Dash remains useful for escaping Giant Crab charge lines, Lava Beast burst zones, and Ghost Pirate dash warnings.

### Final Ghost Pirate

Final Treasure Island now starts with the Grand Treasure locked. The Ghost Pirate appears first with 12 HP.

- Phase 1 uses the chase/rest boss rhythm.
- Phase 2 starts at 6 HP or less and shows `Ghost Rage` in the Battle Panel.
- Ghost Rage adds a dash attack warning before the boss lunges and ghost bullets that travel toward the player's last known position.
- After defeat, the game shows: `The Ghost Pirate vanished. The Grand Treasure is unlocked!`
- The Grand Treasure can only be opened after the Ghost Pirate is defeated.

## Progression Systems

### Sea Map Fragments

- Completing each main island gives 1 Sea Map Fragment.
- 3 fragments unlock Final Treasure Island.
- Final message appears after opening the Grand Treasure.

### Crew

| Crew Member | Unlock Rule | Effect |
|---|---|---|
| Navigator | Complete Coconut Island | Shows a hint for the next island |
| Cook | Complete Mist Island | Restores 1 health after completing an island |

### Ship Upgrades

| Upgrade | Effect |
|---|---|
| Strong Sail | Increases player speed |
| Reinforced Hull | Increases max health by 1 |
| Treasure Radar | Shows a hint when only a few coins remain |
| Sharp Sword | Increases melee attack size and melee damage |
| Pirate Gun | Unlocks `J` ranged attack with cooldown |
| Heart Potion | Restores 1 HP immediately, up to max HP, and can be bought multiple times |

Pirate Gun bullets travel in the last movement direction, or toward the boss when the existing soft lock-on can aim at a nearby boss. Bullets can hit bosses, show a visible shot effect, and use a cooldown so the gun cannot be spammed.

Heart Potion cannot exceed max health. If HP is full, the shop shows the toast `HP is already full.`

### NPC Side Quests

Side quests are optional and do not block main progression. Talk to NPCs with `E` when close.

| Island | NPC Quest | Reward |
|---|---|---|
| Coconut Island | Collect 3 shells | 3 coins |
| Mist Island | Collect 2 ghost lights | Heal 1 HP |
| Volcano Island | Collect 2 fire stones | Bonus coins and Lava Beast hint |

Rewards are granted once only. Progress appears in the Quest Panel.

### Ship Travel

The World Map shows a ship route. Selecting the current unlocked island displays `Sailing to [Island Name]...` with a short transition before the island loads.

### Mystery Fruits

| Fruit | Effect |
|---|---|
| Wind Fruit | Temporarily increases player speed |
| Magnet Fruit | Pulls nearby coins toward the player |
| Shield Fruit | Blocks one enemy or trap hit |

## Win and Lose Rules

| Rule | Result |
|---|---|
| Player completes all 3 islands | Final Treasure Island unlocks |
| Player defeats Ghost Pirate | Grand Treasure unlocks |
| Player opens the unlocked Grand Treasure | Adventure completed |
| Player health reaches 0 | Game Over |
| Player chooses a wrong route answer | Health decreases by 1 |

## Project Structure

```text
tiny-pirate-quest/
|-- .github/
|   `-- workflows/
|-- tests/
|   `-- gameLogic.test.js
|-- index.html
|-- style.css
|-- script.js
|-- gameLogic.js
|-- package.json
|-- package-lock.json
`-- README.md
```

## Tech Stack

- HTML for game screen structure
- CSS for island visuals, UI layout, and animations
- JavaScript for gameplay, movement, collisions, progression, and UI updates
- Node.js for lightweight unit tests

## How to Run Locally

### Option 1: Open directly

Open this file in your browser:

```text
index.html
```

### Option 2: Use VS Code Live Server

1. Open the project folder in VS Code.
2. Right-click `index.html`.
3. Select **Open with Live Server**.

## Testing

Run the unit tests:

```bash
npm test
```

Run the syntax check:

```bash
npm run check
```

## Manual Testing Checklist

| Area | Expected Result |
|---|---|
| Page load | Game screen displays correctly |
| Movement | Player moves using WASD or Arrow keys |
| Boundary | Player cannot move outside the game area |
| Larger map | Game area displays as 720px x 480px |
| Player HP | HP label follows the player |
| Heart HP | HUD hearts update after damage and healing |
| Dash | Shift moves the player in the last movement direction and stays inside the map |
| Coin collection | Coins disappear after collection |
| Boss spawn | Boss appears after all coins are collected |
| Boss HP | Boss HP label follows the boss |
| Battle Panel | Appears only while boss is active and updates boss HP bar |
| Boss attack | Space damages boss when boss overlaps the directional attack area |
| Boss lock-on | Space aims toward nearby boss within lock-on range |
| Boss rest/stun | Boss does not damage player while resting or stunned |
| Giant Crab enraged | At 2 HP or less, Battle Panel shows Enraged, chase is faster, and rest is shorter |
| Giant Crab charge | Horizontal warning line appears before the charge and can be dodged with Shift |
| Fog Ghost fade | Faded ghost ignores attacks, reappears near the player, and shows reforming warning before attackable |
| Lava Beast burst | Yellow/orange warning zone appears before red active lava burst damage |
| Ghost Pirate | Appears on Final Treasure Island before treasure opens |
| Ghost Pirate rage | At 6 HP or less, Battle Panel shows Ghost Rage with dash slash and ghost bullets |
| Grand Treasure lock | Cannot open until Ghost Pirate is defeated |
| Sharp Sword | Melee hit is larger and deals more damage |
| Pirate Gun | `J` fires cooldown bullets that can damage bosses |
| Heart Potion | Heals 1 HP, never exceeds max HP, and warns when HP is full |
| Ship transition | World Map selection shows Sailing to island message before loading |
| NPC side quests | Collect side items, talk with `E`, and receive reward once |
| Boss defeat | Defeat animation plays and route clue appears |
| Enemy damage | Health decreases with damage cooldown |
| Lava damage | Health decreases and screen shakes |
| Route question | Correct answer unlocks island completion |
| Wrong route answer | Health decreases by 1 |
| World Map | Next island unlocks after island completion |
| Quest Panel | Objective and hint update across coins, boss, clue, shop, map, and final island |
| Upgrades | Purchased upgrades apply immediately |
| Shop Wallet | Upgrade menu shows wallet, prices, effects, and owned state |
| Toasts | Key events show short temporary messages |
| Crew | Navigator and Cook unlock after the correct islands |
| Final island | Unlocks after 3 Sea Map Fragments |
| Final treasure | Grand Treasure appears on the larger final map and shows final reward message |

## Development Workflow

This project follows a small-step vibe coding workflow:

```text
Base game -> Movement -> Coins -> Enemies -> Levels -> Routes -> Map -> Upgrades -> Bosses -> Effects -> Tests
```

## Status

Playable prototype with progression, boss fights, upgrades, crew, power-ups, final island, and unit tests.

## Contributors

| Contributor | Role |
|---|---|
| Sherryonline | Project owner and creator |
| Codex | AI coding assistant for vibe coding support |
| Game Planner Agent | AI agent used for feature planning and implementation steps |
| Game Feature Implementer Agent | AI agent used for game feature implementation support |
| Game QA Tester Agent | AI agent used for test scenario, bug checklist, and regression review |

> Note: GitHub's automatic Contributors panel is based on real GitHub commit authors. AI agents are listed here as project support contributors because they helped with planning, coding support, and testing guidance.
