import { ResourceLoader } from "./base/ResourceLoader.js";
import { Director } from "./base/Director.js";
import { BackGround } from "./runtime/BackGround.js";
import { DataStore } from "./base/DataStore.js";
import { Birds } from "./player/Birds.js";

// 主类
class Main {
  constructor() {
    this.canvas = document.querySelector('#canvas')
    this.ctx = this.canvas.getContext('2d')
    this.dataStore = DataStore.getInstance()
    const Loader = ResourceLoader.create()
    Loader.onLoaded(map => this.onResourceFirstLoaded(map))

    this.dirctor = Director.getInstance() // 加载导演

    // let img = new Image()
    // img.src = './res/background.png'
    // img.onload = () => {
    //   this.ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height)
    // }
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
    this.dirctor.run()
  }
}

export default Main