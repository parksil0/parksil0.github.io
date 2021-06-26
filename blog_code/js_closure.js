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

/**
 * 클로저를 이용한 카운터 예제
 * 두 개의 카운터가 어떻게 다른 카운터와 독립성을 유지하는지 주목해보자. 
 * 각 클로저는 그들 고유의 클로저를 통한 privateCounter 변수의 다른 버전을 참조한다. 
 * 각 카운터가 호출될 때마다; 하나의 클로저에서 변수 값을 변경해도 다른 클로저의 값에는 영향을 주지 않는다.
 * 이런 방식으로 클로저를 사용하여 객체지향 프로그래밍의 정보 은닉과 캡슐화 같은 이점들을 얻을 수 있다.
 * 
 * 이처럼 자바스크립트의 클로저를 이용하면 자바와 같은 몇몇 언어들의 메소드를 프라이빗으로 선언할 수 있는 기능을 사용할 수 있다.
 * 이는 같은 클래스 내부의 다른 메소드에서만 그 메소드들을 호출할 수 있다는 의미와 비슷한 맥락이다.
 */

var makeCounter = function() {
  var privateCounter = 0;
  function changeBy(val) {
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
  }
};

var counter1 = makeCounter();
var counter2 = makeCounter();
console.log(counter1.value()); //0
counter1.increment();
counter1.increment();
console.log(counter1.value()); //2
counter1.decrement();
console.log(counter1.value()); //1
console.log(counter2.value()); //0