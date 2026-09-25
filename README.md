# Audit AI

Audit AI is a professional code analysis and testing application with an integrated AI chat interface to help users review, improve, and manage their code more efficiently.

## Features

- AI-powered code analysis
- Code improvement suggestions
- Code formatting and cleanup support
- AI chat assistant for feedback and guidance
- React frontend with Node.js backend

## Tech Stack

- React + Vite
- JavaScript
- Express
- Node.js
- Groq API

## Prerequisites

Before running the project, make sure you have:

- Node.js installed
- npm installed
- A Groq API key (which can be created from https://console.groq.com/keys)

## Project Structure

```bash
Audit-AI/
├── backend/
│   ├── server.js
│   └── .env
├── src/
├── public/
├── package.json
├── vite.config.js
├── .gitignore
├── index.html
├── README.md
└── package-lock.json
```

## Installation

Install project dependencies:

```bash
npm install
```

## Environment Setup

Create a file named `.env` inside the `backend` folder and add your Groq API key:

```env
GROQ_API_KEY=your_api_key_here
```

This file is local to your machine and should not be committed to GitHub.

## Run the Project

### 1. Start the backend

```bash
cd backend
node server.js
```

### 2. Start the frontend

Open a new terminal and run:

```bash
npm run dev
```

The frontend will run with Vite and the backend will run on the local server.

## Important Notes

- Keep your `.env` file private.
- Add the following line to your `.gitignore` file:

```gitignore
/backend/.env
```

- Do not push your API key to GitHub.

## License

This project is for educational and personal use.

## Contact

For questions or improvements, contact the project maintainer.
