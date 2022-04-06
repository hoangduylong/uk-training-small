var cps007;
(function (cps007) {
    var b;
    (function (b) {
        var service;
        (function (service) {
            var ajax = nts.uk.request.ajax;
            var format = nts.uk.text.format;
            var paths = {
                'getCat': 'ctx/pereg/person/info/category/find/companyby/{0}',
                'getItemDs': 'ctx/pereg/person/info/ctgItem/layout/findby/categoryId/{0}'
            };
            function getCategory(cid) {
                return ajax(format(paths.getCat, cid));
            }
            service.getCategory = getCategory;
            function getItemDefinitions(cid) {
                return ajax(format(paths.getItemDs, cid));
            }
            service.getItemDefinitions = getItemDefinitions;
        })(service = b.service || (b.service = {}));
    })(b = cps007.b || (cps007.b = {}));
})(cps007 || (cps007 = {}));
//# sourceMappingURL=cps007.b.service.js.map