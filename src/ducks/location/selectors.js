export const getRecentLocations = store => store.location.recentLocations;

export const getLastLocation = key => store =>
  store.location.lastLocations[key] ?? '';
