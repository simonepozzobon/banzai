# To-Do List Application

Simple desktop application built with Electron and Vue.js v3, to manage a to-do list.

## Requirements

- Create a simple desktop application using Electron and Vue.js v3.
- It should use the modern version of Node.js and other libraries.
- The application should be a to-do list where the user can add new tasks and put a checkmark for already done tasks.
- If the user closes the application and launches it again, it should display the previously saved to-do list.
- Create your own CSS styling.
- As a result, we expect to receive a small application that we can easily configure and run on the localhost in dev mode.

## Prerequisites

- [Node.js](https://nodejs.org/en) (check `.nvmrc` for version)
- [npm](https://www.npmjs.com/)

## Getting Started

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/simonepozzobon/banzai.git
   cd banzai
   ```

2. Set up Node.js version

   ```bash
   nvm use
   ```

   > If you don't have nvm installed, follow the instructions at [NVM GitHub Repository](https://github.com/nvm-sh/nvm?tab=readme-ov-file#install--update-script)

3. Install dependencies
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

## Libraries

### Core

- [Electron](https://www.electronjs.org/) - Framework for creating native applications with web technologies
- [Vue.js v3](https://v3.vuejs.org/) - Progressive JavaScript framework for building user interfaces

### Build Tools & Development

- [TurboRepo](https://turbo.build/) - High-performance build system for JavaScript/TypeScript monorepos
- [ESlint](https://eslint.org/) - Static code analysis tool for identifying problematic patterns
- [Prettier](https://prettier.io/) - Code formatter to ensure consistent code style
- [nodemon](https://nodemon.io/) - Utility that monitors changes and automatically restarts the server

### Environment & Configuration

- [cross-env](https://www.npmjs.com/package/cross-env) - Run scripts with environment variables across platforms
- [dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from .env files

### Data Management & Utilities

- [TanStack Query (Vue Query)](https://tanstack.com/query/v5/docs/framework/vue/overview) - Powerful asynchronous state management for data fetching
- [dayjs](https://day.js.org/) - Lightweight alternative to Moment.js for date manipulation
- [uuid](https://www.npmjs.com/package/uuid) - Generation of RFC-compliant UUIDs
- [zod](https://zod.dev/) - TypeScript-first schema validation with static type inference
