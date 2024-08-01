# FROM node:16-alpine AS node
FROM node:18.12-alpine AS node

FROM nginx:1.18-alpine

COPY --from=node /usr/lib /usr/lib
COPY --from=node /usr/local/lib /usr/local/lib
COPY --from=node /usr/local/include /usr/local/include
COPY --from=node /usr/local/bin /usr/local/bin

# RUN npm install -g pnpm@latest-8 --force
RUN npm install -g pnpm --force

COPY ./ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

RUN pnpm install && pnpm build

RUN echo "#!/bin/sh" >> /init.sh &&\
    echo "mkdir /test" >> /init.sh &&\
    echo "cd /usr/share/nginx/html" >> /init.sh &&\
    echo "npx import-meta-env -x .env -p dist/index.html" >> /init.sh &&\
    echo "nginx -g 'daemon off;'" >> /init.sh &&\
    chmod +x /init.sh

CMD ["/init.sh"]

