# Étape 1 : Construction de l'application
FROM node:20 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape 2 : Servir l'application avec Nginx
FROM nginx:1.21-alpine

# Copier le fichier de configuration Nginx personnalisé
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers construits par le build
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]