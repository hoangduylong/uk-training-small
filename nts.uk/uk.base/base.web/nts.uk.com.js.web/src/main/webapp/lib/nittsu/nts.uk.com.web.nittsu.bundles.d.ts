/// <reference path="generic.d.ts/jquery.d.ts" />
/// <reference path="generic.d.ts/jquery.steps.d.ts" />
/// <reference path="generic.d.ts/igniteui.d.ts" />
/// <reference path="generic.d.ts/jqueryui.d.ts" />
/// <reference path="generic.d.ts/knockout.d.ts" />
/// <reference path="generic.d.ts/knockout.mapping.d.ts" />
/// <reference path="generic.d.ts/lodash.d.ts" />
/// <reference path="generic.d.ts/moment.d.ts" />
/// <reference path="generic.d.ts/require.d.ts" />
/// <reference path="ui/viewcontext.d.ts" />
declare module nts.uk {
    module KeyCodes {
        const Tab: number;
        const Enter: number;
        const Ctrl: number;
    }
    module util {
        function compare(obj1: any, obj2: any): boolean;
        /**
         * 常にtrueを返す関数が必要になったらこれ
         */
        function alwaysTrue(): boolean;
        /**
         * function find an item index in array
         * if key presented will perform find index of item in array which contain key equal to the 'item' parameter
         */
        function findIndex(arr: any, value: any, key: any): number;
        /**
         * DFS algorithm function to iterate over an object with structre like tree
         */
        function visitDfs(node: any, func: any, childField: any, arr?: any): void;
        /**
         * return flatern array of array of tree-like objects
         */
        function flatArray(arr: any, childField: any): any;
        /**
         * return filtered array
         * @param {Array} array of items
         * @param {String} user input
         * @param {Array} array of fields used to search on
         * @param {String} if not null, search will perform in flatarray of arr
         */
        function searchArray(arr: any, searchTerm: any, fields: any, childField: any): any;
        /**
         * SearchBox helper function to jump next search
         */
        function nextSelectionSearch(selected: any, arr: any, selectedKey: any, isArray: any): any;
        /**
         * Returns true if the target is null or undefined.
         */
        function isNullOrUndefined(target: any): boolean;
        /**
         * Returns true if the target is null or undefined or blank.
         * @param  {any} [target] Target need to check
         * @return {boolean}      True for blank
         */
        function isNullOrEmpty(target: any): boolean;
        /**
         * Generate random identifier string (UUIDv4)
         */
        function randomId(): string;
        /**
         * Returns true if current window is in frame.
         */
        function isInFrame(): boolean;
        /**
         * valueMaybeEmptyがnullまたはundefinedの場合、defaultValueを返す。
         * そうでなければ、valueMaybeEmptyを返す。
         */
        function orDefault(valueMaybeEmpty: any, defaultValue: any): any;
        function getConstraintMes(primitiveValues: any): string;
        function getConstraintLabel(primitiveValues: any): string;
        /**
         * Returns true if expects contains actual.
         */
        function isIn(actual: any, expects: Array<any>): boolean;
        function createTreeFromString(original: string, openChar: string, closeChar: string, seperatorChar: string, operatorChar: Array<string>): Array<TreeObject>[];
        class TreeObject {
            value: string;
            isOperator: boolean;
            children: Array<TreeObject>[];
            index: number;
            constructor(value?: string, children?: Array<TreeObject>[], index?: number, isOperator?: boolean);
        }
        /**
         * Like Java Optional
         */
        module optional {
            function of<V>(value: V): Optional<V>;
            function empty(): Optional<any>;
            class Optional<V> {
                value: V;
                constructor(value: V);
                ifPresent(consumer: (value: V) => void): this;
                ifEmpty(action: () => void): this;
                map<M>(mapper: (value: V) => M): Optional<M>;
                isPresent(): boolean;
                get(): V;
                orElse(stead: V): V;
                orElseThrow(errorBuilder: () => Error): void;
            }
        }
        class Range {
            start: number;
            end: number;
            constructor(start: number, end: number);
            contains(value: number): boolean;
            greaterThan(value: number): boolean;
            greaterThanOrEqualTo(value: number): boolean;
            lessThan(value: number): boolean;
            lessThanOrEqualTo(value: number): boolean;
            distanceFrom(value: number): number;
        }
        module value {
            function reset($controls: JQuery, defaultVal?: any, immediateApply?: boolean): void;
            class DefaultValue {
                static RESET_EVT: string;
                onReset($control: JQuery, koValue: (data?: any) => any): this;
                applyReset($control: JQuery, koValue: (data?: any) => any): any;
                asDefault($control: JQuery, koValue: (data?: any) => any, defaultValue: any, immediateApply: boolean): void;
            }
        }
        module accessor {
            function defineInto(obj: any): AccessorDefine;
            class AccessorDefine {
                obj: any;
                constructor(obj: any);
                get(name: string, func: () => any): this;
            }
        }
        module exception {
            function isBundledBusinessErrors(exception: any): boolean;
            function isErrorToReject(res: any): boolean;
            function isBusinessError(res: any): boolean;
        }
    }
    class WebStorageWrapper {
        nativeStorage: Storage;
        constructor(nativeStorage: Storage);
        setItem(key: string, value: string): void;
        setItemAsJson(key: string, value: any): void;
        containsKey(key: string): boolean;
        getItem(key: string): util.optional.Optional<string>;
        getItemAndRemove(key: string): util.optional.Optional<string>;
        removeItem(key: string): void;
        clear(): void;
    }
    /**
     * Utilities about jquery deferred
     */
    module deferred {
        /**
         * Repeats a task with jQuery Deferred
         */
        function repeat(configurator: (conf: repeater.IConfiguration) => void): JQueryPromise<{}>;
        module repeater {
            function begin(conf: IConfiguration): JQueryPromise<{}>;
            interface IConfiguration {
                /**
                 * Set task returns JQueryPromise.
                 */
                task(taskFunction: () => JQueryPromise<any>): IConfiguration;
                /**
                 * Set condition to repeat task.
                 */
                while(whileCondition: (taskResult: any) => boolean): IConfiguration;
                after(runAfterMilliseconds: number): IConfiguration;
                /**
                 * Set pause time as milliseconds.
                 */
                pause(pauseMilliseconds: number): IConfiguration;
            }
            function createConfiguration(): IConfiguration;
        }
    }
    module resource {
        function getText(code: string, params?: any[]): string;
        function getMessage(messageId: string, params?: any[]): string;
        function getControlName(name: string): string;
    }
    var sessionStorage: WebStorageWrapper;
    var localStorage: WebStorageWrapper;
    module characteristics {
        function saveByObjectKey(key: any, value: any): JQueryPromise<{}>;
        function restoreByObjectKey(key: any): JQueryPromise<any>;
        function save(key: string, value: any): JQueryPromise<{}>;
        function restore(key: string): JQueryPromise<any>;
        function remove(key: string): JQueryPromise<{}>;
    }
    module types {
        function matchArguments(values: any[], types: string[]): boolean;
    }
}
declare module nts.uk {
    module format {
        interface IFormatter {
            format(source: any): string;
        }
        interface IFormatterOption {
            constraintName: string;
        }
        class NoFormatter implements format.IFormatter {
            format(source: any): string;
        }
    }
    module text {
        /**
         * 文字列の半角文字数を数える（Unicode用）
         * @param text 解析対象の文字列
         */
        function countHalf(text: string): number;
        function limitText(str: string, maxlength: number, index?: number): string;
        function toOneByteAlphaNumberic(text: string): string;
        function toTwoByteAlphaNumberic(text: string): string;
        function katakanaToHiragana(text: string): string;
        function hiraganaToKatakana(text: string, opt?: boolean): string;
        /**
         * 半角カタカナを全角カタカナに変換
         *
         * @param {String} str 変換したい文字列
         */
        function oneByteKatakanaToTwoByte(text: string): string;
        function anyChar(text: string): {
            probe: boolean;
            messageId: string;
        };
        /**
         * 文字列が半角数字のみで構成された1文字以上の文字列かどうか判断する
         * @param text 解析対象の文字列
         */
        function allHalfNumeric(text: string): {
            probe: boolean;
            messageId: string;
        };
        /**
         * 文字列が半角英字のみで構成された1文字以上の文字列かどうか判断する
         * @param text 解析対象の文字列
         */
        function allHalfAlphabet(text: string): {
            probe: boolean;
            messageId: string;
        };
        /**
         * 文字列が半角英数字のみで構成された1文字以上の文字列かどうか判断する
         * @param text 解析対象の文字列
         */
        function allHalfAlphanumeric(text: string): {
            probe: boolean;
            messageId: string;
        };
        /**
         * 文字列が半角カナのみで構成された1文字以上の文字列かどうか判断する
         * @param text 解析対象の文字列
         */
        function allHalfKatakana(text: string): {
            probe: boolean;
            messageId: string;
        };
        /**
         * 文字列が全角カナのみで構成された1文字以上の文字列かどうか判断する
         * @param text 解析対象の文字列
         */
        function allFullKatakana(text: string): {
            probe: boolean;
            messageId: string;
        };
        /**
         * 文字列が半角文字のみで構成された1文字以上の文字列かどうか判断する
         * @param text 解析対象の文字列
         */
        function allHalf(text: string): {
            probe: boolean;
            messageId: string;
        };
        /**
         * 文字列が平仮名のみで構成された1文字以上の文字列かどうか判断する
         * @param text 解析対象の文字列
         */
        function allHiragana(text: string): {
            probe: boolean;
            messageId: string;
        };
        /**
         * 文字列がカタカナのみで構成された1文字以上の文字列かどうか判断する
         * @param text 解析対象の文字列
         */
        function allKatakana(text: string): {
            probe: boolean;
            messageId: string;
        };
        /**
         * Determines if text is half integer
         * @param text text to check
         */
        function halfInt(text: string): {
            probe: boolean;
            messageId: string;
        };
        /**
         * Determinies if text is workplace code
         * @param text text to check
         */
        function workplaceCode(text: string): {
            probe: boolean;
            messageId: string;
        };
        /**
         * 文字列中のHTML記号をサニタイズする
         * @param text 変換対象の文字列
         */
        function htmlEncode(text: string): string;
        /**
         * 1文字目のみ小文字に変換する
         * @param text 変換対象の文字列
         */
        function toLowerCaseFirst(text: string): string;
        /**
         * 1文字目のみ大文字に変換する
         * @param text 変換対象の文字列
         */
        function toUpperCaseFirst(text: string): string;
        /**
         * Convert lower case text to upper case one
         * @param text text to convert
         */
        function toUpperCase(text: string): string;
        /**
        * 指定された文字列が、null、undefined、Emptyか判定する
        * @param text 判定対象の文字列
        */
        function isNullOrEmpty(text: any): boolean;
        /**
        * 指定した文字列の各書式項目を、対応するオブジェクトの値と等価のテキストに置換する
        * @param text 書式文字列
        * @param args 置換の文字列（配列可）
        */
        function format(format: string, ...args: any[]): string;
        /**
        * 変換文字列の先頭に、文字数分の指定文字列を追加する
        * @param text 変換対象の文字列
        * @param paddingChar 指定文字列
        * @param length 文字数
        */
        function padLeft(text: string, paddingChar: string, length: number): string;
        /**
        * 変換文字列の末尾に、文字数分の指定文字列を追加する
        * @param text 変換対象の文字列
        * @param paddingChar 指定文字列
        * @param length 文字数
        */
        function padRight(text: string, paddingChar: string, length: number): string;
        /**
        * 指定した文字列に、指定した文字列数分、指定文字列を追加する
        * @param text 変換対象の文字列
        * @param paddingChar 埋める文字列
        * @param isPadLeft 左埋めフラグ（false：右埋め）
        * @param length 文字数
        */
        function charPadding(text: string, paddingChar: string, isPadLeft: boolean, length: number): string;
        function replaceAll(originalString: string, find: string, replace: string): string;
        function removeFromStart(originalString: string, charSet: string): string;
        function removeFromEnd(originalString: string, charSet: string): string;
        /**
         * Type of characters
         */
        class CharType {
            viewName: string;
            width: number;
            validator: (text: string) => any;
            constructor(viewName: string, width: number, validator: (text: string) => any);
            validate(text: string): ui.validation.ValidationResult;
            buildConstraintText(maxLength: number): string;
            getViewLength(length: any): number;
        }
        function getCharType(primitiveValueName: string): CharType;
        function getCharTypeByType(charTypeName: string): CharType;
        /**
         * Format for EmployeeCode
         * @return {String}  EmployeeCode
         */
        function formatCode(code: string, filldirection: string, fillcharacter: string, length: number): string;
        function splitOrPadRight(originalString: string, length: number, char?: string): string;
        function formatCurrency(amount: number, locale: string): string;
        function reverseDirection(direction: string): string;
        function getISOFormat(format: string): string;
        class StringFormatter implements format.IFormatter {
            args: any;
            constructor(args: any);
            format(source: any): string;
        }
        class NumberFormatter implements format.IFormatter {
            option: any;
            constructor(option: any);
            format(source: any): string;
        }
        class TimeFormatter implements format.IFormatter {
            option: any;
            constructor(option: any);
            format(source: any): string;
        }
        class TimeWithDayFormatter implements format.IFormatter {
            option: any;
            constructor(option: any);
            format(source: any): string;
        }
        class NumberUnit {
            unitID: string;
            unitText: string;
            language: string;
            position: string;
            constructor(unitID: string, unitText: string, position: string, language?: string);
        }
        function getNumberUnit(unitId: string): NumberUnit;
    }
}
declare module nts.uk.ntsNumber {
    function isNumber(value: any, isDecimalValue?: boolean, option?: any, message?: any): boolean;
    function isHalfInt(value: any, message?: any): boolean;
    var trunc: (value: number) => number;
    function getDecimal(value: any, scale: number): number;
    function formatNumber(value: any, formatOption: any): any;
}
declare module nts.uk.time {
    class JapanYearMonth {
        empire: string;
        year: number;
        month: number;
        constructor(empire?: string, year?: number, month?: number);
        getEmpire(): string;
        getYear(): number;
        getMonth(): number;
        toString(): string;
    }
    function yearInJapanEmpire(date: any): JapanYearMonth;
    function yearmonthInJapanEmpire(yearmonth: any): JapanYearMonth;
    class JapanDateMoment {
        moment: moment.Moment;
        empire: string;
        year: number;
        month: number;
        day: number;
        constructor(date: any, outputFormat?: string);
        toString(): string;
    }
    function dateInJapanEmpire(date: any): JapanDateMoment;
    /**
    * Format by pattern
    * @param  {number} [seconds]	  Input seconds
    * @param  {string} [formatOption] Format option
    * @return {string}				Formatted duration
    */
    function formatSeconds(seconds: number, formatOption: string): string;
    /**
    * Format date
    * @param  {Date}   date	 date
    * @param  {String} [format] format
    * @return {String}		  formatted date
    */
    function formatDate(date: Date, format: any): any;
    /**
    * Format YearMonth
    * @param  {Number} [yearMonth]	Input Yearmonth
    * @return {String}				Formatted YearMonth
    */
    function formatYearMonth(yearMonth: number): string;
    /**
    * Format MonthDay
    * @param  {any} [monthDay]  Input MonthDay
    * @return {string}          Formatted MonthDay
    */
    function formatMonthDayLocalized(monthDay: any): string;
    /**
    * Format by pattern
    * @param  {Date}   [date]		 Input date
    * @param  {String} [inputFormat]  Input format
    * @param  {String} [outputFormat] Output format
    * @return {String}				Formatted date
    */
    function formatPattern(date: any, inputFormat?: string, outputFormat?: string): string;
    abstract class ParseResult {
        success: boolean;
        constructor(success: any);
        abstract format(): any;
        abstract toValue(): any;
        abstract getMsg(): any;
    }
    class ResultParseTime extends ParseResult {
        minus: boolean;
        hours: number;
        minutes: number;
        msg: string;
        constructor(success: any, minus?: any, hours?: any, minutes?: any, msg?: any);
        static succeeded(minus: any, hours: any, minutes: any): ResultParseTime;
        static failed(): ResultParseTime;
        format(): string;
        toValue(): number;
        getMsg(): string;
    }
    function parseTime(time: any, isMinutes?: boolean): ResultParseTime;
    class ResultParseYearMonth extends ParseResult {
        year: number;
        month: number;
        msg: string;
        constructor(success: any, msg?: any, year?: any, month?: any);
        static succeeded(year: any, month: any): ResultParseYearMonth;
        static failed(msg?: any): ResultParseYearMonth;
        format(): string;
        toValue(): number;
        getMsg(): string;
    }
    function parseYearMonth(yearMonth: any): ResultParseYearMonth;
    class ResultParseTimeOfTheDay extends ParseResult {
        hour: number;
        minute: number;
        msg: string;
        constructor(success: any, msg?: any, hour?: any, minute?: any);
        static succeeded(hour: any, minute: any): ResultParseTimeOfTheDay;
        static failed(msg?: any): ResultParseTimeOfTheDay;
        format(): string;
        toValue(): number;
        getMsg(): string;
    }
    function parseTimeOfTheDay(timeOfDay: any): ResultParseTimeOfTheDay;
    class ResultParseYearMonthDate extends ParseResult {
        year: number;
        month: number;
        date: number;
        msg: string;
        constructor(success: any, msg?: any, year?: any, month?: any, date?: any);
        static succeeded(year: any, month: any, date: any): ResultParseYearMonthDate;
        static failed(msg?: any): ResultParseYearMonthDate;
        format(): string;
        toValue(): number;
        getMsg(): string;
    }
    function parseYearMonthDate(yearMonthDate: any): ResultParseYearMonthDate;
    class MomentResult extends ParseResult {
        momentObject: moment.Moment;
        min: moment.Moment;
        max: moment.Moment;
        outputFormat: string;
        msg: string;
        msgID: string;
        params: Array<string>;
        constructor(momentObject: moment.Moment, outputFormat?: string);
        succeeded(): void;
        failed(msg?: string): void;
        failedWithMessegeId(msgID?: string, params?: Array<string>): void;
        format(): string;
        toValue(): moment.Moment;
        systemMin(): moment.Moment;
        systemMax(): moment.Moment;
        toNumber(outputFormat?: string): number;
        getMsg(): string;
        getEmsg(name?: string): string;
        getMsgID(): string;
    }
    function parseMoment(datetime: any, outputFormat?: any, inputFormat?: any): MomentResult;
    function UTCDate(year?: number, month?: number, date?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number): Date;
    class DateTimeFormatter {
        shortYmdPattern: RegExp;
        shortYmdwPattern: RegExp;
        shortYmPattern: RegExp;
        shortMdPattern: RegExp;
        longYmdPattern: RegExp;
        longYmdwPattern: RegExp;
        longFPattern: RegExp;
        longJmdPattern: RegExp;
        longJmPattern: RegExp;
        fullDateTimeShortPattern: RegExp;
        timeShortHmsPattern: RegExp;
        timeShortHmPattern: RegExp;
        days: string[];
        shortYmd(date: string): string;
        shortYmdw(date: string): string;
        shortYm(date: string): string;
        shortMd(date: string): string;
        longYmd(date: string): string;
        longYmdw(date: string): string;
        toLongJpDate(d: Date): string;
        longF(date: string): string;
        longJmd(date: string): string;
        longJm(date: string): string;
        fullJapaneseDateOf(date: string): string;
        fiscalYearOf(date: Date): number;
        dateOf(dateTime: string): string;
        timeOf(dateTime: string): string;
        timeShortHm(time: string): string;
        timeShortHms(time: string): string;
        clockShortHm(time: string): string;
        fullDateTimeShort(dateTime: string): string;
        format(date: string): string;
    }
    function getFormatter(): DateTimeFormatter;
    function applyFormat(format: string, dateTime: string, formatter: DateTimeFormatter): string;
    function isEndOfMonth(value: string, format: string): boolean;
    function convertJapaneseDateToGlobal(japaneseDate: string): string;
}
declare module nts.uk.time {
    module format {
        type DateFormatId = "Short_YMD" | "Short_YMDW" | "Short_YM" | "Short_MD" | "Short_D" | "Short_W" | "Short_MDW" | "Long_YMD" | "Long_YMDW" | "Long_YM" | "Long_MD" | "Long_F" | "Long_JMD" | "Long_JM";
        type DateTimeFormatId = "DateTime_Short_YMDHMS";
        type DurationHmsFormatId = "Time_Short_HMS";
        type FormatId = DateFormatId | DateTimeFormatId | minutesBased.duration.DurationFormatId | minutesBased.clock.ClockFormatId;
        function byId(formatId: FormatId, value: any): string;
    }
}
declare module nts.uk.time {
    module minutesBased {
        const MINUTES_IN_DAY: number;
        interface MinutesBasedTime<T> extends Number {
            isNegative: boolean;
            asMinutes: number;
            minutePart: number;
            minutePartText: string;
            typeName: string;
        }
        function createBase(timeAsMinutes: number): MinutesBasedTime<any>;
    }
}
declare module nts.uk.time.minutesBased {
    module duration {
        class ResultParseMiuntesBasedDuration extends time.ParseResult {
            minus: boolean;
            hours: number;
            minutes: number;
            msg: string;
            constructor(success: any, minus?: any, hours?: any, minutes?: any, msg?: any);
            format(): string;
            toValue(): number;
            getMsg(): string;
            static succeeded(minus: any, hours: any, minutes: any): ResultParseMiuntesBasedDuration;
            static failed(): ResultParseMiuntesBasedDuration;
        }
        function parseString(source: string): ResultParseMiuntesBasedDuration;
        type DurationFormatId = "Time_Short_HM";
        interface DurationMinutesBasedTime extends MinutesBasedTime<DurationMinutesBasedTime> {
            asHoursDouble: number;
            asHoursInt: number;
            text: string;
            formatById(formatId: DurationFormatId): string;
        }
        function create(timeAsMinutes: number): DurationMinutesBasedTime;
    }
}
declare module nts.uk.time.minutesBased {
    module clock {
        enum DayAttr {
            THE_PREVIOUS_DAY = 0,
            THE_PRESENT_DAY = 1,
            THE_NEXT_DAY = 2,
            TWO_DAY_LATER = 3,
        }
        namespace DayAttr {
            function fromValue(value: number): DayAttr;
            function fromDaysOffset(daysOffset: number): DayAttr;
            function toDaysOffset(dayAttr: DayAttr): number;
            function toText(dayAttr: DayAttr): string;
        }
        type ClockFormatId = "Clock_Short_HM" | "ClockDay_Short_HM";
        interface ClockMinutesBasedTime extends MinutesBasedTime<ClockMinutesBasedTime> {
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
        function create(daysOffset: number, hourPart: number, minutePart: number): ClockMinutesBasedTime;
        function create(minutesFromZeroOclock: number): ClockMinutesBasedTime;
    }
}
declare module nts.uk.time.minutesBased.clock {
    module dayattr {
        const MAX_VALUE: TimeWithDayAttr;
        const MIN_VALUE: TimeWithDayAttr;
        enum DayAttr {
            THE_PREVIOUS_DAY = 0,
            THE_PRESENT_DAY = 1,
            THE_NEXT_DAY = 2,
            TWO_DAY_LATER = 3,
        }
        class ResultParseTimeWithDayAttr {
            success: boolean;
            asMinutes: number;
            constructor(success: boolean, asMinutes?: number);
            static succeeded(asMinutes: number): ResultParseTimeWithDayAttr;
            static failed(): ResultParseTimeWithDayAttr;
        }
        function parseString(source: string): ResultParseTimeWithDayAttr;
        interface TimeWithDayAttr extends ClockMinutesBasedTime {
            dayAttr: DayAttr;
            fullText: string;
            shortText: string;
        }
        function create(minutesFromZeroOclock: number): TimeWithDayAttr;
    }
}
declare module nts.uk.request {
    var STORAGE_KEY_TRANSFER_DATA: string;
    type WebAppId = 'comjs' | 'com' | 'pr' | 'at';
    const WEB_APP_NAME: {
        comjs: string;
        com: string;
        pr: string;
        at: string;
    };
    class QueryString {
        items: {
            [key: string]: any;
        };
        constructor();
        static parseUrl(url: string): QueryString;
        static build(entriesObj: {
            [key: string]: any;
        }): QueryString;
        get(key: string): any;
        set(key: string, value: any): void;
        remove(key: string): void;
        mergeFrom(otherObj: QueryString): void;
        count(): number;
        hasItems(): boolean;
        serialize(): string;
    }
    /**
     * URL and QueryString
     */
    class Locator {
        rawUrl: string;
        queryString: QueryString;
        constructor(url: string);
        serialize(): string;
        mergeRelativePath(relativePath: any): Locator;
    }
    function writeDynamicConstraint(codes: Array<string>): JQueryPromise<{}>;
    function ajax(path: string, data?: any, options?: any): any;
    function syncAjax(path: string, data?: any, options?: any): any;
    function uploadFile(data: FormData, option?: any): JQueryPromise<any>;
    function exportFile(path: string, data?: any, options?: any): JQueryPromise<{}>;
    function downloadFileWithTask(taskId: string, data?: any, options?: any): JQueryPromise<{}>;
    module asyncTask {
        function getInfo(taskId: string): any;
        function requestToCancel(taskId: string): any;
    }
    module file {
        function donwload(fileId: string): JQueryPromise<{}>;
        function remove(fileId: string): any;
        function isExist(fileId: string): boolean;
        function pathToGet(fileId: string): string;
    }
    module specials {
        function getAsyncTaskInfo(taskId: string): any;
        function donwloadFile(fileId: string): JQueryPromise<{}>;
        function deleteFile(fileId: string): any;
        function isFileExist(fileId: string): boolean;
        module errorPages {
            function systemError(error: any): void;
            function sessionTimeout(): void;
        }
    }
    function jump(path: string, data?: any): any;
    function jumpToMenu(path: string): void;
    module login {
        function keepUsedLoginPage(): void;
        function jumpToUsedLoginPage(): void;
        function keepSerializedSession(): JQueryPromise<{}>;
        function restoreSessionTo(webAppId: WebAppId): any;
    }
    function jumpToTopPage(): void;
    function resolvePath(path: string): string;
    function liveView(fileId?: string): string;
    module location {
        var current: Locator;
        var appRoot: Locator;
        var siteRoot: Locator;
        var ajaxRootDir: string;
        var currentAppId: WebAppId;
    }
}
declare module nts.uk.ui {
    var _viewModel: any;
    /** Event to notify document ready to initialize UI. */
    var documentReady: JQueryCallback;
    /** Event to notify ViewModel built to bind. */
    var viewModelBuilt: JQueryCallback;
    class KibanViewModel {
        systemName: KnockoutObservable<string>;
        programName: KnockoutObservable<string>;
        title: KnockoutComputed<string>;
        errorDialogViewModel: errors.ErrorsViewModel;
        constructor(dialogOptions?: any);
    }
}
declare module nts.uk.ui.menu {
    /**
     * Request.
     */
    function request(): void;
    /**
     * Display user info.
     */
    function displayUserInfo(): void;
}
declare module nts.uk.ui.notify {
}
declare module nts.uk.ui.validation {
    interface IValidator {
        validate(inputText: string, option?: any): ValidationResult;
    }
    class NoValidator {
        validate(inputText: string, option?: any): ValidationResult;
    }
    class ValidationResult {
        isValid: boolean;
        parsedValue: any;
        errorMessage: string;
        errorCode: string;
        fail(errorMessage: any, errorCode: string): void;
        success(parsedValue: any): void;
    }
    class DepartmentCodeValidator implements IValidator {
        name: string;
        constraint: any;
        charType: nts.uk.text.CharType;
        required: boolean;
        constructor(name: string, primitiveValueName: string, option?: any);
        validate(inputText: string, option?: any): ValidationResult;
    }
    class WorkplaceCodeValidator implements IValidator {
        name: string;
        constraint: any;
        charType: nts.uk.text.CharType;
        required: boolean;
        constructor(name: string, primitiveValueName: string, option?: any);
        validate(inputText: string, option?: any): ValidationResult;
    }
    class PostCodeValidator implements IValidator {
        name: string;
        constraint: any;
        charType: nts.uk.text.CharType;
        required: boolean;
        constructor(name: string, primitiveValueName: string, option?: any);
        validate(inputText: string, option?: any): ValidationResult;
    }
    class PunchCardNoValidator implements IValidator {
        name: string;
        constraint: any;
        charType: nts.uk.text.CharType;
        required: boolean;
        constructor(name: string, primitiveValueName: string, option?: any);
        validate(inputText: string, option?: any): ValidationResult;
    }
    class StringValidator implements IValidator {
        name: string;
        constraint: any;
        charType: nts.uk.text.CharType;
        required: boolean;
        constructor(name: string, primitiveValueName: string, option?: any);
        validate(inputText: string, option?: any): ValidationResult;
    }
    class NumberValidator implements IValidator {
        name: string;
        constraint: any;
        option: any;
        constructor(name: string, primitiveValueName: string, option: any);
        validate(inputText: string): ValidationResult;
    }
    class TimeValidator implements IValidator {
        name: string;
        constraint: any;
        outputFormat: string;
        required: boolean;
        valueType: string;
        mode: string;
        acceptJapaneseCalendar: boolean;
        defaultValue: string;
        constructor(name: string, primitiveValueName: string, option?: any);
        validate(inputText: string): any;
    }
    class TimeWithDayValidator implements IValidator {
        name: string;
        constraint: any;
        required: boolean;
        constructor(name: string, primitiveValueName: string, option?: any);
        validate(inputText: string): any;
    }
    function getConstraint(primitiveValueName: string): any;
    interface ConstraintDescriptor {
        itemCode: string;
        required?: boolean;
    }
    interface StringConstraintDescriptor extends ConstraintDescriptor {
        maxLength: number;
        charType: string;
        paddingCharacter: string;
        isPaddingLeft: boolean;
        isPadding: boolean;
        stringExpression: string;
    }
    interface NumericConstraintDescriptor extends ConstraintDescriptor {
        min: number;
        max: number;
        valueType: string;
        mantissaMaxLength: number;
    }
    interface TimeConstraintDescriptor extends ConstraintDescriptor {
        min: string;
        max: string;
        valueType: string;
    }
    function writeConstraint(constraintName: string, constraint: ConstraintDescriptor): void;
    function writeConstraints(constraints: Array<ConstraintDescriptor>): void;
}
declare module nts.uk.ui.errors {
    interface ErrorListItem {
        errorCode: string;
        /** OBSOLATE! using messageText instead */
        messageText?: string;
        message?: any;
        location?: string;
        tab?: string;
        $control?: JQuery;
        businessError?: boolean;
    }
    interface ErrorMessage {
        message: string;
        messageId?: string;
        parameterIds?: string[];
    }
    interface GridCellError {
        grid: JQuery;
        rowId: any;
        columnKey: string;
        message: string;
    }

    class ErrorsViewModel {
        title: string;
        errors: KnockoutObservableArray<ErrorListItem>;
        gridErrors: KnockoutObservableArray<GridCellError>;
        displayErrors: KnockoutObservableArray<any>;
        option: KnockoutObservable<any>;
        occurs: KnockoutComputed<boolean>;
        allResolved: JQueryCallback;
        allCellsResolved: JQueryCallback;
        constructor(dialogOptions?: any);
        closeButtonClicked(): void;
        open(): void;
        hide(): void;
        addError(error: ErrorListItem): void;
        hasError(): boolean;
        clearError(): void;
        removeErrorByElement($element: JQuery): void;
        removeErrorByCode($element: JQuery, errorCode: string): void;
        removeKibanError($element: JQuery): void;
        getErrorByElement($element: JQuery): ErrorListItem[];
        addCellError(error: GridCellError): void;
        removeCellError($grid: JQuery, rowId: any, columnKey: string): void;
        gridHasError(): boolean;
        sameCells(one: GridCellError, other: GridCellError): boolean;
        stashMemento(): ErrorViewModelMemento;
        restoreFrom(memento: ErrorViewModelMemento): void;
    }
    
    class ErrorViewModelMemento {
        errors: ErrorListItem[];
        gridErrors: GridCellError[];
        option: any;
        allResolved: JQueryCallback;
        allCellsResolved: JQueryCallback;
        errorElements: JQuery;
        setErrors(errors: ErrorListItem[]): void;
        setGridErrors(gridErrors: GridCellError[]): void;
        setErrorElements(): void;
        restoreErrorElements(): void;
    }
    class ErrorHeader {
        name: string;
        text: string;
        width: any;
        visible: boolean;
        constructor(name: string, text: string, width: any, visible: boolean);
    }
    /**
     *  Public API
    **/
    function errorsViewModel(): ErrorsViewModel;
    function show(): void;
    function hide(): void;
    function add(error: ErrorListItem): void;
    function hasError(): boolean;
    function clearAll(): void;
    function removeByElement($control: JQuery): void;
    function removeByCode($control: JQuery, errorCode: string): void;
    function removeCommonError($control: JQuery): void;
    function getErrorByElement($element: JQuery): ErrorListItem[];
    function addCell(error: GridCellError): void;
    function removeCell($grid: JQuery, rowId: any, columnKey: string): void;
    function gridHasError(): boolean;
    function getErrorList(): any[];
}
declare module nts.uk.ui {
    module toBeResource {
        let yes: string;
        let no: string;
        let cancel: string;
        let close: string;
        let info: string;
        let warn: string;
        let error: string;
        let unset: string;
        let errorContent: string;
        let errorCode: string;
        let errorList: string;
        let plzWait: string;
    }
    function localize(textId: string): string;
    var confirmSave: (dirtyChecker: DirtyChecker) => any;
    function confirmSaveEnableDialog(beforeunloadHandler: any, dialog: any): void;
    function confirmSaveDisableDialog(dialog: any): void;
    function confirmSaveEnable(beforeunloadHandler: any): void;
    function confirmSaveDisable(): void;
    /**
     * Block UI Module
     * Using for blocking UI when action in progress
     */
    module block {
        function invisible(): void;
        function grayout(): void;
        function clear(): void;
    }
    class DirtyChecker {
        targetViewModel: KnockoutObservable<any>;
        initialState: string;
        constructor(targetViewModelObservable: KnockoutObservable<any>);
        getCurrentState(): string;
        reset(): void;
        isDirty(): boolean;
    }
}
declare module nts.uk.ui {
    module windows {
        /**
         * Main or Sub Window(dialog)
         */
        class ScreenWindow {
            id: string;
            isRoot: boolean;
            parent: ScreenWindow;
            globalContext: any;
            $dialog: JQuery;
            $iframe: JQuery;
            onClosedHandler: () => void;
            constructor(id: string, isRoot: boolean, parent: ScreenWindow);
            static createMainWindow(): ScreenWindow;
            static createSubWindow(parent: ScreenWindow): ScreenWindow;
            setGlobal(globalContext: any): void;
            setTitle(newTitle: string): void;
            setHeight(height: any): void;
            setWidth(width: any): void;
            setSize(height: any, width: any): void;
            setupAsDialog(path: string, options: any): void;
            build$dialog(options: any): void;
            onClosed(callback: () => void): void;
            close(): void;
            dispose(): void;
        }
        /**
         * All ScreenWindows are managed by this container.
         * this instance is singleton in one browser-tab.
         */
        class ScreenWindowContainer {
            windows: {
                [key: string]: ScreenWindow;
            };
            shared: {
                [key: string]: any;
            };
            localShared: {
                [key: string]: any;
            };
            constructor();
            /**
             * All dialog object is in MainWindow.
             */
            createDialog(path: string, options: any, parentId: string): ScreenWindow;
            createDialogNotOpen(path: string, options: any, parentId: string): ScreenWindow;
            mergeOption(options: any): any;
            getShared(key: string): any;
            setShared(key: string, data: any, isRoot: boolean, persist?: boolean): void;
            close(id: string): void;
        }
        var selfId: string;
        var container: ScreenWindowContainer;
        function rgc(): any;
        function getShared(key: string): any;
        function setShared(key: string, data: any, persist?: boolean): void;
        function getSelf(): ScreenWindow;
        function close(windowId?: string): void;
        module sub {
            function modal(path: string, options?: any): any;
            function modeless(path: string, options?: any): any;
            function open(path: string, options?: any): ScreenWindow;
            function createDialog(path: string, options?: any): ScreenWindow;
        }
    }
}
declare module nts.uk.ui {
    /**
     * Dialog Module
     * Using for display info or confirm dialog
     */
    module dialog {
        function getMaxZIndex(): number;
        function version(): void;
        function info(message: any): {
            then: (callback: any) => void;
        };
        function caution(message: any): {
            then: (callback: any) => void;
        };
        function error(message: any): {
            then: (callback: any) => void;
        };
        function alertError(message: any): {
            then: (callback: any) => void;
        };
        function alert(message: any): {
            then: (callback: any) => void;
        };
        function confirm(message: any, option?: any): {
            ifYes: (handler: any) => any;
            ifCancel: (handler: any) => any;
            ifNo: (handler: any) => any;
            then: (handler: any) => any;
        };
        function confirmDanger(message: any): {
            ifYes: (handler: any) => any;
            ifCancel: (handler: any) => any;
            ifNo: (handler: any) => any;
            then: (handler: any) => any;
        };
        function confirmProceed(message: any): {
            ifYes: (handler: any) => any;
            ifCancel: (handler: any) => any;
            ifNo: (handler: any) => any;
            then: (handler: any) => any;
        };
        function bundledErrors(errors: any): {
            then: (callback: any) => void;
        };
    }
}
declare module nts.uk.ui {
    /**
     * Utilities for IgniteUI
     */
    module ig {
        module grid {
            function getScrollContainer($grid: JQuery): JQuery;
            function getRowIdFrom($anyElementInRow: JQuery): any;
            function getRowIndexFrom($anyElementInRow: JQuery): number;
            function expose(targetRow: any, $grid: JQuery): void;
            module virtual {
                function getDisplayContainer(gridId: String): JQuery;
                function getVisibleRows(gridId: String): JQuery;
                function getFirstVisibleRow(gridId: String): JQuery;
                function getLastVisibleRow(gridId: String): JQuery;
                function expose(targetRow: any, $grid: JQuery): void;
            }
            module dataSource {
                function getIndexOfKey(targetKey: any, $grid: JQuery): number;
            }
            module header {
                function getCell(gridId: String, columnKey: String): JQuery;
                function getLabel(gridId: String, columnKey: String): JQuery;
            }
        }
        module tree {
            module grid {
                function expandTo(targetKey: any, $treeGrid: JQuery): void;
                function scrollTo(targetKey: any, $treeGrid: JQuery): void;
            }
            module dataSource {
                function collectAncestorKeys(targetKey: any, dataSource: any[], primaryKey: string, childDataKey: string): any[];
            }
        }
    }
}
declare module nts.uk.ui.option {
    abstract class DialogOption {
        modal: boolean;
        show: boolean;
        buttons: DialogButton[];
    }
    interface IDialogOption {
        modal?: boolean;
    }
    class ConfirmDialogOption extends DialogOption {
        constructor(option?: IDialogOption);
    }
    class DelDialogOption extends DialogOption {
        constructor(option?: IDialogOption);
    }
    class OKDialogOption extends DialogOption {
        constructor(option?: IDialogOption);
    }
    interface IErrorDialogOption {
        headers?: errors.ErrorHeader[];
        modal?: boolean;
        displayrows?: number;
        autoclose?: boolean;
    }
    class ErrorDialogOption extends DialogOption {
        headers: errors.ErrorHeader[];
        displayrows: number;
        autoclose: boolean;
        constructor(option?: IErrorDialogOption);
    }
    class ErrorDialogWithTabOption extends ErrorDialogOption {
        constructor(option?: IErrorDialogOption);
    }
    type ButtonSize = "x-large" | "large" | "medium" | "small";
    type ButtonColor = "" | "danger" | "proceed";
    class DialogButton {
        text: string;
        "class": string;
        size: ButtonSize;
        color: ButtonColor;
        click(viewmodel: any, ui: any): void;
    }
}
declare module nts.uk.ui.option {
    type TextMode = "text" | "password";
    type FillDirection = "left" | "right";
    type Currency = "JPY" | "USD";
    abstract class EditorOptionBase {
        placeholder: string;
        width: string;
        textalign: string;
    }
    interface ITextEditorOption {
        textmode?: TextMode;
        placeholder?: string;
        width?: string;
        textalign?: string;
        autofill?: boolean;
        filldirection?: FillDirection;
        fillcharacter?: string;
    }
    class TextEditorOption extends EditorOptionBase {
        textmode: TextMode;
        autofill: boolean;
        filldirection: FillDirection;
        fillcharacter: string;
        constructor(option?: ITextEditorOption);
    }
    interface ITimeEditorOption {
        inputFormat?: string;
        placeholder?: string;
        width?: string;
        textalign?: string;
        defaultValue?: string;
    }
    class TimeEditorOption extends EditorOptionBase {
        inputFormat: string;
        defaultValue: string;
        constructor(option?: ITimeEditorOption);
    }
    interface INumberEditorOption {
        groupseperator?: string;
        grouplength?: number;
        decimalseperator?: string;
        decimallength?: number;
        currencyformat?: Currency;
        currencyposition?: string;
        placeholder?: string;
        width?: string;
        textalign?: string;
        symbolChar?: string;
        symbolPosition?: string;
        defaultValue?: string;
        unitID: string;
    }
    class NumberEditorOption extends EditorOptionBase {
        groupseperator: string;
        grouplength: number;
        decimalseperator: string;
        decimallength: number;
        symbolChar: string;
        symbolPosition: string;
        defaultValue: string;
        unitID: string;
        constructor(option?: INumberEditorOption);
    }
    class CurrencyEditorOption extends NumberEditorOption {
        currencyformat: Currency;
        currencyposition: string;
        constructor(option?: INumberEditorOption);
    }
    interface IMultilineEditorOption {
        resizeable?: boolean;
        placeholder?: string;
        width?: string;
        textalign?: string;
    }
    class MultilineEditorOption extends EditorOptionBase {
        resizeable: boolean;
        constructor(option?: IMultilineEditorOption);
    }
    interface ITimeWithDayAttrEditorOption {
        timeWithDay: boolean;
        placeholder?: string;
        width?: string;
        textalign?: string;
    }
    class TimeWithDayAttrEditorOption extends EditorOptionBase {
        timeWithDay: boolean;
        constructor(option?: ITimeWithDayAttrEditorOption);
    }
}
interface JQuery {
    exposeVertically($target: JQuery): any;
    onkey(command: "down" | "up" | "press", keyCode: number, handler: (JQueryEventObject) => void): JQuery;
    dialogPositionControl(): JQuery;
    exposeOnTabPanel(): JQuery;
}
declare module nts.uk.ui.jqueryExtentions {
}
declare module nts.uk.ui.koExtentions {
}
declare module nts.uk.ui.koExtentions {
}
declare module nts.uk.ui.koExtentions {
}
declare module nts.uk.ui.koExtentions {
}
declare module nts.uk.ui.koExtentions {
}
declare module nts.uk.ui.koExtentions {
}
declare module nts.uk.ui.koExtentions {
}
declare module nts.uk.ui.koExtentions {
}
declare module nts.uk.ui.koExtentions {
}
declare module nts.uk.ui.koExtentions {
}
declare module nts.uk.ui.koExtentions {
    /**
    * SearchBox Binding Handler
    */
    class SearchBox {
        childField: string;
        searchField: Array<string>;
        source: Array<any>;
        constructor(source: Array<any>, searchField: Array<string>, childField?: string);
        search(searchKey: string): Array<any>;
        setDataSource(source: Array<any>): void;
        getDataSource(): any[];
        private cloneDeep(source);
        private cloneDeepX(source);
    }
    class SearchResult {
        options: Array<any>;
        selectItems: Array<any>;
        constructor();
    }
    class SearchPub {
        seachBox: SearchBox;
        mode: string;
        key: string;
        constructor(key: string, mode: string, source: Array<any>, searchField: Array<string>, childField?: string);
        search(searchKey: string, selectedItems: Array<any>): SearchResult;
        setDataSource(source: Array<any>): void;
        getDataSource(): any[];
    }
}
declare module nts.uk.ui.koExtentions {
}
declare module nts.uk.ui.koExtentions {
}
declare module nts.uk.ui.koExtentions {
}
declare module nts.uk.ui.koExtentions {
}
declare module nts.uk.ui.koExtentions {
}
declare module nts.uk.ui.koExtentions {
}
declare module nts.uk.ui.koExtentions {
}
declare module nts.uk.ui.koExtentions {
}
declare module nts.uk.enums {
    var NtsCharset: nts.uk.enums.EnumConstant[];
}
declare module nts.uk.ui.koExtentions {
}
declare module nts.uk.ui {
    module contextmenu {
        class ContextMenu {
            guid: string;
            selector: string;
            items: Array<ContextMenuItem>;
            enable: boolean;
            private target;
            /**
             * Create an instance of ContextMenu. Auto call init() method
             *
             * @constructor
             * @param {selector} Jquery selector for elements need to show ContextMenu
             * @param {items} List ContextMenuItem for ContextMenu
             * @param {enable} (Optinal) Set enable/disable for ContextMenu
             */
            constructor(selector: string, items: Array<ContextMenuItem>, enable?: boolean);
            /**
             * Create ContextMenu and bind event in DOM
             */
            init(): void;
            /**
             * Remove and unbind ContextMenu event
             */
            destroy(): void;
            /**
             * Re-create ContextMenu. Useful when you change various things in ContextMenu.items
             */
            refresh(): void;
            /**
             * Get a ContextMenuItem instance
             *
             * @param {target} Can be string or number. String type will select item by "key", Number type will select item by index
             * @return {any} Return ContextMenuItem if found or undefiend
             */
            getItem(target: any): ContextMenuItem;
            /**
             * Add an ContextMenuItem instance to ContextMenu
             *
             * @param {item} An ContextMenuItem instance
             */
            addItem(item: ContextMenuItem): void;
            /**
             * Remove item with given "key" or index
             *
             * @param {target} Can be string or number. String type will select item by "key", Number type will select item by index
             */
            removeItem(target: any): void;
            /**
             * Enable/Disable ContextMenu. If disable right-click will have default behavior
             *
             * @param {enable} A boolean value set enable/disable
             */
            setEnable(enable: boolean): void;
            /**
             * Enable/Disable item with given "key" or index
             *
             * @param {enable} A boolean value set enable/disable
             * @param {target} Can be string or number. String type will select item by "key", Number type will select item by index
             */
            setEnableItem(enable: boolean, target: any): void;
            /**
             * Show/Hide item with given "key" or index
             *
             * @param {enable} A boolean value set visible/hidden
             * @param {target} Can be string or number. String type will select item by "key", Number type will select item by index
             */
            setVisibleItem(visible: boolean, target: any): void;
            private createMenuItems(container);
        }
        class ContextMenuItem {
            key: string;
            text: string;
            handler: (ui: any) => void;
            icon: string;
            visible: boolean;
            enable: boolean;
            constructor(key: string, text?: string, handler?: (ui: any) => void, icon?: string, visible?: boolean, enable?: boolean);
        }
    }
}
declare module nts.uk.ui.koExtentions {
}
interface JQuery {
    ntsListBox(action: string, param?: any): any;
}
declare module nts.uk.ui.jqueryExtentions {
}
interface JQuery {
    ntsError(action: string, param?: any, errorCode?: string, businessError?: boolean): any;
}
declare module nts.uk.ui {
    const DATA_SET_ERROR_STYLE: string;
    const DATA_CLEAR_ERROR_STYLE: string;
    module bindErrorStyle {
        function setError($element: JQuery, callback: () => void): void;
        function clearError($element: JQuery, callback: () => void): void;
        function useDefaultErrorClass($element: JQuery): void;
    }
}
declare module nts.uk.ui.jqueryExtentions {
}
interface JQuery {
    ntsFixedTable(action?: string, param?: any): any;
}
declare module nts.uk.ui.jqueryExtentions {
}
interface JQuery {
    ntsGridList(action: string, param?: any): any;
    ntsGridListFeature(feature: string, action: string, ...params: any[]): any;
}
declare module nts.uk.ui.jqueryExtentions {
}
interface JQuery {
    ntsWizard(action: string, param?: any): any;
}
declare module nts.uk.ui.jqueryExtentions {
}
declare module nts.uk.ui.koExtentions {
}
interface JQuery {
    ntsButtonTable(method: string, option?: any, option2?: any, option3?: any): any;
}
declare module nts.uk.ui.jqueryExtentions {
}
declare module nts.uk.ui.koExtentions {
}
declare module nts.uk.ui.koExtentions {
}
declare module nts.uk.ui.koExtentions {
}
declare module nts.uk.ui.koExtentions {
}
declare module nts.uk.ui.jqueryExtentions {
}
declare module nts.uk.ui.sharedvm {
    class KibanTimer {
        elapsedSeconds: number;
        formatted: KnockoutObservable<string>;
        targetComponent: string;
        isTimerStart: KnockoutObservable<boolean>;
        oldDated: KnockoutObservable<Date>;
        interval: any;
        constructor(target: string);
        run(timer: any): void;
        start(): void;
        end(): void;
    }
}
interface JQuery {
    ntsFileUpload(options: nts.uk.ui.jqueryExtentions.ntsFileUpload.FileUploadOption): any;
}
declare module nts.uk.ui.jqueryExtentions {
    module ntsFileUpload {
        interface FileUploadOption {
            stereoType: string;
            onSuccess?(): any;
            onFail?(): any;
        }
    }
}
declare module nts.uk.ui.koExtentions {
}
declare module nts.uk.ui.file {
    class FileDownload {
        servicePath: string;
        data: any;
        isFinishTask: KnockoutObservable<boolean>;
        taskId: any;
        interval: any;
        deferred: any;
        constructor(servicePath: string, data?: any);
        isTaskFinished(file: any): void;
        print(): any;
        download(): void;
    }
}
declare module nts.uk.ui.koExtentions {
}
declare module nts.uk.ui.koExtentions {
}
declare module nts.uk.ui.koExtentions {
}
declare module nts.uk.ui.koExtentions {
}
interface JQuery {
    ntsSideBar(action?: string, param?: any): any;
}
declare module nts.uk.ui.jqueryExtentions {
}
declare module nts.uk.ui.koExtentions {
}
interface JQuery {
    setupSearchScroll(controlType: string, param?: any): any;
}
declare module nts.uk.ui.jqueryExtentions {
}
interface JQuery {
    ntsGrid(options: any, ...params: Array<any>): any;
}
declare module nts.uk.ui.jqueryExtentions {
    module ntsGrid {
        module color {
            let Error: string;
            let Alarm: string;
            let ManualEditTarget: string;
            let ManualEditOther: string;
            let Reflect: string;
            let Calculation: string;
            let Disable: string;
            class CellFormatter {
                $grid: JQuery;
                cellStateFeatureDef: any;
                statesTable: Array<any>;
                rowStates: any;
                rowDisableFeatureDef: any;
                disableRows: any;
                textColorFeatureDef: any;
                textColorsTable: any;
                constructor($grid: any, features: any);
                /**
                 * Set states table
                 */
                private setStatesTable(features);
                /**
                 * Set text colors
                 */
                private setTextColorsTableMap(features);
                /**
                 * Format textbox.
                 */
                format(column: any, notTb?: boolean): any;
                /**
                 * Style common controls.
                 */
                style($grid: JQuery, cell: any): void;
                /**
                 * Set text color
                 */
                setTextColor($grid: JQuery, cell: any): void;
            }
            /**
             * Style headers
             */
            function styleHeaders($grid: JQuery, options: any): void;
            /**
             * Remember disable
             */
            function rememberDisabled($grid: JQuery, cell: any): void;
            /**
             * Push disable
             */
            function pushDisable($grid: JQuery, cell: any): void;
            /**
             * Pop disable
             */
            function popDisable($grid: JQuery, cell: any): void;
        }
    }
}
interface JQuery {
    ntsPopup(action?: string, option?: nts.uk.ui.jqueryExtentions.ntsPopup.PopupSetting): JQuery;
}
declare module nts.uk.ui.jqueryExtentions {
    module ntsPopup {
        interface PopupSetting {
            trigger?: string;
            position?: any;
            showOnStart?: boolean;
            dismissible?: boolean;
        }
    }
}
declare module nts.uk.ui.koExtentions {
}
interface JQuery {
    ntsUserGuide(action?: string, param?: any): any;
}
declare module nts.uk.ui.jqueryExtentions {
}
declare class NtsSortableBindingHandler implements KnockoutBindingHandler {
    ITEMKEY: string;
    INDEXKEY: string;
    LISTKEY: string;
    PARENTKEY: string;
    DRAGKEY: string;
    dataSet: (node: Element, key: string, value: any) => void;
    dataGet: (node: Element, key: string) => any;
    version: string;
    hasNestedSortableFix: () => number | boolean;
    constructor();
    addMetaDataAfterRender: (elements: any, data: any) => void;
    updateIndexFromDestroyedItems: (index: any, items: any) => any;
    stripTemplateWhitespace: (element: any, name: any) => void;
    prepareTemplateOptions: (valueAccessor: any, dataName: any) => any;
    init: (element: HTMLElement, valueAccessor: any, allBindingsAccessor: any, viewModel: any, bindingContext: KnockoutBindingContext) => {
        'controlsDescendantBindings': boolean;
    };
    update: (element: HTMLElement, valueAccessor: any, allBindingsAccessor: any, viewModel: any, bindingContext: KnockoutBindingContext) => void;
}
declare module nts.uk.ui.exTable {
    class ExTable {
        $container: JQuery;
        $commander: JQuery;
        $follower: JQuery;
        headerHeight: string;
        bodyHeight: string;
        bodyRowHeight: string;
        horzSumHeaderHeight: string;
        horzSumBodyHeight: string;
        horzSumBodyRowHeight: string;
        leftmostHeader: any;
        leftmostContent: any;
        middleHeader: any;
        middleContent: any;
        detailHeader: any;
        detailContent: any;
        verticalSumHeader: any;
        verticalSumContent: any;
        leftHorzSumHeader: any;
        leftHorzSumContent: any;
        horizontalSumHeader: any;
        horizontalSumContent: any;
        headers: any;
        bodies: any;
        features: any;
        areaResize: boolean;
        heightSetter: any;
        bodyHeightSetMode: string;
        windowXOccupation: number;
        windowYOccupation: number;
        updateMode: string;
        pasteOverWrite: boolean;
        stickOverWrite: boolean;
        viewMode: string;
        determination: any;
        modifications: any;
        constructor($container: JQuery, options: any);
        setUpdateMode(updateMode: any): void;
        setViewMode(mode: any): void;
        LeftmostHeader(leftmostHeader: any): this;
        LeftmostContent(leftmostContent: any): this;
        MiddleHeader(middleHeader: any): this;
        MiddleContent(middleContent: any): this;
        DetailHeader(detailHeader: any): this;
        DetailContent(detailContent: any): this;
        VerticalSumHeader(verticalSumHeader: any): this;
        VerticalSumContent(verticalSumContent: any): this;
        LeftHorzSumHeader(leftHorzSumHeader: any): this;
        LeftHorzSumContent(leftHorzSumContent: any): this;
        HorizontalSumHeader(horizontalSumHeader: any): this;
        HorizontalSumContent(horizontalSumContent: any): this;
        setHeaderClass(options: any, part: string): void;
        setBodyClass(options: any, part: string): void;
        /**
         * Create.
         */
        create(): void;
        /**
         * Create horizontal sums.
         */
        createHorzSums(): void;
        /**
         * Setup crud area.
         */
        setupCrudArea(): void;
        /**
         * General settings.
         */
        generalSettings(headerWrappers: Array<JQuery>, bodyWrappers: Array<JQuery>): void;
        /**
         * Satisfy prebuild.
         */
        satisfyPrebuild(): boolean;
        /**
         * Set wrapper width.
         */
        setWrapperWidth(options: any, widthParts: any): void;
    }
}
declare module nts.uk.ui.jqueryExtentions {
}
interface JQuery {
    ntsTreeView(action: string, param?: any): any;
    ntsTreeDrag(action: string, param?: any): any;
}
declare module nts.uk.ui.jqueryExtentions {
}
declare module nts.uk.ui.jqueryExtentions {
}
