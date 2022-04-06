var cps003;
(function (cps003) {
    var e;
    (function (e) {
        var service;
        (function (service) {
            var ajax = nts.uk.request.ajax;
            service.push = {
                data: function (command) { return ajax('', command); }
            };
            service.fetch = {
                person: function (id) { return ajax("/ctx/person/".concat(id)); },
            };
        })(service = e.service || (e.service = {}));
    })(e = cps003.e || (cps003.e = {}));
})(cps003 || (cps003 = {}));
//# sourceMappingURL=cps003.e.service.js.map