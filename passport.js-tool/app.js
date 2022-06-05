const express = require('express')
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

const mongoose = require('mongoose');
require('./models/user-model');

// 导入的时候，会运行一遍代码， 因此有Google Strategy
const passportSetup = require('./config/passport-setup');
const { Strategy } = require('passport');

const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')

const app = express();

// connect to online mongodb
var options = { 
    useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 30000, keepAlive: 300000
  };

const dbURI = process.env.PROD_MONGODB || keys.mongodb.dbURI
mongoose.connect(dbURI,  options , () => {
    console.log('Connected to mongodb: ' + dbURI)
})

// set a view engine
app.set('view engine', 'ejs')


// setting cookie session
// after serialize the user, will create a cookie and lasts for one day
// received by broswer
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // one day
    keys: [keys.session.cookieKey] // key of cookie
}))


// initialize passport
app.use(passport.initialize())
app.use(passport.session())

// use routers
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
    res.render('home', {user: req.user})
})

// app.listen(3000, () => {
//     console.log('I am listening...')
// })

app.listen(process.env.PORT || 3000, () => {
    console.log('I am listening...')
})