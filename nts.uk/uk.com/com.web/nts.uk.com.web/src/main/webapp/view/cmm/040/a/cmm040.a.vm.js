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
                    var a;
                    (function (a) {
                        var viewmodel;
                        (function (viewmodel) {
                            var block = nts.uk.ui.block;
                            var errors = nts.uk.ui.errors;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.workPlacesList = ko.observableArray([]);
                                    this.selectedWorkLocation = ko.observable(null);
                                    //selectedWorkLocation: KnockoutObservable<any>;
                                    //
                                    this.valueA5_2 = ko.observable('');
                                    this.radius = ko.observable(1);
                                    //
                                    this.latitude = ko.observable(null);
                                    this.longitude = ko.observable(null);
                                    this.workPlaceID = ko.observable('');
                                    this.listWorkPlaceIDs = [];
                                    this.LoginCompanyId = '';
                                    this.items = [];
                                    this.listSelectWorkplaceID = [];
                                    this.cdl008data = ko.observableArray([]);
                                    this.listIpCancel = ko.observableArray([]);
                                    this.workplaceCode = ko.observable('');
                                    this.workplaceDisplayName = ko.observable('');
                                    this.changeWorkPlaceID = '';
                                    // Cần đạt như này để lưu đúng giá trị vào database.
                                    this.defautValueLocation = '0.000000';
                                    var self = this;
                                    self.option = new nts.uk.ui.option.NumberEditorOption({
                                        numberGroup: true,
                                        decimallength: 6,
                                        textalign: "left"
                                    });
                                    self.workLocationCD = ko.observable('');
                                    self.workLocationName = ko.observable('');
                                    self.currentBonusPaySetting = ko.observable(new BonusPaySetting('', '', ''));
                                    //
                                    self.isCreate = ko.observable(null);
                                    self.enableA53 = ko.observable(false);
                                    //
                                    self.radiusEnum = ko.observableArray([]);
                                    self.itemList = ko.observableArray([]);
                                    self.itemList = ko.observableArray([
                                        new ItemModel('0', 'M_50'),
                                        new ItemModel('1', 'M_100'),
                                        new ItemModel('2', 'M_200'),
                                        new ItemModel('3', 'M_300'),
                                        new ItemModel('4', 'M_400'),
                                        new ItemModel('5', 'M_500'),
                                        new ItemModel('6', 'M_600'),
                                        new ItemModel('7', 'M_700'),
                                        new ItemModel('8', 'M_800'),
                                        new ItemModel('9', 'M_900'),
                                        new ItemModel('10', 'M_1000')
                                    ]);
                                    self.tabs = ko.observableArray([
                                        { id: 'tab-1', title: nts.uk.resource.getText("CMM040_9"), content: '.tab-content-1', enable: ko.observable(true), visible: ko.observable(true) },
                                        { id: 'tab-2', title: nts.uk.resource.getText("CMM040_10"), content: '.tab-content-2', enable: ko.observable(true), visible: ko.observable(true) }
                                    ]);
                                    self.selectedTab = ko.observable('tab-1');
                                    self.selectedWorkLocation.subscribe(function (value) {
                                        //if (value == null || value == self.workLocationCD()) return;
                                        if (value == null || value == "") {
                                            self.newMode();
                                            return;
                                        }
                                        ;
                                        // if (value == null) return;
                                        self.items = [];
                                        self.selectWorkLocation(value);
                                        self.listIpCancel();
                                    });
                                    self.valueA5_2.subscribe(function (value) {
                                        if (value == "") {
                                            self.enableA53(false);
                                        }
                                        else {
                                            self.enableA53(true);
                                        }
                                    });
                                    self.longitude.subscribe(function (value) {
                                        if (value.toString() == "" || (value > 180) || (value < -180)) {
                                            var temp = _.find(nts.uk.ui.errors.getErrorList(), function (o) { return o.errorCode == "Msg_2161"; });
                                            if (temp == null) {
                                                $('#validatelong').ntsError('set', { messageId: "Msg_2161" });
                                            }
                                        }
                                    });
                                    self.latitude.subscribe(function (value) {
                                        if (value.toString() == "" || (value > 90) || (value < -90)) {
                                            var temp = _.find(nts.uk.ui.errors.getErrorList(), function (o) { return o.errorCode == "Msg_2162"; });
                                            if (temp == null) {
                                                $('#validatelat').ntsError('set', { messageId: "Msg_2162" });
                                            }
                                        }
                                    });
                                }
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    this.loadRadiusEnums().done(function (res) {
                                        console.log("getEnum");
                                    });
                                    this.reloadData().done(function () {
                                        setTimeout(function () {
                                            var datas = _.orderBy(self.items, ['companyCode'], ['asc']);
                                            dfd.resolve();
                                            self.selectWorkLocation(ko.unwrap(self.workLocationCD));
                                        }, 100);
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.setDataWorkPlace = function (data) {
                                    var self = this;
                                    if (data) {
                                        if (data.listCidAndWorkplaceInfo != null && data.listCidAndWorkplaceInfo.length > 0) {
                                            if (data.listCidAndWorkplaceInfo[0].listWorkplaceInfoImport != null && data.listCidAndWorkplaceInfo[0].listWorkplaceInfoImport.length > 0) {
                                                self.workplaceCode(data.listCidAndWorkplaceInfo[0].listWorkplaceInfoImport[0].workplaceCode);
                                                self.workplaceDisplayName(data.listCidAndWorkplaceInfo[0].listWorkplaceInfoImport[0].workplaceDisplayName);
                                                self.listSelectWorkplaceID = [];
                                                self.listWorkPlaceIDs = [];
                                                self.listWorkPlaceIDs.push({ companyId: self.LoginCompanyId, workpalceId: data.listCidAndWorkplaceInfo[0].listWorkplaceInfoImport[0].workplaceId });
                                                self.listSelectWorkplaceID.push(data.listCidAndWorkplaceInfo[0].listWorkplaceInfoImport[0].workplaceId);
                                                self.changeWorkPlaceID = data.listCidAndWorkplaceInfo[0].listWorkplaceInfoImport[0].workplaceId;
                                            }
                                            else {
                                                self.listSelectWorkplaceID = [];
                                                self.listWorkPlaceIDs = [];
                                                self.workplaceCode('');
                                                self.workplaceDisplayName('');
                                                self.changeWorkPlaceID = '';
                                            }
                                        }
                                        else {
                                            self.listSelectWorkplaceID = [];
                                            self.listWorkPlaceIDs = [];
                                            self.workplaceCode('');
                                            self.workplaceDisplayName('');
                                            self.changeWorkPlaceID = '';
                                        }
                                    }
                                    else {
                                        self.workplaceCode(ko.unwrap(self.workplaceCode));
                                        //self.workplaceDisplayName(ko.unwrap(self.workplaceCode));
                                        self.workplaceDisplayName(ko.unwrap(self.workplaceDisplayName));
                                    }
                                };
                                //tab3
                                ScreenModel.prototype.reloadData = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    /** Get list TitleMenu*/
                                    a.service.getDataStart().done(function (data) {
                                        self.workPlacesList(data.listWorkLocationDto);
                                        self.LoginCompanyId = data.companyId;
                                        if (data.listWorkLocationDto.length) {
                                            var i_1;
                                            var listCidAndWorkplace = [];
                                            var listWorkplace = [];
                                            //let listWorkplaceS = data.listWorkLocationDto;
                                            if (self.workLocationCD() == "") {
                                                var result = data.listWorkLocationDto[0];
                                                self.workLocationCD(result.workLocationCD);
                                                self.selectedWorkLocation(self.workLocationCD());
                                                self.workLocationName(result.workLocationName);
                                                self.radius(result.radius);
                                                self.latitude(result.latitude);
                                                self.longitude(result.longitude);
                                                self.isCreate(false);
                                            }
                                            //
                                            var listWorkplaceS = _.filter(data.listWorkLocationDto, function (o) { return o.workLocationCD == self.workLocationCD(); });
                                            for (i_1 = 0; i_1 < listWorkplaceS.length; i_1++) {
                                                if (listWorkplaceS[i_1].workplace != null) {
                                                    for (j = 0; j < listWorkplaceS[i_1].workplace.length; j++) {
                                                        listWorkplace.push({
                                                            companyId: listWorkplaceS[i_1].listWorkplace[j].companyId,
                                                            workpalceId: listWorkplaceS[i_1].listWorkplace[j].workpalceId
                                                        });
                                                    }
                                                }
                                            }
                                            a.service.getWorkPlace({ listWorkplace: listWorkplace, workLocationCD: ko.unwrap(self.workLocationCD) }).done(function (data) {
                                                self.loginInfo = data;
                                                var list = [];
                                                var datagrid = [];
                                                self.setDataWorkPlace(data);
                                                for (i_1 = 0; i_1 < data.listCompany.length; i_1++) {
                                                    var list1 = _.filter(data.listCidAndWorkplaceInfo, function (o) { return o.companyId == data.listCompany[i_1].companyId; });
                                                    var workPlaceCode = '';
                                                    var workPlaceName = '';
                                                    if (list1.length > 0) {
                                                        for (j = 0; j < list1[0].listWorkplaceInfoImport.length; j++) {
                                                            workPlaceCode += list1[0].listWorkplaceInfoImport[j].workplaceCode + '</br>';
                                                            workPlaceName += list1[0].listWorkplaceInfoImport[j].workplaceDisplayName + '</br>';
                                                        }
                                                    }
                                                    datagrid.push(new GridItem(data.listCompany[i_1].companyCode, data.listCompany[i_1].companyName, workPlaceCode, workPlaceName));
                                                }
                                                self.items = datagrid;
                                                dfd.resolve();
                                            });
                                        }
                                        else {
                                            self.selectWorkLocation(null);
                                            self.isCreate(true);
                                            var listWorkplace = [{ companyId: __viewContext.user.companyId, workpalceId: '' }];
                                            a.service.getWorkPlace({ listWorkplace: listWorkplace, workLocationCD: ko.unwrap(self.workLocationCD) }).done(function (data) {
                                                self.setDataWorkPlace(data);
                                                self.loginInfo = data;
                                                var list = [];
                                                var datagrid = [];
                                                for (i = 0; i < data.listCompany.length; i++) {
                                                    var list1 = _.filter(data.listCidAndWorkplaceInfo, function (o) { return o.companyId == data.listCompany[i].companyId; });
                                                    var workPlaceCode = '';
                                                    var workPlaceName = '';
                                                    if (list1.length > 0) {
                                                        for (j = 0; j < list1[0].listWorkplaceInfoImport.length; j++) {
                                                            workPlaceCode += list1[0].listWorkplaceInfoImport[j].workplaceCode + '</br>';
                                                            workPlaceName += list1[0].listWorkplaceInfoImport[j].workplaceDisplayName + '</br>';
                                                        }
                                                    }
                                                    datagrid.push(new GridItem(data.listCompany[i].companyCode, data.listCompany[i].companyName, workPlaceCode, workPlaceName));
                                                }
                                                self.items = datagrid;
                                                var checkdata = _.filter(self.items, function (o) { return o.companyCode == __viewContext.user.companyCode; });
                                                if (checkdata.length == 0) {
                                                    self.items.push(new GridItem(data.listCompany[0].companyCode, data.listCompany[0].companyName, '', ''));
                                                }
                                                dfd.resolve();
                                            });
                                            $("#focus").focus();
                                        }
                                    }).fail(function (error) {
                                        dfd.fail();
                                        nts.uk.ui.dialog.alertError(error.message);
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.selectWorkLocation = function (workLocationCD) {
                                    errors.clearAll();
                                    var self = this;
                                    self.isCreate(false);
                                    self.valueA5_2('');
                                    var data = _.find(self.workPlacesList(), ['workLocationCD', workLocationCD]);
                                    // $("#grid2").remove();
                                    // $("#grid").append("<table id='grid2'></table>");
                                    self.listWorkPlaceIDs = [];
                                    if (workLocationCD != null && workLocationCD != "") {
                                        self.isCreate(false);
                                        self.workLocationCD(data.workLocationCD);
                                        self.workLocationName(data.workLocationName);
                                        self.radius(data.radius);
                                        self.latitude(data.latitude);
                                        self.longitude(data.longitude);
                                        var listWorkplace = [];
                                        var list1 = _.find(self.workPlacesList(), function (o) { return o.workLocationCD == workLocationCD; });
                                        if (list1 != null && list1.workplace != null && list1.workplace.length > 0) {
                                            for (var j = 0; j < list1.workplace.length; j++) {
                                                listWorkplace.push({
                                                    companyId: list1.listWorkplace[j].companyId,
                                                    workpalceId: list1.listWorkplace[j].workpalceId
                                                });
                                            }
                                        }
                                        else {
                                            listWorkplace.push({
                                                companyId: __viewContext.user.companyId,
                                                workpalceId: ''
                                            });
                                        }
                                        if (listWorkplace.length > 0) {
                                            var getWplLogin = _.filter(listWorkplace, function (o) { return o.companyId == self.LoginCompanyId; });
                                            for (var i = 0; i < getWplLogin.length; i++) {
                                                self.listWorkPlaceIDs.push({ companyId: self.LoginCompanyId, workpalceId: getWplLogin[i].workpalceId });
                                            }
                                            a.service.getWorkPlace({ listWorkplace: listWorkplace, workLocationCD: ko.unwrap(self.workLocationCD) }).done(function (data) {
                                                self.setDataWorkPlace(data);
                                                self.loginInfo = data;
                                                var list = [];
                                                var datagrid = [];
                                                self.listSelectWorkplaceID = [];
                                                if (data.listCidAndWorkplaceInfo.length > 0) {
                                                    for (var i = 0; i < data.listCidAndWorkplaceInfo.length; i++) {
                                                        if (data.listCidAndWorkplaceInfo[i].companyId == __viewContext.user.companyId) {
                                                            for (var k = 0; k < data.listCidAndWorkplaceInfo[i].listWorkplaceInfoImport.length; k++) {
                                                                self.listSelectWorkplaceID.push(data.listCidAndWorkplaceInfo[i].listWorkplaceInfoImport[k].workplaceId);
                                                            }
                                                            break;
                                                        }
                                                    }
                                                }
                                                var _loop_1 = function (i) {
                                                    var list1_1 = _.filter(data.listCidAndWorkplaceInfo, function (o) { return o.companyId == data.listCompany[i].companyId; });
                                                    var workPlaceCode = '';
                                                    var workPlaceName = '';
                                                    if (list1_1.length > 0) {
                                                        for (var j = 0; j < list1_1[0].listWorkplaceInfoImport.length; j++) {
                                                            workPlaceCode += list1_1[0].listWorkplaceInfoImport[j].workplaceCode + '</br>';
                                                            workPlaceName += list1_1[0].listWorkplaceInfoImport[j].workplaceDisplayName + '</br>';
                                                        }
                                                    }
                                                    datagrid.push(new GridItem(data.listCompany[i].companyCode, data.listCompany[i].companyName, workPlaceCode, workPlaceName));
                                                };
                                                for (var i = 0; i < data.listCompany.length; i++) {
                                                    _loop_1(i);
                                                }
                                                var checkdata = _.filter(datagrid, function (o) { return o.companyCode == __viewContext.user.companyCode; });
                                                if (checkdata.length == 0) {
                                                    var listWorkplace1 = [];
                                                    listWorkplace1.push({
                                                        companyId: __viewContext.user.companyId,
                                                        workpalceId: ''
                                                    });
                                                    a.service.getWorkPlace({ listWorkplace: listWorkplace1, workLocationCD: ko.unwrap(self.workLocationCD) }).done(function (data) {
                                                        self.setDataWorkPlace(data);
                                                        self.items = datagrid;
                                                        self.items.push(new GridItem(data.listCompany[0].companyCode, data.listCompany[0].companyName, '', ''));
                                                        var datas = _.orderBy(self.items, ['companyCode'], ['asc']);
                                                    });
                                                }
                                                else {
                                                    self.items = datagrid;
                                                    var datas = _.orderBy(self.items, ['companyCode'], ['asc']);
                                                }
                                            });
                                            $("#focusName").focus();
                                        }
                                    }
                                    else {
                                        self.isCreate(true);
                                        self.workLocationCD('');
                                        self.workLocationName('');
                                        self.radius(0);
                                        self.longitude(self.defautValueLocation);
                                        self.latitude(self.defautValueLocation);
                                        self.selectedWorkLocation(null);
                                        $("#focus").focus();
                                        errors.clearAll();
                                    }
                                };
                                //
                                ScreenModel.prototype.findByIndex = function (index) {
                                    var self = this;
                                    var data = _.nth(self.workPlacesList(), index);
                                    if (data !== undefined) {
                                        self.selectedWorkLocation(data.workLocationCD);
                                    }
                                    else {
                                        self.selectedWorkLocation(null);
                                    }
                                };
                                ScreenModel.prototype.openB = function () {
                                    var self = this;
                                    var param = {
                                        workLocationCD: self.workLocationCD(),
                                        workLocationName: self.workLocationName()
                                    };
                                    nts.uk.ui.windows.setShared("CMM040B", param);
                                    nts.uk.ui.windows.sub.modal("/view/cmm/040/b/index.xhtml", { dialogClass: "no-close" }).onClosed(function () {
                                        self.listIpCancel(nts.uk.ui.windows.getShared('DataCMM040B'));
                                    });
                                };
                                ScreenModel.prototype.buttonA5_3 = function () {
                                    var self = this;
                                    var url = "https://www.google.co.jp/maps/place/" + self.valueA5_2();
                                    window.open(url);
                                };
                                ScreenModel.prototype.newMode = function () {
                                    var self = this;
                                    errors.clearAll();
                                    self.isCreate(true);
                                    self.workLocationCD('');
                                    self.workLocationName('');
                                    self.valueA5_2('');
                                    self.radius(0);
                                    self.latitude(self.defautValueLocation);
                                    self.longitude(self.defautValueLocation);
                                    self.selectedWorkLocation(null);
                                    self.listSelectWorkplaceID = [];
                                    self.listWorkPlaceIDs = [];
                                    self.workplaceCode('');
                                    self.workplaceDisplayName('');
                                    // $("#grid2").remove();
                                    // $("#grid").append("<table id='grid2'></table>");
                                    self.items = [];
                                    var list1 = _.filter(self.loginInfo.listCompany, function (o) { return o.companyId == __viewContext.user.companyId; });
                                    //
                                    if (list1.length == 0) {
                                        var listWorkplace = [];
                                        listWorkplace.push({
                                            companyId: __viewContext.user.companyId,
                                            workpalceId: ''
                                        });
                                        a.service.getWorkPlace({ listWorkplace: listWorkplace, workLocationCD: ko.unwrap(self.workLocationCD) }).done(function (data) {
                                            self.items.push(new GridItem(data.listCompany[0].companyCode, data.listCompany[0].companyName, '', ''));
                                        });
                                    }
                                    if (list1.length > 0) {
                                        self.items.push(new GridItem(list1[0].companyCode, list1[0].companyName, '', ''));
                                    }
                                    $("#focus").focus();
                                    self.listIpCancel([]);
                                };
                                ScreenModel.prototype.add = function () {
                                    var self = this;
                                    $(".nts-input").trigger("validate");
                                    if (!$(".nts-input").ntsError("hasError")) {
                                        var listWorkplace = [];
                                        self.cdl008data();
                                        //  nts.uk.ui.windows.getShared('DataCMM040B');    
                                        var param_1 = {
                                            workLocationCD: self.workLocationCD(),
                                            workLocationName: self.workLocationName(),
                                            radius: self.radius(),
                                            latitude: self.latitude(),
                                            longitude: self.longitude(),
                                            listIPAddress: self.listIpCancel(),
                                            workplace: self.listWorkPlaceIDs[0]
                                        };
                                        // let select = 
                                        if (self.isCreate() === true) {
                                            if (param_1.workplace) {
                                                a.service.checkWorkplace({ workplaceID: param_1.workplace.workpalceId })
                                                    .done(function (data) {
                                                    self.insert(param_1);
                                                })
                                                    .fail(function (data) {
                                                    nts.uk.ui.dialog
                                                        .confirm({ messageId: data.messageId })
                                                        .ifYes(function () {
                                                        self.insert(param_1);
                                                    });
                                                });
                                            }
                                            else {
                                                self.insert(param_1);
                                            }
                                        }
                                        else {
                                            if (param_1.workplace === undefined || param_1.workplace.workpalceId === undefined) {
                                                self.update(param_1);
                                            }
                                            else {
                                                a.service.checkWorkplace({ workplaceID: param_1.workplace.workpalceId })
                                                    .done(function (data) {
                                                    self.update(param_1);
                                                })
                                                    .fail(function (data) {
                                                    if (self.changeWorkPlaceID === param_1.workplace.workpalceId) {
                                                        self.update(param_1);
                                                    }
                                                    else {
                                                        nts.uk.ui.dialog
                                                            .confirm({ messageId: data.messageId })
                                                            .ifYes(function () {
                                                            self.update(param_1);
                                                        });
                                                    }
                                                });
                                            }
                                        }
                                    }
                                };
                                ScreenModel.prototype.insert = function (param) {
                                    var self = this;
                                    a.service.insert(param).done(function (result) {
                                        nts.uk.ui.dialog.info({ messageId: "Msg_15" });
                                        self.reloadData().done(function () {
                                            self.selectedWorkLocation(self.workLocationCD());
                                            self.isCreate(false);
                                        });
                                        $("#focusName").focus();
                                    }).fail(function (res) {
                                        nts.uk.ui.dialog.alert({ messageId: res.messageId });
                                        $("#focusName").focus();
                                    }).always(function () {
                                        block.clear();
                                    });
                                };
                                ScreenModel.prototype.update = function (param) {
                                    var self = this;
                                    a.service.update(param).done(function (result) {
                                        nts.uk.ui.dialog.info({ messageId: "Msg_15" });
                                        self.reloadData().done(function () {
                                            self.selectedWorkLocation(self.workLocationCD());
                                            self.selectedWorkLocation.valueHasMutated();
                                        });
                                        $("#focusName").focus();
                                    }).fail(function (res) {
                                        nts.uk.ui.dialog.alert({ messageId: res.messageId }).then(function () {
                                            var p = nts.uk.ui.errors.errorsViewModel();
                                            p.option().show.subscribe(function (v) {
                                                if (v == false) {
                                                    nts.uk.ui.errors.clearAll();
                                                }
                                            });
                                            self.startPage();
                                            if (self.workPlacesList().length > 0) {
                                                self.findByIndex(0);
                                            }
                                        });
                                    }).always(function () {
                                        block.clear();
                                    });
                                };
                                ScreenModel.prototype.deleteWorkLocation = function () {
                                    var vm = new ko.ViewModel();
                                    var self = this;
                                    var role = __viewContext.user.role.systemAdmin;
                                    nts.uk.ui.dialog.confirm({ messageId: "Msg_18" }).ifYes(function () {
                                        if (role !== null) {
                                            a.service.checkDelete().done(function (isSystem) {
                                                if (isSystem) {
                                                    nts.uk.ui.dialog.confirm({ messageId: "Msg_2215" })
                                                        .ifYes(function () {
                                                        a.service.deleteWorkLocation(self.workLocationCD()).done(function (result) {
                                                            var index = _.findIndex(self.workPlacesList(), ['workLocationCD', self.workLocationCD()]);
                                                            index = _.min([self.workPlacesList().length - 2, index]);
                                                            vm.$blockui('invisible')
                                                                .then(function () {
                                                                self.reloadData().done(function () {
                                                                    if (index == -1) {
                                                                        self.selectedWorkLocation(null);
                                                                        self.workPlacesList([]);
                                                                        errors.clearAll();
                                                                        self.newMode();
                                                                    }
                                                                    else {
                                                                        self.findByIndex(index);
                                                                    }
                                                                    nts.uk.ui.dialog.info({ messageId: "Msg_16" })
                                                                        .then(function () {
                                                                        vm.$blockui('clear');
                                                                    });
                                                                });
                                                            });
                                                        }).fail(function (res) {
                                                            nts.uk.ui.dialog.alert({ messageId: res.messageId }).then(function () {
                                                                var index = _.findIndex(self.workPlacesList(), ['workLocationCD', self.workLocationCD()]);
                                                                index = _.min([self.workPlacesList().length - 2, index]);
                                                                self.reloadData().done(function () {
                                                                    self.findByIndex(0);
                                                                });
                                                            });
                                                        }).always(function () {
                                                            block.clear();
                                                        });
                                                    });
                                                }
                                                else {
                                                    a.service.deleteWorkLocation(self.workLocationCD()).done(function (result) {
                                                        var index = _.findIndex(self.workPlacesList(), ['workLocationCD', self.workLocationCD()]);
                                                        index = _.min([self.workPlacesList().length - 2, index]);
                                                        vm.$blockui('invisible')
                                                            .then(function () {
                                                            self.reloadData().done(function () {
                                                                if (index == -1) {
                                                                    self.selectedWorkLocation(null);
                                                                    self.workPlacesList([]);
                                                                    errors.clearAll();
                                                                    self.newMode();
                                                                }
                                                                else {
                                                                    self.findByIndex(index);
                                                                }
                                                                nts.uk.ui.dialog.info({ messageId: "Msg_16" })
                                                                    .then(function () {
                                                                    vm.$blockui('clear');
                                                                });
                                                            });
                                                        });
                                                    }).fail(function (res) {
                                                        nts.uk.ui.dialog.alert({ messageId: res.messageId }).then(function () {
                                                        });
                                                    }).always(function () {
                                                        block.clear();
                                                    });
                                                }
                                            });
                                        }
                                        else {
                                            nts.uk.ui.dialog.info({ messageId: "Msg_2214" });
                                        }
                                    });
                                };
                                ScreenModel.prototype.buttonA5_16 = function () {
                                    var self = this;
                                    $.ajax({
                                        url: 'http://geoapi.heartrails.com/api/json',
                                        data: { method: 'suggest', matching: 'like', keyword: self.valueA5_2() }
                                    })
                                        .done(function (data) {
                                        if (data.response.location == undefined) {
                                            self.latitude('');
                                            self.longitude('');
                                            return;
                                        }
                                        var result = data.response.location[0];
                                        self.latitude(result.y);
                                        self.longitude(result.x);
                                        errors.clearAll();
                                    });
                                };
                                ScreenModel.prototype.loadRadiusEnums = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    a.service.radiusEnum().done(function (res) {
                                        self.radiusEnum(res);
                                        self.itemList(res);
                                        dfd.resolve();
                                    }).fail(function (res) {
                                        nts.uk.ui.dialog.alertError(res.message);
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.openDialogCDL008 = function () {
                                    var self = this;
                                    var workplaceIds = [];
                                    var listWorkplace = [];
                                    nts.uk.ui.windows.setShared('inputCDL008', {
                                        baseDate: moment(new Date()).toDate(),
                                        selectedCodes: self.listSelectWorkplaceID,
                                        isMultiple: false,
                                        selectedSystemType: 1,
                                        isrestrictionOfReferenceRange: true,
                                        isShowNoSelectRow: false,
                                        showNoSelection: false, //Unselection Item
                                    }, true);
                                    nts.uk.ui.windows.sub.modal('/view/cdl/008/a/index.xhtml').onClosed(function () {
                                        // Check is cancel.
                                        if (nts.uk.ui.windows.getShared('CDL008Cancel')) {
                                            return;
                                        }
                                        //view all code of selected item 
                                        var output = nts.uk.ui.windows.getShared('workplaceInfor');
                                        // output = _.sortBy(output, 'code');
                                        self.workplaceCode(output[0].code);
                                        self.workplaceDisplayName(output[0].name);
                                        self.listSelectWorkplaceID = [];
                                        self.listWorkPlaceIDs = [];
                                        for (var i = 0; i < output.length; i++) {
                                            self.listWorkPlaceIDs.push({ companyId: self.LoginCompanyId, workpalceId: output[i].id });
                                            self.listSelectWorkplaceID.push(output[i].id);
                                        }
                                        // self.cdl008data(output);
                                        var code = '';
                                        var name = '';
                                        for (i = 0; i < output.length; i++) {
                                            code += output[i].code + '</br>';
                                            name += output[i].name + '</br>';
                                        }
                                        //
                                        var row = $(document.activeElement).parents()[3].firstChild.innerText;
                                        // $("#grid2").ntsGrid("updateRow", row, { workplaceCode: code, workplaceName: name });
                                    });
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
                            var BonusPaySetting = /** @class */ (function () {
                                function BonusPaySetting(companyId, name, code) {
                                    this.companyId = ko.observable(companyId);
                                    this.name = ko.observable(name);
                                    this.code = ko.observable(code);
                                }
                                return BonusPaySetting;
                            }());
                            viewmodel.BonusPaySetting = BonusPaySetting;
                            var ItemModel = /** @class */ (function () {
                                function ItemModel(value, fieldName) {
                                    this.value = value;
                                    this.fieldName = fieldName;
                                }
                                return ItemModel;
                            }());
                            var GridItem = /** @class */ (function () {
                                function GridItem(companyCode, companyName, workplaceCode, workplaceName) {
                                    this.companyCode = companyCode;
                                    this.companyName = companyName;
                                    this.workplaceCode = workplaceCode;
                                    this.workplaceName = workplaceName;
                                }
                                return GridItem;
                            }());
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = cmm040.a || (cmm040.a = {}));
                })(cmm040 = view.cmm040 || (view.cmm040 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm040.a.vm.js.map