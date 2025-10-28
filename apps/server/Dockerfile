FROM node:22-bookworm-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# for prisma
RUN apt update && apt install openssl -y
RUN corepack enable


FROM base AS builder
RUN apt update 
WORKDIR /app
RUN pnpm add -g turbo 
COPY . .
RUN turbo prune server --docker


# Add lockfile and package.json's of isolated subworkspace 
FROM base AS installer
RUN apt update
WORKDIR /app

# First install dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts


# Build the project and its dependencies
COPY --from=builder /app/out/full/ .

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN pnpm turbo build

FROM base AS runner
RUN apt update
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs
COPY --from=installer /app .
COPY --from=installer /app/apps/server/src/docs/openapi.yaml apps/server/dist/src/docs/openapi.yaml
RUN echo $(ls -la)
CMD ["node" , "apps/server/dist/src/index.js"]
