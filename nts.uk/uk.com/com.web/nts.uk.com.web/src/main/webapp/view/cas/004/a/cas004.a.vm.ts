module nts.uk.com.view.cas004.a {
    import blockUI = nts.uk.ui.block;
    import windows = nts.uk.ui.windows;
    import errors = nts.uk.ui.errors;
    export module viewModel {
        export class ScreenModel {

            userList: KnockoutObservableArray<model.UserDto>;
            comList: KnockoutObservableArray<any>;
            currentCode: KnockoutObservable<any>;
            columns: KnockoutObservableArray<any>;
            companyCode: KnockoutObservable<any>;
            currentUserDto: KnockoutObservable<model.UserDto>;
            currentLoginID: KnockoutObservable<any>;
            currentMailAddress: KnockoutObservable<any>;
            currentUserName: KnockoutObservable<any>;
            currentPass: KnockoutObservable<any>;
            currentPeriod: KnockoutObservable<any>;
            currentPersonId: KnockoutObservable<any>;
            currentEmpCid: KnockoutObservable<any>;
            isSpecial: KnockoutObservable<boolean>;
            isMultiCom: KnockoutObservable<boolean>;
            isChangePass: KnockoutObservable<boolean>;
            isDisplay: KnockoutObservable<boolean>;
            isDelete: KnockoutObservable<boolean>;
            isFocusFirst: KnockoutObservable<boolean>;

            constructor() {

                let self = this;
                self.userList = ko.observableArray([]);
                self.comList = ko.observableArray([]);
                self.currentCode = ko.observable(null);
                self.currentCode.subscribe(function(value) {
                    errors.clearAll();
                    if (value == "" || value == null || value == undefined) {
                        self.newMode();
                        return;
                    }
                    let currentUser = self.userList().filter(i => i.userID === value)[0];
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
                    };
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
                self.isChangePass.subscribe(function(value) {
                    errors.clearAll();
                    self.currentPass(null);
                });
                self.isDisplay = ko.observable(true);
                self.isDelete = ko.observable(true);
                self.isFocusFirst = ko.observable(true);
            }

            startPage(): JQueryPromise<any> {
                let self = this;
                let dfd = $.Deferred();
                self.loadCompanyList();
                dfd.resolve();
                return dfd.promise();
            }

            newMode(): void {
                let self = this;
                blockUI.clear();
                self.resetData();
                self.isDelete(false);
                errors.clearAll();
                $('#login-id').focus();
                $('.nts-input').ntsError('clear');
            }
            
            updateMode(): void {
                let self = this;
                self.isChangePass(false);
                self.isDisplay(true);
                self.isDelete(true);
            }
            
            private resetData() {
                let self = this;
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
            }

            register(): void {
                let self = this;
                $('.nts-input').trigger("validate");
                _.defer(() => {
                    if (!errors.hasError()) {
                        blockUI.grayout();
                        let userId = self.currentCode();
                        let personalId = self.currentPersonId();
                        let password = null;
                        if (self.isChangePass()) {
                            password = self.currentPass();
                        };
                        if (userId == "" || userId == null || userId == undefined) {
                            let userNew = new model.UserDto(null, self.currentLoginID(), self.currentUserName(), password, self.currentPeriod(), self.currentMailAddress(), personalId, self.isSpecial(), self.isMultiCom(), self.currentEmpCid());
                            service.registerUser(userNew).done(function(userId) {
                                nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function() {
                                    if (userNew.associatedPersonID != null) {
                                        self.currentCode(userId);
                                        self.isFocusFirst(false);
                                        let currentComCd = self.comList().filter(i => i.companyId === self.currentEmpCid())[0].companyCode;
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
                                    };
                                });
                            }).fail((res) => {
                                if (res.messageId != null || res.messageId != undefined) {
                                    if (res.messageId == "Msg_61") {
                                        nts.uk.ui.dialog.alertError({ messageId: res.messageId, messageParams: [" " + self.currentLoginID() + " "] });
                                    } else if (res.messageId == "Msg_716") {
                                        nts.uk.ui.dialog.alertError({ messageId: "Msg_716", messageParams: [nts.uk.resource.getText("CAS004_13")] });
                                    } else {
                                        nts.uk.ui.dialog.alertError({ messageId: res.messageId });
                                    }
                                }
                                else {
                                    // Show error list
                                    nts.uk.ui.dialog.bundledErrors(res);
                                }
                            }).always(() => {
                                $('#companies-cbbx').focus();
                                blockUI.clear();
                            });
                        }
                        else {
                            let updateUser = new model.UserDto(self.currentCode(), self.currentLoginID(), self.currentUserName(), password, self.currentPeriod(), self.currentMailAddress(), personalId, self.isSpecial(), self.isMultiCom(), self.currentEmpCid());
                            service.updateUser(updateUser).done(function() {
                                nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function() {
                                    if (updateUser.associatedPersonID != null) {
                                        let currentComCd = self.comList().filter(i => i.companyId === self.currentEmpCid())[0].companyCode;
                                        self.currentCode(updateUser.userID);
                                        self.isFocusFirst(false);
                                        if (currentComCd != self.companyCode()) {
                                            self.companyCode(currentComCd);
                                        }
                                        else {
                                            self.loadUserGridList(self.currentEmpCid(), updateUser.userID);
                                        }
                                    }
                                    else {
                                        self.isFocusFirst(false);
                                        self.updateMode();
                                        self.currentCode(updateUser.userID);
                                        self.companyCode(null);
                                    };
                                });
                            }).fail((res) => {
                                if (res.messageId != null || res.messageId != undefined) {
                                    if (res.messageId == "Msg_61") {
                                        nts.uk.ui.dialog.alertError({ messageId: res.messageId, messageParams: [" " + self.currentLoginID() + " "] });
                                    } else if (res.messageId == "Msg_716") {
                                        nts.uk.ui.dialog.alertError({ messageId: "Msg_716", messageParams: [nts.uk.resource.getText("CAS004_13")] });
                                    } else {
                                        nts.uk.ui.dialog.alertError({ messageId: res.messageId });
                                    }
                                }
                                else {
                                    // Show error list
                                    nts.uk.ui.dialog.bundledErrors(res);
                                }
                            }).always(() => {
                                $('#companies-cbbx').focus();
                                blockUI.clear();
                            });
                        }
                    };
                });
            }

            deleteItem(): void {
                let self = this;
                blockUI.invisible();
                nts.uk.ui.dialog.confirm({ messageId: 'Msg_18' }).ifYes(function() {
                    let userId = self.currentCode();
                    let deleteCmd = new model.DeleteCmd(userId, self.currentPersonId());
                    service.deleteUser(deleteCmd).done(function() {
                        blockUI.clear();
                        nts.uk.ui.dialog.info({ messageId: "Msg_16" }).then(function() {
                            let list = self.userList();
                            let lastIndex = list.length - 1;
                            let index = _.findIndex(list, function(x: model.UserDto)
                            { return x.userID == userId });
                            let nextUserID = null;
                            if (index != lastIndex)
                                nextUserID = list[index + 1].userID;
                            else nextUserID = list[index - 1].userID;
                            self.loadUserGridList(null, nextUserID);
                        });
                    }).fail((res) => {
                        nts.uk.ui.dialog.alertError({ messageId: res.messageId });
                    }).always(() => {
                        blockUI.clear();
                    });
                }).ifNo(function() {
                    blockUI.clear();
                    return;
                })
            }
            
            openDialogB() {
                let self = this;
                blockUI.invisible();
                let currentComId = null;
                let currentCom = self.comList().filter(i => i.companyCode === self.companyCode())[0];
                if (currentCom.companyCode === "No-Selection") {
                    currentComId = null;
                }
                else {
                    currentComId = currentCom.companyId;
                };
                windows.setShared('companyId', currentComId);
                windows.sub.modal('/view/cas/004/b/index.xhtml', { title: '' }).onClosed(function(): any {
                    errors.clearAll();
                    //get data from share window
                    var employee = windows.getShared('EMPLOYEE');
                    if (employee != null || employee != undefined) {
                        self.currentUserName(employee.employeeName);
                        self.currentPersonId(employee.personId);
                        self.currentEmpCid(employee.companyId);
                        $('#mailaddress-input').focus();
                    } else {
                        $('#username-input').focus();
                    }
                    blockUI.clear();
                });

            }

            private loadCompanyList(): JQueryPromise<any> {
                let self = this;
                let dfd = $.Deferred();
                service.getCompanyImportList().done(function(companies) {
                    let comList: Array<model.CompanyImport> = [];
//                    comList.push(new model.CompanyImport("No-Selection", "�I���Ȃ�",null));
                    companies.forEach((item) => { comList.push(new model.CompanyImport(item.companyCode, item.companyName, item.companyId)) });
                    self.comList(comList);
                    let currentComId = null;
                    let currentComCode = self.companyCode();
                    if (currentComCode != "No-Selection") {
                        currentComId = self.comList().filter(i => i.companyCode === currentComCode)[0].companyId;
                    }
                    self.loadUserGridList(currentComId, null);
                    self.companyCode.subscribe(function(value) {
                        let dfd = $.Deferred();
                        let currentCode = self.currentCode();
                        if (value == undefined) {
                            return;
                        }
                        if (value == null || value == "No-Selection") {
                            self.companyCode("No-Selection");
                            if (self.isFocusFirst()) {
                                self.loadUserGridList(null, null);
                            } else {
                                self.loadUserGridList(null, currentCode);
                            }
                            return;
                        }
                        self.companyCode(value);
                        let currentComId = self.comList().filter(i => i.companyCode === value)[0].companyId;
                        if (self.isFocusFirst()) {
                            self.loadUserGridList(currentComId, null);
                        } else {
                            self.loadUserGridList(currentComId, currentCode);
                        }
                    });
                   // self.companyCode(comList[0].companyCode);
                });
                return dfd.promise();
            }

            private loadUserGridList(cid, currentCode){
                let self = this;
                let dfd = $.Deferred();
                if (cid != null) {
                    service.getUserListByCid(cid).done(function(users) {
                        let userList: Array<model.UserDto> = [];
                        if (users.length != 0) {
                            users.forEach((item) => { userList.push(new model.UserDto(item.userID, item.loginID, item.userName, null, item.expirationDate, item.mailAddress, item.associatedPersonID, item.specialUser, item.multiCompanyConcurrent, item.cid)) });
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
                    }).always(() => {
                        self.isFocusFirst(true);
                    });
                } else {
                    service.getAllUser().done(function(users) {
                        let userList: Array<model.UserDto> = [];
                        if (users.length != 0) {
                            users.forEach((item) => { userList.push(new model.UserDto(item.userID, item.loginID, item.userName, null, item.expirationDate, item.mailAddress, item.associatedPersonID, item.specialUser, item.multiCompanyConcurrent, null)) });
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
                    }).always(() => {
                        self.isFocusFirst(true);
                    });
                }
                dfd.resolve();
                return dfd.promise();
            }
        }
    }
}