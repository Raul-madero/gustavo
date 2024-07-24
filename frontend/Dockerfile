# Usa una imagen base oficial de Node.js
FROM node:20

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Compila la aplicación
RUN npm run build

# Usa un servidor estático para servir la aplicación
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]