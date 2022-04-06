var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps017;
                (function (cps017) {
                    var b;
                    (function (b) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var format = nts.uk.text.format;
                            var paths = {
                                getAllOrderSetting: "ctx/pereg/person/info/setting/selection/OrderSetting/{0}",
                                updateSelOrder: "ctx/pereg/person/info/setting/selection/updateSelOrder",
                            };
                            //get all
                            function getAllOrderSetting(histId) {
                                var _path = format(paths.getAllOrderSetting, histId);
                                return nts.uk.request.ajax("com", _path);
                            }
                            service.getAllOrderSetting = getAllOrderSetting;
                            // update selection order
                            function updateSelOrder(command) {
                                return ajax(paths.updateSelOrder, command);
                            }
                            service.updateSelOrder = updateSelOrder;
                        })(service = b.service || (b.service = {}));
                    })(b = cps017.b || (cps017.b = {}));
                })(cps017 = view.cps017 || (view.cps017 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps017.b.service.js.map