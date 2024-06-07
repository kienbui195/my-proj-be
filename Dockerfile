FROM node:18-alpine3.17
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
ENV APP_KEYS=bV9RHhbil+5+J4dA5wwEYw==,xGT9ztAvltpk12UQB/o4sA==,zLq7CpnPdGfZh1SE31xvXQ==,Hx3jynV8RnAahuigiVw2pg==
ENV API_TOKEN_SALT=IaFEDkab1eVdpCuFskMshQ==
ENV ADMIN_JWT_SECRET=ft4kzK+Wqwo5ifncQfm7rg==
ENV TRANSFER_TOKEN_SALT=da8Z7MWr1NBZ2oKsuknwSw==
ENV JWT_SECRET=2fPrb89wr3ZbaeVxDyJTZA==
ENV DATABASE_CLIENT=sqlite
ENV DATABASE_FILENAME=.tmp/data.db
ENV JWT_SECRET=EDLlPbgVIjSeJCD8xjkBDg==
ENV ZENROWS_APIKEY=7fc428fe4359d3b1d63a8601d0014044ad1eb487
ENV SCRAPINGANT_APIKEY=f032425a34ef46528d4356981be50eb6

WORKDIR /opt/
COPY package.json ./
RUN npm install -g node-gyp
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm i
ENV PATH /opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . .
RUN chown -R node:node /opt/app
USER node
RUN ["yarn", "build"]
EXPOSE 1337
CMD ["yarn", "dev"]