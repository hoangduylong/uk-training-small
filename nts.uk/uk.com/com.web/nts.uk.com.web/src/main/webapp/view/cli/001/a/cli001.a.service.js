var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cli001;
                (function (cli001) {
                    var a;
                    (function (a) {
                        var service;
                        (function (service) {
                            var servicePath = {
                                removeLockOutData: "ctx/sys/gateway/securitypolicy/lockoutdata/remove",
                                findLockOutData: "ctx/sys/gateway/securitypolicy/lockoutdata/find",
                                findByUserId: "ctx/sys/gateway/securitypolicy/lockoutdata/findByUserId/"
                            };
                            function removeLockOutData(command) {
                                return nts.uk.request.ajax(servicePath.removeLockOutData, command);
                            }
                            service.removeLockOutData = removeLockOutData;
                            function findAll() {
                                return nts.uk.request.ajax(servicePath.findLockOutData);
                            }
                            service.findAll = findAll;
                            function findByUserId(userId) {
                                return nts.uk.request.ajax(servicePath.findByUserId + userId);
                            }
                            service.findByUserId = findByUserId;
                        })(service = a.service || (a.service = {}));
                    })(a = cli001.a || (cli001.a = {}));
                })(cli001 = view.cli001 || (view.cli001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cli001.a.service.js.map