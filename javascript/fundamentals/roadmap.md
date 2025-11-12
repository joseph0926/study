# JavaScript Fundamentals 학습 로드맵

## 완료된 학습

### 레벨 0: 코드 전달 메커니즘
- script 태그의 로딩 방식 (일반, async, defer)
- 다운로드와 실행의 분리
- HTML 파싱 블로킹 메커니즘
- 브라우저 멀티 쓰레드 구조 (메인 쓰레드 vs 네트워크 쓰레드)

**핵심 학습:**
- async: 다운로드 완료 즉시 실행 (순서 보장 X)
- defer: HTML 파싱 완료 후 실행 (선언 순서 보장 O)
- 일반 스크립트의 블로킹 이유: document.write() 호환성

---

## 다음 학습 계획

### 레벨 1-A: 이벤트 루프와 실행 모델 (우선순위 1)

**목표:**
- "JS는 싱글쓰레드"의 정확한 의미 이해
- 비동기 코드의 실행 순서 예측 능력

**핵심 개념:**
1. Call Stack
2. Task Queue (Callback Queue)
3. Event Loop의 동작 방식
4. Microtask vs Macrotask

**핵심 질문:**
```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// 결과: 1 → 4 → 3 → 2
// 왜 이런 순서인가?
```

**실험 계획:**

실험 1.1: setTimeout(0)의 의미
```javascript
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');
```

실험 1.2: 블로킹 코드가 타이머에 미치는 영향
```javascript
setTimeout(() => console.log('timeout'), 1000);
const start = Date.now();
while (Date.now() - start < 3000) {} // 3초 블로킹
// timeout은 1초 후? 3초 후?
```

실험 1.3: Microtask vs Macrotask 우선순위
```javascript
setTimeout(() => console.log('setTimeout'));
Promise.resolve().then(() => console.log('Promise 1'));
Promise.resolve().then(() => console.log('Promise 2'));
setTimeout(() => console.log('setTimeout 2'));
```

**학습 도구:**
- http://latentflip.com/loupe/ (이벤트 루프 시각화)

**레벨 0과의 연결:**
- 레벨 0: "async는 다운로드 완료 즉시 실행"
- 레벨 1: "즉시"의 정확한 의미 = 현재 실행 중인 코드 완료 후, 다음 이벤트 루프 턴에

---

### 레벨 1-B: DOMContentLoaded vs load vs defer/async (우선순위 2)

**목표:**
- 브라우저 로딩 타임라인 완전 이해
- defer/async의 실용적 활용

**핵심 질문:**
```javascript
window.addEventListener('DOMContentLoaded', () => {});
window.addEventListener('load', () => {});
// 차이는? 각각 언제 발생?
```

**타임라인 완성:**
```
0ms: HTML 파싱 시작
  ↓ (일반 스크립트 실행)
?ms: HTML 파싱 완료
  ↓ (defer 스크립트 실행)
?ms: DOMContentLoaded 이벤트
  ↓ (이미지, CSS 등 리소스 로딩)
?ms: load 이벤트
```

**실험 계획:**

실험 1.4: 이벤트 발생 순서 측정
```html
<script defer>
  console.log('1. defer 실행');
</script>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    console.log('2. DOMContentLoaded');
  });

  window.addEventListener('load', () => {
    console.log('3. load');
  });
</script>

<img src="large-image.jpg">
```

실험 1.5: defer vs DOMContentLoaded 타이밍
```javascript
// defer 스크립트가 DOMContentLoaded보다 먼저인가?
// 아니면 DOMContentLoaded가 defer를 트리거하는가?
```

**검증할 가설:**
- defer 스크립트 실행 → DOMContentLoaded 발생
- DOMContentLoaded → load 순서 보장
- async 스크립트는 DOMContentLoaded와 무관

---

### 레벨 1-C: ES Modules (우선순위 3)

**목표:**
- `<script type="module">`의 작동 방식
- defer와의 차이점 이해

**핵심 질문:**
```html
<script src="app.js" defer></script>
<script src="app.js" type="module"></script>
<!-- 차이는? -->
```

**비교 포인트:**
1. 실행 시점 (둘 다 defer처럼?)
2. 스코프 (module은 자체 스코프)
3. strict mode (module은 자동)
4. CORS 정책

**실험 계획:**

실험 1.6: module vs defer 스코프
```javascript
// module.js
console.log('module:', this); // undefined?

// defer.js
console.log('defer:', this); // window?
```

실험 1.7: module 실행 순서
```html
<script type="module" src="a.js"></script>
<script type="module" src="b.js"></script>
<!-- 순서 보장? -->
```

---

### 레벨 2: 파싱과 AST (보류)

레벨 1 완료 후 필요성 재검토.

**이론적 내용:**
- Tokenization
- Abstract Syntax Tree
- Hoisting의 원리

**실무 연관성이 낮으므로 우선순위 낮음.**

---

## 학습 방법론

### 실험 사이클
1. 구체적인 질문 정의
2. 가설 세우기 (최소 2개 이상의 대안)
3. 실험 설계 (변수 하나씩만 변경)
4. 결과 관찰 및 기록
5. 예측과 결과 비교
6. 새로운 질문 도출

### 문서화 구조
```markdown
# level-X-주제.md

## 최상위 질문

## 가설
1. 가설 A
2. 가설 B

## 실험 X.Y
[코드]

## 관찰 결과

## 분석
- 예측과 일치/불일치
- 왜 그런가?

## 새로운 질문
```

### 주의사항
- "비동기", "나중에" 같은 모호한 용어 지양
- "무엇이 무엇을 블로킹" 같은 주체-대상 명확화
- 숨겨진 가정 찾기
- 실험 환경을 현실과 유사하게 (file:// 주의)

---

## 3주 학습 계획

### Week 1: 이벤트 루프
- Day 1-2: Call Stack 이해 (함수 호출, Stack Overflow)
- Day 3-4: Task Queue와 이벤트 루프 (setTimeout)
- Day 5-7: Promise와 Microtask (우선순위)

### Week 2: DOM 이벤트 + 모듈
- Day 1-3: DOMContentLoaded vs load vs defer/async
- Day 4-5: ES Modules 기초
- Day 6-7: 동적 import, code splitting

### Week 3: 통합 및 최적화
- 배운 내용을 활용한 실제 웹페이지 로딩 최적화
- 성능 측정 및 분석
- Critical rendering path 실험

---

## 참고 자료

### 도구
- Chrome DevTools (Network, Performance 탭)
- http://latentflip.com/loupe/ (이벤트 루프 시각화)

### 검증이 필요한 남은 질문 (레벨 0)
- async 여러 개의 실행 순서 (다운로드 완료 순)
- defer 여러 개의 실행 순서 (선언 순서 보장)
