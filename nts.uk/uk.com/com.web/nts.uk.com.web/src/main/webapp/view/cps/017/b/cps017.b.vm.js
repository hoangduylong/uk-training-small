var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps017;
                (function (cps017) {
                    var b;
                    (function (b) {
                        var viewmodel;
                        (function (viewmodel) {
                            var info = nts.uk.ui.dialog.info;
                            var getShared = nts.uk.ui.windows.getShared;
                            var setShared = nts.uk.ui.windows.setShared;
                            var block = nts.uk.ui.block;
                            var close = nts.uk.ui.windows.close;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.listSelection = ko.observableArray([]);
                                    this.currentSelectedId = ko.observable('');
                                    this.closeButton = true;
                                }
                                //開始
                                ScreenModel.prototype.start = function () {
                                    block.invisible();
                                    var self = this, selectedHisId = getShared('selectedHisId');
                                    var dfd = $.Deferred();
                                    nts.uk.ui.errors.clearAll();
                                    self.listSelection.subscribe(function (newSource) {
                                        if (!nts.uk.util.isNullOrEmpty(newSource) && !nts.uk.util.isNullOrEmpty($('#item_register_grid2').children())) {
                                            var source = ko.toJS(newSource);
                                            $('#item_register_grid2').igGrid("option", "dataSource", source);
                                            $('#item_register_grid2').igGrid("dataBind");
                                        }
                                    });
                                    b.service.getAllOrderSetting(selectedHisId).done(function (itemList) {
                                        if (itemList && itemList.length > 0) {
                                            var i_1 = 1;
                                            itemList.forEach(function (x) {
                                                self.listSelection.push({ id: i_1,
                                                    selectionID: x.selectionID,
                                                    histId: x.histId,
                                                    selectionCD: x.selectionCD,
                                                    selectionName: x.selectionName,
                                                    externalCD: x.externalCD,
                                                    memoSelection: x.memoSelection,
                                                    initSelection: x.initSelection == 1 ? true : false });
                                                i_1++;
                                                if (x.initSelection == 1) {
                                                    self.currentSelectedId(x.selectionID);
                                                }
                                            });
                                        }
                                        dfd.resolve();
                                    }).always(function () {
                                        block.clear();
                                    });
                                    return dfd.promise();
                                };
                                /**
                                 * register
                                 */
                                ScreenModel.prototype.register = function () {
                                    block.invisible();
                                    var self = this;
                                    var lstData = [];
                                    _.each(self.listSelection(), function (item, index) {
                                        lstData.push(new SelOrder(item.selectionID, item.histId, item.selectionCD, index + 1, item.selectionID == self.currentSelectedId() ? true : false));
                                    });
                                    //console.log(lstData);
                                    b.service.updateSelOrder(lstData).done(function () {
                                        //情報メッセージ（#Msg_15）を表示する (Hiển thị InfoMessage Msg_15)
                                        info({ messageId: "Msg_15" }).then(function () {
                                            self.closeButton = false;
                                            setShared('closeButton', self.closeButton);
                                            //close dialog
                                            close();
                                        });
                                    }).always(function () {
                                        block.clear();
                                    });
                                };
                                /**
                                 * close dialog.
                                 */
                                ScreenModel.prototype.close = function () {
                                    var self = this;
                                    self.closeButton = true;
                                    setShared('closeButton', self.closeButton);
                                    close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var SelOrder = /** @class */ (function () {
                                function SelOrder(selectionID, histId, code, dispOrder, initSelection) {
                                    this.selectionID = selectionID;
                                    this.histId = histId;
                                    this.code = code;
                                    this.dispOrder = dispOrder;
                                    this.initSelection = initSelection;
                                }
                                return SelOrder;
                            }());
                            viewmodel.SelOrder = SelOrder;
                        })(viewmodel = b.viewmodel || (b.viewmodel = {}));
                    })(b = cps017.b || (cps017.b = {}));
                })(cps017 = view.cps017 || (view.cps017 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps017.b.vm.js.map