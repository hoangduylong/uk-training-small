var cps003;
(function (cps003) {
    var b;
    (function (b) {
        var service;
        (function (service) {
            var ajax = nts.uk.request.ajax;
            var paths = {
                checkColum: "basic/organization/empfilemanagement/find/checkFile"
            };
            function checkColums(params) {
                return ajax(paths.checkColum, params);
            }
            service.checkColums = checkColums;
        })(service = b.service || (b.service = {}));
    })(b = cps003.b || (cps003.b = {}));
})(cps003 || (cps003 = {}));
//# sourceMappingURL=cps003.b.service.js.map