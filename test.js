const http = require("http");

const testTwitterReplyApi = () => {
  /* Play around with time interval to change traffic level */
  let i = 0;
  let resCount = 0;
  let intervalTime = 100;
  let totalTimeInExecution = 0;
  setInterval(() => {
    totalTimeInExecution += intervalTime;
    const options = {
      hostname: "localhost",
      port: 4000,
      path: `/reply/${i}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const postData = JSON.stringify({
      text: "Hello, Elon Musk",
    });

    const req = http.request(options, (res) => {
      res.on("data", (data) => {
        const responseData = JSON.parse(data);
        resCount += 1;
        console.log(`Successfully replied to tweet id: ${responseData.tweetId}`);
        console.log(`Total Response: ${resCount}`);
        console.log(`Total Time till now in execution in seconds: ${totalTimeInExecution/1000}`);
        console.log('----------------------------');
      });

      res.on("error", (error) => {});
    });
    req.on("error", (error) => {});
    req.write(postData);
    req.end();
    i++;
  }, intervalTime);
};

module.exports = {
  testTwitterReplyApi,
};
