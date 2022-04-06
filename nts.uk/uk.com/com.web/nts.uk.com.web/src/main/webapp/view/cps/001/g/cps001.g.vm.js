var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps001;
                (function (cps001) {
                    var g;
                    (function (g) {
                        var vm;
                        (function (vm) {
                            var getText = nts.uk.resource.getText;
                            var info = nts.uk.ui.dialog.info;
                            var block = nts.uk.ui.block.grayout;
                            var unblock = nts.uk.ui.block.clear;
                            var clearError = nts.uk.ui.errors.clearAll;
                            var getShared = nts.uk.ui.windows.getShared;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.currentValue = ko.observable('');
                                    this.alllist = ko.observableArray([]);
                                    this.listAnnualLeaveGrantRemainData = ko.observableArray([]);
                                    this.currentItem = ko.observable(new AnnualLeaveGrantRemainingData({}));
                                    //
                                    this.nameDateGrantInp = ko.observable('');
                                    this.nameDeadlineDateInp = ko.observable('');
                                    this.nameDayNumberOfGrant = ko.observable('');
                                    this.namegrantTime = ko.observable('');
                                    this.nameDayNumberOfUse = ko.observable('');
                                    this.nameUseTime = ko.observable('');
                                    this.nameDayNumberOfRemain = ko.observable('');
                                    this.nameTimeReam = ko.observable('');
                                    this.nameExpiredAnnualLeave = ko.observable('');
                                    this.nameAnnualUseStatus = ko.observable('');
                                    this.itemDefs = [];
                                    this.sid = ko.observable(null);
                                    var _self = this, data = getShared('CPS001GHI_VALUES');
                                    _self.sid(data.sid);
                                    _self.createMode = ko.observable(null);
                                    _self.checked = ko.observable(false);
                                    _self.listExpirationStatus = ko.observableArray([
                                        { code: EXPIRED_STATUS.AVAILABLE, name: '使用可能' },
                                        { code: EXPIRED_STATUS.EXPIRED, name: '期限切れ' }
                                    ]);
                                    // Subsribe table
                                    _self.currentValue.subscribe(function (value) {
                                        if (value) {
                                            clearError();
                                            _self.createMode(false);
                                            g.service.getDetail(value).done(function (result) {
                                                if (result) {
                                                    var x = result;
                                                    if (x.grantMinutes == null)
                                                        x.grantMinutes = 0;
                                                    if (x.usedMinutes == null)
                                                        x.usedMinutes = 0;
                                                    if (x.remainingMinutes == null)
                                                        x.remainingMinutes = 0;
                                                    _self.currentItem(new AnnualLeaveGrantRemainingData(x));
                                                    _self.loadItemDef();
                                                }
                                                clearError();
                                                $('#idGrantDate').focus();
                                            });
                                        }
                                    });
                                    // Subscribe checkbox
                                    _self.checked.subscribe(function (value) {
                                        _self.changeFollowExpSta(value);
                                        if (_self.listAnnualLeaveGrantRemainData().length) {
                                            _self.createMode(false);
                                            // Set focus
                                            var index = _.findIndex(_self.listAnnualLeaveGrantRemainData(), function (item) { return item.annLeavID == _self.currentValue(); });
                                            if (index == -1) {
                                                _self.currentValue(_self.listAnnualLeaveGrantRemainData()[0].annLeavID);
                                            }
                                        }
                                        else {
                                            _self.create();
                                        }
                                        $('#idGrantDate').focus();
                                    });
                                }
                                /**
                                 * Run after page loaded
                                 */
                                ScreenModel.prototype.startPage = function (annID) {
                                    var _self = this;
                                    block();
                                    _self.getItemDef().done(function () {
                                        _self.alllist.removeAll();
                                        _self.listAnnualLeaveGrantRemainData.removeAll();
                                        g.service.getAllList(_self.sid()).done(function (data) {
                                            if (data && data.length > 0) {
                                                // Set to update mode
                                                _self.createMode(false);
                                                _self.alllist(data);
                                                _self.changeFollowExpSta(_self.checked());
                                                var currentIndex = _.findIndex(_self.listAnnualLeaveGrantRemainData(), function (item) {
                                                    return item.annLeavID == annID;
                                                });
                                                // Set focus
                                                if (annID && currentIndex > 0) {
                                                    _self.currentValue(annID);
                                                }
                                                else if (_self.listAnnualLeaveGrantRemainData().length > 0) {
                                                    _self.currentValue(_self.listAnnualLeaveGrantRemainData()[0].annLeavID);
                                                }
                                                else {
                                                    _self.create();
                                                }
                                            }
                                            else {
                                                // Set to cr eate mode
                                                _self.create();
                                            }
                                            unblock();
                                        }).fail(function (_data) {
                                            unblock();
                                        });
                                    });
                                };
                                ScreenModel.prototype.changeFollowExpSta = function (value) {
                                    var _self = this;
                                    if (value) {
                                        _self.listAnnualLeaveGrantRemainData(_self.alllist());
                                    }
                                    else {
                                        _self.listAnnualLeaveGrantRemainData(_.filter(_self.alllist(), function (item) {
                                            return item.expirationStatus === EXPIRED_STATUS.AVAILABLE;
                                        }));
                                    }
                                };
                                ScreenModel.prototype.loadItemDef = function () {
                                    var _self = this;
                                    if (_self.itemDefs.length > 0) {
                                        _self.setItemDefValue(_self.itemDefs);
                                    }
                                };
                                ScreenModel.prototype.getItemDef = function () {
                                    var self = this, dfd = $.Deferred();
                                    if (self.itemDefs.length > 0) {
                                        self.setItemDefValue(self.itemDefs);
                                        dfd.resolve();
                                    }
                                    else {
                                        g.service.getItemDef().done(function (data) {
                                            if (!data[6].display && !data[9].display && !data[12].display) {
                                                var currentDialog = nts.uk.ui.windows.getSelf();
                                                currentDialog.$dialog.dialog('option', 'width', 595);
                                            }
                                            self.itemDefs = data;
                                            self.setItemDefValue(data).done(function () {
                                                self.setGridList();
                                            });
                                            dfd.resolve();
                                        });
                                    }
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.setItemDefValue = function (data) {
                                    var self = this, dfd = $.Deferred();
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
                                                    if (!['IS00385', 'IS00386', 'IS00387', 'IS00388'].includes(itemDef.itemCode)) {
                                                        if (itemDef.display) {
                                                            $(_this).children().first().html("<label>" + itemDef.itemName + "</label>");
                                                        }
                                                        else {
                                                            $(_this).parent().css("display", "none");
                                                        }
                                                    }
                                                    var timeType = itemCodeArray_1[itemCodeArray_1.length - 1];
                                                    switch (timeType) {
                                                        case "IS00385":
                                                            self.nameDateGrantInp(itemDef.itemName);
                                                            break;
                                                        case "IS00386":
                                                            self.nameDeadlineDateInp(itemDef.itemName);
                                                            break;
                                                        case "IS00387":
                                                            self.nameExpiredAnnualLeave(itemDef.itemName);
                                                            break;
                                                        case "IS00388":
                                                            self.nameAnnualUseStatus(itemDef.itemName);
                                                            break;
                                                        case "IS00390":
                                                            self.nameDayNumberOfGrant(itemDef.itemName);
                                                            break;
                                                        case "IS00393":
                                                            self.nameDayNumberOfUse(itemDef.itemName);
                                                            break;
                                                        case "IS00396":
                                                            self.nameDayNumberOfRemain(itemDef.itemName);
                                                            break;
                                                        case "grantMinutes":
                                                            self.grantMinutesH = ko.observable(!itemDef.display);
                                                            self.namegrantTime(itemDef.itemName);
                                                            break;
                                                        case "usedMinutes":
                                                            self.usedMinutesH = ko.observable(!itemDef.display);
                                                            self.nameUseTime(itemDef.itemName);
                                                            break;
                                                        case "remainingMinutes":
                                                            self.remainingMinutesH = ko.observable(!itemDef.display);
                                                            self.nameTimeReam(itemDef.itemName);
                                                            break;
                                                    }
                                                }
                                            });
                                        }
                                        dfd.resolve();
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.setGridList = function () {
                                    var self = this;
                                    self.columns = ko.observableArray([
                                        { type: 'string', key: 'annLeavID', hidden: true },
                                        { headerText: getText('CPS001_118'), type: 'date', key: 'grantDate', width: 100 },
                                        { headerText: getText('CPS001_119'), type: 'date', key: 'deadline', width: 100 },
                                        { headerText: getText('CPS001_120'), formatter: formatDate, key: 'grantDays', width: 80 },
                                        { headerText: getText('CPS001_128'), key: 'grantMinutes', formatter: formatTime, width: 80, hidden: self.grantMinutesH() },
                                        { headerText: getText('CPS001_121'), formatter: formatDate, key: 'usedDays', width: 80 },
                                        { headerText: getText('CPS001_122'), key: 'usedMinutes', formatter: formatTime, width: 80, hidden: self.usedMinutesH() },
                                        { headerText: getText('CPS001_123'), formatter: formatDate, key: 'remainingDays', width: 80 },
                                        { headerText: getText('CPS001_124'), key: 'remainingMinutes', formatter: formatTime, width: 100, hidden: self.remainingMinutesH() },
                                        { headerText: getText('CPS001_129'), formatter: formatEnum, key: 'expirationStatus', width: 100 }
                                    ]);
                                    var table = '<table tabindex="6" id="single-list" data-bind="ntsGridList: { dataSource: listAnnualLeaveGrantRemainData,  primaryKey: \'annLeavID\', columns: columns, multiple: false,value: currentValue, rows:10}"></table>';
                                    $("#tbl").html(table);
                                    ko.applyBindings(self, $("#tbl")[0]);
                                };
                                ScreenModel.prototype.create = function () {
                                    var _self = this;
                                    _self.createMode(true);
                                    _self.currentItem(new AnnualLeaveGrantRemainingData({
                                        expirationStatus: EXPIRED_STATUS.AVAILABLE
                                    }));
                                    _self.loadItemDef();
                                    _self.currentValue('');
                                    $('#idGrantDate').focus();
                                    clearError();
                                };
                                /**
                                 * Save sequence
                                 */
                                ScreenModel.prototype.save = function () {
                                    var _self = this, command = ko.toJS(_self.currentItem());
                                    $("#grantDate").trigger("validate");
                                    $("#deadline").trigger("validate");
                                    $("#grantDays").trigger("validate");
                                    $("#usedDays").trigger("validate");
                                    $("#remainingDays").trigger("validate");
                                    if (nts.uk.ui.errors.hasError()) {
                                        return;
                                    }
                                    block();
                                    if (_self.createMode()) {
                                        g.service.add(command).done(function (data) {
                                            info({ messageId: "Msg_15" }).then(function () {
                                                _self.startPage(data[0]);
                                            });
                                            unblock();
                                        }).fail(function (res) {
                                            if (res.messageId == 'Msg_1023') {
                                                $('#idGrantDate').ntsError('set', { messageId: res.messageId });
                                            }
                                            else if (res.messageId == 'Msg_1456') {
                                                nts.uk.ui.dialog.alertError({ messageId: res.messageId });
                                            }
                                            unblock();
                                        });
                                    }
                                    else {
                                        g.service.update(command).done(function (data) {
                                            info({ messageId: "Msg_15" }).then(function () {
                                                _self.startPage(ko.toJS(_self.currentItem()).annLeavID);
                                            });
                                            unblock();
                                        }).fail(function (res) {
                                            if (res.messageId == 'Msg_1456') {
                                                nts.uk.ui.dialog.alertError({ messageId: res.messageId });
                                            }
                                            else if (res.messageId != 'Msg_1023') {
                                                $('#idGrantDate').ntsError('set', { messageId: res.messageId });
                                            }
                                            unblock();
                                        });
                                    }
                                };
                                /**
                                 * Close this dialog
                                 */
                                ScreenModel.prototype.close = function () {
                                    nts.uk.ui.windows.close();
                                };
                                /**
                                 * Remove sequence
                                 */
                                ScreenModel.prototype.remove = function () {
                                    var _self = this, currentIndex = _.findIndex(_self.listAnnualLeaveGrantRemainData(), function (item) {
                                        return item.annLeavID == ko.toJS(_self.currentItem()).annLeavID;
                                    }), finalIndex = _self.listAnnualLeaveGrantRemainData().length - 1;
                                    if (nts.uk.ui.errors.hasError()) {
                                        return;
                                    }
                                    nts.uk.ui.dialog.confirm({ messageId: "Msg_18" })
                                        .ifYes(function () {
                                        block();
                                        var command = {
                                            annLeavID: ko.toJS(_self.currentItem()).annLeavID,
                                            employeeId: _self.sid(),
                                            grantDate: ko.toJS(_self.currentItem()).grantDate
                                        };
                                        g.service.deleteLeav(command).done(function (message) {
                                            info({ messageId: "Msg_16" }).then(function () {
                                                // set focus
                                                if (currentIndex === 0 && currentIndex === finalIndex) {
                                                    _self.create();
                                                }
                                                else if (currentIndex !== 0 && currentIndex === finalIndex) {
                                                    currentIndex = currentIndex - 1;
                                                }
                                                else {
                                                    currentIndex = currentIndex + 1;
                                                }
                                                _self.startPage(_self.listAnnualLeaveGrantRemainData()[currentIndex].annLeavID);
                                            });
                                            unblock();
                                        }).fail(function (error) {
                                            unblock();
                                        });
                                    }).ifNo(function () {
                                        // Nothing happen
                                    });
                                };
                                return ScreenModel;
                            }());
                            vm.ScreenModel = ScreenModel;
                            var AnnualLeaveGrantRemainingData = /** @class */ (function () {
                                function AnnualLeaveGrantRemainingData(param) {
                                    this.annLeavID = ko.observable(null);
                                    this.employeeId = ko.observable(null);
                                    this.grantDate = ko.observable(null);
                                    this.deadline = ko.observable(null);
                                    this.expirationStatus = ko.observable(null);
                                    this.grantDays = ko.observable(null);
                                    this.grantMinutes = ko.observable(null);
                                    this.usedDays = ko.observable(null);
                                    this.usedMinutes = ko.observable(null);
                                    this.remainingDays = ko.observable(null);
                                    this.remainingMinutes = ko.observable(null);
                                    var self = this, data = getShared('CPS001GHI_VALUES');
                                    if (param) {
                                        self.annLeavID(param.annLeavID || null);
                                        self.grantDate(moment.utc(param.grantDate, "YYYY/MM/DD"));
                                        self.deadline(moment.utc(param.deadline, "YYYY/MM/DD"));
                                        self.expirationStatus(param.expirationStatus);
                                        self.grantDays(param.grantDays);
                                        self.grantMinutes(param.grantMinutes);
                                        self.usedDays(param.usedDays);
                                        self.usedMinutes(param.usedMinutes);
                                        self.remainingDays(param.remainingDays);
                                        self.remainingMinutes(param.remainingMinutes);
                                        self.employeeId(data.sid);
                                    }
                                    // Subcribe grantDate
                                    self.grantDate.subscribe(function (value) {
                                        if (value && __viewContext.viewModel.createMode()) {
                                            if (nts.uk.ui.errors.hasError()) {
                                                return;
                                            }
                                            g.service.lostFocus(value).done(function (data) {
                                                if (data) {
                                                    self.deadline(moment.utc(data, "YYYY/MM/DD"));
                                                }
                                            });
                                        }
                                    });
                                }
                                return AnnualLeaveGrantRemainingData;
                            }());
                            vm.AnnualLeaveGrantRemainingData = AnnualLeaveGrantRemainingData;
                            var EXPIRED_STATUS;
                            (function (EXPIRED_STATUS) {
                                EXPIRED_STATUS[EXPIRED_STATUS["AVAILABLE"] = 1] = "AVAILABLE";
                                EXPIRED_STATUS[EXPIRED_STATUS["EXPIRED"] = 0] = "EXPIRED";
                            })(EXPIRED_STATUS || (EXPIRED_STATUS = {}));
                            function formatTime(value, row) {
                                if (value) {
                                    var hour = Math.floor(Math.abs(value) / 60);
                                    var minutes = Math.floor(Math.abs(value) % 60);
                                    var result = hour + ':' + (minutes < 10 ? ("0" + minutes) : minutes);
                                    return value >= 0 ? "&nbsp;" + result : '-' + result;
                                }
                                else {
                                    return "&nbsp;0:00";
                                }
                            }
                            function formatDate(value, row) {
                                if (value) {
                                    return value >= 0 ? "&nbsp;" + value + '日' : value + '日';
                                }
                                else {
                                    return "&nbsp;0日";
                                }
                            }
                            function formatEnum(value, row) {
                                if (value && value === EXPIRED_STATUS.AVAILABLE.toString()) {
                                    return '使用可能';
                                }
                                else if (value && value === EXPIRED_STATUS.EXPIRED.toString()) {
                                    return '期限切れ';
                                }
                            }
                        })(vm = g.vm || (g.vm = {}));
                    })(g = cps001.g || (cps001.g = {}));
                })(cps001 = view.cps001 || (view.cps001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps001.g.vm.js.map