# TaskFlow — JWT Secured Todo Management System

TaskFlow is a **production-ready full-stack Todo Management System** built using **Spring Boot and React**, implementing **JWT-based authentication**, **role-based access control (RBAC)**, and **secure RESTful APIs**.

This project demonstrates how real-world applications handle **user authentication, authorization, and protected resources** using Spring Security in a stateless architecture.

---

🌐 Live Application
- **Frontend (Vercel):** https://taskflow-piranx11s-sohail9290s-projects.vercel.app/
- **Backend API (Render):** https://taskflow-cvih.onrender.com

---
## ⭐ Why This Project Matters

- Demonstrates **real-world JWT authentication and RBAC**
- Shows **secure API design** using Spring Security
- Implements **stateless backend architecture**
- Mirrors patterns used in **enterprise-grade applications**
- Fully deployed and production-accessible
  
---
## 🏗️ System Architecture

```text
┌────────────────────┐
│   React Frontend   │
└─────────┬──────────┘
          │  JWT (Authorization Header)
          ▼
┌────────────────────┐
│ Spring Boot REST   │
│        API         │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ JPA / Hibernate    │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│   Database         │
└────────────────────┘
```
---

## 🚀 Features

- User registration and login
- JWT-based authentication
- Role-based authorization (ADMIN, USER)
- Secure REST APIs using Spring Security
- Create, read, update, and delete Todos
- Mark Todos as complete or incomplete
- Stateless backend architecture
- Production deployment (Vercel + Render)
---

## 🛠️ Tech Stack

### Backend
- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT (JJWT)
- PostgreSQL / MySQL
- Maven

### Frontend
- React
- Axios
- JWT-based session handling

### Deployment
- Backend: Render
- Frontend: Vercel

---
## 🔐 Authentication & Security

### JWT Authentication Flow

1. User logs in using credentials
2. Backend validates credentials
3. JWT token is generated and returned
4. Client stores JWT securely
5. JWT is sent with every request via the `Authorization` header
6. Spring Security JWT filter validates the token
---
### JWT Token Implementation

- Implemented using **JJWT**
- Token contains:
  - Username (subject)
  - Issued timestamp
  - Expiration timestamp
- Token is signed using **HMAC SHA**
- Secret key and expiration configured using environment variables
---
### Spring Security Configuration

- Stateless session management
- CSRF disabled for REST APIs
- `/api/auth/**` endpoints are public
- All other endpoints require authentication
- JWT filter added before `UsernamePasswordAuthenticationFilter`
- Method-level security enabled using `@PreAuthorize`
---
## 🧑‍💻 Role-Based Authorization

| Role  | Permissions |
|------|-------------|
| ADMIN | Create, update, delete todos |
| USER  | View todos, mark complete/incomplete |

Authorization enforced using:

```java
@PreAuthorize("hasRole('ADMIN')")
@PreAuthorize("hasAnyRole('ADMIN','USER')")
```
---
## 📌 REST API Endpoints

### 🔐 Authentication
| Method | Endpoint             | Description                     |
|--------|----------------------|---------------------------------|
| POST   | /api/auth/register   | Register a new user             |
| POST   | /api/auth/login      | Authenticate and receive JWT    |

### 📝 Todo Management
| Method | Endpoint                       | Role           | Description             |
|--------|--------------------------------|----------------|-------------------------|
| POST   | /api/todos                     | ADMIN          | Create a new todo       |
| GET    | /api/todos                     | ADMIN, USER    | Get all todos           |
| GET    | /api/todos/{id}                | ADMIN, USER    | Get todo by ID          |
| PUT    | /api/todos/{id}                | ADMIN          | Update todo             |
| DELETE | /api/todos/{id}                | ADMIN          | Delete todo             |
| PATCH  | /api/todos/{id}/complete       | ADMIN, USER    | Mark todo complete      |
| PATCH  | /api/todos/{id}/in-complete    | ADMIN, USER    | Mark todo incomplete    |

---
## 🧪 How to Run Locally

### Backend
1. Clone the repository
2. Configure database and JWT secrets in `application.properties`
3. Run the Spring Boot application

### Frontend
1. Navigate to the frontend directory
2. Install dependencies
3. Start the React development server
---
## ⭐ Future Enhancements

- Refresh token support
- Pagination and filtering
- Swagger / OpenAPI documentation
- Dockerization and CI/CD pipeline
---
## 👨‍💻 Author

**Sohail Khan Pattan**  
Full Stack Software Engineer  
Spring Boot | React | JWT | RBAC


