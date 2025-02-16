# Étape 1 : Construction de l'application
FROM node:20 AS build
WORKDIR /usr/src/app

# Copier les fichiers de configuration pour installer les dépendances
COPY package*.json ./
RUN npm install

# Copier tout le reste du code source
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2 : Servir l'application avec Nginx
FROM nginx:1.21-alpine

# Copier les fichiers de build générés depuis l'étape "build" dans l'image nginx
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Exposer le port 80 pour le serveur Nginx
EXPOSE 80

# Lancer Nginx en mode "daemon off"
CMD ["nginx", "-g", "daemon off;"]
