# nestjs-service/Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
CMD ["npm", "run", "start:dev"]
