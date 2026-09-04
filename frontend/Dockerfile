# Stage 1: Cài đặt dependencies
FROM node:20-alpine AS deps
WORKDIR /app

RUN npm config set proxy http://10.17.42.9:8080 && \
    npm config set https-proxy http://10.17.42.9:8080

COPY package*.json ./
RUN npm ci

# Stage 2: Build mã nguồn
FROM node:20-alpine AS builder
WORKDIR /app

# Khai báo PATH để hệ thống nhận diện lệnh `next`
ENV PATH /app/node_modules/.bin:$PATH

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_PUBLIC_API_URL=http://backend:8080

# Build project
RUN npm run build

# Stage 3: Runner chạy production
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]