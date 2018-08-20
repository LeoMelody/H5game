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

    // console.log(Loader) // map(6)
    // 这里可以看到，在初始化资源加载器时，就已经把所有的资源标示在资源加载器loader中了
    // ？加载资源并将资源添加到dataStore中
    Loader.onLoaded(map => this.onResourceFirstLoaded(map)) // 这里的map代表的是资源加载器中的资源（map）

    this.dirctor = Director.getInstance() // 加载导演
  }

  onResourceFirstLoaded(map) {
    // console.log(map)
    this.dataStore.ctx = this.ctx
    this.dataStore.res = map
    this.init()
  }

  init() {
    // 思考？ 为什么要先把这些资源放入到dataStore中再去取出来，这种思想在平常开发中是否可以实践
    this.dataStore
        .put('background', BackGround)
        .put('birds', Birds)
        .put('land', Land)
    this.dirctor.run()
  }
}

export default Main