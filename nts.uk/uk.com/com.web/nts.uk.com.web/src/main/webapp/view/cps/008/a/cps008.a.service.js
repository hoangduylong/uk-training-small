var cps008;
(function (cps008) {
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
            function saveAsExcel(languageId) {
                var program = nts.uk.ui._viewModel.kiban.programName().split(" ");
                var domainType = "CPS008";
                if (program.length > 1) {
                    program.shift();
                    domainType = domainType + program.join(" ");
                }
                return nts.uk.request.exportFile('/masterlist/report/print', {
                    domainId: "Maintenance", domainType: domainType, languageId: languageId, reportType: 0
                });
            }
            service.saveAsExcel = saveAsExcel;
        })(service = a.service || (a.service = {}));
    })(a = cps008.a || (cps008.a = {}));
})(cps008 || (cps008 = {}));
//# sourceMappingURL=cps008.a.service.js.map