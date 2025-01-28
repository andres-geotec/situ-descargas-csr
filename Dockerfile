FROM node:23.6.1-alpine3.20 as build-stage
# ARG MODE_ENV=prod

WORKDIR /app

RUN apk add --no-cache git

COPY package.json /app/package.json

#RUN npm cache clean --force
RUN npm run reinstall
COPY . .
RUN npm run build



FROM node:23.6.1-alpine3.20 as production-stage
WORKDIR /app

COPY --from=build-stage /app/dist /app/dist
RUN mkdir /app/dist/situ-descargas-csr
RUN mv /app/dist/assets /app/dist/situ-descargas-csr/assets
RUN mv /app/dist/api /app/dist/situ-descargas-csr/api
RUN npm install -g http-server

EXPOSE 8080
CMD ["http-server", "dist","--proxy","http://0.0.0.0:8080?"]


## docker build -t situ-descargas-image-prod --build-arg MODE_ENV=prod .
## docker run -d -p 3000:8080 --name situ-descargas-container-prod situ-descargas-image-prod

## docker build -t situ-descargas-image-dev --build-arg MODE_ENV=dev .
## docker run -d -p 3001:8080 --name situ-descargas-container-dev situ-descargas-image-dev
