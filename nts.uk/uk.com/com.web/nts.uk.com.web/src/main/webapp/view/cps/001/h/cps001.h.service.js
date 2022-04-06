var cps001;
(function (cps001) {
    var h;
    (function (h) {
        var service;
        (function (service) {
            var ajax = nts.uk.request.ajax;
            var format = nts.uk.text.format;
            var parentPath = "record/remainnumber/resv-lea/";
            var paths = {
                getAll: "get-resv-lea/{0}/{1}",
                getById: "get-resv-lea-by-id/{0}",
                generateDeadline: "generate-deadline",
                add: "add",
                update: "update",
                remove: "remove"
            };
            function getAll(emId, isAll) {
                return ajax('at', format(parentPath + paths.getAll, emId, isAll));
            }
            service.getAll = getAll;
            function getByGrantDate(id) {
                return ajax('at', format(parentPath + paths.getById, id));
            }
            service.getByGrantDate = getByGrantDate;
            function generateDeadline(grantDate) {
                return ajax('at', parentPath + paths.generateDeadline, grantDate);
            }
            service.generateDeadline = generateDeadline;
            function remove(id) {
                var command = { "rvsLeaId": id };
                return ajax("at", parentPath + paths.remove, command);
            }
            service.remove = remove;
            function update(id, employeeId, grantDate, deadline, expirationStatus, grantDays, useDays, overLimitDays, remainingDays) {
                var command = {
                    "rvsLeaId": id,
                    "employeeId": employeeId,
                    "grantDate": grantDate,
                    "deadline": deadline,
                    "expirationStatus": expirationStatus,
                    "grantDays": grantDays,
                    "useDays": useDays,
                    "overLimitDays": overLimitDays,
                    "remainingDays": remainingDays
                };
                return ajax('at', parentPath + paths.update, command);
            }
            service.update = update;
            function create(employeeId, grantDate, deadline, expirationStatus, grantDays, useDays, overLimitDays, remainingDays) {
                var command = {
                    "employeeId": employeeId,
                    "grantDate": grantDate,
                    "deadline": deadline,
                    "expirationStatus": expirationStatus,
                    "grantDays": grantDays,
                    "useDays": useDays,
                    "overLimitDays": overLimitDays,
                    "remainingDays": remainingDays
                };
                return ajax('at', parentPath + paths.add, command);
            }
            service.create = create;
            function getItemDef() {
                var ctgId = "CS00038";
                return ajax('com', format("ctx/pereg/person/info/ctgItem/findby/ctg-cd/{0}", ctgId));
            }
            service.getItemDef = getItemDef;
        })(service = h.service || (h.service = {}));
    })(h = cps001.h || (cps001.h = {}));
})(cps001 || (cps001 = {}));
//# sourceMappingURL=cps001.h.service.js.map