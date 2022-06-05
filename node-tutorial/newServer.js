const http = require("http");
const ret = require('./fileRead')
console.log(ret.foo);

const server = http.createServer()

server.on('request', (req, res) => {
    // console.log(req.url);
    // console.log(req);
    // console.log(res);
    // res.write('hello');
    // res.write('bad');
    // res.end();

    if (req.url == '/') {
        res.write('index');
    } else if (req.url == '/login') {
        res.write('login');
    } else {
        res.write('register');
    }
    res.end();
});

server.listen(3000, () => {
    console.log('Listening');
});