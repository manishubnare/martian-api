const Bottleneck = require('bottleneck');


/**
 * Number of maxConcurrent req will get executed immediately, each request will take minTime to get execute
 * Each time a request is executed, a token is consumed from the reservoir, and the reservoir size will reduce accordingly
 * The reservoir will then slowly refill over time, allowing for more requests to be executed again in given reservoirIncreaseInterval
 */
const limiter = new Bottleneck({
    reservoir: 10,
    reservoirIncreaseAmount: 3,
    reservoirIncreaseInterval: 10 * 1000,
    maxConcurrent: 10,
    minTime: 500
});

const handleTwitterApiReq = async(tweetId, message) => {
    await limiter.schedule(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`twitter API res tweetId: ${tweetId}`);
                resolve('success');
            }, 2000) 
        })
    })
}

const handleReplyTweets = async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    const message = req.body.text;
    await handleTwitterApiReq(tweetId, message)
    return res.json({tweetId});
  } catch (error) {
    console.log('Handle reply tweets Error:',error);
  }
};

module.exports = {
  handleReplyTweets,
};
