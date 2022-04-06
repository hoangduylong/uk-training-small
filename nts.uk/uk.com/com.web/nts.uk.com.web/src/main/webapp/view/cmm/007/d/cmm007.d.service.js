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
                    var d;
                    (function (d) {
                        var service;
                        (function (service) {
                            /**
                             * define path to service
                             */
                            var path = {
                                findList: "at/schedule/planyearhdframe/findAll",
                                save: "at/schedule/planyearhdframe/save",
                            };
                            /**
                             *
                             */
                            function findListPlanYearHdFrame() {
                                return nts.uk.request.ajax("at", path.findList);
                            }
                            service.findListPlanYearHdFrame = findListPlanYearHdFrame;
                            /**
                             *
                             */
                            function savePlanYearHdFrame(data) {
                                return nts.uk.request.ajax("at", path.save, data);
                            }
                            service.savePlanYearHdFrame = savePlanYearHdFrame;
                        })(service = d.service || (d.service = {}));
                        /**
                         * Model define.
                         */
                        var model;
                        (function (model) {
                            var PlanYearHdFrameDto = /** @class */ (function () {
                                function PlanYearHdFrameDto(no, name, useAtr) {
                                    this.planYearHdFrameNo = no;
                                    this.planYearHdFrameName = name;
                                    this.useAtr = useAtr;
                                }
                                return PlanYearHdFrameDto;
                            }());
                            model.PlanYearHdFrameDto = PlanYearHdFrameDto;
                            var PlanYearHdFrameSaveCommand = /** @class */ (function () {
                                function PlanYearHdFrameSaveCommand(data) {
                                    this.listData = data;
                                }
                                return PlanYearHdFrameSaveCommand;
                            }());
                            model.PlanYearHdFrameSaveCommand = PlanYearHdFrameSaveCommand;
                        })(model = d.model || (d.model = {}));
                    })(d = cmm007.d || (cmm007.d = {}));
                })(cmm007 = view.cmm007 || (view.cmm007 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm007.d.service.js.map