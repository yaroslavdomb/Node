import { describe, it, expect } from "vitest";
import { PASS_REGEXP } from "../db/schemas/patterns.ts";

describe("password regexp validator", () => {
  describe("Valid passwords", () => {
    const validPass = [{ pass: "Asdfg123!", desc: "Typical pass" }];
    validPass.forEach(({ pass, desc }) => {
      it(`Should accept: ${pass} (${desc})`, () => {
        expect(PASS_REGEXP.test(pass)).toBe(true);
      });
    });
  });
  describe("Invalid passwords", () => {
    const invalidPass = [{ pass: "123", desc: "Digits only" }];
    invalidPass.forEach(({ pass, desc }) => {
      it(`Should fail on ${pass} (${desc})`, () => {
        expect(PASS_REGEXP.test(pass)).toBe(false);
      });
    });
  });
});
