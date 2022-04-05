module nts.uk.time {
    export module format {
        
        export type DateFormatId
            = "Short_YMD"               // 2017/4/20
            | "Short_YMDW"              // 2017/4/20(木)
            | "Short_YM"                // 2017/4
            | "Short_MD"                // 4/20
            | "Short_D"                 // 20
            | "Short_W"                 // 木
            | "Short_MDW"               // 4/20(木)
            | "Long_YMD"                // 2017年4月20日
            | "Long_YMDW"               // 2017年4月20日(木)
            | "Long_YM"                 // 2017年4月
            | "Long_MD"                 // 4月20日
            | "Long_F"                  // 2017年度
            | "Long_JMD"                // 平成29年4月20日
            | "Long_JM";                // 平成29年4月
        
        export type DateTimeFormatId
            = "DateTime_Short_YMDHMS";  // 2017/4/20　8:39:04
        
        export type DurationHmsFormatId
            = "Time_Short_HMS"          // 105:03:58
        
        export type FormatId = DateFormatId | DateTimeFormatId
            | minutesBased.duration.DurationFormatId
            | minutesBased.clock.ClockFormatId;
        
        let DATE_FORMATS = {
            Short_YMD: "yyyy/M/d",
            Short_YMDW: "yyyy/M/d(D)",
            Short_YM: "yyyy/M",
            Short_MD: "M/d",
            Short_D: "d",
            Short_W: "D",
            Short_MDW: "M/d(D)",
            Long_YMD: "yyyy年M月d日",
            Long_YMDW: "yyyy年M月d日(D)",
            Long_YM: "yyyy年M月",
            Long_MD: "M月d日",
            Long_F: "yyyy年度"
        };
        
        export function byId(formatId: FormatId, value: any) {
            switch (formatId) {
                case "Clock_Short_HM":
                case "ClockDay_Short_HM":
                    return minutesBased.clock.create(value).formatById(<any>formatId);
                
                case "Time_Short_HM":
                    return minutesBased.duration.create(value).formatById(<any>formatId);
            
                default:
                    throw new Error("not supported: " + formatId + " of " + value);
            }
        }
        
    }
}