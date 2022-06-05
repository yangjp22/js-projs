class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    say() {
        console.log(`${this.name} is ${this.age} years old.`)
    }
}

class Chinese extends Person {
    constructor(name, age, color, language) {
        super(name, age)
        this.color = color
        this.language = language
    }
    say() {
        console.log(`${this.name} is ${this.age} years old, and speaks ${this.language}`)
    }
}
let p = new Person('Bob', 22)
// p.say()

let c = new Chinese('Xiao', 23, 'yellow', 'chinese')
c.say()