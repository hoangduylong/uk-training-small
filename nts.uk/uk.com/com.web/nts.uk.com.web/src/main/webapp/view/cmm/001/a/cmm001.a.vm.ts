module cmm001.a {
    import PostCode = nts.uk.pr.view.base.postcode.service.model.PostCode;
    import MasterCopyCategory = nts.uk.com.view.cmm001.e.model.MasterCopyCategory;
    import MasterCopyCategoryDto = nts.uk.com.view.cmm001.e.MasterCopyCategoryDto;
    import MasterCopyDataCommand = nts.uk.com.view.cmm001.e.MasterCopyDataCommand;

    export class ViewModel {

        gridColumns: KnockoutObservableArray<any>;
        currentCompany: KnockoutObservable<CompanyModel>;
        currentCompanyCode: KnockoutObservable<string>;
        // list company A2_4
        sel001Data: KnockoutObservableArray<ICompany>;
        // list company copy
        listCom: KnockoutObservableArray<ICompany>;
        tabs: KnockoutObservableArray<nts.uk.ui.NtsTabPanelModel>;
        selectedTab: KnockoutObservable<string>;
        itemList: KnockoutObservable<any>;
        roundingRules: KnockoutObservableArray<RoundingRule>;
        roundingRules3: KnockoutObservableArray<RoundingRule>;
        // check true false A2_2
        display: KnockoutObservable<boolean>;
        checkInsert: KnockoutObservable<boolean>;

        constructor() {
			console.log("ngon rồi");
            let self = this;
            self.tabs = ko.observableArray([
                { id: 'tab-1', title: nts.uk.resource.getText("CMM001_16"), content: '.tab-content-1', enable: ko.observable(true), visible: ko.observable(true) },
                { id: 'tab-2', title: nts.uk.resource.getText("CMM001_17"), content: '.tab-content-2', enable: ko.observable(true), visible: ko.observable(true) },
                { id: 'tab-3', title: nts.uk.resource.getText("CMM001_18"), content: '.tab-content-3', enable: ko.observable(true), visible: ko.observable(true) }
            ]);
            let itemArray = [
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
            self.currentCompanyCode.subscribe((value) => {
                nts.uk.ui.errors.clearAll();
                if (value) {
                    let foundItem: ICompany = _.find(self.sel001Data(), (item: ICompany) => {
                        return item.companyCode == value;
                    });

                    service.findComId(foundItem.companyId).done((comId) => {
                        self.currentCompany(new CompanyModel(comId));
                        self.checkInsert(false);
                        let param = {
                            companyId: self.currentCompany().companyId()
                        }
                        var divEmpty = {
                            regWorkDiv: 0,
                        }
                        service.getDiv(param).done((div) => {
                            div == null ? div = divEmpty : div;
                            self.currentCompany().regWorkDiv(div.regWorkDiv);
                        });
                        var sysEmpty = {
                            jinji: 0,
                            kyuyo: 0,
                            shugyo: 0,
                        }
                        service.getSys(param).done((sys) => {
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
            self.display.subscribe((item) => {
                if (item) {
                    self.sel001Data(self.listCom());
                    self.currentCompanyCode(self.sel001Data()[0].companyCode);
                } else {
                    self.sel001Data(_.filter(self.listCom(), function(obj: ICompany) {
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
        start() {
            nts.uk.ui.block.invisible();
            let self = this;
            let dfd = $.Deferred<any>();
            service.getAll().done((lst) => {
                if (lst.length == 0) {
                    self.sel001Data([]);
                    self.listCom([]);
                    self.innit();
                } else {
                    let listOrder = _.orderBy(lst, ["companyCode"], ["asc"]);
                    self.sel001Data(listOrder);
                    self.listCom(listOrder);
                    self.currentCompanyCode(self.sel001Data()[0].companyCode);
                    self.checkInsert(false);
                }
                dfd.resolve();
            }).fail(function(error) {
                dfd.reject();
                nts.uk.ui.dialog.alertError({ messageId: error.messageId })
                    .then(() => nts.uk.request.jump("/view/ccg/008/a/index.xhtml"));
            }).always(() => {
                nts.uk.ui.block.clear();
            });
            return dfd.promise();
        }

        /** new mode */
        innit() {
            let self = this;
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
            let param = {
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
            }
            self.currentCompany(new CompanyModel(param));
            self.currentCompanyCode("");
            self.checkInsert(true);
            $("#companyCode").focus();
        }

        /** event when click register */
        register() {
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
            let self = this;
            let dataAdd: IAddInfor = {
                companyCode: self.currentCompany().companyCode(),
                faxNum: self.currentCompany().addinfor().faxNum(),
                add_1: self.currentCompany().addinfor().add_1(),
                add_2: self.currentCompany().addinfor().add_2(),
                addKana_1: self.currentCompany().addinfor().addKana_1(),
                addKana_2: self.currentCompany().addinfor().addKana_2(),
                postCd: self.currentCompany().addinfor().postCd(),
                phoneNum: self.currentCompany().addinfor().phoneNum(),

            }
            if ((dataAdd.faxNum == "" || dataAdd.faxNum == null) && (dataAdd.add_1 == "" || dataAdd.add_1 == null) && (dataAdd.add_2 == "" || dataAdd.add_2 == null) && (dataAdd.addKana_1 == "" || dataAdd.addKana_1 == null) && (dataAdd.addKana_2 == "" || dataAdd.addKana_2 == null) && (dataAdd.postCd == "" || dataAdd.postCd == null) && (dataAdd.phoneNum == "" || dataAdd.phoneNum == null)) {
                dataAdd = null;
            }
            let dataCom = {
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
            }
            let dataSys = {
                companyId: self.currentCompany().companyId(),
                companyCode: self.currentCompany().companyCode(),
                contractCd: self.currentCompany().contractCd(),
                jinji: self.currentCompany().jinji(),
                shugyo: self.currentCompany().shugyo(),
                kyuyo: self.currentCompany().kyuyo(),
            }
            let dataDiv = {
                companyId: self.currentCompany().companyId(),
                companyCode: self.currentCompany().companyCode(),
                contractCd: self.currentCompany().contractCd(),
                regWorkDiv: self.currentCompany().regWorkDiv(),
            }
            let dataTransfer = {
                comCm: dataCom,
                sysCm: dataSys,
                divCm: dataDiv,
            }
            if (!self.currentCompany().isAbolition()) {
                $('#checked2').ntsError('clear');
            }
            if (nts.uk.ui.errors.hasError()) {
                nts.uk.ui.block.clear();
                return;
            }
            let code = self.currentCompany().companyCode();
            if (self.checkInsert() == false) {
                // update a company
                service.update(dataTransfer).done(function() {
                    nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function() {
                        $('#companyName').focus();
                    });
                    self.start().then(function() {
                        self.display.valueHasMutated();
                        self.currentCompanyCode(code);
                    });
                }).fail(function(error) {
                    if (error.messageId == 'Msg_810') {
                        $('#checked2').addClass("error");
                        $('#checked2').ntsError('set', { messageId: "Msg_810" });
                    }
                }).always(() => {
                    nts.uk.ui.block.clear();
                });
            } else {
                // insert a company
                service.add(dataTransfer).done(function() {
                    self.start().then(function() {
                        $('#companyName').focus();
                        self.display.valueHasMutated();
                        self.currentCompanyCode(code);
                    });
                    nts.uk.ui.dialog.info({ messageId: "Msg_1148" }).then(function() {
                        var cid = self.currentCompany().companyId();
                        var IMasterDataList: MasterCopyCategoryDto[] = [];
                        var masterCopyDataCmd: MasterCopyDataCommand = { companyId: cid, masterDataList: IMasterDataList };
                        service.getAllMasterCopyCategory().then(function(masterCopyCateList: Array<MasterCopyCategory>) {
                            if (masterCopyCateList != null) {

                                var copyMethod: number;
                                var item: model.MasterCopyCategory;
                                for (var i = 0; i < masterCopyCateList.length; i++) {
                                    item = masterCopyCateList[i];

                                    var IMasterCopyCategoryDto: MasterCopyCategoryDto = { masterCopyId: item.masterCopyId, categoryName: item.masterCopyCategory, order: item.order, systemType: self.getSystemType(item.systemType), copyMethod: 1 };
                                    IMasterDataList.push(IMasterCopyCategoryDto);
                                }
                                nts.uk.ui.windows.setShared('masterCopyDataCmd', masterCopyDataCmd);
                                nts.uk.ui.windows.sub.modal('/view/cmm/001/f/index.xhtml', { title: '', }).onClosed(function(): any {
                                    $('#companyName').focus();
                                });
                            } else {
                                nts.uk.ui.dialog.info({ messageId: "Msg_1149" });
                            }

                        });
                    });
                }).fail(function(error) {
                    if (error.messageId == 'Msg_809') {
                        $('#companyCode').ntsError('set', { messageId: "Msg_809" });
                    }
                    if (error.messageId == 'Msg_3') {
                        $('#companyCode').ntsError('set', { messageId: "Msg_3" });
                    }
                }).always(() => {
                    nts.uk.ui.block.clear();
                });
            }

        }

        private getSystemType(systemTypeVal: number): string {
            var systemType: string;
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
        }

        /** search post code */
        search() {
            nts.uk.ui.block.invisible();
            let self = this;
            // if don't have post code to find
            if (self.currentCompany().addinfor().postCd() == "") {
                nts.uk.ui.dialog.alertError({ messageId: "Msg_438", messageParams: [nts.uk.resource.getText("CMM001_22")] }).then(() => {
                    $("#postal").focus();
                    nts.uk.ui.block.clear();
                });
                return;
            }
            // search by post code 
            service.findPostCd(self.currentCompany().addinfor().postCd()).done((item) => {
                if (item.length == 0) {
                    nts.uk.ui.dialog.alertError({ messageId: "Msg_818" }).then(() => {
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
            }).always(() => {
                nts.uk.ui.block.clear();
            });
        }

        openEDialog() {
            let self = this;
            nts.uk.ui.windows.setShared('companyId', self.currentCompany().companyId());
            nts.uk.ui.windows.setShared('companyName', self.currentCompany().companyName());
            nts.uk.ui.windows.sub.modal('/view/cmm/001/e/index.xhtml', {title: '',}).onClosed(function (): any {
            })
        }
        
        private exportExcel(): void {
            
                var self = this;
                nts.uk.ui.block.grayout();
                let langId = "ja";
                service.saveAsExcel(langId).done(function() {
                }).fail(function(error) {
                    nts.uk.ui.dialog.alertError({ messageId: error.messageId });
                }).always(function() {
                    nts.uk.ui.block.clear();
                });
            }
        
        
    }
    class CompanyModel {
        companyCode: KnockoutObservable<string>;
        comNameKana: KnockoutObservable<string>;
        companyId: KnockoutObservable<string>;
        companyName: KnockoutObservable<string>;
        contractCd: KnockoutObservable<string>;
        isAbolition: KnockoutObservable<boolean>;
        repJob: KnockoutObservable<string>;
        repname: KnockoutObservable<string>;
        shortComName: KnockoutObservable<string>;
        startMonth: KnockoutObservable<number>;
        taxNum: KnockoutObservable<number>;
        addinfor: KnockoutObservable<AddInfor>;
        regWorkDiv: KnockoutObservable<number>;
        jinji: KnockoutObservable<number>;
        kyuyo: KnockoutObservable<number>;
        shugyo: KnockoutObservable<number>;
        constructor(param: ICompany) {
            let self = this;
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
            var address: IAddInfor = {
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
    }

    interface ICompany {
        companyCode: string;
        comNameKana?: string;
        companyId: string;
        companyName?: string;
        contractCd: string;
        isAbolition: number;
        repJob?: string;
        repname?: string;
        shortComName?: string;
        startMonth: number;
        taxNum?: number;
        addinfor?: IAddInfor;
        regWorkDiv?: number;
        jinji?: number;
        kyuyo?: number;
        shugyo?: number;
        roundingRules?: RoundingRule;
    }

    interface IAddInfor {
        addKana_1?: string;
        addKana_2?: string;
        add_1?: string;
        add_2?: string;
        companyCode: string;
        companyId: string;
        contractCd: string;
        faxNum?: string;
        phoneNum?: string;
        postCd?: string;
    }

    export class AddInfor {
        addKana_1: KnockoutObservable<string>;
        addKana_2: KnockoutObservable<string>;
        add_1: KnockoutObservable<string>;
        add_2: KnockoutObservable<string>;
        companyCode: KnockoutObservable<string>;
        companyId: KnockoutObservable<string>;
        contractCd: KnockoutObservable<string>;
        faxNum: KnockoutObservable<string>;
        phoneNum: KnockoutObservable<string>;
        postCd: KnockoutObservable<string>;
        constructor(param: IAddInfor) {
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
    }

    class RoundingRule {
        code: number;
        name: string;
        constructor(code: number, name: string) {
            this.code = code;
            this.name = name;
        }
    }



}