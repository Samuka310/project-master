# ====================================
# Stage 1: Development
# ====================================
FROM node:22-alpine AS development

WORKDIR /app

# Instalar dependências do sistema
RUN apk add --no-cache libc6-compat openssl

# Instalar pnpm globalmente
RUN npm install -g pnpm@latest

# Copiar apenas package.json
COPY apps/backend/package.json ./package.json

# ✅ NÃO COPIAR pnpm-lock.yaml - deixar o pnpm criar um novo no container
RUN pnpm install

# Verificar instalação do NestJS CLI
RUN ls -la node_modules/@nestjs/cli/bin/nest.js && echo "✅ NestJS CLI instalado!"

# Copiar prisma
COPY apps/backend/prisma ./prisma/

# Gerar client do Prisma
RUN pnpm prisma generate

# Copiar código fonte
COPY apps/backend/src ./src
COPY apps/backend/test ./test
COPY apps/backend/nest-cli.json ./nest-cli.json
COPY apps/backend/tsconfig*.json ./
COPY apps/backend/.prettierrc ./.prettierrc
COPY apps/backend/eslint.config.mjs ./eslint.config.mjs

# Expor porta
EXPOSE 4000

# Start
CMD ["pnpm", "run", "start:dev"]

# ====================================
# Stage 2: Build
# ====================================
FROM node:22-alpine AS build

WORKDIR /app

RUN apk add --no-cache libc6-compat openssl
RUN npm install -g pnpm@latest

COPY apps/backend/package.json ./package.json
RUN pnpm install

COPY apps/backend/prisma ./prisma/
RUN pnpm prisma generate

COPY apps/backend/src ./src
COPY apps/backend/nest-cli.json ./nest-cli.json
COPY apps/backend/tsconfig*.json ./

RUN pnpm run build

# ====================================
# Stage 3: Production
# ====================================
FROM node:22-alpine AS production

WORKDIR /app

RUN apk add --no-cache libc6-compat openssl
RUN npm install -g pnpm@latest

RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001

COPY --from=build --chown=nestjs:nodejs /app/package.json ./
COPY --from=build --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nestjs:nodejs /app/dist ./dist
COPY --from=build --chown=nestjs:nodejs /app/prisma ./prisma

ENV NODE_ENV=production
ENV PORT=4000

USER nestjs

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "dist/src/main.js"]
