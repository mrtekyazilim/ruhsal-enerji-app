# Ruhsal Enerji App - Modern Full Stack Application

Modern, TypeScript-based full-stack application for spiritual guidance services.

## 🚀 Tech Stack

### Backend (Kernel)
- **Node.js & Express.js** - Server framework
- **TypeScript** - Type-safe development
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **Helmet** - Security headers
- **Morgan** - HTTP logging
- **Zod** - Schema validation

### Frontend (Client)
- **React 19** - UI library
- **TypeScript** - Type safety
- **TanStack Query (React Query)** - Server state management
- **Zustand** - Client state management
- **React Router v7** - Routing
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **Axios** - HTTP client

## 📁 Project Structure

```
ruhsal-enerji-app/
├── kernel/                 # Backend API
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Route controllers
│   │   ├── middlewares/   # Express middlewares
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── utils/         # Utility functions
│   │   ├── server.ts      # Server setup
│   │   └── index.ts       # Entry point
│   └── package.json
│
├── client/                # Frontend React app
│   ├── src/
│   │   ├── components/    # React components
│   │   │   └── ui/       # Shadcn UI components
│   │   ├── hooks/        # Custom hooks
│   │   ├── lib/          # Utilities
│   │   ├── pages/        # Page components
│   │   ├── routes/       # Route configuration
│   │   ├── services/     # API services
│   │   ├── store/        # Zustand stores
│   │   └── types/        # TypeScript types
│   └── package.json
│
└── README.md
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to kernel directory:
```bash
cd kernel
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (use `.env.example` as template):
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/ruhsal-enerji
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

4. Start development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_NAME=Ruhsal Enerji
```

4. Start development server:
```bash
npm start
```

## 📝 API Endpoints

### Public Routes
- `GET /health` - Health check
- `GET /api/categories` - Get all categories
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/categories/:slug/products` - Get products by category

### Admin Routes (Protected)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/products` - Get all products (admin)
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

## 🔐 Authentication

JWT-based authentication with phone number verification. Admin login uses a simple code verification (demo: code `1234`).

## 🎨 Features

### Modern Architecture
- ✅ Full TypeScript support
- ✅ Clean architecture with separation of concerns
- ✅ Error handling with custom error classes
- ✅ Request validation
- ✅ Security best practices (Helmet, CORS)

### State Management
- ✅ TanStack Query for server state
- ✅ Zustand for client state
- ✅ Persistent auth state

### UI/UX
- ✅ Responsive design with Tailwind CSS
- ✅ Modern component library (Shadcn UI)
- ✅ Smooth animations and transitions
- ✅ Loading states and error handling

## 📦 Build for Production

### Backend
```bash
cd kernel
npm run build
npm start
```

### Frontend
```bash
cd client
npm run build
```

## 🧪 Development

### Backend Development
- Hot reloading with `tsx watch`
- TypeScript strict mode enabled
- ESLint & Prettier configured
- Environment validation with Zod

### Frontend Development
- React 19 features
- Modern hooks patterns
- Component composition
- Type-safe API calls

## 📄 License

ISC

---

Built with ❤️ using modern web technologies
