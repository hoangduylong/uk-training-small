var cps008;
(function (cps008) {
    var b;
    (function (b) {
        var service;
        (function (service) {
            var ajax = nts.uk.request.ajax;
            var format = nts.uk.text.format;
            var paths = {
                getListCls: "ctx/pereg/person/maintenance/findOne/{0}",
                getData: "ctx/pereg/person/newlayout/get",
                saveData: "ctx/pereg/person/newlayout/save",
            };
            function getData() {
                return ajax(paths.getData);
            }
            service.getData = getData;
            function getListCls(lid) {
                return ajax(format(paths.getListCls, lid));
            }
            service.getListCls = getListCls;
            function saveData(command) {
                return ajax(paths.saveData, command);
            }
            service.saveData = saveData;
        })(service = b.service || (b.service = {}));
    })(b = cps008.b || (cps008.b = {}));
})(cps008 || (cps008 = {}));
//# sourceMappingURL=cps008.b.service.js.map