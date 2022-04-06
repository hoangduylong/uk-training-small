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
                    var b;
                    (function (b) {
                        var viewmodel;
                        (function (viewmodel) {
                            var setShared = nts.uk.ui.windows.setShared;
                            var blockUI = nts.uk.ui.block;
                            var getShared = nts.uk.ui.windows.getShared;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    // list master de bind data vao iggrid left content
                                    this.listMaster = ko.observableArray([]);
                                    this.defaultMaster = {
                                        commonMasterId: null,
                                        commonMasterCode: '',
                                        commonMasterName: '',
                                        commonMasterMemo: '',
                                    };
                                    // common master dang select trong iggrid left content 
                                    this.masterSelected = ko.observable(new CommonMaster(this.defaultMaster));
                                    this.defaultItem = {
                                        commonMasterItemId: null,
                                        commonMasterItemCode: "",
                                        commonMasterItemName: "",
                                        displayNumber: null,
                                        usageStartDate: moment(new Date()).format("YYYY/MM/DD"),
                                        usageEndDate: "9999/12/31"
                                    };
                                    // code cua master item dang duoc select trong iggrid right content
                                    this.itemSelected = ko.observable(new CommonMasterItem(this.defaultItem));
                                    // list master item dang duoc select cua iggrid right content
                                    this.listItems = ko.observableArray([]);
                                    // data gui ve man A
                                    this.setData = ko.observable();
                                    var self = this;
                                    self.masterSelected().commonMasterId.subscribe(function (id) {
                                        self.masterSelected().updateData(_.filter(self.listMaster(), ['commonMasterId', id])[0]);
                                        blockUI.grayout();
                                        b.service.getListMasterItem({ commonMasterId: id }).done(function (data) {
                                            self.listItems(_.sortBy(data.listCommonMasterItem, ['displayNumber']));
                                            var item = _.filter(data.listCommonMasterItem, ['commonMasterItemId', self.itemSelected().commonMasterItemId()])[0];
                                            if (!item) {
                                                self.itemSelected().commonMasterItemId(self.listItems()[0].commonMasterItemId);
                                            }
                                        }).fail(function (err) {
                                            if (err.messageId == "Msg_1578") {
                                                self.listItems([]);
                                            }
                                            nts.uk.ui.dialog.error({ messageId: err.messageId });
                                        }).always(function () {
                                            blockUI.clear();
                                        });
                                    });
                                    setTimeout(function () {
                                        $(window).resize(function () {
                                            //                                                
                                            //                        $("#height-panel").height(window.innerHeight - 125);
                                            //                        
                                            //                        $("#multi-list").igGrid("option", "height", (window.innerHeight - 175) + "px");
                                            //                        
                                            //                        $("#item-list").igGrid("option", "height", (window.innerHeight - 300) + "px");
                                            //                        
                                            //                        $("#tree-up-down").height(window.innerHeight - 150);
                                        });
                                    }, 100);
                                }
                                /**
                                 * start page
                                 */
                                ScreenModel.prototype.start_page = function () {
                                    var self = this, dfd = $.Deferred(), shared = getShared('listMasterToB');
                                    _.sortBy(shared.commonMasters, ['commonMasterCode']);
                                    self.listMaster(shared.commonMasters);
                                    self.masterSelected().commonMasterId(shared.commonMasterId);
                                    self.itemSelected().commonMasterItemId(shared.commonMasterItemId);
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.title = function () {
                                    var self = this;
                                    return self.masterSelected().commonMasterCode() + " " + self.masterSelected().commonMasterName();
                                };
                                ScreenModel.prototype.enabledSave = function () {
                                    var self = this;
                                    return self.listItems().length > 1;
                                };
                                ScreenModel.prototype.register = function () {
                                    var self = this;
                                    for (var i = 0; i < self.listItems().length; i++) {
                                        self.listItems()[i].displayNumber = i + 1;
                                    }
                                    var param = {
                                        commonMasterId: self.masterSelected().commonMasterId(),
                                        listMasterItem: self.listItems(),
                                    };
                                    blockUI.grayout();
                                    b.service.update(param).done(function (data) {
                                        self.setData({
                                            commonMasterId: self.masterSelected().commonMasterId(),
                                            masterList: [],
                                            itemList: self.listItems(),
                                            commonMasterItemId: self.itemSelected().commonMasterItemId()
                                        });
                                        setShared('DialogBToMaster', self.setData());
                                        nts.uk.ui.dialog.info({ messageId: "Msg_15" });
                                    }).fail(function (err) {
                                        nts.uk.ui.dialog.error({ messageId: err.messageId });
                                    }).always(function () {
                                        blockUI.clear();
                                    });
                                };
                                // close dialog
                                ScreenModel.prototype.closeDialog = function () {
                                    var self = this;
                                    if (!self.setData()) {
                                        self.setData({
                                            commonMasterId: self.masterSelected().commonMasterId(),
                                            commonMasterItemId: self.itemSelected().commonMasterItemId()
                                        });
                                    }
                                    setShared('DialogBToMaster', self.setData());
                                    nts.uk.ui.windows.close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var CommonMasterItem = /** @class */ (function () {
                                function CommonMasterItem(param) {
                                    this.commonMasterItemId = ko.observable();
                                    this.commonMasterItemCode = ko.observable();
                                    this.commonMasterItemName = ko.observable();
                                    this.displayNumber = ko.observable();
                                    this.usageStartDate = ko.observable();
                                    this.usageEndDate = ko.observable();
                                    var self = this;
                                    self.commonMasterItemId(param.commonMasterItemId);
                                    self.commonMasterItemCode(param.commonMasterItemCode);
                                    self.commonMasterItemName(param.commonMasterItemName);
                                    self.displayNumber(param.displayNumber);
                                    self.usageStartDate(param.usageStartDate);
                                    self.usageEndDate(param.usageEndDate);
                                }
                                return CommonMasterItem;
                            }());
                            var CommonMaster = /** @class */ (function () {
                                function CommonMaster(param) {
                                    this.commonMasterId = ko.observable();
                                    this.commonMasterCode = ko.observable();
                                    this.commonMasterName = ko.observable();
                                    this.commonMasterMemo = ko.observable();
                                    var self = this;
                                    self.commonMasterId(param.commonMasterId);
                                    self.commonMasterCode(param.commonMasterCode);
                                    self.commonMasterName(param.commonMasterName);
                                    self.commonMasterMemo(param.commonMasterMemo);
                                }
                                CommonMaster.prototype.updateData = function (data) {
                                    var self = this;
                                    self.commonMasterCode(data.commonMasterCode);
                                    self.commonMasterName(data.commonMasterName);
                                    self.commonMasterMemo(data.commonMasterMemo);
                                };
                                return CommonMaster;
                            }());
                        })(viewmodel = b.viewmodel || (b.viewmodel = {}));
                    })(b = cmm022.b || (cmm022.b = {}));
                })(cmm022 = view.cmm022 || (view.cmm022 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm022.b.vm.js.map