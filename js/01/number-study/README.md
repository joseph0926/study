## 01.1 Number Study

### Quiz

- Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2 가 true 인 이유는?

- parseInt('08') === 8 이 항상 보장될까?

- Math.round((0.105+Number.EPSILON)\*100)/100 의 결과는?

- Infinity - Infinity 의 값은?

- JSON 직렬화 시 BigInt 를 포함한 객체를 stringify 하면 어떻게 될까?

### EX

① 금액 합산 컴포넌트
모든 금액을 원 단위 정수로 관리하고, UI 표시 때만 ₩ 단위 변환.
Intl.NumberFormat('ko-KR', { style:'currency', currency:'KRW' })

② 25 분 포모도로 타이머
Date.now() 기준으로 남은 시간 계산 → 소수 오차 X

화면 깜빡임 최소화 : requestAnimationFrame
