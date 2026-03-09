# build
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# serve
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Angular build output: dist/<project-name> (gyakori), ezért később ellenőrizzük.
# Most feltételezzük: dist/frontend
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
