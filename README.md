# Mehrab Morshed Marjan - Portfolio Website

A modern, production-ready personal portfolio website built with React + Vite (frontend) and Node.js + Express (backend), with Supabase for database and image storage.

## 🚀 Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS + Framer Motion
- **Backend:** Node.js + Express
- **Database:** Supabase (PostgreSQL) with in-memory fallback for development
- **Storage:** Supabase Storage (for project images)
- **Auth:** JWT-based session for admin panel

## 📁 Project Structure

```
portfolio/
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components (Home, Admin)
│   │   ├── context/        # Auth context
│   │   └── main.jsx        # Entry point
│   ├── assets/             # Static assets (images)
│   └── index.html
├── backend/                # Express API server
│   ├── database/           # Database abstraction (Supabase/in-memory)
│   ├── routes/             # API routes
│   ├── middleware/         # Auth middleware
│   └── server.js           # Entry point
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+
- npm or pnpm

### 1. Clone & Install

```bash
# Install backend dependencies
cd portfolio/backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables

**Backend (`portfolio/backend/.env`):**
```env
PORT=5000
JWT_SECRET=your_jwt_secret_here
ADMIN_EMAIL=admin@mehrab.dev
ADMIN_PASSWORD=admin123

# Supabase Configuration (optional - uses in-memory DB if not set)
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_STORAGE_BUCKET=project-images
```

**Frontend (`portfolio/frontend/.env`):**
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Supabase Setup (Optional)

If you want persistent data storage:

1. Create a project at [supabase.com](https://supabase.com)
2. Run the following SQL in the Supabase SQL Editor:

```sql
-- Bio table
CREATE TABLE bio (
  id SERIAL PRIMARY KEY,
  name TEXT,
  title TEXT,
  subtitle TEXT,
  description TEXT,
  about_text TEXT,
  about_text_2 TEXT,
  email TEXT,
  location TEXT,
  avatar_url TEXT,
  visible BOOLEAN DEFAULT true
);

-- Skills table
CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT DEFAULT 'technical',
  icon TEXT,
  color TEXT DEFAULT '#7c3aed',
  sort_order INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT true
);

-- Projects table
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'web',
  image_url TEXT,
  live_url TEXT,
  source_url TEXT,
  technologies TEXT,
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Experience table
CREATE TABLE experience (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  organization TEXT,
  description TEXT,
  start_date TEXT,
  end_date TEXT,
  color TEXT DEFAULT '#7c3aed',
  sort_order INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT true
);

-- Social links table
CREATE TABLE social_links (
  id SERIAL PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT,
  icon TEXT,
  visible BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

-- Sections table
CREATE TABLE sections (
  id SERIAL PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  label TEXT,
  visible BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

-- Messages table
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

3. Create a storage bucket named `project-images` (set to public)
4. Copy your Supabase URL and keys to the backend `.env` file

### 4. Run the Application

```bash
# Terminal 1 - Start backend
cd portfolio/backend
node server.js

# Terminal 2 - Start frontend
cd portfolio/frontend
npm run dev
```

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api
- **Admin Panel:** http://localhost:5173/admin

### 5. Admin Login

Default credentials:
- **Email:** admin@mehrab.dev
- **Password:** admin123

## 🎨 Features

### Public Portfolio
- Responsive design (mobile-first)
- Dark/light mode toggle
- Smooth scroll animations (Framer Motion)
- Animated mesh background
- Typing effect in hero section
- Scroll progress indicator
- Project filtering by category
- Contact form with backend submission
- Social media links

### Admin Panel (`/admin`)
- JWT-authenticated login
- Dashboard to manage all content:
  - Edit bio/about information
  - Add/remove skills
  - Add/remove projects (with image upload)
  - Add/remove experience entries
  - Toggle section visibility
- Inbox to read contact form messages
- All changes persist to Supabase (or in-memory for dev)

## 📱 Responsive Design

The portfolio is fully responsive across:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## 🔒 Security

- JWT tokens expire after 24 hours
- Admin routes protected by authentication middleware
- Environment variables for all secrets
- File upload validation (images only, 5MB max)