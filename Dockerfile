FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app/
EXPOSE 3000
ENV SKIP_PREFLIGHT_CHECK=true
RUN npm install -C /usr/src/app/client
RUN npm run build -C /usr/src/app/client
RUN npm install -C /usr/src/app
CMD [ "npm", "start" ]

