import { Vue } from '@app/provider';
import { TimeWithDay, TimePoint, TimeDuration } from '@app/utils/time';

// time-with-day: number ➡ string
Vue.filter('timewd', (value: number) => TimeWithDay.toString(value));

// time-point: number ➡ string
Vue.filter('timept', (value: number) => TimePoint.toString(value));

// time-duration: number ➡ string
Vue.filter('timedr', (value: number) => TimeDuration.toString(value));