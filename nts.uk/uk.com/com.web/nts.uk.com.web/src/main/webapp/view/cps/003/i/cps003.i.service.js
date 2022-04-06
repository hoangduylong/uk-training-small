var cps003;
(function (cps003) {
    var i;
    (function (i) {
        var service;
        (function (service) {
            var ajax = nts.uk.request.ajax;
            service.push = {
                data: function (command) { return ajax('', command); }
            };
            service.fetch = {
                person: function (id) { return ajax("/ctx/person/".concat(id)); },
            };
        })(service = i.service || (i.service = {}));
    })(i = cps003.i || (cps003.i = {}));
})(cps003 || (cps003 = {}));
//# sourceMappingURL=cps003.i.service.js.map