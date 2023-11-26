FROM node:18

WORKDIR /src

COPY package.json package-lock.json ./

RUN npm i

COPY . ./

EXPOSE 5173

CMD ["npm","run","dev"]