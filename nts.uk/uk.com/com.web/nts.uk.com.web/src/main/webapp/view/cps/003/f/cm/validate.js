var validationcps003f;
(function (validationcps003f) {
    var nou = nts.uk.util.isNullOrUndefined;
    var text = nts.uk.resource.getText;
    var __viewContext = window['__viewContext'] || {}, rmError = nts.uk.ui.errors["removeByCode"], getError = nts.uk.ui.errors["getErrorByElement"], getErrorList = nts.uk.ui.errors["getErrorList"], removeErrorByElement = window['nts']['uk']['ui']['errors']["removeByElement"], clearError = window['nts']['uk']['ui']['errors']['clearAll'], parseTimeWidthDay = window['nts']['uk']['time']['minutesBased']['clock']['dayattr']['create'];
    function initCheckError(currentItem) {
        // validate button, radio button
        var element_filter = document.getElementById("button-filter"), element_value = document.getElementById("buttonWt-value");
        $element_filter = $(element_filter),
            $element_value = $(element_value);
        switch (currentItem.itemData().dataType) {
            case ITEM_SINGLE_TYPE.STRING:
                rmError($element_filter, "MsgB_1") || rmError($element_filter, "Msg_824");
                currentItem.filter.subscribe(function (d) {
                    !nou(d) && (rmError($element_filter, "Msg_824") || rmError($element_filter, "MsgB_1"));
                });
                rmError($element_value, "MsgB_1") || rmError($element_value, "Msg_824");
                currentItem.value.subscribe(function (d) {
                    !nou(d) && (rmError($element_value, "Msg_824") || rmError($element_value, "MsgB_1"));
                });
                break;
            case ITEM_SINGLE_TYPE.SEL_BUTTON:
                //rmError($element_filter, "MsgB_1") || rmError($element_filter, "MsgB_2");
                rmError($element_value, "MsgB_1") || rmError($element_value, "MsgB_2");
                //currentItem.filter.subscribe(d => { !nou(d) && rmError($element_filter, "MsgB_2"); })
                currentItem.value.subscribe(function (d) { !nou(d) && rmError($element_value, "MsgB_2"); });
                break;
            default: break;
        }
    }
    validationcps003f.initCheckError = initCheckError;
    //"IS00003", "IS00004","IS00015","IS00015"
    function initCheckErrorSpecialItem(currentItem) {
        var element_filter = document.getElementById("string-filter"), element_value = document.getElementById("string-value"), $element_filter = $(element_filter), $element_value = $(element_value);
        $element_filter.on('blur', function () {
            var value = ko.toJS(currentItem.filter), index = value.indexOf('　'), lindex = value.lastIndexOf('　'), dom = $element_filter;
            if (!value || (index > 0 && lindex < value.length - 1)) {
                rmError(dom, "Msg_924");
            }
            else if (!dom.is(':disabled') && !dom.ntsError('hasError')) {
                dom.ntsError('set', {
                    messageId: "Msg_924",
                    messageParams: [currentItem.itemData().itemName]
                });
            }
        });
        $element_value.on('blur', function () {
            var value = ko.toJS(currentItem.value().value0), index = value.indexOf('　'), lindex = value.lastIndexOf('　'), dom = $element_value;
            if (!value || (index > 0 && lindex < value.length - 1)) {
                rmError(dom, "Msg_924");
            }
            else if (!dom.is(':disabled') && !dom.ntsError('hasError')) {
                dom.ntsError('set', {
                    messageId: "Msg_924",
                    messageParams: [currentItem.itemData().itemName]
                });
            }
        });
    }
    validationcps003f.initCheckErrorSpecialItem = initCheckErrorSpecialItem;
    function checkError(currentItem) {
        var element_filter = document.getElementById("button-filter"), element_value = document.getElementById("buttonWt-value"), $element_filter = $(element_filter), $element_value = $(element_value);
        switch (currentItem.itemData().dataType) {
            case ITEM_SINGLE_TYPE.SEL_BUTTON:
                //                if (currentItem.applyFor() == "match") {
                //                    if (currentItem.itemData().required && (_.isNil(currentItem.filter()) || _.isEmpty(currentItem.filter()))) {
                //                        $element_filter.ntsError('set', {
                //                            messageId: "MsgB_2",
                //                            messageParams: [text("CPS003_87")]
                //                        });
                //                    }
                //                }
                if (currentItem.itemData().required && (_.isNil(currentItem.value().value2) || _.isEmpty(currentItem.value().value2)) && (_.isNil(currentItem.value().value0) || _.isEmpty(currentItem.value().value0)) && (_.isNil(currentItem.value().value1) || _.isEmpty(currentItem.value().value1))) {
                    $element_value.ntsError('set', {
                        messageId: "MsgB_2",
                        messageParams: [text("CPS003_87")]
                    });
                }
                break;
            default: break;
        }
    }
    validationcps003f.checkError = checkError;
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
    })(ITEM_SINGLE_TYPE = validationcps003f.ITEM_SINGLE_TYPE || (validationcps003f.ITEM_SINGLE_TYPE = {}));
})(validationcps003f || (validationcps003f = {}));
//# sourceMappingURL=validate.js.map