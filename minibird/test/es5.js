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
    // console.log('我被调用了')
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
    this.initFood.pop()
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
  // 如果仅仅是为了copy对象，不需要构造函数的情况下，Object.create() 看起来是那么的美好

  // 寄生式继承 高程中的寄生继承例子不太明显，感觉和原型式继承没什么差别？
  // 在我实践之前，我一度认为寄生构造函数更像是继承
  // 这里我以寄生构造函数 实现 Ant类 
  function Ant() {
    let greetAnimal = new GreetAnimal(...arguments) // 将父类实例寄生在子类构造函数中
    greetAnimal.legs = 8
    return greetAnimal
  }

  let ant1 = new Ant('小蚂蚁', 9)
  ant1.eat()
  console.log(ant1)
  console.log(new Ant('my2', 18))
  // 但是，这其实已经不能算是继承了。这里我发现 Ant的实例 ant1 和 GreetAnimal的实例greetAnimal居然是同一级（或者说就是一个对象）
  // 这其实是对GreetAnimal的扩展

  // 那好，既然这样，我再换种方式：
  function createAnt() {
    let ant = new GreetAnimal(...arguments)
    function F() {}
    F.prototype = ant
    return new F()
  }

  let antson = createAnt('子类蚂蚁', 18)
  console.log(antson)
  // 这样也变相的实现了继承。antson的原型对象为 GreetAnimal的实例
  // 问题： 如果基础属性在antson上而不是其原型对象上 而且antson有一个真正的属于自己的构造函数就完美了


  // 寄生组合继承
  // 根据上面的这个需求，其实哪个F如果可以指定构造函数就很接近完美了，继续改造：
  // 这次以鱼Fish为例
  const Fish = function() {
    GreetAnimal.call(this, ...arguments) // 构造函数完成属性copy
    this.legs = 0
  }
  /**
   *这个方法是实现寄生组合继承的核心
   * @param {*} subType 子类构造函数
   * @param {*} superType 超类构造函数
   */
  function inheritProto(subType, superType) {
    // 伪造一个tmp的构造函数 目的只是利用其prototype属性来缓存父类prototype
    function F() {}
    // 缓存prototype。这一步真的是画龙点睛之笔。通过这个操作，F成为了和superType同一级（具有相同的原型对象）
    // 且非常干净的存在（没有多余的属性，因为它最开始就足够干净）
    F.prototype = superType.prototype
    // 此时，通过new操作符创造出的F实例，数据属性干净，方法由于是原型对象的属性，所以又可以共享，简直棒
    // 这个对象满足了在JS中作为一个原型对象（该有的有，该没有的没有）所需要的特质
    let prototype = new F()
    // 将这个对象变为子类的原型对象
    subType.prototype = prototype
    prototype.constructor = subType
  }

  inheritProto(Fish, GreetAnimal)

  let fish = new Fish('xy', 10) // JS中完美的继承方案
  console.log(fish instanceof GreetAnimal) // 完美的鱼类

  // 其实不完美，完美的话它就是人了。这里还是使用了较为粗糙的写法：
  // 开始进化：
  const FishMan = function() {
    GreetAnimal.call(this, ...arguments)
  }
  function inheritGreet(subType, superType) {

  }
})()