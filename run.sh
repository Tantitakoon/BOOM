npm run build
pm2 delete MobileDataPlan
pm2 start pm2-dev.json
pm2 log