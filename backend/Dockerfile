FROM node:21.6.1

WORKDIR /app

COPY package*.json ./

RUN npm install --cpu=arm64 --os=darwin sharp
RUN npm install
COPY . .
EXPOSE 5000

CMD ["npm", "start"]