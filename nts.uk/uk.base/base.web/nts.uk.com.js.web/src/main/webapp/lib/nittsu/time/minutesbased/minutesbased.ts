/// <reference path="../../reference.ts"/>


module nts.uk.time {

    export module minutesBased {
        export const MINUTES_IN_DAY = 24 * 60;
        
        export interface MinutesBasedTime<T> extends Number {
            isNegative: boolean;
            asMinutes: number;
            minutePart: number;
            minutePartText: string;
            typeName: string;
        }
        
        
        export function createBase(timeAsMinutes: number): MinutesBasedTime<any> {
            if (!isFinite(timeAsMinutes)) {
                throw new Error("invalid value: " + timeAsMinutes);
            }
            
            let mat: any = new Number(timeAsMinutes);
            
            util.accessor.defineInto(mat)
                .get("asMinutes", () => timeAsMinutes)
                .get("isNegative", () => timeAsMinutes < 0)
                .get("minutePart", () => Math.abs(timeAsMinutes) % 60)
                .get("minutePartText", () => text.padLeft(mat.minutePart.toString(), "0", 2))
                .get("typeName", () => "MinutesBasedTime");
            
            return mat;
        }
    }
}