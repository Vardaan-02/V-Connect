FROM node:20-alpine

WORKDIR /app

COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile

WORKDIR apps/http-server
RUN pnpm build

EXPOSE 8080
CMD ["pnpm", "start"]
