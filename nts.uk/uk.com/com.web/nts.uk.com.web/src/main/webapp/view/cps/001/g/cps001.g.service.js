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
                    var g;
                    (function (g) {
                        var service;
                        (function (service) {
                            var format = nts.uk.text.format;
                            var ajax = nts.uk.request.ajax;
                            /**
                             *  Service paths
                             */
                            var servicePath = {
                                getAllList: "at/record/remainnumber/annlea/getAnnLea/{0}",
                                getAllListByCheckState: "at/record/remainnumber/annlea/getAnnLeaByCheckState",
                                getDetails: "at/record/remainnumber/annlea/getDetail",
                                lostFocus: "at/record/remainnumber/annlea/lostFocus",
                                add: "at/record/remainnumber/annlea/add",
                                update: "at/record/remainnumber/annlea/update",
                                deleteLeav: "at/record/remainnumber/annlea/delete",
                            };
                            function getAllList(empId) {
                                return ajax('at', format(servicePath.getAllList, empId));
                            }
                            service.getAllList = getAllList;
                            function getAllListByCheckState(employeeId, checkState) {
                                return ajax('at', servicePath.getAllListByCheckState, employeeId, checkState);
                            }
                            service.getAllListByCheckState = getAllListByCheckState;
                            function lostFocus(grantDate) {
                                return ajax('at', servicePath.lostFocus, moment.utc(grantDate, "YYYY/MM/DD"));
                            }
                            service.lostFocus = lostFocus;
                            function getDetail(id) {
                                return ajax('at', servicePath.getDetails, id);
                            }
                            service.getDetail = getDetail;
                            function add(command) {
                                return ajax('at', servicePath.add, command);
                            }
                            service.add = add;
                            function update(command) {
                                return ajax('at', servicePath.update, command);
                            }
                            service.update = update;
                            function deleteLeav(command) {
                                return ajax('at', servicePath.deleteLeav, command);
                            }
                            service.deleteLeav = deleteLeav;
                            function getItemDef() {
                                var ctgId = "CS00037";
                                return ajax('com', format("ctx/pereg/person/info/ctgItem/findby/ctg-cd/{0}", ctgId));
                            }
                            service.getItemDef = getItemDef;
                        })(service = g.service || (g.service = {}));
                    })(g = cps001.g || (cps001.g = {}));
                })(cps001 = view.cps001 || (view.cps001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps001.g.service.js.map