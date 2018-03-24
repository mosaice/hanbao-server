FROM mysql:5.7
COPY ./ORM/seeds/setup.sql /tmp
WORKDIR /tmp