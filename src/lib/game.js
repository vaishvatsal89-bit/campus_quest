export function levelFromXp(xp) {
  return Math.max(1, 1 + Math.floor((xp ?? 0) / 100))
}

export function xpProgressInLevel(xp) {
  const inLevel = (xp ?? 0) % 100
  return { current: inLevel, max: 100, percent: inLevel }
}

const BADGE_RULES = [
  { id: 'first-scan', name: 'First Scan', minMissions: 1 },
  { id: 'explorer', name: 'Campus Explorer', minMissions: 3 },
  { id: 'quest-master', name: 'Quest Master', minMissions: 5 },
  { id: 'legend', name: 'Campus Legend', minMissions: 10 },
]

export function badgesEarned(completedCount) {
  return BADGE_RULES.filter((b) => completedCount >= b.minMissions)
}

export function newBadgesToAward(completedCount, existingBadgeNames) {
  const earned = badgesEarned(completedCount)
  const have = new Set(existingBadgeNames ?? [])
  return earned.filter((b) => !have.has(b.name))
}
