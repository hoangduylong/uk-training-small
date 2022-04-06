var validationcps009;
(function (validationcps009) {
    var nou = nts.uk.util.isNullOrUndefined;
    var __viewContext = window['__viewContext'] || {}, rmError = nts.uk.ui.errors["removeByCode"], getError = nts.uk.ui.errors["getErrorByElement"], getErrorList = nts.uk.ui.errors["getErrorList"], removeErrorByElement = window['nts']['uk']['ui']['errors']["removeByElement"], clearError = window['nts']['uk']['ui']['errors']['clearAll'], parseTimeWidthDay = window['nts']['uk']['time']['minutesBased']['clock']['dayattr']['create'];
    function initCheckError(items) {
        _.each(items, function (item) {
            // validate button, radio button
            var v = ko.toJS(item), id = v.perInfoItemDefId, element = document.getElementById(id), $element = $(element);
            switch (item.dataType()) {
                case ITEM_SINGLE_TYPE.STRING:
                    rmError($element, "MsgB_1") || rmError($element, "Msg_824");
                    item.stringValue.subscribe(function (d) {
                        !nou(d) && (rmError($element, "Msg_824") || rmError($element, "MsgB_1"));
                    });
                    break;
                case ITEM_SINGLE_TYPE.NUMERIC:
                    rmError($element, "MsgB_1") || rmError($element, "Msg_824");
                    item.numbereditor.value.subscribe(function (d) {
                        !nou(d) && (rmError($element, "Msg_824") || rmError($element, "MsgB_1"));
                    });
                    break;
                case ITEM_SINGLE_TYPE.TIME:
                    rmError($element, "MsgB_1") || rmError($element, "Msg_824");
                    item.dateWithDay.subscribe(function (d) {
                        !nou(d) && (rmError($element, "Msg_824") || rmError($element, "MsgB_1"));
                    });
                    break;
                case ITEM_SINGLE_TYPE.TIMEPOINT:
                    rmError($element, "MsgB_1") || rmError($element, "Msg_824");
                    item.dateWithDay.subscribe(function (d) {
                        !nou(d) && (rmError($element, "Msg_824") || rmError($element, "MsgB_15"));
                    });
                    break;
                case ITEM_SINGLE_TYPE.SEL_BUTTON:
                    rmError($element, "MsgB_1") || rmError($element, "Msg_824");
                    item.selectionName.subscribe(function (d) {
                        !nou(d) && rmError($element, "Msg_824");
                    });
                    break;
                case ITEM_SINGLE_TYPE.DATE:
                    rmError($element, "MsgB_1") || rmError($element, "Msg_824");
                    item.dateValue.subscribe(function (d) {
                        !nou(d) && (rmError($element.find('.nts-input'), "Msg_824") || rmError($element.find('.nts-input'), "MsgB_18"));
                    });
                    break;
                default: break;
            }
        });
    }
    validationcps009.initCheckError = initCheckError;
    function checkError(items) {
        _.each(items, function (item) {
            var v = ko.toJS(item), id = v.perInfoItemDefId, element = document.getElementById(id), $element = $(element);
            if (element.tagName.toUpperCase() == "INPUT" && !!v.enableControl) {
                switch (item.dataType()) {
                    case ITEM_SINGLE_TYPE.STRING:
                        if (_.isNil(item.stringValue()) || _.isEmpty(item.stringValue())) {
                            $element.ntsError('set', {
                                messageId: "Msg_824",
                                messageParams: [item.itemName()]
                            });
                        }
                        break;
                    case ITEM_SINGLE_TYPE.NUMERIC:
                        if (_.isNil(item.numbereditor.value()) || (typeof item.numbereditor.value() != 'number' && _.isEmpty(item.numbereditor.value()))) {
                            $element.ntsError('set', {
                                messageId: "Msg_824",
                                messageParams: [item.itemName()]
                            });
                        }
                        break;
                    case ITEM_SINGLE_TYPE.TIME:
                        if (_.isNil(item.dateWithDay())) {
                            $element.ntsError('set', {
                                messageId: "Msg_824",
                                messageParams: [item.itemName()]
                            });
                        }
                        break;
                    case ITEM_SINGLE_TYPE.TIMEPOINT:
                        if (_.isNil(item.dateWithDay())) {
                            $element.ntsError('set', {
                                messageId: "Msg_824",
                                messageParams: [item.itemName()]
                            });
                        }
                        break;
                    default: break;
                }
            }
            else if (element.tagName.toUpperCase() == "BUTTON") {
                if (_.isNil(item.selectionName()) || _.isEmpty(item.selectionName())) {
                    $element.ntsError('set', {
                        messageId: "Msg_824",
                        messageParams: [item.itemName()]
                    });
                }
            }
            else if ((item.dataType() == 6) && !!v.enableControl && (_.isNil(item.selectedCode()) || _.isEmpty(item.selectedCode()))) {
                $element.find('.nts-input').attr('nameid', item.itemName());
                $element.addClass("error");
                $element.ntsError('set', {
                    messageId: "Msg_824",
                    messageParams: [item.itemName()]
                });
            }
            else if ((item.dataType() == 3) && _.isNil(item.dateValue()) && !!v.enableControl) {
                $element.addClass("error");
                $element.find('.nts-input').attr('nameid', item.itemName());
                $element.find('.nts-input').ntsError('set', {
                    messageId: "Msg_824",
                    messageParams: [item.itemName()]
                });
            }
        });
    }
    validationcps009.checkError = checkError;
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
    })(ITEM_SINGLE_TYPE = validationcps009.ITEM_SINGLE_TYPE || (validationcps009.ITEM_SINGLE_TYPE = {}));
})(validationcps009 || (validationcps009 = {}));
//# sourceMappingURL=validate.js.map