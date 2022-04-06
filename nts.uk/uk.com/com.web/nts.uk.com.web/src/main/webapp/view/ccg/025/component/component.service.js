var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg025;
                (function (ccg025) {
                    var a;
                    (function (a) {
                        var component;
                        (function (component) {
                            var service;
                            (function (service) {
                                var paths = {
                                    getListRoleByRoleType: "ctx/sys/auth/role/get-list-role-new",
                                };
                                /** get getListRoleByRoleType by roleType */
                                function getListRoleByRoleType(roleType, roleAtr) {
                                    var param = { 'roleType': roleType, 'assignAtr': roleAtr };
                                    return nts.uk.request.ajax("com", paths.getListRoleByRoleType, param);
                                }
                                service.getListRoleByRoleType = getListRoleByRoleType;
                            })(service = component.service || (component.service = {}));
                        })(component = a.component || (a.component = {}));
                    })(a = ccg025.a || (ccg025.a = {}));
                })(ccg025 = view.ccg025 || (view.ccg025 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=component.service.js.map