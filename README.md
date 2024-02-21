# Codibly Test - Statkiewicz Mateusz

This project, codibly-test, is a React-based Single Page Application (SPA) designed to showcase a paginated list of products fetched from an API. It employs React for the frontend, Redux Toolkit for state management, Material-UI for styling, and Vitest for testing. The project is set up with Vite as the build tool and TypeScript for type safety.

## Features

- Displays a paginated list of products with filtering options.
- Utilizes Material-UI for a responsive and modern UI.
- State management with Redux Toolkit.
- API calls made with Axios.
- Unit testing with Vitest.
- Linting with ESLint and formatting with Prettier for code consistency.

## Prerequisites

Before you begin, ensure you have installed:

- Node.js (version 20.11.0 or higher)
- npm (comes with Node.js)

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:

   ```bash
   git clone https://your-repository-url.git codibly-test

   ```

2. Navigate to the project directory:

   ```bash
   cd codibly-test

   ```

3. Install the dependencies::
   ```bash
   npm install
   ```

## Available Scripts

In this project, you can run the following scripts:

- npm start: Runs the app in development mode using Vite.
- npm run build: Compiles the TypeScript code and builds the app for production using Vite.
- npm run preview: Serves the built app for preview.
- npm run test, npm run test:watch, npm run test:coverage, npm run test:ui: Run unit tests with Vitest in different modes.
- npm run lint, npm run lint:fix: Lint the codebase and fix linting errors automatically.
- npm run format: Format the codebase using Prettier.

## Usage

To start the development server, run:

```bash
   npm start
```

Visit http://localhost:5173 to view the application in your browser.

## Testing

To execute tests, use:

```bash
   npm run test
```

For continuous testing mode:

```bash
   npm run test:watch
```

To check test coverage:

```bash
   npm run test:coverage
```

To use the Vitest UI for running tests:

```bash
   npm run test:ui
```
