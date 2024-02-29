
FROM node:18-alpine3.16
WORKDIR /nextD

COPY package.json  .

# ARG DATABASE_URL=file:./dev.db
RUN yarn install

COPY . .
RUN yarn build
# EXPOSE 8080
CMD ["yarn", "start"]