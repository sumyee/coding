/**
 * 链表
 */
import { defaultEquals } from '../utils/index.js'
import { Node } from '../models/linked-list-models.js'

export default class LinkedList {
  constructor(equalsFn = defaultEquals) {
    // 链表元素数量
    this.count = 0
    // 链表头
    this.head = undefined
    this.equalsFn = equalsFn
  }

  // push
  push(element) {
    const node = new Node(element)
    let current = this.head

    if (this.head == null) {
      this.head = node
    } else {
      current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = node
    }

    this.count++
  }

  // removeAt
  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head
      if (index === 0) {
        this.head = current.next
      } else {
        const previous = this.getElementAt(index - 1)
        current = previous.next
        previous.next = current.next
      }
      this.count--
      return current.element
    }
    return undefined
  }

  // insert
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element)
      if (index === 0) {
        const current = this.head
        node.next = current
        this.head = node
      }
    }
    return false
  }
  // indexOf
  indexOf(element) {
    let currrnt = this.head
    for (let i = 0; i < this.count && currrnt != null; i++) {
      if (this.equalsFn(element, currrnt.element)) {
        return i
      }
      currrnt = currrnt.next
    }
    return -1
  }

  // remove
  remove(element) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }

  // size
  size() {
    return this.count
  }

  // isEmpty
  isEmpty() {
    return this.size === 0
  }

  // getHead
  getHead() {
    return this.head
  }

  // getElementAt
  getElementAt(index) {
    if (index >=0 && index < this.count) {
      let node = this.head
      for (let i = 0; i < index && node != null; i++) {
        node = node.next
      }
      return node
    }
    return undefined
  }
}

const list = new LinkedList()
list.push(1)
list.push(2)
list.push(3)
list.remove(2)
console.log(list)