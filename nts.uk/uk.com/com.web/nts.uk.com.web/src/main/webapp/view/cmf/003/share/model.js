var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf003;
                (function (cmf003) {
                    var share;
                    (function (share) {
                        var model;
                        (function (model) {
                            var getText = nts.uk.resource.getText;
                            var NOT_USE_ATR;
                            (function (NOT_USE_ATR) {
                                NOT_USE_ATR[NOT_USE_ATR["NOT_USE"] = 0] = "NOT_USE";
                                NOT_USE_ATR[NOT_USE_ATR["USE"] = 1] = "USE";
                            })(NOT_USE_ATR = model.NOT_USE_ATR || (model.NOT_USE_ATR = {}));
                            var ROUNDING_METHOD;
                            (function (ROUNDING_METHOD) {
                                ROUNDING_METHOD[ROUNDING_METHOD["TRUNCATION"] = 0] = "TRUNCATION";
                                ROUNDING_METHOD[ROUNDING_METHOD["ROUND_UP"] = 1] = "ROUND_UP";
                                ROUNDING_METHOD[ROUNDING_METHOD["DOWN_4_UP_5"] = 2] = "DOWN_4_UP_5";
                            })(ROUNDING_METHOD = model.ROUNDING_METHOD || (model.ROUNDING_METHOD = {}));
                            var FORMAT_SELECTION;
                            (function (FORMAT_SELECTION) {
                                FORMAT_SELECTION[FORMAT_SELECTION["NO_DECIMAL"] = 0] = "NO_DECIMAL";
                                FORMAT_SELECTION[FORMAT_SELECTION["DECIMAL"] = 1] = "DECIMAL";
                            })(FORMAT_SELECTION = model.FORMAT_SELECTION || (model.FORMAT_SELECTION = {}));
                            var DECIMAL_POINT_CLASSIFICATION;
                            (function (DECIMAL_POINT_CLASSIFICATION) {
                                DECIMAL_POINT_CLASSIFICATION[DECIMAL_POINT_CLASSIFICATION["NO_OUTPUT_DECIMAL_POINT"] = 0] = "NO_OUTPUT_DECIMAL_POINT";
                                DECIMAL_POINT_CLASSIFICATION[DECIMAL_POINT_CLASSIFICATION["OUTPUT_DECIMAL_POINT"] = 1] = "OUTPUT_DECIMAL_POINT";
                            })(DECIMAL_POINT_CLASSIFICATION = model.DECIMAL_POINT_CLASSIFICATION || (model.DECIMAL_POINT_CLASSIFICATION = {}));
                            var FIXED_LENGTH_EDITING_METHOD;
                            (function (FIXED_LENGTH_EDITING_METHOD) {
                                FIXED_LENGTH_EDITING_METHOD[FIXED_LENGTH_EDITING_METHOD["ZERO_BEFORE"] = 0] = "ZERO_BEFORE";
                                FIXED_LENGTH_EDITING_METHOD[FIXED_LENGTH_EDITING_METHOD["ZERO_AFTER"] = 1] = "ZERO_AFTER";
                                FIXED_LENGTH_EDITING_METHOD[FIXED_LENGTH_EDITING_METHOD["SPACE_BEFORE"] = 2] = "SPACE_BEFORE";
                                FIXED_LENGTH_EDITING_METHOD[FIXED_LENGTH_EDITING_METHOD["SPACE_AFTER"] = 3] = "SPACE_AFTER";
                            })(FIXED_LENGTH_EDITING_METHOD = model.FIXED_LENGTH_EDITING_METHOD || (model.FIXED_LENGTH_EDITING_METHOD = {}));
                            var AcceptanceCodeConvert = /** @class */ (function () {
                                function AcceptanceCodeConvert(code, name, acceptWithoutSettings) {
                                    this.convertCode = ko.observable(code);
                                    this.convertName = ko.observable(name);
                                    this.dispConvertCode = code;
                                    this.dispConvertName = name;
                                    this.acceptCodeWithoutSettings = ko.observable(acceptWithoutSettings);
                                }
                                return AcceptanceCodeConvert;
                            }());
                            model.AcceptanceCodeConvert = AcceptanceCodeConvert;
                            var CodeConvertDetail = /** @class */ (function () {
                                function CodeConvertDetail(lineNumber, output, sysCode) {
                                    this.lineNumber = ko.observable(lineNumber);
                                    this.outputItem = ko.observable(output);
                                    this.systemCode = ko.observable(sysCode);
                                }
                                return CodeConvertDetail;
                            }());
                            model.CodeConvertDetail = CodeConvertDetail;
                            var NumericDataFormatSetting = /** @class */ (function () {
                                function NumericDataFormatSetting(formatSelection, decimalDigit, decimalPointClassification, decimalFraction, outputMinusAsZero, fixedValueOperation, fixedValueOperationSymbol, fixedCalculationValue, fixedLengthOutput, fixedLengthIntegerDigit, fixedLengthEditingMethod, nullValueReplace, valueOfNullValueReplace, fixedValue, valueOfFixedValue) {
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
                                return NumericDataFormatSetting;
                            }());
                            model.NumericDataFormatSetting = NumericDataFormatSetting;
                            var CharacterDataFormatSetting = /** @class */ (function () {
                                function CharacterDataFormatSetting(effectDigitLength, startDigit, endDigit, codeEditing, codeEditDigit, codeEditingMethod, spaceEditing, codeConvertCode, nullValueReplace, valueOfNullValueReplace, fixedValue, valueOfFixedValue) {
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
                                return CharacterDataFormatSetting;
                            }());
                            model.CharacterDataFormatSetting = CharacterDataFormatSetting;
                            var ItemModel = /** @class */ (function () {
                                function ItemModel(code, name) {
                                    this.code = code;
                                    this.name = name;
                                }
                                return ItemModel;
                            }());
                            model.ItemModel = ItemModel;
                            var StandardOutputItem = /** @class */ (function () {
                                function StandardOutputItem(outputItemCode, outputItemName, conditionSettingCode, formulaResult, itemType) {
                                    this.outputItemCode = ko.observable(outputItemCode);
                                    this.dispOutputItemCode = outputItemCode;
                                    this.outputItemName = ko.observable(outputItemName);
                                    this.dispOutputItemName = outputItemName;
                                    this.conditionSettingCode = ko.observable(conditionSettingCode);
                                    this.formulaResult = ko.observable(formulaResult);
                                    this.itemType = ko.observable(itemType);
                                }
                                return StandardOutputItem;
                            }());
                            model.StandardOutputItem = StandardOutputItem;
                            var ExternalOutputCategoryItemData = /** @class */ (function () {
                                function ExternalOutputCategoryItemData(itemNo, itemName) {
                                    this.itemNo = ko.observable(itemNo);
                                    this.dispItemNo = itemNo;
                                    this.itemName = ko.observable(itemName);
                                    this.dispitemName = itemName;
                                }
                                return ExternalOutputCategoryItemData;
                            }());
                            model.ExternalOutputCategoryItemData = ExternalOutputCategoryItemData;
                            function getSystemTypes() {
                                return [
                                    new ItemModel(0, getText('Enum_SystemType_PERSON_SYSTEM')),
                                    new ItemModel(1, getText('Enum_SystemType_ATTENDANCE_SYSTEM')),
                                    new ItemModel(2, getText('Enum_SystemType_PAYROLL_SYSTEM')),
                                    new ItemModel(3, getText('Enum_SystemType_OFFICE_HELPER'))
                                ];
                            }
                            model.getSystemTypes = getSystemTypes;
                        })(model = share.model || (share.model = {}));
                    })(share = cmf003.share || (cmf003.share = {}));
                })(cmf003 = view.cmf003 || (view.cmf003 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=model.js.map