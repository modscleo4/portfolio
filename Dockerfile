FROM node:alpine AS build

WORKDIR /app

COPY . /app

RUN npm ci; \
    npm run build;

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
