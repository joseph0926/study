# 레벨 1-A: 이벤트 루프와 실행 모델

## 개요

JavaScript의 실행 모델을 완전히 이해하기 위한 단계별 학습 과정입니다.

---

## Phase 1: Call Stack (완료 ✅)

### 학습 목표
- Call Stack의 동작 원리 이해
- 싱글쓰레드의 정확한 의미 체득
- Stack Overflow 메커니즘 이해

### 완료한 실험

#### [실험 1.1: 함수 호출의 물리적 실체](experiments/experiment-1.1-call-stack-basics.md)
**핵심 질문**: 함수가 중첩되어 호출될 때, 실행 순서는?

**배운 것**:
- 함수 호출 → Call Stack에 쌓임 (PUSH)
- 함수 return → Call Stack에서 제거 (POP)
- LIFO (Last In First Out) 구조
- 명시적 return이 없어도 암묵적 return 존재

**실험 결과**: 예측 일치 ✅

---

#### [실험 1.2: Call Stack의 한계](experiments/experiment-1.2-stack-overflow.md)
**핵심 질문**: Call Stack에 함수가 무한히 쌓일 수 있는가?

**배운 것**:
- Call Stack 최대 크기: 약 10,364개 (Chrome V8 기준)
- 한계 초과 시: `RangeError: Maximum call stack size exceeded`
- try/catch로 에러를 잡으면 프로그램 계속 실행 가능
- 무한 재귀는 Stack Overflow 발생으로 자동 중단

**실험 결과**: 예측 불일치 → 중요한 발견
- 예상: 에러 없이 브라우저 프리징
- 실제: JavaScript 에러 발생 후 즉시 중단

---

#### [실험 1.3: try/catch 없이 Stack Overflow](experiments/experiment-1.3-uncaught-error.md)
**핵심 질문**: try/catch로 잡히지 않은 RangeError는 어떻게 동작하는가?

**배운 것**:
- Uncaught Error → 스크립트 즉시 중단
- 에러 이후 코드는 실행되지 않음
- 브라우저는 정상 작동 (스크립트만 중단)
- `Uncaught` 표시 = 에러가 처리되지 않았음을 의미

**실험 결과**: 예측 일치 ✅

---

### Phase 1 핵심 학습 정리

#### 1. Call Stack 동작 원리
```
함수 호출 → PUSH to Call Stack
함수 return → POP from Call Stack
```

**시각화**:
```javascript
function third() {
  console.log("3");
  // return (암묵적)
}

function second() {
  console.log("2 시작");
  third();  // Call Stack: [second, third]
  console.log("2 끝");
}

function first() {
  console.log("1 시작");
  second();  // Call Stack: [first, second]
  console.log("1 끝");
}

first();  // Call Stack: [first]
```

**Call Stack 변화**:
```
1. [first]
2. [first, second]
3. [first, second, third]
4. [first, second]         ← third return
5. [first]                 ← second return
6. []                      ← first return
```

---

#### 2. Call Stack 한계와 Stack Overflow

**물리적 한계**:
- Chrome V8: 약 10,364개
- 브라우저/환경마다 다름
- 메모리 구조에 의한 제한

**Stack Overflow 발생 조건**:
```javascript
function recursion() {
  recursion();  // return 없음 → 계속 쌓임
}

recursion();  // 10,364번 호출 후 RangeError
```

---

#### 3. 에러 처리의 중요성

| | try/catch 있음 | try/catch 없음 |
|---|---|---|
| **에러 표시** | catch 블록에서 처리 | Uncaught Error |
| **다음 코드** | 실행됨 ✅ | 중단됨 ❌ |
| **브라우저** | 정상 | 정상 |
| **복구** | 가능 | 불가능 |

---

#### 4. 무한 재귀 vs 무한 리렌더링

**핵심 차이점**:

| 항목 | 무한 재귀 | 무한 리렌더링 (React) |
|------|----------|---------------------|
| **Call Stack** | 계속 쌓임 | 매번 비워짐 |
| **에러** | RangeError (10,364번) | 에러 없음 |
| **중단** | 즉시 (에러 발생 시) | 메모리 소진 시 |
| **결과** | 스크립트 중단 | 브라우저 프리징 |

**왜 차이가 나는가?**

무한 재귀:
```javascript
recursion() → recursion() → recursion() → ...
[Call Stack: recursion, recursion, recursion, ...]
→ 10,364개 쌓임 → RangeError
```

무한 리렌더링:
```javascript
render() → return → (Call Stack 비움)
render() → return → (Call Stack 비움)
render() → return → (Call Stack 비움)
...
→ Call Stack은 비어있음 → RangeError 없음
→ 하지만 계속 반복 → 메모리 소진 → 프리징
```

---

### 학습 성과

#### 체득한 개념
- ✅ Call Stack의 LIFO 구조
- ✅ 싱글쓰레드 = 한 번에 하나의 함수만 실행
- ✅ Stack Overflow의 정확한 메커니즘
- ✅ try/catch의 역할과 중요성
- ✅ Uncaught Error의 동작 방식

#### 사고 습관 개선
- ✅ 모호한 용어 제거 ("비동기", "나중에" 등)
- ✅ 정확한 용어 사용 ("Call Stack에 쌓인다", "return하면 제거된다")
- ✅ 예측 → 실험 → 검증 사이클 확립
- ✅ 대안 가설 제시 습관
- ✅ 경험과 실험 결과 비교

---

## Phase 2: setTimeout과 Task Queue (다음 단계)

### 학습 목표
- setTimeout(0)의 정확한 의미
- Task Queue의 동작 원리
- Call Stack과 Task Queue의 관계

### 핵심 질문
```javascript
console.log('A');
setTimeout(() => console.log('B'), 0);
console.log('C');
// 결과: A → C → B
// 왜 B가 마지막?
```

### 실험 계획
- 실험 2.1: setTimeout(0)의 배신
- 실험 2.2: setTimeout이 정확히 0ms가 아닌 이유
- 실험 2.3: 블로킹 코드가 타이머에 미치는 영향

---

## 실험 파일 구조

```
level-1-event-loop/
├── README.md (현재 파일)
├── experiments/
│   ├── experiment-1.1-call-stack-basics.md
│   ├── experiment-1.1.html
│   ├── experiment-1.2-stack-overflow.md
│   ├── experiment-1.2.html
│   ├── experiment-1.3-uncaught-error.md
│   └── experiment-1.3.html
└── docs/
    └── (미래: 개념 정리 문서)
```

---

## 참고 자료

### 완료한 실험 문서
- [실험 1.1: 함수 호출의 물리적 실체](experiments/experiment-1.1-call-stack-basics.md)
- [실험 1.2: Call Stack의 한계](experiments/experiment-1.2-stack-overflow.md)
- [실험 1.3: try/catch 없이 Stack Overflow](experiments/experiment-1.3-uncaught-error.md)

### 학습 도구
- Chrome DevTools (Console, Sources)
- http://latentflip.com/loupe/ (이벤트 루프 시각화, Phase 2에서 사용)

---

## 다음 단계로 가기 전 체크리스트

- [x] Call Stack의 LIFO 구조 이해
- [x] Stack Overflow 발생 조건 이해
- [x] try/catch의 역할 이해
- [x] Uncaught Error의 동작 이해
- [x] 무한 재귀와 무한 리렌더링의 차이 이해
- [ ] setTimeout과 비동기의 관계 (Phase 2)
- [ ] Event Loop의 동작 원리 (Phase 2)
- [ ] Microtask vs Macrotask (Phase 3)
