const defaultObject = {};

export const getCarouselData = identifier => store =>
  store.carousel?.[identifier] ?? defaultObject;
