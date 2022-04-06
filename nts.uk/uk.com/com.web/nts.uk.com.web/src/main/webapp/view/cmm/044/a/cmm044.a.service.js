var cmm044;
(function (cmm044) {
    var a;
    (function (a) {
        var service;
        (function (service) {
            var paths = {
                findAgent: "workflow/agent/find",
                findAllAgent: "workflow/agent/find/",
                findEmployeeName: "workflow/agent/findEmpInfo",
                deleteAgent: "workflow/agent/delete",
                addAgent: "workflow/agent/add",
                updateAgent: "workflow/agent/update",
                searchEmployeeByLogin: "basic/organization/employee/onlyemployee",
            };
            function findAgent(parameter) {
                return nts.uk.request.ajax("com", paths.findAgent, parameter);
            }
            service.findAgent = findAgent;
            function findAllAgent(employeeId) {
                return nts.uk.request.ajax("com", paths.findAllAgent + employeeId);
            }
            service.findAllAgent = findAllAgent;
            function deleteAgent(agent) {
                return nts.uk.request.ajax("com", paths.deleteAgent, agent);
            }
            service.deleteAgent = deleteAgent;
            function addAgent(agent) {
                return nts.uk.request.ajax("com", paths.addAgent, agent);
            }
            service.addAgent = addAgent;
            function updateAgent(agent) {
                return nts.uk.request.ajax("com", paths.updateAgent, agent);
            }
            service.updateAgent = updateAgent;
            function searchEmployeeByLogin(baseDate) {
                return nts.uk.request.ajax('com', paths.searchEmployeeByLogin, baseDate);
            }
            service.searchEmployeeByLogin = searchEmployeeByLogin;
            function findEmployeeName(sId) {
                return nts.uk.request.ajax('com', paths.findEmployeeName, sId);
            }
            service.findEmployeeName = findEmployeeName;
            function exportExcel(listEmployee) {
                return nts.uk.request.exportFile('/masterlist/report/print', { domainId: "SubscribeRegis", domainType: 'CMM044代行者の登録', languageId: 'ja', reportType: 0, data: listEmployee });
            }
            service.exportExcel = exportExcel;
        })(service = a.service || (a.service = {}));
    })(a = cmm044.a || (cmm044.a = {}));
})(cmm044 || (cmm044 = {}));
//# sourceMappingURL=cmm044.a.service.js.map