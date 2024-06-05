# Object

## 목차

[일반함수에서의 this](#일반함수에서의-this)

[객체 블루프린트](#객체-블루프린트)

## 일반함수에서의 this

- 일반함수로 정의된 메서드의 경우 왼쪽에 오는 것이 this이다

  ```js
  const obj = {
    greet: function () {
      console.log(this);
    },
  };

  obj.greet(); // 콘솔 결과: obj 객체 ... 왼쪽에 오는 것이란 . 표기법 기준 메서드 왼쪽이라는 뜻
  ```

- 만약 객체에 의한 호출이 아닌 단독 호출이라면?
  ```js
  function asdf() {
    console.log(this);
  }
  asdf(); // 콘솔 결과: 전역 객체 ... 왼쪽에 아무것도 없어 보이지만, 실제로는 전역객체.asdf() 임
  ```

## 객체 블루프린트

- Factory Functions

  - 객체를 리턴하는 함수에 파라미터를 넘겨서 객체를 재사용하는 기법

  ```js
  function createPerson(firstName, lastName) {
    return {
      firstName,
      lastName,
      fullName: function () {
        console.log(`My name is ${this.firstName} ${this.lastName}`);
      },
    };
  }

  const a = createPerson("Asdf", "Qwer");
  a.fullName(); // My name is Asdf Qwer

  const b = createPerson("Zxcv", "1234");
  b.fullName(); // My name is Zxcv 1234
  ```

- Constructor Functions

  - 새로운 객체 인스턴스를 생성하는 함수

  ```js
  function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = function () {
      console.log(`My name is ${this.firstName} ${this.lastName}`);
    };
  }
  // 위의 방식은 prototype에 추가하는 것은 아님을 유의하자

  const c = new Person("1234", "!!!!");
  c.fullName();
  ```

  - new 키워드를 같이 사용해야 생성자 함수가 객체 인스턴스를 생성함
  - return 을 명시해주지 않아도 new 키워드에 인해 this가 리턴됨

    - 만약 return을 명시하면?
      - 객체타입의 경우: 해당 객체 타입이 리턴됨
      - 원시타입의 경우: this가 리턴됨

    ```js
    function Person(firstName, lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.fullName = function () {
        console.log(`My name is ${this.firstName} ${this.lastName}`);
      };

      return {};
    }

    const p = new Person("", "");
    // {} 리턴됨
    ```
