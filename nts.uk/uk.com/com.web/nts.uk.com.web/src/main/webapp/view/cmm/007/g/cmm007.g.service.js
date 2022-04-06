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
                    var g;
                    (function (g) {
                        var service;
                        (function (service) {
                            /**
                             * define path to service
                             */
                            var path = {
                                findList: "at/shared/workdayoffframe/findAll",
                                save: "at/shared/workdayoffframe/save",
                            };
                            /**
                             *
                             */
                            function findListWorkdayoffFrame() {
                                return nts.uk.request.ajax("at", path.findList);
                            }
                            service.findListWorkdayoffFrame = findListWorkdayoffFrame;
                            /**
                             *
                             */
                            function saveWorkdayoffFrame(data) {
                                return nts.uk.request.ajax("at", path.save, data);
                            }
                            service.saveWorkdayoffFrame = saveWorkdayoffFrame;
                        })(service = g.service || (g.service = {}));
                        /**
                         * Model define.
                         */
                        var model;
                        (function (model) {
                            var WorkdayoffFrameDto = /** @class */ (function () {
                                function WorkdayoffFrameDto(no, name, transName, useAtr) {
                                    this.workdayoffFrNo = no;
                                    this.workdayoffFrName = name;
                                    this.transferFrName = transName;
                                    this.useAtr = useAtr;
                                }
                                return WorkdayoffFrameDto;
                            }());
                            model.WorkdayoffFrameDto = WorkdayoffFrameDto;
                            var WorkdayoffFrameSaveCommand = /** @class */ (function () {
                                function WorkdayoffFrameSaveCommand(data) {
                                    this.listData = data;
                                }
                                return WorkdayoffFrameSaveCommand;
                            }());
                            model.WorkdayoffFrameSaveCommand = WorkdayoffFrameSaveCommand;
                        })(model = g.model || (g.model = {}));
                    })(g = cmm007.g || (cmm007.g = {}));
                })(cmm007 = view.cmm007 || (view.cmm007 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm007.g.service.js.map