# Blog API Project Goals

Here is the grand vision of exactly what we are building for this Blog API, from Phase 0 all the way to Phase 6!

### ✅ Phase 0: The Basics (COMPLETED!)

- **What we did:** Built the foundation. We created the `Post` database table, the Controller, and the Service.
- **Where we are at:** The API works! You can successfully Create, Read, Update, and Delete blog posts.

### ✅ Phase 1: Data Validation (COMPLETED!)

- **The Problem:** Right now, someone could send a blank post or a title made of numbers, and our server would crash.
- **What we built:** Added strict rules (`@IsString()`, `@IsNotEmpty()`, `@MinLength()`) to DTOs and enabled global validation pipes.

### ✅ Phase 2: Database Relationships (COMPLETED!)

- **The Problem:** Posts don't just appear out of nowhere; they are written by people!
- **What we built:** Created the `User` model in Prisma and linked it to `Post` with a 1-to-many relationship (`authorId` / `@relation`).

### ✅ Phase 3: User Authentication (Login / Signup) (COMPLETED!)

- **The Problem:** We need a way for humans to register an account and log in.
- **What we built:** Built `/signup` and `/login` endpoints with `bcrypt` password hashing and secure dual-token JWTs (Access + Refresh tokens).

### ✅ Phase 4: Authorization (Security & Ownership) (COMPLETED!)

- **The Problem:** Right now, anyone on the internet can send a `DELETE /posts/1` request and delete your blog post!
- **What we built:** Created `AuthGuard` protecting endpoints with Bearer tokens, and added strict ownership checks ensuring users can only modify/delete their own posts.

### ✅ Phase 5: Pagination & Filtering (COMPLETED!)

- **The Problem:** What happens when our app has 10,000 blog posts? If a user hits `GET /posts`, the server will try to send 10,000 posts at once and crash!
- **What we built:** Implemented query parameters (`?page=1&limit=10&published=true`) using Prisma `skip`, `take`, and `where` filtering.

### ✅ Phase 6: Automated Testing (COMPLETED!)

- **The Problem:** Manually testing every single route in Swagger every time you change a line of code is exhausting.
- **What we built:** Automated test suite with Vitest verifying controllers and services run cleanly and reliably.
