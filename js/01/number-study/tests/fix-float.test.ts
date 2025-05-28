import { it, expect } from "vitest";
import { fixFloat } from "../src/fix-float";

it("0.1 + 0.2 === 0.3", () => {
  expect(fixFloat(0.1 + 0.2)).toBe(0.3);
});

it("반올림 자리수 조절", () => {
  expect(fixFloat(1 / 3, 4)).toBe(0.3333);
});

it("엣지 케이스", () => {
  expect(fixFloat(1.005, 2)).toBe(1.01);
  expect(fixFloat(0.615, 2)).toBe(0.62);
});
