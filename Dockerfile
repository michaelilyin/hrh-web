FROM nginx:1.17.1-alpine

COPY /dist/hrh /usr/share/nginx/html
