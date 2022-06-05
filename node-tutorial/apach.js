const fs = require('fs')
const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
    const filename = './template.html'
    fs.readFile(filename, (err, data) => {
        if (err) {
            res.end('No file')
        }

        
        fs.readdir('../learnNode', (err, files) => {
            let content = ``
            files.forEach(item => {
                content += `<li><a href="http://www.baidu.com">${item}</a></li>`
            })
            data = data.toString()
            data = data.replace('contents', content)
            res.end(data)
        })
  
    })
})

server.listen('3000', () => {
    console.log('successfully')
})
