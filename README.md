# Starty SCPI - Full-Stack Monorepo

![Project Banner](https://via.placeholder.com/1200x630/1a1b26/FFFFFF?text=Starty%20SCPI%20-%20Monorepo)

## 🚀 Overview

This repository contains the full-stack solution for the Starty SCPI technical
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
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Create the main environment file:** Copy the example environment file.
    This file contains all the necessary secrets and configuration for the
    entire monorepo.

    ```bash
    cp .env.example .env
    ```

3.  **Install all dependencies:** This command will read the
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

2. **Manualy start apps, either all at once or one by one**

2.1 **Start the Database Service:** Open a terminal and run the following
command. It will start the PostgreSQL container and wait until it is healthy and
ready to accept connections.

    ```bash
    pnpm --filter db db:up
    ```

    _Leave this terminal running._

2.2 **Apply Migrations and Seed the Database:** Open a **second terminal**. Run
these commands to create the database schema and populate it with initial data.

    ```bash
    # Create the tables
    pnpm --filter db db:migrate

    # Populate with fake data
    pnpm --filter db db:seed
    ```

2.3 **Start All Development Servers with Turborepo:** This is the main command.
It will build all necessary dependencies and start the development servers for
`server`, `web`, and `admin` in parallel. `bash     turbo dev     `

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
