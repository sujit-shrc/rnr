# rnr: Instant Project Launcher

Say goodbye to managing multiple package managers and remembering unique run scripts for every framework or project type. With `rnr`, you're just one command away from running your project, whether it's JavaScript, TypeScript, Next.js, Vite, React Native, Express.js, Nuxt.js, Vue.js, and more. Support for additional applications like Python is also coming soon!

## Key Features

- Automatic detection of project type and package manager (Bun, pnpm, Yarn, npm)
- Supports a variety of project types (JavaScript/TypeScript or Python frameworks)
- Easy switching between development, production, and build modes
- Customizable configuration via `.rnr.rc` file

## Installation

Install `rnr` globally using one of the following commands:

- npm: `npm install -g rnr`
- yarn: `yarn global add rnr`

## Usage

Once installed, navigate to your project root directory and run:

```bash
 rnr  #default mode (dev)
 rnr dev or rnr -m dev
 rnr prod or rnr -m prod
 rnr build or rnr -m build
```

## Learn More

For detailed documentation on advanced usage, supported project types, package manager priority, configuration options, and more, visit the [`rnr` GitHub repository](https://github.com/sujit-shrc/rnr).
