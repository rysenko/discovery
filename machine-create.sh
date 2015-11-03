#!/usr/bin/env bash
SWARM_TOKEN=`docker run swarm create`
docker-machine create -d digitalocean --digitalocean-access-token=$DIGITALOCEAN_ACCESS_TOKEN --swarm --swarm-master --swarm-discovery token://$SWARM_TOKEN host-1
docker-machine create -d digitalocean --digitalocean-access-token=$DIGITALOCEAN_ACCESS_TOKEN --swarm --swarm-discovery token://$SWARM_TOKEN host-2