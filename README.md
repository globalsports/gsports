Here’s the full updated version of your project README, including Bun installation:

```markdown
# Project Name

Gsports

## Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [File Structure](#file-structure)

## Tech Stack

This project uses the following technologies:

- **Next.js** - React Framework for server-side rendering.
- **Tailwind CSS** - Utility-first CSS framework.
- **Shadcn** - Tailwind based UI Library.
- **TypeScript** - Strongly typed JavaScript.

## Prerequisites

Before setting up the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v14.x or higher)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [bun](https://bun.sh/)
- [Git](https://git-scm.com/)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/globalsports/gsports.git
```

### 2. Navigate to the project directory

```bash
cd gsports
```

### 3. Install dependencies

Using Bun:

```bash
bun install
```

Or using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

## Running the Project

### 1. Start the development server

Using Bun:

```bash
bun dev
```

Or using npm:

```bash
npm run dev
```

Or using yarn:

```bash
yarn dev
```

Visit the application in the browser at `http://localhost:3000`.

### 2. Building for production

Using Bun:

```bash
bun build
```

Or using npm:

```bash
npm run build
```

Or using yarn:

```bash
yarn build
```

### 3. Running in production

Using Bun:

```bash
bun start
```

Or using npm:

```bash
npm run start
```

Or using yarn:

```bash
yarn start
```

## File Structure

```
├── components     # Reusable UI components/Shadcn components
├── app            # Next.js pages
│   ├── (site)     # Home Page
│   ├── booking    # Booking page
│   ├── layout.tsx # Layout of the pages
├── public         # Static files
│   ├── Images     # Images
├── utils          # Utility functions
├── .env.local     # Environment variables
└── README.md      # Project documentation
```

This version includes instructions for using Bun along with npm and yarn for installation, development, and production steps.