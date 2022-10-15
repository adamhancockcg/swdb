FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
ENV VITE_API_URL "http://API_PLACEHOLDER"
COPY ./ .
RUN npm run build

FROM nginx as production-stage
ARG API_URL
ENV VITE_API_URL $API_URL
COPY entrypoint.sh /docker-entrypoint.d/21-fix-app.sh
RUN chmod +x /docker-entrypoint.d/21-fix-app.sh
RUN mkdir /app
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist /app
