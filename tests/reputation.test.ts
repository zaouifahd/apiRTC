import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { calculateAfriteScore } from "../lib/reputation/score.ts";

const base = {
  averageRating: 4.9,
  completedMissions: 84,
  accountAgeDays: 540,
  identityVerified: true,
  phoneVerified: true,
  responseRate: 0.98,
  satisfactionRate: 0.98
};

describe("calculateAfriteScore", () => {
  it("produces a high score for a trusted verified member", () => {
    assert.ok(calculateAfriteScore(base) >= 85);
  });

  it("caps scores at 100", () => {
    assert.equal(calculateAfriteScore({ ...base, averageRating: 5, completedMissions: 10000, accountAgeDays: 5000, responseRate: 1, satisfactionRate: 1 }), 100);
  });
});
