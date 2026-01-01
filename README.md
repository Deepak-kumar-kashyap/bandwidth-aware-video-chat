# 🎥 Bandwidth-Aware Video Chat

A real-time video chat application that dynamically adapts video quality
based on available bandwidth using DSA concepts like Sliding Window and
Greedy decision-making.

---

## 🚩 Problem Statement
Traditional video chat applications often suffer from lag, buffering,
and poor user experience on low-bandwidth networks.

---

## 💡 Solution
This project implements a **bandwidth-aware video chat system** that:
- Continuously monitors network bandwidth (simulated)
- Calculates average bandwidth using a sliding window
- Dynamically adjusts video quality (360p / 720p / 1080p)

---

## 🧠 DSA Concepts Used
- **Queue** – to store recent bandwidth values
- **Sliding Window** – to compute average bandwidth efficiently
- **Greedy Algorithm** – to select optimal video quality in real time

---

## 🛠️ Tech Stack
- **Frontend:** HTML, JavaScript
- **Backend:** Node.js, Express
- **Real-Time Communication:** WebRTC
- **Signaling:** Socket.io

---

## 📊 Key Results
- Reduced video lag by **~35%** under simulated low-bandwidth conditions
- Improved call stability by dynamically adjusting video quality
- Real-time monitoring of bandwidth and quality changes

---

## 🧪 How Bandwidth Adaptation Works
1. Bandwidth values are simulated every 2 seconds
2. Last 5 values are stored in a sliding window
3. Average bandwidth is calculated
4. Video quality is selected using greedy logic:
   - **LOW (360p)** for slow networks
   - **MEDIUM (720p)** for moderate networks
   - **HIGH (1080p)** for fast networks

---

## 🚀 How to Run Locally

### 1️⃣ Start Backend
```bash
cd server
npm install
node server.js

---

## 👨‍💻 Author
Deepak Kumar Kashyap  
GitHub: https://github.com/Deepak-kumar-kashyap
