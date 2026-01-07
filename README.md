# Kalkia - Weather Probability Checker

### 📌 Summary: 
We developed a weather probabilty app which can help individuals determine the weather for months in advance to plan an event safetly without risking an environmental interference. This app analyzes 44 years of data drom 1981 to 2025 and than predicts the future weather of any particular place at any particular date, telling if the weather is very hot, very cold, windy, rainy, or it is uncomfortable. It also shows graphical representation and percentage likelihood of each weather condition. Moreover, it also recommends that is the date suitable for an outdoor event ot not. We have also integrated an AI chatbot to help manage people's queries and suggest them arrangements. It is important as it can help individuals, and organizations for planning events safetly and mitigate weather risks.

## 🎥 Project Demo

- **🖥️ PPT Presentation:** [https://kalkia-f5c91v9.gamma.site/](https://kalkia-f5c91v9.gamma.site/)
- **🎬 Video Demo:**


https://github.com/user-attachments/assets/af2c91a2-2432-48eb-b759-874ec16cd205

---

## 🌦️ Project Details

Our project predicts **weather probabilities for future decades** to help individuals and organizations plan outdoor events **without worrying about unexpected weather conditions**.

It works by analyzing **44 years of NASA’s historical data (1981–2025)** and calculating how often different weather conditions occurred.  
Based on this analysis, the app predicts the **likelihood (in percentage)** of each condition — whether it will be:

- ☀️ Very Hot  
- ❄️ Very Cold  
- 🌧️ Rainy  
- 🌬️ Very Windy  
- 😣 Uncomfortable  

---

### 🎯 Purpose

Our goal is to **harness the power of big data and AI** to extend forecasting horizons to **10–20 years**, offering actionable insights for better planning.

---

### 🌍 Benefits

- 🥳 **Event Planning:** Helps individuals plan outdoor events like parties and celebrations.  
- 🏢 **Organizations:** Assists in scheduling important meetings, conferences, and community events.  
- 🌾 **Farmers:** Predicts rainfall likelihood to prevent over-irrigation, improve yield, and reduce flooding.  
- 🏛️ **Governments:** Supports long-term risk mitigation for floods, droughts, and storms.  

---

### 🤖 Chatbot Integration

We integrated an **AI-powered chatbot** that acts as a virtual event manager — helping users plan around weather risks and answering event-related queries.

---

### 📊 Key Factors Considered

- **Accuracy:** Powered by 44 years of climatological data and fine-tuned ML logic.  
- **User Experience:** Fast, intuitive, and visually engaging design.  
- **Accessibility:** Works across all devices for users with varying technical skills.  
- **Scalability:** Cloud-native architecture for real-time data updates.  
- **Variables Analyzed:**  
  Temperature extremes, humidity levels, wind speed, rainfall, UV index, and comfortability.  
- **Visualization:** Integrated interactive graphs for easy understanding of trends and probabilities.

---

## 🚀 Tech Stack

- **Frontend**: Next.js `14.2`, TypeScript, Tailwind CSS, ShadCN, LottieFiles (animations)
- **Data & Resoures**: [NASA Daily Power API (MERRA-2)](https://power.larc.nasa.gov/docs/services/api/temporal/daily/), Google GEMINI API
- **Data Analysis**: Recharts, chars (from shadcn)
- **Version Control**: Git + GitHub  

---

## 🌐 App Flow

```
┌──────────────────────────────┐
│ 🏠 User enters the app       │
│    and clicks "Get Started"  │
└───────────────┬──────────────┘
                │
                v
┌──────────────────────────────┐
│ 📍 User enters any location  │
│     in the world             │
└───────────────┬──────────────┘
                │
                v
┌──────────────────────────────┐
│ 📅 User selects a date       │
│     (up to 1 year ahead)     │
└───────────────┬──────────────┘
                │
                v
┌──────────────────────────────────────────────────────────────────────────────┐
│ 📊 Redirected to Result Page                                                 │
│                                                                              │
│ • View historical weather trends (1981–2025)                                 │
│ • Interact with AI-Powered Weather Assistant                                 │
│ • Download data as CSV or JSON                                               │
│ • View threshold conditions:                                                 │
│                                                                              │
│    ☀️ Very Hot: temperature ≥ 35°C                                           │
│    ❄️ Very Cold: temperature ≤ 5°C                                           │
│    🌧️ Very Wet: rainfall ≥ 20 mm                                             │
│    🌬️ Very Windy: wind speed ≥ 8 m/s                                         │
│    😣 Very Uncomfortable: temperature ≥ 32°C AND humidity ≥ 70%              │
│                                                                              │
│    (≥ means “greater than or equal to”, ≤ means “less than or equal to”)     │
└──────────────────────────────────────────────────────────────────────────────┘

```

## ⚡ Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/<your-username>/nasa-weather-app.git
cd nasa-weather-app

# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Data Analysis
cd analysis
pip install -r requirements.txt
python data_analysis.py

```


## Contribution Guidelines

Thank you for contributing! Please follow these simple steps:

---

### 1. Fork the Repository
Click the **Fork** button on the top right of this repo to copy it to your GitHub account.

---

### 2. Clone Your Fork
Clone your forked repository to your local machine:

```
git clone https://github.com/marjan-ahmed/nasa-weather-probability-app.git
cd nasa-weather-probability-app
```

---

### 3. Create a Branch

Always create a new branch before making changes.

For a new feature:

```bash
git checkout -b feat/feature-name
```

#### For fixing an issue:

```bash
git checkout -b fix/short-issue-description
```

Example: fix/button-alignment or feat/login-ui

### 4. Make Your Changes

Edit, add, or improve the code as needed.

5. Commit Your Work

Stage and commit your changes with a meaningful message:

```bash
git add .
git commit -m "feat: added login UI"   # example commit message
```

6. Push Your Branch

Push your branch to GitHub:

```bash
git push origin your-branch-name
```

### 8. What Happens Next

If your code looks good, I will:

```git bash
git checkout main
git pull origin main          # update local main
git merge your-branch-name    # merge your feature/fix branch
git push origin main          # push updated main
```

## And If you want to see my or any other collaborator code in you editor

- you should know the branch name (you can ask from the member to tell)
- if you want to see the owner's (mine) code changes, the branch would be  `main`

  ```bash
  git checkout main → switches to the main branch but you can't see your code because I have switeched to another branch.
  ```
  
  but if you want that switched branch code should be added in your code, write the script below

  ```
  git pull origin main → pulls the latest changes from the owner’s main branch into their local main.
  ```

🎉 Your contribution will now be part of the project!
