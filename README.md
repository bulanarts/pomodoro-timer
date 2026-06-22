# 🍅 Work Faster — Pomodoro Timer Desktop App

A Pomodoro Timer built as a desktop app using React + Electron. This is my first project learning JavaScript, React, and Electron from scratch — documented here so other beginners can follow the same journey.

---

## 🙋 Who is this for?

If you are completely new to coding, JavaScript, or React — this README is for you. I was in the same place when I started this project. I didn't know what Node.js was, I didn't know what a terminal was, and I definitely didn't know what `npm` meant.

By the end of this project I built a real desktop app that I can install on my Mac. You can too.

---

## 💡 What I Learned

Before touching any code, here are the tools and concepts I had to understand first:

**Node.js** — The engine that lets JavaScript run on your computer, not just in a browser. Install this first before anything else. Download from [nodejs.org](https://nodejs.org) and get the LTS version.

**npm** — Comes with Node.js automatically. Think of it like an app store for code — you use it to download libraries other developers made.

**React** — A library made by Meta for building UI. Buttons, timers, pages — all built as components.

**Electron** — Turns your React web app into a real desktop app. Apps like VS Code and Figma are actually built with Electron.

**TypeScript** — JavaScript with extra rules. When you see `: number` or `: string` in the code, that's TypeScript labeling what type of data something is. It looks almost identical to normal JavaScript.

---

## 🧠 How React Works (Simple Mental Model)

```
function App() {

  // everything up here = logic, memory, behavior (JS stuff)
  // useState = memory/storage
  // useEffect = automatic reactions to changes
  // functions = actions when things happen

  return (
    // everything here = what appears on screen (HTML stuff)
    // use {curly braces} to put JS inside the HTML
  );
}
```

The files you mostly touch as a beginner:
- `src/App.tsx` — your main code (structure + logic combined)
- `src/App.css` — your styling

---

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js installed:

```bash
node --version
npm --version
```

Both should return version numbers. If not, install Node.js from [nodejs.org](https://nodejs.org).

### Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/work-faster.git
```

2. Navigate into the project folder:
```bash
cd work-faster
```

3. Install dependencies:
```bash
npm install
```

This downloads everything listed in `package.json` into a `node_modules` folder. This is why you don't see `node_modules` in the repo — anyone can recreate it with this one command.

---

## 🖥️ Running the App

### In the browser (for development)
```bash
npm run start
```
Opens at `http://localhost:3000`. Changes update automatically when you save files — this is called hot reload. Use this while coding.

### As a desktop app (Electron)
```bash
npm run build
npm run electron
```
First builds the React app, then launches it inside an Electron window as a desktop app.

---

## 📦 Building the Installer

To create a `.dmg` installer for Mac:

```bash
npx electron-builder
```

The installer will appear in the `dist/` folder.

> **Note for Mac users:** Since the app is not signed with an Apple Developer certificate, macOS will warn you when opening it. To bypass: right click the app → Open → Open anyway.

---

## ✨ Features

- **Pomodoro Cycle Mode** — Start button triggers a full cycle: 4 work sessions with short breaks and one long break at the end. Progress bar shows where you are in the cycle.
- **Free Mode** — Click Work or Break buttons to use the timer independently without cycle tracking.
- **Encouragement Messages** — Rotating motivational messages appear while the timer is running.
- **Alarm Sound** — Plays when each session ends.
- **Continue Button** — Timer doesn't auto-advance. You confirm when you're ready for the next session.
- **Warning Popup** — If you try to switch modes during a cycle, a popup warns you that progress will be lost.
- **Draggable Window** — Click and drag anywhere on the app to move it.

---

## 🗂️ Project Structure

```
work-faster/
├── public/
│   ├── electron.js       # Electron main process
│   ├── preload.js        # Bridge between Electron and React
│   └── index.html        # App entry point
├── src/
│   ├── Assets/           # Images, fonts, sounds
│   ├── App.tsx           # Main React component
│   ├── App.css           # Styling
│   └── declarations.d.ts # Tells TypeScript to accept .mp3 and .css imports
├── package.json          # Project config and dependencies
└── tsconfig.json         # TypeScript config
```

---

## 📜 Available Scripts

| Command | What it does |
|---|---|
| `npm run start` | Runs app in browser at localhost:3000 |
| `npm run build` | Builds optimized production files |
| `npm run electron` | Launches app in Electron desktop window |
| `npx electron-builder` | Creates `.dmg` installer in `dist/` folder |

---

## 🪲 Common Errors I Encountered

**`zsh: command not found`** — You forgot `npx` before the command, or Node.js isn't installed yet.

**`Missing script: "build"`** — You're running the command from the wrong folder. Use `cd your-project-folder` first.

**Audio blocked error** — Browsers block audio until the user interacts with the page. Solved by silently playing the sound at volume 0 on the first button click to unlock audio.

**`Cannot find module './Assets/meow.mp3'`** — TypeScript doesn't know how to handle mp3 files. Fixed by adding `declare module '*.mp3'` to `declarations.d.ts`.

**Transform jumping on hover** — When a button uses `transform: translate(-50%, -50%)` for centering, the hover `transform: scale()` replaces it and the button jumps. Fix: always include both transforms together: `transform: translate(-50%, -50%) scale(1.03)`.

---

## 🛠️ Tech Stack

- [React](https://reactjs.org/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — typed JavaScript
- [Electron](https://www.electronjs.org/) — desktop app framework
- [Create React App](https://create-react-app.dev/) — project setup
- [electron-builder](https://www.electron.build/) — packaging and distribution
- [Font Awesome](https://fontawesome.com/) — icons

---

## 👩‍💻 Author

Made by **Bulan** as a first project learning JavaScript + React + Electron.

> "The biggest trap for beginners is tutorial hopping — watching too many videos without actually building anything. At some point just pick a small project and struggle through it. That's where real learning happens."
