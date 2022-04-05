/// <reference path="../../reference.ts"/>

module nts.uk.time.minutesBased.clock {
    
    // このファイルはminutesbased_clockに統合したい
    
    export module dayattr {
        
        export const MAX_VALUE = create(4319);
        export const MIN_VALUE = create(-720);
        
        export enum DayAttr {
            THE_PREVIOUS_DAY = 0,
            THE_PRESENT_DAY = 1,
            THE_NEXT_DAY = 2,
            TWO_DAY_LATER = 3,
        }
        
        function getDayAttrText(dayAttr: DayAttr) {
            switch (dayAttr) {
                case DayAttr.THE_PREVIOUS_DAY: return "前日";
                case DayAttr.THE_PRESENT_DAY: return "当日";
                case DayAttr.THE_NEXT_DAY: return "翌日";
                case DayAttr.TWO_DAY_LATER: return "翌々日";
                default: throw new Error("invalid value: " + dayAttr);
            } 
        }
        
        function getDaysOffset(dayAttr: DayAttr) {
            switch (dayAttr) {
                case DayAttr.THE_PREVIOUS_DAY: return -1;
                case DayAttr.THE_PRESENT_DAY: return 0;
                case DayAttr.THE_NEXT_DAY: return 1;
                case DayAttr.TWO_DAY_LATER: return 2;
                default: throw new Error("invalid value: " + dayAttr);
            }
        }
        
        export class ResultParseTimeWithDayAttr {
            success: boolean;
            asMinutes: number;
            
            constructor (success: boolean, asMinutes?: number) {
                this.success = success;
                this.asMinutes = asMinutes;
            }
            
            static succeeded(asMinutes: number): ResultParseTimeWithDayAttr {
                return new ResultParseTimeWithDayAttr(true, asMinutes);
            }
            
            static failed(): ResultParseTimeWithDayAttr {
                return new ResultParseTimeWithDayAttr(false);
            }
        }
        
        export function parseString(source: string): ResultParseTimeWithDayAttr {
            
            let foundAttr = cutDayAttrTextIfExists(source);
            if (foundAttr.found) {
                // full text (ex) 翌日2:30
                let daysOffset = getDaysOffset(foundAttr.attr);
                let parsedAsDuration = duration.parseString(foundAttr.clockPartText);
                if (!parsedAsDuration.success) {
                    return ResultParseTimeWithDayAttr.failed();
                }
                let asMinutes = parsedAsDuration.toValue() + MINUTES_IN_DAY * daysOffset;
                return ResultParseTimeWithDayAttr.succeeded(asMinutes);

            } else {
                let parsedAsDuration = duration.parseString(source);
                if (!parsedAsDuration.success) {
                    return ResultParseTimeWithDayAttr.failed();
                }
                
                if (parsedAsDuration.minus) {
                    let asClock = -(parsedAsDuration.toValue()) - MINUTES_IN_DAY;
                    if (asClock >= 0) {
                        return ResultParseTimeWithDayAttr.failed();
                    }
                    
                    return ResultParseTimeWithDayAttr.succeeded(asClock);
                } else {
                    return ResultParseTimeWithDayAttr.succeeded(parsedAsDuration.toValue());
                }
            }
        }
        
        export interface TimeWithDayAttr extends ClockMinutesBasedTime {
            dayAttr: DayAttr;
            fullText: string;
            shortText: string;
        }
        
        export function create(minutesFromZeroOclock: number): TimeWithDayAttr {
            var timeWithDayAttr: TimeWithDayAttr = <any>(clock.create(minutesFromZeroOclock));
            
            util.accessor.defineInto(timeWithDayAttr)
                .get("dayAttr", () => getDayAttrFromDaysOffset(timeWithDayAttr.daysOffset))
                .get("fullText", () => timeWithDayAttr.formatById("ClockDay_Short_HM"))
                .get("shortText", () => timeWithDayAttr.formatById("Clock_Short_HM"));
            
            return timeWithDayAttr;
        }
        
        
        function getDayAttrFromDaysOffset(daysOffset: number): DayAttr {
            switch (daysOffset) {
                case -1: return DayAttr.THE_PREVIOUS_DAY;
                case 0: return DayAttr.THE_PRESENT_DAY;
                case 1: return DayAttr.THE_NEXT_DAY;
                case 2: return DayAttr.TWO_DAY_LATER;
                default: throw new Error("invalid value: " + daysOffset);
            }
        }
        
        var DAY_ATTR_TEXTS = [
            { value: DayAttr.THE_PREVIOUS_DAY },
            { value: DayAttr.THE_PRESENT_DAY },
            { value: DayAttr.THE_NEXT_DAY },
            { value: DayAttr.TWO_DAY_LATER }
        ];
        DAY_ATTR_TEXTS.forEach((e: any) => e.text = getDayAttrText(e.value));
        
        function cutDayAttrTextIfExists(source: string) {
            let foundAttr = _.find(DAY_ATTR_TEXTS, (e: any) => source.indexOf(e.text) === 0);
            var result: any = {
                found: foundAttr !== undefined
            };
            if (result.found) {
                result.attrText = foundAttr.text;
                result.attr = foundAttr.value;
                result.clockPartText = source.slice(foundAttr.text.length);
            } else {
                result.clockPartText = source;
            }
            
            return result;
        }
    }
}