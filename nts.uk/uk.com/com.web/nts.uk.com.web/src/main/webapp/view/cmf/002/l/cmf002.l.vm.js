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
                    var l;
                    (function (l) {
                        var viewmodel;
                        (function (viewmodel) {
                            var model = cmf002.share.model;
                            var setShared = nts.uk.ui.windows.setShared;
                            var getShared = nts.uk.ui.windows.getShared;
                            var close = nts.uk.ui.windows.close;
                            var hasError = nts.uk.ui.errors.hasError;
                            var error = nts.uk.ui.errors;
                            var dialog = nts.uk.ui.dialog;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.initTimeDataFormatSetting = {
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
                                    this.timeDataFormatSetting = ko.observable(new model.TimeDataFormatSetting(this.initTimeDataFormatSetting));
                                    //L2_1
                                    this.timeSelectedList = ko.observableArray(model.getTimeSelected());
                                    //L4_1
                                    this.decimalSelectList = ko.observableArray(model.getDecimalSelect());
                                    //L3_3
                                    this.itemListRounding = ko.observableArray(model.getRounding());
                                    //L5_1
                                    this.outputMinusAsZeroChecked = ko.observable(false);
                                    //L6_1
                                    this.separatorSelectList = ko.observableArray(model.getSeparator());
                                    //L7_1
                                    this.fixedValueOperationItem = ko.observableArray(model.getNotUseAtr());
                                    //L7_2
                                    this.fixedValueOperationSymbolItem = ko.observableArray(model.getOperationSymbol());
                                    //L8_1
                                    this.fixedLengthOutputItem = ko.observableArray(model.getNotUseAtr());
                                    //L8_3_1
                                    this.fixedLengthEditingMethodItem = ko.observableArray(model.getFixedLengthEditingMethod());
                                    //L9_1
                                    this.nullValueReplaceItem = ko.observableArray(model.getNotUseAtr());
                                    //L10_1
                                    this.fixedValueItem = ko.observableArray(model.getNotUseAtr());
                                    //Defaut Mode Screen
                                    // 0 = Individual
                                    // 1 = initial
                                    this.selectModeScreen = ko.observable();
                                    this.enableRequired = ko.observable(false);
                                    this.fixedCalculationRequired = ko.observable(false);
                                    this.fixedLongIntegerRequired = ko.observable(false);
                                    var self = this;
                                    self.inputMode = true;
                                }
                                ScreenModel.prototype.sendData = function () {
                                    var self = this;
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
                                        var data = ko.toJS(self.timeDataFormatSetting);
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
                                        }
                                        else {
                                            data.valueOfFixedValue = "";
                                        }
                                        data.outputMinusAsZero = data.outputMinusAsZero ? 1 : 0;
                                        if (self.selectModeScreen() == model.DATA_FORMAT_SETTING_SCREEN_MODE.INIT) {
                                            l.service.sendPerformSettingByTime(data).done(function (result) {
                                                dialog.info({ messageId: "Msg_15" }).then(function () {
                                                    close();
                                                });
                                            });
                                        }
                                        else {
                                            setShared('CMF002_C_PARAMS', { formatSetting: data });
                                            close();
                                        }
                                    }
                                };
                                //※L1　～　※L6
                                ScreenModel.prototype.enableFormatSelectionCls = function () {
                                    var self = this;
                                    return (self.timeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE && self.inputMode);
                                };
                                //※L2　
                                ScreenModel.prototype.enableFixedValueOperationCls = function () {
                                    var self = this;
                                    return (self.timeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE && self.inputMode);
                                };
                                ScreenModel.prototype.enableFixedValueOperation = function () {
                                    var self = this;
                                    var enable = (self.timeDataFormatSetting().fixedValueOperation() == model.NOT_USE_ATR.USE && self.inputMode && self.timeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE);
                                    if (!enable) {
                                        $('#L7_3').ntsError('clear');
                                        self.timeDataFormatSetting().fixedCalculationValue(null);
                                    }
                                    return enable;
                                };
                                //※L3
                                ScreenModel.prototype.enableFixedLengthOutputCls = function () {
                                    var self = this;
                                    return (self.timeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE && self.inputMode);
                                };
                                ScreenModel.prototype.enableFixedLengthOutput = function () {
                                    var self = this;
                                    var enable = (self.timeDataFormatSetting().fixedLengthOutput() == model.NOT_USE_ATR.USE && self.inputMode && self.timeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE);
                                    if (!enable) {
                                        $('#L8_2_2').ntsError('clear');
                                        self.timeDataFormatSetting().fixedLongIntegerDigit(null);
                                    }
                                    return enable;
                                };
                                //※L4
                                ScreenModel.prototype.enableNullValueReplaceCls = function () {
                                    var self = this;
                                    var enable = (self.timeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE && self.inputMode);
                                    return enable;
                                };
                                ScreenModel.prototype.enableNullValueReplace = function () {
                                    var self = this;
                                    var enable = (self.timeDataFormatSetting().nullValueSubs() == model.NOT_USE_ATR.USE && self.inputMode && self.timeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE);
                                    if (!enable) {
                                        $('#L9_2').ntsError('clear');
                                        self.timeDataFormatSetting().valueOfNullValueSubs(null);
                                    }
                                    return enable;
                                };
                                //※L5
                                ScreenModel.prototype.enableSelectTimeCls = function () {
                                    var self = this;
                                    return (self.timeDataFormatSetting().selectHourMinute() == model.getTimeSelected()[0].code && self.inputMode && self.timeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE);
                                };
                                //※L6
                                ScreenModel.prototype.decimalSelectionCls = function () {
                                    var self = this;
                                    var enable = self.checkEnableL6();
                                    if (!enable) {
                                        $('#L3_1').ntsError('clear');
                                        self.timeDataFormatSetting().minuteFractionDigit(null);
                                    }
                                    return enable;
                                };
                                ScreenModel.prototype.checkEnableL6 = function () {
                                    var self = this;
                                    if (self.timeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.USE)
                                        return false;
                                    if (self.timeDataFormatSetting().decimalSelection() == model.getDecimalSelect()[0].code)
                                        return false;
                                    if (self.timeDataFormatSetting().decimalSelection() == model.getDecimalSelect()[1].code
                                        && self.timeDataFormatSetting().selectHourMinute() == model.getTimeSelected()[1].code)
                                        return false;
                                    return true;
                                };
                                ScreenModel.prototype.enableFixedValueCls = function () {
                                    var self = this;
                                    return (self.inputMode);
                                };
                                //L7
                                ScreenModel.prototype.enableFixedValue = function () {
                                    var self = this;
                                    var enable = (self.timeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.USE && self.inputMode);
                                    if (!enable) {
                                        $('#L10_2').ntsError('clear');
                                        self.timeDataFormatSetting().valueOfFixedValue(null);
                                    }
                                    return enable;
                                };
                                ScreenModel.prototype.enableRegister = function () {
                                    return hasError();
                                };
                                ScreenModel.prototype.start = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    //Check Mode Screen
                                    var params = getShared('CMF002_L_PARAMS');
                                    self.selectModeScreen(params.screenMode);
                                    if (self.selectModeScreen() == model.DATA_FORMAT_SETTING_SCREEN_MODE.INDIVIDUAL && params.formatSetting) {
                                        // get data shared
                                        self.timeDataFormatSetting(new model.TimeDataFormatSetting(params.formatSetting));
                                        dfd.resolve();
                                    }
                                    else {
                                        l.service.findPerformSettingByTime().done(function (result) {
                                            if (result) {
                                                self.timeDataFormatSetting(new model.TimeDataFormatSetting(result));
                                            }
                                            else {
                                                self.timeDataFormatSetting(new model.TimeDataFormatSetting(self.initTimeDataFormatSetting));
                                            }
                                            dfd.resolve();
                                        }).fail(function (err) {
                                            nts.uk.ui.dialog.alertError(error);
                                            dfd.reject();
                                        });
                                    }
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.startFindData = function () {
                                    var self = this;
                                };
                                ScreenModel.prototype.cancelCharacterSetting = function () {
                                    close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = l.viewmodel || (l.viewmodel = {}));
                    })(l = cmf002.l || (cmf002.l = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.l.vm.js.map