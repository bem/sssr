# Based on dockerfiles
# - https://github.com/nodejs/docker-node/blob/master/4.2/Dockerfile
# - https://github.com/nodejs/docker-node/blob/master/4.2/onbuild/Dockerfile

FROM node:4.2-slim

RUN apt-get update && apt-get install -y \
    python-software-properties \
    python \
    g++ \
    make \
    git \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /etc/yandex \
 && echo $YENV > /etc/yandex/environment.type

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN git init \
 && npm install --production=false --quiet \
 && npm run postinstall \
 && YENV=production npm run make \
 && npm prune --production \
 && rm -rf .git \
 && rm -rf /root/.cache/bower

CMD npm start
