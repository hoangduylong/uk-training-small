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
                    var j;
                    (function (j) {
                        var viewmodel;
                        (function (viewmodel) {
                            var getText = nts.uk.resource.getText;
                            var model = cmf002.share.model;
                            var alertError = nts.uk.ui.dialog.alertError;
                            var setShared = nts.uk.ui.windows.setShared;
                            var getShared = nts.uk.ui.windows.getShared;
                            var hasError = nts.uk.ui.errors.hasError;
                            var error = nts.uk.ui.errors;
                            var dialog = nts.uk.ui.dialog;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.characterDataFormatSetting = ko.observable(new model.CharacterDataFormatSetting({
                                        effectDigitLength: 0,
                                        startDigit: null,
                                        endDigit: null,
                                        cdEditting: 0,
                                        cdEditDigit: null,
                                        cdEdittingMethod: null,
                                        spaceEditting: 0,
                                        cdConvertCd: "",
                                        cdConvertName: "",
                                        nullValueReplace: 0,
                                        valueOfNullValueReplace: "",
                                        fixedValue: 0,
                                        valueOfFixedValue: ""
                                    }));
                                    this.effectDigitLengthItem = ko.observableArray([
                                        new model.ItemModel(model.FORMAT_SELECTION.DECIMAL, getText('CMF002_165')),
                                        new model.ItemModel(model.FORMAT_SELECTION.NO_DECIMAL, getText('CMF002_166'))
                                    ]);
                                    this.codeEditingItem = ko.observableArray([
                                        new model.ItemModel(model.NOT_USE_ATR.USE, getText('CMF002_149')),
                                        new model.ItemModel(model.NOT_USE_ATR.NOT_USE, getText('CMF002_150'))
                                    ]);
                                    this.nullValueReplaceItem = ko.observableArray([
                                        new model.ItemModel(model.NOT_USE_ATR.USE, getText('CMF002_149')),
                                        new model.ItemModel(model.NOT_USE_ATR.NOT_USE, getText('CMF002_150'))
                                    ]);
                                    this.fixedValueItem = ko.observableArray([
                                        new model.ItemModel(model.NOT_USE_ATR.USE, getText('CMF002_149')),
                                        new model.ItemModel(model.NOT_USE_ATR.NOT_USE, getText('CMF002_150'))
                                    ]);
                                    this.codeEditingMethodItem = ko.observableArray(model.getFixedLengthEditingMethod());
                                    this.spaceEditingItem = ko.observableArray([
                                        new model.ItemModel(0, getText('CMF002_395')),
                                        new model.ItemModel(1, getText('CMF002_396')),
                                        new model.ItemModel(2, getText('CMF002_397'))
                                    ]);
                                    this.modeScreen = ko.observable(0);
                                    this.isEnable = ko.observable(false);
                                    var self = this;
                                }
                                ScreenModel.prototype.start = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    var params = getShared('CMF002_J_PARAMS');
                                    self.modeScreen(params.screenMode);
                                    if (self.modeScreen() == model.DATA_FORMAT_SETTING_SCREEN_MODE.INDIVIDUAL && params.formatSetting) {
                                        self.characterDataFormatSetting(new model.CharacterDataFormatSetting(params.formatSetting));
                                        dfd.resolve();
                                    }
                                    else {
                                        j.service.getCharacterDataFormatSetting().done(function (result) {
                                            if (result) {
                                                self.characterDataFormatSetting(new model.CharacterDataFormatSetting(result));
                                            }
                                            dfd.resolve();
                                        }).fail(function (err) {
                                            nts.uk.ui.dialog.alertError(error);
                                            dfd.reject();
                                        });
                                    }
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.saveCharacterSetting = function () {
                                    error.clearAll();
                                    var self = this;
                                    var command = ko.toJS(self.characterDataFormatSetting);
                                    command.cdConvertCd = ("").equals(command.cdConvertCd) ? null : command.cdConvertCd;
                                    if (self.characterDataFormatSetting().fixedValue() == model.NOT_USE_ATR.USE) {
                                        command.effectDigitLength = null;
                                        command.startDigit = null;
                                        command.endDigit = null;
                                        command.cdEditDigit = null;
                                        command.cdEdittingMethod = null;
                                        command.spaceEditting = null;
                                        command.cdConvertCd = null;
                                        command.cdConvertName = null;
                                        command.nullValueReplace = null;
                                        command.valueOfNullValueReplace = null;
                                    }
                                    if (self.characterDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE) {
                                        command.valueOfFixedValue = null;
                                    }
                                    if (self.characterDataFormatSetting().cdEditting() != model.NOT_USE_ATR.USE) {
                                        $('#J3_2_1').ntsError('clear');
                                        command.cdEditDigit = null;
                                        command.cdEdittingMethod = null;
                                    }
                                    if (self.characterDataFormatSetting().effectDigitLength() != model.NOT_USE_ATR.USE) {
                                        $('#J2_2_1').ntsError('clear');
                                        $('#J2_2_3').ntsError('clear');
                                        command.startDigit = null;
                                        command.endDigit = null;
                                    }
                                    if (self.characterDataFormatSetting().nullValueReplace() != model.NOT_USE_ATR.USE) {
                                        $('#J6_2').ntsError('clear');
                                        command.valueOfNullValueReplace = null;
                                    }
                                    if (self.characterDataFormatSetting().fixedValue() != model.NOT_USE_ATR.USE) {
                                        $('#J7_2').ntsError('clear');
                                        command.valueOfFixedValue = null;
                                    }
                                    if (self.characterDataFormatSetting().nullValueReplace() != model.NOT_USE_ATR.USE) {
                                        command.valueOfNullValueReplace = null;
                                    }
                                    if (self.characterDataFormatSetting().fixedValue() != model.NOT_USE_ATR.USE) {
                                        command.valueOfFixedValue = null;
                                    }
                                    if ((self.characterDataFormatSetting().effectDigitLength() == model.NOT_USE_ATR.USE) && self.characterDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE) {
                                        $("#J2_2_1").ntsError('check');
                                    }
                                    if ((self.characterDataFormatSetting().effectDigitLength() == model.NOT_USE_ATR.USE) && self.characterDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE) {
                                        $("#J2_2_3").ntsError('check');
                                    }
                                    if ((self.characterDataFormatSetting().cdEditting() == model.NOT_USE_ATR.USE) && self.characterDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE) {
                                        $("#J3_2_1").ntsError('check');
                                    }
                                    if (self.characterDataFormatSetting().nullValueReplace() == model.NOT_USE_ATR.USE && self.characterDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE) {
                                        $('#J6_2').ntsError('check');
                                    }
                                    if (self.characterDataFormatSetting().fixedValue() == model.NOT_USE_ATR.USE) {
                                        $('#J7_2').ntsError('check');
                                    }
                                    if (!hasError()) {
                                        if (parseInt(self.characterDataFormatSetting().startDigit()) > parseInt(self.characterDataFormatSetting().endDigit()) && self.characterDataFormatSetting().effectDigitLength() == model.NOT_USE_ATR.USE) {
                                            //                    $("#J2_2_1").ntsError('set', { messageId: "Msg_830" });
                                            //                    $('#J2_2_3').ntsError('set', { messageId: "Msg_830" });
                                            alertError({ messageId: "Msg_830" });
                                        }
                                        else {
                                            if (self.modeScreen() != model.DATA_FORMAT_SETTING_SCREEN_MODE.INDIVIDUAL) {
                                                // get data shared
                                                j.service.setCharacterDataFormatSetting(command).done(function () {
                                                    dialog.info({ messageId: "Msg_15" }).then(function () {
                                                        nts.uk.ui.windows.close();
                                                    });
                                                });
                                            }
                                            else {
                                                setShared('CMF002_C_PARAMS', { formatSetting: command });
                                                nts.uk.ui.windows.close();
                                            }
                                        }
                                    }
                                };
                                //
                                ScreenModel.prototype.enableEffectDigitLength = function () {
                                    var self = this;
                                    if (self.characterDataFormatSetting().effectDigitLength() == model.NOT_USE_ATR.USE && self.characterDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE) {
                                        return true;
                                    }
                                    else {
                                        $('#J2_2_1').ntsError('clear');
                                        $('#J2_2_3').ntsError('clear');
                                        self.characterDataFormatSetting().startDigit(null);
                                        self.characterDataFormatSetting().endDigit(null);
                                        // self.characterDataFormatSetting().startDigit(Math.floor(self.characterDataFormatSetting().startDigit()));
                                        // self.characterDataFormatSetting().endDigit(Math.floor(self.characterDataFormatSetting().endDigit()));
                                        return false;
                                    }
                                };
                                ScreenModel.prototype.enableCodeEditing = function () {
                                    var self = this;
                                    if (self.characterDataFormatSetting().cdEditting() == model.NOT_USE_ATR.USE && self.characterDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE) {
                                        return true;
                                    }
                                    else {
                                        $('#J3_2_1').ntsError('clear');
                                        self.characterDataFormatSetting().cdEditDigit(null);
                                        // self.characterDataFormatSetting().cdEditDigit(Math.floor(self.characterDataFormatSetting().cdEditDigit()));
                                        return false;
                                    }
                                };
                                ScreenModel.prototype.enableNullValueReplace = function () {
                                    var self = this;
                                    if (self.characterDataFormatSetting().nullValueReplace() == model.NOT_USE_ATR.USE && self.characterDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE) {
                                        return true;
                                    }
                                    else {
                                        $('#J6_2').ntsError('clear');
                                        self.characterDataFormatSetting().valueOfNullValueReplace(null);
                                        return false;
                                    }
                                };
                                ScreenModel.prototype.enableFixedValue = function () {
                                    var self = this;
                                    if (self.characterDataFormatSetting().fixedValue() == model.NOT_USE_ATR.USE) {
                                        return true;
                                    }
                                    else {
                                        $('#J7_2').ntsError('clear');
                                        self.characterDataFormatSetting().valueOfFixedValue(null);
                                        return false;
                                    }
                                };
                                ScreenModel.prototype.nullValueReplaceItemcls = function () {
                                    var self = this;
                                    return (self.characterDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE);
                                };
                                ScreenModel.prototype.enableSpaceEditting = function () {
                                    var self = this;
                                    return (self.characterDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE);
                                };
                                ScreenModel.prototype.enableSpaceEdditingCls = function () {
                                    var self = this;
                                    return (self.characterDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE);
                                };
                                ScreenModel.prototype.CdEditting = function () {
                                    var self = this;
                                    return (self.characterDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE);
                                };
                                ScreenModel.prototype.effectDigitLengthCls = function () {
                                    var self = this;
                                    return (self.characterDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE);
                                };
                                ScreenModel.prototype.open002_V2 = function () {
                                    var self = this;
                                    setShared('CMF002_V2_PARAMS', { formatSetting: self.cdConvertCd() });
                                    nts.uk.ui.windows.sub.modal("/view/cmf/002/v2/index.xhtml").onClosed(function () {
                                        var params = getShared('CMF002_J_PARAMS');
                                        self.cdConvertCd(params.outputCodeConvert.convertCode);
                                        self.cdConvertName(params.outputCodeConvert.convertCode == "" ? "" : params.outputCodeConvert.convertName);
                                    });
                                };
                                ScreenModel.prototype.cancelCharacterSetting = function () {
                                    nts.uk.ui.windows.close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = j.viewmodel || (j.viewmodel = {}));
                    })(j = cmf002.j || (cmf002.j = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.j.vm.js.map