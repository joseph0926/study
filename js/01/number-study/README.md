## 01.1 Number Study

### Quiz

- Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2 가 true 인 이유는?

  - Number.MAX_SAFE_INTEGER가 53비트 단위일것이고 여기에 +1을 하나 +2를 하나 53비트를 초과하여 반올림되어 같은 값으로 근사됨

- parseInt('08') === 8 이 항상 보장될까?

  - 08이 8진수로 판단 될 수 있으므로 안정성을 위해 `parseInt("08", 10)`으로 정확히 명시해야함

- Math.round((0.105+Number.EPSILON)\*100)/100 의 결과는?

  - Number.EPSILON??? -> Number.EPSILON은 2⁻⁵² ≈ 2.22 × 10⁻¹⁶ — JS가 표현할 수 있는 가장 작은 차이

- Infinity - Infinity 의 값은?

  - NaN

- JSON 직렬화 시 BigInt 를 포함한 객체를 stringify 하면 어떻게 될까?
  - JSON.stringify는 BigInt를 지원하지 않음 -> 따라서 BigInt를 string으로 변환한 후 JSON으로 변환해야함

### EX

① 금액 합산 컴포넌트
모든 금액을 원 단위 정수로 관리하고, UI 표시 때만 ₩ 단위 변환.
Intl.NumberFormat('ko-KR', { style:'currency', currency:'KRW' })

② 25 분 포모도로 타이머
Date.now() 기준으로 남은 시간 계산 → 소수 오차 X

화면 깜빡임 최소화 : requestAnimationFrame
