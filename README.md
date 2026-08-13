# Military Asset Management System (AssetOps)

An enterprise-grade, secure, role-based platform designed for military commanders and logistics personnel to track and manage critical assets (vehicles, weapons, ammunition) across multiple military bases.

## Features

- **End-to-End Asset Visibility:** Track real-time opening balances, net movements, assignments, expenditures, and closing balances.
- **Operational Accountability:** Securely track cross-base asset transfers with comprehensive audit trails.
- **Role-Based Access Control (RBAC):**
  - **Admin:** Full access to all data, user management, and global oversight.
  - **Logistics Officer:** Can record purchases, initiate transfers, and view global inventory.
  - **Base Commander:** Can view assets/transfers related only to their specific base, and record assignments/expenditures.
- **Premium Design System:** Built with a custom "Earthy Botanical" dark theme utilizing glassmorphism, responsive data tables, and dynamic modal overlays.

## Tech Stack

### Frontend
- **Framework:** React.js via [Vite](https://vitejs.dev/) (TypeScript)
- **Styling:** Tailwind CSS v4 (Custom Dark Earthy Botanical Theme)
- **Routing:** React Router DOM
- **Icons:** Lucide-React

### Backend (Architecture Ready)
- **Runtime:** Node.js with Express.js
- **ORM:** Prisma
- **Database:** PostgreSQL (via Docker)
- **Authentication:** JWT (JSON Web Tokens)

## Development Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd military
```

### 2. Frontend Setup
Navigate to the frontend directory, install dependencies, and start the Vite development server:
```bash
cd frontend
npm install
npm run dev
```

### 3. Backend Setup (Docker)
The backend requires a PostgreSQL database to function properly. You can easily spin this up using the provided Docker configuration:
```bash
docker-compose up -d
```
Navigate to the backend directory, install dependencies, and start the API server:
```bash
cd backend
npm install
npx prisma db push
npm run dev
```

## Demo Credentials

If you are running the frontend without the backend database connected, a built-in mock bypass is currently enabled for demonstration purposes.

You can log into the UI using the **Quick Access Demos** buttons on the Login page, which automatically log you in as:
- **Admin:** Full system access (`admin`)
- **Commander (GER):** Base Commander restricted to GER base (`cmdr_ger`)
- **Logistics:** Logistics Officer for global transfers/purchases (`logistics_hq`)

## Project Structure
```
military/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── assetController.js
│   │   ├── purchaseController.js
│   │   └── transferController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── rbacMiddleware.js
│   │   └── loggerMiddleware.js
│   ├── models/
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── assetRoutes.js
│   │   ├── purchaseRoutes.js
│   │   └── transferRoutes.js
│   ├── .env.example
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── StatCard.tsx
│   │   │   └── NetMoveModal.tsx
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Purchases.tsx
│   │   │   ├── Transfers.tsx
│   │   │   ├── Assignments.tsx
│   │   │   └── Login.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── vite.config.ts
└── README.md
```

## Deployment
This project is configured for deployment on:
- **Frontend:** Vercel
- **Backend:** Any Node.js compatible host (Render, Railway, DigitalOcean)
- **Database:** Managed PostgreSQL (e.g., Supabase, Neon, AWS RDS)
