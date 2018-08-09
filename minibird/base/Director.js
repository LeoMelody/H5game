import { DataStore } from "./DataStore.js";

// 导演类

export class Director {
  constructor() {
    console.log('构造器初始化')
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

  run() {
    this.dataStore = DataStore.getInstance()
    const backgroundSprite = this.dataStore.get('background')
    backgroundSprite.draw()
    const birdsSprite = this.dataStore.get('birds')
    birdsSprite.draw()
  }
}