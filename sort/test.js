import { bubbleSort } from "./bubbleSort.js";
import { selectionSort } from "./selectionSort.js";
import { insertionSort } from "./insertionSort.js";
import { mergeSort } from "./mergeSort.js";
import { quickSort } from "./quickSort.js";

const a = [8, 2, 3, 1, 7, 5, 9, 4, 6];

// console.log('冒泡排序：', bubbleSort(a));
// console.log('选择排序：', selectionSort(a));
// console.log('插入排序：', insertionSort(a));
// console.log('归并排序：', mergeSort(a));
console.log('快速排序：', quickSort(a));
