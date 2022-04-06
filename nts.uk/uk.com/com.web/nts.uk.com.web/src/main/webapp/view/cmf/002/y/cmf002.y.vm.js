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
                    var y;
                    (function (y) {
                        var getText = nts.uk.resource.getText;
                        var alertError = nts.uk.ui.dialog.alertError;
                        var getShared = nts.uk.ui.windows.getShared;
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.externalOutLog = ko.observableArray([]);
                                    this.count = 100;
                                    //grid error
                                    this.processCount = ko.observable('');
                                    this.errorItem = ko.observable('');
                                    this.errorTargetValue = ko.observable('');
                                    this.errorContent = ko.observable('');
                                    this.errorEmployee = ko.observable('');
                                    this.normalCount = ko.observable(0);
                                    this.totalCount = ko.observable(0);
                                    this.totalErrorCount = ko.observable(0);
                                    this.groupProcessCount = ko.observable(0);
                                    var self = this;
                                    var params = getShared('CMF002_Y_PROCESINGID');
                                    self.storeProcessingId = params;
                                    self.exterOutExecLog = ko.observable(new ExterOutExecLog('', '', '', 0, 0, '', 0, 0, '', 0, '', '', '', 0, 0, '', '', '', '', '', 0, ''));
                                    //                self.totalCount.subscribe(function(value) {
                                    //                    self.normalCount(self.totalCount() - self.totalErrorCount());
                                    //                });
                                    //                self.totalErrorCount.subscribe(function(value) {
                                    //                    self.normalCount(self.totalCount() - self.totalErrorCount());
                                    //                });
                                    self.groupProcessCount.subscribe(function (value) {
                                        self.normalCount(self.totalCount() - self.groupProcessCount());
                                    });
                                    self.iErrorContentCSV = ko.observable(new IErrorContentCSV("", self.exterOutExecLog(), self.externalOutLog()));
                                    y.service.getExterOutExecLog(self.storeProcessingId).done(function (res) {
                                        if (res) {
                                            self.totalCount(res.totalCount);
                                            self.totalErrorCount(res.totalErrorCount);
                                            self.exterOutExecLog(res);
                                            self.iErrorContentCSV(new IErrorContentCSV(self.exterOutExecLog().nameSetting, self.exterOutExecLog(), self.externalOutLog()));
                                        }
                                    }).fail(function (res) {
                                        console.log("FindExterOutExecLog fail");
                                    });
                                    y.service.getExternalOutLog(self.storeProcessingId).done(function (res) {
                                        nts.uk.ui.block.invisible();
                                        if (res) {
                                            var sortByExternalOutLog = _.orderBy(res, ["logRegisterDateTime"]);
                                            if (sortByExternalOutLog && sortByExternalOutLog.length) {
                                                var temp_1 = [];
                                                _.forOwn(sortByExternalOutLog, function (index) {
                                                    temp_1.push(new ExternalOutLog(index.processCount, index.errorContent, index.errorTargetValue, index.errorEmployee, index.errorItem));
                                                });
                                                for (var i_1 = 0; i_1 < temp_1.length; i_1++) {
                                                    temp_1[i_1]['no'] = i_1;
                                                }
                                                self.externalOutLog(temp_1);
                                                self.iErrorContentCSV(new IErrorContentCSV(self.exterOutExecLog().nameSetting, self.exterOutExecLog(), self.externalOutLog()));
                                                self.groupProcessCount(_.size(_.countBy(sortByExternalOutLog, 'processCount')));
                                            }
                                        }
                                    }).fail(function (res) {
                                        console.log("FindgetExternalOutLog fail");
                                    }).always(function () {
                                        nts.uk.ui.block.clear();
                                    });
                                    this.columnsExternalOutLog = ko.observableArray([
                                        { headerText: '', key: 'no', formatter: _.escape, hidden: true },
                                        { headerText: getText('CMF002_336'), key: 'processCount', width: 40, formatter: _.escape },
                                        { headerText: getText('CMF002_337'), key: 'errorItem', width: 80, formatter: _.escape },
                                        { headerText: getText('CMF002_338'), key: 'errorTargetValue', width: 80, formatter: _.escape },
                                        { headerText: getText('CMF002_339'), key: 'customerrorContent', width: 340, formatter: _.escapes }
                                    ]);
                                    this.currentCode = ko.observableArray();
                                }
                                //開始
                                ScreenModel.prototype.start = function () {
                                    $('#listlog_container').removeAttr('tabindex');
                                    var self = this, dfd = $.Deferred();
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                // エラー出力
                                ScreenModel.prototype.errorExport = function () {
                                    var self = this;
                                    nts.uk.ui.block.invisible();
                                    y.service.exportDatatoCsv(self.iErrorContentCSV()).fail(function (res) {
                                        alertError({ messageId: res.messageId });
                                    }).always(function () {
                                        nts.uk.ui.block.clear();
                                    });
                                };
                                // close popup
                                ScreenModel.prototype.close = function () {
                                    nts.uk.ui.windows.close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var IErrorContentCSV = /** @class */ (function () {
                                function IErrorContentCSV(nameSetting, resultLog, errorLog) {
                                    this.nameSetting = nameSetting;
                                    this.resultLog = resultLog;
                                    this.errorLog = errorLog;
                                }
                                return IErrorContentCSV;
                            }());
                            //外部出力結果ログ
                            var ExternalOutLog = /** @class */ (function () {
                                function ExternalOutLog(processCount, errorContent, errorTargetValue, errorEmployee, errorItem) {
                                    this.processCount = processCount ? processCount : null;
                                    this.errorContent = errorContent ? errorContent : null;
                                    this.errorTargetValue = errorTargetValue ? errorTargetValue : null;
                                    this.errorEmployee = errorEmployee ? errorEmployee : null;
                                    this.errorItem = errorItem ? errorItem : null;
                                    this.customerrorContent = errorEmployee != null ? errorContent + "(" + getText('CMF002_356') + errorEmployee + ")" : errorContent;
                                }
                                return ExternalOutLog;
                            }());
                            viewmodel.ExternalOutLog = ExternalOutLog;
                            //外部出力実行結果ログ
                            var ExterOutExecLog = /** @class */ (function () {
                                function ExterOutExecLog(companyId, outputProcessId, userId, totalErrorCount, totalCount, fileId, fileSize, deleteFile, fileName, roleType, processUnit, processEndDateTime, processStartDateTime, standardClass, executeForm, executeId, designatedReferenceDate, specifiedEndDate, specifiedStartDate, codeSettingCondition, resultStatus, nameSetting) {
                                    this.companyId = companyId;
                                    this.outputProcessId = outputProcessId;
                                    this.userId = userId;
                                    this.totalErrorCount = totalErrorCount;
                                    this.totalCount = totalCount;
                                    this.fileId = fileId;
                                    this.fileSize = fileSize;
                                    this.deleteFile = deleteFile;
                                    this.fileName = fileName;
                                    this.roleType = roleType;
                                    this.processUnit = processUnit;
                                    this.processEndDateTime = processEndDateTime;
                                    this.processStartDateTime = processStartDateTime;
                                    this.standardClass = standardClass;
                                    this.executeForm = executeForm;
                                    this.executeId = executeId;
                                    this.designatedReferenceDate = designatedReferenceDate;
                                    this.specifiedEndDate = specifiedEndDate;
                                    this.specifiedStartDate = specifiedStartDate;
                                    this.codeSettingCondition = codeSettingCondition;
                                    this.resultStatus = resultStatus;
                                    this.nameSetting = nameSetting;
                                }
                                return ExterOutExecLog;
                            }());
                            viewmodel.ExterOutExecLog = ExterOutExecLog;
                        })(viewmodel = y.viewmodel || (y.viewmodel = {}));
                    })(y = cmf002.y || (cmf002.y = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.y.vm.js.map