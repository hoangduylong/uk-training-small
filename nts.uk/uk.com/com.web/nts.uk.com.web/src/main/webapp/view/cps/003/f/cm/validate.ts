module validationcps003f {

    import nou = nts.uk.util.isNullOrUndefined;
    import text = nts.uk.resource.getText;

    let __viewContext: any = window['__viewContext'] || {},
        rmError = nts.uk.ui.errors["removeByCode"],
        getError = nts.uk.ui.errors["getErrorByElement"],
        getErrorList = nts.uk.ui.errors["getErrorList"],
        removeErrorByElement = window['nts']['uk']['ui']['errors']["removeByElement"],
        clearError = window['nts']['uk']['ui']['errors']['clearAll'],
        parseTimeWidthDay = window['nts']['uk']['time']['minutesBased']['clock']['dayattr']['create'];
    

    export function initCheckError(currentItem: any) {
            // validate button, radio button
            let element_filter = document.getElementById("button-filter"),
                element_value = document.getElementById("buttonWt-value")
                $element_filter = $(element_filter),
                $element_value = $(element_value);

            switch (currentItem.itemData().dataType) {
                case ITEM_SINGLE_TYPE.STRING:
                    rmError($element_filter, "MsgB_1") || rmError($element_filter, "Msg_824");
                    currentItem.filter.subscribe(d => {
                        !nou(d) && (rmError($element_filter, "Msg_824") || rmError($element_filter, "MsgB_1"));
                    });
                    
                    rmError($element_value, "MsgB_1") || rmError($element_value, "Msg_824");
                    currentItem.value.subscribe(d => {
                        !nou(d) && (rmError($element_value, "Msg_824") || rmError($element_value, "MsgB_1"));
                    });
                    break;
                
                case ITEM_SINGLE_TYPE.SEL_BUTTON:
                    //rmError($element_filter, "MsgB_1") || rmError($element_filter, "MsgB_2");

                    rmError($element_value, "MsgB_1") || rmError($element_value, "MsgB_2");
                    
                    //currentItem.filter.subscribe(d => { !nou(d) && rmError($element_filter, "MsgB_2"); })

                    currentItem.value.subscribe(d => { !nou(d) && rmError($element_value, "MsgB_2"); })
                    break;
                default: break;

            }

    }

    //"IS00003", "IS00004","IS00015","IS00015"
     export function initCheckErrorSpecialItem(currentItem: any) {
            let element_filter = document.getElementById("string-filter"),
            element_value = document.getElementById("string-value"),
            $element_filter = $(element_filter),
            $element_value = $(element_value);
            $element_filter.on('blur', () => {
                 let value: string = ko.toJS(currentItem.filter),
                     index: number = value.indexOf('　'),
                     lindex: number = value.lastIndexOf('　'),
                     dom = $element_filter;

                 if (!value || (index > 0 && lindex < value.length - 1)) {
                     rmError(dom, "Msg_924");
                 } else if (!dom.is(':disabled') && !dom.ntsError('hasError')) {
                     dom.ntsError('set', {
                         messageId: "Msg_924",
                         messageParams: [currentItem.itemData().itemName]
                     });
                 }
             }); 
             
             $element_value.on('blur', () => {
                 let value: string = ko.toJS(currentItem.value().value0),
                     index: number = value.indexOf('　'),
                     lindex: number = value.lastIndexOf('　'),
                     dom = $element_value;

                 if (!value || (index > 0 && lindex < value.length - 1)) {
                     rmError(dom, "Msg_924");
                 } else if (!dom.is(':disabled') && !dom.ntsError('hasError')) {
                     dom.ntsError('set', {
                         messageId: "Msg_924",
                         messageParams: [currentItem.itemData().itemName]
                     });
                 }
             });      
     
     }
    
    export function checkError(currentItem: any) {
        let element_filter = document.getElementById("button-filter"),
            element_value = document.getElementById("buttonWt-value"),
            $element_filter = $(element_filter),
            $element_value = $(element_value);

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

    export enum ITEM_SINGLE_TYPE {
        STRING = 1,
        NUMERIC = 2,
        DATE = 3,
        TIME = 4,
        TIMEPOINT = 5,
        SELECTION = 6,
        SEL_RADIO = 7,
        SEL_BUTTON = 8,
        READONLY = 9,
        RELATE_CATEGORY = 10,
        NUMBERIC_BUTTON = 11,
        READONLY_BUTTON = 12
    }
}

