var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm002;
                (function (cmm002) {
                    var a;
                    (function (a) {
                        var service;
                        (function (service) {
                            var paths = {
                                getData: "com/screen/cmm002/get",
                                add: "com/ctx/sys/gateway/accessrestrictions/add",
                                update: "com/ctx/sys/gateway/accessrestrictions/update",
                                del: "com/ctx/sys/gateway/accessrestrictions/del"
                            };
                            function getData() {
                                return nts.uk.request.ajax(paths.getData);
                            }
                            service.getData = getData;
                            function add(param) {
                                return nts.uk.request.ajax(paths.add, param);
                            }
                            service.add = add;
                            function update(param) {
                                return nts.uk.request.ajax(paths.update, param);
                            }
                            service.update = update;
                            function del(param) {
                                return nts.uk.request.ajax(paths.del, param);
                            }
                            service.del = del;
                        })(service = a.service || (a.service = {}));
                    })(a = cmm002.a || (cmm002.a = {}));
                })(cmm002 = view.cmm002 || (view.cmm002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm002.a.service.js.map