import {
  DataStore
} from "./DataStore.js";

// 精灵类，初始化精灵加载的资源大小以及位置
export class Sprite {
  constructor(
    img = null,
    srcX = 0,
    srcY = 0,
    srcW = 0,
    srcH = 0,
    x = 0, y = 0,
    width = 0, height = 0) {
    this.dataStore = DataStore.getInstance()
    this.ctx = this.dataStore.ctx
    this.img = img
    this.srcX = srcX
    this.srcY = srcY
    this.srcW = srcW
    this.srcH = srcH
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
  /**
   * drawImage的参数详解
   * img 传入的Image对象
   * srcX 要裁减的起始X坐标
   * srcY 要裁减的起始Y坐标
   * srcW 要裁减的宽度
   * srcH 要裁减的高度
   * x 裁剪后放置的x坐标
   * y 裁剪后放置的y坐标
   * width 裁剪后要使用的宽度
   * height 裁剪后要使用的高度
   */
  draw(img = this.img,
    srcX = this.srcX, 
    srcY = this.srcY, 
    srcW = this.srcW, 
    srcH = this.srcH, 
    x = this.x, y = this.y, 
    width = this.width, height = this.height) {
    this.ctx.drawImage(
      img,
      srcX,
      srcY,
      srcW,
      srcH,
      x,
      y,
      width,
      height
    )
  }

  static getImage(key) {
    // TODO 这里考虑这个dataStore会不会没有
    return DataStore.getInstance().res.get(key)
  }
}