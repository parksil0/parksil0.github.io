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
 * Array.sort()
 */

const arr5 = [7, 3, 6, 4, 2, 8];
console.log(arr5.sort()); // 기본은 오름차순 : [ 2, 3, 4, 6, 7, 8 ] 

const arr6 = [7, 3, 6, 4, 2, 8].sort((v1, v2) => v1 - v2);
console.log(arr6); // [ 2, 3, 4, 6, 7, 8 ]

const arr7 = [1, 2, 3, 4, 5, 6, 7, 8].sort((v1, v2) => v1 - v2);
console.log(arr7); // [ 1, 2, 3, 4, 5, 6, 7, 8 ]

/**
 * Array.filter()
 * 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환한다.
 * filter()는 호출되는 배열을 변화시키지(mutate) 않는다.
 */

const arr8 = ['dog', 'lion', 'tiger', 'cat', 'rabbit'].filter((name) => name.length > 3);
console.log(arr8); // [ 'lion', 'tiger', 'rabbit' ]

function searchKeyword(arr, keyword) {
  return arr.filter((item) => item.toLowerCase().indexOf(keyword) > -1);
}

console.log(searchKeyword(['seal', 'sil', 'park'], 's')); // [ 'seal', 'sil' ]

function greaterThanFive(item) {
  return item > 5
}

const arr9 = [6, 4, 2, 8, 5, 1, 3].filter(greaterThanFive);
console.log(arr9); // [ 6, 8 ]

/**
 * Array.forEach()
 * 주어진 함수를 배열 요소 각각에 대해 실행한다.
 * 또한 리턴값이 없고, 배열을 변형하지도 않는다.
 * forEach()는 조기에 종료가 불가능하다.
 */

let myName = '';
['S', 'e', 'a', 'l', ' ', 'P', 'a', 'r', 'k'].forEach((item) => {
  myName += item;
});

console.log(myName);

let arr10 = [];

// 2차원 배열을 forEach() 메소드로 접근하는 방법.
[[1, 2], [3, 4], [5, 6]].forEach((arr) => {
  arr.forEach((item) => {
    arr10.push(item ** 2);
  })
});

console.log(arr10);

/**
 * Array.indexOf()
 * 메서드에서 지정된 요소(index)를 찾는다.
 * 존재하면 인덱스 번호를, 존재하지 않는다면 -1를 리턴한다.
 * 발견된 가장 최초의 인덱스 번호를 리턴한다.
 */

const arr11 = [7, 4, 3, 1, 2, 6, 3, 7, 2, 7, 1, 7];

// 메서드 인자로 값을 입력하면 해당 값이 위치한 인덱스를 리턴한다.
console.log(arr11.indexOf(4)); // 1

// 두 번째 인자는 시작하려는 인덱스 번호이다.
console.log(arr11.indexOf(7, 1));

// indexOf() 메서드는 최초의 인덱스만 리턴하기 때문에, 찾으려는 인덱스가 최소 두 개 이상이라면 아래와 같은 로직을 사용해보는 것도 고민할 수 있다.
let arr12 = [];
const findIndex = 7;
let index = arr11.indexOf(findIndex);

while(index !== -1) {
  arr12.push(index);
  index = arr11.indexOf(findIndex, index+1);
}

console.log(arr12);

