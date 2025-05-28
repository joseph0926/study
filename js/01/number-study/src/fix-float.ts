export function fixFloatConsole() {
  console.log(0.1 + 0.2);
  console.log(0.3 === 0.1 + 0.2);
  console.log(Number.EPSILON);
  console.log(Object.is(+0, -0));
  // @ts-expect-error no
  console.log(NaN === NaN, Number.isNaN(NaN));
}

/**
 - 0.1 + 0.2 가 0.300000… 으로 끝나는 이유는?
    - js의 Number는 64 bit 부동소수점인데, js에서 실제로 값을 표현하는 부분은 53 유효비트뿐이라 0.1·0.2 같은 무한소수를 정확히 담지못하여 근사값인 0.30000000000000004가 나옴
 - +0, -0 를 굳이 구분해야 할까요? 언제 유용할까요?
   - 부호는 방향정보를 뜻할 수 있음 1/+0 = Infinity, 1/-0 = -Infinity
 - NaN === NaN 이 false 인데, “NaN 검사” 를 안전하게 하려면?
   - Number.isNaN(x) or Object.is(x, NaN)
 */

/**
 * @param n 입력 실수
 * @param d 고정할 소수 자리수(기본 12)
 * @returns 보정된 숫자
 *
 * 과제 : fixFloat 함수를 완성해 “소수점 오차” 를 지정한 자릿수(d) 까지 반올림합니다.
 * ex) fixFloat(0.1 + 0.2) === 0.3
 */
// export const fixFloat = (n: number, d = 12): number => {
//   return +n.toFixed(d);
// };

export const fixFloat = (n: number, d = 12) =>
  Math.round((n + Number.EPSILON) * 10 ** d) / 10 ** d;
