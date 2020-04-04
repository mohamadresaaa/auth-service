FROM node:latest

RUN mkdir auth-service

ADD . /auth-service

WORKDIR /auth-service

RUN npm install

CMD ["npm", "run", "watch"]