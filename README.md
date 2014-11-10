# Use the Twilio API

This is the example code for a SMS app that allows you to text a phone number or see a list of top posts on Reddit!

Try texting something to (515) 532-5531 to test it out! You will probably have to text it twice, because it's hosted on Heroku's free tier (and won't respond to the first text in time for Twilio to send you a response).

You can also send a text message by [visiting this site](https://lit-headland-1298.herokuapp.com/) in your browser.

## Developing

- Make sure you have [Heroku Toolbelt](https://toolbelt.heroku.com/) installed
- Create your `.env` file with your Twilio credentials per the instructions at the top of `web.js`
- Run `foreman start`

## Deploying

- Set up an account on [Twilio](http://twilio.com)
- Use the Web Geeks promo code (announced at the dojo)
- In this app directory, run `heroku create` to make a new Heroku app
- Set Heroku's config variables for your new app:

```sh
$ heroku config:set TWILIO_ACCOUNT_SID=YOUR_TWILIO_ACCOUNT_SID
$ heroku config:set TWILIO_AUTH_TOKEN=YOUR_TWILIO_AUTH_TOKEN
```

- Deploy to heroku:

```sh
$ git push heroku master
```

- After creating your first phone number on Twilio, set your Messaging endpoint to whatever your new Heroku app's address is (along with the Reddit endpoint):

```
http://your-heroku-app.herokuapp.com/reddit
```

## Resources

- [Twilio API](http://twilio.com/) -- an API that allows you to interact with phones with web-based development tools. We're going to use this API to power communication between your phone and your code.
- [Heroku](http://heroku.com/) -- a fast and easy way to host web apps.
