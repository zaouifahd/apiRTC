export type MatchCandidate = {
  id: string;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  afriteScore: number;
  isAvailable: boolean;
  priceDzd?: number;
};

export type MatchPreferences = {
  maxDistanceKm: number;
  budgetMaxDzd?: number;
};

export function rankMatches(candidates: MatchCandidate[], preferences: MatchPreferences): MatchCandidate[] {
  return [...candidates]
    .filter((candidate) => candidate.isAvailable)
    .filter((candidate) => candidate.distanceKm <= preferences.maxDistanceKm)
    .filter((candidate) => !preferences.budgetMaxDzd || !candidate.priceDzd || candidate.priceDzd <= preferences.budgetMaxDzd)
    .sort((a, b) => scoreCandidate(b, preferences) - scoreCandidate(a, preferences));
}

function scoreCandidate(candidate: MatchCandidate, preferences: MatchPreferences): number {
  const distanceScore = 1 - candidate.distanceKm / preferences.maxDistanceKm;
  const ratingScore = candidate.rating / 5;
  const confidence = Math.min(1, Math.log10(candidate.reviewCount + 1));
  const reputation = candidate.afriteScore / 100;

  return distanceScore * 0.25 + ratingScore * 0.25 + confidence * 0.15 + reputation * 0.35;
}
