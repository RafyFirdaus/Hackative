# SMT Chatbot UI (Frontend)

Welcome to the frontend repository of the **PT Solusi Mitra Teknologi (SMT) Chatbot** application. This project provides a clean, responsive, and modern chat interface built with React, connecting directly to our FastAPI/Rasa/Gemini backend.

## 🌟 Key Features

- **Modern UI/UX**: Clean and professional chat interface matching corporate standards.
- **Real-time Interaction**: Seamless chatting experience with simulated typing indicators for natural flow.
- **Smart Auto-scroll**: The chat window automatically scrolls down when new messages arrive or keyboard opens.
- **Responsive Layout**: Designed to work beautifully across desktop and mobile screens.
- **Markdown & Styling**: Supports line breaks and natural text formatting sent by the AI backend.

## 🛠️ Technology Stack

- **React 18**
- **Vite** (for blazing fast build and development)
- **TypeScript**
- **Tailwind CSS** (via Lucide React icons, standard CSS for layout)
- **Lucide React** (for modern SVG icons)

## 🚀 Getting Started

Follow these steps to run the frontend on your local machine.

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)

### 2. Installation

Clone the repository and install dependencies:

```bash
# Clone the repository (if you haven't already)
# git clone <your-frontend-repo-url>
cd frontend-chat

# Install dependencies needed
npm install
```

### 3. Running the Development Server

To start the Vite development server:

```bash
npm run dev
```

The application will typically be accessible at `http://localhost:5173`. 

*Note: Ensure that the Backend API (FastAPI & Rasa) is properly running on `http://localhost:8000` so the chatbot can respond to your queries.*

## 📁 Project Structure

```text
frontend-chat/
├── src/
│   ├── components/
│   │   ├── ChatBubble.tsx    # Individual message component (user & bot)
│   │   ├── ChatInput.tsx     # Input field and send button
│   │   └── ChatWindow.tsx    # Main chat container and layout logic
│   ├── App.tsx               # Root component integrating ChatWindow
│   ├── main.tsx              # React DOM mounting
│   └── index.css             # Global CSS and layout utilities
├── public/                   # Static assets
├── package.json              # Project dependencies and scripts
└── vite.config.ts            # Vite configuration
```

## 🔗 Connecting to Backend
The frontend is pre-configured to communicate with the local backend running at `http://localhost:8000/chat`. If you need to deploy this to production or change the API URL, search for `localhost:8000` in the `ChatWindow.tsx` file to update the endpoint.

## 📬 Contact / Contribution
Developed for PT Solusi Mitra Teknologi. For internal use or technical inquiries, please refer to the project maintainers.
