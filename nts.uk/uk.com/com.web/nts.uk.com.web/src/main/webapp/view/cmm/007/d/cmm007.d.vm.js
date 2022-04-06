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
                        var PlanYearHdFrameDto = d.model.PlanYearHdFrameDto;
                        var PlanYearHdFrameSaveCommand = d.model.PlanYearHdFrameSaveCommand;
                        var blockUI = nts.uk.ui.block;
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var _self = this;
                                    _self.isCheckedNo1 = ko.observable(true);
                                    _self.planYearHdFrNo1 = ko.observable(PlanYearHdFrameNo.ONE);
                                    _self.planYearHdFrCheckboxLabel1 = nts.uk.resource.getText("CMM007_28");
                                    _self.planYearHdFrName1 = ko.observable("");
                                    _self.enablePlanYearHdFrName1 = ko.observable(true);
                                    _self.requiredPlanYearHdFrName1 = ko.observable(true);
                                    _self.useAtrPlanYearHdFrName1 = ko.observable(USE_CLASSIFICATION.USE);
                                    _self.isCheckedNo1.subscribe(function (value) {
                                        if (value == true) {
                                            _self.enablePlanYearHdFrName1(true);
                                            _self.requiredPlanYearHdFrName1(true);
                                            _self.useAtrPlanYearHdFrName1(USE_CLASSIFICATION.USE);
                                            $('#plan_year_hd_frame1').ntsEditor("validate");
                                        }
                                        else {
                                            _self.enablePlanYearHdFrName1(false);
                                            _self.requiredPlanYearHdFrName1(false);
                                            _self.useAtrPlanYearHdFrName1(USE_CLASSIFICATION.NOT_USE);
                                        }
                                    });
                                    _self.isCheckedNo2 = ko.observable(true);
                                    _self.planYearHdFrNo2 = ko.observable(PlanYearHdFrameNo.TWO);
                                    _self.planYearHdFrCheckboxLabel2 = nts.uk.resource.getText("CMM007_29");
                                    _self.planYearHdFrName2 = ko.observable("");
                                    _self.enablePlanYearHdFrName2 = ko.observable(true);
                                    _self.requiredPlanYearHdFrName2 = ko.observable(true);
                                    _self.useAtrPlanYearHdFrName2 = ko.observable(USE_CLASSIFICATION.USE);
                                    _self.isCheckedNo2.subscribe(function (value) {
                                        if (value == true) {
                                            _self.enablePlanYearHdFrName2(true);
                                            _self.requiredPlanYearHdFrName2(true);
                                            _self.useAtrPlanYearHdFrName2(USE_CLASSIFICATION.USE);
                                            $('#plan_year_hd_frame2').ntsEditor("validate");
                                        }
                                        else {
                                            _self.enablePlanYearHdFrName2(false);
                                            _self.requiredPlanYearHdFrName2(false);
                                            _self.useAtrPlanYearHdFrName2(USE_CLASSIFICATION.NOT_USE);
                                        }
                                    });
                                    _self.isCheckedNo3 = ko.observable(true);
                                    _self.planYearHdFrNo3 = ko.observable(PlanYearHdFrameNo.THREE);
                                    _self.planYearHdFrCheckboxLabel3 = nts.uk.resource.getText("CMM007_30");
                                    _self.planYearHdFrName3 = ko.observable("");
                                    _self.enablePlanYearHdFrName3 = ko.observable(true);
                                    _self.requiredPlanYearHdFrName3 = ko.observable(true);
                                    _self.useAtrPlanYearHdFrName3 = ko.observable(USE_CLASSIFICATION.USE);
                                    _self.isCheckedNo3.subscribe(function (value) {
                                        if (value == true) {
                                            _self.enablePlanYearHdFrName3(true);
                                            _self.requiredPlanYearHdFrName3(true);
                                            _self.useAtrPlanYearHdFrName3(USE_CLASSIFICATION.USE);
                                            $('#plan_year_hd_frame3').ntsEditor("validate");
                                        }
                                        else {
                                            _self.enablePlanYearHdFrName3(false);
                                            _self.requiredPlanYearHdFrName3(false);
                                            _self.useAtrPlanYearHdFrName3(USE_CLASSIFICATION.NOT_USE);
                                        }
                                    });
                                    _self.isCheckedNo4 = ko.observable(true);
                                    _self.planYearHdFrNo4 = ko.observable(PlanYearHdFrameNo.FOUR);
                                    _self.planYearHdFrCheckboxLabel4 = nts.uk.resource.getText("CMM007_31");
                                    _self.planYearHdFrName4 = ko.observable("");
                                    _self.enablePlanYearHdFrName4 = ko.observable(true);
                                    _self.requiredPlanYearHdFrName4 = ko.observable(true);
                                    _self.useAtrPlanYearHdFrName4 = ko.observable(USE_CLASSIFICATION.USE);
                                    _self.isCheckedNo4.subscribe(function (value) {
                                        if (value == true) {
                                            _self.enablePlanYearHdFrName4(true);
                                            _self.requiredPlanYearHdFrName4(true);
                                            _self.useAtrPlanYearHdFrName4(USE_CLASSIFICATION.USE);
                                            $('#plan_year_hd_frame4').ntsEditor("validate");
                                        }
                                        else {
                                            _self.enablePlanYearHdFrName4(false);
                                            _self.requiredPlanYearHdFrName4(false);
                                            _self.useAtrPlanYearHdFrName4(USE_CLASSIFICATION.NOT_USE);
                                        }
                                    });
                                    _self.isCheckedNo5 = ko.observable(true);
                                    _self.planYearHdFrNo5 = ko.observable(PlanYearHdFrameNo.FIVE);
                                    _self.planYearHdFrCheckboxLabel5 = nts.uk.resource.getText("CMM007_32");
                                    _self.planYearHdFrName5 = ko.observable("");
                                    _self.enablePlanYearHdFrName5 = ko.observable(true);
                                    _self.requiredPlanYearHdFrName5 = ko.observable(true);
                                    _self.useAtrPlanYearHdFrName5 = ko.observable(USE_CLASSIFICATION.USE);
                                    _self.isCheckedNo5.subscribe(function (value) {
                                        if (value == true) {
                                            _self.enablePlanYearHdFrName5(true);
                                            _self.requiredPlanYearHdFrName5(true);
                                            _self.useAtrPlanYearHdFrName5(USE_CLASSIFICATION.USE);
                                            $('#plan_year_hd_frame5').ntsEditor("validate");
                                        }
                                        else {
                                            _self.enablePlanYearHdFrName5(false);
                                            _self.requiredPlanYearHdFrName5(false);
                                            _self.useAtrPlanYearHdFrName5(USE_CLASSIFICATION.NOT_USE);
                                        }
                                    });
                                }
                                /**
                                * init default data when start page
                                */
                                ScreenModel.prototype.start_page = function () {
                                    var dfd = $.Deferred();
                                    var _self = this;
                                    d.service.findListPlanYearHdFrame().done(function (data) {
                                        data.forEach(function (e) {
                                            switch (e.planYearHdFrameNo) {
                                                case PlanYearHdFrameNo.ONE:
                                                    _self.planYearHdFrName1(e.planYearHdFrameName);
                                                    e.useAtr == USE_CLASSIFICATION.NOT_USE ? _self.isCheckedNo1(false) : _self.isCheckedNo1(true);
                                                    break;
                                                case PlanYearHdFrameNo.TWO:
                                                    _self.planYearHdFrName2(e.planYearHdFrameName);
                                                    e.useAtr == USE_CLASSIFICATION.NOT_USE ? _self.isCheckedNo2(false) : _self.isCheckedNo2(true);
                                                    break;
                                                case PlanYearHdFrameNo.THREE:
                                                    _self.planYearHdFrName3(e.planYearHdFrameName);
                                                    e.useAtr == USE_CLASSIFICATION.NOT_USE ? _self.isCheckedNo3(false) : _self.isCheckedNo3(true);
                                                    break;
                                                case PlanYearHdFrameNo.FOUR:
                                                    _self.planYearHdFrName4(e.planYearHdFrameName);
                                                    e.useAtr == USE_CLASSIFICATION.NOT_USE ? _self.isCheckedNo4(false) : _self.isCheckedNo4(true);
                                                    break;
                                                case PlanYearHdFrameNo.FIVE:
                                                    _self.planYearHdFrName5(e.planYearHdFrameName);
                                                    e.useAtr == USE_CLASSIFICATION.NOT_USE ? _self.isCheckedNo5(false) : _self.isCheckedNo5(true);
                                                    break;
                                            }
                                        });
                                        dfd.resolve();
                                    });
                                    return dfd.promise();
                                };
                                /**
                                 * Save plan year holiday name setting
                                 */
                                ScreenModel.prototype.savePlanYearHdFrSetting = function () {
                                    var _self = this;
                                    // Validate
                                    if (_self.hasError()) {
                                        return;
                                    }
                                    var dfd = $.Deferred();
                                    blockUI.invisible();
                                    var params = new PlanYearHdFrameSaveCommand(_self.prepareDataToSave());
                                    d.service.savePlanYearHdFrame(params).done(function () {
                                        _self.start_page().done(function () {
                                            nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                                                dfd.resolve();
                                                blockUI.clear();
                                                $('#plan_year_hd_frame1').focus();
                                            });
                                        });
                                    });
                                    return dfd.promise();
                                };
                                /**
                                 * Prepare data for saving.
                                 */
                                ScreenModel.prototype.prepareDataToSave = function () {
                                    var _self = this;
                                    var planYearHdFr1 = new PlanYearHdFrameDto(PlanYearHdFrameNo.ONE, _self.planYearHdFrName1(), _self.useAtrPlanYearHdFrName1());
                                    var planYearHdFr2 = new PlanYearHdFrameDto(PlanYearHdFrameNo.TWO, _self.planYearHdFrName2(), _self.useAtrPlanYearHdFrName2());
                                    var planYearHdFr3 = new PlanYearHdFrameDto(PlanYearHdFrameNo.THREE, _self.planYearHdFrName3(), _self.useAtrPlanYearHdFrName3());
                                    var planYearHdFr4 = new PlanYearHdFrameDto(PlanYearHdFrameNo.FOUR, _self.planYearHdFrName4(), _self.useAtrPlanYearHdFrName4());
                                    var planYearHdFr5 = new PlanYearHdFrameDto(PlanYearHdFrameNo.FIVE, _self.planYearHdFrName5(), _self.useAtrPlanYearHdFrName5());
                                    var data = [planYearHdFr1, planYearHdFr2, planYearHdFr3, planYearHdFr4, planYearHdFr5];
                                    return data;
                                };
                                /**
                                * Check Errors all input.
                                */
                                ScreenModel.prototype.hasError = function () {
                                    var _self = this;
                                    _self.clearErrors();
                                    if (_self.useAtrPlanYearHdFrName1() == USE_CLASSIFICATION.USE) {
                                        $('#plan_year_hd_frame1').ntsEditor("validate");
                                    }
                                    if (_self.useAtrPlanYearHdFrName2() == USE_CLASSIFICATION.USE) {
                                        $('#plan_year_hd_frame2').ntsEditor("validate");
                                    }
                                    if (_self.useAtrPlanYearHdFrName3() == USE_CLASSIFICATION.USE) {
                                        $('#plan_year_hd_frame3').ntsEditor("validate");
                                    }
                                    if (_self.useAtrPlanYearHdFrName4() == USE_CLASSIFICATION.USE) {
                                        $('#plan_year_hd_frame4').ntsEditor("validate");
                                    }
                                    if (_self.useAtrPlanYearHdFrName5() == USE_CLASSIFICATION.USE) {
                                        $('#plan_year_hd_frame5').ntsEditor("validate");
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
                                    // Clear errors
                                    $('#plan_year_hd_frame1').ntsEditor("clear");
                                    $('#plan_year_hd_frame2').ntsEditor("clear");
                                    $('#plan_year_hd_frame3').ntsEditor("clear");
                                    $('#plan_year_hd_frame4').ntsEditor("clear");
                                    $('#plan_year_hd_frame5').ntsEditor("clear");
                                    // Clear error inputs
                                    $('.nts-input').ntsError('clear');
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = d.viewmodel || (d.viewmodel = {}));
                        var USE_CLASSIFICATION;
                        (function (USE_CLASSIFICATION) {
                            USE_CLASSIFICATION.NOT_USE = 0;
                            USE_CLASSIFICATION.USE = 1;
                        })(USE_CLASSIFICATION || (USE_CLASSIFICATION = {}));
                        var PlanYearHdFrameNo;
                        (function (PlanYearHdFrameNo) {
                            PlanYearHdFrameNo.ONE = 1;
                            PlanYearHdFrameNo.TWO = 2;
                            PlanYearHdFrameNo.THREE = 3;
                            PlanYearHdFrameNo.FOUR = 4;
                            PlanYearHdFrameNo.FIVE = 5;
                        })(PlanYearHdFrameNo || (PlanYearHdFrameNo = {}));
                    })(d = cmm007.d || (cmm007.d = {}));
                })(cmm007 = view.cmm007 || (view.cmm007 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm007.d.vm.js.map