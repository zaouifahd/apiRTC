import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { rankMatches } from "../lib/ai/matching.ts";

describe("rankMatches", () => {
  it("keeps available local candidates and ranks by reputation-weighted relevance", () => {
    const ranked = rankMatches(
      [
        { id: "far", distanceKm: 40, rating: 5, reviewCount: 100, afriteScore: 99, isAvailable: true },
        { id: "trusted", distanceKm: 3, rating: 4.8, reviewCount: 84, afriteScore: 92, isAvailable: true },
        { id: "offline", distanceKm: 1, rating: 5, reviewCount: 10, afriteScore: 88, isAvailable: false }
      ],
      { maxDistanceKm: 20 }
    );

    assert.deepEqual(
      ranked.map((candidate) => candidate.id),
      ["trusted"]
    );
  });
});
