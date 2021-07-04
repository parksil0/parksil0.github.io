---
layout: post
title: "[JS] Closure"
subtitle: ""
date: 2021-07-03 01:47:00 +0800
---

## 전역변수와 지역변수

자바스크립트에서 전역변수란 제일 바깥 범위에 선언된 변수를 전역변수라고 합니다. 전역 객체인 `window`에 변수를 선언하는 것과 동일합니다. 그래서 전역 범위에서 `name` 은 `window.name`과 같습니다.

지역변수는 중괄호로 안에 선언된 변수를 지역변수라고 합니다. 보통 중괄호를 코드 블록, 블록 레벨 스코프 라고도 표현하는데요, 지역변수는 로컬변수라고도 부릅니다. 아래의 코드예제를 볼까요?

이번 포스팅 에서는 몇 가지 차이로 인해 코드 예제에 `var`로 선언하지 않고 `let`, `const`로만 선언할 예정입니다. 그 이유는 [링크](https://ko.javascript.info/var)를 통해 확인하시면 되겠습니다.

```jsx
let global = "hello global!";

function foo() {
	let local = "hello local!";
	console.log(local) // hello local!
	console.log(global) // hello global!
}

console.log(local) // ReferenceError: h is not defined
console.log(global) // hello global!
```

위의 코드 예제를 보면 지역변수 `local` 이 선언이 되어있는 것을 볼 수 있습니다. 함수 내에서 변수 `local`를 출력 했을 때 정상적으로 작동이 되지만, 스코프를 벗어나는 순간 에러가 발생합니다. 이는 지역 변수로 선언 되었던 `local`이 블록을 벗어났기 때문입니다. 블록을 벗어나는 순간 유효하지 않으며, 유효한 범위는 `foo()` 내부입니다.

가장 바깥에 선언된 변수 `global`은 전역변수입니다. 전역변수는 방금 설명했듯 가장 바깥에 위치해 있기 때문에 `foo()` 안에서도 유효합니다. 물론 전역 스코프에서도 유효합니다.

```jsx
let name2 = 'Seal';

function changeName2() {
  name2 = "Sil";
  console.log(name2); // Sil
}

changeName2();
console.log(name2); // Sil
```

물론 전역변수는 로컬 스코프 내에서 변경이 가능합니다.

## 중첩함수

개인적으로 자바로 언어를 처음시작했고, 자바에서 메서드 안에 메서드를 생성하지 못합니다. 그리고나서 자바스크립트를 공부할 때 함수(function)이 마치 자바의 메서드(method)와 비슷한 느낌이라고 생각해서 그런지 초반에는 함수 안에 함수를 만들 생각을 하지 않았습니다. 하지만 자바스크립트에서 함수는 중첩으로 선언이 가능합니다! 아래 예제를 통해 알아보겠습니다.

```jsx
function foo() {
	console.log('hi!') // 1번
  return function bar() {
    return "hello!"
  }
}

let fooBar = foo();
console.log(fooBar); // [Function: bar]

// foo();
console.log(fooBar()); // hi! hello!
```

위의 예제는 중첩 함수 예제입니다. `foo()`라는 함수가 있고, 그 안에 `bar()`라는 함수가 있습니다. 

중간 부분에 `fooBar()`는 선언과 동시에 `foo()`가 할당이 된 것을 볼 수 있습니다. 그 다음줄 출력문을 보면 `fooBar()`는 함수라는 것을 알 수 있습니다. 함수를 실행하면 위의 코드 중 1번이 실행되고 `string`타입의 `"hello"`를 리턴합니다. 맨 마지막 줄 `fooBar()`를 출력했기 때문에 `"hi!"` 와 `"hello!"`가 출력됩니다.

## 클로저를 알아 보기 전에...

클로저를 알아보기 전에 먼저 스코프(범위)에 대해 간략하게 알아보았습니다. 이는 클로저를 이해하기 위한 단계인데, 클로저를 보다 더 수월하게 이해하기 위해선 렉시컬 환경(lexical envrinment)에 대해 알 필요가 있습니다. 그런 이유로 클로저에 진입하기 전, 먼저 렉시컬 환경에 대해 알아보겠습니다!

## 렉시컬 환경(Lexical Environment)

렉시컬(lexical)은 '어휘의' 라는 뜻을 가진 단어입니다. 지금까지 위에서 설명한 내용을 보면, 변수가 어디에서 사용 가능한지, 어디에서 선언 되었는지에 따라 어떤 결과를 나타내는지 예제를 통해 알아 보았는데요, 이를 렉시컬이라고 합니다. 지금까지 알아본 바로는 함수 블록 내에서 외부 스코프의 변수를 사용할 수 있었죠? 이를 유념하고 렉시컬 환경에 대한 설명 시작하겠습니다!

렉시컬 환경(lexical environment)은 '어휘적 환경'이라고도 부르기도 하는데, 이는 내부 숨김 연관 객체(internal hidden associated object)를 갖습니다.

렉시컬 환경 객체는 두 부분으로 구성됩니다.

1. *환경 레코드(Environment Record)* – 모든 지역 변수를 프로퍼티로 저장하고 있는 객체입니다. `this` 값과 같은 기타 정보도 여기에 저장됩니다.
2. *외부 렉시컬 환경(Outer Lexical Environment)* 에 대한 참조 – 외부 코드와 연관됨

’변수’는 특수 내부 객체인 '환경 레코드'(environment record)의 프로퍼티일 뿐입니다. '변수를 가져오거나 변경’하는 것은 '환경 레코드의 프로퍼티를 가져오거나 변경’함을 의미합니다.

```jsx
let hello = "hello!";
console.log(hello); // hello!
```

위는 변수 `hello`를 선언했고 콘솔에 출력을 명령한 소스코드입니다. 위의 두 줄의 코드에는 전역 스코프에 선언된 변수 하나밖에 없습니다. 이를 전역 렉시컬 환경이라고 합니다. 범위가 가장 바깥이기 때문에 외부 렉시컬 환경은 `null`입니다.

```jsx
let hello = "hello!";

function greeting(name) {
	console.log(`${hello} ${name}!`);
}

greeting("seal"); // hello! seal!
```

위는 전역 변수와 함께 함수 안에 선언된 지역 변수가 있습니다. 위의 코드를 통해 알 수 있는 사실은 전역 렉시컬 환경에는 `hello`, `greeting()` 이 선언되어있습니다. `hello`는 문자열로, `greeting()`은 함수로 선언되어있고, 전역 렉시컬 환경이기 때문에 외부는 없으므로 `null`입니다.

이번에는 함수 `greeting()`의 관점으로 볼까요? `greeting()`은 함수이므로 블록을 갖습니다. 블록 안의 스코프는 지역 스코프이므로 전역 렉시컬 환경에서 `greeting()`의 블록 내부는 내부 렉시컬 환경이고, `greeting()` 내부에서 전역 스코프는 외부 렉시컬 환경입니다. `greeting()`의 렉시컬 환경을 보면 `name`이 있고, 외부는 전역이기 때문에 `hello`, `greeting`이 있습니다. 전역 스코프에서 외부는 없으니 외부 렉시컬 참조가 없기 때문에 `null`입니다.

맨 마지막 줄 `greeting("seal")`을 호출합니다. `greeting()`함수의 구현부를 보면, `name` 외에 `hello`라는 변수를 확인할 수 있습니다. 이는 내부 렉시컬 환경에 없습니다. 만약 내부 렉시컬 환경에 없다면 외부 렉시컬 환경에서 자동으로 찾도록 합니다. 전역 렉시컬 환경에 도달할 때까지 변수를 찾지 못하면 엄격 모드에선 에러가 발생합니다.
위의 소스코드를 정리하자면, `greeting()`내부에 선언되지 않은 변수 `hello`가 있습니다 그래서 외부 렉시컬 환경에서 `hello`를찾아 출력하는 흐름입니다.

## 클로저

이제 클로저에 대해 알아보겠습니다! MDN에서 클로저를 '클로저는 함수와 함수가 선언된 렉시컬 환경의 조합'이라고 설명 되어있는데요, 이제 왜 클로저가 함수와 함수가 선언된 '렉시컬 환경'의 조합인지 밑의 코드 예제를 통해 알아보겠습니다.

```jsx
function makeCounter() {
  let count = 0;

  return function() { // 2번
    return count++;
  };
}

let counter = makeCounter(); // 1번

console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

위의 코드는 그 유명한 카운터 예제입니다. 클로저를 이해하기 쉬운 코드 예제인데요, 함수 안에 함수가 있고, 그 함수는 리턴값입니다. 위의 '중첩함수'에도 봤듯 함수 안에 함수가 가능합니다.

이제부터 클로저의 중요한 내용이 시작됩니다. 바로 `[[Environment]]`라는 숨김 프로퍼티인데요, 함수가 가지고 있는 특징 중 하나입니다. 바로 여기에 함수가 만들어진 곳의 렉시컬 환경에 대한 참조가 저장됩니다. 위의 코드 중 1번을 보면 counter의 `[[Environment]]`에는 count: 0 이라는 참조가 저장되어있습니다. 호출 장소와 상관없이 함수가 자신이 태어난 곳을 기억할 수 있는 건 바로 이 `[[Environment]]` 프로퍼티 덕분입니다. `[[Environment]]`는 함수가 생성될 때 딱 한 번 값이 세팅되고 영원히 변하지 않습니다.

`counter()`를 호출하면 각 호출마다 새로운 렉시컬 환경이 생성됩니다. 그리고 이 렉시컬 환경은 `counter.[[Environment]]`에 저장된 렉시컬 환경을 외부 렉시컬 환경으로서 참조합니다.

위의 코드 중 1번 아래에 코드를 실행한 걸 볼 수 있는데요, 실행을 하면 2번의 코드가 실행됩니다. 하지만 리턴하는 값 `count`가 해당 블록 렉시컬 환경에는 없죠. 그래서 외부 렉시컬 환경에서 찾는데 선언된 `count`가 있습니다. 그래서 증가하는 값을 리턴하지만 그 값은 원래의 함수가 아닌 저장된 렉시컬 환경에서 갱신이 됩니다. 그래서 계속 같은값이 출력되는 게 아닌, 1씩 증가하는 이유이기도 합니다.

### 정리를 하자면!

클로저는 외부 변수를 기억하고 이 외부 변수에 접근할 수 있는 함수를 의미합니다. 자바스크립트에선 하나의 예외를 제외하고는 모든 함수가 자연스럽게 클로저가 됩니다. 함수는 숨김 프로퍼티인 `[[Environment]]`를 이용해 자신이 어디서 만들어졌는지를 기억합니다. 함수 본문에선 `[[Environment]]`를 사용해 외부 변수에 접근합니다.

그래서 클로저를 공부하기 전 스코프, 렉시컬 환경에 대해 알아본 이유이기도 합니다. 위의 카운터 예제로는 클로저의 특징을 알기가 좀 부족하죠. 예제를 통해 보다 상세하게 알아보겠습니다.

### 예제 1

```jsx
<!DOCTYPE html>
<html>
<body>
  <button class="toggle">toggle</button>
  <div class="box" style="width: 100px; height: 100px; background: red;"></div>

  <script>
    var box = document.querySelector('.box');
    var toggleBtn = document.querySelector('.toggle');

    var toggle = (function () { // 1번
      var isShow = false;

      return function () { // 2번
        box.style.display = isShow ? 'block' : 'none';
        isShow = !isShow;
      };
    })();

    toggleBtn.onclick = toggle; // 3번
  </script>
</body>
</html>
```

위는 현재 상태를 기억하고 변경된 최신 상태를 유지하도록 클로저를 사용한 예제입니다. 위의 코드 중 1번을 보면 `toggle()`은 즉시 실행 함수(IIFE)를 사용하여 반환하였습니다. 2번을 보면 함수를 리턴합니다. 내용 안에는 `isShow`라는 변수를 이용하여 box 요소의 상태를 조작합니다. 그리고 마지막 3번을 보면 `toggle()`을 이벤트 프로퍼티에 할당하는 것까지 확인할 수 있습니다.

여기서 중요한건 바로 `isShow`의 상태입니다. 클로저를 이용하면 `[[Environment]]`을 통해 프로퍼티 값을 기억할 수 있습니다. 이는 최신 상태를 유지할 수 있는데요, 이와 같은 예제가 실제 클로저가 사용되는 예제입니다.

### 예제 2

```jsx
var counter = (function() {
  var privateCounter = 0; // private item
  function changeBy(val) { // private item
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  };
})();

console.log(counter.value()); // logs 0
counter.increment();
counter.increment();
console.log(counter.value()); // logs 2
counter.decrement();
console.log(counter.value()); // logs 1
```

위는 프라이빗 메서드 (private method)를 흉내내는 클로저 예제입니다. 대표적으로 자바에서 프라이빗 메서드는 동일한 클래스 이내에서만 접근이 가능한데, 자바스크립트에서는 구현이 안되는 대신 클로저를 통해 흉내내는 것이 가능합니다.

위의 예제를 보면 주석 중 `private item`이 보일 겁니다. 이는 내부에서만 접근이 가능한 것으로, 바로 `privateCounter`와 `changeBy()`입니다. 위를 외부에서 조작하기 위해서는 `increment`, `decrement`, `value` 라는 함수로 간접적으로 접근하여 조작이 가능합니다. `increment`, `decrement`는 값을 변경하고, `value`는 값을 확인 할 수 있음을 알 수 있습니다.

### 예제 3

```jsx
<!DOCTYPE html>
<html>
<body>
  <button id="target0">Click Me 0</button>
  <button id="target1">Click Me 1</button>
  <button id="target2">Click Me 2</button>
  <button id="target3">Click Me 3</button>
  <button id="target4">Click Me 4</button>

  <script>
    for (var i = 0; i < 5; i++) {
      document.querySelector("#target" + i).onclick = function() {
        alert(i);
      }
    }  
  </script>
</body>
</html>
```

위는 for문 안에 함수를 사용할때 저지르는 실수입니다. 함수는 선언할 때 생성이 됩니다. 그러므로 내부의 함수에서는 i를 끝까지 참조합니다. 그러므로  모두 클릭을 했을 때 5라는 메세지만 보이게 됩니다. 이는 클로저를 사용하여 해결할 수 있습니다.

```jsx
<!DOCTYPE html>
<html>
<body>
  <button id="target0">Click Me 0</button>
  <button id="target1">Click Me 1</button>
  <button id="target2">Click Me 2</button>
  <button id="target3">Click Me 3</button>
  <button id="target4">Click Me 4</button>

  <script>
    for (var i = 0; i < 5; i++) {
      (function(j) {
        document.querySelector("#target" + j).onclick = function() {
        alert(j);
      }
    })(i);
    }
  </script>
</body>
</html>
```

## References

- https://www.zerocho.com/category/Javascript/post/5740531574288ebc5f2ba97e
- https://ko.javascript.info/closure
- [https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures](https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures)
- [https://www.zerocho.com/category/JavaScript/post/5741d96d094da4986bc950a0](https://www.zerocho.com/category/JavaScript/post/5741d96d094da4986bc950a0)
- [https://poiemaweb.com/js-closure](https://poiemaweb.com/js-closure)