const CITY_COORDINATES: Record<string, [number, number]> = {
  Nashik: [73.7898, 20.0089],
  Nagpur: [79.0882, 21.1458],
  Kolhapur: [74.2433, 16.705],
  Solapur: [75.9064, 17.6599],
  Pune: [73.8567, 18.5204],
};

export function getProjectCoordinates(
  locationSection?: { coordinates?: [number, number] },
  city?: string,
): [number, number] {
  if (locationSection?.coordinates) return locationSection.coordinates;
  if (city && CITY_COORDINATES[city]) return CITY_COORDINATES[city];
  return [78.9629, 20.5937];
}
