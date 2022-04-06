var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps009;
                (function (cps009) {
                    var d;
                    (function (d) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var paths = {
                                add: "ctx/pereg/person/info/setting/init/add"
                            };
                            /**
                        * add  init value setting
                        */
                            function add(data) {
                                return ajax(paths.add, data);
                            }
                            service.add = add;
                        })(service = d.service || (d.service = {}));
                    })(d = cps009.d || (cps009.d = {}));
                })(cps009 = view.cps009 || (view.cps009 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps009.d.service.js.map