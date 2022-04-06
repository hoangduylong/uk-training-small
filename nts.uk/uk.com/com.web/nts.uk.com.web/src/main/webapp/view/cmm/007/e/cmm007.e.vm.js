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
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var _self = this;
                                    _self.mapObj = new Map();
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
                                    _self.findAll().done(function () {
                                        dfd.resolve();
                                    });
                                    return dfd.promise();
                                };
                                /**
                                 * Save overtime work frame setting
                                 */
                                ScreenModel.prototype.saveOvertimeWorkFrSetting = function () {
                                    var _self = this;
                                    if (_self.hasError()) {
                                        return true;
                                    }
                                    var dfd = $.Deferred();
                                    var arrDto = new Array();
                                    _self.mapObj.forEach(function (value, key) {
                                        arrDto.push(value);
                                    });
                                    nts.uk.ui.block.grayout();
                                    e.service.saveOvertimeWorkFrame(arrDto).done(function () {
                                        _self.findAll().done(function () {
                                        });
                                        nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                                            $('#overtime_work_name1').focus();
                                        });
                                        dfd.resolve();
                                    }).fail(function () {
                                        //                    console.log("fail");
                                    }).always(function () {
                                        nts.uk.ui.block.clear();
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.findAll = function () {
                                    var _self = this;
                                    var dfd = $.Deferred();
                                    e.service.findListOvertimeWorkFrame().done(function (data) {
                                        var objTemp;
                                        _.forEach(data, function (value) {
                                            if (typeof _self.mapObj.get(value.overtimeWorkFrNo) === "undefined") {
                                                objTemp = new e.model.OvertimeWorkFrameDto(value.overtimeWorkFrNo, value.overtimeWorkFrName, value.transferFrName, value.useAtr);
                                                _self.mapObj.set(value.overtimeWorkFrNo, objTemp);
                                            }
                                            else {
                                                _self.mapObj.get(value.overtimeWorkFrNo).overtimeWorkFrName(value.overtimeWorkFrName);
                                                _self.mapObj.get(value.overtimeWorkFrNo).transferFrName(value.transferFrName);
                                                _self.mapObj.get(value.overtimeWorkFrNo).useAtr(value.useAtr);
                                            }
                                        });
                                        dfd.resolve();
                                    }).fail(function (data) {
                                        //                    console.log(data);
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.checkStatusEnable = function (value) {
                                    var _self = this;
                                    return ko.computed(function () { return _self.mapObj.get(value).useAtr() == USE_CLASSIFICATION.USE; });
                                };
                                ScreenModel.prototype.myFunction = function (value) {
                                    var _self = this;
                                    _self.mapObj.get(value).useAtr() == USE_CLASSIFICATION.USE ? _self.mapObj.get(value).useAtr(0) : _self.mapObj.get(value).useAtr(1);
                                    if (_self.mapObj.get(value).useAtr() == USE_CLASSIFICATION.USE) {
                                        $('#overtime_work_name' + value).ntsEditor("validate");
                                        $('#tranfer_work_name' + value).ntsEditor("validate");
                                    }
                                    else {
                                        $('#overtime_work_name' + value).ntsEditor("clear");
                                        $('#tranfer_work_name' + value).ntsEditor("clear");
                                    }
                                };
                                /**
                                * Check Errors all input.
                                */
                                ScreenModel.prototype.hasError = function () {
                                    var _self = this;
                                    _self.clearErrors();
                                    for (var i_1 = 1; i_1 <= 10; i_1++) {
                                        if (_self.mapObj.get(i_1).useAtr() == USE_CLASSIFICATION.USE) {
                                            $('#overtime_work_name' + i_1).ntsEditor("validate");
                                            $('#tranfer_work_name' + i_1).ntsEditor("validate");
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
                                    for (var i_2 = 1; i_2 <= 10; i_2++) {
                                        if (_self.mapObj.get(i_2).useAtr() == USE_CLASSIFICATION.USE) {
                                            $('#overtime_work_name' + i_2).ntsEditor("clear");
                                            $('#tranfer_work_name' + i_2).ntsEditor("clear");
                                        }
                                    }
                                    // Clear error inputs
                                    $('.nts-input').ntsError('clear');
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = e.viewmodel || (e.viewmodel = {}));
                        var USE_CLASSIFICATION;
                        (function (USE_CLASSIFICATION) {
                            USE_CLASSIFICATION.NOT_USE = 0;
                            USE_CLASSIFICATION.USE = 1;
                        })(USE_CLASSIFICATION || (USE_CLASSIFICATION = {}));
                    })(e = cmm007.e || (cmm007.e = {}));
                })(cmm007 = view.cmm007 || (view.cmm007 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm007.e.vm.js.map