#!/bin/bash

if [ $1 ]
then
    sudo docker build --build-arg FILENAME=$1 -t capital_gain_calculator .
else
    sudo docker build -t capital_gain_calculator .
fi
sudo docker run -it capital_gain_calculator /bin/bash
