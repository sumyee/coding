/**
 * 节流
 * 持续触发事件，每隔一段时间，只执行一次事件。
 * @param {*} func
 * @param {*} wait
 * @param {*} immediate
 */
function throttle(func, wait, immediate) {
  let previous = 0;

  return function () {
    const context = this;
    const args = arguments;

    const now = Date.now();

    if (now - previous > wait) {
      previous = now;
      func.apply(context, args);
    }
  };
}

// 定时器
// function throttle(func, wait) {
//   let timer;

//   return function () {
//     const context = this;
//     const args = arguments;

//     if(!timer) {
//       timer = setTimeout(() => {
//         timer = null;
//         func.apply(context, args);
//       }, wait);
//     }
//   };
// }

const fn = (a) => {
  console.log(a);
}

const th = throttle(fn, 10000)
th(2333333)