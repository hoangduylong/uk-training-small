var cps003;
(function (cps003) {
    var f;
    (function (f) {
        var service;
        (function (service) {
            var ajax = nts.uk.request.ajax;
            service.push = {
                data: function (command) { return ajax('', command); }
            };
            service.fetch = {
                setting: function (params) { return ajax("ctx/pereg/grid-layout/get-setting", params); },
                getCbxOptions: function (cmd) { return ajax("ctx/pereg/grid-layout/get-combobox/data", cmd); },
                getItemsById: function (id) { return ajax("ctx/pereg/person/info/ctgItem/layout/findby/itemId/".concat(id)); }
            };
        })(service = f.service || (f.service = {}));
    })(f = cps003.f || (cps003.f = {}));
})(cps003 || (cps003 = {}));
//# sourceMappingURL=cps003.f.service.js.map