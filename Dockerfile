# Usar una imagen de Node.js como base
FROM node:14-alpine

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos generados de Angular
COPY dist/feedback-web-form .

# Instalar el servidor HTTP Simple para servir la aplicación
RUN npm install -g http-server

# Exponer el puerto
EXPOSE 8080

# Comando para iniciar el servidor HTTP Simple
CMD [ "http-server", "-p", "8080" ]