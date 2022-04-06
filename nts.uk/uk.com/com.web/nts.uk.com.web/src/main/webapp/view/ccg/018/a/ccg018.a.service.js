var ccg018;
(function (ccg018) {
    var a;
    (function (a) {
        var service;
        (function (service) {
            var paths = {
                findBySystemMenuCls: "sys/portal/standardmenu/findBySystemMenuCls",
                findDataForAfterLoginDis: "sys/portal/standardmenu/findDataForAfterLoginDis",
                findByCId: "sys/portal/toppagesetting/findByCId",
                findAllTopPagePersonSet: "sys/portal/toppagesetting/personset/findBySids",
                findTopPagePersonSet: "sys/portal/toppagesetting/personset/findBySid",
                findAllRoleSet: "ctx/sys/auth/roleset/findallroleset",
                findAllTopPageRoleSet: "sys/portal/toppagesetting/roleset/findAll"
            };
            function findTopPagePersonSet(listSid) {
                return nts.uk.request.ajax("com", paths.findTopPagePersonSet, listSid);
            }
            service.findTopPagePersonSet = findTopPagePersonSet;
            function findByCId() {
                return nts.uk.request.ajax("com", paths.findByCId);
            }
            service.findByCId = findByCId;
            function findBySystemMenuCls() {
                return nts.uk.request.ajax("com", paths.findBySystemMenuCls);
            }
            service.findBySystemMenuCls = findBySystemMenuCls;
            function findDataForAfterLoginDis() {
                return nts.uk.request.ajax("com", paths.findDataForAfterLoginDis);
            }
            service.findDataForAfterLoginDis = findDataForAfterLoginDis;
        })(service = a.service || (a.service = {}));
    })(a = ccg018.a || (ccg018.a = {}));
})(ccg018 || (ccg018 = {}));
//# sourceMappingURL=ccg018.a.service.js.map