var cps008;
(function (cps008) {
    var b;
    (function (b) {
        var vm;
        (function (vm) {
            var setShared = nts.uk.ui.windows.setShared;
            var getShared = nts.uk.ui.windows.getShared;
            var close = nts.uk.ui.windows.close;
            var __viewContext = window['__viewContext'] || {};
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                    this.layout = ko.observable(new Layout({ id: '', code: '', name: '' }));
                    var self = this, layout = self.layout();
                    //self.start();
                    var currentDialog = nts.uk.ui.windows.getSelf();
                    if (currentDialog) {
                        var doit_1 = undefined;
                        var rgc;
                        if (currentDialog.parent) {
                            rgc = currentDialog.parent.globalContext;
                        }
                        else {
                            rgc = currentDialog.rgc();
                        }
                        $(rgc).resize(function () {
                            clearTimeout(doit_1);
                            doit_1 = setTimeout(self.resizedw(), 1000);
                        });
                    }
                }
                ViewModel.prototype.resizedw = function () {
                    var self = this;
                    var currentDialog;
                    setTimeout(function () {
                        currentDialog = nts.uk.ui.windows.getSelf();
                        // $(currentDialog.parent.globalContext).css("overflow", "hidden");
                        if (currentDialog) {
                            var rgc;
                            if (currentDialog.parent) {
                                rgc = currentDialog.parent.globalContext;
                            }
                            else {
                                rgc = currentDialog.rgc();
                            }
                            if (rgc.innerWidth <= 1275) {
                                currentDialog.setWidth(rgc.innerWidth - 50);
                            }
                            else {
                                currentDialog.setWidth(1275);
                            }
                            if (rgc.innerHeight <= 750) {
                                currentDialog.setHeight(rgc.innerHeight - 50);
                            }
                            else {
                                currentDialog.setHeight(750);
                            }
                        }
                    }, 100);
                };
                ViewModel.prototype.start = function () {
                    var self = this, layout = self.layout(), dto = getShared('CPS008B_PARAM');
                    layout.id = dto.id;
                    layout.code = dto.code;
                    layout.name = dto.name;
                    // lấy list items classification ra theo layoutid của maintainece layout truyền từ màn a lên
                    // Không có thì gọi service dưới lấy list items classification của new layout rồi truyền vào layout ở view model
                    var cls = dto.classifications;
                    if (cls && cls.length) {
                        layout.itemsClassification(_.map(cls, function (x) { return _.omit(x, ["items", "renders"]); }));
                    }
                    else {
                        layout.itemsClassification([]);
                    }
                };
                ViewModel.prototype.pushData = function () {
                    var self = this, layout = ko.toJS(self.layout);
                    // check item tren man hinh
                    if (layout.itemsClassification.length == 0) {
                        nts.uk.ui.dialog.alert({ messageId: "Msg_203" });
                        return;
                    }
                    var listItemIds = _(layout.itemsClassification)
                        .map(function (x) { return _.map(x.listItemDf, function (m) { return m; }); })
                        .flatten()
                        .filter(function (x) { return !!x; })
                        .groupBy(function (x) { return x.id; })
                        .pickBy(function (x) { return x.length > 1; })
                        .keys()
                        .value();
                    // エラーメッセージ（#Msg_289#,２つ以上配置されている項目名）を表示する
                    if (!!listItemIds.length) {
                        nts.uk.ui.dialog.alert({ messageId: "Msg_289" });
                        return;
                    }
                    setShared("CPS008B_VALUE", _.map(layout.itemsClassification, function (m) { return _.omit(m, ["items", "renders"]); }));
                    close();
                };
                ViewModel.prototype.close = function () {
                    setShared('CPS008B_VALUE', null);
                    close();
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
        })(vm = b.vm || (b.vm = {}));
    })(b = cps008.b || (cps008.b = {}));
})(cps008 || (cps008 = {}));
//# sourceMappingURL=cps008.b.vm.js.map