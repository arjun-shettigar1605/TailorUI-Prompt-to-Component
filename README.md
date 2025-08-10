# TailorUI ✨

An AI-powered UI generator that translates natural language into production-ready React components, styled with Tailwind CSS and rendered with a live preview.

## Demo

A picture is worth a thousand words. Here's TailorUI in action:

<img width="1892" height="861" alt="image" src="https://github.com/user-attachments/assets/79c0e524-099b-48f7-a81d-1f9062a5951e" />
<img width="1892" height="869" alt="image" src="https://github.com/user-attachments/assets/28959a40-4a2e-4815-8823-1444a5b3fdfc" />

---

## 🎯 Core Features

* 🗣️ **Natural Language Input**: Describe any UI component in plain English, from a simple button to a complex card.
* 🤖 **AI-Powered Code Generation**: Leverages the power of Google's Gemini API to understand your prompt and generate a structured JSON representation of the UI.
* ⚛️ **React & Tailwind CSS**: Automatically generates clean, functional React components with utility-first Tailwind CSS classes for styling.
* 📺 **Live Interactive Preview**: Instantly see your generated component come to life in a sandboxed preview panel, powered by `react-live`.
* 📋 **Copy-to-Clipboard**: A convenient button to copy the generated code directly to your clipboard.
* 💡 **Prompt Templates**: A curated list of pre-built prompts for common components like Login Forms, Pricing Cards, and more to get you started quickly.

---

## 💻 Tech Stack

* **Frontend**:
    * [React](https://reactjs.org/) (with [Vite](https://vitejs.dev/))
    * [Tailwind CSS](https://tailwindcss.com/)
    * [react-live](https://github.com/FormidableLabs/react-live) for the interactive preview.
    * [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) for code display.
* **Backend**:
    * [Node.js](https://nodejs.org/)
    * [Express.js](https://expressjs.com/)
* **AI**:
    * [Google Gemini API](https://ai.google.dev/)

---

## 🏗️ System Architecture

TailorUI operates on a client-server architecture designed for a seamless workflow:

1.  **Client (React Frontend)**: The user types a description or selects a template and clicks "Generate." An API request containing the prompt is sent to the backend.
2.  **Server (Node.js Backend)**:
    * Receives the prompt.
    * Injects the user's text into a carefully engineered "master prompt."
    * Sends the complete prompt to the Gemini API.
    * The AI returns a structured JSON object representing the UI component.
    * The backend then processes this JSON, generating two separate code strings:
        * `displayCode`: A full, readable React component file for the user.
        * `previewCode`: A raw JSX snippet optimized for `react-live`.
    * The server sends both code strings back to the client.
3.  **Client (React Frontend)**:
    * Receives the two code strings.
    * The `displayCode` is shown in the syntax-highlighted "Code" panel.
    * The `previewCode` is rendered in the "Preview" panel, providing an instant visual of the component.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18.x or later)
* `npm` or `yarn`
* A Google Gemini API Key. You can get one from [Google AI Studio](https://makersuite.google.com/).

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/arjun-shettigar1605/TailorUI-Prompt-to-Component.git](https://github.com/arjun-shettigar1605/TailorUI-Prompt-to-Component.git)
    cd TailorUI-Prompt-to-Component
    ```
2.  **Set up the Backend:**
    ```sh
    cd Tailorui-backend
    npm install
    ```
3.  **Set up the Frontend:**
    ```sh
    cd ../Tailorui-frontend
    npm install
    ```

### Environment Variables

The backend requires your Gemini API key to function.

1.  In the `Tailorui-backend` directory, create a new file named `.env`.
2.  Add your API key to this file:
    ```env
    # .env in Tailorui-backend

    GEMINI_API_KEY="YOUR_API_KEY_HERE"
    ```

### Running the Application

You'll need to run both the backend and frontend servers in separate terminal windows.

1.  **Start the Backend Server:**
    * Navigate to the `Tailorui-backend` directory.
    ```sh
    npm run dev
    ```
    Your server should now be running on `http://localhost:8000`.

2.  **Start the Frontend Server:**
    * Navigate to the `Tailorui-frontend` directory.
    ```sh
    npm run dev
    ```
    Your React application will open in your browser, usually at `http://localhost:5173`.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.