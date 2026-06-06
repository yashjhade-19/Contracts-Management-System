# Contracts Management System

A full-stack Contracts Management System developed as part of the Seventh Ray Consulting and Technology Private Limited assignment.

## Features

### Backend

* Contract Management APIs
* Search Contracts
* Status Filtering
* Pagination
* Workflow History API
* Request Validation
* Global Exception Handling
* PostgreSQL Integration
* Unit and API Testing

### Frontend

* Contracts Dashboard
* Contract Details Page
* Search Functionality
* Status Filter
* Pagination
* Loading, Error, and Empty States
* Component Testing

---

# Tech Stack

## Backend

* Java 17
* Spring Boot 3
* Spring Data JPA
* PostgreSQL
* Maven
* JUnit 5
* Mockito

## Frontend

* Next.js 15
* TypeScript
* Tailwind CSS
* Jest
* React Testing Library

---

# Project Structure

```text
backend/
frontend/
database/
README.md
Architecture_Questions.md
```

---

# Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE contract_management;
```

Execute the SQL scripts available in:

```text
database/
```

---

# Running the Backend

Navigate to:

```bash
cd backend
```

Configure PostgreSQL credentials inside:

```text
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/contract_management
spring.datasource.username=postgres
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
```

Run the application:

```bash
mvn spring-boot:run
```

Backend will start on:

```text
http://localhost:8080
```

---

# Running the Frontend

Navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run:

```bash
npm run dev
```

Frontend will start on:

```text
http://localhost:3000/contracts
```

---

# API Endpoints

### Get Contracts

```http
GET /api/contracts
```

Supports:

```text
?page=
&size=
&search=
&status=
```

---

### Get Contract By Id

```http
GET /api/contracts/{id}
```

---

### Get Workflow History

```http
GET /api/contracts/{id}/history
```

---

### Create Contract

```http
POST /api/contracts
```

---

# Running Tests

## Backend Tests

Navigate to:

```bash
cd backend
```

Run:

```bash
mvn test
```

This executes:

* Service Layer Tests
* Controller/API Tests

---

## Frontend Tests

Navigate to:

```bash
cd frontend
```

Run:

```bash
npm test
```

This executes:

* Component Tests

---

# Assumptions Made During Development

1. Contract IDs are generated using UUID.
2. Workflow history is read-only for this assignment.
3. Search functionality operates on contract title and owner name.
4. Contract status values are:

   * DRAFT
   * REVIEW
   * APPROVED
   * REJECTED
5. Authentication and authorization were not implemented as they were outside the scope of the assignment requirements.
6. The frontend communicates directly with the backend using REST APIs.
7. PostgreSQL is used as the primary database.

---

# Future Improvements

* JWT Authentication
* Role-Based Access Control (RBAC)
* Elasticsearch Integration
* Docker Deployment
* CI/CD Pipeline
* Redis Caching
* Advanced Workflow Management

---

# Author

Yash Jhade
