FROM node:14-alpine AS builder
COPY app /app
WORKDIR /app
RUN npm install --production && npm run build
FROM node:14-alpine
COPY --from=builder /app/build /app/build
WORKDIR /app
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "80"]