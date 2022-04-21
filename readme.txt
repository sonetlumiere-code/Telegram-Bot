*****TELEGRAM BOT*****

1-git clone
2-npm install
3-set .env

TOKEN
|
|_BotFather
	|_/newbot	# get Bot TOKEN




CHAT_ID
|
|_`https://api.telegram.org/bot${TOKEN}/getUpdates`




SERVER_URL		# use https to set webhook, or NGROK (https://ngrok.com/)
|
NGROK
|
|_share port
|	|_ngrok terminal
|		|_ngrok http 4000	 # (app PORT=4000)
|
|_stop sharing port
	|_windows terminal
		|_taskkill /f /im ngrok.exe
