# Frontend/Dockerfile

# 1. Basis-Image
FROM node:18-alpine

# 2. Arbeitsverzeichnis
WORKDIR /app

# 3. Abhängigkeiten kopieren und installieren
COPY my-expo-app/package.json my-expo-app/package-lock.json ./
RUN npm install

# 4. Projektdateien kopieren
COPY my-expo-app/ ./

# 5. Expo-Server starten
CMD ["npm", "start"]
