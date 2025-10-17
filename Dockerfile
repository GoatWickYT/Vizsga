FROM node:20-bookworm

WORKDIR /usr/src/app

COPY server/package*.json ./
COPY server/tsconfig.json tsconfig.json 
COPY server/. .

RUN npm install
RUN npm run build

CMD ["npm", "start"]