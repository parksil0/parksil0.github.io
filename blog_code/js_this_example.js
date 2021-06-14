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