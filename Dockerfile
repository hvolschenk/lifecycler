FROM node:erbium-alpine

ENV HOME /home/node/app

WORKDIR $HOME

VOLUME [$HOME]

RUN chown -R node:node $HOME
USER node
