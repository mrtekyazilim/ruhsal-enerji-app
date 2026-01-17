Kernel (Backend)

Node.js

Express.js

TypeScript

MongoDB

Mongoose

JWT (Authentication)

bcrypt (password hashing)

dotenv (environment variables)

REST API architecture

MVC / modular structure

Kernel (Backend) API Endpoints Examples

POST /api/login → phone number authentication, returns JWT

GET /api/categories → returns list of categories

GET /api/products → returns list of products

GET /api/products/:id → returns product detail

POST /api/orders → creates a new order

Client (Frontend)

React.js

TypeScript

Tailwind CSS

Shadcn UI

React Router

Axios / Fetch API

Client (Frontend) Examples

Login form → use phone number

Home page → list categories

Category page → list products

Product detail page → product details

Admin Panel (Frontend – Management Panel)
Purpose

The Admin Panel is a private management interface used to control and manage the backend data.
It is not accessible to regular users and is developed as a separate application from the Client.

Admin Panel Technologies

React.js

TypeScript

Tailwind CSS

Shadcn UI

React Router

Axios / Fetch API

JWT-based authentication

Admin-only route protection (PrivateRoute / Guard pattern)

Authentication & Authorization

Admin users authenticate via a dedicated login endpoint

Successful login returns a JWT token

Token is required to access all /admin/* routes

Admin routes are protected on the frontend

Backend enforces isAdmin authorization checks

Non-admin users are denied access to admin APIs

Admin Panel Features
Dashboard

Overview and system summary

Total product count

Total category count

(Optional) order and system statistics

Product Management

List all products

Create new products

Update existing products

Delete products

Upload and manage product images

Category Management

Create categories

Update categories

Delete categories

Admin Panel Routes Examples

/admin/login → Admin login page

/admin → Dashboard

/admin/products → Product management

/admin/categories → Category management

Client vs Admin Separation (Critical)

Client and Admin Panel are completely separated applications

Client contains only user-facing features

Admin Panel contains only management and control features

No admin components or routes exist inside the Client project

SEO and public UI concerns are irrelevant for the Admin Panel

Project Structure Example
/client   → User-facing frontend
/admin    → Admin management panel
/kernel   → Backend API

Core Principle

The Client consumes, the Admin manages, and the Kernel serves.