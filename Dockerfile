FROM node:18-alpine as builder

ENV NODE_ENV build

# USER node
WORKDIR /home/node

COPY package*.json ./
RUN  npm install --package-lock-only
RUN npm ci

COPY --chown=node:node . .
RUN npx prisma generate \
    && npm run build \
    && npm prune --omit=dev

# ---

FROM node:18-alpine

ENV NODE_ENV production
ENV DATABASE_URL="postgresql://postgres:GosWtbmbbhygAgeJvJOCewbjEspMCqca@monorail.proxy.rlwy.net:17271/railway"
ENV PORT=8080
ENV APP_ENV="production"

# USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/

CMD ["node", "dist/main.js"]