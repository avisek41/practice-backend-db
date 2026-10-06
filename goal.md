# Blog API Project Goals

Here is the grand vision of exactly what we are building for this Blog API, from Phase 0 all the way to Phase 6!

### ✅ Phase 0: The Basics (COMPLETED!)

- **What we did:** Built the foundation. We created the `Post` database table, the Controller, and the Service.
- **Where we are at:** The API works! You can successfully Create, Read, Update, and Delete blog posts.

### 🟡 Phase 1: Data Validation (COMPLETED!)

- **The Problem:** Right now, someone could send a blank post or a title made of numbers, and our server would crash.
- **What we will build:** We will add strict rules (like `@IsString()` and `@IsNotEmpty()`) to our DTOs so the API rejects bad data with a friendly error message before it even touches the database.

### 🟡 Phase 2: Database Relationships

- **The Problem:** Posts don't just appear out of nowhere; they are written by people!
- **What we will build:** We will create a `User` model in the database, and link it to the `Post` model. This is called a "One-to-Many" relationship (One User can have Many Posts).

### 🟠 Phase 3: User Authentication (Login / Signup)

- **The Problem:** We need a way for humans to register an account and log in.
- **What we will build:** We will build a `/signup` and `/login` endpoint. We will securely hash their passwords, and when they log in, we will hand them a secure **JWT** (JSON Web Token) like a digital VIP pass.

### 🟠 Phase 4: Authorization (Security & Ownership)

- **The Problem:** Right now, anyone on the internet can send a `DELETE /posts/1` request and delete your blog post!
- **What we will build:** We will lock down the API so that you **must** be logged in to create a post. More importantly, we will write logic so that a user is only allowed to edit or delete _their own_ posts, completely protecting other people's posts.

### 🔴 Phase 5: Pagination & Filtering

- **The Problem:** What happens when our app has 10,000 blog posts? If a user hits `GET /posts`, the server will try to send 10,000 posts at once and crash!
- **What we will build:** We will update our code to fetch posts 10 at a time (Pagination: `?page=1&limit=10`) and allow users to filter for only "published" posts.

### 🔴 Phase 6: Automated Testing

- **The Problem:** Manually testing every single route in Swagger every time you change a line of code is exhausting.
- **What we will build:** We will write code that tests our code! We will write automated scripts that pretend to be a user, hit our API, and mathematically prove that everything works perfectly in milliseconds.
