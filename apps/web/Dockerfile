FROM node:20-alpine

WORKDIR /app

COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile

WORKDIR apps/web
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]
