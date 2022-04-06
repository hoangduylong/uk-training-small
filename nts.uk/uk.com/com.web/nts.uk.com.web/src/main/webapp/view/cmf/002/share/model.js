var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf002;
                (function (cmf002) {
                    var share;
                    (function (share) {
                        var model;
                        (function (model) {
                            var getText = nts.uk.resource.getText;
                            var SCREEN_MODE;
                            (function (SCREEN_MODE) {
                                SCREEN_MODE[SCREEN_MODE["NEW"] = 0] = "NEW";
                                SCREEN_MODE[SCREEN_MODE["UPDATE"] = 1] = "UPDATE";
                            })(SCREEN_MODE = model.SCREEN_MODE || (model.SCREEN_MODE = {}));
                            var STANDARD_ATR;
                            (function (STANDARD_ATR) {
                                STANDARD_ATR[STANDARD_ATR["USER"] = 0] = "USER";
                                STANDARD_ATR[STANDARD_ATR["STANDARD"] = 1] = "STANDARD";
                            })(STANDARD_ATR = model.STANDARD_ATR || (model.STANDARD_ATR = {}));
                            var NOT_USE_ATR;
                            (function (NOT_USE_ATR) {
                                NOT_USE_ATR[NOT_USE_ATR["NOT_USE"] = 0] = "NOT_USE";
                                NOT_USE_ATR[NOT_USE_ATR["USE"] = 1] = "USE";
                            })(NOT_USE_ATR = model.NOT_USE_ATR || (model.NOT_USE_ATR = {}));
                            var ROUNDING_METHOD;
                            (function (ROUNDING_METHOD) {
                                ROUNDING_METHOD[ROUNDING_METHOD["TRUNCATION"] = 1] = "TRUNCATION";
                                ROUNDING_METHOD[ROUNDING_METHOD["ROUND_UP"] = 2] = "ROUND_UP";
                                ROUNDING_METHOD[ROUNDING_METHOD["DOWN_4_UP_5"] = 0] = "DOWN_4_UP_5";
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
                            var RESULT_STATUS;
                            (function (RESULT_STATUS) {
                                RESULT_STATUS[RESULT_STATUS["SUCCESS"] = 0] = "SUCCESS";
                                RESULT_STATUS[RESULT_STATUS["INTERRUPTION"] = 1] = "INTERRUPTION";
                                RESULT_STATUS[RESULT_STATUS["FAILURE"] = 2] = "FAILURE";
                            })(RESULT_STATUS = model.RESULT_STATUS || (model.RESULT_STATUS = {}));
                            var DATA_FORMAT_SETTING_SCREEN_MODE;
                            (function (DATA_FORMAT_SETTING_SCREEN_MODE) {
                                DATA_FORMAT_SETTING_SCREEN_MODE[DATA_FORMAT_SETTING_SCREEN_MODE["INDIVIDUAL"] = 0] = "INDIVIDUAL";
                                DATA_FORMAT_SETTING_SCREEN_MODE[DATA_FORMAT_SETTING_SCREEN_MODE["INIT"] = 1] = "INIT";
                            })(DATA_FORMAT_SETTING_SCREEN_MODE = model.DATA_FORMAT_SETTING_SCREEN_MODE || (model.DATA_FORMAT_SETTING_SCREEN_MODE = {}));
                            var ITEM_TYPE;
                            (function (ITEM_TYPE) {
                                ITEM_TYPE[ITEM_TYPE["NUMERIC"] = 0] = "NUMERIC";
                                ITEM_TYPE[ITEM_TYPE["CHARACTER"] = 1] = "CHARACTER";
                                ITEM_TYPE[ITEM_TYPE["DATE"] = 2] = "DATE";
                                ITEM_TYPE[ITEM_TYPE["TIME"] = 3] = "TIME";
                                ITEM_TYPE[ITEM_TYPE["INS_TIME"] = 4] = "INS_TIME";
                                ITEM_TYPE[ITEM_TYPE["AT_WORK_CLS"] = 7] = "AT_WORK_CLS"; // 在職区分
                            })(ITEM_TYPE = model.ITEM_TYPE || (model.ITEM_TYPE = {}));
                            var SYMBOL;
                            (function (SYMBOL) {
                                SYMBOL[SYMBOL["AND"] = 0] = "AND";
                                SYMBOL[SYMBOL["PLUS"] = 1] = "PLUS";
                                SYMBOL[SYMBOL["MINUS"] = 2] = "MINUS"; // -
                            })(SYMBOL = model.SYMBOL || (model.SYMBOL = {}));
                            var SYMBOL_OPRERATION;
                            (function (SYMBOL_OPRERATION) {
                                SYMBOL_OPRERATION[SYMBOL_OPRERATION["PLUS"] = 0] = "PLUS";
                                SYMBOL_OPRERATION[SYMBOL_OPRERATION["MINUS"] = 1] = "MINUS"; // -
                            })(SYMBOL_OPRERATION = model.SYMBOL_OPRERATION || (model.SYMBOL_OPRERATION = {}));
                            // export enum SYMBOL_OPRERATION {
                            //     PLUS = 0, // +
                            //     MINUS = 1 // -
                            // }
                            var CATEGORY_SETTING;
                            (function (CATEGORY_SETTING) {
                                /**
                                 * 出力しない
                                 */
                                CATEGORY_SETTING[CATEGORY_SETTING["CATEGORY_SETTING"] = 0] = "CATEGORY_SETTING";
                                /**
                                 * データ系タイプ
                                 */
                                CATEGORY_SETTING[CATEGORY_SETTING["DATA_TYPE"] = 6] = "DATA_TYPE";
                                /**
                                 * マスタ系タイプ(基準日のみ設定)
                                 */
                                CATEGORY_SETTING[CATEGORY_SETTING["MASTER_TYPE"] = 7] = "MASTER_TYPE";
                            })(CATEGORY_SETTING = model.CATEGORY_SETTING || (model.CATEGORY_SETTING = {}));
                            var CONDITION_SYMBOL;
                            (function (CONDITION_SYMBOL) {
                                CONDITION_SYMBOL[CONDITION_SYMBOL["CONTAIN"] = 0] = "CONTAIN";
                                CONDITION_SYMBOL[CONDITION_SYMBOL["BETWEEN"] = 1] = "BETWEEN";
                                CONDITION_SYMBOL[CONDITION_SYMBOL["IS"] = 2] = "IS";
                                CONDITION_SYMBOL[CONDITION_SYMBOL["IS_NOT"] = 3] = "IS_NOT";
                                CONDITION_SYMBOL[CONDITION_SYMBOL["GREATER"] = 4] = "GREATER";
                                CONDITION_SYMBOL[CONDITION_SYMBOL["LESS"] = 5] = "LESS";
                                CONDITION_SYMBOL[CONDITION_SYMBOL["GREATER_OR_EQUAL"] = 6] = "GREATER_OR_EQUAL";
                                CONDITION_SYMBOL[CONDITION_SYMBOL["LESS_OR_EQUAL"] = 7] = "LESS_OR_EQUAL";
                                CONDITION_SYMBOL[CONDITION_SYMBOL["IN"] = 8] = "IN";
                                CONDITION_SYMBOL[CONDITION_SYMBOL["NOT_IN"] = 9] = "NOT_IN"; //同じでない(複数)
                            })(CONDITION_SYMBOL = model.CONDITION_SYMBOL || (model.CONDITION_SYMBOL = {}));
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
                            var NumberDataFormatSetting = /** @class */ (function () {
                                function NumberDataFormatSetting(params) {
                                    this.formatSelection = ko.observable(null);
                                    this.decimalDigit = ko.observable(null);
                                    this.decimalPointClassification = ko.observable(null);
                                    this.decimalFraction = ko.observable(null);
                                    this.outputMinusAsZero = ko.observable(null);
                                    this.fixedValueOperation = ko.observable(null);
                                    this.fixedValueOperationSymbol = ko.observable(null);
                                    this.fixedCalculationValue = ko.observable(null);
                                    this.fixedLengthOutput = ko.observable(null);
                                    this.fixedLengthIntegerDigit = ko.observable(null);
                                    this.fixedLengthEditingMethod = ko.observable(null);
                                    this.nullValueReplace = ko.observable(null);
                                    this.valueOfNullValueReplace = ko.observable(null);
                                    this.fixedValue = ko.observable(null);
                                    this.valueOfFixedValue = ko.observable(null);
                                    this.formatSelection(params ? params.formatSelection : null);
                                    this.decimalDigit(params ? params.decimalDigit : null);
                                    this.decimalPointClassification(params ? params.decimalPointClassification : null);
                                    this.decimalFraction(params ? params.decimalFraction : null);
                                    this.outputMinusAsZero(params ? params.outputMinusAsZero : null);
                                    this.fixedValueOperation(params ? params.fixedValueOperation : null);
                                    this.fixedValueOperationSymbol(params ? params.fixedValueOperationSymbol : null);
                                    this.fixedCalculationValue(params ? params.fixedCalculationValue : null);
                                    this.fixedLengthOutput(params ? params.fixedLengthOutput : null);
                                    this.fixedLengthIntegerDigit(params ? params.fixedLengthIntegerDigit : null);
                                    this.fixedLengthEditingMethod(params ? params.fixedLengthEditingMethod : null);
                                    this.nullValueReplace(params ? params.nullValueReplace : null);
                                    this.valueOfNullValueReplace(params ? params.valueOfNullValueReplace : null);
                                    this.fixedValue(params ? params.fixedValue : null);
                                    this.valueOfFixedValue(params ? params.valueOfFixedValue : null);
                                }
                                return NumberDataFormatSetting;
                            }());
                            model.NumberDataFormatSetting = NumberDataFormatSetting;
                            var CharacterDataFormatSetting = /** @class */ (function () {
                                function CharacterDataFormatSetting(params) {
                                    this.effectDigitLength = ko.observable(null);
                                    this.startDigit = ko.observable(null);
                                    this.endDigit = ko.observable(null);
                                    this.cdEditting = ko.observable(null);
                                    this.cdEditDigit = ko.observable(null);
                                    this.cdEdittingMethod = ko.observable(null);
                                    this.spaceEditting = ko.observable(null);
                                    this.cdConvertCd = ko.observable(null);
                                    this.cdConvertName = ko.observable(null);
                                    this.nullValueReplace = ko.observable(null);
                                    this.valueOfNullValueReplace = ko.observable(null);
                                    this.fixedValue = ko.observable(null);
                                    this.valueOfFixedValue = ko.observable(null);
                                    this.effectDigitLength(params.effectDigitLength);
                                    this.startDigit(params.startDigit);
                                    this.endDigit(params.endDigit);
                                    this.cdEditting(params.cdEditting);
                                    this.cdEditDigit(params.cdEditDigit);
                                    this.cdEdittingMethod(params.cdEdittingMethod);
                                    this.spaceEditting(params.spaceEditting);
                                    this.cdConvertCd(params.cdConvertCd);
                                    this.cdConvertName(params.cdConvertName);
                                    this.nullValueReplace(params.nullValueReplace);
                                    this.valueOfNullValueReplace(params.valueOfNullValueReplace);
                                    this.fixedValue(params.fixedValue);
                                    this.valueOfFixedValue(params.valueOfFixedValue);
                                }
                                return CharacterDataFormatSetting;
                            }());
                            model.CharacterDataFormatSetting = CharacterDataFormatSetting;
                            var TimeDataFormatSetting = /** @class */ (function () {
                                function TimeDataFormatSetting(params) {
                                    this.nullValueSubs = ko.observable(null);
                                    this.outputMinusAsZero = ko.observable(null);
                                    this.fixedValue = ko.observable(null);
                                    this.valueOfFixedValue = ko.observable(null);
                                    this.fixedLengthOutput = ko.observable(null);
                                    this.fixedLongIntegerDigit = ko.observable(null);
                                    this.fixedLengthEditingMethod = ko.observable(null);
                                    this.delimiterSetting = ko.observable(null);
                                    this.selectHourMinute = ko.observable(null);
                                    this.minuteFractionDigit = ko.observable(null);
                                    this.decimalSelection = ko.observable(null);
                                    this.fixedValueOperationSymbol = ko.observable(null);
                                    this.fixedValueOperation = ko.observable(null);
                                    this.fixedCalculationValue = ko.observable(null);
                                    this.valueOfNullValueSubs = ko.observable(null);
                                    this.minuteFractionDigitProcessCls = ko.observable(null);
                                    this.nullValueSubs(params ? params.nullValueSubs : null);
                                    this.outputMinusAsZero(params ? params.outputMinusAsZero : null);
                                    this.fixedValue(params ? params.fixedValue : null);
                                    this.valueOfFixedValue(params ? params.valueOfFixedValue : null);
                                    this.fixedLengthOutput(params ? params.fixedLengthOutput : null);
                                    this.fixedLongIntegerDigit(params ? params.fixedLongIntegerDigit : null);
                                    this.fixedLengthEditingMethod(params ? params.fixedLengthEditingMethod : null);
                                    this.delimiterSetting(params ? params.delimiterSetting : null);
                                    this.selectHourMinute(params ? params.selectHourMinute : null);
                                    this.minuteFractionDigit(params ? params.minuteFractionDigit : null);
                                    this.decimalSelection(params ? params.decimalSelection : null);
                                    this.fixedValueOperationSymbol(params ? params.fixedValueOperationSymbol : null);
                                    this.fixedValueOperation(params ? params.fixedValueOperation : null);
                                    this.fixedCalculationValue(params ? params.fixedCalculationValue : null);
                                    this.valueOfNullValueSubs(params ? params.valueOfNullValueSubs : null);
                                    this.minuteFractionDigitProcessCls(params ? params.minuteFractionDigitProcessCls : null);
                                }
                                return TimeDataFormatSetting;
                            }());
                            model.TimeDataFormatSetting = TimeDataFormatSetting;
                            var InTimeDataFormatSetting = /** @class */ (function () {
                                function InTimeDataFormatSetting(params) {
                                    this.nullValueSubs = ko.observable(null);
                                    this.outputMinusAsZero = ko.observable(null);
                                    this.fixedValue = ko.observable(null);
                                    this.valueOfFixedValue = ko.observable(null);
                                    this.timeSeletion = ko.observable(null);
                                    this.fixedLengthOutput = ko.observable(null);
                                    this.fixedLongIntegerDigit = ko.observable(null);
                                    this.fixedLengthEditingMethod = ko.observable(null);
                                    this.delimiterSetting = ko.observable(2);
                                    this.previousDayOutputMethod = ko.observable(null);
                                    this.nextDayOutputMethod = ko.observable(null);
                                    this.minuteFractionDigit = ko.observable(null);
                                    this.decimalSelection = ko.observable(null);
                                    this.minuteFractionDigitProcessCls = ko.observable(null);
                                    this.valueOfNullValueSubs = ko.observable(null);
                                    this.nullValueSubs(params ? params.nullValueSubs : null);
                                    this.outputMinusAsZero(params ? params.outputMinusAsZero : null);
                                    this.fixedValue(params ? params.fixedValue : null);
                                    this.valueOfFixedValue(params ? params.valueOfFixedValue : null);
                                    this.timeSeletion(params ? params.timeSeletion : null);
                                    this.fixedLengthOutput(params ? params.fixedLengthOutput : null);
                                    this.fixedLongIntegerDigit(params ? params.fixedLongIntegerDigit : null);
                                    this.fixedLengthEditingMethod(params ? params.fixedLengthEditingMethod : null);
                                    this.delimiterSetting(params ? params.delimiterSetting : null);
                                    this.previousDayOutputMethod(params ? params.previousDayOutputMethod : null);
                                    this.nextDayOutputMethod(params ? params.nextDayOutputMethod : null);
                                    this.minuteFractionDigit(params ? params.minuteFractionDigit : null);
                                    this.decimalSelection(params ? params.decimalSelection : null);
                                    this.minuteFractionDigitProcessCls(params ? params.minuteFractionDigitProcessCls : null);
                                    this.valueOfNullValueSubs(params ? params.valueOfNullValueSubs : null);
                                }
                                return InTimeDataFormatSetting;
                            }());
                            model.InTimeDataFormatSetting = InTimeDataFormatSetting;
                            var ItemModel = /** @class */ (function () {
                                function ItemModel(code, name) {
                                    this.code = code;
                                    this.name = name;
                                }
                                return ItemModel;
                            }());
                            model.ItemModel = ItemModel;
                            var StandardOutputItem = /** @class */ (function () {
                                function StandardOutputItem(outItemCd, outItemName, condSetCd, itemType, categoryItems) {
                                    this.atWorkDataOutputItem = ko.observable(null);
                                    this.characterDataFormatSetting = ko.observable(null);
                                    this.dateDataFormatSetting = ko.observable(null);
                                    this.inTimeDataFormatSetting = ko.observable(null);
                                    this.numberDataFormatSetting = ko.observable(null);
                                    this.timeDataFormatSetting = ko.observable(null);
                                    this.outItemCd = ko.observable(outItemCd);
                                    this.dispOutputItemCode = outItemCd;
                                    this.outItemName = ko.observable(outItemName);
                                    this.dispOutputItemName = outItemName;
                                    this.condSetCd = ko.observable(condSetCd);
                                    this.itemType = ko.observable(itemType);
                                    this.categoryItems = ko.observableArray(categoryItems);
                                }
                                return StandardOutputItem;
                            }());
                            model.StandardOutputItem = StandardOutputItem;
                            var CategoryItem = /** @class */ (function () {
                                function CategoryItem(categoryId, categoryItemNo, categoryItemName, operationSymbol, displayOrder) {
                                    this.categoryId = ko.observable(categoryId);
                                    this.categoryItemNo = ko.observable(categoryItemNo);
                                    this.dispCategoryItemNo = categoryItemNo;
                                    this.categoryItemName = ko.observable(categoryItemName);
                                    this.dispCategoryItemName = categoryItemName;
                                    this.operationSymbol = ko.observable(operationSymbol);
                                    this.displayOrder = displayOrder.toString();
                                    this.dispOperationSymbol = this.getOperationSymbolText(operationSymbol);
                                    var self = this;
                                    self.operationSymbol.subscribe(function (value) {
                                        self.dispOperationSymbol = self.getOperationSymbolText(value);
                                    });
                                }
                                CategoryItem.prototype.getOperationSymbolText = function (operationSymbol) {
                                    switch (operationSymbol) {
                                        case model.SYMBOL.AND:
                                            return getText('CMF002_91');
                                        case model.SYMBOL.PLUS:
                                            return getText('CMF002_92');
                                        case model.SYMBOL.MINUS:
                                            return getText('CMF002_93');
                                        default:
                                            return "";
                                    }
                                };
                                return CategoryItem;
                            }());
                            model.CategoryItem = CategoryItem;
                            var AtWorkDataOutputItem = /** @class */ (function () {
                                function AtWorkDataOutputItem(params) {
                                    this.closedOutput = ko.observable(null);
                                    this.absenceOutput = ko.observable(null);
                                    this.fixedValue = ko.observable(null);
                                    this.valueOfFixedValue = ko.observable(null);
                                    this.atWorkOutput = ko.observable(null);
                                    this.retirementOutput = ko.observable(null);
                                    this.closedOutput(params.closedOutput);
                                    this.absenceOutput(params.absenceOutput);
                                    this.fixedValue(params.fixedValue);
                                    this.valueOfFixedValue(params.valueOfFixedValue);
                                    this.atWorkOutput(params.atWorkOutput);
                                    this.retirementOutput(params.retirementOutput);
                                }
                                return AtWorkDataOutputItem;
                            }());
                            model.AtWorkDataOutputItem = AtWorkDataOutputItem;
                            var ExternalOutputCategoryItemData = /** @class */ (function () {
                                function ExternalOutputCategoryItemData(itemNo, itemName, keywordAtr) {
                                    this.itemNo = ko.observable(itemNo);
                                    this.dispItemNo = itemNo.toString();
                                    this.itemName = ko.observable(itemName);
                                    this.dispitemName = itemName;
                                    this.keywordAtr = keywordAtr;
                                    this.isCheck = ko.observable(false);
                                }
                                return ExternalOutputCategoryItemData;
                            }());
                            model.ExternalOutputCategoryItemData = ExternalOutputCategoryItemData;
                            function getFixedLengthEditingMethod() {
                                return [
                                    new model.ItemModel(model.FIXED_LENGTH_EDITING_METHOD.ZERO_BEFORE, getText('Enum_FixedLengthEditingMethod_ZERO_BEFORE')),
                                    new model.ItemModel(model.FIXED_LENGTH_EDITING_METHOD.ZERO_AFTER, getText('Enum_FixedLengthEditingMethod_ZERO_AFTER')),
                                    new model.ItemModel(model.FIXED_LENGTH_EDITING_METHOD.SPACE_BEFORE, getText('Enum_FixedLengthEditingMethod_SPACE_BEFORE')),
                                    new model.ItemModel(model.FIXED_LENGTH_EDITING_METHOD.SPACE_AFTER, getText('Enum_FixedLengthEditingMethod_SPACE_AFTER'))
                                ];
                            }
                            model.getFixedLengthEditingMethod = getFixedLengthEditingMethod;
                            function getOperationSymbol() {
                                return [
                                    new model.ItemModel(model.SYMBOL_OPRERATION.PLUS, getText('CMF002_389')),
                                    new model.ItemModel(model.SYMBOL_OPRERATION.MINUS, getText('CMF002_390'))
                                ];
                            }
                            model.getOperationSymbol = getOperationSymbol;
                            function getNotUseAtr() {
                                return [
                                    new model.ItemModel(model.NOT_USE_ATR.USE, getText('CMF002_149')),
                                    new model.ItemModel(model.NOT_USE_ATR.NOT_USE, getText('CMF002_150'))
                                ];
                            }
                            model.getNotUseAtr = getNotUseAtr;
                            function getRounding() {
                                return [
                                    new model.ItemModel(1, getText('CMF002_384')),
                                    new model.ItemModel(2, getText('CMF002_385')),
                                    new model.ItemModel(0, getText('CMF002_386'))
                                ];
                            }
                            model.getRounding = getRounding;
                            function getTimeSelected() {
                                return [
                                    new model.ItemModel(0, getText('CMF002_194')),
                                    new model.ItemModel(1, getText('CMF002_195'))
                                ];
                            }
                            model.getTimeSelected = getTimeSelected;
                            function getDecimalSelect() {
                                return [
                                    new model.ItemModel(0, getText('CMF002_201')),
                                    new model.ItemModel(1, getText('CMF002_202'))
                                ];
                            }
                            model.getDecimalSelect = getDecimalSelect;
                            function getSeparator() {
                                return [
                                    new model.ItemModel(0, getText('CMF002_398')),
                                    new model.ItemModel(1, getText('CMF002_399')),
                                    new model.ItemModel(2, getText('CMF002_400'))
                                ];
                            }
                            model.getSeparator = getSeparator;
                            function getItemTypes() {
                                return [
                                    new ItemModel(ITEM_TYPE.NUMERIC, getText('CMF002_366')),
                                    new ItemModel(ITEM_TYPE.CHARACTER, getText('CMF002_367')),
                                    new ItemModel(ITEM_TYPE.DATE, getText('CMF002_368')),
                                    new ItemModel(ITEM_TYPE.TIME, getText('CMF002_369')),
                                    new ItemModel(ITEM_TYPE.INS_TIME, getText('CMF002_370')),
                                    new ItemModel(ITEM_TYPE.AT_WORK_CLS, getText('CMF002_371'))
                                ];
                            }
                            model.getItemTypes = getItemTypes;
                            function getConditonSymbol(searchValueCd, itemType) {
                                var list = [];
                                if (searchValueCd == null || searchValueCd.length == 0) {
                                    if (itemType == ITEM_TYPE.CHARACTER) {
                                        list.push(new ItemModel(CONDITION_SYMBOL.CONTAIN, getText('CMF002_372')));
                                    }
                                    list.push(new ItemModel(CONDITION_SYMBOL.BETWEEN, getText('CMF002_373')));
                                    list.push(new ItemModel(CONDITION_SYMBOL.IS, getText('CMF002_374')));
                                    list.push(new ItemModel(CONDITION_SYMBOL.IS_NOT, getText('CMF002_375')));
                                    list.push(new ItemModel(CONDITION_SYMBOL.GREATER, getText('CMF002_376')));
                                    list.push(new ItemModel(CONDITION_SYMBOL.LESS, getText('CMF002_377')));
                                    list.push(new ItemModel(CONDITION_SYMBOL.GREATER_OR_EQUAL, getText('CMF002_378')));
                                    list.push(new ItemModel(CONDITION_SYMBOL.LESS_OR_EQUAL, getText('CMF002_379')));
                                }
                                else {
                                    list.push(new ItemModel(CONDITION_SYMBOL.IN, getText('CMF002_380')));
                                    list.push(new ItemModel(CONDITION_SYMBOL.NOT_IN, getText('CMF002_381')));
                                }
                                return list;
                            }
                            model.getConditonSymbol = getConditonSymbol;
                            var OutputCodeConvert = /** @class */ (function () {
                                function OutputCodeConvert(code, name, acceptWithoutSetting) {
                                    this.convertCode = ko.observable(code);
                                    this.convertName = ko.observable(name);
                                    this.acceptWithoutSetting = ko.observable(acceptWithoutSetting);
                                    this.dispConvertCode = code;
                                    this.dispConvertName = name;
                                }
                                return OutputCodeConvert;
                            }());
                            model.OutputCodeConvert = OutputCodeConvert;
                            function getNextDay() {
                                return [
                                    new model.ItemModel(0, getText('CMF002_401')),
                                    new model.ItemModel(1, getText('CMF002_402'))
                                ];
                            }
                            model.getNextDay = getNextDay;
                            function getPreDay() {
                                return [
                                    new model.ItemModel(0, getText('CMF002_403')),
                                    new model.ItemModel(1, getText('CMF002_404')),
                                    new model.ItemModel(2, getText('CMF002_405'))
                                ];
                            }
                            model.getPreDay = getPreDay;
                            var EXIOOPERATIONSTATE;
                            (function (EXIOOPERATIONSTATE) {
                                EXIOOPERATIONSTATE[EXIOOPERATIONSTATE["PERPAKING"] = 0] = "PERPAKING";
                                EXIOOPERATIONSTATE[EXIOOPERATIONSTATE["EXPORTING"] = 1] = "EXPORTING";
                                EXIOOPERATIONSTATE[EXIOOPERATIONSTATE["IMPORTING"] = 2] = "IMPORTING";
                                EXIOOPERATIONSTATE[EXIOOPERATIONSTATE["TEST_FINISH"] = 3] = "TEST_FINISH";
                                EXIOOPERATIONSTATE[EXIOOPERATIONSTATE["INTER_FINISH"] = 4] = "INTER_FINISH";
                                EXIOOPERATIONSTATE[EXIOOPERATIONSTATE["FAULT_FINISH"] = 5] = "FAULT_FINISH";
                                EXIOOPERATIONSTATE[EXIOOPERATIONSTATE["CHECKING"] = 6] = "CHECKING";
                                EXIOOPERATIONSTATE[EXIOOPERATIONSTATE["EXPORT_FINISH"] = 7] = "EXPORT_FINISH";
                                EXIOOPERATIONSTATE[EXIOOPERATIONSTATE["IMPORT_FINISH"] = 8] = "IMPORT_FINISH";
                            })(EXIOOPERATIONSTATE = model.EXIOOPERATIONSTATE || (model.EXIOOPERATIONSTATE = {}));
                            function getStatusEnumS() {
                                return [
                                    new model.ItemModel(EXIOOPERATIONSTATE.PERPAKING, getText('CMF002_515')),
                                    new model.ItemModel(EXIOOPERATIONSTATE.EXPORTING, getText('CMF002_516')),
                                    new model.ItemModel(EXIOOPERATIONSTATE.IMPORTING, getText('CMF002_517')),
                                    new model.ItemModel(EXIOOPERATIONSTATE.TEST_FINISH, getText('CMF002_518')),
                                    new model.ItemModel(EXIOOPERATIONSTATE.INTER_FINISH, getText('CMF002_519')),
                                    new model.ItemModel(EXIOOPERATIONSTATE.FAULT_FINISH, getText('CMF002_520')),
                                    new model.ItemModel(EXIOOPERATIONSTATE.CHECKING, getText('CMF002_521')),
                                    new model.ItemModel(EXIOOPERATIONSTATE.EXPORT_FINISH, getText('CMF002_522')),
                                    new model.ItemModel(EXIOOPERATIONSTATE.IMPORT_FINISH, getText('CMF002_523')),
                                ];
                            }
                            model.getStatusEnumS = getStatusEnumS;
                            var DateDataFormatSetting = /** @class */ (function () {
                                function DateDataFormatSetting(params) {
                                    this.formatSelection = ko.observable(null);
                                    this.nullValueSubstitution = ko.observable(null);
                                    this.fixedValue = ko.observable(null);
                                    this.valueOfNullValueSubs = ko.observable(null);
                                    this.valueOfFixedValue = ko.observable(null);
                                    this.formatSelection(params ? params.formatSelection : null);
                                    this.nullValueSubstitution(params ? params.nullValueSubstitution : null);
                                    this.valueOfNullValueSubs(params ? params.valueOfNullValueSubs : null);
                                    this.fixedValue(params ? params.fixedValue : null);
                                    this.valueOfFixedValue(params ? params.valueOfFixedValue : null);
                                }
                                return DateDataFormatSetting;
                            }());
                            model.DateDataFormatSetting = DateDataFormatSetting;
                        })(model = share.model || (share.model = {}));
                    })(share = cmf002.share || (cmf002.share = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=model.js.map