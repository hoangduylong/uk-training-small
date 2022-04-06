var cmm044;
(function (cmm044) {
    var d;
    (function (d) {
        var service;
        (function (service) {
            var paths = {
                findAgentByDate: "workflow/agent/findByDate",
                findEmployees: "basic/organization/employee/search"
            };
            function findAgentByDate(startDate, endDate) {
                var option = {
                    startDate: new Date(startDate),
                    endDate: new Date(endDate)
                };
                return nts.uk.request.ajax("com", paths.findAgentByDate, option);
            }
            service.findAgentByDate = findAgentByDate;
            function findEmployees(option) {
                return nts.uk.request.ajax("com", paths.findEmployees, option);
            }
            service.findEmployees = findEmployees;
        })(service = d.service || (d.service = {}));
    })(d = cmm044.d || (cmm044.d = {}));
})(cmm044 || (cmm044 = {}));
//# sourceMappingURL=cmm044.d.service.js.map