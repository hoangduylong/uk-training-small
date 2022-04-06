var cmm001;
(function (cmm001) {
    var a;
    (function (a) {
        var ViewModel = /** @class */ (function () {
            function ViewModel() {
                console.log("ngon rồi");
                var self = this;
                self.tabs = ko.observableArray([
                    { id: 'tab-1', title: nts.uk.resource.getText("CMM001_16"), content: '.tab-content-1', enable: ko.observable(true), visible: ko.observable(true) },
                    { id: 'tab-2', title: nts.uk.resource.getText("CMM001_17"), content: '.tab-content-2', enable: ko.observable(true), visible: ko.observable(true) },
                    { id: 'tab-3', title: nts.uk.resource.getText("CMM001_18"), content: '.tab-content-3', enable: ko.observable(true), visible: ko.observable(true) }
                ]);
                var itemArray = [
                    { code: 1, name: nts.uk.resource.getText("Enum_StartingMonthType_JANUARY") },
                    { code: 2, name: nts.uk.resource.getText("Enum_StartingMonthType_FEBRUARY") },
                    { code: 3, name: nts.uk.resource.getText("Enum_StartingMonthType_MARCH") },
                    { code: 4, name: nts.uk.resource.getText("Enum_StartingMonthType_APRIL") },
                    { code: 5, name: nts.uk.resource.getText("Enum_StartingMonthType_MAY") },
                    { code: 6, name: nts.uk.resource.getText("Enum_StartingMonthType_JUNE") },
                    { code: 7, name: nts.uk.resource.getText("Enum_StartingMonthType_JULY") },
                    { code: 8, name: nts.uk.resource.getText("Enum_StartingMonthType_AUGUST") },
                    { code: 9, name: nts.uk.resource.getText("Enum_StartingMonthType_SEPTEMBER") },
                    { code: 10, name: nts.uk.resource.getText("Enum_StartingMonthType_OCTOBER") },
                    { code: 11, name: nts.uk.resource.getText("Enum_StartingMonthType_NOVEMBER") },
                    { code: 12, name: nts.uk.resource.getText("Enum_StartingMonthType_DECEMBER") }
                ];
                self.selectedTab = ko.observable('tab-1');
                self.gridColumns = ko.observableArray([
                    { headerText: nts.uk.resource.getText("CMM001_7"), key: 'companyCode', width: 90 },
                    { headerText: nts.uk.resource.getText("CMM001_8"), key: 'companyName', width: 180, formatter: _.escape },
                    {
                        headerText: nts.uk.resource.getText("CMM001_9"), key: 'isAbolition', width: 60,
                        template: '{{if ${isAbolition} == 1}} <img src="../images/78.png" style="margin-left: 20px; width: 20px; height: 20px;" />{{else }} <span></span> {{/if}}'
                    }
                ]);
                self.sel001Data = ko.observableArray([]);
                self.listCom = ko.observableArray([]);
                self.itemList = ko.observableArray(itemArray);
                self.currentCompany = ko.observable(null);
                self.currentCompanyCode = ko.observable('');
                self.sel001Data = ko.observableArray([]);
                self.display = ko.observable(true);
                self.checkInsert = ko.observable(false);
                self.roundingRules = ko.observableArray([
                    new RoundingRule(1, nts.uk.resource.getText("CMM001_31")),
                    new RoundingRule(0, nts.uk.resource.getText("CMM001_32"))
                ]);
                self.roundingRules3 = ko.observableArray([
                    new RoundingRule(1, nts.uk.resource.getText("CMM001_36")),
                    new RoundingRule(0, nts.uk.resource.getText("CMM001_37"))
                ]);
                // subscribe each company
                self.currentCompanyCode.subscribe(function (value) {
                    nts.uk.ui.errors.clearAll();
                    if (value) {
                        var foundItem = _.find(self.sel001Data(), function (item) {
                            return item.companyCode == value;
                        });
                        a.service.findComId(foundItem.companyId).done(function (comId) {
                            self.currentCompany(new CompanyModel(comId));
                            self.checkInsert(false);
                            var param = {
                                companyId: self.currentCompany().companyId()
                            };
                            var divEmpty = {
                                regWorkDiv: 0,
                            };
                            a.service.getDiv(param).done(function (div) {
                                div == null ? div = divEmpty : div;
                                self.currentCompany().regWorkDiv(div.regWorkDiv);
                            });
                            var sysEmpty = {
                                jinji: 0,
                                kyuyo: 0,
                                shugyo: 0,
                            };
                            a.service.getSys(param).done(function (sys) {
                                sys == null ? sys = sysEmpty : sys;
                                self.currentCompany().jinji(sys.jinji);
                                self.currentCompany().kyuyo(sys.kyuyo);
                                self.currentCompany().shugyo(sys.shugyo);
                            });
                            $("#companyName").focus();
                            nts.uk.ui.errors.clearAll();
                        });
                    }
                });
                // subscribe when check A2_2
                self.display.subscribe(function (item) {
                    if (item) {
                        self.sel001Data(self.listCom());
                        self.currentCompanyCode(self.sel001Data()[0].companyCode);
                    }
                    else {
                        self.sel001Data(_.filter(self.listCom(), function (obj) {
                            return obj.isAbolition == 0;
                        }));
                        if (self.sel001Data().length == 0) {
                            self.innit();
                        }
                        self.currentCompanyCode(self.sel001Data()[0].companyCode);
                    }
                });
            }
            /** start page */
            ViewModel.prototype.start = function () {
                nts.uk.ui.block.invisible();
                var self = this;
                var dfd = $.Deferred();
                a.service.getAll().done(function (lst) {
                    if (lst.length == 0) {
                        self.sel001Data([]);
                        self.listCom([]);
                        self.innit();
                    }
                    else {
                        var listOrder = _.orderBy(lst, ["companyCode"], ["asc"]);
                        self.sel001Data(listOrder);
                        self.listCom(listOrder);
                        self.currentCompanyCode(self.sel001Data()[0].companyCode);
                        self.checkInsert(false);
                    }
                    dfd.resolve();
                }).fail(function (error) {
                    dfd.reject();
                    nts.uk.ui.dialog.alertError({ messageId: error.messageId })
                        .then(function () { return nts.uk.request.jump("/view/ccg/008/a/index.xhtml"); });
                }).always(function () {
                    nts.uk.ui.block.clear();
                });
                return dfd.promise();
            };
            /** new mode */
            ViewModel.prototype.innit = function () {
                var self = this;
                nts.uk.ui.errors.clearAll();
                var addEmpty = {
                    addKana_1: "",
                    addKana_2: "",
                    add_1: "",
                    add_2: "",
                    companyCode: "",
                    companyId: "",
                    contractCd: "",
                    faxNum: "",
                    phoneNum: "",
                    postCd: ""
                };
                var param = {
                    companyCode: "",
                    comNameKana: "",
                    companyId: "",
                    companyName: "",
                    contractCd: "",
                    isAbolition: 0,
                    repJob: "",
                    repname: "",
                    shortComName: "",
                    startMonth: 1,
                    taxNum: "",
                    addinfor: addEmpty,
                    regWorkDiv: 0,
                    jinji: 0,
                    kyuyo: 0,
                    shugyo: 0,
                };
                self.currentCompany(new CompanyModel(param));
                self.currentCompanyCode("");
                self.checkInsert(true);
                $("#companyCode").focus();
            };
            /** event when click register */
            ViewModel.prototype.register = function () {
                nts.uk.ui.block.invisible();
                $("#companyCode").trigger("validate");
                $("#companyName").trigger("validate");
                $("#companyNameKana").trigger("validate");
                $("#companyNameAbb").trigger("validate");
                $("#corporateMyNumber").trigger("validate");
                $("#presidentName").trigger("validate");
                $("#presidentJobTitle").trigger("validate");
                $("#postal").trigger("validate");
                $("#address1").trigger("validate");
                $("#address2").trigger("validate");
                $("#addressKana1").trigger("validate");
                $("#addressKana2").trigger("validate");
                $("#telephoneNo").trigger("validate");
                $("#faxNo").trigger("validate");
                var self = this;
                var dataAdd = {
                    companyCode: self.currentCompany().companyCode(),
                    faxNum: self.currentCompany().addinfor().faxNum(),
                    add_1: self.currentCompany().addinfor().add_1(),
                    add_2: self.currentCompany().addinfor().add_2(),
                    addKana_1: self.currentCompany().addinfor().addKana_1(),
                    addKana_2: self.currentCompany().addinfor().addKana_2(),
                    postCd: self.currentCompany().addinfor().postCd(),
                    phoneNum: self.currentCompany().addinfor().phoneNum(),
                };
                if ((dataAdd.faxNum == "" || dataAdd.faxNum == null) && (dataAdd.add_1 == "" || dataAdd.add_1 == null) && (dataAdd.add_2 == "" || dataAdd.add_2 == null) && (dataAdd.addKana_1 == "" || dataAdd.addKana_1 == null) && (dataAdd.addKana_2 == "" || dataAdd.addKana_2 == null) && (dataAdd.postCd == "" || dataAdd.postCd == null) && (dataAdd.phoneNum == "" || dataAdd.phoneNum == null)) {
                    dataAdd = null;
                }
                var dataCom = {
                    ccd: self.currentCompany().companyCode(),
                    name: self.currentCompany().companyName(),
                    month: self.currentCompany().startMonth(),
                    abolition: self.currentCompany().isAbolition() ? 1 : 0,
                    repname: self.currentCompany().repname(),
                    repJob: self.currentCompany().repJob(),
                    comNameKana: self.currentCompany().comNameKana(),
                    shortComName: self.currentCompany().shortComName(),
                    contractCd: self.currentCompany().contractCd(),
                    taxNo: self.currentCompany().taxNum(),
                    addinfor: dataAdd,
                };
                var dataSys = {
                    companyId: self.currentCompany().companyId(),
                    companyCode: self.currentCompany().companyCode(),
                    contractCd: self.currentCompany().contractCd(),
                    jinji: self.currentCompany().jinji(),
                    shugyo: self.currentCompany().shugyo(),
                    kyuyo: self.currentCompany().kyuyo(),
                };
                var dataDiv = {
                    companyId: self.currentCompany().companyId(),
                    companyCode: self.currentCompany().companyCode(),
                    contractCd: self.currentCompany().contractCd(),
                    regWorkDiv: self.currentCompany().regWorkDiv(),
                };
                var dataTransfer = {
                    comCm: dataCom,
                    sysCm: dataSys,
                    divCm: dataDiv,
                };
                if (!self.currentCompany().isAbolition()) {
                    $('#checked2').ntsError('clear');
                }
                if (nts.uk.ui.errors.hasError()) {
                    nts.uk.ui.block.clear();
                    return;
                }
                var code = self.currentCompany().companyCode();
                if (self.checkInsert() == false) {
                    // update a company
                    a.service.update(dataTransfer).done(function () {
                        nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                            $('#companyName').focus();
                        });
                        self.start().then(function () {
                            self.display.valueHasMutated();
                            self.currentCompanyCode(code);
                        });
                    }).fail(function (error) {
                        if (error.messageId == 'Msg_810') {
                            $('#checked2').addClass("error");
                            $('#checked2').ntsError('set', { messageId: "Msg_810" });
                        }
                    }).always(function () {
                        nts.uk.ui.block.clear();
                    });
                }
                else {
                    // insert a company
                    a.service.add(dataTransfer).done(function () {
                        self.start().then(function () {
                            $('#companyName').focus();
                            self.display.valueHasMutated();
                            self.currentCompanyCode(code);
                        });
                        nts.uk.ui.dialog.info({ messageId: "Msg_1148" }).then(function () {
                            var cid = self.currentCompany().companyId();
                            var IMasterDataList = [];
                            var masterCopyDataCmd = { companyId: cid, masterDataList: IMasterDataList };
                            a.service.getAllMasterCopyCategory().then(function (masterCopyCateList) {
                                if (masterCopyCateList != null) {
                                    var copyMethod;
                                    var item;
                                    for (var i = 0; i < masterCopyCateList.length; i++) {
                                        item = masterCopyCateList[i];
                                        var IMasterCopyCategoryDto = { masterCopyId: item.masterCopyId, categoryName: item.masterCopyCategory, order: item.order, systemType: self.getSystemType(item.systemType), copyMethod: 1 };
                                        IMasterDataList.push(IMasterCopyCategoryDto);
                                    }
                                    nts.uk.ui.windows.setShared('masterCopyDataCmd', masterCopyDataCmd);
                                    nts.uk.ui.windows.sub.modal('/view/cmm/001/f/index.xhtml', { title: '', }).onClosed(function () {
                                        $('#companyName').focus();
                                    });
                                }
                                else {
                                    nts.uk.ui.dialog.info({ messageId: "Msg_1149" });
                                }
                            });
                        });
                    }).fail(function (error) {
                        if (error.messageId == 'Msg_809') {
                            $('#companyCode').ntsError('set', { messageId: "Msg_809" });
                        }
                        if (error.messageId == 'Msg_3') {
                            $('#companyCode').ntsError('set', { messageId: "Msg_3" });
                        }
                    }).always(function () {
                        nts.uk.ui.block.clear();
                    });
                }
            };
            ViewModel.prototype.getSystemType = function (systemTypeVal) {
                var systemType;
                switch (systemTypeVal) {
                    case 0:
                        systemType = '共通';
                        break;
                    case 1:
                        systemType = '就業';
                        break;
                    case 2:
                        systemType = '給与';
                        break;
                    case 3:
                        systemType = '人事';
                        break;
                }
                return systemType;
            };
            /** search post code */
            ViewModel.prototype.search = function () {
                nts.uk.ui.block.invisible();
                var self = this;
                // if don't have post code to find
                if (self.currentCompany().addinfor().postCd() == "") {
                    nts.uk.ui.dialog.alertError({ messageId: "Msg_438", messageParams: [nts.uk.resource.getText("CMM001_22")] }).then(function () {
                        $("#postal").focus();
                        nts.uk.ui.block.clear();
                    });
                    return;
                }
                // search by post code 
                a.service.findPostCd(self.currentCompany().addinfor().postCd()).done(function (item) {
                    if (item.length == 0) {
                        nts.uk.ui.dialog.alertError({ messageId: "Msg_818" }).then(function () {
                            $("#postal").focus();
                            nts.uk.ui.block.clear();
                        });
                        return;
                    }
                    // address_1 after finded
                    item[0].city = item[0].city;
                    item[0].townArea = item[0].townArea;
                    // address kana 1 after finded
                    item[0].townAreaKana = item[0].townAreaKana;
                    item[0].cityKanaName = item[0].cityKanaName;
                    self.currentCompany().addinfor().add_1(item[0].city + item[0].townArea);
                    self.currentCompany().addinfor().addKana_1(item[0].cityKanaName + item[0].townAreaKana);
                }).always(function () {
                    nts.uk.ui.block.clear();
                });
            };
            ViewModel.prototype.openEDialog = function () {
                var self = this;
                nts.uk.ui.windows.setShared('companyId', self.currentCompany().companyId());
                nts.uk.ui.windows.setShared('companyName', self.currentCompany().companyName());
                nts.uk.ui.windows.sub.modal('/view/cmm/001/e/index.xhtml', { title: '', }).onClosed(function () {
                });
            };
            ViewModel.prototype.exportExcel = function () {
                var self = this;
                nts.uk.ui.block.grayout();
                var langId = "ja";
                a.service.saveAsExcel(langId).done(function () {
                }).fail(function (error) {
                    nts.uk.ui.dialog.alertError({ messageId: error.messageId });
                }).always(function () {
                    nts.uk.ui.block.clear();
                });
            };
            return ViewModel;
        }());
        a.ViewModel = ViewModel;
        var CompanyModel = /** @class */ (function () {
            function CompanyModel(param) {
                var self = this;
                this.companyCode = ko.observable(param.companyCode);
                this.comNameKana = ko.observable(param.comNameKana);
                this.companyId = ko.observable(param.companyId);
                this.companyName = ko.observable(param.companyName);
                this.contractCd = ko.observable(param.contractCd);
                this.isAbolition = ko.observable(param.isAbolition == 1);
                this.repJob = ko.observable(param.repJob);
                this.repname = ko.observable(param.repname);
                this.shortComName = ko.observable(param.shortComName);
                this.startMonth = ko.observable(param.startMonth);
                this.taxNum = ko.observable(param.taxNum);
                var address = {
                    addKana_1: "",
                    addKana_2: "",
                    add_1: "",
                    add_2: "",
                    companyCode: "",
                    companyId: "",
                    contractCd: "",
                    faxNum: "",
                    phoneNum: "",
                    postCd: ""
                };
                if (param.addinfor != null) {
                    address = param.addinfor;
                }
                this.addinfor = ko.observable(new AddInfor(address));
                this.regWorkDiv = ko.observable(param.regWorkDiv);
                this.jinji = ko.observable(param.jinji);
                this.kyuyo = ko.observable(param.kyuyo);
                this.shugyo = ko.observable(param.shugyo);
            }
            return CompanyModel;
        }());
        var AddInfor = /** @class */ (function () {
            function AddInfor(param) {
                this.addKana_1 = ko.observable(param.addKana_1 || "");
                this.addKana_2 = ko.observable(param.addKana_2 || "");
                this.add_1 = ko.observable(param.add_1 || "");
                this.add_2 = ko.observable(param.add_2 || "");
                this.companyCode = ko.observable(param.companyCode || "");
                this.companyId = ko.observable(param.companyId || "");
                this.contractCd = ko.observable(param.contractCd || "");
                this.faxNum = ko.observable(param.faxNum || "");
                this.phoneNum = ko.observable(param.phoneNum || "");
                this.postCd = ko.observable(param.postCd || "");
            }
            return AddInfor;
        }());
        a.AddInfor = AddInfor;
        var RoundingRule = /** @class */ (function () {
            function RoundingRule(code, name) {
                this.code = code;
                this.name = name;
            }
            return RoundingRule;
        }());
    })(a = cmm001.a || (cmm001.a = {}));
})(cmm001 || (cmm001 = {}));
//# sourceMappingURL=cmm001.a.vm.js.map