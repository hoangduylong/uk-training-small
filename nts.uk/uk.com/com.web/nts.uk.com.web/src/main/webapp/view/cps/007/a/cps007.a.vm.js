var cps007;
(function (cps007) {
    var a;
    (function (a) {
        var vm;
        (function (vm) {
            var info = nts.uk.ui.dialog.info;
            var error = nts.uk.ui.dialog.alertError;
            var lv = nts.layout.validate;
            var warning = nts.uk.ui.dialog.caution;
            var getShared = nts.uk.ui.windows.getShared;
            var __viewContext = window['__viewContext'] || {}, block = window["nts"]["uk"]["ui"]["block"]["grayout"], unblock = window["nts"]["uk"]["ui"]["block"]["clear"], invisible = window["nts"]["uk"]["ui"]["block"]["invisible"];
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                    this.layout = ko.observable(new Layout({ id: '', code: '', name: '' }));
                    this.isFromCPS018 = ko.observable(false);
                    var self = this, layout = self.layout();
                    var params = getShared("CPS007A_PARAMS") || { isFromCPS018: false };
                    self.isFromCPS018(params.isFromCPS018);
                    nts.uk.sessionStorage.removeItem(nts.uk.request.STORAGE_KEY_TRANSFER_DATA);
                    self.start();
                    var styles = '';
                    var lstControlHeight = window.innerHeight - 372;
                    if (lstControlHeight >= 347) {
                        styles += '#cps007_lst_control { height: 347px; }';
                    }
                    else {
                        styles += '#cps007_lst_control { height: ' + lstControlHeight + 'px; }';
                    }
                    var panelHeight = window.innerHeight - 169;
                    if (panelHeight <= 50) {
                        styles += '#cps007_srt_control { max-height: 50px !important;height: 50px !important; }';
                        styles += '#cps007_btn_line { position: absolute;top: 80px !important; }';
                        styles += '.drag-panel { max-height: 110px !important;height: 110px !important; }';
                    }
                    else {
                        styles += '#cps007_srt_control { max-height: ' + (panelHeight - 60) + 'px !important;height: ' + (panelHeight - 60) + 'px !important; }';
                        styles += '#cps007_btn_line { position: absolute;top: ' + (panelHeight - 30) + 'px !important; }';
                        styles += '.drag-panel { max-height: ' + panelHeight + 'px !important;height: ' + panelHeight + 'px !important; }';
                    }
                    $(window).resize(function () {
                        var panelHeightResize = window.innerHeight - 169;
                        if (panelHeightResize <= 50) {
                            $("#cps007_srt_control").attr("style", "max-height: 50px !important;height: 50px !important;");
                            $("#cps007_btn_line").attr("style", "position: absolute;top: 80px !important;");
                            $(".drag-panel").attr("style", "max-height: 110px !important;height: 110px !important;");
                        }
                        else {
                            $("#cps007_srt_control").attr("style", "max-height: " + (panelHeightResize - 60) + "px !important;height: " + (panelHeightResize - 60) + "px !important;");
                            $("#cps007_btn_line").attr("style", "position: absolute;top: " + (panelHeightResize - 30) + "px !important;");
                            $(".drag-panel").attr("style", "max-height: " + panelHeightResize + "px !important;" + "height: " + panelHeightResize + "px !important;");
                        }
                        console.log('resize');
                    });
                    var styleSheet = document.createElement("style");
                    styleSheet.type = "text/css";
                    styleSheet.innerText = styles;
                    document.head.appendChild(styleSheet);
                }
                ViewModel.prototype.start = function () {
                    var self = this, layout = self.layout();
                    // get layout info on startup
                    a.service.getData().done(function (lt) {
                        if (lt) {
                            layout.id(lt.id);
                            layout.code(lt.code);
                            layout.name(lt.name);
                            // remove all sibling sperators
                            lv.removeDoubleLine(lt.itemsClassification);
                            layout.itemsClassification(lt.itemsClassification);
                        }
                    });
                };
                ViewModel.prototype.saveData = function () {
                    var self = this, layout = ko.toJS(self.layout), command = {
                        layoutID: layout.id,
                        layoutCode: layout.code,
                        layoutName: layout.name,
                        itemsClassification: layout.outData
                    };
                    var itemids = _(command.itemsClassification)
                        .map(function (x) { return _.map(x.listItemClsDf, function (m) { return m; }); })
                        .flatten()
                        .filter(function (x) { return !!x; })
                        .groupBy(function (x) { return x.personInfoItemDefinitionID; })
                        .pickBy(function (x) { return x.length > 1; })
                        .keys()
                        .value();
                    // エラーメッセージ（#Msg_202,２つ以上配置されている項目名）を表示する
                    if (!!itemids.length) {
                        error({ messageId: 'Msg_202' });
                        return;
                    }
                    // push data layout to webservice
                    invisible();
                    a.service.saveData(command).done(function (data) {
                        self.start();
                        if (data.length > 0) {
                            var result = _.toString(data);
                            warning({ messageId: "Msg_1350", messageParams: [result] }).then(function () {
                                info({ messageId: "Msg_15" }).then(function () {
                                    unblock();
                                });
                            });
                        }
                        else {
                            info({ messageId: "Msg_15" }).then(function () {
                                unblock();
                            });
                        }
                    }).fail(function (mes) {
                        unblock();
                        error({ messageId: mes.messageId, messageParams: mes.parameterIds });
                    }).done(function (x) {
                        unblock();
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
            vm.ViewModel = ViewModel;
            var Layout = /** @class */ (function () {
                function Layout(param) {
                    this.id = ko.observable('');
                    this.code = ko.observable('');
                    this.name = ko.observable('');
                    this.editable = ko.observable(true);
                    this.itemsClassification = ko.observableArray([]);
                    this.outData = ko.observableArray([]);
                    var self = this;
                    self.id(param.id);
                    self.code(param.code);
                    self.name(param.name);
                    if (param.editable != undefined) {
                        self.editable(param.editable);
                    }
                    // replace x by class that implement this interface
                    self.itemsClassification(param.itemsClassification || []);
                }
                return Layout;
            }());
            // define ITEM_CLASSIFICATION_TYPE
            var IT_CLA_TYPE;
            (function (IT_CLA_TYPE) {
                IT_CLA_TYPE[IT_CLA_TYPE["ITEM"] = "ITEM"] = "ITEM";
                IT_CLA_TYPE[IT_CLA_TYPE["LIST"] = "LIST"] = "LIST";
                IT_CLA_TYPE[IT_CLA_TYPE["SPER"] = "SeparatorLine"] = "SPER"; // line item
            })(IT_CLA_TYPE || (IT_CLA_TYPE = {}));
        })(vm = a.vm || (a.vm = {}));
    })(a = cps007.a || (cps007.a = {}));
})(cps007 || (cps007 = {}));
//# sourceMappingURL=cps007.a.vm.js.map