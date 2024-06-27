#!/bin/bash
#
docker compose stop logstash
#
docker compose rm -f logstash
#
docker image rm docker-elk-main-logstash
#
docker compose create logstash
#
docker compose start logstash
