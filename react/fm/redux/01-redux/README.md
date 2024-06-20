# RTK - Typescript

## useSelector, useDispatch에 대한 타입

```ts
// store.ts
export type ApplicationState = ReturnType<typeof store.getState>;
export type ApplicationDispatch = typeof store.dispatch;
```

## 타입을 적용한 커스텀 useSelector & useDispatch 훅

```ts
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { ApplicationDispatch, ApplicationState } from "./store";

export const useAppSelector: TypedUseSelectorHook<ApplicationState> =
  useSelector;

export const useAppDispatch: () => ApplicationDispatch = useDispatch;
```

```tsx
// 사용
const dispatch = useAppDispatch();

const tasks = useAppSelector((state) => state.tasks.entities);
```

## 원하는 타입을 제외한 나머지 타입을 모두 옵셔널로 만드는 커스텀 타입

```ts
type RequireOnly<T, P extends keyof T> = Pick<T, P> & Partial<Omit<T, P>>;

// 사용
type DraftTask = RequireOnly<Task, "title">;
```
