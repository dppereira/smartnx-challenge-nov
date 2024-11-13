FROM node:23.1.0
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
RUN curl -sSL https://github.com/vishnubob/wait-for-it/releases/download/v2.3.0/wait-for-it.sh -o /usr/local/bin/wait-for-it && chmod +x /usr/local/bin/wait-for-it
COPY . .
RUN yarn build
RUN yarn cache clean
EXPOSE 8888
CMD ["wait-for-it", "database:5432", "--", "wait-for-it", "mongo:27017", "--", "yarn", "start"]
