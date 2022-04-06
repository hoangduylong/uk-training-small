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
                        var service;
                        (function (service) {
                            var paths = {
                                getCompanyImportList: "ctx/sys/auth/regis/user/getAllCom",
                                getUserListByCid: "ctx/sys/auth/regis/user/getlistUser/",
                                getAllUser: "ctx/sys/auth/regis/user/getAllUser",
                                registerUser: "ctx/sys/auth/regis/user/register",
                                updateUser: "ctx/sys/auth/regis/user/update",
                                deleteUser: "ctx/sys/auth/regis/user/delete",
                            };
                            function getCompanyImportList() {
                                return nts.uk.request.ajax(paths.getCompanyImportList);
                            }
                            service.getCompanyImportList = getCompanyImportList;
                            ;
                            function getUserListByCid(cid) {
                                return nts.uk.request.ajax(paths.getUserListByCid + cid);
                            }
                            service.getUserListByCid = getUserListByCid;
                            function getAllUser() {
                                return nts.uk.request.ajax(paths.getAllUser);
                            }
                            service.getAllUser = getAllUser;
                            function registerUser(userDto) {
                                return nts.uk.request.ajax(paths.registerUser, userDto);
                            }
                            service.registerUser = registerUser;
                            function updateUser(userDto) {
                                return nts.uk.request.ajax(paths.updateUser, userDto);
                            }
                            service.updateUser = updateUser;
                            function deleteUser(deleteCmd) {
                                return nts.uk.request.ajax(paths.deleteUser, deleteCmd);
                            }
                            service.deleteUser = deleteUser;
                        })(service = a.service || (a.service = {}));
                        var model;
                        (function (model) {
                            var CompanyImport = /** @class */ (function () {
                                function CompanyImport(companyCode, companyName, companyId) {
                                    this.companyCode = companyCode;
                                    this.companyName = companyName;
                                    this.companyId = companyId;
                                }
                                ;
                                return CompanyImport;
                            }());
                            model.CompanyImport = CompanyImport;
                            var UserDto = /** @class */ (function () {
                                function UserDto(userID, loginID, userName, password, expirationDate, mailAddress, associatedPersonID, specialUser, multiCompanyConcurrent, cid) {
                                    this.userID = userID;
                                    this.loginID = loginID;
                                    this.userName = userName;
                                    this.password = password;
                                    this.expirationDate = expirationDate;
                                    this.mailAddress = mailAddress;
                                    this.associatedPersonID = associatedPersonID;
                                    this.specialUser = specialUser;
                                    this.multiCompanyConcurrent = multiCompanyConcurrent;
                                    this.cid = cid;
                                }
                                return UserDto;
                            }());
                            model.UserDto = UserDto;
                            var DeleteCmd = /** @class */ (function () {
                                function DeleteCmd(userID, personalId) {
                                    this.userID = userID;
                                    this.personalId = personalId;
                                }
                                ;
                                return DeleteCmd;
                            }());
                            model.DeleteCmd = DeleteCmd;
                        })(model = a.model || (a.model = {}));
                    })(a = cas004.a || (cas004.a = {}));
                })(cas004 = view.cas004 || (view.cas004 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cas004.a.service.js.map