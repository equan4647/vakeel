const defaultValue = [];

export const getReviewData = key => store =>
  store.reviews?.[key] ?? defaultValue;
