Function.prototype.bind2 = function (context = window, ...args) {
  
  const self = this

  // bind 返回一个新的函数
  return function newFn() {
    // 处理 new 情况
    if(this instanceof newFn) {
      return new self(...args, ...arguments)
    } else {
      return self.call(context, ...args, ...arguments)
      // or apply
      // return self.call(context, [...args, ...arguments])
    }
  }
}


function b() {
  console.log(this);
}

const o = {
  a: 666
}

const fn = b.bind(o)

console.log(fn);
console.log(fn());