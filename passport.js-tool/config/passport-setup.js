const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys')
const mongoose = require('mongoose');

const User = mongoose.model('user');

// const User = require('../models/user-model');

// 将对象的信息(id) => string (as a session)
// done is a callback function
passport.serializeUser((user, done) => {
    done(null, user.id)
})

// 由id 反序列化为user object
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    })
})

passport.use(
    new GoogleStrategy({
    // options for the google strategy for using google apis
    callbackURL: '/auth/google/redirect', // the url will be directed after user click 'Allow' button
    // callbackURL: 'https://fred-passport.herokuapp.com/auth/google/redirect',
    clientID: process.env.clientID || keys.google.clientID,
    clientSecret: process.env.clientSecret || keys.google.clientSecret,
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
    // accessToken: the token from google
    // refreshToken: accessToken will expire at some time
    // profile: the profile infor retrieved from google, setting: scope
    // done: when will call this function, callback function
    // passport callback function, after get the code, which contains user profile information
    console.log(profile)
    const existingUser = await User.findOne({ googleId: profile.id });

    if (existingUser) {
        return done(null, existingUser);
    }
        const user = await User({ googleId: profile.id, username: profile.displayName }).save()
        return done(null, user);
    }

    // User.findOne({googleId: profile.id}, (error, currentUser) => {
    //     if (currentUser) {
    //         console.log('user is: ', currentUser)
    //         done(null, currentUser)
    //     } else {
    //         new User({
    //             username: profile.displayName,
    //             googleId: profile.id
    //         }).save().then((newUser) => {
    //             // newUser is a mongodb object
    //             console.log('new user created: ' + newUser)
    //             done(null, newUser)
    //         });
    //     }
    // })
)
)