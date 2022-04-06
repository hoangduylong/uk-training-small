var view;
(function (view) {
    var ccg007;
    (function (ccg007) {
        var sso;
        (function (sso) {
            var service;
            (function (service) {
                var servicePath = {
                    account: "ctx/sys/gateway/login/account"
                };
                function account() {
                    return nts.uk.request.ajax(servicePath.account);
                }
                service.account = account;
            })(service = sso.service || (sso.service = {}));
        })(sso = ccg007.sso || (ccg007.sso = {}));
    })(ccg007 = view.ccg007 || (view.ccg007 = {}));
})(view || (view = {}));
//# sourceMappingURL=sso.service.js.map