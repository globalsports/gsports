
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
- **Shadcn** - Tailwind based UI Library
- **TypeScript** - Strongly typed JavaScript.

## Prerequisites

Before setting up the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v14.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
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

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```


## Running the Project

### 1. Start the development server

Using npm:

```bash
npm run dev
```

Or using yarn:

```bash
yarn dev
```

Visit the application in the browser at `http://localhost:3000`.

### 2. Building for production

To build the project for production:

```bash
npm run build
```

Or:

```bash
yarn build
```

### 3. Running in production

To run the production build:

```bash
npm run start
```

Or:

```bash
yarn start
```

## File Structure

```
├── components     # Reusable UI components/Shadcn components
├── app            # Next.js pages
│   ├── (site)     # Home Page
│   ├── booking    # Booking page
|   ├── layout.tsx # Layout of the pages
├── public         # Static files
|   ├──Images      # Images
├── utils          # Utility functions
├── .env.local     # Environment variables
└── README.md      # Project documentation
```
