var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps005;
                (function (cps005) {
                    var a;
                    (function (a) {
                        var service;
                        (function (service) {
                            var Service = /** @class */ (function () {
                                function Service() {
                                    this.paths = {
                                        getAllPerInfoCtg: "ctx/pereg/person/info/category/findAll/company/root",
                                        getPerInfoCtg: "ctx/pereg/person/info/category/find/companyby/{0}",
                                        getPerInfoCtgWithItemsName: "ctx/pereg/person/info/category/find/withItemsName/{0}",
                                        addPerInfoCtg: "ctx/pereg/person/info/category/add",
                                        updatePerInfoCtg: "ctx/pereg/person/info/category/update",
                                    };
                                }
                                Service.prototype.getAllPerInfoCtg = function () {
                                    return nts.uk.request.ajax("com", this.paths.getAllPerInfoCtg);
                                };
                                ;
                                Service.prototype.getPerInfoCtg = function (categoryId) {
                                    var _path = nts.uk.text.format(this.paths.getPerInfoCtg, categoryId);
                                    return nts.uk.request.ajax("com", _path);
                                };
                                ;
                                Service.prototype.getPerInfoCtgWithItemsName = function (categoryId) {
                                    var _path = nts.uk.text.format(this.paths.getPerInfoCtgWithItemsName, categoryId);
                                    return nts.uk.request.ajax("com", _path);
                                };
                                ;
                                Service.prototype.addPerInfoCtg = function (newCategory) {
                                    return nts.uk.request.ajax("com", this.paths.addPerInfoCtg, newCategory);
                                };
                                ;
                                Service.prototype.updatePerInfoCtg = function (updateCategory) {
                                    return nts.uk.request.ajax("com", this.paths.updatePerInfoCtg, updateCategory);
                                };
                                ;
                                return Service;
                            }());
                            service.Service = Service;
                        })(service = a.service || (a.service = {}));
                    })(a = cps005.a || (cps005.a = {}));
                })(cps005 = view.cps005 || (view.cps005 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps005.a.service.js.map