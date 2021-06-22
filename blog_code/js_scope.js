/* 
  1. 전역변수와 지역변수
    전역변수 name과 지역 스코프 내에 동일한 name이라는 변수를 선언 했을 때의 결과 확인
*/

var name = 'Seal';

function changeName() {
  var name = 'Slias';
  name = "Sil";
  console.log(name); // Sil
}

changeName();
console.log(name); // Seal

/*
  2. 지역 스코프에서 전역변수 변경
    지역 스코프 내에서 전역변수를 선언하는 게 아니라 변경을 했을 때 결과 확인
*/ 

var name2 = 'Seal';

function changeName2() {
  name2 = "Sil";
  console.log(name2); // Sil
}

changeName2();
console.log(name2); // Sil

/*
  3. 지역변수 호출 시
    전역 변수 없이 지역 스코프 내에 name3 변수를 생성하고 전역 스코프에서 name 변수를 호출했을 때 결과 확인
*/ 

function changeName() {
  var name3 = 'Slias';
  name3 = "Sil";
  console.log(name3); // Sil
}

changeName();
console.log(name3); // Uncaught ReferenceError: name3 is not defined