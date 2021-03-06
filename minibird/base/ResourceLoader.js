import { Resources } from "./Resources.js";

/**
 * 该类是为确保canvas在图片资源加载完成后再开始渲染
 */
export class ResourceLoader {
  constructor() {
    this.map = new Map(Resources)
    this.loadImg()
  }

  onLoaded(callback) {
    let loadCount = 0
    for (let value of this.map.values()) {
      value.onload = () => {
        loadCount++
        (loadCount >= this.map.size) && callback && callback(this.map)
      }
    }
  }

  loadImg() {
    for (let [key, val] of this.map) {
      const img = new Image()
      img.src = val
      this.map.set(key, img) 
    }
  }

  static create() {
    // 这里可能想要做成一个单例，也可能要做成根据实际场景来加载不同资源的loader
    return new ResourceLoader()    
  }
}