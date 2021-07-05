import _ from "lodash";
import printMe from "./print.js";
import { cube } from './math.js';

import "./styles/index.css";
import bgImg from "./images/bg.png";

function component() {
  let element = document.createElement("div");

  element.innerHTML = _.join(["Hello", "webpack"], " ");
  element.classList.add("hello");

  const bg = new Image();
  bg.src = bgImg;
  element.appendChild(bg);

  var btn = document.createElement("button");
  btn.innerHTML = "点击这里，然后查看 console！";
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

const arr = [
  new Promise(() => {}),
  new Promise(() => {})
]
arr.map((i) => {
  console.log(i);
})

console.log(cube(1,2));