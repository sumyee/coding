Function.prototype.call2 = function (context = window, ...args) {
  // 新增 Symbol 唯一属性值 防止覆盖原有属性
  const key = Symbol()
  context[key] = this
  const result = context[key](...args)
  delete context[key]
  return result
}

let cc = {
  a: 1
}

function demo(x1, x2) {
  console.log(typeof this, this.a, this)
  console.log(x1, x2)
}

demo.call2(cc, 2333, 6666)

console.log(demo.fn)