# Student Gift Marketplace

A full-stack web application that allows students to browse and claim exclusive gift offers from various brands. Built with TypeScript, Express, and SQLite.

## 📋 Overview

This application provides a platform where students can:
- Login with authentication
- Browse available gift offers from multiple brands
- Claim exclusive coupons (one per gift per student)
- View gift details including terms, categories, and availability

## 🚀 Features

- **User Authentication**: Secure login system with JWT tokens and bcrypt password hashing
- **Gift Marketplace**: Browse gifts by category, brand, and availability
- **Coupon System**: One-time claim per student per gift
- **Brand Management**: Multiple brands with logos and gift offerings
- **Database**: SQLite database with automatic schema creation and seeding

## 🛠️ Tech Stack

### Backend
- **TypeScript** - Type-safe JavaScript
- **Node.js** - Runtime environment
- **Express** - Web application framework
- **better-sqlite3** - SQLite database interface
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript

## 📁 Project Structure

```
uni-assignment/
├── src/
│   ├── server.ts              # Server entry point
│   ├── app.ts                 # Express app configuration
│   ├── config/
│   │   └── database.ts        # Database configuration
│   ├── middleware/
│   │   ├── auth.middleware.ts # JWT authentication
│   │   └── error.middleware.ts
│   ├── modules/
│   │   ├── auth/              # Authentication module
│   │   └── gifts/             # Gift management module
│   ├── repositories/          # Database repositories
│   ├── errors/                # Custom error handling
│   └── types/                 # TypeScript type definitions
├── database/
│   ├── schema.sql             # Database schema
│   └── seed.sql               # Sample data
├── public/
│   ├── index.html             # Main page
│   ├── login.html             # Login page
│   ├── app.js                 # Frontend logic
│   └── styles.css             # Styling
└── package.json
```

## 🔧 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tachma/uni-assignment.git
   cd uni-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   JWT_SECRET=your_jwt_secret_key_here
   DATABASE_PATH=./database.sqlite
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

## 🚀 Usage

### Development Mode
```bash
npm run dev
```
Runs the server with ts-node for hot reloading.

### Production Mode
```bash
npm run build
npm start
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Student login
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

### Gifts
- `GET /api/gifts` - List all available gifts
- `POST /api/gifts/:id/claim` - Claim a gift coupon (requires authentication)

### Brands
- `GET /api/brands` - List all brands

## 🗃️ Database Schema

### Students
- User accounts with username, email, and password

### Brands
- Brand information including name and logo

### Gifts
- Gift offers with details, categories, and terms
- Support for online, in-store, or both offer types
- Location types: nationwide, local, or online-only

### Coupons
- Tracks claimed gifts per student
- Enforces one claim per student per gift

## 🔐 Security

- Passwords are hashed using bcryptjs
- JWT tokens for stateless authentication
- Protected routes require valid authentication tokens
- SQL injection prevention through parameterized queries

## 👤 Author

Ioannis Tachmazidis


