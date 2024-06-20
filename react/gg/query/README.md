# React Query

## 목차

[왜 React Query를 사용하는지](#왜-react-query를-사용하는지)

[QueryClient](#react-quert--queryclient)

[Fetching Data](#fetching-data)

## 왜 React Query를 사용하는지

- 기본적으로 React는 개발자가 `상태` 변화에 대한 처리만 신경 쓰면, 나머지는 React에서 처리해줍니다.
- React는 컴포넌트 개념을 활용하여 UI에 대한 시각적 표현뿐만 아니라, 그와 관련된 상태와 로직을 캡슐화하여 처리합니다.

  - 이러한 컴포넌트(캡슐화)를 통해 UI에 대한 조합과 재사용성을 높입니다.

- 하지만 실제 애플리케이션에는 UI뿐만 아니라 비시각적 로직이 필요합니다.

  - 이러한 비시각적 로직을 캡슐화하여 조합과 재사용성을 높이는 것이 `훅`입니다.

  - 훅의 종류:
    - `useState`: 렌더링 간에 유지되는 값을 생성하며, 값이 변경될 때 다시 렌더링을 트리거합니다.
    - `useEffect`: 컴포넌트를 외부 시스템과 동기화합니다.
    - `useRef`: 렌더링 간에 유지되지만, 값이 변경되더라도 다시 렌더링을 트리거하지 않는 값을 생성합니다.
    - `useContext`: Context의 Provider에 전달된 값에 접근합니다.
    - `useReducer`: 리듀서 패턴을 사용하여 렌더링 간에 유지되며, 값이 변경될 때 다시 렌더링을 트리거하는 값을 생성합니다.
    - `useMemo`: 렌더링 간에 계산 결과를 캐시합니다.
    - `useCallback`: 렌더링 간에 함수를 캐시합니다.
    - `useLayoutEffect`: 브라우저가 화면을 그리기 전에 컴포넌트를 외부 시스템과 동기화합니다.
    - `useXXX`: React 훅이나 다른 커스텀 훅을 활용하여 자신만의 훅을 만들 수 있기 때문에 훅의 조합성을 높여줍니다.

- 하지만, 이런 React 내장 훅에는 데이터 패칭과 직접적으로 연관된 훅은 없습니다.

  - 그나마 가능한 방법은 `useEffect` 내에서 `fetch` 등을 이용해 데이터를 비동기적으로 가져오고 `useState`를 사용해 데이터를 보존하는 방법뿐입니다.

- 위의 방법은 데이터 패칭에 대한 기본 해결 전략을 제시해주지만, 여러 문제점이 존재합니다.

  - 여러 문제가 있지만 가장 큰 문제는 데이터 패칭으로 가져온 데이터가 해당 컴포넌트에만 적용되는 로컬 데이터라는 것입니다.
    - React는 같은 컴포넌트라도 두 번 각각 사용되면 다른 인스턴스이므로 다른 상태를 가집니다.
    - 따라서 같은 데이터를 가져오더라도 다른 컴포넌트라면 다시 로딩을 기다리는 등의 과정이 필요합니다.
  - 또 다른 문제는 같은 API 요청이더라도 어떤 컴포넌트에서는 성공하고, 다른 컴포넌트에서는 실패할 수 있다는 점입니다.
    - 즉, 같은 API를 호출하였기 때문에 같은 상태를 가질 것으로 가정하고 로직을 작성했는데, 다른 결과로 인해 예상치 못한 결과가 나올 수 있습니다.

- 그러면 Context나 prop 드릴링으로 해결되는 문제가 아닐지?

  - 가능은 하지만 최적화 문제가 새롭게 발생합니다.
    - Context는 하나의 거대한 전역 저장소에 모든 상태 조각이 관리되므로, 데이터 패칭만 구독하고 있는 컴포넌트도 다른 Context 상태가 변화되면 재렌더링됩니다.
    - 또한 두 개의 컴포넌트가 동시에 같은 요청을 보내면 중복 요청을 방지할 방법이 없습니다.
      - 앞서 언급했듯이 컴포넌트마다 독립적이기 때문입니다.
    - 마지막으로 캐시 무효화에 대한 명확한 해답이 없습니다.

- 위의 문제를 해결하는 라이브러리가 `React Query`입니다.
  - 단, React Query는 단순히 데이터 패칭을 위한 라이브러리가 아닌, 서버(비동기) 상태 관리자입니다.
    - 클라이언트(동기) 상태 vs 서버(비동기) 상태:
      - 클라이언트 상태:
        1. 항상 최신 상태입니다.
        2. 로컬입니다 => 자기 자신만이 상태를 변경할 수 있습니다.
        3. 일반적으로 브라우저가 닫히면 사라집니다.
        4. 동기적으로 즉시 사용 가능합니다.
      - 서버 상태:
        1. 사용자가 보는 것은 스냅샷입니다 => 오래된 상태일 수 있습니다.
        2. 서버 소유입니다 => 다수의 사용자가 상태를 변경할 수 있습니다.
        3. 일반적으로 상태가 지속됩니다.
        4. 비동기적으로 서버에서 클라이언트에 도착하기까지 약간의 시간이 걸립니다.

## React Quert / QueryClient

- react-query로 관리되는 모든 데이터는 QueryCache에 존재하고, 이 QueryCache는 QueryClient에 포함 및 관리됩니다.
- QueryClient는 가장 상위 컴포넌트 밖에서 생성되어야합니다.

  - 이렇게 구성함으로써 애플리케이션이 리렌더링되어도 캐시가 유지됩니다. (정적 객체)

  ```js
  const queryClient = new QueryClient();

  export default function App() {
    // ...
  }
  ```

- 단, 이렇게 밖에서 생성되었으므로 모든 컴포넌트와 상호작용하기 위해서는 Provider가 필요합니다.

  ```js
  const queryClient = new QueryClient();

  export default function App() {
    <QueryClientProvider client={queryClient}>{/* ... */}</QueryClientProvider>;
  }
  ```

  - 이렇게 구성하므로써 모든 컴포넌트에서 query cache를 사용 가능해집니다.
    - 이 QueryClientProvider는 Context API의 의존성 주입 기능을 활용합니다.

- 위의 내용을 조합해보면, 모든 컴포넌트에서 QueryClient에 내장되어있는 QueryCache에 접근 및 사용이 가능하며, queryClient는 정적 객체이므로 애플리케이션의 리렌더링과는 상관없이 캐시가 유지됩니다.
- 각 컴포넌트에서는 보통 캐시를 `useQuery`훅으로 관리하며, 이 훅은 기본적으로 QueryCache를 구독하고있으며, cache가 변경되면 리렌더링을 수행합니다
  - 그러면 아래와 같은 의문점이 생깁니다.
    1. 어떻게 캐시가 변경되는지 아는지
    - useQuery마다 `queryKey`가 존재하고, queryKey의 캐시에 이미 데이터가 존재하면 useQuery는 해당 데이터를 즉시 반환합니다
    2. 캐싱될 데이터는 어떻게 가져오는지
    - useQuery마다 `queryFn`이 존재하고, 캐시된 데이터가 없다면 queryFn을 호출하여 데이터를 가져온 후 queryKey의 캐시에 넣은 다음 반환합니다
- queryKey와 queryFn의 조건
  - queryKey: 고유한 키여야함
  - queryFn: Promise를 반환하는 함수여야함

## Fetching Data

- react-query는 기본적으로 요청을 실행하지 않음 (요청을 실행하는 건 예를들어 fetch, axios등,,)
  - react-query는 오직 Promise의 상태와 해당 Promise의 데이터에만 관심있음
  - 따라서 react-query를 이용하여 데이터를 가져오는등의 작업을 수행하려면 fetch, axios등과의 결합이 필요

```js
const fetchRepos = async () => {
  try {
    const response = await fetch("https://api.github.com/orgs/TanStack/repos");

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};
```

- 위의 예제가 일반적인 fetch만을 이용해 데이터를 가져오는 방법이라면

```js
function useRepos() {
  return useQuery({
    queryKey: ["repos"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.github.com/orgs/TanStack/repos"
      );

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      return response.json();
    },
  });
}
```

```ts
// ts의 경우
async function fetchRepos(): Promise<Array<RepoData>>;
// or
return response.json() as Array<RepoData>;
```

- 위의 예제가 react-query의 `useQuery`를 결합하여 데이터를 가져오는 방법

- 둘의 차이점
  - 기본적으로 try/catch로 감싸지 않아도됨
    - fetch만 사용했을 때는, 던져진 에러를 catch 블럭에서 잡아서 처리를 해줘야했음
    - 반면, useQuery의 error or isError를 사용하기 위해서는 단지 error가 있다는 사실만 알려주면됨
  - await response.json()을 반환하는게 아닌, response.json()을 반환하면됨
