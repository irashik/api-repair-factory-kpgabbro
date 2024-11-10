#!bin/bash
echo 'запуск API service nodejs with FeedbackService '

cd /opt/journal_of_repeat/api-repair-factory-kpgabbro/

echo $pwd

sudo -u dima npm run start:prod

#NODE_ENV=production node ./dist/main.js

