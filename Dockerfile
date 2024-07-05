# Utiliser une image de base officielle de Node.js
FROM node:20-alpine

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json du sous-répertoire 'app' dans le conteneur
COPY app/package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier tout le reste des fichiers du sous-répertoire 'app' dans le conteneur
COPY app .

# Construire l'application NestJS
RUN npm run build

# Exposer le port sur lequel l'application va écouter
EXPOSE 3000

# Définir la commande à exécuter lorsque le conteneur démarre
CMD ["npm", "run", "start:prod"]
