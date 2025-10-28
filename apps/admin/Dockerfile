FROM node:22-bookworm-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
RUN apt update
WORKDIR /app
RUN pnpm add -g turbo 
COPY . .
RUN turbo prune admin --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apt update
WORKDIR /app



# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN  --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
ARG VITE_API_BASE_URL 
RUN echo "VITE_API_BASE_URL=$VITE_API_BASE_URL" > apps/admin/.env.production

# Build the project
COPY --from=builder /app/out/full/ .

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN pnpm turbo build

FROM nginx:alpine AS runner
WORKDIR /app

COPY --from=installer  /app/apps/admin/dist /usr/share/nginx/html
# Expose port 80 to the outside world
EXPOSE 80

# Command to start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
