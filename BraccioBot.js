var Telegram = require('telegram-bot');
var tg = new Telegram(process.env.TELEGRAM_BOT_TOKEN);

var sentences = [], numSentences = 0;

var fs = require('fs');
var liner = require('./liner.js')
var source = fs.createReadStream('./frasi')
console.log("Loading sentences:");
source.pipe(liner);
liner.on('readable', function () {
      var line;
      while (line = liner.read()) {
              sentences.push(line); 
              console.log(sentences[numSentences]);
              numSentences++;
      }
 });

function randomInt (low, high) {
        return Math.floor(Math.random() * (high - low +1) + low);
}

tg.on('message', function(msg) {
  if (!msg.text) return;
  tg.sendMessage({
    text: sentences[randomInt(0,numSentences)],
    //reply_to_message_id: msg.message_id,
    chat_id: msg.chat.id
  });
});

tg.start();
console.log("started Carlo");
console.log("loaded: "+JSON.stringify(numSentences)+" sentences");
