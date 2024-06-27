#!/bin/bash
#
sudo docker compose down
#
#
sudo docker image rm docker-elk-desenvolvimento-setup docker-elk-desenvolvimento-elasticsearch docker-elk-desenvolvimento-fleet-server docker-elk-desenvolvimento-kibana
#
sudo docker volume prune -f
#
sudo docker compose up -d
#



