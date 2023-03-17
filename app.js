const express = require('express');
const { handleReplyTweets } = require('./middleware/twitter');
const { testTwitterReplyApi } = require('./test');
const app = express();
const PORT = 4000;
app.use(express.json());
app.post('/reply/:tweetId', handleReplyTweets);
app.listen(PORT, (error) => {
    if(!error){
        console.log("server running at PORT", PORT);
    }else{
        console.log("Error", error);
    }
})

app.listen(() => {
    testTwitterReplyApi();
})