var cps001;
(function (cps001) {
    var h;
    (function (h) {
        var vm;
        (function (vm) {
            var text = nts.uk.resource.getText;
            var close = nts.uk.ui.windows.close;
            var getShared = nts.uk.ui.windows.getShared;
            var clearError = nts.uk.ui.errors.clearAll;
            var __viewContext = window['__viewContext'] || {}, block = window["nts"]["uk"]["ui"]["block"]["grayout"], unblock = window["nts"]["uk"]["ui"]["block"]["clear"], invisible = window["nts"]["uk"]["ui"]["block"]["invisible"];
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                    this.items = ko.observableArray([]);
                    this.currentItem = ko.observable("");
                    this.resvLeaGrantRemNum = ko.observable(new ResvLeaGrantRemNum({}));
                    this.enableRemoveBtn = ko.observable(true);
                    this.isCreate = ko.observable(false);
                    this.ckbAll = ko.observable(false);
                    this.itemDefs = [];
                    this.nameGrantDate = ko.observable(null);
                    this.nameDeadline = ko.observable(null);
                    this.nameOverLimitDays = ko.observable(null);
                    this.sid = ko.observable(null);
                    var self = this, data = getShared('CPS001GHI_VALUES');
                    self.sid(data.sid);
                    self.ckbAll.subscribe(function (data) {
                        h.service.getAll(self.sid(), data).done(function (data) {
                            if (data && data.length > 0) {
                                self.isCreate(false);
                                self.items(data);
                                var index = _.findIndex(self.items(), function (item) { return item.id == self.currentItem(); });
                                if (index == -1) {
                                    self.currentItem(self.items()[0].id);
                                }
                            }
                            else {
                                self.create();
                            }
                            $("#grantDate").focus();
                            clearError();
                        });
                    });
                    self.currentItem.subscribe(function (id) {
                        if (id) {
                            h.service.getByGrantDate(id).done(function (curItem) {
                                self.resvLeaGrantRemNum(new ResvLeaGrantRemNum(curItem));
                                self.setDef();
                                if (curItem) {
                                    self.enableRemoveBtn(true);
                                    self.isCreate(false);
                                }
                                $("#grantDate").focus();
                            });
                        }
                        self.enableRemoveBtn(true);
                        clearError();
                    });
                    self.columns = ko.observableArray([
                        { headerText: "", key: 'id', hidden: true },
                        { headerText: text("CPS001_118"), key: 'grantDate', width: 100, isDateColumn: true, format: 'YYYY/MM/DD' },
                        { headerText: text("CPS001_119"), key: 'deadline', width: 100, isDateColumn: true, format: 'YYYY/MM/DD' },
                        { headerText: text("CPS001_120"), key: 'grantDays', width: 80, formatter: self.formatterDate },
                        { headerText: text("CPS001_121"), key: 'useDays', width: 80, formatter: self.formatterDate },
                        { headerText: text("CPS001_130"), key: 'overLimitDays', width: 80, formatter: self.formatterDate },
                        { headerText: text("CPS001_123"), key: 'remainingDays', width: 80, formatter: self.formatterDate },
                        { headerText: text("CPS001_129"), key: 'expirationStatus', width: 90, formatter: self.formatterExState }
                    ]);
                }
                ViewModel.prototype.create = function () {
                    var self = this;
                    self.items([]);
                    self.currentItem('-1');
                    self.enableRemoveBtn(false);
                    self.isCreate(true);
                    clearError();
                    $("#grantDate").focus();
                };
                ViewModel.prototype.newmode = function () {
                    var self = this;
                    self.currentItem("-1");
                    self.enableRemoveBtn(false);
                    self.isCreate(true);
                    $("#grantDate").focus();
                };
                ViewModel.prototype.load = function () {
                    var self = this, dfd = $.Deferred();
                    h.service.getAll(self.sid(), self.ckbAll()).done(function (data) {
                        if (data && data.length > 0) {
                            self.items(data);
                        }
                        else {
                            self.create();
                        }
                        dfd.resolve();
                    }).fail(function (_data) {
                        dfd.reject();
                        unblock();
                    });
                    return dfd.promise();
                };
                ViewModel.prototype.start = function () {
                    var self = this, dfd = $.Deferred();
                    self.setDef().done(function () {
                        self.load().done(function () {
                            if (self.items().length > 0) {
                                self.isCreate(false);
                                self.currentItem(self.items()[0].id);
                            }
                            dfd.resolve();
                        });
                    });
                    return dfd.promise();
                };
                ViewModel.prototype.setDef = function () {
                    var self = this, dfd = $.Deferred();
                    if (self.itemDefs.length > 0) {
                        self.setItemValue(self.itemDefs);
                        dfd.resolve();
                    }
                    else {
                        h.service.getItemDef().done(function (data) {
                            self.itemDefs = data;
                            self.setItemValue(self.itemDefs);
                            dfd.resolve();
                        });
                    }
                    return dfd.promise();
                };
                ViewModel.prototype.setItemValue = function (data) {
                    var self = this;
                    $("td[data-itemCode]").each(function () {
                        var _this = this;
                        var itemCodes = $(this).attr('data-itemCode');
                        if (itemCodes) {
                            var itemCodeArray_1 = itemCodes.split(" ");
                            _.forEach(itemCodeArray_1, function (itemCode) {
                                var itemDef = _.find(data, function (item) {
                                    return item.itemCode == itemCode;
                                });
                                if (itemDef) {
                                    if (itemDef.display) {
                                        $(_this).children().first().html("<label>" + itemDef.itemName + "</label>");
                                        var timeType = itemCodeArray_1[itemCodeArray_1.length - 1];
                                        switch (timeType) {
                                            case "grantDate":
                                                self.nameGrantDate(itemDef.itemName);
                                                break;
                                            case "deadline":
                                                self.nameDeadline(itemDef.itemName);
                                                break;
                                            case "overLimitDays":
                                                self.nameOverLimitDays(itemDef.itemName);
                                                break;
                                        }
                                    }
                                }
                            });
                        }
                    });
                };
                ViewModel.prototype.close = function () {
                    close();
                };
                ViewModel.prototype.remove = function () {
                    var self = this;
                    if (nts.uk.ui.errors.hasError()) {
                        return;
                    }
                    nts.uk.ui.dialog.confirm({ messageId: "Msg_18" })
                        .ifYes(function () {
                        var delItemIndex = _.findIndex(self.items(), function (item) { return item.id == self.currentItem(); });
                        var selectedId;
                        if (delItemIndex == self.items().length - 1) {
                            if (self.items().length > 1) {
                                selectedId = self.items()[delItemIndex - 1].id;
                            }
                        }
                        if (delItemIndex == 0) {
                            selectedId = self.items()[0].id;
                        }
                        else {
                            selectedId = self.items()[delItemIndex].id;
                        }
                        var currentRow = _.find(ko.toJS(self.items), function (item) { return item.id == self.currentItem(); });
                        var itemListLength = self.items().length;
                        if (currentRow != undefined) {
                            var itemListLength_1 = self.items().length;
                            h.service.remove(currentRow.id).done(function (_data) {
                                nts.uk.ui.dialog.info({ messageId: "Msg_16" }).then(function () {
                                    if (itemListLength_1 === 1) {
                                        self.load().done(function () { });
                                    }
                                    else if (itemListLength_1 - 1 === delItemIndex) {
                                        self.load().done(function () {
                                            self.currentItem(self.items()[delItemIndex - 1].id);
                                        });
                                    }
                                    else if (itemListLength_1 - 1 > delItemIndex) {
                                        self.load().done(function () {
                                            self.currentItem(self.items()[delItemIndex].id);
                                        });
                                    }
                                    $("#grantDate").focus();
                                });
                                clearError();
                                unblock();
                            }).fail(function (error) {
                                unblock();
                            });
                        }
                    }).ifCancel(function () {
                    });
                };
                ViewModel.prototype.register = function () {
                    var self = this;
                    $("#grantDate").trigger("validate");
                    $("#deadline").trigger("validate");
                    $("#grantDays").trigger("validate");
                    $("#useDays").trigger("validate");
                    $("#overLimitDays").trigger("validate");
                    $("#remainingDays").trigger("validate");
                    if (!$(".nts-input").ntsError("hasError")) {
                        var item_1 = self.resvLeaGrantRemNum(), grantDate = moment.utc(item_1.grantDate(), "YYYY/MM/DD"), deadline = moment.utc(item_1.deadline(), "YYYY/MM/DD"), employeeId = self.sid();
                        if ((new Date(deadline._d)) < (new Date(grantDate._d))) {
                            $('#grantDate').ntsError('set', { messageId: "Msg_1023" });
                            return;
                        }
                        if (self.isCreate()) {
                            var currItem = self.items();
                            var ids_1 = _.map(self.items(), function (x) { return x.id; });
                            h.service.create(employeeId, grantDate, deadline, item_1.expirationStatus(), item_1.grantDays(), item_1.useDays(), item_1.overLimitDays(), item_1.remainingDays()).done(function (result) {
                                h.service.getAll(self.sid(), self.ckbAll()).done(function (data) {
                                    self.isCreate(false);
                                    nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                                        if (data && data.length > 0) {
                                            self.items(data);
                                            var newItem_1 = _.find(self.items(), function (x) { return ids_1.indexOf(x.id) == -1; });
                                            if (newItem_1) {
                                                var saveItemIndex = _.findIndex(self.items(), function (item) { return item.id == newItem_1.id; });
                                                self.currentItem(self.items()[saveItemIndex].id);
                                            }
                                            else {
                                                self.currentItem(self.items()[0].id);
                                            }
                                        }
                                        else {
                                            self.create();
                                        }
                                        $("#grantDate").focus();
                                    });
                                    clearError();
                                    unblock();
                                }).fail(function (_data) {
                                    unblock();
                                });
                            }).fail(function (mes) {
                                nts.uk.ui.dialog.alertError({ messageId: mes.messageId });
                                unblock();
                            });
                        }
                        else {
                            var ids_2 = _.map(self.items(), function (x) { return x.id; });
                            h.service.update(item_1.id(), employeeId, grantDate, deadline, item_1.expirationStatus(), item_1.grantDays(), item_1.useDays(), item_1.overLimitDays(), item_1.remainingDays()).done(function () {
                                self.load().done(function () {
                                    nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                                        if (self.items().length > 0 && self.items().length == ids_2.length) {
                                            self.currentItem(item_1.id());
                                        }
                                        else if (self.items().length > 0 && self.items().length != ids_2.length) {
                                            self.currentItem(self.items()[0].id);
                                        }
                                        else if (self.items().length == 0) {
                                            self.create();
                                        }
                                        $("#grantDate").focus();
                                    });
                                    clearError();
                                    unblock();
                                });
                            }).fail(function (mes) {
                                nts.uk.ui.dialog.alertError({ messageId: mes.messageId });
                                unblock();
                            });
                        }
                    }
                };
                ViewModel.prototype.formatterDate = function (value) {
                    if (value) {
                        return value >= 0 ? "&nbsp;" + value + '日' : value + '日';
                    }
                    else {
                        return "&nbsp;0日";
                    }
                };
                ViewModel.prototype.formatterExState = function (value) {
                    if (value == 1) {
                        return "使用可能";
                    }
                    else {
                        return "期限切れ";
                    }
                };
                return ViewModel;
            }());
            vm.ViewModel = ViewModel;
            var ResvLeaGrantRemNum = /** @class */ (function () {
                function ResvLeaGrantRemNum(data) {
                    this.id = ko.observable("");
                    this.grantDate = ko.observable("");
                    this.deadline = ko.observable("");
                    this.expirationStatus = ko.observable(1);
                    this.grantDays = ko.observable("");
                    this.useDays = ko.observable("");
                    this.overLimitDays = ko.observable("");
                    this.remainingDays = ko.observable("");
                    var self = this;
                    self.id(data && data.id);
                    self.grantDate(data && data.grantDate);
                    self.deadline(data && data.deadline);
                    self.expirationStatus(data == undefined ? 1 : (data.expirationStatus == undefined ? 1 : data.expirationStatus));
                    self.grantDays(data && data.grantDays);
                    self.useDays(data && data.useDays);
                    self.overLimitDays(data && data.overLimitDays);
                    self.remainingDays(data && data.remainingDays);
                    self.grantDate.subscribe(function (data) {
                        if (data && __viewContext.viewModel.isCreate()) {
                            if (nts.uk.ui.errors.hasError()) {
                                return;
                            }
                            h.service.generateDeadline(moment.utc(data, "YYYY/MM/DD")).done(function (item) {
                                self.deadline(item);
                            });
                        }
                    });
                }
                return ResvLeaGrantRemNum;
            }());
        })(vm = h.vm || (h.vm = {}));
    })(h = cps001.h || (cps001.h = {}));
})(cps001 || (cps001 = {}));
//# sourceMappingURL=cps001.h.vm.js.map