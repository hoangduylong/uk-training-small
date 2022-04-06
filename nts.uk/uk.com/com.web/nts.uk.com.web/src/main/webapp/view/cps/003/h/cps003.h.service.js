var cps003;
(function (cps003) {
    var h;
    (function (h) {
        var service;
        (function (service) {
            var ajax = nts.uk.request.ajax;
            service.push = {
                data: function (command) { return ajax('', command); }
            };
            service.fetch = {
                person: function (id) { return ajax("/ctx/person/".concat(id)); },
            };
        })(service = h.service || (h.service = {}));
    })(h = cps003.h || (cps003.h = {}));
})(cps003 || (cps003 = {}));
//# sourceMappingURL=cps003.h.service.js.map