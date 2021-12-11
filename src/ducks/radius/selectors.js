import { FILTER } from '../../config/Constants';

export const getRadius = key => store =>
  store.radius[key] ? Number(store.radius[key]) : FILTER.DEFAULT_RADIUS;
