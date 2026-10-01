# Backend Learning Roadmap: Markdown Blog API

This document outlines the step-by-step roadmap for building a Markdown Blog & Publishing API (similar to Medium or Substack) using NestJS, Prisma, and Supabase.

## Tech Stack
- **Framework:** NestJS
- **ORM:** Prisma
- **Database:** PostgreSQL (via Supabase)

---

## 🟢 Phase 0: The CRUD Fundamentals (Manual Build)
*Goal: Build the `Posts` feature completely from scratch without using CLI generation tools.*

- **Step 0.1: Database Schema**
  - Add the `Post` model to `schema.prisma`.
  - Properties: `id`, `title`, `content`, `published`, `createdAt`, `updatedAt`.
  - Run `npx prisma db push` to sync the database.
- **Step 0.2: The Module**
  - Create `src/posts/posts.module.ts`.
  - Register the module in `app.module.ts`.
- **Step 0.3: The Controller**
  - Create `src/posts/posts.controller.ts`.
  - Define HTTP routes (`GET`, `POST`, `PATCH`, `DELETE`).
- **Step 0.4: The Service**
  - Create `src/posts/posts.service.ts`.
  - Inject `PrismaService` and write the database logic for each route.

## 🟡 Phase 1: Data Validation & Error Handling
*Goal: Prevent users from sending invalid data (e.g., empty titles or missing content).*

- **Concept:** Data Transfer Objects (DTOs) and Validation Pipes.
- **Implementation:** 
  - Install `class-validator` and `class-transformer`.
  - Create `CreatePostDto` and `UpdatePostDto`.
  - Add decorators like `@IsString()`, `@IsNotEmpty()`, and `@MinLength(5)` to enforce rules.
  - Enable global validation in `main.ts`.

## 🟡 Phase 2: Database Relationships
*Goal: Introduce Authors (Users) and link them to Posts.*

- **Concept:** Prisma One-to-Many Relationships and Foreign Keys.
- **Implementation:**
  - Create a `User` model in `schema.prisma` (id, email, password).
  - Update the `Post` model to include an `authorId` that references the `User`.
  - Push the schema changes and update the Service logic to support authors.

## 🟠 Phase 3: User Authentication (AuthN)
*Goal: Allow authors to securely sign up and log in.*

- **Concept:** Password Hashing and JSON Web Tokens (JWT).
- **Implementation:**
  - Install `bcrypt` for hashing passwords.
  - Install `@nestjs/jwt` and `@nestjs/passport`.
  - Build a `AuthModule` with `/signup` and `/login` endpoints.
  - Return a JWT token when a user successfully logs in.

## 🟠 Phase 4: Authorization & Ownership (AuthZ)
*Goal: Protect endpoints so only the author can edit or delete their own posts.*

- **Concept:** NestJS Guards and Custom Decorators.
- **Implementation:**
  - Create a `JwtAuthGuard` to protect specific routes.
  - Extract the `userId` from the incoming token.
  - Update the `PostsService` to verify that `authorId === userId` before allowing `PATCH` or `DELETE` operations.

## 🔴 Phase 5: Advanced Querying (Pagination & Filtering)
*Goal: Fetching posts efficiently.*

- **Concept:** Query Parameters, Prisma `skip`/`take`.
- **Implementation:**
  - Update `GET /posts` to support `?page=1&limit=10`.
  - Add a filter to only return posts where `published: true` for public readers.

## 🔴 Phase 6: Automated Testing
*Goal: Write automated tests to mathematically prove the code works.*

- **Concept:** Unit Testing and Mocks.
- **Implementation:**
  - Use Vitest/Jest to test the `PostsService`.
  - Mock the `PrismaService` to ensure tests run without hitting the real database.
  - Write tests for successful creation, validation errors, and unauthorized access.
