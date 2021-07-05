/**
 * Promise A+
 */
class Promise {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";

  constructor(executor) {
    this.status = Promise.PENDING;
    this.value = null;
    this.reason = null;

    this.self = this;

    this.callbacks = [];

    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  resolve(value) {
    if (this.status === Promise.PENDING) {
      this.status = Promise.FULFILLED;
      this.value = value;
      console.log(this.callbacks);
      setTimeout(() => {
        this.callbacks.forEach(cb => cb.onFulfilled(value));
      });
    }
  }

  reject(reason) {
    if (this.status === Promise.PENDING) {
      this.status = Promise.REJECTED;
      this.reason = reason;
      setTimeout(() => {
        this.callbacks.forEach(cb => cb.onRejected(reason));
      });
    }
  }

  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== "function") {
      // 解决 then 穿透
      onFulfilled = () => this.value;
    }
    if (typeof onRejected !== "function") {
      // 解决 then 穿透
      onRejected = () => this.value;
    }

    return new Promise((resolve, reject) => {
      // 有异步任务去改变状态时
      // 准备状态的时候，往callbacks里push后面要执行的方法
      if (this.status === Promise.PENDING) {
        this.callbacks.push({
          onFulfilled: value => {
            this.parse(onFulfilled(value), resolve, reject)
          },
          onRejected: reason => {
            try {
              const result = onRejected(reason);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          }
        });
      }

      if (this.status === Promise.FULFILLED) {
        setTimeout(() => {
          this.parse(onFulfilled(this.value), resolve, reject)
        });
      }

      if (this.status === Promise.REJECTED) {
        setTimeout(() => {
          this.parse(onRejected(this.reason), resolve, reject)
        });
      }
    });
  }

  catch(fn) {
    this.then(null, fn)
  }

  // try catch parse
  parse(result, resolve, reject) {
    try {
      // 处理 返回值为 Promise 的情况
      result instanceof Promise
        ? result.then(resolve, reject)
        : resolve(result);
    } catch (error) {
      reject(error);
    }
  }
}
