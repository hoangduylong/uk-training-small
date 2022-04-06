var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps009;
                (function (cps009) {
                    var b;
                    (function (b) {
                        var viewmodel;
                        (function (viewmodel) {
                            var close = nts.uk.ui.windows.close;
                            var getShared = nts.uk.ui.windows.getShared;
                            var setShared = nts.uk.ui.windows.setShared;
                            var ViewModel = /** @class */ (function () {
                                function ViewModel() {
                                    this.itemInitLst = [];
                                    this.categoryName = ko.observable('');
                                    this.itemColumns = [];
                                    this.currentItem = ko.observableArray([]);
                                    this.state = [];
                                    var self = this;
                                    self.roundingRules = ko.observableArray([
                                        { code: 1, name: ReferenceMethodType.NOSETTING },
                                        { code: 2, name: ReferenceMethodType.FIXEDVALUE },
                                        { code: 3, name: ReferenceMethodType.SAMEASLOGIN }
                                    ]);
                                    self.itemColumns = [
                                        { headerText: 'perInfoItemDefId', key: 'perInfoItemDefId', width: 10, hidden: true },
                                        { headerText: 'isRequired', key: 'isRequired', width: 10, hidden: true },
                                        { headerText: nts.uk.resource.getText('CPS009_33'), key: 'itemName', width: 200 }
                                    ];
                                    self.selectedRuleCode = ko.observable(1);
                                }
                                /**
                                 * get data from db when start
                                 */
                                ViewModel.prototype.start = function () {
                                    var self = this, dfd = $.Deferred();
                                    self.itemInitLst = [];
                                    self.currentCtg = getShared('CPS009B_PARAMS') || { ctgName: '', settingId: '', categoryId: '', categoryType: 1 };
                                    self.categoryName(self.currentCtg.ctgName);
                                    b.service.getAllItemByCtgId(self.currentCtg.settingId, self.currentCtg.categoryId).done(function (data) {
                                        //ドメインモデル「個人情報項目定義」を取得できているかどうかをチェック (Kiểm tra 「個人情報項目定義」 có lấy được hay không)
                                        if (data == null || data == undefined || data.length == 0) {
                                            //データ件数＝０(Không)
                                            //メッセージ(#Msg_353#)を表示、トップページへ遷移する (Hiển thị ErrorMessage Msg_353, Chuyển đến TopPage) 
                                            nts.uk.ui.dialog.alertError({ messageId: 'Msg_353' }).then(function () {
                                                close();
                                            });
                                        }
                                        else {
                                            self.itemInitLst = data.itemLst;
                                            self.state = data.itemRequired;
                                        }
                                        dfd.resolve();
                                    });
                                    return dfd.promise();
                                };
                                /**
                                 * send data to screen main when click button 決定
                                 */
                                ViewModel.prototype.registerItems = function () {
                                    var self = this, dataSource = $("#grid0").ntsGrid("updatedCells"), itemList, id = [], obj;
                                    itemList = _.map(dataSource, function (x) { return x.rowId; });
                                    obj = {
                                        isCancel: false,
                                        refMethodType: self.selectedRuleCode(),
                                        lstItem: itemList
                                    };
                                    if (obj.lstItem.length == 0) {
                                        //メッセージ（Msg_362)を表示 (Hiển thị Error Message Msg_362)
                                        nts.uk.ui.dialog.alertError({ messageId: 'Msg_362' });
                                        return;
                                    }
                                    setShared('CPS009B_DATA', obj);
                                    close();
                                };
                                /**
                                 * close dialog when click button キャンセル
                                 */
                                ViewModel.prototype.closeDialog = function () {
                                    var self = this, obj = {
                                        isCancel: true,
                                        refMethodType: 0,
                                        lstItem: []
                                    };
                                    setShared('CPS009B_DATA', obj);
                                    close();
                                };
                                return ViewModel;
                            }());
                            viewmodel.ViewModel = ViewModel;
                            var ReferenceMethodType;
                            (function (ReferenceMethodType) {
                                ReferenceMethodType["NOSETTING"] = "\u8A2D\u5B9A\u306A\u3057";
                                ReferenceMethodType["FIXEDVALUE"] = "\u56FA\u5B9A\u5024";
                                ReferenceMethodType["SAMEASLOGIN"] = "\u30ED\u30B0\u30A4\u30F3\u8005\u3068\u540C\u3058";
                            })(ReferenceMethodType = viewmodel.ReferenceMethodType || (viewmodel.ReferenceMethodType = {}));
                        })(viewmodel = b.viewmodel || (b.viewmodel = {}));
                    })(b = cps009.b || (cps009.b = {}));
                })(cps009 = view.cps009 || (view.cps009 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps009.b.vm.js.map