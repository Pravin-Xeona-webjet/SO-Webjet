ARG REGISTRY
FROM $REGISTRY/library/node:18-alpine AS builder

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .
RUN npm run test &&\
    npm run build

FROM $REGISTRY/webjet/web:1.0
COPY --from=builder /build /html
