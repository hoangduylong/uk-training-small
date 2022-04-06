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
                    var i;
                    (function (i) {
                        var viewmodel;
                        (function (viewmodel) {
                            var getText = nts.uk.resource.getText;
                            var model = cmf002.share.model;
                            var alertError = nts.uk.ui.dialog.alertError;
                            var setShared = nts.uk.ui.windows.setShared;
                            var getShared = nts.uk.ui.windows.getShared;
                            var dataformatSettingMode = cmf002.share.model.DATA_FORMAT_SETTING_SCREEN_MODE;
                            var errors = nts.uk.ui.errors;
                            var dialog = nts.uk.ui.dialog;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.PLUS = cmf002.share.model.SYMBOL_OPRERATION.PLUS;
                                    this.MINUS = cmf002.share.model.SYMBOL_OPRERATION.MINUS;
                                    this.notUse = cmf002.share.model.NOT_USE_ATR.NOT_USE;
                                    this.use = cmf002.share.model.NOT_USE_ATR.USE;
                                    this.numberDataFormatSetting = ko.observable(new model.NumberDataFormatSetting({
                                        formatSelection: model.FORMAT_SELECTION.DECIMAL,
                                        decimalDigit: null,
                                        decimalPointClassification: model.DECIMAL_POINT_CLASSIFICATION.OUTPUT_DECIMAL_POINT,
                                        decimalFraction: model.ROUNDING_METHOD.TRUNCATION,
                                        outputMinusAsZero: this.notUse,
                                        fixedValueOperation: this.notUse,
                                        fixedValueOperationSymbol: this.PLUS,
                                        fixedCalculationValue: null,
                                        fixedLengthOutput: this.notUse,
                                        fixedLengthIntegerDigit: null,
                                        fixedLengthEditingMethod: model.FIXED_LENGTH_EDITING_METHOD.ZERO_BEFORE,
                                        nullValueReplace: this.notUse,
                                        valueOfNullValueReplace: null,
                                        fixedValue: this.notUse,
                                        valueOfFixedValue: null
                                    }));
                                    this.formatSelectionItem = ko.observableArray(this.getFormatSelectionItems());
                                    this.fixedValueOperationItem = ko.observableArray(model.getNotUseAtr());
                                    this.fixedLengthOutputItem = ko.observableArray(model.getNotUseAtr());
                                    this.nullValueReplaceItem = ko.observableArray(model.getNotUseAtr());
                                    this.fixedValueItem = ko.observableArray(model.getNotUseAtr());
                                    this.decimalPointClassificationItem = ko.observableArray(this.getDecimalPointClassificationItems());
                                    this.decimalFractionItem = ko.observableArray(this.getDecimalFractionItem());
                                    this.fixedValueOperationSymbolItem = ko.observableArray(this.getFixedValueOperationSymbolItem());
                                    this.fixedLengthEditingMethodItem = ko.observableArray(this.getFixedLengthEditingMethodItem());
                                    this.selectModeScreen = ko.observable(dataformatSettingMode.INIT);
                                    var self = this;
                                    var parameter = getShared('CMF002_I_PARAMS');
                                    if (parameter) {
                                        self.formatSetting = parameter.formatSetting;
                                        self.selectModeScreen(parameter.screenMode);
                                    }
                                }
                                ;
                                ;
                                ScreenModel.prototype.start = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    if (self.selectModeScreen() == dataformatSettingMode.INDIVIDUAL && self.formatSetting) {
                                        self.numberDataFormatSetting(new model.NumberDataFormatSetting(self.formatSetting));
                                        dfd.resolve();
                                    }
                                    else {
                                        i.service.getNumberFormatSetting().done(function (data) {
                                            if (data != null) {
                                                self.numberDataFormatSetting(new model.NumberDataFormatSetting(data));
                                            }
                                            dfd.resolve();
                                        }).fail(function (error) {
                                            alertError(error);
                                            dfd.reject();
                                        });
                                    }
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.enableGlobal = function () {
                                    var self = this;
                                    if (self.numberDataFormatSetting().fixedValue() == self.notUse) {
                                        self.numberDataFormatSetting().valueOfFixedValue(null);
                                        return true;
                                    }
                                    else {
                                        self.numberDataFormatSetting().decimalDigit(null);
                                        self.numberDataFormatSetting().fixedCalculationValue(null);
                                        self.numberDataFormatSetting().fixedLengthIntegerDigit(null);
                                        self.numberDataFormatSetting().valueOfNullValueReplace(null);
                                        return false;
                                    }
                                };
                                ScreenModel.prototype.enableFormatSelection = function () {
                                    var self = this;
                                    var enable = self.numberDataFormatSetting().formatSelection() == model.FORMAT_SELECTION.DECIMAL && self.enableGlobal();
                                    if (!enable) {
                                        $('#I2_2_2').ntsError('clear');
                                        self.numberDataFormatSetting().decimalDigit(null);
                                        // self.numberDataFormatSetting().decimalDigit(Math.floor(self.numberDataFormatSetting().decimalDigit()));
                                    }
                                    return enable;
                                };
                                ScreenModel.prototype.enableRegister = function () {
                                    return errors.hasError();
                                };
                                ScreenModel.prototype.enableDecimalFraction = function () {
                                    var self = this;
                                    return self.numberDataFormatSetting().formatSelection() == model.FORMAT_SELECTION.NO_DECIMAL && self.enableGlobal();
                                };
                                ScreenModel.prototype.enableFixedValueOperation = function () {
                                    var self = this;
                                    var enable = self.numberDataFormatSetting().fixedValueOperation() == self.use && self.enableGlobal();
                                    if (!enable) {
                                        $('#I4_3').ntsError('clear');
                                        self.numberDataFormatSetting().fixedCalculationValue(null);
                                        // self.numberDataFormatSetting().fixedCalculationValue(Math.floor((self.numberDataFormatSetting().fixedCalculationValue()) * 100) / 100);
                                    }
                                    return enable;
                                };
                                ScreenModel.prototype.enableFixedLengthOutput = function () {
                                    var self = this;
                                    var enable = self.numberDataFormatSetting().fixedLengthOutput() == self.use && self.enableGlobal();
                                    if (!enable) {
                                        $('#I5_2_2').ntsError('clear');
                                        self.numberDataFormatSetting().fixedLengthIntegerDigit(null);
                                        // self.numberDataFormatSetting().fixedLengthIntegerDigit(Math.floor(self.numberDataFormatSetting().fixedLengthIntegerDigit()));
                                    }
                                    return enable;
                                };
                                ScreenModel.prototype.enableNullValueReplace = function () {
                                    var self = this;
                                    var enable = self.numberDataFormatSetting().nullValueReplace() == self.use && self.enableGlobal();
                                    if (!enable) {
                                        self.numberDataFormatSetting().valueOfNullValueReplace(null);
                                        $('#I6_2').ntsError('clear');
                                    }
                                    return enable;
                                };
                                ScreenModel.prototype.enableFixedValueEditor = function () {
                                    var self = this;
                                    var enable = self.numberDataFormatSetting().fixedValue() == self.use;
                                    if (!enable) {
                                        $('#I7_2').ntsError('clear');
                                    }
                                    return enable;
                                };
                                ScreenModel.prototype.selectNumberDataFormatSetting = function () {
                                    var self = this;
                                    errors.clearAll();
                                    $('#I2_2_2').ntsError(self.enableFormatSelection() ? 'check' : '');
                                    $('#I4_3').ntsError(self.enableFixedValueOperation() ? 'check' : '');
                                    $('#I5_2_2').ntsError(self.enableFixedLengthOutput() ? 'check' : '');
                                    $('#I6_2').ntsError(self.enableNullValueReplace() ? 'check' : '');
                                    $('#I7_2').ntsError(self.enableFixedValueEditor() ? 'check' : '');
                                    if (!errors.hasError()) {
                                        var outputMinusAsZero = self.numberDataFormatSetting().outputMinusAsZero();
                                        if (outputMinusAsZero == 1 || outputMinusAsZero == true) {
                                            self.numberDataFormatSetting().outputMinusAsZero(1);
                                        }
                                        else {
                                            self.numberDataFormatSetting().outputMinusAsZero(0);
                                        }
                                        if (self.numberDataFormatSetting().fixedValue() == this.use) {
                                            self.numberDataFormatSetting().formatSelection(model.FORMAT_SELECTION.DECIMAL);
                                            self.numberDataFormatSetting().decimalDigit(null);
                                            self.numberDataFormatSetting().decimalPointClassification(model.DECIMAL_POINT_CLASSIFICATION.OUTPUT_DECIMAL_POINT);
                                            self.numberDataFormatSetting().outputMinusAsZero(this.notUse);
                                            self.numberDataFormatSetting().fixedValueOperation(this.notUse);
                                            self.numberDataFormatSetting().fixedLengthOutput(this.notUse);
                                            self.numberDataFormatSetting().nullValueReplace(this.notUse);
                                        }
                                        if (self.numberDataFormatSetting().fixedValue() == this.notUse || self.numberDataFormatSetting().valueOfFixedValue() == '') {
                                            self.numberDataFormatSetting().valueOfFixedValue = ko.observable(null);
                                        }
                                        if (self.numberDataFormatSetting().formatSelection() != model.FORMAT_SELECTION.DECIMAL) {
                                            self.numberDataFormatSetting().decimalDigit(null);
                                            self.numberDataFormatSetting().decimalPointClassification(model.DECIMAL_POINT_CLASSIFICATION.OUTPUT_DECIMAL_POINT);
                                        }
                                        else {
                                            self.numberDataFormatSetting().decimalFraction(model.ROUNDING_METHOD.TRUNCATION);
                                        }
                                        if (self.numberDataFormatSetting().fixedValueOperation() == this.notUse) {
                                            self.numberDataFormatSetting().fixedValueOperationSymbol(this.PLUS);
                                            self.numberDataFormatSetting().fixedCalculationValue(null);
                                        }
                                        if (self.numberDataFormatSetting().fixedLengthOutput() == this.notUse) {
                                            self.numberDataFormatSetting().fixedLengthIntegerDigit(null);
                                            self.numberDataFormatSetting().fixedLengthEditingMethod(model.FIXED_LENGTH_EDITING_METHOD.ZERO_BEFORE);
                                        }
                                        if (self.numberDataFormatSetting().nullValueReplace() == this.notUse || self.numberDataFormatSetting().valueOfNullValueReplace() == '') {
                                            self.numberDataFormatSetting().valueOfNullValueReplace = ko.observable(null);
                                        }
                                        // Case initial
                                        if (self.selectModeScreen() == dataformatSettingMode.INIT) {
                                            i.service.addNumberFormatSetting(ko.toJS(self.numberDataFormatSetting())).done(function (result) {
                                                dialog.info({ messageId: "Msg_15" }).then(function () {
                                                    nts.uk.ui.windows.close();
                                                });
                                            }).fail(function (error) {
                                                alertError(error);
                                            });
                                            // Case individual
                                        }
                                        else {
                                            setShared('CMF002_C_PARAMS', { formatSetting: ko.toJS(self.numberDataFormatSetting()) });
                                            nts.uk.ui.windows.close();
                                        }
                                    }
                                };
                                ScreenModel.prototype.cancelNumberDataFormatSetting = function () {
                                    nts.uk.ui.windows.close();
                                };
                                ScreenModel.prototype.getFormatSelectionItems = function () {
                                    return [
                                        //小数あり
                                        new model.ItemModel(model.FORMAT_SELECTION.DECIMAL, getText('CMF002_139')),
                                        //小数なし
                                        new model.ItemModel(model.FORMAT_SELECTION.NO_DECIMAL, getText('CMF002_140'))
                                    ];
                                };
                                ScreenModel.prototype.getDecimalPointClassificationItems = function () {
                                    return [
                                        //小数点を出力する
                                        new model.ItemModel(model.DECIMAL_POINT_CLASSIFICATION.OUTPUT_DECIMAL_POINT, getText('CMF002_382')),
                                        //小数点を出力しない
                                        new model.ItemModel(model.DECIMAL_POINT_CLASSIFICATION.NO_OUTPUT_DECIMAL_POINT, getText('CMF002_383'))
                                    ];
                                };
                                ScreenModel.prototype.getDecimalFractionItem = function () {
                                    return [
                                        //切り捨て
                                        new model.ItemModel(model.ROUNDING_METHOD.TRUNCATION, getText('CMF002_384')),
                                        //切り上げ
                                        new model.ItemModel(model.ROUNDING_METHOD.ROUND_UP, getText('CMF002_385')),
                                        //四捨五入
                                        new model.ItemModel(model.ROUNDING_METHOD.DOWN_4_UP_5, getText('CMF002_386'))
                                    ];
                                };
                                ScreenModel.prototype.getFixedValueOperationSymbolItem = function () {
                                    return [
                                        // +
                                        new model.ItemModel(this.PLUS, getText('CMF002_389')),
                                        // -
                                        new model.ItemModel(this.MINUS, getText('CMF002_390'))
                                    ];
                                };
                                ScreenModel.prototype.getFixedLengthEditingMethodItem = function () {
                                    return [
                                        //前ゼロ
                                        new model.ItemModel(model.FIXED_LENGTH_EDITING_METHOD.ZERO_BEFORE, getText('CMF002_391')),
                                        //後ゼロ
                                        new model.ItemModel(model.FIXED_LENGTH_EDITING_METHOD.ZERO_AFTER, getText('CMF002_392')),
                                        //前スペース
                                        new model.ItemModel(model.FIXED_LENGTH_EDITING_METHOD.SPACE_BEFORE, getText('CMF002_393')),
                                        //後スペース
                                        new model.ItemModel(model.FIXED_LENGTH_EDITING_METHOD.SPACE_AFTER, getText('CMF002_394'))
                                    ];
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = i.viewmodel || (i.viewmodel = {}));
                    })(i = cmf002.i || (cmf002.i = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.i.vm.js.map