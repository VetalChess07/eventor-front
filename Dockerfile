# ===== Stage 1: Build =====
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем только prod-зависимости (dev-зависимости нужны для сборки)
RUN npm install --include=dev

# Копируем исходники
COPY . .

# Аргументы для Vite
ARG VITE_HOST
ARG VITE_API_URL

# ENV переменные для сборки
ENV VITE_HOST=$VITE_HOST
ENV VITE_API_URL=$VITE_API_URL

# Сборка приложения
RUN npm run build

# ===== Stage 2: Production =====
FROM nginx:alpine

# Копируем сборку из builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем кастомный конфиг nginx (опционально)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Экспонируем порт
EXPOSE 80

# Стандартный запуск nginx
CMD ["nginx", "-g", "daemon off;"]
