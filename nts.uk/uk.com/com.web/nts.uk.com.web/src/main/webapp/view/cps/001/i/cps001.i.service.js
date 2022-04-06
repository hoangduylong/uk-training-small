var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps001;
                (function (cps001) {
                    var i;
                    (function (i) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var format = nts.uk.text.format;
                            var paths = {
                                'getAllList': 'at/record/remainnumber/special/getall/{0}/{1}',
                                'getDetail': 'at/record/remainnumber/special/get-detail/{0}',
                                'save': 'at/record/remainnumber/special/save',
                                'delete': 'at/record/remainnumber/special/delete'
                            };
                            function getAllList(sid, spicialCode) {
                                return ajax('at', format(paths.getAllList, sid, spicialCode));
                            }
                            service.getAllList = getAllList;
                            function getDetail(specialid) {
                                return ajax('at', format(paths.getDetail, specialid));
                            }
                            service.getDetail = getDetail;
                            function saveData(command) {
                                return ajax('at', paths.save, command);
                            }
                            service.saveData = saveData;
                            function remove(specialid) {
                                var command = { "specialid": specialid };
                                return ajax('at', paths.delete, command);
                            }
                            service.remove = remove;
                            function getItemDef(ctgCd) {
                                return ajax('com', format("ctx/pereg/person/info/ctgItem/findby/ctg-cd/{0}", ctgCd));
                            }
                            service.getItemDef = getItemDef;
                        })(service = i.service || (i.service = {}));
                    })(i = cps001.i || (cps001.i = {}));
                })(cps001 = view.cps001 || (view.cps001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps001.i.service.js.map