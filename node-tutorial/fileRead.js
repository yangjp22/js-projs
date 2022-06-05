const fs = require('fs');

fs.readFile('./data1.txt', (error, data) => {
    // console.log(data.toString());
    console.log(error);
})

module.exports = {
    foo: 'name',
}