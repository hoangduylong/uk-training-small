var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm040;
                (function (cmm040) {
                    var b;
                    (function (b) {
                        var service;
                        (function (service) {
                            var paths = {
                                getDataStart: "at/screen/cmm040/startB",
                                update: "at/screen/cmm040/saveDataScreenB",
                                deleteData: "at/screen/cmm040/deleteScreenB"
                            };
                            function getDataStart(param) {
                                return nts.uk.request.ajax("at", paths.getDataStart, param);
                            }
                            service.getDataStart = getDataStart;
                            function update(param) {
                                return nts.uk.request.ajax("at", paths.update, param);
                            }
                            service.update = update;
                            function deleteData(param) {
                                return nts.uk.request.ajax("at", paths.deleteData, param);
                            }
                            service.deleteData = deleteData;
                        })(service = b.service || (b.service = {}));
                    })(b = cmm040.b || (cmm040.b = {}));
                })(cmm040 = view.cmm040 || (view.cmm040 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm040.b.service.js.map