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
                    var h;
                    (function (h) {
                        var service;
                        (function (service) {
                            // Service paths.
                            var servicePath = {
                                submitForgotPass: "ctx/sys/gateway/changepassword/submitforgotpass",
                                getUserNameByURL: "ctx/sys/gateway/changepassword/getUserNameByURL",
                                submitLogin: "ctx/sys/gateway/login/submit/form1"
                            };
                            /**
                              * Function is used to check contract.
                              */
                            function submitForgotPass(command) {
                                return nts.uk.request.ajax(servicePath.submitForgotPass, command);
                            }
                            service.submitForgotPass = submitForgotPass;
                            function getUserNameByURL(embeddedId) {
                                return nts.uk.request.ajax(servicePath.getUserNameByURL + "/" + embeddedId);
                            }
                            service.getUserNameByURL = getUserNameByURL;
                            function submitLogin(data) {
                                return nts.uk.request.ajax(servicePath.submitLogin + location.search, data);
                            }
                            service.submitLogin = submitLogin;
                            var ForgotPasswordCommand = /** @class */ (function () {
                                function ForgotPasswordCommand(embeddedId, userId, newPassword, confirmNewPassword) {
                                    this.embeddedId = embeddedId;
                                    this.userId = userId;
                                    this.newPassword = newPassword;
                                    this.confirmNewPassword = confirmNewPassword;
                                }
                                return ForgotPasswordCommand;
                            }());
                            service.ForgotPasswordCommand = ForgotPasswordCommand;
                        })(service = h.service || (h.service = {}));
                    })(h = ccg007.h || (ccg007.h = {}));
                })(ccg007 = view.ccg007 || (view.ccg007 = {}));
            })(view = pr.view || (pr.view = {}));
        })(pr = uk.pr || (uk.pr = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg007.h.service.js.map