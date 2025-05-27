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
    - 0.xx는 정확히 그 숫자가 아니라서...?
 - +0, -0 를 굳이 구분해야 할까요? 언제 유용할까요?
   - 모르겠음
 - NaN === NaN 이 false 인데, “NaN 검사” 를 안전하게 하려면?
   - Number.isNaN()
 */

/**
 * @param n 입력 실수
 * @param d 고정할 소수 자리수(기본 12)
 * @returns 보정된 숫자
 *
 * 과제 : fixFloat 함수를 완성해 “소수점 오차” 를 지정한 자릿수(d) 까지 반올림합니다.
 * ex) fixFloat(0.1 + 0.2) === 0.3
 */
export const fixFloat = (n: number, d = 12): number => {
  return +n.toFixed(d);
};
