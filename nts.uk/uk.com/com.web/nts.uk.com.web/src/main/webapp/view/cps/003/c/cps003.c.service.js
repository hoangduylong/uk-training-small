var cps003;
(function (cps003) {
    var c;
    (function (c) {
        var service;
        (function (service) {
            var ajax = nts.uk.request.ajax;
            service.push = {
                register: function (command) { return ajax("facade/pereg/grid/register", command); }
            };
        })(service = c.service || (c.service = {}));
    })(c = cps003.c || (cps003.c = {}));
})(cps003 || (cps003 = {}));
//# sourceMappingURL=cps003.c.service.js.map