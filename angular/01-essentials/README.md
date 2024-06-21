# Angular - Essentials

## 목차

[Angular 커맨드](#angular-커멘드)

[Angular의 변경 감지 및 UI 업데이트 메커니즘](#angular의-변경-감지-및-ui-업데이트-메커니즘)

[Angular 기본 기능 (v2 ~)](#angular-기본-기능-v2-)

[Angular 추가 기능 (v16 ~)](#angalar-추가-기능-v16-)

## Angular 커멘드

```shell
# angular cli install (global)
npm install -g @angular/cli

# angular project init
ng new <project-name>

# create new component
ng g c <path?>/<component-name>
```

## Angular의 변경 감지 및 UI 업데이트 메커니즘

- 기본적으로 Angular는 자동으로 상태 변경을 감지하고, UI 변경을 수행한다

- Angular가 상태 변경을 감지하는 메커니즘 (Angular v2 ~)

  - 상태 변경을 자동으로 감지하는 것은 Angular 기본 내장 패키지인 zone.js에 의해서 이루어짐

  1. `zone.js`는 가능한 모든 사용자 이벤트, 브라우저 이벤트 등을 자동으로 수신함
  2. 만약 이벤트가 발생하면 `zone.js`는 모든 angular 컴포넌트를 확인하면서 상태 변경을 체크함
  3. 변경된 상태를 기반으로 UI를 업데이트함

- Angular가 상태 변경을 감지하는 메커니즘 (Angular v16 ~)

  - signal 이라는 상태를 저장하는 컨테이너를 이용함 (sinal은 어떤 타입의 값이든 저장하는 중첩 객체)

  1. `signal()`로 상태를 래핑(저장)
  2. 저장된 값의 변경되면 이를 angular에게 알림
  3. angular는 해당 변경사항을 기반으로 UI를 업데이트함

- zone.js vs signal()

  - zone.js의 기본 아이디어를 다시 살펴보면 모든 컴포넌트를 감싸는 컨테이너를 생성하고, 만약 상태가 변경될만한 이벤트가 발생되면 모든 컴포넌트를 체크하여 상태 변경에 영향 받는 UI를 찾고 업데이트함
  - 반면 signal()은 signal에 저장된 상태를 사용할 때, 해당 상태가 어느 위치에서 사용되는지 기억(구독?)하고, 상태가 변경되면 해당 위치를 추적하여 UI를 업데이트함

  - 결론적으로,,
    - signal을 사용하면 zone.js가 모든 컴포넌트를 검사하는 상대적으로 비효율적인 방식을 개선할 수 있음

## Angular 기본 기능 (v2 ~)

- html 속성에 데이터를 바인딩하는 방법

  ```html
  <img [src]="imagePath" [alt]="name" />
  ```

  - [ html 속성 ]="데이터"

- html 태그에 데이터를 렌더링하는 방법

  ```html
  <span>{{ name }}</span>
  ```

  - {{ 데이터 }}

- 상위 컴포넌트로부터 데이터를 받는 방법
  ```ts
  @Input({ required: true }) avatar!: string;
  ```
  - @Input() 데코레이터 이용
  - 해당 데코레이터는 객체를 인자로 받음
    - required: 해당 props이 필수인지 여부

## Angalar 추가 기능 (v16 ~)

- computed()

  - signal을 이용해 저장한 상태를 활용한 계산을 수행해야할 때 computed()를 사용
    - computed()는 함수를 인자로 받고, 해당 함수는 계산된 값을 리턴해야함
    - 이렇게되면 계산된 값에 존재하는 상태가 변경될때만 angular가 해당 계산을 다시 수행함
    - 즉, 다른 변화(컴포넌트 재렌더링등,,)에 영향을 받지 않고, 오직 계산에 사용된 signal 상태가 변경될때만 계산을 수행

- set()

  - singal이 상태를 업데이트하는 방법

- 상위 컴포넌트로부터 데이터를 받는 방법
  ```ts
  name = input.required<string>();
  ```
  - input() 사용
  - .required: 해당 props이 필수인지 여부
    - .required 메서드를 이용한 input이라면 초기값 설정 x
