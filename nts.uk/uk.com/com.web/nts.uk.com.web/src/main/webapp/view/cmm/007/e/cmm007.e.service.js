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
                    var e;
                    (function (e) {
                        var service;
                        (function (service) {
                            /**
                             * define path to service
                             */
                            var path = {
                                findList: "at/shared/overtimeworkframe/findAll",
                                save: "at/shared/overtimeworkframe/save",
                            };
                            /**
                             *
                             */
                            function findListOvertimeWorkFrame() {
                                return nts.uk.request.ajax("at", path.findList);
                            }
                            service.findListOvertimeWorkFrame = findListOvertimeWorkFrame;
                            /**
                             *
                             */
                            function saveOvertimeWorkFrame(data) {
                                var listData = {};
                                listData.listData = ko.toJS(data);
                                return nts.uk.request.ajax("at", path.save, listData);
                            }
                            service.saveOvertimeWorkFrame = saveOvertimeWorkFrame;
                        })(service = e.service || (e.service = {}));
                        /**
                         * Model define.
                         */
                        var model;
                        (function (model) {
                            var OvertimeWorkFrameDto = /** @class */ (function () {
                                function OvertimeWorkFrameDto(no, name, transName, useAtr) {
                                    var _self = this;
                                    _self.overtimeWorkFrNo = ko.observable(no);
                                    _self.overtimeWorkFrName = ko.observable(name);
                                    _self.transferFrName = ko.observable(transName);
                                    _self.useAtr = ko.observable(useAtr);
                                }
                                return OvertimeWorkFrameDto;
                            }());
                            model.OvertimeWorkFrameDto = OvertimeWorkFrameDto;
                            var OvertimeWorkFrameSaveCommand = /** @class */ (function () {
                                function OvertimeWorkFrameSaveCommand(data) {
                                    this.listData = data;
                                }
                                return OvertimeWorkFrameSaveCommand;
                            }());
                            model.OvertimeWorkFrameSaveCommand = OvertimeWorkFrameSaveCommand;
                        })(model = e.model || (e.model = {}));
                    })(e = cmm007.e || (cmm007.e = {}));
                })(cmm007 = view.cmm007 || (view.cmm007 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm007.e.service.js.map