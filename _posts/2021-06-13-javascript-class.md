---
layout: post
title: "[JS]Class (1)"
subtitle: "자바스크립트에서 클래스는 어떤 구조인지 알아보려 합니다."
date: 2021-06-13 19:41:00 +0800
---
## 클래스란?

자바스크립트에서 클래스는 객체를 생성하기 위한 템플릿입니다. 클래스는 데이터와 이를 조작하는 코드를 하나로 추상화합니다. 

> *클래스는 객체 지향 프로그래밍에서 특정 객체를 생성하기 위해 변수와 메소드를 정의하는 일종의 틀로, 객체를 정의하기 위한 상태(멤버 변수)와 메서드(함수)로 구성된다.*
[https://ko.wikipedia.org/wiki/클래스_(컴퓨터_프로그래밍)](https://ko.wikipedia.org/wiki/%ED%81%B4%EB%9E%98%EC%8A%A4_(%EC%BB%B4%ED%93%A8%ED%84%B0_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D))
## 클래스 정의 방법

클래스를 정의하는 방법은 class 예약어를 사용합니다. 아래와 같이 입력합니다.

```jsx
class User {
	constructor(name) {
		this.name = name;
	}
}
```

## 생성자(Constructor)

생성자 메서드는 class로 생성된 객체를 생성하고 초기화하기 위한 특수 메서드입니다. 클래스 안에 하나만 존재 가능하며, 그렇게 설정하지 않는다면 예외가 발생하게 됩니다.

```jsx
class User {
	constructor(name) {
		this.name = name;
	}
}
```

위와 같이 생성자를 설정하며, new 연산자에 의해 자동으로 호출되므로, 특별한 절차 없이 객체를 초기화 할 수 있습니다.

## 자바스크립트에서 클래스는 함수입니다.

위의 소제목과 같이, 자바스크립트에서 클래스는 다른 언어와는 다르게 함수 입니다. 아래의 코드를 보면

```jsx
class User {
	constructor(name) {
		this.name = name;
	}
}

console.log(typeof User); // function
```

User라는 클래스의 타입은 함수(function)임을 알 수 있습니다.

실제 자바스크립트에서는 User라는 이름을 가진 함수를 만들고, 함수 본문은 생성자 메서드 constructor에서 가져옵니다. 만약 생성자 메서드가 없다면 본문이 비워진 함수가 생성됩니다.

만약 클래스 내에 메서드가 있다면 메서드는 User.prototype에 저장합니다. new 연산자를 사용하여 객체를 만들고, 객체의 메서드를 호출하면 함수의 prototype 프로퍼티에서 메서드를 프로토타입에서 가져옵니다. 그래서 객체에서 클래스 메서드에 접근이 가능하게 된 것입니다.

## getter, setter

리터럴을 사용해 만든 객체처럼 클래스도 getter나 setter등을 포함할 수 있습니다.

```jsx
class User {
  constructor(name) {
    this.name = name;
  }

  set name(value) {
    if(!value) {
      console.log("이름이 없습니다.");
      return;
    }
    this._name = value;
  }

  get name() {
    return this._name;
  }
}

let obj1 = new User("Seal");
console.log(obj1.name); // Seal

obj1.name = "Seal Park"
console.log(obj1.name); // Seal Park
```

위와 같은 방법으로 obj1.name을 조작하여 User.prototype에 getter, setter가 만들어지므로 get과 set을 사용할 수 있습니다.

자료출처

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes)

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes)

[https://ko.wikipedia.org/wiki/클래스_(컴퓨터_프로그래밍)](https://ko.wikipedia.org/wiki/%ED%81%B4%EB%9E%98%EC%8A%A4_(%EC%BB%B4%ED%93%A8%ED%84%B0_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D))