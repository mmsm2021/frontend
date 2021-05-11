FROM node:14-alpine
COPY app /app
WORKDIR /app
RUN npm install --production
CMD ["npm", "run", "start"]