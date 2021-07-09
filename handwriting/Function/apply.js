Function.prototype.apply2 = function (context = window, args) {
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

demo.apply2(cc, [2333, 6666])