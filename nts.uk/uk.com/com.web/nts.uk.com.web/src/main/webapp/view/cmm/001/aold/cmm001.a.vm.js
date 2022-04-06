var cmm001;
(function (cmm001) {
    var a;
    (function (a) {
        var ViewModel = /** @class */ (function () {
            function ViewModel() {
                this.company = null;
                this.previousDisplayAttribute = true; //lưu giá trị của displayAttribute trước khi nó bị thay đổi
                this.isUpdate = ko.observable(null);
                this.previousCurrentCode = null; //lưu giá trị của currentCode trước khi nó bị thay đổi
                this.hasFocus = ko.observable(true);
                var self = this;
                self.init();
                self.currentCompanyCode.subscribe(function (newValue) {
                    if (nts.uk.text.isNullOrEmpty(newValue)) {
                        return;
                    }
                    else {
                        if (!nts.uk.text.isNullOrEmpty(newValue) && self.currentCompanyCode() !== self.previousCurrentCode) {
                            //goi check isDirty
                            if (self.dirtyObject.isDirty()) {
                                nts.uk.ui.dialog.confirm("変更された内容が登録されていません。\r\nよろしいですか。?").ifYes(function () {
                                    self.processWhenCurrentCodeChange(newValue);
                                }).ifCancel(function () {
                                    self.currentCompanyCode(self.previousCurrentCode);
                                });
                            }
                            else {
                                self.processWhenCurrentCodeChange(newValue);
                            }
                        }
                    }
                });
                self.displayAttribute.subscribe(function (newValue) {
                    if (self.displayAttribute() !== self.previousDisplayAttribute) {
                        //goi check isDirty
                        if (self.dirtyObject.isDirty()) {
                            nts.uk.ui.dialog.confirm("変更された内容が登録されていません。\r\nよろしいですか。?").ifYes(function () {
                                self.dirtyObject.reset();
                                self.processWhenDisplayAttributeChanged(newValue);
                            }).ifCancel(function () {
                                self.displayAttribute(self.previousDisplayAttribute);
                            });
                        }
                        else {
                            self.processWhenDisplayAttributeChanged(newValue);
                        }
                    }
                });
            }
            ViewModel.prototype.processWhenDisplayAttributeChanged = function (newValue) {
                var self = this;
                var $grid = $("#gridCompany");
                var currentColumns = $grid.igGrid("option", "columns");
                var width = $grid.igGrid("option", "width");
                if (newValue) {
                    $('#displayAttribute').ntsError('clear');
                    currentColumns[2].hidden = false;
                    $grid.igGrid("option", "width", "400px");
                    self.sel001Data([]);
                    self.reload(undefined);
                }
                else {
                    self.sel001Data([]);
                    currentColumns[2].hidden = true;
                    $grid.igGrid("option", "width", "400px");
                    a.service.getAllCompanys().done(function (data) {
                        if (data.length > 0) {
                            _.each(data, function (obj) {
                                var companyModel;
                                companyModel = ko.mapping.fromJS(obj);
                                if (obj.displayAttribute === 1) {
                                    companyModel.displayAttribute('');
                                    self.sel001Data.push(ko.toJS(companyModel));
                                }
                            });
                            var companyCheckExist = _.find(self.sel001Data(), function (obj) {
                                var newCompanyCode = ko.toJS(obj.companyCode);
                                var oldCompanyCode = (ko.toJS(self.currentCompanyCode));
                                return newCompanyCode === oldCompanyCode;
                            });
                            if (self.sel001Data().length > 0) {
                                self.isUpdate(true);
                                if (!companyCheckExist) {
                                    self.processWhenCurrentCodeChange(ko.toJS(self.sel001Data()[0].companyCode));
                                    self.currentCompanyCode(ko.toJS(self.sel001Data()[0].companyCode));
                                }
                                else {
                                    self.processWhenCurrentCodeChange(self.currentCompanyCode());
                                }
                            }
                            else {
                                self.resetData();
                                self.isUpdate(false);
                            }
                        }
                    });
                }
                $grid.igGrid("option", "columns", currentColumns);
                self.previousDisplayAttribute = newValue;
            };
            ViewModel.prototype.processWhenCurrentCodeChange = function (newValue) {
                var self = this;
                a.service.getCompanyDetail(newValue).done(function (company) {
                    if (company) {
                        if ($('.nts-editor').ntsError("hasError")) {
                            $('.save-error').ntsError('clear');
                        }
                        self.currentCompany().setDataForCurrentCompany(company);
                        self.hasFocus(false);
                        self.isUpdate(true);
                        self.previousCurrentCode = newValue;
                        self.dirtyObject.reset();
                    }
                    else {
                        self.isUpdate(false);
                        self.currentCompany().resetCurrentCompany();
                    }
                });
            };
            ViewModel.prototype.init = function () {
                var self = this;
                self.tabs = ko.observableArray([
                    { id: 'tab-1', title: '会社基本情報', content: '.tab-content-1', enable: ko.observable(true), visible: ko.observable(true) },
                    { id: 'tab-2', title: '会社所在地・連絡先', content: '.tab-content-2', enable: ko.observable(true), visible: ko.observable(true) },
                    { id: 'tab-3', title: 'システム設定', content: '.tab-content-3', enable: ko.observable(true), visible: ko.observable(true) }
                ]);
                var itemArray = [
                    { code: '1', name: '1月' },
                    { code: '2', name: '2月' },
                    { code: '3', name: '3月' },
                    { code: '4', name: '4月' },
                    { code: '5', name: '5月' },
                    { code: '6', name: '6月' },
                    { code: '7', name: '7月' },
                    { code: '8', name: '8月' },
                    { code: '9', name: '9月' },
                    { code: '10', name: '10月' },
                    { code: '11', name: '11月' },
                    { code: '12', name: '12月' }
                ];
                self.itemList = ko.observableArray(itemArray);
                self.displayAttribute = ko.observable(true);
                self.selectedTab = ko.observable('tab-1');
                self.gridColumns = ko.observableArray([
                    { headerText: '会社コード', prop: 'companyCode', width: 80 },
                    { headerText: '名称', prop: 'companyName', width: 200 },
                    { headerText: '廃止', prop: 'displayAttribute', width: 50, hidden: false }
                ]);
                self.currentCompany = ko.observable(null);
                self.currentCompanyCode = ko.observable('');
                self.sel001Data = ko.observableArray([]);
            };
            ViewModel.prototype.start = function (currentCode) {
                var self = this;
                var dfd = $.Deferred();
                a.service.getAllCompanys().done(function (data) {
                    if (data.length > 0) {
                        self.isUpdate(true);
                        _.each(data, function (obj) {
                            var companyModel;
                            companyModel = ko.mapping.fromJS(obj);
                            if (obj.displayAttribute === 1) {
                                companyModel.displayAttribute('');
                            }
                            else {
                                companyModel.displayAttribute('<i style="margin-left: 15px" class="icon icon-close"></i>');
                            }
                            self.sel001Data.push(ko.toJS(companyModel));
                        });
                        if (currentCode === undefined) {
                            self.currentCompany = ko.observable(new CompanyModel({
                                companyCode: ko.toJS(self.sel001Data()[0].companyCode),
                                address1: '',
                                companyName: '',
                                companyNameGlobal: '',
                                corporateMyNumber: '',
                                depWorkPlaceSet: 0,
                                displayAttribute: '',
                                termBeginMon: 0,
                                companyUseSet: null
                            }));
                            self.dirtyObject = new nts.uk.ui.DirtyChecker(self.currentCompany);
                            self.currentCompanyCode(self.currentCompany().companyCode());
                        }
                        else {
                            self.currentCompanyCode(currentCode);
                        }
                    }
                    else {
                        self.currentCompany = ko.observable(new CompanyModel({
                            companyCode: '',
                            address1: '',
                            companyName: '',
                            companyNameGlobal: '',
                            corporateMyNumber: '',
                            depWorkPlaceSet: 0,
                            displayAttribute: '',
                            termBeginMon: 0,
                            companyUseSet: null
                        }));
                        self.dirtyObject = new nts.uk.ui.DirtyChecker(self.currentCompany);
                        self.currentCompanyCode(self.currentCompany().companyCode());
                        self.resetData();
                    }
                    dfd.resolve();
                });
                return dfd.promise();
            };
            ViewModel.prototype.reload = function (currentCode) {
                var self = this;
                var dfd = $.Deferred();
                a.service.getAllCompanys().done(function (data) {
                    if (data.length > 0) {
                        self.isUpdate(true);
                        _.each(data, function (obj) {
                            var companyModel;
                            companyModel = ko.mapping.fromJS(obj);
                            if (obj.displayAttribute === 1) {
                                companyModel.displayAttribute('');
                            }
                            else {
                                companyModel.displayAttribute('<i style="margin-left: 15px" class="icon icon-close"></i>');
                            }
                            self.sel001Data.push(ko.toJS(companyModel));
                        });
                        self.dirtyObject = new nts.uk.ui.DirtyChecker(self.currentCompany);
                        if (currentCode == undefined) {
                            self.currentCompanyCode(ko.toJS(self.sel001Data()[0].companyCode));
                        }
                        else {
                            self.currentCompanyCode(currentCode);
                        }
                    }
                    else {
                        self.resetData();
                    }
                    dfd.resolve();
                });
                return dfd.promise();
            };
            ViewModel.prototype.resetData = function () {
                var self = this;
                if ($('.nts-editor').ntsError("hasError")) {
                    $('.save-error').ntsError('clear');
                }
                self.currentCompany().companyCode("");
                self.currentCompany().address1("");
                self.currentCompany().addressKana1("");
                self.currentCompany().address2("");
                self.currentCompany().addressKana2("");
                self.currentCompany().companyName("");
                self.currentCompany().companyNameGlobal("");
                self.currentCompany().companyNameAbb("");
                self.currentCompany().companyNameKana("");
                self.currentCompany().corporateMyNumber("");
                self.currentCompany().companyUseSet(new CompanyUseSet(0, 0, 0));
                self.currentCompany().depWorkPlaceSet(0);
                self.currentCompany().displayAttribute('');
                self.currentCompany().faxNo('');
                self.currentCompany().telephoneNo('');
                self.currentCompany().postal('');
                self.currentCompany().presidentName('');
                self.currentCompany().presidentJobTitle('');
                self.currentCompany().termBeginMon(1);
                self.currentCompany().selectedRuleCode('1');
                self.currentCompany().selectedRuleCode1('1');
                self.currentCompany().selectedRuleCode2('1');
                self.currentCompany().selectedRuleCode3('1');
                self.currentCompany().isDelete(false);
                self.currentCompany().editMode = true;
                self.currentCompany().isEnableCompanyCode(true);
                self.hasFocus(true);
                self.isUpdate(false);
                self.previousCurrentCode = "";
                self.currentCompanyCode("");
                self.dirtyObject.reset();
            };
            ViewModel.prototype.clickRegister = function () {
                var self = this;
                var dfd = $.Deferred();
                var currentCompany;
                currentCompany = ko.toJS(self.currentCompany);
                if (!self.validateData()) {
                    return;
                }
                if (currentCompany.isDelete) {
                    currentCompany.displayAttribute = ko.observable("0");
                }
                else {
                    currentCompany.displayAttribute = ko.observable("1");
                }
                var company = new a.service.model.CompanyDto("", "", "", "", "", "", "", "", "", 0, 0, "", "", "", "", "", 0, 0, 0, 0);
                company = self.convertCompanyDto(currentCompany);
                if (self.displayAttribute()) {
                    if (self.isUpdate()) {
                        cmm001.a.service.updateData(company).done(function () {
                            self.sel001Data([]);
                            self.reload(company.companyCode);
                        }).fail(function (res) {
                            nts.uk.ui.dialog.alert(res.message);
                        });
                    }
                    else {
                        a.service.getCompanyDetail(company.companyCode).done(function (data) {
                            self.company = data;
                        });
                        if (!self.company) {
                            $.when(cmm001.a.service.addData(company)).done(function () {
                                self.sel001Data([]);
                                self.reload(company.companyCode);
                            });
                        }
                        else {
                            nts.uk.ui.dialog.alert("入力したコードは既に存在しています。 コードを確認してください。");
                        }
                    }
                }
                else {
                    if (self.isUpdate()) {
                        cmm001.a.service.updateData(company).done(function () {
                            self.sel001Data([]);
                            a.service.getAllCompanys().done(function (data) {
                                if (data.length > 0) {
                                    _.each(data, function (obj) {
                                        var companyModel;
                                        companyModel = ko.mapping.fromJS(obj);
                                        if (obj.displayAttribute === 1) {
                                            companyModel.displayAttribute('');
                                            self.sel001Data.push(ko.toJS(companyModel));
                                        }
                                    });
                                    self.dirtyObject.reset();
                                    if (self.sel001Data().length > 0) {
                                        self.currentCompanyCode(ko.toJS(self.sel001Data()[0].companyCode));
                                    }
                                    else {
                                        self.resetData();
                                        return;
                                    }
                                }
                            });
                        });
                    }
                    else {
                        a.service.getCompanyDetail(company.companyCode).done(function (data) {
                            self.company = data;
                        });
                        if (!self.company) {
                            $.when(cmm001.a.service.addData(company)).done(function () {
                                self.sel001Data([]);
                                a.service.getAllCompanys().done(function (data) {
                                    if (data.length > 0) {
                                        _.each(data, function (obj) {
                                            var companyModel;
                                            companyModel = ko.mapping.fromJS(obj);
                                            if (obj.displayAttribute === 1) {
                                                companyModel.displayAttribute('');
                                                self.sel001Data.push(ko.toJS(companyModel));
                                            }
                                        });
                                        self.dirtyObject.reset();
                                        self.currentCompanyCode(ko.toJS(self.sel001Data()[0].companyCode));
                                    }
                                });
                            });
                        }
                        else {
                            nts.uk.ui.dialog.alert("入力したコードは既に存在しています。 コードを確認してください。");
                        }
                    }
                }
            };
            ViewModel.prototype.convertCompanyDto = function (company) {
                var companyDto = new a.service.model.CompanyDto("", "", "", "", "", "", "", "", "", 0, 0, "", "", "", "", "", 0, 0, 0, 0);
                companyDto.companyCode = ko.toJS(company.companyCode);
                companyDto.companyName = ko.toJS(company.companyName);
                companyDto.companyNameGlobal = ko.toJS(company.companyNameGlobal);
                companyDto.companyNameAbb = ko.toJS(company.companyNameAbb);
                companyDto.companyNameKana = ko.toJS(company.companyNameKana);
                companyDto.corporateMyNumber = ko.toJS(company.corporateMyNumber);
                companyDto.use_Jj_Set = Number(ko.toJS(company.selectedRuleCode));
                companyDto.use_Kt_Set = Number(ko.toJS(company.selectedRuleCode1));
                companyDto.use_Qy_Set = Number(ko.toJS(company.selectedRuleCode2));
                companyDto.depWorkPlaceSet = Number(ko.toJS(company.selectedRuleCode3));
                companyDto.displayAttribute = Number(ko.toJS(company.displayAttribute));
                companyDto.termBeginMon = Number(ko.toJS(company.termBeginMon));
                companyDto.address1 = ko.toJS(company.address1);
                companyDto.address2 = ko.toJS(company.address2);
                companyDto.addressKana1 = ko.toJS(company.addressKana1);
                companyDto.addressKana2 = ko.toJS(company.addressKana2);
                companyDto.telephoneNo = ko.toJS(company.telephoneNo);
                companyDto.faxNo = ko.toJS(company.faxNo);
                companyDto.postal = ko.toJS(company.postal);
                companyDto.presidentJobTitle = ko.toJS(company.presidentJobTitle);
                companyDto.presidentName = ko.toJS(company.presidentName);
                return companyDto;
            };
            ViewModel.prototype.validateData = function () {
                $(".nts-editor").ntsEditor("validate");
                $("#companyCode").ntsEditor("validate");
                $("#companyName").ntsEditor("validate");
                $("#companyNameKana").ntsEditor("validate");
                $("#companyNameAbb").ntsEditor("validate");
                $("#corporateMyNumber").ntsEditor("validate");
                $("#presidentName").ntsEditor("validate");
                $("#presidentJobTitle").ntsEditor("validate");
                $("#postal").ntsEditor("validate");
                $("#address1").ntsEditor("validate");
                $("#address2").ntsEditor("validate");
                $("#addressKana1").ntsEditor("validate");
                $("#addressKana2").ntsEditor("validate");
                $("#telephoneNo").ntsEditor("validate");
                $("#faxNo").ntsEditor("validate");
                var errorA = false;
                var errorB = false;
                var errorC = false;
                errorA = $("#companyCode").ntsError('hasError') || $("#companyName").ntsError('hasError')
                    || $("#companyNameKana").ntsError('hasError')
                    || $("#companyNameAbb").ntsError('hasError');
                errorB = $("#corporateMyNumber").ntsError('hasError') || $("#presidentName").ntsError('hasError')
                    || $("#presidentJobTitle").ntsError('hasError');
                errorC = $("#postal").ntsError('hasError') || $("#address1").ntsError('hasError')
                    || $("#address2").ntsError('hasError') || $("#addressKana1").ntsError('hasError')
                    || $("#addressKana2").ntsError('hasError') || $("#telephoneNo").ntsError('hasError')
                    || $("#faxNo").ntsError('hasError');
                if ($(".nts-editor").ntsError('hasError') || errorA || errorB || errorC) {
                    return false;
                }
                return true;
            };
            return ViewModel;
        }());
        a.ViewModel = ViewModel;
        var CompanyModel = /** @class */ (function () {
            function CompanyModel(param) {
                this.isEnableCompanyCode = ko.observable(true);
                this.editMode = true; // mode reset or not reset
                var self = this;
                self.init(param);
            }
            CompanyModel.prototype.setDataForCurrentCompany = function (company) {
                var self = this;
                self.companyCode(company.companyCode);
                self.companyName(company.companyName);
                self.companyNameGlobal(company.companyNameGlobal);
                self.companyNameAbb(company.companyNameAbb);
                self.companyNameKana(company.companyNameKana);
                self.corporateMyNumber(company.corporateMyNumber);
                self.address2(company.address2);
                self.address1(company.address1);
                self.addressKana1(company.addressKana1);
                self.addressKana2(company.addressKana2);
                self.depWorkPlaceSet(company.depWorkPlaceSet);
                self.displayAttribute(company.displayAttribute.toString());
                if (company.displayAttribute === 1) {
                    self.isDelete(false);
                }
                else {
                    self.isDelete(true);
                }
                self.faxNo(company.faxNo);
                self.postal(company.postal);
                self.presidentName(company.presidentName);
                self.presidentJobTitle(company.presidentJobTitle);
                self.telephoneNo(company.telephoneNo);
                self.termBeginMon(company.termBeginMon);
                self.companyUseSet(new CompanyUseSet(company.use_Kt_Set, company.use_Qy_Set, company.use_Jj_Set));
                self.selectedRuleCode(company.use_Jj_Set.toString());
                self.selectedRuleCode1(company.use_Kt_Set.toString());
                self.selectedRuleCode2(company.use_Qy_Set.toString());
                self.selectedRuleCode3(company.depWorkPlaceSet.toString());
                self.isEnableCompanyCode(false);
            };
            CompanyModel.prototype.resetCurrentCompany = function () {
                var self = this;
                self.editMode = false;
                self.address1('');
                self.address2('');
                self.addressKana1('');
                self.addressKana2('');
                self.companyName('');
                self.companyNameGlobal('');
                self.companyNameAbb('');
                self.companyNameKana('');
                self.corporateMyNumber('');
                self.depWorkPlaceSet(0);
                self.displayAttribute('');
                self.faxNo('');
                self.postal('');
                self.presidentName('');
                self.presidentJobTitle('');
                self.telephoneNo('');
                self.termBeginMon(0);
                self.companyUseSet(new CompanyUseSet(0, 0, 0));
                self.isDelete(false);
            };
            CompanyModel.prototype.init = function (param) {
                var self = this;
                self.companyCode = ko.observable(param.companyCode);
                self.address1 = ko.observable(param.address1);
                self.address2 = ko.observable(param.address2);
                self.addressKana1 = ko.observable(param.addressKana1);
                self.addressKana2 = ko.observable(param.addressKana2);
                self.companyName = ko.observable(param.companyName);
                self.companyNameGlobal = ko.observable(param.companyNameGlobal);
                self.companyNameAbb = ko.observable(param.companyNameAbb);
                self.companyNameKana = ko.observable(param.companyNameKana);
                self.corporateMyNumber = ko.observable(param.corporateMyNumber);
                self.depWorkPlaceSet = ko.observable(param.depWorkPlaceSet);
                self.displayAttribute = ko.observable(param.displayAttribute);
                self.faxNo = ko.observable(param.faxNo);
                self.postal = ko.observable(param.postal);
                self.presidentName = ko.observable(param.presidentName);
                self.presidentJobTitle = ko.observable(param.presidentJobTitle);
                self.telephoneNo = ko.observable(param.telephoneNo);
                self.termBeginMon = ko.observable(param.termBeginMon);
                self.companyUseSet = ko.observable(param.companyUseSet);
                self.isDelete = ko.observable(param.isDelete || false);
                //SWITCH
                self.roundingRules = ko.observableArray([
                    new RoundingRule("1", '利用する'),
                    new RoundingRule('0', '利用しない')
                ]);
                self.selectedRuleCode = ko.observable("");
                self.selectedRuleCode1 = ko.observable("");
                self.selectedRuleCode2 = ko.observable('');
                self.roundingRules3 = ko.observableArray([
                    new RoundingRule("1", '区別する'),
                    new RoundingRule('0', '区別しない')
                ]);
                self.selectedRuleCode3 = ko.observable("");
            };
            //search Zip Code
            CompanyModel.prototype.searchZipCode = function () {
                var self = this;
                var messageList = [
                    { messageId: "ER001", message: "＊が入力されていません。" },
                    { messageId: "ER005", message: "入力した＊は既に存在しています。\r\n ＊を確認してください。" },
                    { messageId: "ER010", message: "対象データがありません。" }
                ];
                nts.uk.pr.view.base.postcode.service.findPostCodeZipCodeToRespone(self.postal()).done(function (data) {
                    if (data.errorCode == '0') {
                        for (var _i = 0, messageList_1 = messageList; _i < messageList_1.length; _i++) {
                            var datamessage = messageList_1[_i];
                            if (datamessage.messageId == data.message) {
                                $('#postal').ntsError('set', datamessage.message);
                            }
                        }
                    }
                    else if (data.errorCode == '1') {
                        self.postal(data.postcode.postcode);
                        $('#postal').ntsError('clear');
                    }
                    else {
                        nts.uk.pr.view.base.postcode.service.findPostCodeZipCodeSelection(self.postal()).done(function (res) {
                            if (res.errorCode == '0') {
                                for (var _i = 0, messageList_2 = messageList; _i < messageList_2.length; _i++) {
                                    var datamessage = messageList_2[_i];
                                    if (datamessage.messageId == res.message) {
                                        $('#postal').ntsError('set', datamessage.message);
                                    }
                                }
                            }
                            else if (res.errorCode == '1') {
                                self.postal(res.postcode.postcode);
                                $('#postal').ntsError('clear');
                            }
                        }).fail(function (error) {
                            console.log(error);
                        });
                    }
                }).fail(function (error) {
                    console.log(error);
                });
            };
            return CompanyModel;
        }());
        var CompanyUseSet = /** @class */ (function () {
            function CompanyUseSet(useKtSet, useQySet, useJjSet) {
                this.useGrSet = 0;
                this.useKtSet = useKtSet;
                this.useQySet = useQySet;
                this.useJjSet = useJjSet;
                this.useAcSet = 0;
                this.useGwSet = 0;
                this.useHcSet = 0;
                this.useLcSet = 0;
                this.useBiSet = 0;
                this.useRs01Set = 0;
                this.useRs02Set = 0;
                this.useRs03Set = 0;
                this.useRs04Set = 0;
                this.useRs05Set = 0;
                this.useRs06Set = 0;
                this.useRs07Set = 0;
                this.useRs08Set = 0;
                this.useRs09Set = 0;
                this.useRs10Set = 0;
            }
            return CompanyUseSet;
        }());
        a.CompanyUseSet = CompanyUseSet;
        var RoundingRule = /** @class */ (function () {
            function RoundingRule(code, name) {
                this.code = code;
                this.name = name;
            }
            return RoundingRule;
        }());
        var ItemMessage = /** @class */ (function () {
            function ItemMessage(messCode, messName) {
                this.messCode = messCode;
                this.messName = messName;
            }
            return ItemMessage;
        }());
        a.ItemMessage = ItemMessage;
    })(a = cmm001.a || (cmm001.a = {}));
})(cmm001 || (cmm001 = {}));
//# sourceMappingURL=cmm001.a.vm.js.map