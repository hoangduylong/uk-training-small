var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg008;
                (function (ccg008) {
                    var c;
                    (function (c) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.columns = ko.observableArray([
                                        { headerText: 'コード', key: 'code', width: 100, hidden: true },
                                        { headerText: nts.uk.resource.getText("CCG008_8"), key: 'name', formatter: _.escape }
                                    ]);
                                    self.dataItems = ko.observableArray([]);
                                    self.itemSelected = ko.observable(null);
                                    self.selectedCode = ko.observable(null);
                                }
                                /**
                                 * When 起動
                                 * Get data from domain トップページ va 標準メニュー
                                 * Get data from domain 本人トップページ設定
                                 */
                                ScreenModel.prototype.start = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    //Get data from domain トップページ
                                    c.service.getSelectMyTopPage().done(function (lst) {
                                        $("#btnSave").focus();
                                        if (lst === null || lst === undefined || lst.length == 0) {
                                            self.dataItems([]);
                                            self.selectedCode();
                                        }
                                        else {
                                            var items = [];
                                            _.map(lst, function (item) {
                                                items.push({ "code": item.code, "name": item.name });
                                            });
                                            self.dataItems(items);
                                            //Get data from domain 本人トップページ設定 
                                            c.service.getTopPageSelfSet().done(function (topPageSelfSet) {
                                                if (topPageSelfSet === null || topPageSelfSet === undefined) {
                                                    //data is empty
                                                    self.selectedCode();
                                                }
                                                else {
                                                    self.selectedCode(topPageSelfSet.code);
                                                }
                                            });
                                            dfd.resolve();
                                        }
                                        dfd.resolve();
                                    }).fail(function (err) {
                                        nts.uk.ui.dialog.alert(err);
                                    });
                                    return dfd.promise();
                                };
                                /**
                                 * Find item is selected
                                 */
                                ScreenModel.prototype.find = function (code) {
                                    var self = this;
                                    var itemModel = null;
                                    return _.find(self.dataItems(), function (obj) {
                                        return obj.code == code;
                                    });
                                };
                                /**
                                 * When click button 決定
                                 * Regidter top page self set
                                 */
                                ScreenModel.prototype.register = function () {
                                    var self = this;
                                    var test = self.find(self.selectedCode());
                                    //khong co item nao duoc chon
                                    if (!test) {
                                        nts.uk.ui.dialog.alertError({ messageId: "Msg_218", messageParams: [nts.uk.resource.getText("CCG008_1")] });
                                    }
                                    else {
                                        //co item duoc chon
                                        var data = new model.TopPageSelfSet(self.selectedCode());
                                        c.service.save(data).done(function (res) {
                                            nts.uk.ui.windows.close();
                                        }).fail(function (err) {
                                            nts.uk.ui.dialog.alert(err);
                                        });
                                    }
                                };
                                /**
                                 * When click button キャンセル
                                 * Close dialof
                                 */
                                ScreenModel.prototype.closeDialog = function () {
                                    nts.uk.ui.windows.close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = c.viewmodel || (c.viewmodel = {}));
                        var model;
                        (function (model) {
                            var Node = /** @class */ (function () {
                                function Node(code, name) {
                                    this.code = code;
                                    this.name = name;
                                }
                                return Node;
                            }());
                            model.Node = Node;
                            var TopPageSelfSet = /** @class */ (function () {
                                function TopPageSelfSet(code) {
                                    this.code = code;
                                }
                                return TopPageSelfSet;
                            }());
                            model.TopPageSelfSet = TopPageSelfSet;
                        })(model = c.model || (c.model = {}));
                    })(c = ccg008.c || (ccg008.c = {}));
                })(ccg008 = view.ccg008 || (view.ccg008 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg008.c.vm.js.map