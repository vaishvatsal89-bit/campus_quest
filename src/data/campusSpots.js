
export const CAMPUS_SPOTS = [
  {
    id: 'library',
    name: 'Central Library',
    emoji: '📚',
    hint: 'Where knowledge sleeps in stacks of books',
    lat: 28.473459,
    lng: 77.482396,
  },
  {
    id: 'canteen',
    name: 'Main Canteen',
    emoji: '🍜',
    hint: 'Fuel for every late-night study session',
    lat: 28.4726,
    lng: 77.4830,
  },
  {
    id: 'auditorium',
    name: 'Auditorium',
    emoji: '🎭',
    hint: 'Echoes of events and orientations',
    lat: 28.4732148,
    lng: 77.4799516,
  },
  {
    id: 'sports',
    name: 'Sports Ground',
    emoji: '⚽',
    hint: 'Open field, big energy',
    lat: 28.473073168243275,
    lng: 77.48288750808618,
  },
  {
    id: 'gate',
    name: 'Main Gate',
    emoji: '🏛️',
    hint: 'Every journey starts and ends here',
    lat: 28.472890365110615,
    lng: 77.48306855399578,
  },
  {
    id: 'garden',
    name: 'Campus Garden',
    emoji: '🌳',
    hint: 'Trees, benches, and quiet corners',
    lat: 28.473307268210487,
    lng: 77.48327046892199,
  },
]

export function getSpotById(id) {
  return CAMPUS_SPOTS.find((s) => s.id === id) ?? CAMPUS_SPOTS[0]
}