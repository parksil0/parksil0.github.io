---
layout: post
title: "[JS] Hoisting"
subtitle: "자바스크립트의 호이스팅에 대해 알아봅니다."
date: 2021-06-28 22:08:00 +0800
---

호이스팅(hoisting)은 '끌어올리기'라는 뜻을 가진 언어입니다. 자바스크립트에서 변수를 선언하는 세가지 방법, `const`, `let`, `var` 중 `var`로 선언한 모든 변수는 함수의 최상위로 호이스팅이 됩니다. 그렇다면 호이스팅이 정확히 무엇일까요?

## var의 스코프

```jsx
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
```

위의 코드에서 `var`는 블록 스코프가 없습니다. `var`로 선언한 변수의 스코프는 함수 스코프이거나 전역 스코프이며, 블록 기준으로 스코프가 생기지 않기 때문에 블록 밖에서 접근이 가능합니다.

```jsx
function sayHi() {
  if (true) {
    var myName = "Slias";
  }

  console.log(myName); // Slias
}

sayHi();
console.log(myName); // Error: myName is not defined
```

위의 코드에서 함수 `sayHi()`내의 코드 블럭에서 `var`는 함수 레벨 변수가 됩니다. 함수 내에 선언이 되었다면, 함수 내의 최상위에 선언됩니다. 하지만 함수의 범위에 벗어나게 된다면, 사용할 수 없습니다.

## var의 호이스팅

또한 `var`를 사용하면 선언하기 전에도 사용이 가능합니다. `var` 선언은 함수가 시작될 때 처리되며, 전역에서 선언한 변수라면 스크립트가 시작될 때 처리됩니다. 함수 본문 내에서 `var`로 선언한 변수는 선언 위치와 상관없이 함수 본문이 시작되는 지점에서 정의됩니다.(단, 변수가 중첩 함수 내에서 정의되지 않아야 이 규칙이 적용됩니다).

```jsx
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

```

위처럼 변수가 끌어올려 지는 현상을 호이스팅(hoisting)이라고 합니다. `var`로 선언한 모든 변수는 함수의 최상위로 끌어올려집니다. 또한 선언은 호이스팅이 되지만 할당은 호이스팅이 되지 않습니다. 때문에 선언과 동시에 할당하는 경우에는 원하는 결과가 나오지 않을 수 있습니다.

```jsx
function printAge() {
  console.log(myAge);

  var myAge = 28;
}

printAge(); // undefined
```

위의 코드는 선언과 동시에 할당하는 경우 결과가 어떻게 일어나는지 알 수 있는 예제 코드입니다. 선언과 동시에 할당하는 경우 두 가지 일이 일어납니다. 첫 번째는 변수 선언(`var`), 두 번째는 변수에 값을 할당합니다.

변수 선언은 함수 실행이 시작될 때 처리되지만(호이스팅), 할당은 호이스팅이 되지 않기 때문에 코드가 있는 라인에서 할당됩니다. 그러므로 위의 예제에서는 콘솔창에 `undefined`가 출력됩니다.

## 함수의 호이스팅

자바스크립트에서 함수의 선언 역시 호이스팅의 대상입니다. 스코프 내의 어떤 위치에서 함수 선언을 하더라도 호출할 수 있습니다. 그러므로 아래의 함수 `printMyFavoriteFood()`을 먼저 호출하고 함수 정의를 이후에 하여도 정상적으로 동작하게 됩니다.

```jsx
printMyFavoriteFood(); // donkatsu

function printMyFavoriteFood() {
  console.log('donkatsu');
}
```

## 함수 선언식, 함수 표현식

자바스크립트에서 여러 함수 선언 방식 중 함수 선언식과 함수 표현식에 대해 잠시 간략하게 알아보겠습니다.

```jsx
// 함수 선언식
function foo() {
  //...
}

// 함수 표현식
var bar = function() {}
```

함수 호이스팅은 함수 선언식에는 적용이 되지만 함수 표현식에는 적용되지 않습니다. 아래의 코드를 보면,

```jsx
printMyBloodType(); // Error: printMyBloodType is not a function

var printMyBloodType = function() {
  console.log("Type O");
}
```

첫번 째 줄 함수`printMyBloodType()`를 보면 에러를 호출하는 것을 볼 수 있습니다. 

그이유는 그 아래 줄의 `var printMyBloodType` 가 변수이기 때문입니다. 이는 '선언과 할당'의 분리가 발생한 것입니다. 순셔는 `var printMyBloodType` 가 먼저 선언되고, 그 다음 `printMyBloodType()` 가 호출 되지만 아직 함수는 할당되지 않은 상태입니다. 그리고나서 `var printMyBloodType` 에 함수가 정의됩니다. 그러므로 위의 코드에서는 에러가 발생한 것입니다.

## 변수, 함수 우선순위

var와 함수를 선언하면 해당 스코프의 최 상단으로 호이스팅이 되는것을 알아보았습니다. 그렇다면 둘을 동시에 선언했을 때 어떤것이 우선하여 선언될까요? 아래의 코드를 통해 알아보겠습니다.

```jsx
var firstName = "Park";

function firstName() {
  console.log("Park");
}

function lastName() {
  console.log("Seal");
}

var lastName = "Seal";

// 1번
console.log(typeof firstName); // string
console.log(typeof lastName); // string
```

1번을 보면 `firstName`과 `lastName` 둘 다 `string`타입임을 알 수 있습니다. 이는 변수가 함수보다 우선하여 호이스팅이 일어남을 알 수 있습니다. 위의 코드를 호이스팅이 되어 변환된 코드로 보자면, 아래와 같습니다.

```jsx
var firstName;
var lastName;

function firstName() {
  console.log("Park");
}

function lastName() {
  console.log("Seal");
}

firstName = "Park";
lastName = "Seal";

console.log(typeof firstName); // string
console.log(typeof lastName); // string
```

## 참고

[https://yuddomack.tistory.com/entry/자바스크립트-호이스팅Hoisting](https://yuddomack.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85Hoisting)

[https://ko.javascript.info/var#ref-295](https://ko.javascript.info/var#ref-295)

[https://developer.mozilla.org/ko/docs/Glossary/Hoisting](https://developer.mozilla.org/ko/docs/Glossary/Hoisting)