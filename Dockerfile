FROM node:22-alpine AS builder

WORKDIR /home/appuser/app

COPY package.json ./

RUN npm install

VOLUME ["/home/appuser/app"]

EXPOSE 5173

CMD ["npm", "run", "dev", "--host"]
