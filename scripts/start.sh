#!/bin/bash
cd /home/ec2-user/toyProject/client
npm install
cd ../
npm install
pm2 start ecosystem.config.js --env production