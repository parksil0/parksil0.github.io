/**
 * 자료 출처
 * https://www.zerocho.com/category/Javascript/post/5740531574288ebc5f2ba97e
 * https://ko.javascript.info/closure
 */

/**
 * 1. 전역변수와 지역변수
 * 전역변수 name과 지역 스코프 내에 동일한 name이라는 변수를 선언 했을 때의 결과 확인 
 */

var name = 'Seal';

function changeName() {
  var name = 'Slias';
  name = "Sil";
  console.log(name); // Sil
}

changeName();
console.log(name); // Seal

/**
 * 2. 지역 스코프에서 전역변수 변경
 * 지역 스코프 내에서 전역변수를 선언하는 게 아니라 변경을 했을 때 결과 확인
 */

var name2 = 'Seal';

function changeName2() {
  name2 = "Sil";
  console.log(name2); // Sil
}

changeName2();
console.log(name2); // Sil

/**
 * 3. 지역변수 호출 시 
 * 전역 변수 없이 지역 스코프 내에 name3 변수를 생성하고 전역 스코프에서 name 변수를 호출했을 때 결과 확인
 */

function changeName() {
  var name3 = 'Slias';
  name3 = "Sil";
  console.log(name3); // Sil
}

changeName();
// console.log(name3); // Uncaught ReferenceError: name3 is not defined


/**
 * lexical environment ( 렉시컬 환경 )
 */

// 함수 선언문으로 선언한 함수는 렉시컬 환경이 만들어지는 즉시 사용할 수 있다.
isExecute()

function isExecute() { // 함수 선언문으로 선언한 함수
  console.log("yes!");
}

// 하지만 함수 표현식 (function expression)은 해당하지 않는다.
// isExecute2() // Cannot access 'isExecute2' before initialization

let isExecute2 = function() { // 함수 표현식으로 선언한 함수
  console.log("noooooooop!");
}

// 매개변수또한 포함되어도 동일하게 사용이 가능하다.
greeting("Seal")

function greeting(name) {
  console.log(`hi ! ${name}!`);
}

/**
 * 내부와 외부 렉시컬 환경
 * 
 * 코드에서 변수에 접근할 땐, 먼저 내부 렉시컬 환경을 검색 범위로 잡는다. 
 * 내부 렉시컬 환경에서 원하는 변수를 찾지 못하면 검색 범위를 내부 렉시컬 환경이 참조하는 외부 렉시컬 환경으로 확장한다. 
 * 이 과정은 검색 범위가 전역 렉시컬 환경으로 확장될 때까지 반복된다.
 */

let helloStr = "hello"

function sayHello(name) {
  console.log(`${helloStr} ${name}!`);
}

sayHello("Slias")

/**
 * 아래는 외부 렉시컬 환경에서 값을 가져오지 않고, 블럭 내의 에러를 던진다.
 * 변수가 일시적으로 사용할 수 없는 영역(코드 블록 시작부터 let까지)을 "데드 존(dead zone)"이라고도 한다.
 * */ 

let x = 1;

function func() {
  console.log(x); // ReferenceError: Cannot access 'x' before initialization
  let x = 2;
}

func();