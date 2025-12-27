# Stage 1: Build Angular app
FROM node:18-alpine AS build

WORKDIR /app

# Copy dependency files first (better caching)
COPY package*.json ./

# Harden npm against network issues
RUN npm config set fetch-retries 5 \
 && npm config set fetch-retry-mintimeout 20000 \
 && npm config set fetch-retry-maxtimeout 120000 \
 && npm ci --no-audit --no-fund --progress=false

# Copy the rest of the app
COPY . .

# Build Angular app
RUN npm run build --configuration=production

# Stage 2: Serve app with nginx
FROM nginx:alpine

COPY --from=build /app/dist/inventory-management-ui/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
