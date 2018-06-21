---
layout: post
title:  Easy Way to Debug Passport Authentication in Express
date:   2018-06-21 12:00

image: "/assets/easy-way-to-debug-passport-authentication-in-express-hero.png"

tags: [express, javascript, node, passport]
---

Today I've got for you a quick and easy way to debug your [Passport](http://www.passportjs.org) authentication in [Express](http://expressjs.com/)-based applications. The debugging technique described here will work with any Passport strategy.

For this post, I've created a site skeleton with [express-generator](https://expressjs.com/en/starter/generator.html) and I'll be using [passport-local](https://github.com/jaredhanson/passport-local) strategy as an example. The modified `app.js` file is available as the [debug-passport-express.js](https://gist.github.com/dmitryrogozhny/d1de5b89ecd90830985465e6f6dc85d5) gist.

## Problem
Imagine a situation:
- you've added Passport to your Express project;
- configured an authentication strategy;
- added a call to the Passport authentication to a route;
- now you try to authenticate a user by accessing the protected route.

The problem you might encounter is that Passport ends a request by returning an error code right away (400 Bad Request or 401 Not Authorized depending on a strategy you're using). It does not call the verification function that you've specified for a strategy.

And now you're stuck with no specific error message or an additional context on what went wrong. There might be a misconfiguration of the strategy or a problem with incoming request parameters, but it's hard to tell.

Here's how a code might look like in this situation. I'm providing only the Passport-related code here, you can check the full version in the [debug-passport-express.js](https://gist.github.com/dmitryrogozhny/d1de5b89ecd90830985465e6f6dc85d5) gist.

For authentication I'm expecting `POST` requests to the `/my-login` route with `username` and `password` values.

{% highlight javascript %}

// import passport and passport-local strategy
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// add local authentication strategy with a verification function
passport.use(new LocalStrategy(
  // your verification logic goes here
  // this test verification function always succeeds and returns a hard-coded user
  function (username, password, done) {
    console.log("Verification function called");
    return done(null, { username, id: "1" });
  }
));

// serialize user object
passport.serializeUser(function (user, done) {
  done(null, user);
});

// deserialize user object
passport.deserializeUser(function (user, done) {
  done(err, user);
});

// initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

// configure my-login route to authenticate using added "local" strategy
// if a user is logged in, send him back a message
app.post('/my-login',
  // call passport authentication passing the "local" strategy name
  // THIS CALL RESPONDS WITH 400 OR 401 STATUS WITH NO DETAILS
  passport.authenticate('local'),

  // function to call once successfully authenticated
  function (req, res) {
    res.status(200).send('logged in!');
  });

{% endhighlight %}

## Solution

The reason for the problem will depend on your specific case. The goal here is to get more information on what went wrong, so you can act accordingly.

The easy way to get an information on the error is to use a [custom callback](http://www.passportjs.org/docs/authenticate/#custom-callback) for the ```passport.authenticate('local')``` call. This works with any Passport strategy.

To use a custom callback you need to change the way you call the authentication function. Here's the before and after code for the `/my-login` route:

{% highlight javascript %}

// BEFORE
app.post('/my-login',
  // call passport authentication passing the "local" strategy name
  passport.authenticate('local'),

  // function to call once successfully authenticated
  function (req, res) {
    res.status(200).send('logged in!');
  });

// AFTER
app.post('/my-login',
  // wrap passport.authenticate call in a middleware function
  function (req, res, next) {
    // call passport authentication passing the "local" strategy name and a callback function
    passport.authenticate('local', function (error, user, info) {
      // this will execute in any case, even if a passport strategy will find an error
      // log everything to console
      console.log(error);
      console.log(user);
      console.log(info);

      if (error) {
        res.status(401).send(error);
      } else if (!user) {
        res.status(401).send(info);
      } else {
        next();
      }

      res.status(401).send(info);
    })(req, res);
  },

  // function to call once successfully authenticated
  function (req, res) {
    res.status(200).send('logged in!');
  });

{% endhighlight %}

Replace the `BEFORE` code part with the `AFTER` one and run the site once again. Now, if you'll try to authenticate it still won't work, but you'll see the reason of the problem in your console. This should give you an idea on what to do next.

**Important Note**: the `AFTER` version of the code is for debugging, and you should not use it in production. Switch back to a direct call after you're done with debugging or check [custom callback](http://www.passportjs.org/docs/authenticate/#custom-callback) documentation to get the missing parts in place.

The difference between these two versions is that I pass an additional callback function in the `AFTER` version. It will get executed in any case, whether it's a success or an error.

The callback receives three parameters: `error` might contain an error object, `user` will contain a user object that is specified by your verification function for a strategy, and `info` will contain an information about validation errors if any. By looking at these fields I can reason about problems with my code.

In the `AFTER` version, I do not call the `passport.authenticate` function directly, rather I wrap the call in the function that I pass to a route configuration. This way I have an access to request and response objects in my authentication code, so I can send a response to a client's request.

## Conclusion
Passport is a great package that makes working with authentication in Node.JS easier. When you start using Passport, you may encounter some problems with initial configuration.

Custom callbacks may help you to solve these problems. I hope this post will make working with Passport a bit easier.
