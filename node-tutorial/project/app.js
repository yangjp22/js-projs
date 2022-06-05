const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')

// 创建 app
let app = express()

app.use('/public/', express.static('./public/'))

// 配置使用art-template模板引擎
// 第一个参数表示， 当渲染以.xxx结尾的文件时，使用art-template模板引擎
// express-art-template 是专门用来在Express中把art-template整合到Express中的。
// 虽然这里没有加载art-template， 但是express-art-template会自动加载art-template
app.engine('html', require('express-art-template'))

// Express 为Response 响应对象提供了一个方法：render
// render默认方法不可用，但是如果配置了模板引擎就可以使用
// res.render('html模板名', {模板数据})
// 第一个参数不能写路径，默认回去项目中的views目录查找该模板文件
// 也就是说Express有一个规定，开发人员将所有视图文件都放到views目录中
// 如果想更改文件路径,为newPath
// app.set('views', newPath)

comments = [{
    name: 'Bob',
    message: 'I love you',
    dateTime: '2019-09-12 12:23:34'
}, {
    name: 'Tom',
    message: 'Me too',
    dateTime: '2019-08-14 09:23:19'
}, {
    name: 'Jack',
    message: 'How are you',
    dateTime: '2019-06-17 09:04:45'
},{
    name: 'Linda',
    message: 'I am fine',
    dateTime: '2019-03-24 19:32:35'
}]

let formate = function (number) {
    return number < 10? '0' + number: '' + number
}

let formatDate = function () {
    var date = new Date()
    year = formate(date.getFullYear())
    month = formate(date.getMonth() + 1)
    day = formate(date.getDate())
    hour = formate(date.getHours())
    minute = formate(date.getMinutes())
    second = formate(date.getSeconds())
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
}

app.get('/', (req, res) => {
   res.render('index.html', {
       comments: comments,
   }) 
})

app.get('/post', (req, res) =>{
    res.render('post.html')
})


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.post('/comment', (req, res) => {
    //获取 post 请求体数据， res.query 只能拿get方法的参数
    var comment = req.body
    comment.dateTime = formatDate()
    comments.unshift(comment)
    // express 中封装了redirect函数
    res.redirect('/')
})


app.get('/comment', (req, res) => {
    // req.query 直接获取了参数，对象形式
    var comment = req.query
    comment.dateTime = formatDate()
    comments.unshift(comment)
    // express 中封装了redirect函数
    res.redirect('/')
})

app.get('/admin', (req, res) => {
    res.render('admin/admin.html', {
        title: 'Home Page'
    })
})

app.listen('3000', () => {
    console.log('I am listening...')
})