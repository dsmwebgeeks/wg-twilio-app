// TWILIO AUTH
// Create a file called `.env`
// Add the following lines to that file:
// TWILIO_ACCOUNT_SID=YOUR_TWILIO_ACCOUNT_SID
// TWILIO_AUTH_TOKEN=YOUR_TWILIO_AUTH_TOKEN
//
// Replace with your Twilio account SID and auth token
var client = require('twilio')( process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN );

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
