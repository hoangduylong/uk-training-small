var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm018;
                (function (cmm018) {
                    var k;
                    (function (k) {
                        var viewmodel;
                        (function (viewmodel) {
                            var setShared = nts.uk.ui.windows.setShared;
                            var resource = nts.uk.resource;
                            var vmbase = cmm018.shr.vmbase;
                            var service = cmm018.k.service;
                            var block = nts.uk.ui.block;
                            var error = nts.uk.ui.dialog.alertError;
                            var getText = nts.uk.resource.getText;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    //==========
                                    this.lstJob = ko.observableArray([]);
                                    this.k2_1 = ko.observable('');
                                    this.k2_2 = ko.observable('');
                                    //承認形態
                                    this.formSetting = ko.observableArray([
                                        new ButtonSelect(1, resource.getText('CMM018_63')),
                                        new ButtonSelect(2, resource.getText('CMM018_66')) //誰か一人
                                    ]);
                                    //CA NHAN
                                    this.columns = ko.observableArray([
                                        { headerText: 'id', prop: 'id', width: '0px', hidden: true },
                                        { headerText: resource.getText('CMM018_69'), prop: 'code', width: '120px' },
                                        { headerText: resource.getText('CMM018_70'), prop: 'name', width: '150px' }
                                    ]);
                                    this.selectFormSet = ko.observable(1);
                                    //GROUP
                                    this.columns2 = ko.observableArray([
                                        { headerText: resource.getText('CMM018_69'), prop: 'code', width: '120px' },
                                        { headerText: resource.getText('CMM018_70'), prop: 'name', width: '300px' }
                                    ]);
                                    this.selectFormSetG = ko.observable(1);
                                    this.lstJobG = ko.observableArray([]);
                                    this.lstGroup = ko.observableArray([]);
                                    this.lstGroup1 = ko.observableArray([]);
                                    this.lstGroup2 = ko.observableArray([]);
                                    this.selectG = ko.observable("");
                                    this.selectG1 = ko.observable("");
                                    this.selectG2 = ko.observable("");
                                    //CHI DINH
                                    this.columns3 = ko.observableArray([
                                        { headerText: resource.getText('CMM018_69'), prop: 'code', width: '120px' },
                                        { headerText: resource.getText('CMM018_70'), prop: 'name', width: '170px' }
                                    ]);
                                    this.selectFormSetS = ko.observable(1);
                                    this.lstJobGS = ko.observableArray([]);
                                    this.lstSpec1 = ko.observableArray([]);
                                    this.lstSpec2 = ko.observableArray([]);
                                    this.selectSpec1 = ko.observable("");
                                    this.selectSpec2 = ko.observable("");
                                    this.systemAtr = 0;
                                    //==========
                                    //enable list workplace
                                    this.enableListWp = ko.observable(true);
                                    this.appType = ko.observable('');
                                    this.standardDate = ko.observable(moment(new Date()).toDate());
                                    //承認者指定種類
                                    this.typeSetting = ko.observableArray([]);
                                    this.selectTypeSet = ko.observable(null);
                                    this.employeeList = ko.observableArray([]);
                                    this.approverList = ko.observableArray([]);
                                    this.currentApproveCodeLst = ko.observableArray([]);
                                    this.currentEmployeeCodeLst = ko.observableArray([]);
                                    this.items = ko.observableArray([]);
                                    //確定者の選択
                                    this.itemListCbb = ko.observableArray([]);
                                    this.cbbEnable = ko.observable(false);
                                    this.selectedCbbCode = ko.observable("");
                                    //↓ & ↑
                                    this.currentCodeListSwap = ko.observableArray([]);
                                    //→ & ←
                                    this.itemsSwapLR = ko.observableArray([]);
                                    this.currentCodeListSwapLR = ko.observableArray([]);
                                    this.confirm = '';
                                    //職場リスト
                                    this.treeGrid = null;
                                    //選択可能な職位一覧
                                    //承認者の登録(個人別)
                                    this.personTab = 2;
                                    //設定種類
                                    this.personSetting = 0; //個人設定
                                    this.lstTmp = ko.observableArray([]);
                                    var self = this;
                                    self.itemListCbb.push(new vmbase.ApproverDtoK('', '', '指定しない', 0, 0));
                                    //設定対象: get param from main: approverInfor(id & approvalAtr)
                                    var data = nts.uk.ui.windows.getShared('CMM018K_PARAM');
                                    self.systemAtr = data.systemAtr || 0;
                                    self.treeGrid = {
                                        treeType: 1,
                                        selectType: data.typeSetting == 2 ? 1 : 3,
                                        isDialog: true,
                                        isMultiSelect: false,
                                        isShowAlreadySet: false,
                                        isShowSelectButton: true,
                                        baseDate: ko.observable(this.standardDate()),
                                        selectedId: data.typeSetting == 2 ? ko.observableArray([data.specWkpId]) : ko.observableArray([]),
                                        alreadySettingList: ko.observableArray([]),
                                        systemType: self.systemAtr == 1 ? 4 : 2,
                                        width: 310,
                                        startMode: data.systemAtr
                                    };
                                    //確定者(K2_21)の選択肢を承認者一覧(K2_15)と合わせる(update item cua control 確定者(K2_21)  theo 承認者一覧(K2_15))
                                    self.approverList.subscribe(function () {
                                        self.setDataForCbb();
                                    });
                                    self.getData();
                                    //Subscribe PERSON - CHI DINH - GROUP
                                    self.selectTypeSet.subscribe(function (newValue) {
                                        if (self.checkEmpty(newValue))
                                            return;
                                        self.bindData(newValue);
                                        ko.tasks.schedule(function () {
                                            //                    console.log($('div#prev-next-button').is(':visible')); 
                                            if (newValue != 1)
                                                return;
                                            var msie = window.navigator.userAgent.indexOf("MSIE ");
                                            if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer
                                             {
                                            }
                                            else // If another browser, return 0
                                             {
                                                $('div#prev-next-button').css('margin-left', '20px');
                                                $('div#prev-next-button').css('position', '');
                                                $('div#selected-approver').css('margin-left', '25px');
                                            }
                                        });
                                    });
                                    var specLabel = self.systemAtr == 0 ? resource.getText('CMM018_100') : resource.getText('CMM018_101');
                                    //承認者指定種類
                                    //０：会社、１：職場、２：個人
                                    if (data.tab == 2) {
                                        self.typeSetting([new ButtonSelect(0, resource.getText('CMM018_56'))]);
                                    }
                                    else {
                                        self.typeSetting([new ButtonSelect(1, resource.getText('CMM018_57')),
                                            new ButtonSelect(2, specLabel),
                                            new ButtonSelect(0, resource.getText('CMM018_56'))]);
                                    }
                                    self.selectTypeSet(data.typeSetting);
                                    self.confirm = data.confirmedPerson;
                                    //change 承認形態
                                    self.selectFormSet.subscribe(function (newValues) {
                                        //承認形態が誰か一人を選択する場合
                                        if (newValues === vmbase.ApprovalForm.SINGLE_APPROVED) {
                                            self.cbbEnable(true);
                                        }
                                        else {
                                            //承認形態が全員承認を選択する場合
                                            self.cbbEnable(false);
                                        }
                                    });
                                    if (data !== undefined) {
                                        //設定する対象申請名
                                        self.appType(data.appTypeName);
                                        //承認形態
                                        if (data.typeSetting == TypeSet.PERSON) {
                                            if (data.formSetting == 2) {
                                                self.selectedCbbCode(data.confirmedPerson);
                                                self.setDataForCbb();
                                            }
                                            self.selectFormSet(data.formSetting);
                                        }
                                        else if (data.typeSetting == TypeSet.GROUP) {
                                            self.selectFormSetG(data.formSetting);
                                        }
                                        else {
                                            self.selectFormSetS(data.formSetting);
                                        }
                                        //承認者の登録(個人別): 非表示
                                        if (data.tab === self.personTab) {
                                            $('#typeSetting').hide();
                                        }
                                        else {
                                            $('#typeSetting').show();
                                        }
                                    }
                                    //基準日
                                    this.standardDate(moment(new Date()).toDate());
                                    //職場リスト            
                                    self.treeGrid.selectedId.subscribe(function (newValues) {
                                        if (self.checkEmpty(newValues))
                                            return;
                                        if (self.selectTypeSet() == TypeSet.PERSON) {
                                            block.invisible();
                                            self.getDataWpl().done(function (lstA) {
                                                block.clear();
                                                lstA = _.orderBy(lstA, ['code'], ['asc']); // Use Lodash to sort array by 'code'
                                                self.employeeList(lstA);
                                            }).fail(function () {
                                                block.clear();
                                            });
                                        }
                                    });
                                    // fix break layout on IE
                                    //            window.onresize = function(event) {
                                    //            	if ((navigator.userAgent.match(/msie/i) != null || navigator.userAgent.match(/trident/i) != null) && $("#prev-next-button").width() < 75) {
                                    //            		$("#selected-approver").css("margin-left", 100 - $("#prev-next-button").width() + "px");
                                    //            	}
                                    //            }
                                } // end constructor
                                ScreenModel.prototype.checkEmpty = function (value) {
                                    if (nts.uk.util.isNullOrUndefined(value) || nts.uk.util.isNullOrEmpty(value))
                                        return true;
                                    return false;
                                };
                                ScreenModel.prototype.setDataForCbb = function () {
                                    var self = this;
                                    //add item in  dropdownlist
                                    self.itemListCbb.removeAll();
                                    self.itemListCbb.push(new vmbase.ApproverDtoK('', '', '指定しない', 0, 0));
                                    if (self.approverList().length > 0) {
                                        _.forEach(self.approverList(), function (item) {
                                            self.itemListCbb.push(item);
                                        });
                                        self.selectedCbbCode(self.confirm);
                                    }
                                };
                                ScreenModel.prototype.getData = function () {
                                    var self = this;
                                    var data = nts.uk.ui.windows.getShared('CMM018K_PARAM');
                                    if (data.approverInfor.length <= 0)
                                        return;
                                    if (data.typeSetting == TypeSet.PERSON) {
                                        _.forEach(data.approverInfor, function (item) {
                                            self.approverList.push({ id: item.id, code: item.code, name: item.name, dispOrder: item.dispOrder });
                                        });
                                        self.approverList(_.orderBy(self.approverList(), ["dispOrder"], ["asc"]));
                                    }
                                    else if (data.typeSetting == TypeSet.GROUP) {
                                        _.each(data.approverInfor, function (appr) {
                                            if (appr.dispOrder == 1) {
                                                self.lstGroup1.push({ code: appr.code, name: appr.name, dispOrder: appr.dispOrder });
                                            }
                                            else {
                                                self.lstGroup2.push({ code: appr.code, name: appr.name, dispOrder: appr.dispOrder });
                                            }
                                        });
                                        self.lstGroup2(_.orderBy(self.lstGroup2(), ["dispOrder"], ["asc"]));
                                    }
                                    else { //CHI DINH
                                        _.each(data.approverInfor, function (appr) {
                                            self.lstSpec2.push({ code: appr.code, name: appr.name, dispOrder: appr.dispOrder });
                                        });
                                        self.lstSpec2(_.orderBy(self.lstSpec2(), ["dispOrder"], ["asc"]));
                                        if (data.approverInfor.length > 0) {
                                            self.treeGrid.selectedId(data.specWkpId);
                                        }
                                    }
                                };
                                //bind data
                                ScreenModel.prototype.bindData = function (selectTypeSet) {
                                    var self = this;
                                    if (selectTypeSet == TypeSet.PERSON) { //PERSON
                                        self.k2_1(getText('CMM018_61'));
                                        self.k2_2(getText('CMM018_62'));
                                        self.enableListWp(true);
                                        $('#tree-grid').ntsTreeComponent(self.treeGrid);
                                    }
                                    else if (selectTypeSet == TypeSet.SPEC_WKP) { //CHI DINH
                                        self.k2_1(getText('CMM018_110'));
                                        self.k2_2(getText('CMM018_111'));
                                        self.enableListWp(true);
                                        $('#tree-grid').ntsTreeComponent(self.treeGrid);
                                        if (self.lstJobGS().length > 0)
                                            return; //データがある 
                                        if (self.lstJob().length > 0) {
                                            var lst = _.clone(self.lstJob());
                                            self.lstJobGS(lst);
                                            _.each(lst, function (i) {
                                                if (self.checkExLstR(self.lstSpec2(), i) === undefined) {
                                                    self.lstSpec1.push(i);
                                                }
                                            });
                                        }
                                        else {
                                            block.invisible();
                                            service.jobGroup().done(function (data) {
                                                var lst = _.clone(data);
                                                self.lstJob(lst);
                                                self.lstJobGS(lst);
                                                _.each(lst, function (i) {
                                                    if (self.checkExLstR(self.lstSpec2(), i) === undefined) {
                                                        self.lstSpec1.push(i);
                                                    }
                                                });
                                                block.clear();
                                            }).fail(function (res) {
                                                block.clear();
                                            });
                                        }
                                    }
                                    else { //GROUP
                                        self.k2_1(getText('CMM018_110'));
                                        self.k2_2(getText('CMM018_111'));
                                        self.enableListWp(false);
                                        if (self.lstJobG().length > 0)
                                            return; //データがある     
                                        if (self.lstJob().length > 0) {
                                            var lst = _.clone(self.lstJob());
                                            self.lstJobG(lst);
                                            _.each(lst, function (i) {
                                                if ((self.checkExLstR(self.lstGroup1(), i) === undefined) && (self.checkExLstR(self.lstGroup2(), i) === undefined)) {
                                                    self.lstGroup.push(i);
                                                }
                                            });
                                        }
                                        else {
                                            block.invisible();
                                            service.jobGroup().done(function (data) {
                                                var lst = _.clone(data);
                                                self.lstJob(lst);
                                                self.lstJobG(lst);
                                                _.each(lst, function (i) {
                                                    if ((self.checkExLstR(self.lstGroup1(), i) === undefined) && (self.checkExLstR(self.lstGroup2(), i) === undefined)) {
                                                        self.lstGroup.push(i);
                                                    }
                                                });
                                                block.clear();
                                            }).fail(function (res) {
                                                block.clear();
                                            });
                                        }
                                    }
                                };
                                ScreenModel.prototype.checkExLstR = function (lst, i) {
                                    return _.find(lst, function (a) {
                                        return a.code == i.code;
                                    });
                                };
                                ScreenModel.prototype.getDataWpl = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    var employeeSearch = new service.model.EmployeeSearchInDto();
                                    employeeSearch.baseDate = self.standardDate();
                                    employeeSearch.sysAtr = self.systemAtr;
                                    var lstWkp1 = [self.treeGrid.selectedId()];
                                    var lstA = [];
                                    var UNIT = 100;
                                    var _loop_1 = function (i_1) {
                                        if (i_1 + UNIT > lstWkp1.length) {
                                            employeeSearch.workplaceIds = lstWkp1.slice(i_1, lstWkp1.length);
                                        }
                                        else {
                                            employeeSearch.workplaceIds = lstWkp1.slice(i_1, i_1 + UNIT);
                                        }
                                        service.searchModeEmployee(employeeSearch).done(function (data) {
                                            var lstTmp = self.toUnitModelList(data);
                                            _.each(lstTmp, function (item) {
                                                lstA.push(new vmbase.ApproverDtoK(item.id, item.code, item.name, item.approvalAtr, 0));
                                            });
                                            if (i_1 + UNIT > lstWkp1.length) {
                                                dfd.resolve(lstA);
                                            }
                                        });
                                    };
                                    for (var i_1 = 0; i_1 < lstWkp1.length; i_1 += UNIT) {
                                        _loop_1(i_1);
                                    }
                                    if (lstWkp1.length == 0) {
                                        dfd.resolve(lstA);
                                    }
                                    return dfd.promise();
                                };
                                //決定 button click
                                ScreenModel.prototype.submitClickButton = function () {
                                    var self = this;
                                    var lstApprover = [];
                                    var approvalForm = 1;
                                    var confirmSet = '';
                                    var specWkpId = null;
                                    //決定情報をチェック
                                    if (self.selectTypeSet() == TypeSet.PERSON) { //PERSON
                                        _.each(self.approverList(), function (appr, index) {
                                            lstApprover.push({ id: appr.id, code: appr.code, name: appr.name, dispOrder: index + 1 });
                                        });
                                        approvalForm = self.selectFormSet();
                                        confirmSet = self.selectedCbbCode();
                                    }
                                    else if (self.selectTypeSet() == TypeSet.SPEC_WKP) { //CHI DINH
                                        if (self.checkEmpty(self.treeGrid.selectedId())) {
                                            if (self.systemAtr == 0) {
                                                error({ messageId: 'Msg_1582', messageParams: [getText('Com_Workplace')] });
                                            }
                                            else {
                                                error({ messageId: 'Msg_1582', messageParams: [getText('Com_Department')] });
                                            }
                                            return;
                                        }
                                        _.each(self.lstSpec2(), function (item, index) {
                                            lstApprover.push({ code: item.code, name: item.name, dispOrder: index + 1 });
                                        });
                                        approvalForm = self.selectFormSetS();
                                        specWkpId = self.treeGrid.selectedId() || '';
                                    }
                                    else { //GROUP
                                        if (self.lstGroup2().length > 0 && self.lstGroup1().length == 0) {
                                            error({ messageId: 'Msg_1606', messageParams: [getText('CMM018_102')] });
                                            return;
                                        }
                                        if (self.lstGroup1().length > 0) {
                                            var jG1 = self.lstGroup1()[0];
                                            lstApprover.push({ code: jG1.code, name: jG1.name, dispOrder: 1 });
                                        }
                                        _.each(self.lstGroup2(), function (job, index) {
                                            lstApprover.push({ code: job.code, name: job.name, dispOrder: index + 2 });
                                        });
                                        approvalForm = self.selectFormSetG();
                                    }
                                    var data = { appType: self.appType(),
                                        formSetting: approvalForm,
                                        approverInfor: lstApprover,
                                        confirmedPerson: confirmSet,
                                        selectTypeSet: self.selectTypeSet(),
                                        approvalFormName: approvalForm == vmbase.ApprovalForm.EVERYONE_APPROVED ?
                                            resource.getText('CMM018_63') : resource.getText('CMM018_66'),
                                        specWkpId: specWkpId
                                    };
                                    console.log(data);
                                    setShared("CMM018K_DATA", data);
                                    nts.uk.ui.windows.close();
                                };
                                //キャンセル button click
                                ScreenModel.prototype.closeDialog = function () {
                                    setShared("CMM018K_DATA", null);
                                    nts.uk.ui.windows.close();
                                };
                                /**
                                 * function convert dto to model init data
                                 */
                                ScreenModel.prototype.toUnitModelList = function (dataList) {
                                    var dataRes = [];
                                    for (var _i = 0, dataList_1 = dataList; _i < dataList_1.length; _i++) {
                                        var item = dataList_1[_i];
                                        var a_1 = {
                                            id: item.sid,
                                            code: item.scd,
                                            name: item.pname,
                                            approvalAtr: 0
                                        };
                                        dataRes.push(a_1);
                                    }
                                    return dataRes;
                                };
                                //when click button → 
                                ScreenModel.prototype.nextItem = function () {
                                    var self = this;
                                    if (self.selectTypeSet() == TypeSet.SPEC_WKP) { //CHI DINH
                                        if (self.checkEmpty(self.selectSpec1()))
                                            return;
                                        var itemSl = self.findJobGSelect(self.lstSpec1(), self.selectSpec1());
                                        _.remove(self.lstSpec1(), function (item) {
                                            return item.code == self.selectSpec1();
                                        });
                                        if (self.lstSpec2().length >= 1) {
                                            nts.uk.ui.dialog.info({ messageId: 'Msg_1588', messageParams: [1] });
                                            var itemOld = self.lstSpec2()[0];
                                            self.lstSpec1().push(itemOld);
                                        }
                                        self.lstSpec2([]);
                                        self.lstSpec2.push(itemSl);
                                        self.selectSpec1('');
                                    }
                                    else { //GROUP
                                        if (self.checkEmpty(self.selectG()))
                                            return;
                                        if (self.lstGroup1().length + self.lstGroup2().length >= 5) {
                                            error({ messageId: 'Msg_1588', messageParams: [5] });
                                            return;
                                        }
                                        var itemSl = self.findJobGSelect(self.lstGroup(), self.selectG());
                                        _.remove(self.lstGroup(), function (item) {
                                            return item.code == self.selectG();
                                        });
                                        if (self.lstGroup1().length == 0) {
                                            self.lstGroup1.push(itemSl);
                                        }
                                        else {
                                            self.lstGroup2.push(itemSl);
                                        }
                                        self.selectG('');
                                    }
                                };
                                //when click button ←
                                ScreenModel.prototype.prevItem = function () {
                                    var self = this;
                                    if (self.selectTypeSet() == TypeSet.SPEC_WKP) { //CHI DINH
                                        if (self.checkEmpty(self.selectSpec2()))
                                            return;
                                        var itemSl = self.findJobGSelect(self.lstSpec2(), self.selectSpec2());
                                        _.remove(self.lstSpec2(), function (item) {
                                            return item.code == self.selectSpec2();
                                        });
                                        self.lstSpec1.push(itemSl);
                                        self.selectSpec2('');
                                    }
                                    else { //GROUP
                                        if (self.checkEmpty(self.selectG1()))
                                            return;
                                        var itemSl = self.findJobGSelect(self.lstGroup1(), self.selectG1());
                                        if (itemSl !== undefined) { //List G1
                                            _.remove(self.lstGroup1(), function (item) {
                                                return item.code == self.selectG1();
                                            });
                                        }
                                        else { //List G2
                                            itemSl = self.findJobGSelect(self.lstGroup2(), self.selectG1());
                                            _.remove(self.lstGroup2(), function (item) {
                                                return item.code == self.selectG1();
                                            });
                                        }
                                        self.lstGroup.push(itemSl);
                                        self.selectG1('');
                                    }
                                };
                                //find jobG selected
                                ScreenModel.prototype.findJobGSelect = function (lstItem, selected) {
                                    return _.find(lstItem, function (jobG) {
                                        return jobG.code == selected;
                                    });
                                };
                                return ScreenModel;
                            }()); //end ScreenModel
                            viewmodel.ScreenModel = ScreenModel;
                            var SimpleObject = /** @class */ (function () {
                                function SimpleObject(key, name) {
                                    this.key = ko.observable(key);
                                    this.name = ko.observable(name);
                                }
                                return SimpleObject;
                            }());
                            var ButtonSelect = /** @class */ (function () {
                                function ButtonSelect(code, name) {
                                    this.code = code;
                                    this.name = name;
                                }
                                return ButtonSelect;
                            }());
                            viewmodel.ButtonSelect = ButtonSelect;
                            var TypeSet;
                            (function (TypeSet) {
                                /** 個人*/
                                TypeSet[TypeSet["PERSON"] = 0] = "PERSON";
                                /** 職格*/
                                TypeSet[TypeSet["GROUP"] = 1] = "GROUP";
                                /** 特定職場*/
                                TypeSet[TypeSet["SPEC_WKP"] = 2] = "SPEC_WKP";
                            })(TypeSet || (TypeSet = {}));
                        })(viewmodel = k.viewmodel || (k.viewmodel = {}));
                    })(k = cmm018.k || (cmm018.k = {}));
                })(cmm018 = view.cmm018 || (view.cmm018 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm018.k.vm.js.map