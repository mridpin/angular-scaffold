# Angular
FROM node:16.13.0 as node
WORKDIR /usr/kenjo/webapp
RUN npm install -g @angular/cli
COPY package*.json ./
RUN npm ci
COPY . .
RUN ng build --configuration production
EXPOSE 80