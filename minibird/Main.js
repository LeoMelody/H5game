import { ResourceLoader } from "./base/ResourceLoader.js";
import { Director } from "./base/Director.js";
import { BackGround } from "./runtime/BackGround.js";
import { DataStore } from "./base/DataStore.js";
import { Birds } from "./player/Birds.js";
import { Land } from "./runtime/Land.js";

// 主类
class Main {
  constructor() {
    // 获取canvas以及canvas上下文
    this.canvas = document.querySelector('#canvas')
    this.ctx = this.canvas.getContext('2d')
    // 初始化dataStore
    this.dataStore = DataStore.getInstance()
    // 初始化资源加载器
    const Loader = ResourceLoader.create()
    this.director = Director.getInstance() // 加载导演
    // console.log(Loader) // map(6)
    // 这里可以看到，在初始化资源加载器时，就已经把所有的资源标示在资源加载器loader中了
    // ？加载资源并将资源添加到dataStore中
    Loader.onLoaded(map => this.onResourceFirstLoaded(map)) // 这里的map代表的是资源加载器中的资源（map）
    // 保证所有资源到位之后，导演开始
  }

  onResourceFirstLoaded(map) {
    // console.log(map)
    this.dataStore.ctx = this.ctx
    this.dataStore.res = map
    this.init()
  }

  init() {
    // 初始化Game状态
    this.director.isOver = false
    // 思考？ 为什么要先把这些资源放入到dataStore中再去取出来，这种思想在平常开发中是否可以实践?又有哪些优势呢？
    this.dataStore
        .put('background', BackGround)
        .put('birds', Birds)
        .put('land', Land)
        .put('pencils', [])
        // 初始化先创建一组铅笔
    this.director.createPencil()
    // let timer = setInterval(() => {
    //   this.director.createPencil()
    //   // 6为可配置元素
    //   if (this.dataStore.get('pencils').length > 6) {
    //     this.dataStore.get('pencils').splice(0,2)
    //   }
    // }, 1500)
    // this.dataStore.put('pencilTimer', timer)
    this.director.run()
  }
}

export default Main