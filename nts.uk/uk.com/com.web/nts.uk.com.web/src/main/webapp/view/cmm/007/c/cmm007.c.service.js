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
                    var c;
                    (function (c) {
                        var service;
                        (function (service) {
                            /**
                             * define path to service
                             */
                            var path = {
                                getTempAbsenceFrameByCId: "bs/employee/temporaryabsence/frame/findTempAbsenceFrameByCId",
                                getTempAbsenceFrameByCIdAndFrameNo: "bs/employee/temporaryabsence/frame/findTempAbsenceFrameByCIdAndFrameNo",
                                updateTempAbsenceFrame: "bs/employee/temporaryabsence/frame/updateTempAbsenceFrameByCidAndFrameNo"
                            };
                            function getTempAbsenceFrameByCId() {
                                return nts.uk.request.ajax(path.getTempAbsenceFrameByCId);
                            }
                            service.getTempAbsenceFrameByCId = getTempAbsenceFrameByCId;
                            function getTempAbsenceFrameByCIdAndFrameNo() {
                                return nts.uk.request.ajax(path.getTempAbsenceFrameByCIdAndFrameNo);
                            }
                            service.getTempAbsenceFrameByCIdAndFrameNo = getTempAbsenceFrameByCIdAndFrameNo;
                            function updateTempAbsenceFrame(lstDto) {
                                var dto = {};
                                dto.dto = ko.toJS(lstDto);
                                return nts.uk.request.ajax(path.updateTempAbsenceFrame, dto);
                            }
                            service.updateTempAbsenceFrame = updateTempAbsenceFrame;
                        })(service = c.service || (c.service = {}));
                        /**
                         * Model define.
                         */
                        var model;
                        (function (model) {
                            var TempAbsenceFrameDto = /** @class */ (function () {
                                function TempAbsenceFrameDto(companyId, tempAbsenceFrNo, useClassification, tempAbsenceFrName) {
                                    this.companyId = companyId;
                                    this.tempAbsenceFrNo = tempAbsenceFrNo;
                                    this.useClassification = useClassification;
                                    this.tempAbsenceFrName = tempAbsenceFrName;
                                }
                                return TempAbsenceFrameDto;
                            }());
                            model.TempAbsenceFrameDto = TempAbsenceFrameDto;
                        })(model = c.model || (c.model = {}));
                    })(c = cmm007.c || (cmm007.c = {}));
                })(cmm007 = view.cmm007 || (view.cmm007 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm007.c.service.js.map