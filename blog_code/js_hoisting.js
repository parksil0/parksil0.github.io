/**
 * var는 블록 스코프가 없다.
 * var로 선언한 변수의 스코프는 함수 스코프이거나 전역 스코프이며,
 * 블록 기준으로 스코프가 생기지 않기 때문에 블록 밖에서 접근이 가능하다.
 */

// 조건문일 때
if(true) {
  var name = 'Seal';
}

console.log(name); // Seal

// 반복문일 때
for (var i = 0; i < 10; i++) {
  // ...
}

console.log(i); // 10

/**
 * 코드 블록이 함수 안에 있다면, var는 함수 레벨 변수가 된다.
 * 함수 내에 선언이 되었다면, 함수 내의 최상위에 선언된다.
 * 하지만 함수의 범위에 벗어나면, 사용할 수 없다.
 */

function printMyName() {
  if (true) {
    var myName = "Slias";
  }

  console.log(myName); // Slias
}

printMyName();
console.log(myName); // Error: myName is not defined

/**
 * 선언하기 전에 사용이 가능한 var
 * var 선언은 함수가 시작될 때 처리되며, 전역에서 선언한 변수라면 스크립트가 시작될 때 처리된다
 * 함수 본문 내에서 var로 선언한 변수는 선언 위치와 상관없이 함수 본문이 시작되는 지점에서 정의된다(단, 변수가 중첩 함수 내에서 정의되지 않아야 이 규칙이 적용된다).
 */

function greeting() {
  hello = "Hello!";

  console.log(hello);

  var hello;
}
greeting(); // Hello!

// 위의 예제는 아래의 예제와 동일하게 동작한다.

function greeting2() {
  var hello2;

  hello2 = "Hello!2";

  console.log(hello2);
}
greeting2(); // Hello!2

/**
 * 이렇게 변수가 끌어올려 지는 현상을 '호이스팅(hoisting)'이라고 부른다. 
 * var로 선언한 모든 변수는 함수의 최상위로 ‘끌어 올려지기(hoisted)’ 때문이다.
 * 또한 선언은 호이스팅이 되지만 할당은 호이스팅 되지 않는다. 그렇기 때문에 선언과 동시에 할당하는 경우에는 결과가 달라질 수 있다.
 */

function printAge() {
  console.log(myAge);

  var myAge = 28;
}

printAge(); // undefined

/**
 * 선언과 동시에 할당하는 경우에는 두 가지 일이 일어난다.
 * 1. 변수 선언(var), 2. 변수에 값을 할당(=)
 * 변수 선언은 함수 실행이 시작될 때 처리되지만(호이스팅) 할당은 호이스팅 되지 않기 때문에 코드가 있는 라인에서 할당된다. 
 * 따라서 위 예제의 콘솔창에는 undefined가 출력된다.
 */

/**
 * 함수의 호이스팅
 * 함수의 선언 역시 호이스팅의 대상이다. 스코프 내의 어떤 위치에서 함수 선언을 하든지 호출할 수 있다.
 * 그러므로 아래의 함수 printMyFavoriteFood()을 먼저 호출하고 함수 정의를 이후에 하여도 정상적으로 동작하게 된다.
 */

printMyFavoriteFood(); // donkatsu

function printMyFavoriteFood() {
  console.log('donkatsu');
}

/**
 * 자바스크립트에서 함수 선언은 크게 두 가지 방법이 있다. 함수 선언식과 함수 표현식.
 * 함수 선언식, 함수 표현식
 */

// 함수 선언식
function foo() {
  //...
}

// 함수 표현식
var bar = function() {}

/**
 * 함수 호이스팅은 함수 선언식에는 적용이 되지만 함수 표현식에는 적용되지 않는다.
 * 아래 코드의 var printMyBloodType는 변수이기 때문이다. 그렇기에 '선언과 할당'의 분리가 발생한다.
 * 순서는 변수 var printMyBloodType가 먼저 선언되고 printMyBloodType()가 호출되지만 아직 함수는 할당되지 않은 상태이다. 
 * 그리고나서 printMyBloodType에 함수가 정의된다. 그러므로 에러를 일으킨다.
 */

printMyBloodType(); // Error: printMyBloodType is not a function

var printMyBloodType = function() {
  console.log("Type O");
}