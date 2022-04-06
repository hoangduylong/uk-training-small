var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm022;
                (function (cmm022) {
                    var a;
                    (function (a) {
                        var setShared = nts.uk.ui.windows.setShared;
                        var getShared = nts.uk.ui.windows.getShared;
                        var block = nts.uk.ui.block;
                        var alert = nts.uk.ui.dialog.alert;
                        var info = nts.uk.ui.dialog.info;
                        var confirm = nts.uk.ui.dialog.confirm;
                        var dialog = nts.uk.ui.dialog;
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.commonMasters = ko.observableArray([]);
                                    this.selectedCommonMaster = ko.observable(new CommonMaster());
                                    this.commonMasterItems = ko.observableArray([]);
                                    this.selectedCommonMasterItem = ko.observable(new MasterItem(this.defaultItem));
                                    this.defaultItem = {
                                        commonMasterItemId: null,
                                        commonMasterItemCode: "",
                                        commonMasterItemName: "",
                                        displayNumber: null,
                                        usageStartDate: moment(new Date()).format("YYYY/MM/DD"),
                                        usageEndDate: "9999/12/31"
                                    };
                                    this.fistLoad = true;
                                    this.newMode = ko.observable(false);
                                    var self = this;
                                    self.selectedCommonMaster().commonMasterId.subscribe(function (id) {
                                        self.selectedCommonMaster().updateData(_.filter(self.commonMasters(), ['commonMasterId', id])[0]);
                                        if (!id) {
                                            self.commonMasterItems([]);
                                            self.selectedCommonMasterItem().commonMasterItemId(null);
                                            return;
                                        }
                                        block.grayout();
                                        a.service.getItems(id).done(function (data) {
                                            self.commonMasterItems(data);
                                            var item = _.filter(data, ['commonMasterItemId', self.selectedCommonMasterItem().commonMasterItemId()])[0];
                                            if (!item) {
                                                self.selectedCommonMasterItem().commonMasterItemId(data[0].commonMasterItemId);
                                            }
                                            else {
                                                self.selectedCommonMasterItem().commonMasterItemId.valueHasMutated();
                                            }
                                        }).fail(function (res) {
                                            self.commonMasterItems([]);
                                            self.selectedCommonMasterItem().commonMasterItemId(null);
                                            if (self.fistLoad && res.messageId == 'Msg_1578') {
                                                alert(res);
                                            }
                                            if (res.messageId != 'Msg_1578') {
                                                alert(res);
                                            }
                                        }).always(function () {
                                            self.fistLoad = false;
                                            nts.uk.ui.errors.clearAll();
                                            block.clear();
                                        });
                                    });
                                    self.selectedCommonMasterItem().commonMasterItemId.subscribe(function (id) {
                                        nts.uk.ui.errors.clearAll();
                                        $("#A223_2").focus();
                                        var selectedItem = _.filter(self.commonMasterItems(), ['commonMasterItemId', id])[0];
                                        self.selectedCommonMasterItem().updateData(selectedItem ? selectedItem : self.defaultItem);
                                        if (id) {
                                            self.newMode(false);
                                        }
                                        else {
                                            self.newMode(true);
                                        }
                                    });
                                    setTimeout(function () {
                                        $(window).resize(function () {
                                            $("#master-item-list").igGrid("option", "height", (window.innerHeight - 283) + "px");
                                            $("#master-list").igGrid("option", "height", (window.innerHeight - 306) + "px");
                                            $("#common-master_arena").height((window.innerHeight - 240) + "px");
                                        });
                                    }, 100);
                                }
                                /**
                                 * start page
                                 */
                                ScreenModel.prototype.start_page = function () {
                                    var self = this, dfd = $.Deferred(), param = { confirmed: null };
                                    block.grayout();
                                    a.service.startPage(param)
                                        .done(function (data) {
                                        self.commonMasters(data);
                                        self.selectedCommonMaster().commonMasterId(data[0].commonMasterId);
                                    }).fail(function (res) {
                                        if (res.messageId == "Msg_1589") {
                                            confirm({ messageId: res.messageId }).ifYes(function () {
                                                param.confirmed = true;
                                                block.grayout();
                                                a.service.startPage(param).done(function (data) {
                                                    self.commonMasters(data);
                                                    self.selectedCommonMaster().commonMasterId(data[0].commonMasterId);
                                                }).always(function () {
                                                    block.clear();
                                                });
                                            }).ifNo(function () {
                                                alert({ messageId: "Msg_1590" });
                                            });
                                        }
                                        else {
                                            alert(res.messageId);
                                        }
                                        block.clear();
                                    }).always(function () {
                                        setTimeout(function () {
                                            $("#master-item-list").igGrid("option", "height", (window.innerHeight - 283) + "px");
                                            $("#master-list").igGrid("option", "height", (window.innerHeight - 306) + "px");
                                            $("#common-master_arena").height((window.innerHeight - 240) + "px");
                                        }, 100);
                                        nts.uk.ui.errors.clearAll();
                                        block.clear();
                                        dfd.resolve();
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.masterLength = function () {
                                    var self = this;
                                    return self.commonMasters().length > 0;
                                };
                                ScreenModel.prototype.saveData = function () {
                                    $('#A223_2').ntsError('check');
                                    $('#A223_3').ntsError('check');
                                    if (nts.uk.ui.errors.hasError()) {
                                        return;
                                    }
                                    var self = this, param = ko.mapping.toJS(self);
                                    param.selectedCommonMasterItem.usageStartDate =
                                        moment(param.selectedCommonMasterItem.usageStartDate).format("YYYY/MM/DD");
                                    param.selectedCommonMasterItem.usageEndDate =
                                        moment(param.selectedCommonMasterItem.usageEndDate).format("YYYY/MM/DD");
                                    if (!param.newMode && !param.selectedCommonMasterItem.commonMasterItemId) {
                                        return;
                                    }
                                    block.grayout();
                                    a.service.saveItems(param).done(function () {
                                        a.service.getItems(self.selectedCommonMaster().commonMasterId()).done(function (data) {
                                            self.commonMasterItems(data);
                                            if (self.newMode()) {
                                                self.selectedCommonMasterItem().commonMasterItemId(_.maxBy(data, 'displayNumber').commonMasterItemId);
                                            }
                                        }).always(function () {
                                            block.clear();
                                        });
                                        info({ messageId: "Msg_15" });
                                    }).fail(function (res) {
                                        dialog.bundledErrors(res);
                                    }).always(function () {
                                        block.clear();
                                    });
                                };
                                ScreenModel.prototype.newItem = function () {
                                    var self = this;
                                    self.selectedCommonMasterItem().commonMasterItemId(null);
                                    $("#A223_2").focus();
                                };
                                ScreenModel.prototype.exportExcel = function () {
                                    var self = this;
                                    block.grayout();
                                    a.service.outPutFileExcel().done(function () {
                                        block.clear();
                                    });
                                };
                                ScreenModel.prototype.openDialogB = function () {
                                    var self = this;
                                    setShared('listMasterToB', {
                                        commonMasters: self.commonMasters(),
                                        commonMasterId: self.selectedCommonMaster().commonMasterId(),
                                        commonMasterItems: self.commonMasterItems(),
                                        commonMasterItemId: self.selectedCommonMasterItem().commonMasterItemId()
                                    });
                                    nts.uk.ui.windows.sub.modal('/view/cmm/022/b/index.xhtml').onClosed(function () {
                                        var data = getShared('DialogBToMaster');
                                        self.selectedCommonMaster().commonMasterId.valueHasMutated();
                                    });
                                };
                                ScreenModel.prototype.openDialogC = function () {
                                    var self = this;
                                    setShared('listMasterToC', {
                                        commonMasters: self.commonMasters(),
                                        commonMasterId: self.selectedCommonMaster().commonMasterId()
                                    });
                                    nts.uk.ui.windows.sub.modal('/view/cmm/022/c/index.xhtml').onClosed(function () {
                                        var data = getShared('DialogCToMaster');
                                        self.commonMasters(data.masterList);
                                        self.selectedCommonMaster().commonMasterId.valueHasMutated();
                                    });
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                        var CommonMaster = /** @class */ (function () {
                            function CommonMaster(data) {
                                this.commonMasterId = ko.observable();
                                this.commonMasterCode = ko.observable();
                                this.commonMasterName = ko.observable();
                                this.commonMasterMemo = ko.observable();
                                var self = this;
                                if (data) {
                                    self.commonMasterId(data.commonMasterId);
                                    self.commonMasterCode(data.commonMasterCode);
                                    self.commonMasterName(data.commonMasterName);
                                    self.commonMasterMemo(data.commonMasterMemo);
                                }
                            }
                            CommonMaster.prototype.updateData = function (data) {
                                var self = this;
                                self.commonMasterCode(data ? data.commonMasterCode : "");
                                self.commonMasterName(data ? data.commonMasterName : "");
                                self.commonMasterMemo(data ? data.commonMasterMemo : "");
                            };
                            return CommonMaster;
                        }());
                        a.CommonMaster = CommonMaster;
                        var MasterItem = /** @class */ (function () {
                            function MasterItem(data) {
                                this.commonMasterItemId = ko.observable();
                                this.commonMasterItemCode = ko.observable();
                                this.commonMasterItemName = ko.observable();
                                this.displayNumber = ko.observable();
                                this.usageStartDate = ko.observable(moment(new Date()).format("YYYY/MM/DD"));
                                this.usageEndDate = ko.observable("9999/12/31");
                                var self = this;
                                if (data) {
                                    self.commonMasterItemId(data.commonMasterItemId);
                                    self.commonMasterItemCode(data.commonMasterItemCode);
                                    self.commonMasterItemName(data.commonMasterItemName);
                                    self.displayNumber(data.displayNumber);
                                    self.usageStartDate(data.usageStartDate);
                                    self.usageEndDate(data.usageEndDate);
                                }
                            }
                            MasterItem.prototype.updateData = function (data) {
                                var self = this;
                                self.commonMasterItemCode(data.commonMasterItemCode);
                                self.commonMasterItemName(data.commonMasterItemName);
                                self.displayNumber(data.displayNumber);
                                self.usageStartDate(data.usageStartDate);
                                self.usageEndDate(data.usageEndDate);
                                nts.uk.ui.errors.clearAll();
                            };
                            return MasterItem;
                        }());
                        a.MasterItem = MasterItem;
                    })(a = cmm022.a || (cmm022.a = {}));
                })(cmm022 = view.cmm022 || (view.cmm022 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm022.a.vm.js.map