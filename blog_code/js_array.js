/**
 * Array.from()
 */

const arr1 = Array.from('seal');
console.log(arr1); // [ 's', 'e', 'a', 'l' ]

// 화살표 함수 사용
const arr2 = Array.from([1, 2, 3], (v) => v + v);
console.log(arr2); // [ 2, 4, 6 ]

// 구조분해 문법을 사용하여 생성할 수 있다. length, v: value
const arr3 = Array.from({ length: 5 }, (v) => 0)
console.log(arr3); // [ 0, 0, 0, 0, 0 ]

// v: value. i: index
const arr4 = Array.from({ length: 3 }, (v, i) => i)
console.log(arr4); // [ 0, 1, 2 ]

/**
 * Array.prototype.sort()
 */

const arr5 = [7, 3, 6, 4, 2, 8];
console.log(arr5.sort()); // 기본은 오름차순 : [ 2, 3, 4, 6, 7, 8 ] 

const arr6 = [7, 3, 6, 4, 2, 8].sort((v1, v2) => v1 - v2);
console.log(arr6); // [ 2, 3, 4, 6, 7, 8 ]

const arr7 = [1, 2, 3, 4, 5, 6, 7, 8].sort((v1, v2) => v1 - v2);
console.log(arr7); // [ 1, 2, 3, 4, 5, 6, 7, 8 ]