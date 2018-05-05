var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const axios = require('axios')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded

app.set('port', (process.env.PORT || 3000))

app.get('/', function(req, res) {
  res.send('SuTestBot Server')
})

function sendMessage(chat_id, message){
  axios.post('https://api.telegram.org/bot567142465:AAFNg7-ddCEY-eT4Z0RP0zVRZ5-2cyXG_Xo/sendMessage', {
    chat_id: chat_id,
    text: message
  })
  .then(response => {
    // We get here if the message was successfully posted
    console.log('Message posted')
    //return {'status': 'ok'}
  })
  .catch(err => {
    // ...and here if it was not
    console.log('Error :', err)
    //return {'status': 'err', 'msg': err}
  })
}

//This is the route the API will call
app.post('/new-message', function(req, res) {
  const {message} = req.body

  //console.log(message)

  if(!message || !message.text){
    return res.end()
  }

  if(message.text.toLowerCase() == '/help' || message.text.toLowerCase() == '/start'){
    sendMessage(message.chat.id, 'Hey ' + message.from.first_name + '!! I am an Echo Bot')
  }else{
    sendMessage(message.chat.id, message.text)
  }

  res.end('ok')

});

// Finally, start our server
app.listen(app.get('port'), function() {
  console.log('Telegram app listening on port ' + app.get('port') + '!');
});