# Definición de imágen base para la compilación
FROM node:23.6.1-alpine3.20 as build-stage
# ARG MODE_ENV=prod

# Definición de carpeta de trabajo
WORKDIR /app

# Uso de git
RUN apk add --no-cache git

# Copiando package.json del proyecto al espacio de trabajo 
COPY package.json /app/package.json

# Limpieza e instalación de dependencias
RUN npm run reinstall

# Copiado de archivos del proyecto
COPY . .

# Construción de la distribución
RUN npm run build



# Definición de imágen base para el servicio
FROM node:23.6.1-alpine3.20 as production-stage

# Definición de carpeta de trabajo
WORKDIR /app

# Copiando distribución desde el contenedor de compilación
COPY --from=build-stage /app/dist /app/dist

# Moviendo archivos estáticos a subcarpeta situ-descargas-csr (revisar ubicación en ambiente dev)
RUN mkdir /app/dist/situ-descargas-csr
RUN mv /app/dist/assets /app/dist/situ-descargas-csr/assets
RUN mv /app/dist/api /app/dist/situ-descargas-csr/api

# Instalación de librería que genera el servicio
RUN npm install -g http-server

# Definición de puerto de salida
EXPOSE 8080

# Ejecución de servicion
CMD ["http-server", "dist","--proxy","http://0.0.0.0:8080?"]


## docker build -t situ-descargas-image-prod --build-arg MODE_ENV=prod .
## docker run -d -p 3000:8080 --name situ-descargas-container-prod situ-descargas-image-prod

## docker build -t situ-descargas-image-dev --build-arg MODE_ENV=dev .
## docker run -d -p 3001:8080 --name situ-descargas-container-dev situ-descargas-image-dev
