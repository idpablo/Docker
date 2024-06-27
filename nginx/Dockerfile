FROM ubuntu:latest

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       build-essential \
       curl \
       wget \
       tar \
       libpcre3 \
       libpcre3-dev \
       zlib1g \
       zlib1g-dev \
       openssl \
       libssl-dev

WORKDIR /tmp

COPY ./nginx-1.24.0.tar.gz /tmp/
COPY ./nginx-module-vts-0.2.2.tar.gz /tmp/

RUN tar -zxvf nginx-1.24.0.tar.gz \
    && tar -zxvf nginx-module-vts-0.2.2.tar.gz

WORKDIR /tmp/nginx-1.24.0
RUN ./configure --add-module=/tmp/nginx-module-vts-0.2.2 \
    && make \
    && make install

RUN apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /tmp/*

RUN rm -rf /etc/nginx/conf.d/*

COPY ./conf.d/sonar.nginx.conf /etc/nginx/conf.d/sonar.nginx.conf 
COPY ./nginx.conf /etc/nginx/nginx.conf 

EXPOSE 80
EXPOSE 443

CMD ["/usr/local/nginx/sbin/nginx", "-g", "daemon off;"]
