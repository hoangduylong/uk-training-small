/// <reference path="../../reference.ts"/>

module nts.uk.time.secondsBased {
    
    export module clock {
        
        export type ClockFormatId = "Clock_Short_HMS";          // 5:03:02
         
        
        export interface ClockSecondsBasedTime extends SecondsBasedTime<ClockSecondsBasedTime> {
            daysOffset: number;
            hourPart: number;
            minutePart: number;
            secondPart: number;
            clockTextInDay: string;
            formatById(formatId: ClockFormatId): string;
        }
        
        /**
         * create new instance
         */
        export function create(daysOffset: number, hourPart: number, secondPart: number, secondPart: number): ClockSecondsBasedTime;
        export function create(secondsFromZeroOclock: number): ClockSecondsBasedTime;
        export function create(... args: any[]): ClockSecondsBasedTime {
            let timeAsSeconds = parseAsClock(args);
            let clock: any = createBase(timeAsSeconds);
            
            let positivizedSeconds = () => (timeAsSeconds >= 0)
                    ? timeAsSeconds
                    : timeAsSeconds + (1 + Math.floor(-timeAsSeconds / SECOND_IN_DAY)) * SECOND_IN_DAY;
            
            let daysOffset = () => ntsNumber.trunc(
                    clock.isNegative ? (timeAsSeconds + 1) / SECOND_IN_DAY - 1
                            : timeAsSeconds / SECOND_IN_DAY);
            
            let positiveSeconds = positivizedSeconds();
            let secondStr = String(positiveSeconds);
            let pointIndex = secondStr.indexOf('.');
            let secondPart;
            if (pointIndex > -1) {
                let fraction = secondStr.substring(pointIndex + 1);
                positiveSeconds = Math.floor(positiveSeconds);
                secondStr = String(positiveSeconds % SECOND_IN_MINUTE) + "." + fraction;
                secondPart = Number(secondStr);
            } else {
                secondPart = positivizedSeconds() % SECOND_IN_MINUTE;
            }
            
            util.accessor.defineInto(clock)
                .get("typeName", () => "ClockSecondsBasedTime")
                .get("daysOffset", daysOffset)
                .get("secondPart", () => secondPart)
                .get("minutePart", () => ntsNumber.trunc((positivizedSeconds() % SECOND_IN_DAY) / SECOND_IN_MINUTE))
                .get("hourPart", () => ntsNumber.trunc(clock.minutePart / MINUTE_IN_HOUR))
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
            else if (types.matchArguments(args, ["number", "number", "number", "number"])) {
                let daysOffset: number = args[0];
                let hourPart: number = args[1];
                let minutePart: number = args[2];
                let secondPart: number = args[3];
                result = daysOffset * SECOND_IN_DAY + hourPart * SECOND_IN_HOUR + minutePart * SECOND_IN_MINUTE + secondPart;
            }
            
            return result;
        }
        
        module format {
            export function byId(formatId: ClockFormatId, clock: ClockSecondsBasedTime) {
                switch (formatId) {
                    case "Clock_Short_HMS":
                        return short.make(clock);
                    default:
                        return "";
                }
            }
            
            export function clockTextInDay(clock: ClockSecondsBasedTime) {
                return clock.hourPart + ":" + clock.minutePartText + ":" + clock.secondPartText;
            }
            
            module short {
                export function make(clock: ClockSecondsBasedTime) {
                    return sign(clock) + hours(clock) + ":" + clock.minutePartText + ":" + clock.secondPartText;
                }
                
                function sign(clock: ClockSecondsBasedTime) {
                    return clock.daysOffset < 0 ? "-" : "";
                }
                
                function hours(clock: ClockSecondsBasedTime) {
                    return clock.daysOffset < 0 ? clock.hourPart : clock.daysOffset * 24 + clock.hourPart;
                }
            }
        }
    }
}