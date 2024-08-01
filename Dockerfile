# FROM node:16-alpine AS node
FROM node:18.12-alpine AS node


RUN npm install -g pnpm --force



RUN pnpm install && pnpm build


