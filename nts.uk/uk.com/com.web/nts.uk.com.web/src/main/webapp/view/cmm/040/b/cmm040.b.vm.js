var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm040;
                (function (cmm040) {
                    var b;
                    (function (b) {
                        var viewmodel;
                        (function (viewmodel) {
                            var block = nts.uk.ui.block;
                            var errors = nts.uk.ui.errors;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.valueB3_12 = ko.observable(null);
                                    this.workLocationCode = nts.uk.ui.windows.getShared('CMM040B').workLocationCD;
                                    this.workLocationName = nts.uk.ui.windows.getShared('CMM040B').workLocationName;
                                    this.oldValue1 = 9999;
                                    this.oldValue2 = 9999;
                                    this.oldValue3 = 9999;
                                    this.oldValue4 = 9999;
                                    this.oldValue5 = 9999;
                                    this.checkDel = false;
                                    this.listIp = ko.observableArray([]);
                                    var self = this;
                                    self.selectCode = ko.observable("");
                                    self.valueB3_4_ipaddress1 = ko.observable(null);
                                    self.valueB3_6_ipaddress2 = ko.observable(null);
                                    self.valueB3_8_ipaddress3 = ko.observable(null);
                                    self.valueB3_10_ipaddress4 = ko.observable(null);
                                    self.workLocationList = ko.observableArray([]);
                                    self.isCreate = ko.observable(null);
                                    self.columns = ko.observableArray([
                                        { headerText: nts.uk.resource.getText("KDL010_2"), prop: 'workLocationName', width: 290 }
                                    ]);
                                    self.selectCode.subscribe(function (value) {
                                        if (value == null)
                                            return;
                                        if (value == "") {
                                            self.isCreate(true);
                                            //self.isCreate.valueHasMutated();
                                            self.newMode();
                                            $("#target").focus();
                                            errors.clearAll();
                                            return;
                                        }
                                        self.isCreate(false);
                                        self.valueB3_4_ipaddress1(value.split(".")[0]);
                                        self.valueB3_6_ipaddress2(value.split(".")[1]);
                                        self.valueB3_8_ipaddress3(value.split(".")[2]);
                                        self.valueB3_10_ipaddress4(value.split(".")[3]);
                                        self.valueB3_12(null);
                                        //
                                        errors.clearAll();
                                        //  $("#target").focus();  
                                    });
                                    self.valueB3_4_ipaddress1.subscribe(function (value) {
                                        if (value == null)
                                            return;
                                        if (self.oldValue1 == value)
                                            return;
                                        if (value.toString() == "") {
                                            self.oldValue1 = self.valueB3_4_ipaddress1();
                                            $('#target').ntsError('set', { messageId: "MsgB_1", messageParams: [nts.uk.resource.getText("CMM040_36")] });
                                            return;
                                        }
                                        if ((value > 255) || (value < 0)) {
                                            $('#target').ntsError('set', { messageId: "Msg_2153" });
                                        }
                                        if (self.oldValue1 == null) {
                                            self.valueB3_6_ipaddress2("");
                                            self.valueB3_8_ipaddress3("");
                                            self.valueB3_10_ipaddress4("");
                                        }
                                        self.oldValue1 = self.valueB3_4_ipaddress1();
                                    });
                                    self.valueB3_6_ipaddress2.subscribe(function (value) {
                                        if (value == null)
                                            return;
                                        if (self.oldValue2 == value)
                                            return;
                                        if (value.toString() == "") {
                                            self.oldValue2 = self.valueB3_6_ipaddress2();
                                            $('#validateB3_6').ntsError('set', { messageId: "MsgB_1", messageParams: [nts.uk.resource.getText("CMM040_36")] });
                                            return;
                                        }
                                        if ((value > 255) || (value < 0)) {
                                            $('#validateB3_6').ntsError('set', { messageId: "Msg_2153" });
                                        }
                                        self.oldValue2 = self.valueB3_6_ipaddress2();
                                    });
                                    self.valueB3_8_ipaddress3.subscribe(function (value) {
                                        if (value == null)
                                            return;
                                        if (self.oldValue3 == value)
                                            return;
                                        if (value.toString() == "") {
                                            self.oldValue3 = self.valueB3_8_ipaddress3();
                                            $('#validateB3_8').ntsError('set', { messageId: "MsgB_1", messageParams: [nts.uk.resource.getText("CMM040_36")] });
                                            return;
                                        }
                                        if ((value > 255) || (value < 0)) {
                                            $('#validateB3_8').ntsError('set', { messageId: "Msg_2153" });
                                        }
                                        self.oldValue3 = self.valueB3_8_ipaddress3();
                                    });
                                    self.valueB3_10_ipaddress4.subscribe(function (value) {
                                        if (value == null)
                                            return;
                                        if (self.oldValue4 == value)
                                            return;
                                        if (value.toString() == "") {
                                            self.oldValue4 = self.valueB3_10_ipaddress4();
                                            $('#validateB3_10').ntsError('set', { messageId: "MsgB_1", messageParams: [nts.uk.resource.getText("CMM040_36")] });
                                            return;
                                        }
                                        if ((value > 255) || (value < 0)) {
                                            $('#validateB3_10').ntsError('set', { messageId: "Msg_2153" });
                                        }
                                        self.oldValue4 = self.valueB3_10_ipaddress4();
                                    });
                                    self.valueB3_12.subscribe(function (value) {
                                        if (value == null)
                                            return;
                                        if (self.oldValue5 == value)
                                            return;
                                        if ((value > 255) || (value < 0)) {
                                            $('#validateB3_12').ntsError('set', { messageId: "Msg_2153" });
                                        }
                                        self.oldValue5 = self.valueB3_12();
                                    });
                                }
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    var workLocationCode = self.workLocationCode;
                                    b.service.getDataStart(workLocationCode).done(function (result) {
                                        self.workLocationList([]);
                                        if (result.length > 0) {
                                            var data = result[0];
                                            self.valueB3_4_ipaddress1(data.net1);
                                            self.valueB3_6_ipaddress2(data.net2);
                                            self.valueB3_8_ipaddress3(data.host1);
                                            self.valueB3_10_ipaddress4(data.host2);
                                            var datas = [];
                                            for (i = 0; i < result.length; i++) {
                                                var ip = result[i].net1 + "." + result[i].net2 + "." + result[i].host1 + "." + result[i].host2;
                                                datas.push(new WorkLocation(ip, ip));
                                            }
                                            self.workLocationList(datas);
                                            if (self.valueB3_4_ipaddress1() == null)
                                                self.findByIndex(0);
                                            var code = self.valueB3_4_ipaddress1() + "." + self.valueB3_6_ipaddress2() + "." + self.valueB3_8_ipaddress3() + "." + self.valueB3_10_ipaddress4();
                                            if (self.checkDel != true)
                                                self.selectCode(code);
                                            self.checkDel = false;
                                        }
                                        else {
                                            self.isCreate(true);
                                            self.valueB3_4_ipaddress1(null);
                                            self.valueB3_6_ipaddress2(null);
                                            self.valueB3_8_ipaddress3(null);
                                            self.valueB3_10_ipaddress4(null);
                                            //self.selectCode(null);
                                            $("#target").focus();
                                        }
                                        dfd.resolve();
                                    }).fail(function (error) {
                                        dfd.fail();
                                        alert(error.message);
                                    }).always(function () {
                                        block.clear();
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.cancel_Dialog = function () {
                                    var self = this;
                                    //            if (parseInt(self.valueB3_10_ipaddress4()) < parseInt(self.valueB3_12())) {
                                    //                i = parseInt(self.valueB3_12());
                                    //            } else {
                                    //                i = parseInt(self.valueB3_10_ipaddress4());
                                    //            }
                                    //            let param =
                                    //                {
                                    //                    net1: Number(self.valueB3_4_ipaddress1()),
                                    //                    net2: Number(self.valueB3_6_ipaddress2()),
                                    //                    host1: Number(self.valueB3_8_ipaddress3()),
                                    //                    host2: Number(self.valueB3_10_ipaddress4()),
                                    //                }
                                    var ipData = [];
                                    for (var i = 0; i < self.workLocationList().length; i++) {
                                        ipData.push({
                                            net1: self.workLocationList()[i].workLocationCD.split(".")[0],
                                            net2: self.workLocationList()[i].workLocationCD.split(".")[1],
                                            host1: self.workLocationList()[i].workLocationCD.split(".")[2],
                                            host2: self.workLocationList()[i].workLocationCD.split(".")[3]
                                        });
                                    }
                                    nts.uk.ui.windows.setShared("DataCMM040B", ipData);
                                    nts.uk.ui.windows.close();
                                };
                                ScreenModel.prototype.findByIndex = function (index) {
                                    var self = this;
                                    var data = _.nth(self.workLocationList(), index);
                                    if (data !== undefined) {
                                        //  self.selectedWorkLocation()
                                        setTimeout(function () {
                                            self.selectCode(data.workLocationCD);
                                        }, 50);
                                    }
                                    else {
                                        self.selectCode(null);
                                    }
                                };
                                ScreenModel.prototype.save = function () {
                                    var self = this;
                                    if (self.valueB3_4_ipaddress1() == null)
                                        self.valueB3_4_ipaddress1("");
                                    if (self.valueB3_6_ipaddress2() == null)
                                        self.valueB3_6_ipaddress2("");
                                    if (self.valueB3_8_ipaddress3() == null)
                                        self.valueB3_8_ipaddress3("");
                                    if (self.valueB3_10_ipaddress4() == null)
                                        self.valueB3_10_ipaddress4("");
                                    if (!$(".nts-input").ntsError("hasError")) {
                                        var i = void 0;
                                        if (parseInt(self.valueB3_10_ipaddress4()) < parseInt(self.valueB3_12())) {
                                            i = parseInt(self.valueB3_12());
                                        }
                                        else {
                                            i = parseInt(self.valueB3_10_ipaddress4());
                                        }
                                        var param = {
                                            workLocationCode: self.workLocationCode,
                                            net1: self.valueB3_4_ipaddress1(),
                                            net2: self.valueB3_6_ipaddress2(),
                                            host1: self.valueB3_8_ipaddress3(),
                                            host2: self.valueB3_10_ipaddress4(),
                                            ipEnd: i
                                        };
                                        b.service.update(param).done(function (result) {
                                            if (result.length == 0) {
                                                nts.uk.ui.dialog.info({ messageId: "Msg_15" });
                                                self.startPage().done(function () {
                                                    //self.selectCode(self.valueB3_4_ipaddress1() + "." + self.valueB3_6_ipaddress2() + "." + self.valueB3_8_ipaddress3() + "." + self.valueB3_10_ipaddress4());
                                                    self.findByIndex(0);
                                                    self.isCreate(false);
                                                });
                                            }
                                            else {
                                                self.startPage().done(function () {
                                                    for (var i_1 = 0; i_1 < result.length; i_1++) {
                                                        $('#left-content').ntsError('set', { messageId: 'Msg_1994', messageParams: [result[i_1].net1, result[i_1].net2, result[i_1].host1, result[i_1].host2] });
                                                    }
                                                    //                         self.startPage();
                                                    //                         nts.uk.ui.errors.clearAll();
                                                    self.valueB3_12(null);
                                                    var p = nts.uk.ui.errors.errorsViewModel();
                                                    var checkStart = 0;
                                                    p.option().show.subscribe(function (v) {
                                                        if (v == false) {
                                                            nts.uk.ui.errors.clearAll();
                                                        }
                                                    });
                                                });
                                            }
                                        }).fail(function (res) {
                                            nts.uk.ui.dialog.alert({ messageId: res.messageId });
                                        }).always(function () {
                                            block.clear();
                                        });
                                    }
                                };
                                ScreenModel.prototype.deleteData = function () {
                                    var self = this;
                                    var param = {
                                        workLocationCode: self.workLocationCode,
                                        net1: Number(self.valueB3_4_ipaddress1()),
                                        net2: Number(self.valueB3_6_ipaddress2()),
                                        host1: Number(self.valueB3_8_ipaddress3()),
                                        host2: Number(self.valueB3_10_ipaddress4())
                                    };
                                    nts.uk.ui.dialog.confirm({ messageId: "Msg_18" }).ifYes(function () {
                                        var index = _.findIndex(self.workLocationList(), ['workLocationCD', self.selectCode()]);
                                        b.service.deleteData(param).done(function () {
                                            index = index == self.workLocationList().length - 1 ? index : _.min([self.workLocationList().length - 2, index]);
                                            // nts.uk.ui.dialog.info({ messageId: "Msg_16" });
                                            var deleteItem = self.workLocationList.splice(index, 1);
                                            _.filter(self.workLocationList(), function (x) { return x.workLocationCD != deleteItem[0].workLocationCD; });
                                            nts.uk.ui.dialog.info({ messageId: "Msg_16" }).then(function () {
                                                self.checkDel = true;
                                                //self.startPage().done(() => {
                                                if (self.workLocationList().length == 0) {
                                                    self.newMode();
                                                    errors.clearAll();
                                                }
                                                if (index == -1) {
                                                    self.selectCode(null);
                                                    self.workLocationList([]);
                                                    self.newMode();
                                                    errors.clearAll();
                                                }
                                                else {
                                                    self.findByIndex(index == self.workLocationList().length ? index - 1 : index);
                                                }
                                                //});
                                            });
                                        }).fail(function (res) {
                                            nts.uk.ui.dialog.alert({ messageId: res.messageId }).then(function () {
                                                self.startPage().done(function () {
                                                    if (self.workLocationList().length > 0) {
                                                        self.findByIndex(0);
                                                    }
                                                });
                                            });
                                        }).always(function () {
                                            block.clear();
                                        });
                                    });
                                };
                                ScreenModel.prototype.newMode = function () {
                                    var self = this;
                                    self.selectCode(null);
                                    self.valueB3_4_ipaddress1(null);
                                    self.valueB3_6_ipaddress2(null);
                                    self.valueB3_8_ipaddress3(null);
                                    self.valueB3_10_ipaddress4(null);
                                    self.valueB3_12(null);
                                    self.isCreate(true);
                                    $("#target").focus();
                                    errors.clearAll();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var WorkLocation = /** @class */ (function () {
                                function WorkLocation(workLocationCD, workLocationName) {
                                    this.workLocationCD = workLocationCD;
                                    this.workLocationName = workLocationName;
                                }
                                return WorkLocation;
                            }());
                            viewmodel.WorkLocation = WorkLocation;
                        })(viewmodel = b.viewmodel || (b.viewmodel = {}));
                    })(b = cmm040.b || (cmm040.b = {}));
                })(cmm040 = view.cmm040 || (view.cmm040 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm040.b.vm.js.map