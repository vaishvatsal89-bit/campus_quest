/** Edit names to match your campus — teammates can update without coding. */
export const CAMPUS_SPOTS = [
  {
    id: 'library',
    name: 'Central Library',
    emoji: '📚',
    hint: 'Where knowledge sleeps in stacks of books',
  },
  {
    id: 'canteen',
    name: 'Main Canteen',
    emoji: '🍜',
    hint: 'Fuel for every late-night study session',
  },
  {
    id: 'auditorium',
    name: 'Auditorium',
    emoji: '🎭',
    hint: 'Echoes of events and orientations',
  },
  {
    id: 'sports',
    name: 'Sports Ground',
    emoji: '⚽',
    hint: 'Open field, big energy',
  },
  {
    id: 'gate',
    name: 'Main Gate',
    emoji: '🏛️',
    hint: 'Every journey starts and ends here',
  },
  {
    id: 'garden',
    name: 'Campus Garden',
    emoji: '🌳',
    hint: 'Trees, benches, and quiet corners',
  },
]

export function getSpotById(id) {
  return CAMPUS_SPOTS.find((s) => s.id === id) ?? CAMPUS_SPOTS[0]
}
