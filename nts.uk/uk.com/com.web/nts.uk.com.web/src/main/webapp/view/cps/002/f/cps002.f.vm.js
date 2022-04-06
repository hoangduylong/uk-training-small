var cps002;
(function (cps002) {
    var f;
    (function (f) {
        var vm;
        (function (vm) {
            var close = nts.uk.ui.windows.close;
            var alertError = nts.uk.ui.dialog.alertError;
            var dialog = nts.uk.ui.dialog.info;
            var block = nts.uk.ui.block;
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                    this.selectedCtgId = ko.observable("");
                    this.checkedIds = ko.observableArray([]);
                    this.txtSearch = ko.observable("");
                    this.lstItem = ko.observableArray([]);
                    var self = this;
                    self.lstCategory = ko.observableArray([]);
                    self.lstPerInfoItemDef = ko.observableArray([]);
                    self.columns = ko.observableArray([
                        { headerText: "", key: 'id', width: 45, hidden: true },
                        { headerText: nts.uk.resource.getText("CPS002_70"), key: 'alreadyCopy', width: 45, formatter: setPerInfoCtgFormat },
                        { headerText: nts.uk.resource.getText("CPS002_71"), key: 'categoryName', width: 150 }
                    ]);
                    self.columnPerInfoItemDef = ko.observableArray([
                        { headerText: "", key: 'id', width: 45, hidden: true },
                        { headerText: nts.uk.resource.getText("CPS002_75"), key: 'itemName', width: 250 }
                    ]);
                    self.selectedCtgId.subscribe(function (id) {
                        f.service.getPerInfoItemDef(id).done(function (data) {
                            //contant all item
                            self.lstItem(data);
                            //for no show child item
                            var datalist = _.filter(data, function (item) { return item.itemParentCd == null; });
                            self.lstPerInfoItemDef(datalist);
                            setTimeout(function () {
                                $("#multiList_headers th:first-child").append(nts.uk.resource.getText("CPS002_74"));
                            }, 100);
                            //contant all checked id
                            var perItemCopy = _.filter(data, function (item) { return item.alreadyItemDefCopy == true; }).map(function (item) { return item.id; });
                            self.checkedIds(perItemCopy);
                        });
                    });
                    self.start();
                }
                ViewModel.prototype.register = function () {
                    var self = this;
                    // let dataBind = self.lstPerInfoItemDef();
                    var itemIds = self.checkedIds();
                    var categoryId = self.selectedCtgId();
                    _.forEach(self.lstItem(), function (item) {
                        if (_.find(self.checkedIds(), function (o) { return o == item.id; })) {
                            item.checked = true;
                        }
                        else {
                            item.checked = false;
                        }
                    });
                    block.grayout();
                    f.service.updatePerInfoItemCopy(categoryId, self.lstItem()).done(function () {
                        dialog({ messageId: "Msg_15" }).then(function () {
                            self.start(self.selectedCtgId());
                        });
                    }).always(function () {
                        block.clear();
                    });
                };
                ViewModel.prototype.close = function () {
                    close();
                };
                ViewModel.prototype.start = function (ctgid) {
                    var self = this;
                    var ctgName = "";
                    block.grayout();
                    f.service.getPerInfoCtgHasItems(ctgName).done(function (data) {
                        if (data.length > 0) {
                            self.lstCategory(data);
                            self.selectedCtgId(ctgid ? ctgid : data[0].id);
                            $("#searchCtg input").focus();
                        }
                        else {
                            alertError({ messageId: "Msg_352" });
                        }
                        block.clear();
                    }).fail(function (error) {
                        if (error.messageId == "Msg_352") {
                            alertError({ messageId: "Msg_352" });
                        }
                        block.clear();
                    });
                };
                ViewModel.prototype.searchByName = function () {
                    var self = this;
                    f.service.getPerInfoCtgHasItems(self.txtSearch()).done(function (data) {
                        self.lstCategory(data);
                    }).fail(function () {
                        alertError({ messageId: "Msg_352" });
                    });
                };
                return ViewModel;
            }());
            vm.ViewModel = ViewModel;
            var PerInfoCtg = /** @class */ (function () {
                function PerInfoCtg(param) {
                    this.id = ko.observable("");
                    this.alreadyCopy = ko.observable(false);
                    this.categoryName = ko.observable("");
                    var self = this;
                    self.id(param.id || "");
                    self.alreadyCopy(param.alreadyCopy || false);
                    self.categoryName(param.categoryName || "");
                }
                return PerInfoCtg;
            }());
            var PerInforItemDef = /** @class */ (function () {
                function PerInforItemDef(param) {
                    this.id = ko.observable("");
                    this.itemName = ko.observable("");
                    this.perCtgId = ko.observable("");
                    this.alreadyItemDefCopy = ko.observable(false);
                    this.itemParentCd = ko.observable("");
                    var self = this;
                    self.id(param.id || "");
                    self.itemName(param.itemName || "");
                    self.itemName(param.perCtgId || "");
                    self.alreadyItemDefCopy(param.alreadyItemDefCopy || false);
                    self.itemParentCd(param.itemParentCd || "");
                }
                return PerInforItemDef;
            }());
        })(vm = f.vm || (f.vm = {}));
    })(f = cps002.f || (cps002.f = {}));
})(cps002 || (cps002 = {}));
function setPerInfoCtgFormat(value) {
    if (value == "true")
        return '<i class="icon icon-dot setStyleDot"></i>';
    return '';
}
//# sourceMappingURL=cps002.f.vm.js.map