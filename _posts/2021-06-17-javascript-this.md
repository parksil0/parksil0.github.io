---
layout: post
title: "[JS]this (1)"
subtitle: "자바스크립트에서 this가 상황에 따라 어떻게 작동하는지 알아보려 합니다."
date: 2021-06-17 23:39:00 +0800
---

## this란?

자바스크립트에서 this는 대부분의 경우 함수를 호출한 방법에 의해 결정됩니다. 엄격 모드, 비엄격 모드에서도 다르게 나타나며, 브라우저에서, 노드에서도 다르게 나타납니다.
```jsx
console.log(this === window); // true

var a = 'a';
console.log(this.a); // a

this.ten = 10;
console.log(window.ten); // 10
console.log(ten); // 10
```

위의 코드는 브라우저에서 실행한 코드입니다. this는 전역 객체(window)를 참조합니다. 이는 당연히 비엄격 모드 뿐만 아니라 엄격 모드에서 또한 마찬가지로 참조합니다.

위의 경우도 그렇고, 다양한 경우 에서의 this 중, 오늘은 객체에 접근하기 위한 this 키워드에 대해 알아보려합니다.

<br>

바로 아래의 코드를 통해 알아보겠습니다.

```jsx
let myName = {
  name: 'Slias Park',
  greeting() {
    console.log(`hi! ${this.name}`);
  }
}

myName.greeting(); // hi! Slias Park
```

greeting() 메서드를 보면 this.name을 볼 수 있습니다. 여기에서 this는 객체인 myName을 나타내며, name은 객체인 myName의 name값을 의미합니다.

## 런타임에 결정되는 this

다른 언어에서 this는 항상 메서드가 정의된 객체를 참조할 것이라고 착각합니다. 하지만 자바스크립트에서 this는 런타임에 결정되기 때문에 메서드가 어디에서 정의되었는지에 상관없이 this는 객체가 무엇인가에 따라 결정됩니다.

위의 설명으로 보아 하나의 함수로 여러 객체에서 사용할 수 있다는 유연함을 제공하지만, 반대로 실수를 하게된다면 찾기 힘든 버그로도 발생할 수 있습니다.

아래의 코드를 통해 어떻게 사용되는지 알아보겠습니다.

```jsx
// 프로필 객체를 만든다.
let myProfile = {
  age: 28,
  name: 'Seal Park'
}

let myGirlfriendProfile = {
  age: 33,
  name: 'ryeoni'
}

// 이름을 출력하는 함수를 생성하였다.
const printAge = function() {
  console.log(this.age);
}

myProfile.printAge = printAge;

myProfile.printAge(); // 28

myGirlfriendProfile.printAge = printAge;

myGirlfriendProfile.printAge(); // 33

```

가운데 함수 printAge 안에 this 값은 런타임에 결정됩니다.(컨텍스트에 따라 달라짐) 즉, 동일한 함수라도 다른 객체에서 호출했다면 this가 참조하는 값이 달라집니다. myProfile.printAge()는 28이지만, myGirlfriendProfile()은 33을 출력합니다.

## 화살표 함수에서 this

화살표 함수는 일반적인 함수와 달리, 화살표 함수에서 this를 참조하면 화살표 함수가 아닌 외부에서 this 값을 가져옵니다.

```jsx
// 프로필 객체를 만든다.
let myProfile = {
  age: 28,
  name: 'Seal Park'
}

// 이름을 출력하는 함수를 생성하였다.
const printAge = function() {
  console.log(this.age);
}

// 이름을 출력하는 함수지만 화살표 함수로 생성하였다.
const printAgeArrow = () => console.log(this.age);

myProfile.printAge = printAge;

myProfile.printAge(); // 28

myProfile.printAgeArrow = printAgeArrow;

myProfile.printAgeArrow(); // undefined
```

마지막에 화살표 함수로 로그를 찍었을 때 undefined가 출력되었습니다. 그 이유는 this가 영역 외부에서 age라는 프로퍼티를 찾기 때문입니다. 더 자세한 내용은 다음의 실행 컨텍스트와, 범위에서 따로 다루도록 하겠습니다.

## 마치며

이번 포스팅은 자바스크립트에서 this는 어떻게 작동하는지 알아보았습니다. this는 런타임에 작동하여 함수를 복사하여 각 객체에 전달할 수 있으며, 객체의 프로퍼티를 호출합니다. 다만 화살표 함수를 사용할 때에는 범위에 대해 더욱 고민해야 한다는 특징이 있다는 것을 알면 오늘의 포스팅의 전반적인 이해를 하지 않았을까 생각합니다.

### 참고자료

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this)

[https://ko.javascript.info/object-methods#ref-1413](https://ko.javascript.info/object-methods#ref-1413)

[https://www.zerocho.com/category/JavaScript/post/5b0645cc7e3e36001bf676eb](https://www.zerocho.com/category/JavaScript/post/5b0645cc7e3e36001bf676eb)