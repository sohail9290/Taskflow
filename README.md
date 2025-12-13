# TaskFlow – JWT Secured Todo Management System

TaskFlow is a full-stack **Todo Management System** built using **Spring Boot and React**, implementing **JWT-based authentication**, **role-based authorization**, and **secure RESTful APIs**.  
The project demonstrates real-world backend security, clean API design, and frontend–backend integration suitable for production use.

---

## 🌐 Live Application

- **Frontend (Vercel):** https://taskflow-piranx11s-sohail9290s-projects.vercel.app/  
- **Backend API (Render):** https://taskflow-cvih.onrender.com
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
## 🚀 Features

- JWT-based authentication & authorization
- Role-based access control (ADMIN, USER)
- Secure REST APIs using Spring Security
- Create, read, update, delete Todos
- Mark Todos as complete / incomplete
- Stateless backend architecture
- Production-ready deployment


## 🛠️ Tech Stack

### Backend
- Java 17
- Spring Boot 3.5.7
- Spring Security
- Spring Data JPA
- JWT (JJWT)
- ModelMapper
- PostgreSQL / MySQL
- Maven

### Frontend
- React
- Axios
- JWT-based session handling

### Deployment
- Backend: Render
- Frontend: Vercel



## 🔐 Authentication & Security

### JWT Authentication Flow

1. User logs in using credentials
2. Backend validates credentials
3. JWT token is generated and returned
4. Client stores JWT securely
5. JWT is sent with every request via the `Authorization` header
6. Backend validates the token using a Spring Security JWT filter

### JWT Token Implementation

- Implemented using **JJWT**
- Token contains:
  - Username (subject)
  - Issued time
  - Expiration time
- Token signed using **HMAC SHA key**
- Secret & expiration stored as environment variables

### Spring Security Configuration

- CSRF disabled (stateless REST APIs)
- `/api/auth/**` endpoints are public
- All other endpoints require authentication
- JWT filter added before `UsernamePasswordAuthenticationFilter`
- Custom authentication entry point for unauthorized access
- Method-level security using `@PreAuthorize`

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

## 📌 REST API Endpoints

### 🔐 Authentication

| Method | Endpoint              | Description                          |
|-------:|-----------------------|--------------------------------------|
| POST   | `/api/auth/register`  | Register a new user                  |
| POST   | `/api/auth/login`     | Authenticate user & receive JWT      |

### 📝 Todo Management

| Method | Endpoint                         | Role           | Description              |
|-------:|----------------------------------|----------------|--------------------------|
| POST   | `/api/todos`                     | ADMIN          | Create a new todo        |
| GET    | `/api/todos/{id}`                | ADMIN, USER    | Get todo by ID           |
| GET    | `/api/todos`                     | ADMIN, USER    | Get all todos            |
| PUT    | `/api/todos/{id}`                | ADMIN          | Update todo              |
| DELETE | `/api/todos/{id}`                | ADMIN          | Delete todo              |
| PATCH  | `/api/todos/{id}/complete`       | ADMIN, USER    | Mark todo complete       |
| PATCH  | `/api/todos/{id}/in-complete`    | ADMIN, USER    | Mark todo incomplete     |

## 📈 Why This Project Matters

- Implements real-world **JWT-based security**
- Uses **role-based access control (RBAC)**
- Demonstrates clean and scalable **REST API design**
- Follows **production-level Spring Boot best practices**
- Suitable for **enterprise backend and full-stack roles**

---

## 👨‍💻 Author

**Sohail Khan Pattan**  
Master’s Student in Computer Science  
Full-Stack Developer | Spring Boot | React  

---

## ⭐ Future Enhancements

- Refresh token support
- Pagination & filtering
- Swagger / OpenAPI documentation
- Dockerization & CI/CD pipeline

---

