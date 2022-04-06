var cmm042;
(function (cmm042) {
    var a;
    (function (a) {
        var service;
        (function (service) {
            var ajax = nts.uk.request.ajax;
            var format = nts.uk.text.format;
            var paths = {
                getAll: "ctx/pereg/person/maintenance/findAll",
                getDetails: "ctx/pereg/person/maintenance/findOne/{0}",
                saveData: "ctx/pereg/person/maintenance/saveLayout"
            };
            /**
            * Get list Maintenance Layout
            */
            function getAll() {
                return ajax(paths.getAll);
            }
            service.getAll = getAll;
            function getDetails(lid) {
                return ajax(format(paths.getDetails, lid));
            }
            service.getDetails = getDetails;
            /**
             * add  Maintenance Layout
             */
            function saveData(data) {
                return ajax(paths.saveData, data);
            }
            service.saveData = saveData;
        })(service = a.service || (a.service = {}));
    })(a = cmm042.a || (cmm042.a = {}));
})(cmm042 || (cmm042 = {}));
//# sourceMappingURL=cmm042.a.service.js.map