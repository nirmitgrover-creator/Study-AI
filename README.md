# ⚡ StudyAI — Intelligent Learning Platform
### 100% Free — No credit card required

---

## 🚀 Complete Deployment Guide (Fully Free)

---

### STEP 1 — Get your FREE Groq API Key (2 minutes)

Groq is completely free — no credit card, no trial, no credits system.

1. Go to **https://console.groq.com**
2. Click **"Sign Up"** — use Google or email
3. Once logged in, click **"API Keys"** in the left sidebar
4. Click **"Create API Key"**
5. Give it a name like `studyai`
6. **Copy the key** — it looks like `gsk_xxxxxxxxxxxxxxxxxxxxxxxx`

---

### STEP 2 — Push this code to GitHub

1. Create a free account at **https://github.com**
2. Click **"New repository"** → name it `studyai` → click **Create**
3. Open terminal **inside this folder** and run these one by one:

```bash
git init
git add .
git commit -m "StudyAI launch"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/studyai.git
git push -u origin main
```

> **Note:** When it asks for password, use a GitHub Personal Access Token:
> GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic) → Generate new token → check **repo** box → copy it → use as password

---

### STEP 3 — Deploy on Vercel (free forever)

1. Go to **https://vercel.com** → Sign up with GitHub (free)
2. Click **"Add New Project"**
3. Click **"Import"** next to your `studyai` repo
4. **Framework Preset** → select **Vite**
5. Leave all build settings as default
6. Click **"Environment Variables"** to expand it → click **Add**:
   - **Name:** `VITE_GROQ_KEY`
   - **Value:** paste your Groq key from Step 1 (`gsk_...`)
7. Click **"Deploy"**
8. Wait ~60 seconds
9. 🎉 **Your site is live and fully working — completely free!**

---

## ✅ Why this works perfectly

| Service | Cost | Purpose |
|---------|------|---------|
| Groq    | Free forever | AI responses (Llama 3.3 70B model) |
| Vercel  | Free forever | Hosting the website |
| GitHub  | Free forever | Storing the code |

**Total cost: $0** — no hidden fees, no credit card ever needed.

---

## 💻 Run Locally

1. Create a `.env` file:
```
VITE_GROQ_KEY=gsk_your_key_here
```

2. Run:
```bash
npm install
npm run dev
```

3. Open **http://localhost:5173**

---

## 📬 Contact

- 📞 **8595996575**  
- ✉️ **nirmit.work29@gmail.com**
