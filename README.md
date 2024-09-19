# rnr (runner): Instant Scripts Launcher

Say goodbye to managing multiple package managers and remembering unique run scripts for each project type. With `rnr`, you’re just one command away from launching your project, whether it's JavaScript, TypeScript, Next.js, Vite, React Native, Express.js, Nuxt.js, Vue.js, or more. Future support for additional applications, like Python, is coming soon!

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Key Features](#2-key-features)
3. [Installation](#3-installation)
4. [Basic Usage](#4-basic-usage)
5. [Advanced Usage](#5-advanced-usage)
6. [Supported Project Types](#6-supported-project-types)
7. [Package Manager Priority](#7-package-manager-priority)
8. [Configuration File (.rnr.rc)](#8-configuration-file-rnrrc)
9. [Troubleshooting](#9-troubleshooting)
10. [Development](#10-development)
11. [Contributing](#11-contributing)
12. [License](#12-license)
13. [Support](#13-support)

---

## 1. Introduction

> 💡 **Tip:** `rnr` is designed to reduce complexity in running your project by automatically detecting project type, package manager, and scripts. Use `rnr` to streamline your development experience.

`rnr` is a command-line tool designed to simplify running JavaScript and TypeScript projects. It automatically detects your project type, package manager, and run scripts, allowing you to start your project with a single command.

---

## 2. Key Features

- Automatic detection of project type and configuration
- Support for multiple project types (Next.js, Express.js, React, Vue, etc.)
- Smart package manager selection (Bun, pnpm, Yarn, npm)
- Easy switching between development, production, and build modes
- Self-configuring with customizable settings

> 📌 **Key Feature:** Save time and reduce errors with `rnr`’s automatic project detection and package manager prioritization.

---

## 3. Installation

Install `rnr` globally using one of the following commands:

- npm: `npm install -g rnr`
- yarn: `yarn global add rnr`

> 🛠 **Important:** Ensure that `rnr` is installed globally to be accessible from any project directory.

---

## 4. Basic Usage

Navigate to your project directory and run:

```bash
rnr
```

This command runs your project in development mode by default.

> 🚀 **Quick Start:** Just type `rnr` in your project folder, and you’re good to go!

---

## 5. Advanced Usage

### 5.1. Specifying Run Modes

- Development mode: `rnr dev` or `rnr -m dev`
- Production mode: `rnr prod` or `rnr -m prod`
- Build mode: `rnr build` or `rnr -m build`

### 5.2. First-time Setup

- When run for the first time, `rnr` will detect your project settings
- You'll be prompted to confirm or modify these settings
- Settings are saved in a `.rnr.rc` file in your project root

> ⚙️ **Tip:** First-time setup is a one-time process, and it’s easy to update later if your project changes.

### 5.3. Updating Configuration

- Delete the `.rnr.rc` file
- Run `rnr` again to recreate the configuration

---

## 6. Supported Project Types

- Next.js
- Express.js
- Vite + React
- Nuxt.js
- Turborepo
- Monorepo (Lerna)
- React
- Vue
- Unknown (generic JavaScript/TypeScript projects)

> ✅ **Pro Tip:** Even if `rnr` doesn’t officially support your project type, it can still detect and run generic JavaScript or TypeScript projects.

---

## 7. Package Manager Priority

`rnr` detects and uses package managers in the following order:

1. Bun
2. pnpm
3. Yarn
4. npm

> 🎯 **Note:** `rnr` prioritizes faster, modern package managers like **Bun** and **pnpm**. Ensure they are installed if you prefer them.

---

## 8. Configuration File (.rnr.rc)

The `.rnr.rc` file contains:

- Project type
- Package manager
- Run scripts for development and production

> 🔧 **Customizable:** You can easily modify `.rnr.rc` to tweak how your project runs, including changing run scripts or package managers.

---

## 9. Troubleshooting

If you encounter issues:

1. Ensure you're in the correct project directory
2. Delete `.rnr.rc` and run `rnr` again
3. Verify correct scripts in `package.json`
4. Check if the necessary package manager is installed

> 🛑 **Common Fix:** Resetting your configuration by deleting `.rnr.rc` often resolves issues.

For persistent issues, open an issue on the GitHub repository.

---

## 10. Development

To set up for development:

1. Clone the repository:

   ```bash
   git clone https://github.com/sujit-shrc/rnr.git
   cd rnr
   ```

2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Link the package globally: `npm link`

Running tests: `npm test`  
Linting: `npm run lint`

> 🧑‍💻 **Developer Note:** Use `npm link` to test local changes globally before publishing.

---

## 11. Contributing

Contributions are welcome! Please refer to the CONTRIBUTING.md file in the repository for guidelines.

> 💻 **Contribute:** Help improve `rnr` by submitting bug reports or pull requests.

---

## 12. License

`rnr` is released under the MIT License. See the LICENSE file for details.

---

## 13. Support

For questions, suggestions, or issues, please use the GitHub issue tracker.

> 💬 **Need Help?** Feel free to open a GitHub issue if you run into any problems or need assistance.

---

With `rnr`, simplify your development workflow and focus on what matters most - Happy Coding!
