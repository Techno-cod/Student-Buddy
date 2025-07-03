# 🎓 Student Buddy – LeetCode Assistant Extension

Student Buddy is a smart Chrome extension that helps students solve coding problems on LeetCode step by step without giving away full answers. It gives logical hints and guidance to help users learn effectively.

## 🧠 Key Features

- 🧾 **Code Scanner**: Reads user code directly from the LeetCode editor
- 💬 **Chat-style interface**: Conversational UI with typing animations and message history
- 🔍 **Hint Generator**: Provides partial logic hints (currently mock hints; LLM integration planned)
- 🧩 **Frontend (Chrome Extension)**: Located in `/student-buddy-frontend`
- 🖥️ **Backend (FastAPI)**: Located in `/student-buddy-backend`

## 🚀 How It Works

1. User clicks "Get Hint"
2. The extension reads the current code
3. It sends the code to the backend
4. A step-by-step logic hint is returned

## 📦 Tech Stack

- Chrome Extension (HTML/CSS/JavaScript)
- FastAPI (Python backend)
- OpenAI (LLM-based hints – coming soon)

## 🔧 Setup Instructions

Clone the repo:

```bash
git clone https://github.com/Techno-cod/Student-Buddy.git

## 🛠 How to Run the Project
```bash
cd student-buddy-backend
uvicorn main:app --reload

**Load the Chrome extension:
1.Go to chrome://extensions/
2.Enable Developer Mode
3.Click Load Unpacked
4.Select the student-buddy-frontend folder


