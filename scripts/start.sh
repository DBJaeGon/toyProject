#!/bin/bash
source /home/ec2-user/.bash_profile
cd /home/ec2-user/toyProject/client
npm install
cd /home/ec2-user/toyProject
npm install
pm2 start /home/ec2-user/ecosystem.config.js --env production