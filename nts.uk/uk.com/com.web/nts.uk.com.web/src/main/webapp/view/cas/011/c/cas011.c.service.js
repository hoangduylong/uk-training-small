var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cas011;
                (function (cas011) {
                    var c;
                    (function (c) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var paths = {
                                getAllRoleSet: "ctx/sys/auth/roleset/findallroleset",
                                getCurrentDefaultRoleSet: "ctx/sys/auth/roleset/finddefaultroleset",
                                addDefaultRoleSet: "ctx/sys/auth/roleset/adddefaultroleset"
                            };
                            function getAllRoleSet() {
                                return ajax(paths.getAllRoleSet);
                            }
                            service.getAllRoleSet = getAllRoleSet;
                            function getCurrentDefaultRoleSet() {
                                return ajax(paths.getCurrentDefaultRoleSet);
                            }
                            service.getCurrentDefaultRoleSet = getCurrentDefaultRoleSet;
                            // add Default Role Set:
                            function addDefaultRoleSet(command) {
                                return ajax(paths.addDefaultRoleSet, command);
                            }
                            service.addDefaultRoleSet = addDefaultRoleSet;
                        })(service = c.service || (c.service = {}));
                    })(c = cas011.c || (cas011.c = {}));
                })(cas011 = view.cas011 || (view.cas011 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cas011.c.service.js.map