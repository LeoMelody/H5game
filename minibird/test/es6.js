/*
 * @Author: leo 
 * @Date: 2018-08-19 21:31:24 
 * @Last Modified by: leo
 * @Last Modified time: 2018-08-19 21:39:18
 * ES6 class
 */

class Animal {
  constructor(name = '', age = 0) {
    this.name = name
    this.age = age
  }

  /**
   * 希望共享，这些引用属性放在和constructor同级处
   */
  say() {
    console.log(`i am ${this.name} ${this.name} years old`)
  }
}

// 丑陋的语法，为了实现引用类型的共享只能这样
Animal.prototype.allfoods = [1,2,3]

class Cat extends Animal {
  constructor(name, age, legs) {
    // super相当于ES5的构造函数继承一样
    super(name, age)
    this.legs = legs
  }

  say() {
    console.log(`i am ${this.name} ${this.name} years old`)
    console.log(`${this.legs} legs`)
  }
}

console.log(new Animal())