# React Router - loader, action

## loader

### defer

- defer란?

  - 데이터 로딩을 지연시키고 비동기적으로 처리하는 것

- defer 특징

  1. 페이지 렌더링 지연 방지

  - defer를 사용하면 모든 데이터가 로드될 때까지 기다리지 않고 페이지를 즉시 렌더링할 수 있음

  2. 점진적 로딩

  - 사용자에게 먼저 페이지의 기본 구조를 보여주고, 데이터가 준비되면 그 데이터를 표시할 수 있음

  - 즉, defer를 통해 반환되는 데이터를 렌더링하는 부분 (Suspense와 Await를 주로 활용)만 데이터가 로드될때까지 fallback을 렌더링하고, 이외의 섹션은 상관없이 렌더링됨

### json

- react-router의 json()이란?

  - React Router에서 라우터의 오류 처리와 통합되도록 설계된 함수로, json 객체를 Response 객체로 래핑하여 반환
    - JSON.stringify()와의 차이점?
      - 일반적인 JavaScript 객체를 JSON 문자열로 변환하는 함수
      - 단순 문자열을 반환
      - 단순히 문자열을 던지는 것이므로, React Router가 이를 특별한 오류로 인식하지 않음

- 반환 값

  - Response 객체를 반환합니다.
  - 이 객체는 상태 코드, 헤더 등의 추가 정보를 포함할 수 있음

- 오류 처리
  - throw로 던지면 React Router가 이를 에러로 인식하고 처리함

## Suspense

- Suspense란?

  - 비동기 렌더링 관리
    - Suspense는 비동기적으로 로드되는 컴포넌트를 다루는 방법을 제공함
    - 데이터 fetching, 코드 분할(lazy loading) 등의 비동기 작업을 처리할 수 있게 해줌
  - 폴백 UI 제공
    - 비동기 컨텐츠가 준비되기 전까지 대체 UI(fallback)를 보여주는 기능 존재
  - 선언적 로딩 상태 관리
    - 개발자가 명시적으로 로딩 상태를 관리하지 않아도됨
    - React가 자동으로 로딩 상태를 감지하고 관리
  - 컴포넌트 트리의 일부 렌더링 지연
    - 특정 부분의 렌더링만 지연시키고 나머지 UI는 정상적으로 렌더링할 수 있게 해줌
  - 에러 바운더리와의 연동:
    - 비동기 작업 중 발생하는 에러를 잡아내고 처리할 수 있게 해줌

- Suspense 사용 사례

1. 코드 스플리팅 (Code Splitting)

   ```js
   const LazyComponent = React.lazy(() => import("./LazyComponent"));

   function MyComponent() {
     return (
       <Suspense fallback={<div>Loading...</div>}>
         <LazyComponent />
       </Suspense>
     );
   }
   ```

- 여기서 `LazyComponent`는 비동기적으로 로드됨

2. 데이터 페칭

   ```javascript
   const resource = fetchProfileData();

   function ProfilePage() {
     return (
       <Suspense fallback={<h1>Loading profile...</h1>}>
         <ProfileDetails />
         <Suspense fallback={<h1>Loading posts...</h1>}>
           <ProfilePosts />
         </Suspense>
       </Suspense>
     );
   }
   ```

- 여기서 `ProfileDetails`와 `ProfilePosts`는 데이터를 비동기적으로 가져오는 서버 컴포넌트

1. 코드 스플리팅의 경우 -> 컴포넌트 코드 자체가 비동기적으로 로드됨
2. 데이터 페칭의 경우, 컴포넌트는 즉시 렌더링을 시도하지만, 데이터가 준비되지 않았다면 Suspense가 이를 감지하고 fallback UI를 표시

- 즉, Suspense는 이러한 비동기 작업이 완료될 때까지 렌더링을 일시 중단하고, 그 동안 fallback UI를 보여준 후. 작업이 완료되면 실제 컴포넌트를 렌더링

- Suspense의 내부 동작 방식

1. 비동기 작업 감지

   - React는 특정 트리거를 통해 비동기 작업을 감지함

     1. Promise 던지기

     - 비동기 작업이 필요한 컴포넌트는 렌더링 중에 Promise를 throw함

     2. 특별한 객체 반환

     - React.lazy()로 만든 컴포넌트는 특별한 객체를 반환하여 아직 로딩 중임을 나타냄

2. 렌더링 중단

   - React는 이러한 트리거를 만나면 해당 컴포넌트의 렌더링을 중단하고, 가장 가까운 Suspense 경계로 버블업 함

3. Fallback 렌더링

   - 해당 Suspense 컴포넌트는 fallback prop에 지정된 UI를 렌더링

4. 재시도
   - 비동기 작업이 완료되면 React는 자동으로 렌더링을 재시도
