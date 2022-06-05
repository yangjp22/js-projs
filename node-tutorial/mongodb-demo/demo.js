const mongo = require("mongoose")

mongo.connect('mongodb://localhost/test', {useMongoClient: true})
mongo.Promise = global.Promise

let Cat = mongo.model('Cat', {name: String})

let cat1 = new Cat({name: 'kitty'})

cat1.save(err => {
    if (err) {
        console.log('Error...')
    } else {
        console.log("Success...")
    }
})