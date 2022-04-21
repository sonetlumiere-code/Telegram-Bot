require('dotenv').config();
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TOKEN}`;
const URI = `/webhook/${process.env.TOKEN}`;
const WEBHOOK_URL = process.env.SERVER_URL + URI;


//send message
const sendMessage = async () => {
    let str = 'Hello World!'
    try {
        const messageSent = await axios.post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: process.env.CHAT_ID,
            text: `Bot message:\n${str}`
        });
        if (messageSent) console.log('message sent!');
    } catch (error) {
        console.log(error);
    }
}
//sendMessage();


//send image
const sendImage = async () => {
    let readStream = fs.createReadStream("./files/roma.jpg");
    let form = new FormData();
    form.append("chat_id", process.env.CHAT_ID);
    //form.append("photo", 'https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/vectors/term-bg-1-666de2d941529c25aa511dc18d727160.jpg');
    form.append("photo", readStream);
    form.append("caption", 'demo text');
    try {
        const imageSent = await axios.post(`${TELEGRAM_API}/sendPhoto`, form, { headers: { "Content-Type": "multipart/form-data; boundary=" + form._boundary }});
        if (imageSent) console.log('image sent!');
    } catch (error) {
        console.log(error);
    }
}
//sendImage();


//receive and repeat message
const app = express();
app.use(express.json());

const setWebHook = async () => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
    console.log('setWebHook:', res.data);
};
const removeWebHook = async () => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?remove=`);
    console.log('removeWebHook:', res.data);
}

app.post(URI, async (req, res) => {
    //console.log(req.body);
    if(req.body.message){
        const chatId = req.body.message.chat.id;
        if (req.body.message.text){
            try {
                const text = req.body.message.text;
                await axios.post(`${TELEGRAM_API}/sendMessage`, {
                    chat_id: chatId,
                    text: text
                });
            } catch (error) {
                console.log(error);
            }
        }
    }
    return res.send();
});

app.listen(process.env.PORT, async () => {
    console.log(`app running on port ${process.env.PORT}`);
    //await setWebHook();
    //await removeWebHook();
});