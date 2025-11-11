# ====================================
# Stage 1: Dependencies
# ====================================
FROM node:22-alpine AS deps

WORKDIR /app

# Instalar dependências do sistema
RUN apk add --no-cache libc6-compat

# Instalar pnpm
RUN npm install -g pnpm

# Copiar arquivos de dependências
COPY package.json ./

# Instalar dependências
RUN pnpm install

# ====================================
# Stage 2: Development
# ====================================
FROM node:22-alpine AS development

WORKDIR /app

# Instalar dependências do sistema
RUN apk add --no-cache libc6-compat

# Instalar pnpm
RUN npm install -g pnpm

# Copiar package.json
COPY package.json ./

# Instalar dependências
RUN pnpm install

# Copiar código-fonte
COPY . .

# Desabilitar telemetria
ENV NEXT_TELEMETRY_DISABLED=1

# Expor porta
EXPOSE 3000

# Comando de desenvolvimento
CMD ["pnpm", "dev"]

# ====================================
# Stage 3: Builder
# ====================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar node_modules do stage anterior
COPY --from=deps /app/node_modules ./node_modules

# Copiar código-fonte
COPY . .

# Variáveis de ambiente de build
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Build da aplicação
RUN npm run build

# ====================================
# Stage 4: Runner (Production)
# ====================================
FROM node:22-alpine AS runner

WORKDIR /app

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copiar arquivos necessários
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Definir variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Mudar para usuário não-root
USER nextjs

# Expor porta
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Comando de produção
CMD ["node", "server.js"]
