var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm023;
                (function (cmm023) {
                    var a;
                    (function (a) {
                        var viewmodel;
                        (function (viewmodel) {
                            var alert = nts.uk.ui.dialog.alert;
                            var getText = nts.uk.resource.getText;
                            var info = nts.uk.ui.dialog.info;
                            var block = nts.uk.ui.block;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.commonMasterId = ko.observable();
                                    this.selectedCommonMaster = ko.observable();
                                    this.master = ko.observableArray([]);
                                    this.items = ko.observableArray([]);
                                    this.masterColumn = ko.observableArray([
                                        { headerText: getText('CMM023_A221_5'), key: 'commonMasterId', width: 100, hidden: true },
                                        { headerText: getText('CMM023_A221_6'), key: 'commonMasterCode', width: 80 },
                                        { headerText: getText('CMM023_A221_7'), key: 'commonMasterName', width: 160 },
                                        { headerText: getText('CMM023_A221_8'), key: 'commonMasterMemo', width: 160 },
                                    ]);
                                    var self = this;
                                    block.grayout();
                                    self.commonMasterId.subscribe(function (commonMasterId) {
                                        self.selectedCommonMaster(_.find(self.master(), ['commonMasterId', commonMasterId]));
                                        block.grayout();
                                        a.service.getItems({ commonMasterId: commonMasterId }).done(function (data) {
                                            block.clear();
                                            self.items(_.map(data, function (x) { return new GroupCommonItem(x); }));
                                            if ($("#item-list").data("igGrid")) {
                                                $("#item-list").ntsGrid("destroy");
                                            }
                                            $("#item-list").ntsGrid({
                                                width: '590px',
                                                height: '375px',
                                                dataSource: self.items(),
                                                primaryKey: 'commonMasterItemId',
                                                rowVirtualization: true,
                                                virtualization: true,
                                                virtualizationMode: 'continuous',
                                                columns: [
                                                    { headerText: getText('CMM023_A222_5'), key: 'commonMasterItemId', dataType: 'text', width: '80px', hidden: true },
                                                    { headerText: getText('CMM023_A222_6'), key: 'commonMasterItemCode', dataType: 'text', width: '80px' },
                                                    { headerText: getText('CMM023_A222_7'), key: 'commonMasterItemName', dataType: 'text', width: '180px' },
                                                    { headerText: getText('CMM023_A222_8'), key: 'useSetting', dataType: 'boolean', width: '70px', ntsControl: 'Checkbox' },
                                                    { headerText: getText('CMM023_A222_9'), key: 'usageStartDate', dataType: 'text', width: '260px', formatter: genDate },
                                                    { headerText: getText('CMM023_A222_9'), key: 'usageEndDate', dataType: 'text', width: '250px', hidden: true },
                                                ],
                                                ntsControls: [
                                                    { name: 'Checkbox', options: { value: 1, text: '' }, optionsValue: 'value', optionsText: 'text', controlType: 'CheckBox', enable: true }
                                                ],
                                                features: []
                                            });
                                            if (_.isEmpty(data) && commonMasterId) {
                                                alert({ messageId: "Msg_672" });
                                            }
                                        }).fail(function (res) {
                                            block.clear();
                                            alert(res);
                                        });
                                    });
                                }
                                ScreenModel.prototype.selectedInfo = function () {
                                    var self = this;
                                    if (!self.commonMasterId()) {
                                        return '';
                                    }
                                    var selectedCommonMaster = _.find(self.master(), ['commonMasterId', self.commonMasterId()]);
                                    return selectedCommonMaster.commonMasterCode + ' ' + selectedCommonMaster.commonMasterName;
                                };
                                ScreenModel.prototype.startPage = function () {
                                    var self = this, dfd = $.Deferred();
                                    block.grayout();
                                    a.service.getMaster().done(function (data) {
                                        block.clear();
                                        self.master(data);
                                        self.commonMasterId(data[0] ? data[0].commonMasterId : null);
                                    }).fail(function (res) {
                                        block.clear();
                                        alert(res);
                                    }).always(function () { return dfd.resolve(); });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.saveData = function () {
                                    var self = this, updatedData = $("#item-list").ntsGrid("updatedCells");
                                    _.forEach(updatedData, function (updateItem) {
                                        var item = _.find(self.items(), { 'commonMasterItemId': updateItem.rowId });
                                        if (item) {
                                            item.useSetting = updateItem.value;
                                        }
                                    });
                                    var command = { commonMasterId: self.commonMasterId(), masterItemIds: _.map(_.filter(self.items(), ['useSetting', true]), function (item) { return item.commonMasterItemId; }) };
                                    block.grayout();
                                    a.service.saveMaster(command).done(function () {
                                        block.clear();
                                        info({ messageId: "Msg_15" });
                                    }).fail(function (res) {
                                        block.clear();
                                        alert(res);
                                    });
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var GroupCommonItem = /** @class */ (function () {
                                function GroupCommonItem(data) {
                                    var self = this;
                                    self.commonMasterItemId = data.commonMasterItemId;
                                    self.commonMasterItemCode = data.commonMasterItemCode;
                                    self.commonMasterItemName = data.commonMasterItemName;
                                    self.useSetting = data ? data.useSetting == 1 ? true : false : false;
                                    self.usageStartDate = data.usageStartDate;
                                    self.usageEndDate = data.usageEndDate;
                                }
                                return GroupCommonItem;
                            }());
                            viewmodel.GroupCommonItem = GroupCommonItem;
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = cmm023.a || (cmm023.a = {}));
                })(cmm023 = view.cmm023 || (view.cmm023 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
function genDate(value, row) {
    return row.usageStartDate + nts.uk.resource.getText('CMM023_A222_16') + row.usageEndDate;
}
//# sourceMappingURL=cmm023.a.vm.js.map