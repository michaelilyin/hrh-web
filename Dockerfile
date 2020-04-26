FROM node:12

ADD /dist /opt/service/dist

WORKDIR /opt/service

EXPOSE 4000

#CMD [ "node", "/opt/service/dist/hrh/server/main.js" ]
CMD [ "node", "/opt/service/dist/hrh/simple-server/main.js" ]
