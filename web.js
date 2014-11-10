// TWILIO AUTH
// Create a module here '/ignore_secrets/twilio_auth.js' (this directory will be ignored by git)
// Add this script to that file:
// var twilio_auth = {
// 	TWILIO_ACCOUNT_SID: "YOUR_TWILIO_ACCOUNT_SID",
// 	TWILIO_AUTH_TOKEN: "YOUR_TWILIO_AUTH_TOKEN"
// };
// module.exports.twilio_account_sid = function () {
//   return twilio_auth.TWILIO_ACCOUNT_SID
// };
// module.exports.twilio_auth_token = function () {
//   return twilio_auth.TWILIO_AUTH_TOKEN
// };
//
// Replace with your Twilio account SID and auth token
// Note: This module is not used in this project yet...
var client = require('twilio')( (require('./ignore_secrets/twilio_auth.js').twilio_account_sid()) , (require('./ignore_secrets/twilio_auth.js').twilio_auth_token()) );

var express = require('express');
var app = express();
var restler = require('restler');
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
// instruct the app to use the `bodyParser()` middleware for all routes
app.use(bodyParser());

// When the Reddit endpoint is POSTed, return top posts
app.post('/reddit', function(request, response) {
    restler.get('http://reddit.com/.json').on('complete', function(reddit) {
        var titles = "<Response><Sms>Top Five Reddit Posts:</Sms> ";
        for(var i=0; i<5; i++) {
            titles += "<Sms> • “" + reddit.data.children[i].data.title + "” (http://reddit.com" + reddit.data.children[i].data.permalink + ") </Sms>";
        }
        titles += "</Response>";
        response.send(titles);
    });
});

// When the form is submitted, send the message to the person listed
app.post('/', function(request, response) {
    var numbers = {
        'josh': '+15152973129',
        'matt': '+15152973129',
        'justin': '+15152973129'
    };

    var requestedNumber = request.body.friend;
    var number = numbers[requestedNumber];

    var results = sendTextToFriend(number, request.body.message, response);
});

/**
 * Send a text message to the chosen friend
 * @param  {string} number  Number of friend
 * @param  {string} message Message to send to friend
 * @return {void}
 */
var sendTextToFriend = function(number, message, response) {
    client.sendMessage({
        to: number,
        from: '+15155325531',
        body: message
    }, function(err, responseData) {
        if (!err) {
            console.log(responseData.from);
            console.log(responseData.body);

            response.send('Message sent.')
        } else {
            console.log(err);

            return false;
            response.send('An error occurred.');
        }
    });
};

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
})
