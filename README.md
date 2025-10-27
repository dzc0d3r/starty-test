# Starty SCPI - Full-Stack Monorepo
---
### Links of the live apps
1. [Deployed client facing app  (apps/web) ](https://starty-test.onrender.com/)
2. [Deployed Admin panel (apps/admin)](https://starty-admin.onrender.com)
3. [Deployed API (apps/server)](https://starty-test-server.onrender.com/docs/)

## 🛠️ Tech Stack & Tools

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=tanstack&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

---
## 🚀 Overview

This repository contains the full-stack solution for the Starty technical
test. It is a modern, production-grade monorepo built with a focus on type
safety, developer experience, scalability, and adherence to industry best
practices.

The project consists of a complete ecosystem:

- **`apps/server`**: A secure, stateless backend API built with Node.js,
  Express, and Prisma.
- **`apps/web`**: A sleek, server-rendered public-facing website built with
  Next.js.
- **`apps/admin`**: A feature-rich, protected Single Page Application (SPA) for
  administrators, built with Vite and React.

The entire stack is containerized with **Docker**, orchestrated with **Docker
Compose**, and managed as a cohesive monorepo with **Turborepo**.


---



## ✨ Features

- **Monorepo Architecture:** Centralized code, shared packages, and unified
  tooling managed by Turborepo.
- **Full-Stack TypeScript:** End-to-end type safety from the database schema to
  the frontend UI components.
- **Containerized Environment:** 100% reproducible development and production
  environments with Docker.
- **Hybrid Authentication:** Secure, stateful refresh tokens via `httpOnly`
  cookies combined with stateless JWT access tokens.
- **Role-Based Access Control (RBAC):** Dedicated, secure `/admin` namespace on
  the backend, enforced by middleware. (requireAuth and requireAdmin)
- **Server-Side Rendering (SSR):** The public `web` app is built with Next.js
  for optimal performance and SEO.
- **Declarative UI & State Management:** Frontends are built with React and
  powered by TanStack Query for robust caching, background refetching, and
  optimistic updates.
- **Shared, Type-Safe API Client:** A dedicated `packages/api` SDK provides a
  beautiful, hook-based interface to the backend, complete with automatic token
  refresh.
- **Shared UI & Schema:** A `packages/ui` library based on Shadcn UI and a
  `packages/schemas` library for Zod ensure consistency and a single source of
  truth across the entire stack.
- **Comprehensive Testing:** Integration tests for the backend (`vitest`,
  `supertest`) and unit tests for the frontend (`vitest`,
  `React Testing Library`).



---

## 🏁 Getting Started

### Prerequisites

- **Node.js** (v18.x or later)
- **pnpm** (`npm install -g pnpm`)
- **Docker** and **Docker Compose**
- **Turborepo CLI** (optional, for running individual commands)
  ```bash
  pnpm add turbo --global
  ```

### 1. Initial Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/dzc0d3r/starty-test
    cd starty-test
    ```

2.  **Create the main environment file and packages/db environment file:** Copy the example environment file.
    This file contains all the necessary secrets and configuration for the
    entire monorepo.

    ```bash
    cp .env.example .env
    ```

    copy packages/db environment file too from root directory this file contains all the necessary secrets and configuration for the
    db package
    ```bash
    cp packages/db/.env.example packages/db/.env
    ```

4.  **Install all dependencies:** This command will read the
    `pnpm-workspace.yaml` file and install dependencies for all apps and
    packages in the monorepo.
    ```bash
    pnpm install
    ```

### 2. Running the Full Stack (Recommended)

This is the simplest way to run the entire application ecosystem.

1. **Using docker compose**

   ```bash
      docker-compose up
   ```

   Open another another terminal and run these commands to create the database
   schema and populate it with initial data.

   ```bash

      # Create the tables
      pnpm --filter db db:migrate

      # Populate with fake data
      pnpm --filter db db:seed
   ```

   - Visit http://localhost for the client facing app
   - Visit http://localhost:81 for the admin panel
   - Visit http://localhost:3000/docs for api docs (swagger ui)





### 3. **Manualy start apps, either all at once or one by one**
 
1. **Start the Database Service:** Open a terminal and run the following
    command. It will start the PostgreSQL container and wait until it is healthy and
    ready to accept connections.
  
      ```bash
      pnpm --filter db db:up
      ```
  
      _Leave this terminal running._

2. **Apply Migrations and Seed the Database:** Open a **second terminal**. Run
    these commands to create the database schema and populate it with initial data.

      ```bash
      # Create the tables
      pnpm --filter db db:migrate
  
      # Populate with fake data
      pnpm --filter db db:seed
      ```

3. **Start All Development Servers with Turborepo:** This is the main command.
     It will build all necessary dependencies and start the development servers for
     `server`, `web`, and `admin` in parallel. 
     
      ```bash 
         turbo dev
      ```

### 🚀 Accessing the Applications

Once `turbo dev` is running, the applications will be available at:

- 🌐 **Public Website (`web`):** [http://localhost:3001](http://localhost:3001)
- 🔐 **Admin Panel (`admin`):** [http://localhost:5173](http://localhost:5173)
- ⚙️ **Backend API (`server`):** [http://localhost:3000](http://localhost:3000)
  - **API Docs (Swagger):**
    [http://localhost:3000/docs](http://localhost:3000/docs)

---

## 🔧 Advanced Usage

### Running Individual Applications

You can use Turborepo's `--filter` flag to run the `dev` script for a single
application. This is useful for focusing on one part of the stack.

_Make sure the database is running (`pnpm --filter db db:up`) before starting
the server._

```bash

# Start only the backend API server
turbo dev --filter server

# Start only the public Next.js website
turbo dev --filter web

# Start only the Vite-based admin panel
turbo dev --filter admin
```

Alternative: Using Docker Compose Directly

If you prefer to manage the services directly with Docker Compose, you can use
the following commands. The pnpm dev command is a wrapper around this.

```
# Build and start all services defined in docker-compose.yml in detached mode
docker-compose up --build -d

# View the logs for all running services
docker-compose logs -f

# Stop all running services
docker-compose down
```

### Screenshots of deployed apps 
1. Web 
<img width="1366" height="2804" alt="starty" src="https://github.com/user-attachments/assets/7635e04a-3e5c-4649-a738-42cf727b2bff" />
<img width="1356" height="611" alt="Screenshot 2025-10-27 at 21-47-52 " src="https://github.com/user-attachments/assets/b72a78d2-a40e-4dd7-899a-6e022b4e1f4d" />


---
2. admin<img width="1356" height="600" alt="admin" src="https://github.com/user-attachments/assets/00123fb1-f6a0-478b-8ff0-d2f8b6b16dd6" />
<img width="1356" height="600" alt="admin2" src="https://github.com/user-attachments/assets/ea1bd85d-3978-4883-aeea-c2f11f67b06a" />

---
3. api docs
<img width="1356" height="1852" alt="api" src="https://github.com/user-attachments/assets/3d095c7f-4e72-490c-8f08-12f69bbc53c5" />












