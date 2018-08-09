(function() {
  'use strict';

  // 函数声明 会触发变量提升并且优先级最高
  // function Animal() {

  // }
  var Animal = function (name, age) {
    this.name = name
    this.age = age
    this.say = function() {
      console.log(`${this.name} ${this.age}`)
    }
    this.initFood = ['food1', 'food2', 'food3']
    this.eat = function() {
      // 吃一个少一个
      this.initFood.pop()
    }
  }
  // 在学习寄生组合式继承之前，先把这几种继承方式再熟悉一下
  // 原型链继承 小狗为例子
  const Dog = function(color) {
    this.color = color
    // 方法重写
    this.say = function() {
      console.log(`汪汪 我是 ${this.name || '我没名字'}`)
    }
    this.sayColor = function() {
      console.log(`${this.color} dog`)
    }
  }

  Dog.prototype = new Animal() // 完成原型链式继承
  Dog.prototype.constructor = Dog
  let dog1 = new Dog('red')
  let dog2 = new Dog('white')
  console.log(dog1) // true 共享吃方法
  /*
  dog1.say()
  dog1.eat()
  console.log(dog2.initFood) // ['food1', 'food2']
  // 至此，原型链继承的弊端已经完全体现出来。无法自定义向上（给所谓的父类构造函数）传值。引用类型共享导致数据问题
  */
  // 构造函数继承 用小狮子来做构造函数继承示例 暂时先注释上面的
  const Lion = function() {
    Animal.apply(this, arguments) // 通过apply/call 这种显示绑定this的手段，将当前的对象传入到Animal构造函数中。
    // 而且这样还可以手动传入参数，简直棒 
  }

  let lion1 = new Lion('xsz', 8)
  /*
  lion1.say()
  lion1.eat()
  console.log(lion1.initFood)
  */
  console.log(new Lion().initFood) // ["food1", "food2", "food3"]   
  // 到这里，原型链上两个很难受的问题都通过引入构造函数解决了。那是不是构造函数继承就很nice了呢？
  // 其实和创造对象一样。构造函数有一个无法避免的弊端就是每次调用它都会生成一个新的完整的副本，
  // 那么对应的，其中的引用类型由于没有指定的引用地址（匿名），所有都在堆内存中开辟一个新的内存来存放其引用内容
  // 对比37行代码：
  console.log(lion1.eat === new Lion().eat) // false 
  // 这种新开辟内存一定程度上解决了引用类型共享引起的数据问题，但也让无须令开辟内存的引用类型（比如方法）在每实例化一个对象都会令开辟一块内存。这有多差不言而喻
  // 这时候发现原型链继承和构造函数继承在一定程度上是互补的

  // 组合继承，JS完美模拟继承一代目 经过研究学习，造出大象类🐘，并改造了Animal类 -> GreetAnimal
  const GreetAnimal = function(name, age) {
    console.log('我被调用了')
    // 基础参数和初始化数据放在构造函数中
    this.name = name
    this.age = age
    this.initFood = ['food1', 'food2', 'food3']
  }

  // 使用创造对象时的思想，这些animal公有的方法都放在animal的原型对象中
  GreetAnimal.prototype.sayName = function() {
    console.log(`我叫${this.name}`)
  }

  GreetAnimal.prototype.eat = function() {
    // this.initFood.pop()
  }

  const Elephant = function() {
    GreetAnimal.apply(this, arguments)
  }

  Elephant.prototype = new GreetAnimal()
  Elephant.prototype.constructor = Elephant // 防止原型对象的构造函数丢失

  Elephant.prototype.drinkWater = function() {
    console.log(`use ${this.name} nose`)
  }

  let ele1 = new Elephant('小笨象', 8)
  let ele2 = new Elephant('大笨象', 18)

  console.log(ele1.eat === ele2.eat) // true
  console.log(ele1.drinkWater === ele2.drinkWater) // true
  ele1.eat()
  console.log(ele2.initFood) // ['food1', 'food2', 'food3']
  // 和预想的完全一致。基类具有自己的基础行为和基础数据，子类通用基础行为，也可以重写为自己的特殊行为
  // 却又单独复制出自己的一份基础数据。完美解决了构造函数和原型链的问题

  // 为什么称其为一代目？说明仍有欠缺

  // 在这需要再提醒自己一下，上面的所有的看似实例化对象的操作，无非是new操作符伪造的假象。其实都是执行了对应的方法，返回了一个对象罢了
  // 现在说组合继承有哪些缺陷？我们不妨在GreetAnimal中设置一个打印 67 被注释的打印
  // 把注释弄掉，打印了三次我被调用了。两次在创建大笨象和小笨象，还有一次是在原型链继承时的new GreetAnimal()
  // 不管怎么说，多执行的这一次函数调用都是我们不希望看到的，更糟糕的是因为这多执行的一次函数调用，使得Element的原型对象上多了name，age和initFood这些属性
  console.log(ele1) // ele1 中包含了name age initFood属性， 其原型对象上也有这些属性
  // 
  // 完美继承二代目   寄生组合继承
  // 在解决上吗这个问题之前，先把原型式继承和寄生式继承学习一下
  // ES5 使用Object.create() 方法规范了原型式继承
  // 原型继承
  /**
   * 定义一个自定义的原型对象protoObj
   */
  console.log('******** 原型式继承 *********')
  const protoObj = {
    name: 'wyh',
    age: 18
  }

  /**
   * 原型式继承demo
   * @param {*} obj 原型对象
   */
  function Prototypal(obj) {
    let F = function() {}
    F.prototype = obj
    return new F()
  }

  let sonObj = Prototypal(protoObj)
  console.log(sonObj) // 实现了从protoObj向下扩展到sonObj的原型链
  // 规范化 Object.create() 方法：
  let sonObj2 = Object.create(protoObj)
  console.log(sonObj2)
  // 但是，原型模式我认为不能被完全成为是继承。因为继承是面向类的，即使是伪造的类也要有个类的样子
  // 原型模式只是实现了父实例的copy操作和原型链的延伸操作，可是sonObj没有构造函数了（也就是没有一个抽象化的初始化对象的方法了）
})()