// 变量缓存
export class DataStore {
  static getInstance() {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore()
    }
    return DataStore.instance
  }

  constructor() {
    this.map = new Map()
  }

  put(key, value) {
    if (typeof value === 'function') { // 如果传入的是类名（构造函数名称）
      value = new value() 
    }
    this.map.set(key, value)
    return this
  }

  get(key) {
    return this.map.get(key)
  }

  destroy() {
    for (let value of this.map.values()) {
      value = null
    } 
  }
}