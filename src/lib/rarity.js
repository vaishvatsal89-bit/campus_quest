export function getMissionRarity(xp) {
  if (xp >= 70) return { tier: 'epic', label: '✦ EPIC QUEST', className: 'rarity-epic' }
  if (xp >= 55) return { tier: 'rare', label: '★ RARE QUEST', className: 'rarity-rare' }
  return { tier: 'common', label: 'QUEST', className: 'rarity-common' }
}