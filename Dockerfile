FROM  --platform=linux/amd64 node:23-slim
WORKDIR /usr/authapi
COPY package.json .
RUN npm i
RUN npm i pm2 -g 

EXPOSE 3008

COPY . .

CMD pm2-runtime process.json
