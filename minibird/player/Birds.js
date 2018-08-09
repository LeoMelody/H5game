import { Sprite } from "../base/Sprite.js";

// 小鸟
// 循环渲染3只小鸟（渲染图片的三个部分）
export class Birds extends Sprite{
  constructor() {
    const image = Sprite.getImage('birds')
    super(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height)    
  }
}