/**
 * 클로저 예제
 * 
 * 밑의 makeAdder이라는 함수 내의 y라는 지역변수를 선언하고,
 * 함수를 리턴하는 형식이다.
 * add5라는 변수는 makeAdder()함수를 리턴받았고, 리턴받은 함수 내의 변수 y는 사용이 가능하다.
 * 그 이유는 외부 렉시컬 환경이 적용되기 때문이다.(scope)
 * 이처럼 함수와 함수가 선언된 렉시컬 환경의 조합을 클로저라고 하며, 클로저를 이해하기 위해선 함수의 유효범위는 필수적으로 알아야 한다.
 * 만약 리턴된 함수가 자신만의 변수 y를 가지고있다면 y가 아닌 this.y를 사용했을 것이다
 */

function makeAdder(x) {
  var y = 1;
  return function(z) {
    y = 100;
    return x + y + z;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);
//클로저에 x와 y의 환경이 저장됨

console.log(add5(2));  // 107 (x:5 + y:100 + z:2)
console.log(add10(2)); // 112 (x:10 + y:100 + z:2)
//함수 실행 시 클로저에 저장된 x, y값에 접근하여 값을 계산