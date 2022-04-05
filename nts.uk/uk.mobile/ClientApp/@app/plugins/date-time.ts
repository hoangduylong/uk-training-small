import { _, Vue, VueConstructor, moment } from '@app/provider';
import { TimeWithDay, TimePoint, TimeDuration } from '@app/utils/time';

const YM_FORMAT: string = 'YYYY/MM';
const DATE_FORMAT: string = 'YYYY/MM/DD';
const FULL_DATE_FM: string = 'YYYY-MM-DDTHH:mm:ss';

const datetime = {
    install(vue: VueConstructor<Vue>) {
        const fetch: any = _.get(vue, 'fetch');
        const $date = vue.observable({
            diff: 0,
            tick: -1,
            now: new Date()
        });

        const getTime = () => {
            if (_.isFunction(fetch)) {
                fetch({ pg: 'at', url: '/server/time/now', method: 'post' })
                    .then((response: { data: { value: string; } }) => {
                        $date.diff = moment(response.data.value, FULL_DATE_FM).diff(moment());
                    });
            }
        };

        setInterval(() => {
            $date.now = moment().add($date.diff, 'ms').toDate();
        }, 100);

        getTime();

        vue.mixin({
            beforeCreate() {
                let self = this;

                Object.assign(self, {
                    $dt(d: Date, format: string) {
                        return moment(d).format(format || DATE_FORMAT);
                    }
                });

                Object.defineProperty(self.$dt, 'now', { get: () => $date.now });

                Object.assign(self.$dt, {
                    interval(intv: number) {
                        clearInterval($date.tick);

                        $date.tick = setInterval(getTime, intv);
                    },
                    date(d: Date, format: string) {
                        return moment(d).format(format || DATE_FORMAT);
                    },
                    fromString(value: string, format: string) {
                        return moment(value, format || DATE_FORMAT).toDate();
                    },
                    fromUTCString(value: string, format: string) {
                        return moment.utc(value, format || DATE_FORMAT).toDate();
                    },
                    timewd(value: number) {
                        return TimeWithDay.toString(value);
                    },
                    timept(value: number) {
                        return TimePoint.toString(value);
                    },
                    timedr(value: number) {
                        return TimeDuration.toString(value);
                    },
                    yearmonth(d: number, format?: string) {
                        if (_.isNumber(d) && !_.isNaN(d)) {
                            let year: number = Math.floor(d / 100),
                                month: number = Math.floor(d % 100);

                            if (year && month) {
                                return moment(`${d}`, 'YYYYMM').format(format || 'YYYY/MM');
                            }
                        }

                        return d;
                    }
                });
            }
        });
    }
};

Vue.use(datetime);