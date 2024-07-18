#!/bin/bash

if [ $1 ]
then
    sudo docker build --build-arg FILENAME=$1 -t nubank_capital_gain .
else
    sudo docker build -t nubank_capital_gain .
fi
sudo docker run -it nubank_capital_gain /bin/bash