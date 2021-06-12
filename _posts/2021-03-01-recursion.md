---
layout: post
title: "[알고리즘]순환(Recursion)"
subtitle: "알고리즘의 기초인 순환에 대해 알아보았습니다."
date: 2021-03-01 01:00:00 +0800
---

대부분 알고리즘 강의의 시작은 순환(재귀함수)부터 시작하는 편입니다. 그만큼 알고리즘에서 매우 기초적으로 알고가야 하는 개념이라고 생각하고 강의의 커리큘럼을 짜는 강사나 저자분들도 같은 마음이라 생각합니다.

알고리즘의 시작인 순환의 개념부터 설계방법까지 차근차근 알아보겠습니다.

### **1. 재귀함수란?**

재귀함수는 메소드 구현부에 자기자신을 호출하는 함수입니다. 말 그대로 Recursion은 반복, 되풀이라는 뜻입니다. 이는 무한으로 자기자신을 호출하는 함수입니다. 무턱대고 자기자신을 호출만 하는거라고 봤을 땐 확 와닿지 않습니다. 그럼에도 불구하고 자기 자신을 호출한다는 뜻을 가진 함수를 제일 처음으로 소개를 하는걸까요?

### **2. 재귀함수에는 반드시 조건이 붙어야한다.**

자기 자신을 호출하는 재귀함수에는 그에 맞는 역할을 하려면 두가지의 조건이 있어야합니다.

> 1. 적어도 하나의 base case, 즉 순환되지 않고 종료되는 case가 있어야 한다.
> 2. recursive case : 모든 case는 결국 base case로 수렴해야 한다.

위의 조건을 지키지 않고 재귀함수를 작성한다면 무한 루프에 빠지게 됩니다.

여기서 base case란, 적어도 하나의 재귀함수에 빠지지 않는 경우가 존재해야 하는 것을 의미합니다. 이는 조건설정이 잘못되어 무한루프에 빠지게 되는 경우가 있을 수 있기 때문에 적어도 하나의 재귀함수에 빠지지 않는 경우가 존재해야 하는 이유입니다.

재귀함수의 핵심은 바로 base case로 수렴해야 한다는 것입니다.

예제와 함께 설명하겠습니다.

```
public void printBinary(int n) {
    if(n<2)
        System.out.print(n);
    else {
        printBinary(n/2);
        System.out.print(n%2);
    }
}
```

위는 int 타입의 10진수를 받아 2진수로 출력하는 메서드입니다.

만약 n의 값으로 10을 넣는다면 맨 처음 만나게 될 if문의 (n < 2)가 true인지 false인지 판별을 합니다. n은 10이기 때문에 else로 넘어가서 printBinary()메서드를 만나게 됩니다. 즉, 함수가 자기 자신을 불러서 또 같은 검사를 거치게됩니다.

else에서 만나게 되는 재귀함수는 원래 10의 절반 값인(n / 2) 5인 상태로 자기 자신을 다시 호출하게 됩니다.

여기서 중요한 건, 아직 처음 시작한 메서드가 else문을 만났을 때 printBinary()메서드를 호출했고, 그 밑의 System.out.print() 메서드를 호출하지 않았다는 것입니다. 즉, 처음 호출 된 메서드는 종료되지 않고 대기중입니다.

그렇게 계속 자기 자신을 호출하다가 n의 값이 2보다 작아지는 경우 System.out.print() 메서드를 호출하면서 줄줄이 종료가 됩니다.

```
public class Test {
	
	static int count = 0;
	
	public static void main(String[] args) {
		
		printBinary(90);
	}
	
	static void printBinary(int n) {
		count++;
		System.out.println("몇 번 째? : " + count + ", number : " + n + ", b : " + (n%2));
		System.out.println();
	    if(n<2)
	        System.out.print(n);
	    else {
	        printBinary(n/2);
	        System.out.print(n%2);
	    }
	}
}

```

위는 출력결과를 보기 위해 코드를 정리해 보았습니다. 먼저 결과를 보겠습니다.

![출력결과](/img/posts/recursion_01.png)

메인 메서드에서 printBinary() 메서드를 호출하고, int 타입의 숫자 90을 매개변수로 해서 호출했습니다.

처음 호출 된 카운트를 빼면 총 자기자신을 여섯번 호출했고, 마지막에 호출 된 메서드가 System.out.print() 메서드를 호출하면서 종료되었기 때문에 역순으로 종료되고 마지막에 처음 호출된 메서드가 종료되게 됩니다. 출력 순서는 당연히 마지막 부터 역순으로 숫자가 나열됩니다.

### **3. 알고리즘 설계 방법**

위에서도 언급했듯, base case(순환되지 않고 종료되는 case가 있어야 함)와 recursive case(모든 case는 결국 base case로 수렴해야 함)를 가진 기본 조건을 충족해야 합니다.

추가적으로 알고리즘을 설계하는데 있어 추가적인 설계방법에 대해 알아보겠습니다.

- 암시적(implicit) 매개변수를 명시적(explicit) 매개변수로 변경해야 한다.

```
int search(int[] data, int n, int target) {
    for (int i = 0; i < n; i++)
        if(data[i] == target)
            return i;
    return -1;
}
```

위에 search() 메서드는 int타입의 data에서 0부터 n까지 반복하면서 target을 찾습니다. 여기서 주목해야 할 것이 처음 시작하는 값인 0은 생략하고 어디까지 찾을지에 대한 매개변수 n만 존재합니다. 그래서 시작점인 0은 매개변수에 담아져있지 않으므로 암시적 매개변수라고 할 수 있습니다.

```
int search(int[] data, int begin, int end, int target) {
    if(begin > end) 
        return -1;
    else if(target == data[begin]
        return begin;
    else
        return search(data, begin+1, end, target);
}
```

위는 원래의 메서드에서 begin이라는 시작값을 추가했습니다. int타입의 배열 data의 인덱스를 begin부터 시작해서 int[begin]값이 target과 일치하는지 비교하고, 값이 맞지 않다면(false) 매개변수를 begin에서 1을 더하여 자기 자신을 다시 호출하여 target을 검색하는 방식입니다. 이는 시작이 매개변수에 담아져있어 명시적 매개변수라고 할 수 있습니다.

보통 반복문을 돌리면 처음부터 시작 할 수 있는 경우가 많기 때문에 위의 첫 번째 코드를 읽는데에는 전혀 무리가 없었습니다. 하지만 위의 코드가 아닌 다른 복잡한 코드를 읽을 때 암시적 매개변수는 코드의 가독성을 떨어뜨릴 수 있기 때문에 매개변수 설정에 유의해야 합니다.

자료참고

[www.youtube.com/watch?v=ln7AfppN7mY](https://www.youtube.com/watch?v=ln7AfppN7mY)