var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf001;
                (function (cmf001) {
                    var d;
                    (function (d) {
                        var ajax = nts.uk.request.ajax;
                        var close = nts.uk.ui.windows.close;
                        var setShared = nts.uk.ui.windows.setShared;
                        var getShared = nts.uk.ui.windows.getShared;
                        var alert = nts.uk.ui.dialog.alert;
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    // リストに表示する選択可能な項目
                                    this.selectablItemList = ko.observableArray([]);
                                    // リストで選択中の項目
                                    this.selectingItems = ko.observableArray([]);
                                    // 既に選択済みの項目（親画面から渡される）
                                    this.selectedItems = ko.observableArray([]);
                                    this.listColumns = ko.observableArray([
                                        { headerText: "NO", key: "itemNo", width: 50, hidden: true },
                                        { headerText: "名称", key: "itemName", width: 200 },
                                        { headerText: "項目型", key: "itemType", width: 75 },
                                        { headerText: "必須", key: "required", width: 25, hidden: true },
                                    ]);
                                    var self = this;
                                    var params = getShared('CMF001DParams');
                                    self.selectablItemList = ko.observableArray([]);
                                    self.getSelectableItem(params.domainId);
                                    self.selectedItems(params.selectedItems.map(function (n) { return Number(n); }));
                                }
                                ScreenModel.prototype.getSelectableItem = function (domainId) {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    ajax('com', "screen/com/cmf/cmf001/b/get/importableitem/" + domainId)
                                        .done(function (lstData) {
                                        var selecteds = self.selectedItems();
                                        var selectables = _(lstData)
                                            .filter(function (e) { return selecteds.indexOf(e.itemNo) === -1; }) // selectedsに存在しない項目のみ
                                            .orderBy(['itemNo'], ['asc'])
                                            .value();
                                        self.selectablItemList(selectables);
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.decide = function () {
                                    var self = this;
                                    if (self.selectingItems().length == 0) {
                                        alert({ messageId: "項目が選択されていません。" });
                                        return;
                                    }
                                    setShared('CMF001DOutput', self.selectingItems());
                                    close();
                                };
                                ScreenModel.prototype.cancel = function () {
                                    setShared('CMF001DCancel', true);
                                    close();
                                };
                                ScreenModel = __decorate([
                                    bean()
                                ], ScreenModel);
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var SelectableItem = /** @class */ (function () {
                                function SelectableItem(itemNo, itemName, itemType, required) {
                                    this.itemNo = itemNo;
                                    this.itemName = itemName;
                                    this.required = required;
                                    this.itemType = itemType;
                                }
                                return SelectableItem;
                            }());
                            viewmodel.SelectableItem = SelectableItem;
                        })(viewmodel = d.viewmodel || (d.viewmodel = {}));
                    })(d = cmf001.d || (cmf001.d = {}));
                })(cmf001 = view.cmf001 || (view.cmf001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf001.d.vm.js.map