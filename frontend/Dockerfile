FROM node:16

COPY . /frontend

WORKDIR /frontend

RUN npm install

RUN rm -rf src

EXPOSE 3000

CMD npm start
