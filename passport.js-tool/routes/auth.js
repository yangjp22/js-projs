const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login', {user: req.user});
})

router.get('/logout', (req, res) => {
    // handler with passport
    // res.send('logging out...')
    req.logout();
    res.redirect('/')
})

// router.get('/google', (req, res) => {
//     // handler with passport
//     // res.send('logging in with google...')
// });

// auth with google, and handler with passport
// google is a strategy
router.get('/google', passport.authenticate('google', {
    // scope 是想从google拿到的哪些字段，放到一个数组中
    scope: ['profile']
    // scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

// callback route for google to redirect to
// the account information is in the url, like: code=4%2F0AY0e-g5_PCc0XNfeG69L-ER1dOzFP6XAJ4tQR8016MDotfnnTx67AmO5DbloDEYU9qNjHA&scope=profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile#
// and passport can access this information by req.user
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user);
    console.log('I am in auth google redirect')
    res.redirect('/profile/')
})

module.exports = router;

