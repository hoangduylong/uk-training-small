var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf002;
                (function (cmf002) {
                    var s;
                    (function (s) {
                        var setShared = nts.uk.ui.windows.setShared;
                        var getShared = nts.uk.ui.windows.getShared;
                        var getStatusEnumS = cmf002.share.model.getStatusEnumS;
                        var getEnums = cmf002.share.model.EXIOOPERATIONSTATE;
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    //nextToY
                                    this.isToNext = ko.observable(true);
                                    var self = this;
                                    var params = getShared("CMF002_R_PARAMS");
                                    self.timeStart = new Date();
                                    self.timeOver = ko.observable('00:00:00');
                                    self.dataSaveSetCode = params.selectedConditionCd;
                                    self.dataSaveSetName = params.selectedConditionName;
                                    self.storeProcessingId = params.processingId;
                                    self.status = ko.observable('');
                                    self.proCnt = ko.observable(0);
                                    self.totalProCnt = ko.observable(0);
                                    self.proUnit = ko.observable('');
                                    self.errCnt = ko.observable(0);
                                    self.dialogMode = ko.observable("saving");
                                    self.isDownloaded = ko.observable(false);
                                    //date
                                    self.opCond = 0;
                                    if (_.isNil(params.startDate)) {
                                        self.dayStartValue = "";
                                    }
                                    else {
                                        self.dayStartValue = moment.utc(params.startDate, 'YYYY/MM/DD').format("YYYY/MM/DD");
                                    }
                                    if (_.isNil(params.endDate)) {
                                        self.dayEndValue = "";
                                    }
                                    else {
                                        self.dayEndValue = moment.utc(params.endDate, 'YYYY/MM/DD').format("YYYY/MM/DD");
                                    }
                                }
                                //開始
                                ScreenModel.prototype.start = function () {
                                    var self = this, dfd = $.Deferred();
                                    //データ保存監視処理: 
                                    self.interval = setInterval(self.confirmProcess, 1000, self);
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.confirmProcess = function (self) {
                                    // ドメインモデル「外部出力動作管理」
                                    s.service.findExOutOpMng(self.storeProcessingId).done(function (res) {
                                        if (res) {
                                            //S1
                                            var timeNow = new Date();
                                            var over = (timeNow.getSeconds() + timeNow.getMinutes() * 60 + timeNow.getHours() * 60 * 60) - (self.timeStart.getSeconds() + self.timeStart.getMinutes() * 60 + self.timeStart.getHours() * 60 * 60);
                                            var time_1 = new Date(null);
                                            time_1.setSeconds(over); // specify value for SECONDS here
                                            var result = time_1.toISOString().substr(11, 8);
                                            self.timeOver(result);
                                            //S3
                                            var itemModel = _.find(getStatusEnumS(), function (x) { return x.code == res.opCond; });
                                            self.status(itemModel.name);
                                            self.proCnt(res.proCnt);
                                            self.totalProCnt(res.totalProCnt);
                                            self.proUnit(res.proUnit);
                                            self.errCnt(res.errCnt);
                                            if (self.errCnt() == 0) {
                                                self.isToNext(false);
                                            }
                                            self.opCond = res.opCond;
                                            // update mode 
                                            if ((res.opCond == getEnums.EXPORT_FINISH) || (res.opCond == getEnums.INTER_FINISH) || (res.opCond == getEnums.FAULT_FINISH)) {
                                                // stop auto request to server
                                                clearInterval(self.interval);
                                                // end: update dialog to complete mode
                                                if (res.opCond == getEnums.EXPORT_FINISH) {
                                                    self.dialogMode("done");
                                                    s.service.getExterOutExecLog(self.storeProcessingId).done(function (data) {
                                                        if (data) {
                                                            var delFile = data.deleteFile;
                                                            var fileId_1 = data.fileId;
                                                            self.isDownloaded(delFile == 0);
                                                            if (delFile == 1) {
                                                                self.dialogMode("File_delete");
                                                                $('#S10_2').focus();
                                                            }
                                                            else {
                                                                s.service.updateFileSize(self.storeProcessingId, fileId_1).done(function (updatedata) {
                                                                });
                                                                $('#S10_3').focus();
                                                                // confirm down load when done
                                                                nts.uk.ui.dialog.confirm({ messageId: "Msg_334" })
                                                                    .ifYes(function () {
                                                                    if (fileId_1) {
                                                                        nts.uk.request.specials.donwloadFile(fileId_1);
                                                                        $('#S10_2').focus();
                                                                    }
                                                                })
                                                                    .ifNo(function () {
                                                                    $('#S10_2').focus();
                                                                    return;
                                                                });
                                                                if (self.errCnt() == 0) {
                                                                    self.isToNext(false);
                                                                }
                                                            }
                                                        }
                                                    }).fail(function (res) {
                                                        console.log("Get fileId fail");
                                                        $('#S10_2').focus();
                                                    });
                                                }
                                                // end: update dialog to Error/Interrupt mode
                                                if ((res.opCond == getEnums.INTER_FINISH) || (res.opCond == getEnums.FAULT_FINISH)) {
                                                    self.dialogMode("error_interrupt");
                                                    $('#S10_2').focus();
                                                }
                                                //delete dataStorageMng of process when end
                                                var exOutOpMng = new ExOutOpMng(self.storeProcessingId, 0, 0, 0, 0, '0', 0);
                                                s.service.deleteexOutOpMng(exOutOpMng).done(function (res) {
                                                    console.log("delete success");
                                                }).fail(function (res) {
                                                    console.log("delete fails");
                                                });
                                            }
                                        }
                                    }).fail(function (res) {
                                        console.log("findexOutOpMng fail");
                                    });
                                };
                                //中断をする
                                ScreenModel.prototype.interrupt = function () {
                                    var self = this;
                                    var exOutOpMng = new ExOutOpMng(self.storeProcessingId, self.proCnt(), self.errCnt(), self.totalProCnt(), 1, self.proUnit(), self.opCond);
                                    nts.uk.ui.dialog.confirm({ messageId: "Msg_387" })
                                        .ifYes(function () {
                                        self.dialogMode("error_interrupt");
                                        var itemModel = _.find(getStatusEnumS(), function (x) { return x.code == getEnums.INTER_FINISH; });
                                        self.status(itemModel.name);
                                        // stop auto request to server
                                        clearInterval(self.interval);
                                        $('#S10_2').focus();
                                        // don't nextTo ScreenY
                                        if (self.errCnt() == 0) {
                                            self.isToNext(false);
                                        }
                                        //delete dataStorageMng of process when interrupt
                                        var exOutOpMng = new ExOutOpMng(self.storeProcessingId, 0, 0, 0, 0, '0', 0);
                                        s.service.updateexOutOpMng(exOutOpMng).done(function (res) {
                                            console.log("update interrupt success");
                                        }).fail(function (res) {
                                            console.log("interrupt fails");
                                        });
                                    })
                                        .ifNo(function () {
                                        $('#S10_2').focus();
                                        return;
                                    });
                                };
                                //ダウンロードをする
                                ScreenModel.prototype.download = function () {
                                    var self = this;
                                    // confirm down load when click button
                                    nts.uk.ui.dialog.confirm({ messageId: "Msg_388" })
                                        .ifYes(function () {
                                        s.service.getExterOutExecLog(self.storeProcessingId).done(function (res) {
                                            var fileId = res.fileId;
                                            nts.uk.request.specials.donwloadFile(fileId);
                                            //self.isDownloaded(true);
                                            $('#S10_2').focus();
                                        }).fail(function (res) {
                                            console.log("Get fileId fail");
                                        });
                                    })
                                        .ifNo(function () {
                                        $('#S10_2').focus();
                                        return;
                                    });
                                };
                                ScreenModel.prototype.close = function () {
                                    nts.uk.ui.windows.close();
                                };
                                ScreenModel.prototype.nextToScreenY = function () {
                                    var self = this;
                                    setShared("CMF002_Y_PROCESINGID", self.storeProcessingId);
                                    nts.uk.ui.windows.sub.modal('../y/index.xhtml').onClosed(function () {
                                    });
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var ExOutOpMng = /** @class */ (function () {
                                function ExOutOpMng(exOutProId, proCnt, errCnt, totalProCnt, doNotInterrupt, proUnit, opCond) {
                                    this.exOutProId = exOutProId;
                                    this.proCnt = proCnt;
                                    this.errCnt = errCnt;
                                    this.totalProCnt = totalProCnt;
                                    this.doNotInterrupt = doNotInterrupt;
                                    this.proUnit = proUnit;
                                    this.opCond = opCond;
                                }
                                return ExOutOpMng;
                            }());
                            viewmodel.ExOutOpMng = ExOutOpMng;
                        })(viewmodel = s.viewmodel || (s.viewmodel = {}));
                    })(s = cmf002.s || (cmf002.s = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.s.vm.js.map