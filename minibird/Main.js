import { ResourceLoader } from "./base/ResourceLoader.js";

// 主类
class Main {
  constructor() {
    this.canvas = document.querySelector('#canvas')
    this.ctx = this.canvas.getContext('2d')
    const Loader = ResourceLoader.create()
    Loader.onLoaded(map => this.onResourceFirstLoaded(map))
  }

  onResourceFirstLoaded(map) {
    console.log(map)
  }
}

export default Main