const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')

// 建立app实例
const app = express()

// 使用模板引擎
app.engine('html', require('express-art-template'))

// 使用静态文件
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

// 解析post数据
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// 使用路由， 静态文件和解析post数据必须在使用路由之前
app.use(router)

// 监听端口
app.listen('3000', () => {
    console.log('I am listening 3000...')
})