var ccg018;
(function (ccg018) {
    var a1;
    (function (a1) {
        var service;
        (function (service) {
            var paths = {
                update: "sys/portal/toppagesetting/roleset/save",
                findDataOfJobTitle: "bs/employee/jobtitle/findAll",
                findAllRoleSet: "ctx/sys/auth/roleset/findallroleset",
                findAllTopPageRoleSet: "sys/portal/toppagesetting/roleset/findAll",
                findByCId: "sys/portal/toppagesetting/findByCId",
            };
            function update(command) {
                return nts.uk.request.ajax("com", paths.update, command);
            }
            service.update = update;
            function findDataOfJobTitle(baseDate) {
                return nts.uk.request.ajax("com", paths.findDataOfJobTitle, { baseDate: baseDate });
            }
            service.findDataOfJobTitle = findDataOfJobTitle;
            function findAllRoleSet() {
                return nts.uk.request.ajax("com", paths.findAllRoleSet);
            }
            service.findAllRoleSet = findAllRoleSet;
            function findAllTopPageRoleSet() {
                return nts.uk.request.ajax("com", paths.findAllTopPageRoleSet);
            }
            service.findAllTopPageRoleSet = findAllTopPageRoleSet;
            function findByCId() {
                return nts.uk.request.ajax("com", paths.findByCId);
            }
            service.findByCId = findByCId;
        })(service = a1.service || (a1.service = {}));
    })(a1 = ccg018.a1 || (ccg018.a1 = {}));
})(ccg018 || (ccg018 = {}));
//# sourceMappingURL=ccg018.a1.service.js.map