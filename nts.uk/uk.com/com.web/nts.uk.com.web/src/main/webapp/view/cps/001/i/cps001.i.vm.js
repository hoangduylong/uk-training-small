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
                    var i;
                    (function (i) {
                        var vm;
                        (function (vm) {
                            var getShared = nts.uk.ui.windows.getShared;
                            var clearError = nts.uk.ui.errors.clearAll;
                            var __viewContext = window['__viewContext'] || {}, block = window["nts"]["uk"]["ui"]["block"]["grayout"], unblock = window["nts"]["uk"]["ui"]["block"]["clear"], invisible = window["nts"]["uk"]["ui"]["block"]["invisible"];
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var _this = this;
                                    this.enbbtnNewmode = ko.observable(true);
                                    this.enbbtnDelete = ko.observable(true);
                                    this.checked = ko.observable(false);
                                    // list data
                                    this.listData = ko.observableArray([]);
                                    this.listFullData = ko.observableArray([]);
                                    this.currentValue = ko.observable();
                                    //grant
                                    this.grantDateTitle = ko.observable(null);
                                    this.dateGrantInp = ko.observable(null);
                                    //exp
                                    this.expDateTitle = ko.observable(null);
                                    this.deadlineDateInp = ko.observable(null);
                                    this.expStateTitle = ko.observable(null);
                                    this.statusOfUse = ko.observable(0);
                                    // grant detail
                                    this.dayNumberOfGrantsTitle = ko.observable(null);
                                    this.dayNumberOfGrants = ko.observable(null);
                                    this.grantTimeTitle = ko.observable(null);
                                    this.grantTime = ko.observable(null);
                                    //  use detail
                                    this.dayNumberOfUseTitle = ko.observable(null);
                                    this.dayNumberOfUse = ko.observable(null);
                                    this.useTimeTitle = ko.observable(null);
                                    this.useTime = ko.observable(null);
                                    // Over detail
                                    this.dayNumberOverTitle = ko.observable(null);
                                    this.dayNumberOver = ko.observable(null);
                                    this.timeOverTitle = ko.observable(null);
                                    this.timeOver = ko.observable(null);
                                    // Reaming detail
                                    this.dayNumberOfReamTitle = ko.observable(null);
                                    this.dayNumberOfReam = ko.observable(null);
                                    this.timeReamTitle = ko.observable(null);
                                    this.timeReam = ko.observable(null);
                                    //
                                    this.nameDateGrantInp = ko.observable('');
                                    this.nameDeadlineDateInp = ko.observable('');
                                    this.nameDayNumberOfGrant = ko.observable(null);
                                    this.namegrantTime = ko.observable(null);
                                    this.nameDayNumberOfUse = ko.observable(null);
                                    this.nameUseTime = ko.observable(null);
                                    this.nameDayNumberOver = ko.observable(null);
                                    this.nameTimeOver = ko.observable(null);
                                    this.nameDayNumberOfRemain = ko.observable(null);
                                    this.nameTimeReam = ko.observable(null);
                                    //data recive from cps001.a
                                    this.categoryCode = ko.observable(null);
                                    this.sid = ko.observable(null);
                                    var self = this, data = getShared('CPS001GHI_VALUES');
                                    self.categoryCode(data.ctgCode);
                                    self.sid(data.sid);
                                    self.expStateTitle = ko.observable('expDateTitle');
                                    self.roundingRules = ko.observableArray([
                                        { code: 1, name: '使用可能' },
                                        { code: 0, name: '期限切れ' }
                                    ]);
                                    self.selectedRuleCode = ko.observable(1);
                                    // Subsribe table
                                    self.currentValue.subscribe(function (value) {
                                        if (value) {
                                            i.service.getDetail(value).done(function (result) {
                                                if (result) {
                                                    self.bindingData(result);
                                                    $("#idDateGrantInp").focus();
                                                }
                                            });
                                        }
                                        self.activeBtn();
                                        clearError();
                                    });
                                    // Subscribe checkbox
                                    self.checked.subscribe(function (value) {
                                        var self = _this;
                                        self.activeBtn();
                                        clearError();
                                        block();
                                        self.loadData().done(function () {
                                            if (self.listData().length > 0) {
                                                if (value) {
                                                    self.listData(self.convertData(self.listFullData()));
                                                    //self.currentValue(self.listData()[0].specialid);
                                                }
                                                else {
                                                    self.listData(self.convertData(_.filter(self.listFullData(), function (item) {
                                                        return item.expStatus == 1;
                                                    })));
                                                }
                                                // Set focus
                                                var index = _.findIndex(self.listData(), function (item) { return item.specialid == self.currentValue(); });
                                                if (index == -1) {
                                                    self.currentValue(self.listData()[0].specialid);
                                                }
                                            }
                                            else {
                                                self.newMode();
                                            }
                                            unblock();
                                            clearError();
                                        });
                                        $("#idDateGrantInp").focus();
                                    });
                                    self.deadlineDateInp.subscribe(function (value) {
                                        var self = _this, grantDate = moment.utc(self.dateGrantInp(), "YYYY/MM/DD"), deadline = moment.utc(self.deadlineDateInp(), "YYYY/MM/DD");
                                        if (((new Date(deadline._d)) > (new Date(grantDate._d)))) {
                                            var checkValiGrantDate = moment(grantDate._i, "YYYY/MM/DD", undefined, true);
                                            if (($('#idDateGrantInp').ntsError('check')) && checkValiGrantDate.isValid()) {
                                                $('#idDateGrantInp').ntsError('clear');
                                            }
                                        }
                                    });
                                }
                                ScreenModel.prototype.loadData = function () {
                                    var self = this, dfd = $.Deferred();
                                    var ctgCode = self.genSpecialCode(self.categoryCode());
                                    i.service.getAllList(self.sid(), ctgCode.specialCode).done(function (data) {
                                        if (data && data.length > 0) {
                                            self.listFullData(data);
                                            if (self.checked()) {
                                                self.listData(self.convertData(_.filter(self.listFullData(), function (item) {
                                                    return item;
                                                })));
                                            }
                                            else {
                                                self.listData(self.convertData(_.filter(self.listFullData(), function (item) {
                                                    return item.expStatus == 1;
                                                })));
                                            }
                                            if (self.listData().length > 0) {
                                                // Set focus
                                                //self.currentValue(self.listData()[index].specialid);
                                            }
                                            else {
                                                self.newMode();
                                            }
                                        }
                                        else {
                                            self.listData([]);
                                            self.newMode();
                                        }
                                        dfd.resolve();
                                        unblock();
                                    }).fail(function (_data) {
                                        unblock();
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    block();
                                    self.getItemDef();
                                    self.loadData().done(function () {
                                        if (self.listData().length > 0) {
                                            self.currentValue(self.listData()[0].specialid);
                                        }
                                        else {
                                            self.newMode();
                                        }
                                        clearError();
                                    });
                                };
                                /**
                                * Convert data to new array.
                                */
                                ScreenModel.prototype.convertData = function (dataList) {
                                    var self = this, res = _.map(dataList, function (item) {
                                        return {
                                            specialid: item.specialid, sid: item.sid, specialLeaCode: item.specialLeaCode,
                                            grantDate: item.grantDate, deadlineDate: item.deadlineDate,
                                            expStatus: self.formatEnum(item.expStatus), registerType: item.registerType,
                                            numberDayGrant: self.formatDate(item.numberDayGrant), timeGrant: self.formatTime(item.timeGrant),
                                            numberDayUse: self.formatDate(item.numberDayUse), timeUse: self.formatTime(item.timeUse),
                                            numberDaysOver: self.formatDate(item.numberDaysOver), timeOver: self.formatTime(item.timeOver),
                                            numberDayRemain: self.formatDate(item.numberDayRemain), timeRemain: self.formatTime(item.timeRemain)
                                        };
                                    });
                                    return res;
                                };
                                ScreenModel.prototype.newMode = function () {
                                    var self = this;
                                    self.currentValue(null);
                                    self.enbbtnNewmode(false);
                                    self.enbbtnDelete(false);
                                    self.dateGrantInp(null);
                                    self.deadlineDateInp(null);
                                    self.dayNumberOfGrants(null);
                                    self.grantTime(null);
                                    self.dayNumberOfUse(null);
                                    self.useTime(null);
                                    self.dayNumberOfReam(null);
                                    self.timeReam(null);
                                    self.dayNumberOver(null);
                                    self.timeOver(null);
                                    self.selectedRuleCode(1);
                                    $("#idDateGrantInp").focus();
                                    nts.uk.ui.errors.clearAll();
                                };
                                ScreenModel.prototype.Save = function () {
                                    var self = this, grantDate = moment.utc(self.dateGrantInp(), "YYYY/MM/DD"), deadline = moment.utc(self.deadlineDateInp(), "YYYY/MM/DD"), ctgCode = self.genSpecialCode(self.categoryCode());
                                    $("#idDateGrantInp").trigger("validate");
                                    $("#idDeadline").trigger("validate");
                                    $("#dayNumberOfGrants").trigger("validate");
                                    $("#dayNumberOfUse").trigger("validate");
                                    $("#dayNumberOver").trigger("validate");
                                    $("#dayNumberOfReam").trigger("validate");
                                    if ((new Date(deadline._d)) < (new Date(grantDate._d))) {
                                        $('#idDateGrantInp').ntsError('set', { messageId: "Msg_1023" });
                                        return;
                                    }
                                    if (nts.uk.ui.errors.hasError()) {
                                        return;
                                    }
                                    var currentRow = _.find(ko.toJS(self.listData), function (item) { return item.specialid == self.currentValue(); });
                                    //sid = "1B3D3CC4-90FD-4992-9566-12EC72827E4C" || __viewContext.user.employeeId
                                    var command = {
                                        specialid: currentRow == undefined ? null : currentRow.specialid,
                                        sid: self.sid(),
                                        specialLeaCode: ctgCode.specialCode,
                                        grantDate: self.dateGrantInp(), deadlineDate: self.deadlineDateInp(),
                                        expStatus: self.selectedRuleCode(), registerType: null,
                                        numberDayGrant: self.dayNumberOfGrants(), timeGrant: self.grantTime(),
                                        numberDayUse: self.dayNumberOfUse(), timeUse: self.useTime(),
                                        numberDaysOver: self.dayNumberOver(), timeOver: self.timeOver(),
                                        numberDayRemain: self.dayNumberOfReam(), timeRemain: self.timeReam()
                                    };
                                    // call service savedata
                                    block();
                                    var saveItemIndex = _.findIndex(self.listData(), function (item) { return item.specialid == self.currentValue(); });
                                    var ids = _.map(self.listData(), function (x) { return x.specialid; });
                                    i.service.saveData(command).done(function (_data) {
                                        if (command.specialid) {
                                            self.loadData().done(function () {
                                                nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                                                    if (ids.length == self.listData().length) {
                                                        self.currentValue(self.listData()[saveItemIndex].specialid);
                                                    }
                                                    else if ((self.listData().length > 0) && (ids.length != self.listData().length)) {
                                                        self.currentValue(self.listData()[0].specialid);
                                                    }
                                                    clearError();
                                                    $("#idDateGrantInp").focus();
                                                });
                                            });
                                        }
                                        else {
                                            self.loadData().done(function () {
                                                nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                                                    if (self.listData().length > 0) {
                                                        var newItem_1 = _.find(self.listData(), function (x) { return ids.indexOf(x.specialid) == -1; });
                                                        var saveItemIndex_1 = _.findIndex(self.listData(), function (item) { return item.specialid == newItem_1.specialid; });
                                                        self.currentValue(self.listData()[saveItemIndex_1].specialid);
                                                    }
                                                    clearError();
                                                    $("#idDateGrantInp").focus();
                                                });
                                            });
                                        }
                                        clearError();
                                        unblock();
                                    }).fail(function (error) {
                                        nts.uk.ui.dialog.alertError({ messageId: error.messageId });
                                        unblock();
                                    });
                                    self.activeBtn();
                                };
                                ScreenModel.prototype.activeBtn = function () {
                                    var self = this;
                                    self.enbbtnNewmode(true);
                                    self.enbbtnDelete(true);
                                };
                                ScreenModel.prototype.Delete = function () {
                                    var self = this;
                                    if (self.currentValue()) {
                                        nts.uk.ui.dialog.confirm({ messageId: "Msg_18" })
                                            .ifYes(function () {
                                            var delItemIndex = _.findIndex(self.listData(), function (item) { return item.specialid == self.currentValue(); });
                                            var selectedId;
                                            if (delItemIndex == self.listData().length - 1) {
                                                if (self.listData().length > 1) {
                                                    selectedId = self.listData()[delItemIndex - 1].specialid;
                                                }
                                            }
                                            if (delItemIndex == 0) {
                                                selectedId = self.listData()[0].specialid;
                                            }
                                            else {
                                                selectedId = self.listData()[delItemIndex].specialid;
                                            }
                                            var currentRow = _.find(ko.toJS(self.listData), function (item) { return item.specialid == self.currentValue(); });
                                            var itemListLength = self.listData().length;
                                            if (currentRow != undefined) {
                                                var itemListLength_1 = self.listData().length;
                                                i.service.remove(currentRow.specialid).done(function (_data) {
                                                    nts.uk.ui.dialog.info({ messageId: "Msg_16" }).then(function () {
                                                        if (itemListLength_1 === 1) {
                                                            self.loadData().done(function () { });
                                                        }
                                                        else if (itemListLength_1 - 1 === delItemIndex) {
                                                            self.loadData().done(function () {
                                                                self.currentValue(self.listData()[delItemIndex - 1].specialid);
                                                            });
                                                        }
                                                        else if (itemListLength_1 - 1 > delItemIndex) {
                                                            self.loadData().done(function () {
                                                                self.currentValue(self.listData()[delItemIndex].specialid);
                                                            });
                                                        }
                                                    });
                                                }).always(function () {
                                                    unblock();
                                                });
                                            }
                                        }).then(function () {
                                            unblock();
                                        });
                                    }
                                };
                                ScreenModel.prototype.closeDialog = function () {
                                    nts.uk.ui.windows.close();
                                };
                                ScreenModel.prototype.bindingData = function (result) {
                                    var self = this;
                                    self.dateGrantInp(result.grantDate);
                                    self.deadlineDateInp(result.deadlineDate);
                                    self.selectedRuleCode(result.expStatus);
                                    // detail of grant
                                    self.dayNumberOfGrants(result.numberDayGrant);
                                    self.grantTime(result.timeGrant == 0 ? 0 : result.timeGrant);
                                    // detail of Use
                                    self.dayNumberOfUse(result.numberDayUse);
                                    self.useTime(result.timeUse == 0 ? 0 : result.timeUse);
                                    // Exeeded detail
                                    self.dayNumberOver(result.numberDaysOver);
                                    self.timeOver(result.timeOver == 0 ? 0 : result.timeOver);
                                    // Reaming detail
                                    self.dayNumberOfReam(result.numberDayRemain);
                                    self.timeReam(result.timeRemain == 0 ? 0 : result.timeRemain);
                                };
                                ScreenModel.prototype.formatDate = function (value) {
                                    if (value) {
                                        return value >= 0 ? "&nbsp;" + value + '日' : value + '日';
                                    }
                                    else {
                                        return "&nbsp;0日";
                                    }
                                };
                                ScreenModel.prototype.formatEnum = function (value) {
                                    return value == 1 ? '使用可能' : '期限切れ';
                                };
                                ScreenModel.prototype.formatTime = function (value) {
                                    if (value) {
                                        var hour = Math.floor(Math.abs(value) / 60);
                                        var minutes = Math.floor(Math.abs(value) % 60);
                                        var result = hour + ':' + (minutes < 10 ? ("0" + minutes) : minutes);
                                        return value >= 0 ? "&nbsp;" + result : '-' + result;
                                    }
                                    else {
                                        return "&nbsp;0:00";
                                    }
                                };
                                ScreenModel.prototype.getItemDef = function () {
                                    var self = this;
                                    var ctgCode = self.genSpecialCode(self.categoryCode());
                                    i.service.getItemDef(ctgCode.ctgCodeChirld).done(function (data) {
                                        if (!data[6].display && !data[9].display && !data[11].display && !data[14].display) {
                                            var currentDialog = nts.uk.ui.windows.getSelf();
                                            //currentDialog.setWidth(628);
                                            currentDialog.$dialog.dialog('option', 'width', 628);
                                        }
                                        self.setItemDefValue(data).done(function () {
                                            self.setGridList();
                                        });
                                    }).fail(function (data) {
                                        self.setGridList();
                                    });
                                };
                                ScreenModel.prototype.setItemDefValue = function (data) {
                                    var self = this, dfd = $.Deferred();
                                    $("td[data-itemCode]").each(function () {
                                        var _this = this;
                                        var itemCodes = $(this).attr('data-itemcode');
                                        if (itemCodes) {
                                            var itemCodeArray_1 = itemCodes.split(" ");
                                            _.forEach(itemCodeArray_1, function (itemCode) {
                                                var itemDef = _.find(data, function (item) {
                                                    return item.itemCode == itemCode;
                                                });
                                                if (itemDef) {
                                                    if (itemDef.display) {
                                                        $(_this).children().first().html("<label>" + itemDef.itemName + "</label>");
                                                    }
                                                    else {
                                                        $(_this).parent().css("display", "none");
                                                    }
                                                    var timeType = itemCodeArray_1[itemCodeArray_1.length - 1];
                                                    switch (timeType) {
                                                        case "grantDate":
                                                            self.nameDateGrantInp(itemDef.itemName);
                                                            break;
                                                        case "deadlineDate":
                                                            self.nameDeadlineDateInp(itemDef.itemName);
                                                            break;
                                                        case "dayNumberOfGrants":
                                                            self.nameDayNumberOfGrant(itemDef.itemName);
                                                            break;
                                                        case "dayNumberOfUse":
                                                            self.nameDayNumberOfUse(itemDef.itemName);
                                                            break;
                                                        case "dayNumberOver":
                                                            self.nameDayNumberOver(itemDef.itemName);
                                                            break;
                                                        case "dayNumberOfReam":
                                                            self.nameDayNumberOfRemain(itemDef.itemName);
                                                            break;
                                                        case "grantTime":
                                                            self.grantTimeH = ko.observable(!itemDef.display);
                                                            self.namegrantTime(itemDef.itemName);
                                                            break;
                                                        case "useTime":
                                                            self.useTimeH = ko.observable(!itemDef.display);
                                                            self.nameUseTime(itemDef.itemName);
                                                            break;
                                                        case "timeOver":
                                                            self.timeExeededH = ko.observable(!itemDef.display);
                                                            self.nameTimeOver(itemDef.itemName);
                                                            break;
                                                        case "timeReam":
                                                            self.timeReamH = ko.observable(!itemDef.display);
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
                                        { headerText: nts.uk.resource.getText('CPS001_118'), key: 'specialid', width: 0 },
                                        { headerText: nts.uk.resource.getText('CPS001_118'), key: 'grantDate', width: 100 },
                                        { headerText: nts.uk.resource.getText('CPS001_119'), key: 'deadlineDate', width: 100 },
                                        { headerText: nts.uk.resource.getText('CPS001_120'), key: 'numberDayGrant', width: 75 },
                                        { headerText: nts.uk.resource.getText('CPS001_128'), key: 'timeGrant', width: 70, hidden: self.grantTimeH() },
                                        { headerText: nts.uk.resource.getText('CPS001_121'), key: 'numberDayUse', width: 75 },
                                        { headerText: nts.uk.resource.getText('CPS001_122'), key: 'timeUse', width: 70, hidden: self.useTimeH() },
                                        { headerText: nts.uk.resource.getText('CPS001_130'), key: 'numberDaysOver', width: 75 },
                                        { headerText: nts.uk.resource.getText('CPS001_131'), key: 'timeOver', width: 70, hidden: self.timeExeededH() },
                                        { headerText: nts.uk.resource.getText('CPS001_123'), key: 'numberDayRemain', width: 75 },
                                        { headerText: nts.uk.resource.getText('CPS001_149'), key: 'timeRemain', width: 70, hidden: self.timeReamH() },
                                        { headerText: nts.uk.resource.getText('CPS001_129'), key: 'expStatus', width: 90 }
                                    ]);
                                    var table = '<table tabindex="5" id="sel_item_grid" data-bind="ntsGridList: { height: 282, options: listData, primaryKey:\'specialid\',columns:columns,multiple: false, value: currentValue , rows :10 }"></table>';
                                    $("#tbl").html(table);
                                    ko.applyBindings(self, $("#tbl")[0]);
                                };
                                ScreenModel.prototype.genSpecialCode = function (categoryCode) {
                                    switch (categoryCode) {
                                        case 'CS00025':
                                            return {
                                                specialCode: 1,
                                                ctgCodeChirld: 'CS00039'
                                            };
                                        case 'CS00026':
                                            return {
                                                specialCode: 2,
                                                ctgCodeChirld: 'CS00040'
                                            };
                                        case 'CS00027':
                                            return {
                                                specialCode: 3,
                                                ctgCodeChirld: 'CS00041'
                                            };
                                        case 'CS00028':
                                            return {
                                                specialCode: 4,
                                                ctgCodeChirld: 'CS00042'
                                            };
                                        case 'CS00029':
                                            return {
                                                specialCode: 5,
                                                ctgCodeChirld: 'CS00043'
                                            };
                                        case 'CS00030':
                                            return {
                                                specialCode: 6,
                                                ctgCodeChirld: 'CS00044'
                                            };
                                        case 'CS00031':
                                            return {
                                                specialCode: 7,
                                                ctgCodeChirld: 'CS00045'
                                            };
                                        case 'CS00032':
                                            return {
                                                specialCode: 8,
                                                ctgCodeChirld: 'CS00046'
                                            };
                                        case 'CS00033':
                                            return {
                                                specialCode: 9,
                                                ctgCodeChirld: 'CS00047'
                                            };
                                        case 'CS00034':
                                            return {
                                                specialCode: 10,
                                                ctgCodeChirld: 'CS00048'
                                            };
                                        case 'CS00049':
                                            return {
                                                specialCode: 11,
                                                ctgCodeChirld: 'CS00059'
                                            };
                                        case 'CS00050':
                                            return {
                                                specialCode: 12,
                                                ctgCodeChirld: 'CS00060'
                                            };
                                        case 'CS00051':
                                            return {
                                                specialCode: 13,
                                                ctgCodeChirld: 'CS00061'
                                            };
                                        case 'CS00052':
                                            return {
                                                specialCode: 14,
                                                ctgCodeChirld: 'CS00062'
                                            };
                                        case 'CS00053':
                                            return {
                                                specialCode: 15,
                                                ctgCodeChirld: 'CS00063'
                                            };
                                        case 'CS00054':
                                            return {
                                                specialCode: 16,
                                                ctgCodeChirld: 'CS00064'
                                            };
                                        case 'CS00055':
                                            return {
                                                specialCode: 17,
                                                ctgCodeChirld: 'CS00065'
                                            };
                                        case 'CS00056':
                                            return {
                                                specialCode: 18,
                                                ctgCodeChirld: 'CS00066'
                                            };
                                        case 'CS00057':
                                            return {
                                                specialCode: 19,
                                                ctgCodeChirld: 'CS00067'
                                            };
                                        case 'CS00058':
                                            return {
                                                specialCode: 20,
                                                ctgCodeChirld: 'CS00068'
                                            };
                                    }
                                };
                                return ScreenModel;
                            }());
                            vm.ScreenModel = ScreenModel;
                            var SpecialLeaveRemaining = /** @class */ (function () {
                                function SpecialLeaveRemaining(data) {
                                    this.specialid = data.specialid;
                                    this.sid = data.sid;
                                    this.specialLeaCode = data.specialLeaCode;
                                    this.grantDate = data.grantDate;
                                    this.deadlineDate = data.deadlineDate;
                                    this.expStatus = data.expStatus;
                                    this.registerType = data.registerType;
                                    this.numberDayGrant = data.numberDayGrant;
                                    this.timeGrant = data.timeGrant + "";
                                    this.numberDayUse = data.numberDayUse;
                                    this.useSavingDays = data.useSavingDays;
                                    this.timeUse = data.timeUse + "";
                                    this.numberOverDays = data.numberDaysOver;
                                    this.timeOver = data.timeOver + "";
                                    this.numberDayRemain = data.numberDayRemain;
                                    this.timeRemain = data.timeRemain + "";
                                }
                                return SpecialLeaveRemaining;
                            }());
                        })(vm = i.vm || (i.vm = {}));
                    })(i = cps001.i || (cps001.i = {}));
                })(cps001 = view.cps001 || (view.cps001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps001.i.vm.js.map