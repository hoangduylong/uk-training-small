var cps003;
(function (cps003) {
    var d;
    (function (d) {
        var service;
        (function (service) {
            var ajax = nts.uk.request.ajax;
            service.push = {
                setting: function (command) { return ajax('ctx/pereg/grid-layout/save-setting/', command); }
            };
            service.fetch = {
                setting: function (cid) { return ajax("ctx/pereg/grid-layout/get-setting/".concat(cid)); }
            };
        })(service = d.service || (d.service = {}));
    })(d = cps003.d || (cps003.d = {}));
})(cps003 || (cps003 = {}));
//# sourceMappingURL=cps003.d.service.js.map