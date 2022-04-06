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
                    var k;
                    (function (k) {
                        var viewmodel;
                        (function (viewmodel) {
                            var getText = nts.uk.resource.getText;
                            var model = cmf002.share.model;
                            var dataformatSettingMode = cmf002.share.model.DATA_FORMAT_SETTING_SCREEN_MODE;
                            var alertError = nts.uk.ui.dialog.alertError;
                            var setShared = nts.uk.ui.windows.setShared;
                            var getShared = nts.uk.ui.windows.getShared;
                            var errors = nts.uk.ui.errors;
                            var dialog = nts.uk.ui.dialog;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.notUse = model.NOT_USE_ATR.NOT_USE;
                                    this.use = model.NOT_USE_ATR.USE;
                                    this.formatSelectionItems = ko.observableArray(this.getFormatSelectionItems());
                                    this.enableFixedValue = ko.observable(true);
                                    this.dateDataFormatSetting = ko.observable(new model.DateDataFormatSetting({
                                        formatSelection: FORMAT_SELECTION_ITEMS.YYYY_MM_DD,
                                        nullValueSubstitution: this.notUse,
                                        fixedValue: this.notUse,
                                        valueOfNullValueSubs: null,
                                        valueOfFixedValue: null
                                    }));
                                    this.selectModeScreen = ko.observable(dataformatSettingMode.INIT);
                                    this.nullValueReplacementItems = ko.observableArray(model.getNotUseAtr());
                                    this.fixedValueItems = ko.observableArray(model.getNotUseAtr());
                                    var self = this;
                                    var parameter = getShared('CMF002_K_PARAMS');
                                    if (parameter) {
                                        self.formatSetting = parameter.formatSetting;
                                        self.selectModeScreen(parameter.screenMode);
                                    }
                                }
                                ScreenModel.prototype.start = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    if (self.selectModeScreen() == dataformatSettingMode.INDIVIDUAL && self.formatSetting) {
                                        self.dateDataFormatSetting(new model.DateDataFormatSetting(self.formatSetting));
                                        dfd.resolve();
                                    }
                                    else {
                                        k.service.getDateFormatSetting().done(function (data) {
                                            if (data != null) {
                                                self.dateDataFormatSetting(new model.DateDataFormatSetting(data));
                                            }
                                            dfd.resolve();
                                        }).fail(function (error) {
                                            alertError(error);
                                            dfd.reject();
                                        });
                                    }
                                    return dfd.promise();
                                };
                                //enable component when not using fixed value
                                ScreenModel.prototype.enable = function () {
                                    var self = this;
                                    if (self.dateDataFormatSetting().fixedValue() == self.notUse) {
                                        self.dateDataFormatSetting().valueOfFixedValue(null);
                                        return true;
                                    }
                                    else {
                                        self.dateDataFormatSetting().valueOfNullValueSubs(null);
                                        return false;
                                    }
                                };
                                //enable component replacement value editor
                                ScreenModel.prototype.enableReplacedValueEditor = function () {
                                    var self = this;
                                    var enable = (self.enable() && self.dateDataFormatSetting().nullValueSubstitution() == self.use);
                                    if (!enable) {
                                        self.dateDataFormatSetting().valueOfNullValueSubs(null);
                                        $('#K3_2').ntsError('clear');
                                    }
                                    return enable;
                                };
                                //enable component fixed value editor
                                ScreenModel.prototype.enableFixedValueEditor = function () {
                                    var self = this;
                                    var enable = !self.enable();
                                    if (!enable) {
                                        $('#K4_2').ntsError('clear');
                                    }
                                    return enable;
                                };
                                ScreenModel.prototype.enableRegister = function () {
                                    return errors.hasError();
                                };
                                ScreenModel.prototype.selectDateDataFormatSetting = function () {
                                    var self = this;
                                    errors.clearAll();
                                    $('#K3_2').ntsError(self.enableReplacedValueEditor() ? 'check' : '');
                                    $('#K4_2').ntsError(self.enableFixedValueEditor() ? 'check' : '');
                                    if (!errors.hasError()) {
                                        var dateDataFormatSettingSubmit = self.dateDataFormatSetting();
                                        if (dateDataFormatSettingSubmit.fixedValue() == this.use) {
                                            dateDataFormatSettingSubmit.formatSelection(FORMAT_SELECTION_ITEMS.YYYY_MM_DD);
                                            dateDataFormatSettingSubmit.nullValueSubstitution(this.notUse);
                                        }
                                        else {
                                            dateDataFormatSettingSubmit.valueOfFixedValue(null);
                                        }
                                        if (dateDataFormatSettingSubmit.nullValueSubstitution() == this.notUse) {
                                            dateDataFormatSettingSubmit.valueOfNullValueSubs(null);
                                        }
                                        // Case initial
                                        if (self.selectModeScreen() == dataformatSettingMode.INIT) {
                                            k.service.addDateFormatSetting(ko.toJS(dateDataFormatSettingSubmit)).done(function (result) {
                                                dialog.info({ messageId: "Msg_15" }).then(function () {
                                                    nts.uk.ui.windows.close();
                                                });
                                            }).fail(function (error) {
                                                alertError(error);
                                            });
                                            // Case individual
                                        }
                                        else {
                                            setShared('CMF002_C_PARAMS', { formatSetting: ko.toJS(dateDataFormatSettingSubmit) });
                                            nts.uk.ui.windows.close();
                                        }
                                    }
                                };
                                ScreenModel.prototype.cancelSelectDateDataFormatSetting = function () {
                                    nts.uk.ui.windows.close();
                                };
                                ScreenModel.prototype.getFormatSelectionItems = function () {
                                    return [
                                        //YYYY/MM/DD
                                        new model.ItemModel(FORMAT_SELECTION_ITEMS.YYYY_MM_DD, getText('CMF002_180')),
                                        //YYYYMMDD
                                        new model.ItemModel(FORMAT_SELECTION_ITEMS.YYYYMMDD, getText('CMF002_181')),
                                        //YY/MM/DD 
                                        new model.ItemModel(FORMAT_SELECTION_ITEMS.YY_MM_DD, getText('CMF002_182')),
                                        //YYMMDD
                                        new model.ItemModel(FORMAT_SELECTION_ITEMS.YYMMDD, getText('CMF002_183')),
                                        //JJYY/MM/DD
                                        new model.ItemModel(FORMAT_SELECTION_ITEMS.JJYY_MM_DD, getText('CMF002_184')),
                                        //JJYYMMDD
                                        new model.ItemModel(FORMAT_SELECTION_ITEMS.JJYYMMDD, getText('CMF002_185')),
                                        //曜日
                                        new model.ItemModel(FORMAT_SELECTION_ITEMS.DAY_OF_WEEK, getText('CMF002_186'))
                                    ];
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var FORMAT_SELECTION_ITEMS;
                            (function (FORMAT_SELECTION_ITEMS) {
                                //YYYY/MM/DD
                                FORMAT_SELECTION_ITEMS[FORMAT_SELECTION_ITEMS["YYYY_MM_DD"] = 0] = "YYYY_MM_DD";
                                //YYYYMMDD
                                FORMAT_SELECTION_ITEMS[FORMAT_SELECTION_ITEMS["YYYYMMDD"] = 1] = "YYYYMMDD";
                                //YY/MM/DD 
                                FORMAT_SELECTION_ITEMS[FORMAT_SELECTION_ITEMS["YY_MM_DD"] = 2] = "YY_MM_DD";
                                //YYMMDD
                                FORMAT_SELECTION_ITEMS[FORMAT_SELECTION_ITEMS["YYMMDD"] = 3] = "YYMMDD";
                                //JJYY/MM/DD
                                FORMAT_SELECTION_ITEMS[FORMAT_SELECTION_ITEMS["JJYY_MM_DD"] = 4] = "JJYY_MM_DD";
                                //JJYYMMDD
                                FORMAT_SELECTION_ITEMS[FORMAT_SELECTION_ITEMS["JJYYMMDD"] = 5] = "JJYYMMDD";
                                //曜日
                                FORMAT_SELECTION_ITEMS[FORMAT_SELECTION_ITEMS["DAY_OF_WEEK"] = 6] = "DAY_OF_WEEK";
                            })(FORMAT_SELECTION_ITEMS = viewmodel.FORMAT_SELECTION_ITEMS || (viewmodel.FORMAT_SELECTION_ITEMS = {}));
                        })(viewmodel = k.viewmodel || (k.viewmodel = {}));
                    })(k = cmf002.k || (cmf002.k = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.k.vm.js.map