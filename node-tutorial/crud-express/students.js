const fs = require('fs')
let dbPath = './db.json'

/**
 * 获取所有学生的列表
 * callback中的参数
 *  第一个参数是 err
 *      成功是 null, 错误是错误对象
 *  第二个参数是data
 *      成功是 数组， 错误是undefined
 */
// 获取所有学生的列表
exports.find = function(callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data).students)
    })
}

// 根据id查询学生
exports.findById = function(id, callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            callback(err)
        }
        let students = JSON.parse(data).students
        let student = students.find(item => parseInt(item.id) === parseInt(id))
        callback(null, student)
    })
}

// 保存新学生
exports.save = function(student, callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            return callback(err)
        }
        let students = JSON.parse(data).students
        if (students) {
            student.id = 1
        } else {
            student.id = students[students.length - 1].id + 1
        }
        students.push(student)
        let file = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, file, (err) => {
            if (err) {
                return callback(err)
            }
            // 成功就没错
            callback(null)
        })
    })
}

exports.updateById = function(student, callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            return callback(err)
        }
        let students = JSON.parse(data).students
        // ES6 中的数组方法： find
        // 需要接收一个函数作为参数
        // 当某一个遍历项符合条件，则会返回这个项(地址），并结束
        let stu = students.find((item) => parseInt(item.id) === parseInt(student.id))
        for (let key in student) {
            stu[key] = student[key]
        }

        let file = JSON.stringify({
            students
        })

        fs.writeFile(dbPath, file, (err) => {
            if (err) {
                return callback(err)
            }
            callback(null)
        })

    })
}

// 根据id删除数据
exports.deleteById = function(id, callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            return callback(err)
        }
        let students = JSON.parse(data).students
        // findIndex 方法专门用来根据条件返回下标
        let index = students.findIndex( item => parseInt(item.id) === id)
        students.splice(index, 1)
        let file = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, file, (err) => {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}