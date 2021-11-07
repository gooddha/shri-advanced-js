module.exports = class {
  // реализация
  constructor(arr) {
    this._unique = this.filter(arr);
    this.size = this._unique.length;
  }

  filter(arr) {
    let values = {};
    arr.forEach(v => {
      if (!values[v]) {
        values[v] = v;
      }
    });
    return Object.values(values);
  }

  has(v) {
    return this._unique.includes(v);
  }

  add(v) {
    if (!this.has(v)) {
      this._unique.push(v)
      this.size++;
    }
    return this;
  }

  delete(v) {
    let i = this._unique.indexOf(v);
    if (i > -1) {
      this._unique = this._unique.slice(0, i).concat(this._unique.slice(i + 1));
      this.size--;
    }
  }

  clear() {
    this._unique = [];
    this.size = 0;
  }

  [Symbol.iterator]() {
    let i = 0;

    return {
      next: () => {
        if (i < this.size) {
          return {
            value: this._unique[i++],
            done: false
          }
        } else {
          return {
            done: true
          }
        }
      }
    }
  }

  get [Symbol.toStringTag]() {
    return '^_^'
  }

  *keys() {
    for (let i of this._unique) {
      yield i;
    }
  }

  *values() {
    for (let v of this._unique) {
      yield v;
    }
  }

  *entries() {
    for (let v of this._unique) {
      yield [v, v];
    }
  }

  forEach(callback, context) {
    this._unique.forEach(callback, context);
  }

}

//  MySet;

// // тесты
// const set = new MySet([4, 8, 15, 15, 16, 23, 42]);
// // // есть свойство size
// // console.log(set.size); // 6

// // хранит только уникальные значения
// // console.log([...set]); // [ 4, 8, 15, 16, 23, 42 ]


// // // работает в цикле for-of
// // for (const item of set) {
// //   console.log(item); // 4 8 15 16 23 42
// // }

// // есть методы keys, values, entries
// // for (const item of set.entries()) {
// //   console.log(item); // [ 4, 4 ] [ 8, 8 ] ...
// // }

// // есть метод clear
// set.clear();
// // console.log(set.size); // 0

// const object = {
//   getValue() { return this.value }
// }

// const data = {
//   value: 42
// }

// // есть метод add
// set.add(object);
// set.add(data);
// console.log(set)

// // который может работать в цепочке вызовов
// // set.add(100).add(22).add(99);
// // console.log(set)

// // есть метод delete
// set.delete(data);
// console.log(set)

// // есть метод has
// // console.log(set.has({})); // false
// // console.log(set.has(object)); // true
// // console.log(set.has(data)); // false

// // // и кое-что еще
// console.log(set === set.valueOf()) // true
// console.log(String(set)) // [object ^_^]
// console.log(Object.prototype.toString.call(set)) // [object ^_^]

// // // есть forEach, который делает какие-то странные вещи...
// set.forEach(function (item) {
//   console.log(item.getValue.call(this)); // 42
// }, data)