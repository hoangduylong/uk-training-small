import { _, Vue, moment } from '@app/provider';

Vue.filter('yearmonth', (d: number, format?: string) => {
    if (_.isNumber(d) && !_.isNaN(d)) {
        let year: number = Math.floor(d / 100),
            month: number = Math.floor(d % 100);

        if (year && month) {
            return moment(`${d}`, 'YYYYMM').format(format || 'YYYY/MM');
        }
    }

    return d;
});