#!/bin/sh
for i in `seq 1 50`
do
  pm2 --name "Woris-runner-$i" start index.js
done