var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf005;
                (function (cmf005) {
                    var f;
                    (function (f) {
                        var viewmodel;
                        (function (viewmodel) {
                            var close = nts.uk.ui.windows.close;
                            var model = cmf005.share.model;
                            var getText = nts.uk.resource.getText;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    var params = nts.uk.ui.windows.getShared("CMF005_E_PARAMS");
                                    self.delId = ko.observable("");
                                    self.timeStart = new Date();
                                    self.timeOver = ko.observable('00:00:00');
                                    self.dataManagementDel = ko.observable({});
                                    self.modal = params.modal;
                                    self.delId(params.delId);
                                    //F3
                                    self.deleteSetName = params.deleteSetName;
                                    if (params.saveBeforDelete == model.SAVE_BEFOR_DELETE_ATR.YES) {
                                        self.saveBeforDelete = getText('CMF005_35');
                                    }
                                    else if (params.saveBeforDelete == model.SAVE_BEFOR_DELETE_ATR.NO) {
                                        self.saveBeforDelete = getText('CMF005_36');
                                    }
                                    if (params.dateValue.startDate) {
                                        self.dateStartValue = moment.utc(params.dateValue.startDate, 'YYYY/MM/DD').format("YYYY/MM/DD");
                                    }
                                    else {
                                        self.dateStartValue = '';
                                    }
                                    if (params.dateValue.endDate) {
                                        self.dateEndValue = moment.utc(params.dateValue.endDate, 'YYYY/MM/DD').format("YYYY/MM/DD");
                                    }
                                    else {
                                        self.dateEndValue = '';
                                    }
                                    if (params.monthValue.startDate) {
                                        self.monthStartValue = moment.utc(params.monthValue.startDate, 'YYYY/MM/DD').format("YYYY/MM");
                                    }
                                    else {
                                        self.monthStartValue = '';
                                    }
                                    if (params.monthValue.endDate) {
                                        self.monthEndValue = moment.utc(params.monthValue.endDate, 'YYYY/MM/DD').format("YYYY/MM");
                                    }
                                    else {
                                        self.monthEndValue = '';
                                    }
                                    if (params.yearValue.startDate) {
                                        self.yearStartValue = moment.utc(params.yearValue.startDate, 'YYYY/MM/DD').format("YYYY");
                                    }
                                    else {
                                        self.yearStartValue = '';
                                    }
                                    if (params.yearValue.endDate) {
                                        self.yearEndValue = moment.utc(params.yearValue.endDate, 'YYYY/MM/DD').format("YYYY");
                                    }
                                    else {
                                        self.yearEndValue = '';
                                    }
                                    // init F2_2_2, F2_2_3,F2_2_4
                                    self.status = ko.observable('');
                                    self.categoryCount = ko.observable(0);
                                    self.categoryTotalCount = ko.observable(0);
                                    self.categoryPercentProcess = ko.observable("0/0");
                                    self.errorCount = ko.observable("0件");
                                    self.dialogMode = ko.observable("deleting");
                                    $("#F10_1").focus();
                                    self.enableDate = ko.observable(true);
                                    self.enableMonth = ko.observable(true);
                                    self.enableYear = ko.observable(true);
                                    if (self.dateStartValue == '' && self.dateEndValue == '') {
                                        self.enableDate(false);
                                    }
                                    if (self.monthStartValue == '' && self.monthEndValue == '') {
                                        self.enableMonth(false);
                                    }
                                    if (self.yearStartValue == '' && self.yearEndValue == '') {
                                        self.enableYear(false);
                                    }
                                }
                                ScreenModel.prototype.start = function () {
                                    var self = this, dfd = $.Deferred();
                                    // Management deletion monitoring process 
                                    f.service.addManualSetDel(self.modal).then(function (data) {
                                        self.delId(data);
                                        self.interval = setInterval(function () { return self.confirmProcess(); }, 1000);
                                    });
                                    $("#F10_2").focus();
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                /**
                                   * confirm process after 1s
                                   */
                                ScreenModel.prototype.confirmProcess = function () {
                                    var self = this;
                                    var delId = self.delId();
                                    // F2_1_2 set time over 
                                    self.timeNow = new Date();
                                    var over = (self.timeNow.getSeconds() + self.timeNow.getMinutes() * 60 + self.timeNow.getHours() * 60) - (self.timeStart.getSeconds() + self.timeStart.getMinutes() * 60 + self.timeStart.getHours() * 60);
                                    var time = new Date(null);
                                    time.setSeconds(over); // setting value for SECONDS here
                                    var result = time.toISOString().substr(11, 8);
                                    self.timeOver(result);
                                    // get information managerment Deletion
                                    f.service.findManagementDel(delId).done(function (res) {
                                        var managementDel = res;
                                        // F2_2_2, F2_2_3,F2_2_4
                                        self.status(getStatusEnum(managementDel.operatingCondition));
                                        self.categoryPercentProcess(managementDel.categoryCount + "/" + managementDel.totalCategoryCount);
                                        self.errorCount(managementDel.errorCount + "件");
                                        // update mode when end: DONE, INTERRUPTION_END, ABNORMAL_TERMINATION
                                        // 完了, 中断終了, 異常終了
                                        if ((managementDel.operatingCondition == 4) || (managementDel.operatingCondition == 5) || (managementDel.operatingCondition == 6)) {
                                            // stop auto request to server
                                            window.clearInterval(self.interval);
                                            // end: update dialog to Error/Interrupt mode
                                            if ((managementDel.operatingCondition == 5) || (managementDel.operatingCondition == 6)) {
                                                self.dialogMode("error_interrupt");
                                            }
                                            // end: update dialog to complete mode
                                            if (managementDel.operatingCondition == 4) {
                                                self.dialogMode("done");
                                                $("#F10_2").focus();
                                            }
                                            // delete dataManagementDel of process when end
                                            var dataManagementDel = new DataManagementDel(delId, 0, 0, 0, 0, 0);
                                            f.service.deleteManagementDel(dataManagementDel).done(function (res) {
                                            }).fail(function (res) {
                                            });
                                        }
                                    }).fail(function (res) {
                                    });
                                };
                                // process when click button interrupt
                                ScreenModel.prototype.interrupt = function () {
                                    var self = this;
                                    var dataManagementDel = new DataManagementDel(self.delId(), 1, 0, 0, 0, 5);
                                    nts.uk.ui.dialog.confirm({ messageId: "Msg_387" })
                                        .ifYes(function () {
                                        f.service.setInterruptDeleting(dataManagementDel).done(function (res) {
                                            self.dialogMode("done");
                                            $("#F10_2").focus();
                                        }).fail(function (res) {
                                        });
                                    })
                                        .ifNo(function () {
                                        return;
                                    });
                                };
                                //  process when click button closePopup 
                                ScreenModel.prototype.closePopup = function () {
                                    close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var DataManagementDel = /** @class */ (function () {
                                function DataManagementDel(delId, isInterruptedFlg, categoryCount, totalCategoryCount, errorCount, operatingCondition) {
                                    this.delId = delId;
                                    this.isInterruptedFlg = isInterruptedFlg;
                                    this.categoryCount = categoryCount;
                                    this.totalCategoryCount = totalCategoryCount;
                                    this.errorCount = errorCount;
                                    this.operatingCondition = operatingCondition;
                                }
                                return DataManagementDel;
                            }());
                            function getStatusEnum(value) {
                                if (value && value == model.OPERATING_CONDITION.INPREPARATION) {
                                    return getText('Enum_OperatingCondition_INPREPARATION');
                                }
                                else if (value && value == model.OPERATING_CONDITION.SAVING) {
                                    return getText('Enum_OperatingCondition_SAVING');
                                }
                                else if (value && value == model.OPERATING_CONDITION.INPROGRESS) {
                                    return getText('Enum_OperatingCondition_INPROGRESS');
                                }
                                else if (value && value == model.OPERATING_CONDITION.DELETING) {
                                    return getText('Enum_OperatingCondition_DELETING');
                                }
                                else if (value && value == model.OPERATING_CONDITION.DONE) {
                                    return getText('Enum_OperatingCondition_DONE');
                                }
                                else if (value && value == model.OPERATING_CONDITION.INTERRUPTION_END) {
                                    return getText('Enum_OperatingCondition_INTERRUPTION_END');
                                }
                                else if (value && value == model.OPERATING_CONDITION.ABNORMAL_TERMINATION) {
                                    return getText('Enum_OperatingCondition_ABNORMAL_TERMINATION');
                                }
                            }
                        })(viewmodel = f.viewmodel || (f.viewmodel = {}));
                    })(f = cmf005.f || (cmf005.f = {}));
                })(cmf005 = view.cmf005 || (view.cmf005 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf005.f.vm.js.map