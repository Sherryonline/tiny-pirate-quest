# Tiny Pirate Quest 🏴‍☠️

**Tiny Pirate Quest** is a simple one-player browser adventure game. The player controls a young pirate, collects coins, avoids a crab enemy, and opens the treasure chest to win.

The game is inspired by cheerful pirate adventure and island exploration themes. It is built as a lightweight **vibe coding** practice project using simple HTML, CSS, and JavaScript.

## Game Objective

```text
Collect coins → Avoid enemy → Open treasure chest → Win
```

## Features

- One-player 2D browser game
- Top-down island-style game area
- Pirate player movement
- Coin collection and score tracking
- Crab enemy obstacle
- Health system
- Treasure chest win condition
- Game status message
- Simple project structure for learning and testing

## How to Play

1. Open `index.html` in a browser.
2. Move the pirate using the keyboard.
3. Collect all coins on the island.
4. Avoid the crab enemy.
5. Open the treasure chest after collecting enough coins.
6. Win the game when the chest is opened.

## Controls

| Action | Key |
|---|---|
| Move Up | `W` or `Arrow Up` |
| Move Down | `S` or `Arrow Down` |
| Move Left | `A` or `Arrow Left` |
| Move Right | `D` or `Arrow Right` |

## Win and Lose Rules

| Rule | Result |
|---|---|
| Player collects all required coins and touches the chest | You Win |
| Player touches the chest before collecting enough coins | Warning message is shown |
| Player health reaches 0 | Game Over |

## Project Structure

```text
tiny-pirate-quest/
├── .github/
│   └── workflows/
├── .vs/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Tech Stack

- **HTML** — game screen structure
- **CSS** — island style and visual design
- **JavaScript** — game logic, movement, collision, score, health, and win/lose rules

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

## Development Workflow

This project follows a small-step vibe coding workflow:

```text
Base screen → Movement → Coins → Enemy → Health → Chest → Restart → Polish → Test
```

## Testing Checklist

| Area | Expected Result |
|---|---|
| Page load | Game screen displays correctly |
| Movement | Player moves using WASD or arrow keys |
| Boundary | Player cannot move outside the game area |
| Coin collection | Coin disappears after collection |
| Score | Score increases correctly |
| Duplicate collection | Same coin cannot be collected twice |
| Enemy | Crab enemy moves correctly |
| Health | Health decreases when player touches enemy |
| Damage cooldown | Health does not decrease too quickly |
| Chest locked | Chest cannot be opened before collecting enough coins |
| Win condition | Player wins after collecting enough coins and opening chest |
| Game over | Game ends when health reaches 0 |

## Roadmap

- [ ] Add restart button
- [ ] Add sound effects
- [ ] Add more enemy types
- [ ] Add multiple islands
- [ ] Add timer or high score
- [ ] Add power-ups such as dash, shield, or coin magnet

## Contributors

| Contributor | Role |
|---|---|
| Sherryonline | Project owner and creator |
| Codex | AI coding assistant for vibe coding support |

> Note: GitHub's automatic **Contributors** panel is based on commit authors. Codex is listed here as a project contributor because it was used as an AI coding assistant.

## Status

MVP in progress.
