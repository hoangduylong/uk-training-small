var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg022;
                (function (ccg022) {
                    var a;
                    (function (a) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var format = nts.uk.text.format;
                            var paths = {
                                find: "ctx/sys/gateway/stopsetting/find/{0}",
                                save: "ctx/sys/gateway/stopsetting/save",
                            };
                            function find(state) {
                                var path = format(paths.find, state);
                                return ajax(path);
                            }
                            service.find = find;
                            function save(command) {
                                return ajax(paths.save, command);
                            }
                            service.save = save;
                        })(service = a.service || (a.service = {}));
                    })(a = ccg022.a || (ccg022.a = {}));
                })(ccg022 = view.ccg022 || (view.ccg022 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg022.a.service.js.map