# ⚡ Kirti Electronic

Kirti Electronic is a modern, high-performance web application built for electronics retail and wholesale. It features a stunning 3D-enhanced user interface, a dedicated Retailer Portal, and a comprehensive Admin Dashboard for inventory and order management.

## 🚀 Features

- **Immersive 3D UI:** Custom Three.js background and animations using Framer Motion.
- **Retailer Portal:** Secure login portal for wholesale retailers with admin approval workflows.
- **E-Commerce Flow:** Product browsing, dynamic cart drawer, and seamless ordering system.
- **Admin Dashboard:** Full-featured secure admin panel to manage products, categories, orders, and approve retailer accounts.
- **Secure Authentication:** Integrated with Supabase Auth (Google & Email/Password) and Row Level Security.

## 🛠️ Technology Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS, Motion (Framer Motion)
- **3D Graphics:** Three.js, React Three Fiber, Drei
- **Backend/Database:** Supabase (Auth, Database, Row Level Security)
- **Forms/Email:** Formspree
- **Routing:** React Router DOM

## 💻 Running Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- Supabase Account (for database setup)

### Setup Instructions

1. **Clone the repository and navigate to the directory:**
   ```bash
   cd kirti-electronic
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory with:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **View the App:**
   Open the Localhost URL provided in the terminal (usually `http://localhost:5173`) in your browser. *Note: Do not open `index.html` directly or via Live Preview extensions as the app requires the Vite bundler to run.*

## 🔒 Admin Panel Access

The Admin Panel is protected by Supabase Row Level Security (RLS). To gain access in development:

1. Go to `http://localhost:5173/login` and sign in.
2. In your [Supabase Dashboard](https://supabase.com/dashboard), go to your project > **Table Editor** > `admins` table.
3. Click **Insert row** and add your **User ID** (UUID from `auth.users` table) to the `user_id` column.
4. You can now access the admin panel via `http://localhost:5173/admin`.

## 📜 Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the app for production.
- `npm run preview`: Locally preview the production build.
- `npm run lint`: Runs TypeScript type checking.

---
*Built with React, Vite, and Supabase.*
