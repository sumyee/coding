// import _ from "lodash";
import printMe from './print.js';
import { cube } from './math.js';

import './styles/index.less';
import bgImg from './images/bg.png';

import moment from 'moment';
import 'moment/locale/zh-cn';

console.log(moment().endOf('millisecond').fromNow());

function component() {
  let element = document.createElement('div');

  // element.innerHTML = _.join(["Hello", "webpack"], " ");
  element.classList.add('hello');

  const bg = new Image();
  bg.src = bgImg;
  element.appendChild(bg);

  var btn = document.createElement('button');
  btn.innerHTML = '点击这里，然后查看 console！';
  btn.onclick = printMe;
  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());

console.log(process, process.env.NODE_ENV);

// if (module.hot) {
//   module.hot.accept("./print.js", function () {
//     console.log("Accepting the updated printMe module!");
//     printMe();
//   });
// }

const arr = [new Promise(() => {}), new Promise(() => {})];
arr.map((i) => {
  console.log('------ map -------', i);
});

const jiantou = () => {};

console.log(cube(1, 2));

// class
class A {
  constructor() {
    console.log('class A');
  }
  // a = 123
}

// request
function request() {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', '/api/user');

  xhr.onload = function() {
    console.log(xhr);
  };

  xhr.send();
}

request();
