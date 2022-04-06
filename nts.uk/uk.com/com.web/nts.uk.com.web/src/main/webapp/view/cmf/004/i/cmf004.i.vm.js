var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf004;
                (function (cmf004) {
                    var i;
                    (function (i) {
                        var viewmodel;
                        (function (viewmodel) {
                            var getText = nts.uk.resource.getText;
                            var getShared = nts.uk.ui.windows.getShared;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.elapsedTime = ko.observable("00:00:00");
                                    //I2_1
                                    this.statusProcess = ko.observable('');
                                    this.numberCategory = ko.observable('');
                                    this.numberTotalCategory = ko.observable('');
                                    this.employeeProcess = ko.observable('');
                                    this.datetimeProcess = ko.observable('');
                                    this.numberError = ko.observable('');
                                    //I4_1
                                    this.code = ko.observable('');
                                    this.saveName = ko.observable('');
                                    this.recoverySourceCode = ko.observable('');
                                    //Send to Service
                                    this.recoveryProcessingId = ko.observable('');
                                    this.employeeList = ko.observableArray([]);
                                    this.recoveryCategoryList = ko.observableArray([]);
                                    this.recoveryFile = ko.observable('');
                                    this.recoverySourceName = ko.observable('');
                                    this.supplementaryExplanation = ko.observable('');
                                    this.recoveryMethodOptions = ko.observable('');
                                    this.saveForm = ko.observable('');
                                    this.store_del_ProcessingId = ko.observable('');
                                    //status follow
                                    this.isEnding = ko.observable(false);
                                    var self = this;
                                    self.timeStart = new Date();
                                    if (getShared("CMF004IParams")) {
                                        var recoveryInfo = getShared("CMF004IParams");
                                        if (recoveryInfo) {
                                            var self_1 = this;
                                            self_1.saveForm(recoveryInfo.saveForm);
                                            self_1.recoveryProcessingId(recoveryInfo.recoveryProcessingId);
                                            self_1.employeeList(recoveryInfo.employeeList);
                                            self_1.recoveryCategoryList(recoveryInfo.recoveryCategoryList);
                                            self_1.recoveryFile(recoveryInfo.recoveryFile);
                                            self_1.recoverySourceCode(recoveryInfo.recoverySourceCode);
                                            self_1.recoverySourceName(recoveryInfo.recoverySourceName);
                                            self_1.supplementaryExplanation(recoveryInfo.supplementaryExplanation);
                                            self_1.recoveryMethodOptions(recoveryInfo.recoveryMethodOptions);
                                            self_1.store_del_ProcessingId(recoveryInfo.store_del_ProcessingId);
                                        }
                                    }
                                }
                                ScreenModel.prototype.start = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    dfd.resolve(self);
                                    var command = {
                                        saveSetCode: self.recoverySourceCode(),
                                        saveForm: self.saveForm(),
                                        saveName: self.recoverySourceName(),
                                        recoveryProcessingId: self.recoveryProcessingId(),
                                        employeeList: self.employeeList(),
                                        recoveryCategoryList: self.recoveryCategoryList(),
                                        recoveryFile: self.recoveryFile(),
                                        supplementaryExplanation: self.supplementaryExplanation(),
                                        recoveryMethodOptions: self.recoveryMethodOptions(),
                                        store_del_ProcessingId: self.store_del_ProcessingId()
                                    };
                                    i.service.performDataRecover(command).done(function () {
                                    });
                                    return dfd.promise();
                                };
                                //// 1秒おきに下記を実行
                                //データ保存監視処理: 
                                ScreenModel.prototype.startFollow = function () {
                                    var self = this;
                                    self.interval = setInterval(self.followProsessing, 1000, self);
                                };
                                ScreenModel.prototype.followProsessing = function (self) {
                                    var recoveryProcessingId = self.recoveryProcessingId();
                                    i.service.followProsess(recoveryProcessingId).done(function (res) {
                                        var recoveryProcessing = res;
                                        // 経過時間＝現在時刻－開始時刻
                                        var startTime = self.timeStart;
                                        var timeNow = new Date();
                                        var result = moment.utc(moment(timeNow, "HH:mm:ss").diff(moment(startTime, "HH:mm:ss"))).format("HH:mm:ss");
                                        self.elapsedTime(result);
                                        //init I2_1
                                        self.statusProcess(self.getStatusEnum(recoveryProcessing.operatingCondition));
                                        self.numberCategory(recoveryProcessing.categoryCnt);
                                        self.numberTotalCategory(recoveryProcessing.categoryTotalCount);
                                        self.employeeProcess(recoveryProcessing.processTargetEmpCode);
                                        self.datetimeProcess(recoveryProcessing.recoveryDate);
                                        self.numberError(recoveryProcessing.errorCount);
                                        //init I4_1
                                        self.code(self.recoverySourceCode);
                                        self.saveName(self.recoverySourceName);
                                        // 完了, 中断終了, 異常終了
                                        if ((recoveryProcessing.operatingCondition == 3) || (recoveryProcessing.operatingCondition == 1) || (recoveryProcessing.operatingCondition == 5)) {
                                            // stop auto request to servers
                                            i.service.deletePerformDataRecover(recoveryProcessingId);
                                            clearInterval(self.interval);
                                            self.isEnding(true);
                                            $('#I5_2').focus();
                                        }
                                    });
                                };
                                // breakFollow popup
                                ScreenModel.prototype.breakFollow = function () {
                                    var self = this;
                                    // stop auto request to server
                                    //clearInterval(self.interval);
                                    //update status end 
                                    nts.uk.ui.dialog.confirm({ messageId: "Msg_612" })
                                        .ifYes(function () {
                                        var paramBreakFollowProcessing = {
                                            dataRecoveryProcessId: self.recoveryProcessingId()
                                        };
                                        i.service.breakFollowProcessing(paramBreakFollowProcessing).done(function (res) {
                                            $('#I5_2').focus();
                                        });
                                    });
                                };
                                // close popup
                                ScreenModel.prototype.close = function () {
                                    nts.uk.ui.windows.close();
                                };
                                ScreenModel.prototype.getStatusEnum = function (value) {
                                    if (value === 0) {
                                        return getText('CMF004_311');
                                    }
                                    else if (value === 1) {
                                        return getText('CMF004_315');
                                    }
                                    else if (value === 2) {
                                        return getText('CMF004_312');
                                    }
                                    else if (value === 3) {
                                        return getText('CMF004_313');
                                    }
                                    else if (value === 4) {
                                        return getText('CMF004_310');
                                    }
                                    else if (value === 5) {
                                        return getText('CMF004_314');
                                    }
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = i.viewmodel || (i.viewmodel = {}));
                    })(i = cmf004.i || (cmf004.i = {}));
                })(cmf004 = view.cmf004 || (view.cmf004 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf004.i.vm.js.map