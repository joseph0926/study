# Anti-Pattern: [패턴 이름]

## 개요

**안티패턴 설명:**
[이 안티패턴이 무엇인지 한 문장으로]

**왜 문제인가:**

- 문제점 1
- 문제점 2
- 문제점 3

**발생 빈도:** ⭐⭐⭐⭐⭐ (1-5)

**심각도:** 🔴 높음 / 🟡 중간 / 🟢 낮음

---

## 잘못된 코드 예시

```[언어]
// ❌ 안티패턴
[잘못된 코드]
```

문제점:

- [구체적 문제 1]
- [구체적 문제 2]
- [구체적 문제 3]

실제 결과:

[실행 결과 또는 에러]

왜 이렇게 작성하게 되는가:

- 오해 1: [흔한 오해]
- 오해 2: [잘못된 가정]

---

## 올바른 해결 방법

### 해결 방법 1: [방법 이름]

```[언어]
// ✅ 올바른 코드
[올바른 코드]
```

개선 포인트:

- ✅ [개선점 1]
- ✅ [개선점 2]

언제 사용:

- [상황 1]
- [상황 2]

### 해결 방법 2: [대안 방법]

```[언어]
// ✅ 대안 (다른 접근)
[대안 코드]
```

장단점:

- 장점: [...]
- 단점: [...]

언제 사용:

- [상황]

---

## 실무 사례

### 사례 1: [구체적 상황]

문제 상황:

```[언어]
// 실제 프로젝트에서 발생한 버그
[실제 코드]
```

증상:

- [어떤 문제가 발생했는지]

원인 분석:

- [왜 발생했는지]

해결:

```[언어]
// 수정된 코드
[수정 코드]
```

---

## 디버깅 방법

증상 확인:

- [확인할 증상 1]
- [확인할 증상 2]

디버깅 단계:

```[언어]
// 1. 문제 재현
[재현 코드]

// 2. 로그 추가
[로그 출력 코드]

// 3. 원인 파악
// [원인]

// 4. 수정
[수정 코드]
```

관련 개념

이 안티패턴과 관련된 개념:

[개념 1]: [관계 설명]
[개념 2]: [관계 설명]

참고할 실험:

실험 X.Y: [실험명]

체크리스트

코드 리뷰 시 확인:

[확인 항목 1]

[확인 항목 2]

[확인 항목 3]

참고 자료

[링크 1]
[링크 2]

---

## 사용 예시

실제 안티패턴 문서 작성 시 아래와 같이 활용하세요:

### 예시: 기술 스택별 파일 경로

**JavaScript/TypeScript:**
- `javascript/fundamentals/anti-patterns/[패턴명].md`
- `typescript/advanced/anti-patterns/[패턴명].md`

**번들러:**
- `bundler/webpack/anti-patterns/[패턴명].md`

**프레임워크:**
- `react/hooks/anti-patterns/[패턴명].md`
- `next/routing/anti-patterns/[패턴명].md`

---

## 📄 작성 가이드라인

### 1. 코드 블록 언어 지정

각 기술 스택에 맞는 언어 태그 사용:
- JavaScript: `` ```javascript ``
- TypeScript: `` ```typescript ``
- JSX/TSX: `` ```jsx `` 또는 `` ```tsx ``
- Config: `` ```json ``, `` ```yaml ``, etc.

### 2. 용어 일관성

기술 스택별 정확한 용어 사용:
- JavaScript: "Call Stack", "Event Loop", "Task Queue"
- React: "Component", "Hook", "Virtual DOM"
- Webpack: "Loader", "Plugin", "Bundle"
- Next.js: "Server Component", "App Router", "Route Handler"

### 3. 디버깅 도구 명시

각 기술에 맞는 디버깅 도구 안내:
- JavaScript: Chrome DevTools, Node.js Inspector
- React: React DevTools
- Webpack: webpack-bundle-analyzer
- Next.js: Next.js DevTools, Turbopack trace

---

## 📄 실제 예시 (참고용)

### JavaScript - setTimeout 루프

**파일**: `javascript/fundamentals/anti-patterns/setTimeout-in-loop.md`

````markdown
# Anti-Pattern: 루프 내부 setTimeout의 클로저 함정

## 개요

**안티패턴 설명:**
루프 내부에서 setTimeout을 사용할 때 var를 사용하면 모든 콜백이 동일한 변수를 참조하는 문제

**왜 문제인가:**

- 예상과 다른 출력 (모두 같은 값)
- 클로저와 이벤트 루프에 대한 오해
- 디버깅하기 어려운 미묘한 버그

**발생 빈도:** ⭐⭐⭐⭐⭐ (매우 흔함)

**심각도:** 🟡 중간 (로직 버그, 보안 문제는 아님)

---

## 잘못된 코드 예시

```javascript
// ❌ 안티패턴
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 100);
}
```
````

(상세 내용은 JavaScript 특화 안티패턴 문서로 분리하여 관리)
