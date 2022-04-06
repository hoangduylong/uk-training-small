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
                    var n;
                    (function (n) {
                        var viewmodel;
                        (function (viewmodel) {
                            var model = nts.uk.com.view.cmf002.share.model;
                            var getText = nts.uk.resource.getText;
                            var setShared = nts.uk.ui.windows.setShared;
                            var getShared = nts.uk.ui.windows.getShared;
                            var dialog = nts.uk.ui.dialog;
                            var error = nts.uk.ui.errors;
                            var hasError = nts.uk.ui.errors.hasError;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.atWorkDataOutputItem = ko.observable(new model.AtWorkDataOutputItem({
                                        closedOutput: null,
                                        absenceOutput: null,
                                        fixedValue: 0,
                                        valueOfFixedValue: null,
                                        atWorkOutput: null,
                                        retirementOutput: null
                                    }));
                                    this.items = ko.observableArray([
                                        new model.ItemModel(model.NOT_USE_ATR.USE, getText('CMF002_149')),
                                        new model.ItemModel(model.NOT_USE_ATR.NOT_USE, getText('CMF002_150'))
                                    ]);
                                    this.modeScreen = ko.observable(0);
                                    this.isEnable = ko.observable(false);
                                    var self = this;
                                }
                                ScreenModel.prototype.start = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    var params = getShared('CMF002_N_PARAMS');
                                    self.modeScreen(params.screenMode);
                                    if (self.modeScreen() == model.DATA_FORMAT_SETTING_SCREEN_MODE.INDIVIDUAL && params.formatSetting) {
                                        // get data shared
                                        self.atWorkDataOutputItem(new model.AtWorkDataOutputItem(params.formatSetting));
                                        dfd.resolve();
                                    }
                                    else {
                                        n.service.getAWDataFormatSetting().done(function (result) {
                                            if (result != null) {
                                                self.atWorkDataOutputItem(new model.AtWorkDataOutputItem(result));
                                            }
                                            dfd.resolve();
                                        }).fail(function (err) {
                                            nts.uk.ui.dialog.alertError(error);
                                            dfd.reject();
                                        });
                                    }
                                    return dfd.promise();
                                };
                                /**
                                    * Close dialog.
                                    */
                                ScreenModel.prototype.cancelSetting = function () {
                                    nts.uk.ui.windows.close();
                                };
                                //        self.fixedValue().subscribe(data => {
                                //               if(data == 1) $('#N3_1').focus();    
                                //               });
                                ScreenModel.prototype.enableCloseOutput = function () {
                                    var self = this;
                                    return (self.atWorkDataOutputItem().fixedValue() == model.NOT_USE_ATR.NOT_USE);
                                };
                                ScreenModel.prototype.enableRegister = function () {
                                    return error.hasError();
                                };
                                ScreenModel.prototype.retirementOutput = function () {
                                    var self = this;
                                    return (self.atWorkDataOutputItem().fixedValue() == model.NOT_USE_ATR.NOT_USE);
                                };
                                ScreenModel.prototype.enableAbsenceOutput = function () {
                                    var self = this;
                                    return (self.atWorkDataOutputItem().fixedValue() == model.NOT_USE_ATR.NOT_USE);
                                };
                                ScreenModel.prototype.enableAtWorkOutput = function () {
                                    var self = this;
                                    return (self.atWorkDataOutputItem().fixedValue() == model.NOT_USE_ATR.NOT_USE);
                                };
                                ScreenModel.prototype.saveSetting = function () {
                                    var self = this;
                                    var command = ko.toJS(self.atWorkDataOutputItem());
                                    command.atWorkOutput = ("").equals(command.atWorkOutput) ? null : command.atWorkOutput;
                                    command.absenceOutput = ("").equals(command.absenceOutput) ? null : command.absenceOutput;
                                    command.closedOutput = ("").equals(command.closedOutput) ? null : command.closedOutput;
                                    command.retirementOutput = ("").equals(command.retirementOutput) ? null : command.retirementOutput;
                                    command.valueOfFixedValue = ("").equals(command.valueOfFixedValue) ? null : command.valueOfFixedValue;
                                    if (self.atWorkDataOutputItem().fixedValue() == model.NOT_USE_ATR.USE) {
                                        command.atWorkOutput = null;
                                        command.absenceOutput = null;
                                        command.closedOutput = null;
                                        command.retirementOutput = null;
                                    }
                                    if (self.atWorkDataOutputItem().fixedValue() == model.NOT_USE_ATR.NOT_USE) {
                                        command.valueOfFixedValue = null;
                                    }
                                    if (!hasError()) {
                                        if (self.modeScreen() != model.DATA_FORMAT_SETTING_SCREEN_MODE.INDIVIDUAL) {
                                            // get data shared
                                            n.service.setAWDataFormatSetting(command).done(function () {
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
                                };
                                ScreenModel.prototype.enableFixedValue = function () {
                                    var self = this;
                                    if (self.atWorkDataOutputItem().fixedValue() == model.NOT_USE_ATR.USE) {
                                        $('#N2_1_2').ntsError('clear');
                                        $('#N2_2_2').ntsError('clear');
                                        $('#N2_3_2').ntsError('clear');
                                        $('#N2_4_2').ntsError('clear');
                                        self.atWorkDataOutputItem().atWorkOutput(null);
                                        self.atWorkDataOutputItem().absenceOutput(null);
                                        self.atWorkDataOutputItem().closedOutput(null);
                                        self.atWorkDataOutputItem().retirementOutput(null);
                                        return true;
                                    }
                                    if (self.atWorkDataOutputItem().fixedValue() != model.NOT_USE_ATR.USE) {
                                        $('#N3_2').ntsError('clear');
                                        self.atWorkDataOutputItem().valueOfFixedValue(null);
                                        return false;
                                    }
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = n.viewmodel || (n.viewmodel = {}));
                    })(n = cmf002.n || (cmf002.n = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.n.vm.js.map