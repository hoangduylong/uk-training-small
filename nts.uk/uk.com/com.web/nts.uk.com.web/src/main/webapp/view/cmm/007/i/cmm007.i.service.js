var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm007;
                (function (cmm007) {
                    var i;
                    (function (i) {
                        var service;
                        (function (service) {
                            /**
                             * define path to service
                             */
                            var path = {
                                findList: "screen/com/systemresource/findList",
                                save: "screen/com/systemresource/save",
                            };
                            /**
                            *
                            */
                            function findList() {
                                return nts.uk.request.ajax(path.findList);
                            }
                            service.findList = findList;
                            /**
                            *
                            */
                            function save(data) {
                                return nts.uk.request.ajax(path.save, data);
                            }
                            service.save = save;
                        })(service = i.service || (i.service = {}));
                    })(i = cmm007.i || (cmm007.i = {}));
                })(cmm007 = view.cmm007 || (view.cmm007 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm007.i.service.js.map