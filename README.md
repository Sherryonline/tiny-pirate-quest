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

## Main Features

- Top-down 2D browser game
- Larger 720px x 480px island map
- Keyboard movement with WASD and Arrow keys
- Shift dash with cooldown
- Three main islands with different rules and visuals
- Final Treasure Island unlock
- Coin collection and wallet system
- Enemy, lava, and boss collision damage
- Player HP shown under the player
- Boss HP shown under the boss during boss fights
- Space key boss attack with cooldown
- Directional boss attacks with wider hitboxes and soft lock-on
- Boss hit, damage, and defeat effects
- Treasure route clue questions
- World Map with locked, unlocked, current, and completed islands
- Sea Map Fragment progression
- Crew system with Navigator and Cook
- Ship upgrade menu
- Mystery Fruit power-ups
- Restart Adventure flow
- Unit tests for core game logic

## Islands

| Level | Island | Goal | Hazards |
|---|---|---|---|
| 1 | Coconut Island | Collect 10 coins | 1 crab, Giant Crab boss |
| 2 | Mist Island | Collect 12 coins | 2 enemies, Fog Ghost boss |
| 3 | Volcano Island | Collect 15 coins | 2 enemies, lava traps, Lava Beast boss |
| Final | Treasure Island | Open the Grand Treasure | Final reward sequence |

## How to Play

1. Open `index.html` in a browser.
2. Move the pirate around the island.
3. Collect all coins.
4. Fight and defeat the island boss using Space.
5. Answer the island clue question correctly.
6. Complete the island and collect a Sea Map Fragment.
7. Use the upgrade menu and World Map to continue.
8. Collect 3 Sea Map Fragments to reveal Final Treasure Island.
9. Open the Grand Treasure to finish the adventure.

## Controls

| Action | Key |
|---|---|
| Move Up | `W` or `Arrow Up` |
| Move Down | `S` or `Arrow Down` |
| Move Left | `A` or `Arrow Left` |
| Move Right | `D` or `Arrow Right` |
| Attack Boss | `Space` |
| Dash | `Shift` |

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

Bosses follow a simple rhythm:

```text
Chase for 3 seconds -> Rest for 1 second -> Repeat
```

Current boss speeds:

| Boss | Speed |
|---|---|
| Giant Crab | 95 |
| Fog Ghost | 105 |
| Lava Beast | 120 |
 
When hit, bosses are stunned for 0.8 seconds.

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
| Player opens the Grand Treasure | Adventure completed |
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
| Dash | Shift moves the player in the last movement direction and stays inside the map |
| Coin collection | Coins disappear after collection |
| Boss spawn | Boss appears after all coins are collected |
| Boss HP | Boss HP label follows the boss |
| Boss attack | Space damages boss when boss overlaps the directional attack area |
| Boss lock-on | Space aims toward nearby boss within lock-on range |
| Boss rest/stun | Boss does not damage player while resting or stunned |
| Boss defeat | Defeat animation plays and route clue appears |
| Enemy damage | Health decreases with damage cooldown |
| Lava damage | Health decreases and screen shakes |
| Route question | Correct answer unlocks island completion |
| Wrong route answer | Health decreases by 1 |
| World Map | Next island unlocks after island completion |
| Upgrades | Purchased upgrades apply immediately |
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
