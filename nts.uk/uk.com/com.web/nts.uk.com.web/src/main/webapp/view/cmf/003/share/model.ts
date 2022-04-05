module nts.uk.com.view.cmf003.share.model {
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import modal = nts.uk.ui.windows.sub.modal;
    import getText = nts.uk.resource.getText;

    export enum NOT_USE_ATR {
        NOT_USE = 0,
        USE = 1
    }
    export enum ROUNDING_METHOD {
        TRUNCATION = 0,
        ROUND_UP = 1,
        DOWN_4_UP_5 = 2
    }

    export enum FORMAT_SELECTION {
        NO_DECIMAL = 0,
        DECIMAL = 1
    }

    export enum DECIMAL_POINT_CLASSIFICATION {
        NO_OUTPUT_DECIMAL_POINT = 0,
        OUTPUT_DECIMAL_POINT = 1
    }

    export enum FIXED_LENGTH_EDITING_METHOD {
        ZERO_BEFORE = 0,
        ZERO_AFTER = 1,
        SPACE_BEFORE = 2,
        SPACE_AFTER = 3
    }
    export class AcceptanceCodeConvert {
        convertCode: KnockoutObservable<string>;
        convertName: KnockoutObservable<string>;
        dispConvertCode: string;
        dispConvertName: string;
        acceptCodeWithoutSettings: KnockoutObservable<number>;

        constructor(code: string, name: string, acceptWithoutSettings: number) {
            this.convertCode = ko.observable(code);
            this.convertName = ko.observable(name);
            this.dispConvertCode = code;
            this.dispConvertName = name;
            this.acceptCodeWithoutSettings = ko.observable(acceptWithoutSettings);
        }
    }

    export class CodeConvertDetail {
        lineNumber: KnockoutObservable<number>;
        outputItem: KnockoutObservable<string>;
        systemCode: KnockoutObservable<string>;

        constructor(lineNumber: number, output: string, sysCode: string) {
            this.lineNumber = ko.observable(lineNumber);
            this.outputItem = ko.observable(output);
            this.systemCode = ko.observable(sysCode);
        }
    }
    export class NumericDataFormatSetting {
        formatSelection: KnockoutObservable<number>;
        decimalDigit: KnockoutObservable<number>;
        decimalPointClassification: KnockoutObservable<number>;
        decimalFraction: KnockoutObservable<number>;
        outputMinusAsZero: KnockoutObservable<number>;
        fixedValueOperation: KnockoutObservable<number>;
        fixedValueOperationSymbol: KnockoutObservable<number>;
        fixedCalculationValue: KnockoutObservable<number>;
        fixedLengthOutput: KnockoutObservable<number>;
        fixedLengthIntegerDigit: KnockoutObservable<number>;
        fixedLengthEditingMethod: KnockoutObservable<number>;
        nullValueReplace: KnockoutObservable<number>;
        valueOfNullValueReplace: KnockoutObservable<number>;
        fixedValue: KnockoutObservable<number>;
        valueOfFixedValue: KnockoutObservable<string>;
        constructor(formatSelection: number, decimalDigit: number, decimalPointClassification: number, decimalFraction: number, outputMinusAsZero: number,
            fixedValueOperation: number, fixedValueOperationSymbol: number, fixedCalculationValue: number, fixedLengthOutput: number, fixedLengthIntegerDigit: number,
            fixedLengthEditingMethod: number, nullValueReplace: number, valueOfNullValueReplace: number, fixedValue: number, valueOfFixedValue: string) {

            this.formatSelection = ko.observable(formatSelection);
            this.decimalDigit = ko.observable(decimalDigit);
            this.decimalPointClassification = ko.observable(decimalPointClassification);
            this.decimalFraction = ko.observable(decimalFraction);
            this.outputMinusAsZero = ko.observable(outputMinusAsZero);
            this.fixedValueOperation = ko.observable(fixedValueOperation);
            this.fixedValueOperationSymbol = ko.observable(fixedValueOperationSymbol);
            this.fixedCalculationValue = ko.observable(fixedCalculationValue);
            this.fixedLengthOutput = ko.observable(fixedLengthOutput);
            this.fixedLengthIntegerDigit = ko.observable(fixedLengthIntegerDigit);
            this.fixedLengthEditingMethod = ko.observable(fixedLengthEditingMethod);
            this.nullValueReplace = ko.observable(nullValueReplace);
            this.valueOfNullValueReplace = ko.observable(valueOfNullValueReplace);
            this.fixedValue = ko.observable(fixedValue);
            this.valueOfFixedValue = ko.observable(valueOfFixedValue);
        }
    }
    export class CharacterDataFormatSetting {
        effectDigitLength: KnockoutObservable<number>;
        startDigit: KnockoutObservable<number>;
        endDigit: KnockoutObservable<number>;
        codeEditing: KnockoutObservable<number>;
        codeEditDigit: KnockoutObservable<number>;
        codeEditingMethod: KnockoutObservable<number>;
        spaceEditing: KnockoutObservable<number>;
        codeConvertCode: KnockoutObservable<string>;
        nullValueReplace: KnockoutObservable<number>;
        valueOfNullValueReplace: KnockoutObservable<string>;
        fixedValue: KnockoutObservable<number>;
        valueOfFixedValue: KnockoutObservable<string>;
        constructor(effectDigitLength: number, startDigit: number, endDigit: number, codeEditing: number,
            codeEditDigit: number, codeEditingMethod: number, spaceEditing: number, codeConvertCode: string, 
            nullValueReplace: number, valueOfNullValueReplace: string, fixedValue: number, valueOfFixedValue: string) {
            this.effectDigitLength = ko.observable(effectDigitLength);
            this.startDigit = ko.observable(startDigit);
            this.endDigit = ko.observable(endDigit);
            this.codeEditing = ko.observable(codeEditing);
            this.codeEditDigit = ko.observable(codeEditDigit);
            this.codeEditingMethod = ko.observable(codeEditingMethod);
            this.spaceEditing = ko.observable(spaceEditing);
            this.codeConvertCode = ko.observable(codeConvertCode);
            this.nullValueReplace = ko.observable(nullValueReplace);
            this.valueOfNullValueReplace = ko.observable(valueOfNullValueReplace);
            this.fixedValue = ko.observable(fixedValue);
            this.valueOfFixedValue = ko.observable(valueOfFixedValue);
        }
    }

    export class ItemModel {
        code: number;
        name: string;

        constructor(code: number, name: string) {
            this.code = code;
            this.name = name;
        }
    }

    export class StandardOutputItem {
        outputItemCode: KnockoutObservable<string>;
        dispOutputItemCode: string;
        outputItemName: KnockoutObservable<string>;
        dispOutputItemName: string;
        conditionSettingCode: KnockoutObservable<string>;
        formulaResult: KnockoutObservable<string>;
        itemType: KnockoutObservable<number>;

        constructor(outputItemCode: string, outputItemName: string,
            conditionSettingCode: string, formulaResult: string, itemType: number) {
            this.outputItemCode = ko.observable(outputItemCode);
            this.dispOutputItemCode = outputItemCode;
            this.outputItemName = ko.observable(outputItemName);
            this.dispOutputItemName = outputItemName;
            this.conditionSettingCode = ko.observable(conditionSettingCode);
            this.formulaResult = ko.observable(formulaResult);
            this.itemType = ko.observable(itemType);
        }
    }
    
    export class ExternalOutputCategoryItemData {
        itemNo: KnockoutObservable<string>;
        dispItemNo: string;
        itemName: KnockoutObservable<string>;
        dispitemName: string;

        constructor(itemNo: string, itemName: string) {
            this.itemNo = ko.observable(itemNo);
            this.dispItemNo = itemNo;
            this.itemName = ko.observable(itemName);
            this.dispitemName = itemName;
        }
    }
    
    export function getSystemTypes(): Array<ItemModel> {
        return [
            new ItemModel(0, getText('Enum_SystemType_PERSON_SYSTEM')),
            new ItemModel(1, getText('Enum_SystemType_ATTENDANCE_SYSTEM')),
            new ItemModel(2, getText('Enum_SystemType_PAYROLL_SYSTEM')),
            new ItemModel(3, getText('Enum_SystemType_OFFICE_HELPER'))
        ];
    }
}