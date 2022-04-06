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
                    var d;
                    (function (d) {
                        var viewmodel;
                        (function (viewmodel) {
                            var block = nts.uk.ui.block;
                            var close = nts.uk.ui.windows.close;
                            var getText = nts.uk.resource.getText;
                            var setShared = nts.uk.ui.windows.setShared;
                            var getShared = nts.uk.ui.windows.getShared;
                            var dialog = nts.uk.ui.dialog;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.isSuccess = ko.observable(true);
                                    this.fileName = ko.observable('');
                                    this.fileId = ko.observable('');
                                    this.password = ko.observable('');
                                    this.timeLabel = ko.observable("00:00:00");
                                    this.statusLabel = ko.observable('');
                                    this.statusUpload = ko.observable('');
                                    this.statusDecom = ko.observable('');
                                    this.statusCheck = ko.observable('');
                                    this.dataRecoveryProcessId = nts.uk.util.randomId();
                                    this.isWrongPassword = false;
                                    var self = this;
                                    self.timeStart = new Date();
                                    var dParams = getShared("CMF004_D_PARAMS");
                                    if (dParams) {
                                        var fileInfo = dParams.fileInfo;
                                        if (fileInfo) {
                                            self.storeProcessingId = fileInfo.storeProcessingId;
                                            self.fileId(fileInfo.fileId);
                                            self.fileName(fileInfo.fileName);
                                            self.password(fileInfo.password);
                                        }
                                    }
                                }
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    var fileInfo = {
                                        processingId: self.dataRecoveryProcessId,
                                        fileId: self.fileId(),
                                        fileName: self.fileName(),
                                        password: self.password()
                                    };
                                    d.service.extractData(fileInfo).done(function (data) {
                                        dfd.resolve();
                                        block.invisible();
                                        var taskId = data.id;
                                        // 1秒おきに下記を実行
                                        nts.uk.deferred.repeat(function (conf) { return conf
                                            .task(function () {
                                            return nts.uk.request.asyncTask.getInfo(taskId).done(function (res) {
                                                // update state on screen
                                                var status;
                                                if (res.taskDatas.length > 0) {
                                                    status = JSON.parse(_.filter(res.taskDatas, { key: 'status' }).pop().valueAsString);
                                                    self.statusLabel(getText(status.conditionName));
                                                }
                                                if (res.succeeded || res.failed) {
                                                    if (status) {
                                                        self.convertToDisplayStatus(status);
                                                        if (status.processingType == 3 && status.processingStatus == 2) {
                                                            self.storeProcessingId = _.filter(res.taskDatas, { key: 'dataStorageProcessId' }).pop().valueAsString;
                                                            self.isSuccess(true);
                                                            $('#D3_2').focus();
                                                        }
                                                        else {
                                                            self.isSuccess(false);
                                                            if (status.processingStatus == 1) {
                                                                if (status.conditionValue == 8)
                                                                    self.isWrongPassword = true;
                                                                dialog.alertError({ messageId: status.messageId }).then(function () {
                                                                    $('#D3_1').focus();
                                                                });
                                                            }
                                                        }
                                                    }
                                                    if (res.failed) {
                                                        $('#D3_1').focus();
                                                    }
                                                    block.clear();
                                                }
                                                if (res.running) {
                                                    // 経過時間＝現在時刻－開始時刻
                                                    var startTime = self.timeStart;
                                                    var timeNow = new Date();
                                                    var result = moment.utc(moment(timeNow, "HH:mm:ss").diff(moment(startTime, "HH:mm:ss"))).format("HH:mm:ss");
                                                    self.timeLabel(result);
                                                    if (status) {
                                                        self.convertToDisplayStatus(status);
                                                    }
                                                }
                                            });
                                        }).while(function (infor) {
                                            return infor.pending || infor.running;
                                        }).pause(1000); });
                                    }).fail(function (result) {
                                        dfd.reject();
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.closeUp = function () {
                                    var self = this;
                                    setShared("CMF004_E_PARAMS", { storeProcessingId: self.storeProcessingId, continueShowHandleDialog: self.isWrongPassword, continuteProcessing: false });
                                    close();
                                };
                                ScreenModel.prototype.continueProcessing = function () {
                                    var self = this;
                                    var fileInfo = {
                                        fileId: self.fileId(),
                                        fileName: self.fileName(),
                                        password: self.password()
                                    };
                                    setShared("CMF004_E_PARAMS", { storeProcessingId: self.storeProcessingId, processingId: self.dataRecoveryProcessId, fileInfo: fileInfo, continuteProcessing: true });
                                    close();
                                };
                                ScreenModel.prototype.convertToDisplayStatus = function (status) {
                                    var self = this;
                                    if (status.processingType == 1) {
                                        self.statusUpload(self.convertToName(status.processingStatus));
                                    }
                                    if (status.processingType == 2) {
                                        // If status is 2, upload is compelete
                                        self.statusUpload(self.convertToName(2));
                                        self.statusDecom(self.convertToName(status.processingStatus));
                                    }
                                    if (status.processingType == 3) {
                                        // If status is 3, upload and extract is compelete
                                        self.statusUpload(self.convertToName(2));
                                        self.statusDecom(self.convertToName(2));
                                        self.statusCheck(self.convertToName(status.processingStatus));
                                    }
                                };
                                ScreenModel.prototype.convertToName = function (processingType) {
                                    switch (processingType) {
                                        //処理中
                                        case 0: return getText("CMF004_302");
                                        // 失敗
                                        case 1: return getText("CMF004_303");
                                        // 完了
                                        case 2: return getText("CMF004_304");
                                    }
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = d.viewmodel || (d.viewmodel = {}));
                    })(d = cmf004.d || (cmf004.d = {}));
                })(cmf004 = view.cmf004 || (view.cmf004 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf004.d.vm.js.map