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
                    var a;
                    (function (a) {
                        var service;
                        (function (service) {
                            var paths = {
                                getDataStart: "at/screen/cmm040/start",
                                update: "at/screen/cmm040/update",
                                deleteWorkLocation: "at/screen/cmm040/deleteScreenA",
                                getWorkPlace: "at/screen/cmm040/getWorkPlace",
                                radiusEnum: 'at/screen/cmm040/enum',
                                insert: "at/screen/cmm040/insert",
                                checkWorkplace: "at/screen/cmm040/checkWorkplace",
                                checkDelete: "at/screen/cmm040/checkDelete"
                            };
                            function getDataStart() {
                                return nts.uk.request.ajax("at", paths.getDataStart);
                            }
                            service.getDataStart = getDataStart;
                            function insert(param) {
                                return nts.uk.request.ajax("at", paths.insert, param);
                            }
                            service.insert = insert;
                            function update(param) {
                                return nts.uk.request.ajax("at", paths.update, param);
                            }
                            service.update = update;
                            function deleteWorkLocation(param) {
                                return nts.uk.request.ajax("at", paths.deleteWorkLocation, param);
                            }
                            service.deleteWorkLocation = deleteWorkLocation;
                            function getWorkPlace(param) {
                                return nts.uk.request.ajax("at", paths.getWorkPlace, param);
                            }
                            service.getWorkPlace = getWorkPlace;
                            function radiusEnum() {
                                return nts.uk.request.ajax("at", paths.radiusEnum);
                            }
                            service.radiusEnum = radiusEnum;
                            function checkWorkplace(param) {
                                return nts.uk.request.ajax("at", paths.checkWorkplace, param);
                            }
                            service.checkWorkplace = checkWorkplace;
                            function checkDelete() {
                                return nts.uk.request.ajax("at", paths.checkDelete);
                            }
                            service.checkDelete = checkDelete;
                        })(service = a.service || (a.service = {}));
                    })(a = cmm040.a || (cmm040.a = {}));
                })(cmm040 = view.cmm040 || (view.cmm040 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm040.a.service.js.map