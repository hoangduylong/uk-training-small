import { Vue, moment } from '@app/provider';

Vue.filter('date', (d: Date, format?: string) => moment(d).format(format || 'YYYY/MM/DD'));