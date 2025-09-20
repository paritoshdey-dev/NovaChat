# 💬 MERN Real-Time Chat App with AI Assistant  

🚀 **Live Demo : https://your-mvp-url.com](https://novachat-gd22.onrender.com/login**  
⚠️ *Note: Since the project is hosted on Render’s free tier, the server may take a short while to start if it has been idle.*  

1. Register a new account or login.  
2. Start chatting with other users in real time.  
3. Try out the built-in AI Assistant powered by Groq + LLaMA.  

A modern real-time chat application built using the **MERN stack** (MongoDB, Express, React, Node.js) with **Socket.IO** for instant messaging and **Groq API** integration for an AI assistant powered by **LLaMA models**.  

This project allows:  
- 👤 **User-to-user chat** (1:1 direct messaging)  
- 🤖 **AI chatbot conversations** (with Groq’s LLaMA models)  
- 🔔 **Real-time updates** (via WebSockets)  
- 🖼️ **Profile picture & status** support  
- 🌙 **Modern UI** (React + TailwindCSS + DaisyUI)  

---

## ✨ Features  

- 🔐 **Authentication** (JWT-based, login & register)  
- 💬 **Real-time messaging** (Socket.IO)  
- 🤖 **AI-powered bot** using Groq’s LLaMA models (`meta-llama/llama-4-scout-17b-16e-instruct`)  
- 📷 **User avatars** with default fallback  
- 🟢 **Online/offline status** indicator  
- 📨 **Message history persistence** in MongoDB  
- ⚡ **Optimistic UI updates** (messages appear instantly)  
- 🎨 **Responsive, modern design** (Tailwind + DaisyUI)  

---

## 🛠️ Tech Stack  

**Frontend:**  
- React (Vite)  
- Zustand (state management)  
- TailwindCSS + DaisyUI (UI components)  
- Axios  

**Backend:**  
- Node.js + Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- Socket.IO (real-time messaging)  
- Groq API (AI assistant)  

---

## ⚙️ Installation  

### 1. Clone the repo  
```bash
git clone https://github.com/your-username/mern-chat-ai.git
cd mern-chat-ai
```
### 2. Backend setup  
```bash 
cd backend
npm install
```

### Create a .env file in backend/ with:
```bash 
GROQ_API_KEY=
MONGODB_URI=
PORT=5001
JWT_SECRET = 
CLODINARY_CLOUD_NAME=
CLODINARY_API_KEY=
CLODINARY_API_SECRET=
NODE_ENV=development
```

### Start backend server:
```bash 
npm run dev
```

###3. Frontend Setup
```bash 
cd frontend
npm install
```

###Start frontend:
```bash 
npm run dev
```

### 🚀 Usage

- Register a new account or login.
- Start chatting with other users in real-time.
- Select the AI Assistant (Bot) from the sidebar to chat with the bot.
- Messages are updated instantly with Socket.IO.

### 🤖 AI Assistant

- Powered by Groq API
- Current default model: meta-llama/llama-4-scout-17b-16e-instruct
- Configurable via DEFAULT_MODEL in backend/lib/groq_ai.js

📂 Project Structure
```bash 
mern-chat-ai/
│── backend/         # Express + MongoDB + Groq integration
│   ├── models/      # Mongoose schemas
│   ├── routes/      # API routes
│   ├── lib/         # Groq API helper
│   └── socket.js    # Socket.IO handlers
│
│── frontend/        # React + Vite + Zustand
│   ├── src/
│   │   ├── store/   # Zustand stores
│   │   ├── components/ # UI components
│   │   └── pages/   # App pages
│
└── README.md
```

📸 Screenshots
### Log in Screen
<img width="1830" height="907" alt="image" src="https://github.com/user-attachments/assets/a522e42a-7ba7-4bbb-8a19-72bcce9a071e" />

### Profile Page
<img width="1902" height="915" alt="image" src="https://github.com/user-attachments/assets/1785d3c4-eefe-4049-8be8-9935c6de2792" />

### 30+ UI themes thanks to DaisyUI
<img width="1906" height="914" alt="image" src="https://github.com/user-attachments/assets/c28f784b-1f91-4d6d-8c25-83d92de2ee27" />

### AI integrated chat-bot for in app assistance using LLama-4 model
<img width="1765" height="899" alt="image" src="https://github.com/user-attachments/assets/ed5538f3-7fc4-4cfd-9051-4d1f99397692" />




🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss.

📜 License

MIT License © 2025 Paritosh Dey
