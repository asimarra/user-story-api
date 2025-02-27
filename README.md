# Backend - NestJS API

## 📌 Technologies Used

- **NestJS** - Progressive Node.js framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT Authentication** - Secure access
- **Swagger** - API documentation
- **ChatGPT** - For generate some service logic and fix some issues.

---

## 🚀 Setup Instructions

### **1. Clone the Repository**

```bash
git clone <repository_url>
cd project_name
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Configure Environment Variables**

Create a `.env` file and set your environment variables:

```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/mydb
JWT_SECRET=mysecretkey
```

### **4. Run the Application**

```bash
npm run start
```

For development mode with auto-restart:

```bash
npm run start:dev
```

---

## 📖 API Endpoints

Swagger documentation is available at:
[http://localhost:3000/api](http://localhost:3000/api)

### **Authentication**

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Authenticate and receive a JWT token

### **Users**

- `GET /users` - List all users (Admin only)
- `GET /users/:id` - Get a specific user
- `PATCH /users/:id` - Update user details
- `DELETE /users/:id` - Remove a user (Admin only)

### **Products**

- `GET /products` - List all products
- `POST /products` - Create a product (Admin only)
- `PATCH /products/:id` - Update a product (Admin only)

### **Invoices**

- `POST /invoices` - Create an invoice (User only)
- `GET /invoices/user/:id` - Get invoices for a user
- `GET /invoices/:id` - Get invoice details

---

## 🛠 Deployment

For production builds:

```bash
npm run build
```

To start in production mode:

```bash
npm run start:prod
```

---

## ❓ Troubleshooting

- If the database connection fails, ensure MongoDB is running:
  ```bash
  mongod
  ```
- If `.env` changes are not reflecting, restart the server.

---

## 🏗 Future Improvements

- Implement forgot password
- Role-based permission enhancements

For any issues, feel free to open a GitHub issue. 🚀
