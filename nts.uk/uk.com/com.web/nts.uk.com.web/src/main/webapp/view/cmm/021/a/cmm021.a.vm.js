var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm021;
                (function (cmm021) {
                    var a;
                    (function (a) {
                        var viewModel;
                        (function (viewModel) {
                            var SaveWindowAccountCommand = a.service.model.SaveWindowAccountCommand;
                            var WindowAccountDto = a.service.model.WindowAccountDto;
                            var SaveOtherSysAccountCommand = a.service.model.SaveOtherSysAccountCommand;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var _self = this;
                                    _self.listUserDto = [];
                                    _self.listUserDtoScreenAC = [];
                                    _self.checked = ko.observable(true);
                                    _self.listUserInfos = ko.observableArray([]);
                                    _self.employeeIds = ko.observableArray([]);
                                    _self.currentCode = ko.observable();
                                    _self.useSet = ko.observableArray([
                                        { code: 1, name: nts.uk.resource.getText("CMM021_11") },
                                        { code: 0, name: nts.uk.resource.getText("CMM021_10") },
                                    ]);
                                    _self.selectUse = ko.observable(1);
                                    _self.enableSave = ko.observable(true);
                                    _self.windowAcc1 = new WindowAccountDto("", "", "", 0, 0);
                                    _self.windowAcc2 = new WindowAccountDto("", "", "", 0, 0);
                                    _self.windowAcc3 = new WindowAccountDto("", "", "", 0, 0);
                                    _self.windowAcc4 = new WindowAccountDto("", "", "", 0, 0);
                                    _self.windowAcc5 = new WindowAccountDto("", "", "", 0, 0);
                                    _self.isSaveActive = false;
                                    _self.selectedEmployeeId = ko.observable(null);
                                    _self.selectedEmployeeId.subscribe(function (newValue) {
                                        $('.nts-input').ntsError('clear');
                                        //check if selected employee id empty
                                        if (nts.uk.util.isNullOrEmpty(newValue)) {
                                            _self.unSelectedUserId();
                                        }
                                        else {
                                            _self.userId("");
                                            _self.findUserDtoByEmployeeId(newValue);
                                        }
                                    });
                                    _self.businessName = ko.observable("");
                                    _self.employeeCode = ko.observable("");
                                    _self.loginId = ko.observable("");
                                    // B screen model
                                    // construct properties in window account
                                    _self.hostName1 = ko.observable("");
                                    _self.userName1 = ko.observable("");
                                    _self.hostName2 = ko.observable("");
                                    _self.userName2 = ko.observable("");
                                    _self.hostName3 = ko.observable("");
                                    _self.userName3 = ko.observable("");
                                    _self.hostName4 = ko.observable("");
                                    _self.userName4 = ko.observable("");
                                    _self.hostName5 = ko.observable("");
                                    _self.userName5 = ko.observable("");
                                    _self.enable_Save = ko.observable(true);
                                    _self.enable_Delete = ko.observable(true);
                                    // UI
                                    _self.enable_WinAcc1 = ko.observable(false);
                                    _self.enable_WinAcc2 = ko.observable(false);
                                    _self.enable_WinAcc3 = ko.observable(false);
                                    _self.enable_WinAcc4 = ko.observable(false);
                                    _self.enable_WinAcc5 = ko.observable(false);
                                    //SUBSCRIBLE 
                                    _self.hostName1.subscribe(function () {
                                        _self.windowAcc1.isChange = true;
                                    });
                                    _self.userName1.subscribe(function () {
                                        _self.windowAcc1.isChange = true;
                                    });
                                    _self.enable_WinAcc1.subscribe(function (value) {
                                        _self.clearError();
                                        if (value == false) {
                                            _self.windowAcc1.isChange = true;
                                        }
                                    });
                                    _self.hostName2.subscribe(function () {
                                        _self.windowAcc2.isChange = true;
                                    });
                                    _self.userName2.subscribe(function () {
                                        _self.windowAcc2.isChange = true;
                                    });
                                    _self.enable_WinAcc2.subscribe(function (value) {
                                        if (value == false) {
                                            _self.windowAcc2.isChange = true;
                                        }
                                    });
                                    _self.hostName3.subscribe(function () {
                                        _self.windowAcc3.isChange = true;
                                    });
                                    _self.userName3.subscribe(function () {
                                        _self.windowAcc3.isChange = true;
                                    });
                                    _self.enable_WinAcc3.subscribe(function (value) {
                                        if (value == false) {
                                            _self.windowAcc3.isChange = true;
                                        }
                                    });
                                    _self.hostName4.subscribe(function () {
                                        _self.windowAcc4.isChange = true;
                                    });
                                    _self.userName4.subscribe(function () {
                                        _self.windowAcc4.isChange = true;
                                    });
                                    _self.enable_WinAcc4.subscribe(function (value) {
                                        if (value == false) {
                                            _self.windowAcc4.isChange = true;
                                        }
                                    });
                                    _self.hostName5.subscribe(function () {
                                        _self.windowAcc5.isChange = true;
                                    });
                                    _self.userName5.subscribe(function () {
                                        _self.windowAcc5.isChange = true;
                                    });
                                    _self.enable_WinAcc5.subscribe(function (value) {
                                        if (value == false) {
                                            _self.windowAcc5.isChange = true;
                                        }
                                    });
                                    _self.userId = ko.observable("");
                                    _self.userIdBeChoosen = ko.observable("");
                                    _self.userId.subscribe(function (newValue) {
                                        $('.nts-input').ntsError('clear');
                                        if (!newValue) {
                                            return;
                                        }
                                        _self.userIdBeChoosen(newValue);
                                        if (_self.isScreenBSelected()) {
                                            _self.findListWindowAccByEmployeeId(_self.selectedEmployeeId())
                                                .done(function () {
                                                if (_self.enable_WinAcc1() == true && _self.isSaveActive == false) {
                                                    $("#focus-hostName1").focus();
                                                    $('#focus-hostName1').ntsError('clear');
                                                }
                                                else if (_self.isSaveActive == true) {
                                                    _self.isSaveActive = false;
                                                }
                                                _self.clearError();
                                            });
                                        }
                                        if (_self.isScreenCSelected()) {
                                            _self.findOtherAccByEmployeeId(_self.selectedEmployeeId())
                                                .done(function () {
                                                if (_self.enable_otherAcc() == true && _self.isSaveActive == false) {
                                                    $('#focus-CompanyCode').focus();
                                                    $('#focus-CompanyCode').ntsError('clear');
                                                }
                                                else if (_self.isSaveActive == true) {
                                                    _self.isSaveActive = false;
                                                }
                                            });
                                        }
                                    });
                                    _self.selectUse.subscribe(function (newValue) {
                                        $('.nts-input').ntsError('clear');
                                        if (newValue == 1 && _self.isScreenBSelected() == true) {
                                            _self.loadUserSetting();
                                        }
                                        else if (newValue == 0 && _self.isScreenBSelected() == true) {
                                            _self.loadUserUnsetting();
                                        }
                                        else if (newValue == 1 && _self.isScreenCSelected() == true) {
                                            _self.loadUserSettingScreenAC();
                                        }
                                        else if (newValue == 0 && _self.isScreenCSelected() == true) {
                                            _self.loadUserUnsettingScreenAC();
                                        }
                                    });
                                    _self.listUserUnsetting = [];
                                    _self.listUserUnsettingScreenAC = [];
                                    _self.isScreenBSelected = ko.observable(false);
                                    _self.isScreenCSelected = ko.observable(false);
                                    _self.isScreenBSelected.subscribe(function (newValue) {
                                        $('.nts-input').ntsError('clear');
                                        if (newValue) {
                                            if (!_.isEmpty(_self.listUserDto)) {
                                                if (_self.userId() == _self.listUserDto[0].userId) {
                                                    _self.userId.valueHasMutated();
                                                }
                                                else {
                                                    _self.userId(_self.listUserDto[0].userId);
                                                }
                                                // show first item in list item                            
                                                if (_self.selectedEmployeeId() == _self.listUserDto[0].employeeId) {
                                                    _self.selectedEmployeeId.valueHasMutated();
                                                }
                                                else {
                                                    _self.selectedEmployeeId(_self.listUserDto[0].employeeId);
                                                }
                                            }
                                        }
                                    });
                                    _self.isScreenCSelected.subscribe(function (newValue) {
                                        $('.nts-input').ntsError('clear');
                                        if (newValue) {
                                            _self.reloadAlreadySettingOtherAcc();
                                            if (!_.isEmpty(_self.listUserDtoScreenAC)) {
                                                if (_self.userId() == _self.listUserDtoScreenAC[0].userId) {
                                                    _self.userId.valueHasMutated();
                                                }
                                                else {
                                                    _self.userId(_self.listUserDtoScreenAC[0].userId);
                                                }
                                                // show first item in list item                           
                                                if (_self.selectedEmployeeId() == _self.listUserDtoScreenAC[0].employeeId) {
                                                    _self.selectedEmployeeId.valueHasMutated();
                                                }
                                                else {
                                                    _self.selectedEmployeeId(_self.listUserDtoScreenAC[0].employeeId);
                                                }
                                            }
                                        }
                                    });
                                    // Screen C
                                    _self.companyCode6 = ko.observable("");
                                    _self.userName6 = ko.observable("");
                                    _self.otherSysAcc = ko.observable(null);
                                    _self.enable_otherAcc = ko.observable(false);
                                    this.columns = ko.observableArray([
                                        { headerText: '', key: 'employeeId', width: 150, hidden: true },
                                        { headerText: nts.uk.resource.getText('CMM021_13'), key: 'loginId', width: 135 },
                                        { headerText: nts.uk.resource.getText('CMM021_14'), key: 'employeeCode', width: 135 },
                                        { headerText: nts.uk.resource.getText('CMM021_15'), key: 'businessName', width: 135 },
                                        { headerText: nts.uk.resource.getText('CMM021_17'), key: 'isSetting', width: 60, formatter: function (isSetting) {
                                                if (isSetting == 'true') {
                                                    return '<div style="text-align: center;max-height: 18px;"><i class="icon icon-78"></i></div>';
                                                }
                                                return '';
                                            } }
                                    ]);
                                    //control validate screen C
                                    _self.enable_otherAcc.subscribe(function (val) {
                                        if (!val) {
                                            $('#focus-CompanyCode').ntsError('clear');
                                            $('#userName6').ntsError('clear');
                                        }
                                    });
                                    //control validate screen B
                                    _self.enable_WinAcc2.subscribe(function (val) {
                                        if (!val) {
                                            $('#hostName2').ntsError('clear');
                                            $('#userName2').ntsError('clear');
                                        }
                                    });
                                    _self.enable_WinAcc3.subscribe(function (val) {
                                        if (!val) {
                                            $('#hostName3').ntsError('clear');
                                            $('#userName3').ntsError('clear');
                                        }
                                    });
                                    _self.enable_WinAcc4.subscribe(function (val) {
                                        if (!val) {
                                            $('#hostName4').ntsError('clear');
                                            $('#userName4').ntsError('clear');
                                        }
                                    });
                                    _self.enable_WinAcc5.subscribe(function (val) {
                                        if (!val) {
                                            $('#hostName5').ntsError('clear');
                                            $('#userName5').ntsError('clear');
                                        }
                                    });
                                }
                                /**
                                * Start page
                                */
                                ScreenModel.prototype.startPage = function () {
                                    var _self = this;
                                    var dfd = $.Deferred();
                                    _self.onSelectScreenB();
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                //load user id empty
                                ScreenModel.prototype.unSelectedUserId = function () {
                                    var _self = this;
                                    if (_self.isScreenBSelected()) {
                                        _self.unLoadListWinAcc();
                                        _self.unselectedMode();
                                        _self.businessName("");
                                        _self.employeeCode("");
                                        _self.loginId("");
                                    }
                                    else if (_self.isScreenCSelected()) {
                                        _self.unLoadOtherAcc();
                                        _self.unselectedMode();
                                        _self.businessName("");
                                        _self.employeeCode("");
                                        _self.loginId("");
                                    }
                                };
                                /**
                                * Show Error Message
                                */
                                ScreenModel.prototype.showMessageError = function (res) {
                                    // check error business exception
                                    if (!res.businessException) {
                                        return;
                                    }
                                    // show error message
                                    if (Array.isArray(res.errors)) {
                                        nts.uk.ui.dialog.bundledErrors(res);
                                    }
                                    else {
                                        nts.uk.ui.dialog.alertError({ messageId: res.messageId, messageParams: res.parameterIds });
                                    }
                                };
                                //find list Window Acc
                                ScreenModel.prototype.findListWindowAccByEmployeeId = function (employeeId) {
                                    var _self = this;
                                    var dfd = $.Deferred();
                                    _self.clearDataOld();
                                    nts.uk.ui.block.invisible();
                                    a.service.findListWindowAccByEmployeeId(employeeId).done(function (data) {
                                        if (data && data.length > 0) {
                                            var winAcc1 = data.filter(function (o) { return o.no == 1; })[0];
                                            var winAcc2 = data.filter(function (o) { return o.no == 2; })[0];
                                            var winAcc3 = data.filter(function (o) { return o.no == 3; })[0];
                                            var winAcc4 = data.filter(function (o) { return o.no == 4; })[0];
                                            var winAcc5 = data.filter(function (o) { return o.no == 5; })[0];
                                            // set no#1
                                            if (winAcc1 != null && winAcc1 !== undefined) {
                                                _self.hostName1(winAcc1.hostName);
                                                _self.userName1(winAcc1.userName);
                                                _self.enable_WinAcc1(winAcc1.useAtr == 1);
                                                _self.windowAcc1.isChange = false;
                                            }
                                            // set no#2
                                            if (winAcc2 != null && winAcc2 !== undefined) {
                                                _self.hostName2(winAcc2.hostName);
                                                _self.userName2(winAcc2.userName);
                                                _self.enable_WinAcc2(winAcc2.useAtr == 1);
                                                _self.windowAcc2.isChange = false;
                                            }
                                            // set no#3
                                            if (winAcc3 != null && winAcc3 !== undefined) {
                                                _self.hostName3(winAcc3.hostName);
                                                _self.userName3(winAcc3.userName);
                                                _self.enable_WinAcc3(winAcc3.useAtr == 1);
                                                _self.windowAcc3.isChange = false;
                                            }
                                            // set no#4
                                            if (winAcc4 != null && winAcc4 !== undefined) {
                                                _self.hostName4(winAcc4.hostName);
                                                _self.userName4(winAcc4.userName);
                                                _self.enable_WinAcc4(winAcc4.useAtr == 1);
                                                _self.windowAcc4.isChange = false;
                                            }
                                            // set no#5
                                            if (winAcc5 != null && winAcc5 !== undefined) {
                                                _self.hostName5(winAcc5.hostName);
                                                _self.userName5(winAcc5.userName);
                                                _self.enable_WinAcc5(winAcc5.useAtr == 1);
                                                _self.windowAcc5.isChange = false;
                                            }
                                            _self.updateMode();
                                        }
                                        else {
                                            _self.newMode();
                                            _self.loadNewWindowAccount();
                                        }
                                        dfd.resolve();
                                    })
                                        .fail(function (res) {
                                        dfd.reject(res);
                                    }).always(function () { return nts.uk.ui.block.clear(); });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.clearDataOld = function () {
                                    var _self = this;
                                    //clear no#1
                                    _self.hostName1('');
                                    _self.userName1('');
                                    _self.enable_WinAcc1(false);
                                    _self.windowAcc1.isChange = false;
                                    //clear no#2
                                    _self.hostName2('');
                                    _self.userName2('');
                                    _self.enable_WinAcc2(false);
                                    _self.windowAcc2.isChange = false;
                                    //clear no#3
                                    _self.hostName3('');
                                    _self.userName3('');
                                    _self.enable_WinAcc3(false);
                                    _self.windowAcc3.isChange = false;
                                    //clear no#4
                                    _self.hostName4('');
                                    _self.userName4('');
                                    _self.enable_WinAcc4(false);
                                    _self.windowAcc4.isChange = false;
                                    //clear no#5
                                    _self.hostName5('');
                                    _self.userName5('');
                                    _self.enable_WinAcc5(false);
                                    _self.windowAcc5.isChange = false;
                                };
                                // find user dto                      
                                ScreenModel.prototype.findUserDtoByEmployeeId = function (selectedEmployeeId) {
                                    var _self = this;
                                    if (_self.isScreenBSelected()) {
                                        if (selectedEmployeeId != "") {
                                            var user = _self.listUserDto.filter(function (item) { return selectedEmployeeId == item.employeeId; })[0];
                                            _self.businessName(user.businessName);
                                            _self.employeeCode(user.employeeCode);
                                            _self.loginId(user.loginId);
                                            _self.userId(user.userId);
                                        }
                                        else {
                                            _self.businessName("");
                                            _self.employeeCode("");
                                            _self.loginId("");
                                        }
                                    }
                                    else {
                                        if (selectedEmployeeId != "") {
                                            var user = _self.listUserDtoScreenAC.filter(function (item) { return selectedEmployeeId == item.employeeId; })[0];
                                            _self.businessName(user.businessName);
                                            _self.employeeCode(user.employeeCode);
                                            _self.loginId(user.loginId);
                                            _self.userId(user.userId);
                                        }
                                        else {
                                            _self.businessName("");
                                            _self.employeeCode("");
                                            _self.loginId("");
                                        }
                                    }
                                };
                                ScreenModel.prototype.saveWindowAcc = function () {
                                    var _self = this;
                                    var dfd = $.Deferred();
                                    var win1 = _self.windowAcc1;
                                    var win2 = _self.windowAcc2;
                                    var win3 = _self.windowAcc3;
                                    var win4 = _self.windowAcc4;
                                    var win5 = _self.windowAcc5;
                                    // validate
                                    if (!_self.validate()) {
                                        return;
                                    }
                                    var saveCommand = new SaveWindowAccountCommand();
                                    if (_self.enable_WinAcc1() == true && _self.hostName1() != "" && _self.userName1() != "") {
                                        win1.employeeId = _self.selectedEmployeeId();
                                        win1.hostName = _self.hostName1();
                                        win1.userName = _self.userName1();
                                        win1.no = 1;
                                        win1.useAtr = 1;
                                        saveCommand.winAcc1 = win1;
                                    }
                                    else if (_self.enable_WinAcc1() == false) {
                                        win1.employeeId = _self.selectedEmployeeId();
                                        win1.hostName = _self.hostName1();
                                        win1.userName = _self.userName1();
                                        win1.no = 1;
                                        win1.useAtr = 0;
                                        saveCommand.winAcc1 = win1;
                                    }
                                    if (_self.enable_WinAcc2() == true && _self.hostName2() != "" && _self.userName2() != "") {
                                        win2.employeeId = _self.selectedEmployeeId();
                                        win2.hostName = _self.hostName2();
                                        win2.userName = _self.userName2();
                                        win2.no = 2;
                                        win2.useAtr = 1;
                                        saveCommand.winAcc2 = win2;
                                    }
                                    else if (_self.enable_WinAcc2() == false) {
                                        win2.employeeId = _self.selectedEmployeeId();
                                        win2.hostName = _self.hostName2();
                                        win2.userName = _self.userName2();
                                        win2.no = 2;
                                        win2.useAtr = 0;
                                        saveCommand.winAcc2 = win2;
                                    }
                                    if (_self.enable_WinAcc3() == true && _self.hostName3() != "" && _self.userName3() != "") {
                                        win3.employeeId = _self.selectedEmployeeId();
                                        win3.hostName = _self.hostName3();
                                        win3.userName = _self.userName3();
                                        win3.no = 3;
                                        win3.useAtr = 1;
                                        saveCommand.winAcc3 = win3;
                                    }
                                    else if (_self.enable_WinAcc3() == false) {
                                        win3.employeeId = _self.selectedEmployeeId();
                                        win3.hostName = _self.hostName3();
                                        win3.userName = _self.userName3();
                                        win3.no = 3;
                                        win3.useAtr = 0;
                                        saveCommand.winAcc3 = win3;
                                    }
                                    if (_self.enable_WinAcc4() == true && _self.hostName4() != "" && _self.userName4() != "") {
                                        win4.employeeId = _self.selectedEmployeeId();
                                        win4.hostName = _self.hostName4();
                                        win4.userName = _self.userName4();
                                        win4.no = 4;
                                        win4.useAtr = 1;
                                        saveCommand.winAcc4 = win4;
                                    }
                                    else if (_self.enable_WinAcc4() == false) {
                                        win4.employeeId = _self.selectedEmployeeId();
                                        win4.hostName = _self.hostName4();
                                        win4.userName = _self.userName4();
                                        win4.no = 4;
                                        win4.useAtr = 0;
                                        saveCommand.winAcc4 = win4;
                                    }
                                    if (_self.enable_WinAcc5() == true && _self.hostName5() != "" && _self.userName5() != "") {
                                        win5.employeeId = _self.selectedEmployeeId();
                                        win5.hostName = _self.hostName5();
                                        win5.userName = _self.userName5();
                                        win5.no = 5;
                                        win5.useAtr = 1;
                                        saveCommand.winAcc5 = win5;
                                    }
                                    else if (_self.enable_WinAcc5() == false) {
                                        win5.employeeId = _self.selectedEmployeeId();
                                        win5.hostName = _self.hostName5();
                                        win5.userName = _self.userName5();
                                        win5.no = 5;
                                        win5.useAtr = 0;
                                        saveCommand.winAcc5 = win5;
                                    }
                                    saveCommand.employeeId = _self.selectedEmployeeId();
                                    var isCheck = false;
                                    var saveArray = [];
                                    saveArray.push(saveCommand.winAcc1);
                                    saveArray.push(saveCommand.winAcc2);
                                    saveArray.push(saveCommand.winAcc3);
                                    saveArray.push(saveCommand.winAcc4);
                                    saveArray.push(saveCommand.winAcc5);
                                    var saveArrayChecks = _.filter(saveArray, function (o) { return o.useAtr != 0; });
                                    if (!_.isEmpty(saveArrayChecks)) {
                                        isCheck = true;
                                    }
                                    nts.uk.ui.block.invisible();
                                    a.service.saveWindowAccount(saveCommand)
                                        .done(function (data) {
                                        _self.isSaveActive = true;
                                        a.service.findListUserInfo(_self.employeeIds())
                                            .done(function (data) {
                                            _self.reloadAlreadySettingWindow().done(function () {
                                                _self.listUserDto = data;
                                                var oldSid = _self.selectedEmployeeId();
                                                _self.selectUse.valueHasMutated();
                                                //select saved Item
                                                if (_self.selectUse() == 1) {
                                                    _self.selectedEmployeeId(oldSid);
                                                }
                                                nts.uk.ui.dialog.info({ messageId: 'Msg_15' });
                                                _self.updateMode();
                                                dfd.resolve();
                                            });
                                        }).always(function () { return nts.uk.ui.block.clear(); });
                                    }).fail(function (res) {
                                        nts.uk.ui.dialog.bundledErrors(res);
                                        nts.uk.ui.block.clear();
                                        dfd.reject();
                                    });
                                    return dfd.promise();
                                };
                                /**
                                 * Reload alreadySetting list for window
                                 */
                                ScreenModel.prototype.reloadAlreadySettingWindow = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    var sids = _.map(self.listUserInfos(), function (user) { return user.employeeId; });
                                    a.service.findAlreadySettingWindow(sids).done(function (ids) {
                                        self.setAlreadySetting(ids);
                                        dfd.resolve();
                                    });
                                    return dfd.promise();
                                };
                                /**
                                 * Reload alreadySetting list for other acc
                                 */
                                ScreenModel.prototype.reloadAlreadySettingOtherAcc = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    var sids = _.map(self.listUserInfos(), function (user) { return user.employeeId; });
                                    a.service.findAlreadySettingOtherAcc(sids).done(function (ids) {
                                        self.setAlreadySetting(ids);
                                        dfd.resolve();
                                    });
                                    return dfd.promise();
                                };
                                /**
                                 * Set already setting item.
                                 */
                                ScreenModel.prototype.setAlreadySetting = function (settingIds) {
                                    var self = this;
                                    var reloadedList = _.map(self.listUserInfos(), function (item) {
                                        var hasSetting = _.includes(settingIds, item.employeeId);
                                        if (hasSetting) {
                                            item.isSetting = true;
                                        }
                                        else {
                                            item.isSetting = false;
                                        }
                                        return item;
                                    });
                                    self.listUserInfos(reloadedList);
                                };
                                ScreenModel.prototype.reload = function () {
                                    var _self = this;
                                    _self.userId("");
                                    _self.userId(_self.userIdBeChoosen());
                                    _self.clearError();
                                };
                                /**
                                 * validate
                                 */
                                ScreenModel.prototype.validate = function () {
                                    var _self = this;
                                    // clear error
                                    _self.clearError();
                                    // validate
                                    if (_self.enable_WinAcc1()) {
                                        $('#focus-hostName1').ntsEditor('validate');
                                        $('#userName1').ntsEditor('validate');
                                    }
                                    if (_self.enable_WinAcc2()) {
                                        $('#hostName2').ntsEditor('validate');
                                        $('#userName2').ntsEditor('validate');
                                    }
                                    if (_self.enable_WinAcc3()) {
                                        $('#hostName3').ntsEditor('validate');
                                        $('#userName3').ntsEditor('validate');
                                    }
                                    if (_self.enable_WinAcc4()) {
                                        $('#hostName4').ntsEditor('validate');
                                        $('#userName4').ntsEditor('validate');
                                    }
                                    if (_self.enable_WinAcc5()) {
                                        $('#hostName5').ntsEditor('validate');
                                        $('#userName5').ntsEditor('validate');
                                    }
                                    if (_self.enable_WinAcc5()) {
                                        $('#hostName5').ntsEditor('validate');
                                        $('#userName5').ntsEditor('validate');
                                    }
                                    if (_self.enable_otherAcc()) {
                                        $('#focus-CompanyCode').ntsEditor('validate');
                                        $('#userName6').ntsEditor('validate');
                                    }
                                    return !$('.nts-input').ntsError('hasError');
                                };
                                /**
                                 * clearError
                                 */
                                ScreenModel.prototype.clearError = function () {
                                    $('#focus-hostName1').ntsError('clear');
                                    $('#userName1').ntsError('clear');
                                    $('#hostName2').ntsError('clear');
                                    $('#userName2').ntsError('clear');
                                    $('#hostName3').ntsError('clear');
                                    $('#userName3').ntsError('clear');
                                    $('#hostName4').ntsError('clear');
                                    $('#userName4').ntsError('clear');
                                    $('#hostName5').ntsError('clear');
                                    $('#userName5').ntsError('clear');
                                    $('#focus-CompanyCode').ntsError('clear');
                                    $('#userName6').ntsError('clear');
                                };
                                // common function load list user info
                                ScreenModel.prototype.loadUserInfoScreenAB = function () {
                                    var _self = this;
                                    var dfd = $.Deferred();
                                    nts.uk.ui.block.grayout();
                                    a.service.findListUserInfo(_self.employeeIds())
                                        .done(function (data) {
                                        _self.listUserDto = data;
                                        if (_.isEmpty(_self.listUserDto)) {
                                            _self.findUserDtoByEmployeeId("");
                                            _self.unLoadListWinAcc();
                                        }
                                        else {
                                            if (_self.selectedEmployeeId() == _self.listUserDto[0].employeeId) {
                                                _self.selectedEmployeeId.valueHasMutated();
                                            }
                                            else {
                                                _self.selectedEmployeeId(_self.listUserDto[0].employeeId);
                                            }
                                        }
                                        _self.loadUserDto();
                                        _self.reloadAlreadySettingWindow();
                                        dfd.resolve();
                                    })
                                        .fail(function (res) {
                                        _self.showMessageError(res);
                                        dfd.reject(res);
                                    }).always(function () { return nts.uk.ui.block.clear(); });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.loadUserInfoForOtherAcc = function () {
                                    var _self = this;
                                    var dfd = $.Deferred();
                                    nts.uk.ui.block.grayout();
                                    a.service.findListUserInfo(_self.employeeIds())
                                        .done(function (data) {
                                        _self.listUserDtoScreenAC = [];
                                        _self.listUserDtoScreenAC = data;
                                        if (_.isEmpty(_self.listUserDtoScreenAC)) {
                                            _self.findUserDtoByEmployeeId("");
                                            _self.unLoadOtherAcc();
                                        }
                                        else {
                                            if (_self.selectedEmployeeId() == _self.listUserDtoScreenAC[0].employeeId) {
                                                _self.selectedEmployeeId.valueHasMutated();
                                            }
                                            else {
                                                _self.selectedEmployeeId(_self.listUserDtoScreenAC[0].employeeId);
                                            }
                                        }
                                        _self.loadUserDtoForScreenC();
                                        _self.reloadAlreadySettingOtherAcc();
                                        dfd.resolve();
                                    })
                                        .fail(function (res) {
                                        dfd.reject(res);
                                    }).always(function () { return nts.uk.ui.block.clear(); });
                                    return dfd.promise();
                                };
                                // load new mode
                                ScreenModel.prototype.loadNewWindowAccount = function () {
                                    var _self = this;
                                    _self.hostName1("");
                                    _self.userName1("");
                                    _self.enable_WinAcc1(true);
                                    _self.hostName2("");
                                    _self.userName2("");
                                    _self.enable_WinAcc2(false);
                                    _self.hostName3("");
                                    _self.userName3("");
                                    _self.enable_WinAcc3(false);
                                    _self.hostName4("");
                                    _self.userName4("");
                                    _self.enable_WinAcc4(false);
                                    _self.hostName5("");
                                    _self.userName5("");
                                    _self.enable_WinAcc5(false);
                                };
                                ScreenModel.prototype.unLoadListWinAcc = function () {
                                    var _self = this;
                                    _self.hostName1("");
                                    _self.userName1("");
                                    _self.enable_WinAcc1(false);
                                    _self.hostName2("");
                                    _self.userName2("");
                                    _self.enable_WinAcc2(false);
                                    _self.hostName3("");
                                    _self.userName3("");
                                    _self.enable_WinAcc3(false);
                                    _self.hostName4("");
                                    _self.userName4("");
                                    _self.enable_WinAcc4(false);
                                    _self.hostName5("");
                                    _self.userName5("");
                                    _self.enable_WinAcc5(false);
                                };
                                ScreenModel.prototype.unLoadOtherAcc = function () {
                                    var _self = this;
                                    _self.companyCode6("");
                                    _self.userName6("");
                                    _self.enable_otherAcc(false);
                                };
                                ScreenModel.prototype.loadNewOtherAcc = function () {
                                    var _self = this;
                                    _self.companyCode6("");
                                    _self.userName6("");
                                    _self.enable_otherAcc(true);
                                };
                                ScreenModel.prototype.loadUserDto = function () {
                                    var _self = this;
                                    _self.listUserInfos([]);
                                    // check user info loaded is not empty
                                    if (!_.isEmpty(_self.listUserDto)) {
                                        _self.listUserInfos(_self.listUserDto);
                                        // if user info loaded is empty, set unselected mode    
                                    }
                                    else {
                                        _self.unselectedMode();
                                    }
                                };
                                ScreenModel.prototype.loadUserDtoForScreenC = function () {
                                    var _self = this;
                                    _self.listUserInfos([]);
                                    // check user info loaded is not empty
                                    if (!_.isEmpty(_self.listUserDtoScreenAC)) {
                                        _self.listUserInfos(_self.listUserDtoScreenAC);
                                        // if user info loaded is empty, set unselected mode 
                                    }
                                    else {
                                        _self.unselectedMode();
                                    }
                                };
                                ScreenModel.prototype.loadUserUnsetting = function () {
                                    var _self = this;
                                    _self.listUserInfos([]);
                                    _self.listUserUnsetting = [];
                                    for (var _i = 0, _a = _self.listUserDto; _i < _a.length; _i++) {
                                        var userDto = _a[_i];
                                        if (!userDto.isSetting) {
                                            _self.listUserUnsetting.push(new ItemModel(userDto.businessName, userDto.employeeCode, userDto.loginId, userDto.employeeId, userDto.userId, userDto.isSetting, userDto.other));
                                        }
                                    }
                                    // select first item in list unsetting
                                    if (!_.isEmpty(_self.listUserUnsetting)) {
                                        if (_self.selectedEmployeeId() == _self.listUserUnsetting[0].employeeId) {
                                            _self.selectedEmployeeId.valueHasMutated();
                                        }
                                        else {
                                            _self.selectedEmployeeId(_self.listUserUnsetting[0].employeeId);
                                        }
                                        _self.newMode();
                                    }
                                    _self.listUserInfos(_self.listUserUnsetting);
                                    if (_self.listUserUnsetting.length == 0) {
                                        _self.unselectedMode();
                                    }
                                };
                                ScreenModel.prototype.loadUserUnsettingScreenAC = function () {
                                    var _self = this;
                                    _self.listUserInfos([]);
                                    _self.listUserUnsettingScreenAC = [];
                                    for (var _i = 0, _a = _self.listUserDtoScreenAC; _i < _a.length; _i++) {
                                        var userDto = _a[_i];
                                        if (!userDto.isSetting) {
                                            _self.listUserUnsettingScreenAC.push(new ItemModel(userDto.businessName, userDto.employeeCode, userDto.loginId, userDto.employeeId, userDto.userId, userDto.isSetting, 0));
                                        }
                                    }
                                    // select first item in list unsetting
                                    if (!_.isEmpty(_self.listUserUnsettingScreenAC)) {
                                        if (_self.selectedEmployeeId() == _self.listUserUnsettingScreenAC[0].employeeId) {
                                            _self.selectedEmployeeId.valueHasMutated();
                                        }
                                        else {
                                            if (_self.selectedEmployeeId() == _self.listUserUnsettingScreenAC[0].employeeId) {
                                                _self.selectedEmployeeId.valueHasMutated();
                                            }
                                            else {
                                                _self.selectedEmployeeId(_self.listUserUnsettingScreenAC[0].employeeId);
                                            }
                                        }
                                        _self.newMode();
                                    }
                                    _self.listUserInfos(_self.listUserUnsettingScreenAC);
                                    if (_self.listUserUnsettingScreenAC.length == 0) {
                                        _self.unselectedMode();
                                    }
                                };
                                //load user info  
                                ScreenModel.prototype.loadUserInfo = function () {
                                    var _self = this;
                                    if (_self.isScreenBSelected()) {
                                        if (_self.selectUse() == 1) {
                                            _self.loadUserInfoScreenAB();
                                        }
                                        else if (_self.selectUse() == 0) {
                                            _self.loadUserUnsetting();
                                        }
                                    }
                                    else if (_self.isScreenCSelected()) {
                                        if (_self.selectUse() == 1) {
                                            _self.loadUserInfoForOtherAcc();
                                        }
                                        else if (_self.selectUse() == 0) {
                                            _self.loadUserUnsettingScreenAC();
                                        }
                                    }
                                };
                                ScreenModel.prototype.loadUserSetting = function () {
                                    var _self = this;
                                    _self.loadUserDto();
                                    if (_.isEmpty(_self.listUserDto)) {
                                        _self.findUserDtoByEmployeeId("");
                                        _self.unLoadListWinAcc();
                                    }
                                    else {
                                        if (_self.selectedEmployeeId() == _self.listUserDto[0].employeeId) {
                                            _self.selectedEmployeeId.valueHasMutated();
                                        }
                                        else {
                                            _self.selectedEmployeeId(_self.listUserDto[0].employeeId);
                                        }
                                    }
                                };
                                ScreenModel.prototype.loadUserSettingScreenAC = function () {
                                    var _self = this;
                                    _self.loadUserDtoForScreenC();
                                    if (_.isEmpty(_self.listUserDtoScreenAC)) {
                                        _self.findUserDtoByEmployeeId("");
                                        _self.unLoadOtherAcc();
                                    }
                                    else {
                                        if (_self.selectedEmployeeId() == _self.listUserDtoScreenAC[0].employeeId) {
                                            _self.selectedEmployeeId.valueHasMutated();
                                        }
                                        else {
                                            _self.selectedEmployeeId(_self.listUserDtoScreenAC[0].employeeId);
                                        }
                                    }
                                };
                                // new mode
                                ScreenModel.prototype.newMode = function () {
                                    var _self = this;
                                    _self.enable_Save(true);
                                    _self.enable_Delete(false);
                                };
                                // update mode
                                ScreenModel.prototype.updateMode = function () {
                                    var _self = this;
                                    _self.enable_Save(true);
                                    _self.enable_Delete(true);
                                };
                                //unselected mode
                                ScreenModel.prototype.unselectedMode = function () {
                                    var _self = this;
                                    _self.enable_Save(false);
                                    _self.enable_Delete(false);
                                };
                                ScreenModel.prototype.deleteAccount = function () {
                                    var _self = this;
                                    if (_self.isScreenBSelected()) {
                                        _self.deleteWindowAccount();
                                    }
                                    else if (_self.isScreenCSelected()) {
                                        _self.deleteOtherAcc();
                                    }
                                };
                                ScreenModel.prototype.saveAccount = function () {
                                    var _self = this;
                                    if (_self.isScreenBSelected()) {
                                        _self.saveWindowAcc();
                                    }
                                    else if (_self.isScreenCSelected()) {
                                        _self.saveOtherAcc();
                                    }
                                };
                                ScreenModel.prototype.deleteWindowAccount = function () {
                                    var _self = this;
                                    var dfd = $.Deferred();
                                    nts.uk.ui.dialog.confirm({ messageId: "Msg_18" }).ifYes(function () {
                                        nts.uk.ui.block.invisible();
                                        a.service.removeWindowAccount(_self.selectedEmployeeId()).done(function (data) {
                                            _self.reloadAlreadySettingWindow().done(function () {
                                                _self.newMode();
                                                _self.loadNewWindowAccount();
                                                nts.uk.ui.dialog.info({ messageId: "Msg_16" }).then(function () {
                                                    $('.nts-input').ntsError('clear');
                                                    $('#focus-hostName1').focus();
                                                });
                                                dfd.resolve();
                                            }).always(function () { return nts.uk.ui.block.clear(); });
                                        });
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.onSelectScreenB = function () {
                                    var _self = this;
                                    _self.isScreenBSelected(true);
                                    _self.isScreenCSelected(false);
                                    _self.selectUse(1);
                                    _self.listUserInfos([]);
                                    _.defer(function () { return _self.loadUserInfoScreenAB(); });
                                };
                                ScreenModel.prototype.onSelectScreenC = function () {
                                    var _self = this;
                                    _self.isScreenBSelected(false);
                                    _self.isScreenCSelected(true);
                                    _self.selectUse(1);
                                    _self.listUserInfos([]);
                                    _.defer(function () { return _self.loadUserInfoForOtherAcc(); });
                                };
                                ScreenModel.prototype.startCcg001 = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    var ccg001ComponentOption = {
                                        /** Common properties */
                                        systemType: 2,
                                        showEmployeeSelection: false,
                                        showQuickSearchTab: false,
                                        showAdvancedSearchTab: true,
                                        showBaseDate: true,
                                        showClosure: false,
                                        showAllClosure: false,
                                        showPeriod: false,
                                        periodFormatYM: false,
                                        /** Required parameter */
                                        baseDate: moment().toISOString(),
                                        periodStartDate: moment().toISOString(),
                                        periodEndDate: moment().toISOString(),
                                        inService: true,
                                        leaveOfAbsence: true,
                                        closed: true,
                                        retirement: true,
                                        /** Quick search tab options */
                                        showAllReferableEmployee: true,
                                        showOnlyMe: true,
                                        showSameWorkplace: true,
                                        showSameWorkplaceAndChild: true,
                                        /** Advanced search properties */
                                        showEmployment: true,
                                        showWorkplace: true,
                                        showClassification: true,
                                        showJobTitle: true,
                                        showWorktype: true,
                                        isMutipleCheck: true,
                                        showOnStart: true,
                                        /**
                                        * Self-defined function: Return data from CCG001
                                        * @param: data: the data return from CCG001
                                        */
                                        returnDataFromCcg001: function (data) {
                                            var listEmployee = data.listEmployee;
                                            var empIds = _.map(listEmployee, function (item) { return item.employeeId; });
                                            self.employeeIds(empIds);
                                            _.defer(function () { return self.loadUserInfo(); });
                                        }
                                    };
                                    // Start component
                                    $('#com-ccg001').ntsGroupComponent(ccg001ComponentOption).done(function () { return dfd.resolve(); });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.findOtherAccByEmployeeId = function (employeeId) {
                                    var _self = this;
                                    var dfd = $.Deferred();
                                    nts.uk.ui.block.invisible();
                                    a.service.findOtherSysAccByEmployeeId(employeeId).done(function (data) {
                                        // check data null
                                        if (data.employeeId != null && data.useAtr == 1) {
                                            _self.companyCode6(data.companyCode);
                                            _self.userName6(data.userName);
                                            _self.enable_otherAcc(true);
                                            _self.updateMode();
                                        }
                                        else if (data.employeeId != null && data.useAtr == 0) {
                                            _self.companyCode6(data.companyCode);
                                            _self.userName6(data.userName);
                                            _self.enable_otherAcc(false);
                                            _self.updateMode();
                                        }
                                        else {
                                            _self.companyCode6("");
                                            _self.userName6("");
                                            _self.enable_otherAcc(true);
                                            _self.newMode();
                                        }
                                        dfd.resolve();
                                    }).fail(function (res) {
                                        dfd.reject(res);
                                    }).always(function () { return nts.uk.ui.block.clear(); });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.saveOtherAcc = function () {
                                    var _self = this;
                                    var otherAcc = new SaveOtherSysAccountCommand();
                                    // validate
                                    if (!_self.validate()) {
                                        return;
                                    }
                                    if (_self.enable_otherAcc() == true && _self.companyCode6() != "" && _self.userName6() != "") {
                                        otherAcc.employeeId = _self.selectedEmployeeId();
                                        otherAcc.companyCode = _self.companyCode6();
                                        otherAcc.userName = _self.userName6();
                                        otherAcc.useAtr = 1;
                                    }
                                    else if (_self.enable_otherAcc() == false) {
                                        otherAcc.employeeId = _self.selectedEmployeeId();
                                        otherAcc.companyCode = _self.companyCode6();
                                        otherAcc.userName = _self.userName6();
                                        otherAcc.useAtr = 0;
                                    }
                                    if (otherAcc.employeeId != undefined) {
                                        var dfd_1 = $.Deferred();
                                        nts.uk.ui.block.invisible();
                                        a.service.saveOtherSysAccount(otherAcc)
                                            .done(function (data) {
                                            //
                                            a.service.findListUserInfo(_self.employeeIds())
                                                .done(function (data2) {
                                                _self.listUserDtoScreenAC = data2;
                                                _self.reloadAlreadySettingOtherAcc().done(function () {
                                                    var oldSid = _self.selectedEmployeeId();
                                                    _self.selectUse.valueHasMutated();
                                                    //select saved Item
                                                    if (_self.selectUse() == 1) {
                                                        _self.selectedEmployeeId(oldSid);
                                                    }
                                                    _self.isSaveActive = true;
                                                    nts.uk.ui.dialog.info({ messageId: 'Msg_15' });
                                                    _self.updateMode();
                                                    dfd_1.resolve();
                                                });
                                            }).always(function () { return nts.uk.ui.block.clear(); });
                                        }).fail(function (res) {
                                            nts.uk.ui.dialog.bundledErrors(res);
                                            nts.uk.ui.block.clear();
                                            dfd_1.reject();
                                        });
                                        return dfd_1.promise();
                                    }
                                };
                                ScreenModel.prototype.deleteOtherAcc = function () {
                                    var _self = this;
                                    var dfd = $.Deferred();
                                    nts.uk.ui.dialog.confirm({ messageId: "Msg_18" }).ifYes(function () {
                                        nts.uk.ui.block.invisible();
                                        a.service.removeOtherSysAccount(_self.selectedEmployeeId()).done(function (data) {
                                            _self.reloadAlreadySettingOtherAcc().done(function () {
                                                _self.newMode();
                                                _self.loadNewOtherAcc();
                                                nts.uk.ui.dialog.info({ messageId: "Msg_16" }).then(function () {
                                                    $('.nts-input').ntsError('clear');
                                                    $('#focus-CompanyCode').focus();
                                                });
                                                dfd.resolve();
                                            }).always(function () { return nts.uk.ui.block.clear(); });
                                        });
                                    });
                                    return dfd.promise();
                                };
                                return ScreenModel;
                            }());
                            viewModel.ScreenModel = ScreenModel;
                        })(viewModel = a.viewModel || (a.viewModel = {}));
                        var ItemModel = /** @class */ (function () {
                            function ItemModel(businessName, employeeCode, loginId, employeeId, userId, isSetting, other) {
                                this.businessName = businessName;
                                this.employeeCode = employeeCode;
                                this.loginId = loginId;
                                this.employeeId = employeeId;
                                this.userId = userId;
                                this.isSetting = isSetting;
                                this.other = other;
                            }
                            return ItemModel;
                        }());
                    })(a = cmm021.a || (cmm021.a = {}));
                })(cmm021 = view.cmm021 || (view.cmm021 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm021.a.vm.js.map