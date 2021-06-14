class User { // 클래스 생성
  constructor(name) { // 생성자
    this.name = name;
  }

  set name(value) { // setter
    if(!value) { // 값이 없을 때
      console.log("이름이 없습니다.");
      return;
    }
    this._name = value;
  }

  get name() { // getter
    return this._name;
  }
}

// class로 객체를 선언하여 this를 실행시켜본다.
let myNameClass = new User("Seal Park"); // 객체 생성
console.log(myNameClass.name); // get 메소드 호출 : Seal Park

// object 타입으로 객체를 생성하여 this를 실행시켜본다.
let myNameObj = {
  name: 'Slias Park',
  greeting() {
    console.log(`hi! ${this.name}`);
  }
}

myNameObj.greeting(); // hi! Slias Park


/*
 * 화살표함수와 일반 함수간의 차이점을 알아보자.
 */

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