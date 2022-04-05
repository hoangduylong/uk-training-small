/// <reference path="../../reference.ts"/>

module nts.uk.time.minutesBased {
    
    export module clock {
        
        export enum DayAttr {
            THE_PREVIOUS_DAY = 0,
            THE_PRESENT_DAY = 1,
            THE_NEXT_DAY = 2,
            TWO_DAY_LATER = 3,
        }
        
        export namespace DayAttr {
            export function fromValue(value: number) {
                switch (value) {
                    case 0: return DayAttr.THE_PREVIOUS_DAY;
                    case 1: return DayAttr.THE_PRESENT_DAY;
                    case 2: return DayAttr.THE_NEXT_DAY;
                    case 3: return DayAttr.TWO_DAY_LATER;
                    default: new Error("invalid value: " + value);
                }
            }
            
            export function fromDaysOffset(daysOffset: number) {
                switch (daysOffset) {
                    case -1: return DayAttr.THE_PREVIOUS_DAY;
                    case 0: return DayAttr.THE_PRESENT_DAY;
                    case 1: return DayAttr.THE_NEXT_DAY;
                    case 2: return DayAttr.TWO_DAY_LATER;
                    default: new Error("invalid daysOffset: " + daysOffset);
                }
            }
            
            export function toDaysOffset(dayAttr: DayAttr) {
                switch (dayAttr) {
                    case DayAttr.THE_PREVIOUS_DAY: return -1;
                    case DayAttr.THE_PRESENT_DAY: return 0;
                    case DayAttr.THE_NEXT_DAY: return 1;
                    case DayAttr.TWO_DAY_LATER: return 2;
                    default: new Error("invalid dayAttr: " + dayAttr);
                }
            }
            
            export function toText(dayAttr: DayAttr) {
                switch (dayAttr) {
                    case DayAttr.THE_PREVIOUS_DAY: return "前日";
                    case DayAttr.THE_PRESENT_DAY: return "";
                    case DayAttr.THE_NEXT_DAY: return "翌日";
                    case DayAttr.TWO_DAY_LATER: return "翌々日";
                    default: new Error("invalid dayAttr: " + dayAttr);
                }
            }
        }
        
        
        export type ClockFormatId
            = "Clock_Short_HM"          // 5:03
            | "ClockDay_Short_HM";      // 当日5:03
        
        export interface ClockMinutesBasedTime extends MinutesBasedTime<ClockMinutesBasedTime> {
            daysOffset: number;
            hourPart: number;
            minutePart: number;
            dayAttr: DayAttr;
            clockTextInDay: string;
            formatById(formatId: ClockFormatId): string;
        }
        
        /**
         * create new instance
         */
        export function create(daysOffset: number, hourPart: number, minutePart: number): ClockMinutesBasedTime;
        export function create(minutesFromZeroOclock: number): ClockMinutesBasedTime;
        export function create(... args: any[]): ClockMinutesBasedTime {
            let timeAsMinutes = parseAsClock(args);
            let clock: any = createBase(timeAsMinutes);
            
            let positivizedMinutes = () => (timeAsMinutes >= 0)
                    ? timeAsMinutes
                    : timeAsMinutes + (1 + Math.floor(-timeAsMinutes / MINUTES_IN_DAY)) * MINUTES_IN_DAY;
            
            let daysOffset = () => ntsNumber.trunc(
                    clock.isNegative ? (timeAsMinutes + 1) / MINUTES_IN_DAY - 1
                            : timeAsMinutes / MINUTES_IN_DAY);
            
            let positiveMinutes = positivizedMinutes();
            let minuteStr = String(positiveMinutes);
            let pointIndex = minuteStr.indexOf('.');
            let minutePart;
            if (pointIndex > -1) {
                let fraction = minuteStr.substring(pointIndex + 1);
                positiveMinutes = Math.floor(positiveMinutes);
                minuteStr = String(positiveMinutes % 60) + "." + fraction;
                minutePart = Number(minuteStr);
            } else {
                minutePart = positivizedMinutes() % 60;
            }
            
            util.accessor.defineInto(clock)
                .get("typeName", () => "ClockMinutesBasedTime")
                .get("daysOffset", daysOffset)
                .get("hourPart", () => Math.floor((positivizedMinutes() % MINUTES_IN_DAY) / 60))
                .get("minutePart", () => minutePart)
                .get("dayAttr", () => DayAttr.fromDaysOffset(daysOffset()))
                .get("clockTextInDay", () => format.clockTextInDay(clock));
            
            clock.formatById = function (formatId: ClockFormatId): string {
                return format.byId(formatId, clock);
            };
            
            return clock;
        }
        
        function parseAsClock(args: any[]): number {
            var result: number;
            
            if (types.matchArguments(args, ["number"])) {
                result = args[0];
            }
            else if (types.matchArguments(args, ["number", "number", "number"])) {
                let daysOffset: number = args[0];
                let hourPart: number = args[1];
                let minutePart: number = args[2];
                result = daysOffset * MINUTES_IN_DAY + hourPart * 60 + minutePart;
            }
            
            return result;
        }
        
        module format {
            export function byId(formatId: ClockFormatId, clock: ClockMinutesBasedTime) {
                switch (formatId) {
                    case "Clock_Short_HM":
                        return short.make(clock);
                    case "ClockDay_Short_HM":
                        return long.make(clock);
                }
            }
            
            export function clockTextInDay(clock: ClockMinutesBasedTime) {
                return clock.hourPart + ":" + clock.minutePartText;
            }
            
            module short {
                export function make(clock: ClockMinutesBasedTime) {
                    return sign(clock) + hours(clock) + ":" + clock.minutePartText;
                }
                
                function sign(clock: ClockMinutesBasedTime) {
                    return clock.daysOffset < 0 ? "-" : "";
                }
                
                function hours(clock: ClockMinutesBasedTime) {
                    return clock.daysOffset < 0 ? clock.hourPart : clock.daysOffset * 24 + clock.hourPart;
                }
            }
            
            module long {
                
                export function make(clock: ClockMinutesBasedTime) {
                    return DayAttr.toText(clock.dayAttr) + clock.clockTextInDay;
                }
            }
        }
    }
}