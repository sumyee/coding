/**
 * 发布-订阅 模式
 */
class Event {
  constructor() {
    this.clientListMap = {};
  }

  /**
   * 订阅
   * @param {*} type 事件名
   * @param {*} fn 自定义函数
   */
  on(type, fn) {
    if (!(type in this.clientListMap)) {
      this.clientListMap[type] = [];
    }
    this.clientListMap[type].push(fn);
  }

  // once(type, fn) {

  // }

  /**
   * 发布
   * @param {*} type 事件名
   * @param {*} params 参数
   */
  emit(type, params) {
    const fns = this.clientListMap[type];

    if (!fns || !fns.length) return false;

    fns.forEach(fn => {
      fn(params);
    });
  }

  /**
   * 取消订阅
   * @param {*} type 事件名
   * @param {*} fn 需要取消的自定义函数
   * @returns 
   */
  off(type, fn) {
    const fns = this.clientListMap[type];
    if (!fns) {
      return false;
    }
    if (!fn) {
      delete this.clientListMap[type];
    } else {
      for (let i = 0; i < fns.length; i++) {
        if (fn === fns[i]) {
          fns.splice(i, 1);
        }
      }
    }
  }
}

// export default new Event();

const evt = new Event();

function fn1(params) {
  console.log("on1: ", params);
}
function fn2(params) {
  console.log("on2: ", params);
}

evt.on("listen", fn1);
evt.on("listen", fn2);
console.log('订阅...');

evt.off("listen", fn1);

setTimeout(() => {
  evt.emit("listen", 233333);
}, 2000);
