import { _ } from '@app/provider';

export enum DAYS {
    TheDayBefore = '前日',
    Today = '当日',
    NextDay = '翌日',
    TwoDaysLater = '翌々日',
}

export enum TimeInputType {
    TimeWithDay = 'time-with-day',
    TimePoint = 'time-point',
    TimeDuration = 'time-duration'
}

export class TimeWithDay {
    public value: number | undefined = undefined;

    constructor(value: string | number) {
        if (typeof value === 'number') {
            this.value = value;
        } else {
            this.value = this.toNumber(value);
        }
    }

    public static from(value: string | number) {
        return new TimeWithDay(value);
    }

    public static fromObject(value: { day: number, hour: number, minute: number }) {

        if (_.isEmpty(value)) {
            return undefined;
        }

        let newMinutes = 0;
        switch (value.day) {
            case -1:
                newMinutes = (value.hour * 60 + value.minute) - 1440;
                break;
            case 0:
                newMinutes = value.hour * 60 + value.minute;
                break;
            case 1:
                newMinutes = 1440 + value.hour * 60 + value.minute;
                break;
            case 2:
                newMinutes = 2880 + value.hour * 60 + value.minute;
                break;
            default:
                break;
        }

        return new TimeWithDay(newMinutes);
    }

    public static toNumber(value: string): number {
        return TimeWithDay.from(value).value;
    }

    public static toString(value: number, format: 'h' | 'hh' = 'hh'): string {
        return TimeWithDay.from(value).toString(format);
    }

    public static toObject(value: number) {

        if (value === null || value === undefined) {
            return null;
        }

        let timeWithDay = TimeWithDay.from(value);

        return {
            day: timeWithDay.day,
            hour: timeWithDay.hour,
            minute: timeWithDay.minute
        };
    }

    public static getDayOffset(value: string | number): number {
        return TimeWithDay.from(value).day;
    }

    public static getDayNumber(value: string | number): number {
        return TimeWithDay.from(value).day;
    }

    public static getDayName(value: string | number): string {
        return TimeWithDay.from(value).dayName;
    }

    public static getHour(value: string | number): number {
        return TimeWithDay.from(value).hour;
    }

    public static getMinute(value: string | number): number {
        return TimeWithDay.from(value).minute;
    }

    public toNumber(value?: string): number {
        if (value === undefined) {
            return this.value;
        }

        let negative: boolean = value.indexOf('-') == 0,
            rawNumber: number = Number(value.replace(/[\:\-]/g, '')),
            hour: number = Math.floor(rawNumber / 100),
            minute: number = Math.floor(rawNumber % 100);

        if (!negative) {
            return 60 * hour + minute;
        } else {
            return -(1440 - (60 * hour + minute));
        }
    }

    public toString(format: 'h' | 'hh' = 'hh'): string {
        if (this.day === 0) {
            return `${format === 'hh' ? _.padStart(this.hour.toString(), 2, '0') : this.hour.toString()}:${_.padStart(this.minute.toString(), 2, '0')}`;
        }

        return `${this.dayName} ${format === 'hh' ? _.padStart(this.hour.toString(), 2, '0') : this.hour.toString()}:${_.padStart(this.minute.toString(), 2, '0')}`;
    }

    public static leftpad(value: number | Number) {
        return _.padStart(value.toString(), 2, '0');
    }

    get isNegative(): boolean {
        return this.day === -1;
    }

    get day(): number {
        if (this.value < 0) {
            return -1;  //  前日
        } else if (this.value < 1440) {
            return 0;   //  当日
        } else if (this.value < 2880) {
            return 1;   //  翌日
        } else if (this.value < 4320) {
            return 2;   //  翌々日
        }

        return 0;
    }

    get dayName(): string {
        switch (this.day) {
            case -1:
                return '前日';
            case 0:
                return '当日';
            case 1:
                return '翌日';
            case 2:
                return '翌々日';
            default:
                break;
        }
    }

    get hour(): number {
        return Math.floor(this.positiveValue / 60);
    }

    get minute(): number {
        return Math.floor(this.positiveValue % 60);
    }

    private get positiveValue() {
        let value = this.value;

        switch (this.day) {
            case -1:
                value += 1440;
                break;
            case 0:
                value += 0;
                break;
            case 1:
                value -= 1440;
                break;
            case 2:
                value -= 2880;
                break;
            default:
                break;
        }

        return Math.abs(value);
    }
}


export class TimeDuration {
    public value: number | undefined = undefined;

    constructor(value: string | number) {
        if (typeof value === 'number') {
            this.value = value;
        } else {
            this.value = this.toNumber(value);
        }
    }

    public static from(value: string | number) {
        return new TimeDuration(value);
    }

    public static fromObject(value: { positive: boolean, h1: number, h2: number, m1: number, m2: number }) {

        if (_.isEmpty(value)) {
            return undefined;
        }

        let newMinutes = 0;
        if (value.positive) {
            newMinutes = 60 * (value.h1 * 10 + value.h2) + (value.m1 * 10 + value.m2);
        } else {
            newMinutes = 0 - (60 * (value.h1 * 10 + value.h2) + (value.m1 * 10 + value.m2));
        }

        return new TimeDuration(newMinutes);
    }

    public static toString(value: number, format: 'h' | 'hh' = 'hh') {
        return new TimeDuration(value).toString(format);
    }

    public toNumber(value?: string) {
        if (value) {
            let negative: boolean = value.indexOf('-') == 0,
                rawNumber: number = Number(value.replace(/[\:\-]/g, '')),
                hour: number = Math.floor(rawNumber / 100),
                minute: number = Math.floor(rawNumber % 100);

            if (!negative) {
                return hour * 60 + minute;
            } else {
                return -(hour * 60 + minute);
            }
        }

        return this.value;
    }

    public toString(format: 'h' | 'hh' = 'hh') {
        return `${this.isNegative ? '-' : ''}${format === 'hh' ? _.padStart(this.hour.toString(), 2, '0') : this.hour.toString()}:${_.padStart(this.minute.toString(), 2, '0')}`;
    }

    public toLocalString() {
        return this.toString();
    }

    public static toObject(value: number) {

        if (value === null || value === undefined) {

            return null;
        }

        let timeDuration = TimeDuration.from(value);
        let hour = timeDuration.hour;
        let minute = timeDuration.minute;

        return {
            positive: !timeDuration.isNegative,
            h1: Math.floor(hour / 10),
            h2: Math.floor(hour % 10),
            m1: Math.floor(minute / 10),
            m2: Math.floor(minute % 10)
        };
    }

    get isNegative() {
        return this.value < 0;
    }

    get hour() {
        return Math.floor(this.positiveValue / 60);
    }

    get minute() {
        return Math.floor(this.positiveValue % 60);
    }

    private get positiveValue() {
        return Math.abs(this.value);
    }
}

export class TimePoint {
    public value: number | undefined = undefined;

    constructor(value: number) {
        this.value = value;
    }

    public static from(value: number) {
        return new TimePoint(value);
    }

    public static fromObject(value: { positive: boolean, h1: number, h2: number, m1: number, m2: number }) {

        if (_.isEmpty(value)) {
            return undefined;
        }

        let newMinutes = 0;
        if (value.positive) {
            newMinutes = 60 * (value.h1 * 10 + value.h2) + (value.m1 * 10 + value.m2);
        } else {
            newMinutes = -1440 + 60 * (value.h1 * 10 + value.h2) + (value.m1 * 10 + value.m2);
        }

        return new TimePoint(newMinutes);
    }

    public static toString(value: number, format: 'h' | 'hh' = 'hh') {
        return new TimePoint(value).toString(format);
    }

    public toString(format: 'h' | 'hh' = 'hh') {
        return `${this.isNegative ? '-' : ''}${format === 'hh' ? _.padStart(this.hour.toString(), 2, '0') : this.hour.toString()}:${_.padStart(this.minute.toString(), 2, '0')}`;
    }

    public static toObject(value: number) {

        if (value === null || value === undefined) {

            return null;
        }

        let timePoint = TimePoint.from(value);
        let hour = timePoint.hour;
        let minute = timePoint.minute;

        return {
            positive: !timePoint.isNegative,
            h1: Math.floor(hour / 10),
            h2: Math.floor(hour % 10),
            m1: Math.floor(minute / 10),
            m2: Math.floor(minute % 10)
        };
    }

    get isNegative() {
        return this.value < 0;
    }

    get hour() {
        return Math.floor(this.positiveValue / 60);
    }

    get minute() {
        return Math.floor(this.positiveValue % 60);
    }

    private get positiveValue() {
        return this.isNegative ? this.value + 1440 : this.value;
    }
}
