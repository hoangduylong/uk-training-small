var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var pr;
        (function (pr) {
            var view;
            (function (view) {
                var ccg007;
                (function (ccg007) {
                    var e;
                    (function (e) {
                        var service;
                        (function (service) {
                            // Service paths.
                            var servicePath = {
                                submitChangePass: "ctx/sys/gateway/changepassword/submitchangepass",
                                getUserNameByEmployeeCode: "ctx/sys/gateway/changepassword/getUserNameByEmployeeCode",
                                getUserNameByLoginId: "ctx/sys/gateway/changepassword/getUserNameByLoginId"
                            };
                            /**
                              * Function is used to check contract.
                              */
                            function submitChangePass(data) {
                                return nts.uk.request.ajax(servicePath.submitChangePass, data);
                            }
                            service.submitChangePass = submitChangePass;
                            function getUserNameByEmployeeCode(data) {
                                return nts.uk.request.ajax(servicePath.getUserNameByEmployeeCode, data);
                            }
                            service.getUserNameByEmployeeCode = getUserNameByEmployeeCode;
                            function getUserNameByLoginId(contractCode, loginId) {
                                return nts.uk.request.ajax(servicePath.getUserNameByLoginId + "/" + contractCode + "/" + loginId);
                            }
                            service.getUserNameByLoginId = getUserNameByLoginId;
                            var ChangePasswordCommand = /** @class */ (function () {
                                function ChangePasswordCommand(oldPassword, newPassword, confirmNewPassword) {
                                    this.oldPassword = oldPassword;
                                    this.newPassword = newPassword;
                                    this.confirmNewPassword = confirmNewPassword;
                                }
                                return ChangePasswordCommand;
                            }());
                            service.ChangePasswordCommand = ChangePasswordCommand;
                            var EmployeeInforDto = /** @class */ (function () {
                                function EmployeeInforDto(contractCode, employeeCode, companyCode) {
                                    this.contractCode = contractCode;
                                    this.employeeCode = employeeCode;
                                    this.companyCode = companyCode;
                                }
                                return EmployeeInforDto;
                            }());
                            service.EmployeeInforDto = EmployeeInforDto;
                        })(service = e.service || (e.service = {}));
                    })(e = ccg007.e || (ccg007.e = {}));
                })(ccg007 = view.ccg007 || (view.ccg007 = {}));
            })(view = pr.view || (pr.view = {}));
        })(pr = uk.pr || (uk.pr = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg007.e.service.js.map