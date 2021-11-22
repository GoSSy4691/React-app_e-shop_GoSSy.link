FROM node:12.18.4-alpine
WORKDIR /opt/server/
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.19.2-alpine
EXPOSE 80
WORKDIR /opt/server/
COPY --from=0 /opt/server/build/ /var/www/static/
COPY ./default.conf /etc/nginx/conf.d/default.conf