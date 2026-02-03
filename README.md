# 🔴 Arsenal FC Website

เว็บไซต์แฟนคลับ **Arsenal FC** ที่พัฒนาด้วย **Next.js**  
แสดงข้อมูลสโมสรแบบไดนามิก เช่น ตารางคะแนน, โปรแกรมแข่งขัน, Squad นักเตะ  
ดึงข้อมูลจริงจาก **API-Football** และออกแบบ UI ให้ทันสมัย รองรับการใช้งานบนทุกอุปกรณ์

> โปรเจคนี้จัดทำขึ้นเพื่อแสดงทักษะด้าน Frontend / Web Application Development  
> และใช้เป็น Portfolio บน GitHub

---

## 🚀 Features

- 🏆 ตารางคะแนนพรีเมียร์ลีก (League Standings)
- 📅 โปรแกรมการแข่งขัน (Fixtures)
- 👥 Squad นักเตะ พร้อมตำแหน่งและข้อมูลสำคัญ
- 🏟 ข้อมูลสนามแข่งขัน
- 📱 Responsive Design (Desktop / Tablet / Mobile)
- ⚡ โหลดเร็วด้วย Next.js App Router
- 🎨 UI ธีม Arsenal (แดง-ขาว)

---

## 🛠 Tech Stack

**Frontend**
- Next.js (App Router)
- TypeScript
- Tailwind CSS

**API**
- API-Football

**Tools**
- Postman (ทดสอบ API)
- Git & GitHub
- Vercel / Render (Deploy)

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── api/
│   │   ├── arsenal-news/
│   │   │   └── route.ts
│   │   └── football/
│   │       ├── fixtures/
│   │       │   └── route.ts
│   │       ├── squad/
│   │       │   └── route.ts
│   │       └── standing/
│   │           └── route.ts
│   ├── fixtures/
│   │   └── page.tsx
│   ├── squad/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── standing/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── loading.tsx
│   └── page.tsx
│
├── components/
│   ├── Counter.tsx
│   ├── EraTabs.tsx
│   ├── Footer.tsx
│   ├── HomeStyles.tsx
│   ├── Navbar.tsx
│   ├── ParticleCanvas.tsx
│   ├── Timeline.tsx
│   └── TimelineCard.tsx
│
├── data/
│   └── timeline.ts
│
├── hooks/
│   └── useTimelineFilter.ts
│
├── lib/
│   ├── apiFootball.ts
│   ├── footballData.ts
│   └── utils.ts
│
└── styles/
    ├── globals.css
    ├── loading.css
    └── squad.css
```

## ⚙️ Installation & Setup
Clone โปรเจค
```
git clone https://github.com/your-username/arsenal-fc-website.git
cd arsenal-fc-website
```
ติดตั้ง dependencies
```
npm install
```
สร้างไฟล์ .env.local ในส่วนของโปรเจคมีไฟล์ .env.local.example
```
# --- News API
NEWSAPI_KEY=ใส่คีย์จาก NewsAPI.org

# --- API-Football (ใช้สำหรับ Squad + รูปนักเตะ)
APIFOOTBALL_KEY=ใส่คีย์จาก https://www.api-football.com/
APIFOOTBALL_TEAM_ID=42
APIFOOTBALL_LEAGUE_ID=39
APIFOOTBALL_SEASON=2025

# --- football-data.org (ใช้สำหรับ standings + fixtures/results)
FOOTBALLDATA_KEY=ใส่ token จาก https://www.football-data.org/
FOOTBALLDATA_TEAM_ID=57
FOOTBALLDATA_COMPETITION=PL
FOOTBALLDATA_SEASON=2025
```
รันโปรเจค
```
npm run dev
```
