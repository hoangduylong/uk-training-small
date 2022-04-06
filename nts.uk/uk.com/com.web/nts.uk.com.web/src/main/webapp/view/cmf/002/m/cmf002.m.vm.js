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
                    var m;
                    (function (m) {
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
                                    this.initInTimeDataFormatSetting = {
                                        nullValueSubs: 0,
                                        outputMinusAsZero: 0,
                                        fixedValue: 0,
                                        valueOfFixedValue: "",
                                        timeSeletion: 0,
                                        fixedLengthOutput: 0,
                                        fixedLongIntegerDigit: null,
                                        fixedLengthEditingMethod: 0,
                                        delimiterSetting: 2,
                                        previousDayOutputMethod: 0,
                                        nextDayOutputMethod: 0,
                                        minuteFractionDigit: null,
                                        decimalSelection: 0,
                                        minuteFractionDigitProcessCls: 1,
                                        valueOfNullValueSubs: ""
                                    };
                                    this.inTimeDataFormatSetting = ko.observable(new model.InTimeDataFormatSetting(this.initInTimeDataFormatSetting));
                                    //initComponent
                                    this.delimiterSetting = ko.observable(2);
                                    this.inputMode = ko.observable(true);
                                    this.nextDaySelectList = ko.observableArray(model.getNextDay());
                                    this.preDaySelectList = ko.observableArray(model.getPreDay());
                                    this.timeSelectedList = ko.observableArray(model.getTimeSelected());
                                    this.decimalSelectList = ko.observableArray(model.getDecimalSelect());
                                    this.itemListRounding = ko.observableArray(model.getRounding());
                                    this.separatorSelectList = ko.observableArray(model.getSeparator());
                                    this.fixedValueOperationItem = ko.observableArray(model.getNotUseAtr());
                                    this.formatSelectionItem = ko.observableArray(model.getNotUseAtr());
                                    this.fixedLengthOutputItem = ko.observableArray(model.getNotUseAtr());
                                    this.fixedLengthEditingMethodItem = ko.observableArray(model.getFixedLengthEditingMethod());
                                    this.nullValueReplaceItem = ko.observableArray(model.getNotUseAtr());
                                    this.fixedValueItem = ko.observableArray(model.getNotUseAtr());
                                    this.fixedValueOperationSymbolItem = ko.observableArray([
                                        new model.ItemModel(0, '+'),
                                        new model.ItemModel(1, '-')
                                    ]);
                                    //Defaut Mode Screen
                                    // 0 = Individual
                                    // 1 = initial
                                    this.selectModeScreen = ko.observable();
                                    this.enableRequired = ko.observable(false);
                                    var self = this;
                                }
                                ScreenModel.prototype.sendData = function () {
                                    var self = this;
                                    if (self.decimalSelectionCls()) {
                                        $("#M3_1").trigger("validate");
                                    }
                                    if (self.inTimeDataFormatSetting().fixedLengthOutput() == 1 && self.inTimeDataFormatSetting().fixedValue() == 0) {
                                        $("#M9_2_2").trigger("validate");
                                    }
                                    if (hasError()) {
                                        return;
                                    }
                                    else {
                                        var data = ko.toJS(self.inTimeDataFormatSetting);
                                        if (!self.inTimeDataFormatSetting().timeSeletion() == 0 || !self.inTimeDataFormatSetting().decimalSelection() == 1) {
                                            data.minuteFractionDigit = null;
                                            data.minuteFractionDigitProcessCls = 1;
                                        }
                                        if (!self.inTimeDataFormatSetting().fixedLengthOutput() == 1) {
                                            data.fixedLongIntegerDigit = null;
                                            data.fixedLengthEditingMethod = 0;
                                        }
                                        if (!self.inTimeDataFormatSetting().nullValueSubs() == 1) {
                                            data.valueOfNullValueSubs = "";
                                        }
                                        if (self.inTimeDataFormatSetting().fixedValue() == 1) {
                                            data.timeSeletion = 0;
                                            data.decimalSelection = 0;
                                            data.outputMinusAsZero = 0;
                                            data.delimiterSetting = 1;
                                            data.nextDayOutputMethod = 0;
                                            data.previousDayOutputMethod = 0;
                                            data.fixedLongIntegerDigit = null;
                                            data.fixedLengthEditingMothed = 0;
                                            data.valueOfNullValueSubs = null;
                                            data.fixedLengthOutput = 0;
                                            data.nullValueSubs = 0;
                                        }
                                        else {
                                            data.valueOfFixedValue = "";
                                        }
                                        data.outputMinusAsZero = data.outputMinusAsZero ? 1 : 0;
                                        if (self.selectModeScreen() == model.DATA_FORMAT_SETTING_SCREEN_MODE.INIT) {
                                            m.service.sendPerformSettingByInTime(data).done(function (result) {
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
                                //※M1　～　※M6
                                ScreenModel.prototype.enableFormatSelectionCls = function () {
                                    var self = this;
                                    return (self.inTimeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE);
                                };
                                //※M2　
                                ScreenModel.prototype.enableFixedValueOperationCls = function () {
                                    var self = this;
                                    return (self.inTimeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE);
                                };
                                ScreenModel.prototype.enableFixedValueOperation = function () {
                                    var self = this;
                                    return (self.fixedValueOperation() == model.NOT_USE_ATR.USE && self.inTimeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE);
                                };
                                //※M3
                                ScreenModel.prototype.enableFixedLengthOutput = function () {
                                    var self = this;
                                    var enable = (self.inTimeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE && self.inTimeDataFormatSetting().fixedLengthOutput() == model.NOT_USE_ATR.USE);
                                    if (!enable) {
                                        $('#M9_2_2').ntsError('clear');
                                        self.inTimeDataFormatSetting().fixedLongIntegerDigit(null);
                                    }
                                    return enable;
                                };
                                ScreenModel.prototype.enableFixedLengthOutputCls = function () {
                                    var self = this;
                                    return (self.inTimeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE);
                                };
                                //※M4
                                ScreenModel.prototype.enableNullValueReplaceCls = function () {
                                    var self = this;
                                    return (self.inTimeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE);
                                };
                                ScreenModel.prototype.enableNullValueReplace = function () {
                                    var self = this;
                                    var enable = (self.inTimeDataFormatSetting().nullValueSubs() == model.NOT_USE_ATR.USE && self.inTimeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE);
                                    if (!enable) {
                                        $('#M10_2').ntsError('clear');
                                        self.inTimeDataFormatSetting().valueOfNullValueSubs(null);
                                    }
                                    return enable;
                                };
                                //※M5
                                ScreenModel.prototype.enableSelectTimeCls = function () {
                                    var self = this;
                                    return (self.inTimeDataFormatSetting().timeSeletion() == model.getTimeSelected()[0].code && self.inTimeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE);
                                };
                                //※M6
                                ScreenModel.prototype.decimalSelectionCls = function () {
                                    var self = this;
                                    var enable = (self.inTimeDataFormatSetting().timeSeletion() == model.getTimeSelected()[0].code && self.inTimeDataFormatSetting().decimalSelection() == model.getTimeSelected()[1].code && self.inTimeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE);
                                    if (!enable) {
                                        self.inTimeDataFormatSetting().minuteFractionDigit(null);
                                        $('#M3_1').ntsError('clear');
                                    }
                                    return enable;
                                };
                                ScreenModel.prototype.enableFixedValueCls = function () {
                                    var self = this;
                                    return (self.inputMode);
                                };
                                ScreenModel.prototype.enableFixedValue = function () {
                                    var self = this;
                                    var enable = (self.inTimeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.USE);
                                    if (!enable) {
                                        self.inTimeDataFormatSetting().valueOfFixedValue(null);
                                        $('#M11_2').ntsError('clear');
                                    }
                                    else {
                                        error.clearAll();
                                    }
                                    return enable;
                                };
                                ScreenModel.prototype.enableRegister = function () {
                                    return hasError();
                                };
                                ScreenModel.prototype.start = function () {
                                    //block.invisible();
                                    var self = this;
                                    var dfd = $.Deferred();
                                    //Check Mode Screen 
                                    var params = getShared('CMF002_M_PARAMS');
                                    self.selectModeScreen(params.screenMode);
                                    if (self.selectModeScreen() == model.DATA_FORMAT_SETTING_SCREEN_MODE.INDIVIDUAL && params.formatSetting) {
                                        // get data shared
                                        self.inTimeDataFormatSetting(new model.InTimeDataFormatSetting(params.formatSetting));
                                        dfd.resolve();
                                    }
                                    else {
                                        m.service.findPerformSettingByInTime().done(function (result) {
                                            if (result) {
                                                self.inTimeDataFormatSetting(new model.InTimeDataFormatSetting(result));
                                            }
                                            else {
                                                self.inTimeDataFormatSetting(new model.InTimeDataFormatSetting(self.initInTimeDataFormatSetting));
                                            }
                                            dfd.resolve();
                                        }).fail(function (err) {
                                            nts.uk.ui.dialog.alertError(error);
                                            dfd.reject();
                                        });
                                    }
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.cancelCharacterSetting = function () {
                                    close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = m.viewmodel || (m.viewmodel = {}));
                    })(m = cmf002.m || (cmf002.m = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.m.vm.js.map