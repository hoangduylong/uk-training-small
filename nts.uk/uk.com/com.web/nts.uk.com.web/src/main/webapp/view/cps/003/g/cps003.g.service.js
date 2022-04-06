var cps003;
(function (cps003) {
    var g;
    (function (g) {
        var service;
        (function (service) {
            var ajax = nts.uk.request.ajax;
            service.push = {
                data: function (command) { return ajax('', command); }
            };
            service.fetch = {
                person: function (id) { return ajax("/ctx/person/".concat(id)); },
            };
        })(service = g.service || (g.service = {}));
    })(g = cps003.g || (cps003.g = {}));
})(cps003 || (cps003 = {}));
//# sourceMappingURL=cps003.g.service.js.map