import { DataStore } from "./DataStore.js";
import { UpPencil } from "../runtime/UpPencil.js";
import { DownPencil } from "../runtime/DownPencil.js";

// 导演类

export class Director {
  constructor() {
    // console.log('构造器初始化')
    this.dataStore = DataStore.getInstance() // 模拟单例
    // 基础变量配置
    this.moveSpeed = 2 
  }
  /**
   * javascript 单例模式
   * ?这里为什么要使用单例模式？因为导演，只能有一个。在一个程序中，为保证
   * 某个对象只能被实例化一次，就要使用这种单例模式
   */
  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director()
    }
    return Director.instance
  }

  /**
   * 创建铅笔方法
   */
  createPencil() {
    const minTop = window.innerHeight/8
    const maxTop = window.innerHeight/2
    // 随机高度
    const top = minTop + Math.random() * (maxTop - minTop)
    this.dataStore.get('pencils').push(new UpPencil(top))
    this.dataStore.get('pencils').push(new DownPencil(top))
  }

  run() {
    if (this.isOver) { // 如果over就结束
      cancelAnimationFrame(this.dataStore.get('timer'))
      this.dataStore.destroy() 
      return 
    } 
    this.dataStore.get('background').draw()
    // this.dataStore.get('birds').draw()
    const pencils = this.dataStore.get('pencils')
    // 销毁铅笔✏️
    pencils[0] && pencils[0].x + pencils[0].width <= 0 && pencils.splice(0,2)
    // 控制创建铅笔✏️
    pencils[0] && pencils[0].x <= (window.innerWidth - pencils[0].width)/2 && pencils.length === 2 && this.createPencil();
    pencils.forEach(element => {
      element.draw()
    });
    this.dataStore.get('land').draw() // land最后绘制使得陆地在最上方

    let timer = requestAnimationFrame(() => this.run())
    this.dataStore.put('timer', timer)
  }
}