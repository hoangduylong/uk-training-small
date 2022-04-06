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
                    var c;
                    (function (c) {
                        var viewmodel;
                        (function (viewmodel) {
                            var blockUI = nts.uk.ui.block;
                            var getShared = nts.uk.ui.windows.getShared;
                            var setShared = nts.uk.ui.windows.setShared;
                            var dialog = nts.uk.ui.dialog;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    // list data de bind vao iggrid
                                    this.listMaster = ko.observableArray([]);
                                    // data gui ve man A
                                    this.setData = ko.observable();
                                    this.defaultItem = {
                                        commonMasterId: null,
                                        commonMasterCode: '',
                                        commonMasterName: '',
                                        commonMasterMemo: '',
                                    };
                                    // ma code cua item dang duoc select trong iggrid
                                    this.masterSelected = ko.observable(new CommonMaster(this.defaultItem));
                                    var self = this;
                                    self.masterSelected().commonMasterId.subscribe(function (id) {
                                        self.masterSelected().updateData(_.filter(self.listMaster(), ['commonMasterId', id])[0]);
                                    });
                                    setTimeout(function () {
                                        $(window).resize(function () {
                                            $("#multi-list").igGrid("option", "height", (window.innerHeight - 175) + "px");
                                            $("#height-panel").height(window.innerHeight - 125);
                                        });
                                    }, 500);
                                }
                                /**
                                 * start page
                                 */
                                ScreenModel.prototype.start_page = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    var shared = getShared('listMasterToC');
                                    _.sortBy(shared.commonMasters, ['commonMasterCode']);
                                    self.listMaster(shared.commonMasters);
                                    self.masterSelected().commonMasterId(shared.commonMasterId);
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.register = function () {
                                    var self = this, param = ko.mapping.toJS(self);
                                    blockUI.grayout();
                                    c.service.update(param).done(function (data) {
                                        c.service.getListMaster().done(function (data) {
                                            self.listMaster(data);
                                            self.setData({
                                                commonMasterId: self.masterSelected(),
                                                masterList: self.listMaster(),
                                                itemList: []
                                            });
                                            setShared('DialogCToMaster', self.setData());
                                            nts.uk.ui.dialog.info({ messageId: "Msg_15" });
                                        });
                                    }).fail(function (err) {
                                        dialog.bundledErrors(err);
                                    }).always(function () {
                                        blockUI.clear();
                                    });
                                };
                                // close dialog
                                ScreenModel.prototype.closeDialog = function () {
                                    var self = this;
                                    setShared('DialogCToMaster', {
                                        masterList: self.listMaster(),
                                        commonMasterId: self.masterSelected().commonMasterId()
                                    });
                                    nts.uk.ui.windows.close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
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
                                CommonMaster.prototype.updateData = function (param) {
                                    var self = this;
                                    self.commonMasterCode(param.commonMasterCode);
                                    self.commonMasterName(param.commonMasterName);
                                    self.commonMasterMemo(param.commonMasterMemo);
                                };
                                return CommonMaster;
                            }());
                        })(viewmodel = c.viewmodel || (c.viewmodel = {}));
                    })(c = cmm022.c || (cmm022.c = {}));
                })(cmm022 = view.cmm022 || (view.cmm022 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm022.c.vm.js.map