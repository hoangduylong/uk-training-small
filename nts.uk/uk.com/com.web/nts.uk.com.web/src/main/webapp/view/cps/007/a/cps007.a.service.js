var cps007;
(function (cps007) {
    var a;
    (function (a) {
        var service;
        (function (service) {
            var ajax = nts.uk.request.ajax;
            var paths = {
                'getData': 'ctx/pereg/person/newlayout/get',
                'saveData': 'ctx/pereg/person/newlayout/save'
            };
            function getData() {
                return ajax(paths.getData);
            }
            service.getData = getData;
            function saveData(command) {
                return ajax(paths.saveData, command);
            }
            service.saveData = saveData;
            //saveAsExcel
            function saveAsExcel(languageId) {
                var program = nts.uk.ui._viewModel.kiban.programName().split(" ");
                var domainType = "CPS007";
                if (program.length > 1) {
                    program.shift();
                    domainType = domainType + program.join(" ");
                }
                return nts.uk.request.exportFile('/masterlist/report/print', {
                    domainId: "NewLayout", domainType: domainType, languageId: languageId, reportType: 0
                });
            }
            service.saveAsExcel = saveAsExcel;
        })(service = a.service || (a.service = {}));
    })(a = cps007.a || (cps007.a = {}));
})(cps007 || (cps007 = {}));
//# sourceMappingURL=cps007.a.service.js.map