#!/usr/bin/env bash
docker-machine create -d virtualbox --swarm --swarm-master --swarm-discovery token://f6e5bee0b7c9752ea484a057e55e517a host-1
docker-machine create -d virtualbox --swarm --swarm-discovery token://f6e5bee0b7c9752ea484a057e55e517a host-2
#eval "$(docker-machine env --swarm host-1)"