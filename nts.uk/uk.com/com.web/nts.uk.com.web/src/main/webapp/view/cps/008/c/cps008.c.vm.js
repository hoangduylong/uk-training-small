var cps008;
(function (cps008) {
    var c;
    (function (c) {
        var viewmodel;
        (function (viewmodel) {
            var setShared = nts.uk.ui.windows.setShared;
            var getShared = nts.uk.ui.windows.getShared;
            var close = nts.uk.ui.windows.close;
            var showDialog = nts.uk.ui.dialog;
            var __viewContext = window['__viewContext'] || {}, block = window["nts"]["uk"]["ui"]["block"]["grayout"], unblock = window["nts"]["uk"]["ui"]["block"]["clear"], invisible = window["nts"]["uk"]["ui"]["block"]["invisible"];
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                    this.layout = ko.observable(new Layout({ id: '', code: '', name: '' }));
                    this.overrideMode = ko.observable(false);
                    var self = this, layout = self.layout(), _data = getShared('CPS008_PARAM');
                    layout.id.subscribe(function (id) {
                        // call service for get code, name of layout
                        c.service.getDetails(id).done(function (data) {
                            if (data) {
                                layout.code(data.layoutCode);
                                layout.name(data.layoutName);
                                $("#C_INP_CODE").focus();
                            }
                        });
                    });
                    layout.id(_data.id);
                }
                ViewModel.prototype.coppyBtn = function () {
                    var self = this, layout = ko.toJS(self.layout), _data = getShared('CPS008_PARAM');
                    $("#C_INP_CODE").trigger("validate");
                    $("#C_INP_NAME").trigger("validate");
                    if (nts.uk.ui.errors.hasError()) {
                        return;
                    }
                    if (layout.newCode == layout.code) {
                        nts.uk.ui.dialog.alert({ messageId: "Msg_355" });
                        return;
                    }
                    else if (layout.newCode && layout.newName) {
                        var command_1 = {
                            id: layout.id,
                            code: layout.newCode,
                            name: layout.newName,
                            classifications: _data.outData,
                            action: self.overrideMode() ? LAYOUT_ACTION.OVERRIDE : LAYOUT_ACTION.COPY
                        };
                        // call saveData service
                        invisible();
                        c.service.saveData(command_1).done(function (data) {
                            showDialog.info({ messageId: "Msg_20" }).then(function () {
                                unblock();
                                setShared('CPS008C_RESPONE', command_1.code);
                                self.close();
                            });
                        }).fail(function (error) {
                            if (error.message == 'Msg_3') {
                                showDialog.alert({ messageId: "Msg_3" }).then(function () {
                                    unblock();
                                    $("#C_INP_CODE").focus();
                                    setShared('CPS008C_RESPONE', null);
                                });
                            }
                        });
                    }
                };
                ViewModel.prototype.close = function () {
                    close();
                };
                return ViewModel;
            }());
            viewmodel.ViewModel = ViewModel;
            var LAYOUT_ACTION;
            (function (LAYOUT_ACTION) {
                LAYOUT_ACTION[LAYOUT_ACTION["INSERT"] = 0] = "INSERT";
                LAYOUT_ACTION[LAYOUT_ACTION["UPDATE"] = 1] = "UPDATE";
                LAYOUT_ACTION[LAYOUT_ACTION["COPY"] = 2] = "COPY";
                LAYOUT_ACTION[LAYOUT_ACTION["OVERRIDE"] = 3] = "OVERRIDE";
                LAYOUT_ACTION[LAYOUT_ACTION["REMOVE"] = 4] = "REMOVE";
            })(LAYOUT_ACTION || (LAYOUT_ACTION = {}));
            var Layout = /** @class */ (function () {
                function Layout(param) {
                    this.id = ko.observable('');
                    this.code = ko.observable('');
                    this.name = ko.observable('');
                    this.newCode = ko.observable('');
                    this.newName = ko.observable('');
                    var self = this;
                    if (param) {
                        self.id(param.id || '');
                        self.code(param.code || '');
                        self.name(param.name || '');
                        self.newCode(param.newCode || '');
                        self.newName(param.newName || '');
                        //self.overrideMode(param.overrideMode || false);
                    }
                }
                return Layout;
            }());
        })(viewmodel = c.viewmodel || (c.viewmodel = {}));
    })(c = cps008.c || (cps008.c = {}));
})(cps008 || (cps008 = {}));
//# sourceMappingURL=cps008.c.vm.js.map