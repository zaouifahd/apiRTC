export type ReputationInput = {
  averageRating: number;
  completedMissions: number;
  accountAgeDays: number;
  identityVerified: boolean;
  phoneVerified: boolean;
  responseRate: number;
  satisfactionRate: number;
};

const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value));

export function calculateAfriteScore(input: ReputationInput): number {
  const rating = clamp((input.averageRating / 5) * 30, 0, 30);
  const missions = clamp(Math.log10(input.completedMissions + 1) * 18, 0, 18);
  const age = clamp((input.accountAgeDays / 365) * 10, 0, 10);
  const verification = (input.identityVerified ? 14 : 0) + (input.phoneVerified ? 6 : 0);
  const responsiveness = clamp(input.responseRate * 12, 0, 12);
  const satisfaction = clamp(input.satisfactionRate * 10, 0, 10);

  return Math.round(clamp(rating + missions + age + verification + responsiveness + satisfaction));
}
