import { Vue } from '@app/provider';

Vue.filter('search', (items: any[], filter: (value, index) => boolean) => items.filter(filter));