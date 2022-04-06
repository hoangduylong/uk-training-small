var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cas004;
                (function (cas004) {
                    var a;
                    (function (a) {
                        var blockUI = nts.uk.ui.block;
                        var windows = nts.uk.ui.windows;
                        var errors = nts.uk.ui.errors;
                        var viewModel;
                        (function (viewModel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.userList = ko.observableArray([]);
                                    self.comList = ko.observableArray([]);
                                    self.currentCode = ko.observable(null);
                                    self.currentCode.subscribe(function (value) {
                                        errors.clearAll();
                                        if (value == "" || value == null || value == undefined) {
                                            self.newMode();
                                            return;
                                        }
                                        var currentUser = self.userList().filter(function (i) { return i.userID === value; })[0];
                                        if (currentUser != null) {
                                            self.currentUserDto(currentUser);
                                            self.currentLoginID(currentUser.loginID);
                                            self.currentMailAddress(currentUser.mailAddress);
                                            self.currentUserName(currentUser.userName);
                                            self.currentPass(null);
                                            self.currentPeriod(currentUser.expirationDate);
                                            self.currentPersonId(currentUser.associatedPersonID);
                                            self.currentEmpCid(currentUser.cid);
                                            self.isSpecial(currentUser.specialUser);
                                            self.isMultiCom(currentUser.multiCompanyConcurrent);
                                        }
                                        ;
                                        self.updateMode();
                                    });
                                    self.columns = ko.observableArray([
                                        { headerText: '', key: 'userID', width: 0, hidden: true },
                                        { headerText: nts.uk.resource.getText('CAS004_13'), prop: 'loginID', width: '30%' },
                                        { headerText: nts.uk.resource.getText('CAS004_14'), prop: 'userName', width: '70%' }
                                    ]);
                                    self.companyCode = ko.observable(null);
                                    self.currentUserDto = ko.observable(null);
                                    self.currentLoginID = ko.observable(null);
                                    self.currentMailAddress = ko.observable(null);
                                    self.currentUserName = ko.observable(null);
                                    self.currentPass = ko.observable(null);
                                    self.currentPeriod = ko.observable(null);
                                    self.currentPersonId = ko.observable(null);
                                    self.currentEmpCid = ko.observable(null);
                                    self.isSpecial = ko.observable(false);
                                    self.isMultiCom = ko.observable(false);
                                    self.isChangePass = ko.observable(false);
                                    self.isChangePass.subscribe(function (value) {
                                        errors.clearAll();
                                        self.currentPass(null);
                                    });
                                    self.isDisplay = ko.observable(true);
                                    self.isDelete = ko.observable(true);
                                    self.isFocusFirst = ko.observable(true);
                                }
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    self.loadCompanyList();
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.newMode = function () {
                                    var self = this;
                                    blockUI.clear();
                                    self.resetData();
                                    self.isDelete(false);
                                    errors.clearAll();
                                    $('#login-id').focus();
                                    $('.nts-input').ntsError('clear');
                                };
                                ScreenModel.prototype.updateMode = function () {
                                    var self = this;
                                    self.isChangePass(false);
                                    self.isDisplay(true);
                                    self.isDelete(true);
                                };
                                ScreenModel.prototype.resetData = function () {
                                    var self = this;
                                    self.currentCode(null);
                                    self.currentUserDto(null);
                                    self.currentLoginID(null);
                                    self.currentMailAddress(null);
                                    self.currentUserName(null);
                                    self.currentPass(null);
                                    self.currentPeriod(null);
                                    self.currentPersonId(null);
                                    self.currentEmpCid(null);
                                    self.isSpecial(false);
                                    self.isMultiCom(false);
                                    self.isChangePass(true);
                                    self.isDisplay(false);
                                };
                                ScreenModel.prototype.register = function () {
                                    var self = this;
                                    $('.nts-input').trigger("validate");
                                    _.defer(function () {
                                        if (!errors.hasError()) {
                                            blockUI.grayout();
                                            var userId = self.currentCode();
                                            var personalId = self.currentPersonId();
                                            var password = null;
                                            if (self.isChangePass()) {
                                                password = self.currentPass();
                                            }
                                            ;
                                            if (userId == "" || userId == null || userId == undefined) {
                                                var userNew_1 = new a.model.UserDto(null, self.currentLoginID(), self.currentUserName(), password, self.currentPeriod(), self.currentMailAddress(), personalId, self.isSpecial(), self.isMultiCom(), self.currentEmpCid());
                                                a.service.registerUser(userNew_1).done(function (userId) {
                                                    nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                                                        if (userNew_1.associatedPersonID != null) {
                                                            self.currentCode(userId);
                                                            self.isFocusFirst(false);
                                                            var currentComCd = self.comList().filter(function (i) { return i.companyId === self.currentEmpCid(); })[0].companyCode;
                                                            if (currentComCd != self.companyCode()) {
                                                                self.companyCode(currentComCd);
                                                            }
                                                            else {
                                                                self.loadUserGridList(self.currentEmpCid(), userId);
                                                            }
                                                        }
                                                        else {
                                                            self.isFocusFirst(false);
                                                            self.updateMode();
                                                            self.currentCode(userId);
                                                            self.companyCode(null);
                                                        }
                                                        ;
                                                    });
                                                }).fail(function (res) {
                                                    if (res.messageId != null || res.messageId != undefined) {
                                                        if (res.messageId == "Msg_61") {
                                                            nts.uk.ui.dialog.alertError({ messageId: res.messageId, messageParams: [" " + self.currentLoginID() + " "] });
                                                        }
                                                        else if (res.messageId == "Msg_716") {
                                                            nts.uk.ui.dialog.alertError({ messageId: "Msg_716", messageParams: [nts.uk.resource.getText("CAS004_13")] });
                                                        }
                                                        else {
                                                            nts.uk.ui.dialog.alertError({ messageId: res.messageId });
                                                        }
                                                    }
                                                    else {
                                                        // Show error list
                                                        nts.uk.ui.dialog.bundledErrors(res);
                                                    }
                                                }).always(function () {
                                                    $('#companies-cbbx').focus();
                                                    blockUI.clear();
                                                });
                                            }
                                            else {
                                                var updateUser_1 = new a.model.UserDto(self.currentCode(), self.currentLoginID(), self.currentUserName(), password, self.currentPeriod(), self.currentMailAddress(), personalId, self.isSpecial(), self.isMultiCom(), self.currentEmpCid());
                                                a.service.updateUser(updateUser_1).done(function () {
                                                    nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                                                        if (updateUser_1.associatedPersonID != null) {
                                                            var currentComCd = self.comList().filter(function (i) { return i.companyId === self.currentEmpCid(); })[0].companyCode;
                                                            self.currentCode(updateUser_1.userID);
                                                            self.isFocusFirst(false);
                                                            if (currentComCd != self.companyCode()) {
                                                                self.companyCode(currentComCd);
                                                            }
                                                            else {
                                                                self.loadUserGridList(self.currentEmpCid(), updateUser_1.userID);
                                                            }
                                                        }
                                                        else {
                                                            self.isFocusFirst(false);
                                                            self.updateMode();
                                                            self.currentCode(updateUser_1.userID);
                                                            self.companyCode(null);
                                                        }
                                                        ;
                                                    });
                                                }).fail(function (res) {
                                                    if (res.messageId != null || res.messageId != undefined) {
                                                        if (res.messageId == "Msg_61") {
                                                            nts.uk.ui.dialog.alertError({ messageId: res.messageId, messageParams: [" " + self.currentLoginID() + " "] });
                                                        }
                                                        else if (res.messageId == "Msg_716") {
                                                            nts.uk.ui.dialog.alertError({ messageId: "Msg_716", messageParams: [nts.uk.resource.getText("CAS004_13")] });
                                                        }
                                                        else {
                                                            nts.uk.ui.dialog.alertError({ messageId: res.messageId });
                                                        }
                                                    }
                                                    else {
                                                        // Show error list
                                                        nts.uk.ui.dialog.bundledErrors(res);
                                                    }
                                                }).always(function () {
                                                    $('#companies-cbbx').focus();
                                                    blockUI.clear();
                                                });
                                            }
                                        }
                                        ;
                                    });
                                };
                                ScreenModel.prototype.deleteItem = function () {
                                    var self = this;
                                    blockUI.invisible();
                                    nts.uk.ui.dialog.confirm({ messageId: 'Msg_18' }).ifYes(function () {
                                        var userId = self.currentCode();
                                        var deleteCmd = new a.model.DeleteCmd(userId, self.currentPersonId());
                                        a.service.deleteUser(deleteCmd).done(function () {
                                            blockUI.clear();
                                            nts.uk.ui.dialog.info({ messageId: "Msg_16" }).then(function () {
                                                var list = self.userList();
                                                var lastIndex = list.length - 1;
                                                var index = _.findIndex(list, function (x) { return x.userID == userId; });
                                                var nextUserID = null;
                                                if (index != lastIndex)
                                                    nextUserID = list[index + 1].userID;
                                                else
                                                    nextUserID = list[index - 1].userID;
                                                self.loadUserGridList(null, nextUserID);
                                            });
                                        }).fail(function (res) {
                                            nts.uk.ui.dialog.alertError({ messageId: res.messageId });
                                        }).always(function () {
                                            blockUI.clear();
                                        });
                                    }).ifNo(function () {
                                        blockUI.clear();
                                        return;
                                    });
                                };
                                ScreenModel.prototype.openDialogB = function () {
                                    var self = this;
                                    blockUI.invisible();
                                    var currentComId = null;
                                    var currentCom = self.comList().filter(function (i) { return i.companyCode === self.companyCode(); })[0];
                                    if (currentCom.companyCode === "No-Selection") {
                                        currentComId = null;
                                    }
                                    else {
                                        currentComId = currentCom.companyId;
                                    }
                                    ;
                                    windows.setShared('companyId', currentComId);
                                    windows.sub.modal('/view/cas/004/b/index.xhtml', { title: '' }).onClosed(function () {
                                        errors.clearAll();
                                        //get data from share window
                                        var employee = windows.getShared('EMPLOYEE');
                                        if (employee != null || employee != undefined) {
                                            self.currentUserName(employee.employeeName);
                                            self.currentPersonId(employee.personId);
                                            self.currentEmpCid(employee.companyId);
                                            $('#mailaddress-input').focus();
                                        }
                                        else {
                                            $('#username-input').focus();
                                        }
                                        blockUI.clear();
                                    });
                                };
                                ScreenModel.prototype.loadCompanyList = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    a.service.getCompanyImportList().done(function (companies) {
                                        var comList = [];
                                        //                    comList.push(new model.CompanyImport("No-Selection", "�I���Ȃ�",null));
                                        companies.forEach(function (item) { comList.push(new a.model.CompanyImport(item.companyCode, item.companyName, item.companyId)); });
                                        self.comList(comList);
                                        var currentComId = null;
                                        var currentComCode = self.companyCode();
                                        if (currentComCode != "No-Selection") {
                                            currentComId = self.comList().filter(function (i) { return i.companyCode === currentComCode; })[0].companyId;
                                        }
                                        self.loadUserGridList(currentComId, null);
                                        self.companyCode.subscribe(function (value) {
                                            var dfd = $.Deferred();
                                            var currentCode = self.currentCode();
                                            if (value == undefined) {
                                                return;
                                            }
                                            if (value == null || value == "No-Selection") {
                                                self.companyCode("No-Selection");
                                                if (self.isFocusFirst()) {
                                                    self.loadUserGridList(null, null);
                                                }
                                                else {
                                                    self.loadUserGridList(null, currentCode);
                                                }
                                                return;
                                            }
                                            self.companyCode(value);
                                            var currentComId = self.comList().filter(function (i) { return i.companyCode === value; })[0].companyId;
                                            if (self.isFocusFirst()) {
                                                self.loadUserGridList(currentComId, null);
                                            }
                                            else {
                                                self.loadUserGridList(currentComId, currentCode);
                                            }
                                        });
                                        // self.companyCode(comList[0].companyCode);
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.loadUserGridList = function (cid, currentCode) {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    if (cid != null) {
                                        a.service.getUserListByCid(cid).done(function (users) {
                                            var userList = [];
                                            if (users.length != 0) {
                                                users.forEach(function (item) { userList.push(new a.model.UserDto(item.userID, item.loginID, item.userName, null, item.expirationDate, item.mailAddress, item.associatedPersonID, item.specialUser, item.multiCompanyConcurrent, item.cid)); });
                                                self.userList(userList);
                                                if (currentCode != null) {
                                                    self.currentCode(currentCode);
                                                    self.currentPass(null);
                                                    self.isChangePass(false);
                                                }
                                                else {
                                                    self.currentCode(self.userList()[0].userID);
                                                }
                                                $('#companies-cbbx').focus();
                                            }
                                            else {
                                                self.userList([]);
                                                self.newMode();
                                            }
                                        }).always(function () {
                                            self.isFocusFirst(true);
                                        });
                                    }
                                    else {
                                        a.service.getAllUser().done(function (users) {
                                            var userList = [];
                                            if (users.length != 0) {
                                                users.forEach(function (item) { userList.push(new a.model.UserDto(item.userID, item.loginID, item.userName, null, item.expirationDate, item.mailAddress, item.associatedPersonID, item.specialUser, item.multiCompanyConcurrent, null)); });
                                                self.userList(userList);
                                                if (currentCode != null) {
                                                    self.currentCode(currentCode);
                                                    self.currentPass(null);
                                                    self.isChangePass(false);
                                                }
                                                else {
                                                    self.currentCode(self.userList()[0].userID);
                                                }
                                                $('#companies-cbbx').focus();
                                            }
                                            else {
                                                self.userList(userList);
                                                self.newMode();
                                            }
                                        }).always(function () {
                                            self.isFocusFirst(true);
                                        });
                                    }
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                return ScreenModel;
                            }());
                            viewModel.ScreenModel = ScreenModel;
                        })(viewModel = a.viewModel || (a.viewModel = {}));
                    })(a = cas004.a || (cas004.a = {}));
                })(cas004 = view.cas004 || (view.cas004 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cas004.a.vm.js.map