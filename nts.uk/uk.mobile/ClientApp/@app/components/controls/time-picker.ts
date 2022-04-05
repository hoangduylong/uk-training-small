import { TimeWithDay, TimePoint, TimeDuration, DAYS } from '@app/utils/time';
import { _, moment } from '@app/provider';

export class TimeWithDayHelper {

    public static getDataSource(value: number) {

        return {
            day: TimeWithDayHelper.Days, 
            hour: value < 0 ? TimeWithDayHelper.HoursFrom12 : TimeWithDayHelper.HoursFrom0, 
            minute: TimeWithDayHelper.Minutes
        };
    }

    public static Days: Array<Object> = [
        {
            text: DAYS.TheDayBefore,
            value: -1
        }, {
            text: DAYS.Today,
            value: 0
        }, {
            text: DAYS.NextDay,
            value: 1
        }, {
            text: DAYS.TwoDaysLater,
            value: 2
        }
    ];
    public static HoursFrom0: Array<Object> = TimeWithDayHelper.generateArray(0, 23);
    public static HoursFrom12: Array<Object> = TimeWithDayHelper.generateArray(12, 23);
    public static Minutes: Array<Object> = TimeWithDayHelper.generateArray(0, 59);

    public static generateArray(min: number, max: number): Array<Object> {

        return _.range(min, max + 1).map((m: number) => ({ text: _.padStart(`${m}`, 2, '0'), value: m }));

    }


    public static computeSelecteds(value: number): { day: number, hour: number, minute: number} {

        if (value === null) {
            value = moment().hour() * 60 + moment().minute();
        }

        return TimeWithDay.toObject(value);
    }

    /**
     * 前日   [                                    12 13 14 15 16 17 18 19 20 21 22 23 24]
     * 今日   [00 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24]
     * 翌日   [00 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24]
     * 翌々日 [00 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24]
     */
    public static onSelect(value: any, picker: { title: string, dataSources: any, selects: any }) {

        if (_.isEmpty(picker.selects))  {
            return;
        }

        if (value.day === -1) {

            if (picker.dataSources.hour.length !== 12) {
                picker.dataSources.hour = TimeWithDayHelper.HoursFrom12;
            }

            if (value.hour < 12) {
                picker.selects.hour = 12;
            }

        } else {

            if (picker.dataSources.hour.length !== 24) {
                picker.dataSources.hour = TimeWithDayHelper.HoursFrom0;
            }
            
        }

        picker.title = TimeWithDay.fromObject(picker.selects).toString();
    }
}

export class TimePointHelper {

    public static H1_0_7: Array<Object> = TimePointHelper.generateArray(0, 7);
    public static H1_1_2: Array<Object> = TimePointHelper.generateArray(1, 2);

    public static H2_2_9: Array<Object> = TimePointHelper.generateArray(2, 9);
    public static H2_0_3: Array<Object> = TimePointHelper.generateArray(0, 3);
    public static H2_0_9: Array<Object> = TimePointHelper.generateArray(0, 9);
    public static H2_0_1: Array<Object> = TimePointHelper.generateArray(0, 1);

    public static M1_LIST: Array<Object> = TimePointHelper.generateArray(0, 5);
    public static M2_LIST: Array<Object> = TimePointHelper.generateArray(0, 9);

    public static computeSelecteds(value: number): { positive: boolean, h1: number, h2: number, m1: number, m2: number} {

        if (value === null) {
            value = moment().hour() * 60 + moment().minute();
        }

        return TimePoint.toObject(value);
    }

    public static getDataSource(value: number) {

        return {
            positive: [ { text: ' ', value: true}, { text: 'ー', value: false}],
            h1: TimePointHelper.h1List(value),
            h2: TimePointHelper.h2List(value),
            m1: TimePointHelper.M1_LIST,
            m2: TimePointHelper.M2_LIST
        };
    }

    public static generateArray(min: number, max: number): Array<Object> {

        return _.range(min, max + 1).map(( number: number) => ({ text: number.toString(), value: number }));

    }

    public static h1List(value: number) {
        return value >= 0 ? this.H1_0_7 : this.H1_1_2;
    }

    public static h2List(value: number) {
        if (value <= -241) {
            return TimePointHelper.H2_2_9;
        } else if ( value < 0 ) {
            return TimePointHelper.H2_0_3;
        } else if (value <= 4199 ) {
            return TimePointHelper.H2_0_9;
        } else {
            return TimePointHelper.H2_0_1;
        }
    }

    /**
     * NEGATIVE h1 = [1, 2], h2 = [2, 3, 4, 5, 6, 7, 8, 9] || [0, 1, 2, 3]
     * 
     * [        -12 -13 -14 -15 -16 -17 -18 -19]
     * [-20 -21 -22 -23                        ]
     * 
     * POSITIVE h1 = [0, 1, 2, 3, 4, 5, 6, 7], h2 = [0, 1] || [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
     * [00 01 02 03 04 05 06 07 08 09]
     * [10 11 12 13 14 15 16 17 18 19]
     * [20 21 22 23 24 25 26 27 28 29]
     * ..
     * [60 61 62 63 64 65 66 67 68 69]
     * [70 71                        ]
     */
    public static onSelect(newSelect: { positive: boolean, h1: number, h2: number, m1: number, m2: number}, picker: { title: string, dataSources: any, selects: any }) {
        if (_.isEmpty(picker.selects)) {
            return;
        }

        let pickerSelect = picker.selects;

        if (!newSelect.positive) {
            // filter h1 with positive
            if (picker.dataSources.h1.length !== 2) {
                picker.dataSources.h1 = TimePointHelper.H1_1_2;
            }

            // re-select h1
            if ( pickerSelect.h1 < 1) {
                pickerSelect.h1 = 1;
            } else if (pickerSelect.h1 > 2) {
                pickerSelect.h1 = 2;
            }

            // filter h2 with h1
            if (pickerSelect.h1 === 1) {
                if (picker.dataSources.h2.length !== 8) {
                    picker.dataSources.h2 = TimePointHelper.H2_2_9;

                    // re-select h2
                    if ( pickerSelect.h2 < 2) {
                        pickerSelect.h2 = 2;
                    }
                }
            } else {
                if (picker.dataSources.h2.length !== 4) {
                    picker.dataSources.h2 = TimePointHelper.H2_0_3;

                    // re-select h2
                    if ( pickerSelect.h2 > 3 ) {
                        pickerSelect.h2 = 3;
                    }
                }
            }

        } else {

            // filter h1 with positive
            if ( picker.dataSources.h1.length !== 8) {
                picker.dataSources.h1 = TimePointHelper.H1_0_7;
            }

            // filter h2 with h1
            if ( pickerSelect.h1 === 7) {
                if (pickerSelect.h2.length !== 2) {
                    picker.dataSources.h2 = TimePointHelper.H2_0_1;
                }

                if ( pickerSelect.h2 > 1) {
                    pickerSelect.h2 = 1;
                }

            } else  {
                if (pickerSelect.h2.length !== 10) {
                    picker.dataSources.h2 = TimePointHelper.H2_0_9;
                }
            }
        }

        picker.title = TimePoint.fromObject(pickerSelect).toString();
    }
}

export class TimeDurationHelper {

    public static H1_0_1: Array<Object> = TimeDurationHelper.generateArray(0, 1);
    public static H1_0_7: Array<Object> = TimeDurationHelper.generateArray(0, 7);

    public static H2_0_2: Array<Object> = TimeDurationHelper.generateArray(0, 2);
    public static H2_0_9: Array<Object> = TimeDurationHelper.generateArray(0, 9);
    public static H2_0_1: Array<Object> = TimeDurationHelper.generateArray(0, 1);

    public static M1_LIST: Array<Object> = TimeDurationHelper.generateArray(0, 5);
    public static M2_LIST: Array<Object> = TimeDurationHelper.generateArray(0, 9);

    public static generateArray(min: number, max: number): Array<Object> {

        return _.range(min, max + 1).map(( number: number) => ({ text: number.toString(), value: number }));

    }

    public static computeSelecteds(value: number): { positive: boolean, h1: number, h2: number, m1: number, m2: number} {

        if (value === null) {
            value = 0;
        }

        return TimeDuration.toObject(value);
    }

    public static getDataSource(value: number) {

        return {
            positive: [ { text: ' ', value: true}, { text: 'ー', value: false}],
            h1: TimeDurationHelper.h1List(value),
            h2: TimeDurationHelper.h2List(value),
            m1: TimeDurationHelper.M1_LIST,
            m2: TimeDurationHelper.M2_LIST
        };
    }

    public static h1List(value: number) {
        return value < 0 ? TimeDurationHelper.H1_0_1 : TimeDurationHelper.H1_0_7;
    }

    public static h2List(value: number) {
        if (value < -600) {
            return TimeDurationHelper.H2_0_2;
        } else if (value < 4199) {
            return TimeDurationHelper.H2_0_9;
        } else {
            return TimeDurationHelper.H2_0_1;
        }
    }

    /**
     * NEGATIVE h1 = [0, 1], h2 = [0, 1, 2] || [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
     * [                             -12 -11 -10]
     * [ -09 -08 -07 -06 -05 -04 -03 -02 -01 -00]
     * 
     * POSITIVE h1 = [0, 1, 2, 3, 4, 5, 6, 7], h2 = [0, 1] || [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
     * [00 01 02 03 04 05 06 07 08 09]
     * [10 11 12 13 14 15 16 17 18 19]
     * [20 21 22 23 24 25 26 27 28 29]
     * ..
     * [60 61 62 63 64 65 66 67 68 69]
     * [70 71                        ]
     */
    public static onSelect(newSelect: { positive: boolean, h1: number, h2: number, m1: number, m2: number}, picker: { title: string, dataSources: any, selects: any }) {

        if (_.isEmpty(picker.selects))  {
            return;
        }
        
        let pickerSelect = picker.selects;

        if (!newSelect.positive) {
            // filter h1 with positive
            if (picker.dataSources.h1.length !== 2) {
                picker.dataSources.h1 = TimeDurationHelper.H1_0_1;
            }
            
            // re-select h1
            if ( pickerSelect.h1 > 1) {
                pickerSelect.h1 = 1;
            }

            // filter h2 with h1
            if (pickerSelect.h1 === 1) {
                if (picker.dataSources.h2.length !== 3) {
                    picker.dataSources.h2 = TimeDurationHelper.H2_0_2;

                    // re-select h2
                    if ( pickerSelect.h2 > 2) {
                        pickerSelect.h2 = 2;
                    }
                }
            } else {
                if (picker.dataSources.h2.length !== 10) {
                    picker.dataSources.h2 = TimeDurationHelper.H2_0_9;
                }
            }

        } else {

            // filter h1 with positive
            if ( picker.dataSources.h1.length !== 8) {
                picker.dataSources.h1 = TimeDurationHelper.H1_0_7;
            }

            // filter h2 with h1
            if ( pickerSelect.h1 === 7) {
                if (pickerSelect.h2.length !== 2) {
                    picker.dataSources.h2 = TimeDurationHelper.H2_0_1;
                }

                // re-select h2
                if ( pickerSelect.h2 > 1) {
                    pickerSelect.h2 = 1;
                }

            } else  {
                if (pickerSelect.h2.length !== 10) {
                    picker.dataSources.h2 = TimeDurationHelper.H2_0_9;
                }
            }
        }

        picker.title = TimeDuration.fromObject(pickerSelect).toString();
    }
    
}

