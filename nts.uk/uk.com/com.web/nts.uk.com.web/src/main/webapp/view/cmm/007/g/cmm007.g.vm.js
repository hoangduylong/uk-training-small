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
                        var WorkdayoffFrameDto = g.model.WorkdayoffFrameDto;
                        var WorkdayoffFrameSaveCommand = g.model.WorkdayoffFrameSaveCommand;
                        var blockUI = nts.uk.ui.block;
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var _self = this;
                                    _self.isCheckedNo1 = ko.observable(true);
                                    _self.wdoFrNo1 = ko.observable(WorkdayoffFrameNo.ONE);
                                    _self.wdoFrCheckboxLabel1 = nts.uk.resource.getText("CMM007_28");
                                    _self.wdoFrName1 = ko.observable("");
                                    _self.enableWdoFrName1 = ko.observable(true);
                                    _self.requiredWdoFrName1 = ko.observable(true);
                                    _self.useAtrWdoFrName1 = ko.observable(USE_CLASSIFICATION.USE);
                                    _self.transferName1 = ko.observable("");
                                    _self.enabletransferName1 = ko.observable(true);
                                    _self.requiredtransferName1 = ko.observable(true);
                                    _self.isCheckedNo1.subscribe(function (value) {
                                        if (value == true) {
                                            _self.enabletransferName1(true);
                                            _self.requiredtransferName1(true);
                                            _self.enableWdoFrName1(true);
                                            _self.requiredWdoFrName1(true);
                                            _self.useAtrWdoFrName1(USE_CLASSIFICATION.USE);
                                            $('#work_day_off_name1, #work_day_off_trans_name1').ntsEditor("validate");
                                        }
                                        else {
                                            _self.enabletransferName1(false);
                                            _self.requiredtransferName1(false);
                                            _self.enableWdoFrName1(false);
                                            _self.requiredWdoFrName1(false);
                                            _self.useAtrWdoFrName1(USE_CLASSIFICATION.NOT_USE);
                                        }
                                    });
                                    _self.isCheckedNo2 = ko.observable(true);
                                    _self.wdoFrNo2 = ko.observable(WorkdayoffFrameNo.TWO);
                                    _self.wdoFrCheckboxLabel2 = nts.uk.resource.getText("CMM007_29");
                                    _self.wdoFrName2 = ko.observable("");
                                    _self.enableWdoFrName2 = ko.observable(true);
                                    _self.requiredWdoFrName2 = ko.observable(true);
                                    _self.useAtrWdoFrName2 = ko.observable(USE_CLASSIFICATION.USE);
                                    _self.transferName2 = ko.observable("");
                                    _self.enabletransferName2 = ko.observable(true);
                                    _self.requiredtransferName2 = ko.observable(true);
                                    _self.isCheckedNo2.subscribe(function (value) {
                                        if (value == true) {
                                            _self.enabletransferName2(true);
                                            _self.requiredtransferName2(true);
                                            _self.enableWdoFrName2(true);
                                            _self.requiredWdoFrName2(true);
                                            _self.useAtrWdoFrName2(USE_CLASSIFICATION.USE);
                                            $('#work_day_off_name2, #work_day_off_trans_name2').ntsEditor("validate");
                                        }
                                        else {
                                            _self.enabletransferName2(false);
                                            _self.requiredtransferName2(false);
                                            _self.enableWdoFrName2(false);
                                            _self.requiredWdoFrName2(false);
                                            _self.useAtrWdoFrName2(USE_CLASSIFICATION.NOT_USE);
                                        }
                                    });
                                    _self.isCheckedNo3 = ko.observable(true);
                                    _self.wdoFrNo3 = ko.observable(WorkdayoffFrameNo.THREE);
                                    _self.wdoFrCheckboxLabel3 = nts.uk.resource.getText("CMM007_30");
                                    _self.wdoFrName3 = ko.observable("");
                                    _self.enableWdoFrName3 = ko.observable(true);
                                    _self.requiredWdoFrName3 = ko.observable(true);
                                    _self.useAtrWdoFrName3 = ko.observable(USE_CLASSIFICATION.USE);
                                    _self.transferName3 = ko.observable("");
                                    _self.enabletransferName3 = ko.observable(true);
                                    _self.requiredtransferName3 = ko.observable(true);
                                    _self.isCheckedNo3.subscribe(function (value) {
                                        if (value == true) {
                                            _self.enabletransferName3(true);
                                            _self.requiredtransferName3(true);
                                            _self.enableWdoFrName3(true);
                                            _self.requiredWdoFrName3(true);
                                            _self.useAtrWdoFrName3(USE_CLASSIFICATION.USE);
                                            $('#work_day_off_name3, #work_day_off_trans_name3').ntsEditor("validate");
                                        }
                                        else {
                                            _self.enabletransferName3(false);
                                            _self.requiredtransferName3(false);
                                            _self.enableWdoFrName3(false);
                                            _self.requiredWdoFrName3(false);
                                            _self.useAtrWdoFrName3(USE_CLASSIFICATION.NOT_USE);
                                        }
                                    });
                                    _self.isCheckedNo4 = ko.observable(true);
                                    _self.wdoFrNo4 = ko.observable(WorkdayoffFrameNo.FOUR);
                                    _self.wdoFrCheckboxLabel4 = nts.uk.resource.getText("CMM007_31");
                                    _self.wdoFrName4 = ko.observable("");
                                    _self.enableWdoFrName4 = ko.observable(true);
                                    _self.requiredWdoFrName4 = ko.observable(true);
                                    _self.useAtrWdoFrName4 = ko.observable(USE_CLASSIFICATION.USE);
                                    _self.transferName4 = ko.observable("");
                                    _self.enabletransferName4 = ko.observable(true);
                                    _self.requiredtransferName4 = ko.observable(true);
                                    _self.isCheckedNo4.subscribe(function (value) {
                                        if (value == true) {
                                            _self.enabletransferName4(true);
                                            _self.requiredtransferName4(true);
                                            _self.enableWdoFrName4(true);
                                            _self.requiredWdoFrName4(true);
                                            _self.useAtrWdoFrName4(USE_CLASSIFICATION.USE);
                                            $('#work_day_off_name4, #work_day_off_trans_name4').ntsEditor("validate");
                                        }
                                        else {
                                            _self.enabletransferName4(false);
                                            _self.requiredtransferName4(false);
                                            _self.enableWdoFrName4(false);
                                            _self.requiredWdoFrName4(false);
                                            _self.useAtrWdoFrName4(USE_CLASSIFICATION.NOT_USE);
                                        }
                                    });
                                    _self.isCheckedNo5 = ko.observable(true);
                                    _self.wdoFrNo5 = ko.observable(WorkdayoffFrameNo.FIVE);
                                    _self.wdoFrCheckboxLabel5 = nts.uk.resource.getText("CMM007_32");
                                    _self.wdoFrName5 = ko.observable("");
                                    _self.enableWdoFrName5 = ko.observable(true);
                                    _self.requiredWdoFrName5 = ko.observable(true);
                                    _self.useAtrWdoFrName5 = ko.observable(USE_CLASSIFICATION.USE);
                                    _self.transferName5 = ko.observable("");
                                    _self.enabletransferName5 = ko.observable(true);
                                    _self.requiredtransferName5 = ko.observable(true);
                                    _self.isCheckedNo5.subscribe(function (value) {
                                        if (value == true) {
                                            _self.enabletransferName5(true);
                                            _self.requiredtransferName5(true);
                                            _self.enableWdoFrName5(true);
                                            _self.requiredWdoFrName5(true);
                                            _self.useAtrWdoFrName5(USE_CLASSIFICATION.USE);
                                            $('#work_day_off_name5, #work_day_off_trans_name5').ntsEditor("validate");
                                        }
                                        else {
                                            _self.enabletransferName5(false);
                                            _self.requiredtransferName5(false);
                                            _self.enableWdoFrName5(false);
                                            _self.requiredWdoFrName5(false);
                                            _self.useAtrWdoFrName5(USE_CLASSIFICATION.NOT_USE);
                                        }
                                    });
                                    _self.isCheckedNo6 = ko.observable(true);
                                    _self.wdoFrNo6 = ko.observable(WorkdayoffFrameNo.SIX);
                                    _self.wdoFrCheckboxLabel6 = nts.uk.resource.getText("CMM007_33");
                                    _self.wdoFrName6 = ko.observable("");
                                    _self.enableWdoFrName6 = ko.observable(true);
                                    _self.requiredWdoFrName6 = ko.observable(true);
                                    _self.useAtrWdoFrName6 = ko.observable(USE_CLASSIFICATION.USE);
                                    _self.transferName6 = ko.observable("");
                                    _self.enabletransferName6 = ko.observable(true);
                                    _self.requiredtransferName6 = ko.observable(true);
                                    _self.isCheckedNo6.subscribe(function (value) {
                                        if (value == true) {
                                            _self.enabletransferName6(true);
                                            _self.requiredtransferName6(true);
                                            _self.enableWdoFrName6(true);
                                            _self.requiredWdoFrName6(true);
                                            _self.useAtrWdoFrName6(USE_CLASSIFICATION.USE);
                                            $('#work_day_off_name6, #work_day_off_trans_name6').ntsEditor("validate");
                                        }
                                        else {
                                            _self.enabletransferName6(false);
                                            _self.requiredtransferName6(false);
                                            _self.enableWdoFrName6(false);
                                            _self.requiredWdoFrName6(false);
                                            _self.useAtrWdoFrName6(USE_CLASSIFICATION.NOT_USE);
                                        }
                                    });
                                    _self.isCheckedNo7 = ko.observable(true);
                                    _self.wdoFrNo7 = ko.observable(WorkdayoffFrameNo.SIX);
                                    _self.wdoFrCheckboxLabel7 = nts.uk.resource.getText("CMM007_34");
                                    _self.wdoFrName7 = ko.observable("");
                                    _self.enableWdoFrName7 = ko.observable(true);
                                    _self.requiredWdoFrName7 = ko.observable(true);
                                    _self.useAtrWdoFrName7 = ko.observable(USE_CLASSIFICATION.USE);
                                    _self.transferName7 = ko.observable("");
                                    _self.enabletransferName7 = ko.observable(true);
                                    _self.requiredtransferName7 = ko.observable(true);
                                    _self.isCheckedNo7.subscribe(function (value) {
                                        if (value == true) {
                                            _self.enabletransferName7(true);
                                            _self.requiredtransferName7(true);
                                            _self.enableWdoFrName7(true);
                                            _self.requiredWdoFrName7(true);
                                            _self.useAtrWdoFrName7(USE_CLASSIFICATION.USE);
                                            $('#work_day_off_name7, #work_day_off_trans_name7').ntsEditor("validate");
                                        }
                                        else {
                                            _self.enabletransferName7(false);
                                            _self.requiredtransferName7(false);
                                            _self.enableWdoFrName7(false);
                                            _self.requiredWdoFrName7(false);
                                            _self.useAtrWdoFrName7(USE_CLASSIFICATION.NOT_USE);
                                        }
                                    });
                                    _self.isCheckedNo8 = ko.observable(true);
                                    _self.wdoFrNo8 = ko.observable(WorkdayoffFrameNo.SIX);
                                    _self.wdoFrCheckboxLabel8 = nts.uk.resource.getText("CMM007_35");
                                    _self.wdoFrName8 = ko.observable("");
                                    _self.enableWdoFrName8 = ko.observable(true);
                                    _self.requiredWdoFrName8 = ko.observable(true);
                                    _self.useAtrWdoFrName8 = ko.observable(USE_CLASSIFICATION.USE);
                                    _self.transferName8 = ko.observable("");
                                    _self.enabletransferName8 = ko.observable(true);
                                    _self.requiredtransferName8 = ko.observable(true);
                                    _self.isCheckedNo8.subscribe(function (value) {
                                        if (value == true) {
                                            _self.enabletransferName8(true);
                                            _self.requiredtransferName8(true);
                                            _self.enableWdoFrName8(true);
                                            _self.requiredWdoFrName8(true);
                                            _self.useAtrWdoFrName8(USE_CLASSIFICATION.USE);
                                            $('#work_day_off_name8, #work_day_off_trans_name8').ntsEditor("validate");
                                        }
                                        else {
                                            _self.enabletransferName8(false);
                                            _self.requiredtransferName8(false);
                                            _self.enableWdoFrName8(false);
                                            _self.requiredWdoFrName8(false);
                                            _self.useAtrWdoFrName8(USE_CLASSIFICATION.NOT_USE);
                                        }
                                    });
                                    _self.isCheckedNo9 = ko.observable(true);
                                    _self.wdoFrNo9 = ko.observable(WorkdayoffFrameNo.SIX);
                                    _self.wdoFrCheckboxLabel9 = nts.uk.resource.getText("CMM007_36");
                                    _self.wdoFrName9 = ko.observable("");
                                    _self.enableWdoFrName9 = ko.observable(true);
                                    _self.requiredWdoFrName9 = ko.observable(true);
                                    _self.useAtrWdoFrName9 = ko.observable(USE_CLASSIFICATION.USE);
                                    _self.transferName9 = ko.observable("");
                                    _self.enabletransferName9 = ko.observable(true);
                                    _self.requiredtransferName9 = ko.observable(true);
                                    _self.isCheckedNo9.subscribe(function (value) {
                                        if (value == true) {
                                            _self.enabletransferName9(true);
                                            _self.requiredtransferName9(true);
                                            _self.enableWdoFrName9(true);
                                            _self.requiredWdoFrName9(true);
                                            _self.useAtrWdoFrName9(USE_CLASSIFICATION.USE);
                                            $('#work_day_off_name9, #work_day_off_trans_name9').ntsEditor("validate");
                                        }
                                        else {
                                            _self.enabletransferName9(false);
                                            _self.requiredtransferName9(false);
                                            _self.enableWdoFrName9(false);
                                            _self.requiredWdoFrName9(false);
                                            _self.useAtrWdoFrName9(USE_CLASSIFICATION.NOT_USE);
                                        }
                                    });
                                    _self.isCheckedNo10 = ko.observable(true);
                                    _self.wdoFrNo10 = ko.observable(WorkdayoffFrameNo.SIX);
                                    _self.wdoFrCheckboxLabel10 = nts.uk.resource.getText("CMM007_37");
                                    _self.wdoFrName10 = ko.observable("");
                                    _self.enableWdoFrName10 = ko.observable(true);
                                    _self.requiredWdoFrName10 = ko.observable(true);
                                    _self.useAtrWdoFrName10 = ko.observable(USE_CLASSIFICATION.USE);
                                    _self.transferName10 = ko.observable("");
                                    _self.enabletransferName10 = ko.observable(true);
                                    _self.requiredtransferName10 = ko.observable(true);
                                    _self.isCheckedNo10.subscribe(function (value) {
                                        if (value == true) {
                                            _self.enabletransferName10(true);
                                            _self.requiredtransferName10(true);
                                            _self.enableWdoFrName10(true);
                                            _self.requiredWdoFrName10(true);
                                            _self.useAtrWdoFrName10(USE_CLASSIFICATION.USE);
                                            $('#work_day_off_name10, #work_day_off_trans_name10').ntsEditor("validate");
                                        }
                                        else {
                                            _self.enabletransferName10(false);
                                            _self.requiredtransferName10(false);
                                            _self.enableWdoFrName10(false);
                                            _self.requiredWdoFrName10(false);
                                            _self.useAtrWdoFrName10(USE_CLASSIFICATION.NOT_USE);
                                        }
                                    });
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
                                    g.service.findListWorkdayoffFrame().done(function (data) {
                                        data.forEach(function (e) {
                                            switch (e.workdayoffFrNo) {
                                                case WorkdayoffFrameNo.ONE:
                                                    _self.wdoFrName1(e.workdayoffFrName);
                                                    _self.transferName1(e.transferFrName);
                                                    e.useAtr == USE_CLASSIFICATION.NOT_USE ? _self.isCheckedNo1(false) : _self.isCheckedNo1(true);
                                                    break;
                                                case WorkdayoffFrameNo.TWO:
                                                    _self.wdoFrName2(e.workdayoffFrName);
                                                    _self.transferName2(e.transferFrName);
                                                    e.useAtr == USE_CLASSIFICATION.NOT_USE ? _self.isCheckedNo2(false) : _self.isCheckedNo2(true);
                                                    break;
                                                case WorkdayoffFrameNo.THREE:
                                                    _self.wdoFrName3(e.workdayoffFrName);
                                                    _self.transferName3(e.transferFrName);
                                                    e.useAtr == USE_CLASSIFICATION.NOT_USE ? _self.isCheckedNo3(false) : _self.isCheckedNo3(true);
                                                    break;
                                                case WorkdayoffFrameNo.FOUR:
                                                    _self.wdoFrName4(e.workdayoffFrName);
                                                    _self.transferName4(e.transferFrName);
                                                    e.useAtr == USE_CLASSIFICATION.NOT_USE ? _self.isCheckedNo4(false) : _self.isCheckedNo4(true);
                                                    break;
                                                case WorkdayoffFrameNo.FIVE:
                                                    _self.wdoFrName5(e.workdayoffFrName);
                                                    _self.transferName5(e.transferFrName);
                                                    e.useAtr == USE_CLASSIFICATION.NOT_USE ? _self.isCheckedNo5(false) : _self.isCheckedNo5(true);
                                                    break;
                                                case WorkdayoffFrameNo.SIX:
                                                    _self.wdoFrName6(e.workdayoffFrName);
                                                    _self.transferName6(e.transferFrName);
                                                    e.useAtr == USE_CLASSIFICATION.NOT_USE ? _self.isCheckedNo6(false) : _self.isCheckedNo6(true);
                                                    break;
                                                case WorkdayoffFrameNo.SEVEN:
                                                    _self.wdoFrName7(e.workdayoffFrName);
                                                    _self.transferName7(e.transferFrName);
                                                    e.useAtr == USE_CLASSIFICATION.NOT_USE ? _self.isCheckedNo7(false) : _self.isCheckedNo7(true);
                                                    break;
                                                case WorkdayoffFrameNo.EIGHT:
                                                    _self.wdoFrName8(e.workdayoffFrName);
                                                    _self.transferName8(e.transferFrName);
                                                    e.useAtr == USE_CLASSIFICATION.NOT_USE ? _self.isCheckedNo8(false) : _self.isCheckedNo8(true);
                                                    break;
                                                case WorkdayoffFrameNo.NINE:
                                                    _self.wdoFrName9(e.workdayoffFrName);
                                                    _self.transferName9(e.transferFrName);
                                                    e.useAtr == USE_CLASSIFICATION.NOT_USE ? _self.isCheckedNo9(false) : _self.isCheckedNo9(true);
                                                    break;
                                                case WorkdayoffFrameNo.TEN:
                                                    _self.wdoFrName10(e.workdayoffFrName);
                                                    _self.transferName10(e.transferFrName);
                                                    e.useAtr == USE_CLASSIFICATION.NOT_USE ? _self.isCheckedNo10(false) : _self.isCheckedNo10(true);
                                                    break;
                                            }
                                        });
                                        dfd.resolve();
                                    });
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                /**
                                 * Save work day off frame setting
                                 */
                                ScreenModel.prototype.saveWorkdayoffFrSetting = function () {
                                    var _self = this;
                                    var dfd = $.Deferred();
                                    // Validate
                                    if (_self.hasError()) {
                                        return;
                                    }
                                    var dfd = $.Deferred();
                                    blockUI.invisible();
                                    var params = new WorkdayoffFrameSaveCommand(_self.prepareDataToSave());
                                    nts.uk.ui.block.grayout();
                                    g.service.saveWorkdayoffFrame(params).done(function () {
                                        _self.start_page().done(function () {
                                            nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                                                dfd.resolve();
                                                blockUI.clear();
                                                $('#work_day_off_name1').focus();
                                            });
                                        });
                                    }).always(function () {
                                        nts.uk.ui.block.clear();
                                    });
                                    return dfd.promise();
                                };
                                /**
                                * Prepare data for saving.
                                */
                                ScreenModel.prototype.prepareDataToSave = function () {
                                    var _self = this;
                                    var wdoHdFr1 = new WorkdayoffFrameDto(WorkdayoffFrameNo.ONE, _self.wdoFrName1(), _self.transferName1(), _self.useAtrWdoFrName1());
                                    var wdoHdFr2 = new WorkdayoffFrameDto(WorkdayoffFrameNo.TWO, _self.wdoFrName2(), _self.transferName2(), _self.useAtrWdoFrName2());
                                    var wdoHdFr3 = new WorkdayoffFrameDto(WorkdayoffFrameNo.THREE, _self.wdoFrName3(), _self.transferName3(), _self.useAtrWdoFrName3());
                                    var wdoHdFr4 = new WorkdayoffFrameDto(WorkdayoffFrameNo.FOUR, _self.wdoFrName4(), _self.transferName4(), _self.useAtrWdoFrName4());
                                    var wdoHdFr5 = new WorkdayoffFrameDto(WorkdayoffFrameNo.FIVE, _self.wdoFrName5(), _self.transferName5(), _self.useAtrWdoFrName5());
                                    var wdoHdFr6 = new WorkdayoffFrameDto(WorkdayoffFrameNo.SIX, _self.wdoFrName6(), _self.transferName6(), _self.useAtrWdoFrName6());
                                    var wdoHdFr7 = new WorkdayoffFrameDto(WorkdayoffFrameNo.SEVEN, _self.wdoFrName7(), _self.transferName7(), _self.useAtrWdoFrName7());
                                    var wdoHdFr8 = new WorkdayoffFrameDto(WorkdayoffFrameNo.EIGHT, _self.wdoFrName8(), _self.transferName8(), _self.useAtrWdoFrName8());
                                    var wdoHdFr9 = new WorkdayoffFrameDto(WorkdayoffFrameNo.NINE, _self.wdoFrName9(), _self.transferName9(), _self.useAtrWdoFrName9());
                                    var wdoHdFr10 = new WorkdayoffFrameDto(WorkdayoffFrameNo.TEN, _self.wdoFrName10(), _self.transferName10(), _self.useAtrWdoFrName10());
                                    var data = [wdoHdFr1, wdoHdFr2, wdoHdFr3, wdoHdFr4, wdoHdFr5,
                                        wdoHdFr6, wdoHdFr7, wdoHdFr8, wdoHdFr9, wdoHdFr10];
                                    return data;
                                };
                                /**
                                 * Check Errors all input.
                                 */
                                ScreenModel.prototype.hasError = function () {
                                    var _self = this;
                                    _self.clearErrors();
                                    if (_self.useAtrWdoFrName1() == USE_CLASSIFICATION.USE) {
                                        $('#work_day_off_name1').ntsEditor("validate");
                                        $('#work_day_off_trans_name1').ntsEditor("validate");
                                    }
                                    if (_self.useAtrWdoFrName2() == USE_CLASSIFICATION.USE) {
                                        $('#work_day_off_name2').ntsEditor("validate");
                                        $('#work_day_off_trans_name2').ntsEditor("validate");
                                    }
                                    if (_self.useAtrWdoFrName3() == USE_CLASSIFICATION.USE) {
                                        $('#work_day_off_name3').ntsEditor("validate");
                                        $('#work_day_off_trans_name3').ntsEditor("validate");
                                    }
                                    if (_self.useAtrWdoFrName4() == USE_CLASSIFICATION.USE) {
                                        $('#work_day_off_name4').ntsEditor("validate");
                                        $('#work_day_off_trans_name4').ntsEditor("validate");
                                    }
                                    if (_self.useAtrWdoFrName5() == USE_CLASSIFICATION.USE) {
                                        $('#work_day_off_name5').ntsEditor("validate");
                                        $('#work_day_off_trans_name5').ntsEditor("validate");
                                    }
                                    if (_self.useAtrWdoFrName6() == USE_CLASSIFICATION.USE) {
                                        $('#work_day_off_name6').ntsEditor("validate");
                                        $('#work_day_off_trans_name6').ntsEditor("validate");
                                    }
                                    if (_self.useAtrWdoFrName7() == USE_CLASSIFICATION.USE) {
                                        $('#work_day_off_name7').ntsEditor("validate");
                                        $('#work_day_off_trans_name7').ntsEditor("validate");
                                    }
                                    if (_self.useAtrWdoFrName8() == USE_CLASSIFICATION.USE) {
                                        $('#work_day_off_name8').ntsEditor("validate");
                                        $('#work_day_off_trans_name8').ntsEditor("validate");
                                    }
                                    if (_self.useAtrWdoFrName9() == USE_CLASSIFICATION.USE) {
                                        $('#work_day_off_name9').ntsEditor("validate");
                                        $('#work_day_off_trans_name9').ntsEditor("validate");
                                    }
                                    if (_self.useAtrWdoFrName10() == USE_CLASSIFICATION.USE) {
                                        $('#work_day_off_name10').ntsEditor("validate");
                                        $('#work_day_off_trans_name10').ntsEditor("validate");
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
                                    $('#work_day_off_name1').ntsEditor("clear");
                                    $('#work_day_off_name2').ntsEditor("clear");
                                    $('#work_day_off_name3').ntsEditor("clear");
                                    $('#work_day_off_name4').ntsEditor("clear");
                                    $('#work_day_off_name5').ntsEditor("clear");
                                    $('#work_day_off_name6').ntsEditor("clear");
                                    $('#work_day_off_name7').ntsEditor("clear");
                                    $('#work_day_off_name8').ntsEditor("clear");
                                    $('#work_day_off_name9').ntsEditor("clear");
                                    $('#work_day_off_name10').ntsEditor("clear");
                                    $('#work_day_off_trans_name1').ntsEditor("clear");
                                    $('#work_day_off_trans_name2').ntsEditor("clear");
                                    $('#work_day_off_trans_name3').ntsEditor("clear");
                                    $('#work_day_off_trans_name4').ntsEditor("clear");
                                    $('#work_day_off_trans_name5').ntsEditor("clear");
                                    $('#work_day_off_trans_name6').ntsEditor("clear");
                                    $('#work_day_off_trans_name7').ntsEditor("clear");
                                    $('#work_day_off_trans_name8').ntsEditor("clear");
                                    $('#work_day_off_trans_name9').ntsEditor("clear");
                                    $('#work_day_off_trans_name10').ntsEditor("clear");
                                    // Clear error inputs
                                    $('.nts-input').ntsError('clear');
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = g.viewmodel || (g.viewmodel = {}));
                        var USE_CLASSIFICATION;
                        (function (USE_CLASSIFICATION) {
                            USE_CLASSIFICATION.NOT_USE = 0;
                            USE_CLASSIFICATION.USE = 1;
                        })(USE_CLASSIFICATION || (USE_CLASSIFICATION = {}));
                        var WorkdayoffFrameNo;
                        (function (WorkdayoffFrameNo) {
                            WorkdayoffFrameNo.ONE = 1;
                            WorkdayoffFrameNo.TWO = 2;
                            WorkdayoffFrameNo.THREE = 3;
                            WorkdayoffFrameNo.FOUR = 4;
                            WorkdayoffFrameNo.FIVE = 5;
                            WorkdayoffFrameNo.SIX = 6;
                            WorkdayoffFrameNo.SEVEN = 7;
                            WorkdayoffFrameNo.EIGHT = 8;
                            WorkdayoffFrameNo.NINE = 9;
                            WorkdayoffFrameNo.TEN = 10;
                        })(WorkdayoffFrameNo || (WorkdayoffFrameNo = {}));
                    })(g = cmm007.g || (cmm007.g = {}));
                })(cmm007 = view.cmm007 || (view.cmm007 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm007.g.vm.js.map