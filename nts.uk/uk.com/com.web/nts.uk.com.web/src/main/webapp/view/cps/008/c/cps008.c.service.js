var cps008;
(function (cps008) {
    var c;
    (function (c) {
        var service;
        (function (service) {
            var ajax = nts.uk.request.ajax;
            var format = nts.uk.text.format;
            var paths = {
                getDetails: "ctx/pereg/person/maintenance/findOne/{0}",
                saveData: "ctx/pereg/person/maintenance/saveLayout"
            };
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
        })(service = c.service || (c.service = {}));
    })(c = cps008.c || (cps008.c = {}));
})(cps008 || (cps008 = {}));
//# sourceMappingURL=cps008.c.service.js.map