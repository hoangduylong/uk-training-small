var cps008;
(function (cps008) {
    var a;
    (function (a) {
        var viewmodel;
        (function (viewmodel) {
            var modal = nts.uk.ui.windows.sub.modal;
            var setShared = nts.uk.ui.windows.setShared;
            var getShared = nts.uk.ui.windows.getShared;
            var showDialog = nts.uk.ui.dialog;
            var lv = nts.layout.validate;
            var __viewContext = window['__viewContext'] || {}, block = window["nts"]["uk"]["ui"]["block"]["grayout"], unblock = window["nts"]["uk"]["ui"]["block"]["clear"], invisible = window["nts"]["uk"]["ui"]["block"]["invisible"];
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                    this.layouts = ko.observableArray([]);
                    this.layout = ko.observable(new Layout({ id: '', code: null, name: null }));
                    this.enaBtnSave = ko.observable(true);
                    this.enaBtnCoppy = ko.observable(true);
                    this.enaBtnDel = ko.observable(true);
                    this.isFromCPS018 = ko.observable(false);
                    var self = this, layout = self.layout(), layouts = self.layouts;
                    var params = getShared("CPS008A_PARAMS") || { isFromCPS018: false };
                    self.isFromCPS018(params.isFromCPS018);
                    nts.uk.sessionStorage.removeItem(nts.uk.request.STORAGE_KEY_TRANSFER_DATA);
                    self.start();
                    layout.id.subscribe(function (id) {
                        if (id) {
                            // Gọi service tải dữ liệu ra layout
                            block();
                            self.enaBtnSave(true);
                            self.enaBtnCoppy(true);
                            self.enaBtnDel(true);
                            a.service.getDetails(id).done(function (data) {
                                if (data) {
                                    layout.code(data.layoutCode);
                                    layout.name(data.layoutName);
                                    // remove all sibling sperators
                                    lv.removeDoubleLine(data.itemsClassification);
                                    layout.classifications(data.listItemClsDto || []);
                                    layout.action(LAYOUT_ACTION.UPDATE);
                                    $("#A_INP_NAME").focus();
                                    unblock();
                                }
                            });
                        }
                        else {
                            self.enaBtnSave(false);
                            self.enaBtnCoppy(false);
                            self.enaBtnDel(false);
                        }
                    });
                    var styles = '';
                    var panelHeight = window.innerHeight - 300;
                    if (panelHeight <= 70) {
                        styles = '.drag-panel { max-height: 70px !important;height: 70px !important; }';
                    }
                    else {
                        styles = '.drag-panel { max-height: ' + panelHeight + 'px !important;' + 'height: ' + panelHeight + 'px !important;}';
                    }
                    $(window).resize(function () {
                        var panelHeightResize = window.innerHeight - 300;
                        if (panelHeightResize <= 70) {
                            $(".drag-panel").attr("style", "max-height: 70px !important;height: 70px !important;");
                        }
                        else {
                            $(".drag-panel").attr("style", "max-height: " + panelHeightResize + "px !important;" + "height: " + panelHeightResize + "px !important;");
                        }
                        console.log('resize');
                    });
                    var styleSheet = document.createElement("style");
                    styleSheet.type = "text/css";
                    styleSheet.innerText = styles;
                    document.head.appendChild(styleSheet);
                }
                ViewModel.prototype.start = function (code) {
                    var self = this, layout = self.layout(), layouts = self.layouts, dfd = $.Deferred();
                    // get all layout
                    layouts.removeAll();
                    a.service.getAll().done(function (data) {
                        if (data && data.length) {
                            var _data = _.map(data, function (x) {
                                return {
                                    id: x.maintenanceLayoutID,
                                    name: x.layoutName,
                                    code: x.layoutCode
                                };
                            });
                            _.each(_data, function (d) { return layouts.push(d); });
                            if (!code) {
                                layout.id(_data[0].id);
                            }
                            else {
                                var _item = _.find(ko.toJS(layouts), function (x) { return x.code == code; });
                                if (_item) {
                                    layout.id(_item.id);
                                }
                                else {
                                    layout.id(_data[0].id);
                                }
                            }
                            layout.id.valueHasMutated();
                        }
                        else {
                            self.createNewLayout();
                        }
                        dfd.resolve();
                    });
                    return dfd.promise();
                };
                ViewModel.prototype.createNewLayout = function () {
                    var self = this, layout = self.layout(), layouts = self.layouts;
                    layout.id(undefined);
                    self.enaBtnSave(true);
                    self.enaBtnCoppy(false);
                    self.enaBtnDel(false);
                    layout.code(null);
                    layout.name(null);
                    layout.classifications([]);
                    layout.action(LAYOUT_ACTION.INSERT);
                    $("#A_INP_CODE").focus();
                };
                ViewModel.prototype.saveDataLayout = function () {
                    var self = this, data = ko.toJS(self.layout), command = {
                        id: data.id,
                        code: data.code,
                        name: data.name,
                        action: data.action,
                        classifications: data.outData
                    };
                    // validate
                    $("#A_INP_CODE").trigger("validate");
                    $("#A_INP_NAME").trigger("validate");
                    if (nts.uk.ui.errors.hasError()) {
                        return;
                    }
                    // call service savedata
                    block();
                    a.service.saveData(command).done(function (_data) {
                        unblock();
                        showDialog.info({ messageId: "Msg_15" }).then(function () {
                            $("#A_INP_NAME").focus();
                        });
                        self.start(data.code);
                    }).fail(function (error) {
                        unblock();
                        if (error.message == 'Msg_3') {
                            showDialog.alert({ messageId: "Msg_3" }).then(function () {
                                $("#A_INP_CODE").focus();
                            });
                        }
                    });
                };
                ViewModel.prototype.copyDataLayout = function () {
                    var self = this, data = ko.toJS(self.layout), layouts = ko.toJS(self.layouts);
                    data.classifications = _.map(data.classifications, function (m) { return _.omit(m, ["items", "renders"]); });
                    setShared('CPS008_PARAM', data);
                    modal('../c/index.xhtml').onClosed(function () {
                        var _data = getShared('CPS008C_RESPONE');
                        if (_data != undefined) {
                            self.start(_data);
                        }
                    });
                };
                ViewModel.prototype.removeDataLayout = function () {
                    var self = this, data = ko.toJS(self.layout), layouts = ko.toJS(self.layouts);
                    data.classifications = _.map(data.classifications, function (m) { return _.omit(m, ["items", "renders"]); });
                    data.action = LAYOUT_ACTION.REMOVE;
                    var indexItemDelete = _.findIndex(ko.toJS(self.layouts), function (item) { return item.id == data.id; });
                    nts.uk.ui.dialog.confirm({ messageId: "Msg_18" }).ifYes(function () {
                        var command = {
                            id: data.id,
                            code: data.code,
                            name: data.name,
                            action: data.action,
                            classifications: data.outData
                        };
                        // call service remove
                        invisible();
                        var itemListLength = self.layouts().length;
                        a.service.saveData(command).done(function (data) {
                            showDialog.info({ messageId: "Msg_16" }).then(function () {
                                if (itemListLength === 1) {
                                    self.start().done(function () {
                                        unblock();
                                    });
                                }
                                else if (itemListLength - 1 === indexItemDelete) {
                                    self.start(layouts[indexItemDelete - 1].code).done(function () {
                                        unblock();
                                    });
                                }
                                else if (itemListLength - 1 > indexItemDelete) {
                                    self.start(layouts[indexItemDelete + 1].code).done(function () {
                                        unblock();
                                    });
                                }
                            });
                            unblock();
                        }).fail(function (error) {
                            unblock();
                        });
                    }).ifCancel(function () {
                    });
                };
                ViewModel.prototype.showDialogB = function () {
                    var self = this, layout = self.layout(), data = ko.toJS(self.layout);
                    data.classifications = _.map(data.classifications, function (m) { return _.omit(m, ["items", "renders"]); });
                    setShared('CPS008B_PARAM', data);
                    modal('../b/index.xhtml').onClosed(function () {
                        var dto = getShared('CPS008B_VALUE');
                        if (dto && dto.length) {
                            layout.classifications(_.map(dto, function (x) { return _.omit(x, ["items", "renders"]); }));
                            layout.action(LAYOUT_ACTION.UPDATE);
                        }
                    });
                };
                ViewModel.prototype.exportExcel = function () {
                    var self = this;
                    nts.uk.ui.block.grayout();
                    var langId = "ja";
                    a.service.saveAsExcel(langId).done(function () {
                    }).fail(function (error) {
                        nts.uk.ui.dialog.alertError({ messageId: error.messageId });
                    }).always(function () {
                        nts.uk.ui.block.clear();
                    });
                };
                return ViewModel;
            }());
            viewmodel.ViewModel = ViewModel;
            var Layout = /** @class */ (function () {
                function Layout(param) {
                    this.id = ko.observable(null);
                    this.code = ko.observable(null);
                    this.name = ko.observable(null);
                    this.classifications = ko.observableArray([]);
                    this.action = ko.observable(LAYOUT_ACTION.INSERT);
                    this.outData = ko.observableArray([]);
                    var self = this;
                    if (param) {
                        self.id(param.id || null);
                        self.code(param.code || null);
                        self.name(param.name || null);
                        self.classifications(param.classifications || []);
                    }
                }
                return Layout;
            }());
            var LAYOUT_ACTION;
            (function (LAYOUT_ACTION) {
                LAYOUT_ACTION[LAYOUT_ACTION["INSERT"] = 0] = "INSERT";
                LAYOUT_ACTION[LAYOUT_ACTION["UPDATE"] = 1] = "UPDATE";
                LAYOUT_ACTION[LAYOUT_ACTION["COPY"] = 2] = "COPY";
                LAYOUT_ACTION[LAYOUT_ACTION["OVERRIDE"] = 3] = "OVERRIDE";
                LAYOUT_ACTION[LAYOUT_ACTION["REMOVE"] = 4] = "REMOVE";
            })(LAYOUT_ACTION || (LAYOUT_ACTION = {}));
            // define ITEM_CLASSIFICATION_TYPE
            var IT_CLA_TYPE;
            (function (IT_CLA_TYPE) {
                IT_CLA_TYPE[IT_CLA_TYPE["ITEM"] = "ITEM"] = "ITEM";
                IT_CLA_TYPE[IT_CLA_TYPE["LIST"] = "LIST"] = "LIST";
                IT_CLA_TYPE[IT_CLA_TYPE["SPER"] = "SeparatorLine"] = "SPER"; // line item
            })(IT_CLA_TYPE || (IT_CLA_TYPE = {}));
        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
    })(a = cps008.a || (cps008.a = {}));
})(cps008 || (cps008 = {}));
//# sourceMappingURL=cps008.a.vm.js.map