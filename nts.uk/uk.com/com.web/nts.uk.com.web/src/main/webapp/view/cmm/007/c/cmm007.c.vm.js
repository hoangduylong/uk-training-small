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
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var _self = this;
                                    _self.mapModel = new Map();
                                    _self.checkStatusSetOptions = ko.observableArray([
                                        { code: true, name: nts.uk.resource.getText("CMM007_101") },
                                        { code: false, name: nts.uk.resource.getText("CMM007_102") }
                                    ]);
                                }
                                /**
                                * init default data when start page
                                */
                                ScreenModel.prototype.start_page = function () {
                                    var dfd = $.Deferred();
                                    var _self = this;
                                    _self.getDataByCId().done(function () {
                                        dfd.resolve();
                                    });
                                    return dfd.promise();
                                };
                                /*
                                *   find all
                                */
                                ScreenModel.prototype.getDataByCId = function () {
                                    var _self = this;
                                    var dfd = $.Deferred();
                                    c.service.getTempAbsenceFrameByCId().done(function (data) {
                                        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                                            var i_1 = data_1[_i];
                                            if (typeof _self.mapModel.get(i_1.tempAbsenceFrNo) === "undefined") {
                                                var temp = new viewmodel.moduleDto(i_1.companyId, i_1.tempAbsenceFrNo, i_1.useClassification, i_1.tempAbsenceFrName);
                                                _self.mapModel.set(i_1.tempAbsenceFrNo, temp);
                                            }
                                            else {
                                                //set value 休職 == 使用する
                                                if (i_1.tempAbsenceFrNo == 1) {
                                                    _self.mapModel.get(i_1.tempAbsenceFrNo).useClassification(1);
                                                }
                                                else {
                                                    _self.mapModel.get(i_1.tempAbsenceFrNo).tempAbsenceFrName(i_1.tempAbsenceFrName);
                                                    _self.mapModel.get(i_1.tempAbsenceFrNo).useClassification(i_1.useClassification);
                                                }
                                            }
                                        }
                                        dfd.resolve();
                                    }).fail(function (data) {
                                        //                    console.log(data);
                                    });
                                    return dfd.promise();
                                };
                                /*
                                *   status check/uncheck checkbox
                                */
                                ScreenModel.prototype.checkStatusEnable = function (value) {
                                    var _self = this;
                                    return ko.computed(function () { return _self.mapModel.get(value).useClassification() == USE_CLASSIFICATION.USE; });
                                };
                                /*
                                *   catch event click check box
                                */
                                ScreenModel.prototype.clickCheckbox = function (value) {
                                    var _self = this;
                                    _self.mapModel.get(value).useClassification() == USE_CLASSIFICATION.USE ? _self.mapModel.get(value).useClassification(0) : _self.mapModel.get(value).useClassification(1);
                                    if (_self.mapModel.get(value).useClassification() == USE_CLASSIFICATION.USE) {
                                        $('#tempAbsenceNo' + value).ntsEditor("validate");
                                    }
                                    else {
                                        $('#tempAbsenceNo' + value).ntsEditor("clear");
                                    }
                                };
                                /**
                                 * update data
                                 */
                                ScreenModel.prototype.update = function () {
                                    var _self = this;
                                    if (_self.hasError()) {
                                        return true;
                                    }
                                    var lstDto = new Array();
                                    for (var i_2 = 1; i_2 <= _self.mapModel.size; i_2++) {
                                        lstDto.push(_self.mapModel.get(i_2));
                                    }
                                    nts.uk.ui.block.grayout();
                                    c.service.updateTempAbsenceFrame(lstDto).done(function (data) {
                                        _self.getDataByCId().done(function () {
                                        });
                                        nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                                            $('#tempAbsenceNo7').focus();
                                        });
                                    }).fail(function (data) {
                                        //                    console.log(data);
                                    }).always(function () {
                                        nts.uk.ui.block.clear();
                                    });
                                };
                                /**
                                * Check Errors all input.
                                */
                                ScreenModel.prototype.hasError = function () {
                                    var _self = this;
                                    _self.clearErrors();
                                    for (var i = 7; i <= 10; i++) {
                                        if (_self.mapModel.get(i).useClassification() == USE_CLASSIFICATION.USE) {
                                            $('#tempAbsenceNo' + i).ntsEditor("validate");
                                        }
                                    }
                                    if ($('.nts-input').ntsError('hasError')) {
                                        return true;
                                    }
                                    return false;
                                };
                                /**
                                 * Clear Errors
                                 */
                                ScreenModel.prototype.clearErrors = function () {
                                    var _self = this;
                                    // Clear errors
                                    for (var i = 7; i <= 10; i++) {
                                        if (_self.mapModel.get(i).useClassification() == USE_CLASSIFICATION.USE) {
                                            $('#tempAbsenceNo' + i).ntsEditor("clear");
                                        }
                                    }
                                    // Clear error inputs
                                    $('.nts-input').ntsError('clear');
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var moduleDto = /** @class */ (function () {
                                function moduleDto(companyId, tempAbsenceFrNo, useClassification, tempAbsenceFrName) {
                                    var _self = this;
                                    _self.companyId = ko.observable(companyId);
                                    _self.tempAbsenceFrNo = ko.observable(tempAbsenceFrNo);
                                    _self.useClassification = ko.observable(useClassification);
                                    _self.tempAbsenceFrName = ko.observable(tempAbsenceFrName);
                                }
                                return moduleDto;
                            }());
                            viewmodel.moduleDto = moduleDto;
                        })(viewmodel = c.viewmodel || (c.viewmodel = {}));
                        var USE_CLASSIFICATION;
                        (function (USE_CLASSIFICATION) {
                            USE_CLASSIFICATION.NOT_USE = 0;
                            USE_CLASSIFICATION.USE = 1;
                        })(USE_CLASSIFICATION || (USE_CLASSIFICATION = {}));
                    })(c = cmm007.c || (cmm007.c = {}));
                })(cmm007 = view.cmm007 || (view.cmm007 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm007.c.vm.js.map