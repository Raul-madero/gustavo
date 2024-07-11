# Usa una imagen base oficial de Python
FROM python:3.9-slim

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los requisitos y el código fuente
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .

# Expone el puerto usado por la aplicación
EXPOSE 5000

# Comando para correr la aplicación
CMD ["sh", "-c", "flask db upgrade && python app.py"]