var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg022;
                (function (ccg022) {
                    var a;
                    (function (a) {
                        var screenModel;
                        (function (screenModel) {
                            var dialog = nts.uk.ui.dialog.info;
                            var text = nts.uk.resource.getText;
                            var block = nts.uk.ui.block;
                            var alError = nts.uk.ui.dialog.alertError;
                            var format = nts.uk.text.format;
                            var ViewModel = /** @class */ (function () {
                                function ViewModel() {
                                    this.isSystemSelected = ko.observable(1);
                                    this.title = ko.observable(text("CCG022_10"));
                                    this.isAdmin = ko.observable(false);
                                    this.systemMode = ko.observableArray([
                                        //A2_1
                                        { id: 1, name: text('CCG022_13') },
                                        //A3_1
                                        { id: 2, name: text('CCG022_14') },
                                        //A4_1
                                        { id: 3, name: text('CCG022_21') },
                                    ]);
                                    this.selectedSystemMode = ko.observable(1);
                                    this.infoLbl1 = ko.observable("");
                                    this.infoLbl2 = ko.observable("");
                                    this.usageStopMessage = ko.observable("");
                                    this.stopMode = ko.observableArray([
                                        //A4_2
                                        { id: 1, name: text('CCG022_22') },
                                        //A4_3
                                        { id: 2, name: text('CCG022_23') }
                                    ]);
                                    this.selectedStopMode = ko.observable(1);
                                    this.stopMessage = ko.observable("");
                                    this.isSelectedStop = ko.observable(false);
                                    var self = this;
                                    self.isSystemSelected.subscribe(function (state) {
                                        self.title(state ? text("CCG022_10") : text("CCG022_11"));
                                        if (self.isAdmin()) {
                                            self.loadData(state);
                                        }
                                    });
                                    self.selectedSystemMode.subscribe(function (value) {
                                        $("#stop_message_txt").ntsError("clear");
                                        $("#in_progress_message_txt").ntsError("clear");
                                        self.isSelectedStop(value == 3);
                                        ko.applyBindingsToNode($("#in_progress_message_txt")[0], { ntsMultilineEditor: { value: self.stopMessage,
                                                name: '#[CCG022_20]',
                                                constraint: 'StopMessage',
                                                option: { width: '500px' },
                                                enable: value == 2,
                                                required: value == 2
                                            } });
                                        ko.applyBindingsToNode($("#stop_message_txt")[0], { ntsMultilineEditor: { value: self.usageStopMessage,
                                                name: '#[CCG022_25]',
                                                constraint: 'StopMessage',
                                                option: { width: '500px' },
                                                enable: value == 3,
                                                required: value == 3
                                            } });
                                    });
                                }
                                ViewModel.prototype.loadData = function (state) {
                                    var self = this;
                                    block.invisible();
                                    a.service.find(state).done(function (data) {
                                        self.setData(data);
                                    }).fail(function (error) { alError({ messageId: error.messageId, messageParams: error.parameterIds }); })
                                        .always(function () {
                                        block.clear();
                                    });
                                };
                                ViewModel.prototype.setData = function (data) {
                                    var self = this;
                                    nts.uk.ui.errors.clearAll();
                                    if (data) {
                                        if (!data.admin) {
                                            self.isSystemSelected(0);
                                            $("#sidebar").ntsSideBar("disable", 0);
                                        }
                                        var state = self.isSystemSelected();
                                        var setting = state == 1 ? data.system : data.company;
                                        self.isAdmin(data.admin);
                                        self.selectedSystemMode(setting ? setting.systemStatus : 1);
                                        if (state == 1) {
                                            self.infoLbl1(self.genLbl(true, data.stopCompanys));
                                            self.infoLbl2(self.genLbl(false, data.inProgressCompanys));
                                        }
                                        else {
                                            self.infoLbl1(self.genStopText(data.system));
                                            self.infoLbl2("");
                                        }
                                        self.usageStopMessage(setting ? setting.usageStopMessage : "");
                                        self.selectedStopMode(setting ? setting.stopMode : 1);
                                        self.stopMessage(setting ? setting.stopMessage : "");
                                        self.isSelectedStop(setting ? setting.systemStatus == 3 : false);
                                    }
                                };
                                ViewModel.prototype.saveData = function () {
                                    var self = this, command = {
                                        isSystem: self.isSystemSelected(),
                                        stopCommand: {
                                            systemStatus: self.selectedSystemMode(),
                                            stopMessage: self.stopMessage(),
                                            stopMode: self.selectedStopMode(),
                                            usageStopMessage: self.usageStopMessage(),
                                        }
                                    };
                                    $("#stop_message_txt,#in_progress_message_txt").trigger("validate");
                                    if (nts.uk.ui.errors.hasError()) {
                                        return;
                                    }
                                    block.invisible();
                                    a.service.save(command).done(function () {
                                        self.loadData(command.isSystem);
                                        dialog({ messageId: 'Msg_15' }).then(function () { });
                                    }).always(function () {
                                        block.clear();
                                    });
                                };
                                ViewModel.prototype.genLbl = function (isStop, data) {
                                    var tag = "<span class='limited-label company-code'>{0}</span>", textResult = "";
                                    var inputText = isStop == true ? "CCG022_30" : "CCG022_31";
                                    if (data.length) {
                                        textResult = text(inputText, [format(tag, _.map(data, function (item) { return item.companyCd; }).toString())]);
                                    }
                                    return textResult;
                                };
                                ViewModel.prototype.genStopText = function (setting) {
                                    var status;
                                    if (setting == null) {
                                        return "";
                                    }
                                    else {
                                        status = setting.systemStatus;
                                    }
                                    if (status == 2) {
                                        return text("CCG022_33");
                                    }
                                    if (status == 3) {
                                        return text("CCG022_32");
                                    }
                                    return "";
                                };
                                ViewModel.prototype.startPage = function () {
                                    var self = this, dfd = $.Deferred(), state = self.isSystemSelected();
                                    block.invisible();
                                    a.service.find(state).done(function (data) {
                                        self.setData(data);
                                    }).fail(function (error) { alError({ messageId: error.messageId, messageParams: error.parameterIds }); })
                                        .always(function () {
                                        block.clear();
                                    });
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                ViewModel.prototype.findSystem = function () {
                                    var self = this;
                                    if (self.isAdmin()) {
                                        self.isSystemSelected(1);
                                    }
                                };
                                ViewModel.prototype.findCompany = function () {
                                    var self = this;
                                    if (self.isAdmin()) {
                                        self.isSystemSelected(0);
                                    }
                                };
                                return ViewModel;
                            }());
                            screenModel.ViewModel = ViewModel;
                        })(screenModel = a.screenModel || (a.screenModel = {}));
                    })(a = ccg022.a || (ccg022.a = {}));
                })(ccg022 = view.ccg022 || (view.ccg022 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg022.a.vm.js.map