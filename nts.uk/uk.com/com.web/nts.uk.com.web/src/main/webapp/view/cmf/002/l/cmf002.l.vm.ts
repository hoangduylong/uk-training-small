module nts.uk.com.view.cmf002.l.viewmodel {
    import block = nts.uk.ui.block;
    import model = cmf002.share.model;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import close = nts.uk.ui.windows.close;
    import hasError = nts.uk.ui.errors.hasError;
    import error = nts.uk.ui.errors;
    import dialog = nts.uk.ui.dialog;

    export class ScreenModel {
        initTimeDataFormatSetting: any = {
            nullValueSubs: 0,
            outputMinusAsZero: 0,
            fixedValue: 0,
            valueOfFixedValue: "",
            fixedLengthOutput: 0,
            fixedLongIntegerDigit: null,
            fixedLengthEditingMethod: 0,
            delimiterSetting: 2,
            selectHourMinute: 0,
            minuteFractionDigit: null,
            decimalSelection: 0,
            fixedValueOperationSymbol: 0,
            fixedValueOperation: 0,
            fixedCalculationValue: null,
            valueOfNullValueSubs: "",
            minuteFractionDigitProcessCls: 1
        };
        timeDataFormatSetting: KnockoutObservable<model.TimeDataFormatSetting> = ko.observable(new model.TimeDataFormatSetting(this.initTimeDataFormatSetting));

        //initComponent
        inputMode: boolean;
        selectedValue: KnockoutObservable<any>;
        //L2_1
        timeSelectedList: KnockoutObservableArray<model.ItemModel> = ko.observableArray(model.getTimeSelected());
        //L4_1
        decimalSelectList: KnockoutObservableArray<model.ItemModel> = ko.observableArray(model.getDecimalSelect());
        //L3_3
        itemListRounding: KnockoutObservableArray<model.ItemModel> = ko.observableArray(model.getRounding());
        //L5_1
        outputMinusAsZeroChecked: KnockoutObservable<boolean> = ko.observable(false);
        //L6_1
        separatorSelectList: KnockoutObservableArray<model.ItemModel> = ko.observableArray(model.getSeparator());
        //L7_1
        fixedValueOperationItem: KnockoutObservableArray<model.ItemModel> = ko.observableArray(model.getNotUseAtr());
        formatSelectionItem: KnockoutObservableArray<model.ItemModel>;
        //L7_2
        fixedValueOperationSymbolItem: KnockoutObservableArray<model.ItemModel> = ko.observableArray(model.getOperationSymbol());
        //L8_1
        fixedLengthOutputItem: KnockoutObservableArray<model.ItemModel> = ko.observableArray(model.getNotUseAtr());
        //L8_3_1
        fixedLengthEditingMethodItem: KnockoutObservableArray<model.ItemModel> = ko.observableArray(model.getFixedLengthEditingMethod());
        //L9_1
        nullValueReplaceItem: KnockoutObservableArray<model.ItemModel> = ko.observableArray(model.getNotUseAtr());
        //L10_1
        fixedValueItem: KnockoutObservableArray<model.ItemModel> = ko.observableArray(model.getNotUseAtr());

        //Defaut Mode Screen
        // 0 = Individual
        // 1 = initial
        selectModeScreen: KnockoutObservable<number> = ko.observable();

        enableRequired: KnockoutObservable<boolean> = ko.observable(false);
        fixedCalculationRequired: KnockoutObservable<boolean> = ko.observable(false);
        fixedLongIntegerRequired: KnockoutObservable<boolean> = ko.observable(false);
        constructor() {
            let self = this;
            self.inputMode = true;

        }

        sendData() {

            let self = this;
            if (self.decimalSelectionCls()) {
                $("#L3_1").trigger("validate");
            }
            if (self.timeDataFormatSetting().fixedValueOperation() == 1 && self.timeDataFormatSetting().fixedValue() == 0) {
                $("#L7_3").trigger("validate");
            }

            if (self.timeDataFormatSetting().fixedLengthOutput() == 1 && self.timeDataFormatSetting().fixedValue() == 0) {
                $("#L8_2_2").trigger("validate");
            }

            if (!hasError()) {
                let data = ko.toJS(self.timeDataFormatSetting);

                if (!self.timeDataFormatSetting().selectHourMinute() == 0 || self.timeDataFormatSetting().decimalSelection() == 0) {
                    data.minuteFractionDigit = null;
                    data.minuteFractionDigitProcessCls = 1;
                }

                if (!self.timeDataFormatSetting().fixedValueOperation() == 1) {
                    data.fixedValueOperationSymbol = 0;
                    data.fixedCalculationValue = null;
                }

                if (!self.timeDataFormatSetting().fixedLengthOutput() == 1) {
                    data.fixedLongIntegerDigit = null;
                    data.fixedLengthEditingMethod = 0;
                }

                if (!self.timeDataFormatSetting().nullValueSubs() == 1) {
                    data.valueOfNullValueSubs = "";
                }

                if (self.timeDataFormatSetting().fixedValue() == 1) {
                    data.outputMinusAsZero = 0;
                    data.delimiterSetting = 1;
                    data.fixedValueOperation = 0;
                    data.fixedValueOperationSymbol = 0;
                    data.fixedCalculationValue = null;
                    data.fixedLengthOutput = 0;
                    data.fixedLongIntegerDigit = null;
                    data.fixedLengthEditingMethod = 0;
                    data.nullValueSubs = 0;
                    data.valueOfNullValueSubs = "";
                } else {
                    data.valueOfFixedValue = "";
                }


                data.outputMinusAsZero = data.outputMinusAsZero ? 1 : 0;
                if (self.selectModeScreen() == model.DATA_FORMAT_SETTING_SCREEN_MODE.INIT) {
                    service.sendPerformSettingByTime(data).done(result => {
                        dialog.info({ messageId: "Msg_15" }).then(() => {
                            close();
                        });
                    });
                } else {
                    setShared('CMF002_C_PARAMS', { formatSetting: data });
                    close();
                }
            }
        }

        //※L1　～　※L6
        enableFormatSelectionCls() {
            let self = this;
            return (self.timeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE && self.inputMode);
        }

        //※L2　
        enableFixedValueOperationCls() {
            let self = this;
            return (self.timeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE && self.inputMode);
        }
        enableFixedValueOperation() {
            let self = this;
            let enable = (self.timeDataFormatSetting().fixedValueOperation() == model.NOT_USE_ATR.USE && self.inputMode && self.timeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE);
            if (!enable) {
                $('#L7_3').ntsError('clear');
                self.timeDataFormatSetting().fixedCalculationValue(null);
            }
            return enable;
        }
        //※L3
        enableFixedLengthOutputCls() {
            let self = this;
            return (self.timeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE && self.inputMode);
        }
        enableFixedLengthOutput() {
            let self = this;
            let enable = (self.timeDataFormatSetting().fixedLengthOutput() == model.NOT_USE_ATR.USE && self.inputMode && self.timeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE);
            if (!enable) {
                $('#L8_2_2').ntsError('clear');
                self.timeDataFormatSetting().fixedLongIntegerDigit(null);
            }
            return enable;
        }
        //※L4
        enableNullValueReplaceCls() {
            let self = this;
            let enable = (self.timeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE && self.inputMode);
            return enable;
        }
        enableNullValueReplace() {
            let self = this;
            let enable = (self.timeDataFormatSetting().nullValueSubs() == model.NOT_USE_ATR.USE && self.inputMode && self.timeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE);
            if (!enable) {
                $('#L9_2').ntsError('clear');
                self.timeDataFormatSetting().valueOfNullValueSubs(null);
            }
            return enable;
        }
        //※L5
        enableSelectTimeCls() {
            let self = this;
            return (self.timeDataFormatSetting().selectHourMinute() == model.getTimeSelected()[0].code && self.inputMode && self.timeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE);
        }
        //※L6
        decimalSelectionCls() {
            let self = this;
            let enable = self.checkEnableL6();
            if (!enable) {
                $('#L3_1').ntsError('clear');
                self.timeDataFormatSetting().minuteFractionDigit(null);
            }
            return enable;
        }
        
        checkEnableL6() {
            let self = this;
            if (self.timeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.USE) return false;
            if (self.timeDataFormatSetting().decimalSelection() == model.getDecimalSelect()[0].code) return false;
            if (self.timeDataFormatSetting().decimalSelection() == model.getDecimalSelect()[1].code
                && self.timeDataFormatSetting().selectHourMinute() == model.getTimeSelected()[1].code) return false;
            return true;
        }

        enableFixedValueCls() {
            let self = this;
            return (self.inputMode);
        }
        //L7
        enableFixedValue() {
            let self = this;
            let enable = (self.timeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.USE && self.inputMode);
            if (!enable) {
                $('#L10_2').ntsError('clear');
                self.timeDataFormatSetting().valueOfFixedValue(null);
            }
            return enable;
        }

        enableRegister() {
            return hasError();
        }

        start(): JQueryPromise<any> {
            let self = this;
            let dfd = $.Deferred();

            //Check Mode Screen
            let params = getShared('CMF002_L_PARAMS');
            self.selectModeScreen(params.screenMode);
            if (self.selectModeScreen() == model.DATA_FORMAT_SETTING_SCREEN_MODE.INDIVIDUAL && params.formatSetting) {
                // get data shared
                self.timeDataFormatSetting(new model.TimeDataFormatSetting(params.formatSetting));
                dfd.resolve();
            } else {
                service.findPerformSettingByTime().done(result => {
                    if (result) {
                        self.timeDataFormatSetting(new model.TimeDataFormatSetting(result));
                    } else {
                        self.timeDataFormatSetting(new model.TimeDataFormatSetting(self.initTimeDataFormatSetting));
                    }                    
                    dfd.resolve();
                }).fail((err) => {
                    nts.uk.ui.dialog.alertError(error);
                    dfd.reject();
                });
            }

            return dfd.promise();
        }

        startFindData() {
            let self = this;
           
        }

        cancelCharacterSetting() {
            close();
        }
    }
}