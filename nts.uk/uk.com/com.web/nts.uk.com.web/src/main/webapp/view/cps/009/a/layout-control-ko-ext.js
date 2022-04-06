// render primative value to viewContext
var CPS009Constraint;
(function (CPS009Constraint) {
    var parseTime = nts.uk.time.parseTime;
    var writeConstraint = window['nts']['uk']['ui']['validation']['writeConstraint'], parseTimeWidthDay = window['nts']['uk']['time']['minutesBased']['clock']['dayattr']['create'];
    function primitiveConst(data) {
        var dts = data, constraint = {
            itemName: data.itemName,
            itemCode: data.itemCode,
            required: false
        }, constraints, itemSpecial = [];
        if (["CS00035", "CS00036"].indexOf(data.ctgCode) > -1) {
            itemSpecial = ["IS00366", "IS00368", "IS00369", "IS00377",
                "IS00378", "IS00379", "IS00382", "IS00383", "IS00384"];
        }
        if (dts) {
            switch (dts.dataType) {
                default:
                case ITEM_SINGLE_TYPE.STRING:
                    constraint.valueType = "String";
                    constraint.maxLength = dts.stringItemLength || undefined;
                    constraint.stringExpression = /(?:)/;
                    switch (dts.stringItemType) {
                        default:
                        case ITEM_STRING_TYPE.ANY:
                            constraint.charType = 'Any';
                            break;
                        case ITEM_STRING_TYPE.ANYHALFWIDTH:
                            constraint.charType = 'AnyHalfWidth';
                            break;
                        case ITEM_STRING_TYPE.ALPHANUMERIC:
                            constraint.charType = 'AlphaNumeric';
                            break;
                        case ITEM_STRING_TYPE.NUMERIC:
                            constraint.charType = 'Numeric';
                            break;
                        case ITEM_STRING_TYPE.KANA:
                            constraint.charType = 'Kana';
                            break;
                    }
                    break;
                case ITEM_SINGLE_TYPE.NUMERIC:
                case ITEM_SINGLE_TYPE.NUMBERIC_BUTTON:
                    if (dts.numberDecimalPart == 0) {
                        constraint.valueType = "Integer";
                    }
                    else {
                        constraint.valueType = "Decimal";
                        constraint.mantissaMaxLength = dts.numberDecimalPart;
                    }
                    var max = (Math.pow(10, dts.numberIntegerPart) - Math.pow(10, -(dts.numberDecimalPart || 0)));
                    constraint.charType = 'Numeric';
                    constraint.max = dts.numericItemMax || max;
                    constraint.min = dts.numericItemMin || (!!dts.numberItemMinus ? -max : 0);
                    if (["CS00035", "CS00036"].indexOf(data.ctgCode) > -1 && itemSpecial.indexOf(dts.itemCode) > -1) {
                        constraint.valueType = "HalfInt";
                    }
                    break;
                case ITEM_SINGLE_TYPE.DATE:
                    constraint.valueType = "Date";
                    break;
                case ITEM_SINGLE_TYPE.TIME:
                    constraint.valueType = "Time";
                    constraint.min = parseTime(dts.timeItemMin, true).format();
                    constraint.max = parseTime(dts.timeItemMax, true).format();
                    break;
                case ITEM_SINGLE_TYPE.TIMEPOINT:
                    constraint.valueType = "Clock";
                    constraint.max = parseTimeWidthDay(dts.timepointItemMax).shortText;
                    constraint.min = parseTimeWidthDay(dts.timepointItemMin).shortText;
                    break;
                case ITEM_SINGLE_TYPE.SELECTION:
                    constraint.valueType = "Selection";
                    break;
            }
            writeConstraint(dts.itemCode, constraint);
            return constraint;
        }
    }
    CPS009Constraint.primitiveConst = primitiveConst;
    // define ITEM_CLASSIFICATION_TYPE
    var IT_CLA_TYPE;
    (function (IT_CLA_TYPE) {
        IT_CLA_TYPE[IT_CLA_TYPE["ITEM"] = 0] = "ITEM";
        IT_CLA_TYPE[IT_CLA_TYPE["LIST"] = 1] = "LIST";
        IT_CLA_TYPE[IT_CLA_TYPE["SPER"] = 2] = "SPER"; // line item
    })(IT_CLA_TYPE || (IT_CLA_TYPE = {}));
    // define ITEM_CATEGORY_TYPE
    var IT_CAT_TYPE;
    (function (IT_CAT_TYPE) {
        IT_CAT_TYPE[IT_CAT_TYPE["SINGLE"] = 1] = "SINGLE";
        IT_CAT_TYPE[IT_CAT_TYPE["MULTI"] = 2] = "MULTI";
        IT_CAT_TYPE[IT_CAT_TYPE["CONTINU"] = 3] = "CONTINU";
        IT_CAT_TYPE[IT_CAT_TYPE["NODUPLICATE"] = 4] = "NODUPLICATE";
        IT_CAT_TYPE[IT_CAT_TYPE["DUPLICATE"] = 5] = "DUPLICATE"; // Duplicate history
    })(IT_CAT_TYPE || (IT_CAT_TYPE = {}));
    // defined CATEGORY or GROUP mode
    var CAT_OR_GROUP;
    (function (CAT_OR_GROUP) {
        CAT_OR_GROUP[CAT_OR_GROUP["CATEGORY"] = 0] = "CATEGORY";
        CAT_OR_GROUP[CAT_OR_GROUP["GROUP"] = 1] = "GROUP"; // group mode
    })(CAT_OR_GROUP || (CAT_OR_GROUP = {}));
    // define ITEM_TYPE is set or single item
    var ITEM_TYPE;
    (function (ITEM_TYPE) {
        ITEM_TYPE[ITEM_TYPE["SET"] = 1] = "SET";
        ITEM_TYPE[ITEM_TYPE["SINGLE"] = 2] = "SINGLE"; // Single item info
    })(ITEM_TYPE || (ITEM_TYPE = {}));
    // define ITEM_SINGLE_TYPE
    // type of item if it's single item
    var ITEM_SINGLE_TYPE;
    (function (ITEM_SINGLE_TYPE) {
        ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["STRING"] = 1] = "STRING";
        ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["NUMERIC"] = 2] = "NUMERIC";
        ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["DATE"] = 3] = "DATE";
        ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["TIME"] = 4] = "TIME";
        ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["TIMEPOINT"] = 5] = "TIMEPOINT";
        ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["SELECTION"] = 6] = "SELECTION";
        ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["SEL_RADIO"] = 7] = "SEL_RADIO";
        ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["SEL_BUTTON"] = 8] = "SEL_BUTTON";
        ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["READONLY"] = 9] = "READONLY";
        ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["RELATE_CATEGORY"] = 10] = "RELATE_CATEGORY";
        ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["NUMBERIC_BUTTON"] = 11] = "NUMBERIC_BUTTON";
        ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["READONLY_BUTTON"] = 12] = "READONLY_BUTTON";
    })(ITEM_SINGLE_TYPE || (ITEM_SINGLE_TYPE = {}));
    // define ITEM_STRING_DATA_TYPE
    var ITEM_STRING_DTYPE;
    (function (ITEM_STRING_DTYPE) {
        ITEM_STRING_DTYPE[ITEM_STRING_DTYPE["FIXED_LENGTH"] = 1] = "FIXED_LENGTH";
        ITEM_STRING_DTYPE[ITEM_STRING_DTYPE["VARIABLE_LENGTH"] = 2] = "VARIABLE_LENGTH"; // variable length
    })(ITEM_STRING_DTYPE || (ITEM_STRING_DTYPE = {}));
    var ITEM_STRING_TYPE;
    (function (ITEM_STRING_TYPE) {
        ITEM_STRING_TYPE[ITEM_STRING_TYPE["ANY"] = 1] = "ANY";
        // 2:全ての半角文字(AnyHalfWidth)
        ITEM_STRING_TYPE[ITEM_STRING_TYPE["ANYHALFWIDTH"] = 2] = "ANYHALFWIDTH";
        // 3:半角英数字(AlphaNumeric)
        ITEM_STRING_TYPE[ITEM_STRING_TYPE["ALPHANUMERIC"] = 3] = "ALPHANUMERIC";
        // 4:半角数字(Numeric)
        ITEM_STRING_TYPE[ITEM_STRING_TYPE["NUMERIC"] = 4] = "NUMERIC";
        // 5:全角カタカナ(Kana)
        ITEM_STRING_TYPE[ITEM_STRING_TYPE["KANA"] = 5] = "KANA";
    })(ITEM_STRING_TYPE || (ITEM_STRING_TYPE = {}));
    // define ITEM_SELECT_TYPE
    // type of item if it's selection item
    var ITEM_SELECT_TYPE;
    (function (ITEM_SELECT_TYPE) {
        // 1:専用マスタ(DesignatedMaster)
        ITEM_SELECT_TYPE[ITEM_SELECT_TYPE["DESIGNATED_MASTER"] = 1] = "DESIGNATED_MASTER";
        // 2:コード名称(CodeName)
        ITEM_SELECT_TYPE[ITEM_SELECT_TYPE["CODE_NAME"] = 2] = "CODE_NAME";
        // 3:列挙型(Enum)
        ITEM_SELECT_TYPE[ITEM_SELECT_TYPE["ENUM"] = 3] = "ENUM";
    })(ITEM_SELECT_TYPE || (ITEM_SELECT_TYPE = {}));
})(CPS009Constraint || (CPS009Constraint = {}));
//# sourceMappingURL=layout-control-ko-ext.js.map