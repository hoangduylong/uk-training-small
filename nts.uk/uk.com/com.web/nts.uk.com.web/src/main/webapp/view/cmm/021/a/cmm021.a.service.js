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
                        var service;
                        (function (service) {
                            /**
                             *  Service paths
                             */
                            var servicePath = {
                                findAlreadySettingWindow: "ctx/sys/gateway/single/signon/find/window/alreadysetting",
                                findAlreadySettingOtherAcc: "ctx/sys/gateway/single/signon/find/otheracc/alreadysetting",
                                findListUserInfo: "ctx/sys/gateway/single/signon/find/userInfo",
                                findListWindowAccByEmployeeId: "ctx/sys/gateway/single/signon/find/window/account",
                                saveWindowAccount: "ctx/sys/gateway/single/signon/save/windowAcc",
                                removeWindowAccount: "ctx/sys/gateway/single/signon/remove/windowAcc",
                                saveOtherSysAccount: "ctx/sys/gateway/single/signon/save/otherSysAcc",
                                removeOtherSysAccount: "ctx/sys/gateway/single/signon/remove/otherSysAcc",
                                findOtherSysAccByEmployeeId: "ctx/sys/gateway/single/signon/find/otherSysAcc",
                            };
                            function findAlreadySettingWindow(sIds) {
                                return nts.uk.request.ajax(servicePath.findAlreadySettingWindow, sIds);
                            }
                            service.findAlreadySettingWindow = findAlreadySettingWindow;
                            function findAlreadySettingOtherAcc(sIds) {
                                return nts.uk.request.ajax(servicePath.findAlreadySettingOtherAcc, sIds);
                            }
                            service.findAlreadySettingOtherAcc = findAlreadySettingOtherAcc;
                            // Screen B
                            function findListUserInfo(sIds) {
                                return nts.uk.request.ajax(servicePath.findListUserInfo, { employeeIds: sIds });
                            }
                            service.findListUserInfo = findListUserInfo;
                            function findListWindowAccByEmployeeId(employeeId) {
                                return nts.uk.request.ajax(servicePath.findListWindowAccByEmployeeId, { employeeId: employeeId });
                            }
                            service.findListWindowAccByEmployeeId = findListWindowAccByEmployeeId;
                            function saveWindowAccount(saveWindowAcc) {
                                return nts.uk.request.ajax(servicePath.saveWindowAccount, saveWindowAcc);
                            }
                            service.saveWindowAccount = saveWindowAccount;
                            function removeWindowAccount(employeeId) {
                                return nts.uk.request.ajax(servicePath.removeWindowAccount, { employeeId: employeeId });
                            }
                            service.removeWindowAccount = removeWindowAccount;
                            //Screen C
                            function findOtherSysAccByEmployeeId(employeeId) {
                                return nts.uk.request.ajax(servicePath.findOtherSysAccByEmployeeId, { employeeId: employeeId });
                            }
                            service.findOtherSysAccByEmployeeId = findOtherSysAccByEmployeeId;
                            function removeOtherSysAccount(employeeId) {
                                return nts.uk.request.ajax(servicePath.removeOtherSysAccount, { employeeId: employeeId });
                            }
                            service.removeOtherSysAccount = removeOtherSysAccount;
                            function saveOtherSysAccount(saveWindowAcc) {
                                return nts.uk.request.ajax(servicePath.saveOtherSysAccount, saveWindowAcc);
                            }
                            service.saveOtherSysAccount = saveOtherSysAccount;
                            /**
                             * Model namespace.
                             */
                            var model;
                            (function (model) {
                                var WindownAccountFinderDto = /** @class */ (function () {
                                    function WindownAccountFinderDto() {
                                    }
                                    return WindownAccountFinderDto;
                                }());
                                model.WindownAccountFinderDto = WindownAccountFinderDto;
                                var UserDto = /** @class */ (function () {
                                    function UserDto() {
                                    }
                                    return UserDto;
                                }());
                                model.UserDto = UserDto;
                                var SaveWindowAccountCommand = /** @class */ (function () {
                                    function SaveWindowAccountCommand() {
                                    }
                                    return SaveWindowAccountCommand;
                                }());
                                model.SaveWindowAccountCommand = SaveWindowAccountCommand;
                                var WindowAccountDto = /** @class */ (function () {
                                    function WindowAccountDto(employeeId, hostName, userName, no, useAtr) {
                                        this.employeeId = employeeId;
                                        this.hostName = hostName;
                                        this.userName = userName;
                                        this.no = no;
                                        this.useAtr = useAtr;
                                        this.isChange = true;
                                    }
                                    return WindowAccountDto;
                                }());
                                model.WindowAccountDto = WindowAccountDto;
                                var OtherSysAccFinderDto = /** @class */ (function () {
                                    function OtherSysAccFinderDto(employeeId, companyCode, userName, useAtr) {
                                        this.employeeId = employeeId;
                                        this.companyCode = companyCode;
                                        this.userName = userName;
                                        this.useAtr = useAtr;
                                        this.isChange = true;
                                    }
                                    return OtherSysAccFinderDto;
                                }());
                                model.OtherSysAccFinderDto = OtherSysAccFinderDto;
                                var SaveOtherSysAccountCommand = /** @class */ (function () {
                                    function SaveOtherSysAccountCommand() {
                                    }
                                    return SaveOtherSysAccountCommand;
                                }());
                                model.SaveOtherSysAccountCommand = SaveOtherSysAccountCommand;
                            })(model = service.model || (service.model = {}));
                        })(service = a.service || (a.service = {}));
                    })(a = cmm021.a || (cmm021.a = {}));
                })(cmm021 = view.cmm021 || (view.cmm021 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm021.a.service.js.map