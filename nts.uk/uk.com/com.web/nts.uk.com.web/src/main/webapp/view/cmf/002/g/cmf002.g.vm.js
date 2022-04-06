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
                    var g;
                    (function (g) {
                        var viewmodel;
                        (function (viewmodel) {
                            var close = nts.uk.ui.windows.close;
                            var getText = nts.uk.resource.getText;
                            var dialog = nts.uk.ui.dialog;
                            var model = cmf002.share.model;
                            var block = nts.uk.ui.block;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.listOutputCodeConvert = ko.observableArray([]);
                                    this.selectedCodeConvert = ko.observable('');
                                    this.selectedConvertDetail = ko.observable(0);
                                    this.enableBtn = ko.observable(true);
                                    this.codeConvertCurrent = ko.observable(new OutputCodeConvert('', '', 0, []));
                                    var self = this;
                                    self.screenMode = ko.observable(model.SCREEN_MODE.UPDATE);
                                    $("#fixed-table").ntsFixedTable({ height: 184 });
                                    self.acceptWithoutSettingItems = ko.observableArray([
                                        new model.ItemModel(model.NOT_USE_ATR.NOT_USE, getText('CMF002_131')),
                                        new model.ItemModel(model.NOT_USE_ATR.USE, getText('CMF002_132')),
                                    ]);
                                    self.selectedCodeConvert.subscribe(function (convertCode) {
                                        if (convertCode) {
                                            block.invisible();
                                            self.enableBtn(true);
                                            nts.uk.ui.errors.clearAll();
                                            g.service.getOutputCodeConvertByConvertCode(convertCode).done(function (data) {
                                                if (data) {
                                                    self.codeConvertCurrent().listCdConvertDetail.removeAll();
                                                    self.codeConvertCurrent().convertCode(data.convertCode);
                                                    self.codeConvertCurrent().convertName(data.convertName);
                                                    self.codeConvertCurrent().acceptWithoutSetting(data.acceptWithoutSetting);
                                                    var detail = _.sortBy(data.listCdConvertDetail, ['lineNumber']);
                                                    var converDetail = [];
                                                    for (var i_1 = 0; i_1 < detail.length; i_1++) {
                                                        converDetail.push(new CdConvertDetail(detail[i_1].convertCode, detail[i_1].lineNumber, detail[i_1].outputItem, detail[i_1].systemCode));
                                                    }
                                                    self.codeConvertCurrent().listCdConvertDetail(converDetail);
                                                    self.screenMode(model.SCREEN_MODE.UPDATE);
                                                }
                                            }).fail(function (error) {
                                                dialog.alertError(error);
                                            }).always(function () {
                                                block.clear();
                                            });
                                            _.defer(function () {
                                                nts.uk.ui.errors.clearAll();
                                            });
                                        }
                                        else {
                                            self.btnCreateCodeConvert();
                                        }
                                    });
                                } // END constructor
                                ScreenModel.prototype.start = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    self.initialScreen();
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.initialScreen = function (convertCodeParam) {
                                    var self = this;
                                    block.invisible();
                                    nts.uk.ui.errors.clearAll();
                                    g.service.getOutputCodeConvertByCompanyId().done(function (dataOutputCodeConvertJson) {
                                        if (dataOutputCodeConvertJson.length > 0) {
                                            var _codeConvertResult = _.sortBy(dataOutputCodeConvertJson, ['convertCode']);
                                            var _listOutputCodeConvert = _.map(_codeConvertResult, function (x) {
                                                return new OutputCodeConvert(x.convertCode, x.convertName, x.acceptWithoutSetting, x.listCdConvertDetail);
                                            });
                                            var _codeConvert = void 0;
                                            if (convertCodeParam) {
                                                _codeConvert = convertCodeParam;
                                            }
                                            else {
                                                _codeConvert = _listOutputCodeConvert[0].convertCode();
                                            }
                                            self.selectedCodeConvert(_codeConvert);
                                            self.listOutputCodeConvert(_listOutputCodeConvert);
                                            self.screenMode(model.SCREEN_MODE.UPDATE);
                                            self.setFocusG2_3();
                                        }
                                        else {
                                            self.enableBtn(false);
                                            self.settingCreateMode();
                                            self.setFocusG3_1();
                                        }
                                    }).fail(function (error) {
                                        dialog.alertError(error);
                                    }).always(function () {
                                        block.clear();
                                    });
                                }; // END initialScreen
                                ScreenModel.prototype.btnAddCdConvertDetails = function () {
                                    var self = this;
                                    self.addCdConvertDetails();
                                    var indexFocus = self.codeConvertCurrent().listCdConvertDetail().length;
                                    //self.setFocusItem(FOCUS_TYPE.ADD_ROW_PRESS, model.SCREEN_MODE.UPDATE, indexFocus);
                                    self.setFocusG4_3();
                                };
                                ScreenModel.prototype.addCdConvertDetails = function () {
                                    var self = this;
                                    block.invisible();
                                    self.codeConvertCurrent().listCdConvertDetail.push(new CdConvertDetail('', self.codeConvertCurrent().listCdConvertDetail().length + 1, '', ''));
                                    self.selectedConvertDetail(self.codeConvertCurrent().listCdConvertDetail().length);
                                    $("#fixed-table tr")[self.codeConvertCurrent().listCdConvertDetail().length - 1].scrollIntoView(false);
                                    block.clear();
                                };
                                ScreenModel.prototype.btnRemoveCdConvertDetails = function () {
                                    var self = this;
                                    var indexFocus = 0;
                                    block.invisible();
                                    self.codeConvertCurrent().listCdConvertDetail.remove(function (item) { return item.lineNumber() == (self.selectedConvertDetail()); });
                                    for (var i = 0; i < self.codeConvertCurrent().listCdConvertDetail().length; i++) {
                                        self.codeConvertCurrent().listCdConvertDetail()[i].lineNumber(i + 1);
                                    }
                                    if (self.selectedConvertDetail() >= self.codeConvertCurrent().listCdConvertDetail().length) {
                                        self.selectedConvertDetail(self.codeConvertCurrent().listCdConvertDetail().length);
                                        indexFocus = self.codeConvertCurrent().listCdConvertDetail().length;
                                    }
                                    else {
                                        indexFocus = self.selectedConvertDetail();
                                    }
                                    self.selectedConvertDetail.valueHasMutated();
                                    if (self.codeConvertCurrent().listCdConvertDetail().length == 0) {
                                        self.addCdConvertDetails();
                                        self.selectedConvertDetail(0);
                                        indexFocus = 0;
                                    }
                                    block.clear();
                                    if (indexFocus == 0) {
                                        $('#fixed-table').focus();
                                    }
                                    else {
                                        if (self.selectedFocus) {
                                            $('input[data-focus-input= ' + indexFocus + ']').focus();
                                        }
                                        else {
                                            $('input[data-focus-system= ' + indexFocus + ']').focus();
                                        }
                                    }
                                }; // END Remove table>tbody>tr
                                ScreenModel.prototype.btnCreateCodeConvert = function () {
                                    var self = this;
                                    self.enableBtn(false);
                                    block.invisible();
                                    self.settingCreateMode();
                                    self.setFocusG3_1();
                                    block.clear();
                                };
                                ScreenModel.prototype.btnRegOutputCodeConvert = function () {
                                    var self = this;
                                    nts.uk.ui.errors.clearAll();
                                    block.invisible();
                                    $('.nts-input').trigger("validate");
                                    if (nts.uk.ui.errors.hasError()) {
                                        block.clear();
                                        self.setFocusG2_3();
                                        return;
                                    }
                                    for (var i = 0; i < self.codeConvertCurrent().listCdConvertDetail().length; i++) {
                                        self.codeConvertCurrent().listCdConvertDetail()[i].convertCode(self.codeConvertCurrent().convertCode());
                                    }
                                    var currentOutputCodeConvert = self.codeConvertCurrent;
                                    if (model.SCREEN_MODE.NEW == self.screenMode()) {
                                        if (_.isEmpty(currentOutputCodeConvert().convertCode())) {
                                            dialog.alertError({ messageId: "Msg_660" });
                                            block.clear();
                                            return;
                                        }
                                        else {
                                            var existCode = self.listOutputCodeConvert().filter(function (x) { return x.convertCode() === currentOutputCodeConvert().convertCode(); });
                                            if (existCode.length > 0) {
                                                dialog.alertError({ messageId: "Msg_3" });
                                                block.clear();
                                                return;
                                            }
                                        }
                                    }
                                    var _outputItemDuplicate = [];
                                    var _loop_1 = function (detail) {
                                        if (!_.isEmpty(detail.systemCode())) {
                                            // check duplicate OutputItem detail
                                            var data = currentOutputCodeConvert().listCdConvertDetail().filter(function (x) { return x.systemCode() === detail.systemCode(); });
                                            if (data.length >= 2) {
                                                _outputItemDuplicate.push(detail);
                                            }
                                        }
                                    };
                                    for (var _i = 0, _a = currentOutputCodeConvert().listCdConvertDetail(); _i < _a.length; _i++) {
                                        var detail = _a[_i];
                                        _loop_1(detail);
                                    }
                                    // check duplicate OutputItem detail
                                    if (!_.isEmpty(_outputItemDuplicate)) {
                                        var _errorOutputItemDuplicate = _.uniqBy(ko.toJS(_outputItemDuplicate), 'outputItem');
                                        for (var i_2 = 0; i_2 < _errorOutputItemDuplicate.length; i_2++) {
                                            $('tr[data-id=' + _errorOutputItemDuplicate[i_2].lineNumber + ']').find("input").eq(1).ntsError('set', { messageId: 'Msg_661', messageParams: [_errorOutputItemDuplicate[i_2].systemCode] });
                                        }
                                        //dialog.alertError({ messageId: "Msg_661" });
                                    }
                                    if (nts.uk.ui.errors.hasError()) {
                                        block.clear();
                                        self.setFocusG2_3();
                                        return;
                                    }
                                    if (model.SCREEN_MODE.NEW == self.screenMode()) {
                                        g.service.addOutputCodeConvert(ko.toJS(self.codeConvertCurrent())).done(function (outputConvertCode) {
                                            dialog.info({ messageId: "Msg_15" }).then(function () {
                                                self.initialScreen(self.codeConvertCurrent().convertCode());
                                            });
                                        }).fail(function (error) {
                                            dialog.alertError(error);
                                        }).always(function () {
                                            block.clear();
                                            self.setFocusG2_3();
                                        });
                                    }
                                    else {
                                        g.service.updateOutputCodeConvert(ko.toJS(self.codeConvertCurrent())).done(function (outputConvertCode) {
                                            dialog.info({ messageId: "Msg_15" }).then(function () {
                                                self.initialScreen(self.selectedCodeConvert());
                                            });
                                        }).fail(function (error) {
                                            dialog.alertError(error);
                                        }).always(function () {
                                            block.clear();
                                            self.setFocusG2_3();
                                        });
                                    }
                                    self.enableBtn(true);
                                };
                                ScreenModel.prototype.btnDeleteOutputCodeConvert = function () {
                                    var self = this;
                                    var _listOutputCodeConvert = self.listOutputCodeConvert;
                                    var _codeConvertCurrent = self.codeConvertCurrent;
                                    block.invisible();
                                    $('#G2_3_container').ntsError('clear');
                                    g.service.checkBeforeRemove(self.selectedCodeConvert()).done(function () {
                                        dialog.confirm({ messageId: "Msg_18" }).ifYes(function () {
                                            g.service.removeOutputCodeConvert(ko.toJS(_codeConvertCurrent)).done(function () {
                                                var index = _.findIndex(_listOutputCodeConvert(), function (x) { return x.convertCode() == _codeConvertCurrent().convertCode(); });
                                                if (index >= 0) {
                                                    self.listOutputCodeConvert.splice(index, 1);
                                                    if (index >= _listOutputCodeConvert().length) {
                                                        index = _listOutputCodeConvert().length - 1;
                                                    }
                                                }
                                                dialog.info({ messageId: "Msg_16" }).then(function () {
                                                    if (_listOutputCodeConvert().length > 0) {
                                                        self.initialScreen(_listOutputCodeConvert()[index].convertCode());
                                                        self.screenMode(model.SCREEN_MODE.UPDATE);
                                                    }
                                                    else {
                                                        self.settingCreateMode();
                                                    }
                                                });
                                            }).fail(function (error) {
                                                dialog.alertError(error);
                                            }).always(function () {
                                                block.clear();
                                                self.setFocusG2_3();
                                            });
                                        }).then(function () {
                                            block.clear();
                                            self.setFocusG2_3();
                                        });
                                    }).fail(function (error) {
                                        if (error.messageId == "Msg_659") {
                                            dialog.alertError({ messageId: "Msg_659" });
                                        }
                                        else {
                                            $('#G2_3_container').ntsError('set', error);
                                        }
                                        block.clear();
                                        self.setFocusG2_3();
                                    });
                                };
                                ScreenModel.prototype.btnCloseDialog = function () {
                                    close();
                                };
                                ScreenModel.prototype.settingCreateMode = function () {
                                    var self = this;
                                    nts.uk.ui.errors.clearAll();
                                    self.selectedCodeConvert('');
                                    self.codeConvertCurrent().convertCode('');
                                    self.codeConvertCurrent().convertName('');
                                    self.codeConvertCurrent().acceptWithoutSetting(0);
                                    self.codeConvertCurrent().listCdConvertDetail.removeAll();
                                    self.selectedConvertDetail(0);
                                    self.addCdConvertDetails();
                                    self.screenMode(model.SCREEN_MODE.NEW);
                                };
                                ScreenModel.prototype.setFocusG3_1 = function () {
                                    _.defer(function () { $('#G3_1').focus(); });
                                };
                                ScreenModel.prototype.setFocusG2_3 = function () {
                                    _.defer(function () { $('#G2_3_container').focus(); });
                                };
                                ScreenModel.prototype.setFocusG4_3 = function () {
                                    _.defer(function () { $('#fixed-table').focus(); });
                                };
                                ScreenModel.prototype.setFocusItem = function (focus, screenMode, index) {
                                    var self = this;
                                    if (focus == FOCUS_TYPE.ADD_ROW_PRESS || focus == FOCUS_TYPE.DEL_ROW_PRESS) {
                                        $('tr[data-id=' + index + ']').find("input").first().focus();
                                    }
                                    _.defer(function () { nts.uk.ui.errors.clearAll(); });
                                };
                                return ScreenModel;
                            }()); //end screenModel
                            viewmodel.ScreenModel = ScreenModel;
                            var FOCUS_TYPE;
                            (function (FOCUS_TYPE) {
                                FOCUS_TYPE[FOCUS_TYPE["INIT"] = 0] = "INIT";
                                FOCUS_TYPE[FOCUS_TYPE["ADD_PRESS"] = 1] = "ADD_PRESS";
                                FOCUS_TYPE[FOCUS_TYPE["REG_PRESS"] = 2] = "REG_PRESS";
                                FOCUS_TYPE[FOCUS_TYPE["DEL_PRESS"] = 3] = "DEL_PRESS";
                                FOCUS_TYPE[FOCUS_TYPE["ROW_PRESS"] = 4] = "ROW_PRESS";
                                FOCUS_TYPE[FOCUS_TYPE["ADD_ROW_PRESS"] = 5] = "ADD_ROW_PRESS";
                                FOCUS_TYPE[FOCUS_TYPE["DEL_ROW_PRESS"] = 6] = "DEL_ROW_PRESS";
                            })(FOCUS_TYPE = viewmodel.FOCUS_TYPE || (viewmodel.FOCUS_TYPE = {}));
                            var OutputCodeConvert = /** @class */ (function () {
                                function OutputCodeConvert(code, name, acceptWithoutSetting, listCdConvertDetail) {
                                    this.convertCode = ko.observable(code);
                                    this.dispConvertCode = code;
                                    this.convertName = ko.observable(name);
                                    this.dispConvertName = name;
                                    this.acceptWithoutSetting = ko.observable(acceptWithoutSetting);
                                    this.listCdConvertDetail = ko.observableArray(listCdConvertDetail);
                                }
                                return OutputCodeConvert;
                            }());
                            viewmodel.OutputCodeConvert = OutputCodeConvert;
                            var CdConvertDetail = /** @class */ (function () {
                                function CdConvertDetail(convertCode, lineNumber, outputItem, systemCode) {
                                    this.convertCode = ko.observable(convertCode);
                                    this.lineNumber = ko.observable(lineNumber);
                                    this.outputItem = ko.observable(outputItem);
                                    this.systemCode = ko.observable(systemCode);
                                }
                                return CdConvertDetail;
                            }());
                            viewmodel.CdConvertDetail = CdConvertDetail;
                        })(viewmodel = g.viewmodel || (g.viewmodel = {}));
                    })(g = cmf002.g || (cmf002.g = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
$(function () {
    $('#fixed-table tbody').on('click', 'tr', function () {
        var index = $(this).attr('data-id');
        //alert( 'Row index: '+ index );
        nts.uk.ui.errors.clearAll();
        nts.uk.ui._viewModel.content.selectedConvertDetail(index);
        nts.uk.ui._viewModel.content.selectedFocus = true;
    });
    //tab , shif+tab    
    $("#fixed-table tbody").on("focus", "input", function () {
        var index = $(this).data('focus-input');
        nts.uk.ui._viewModel.content.selectedFocus = true;
        if (index == undefined) {
            index = $(this).data('focus-system');
            nts.uk.ui._viewModel.content.selectedFocus = false;
        }
        nts.uk.ui.errors.clearAll();
        nts.uk.ui._viewModel.content.selectedConvertDetail("" + index);
    });
});
//# sourceMappingURL=cmf002.g.vm.js.map