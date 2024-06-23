# Class

## 클래스란?

- 클래스는 객체를 생성하기 위한 일종의 블루프린트, ES6부터 도입
- 기존의 프로토타입 기반 상속을 보다 명확하게 사용 가능

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`이름은 ${this.name}이고 ${this.age}살입니다`);
  }
}

const person = new Person("Asdf", 10);
person.greet();
```

## 클래스의 구성요소

- 생성자 메서드

  - 생성자 메서드 constructor는 클래스의 인스턴스를 생성하고 초기화하는 특별한 메서드
  - 클래스당 하나만 존재할 수 있음
  - 생성자를 명시적으로 정의하지 않으면 빈 생성자가 자동? 암묵적?으로 정의됨
  - 생성자 내에서 return문을 사용할 수 있지만, 일반적으로 권장되지 않음

  ```js
  constructor() {
    // return x => 새로 새성된 this 반환
    return 1 // 기본타입 반환 => return 1 은 무시되고 새로 생성된 this 반환
    return {}; // 객체타입 반환 => 새로 생성된 this 대신 해당 객체가 반환
  }
  ```

  - 이렇게 동작하는 이유

    - 생성자 함수와 new 키워드의 주요 목적은 새로운 객체를 생성하는 것 = 즉, 항상 객체를 반환
    - 기본타입을 반환한다는 것은 객체 생성이라는 본래의 목적에 부합하지 않음 => 무시됨
    - 객체타입을 반환하는 것은 객체 생성이라는 목적에 부합해서도 있지만, 유연성을 위한 이유도 있음

      - 개발자가 의도했다는 것을 고려한듯?
      - 의도되는 상황의 예시로 팩토리 패턴, 싱글톤 패턴, 사용자 정의 초기화 등이 존재

      ```js
      class Singleton {
        constructor() {
          if (Singleton.instance) {
            return Singleton.instance; // 반환을 명시함
          }
          this.data = Math.random();
          Singleton.instance = this;
        }
      }

      const obj1 = new Singleton();
      const obj2 = new Singleton();

      console.log(obj1.data); // 예: 0.123456789
      console.log(obj2.data); // 같은 값: 0.123456789
      ```

      - 위의 싱글톤 예시처럼 만약 인스턴스가 존재할때 새롭게 인스턴스를 생성하는 대신 해당 인스턴스를 반환하는 기법등에서 사용될수있음

- 인스턴스 메서드

  - 클래스 내부에 정의된 메서드, 클래스의 인스턴스에서 호출할 수 있음
  - 프로토타입 메서드라고도 불림
    - 인스턴스 메서드들이 클래스의 prototype 객체에 저장되고 공유되기 때문
  - 인스턴스 메서드 내에서 this는 해당 메서드를 호출한 인스턴스를 가리킴
    - 단, 인스턴스 메서드를 화살표 함수로 정의할 경우, this 바인딩이 달라짐

  ```js
  class Counter {
    count = 0;

    increment() {
      console.log(this);
      this.count++;
    }

    decrement = () => {
      console.log(this);
      this.count--;
    };
  }

  const counter = new Counter();
  const incrementRef = counter.increment;
  const decrementRef = counter.decrement;

  incrementRef(); // undefined
  decrementRef(); // -1
  ```

  - 위의 예시처럼 화살표함수는 호출되는 곳이 아닌, 정의된 곳의 상위 스코프의 this를 가지기 때문에 Counter 인스턴스를 가리키게됨

- 정적 메서드

  - static 키워드를 사용하여 클래스 자체에 추가 가능한 메서드
  - 정적 메서드는 인스턴스 없이 호출 가능, 단 인스턴스에서는 호출할 수 없음
  - 정적 메서드 내의 this는 클래스 자체를 가리킴
    - 즉, 인스턴스 프로퍼티에 직접 접근할 수 없음

  ```js
  class StaticMethodClass {
    age = 10;

    static staticMethodA() {
      return "asdf";
    }

    static staticMethodB() {
      return this.staticMethodA(); // 여기서 this는 클래스 자체
    }

    static staticMethodC() {
      console.log(this);
      return this.age;
    }
  }

  console.log(StaticMethodClass.staticMethodA()); // "asdf"
  console.log(StaticMethodClass.staticMethodB()); // "asdf"
  console.log(StaticMethodClass.staticMethodC()); // undefined
  ```

- 필드

  - 클래스 필드는 클래스 몸체에서 프로퍼티를 선언하고 초기화할 수 있게 해줌
  - public 및 private(#필드) 필드를 선언할 수 있음
  - 필드에도 정적필드가 존재, 마찬가지로 인스턴스 생성 안해도 접근 가능

## 추가적인 클래스 기능

- Computed Method Names

  - 메서드의 이름을 동적으로 정의 가능한 기능
  - 대괄호 안에 표현식을 넣어 메서드 이름을 생성

  - 특징
    - 메서드 이름을 런타임에 결정할 수 있음
    - 변수나 표현식의 결과를 메서드 이름으로 사용할 수 있음
    - 객체 리터럴과 클래스 선언 모두에서 사용 가능

  ```js
  const methodName = "greet";
  const prefix = "get";

  class Greeter {
    [methodName]() {
      return "Hello World";
    }

    [`${prefix}Name`]() {
      return "Asdf";
    }

    ["greet" + "User"]() {
      return `${this[methodName]()} name is ${this[`${prefix}Name`]()}`;
    }
  }

  const greeter = new Greeter();
  console.log(greeter.greet()); // "Hello World"
  console.log(greeter.getName()); // "Asdf"
  console.log(greeter.greetUser()); // "Hello World name is Asdf"
  ```

- Generator Methods
  - 제너레이터는 여러 값을 필요에 따라 하나씩 반환(yield)할 수 있는 특별한 종류의 함수
  - 특징
    - function* 키워드나 메서드 이름 앞에 *를 붙여 정의
    - yield 키워드를 사용하여 값을 하나씩 반환
    - for 루프 등에서 사용 가능
    - 비동기 작업을 동기적으로 표현할 수 있게 해줌

```js
// 퍼온것,,
class NumberSequence {
  *generateEvenNumbers(limit) {
    for (let i = 0; i <= limit; i += 2) {
      yield i;
    }
  }

  *generateOddNumbers(limit) {
    for (let i = 1; i <= limit; i += 2) {
      yield i;
    }
  }

  *generateNumbers(limit) {
    yield* this.generateEvenNumbers(limit);
    yield* this.generateOddNumbers(limit);
  }
}

const sequence = new NumberSequence();

console.log("Even numbers:");
for (const num of sequence.generateEvenNumbers(10)) {
  console.log(num);
}

console.log("Odd numbers:");
for (const num of sequence.generateOddNumbers(10)) {
  console.log(num);
}

console.log("All numbers:");
for (const num of sequence.generateNumbers(10)) {
  console.log(num);
}
```
