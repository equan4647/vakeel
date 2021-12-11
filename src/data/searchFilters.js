import { BUYING_FILTER, FILTER, SERVICE_FILTER } from '../config/Constants';
import { strings } from '../utils/i18n';

export const BUYING_SORTING = [
  { id: 1, title: strings('app.recent'), value: FILTER.SORT.RECENT },
  { id: 2, title: strings('app.old_newest'), value: FILTER.SORT.OLD_TO_NEWEST },
  {
    id: 3,
    title: strings('app.high_to_low_price'),
    value: BUYING_FILTER.PRICE.HIGH_TO_LOW,
  },
  {
    id: 4,
    title: strings('app.low_to_high_price'),
    value: BUYING_FILTER.PRICE.LOW_TO_HIGH,
  },
  {
    id: 5,
    title: strings('app.high_to_low_rating'),
    value: FILTER.RATING.HIGH_TO_LOW,
  },
  {
    id: 6,
    title: strings('app.low_to_high_rating'),
    value: FILTER.RATING.LOW_TO_HIGH,
  },
];

export const CLASSIFIED_SORTING = [
  { id: 1, title: strings('app.recent'), value: FILTER.SORT.RECENT },
  {
    id: 2,
    title: strings('app.old_newest'),
    value: FILTER.SORT.OLD_TO_NEWEST,
  },
  {
    id: 3,
    title: strings('app.high_to_low_price'),
    value: FILTER.PRICE.HIGH_TO_LOW,
  },
  {
    id: 4,
    title: strings('app.low_to_high_price'),
    value: FILTER.PRICE.LOW_TO_HIGH,
  },
];

export const SERVICES_SORTING = [
  { id: 1, title: strings('app.recent'), value: SERVICE_FILTER.SORT.RECENT },
  {
    id: 2,
    title: strings('app.old_newest'),
    value: SERVICE_FILTER.SORT.OLD_TO_NEWEST,
  },
  {
    id: 3,
    title: strings('app.high_to_low_price'),
    value: SERVICE_FILTER.PRICE.HIGH_TO_LOW,
  },
  {
    id: 4,
    title: strings('app.low_to_high_price'),
    value: SERVICE_FILTER.PRICE.LOW_TO_HIGH,
  },
  {
    id: 5,
    title: strings('app.high_to_low_rating'),
    value: SERVICE_FILTER.RATING.HIGH_TO_LOW,
  },
  {
    id: 6,
    title: strings('app.low_to_high_rating'),
    value: SERVICE_FILTER.RATING.LOW_TO_HIGH,
  },
];
