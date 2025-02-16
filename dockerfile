# Étape 1 : Construction de l'application avec Vite
FROM node:20 AS build
WORKDIR /usr/src/app

# Copier package.json et package-lock.json (ou yarn.lock) pour installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code source
COPY . .

# Construire l'application (utilise vite pour générer le dossier dist)
RUN npm run build

# Étape 2 : Servir l'application avec Nginx
FROM nginx:1.21-alpine

# Copier la configuration personnalisée de Nginx dans le conteneur
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers construits (dossier dist) dans le répertoire où Nginx cherche les fichiers
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
