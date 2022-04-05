/// <reference path="../../reference.ts"/>


module nts.uk.time {
    
    export module secondsBased {
        export const SECOND_IN_MINUTE = 60;
        export const MINUTE_IN_HOUR = 60;
        export const HOUR_IN_DAY = 24;
        export const SECOND_IN_HOUR = MINUTE_IN_HOUR * SECOND_IN_MINUTE;
        export const SECOND_IN_DAY = HOUR_IN_DAY * SECOND_IN_HOUR;
        
        export interface SecondsBasedTime<T> extends Number {
            isNegative: boolean;
            asMinutes: number;
            asSeconds: number;
            minutePart: number;
            minutePartText: string;
            secondPart: number;
            secondPartText: string;
            typeName: string;
        }
        
        
        export function createBase(timeAsSeconds: number): SecondsBasedTime<any> {
            if (!isFinite(timeAsSeconds)) {
                throw new Error("invalid value: " + timeAsSeconds);
            }
            
            let mat: any = new Number(timeAsSeconds);
            
            util.accessor.defineInto(mat)
                .get("asSeconds", () => timeAsSeconds)
                .get("asMinutes", () => ntsNumber.trunc(Math.abs(timeAsSeconds) / SECOND_IN_MINUTE))
                .get("isNegative", () => timeAsSeconds < 0)
                .get("minutePart", () => mat.asMinutes % MINUTE_IN_HOUR)
                .get("minutePartText", () => text.padLeft(mat.minutePart.toString(), "0", 2))
                .get("secondPart", () => Math.abs(timeAsSeconds) % SECOND_IN_MINUTE)
                .get("secondPartText", () => text.padLeft(mat.secondPart.toString(), "0", 2))
                .get("typeName", () => "SecondsBasedTime");
            
            return mat;
        }
    }
}