var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm001;
                (function (cmm001) {
                    var f;
                    (function (f) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.taskId = ko.observable(null);
                                    self.errorLogs = ko.observableArray([]);
                                    self.columns = ko.observableArray([
                                        { headerText: nts.uk.resource.getText("CMM001_60"), key: 'systemType', width: 80 },
                                        { headerText: nts.uk.resource.getText("CMM001_61"), key: 'categoryName', width: 150 },
                                        { headerText: nts.uk.resource.getText("CMM001_62"), key: 'message', width: 150 }
                                    ]);
                                    self.executionStartDate = ko.observable(this.getExecutionStartDate());
                                    self.currentCode = ko.observable();
                                    //                self.currentCodeList = ko.observableArray([]);
                                    self.totalRecord = ko.observable(0);
                                    self.numberSuccess = ko.observable(0);
                                    self.numberFail = ko.observable(0);
                                    self.numberOfData = ko.observable(0);
                                    //                self.dataError = ko.observableArray([]);
                                    self.executionState = ko.observable('');
                                    self.executionError = ko.observable('');
                                    self.executionTotal = ko.observable('');
                                    self.isError = ko.observable(false);
                                    self.isFinish = ko.observable(false);
                                    self.pauseFlag = ko.observable(false);
                                    self.readIndex = ko.observableArray([]);
                                    self.countData = ko.observable(0);
                                }
                                /**
                                 * start page
                                 */
                                ScreenModel.prototype.start_page = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    var inputData = nts.uk.ui.windows.getShared('masterCopyDataCmd');
                                    if (inputData) {
                                        self.inputData = inputData;
                                        self.numberOfData(self.inputData.masterDataList.length);
                                        console.log(self.inputData);
                                        // update data view
                                        dfd.resolve();
                                    }
                                    return dfd.promise();
                                };
                                /**
                                 * execution
                                 */
                                ScreenModel.prototype.execution = function () {
                                    var self = this;
                                    //                var data: MasterCopyDataCommand = null;
                                    // find task id
                                    f.service.executionMasterCopyData(self.inputData).done(function (res) {
                                        self.taskId(res.taskInfo.id);
                                        // update state
                                        self.updateState();
                                    }).fail(function (res) {
                                        console.log(res);
                                    });
                                };
                                ScreenModel.prototype.updateState = function () {
                                    var self = this;
                                    // start count time
                                    $('.countdown').startCount();
                                    // Set execution state to processing
                                    self.executionState(nts.uk.resource.getText("CMM001_63"));
                                    $("#interrupt").focus();
                                    nts.uk.deferred.repeat(function (conf) { return conf
                                        .task(function () {
                                        return nts.uk.request.asyncTask.getInfo(self.taskId()).done(function (res) {
                                            // update state on screen
                                            if (res.running || res.succeeded || res.cancelled) {
                                                _.forEach(res.taskDatas, function (item) {
                                                    if (item.key.substring(0, 5) == "DATA_") {
                                                        if (self.readIndex.indexOf(parseInt(item.key.substring(5))) != -1) {
                                                            return;
                                                        }
                                                        var errors = JSON.parse(item.valueAsString);
                                                        _.forEach(errors, function (error) {
                                                            var errorContent = {
                                                                message: nts.uk.resource.getMessage(error.message),
                                                                categoryName: error.categoryName,
                                                                order: error.order,
                                                                systemType: error.systemType
                                                            };
                                                            self.errorLogs.push(errorContent);
                                                        });
                                                        self.readIndex.push(parseInt(item.key.substring(5)));
                                                    }
                                                    if (item.key == 'NUMBER_OF_SUCCESS') {
                                                        self.numberSuccess(item.valueAsNumber);
                                                    }
                                                    if (item.key == 'NUMBER_OF_ERROR') {
                                                        self.numberFail(item.valueAsNumber);
                                                    }
                                                    //self.totalRecord(self.numberSuccess() + self.numberFail());                                                             
                                                });
                                                self.countData(self.numberSuccess());
                                            }
                                            self.executionTotal(nts.uk.resource.getText("CMM001_66", [self.countData(), self.numberOfData()]));
                                            self.executionError(nts.uk.resource.getText("CMM001_67", [self.numberFail()]));
                                            // finish task
                                            if (res.succeeded || res.failed || res.cancelled || res.status == "REQUESTED_CANCEL") {
                                                //                                self.errorLogs.sort(function(a, b) {
                                                //                                    return a.order.localeCompare(b.order) || (moment(a.ymd, 'YYYY/MM/DD').toDate() - moment(b.ymd, 'YYYY/MM/DD').toDate());
                                                //                                });
                                                self.isFinish(true);
                                                $('.countdown').stopCount();
                                                if (res.succeeded) {
                                                    $('#closeDialog').focus();
                                                }
                                                if (self.numberFail() > 0) {
                                                    var currentScreen = nts.uk.ui.windows.getSelf();
                                                    currentScreen.$dialog.height(560);
                                                    self.isError(true);
                                                    $('#tableShowError').show();
                                                    if (self.isFinish() == true && self.isError() == true && self.pauseFlag() == false) {
                                                        self.executionState(nts.uk.resource.getText("CMM001_65"));
                                                    }
                                                    $("#error").focus();
                                                }
                                                if (self.isFinish() == true && !self.isError() == true && self.pauseFlag() == false) {
                                                    self.executionState(nts.uk.resource.getText("CMM001_64"));
                                                    $("#cancel").focus();
                                                }
                                                self.numberFail(self.errorLogs().length);
                                                self.readIndex.removeAll();
                                            }
                                        });
                                    }).while(function (infor) {
                                        return (infor.pending || infor.running) && infor.status != "REQUESTED_CANCEL";
                                    }).pause(1000); });
                                };
                                /**
                                * function cancel execution
                                */
                                ScreenModel.prototype.stopExecution = function () {
                                    var self = this;
                                    self.pauseFlag(true);
                                    if (nts.uk.text.isNullOrEmpty(self.taskId())) {
                                        return;
                                    }
                                    // interrupt process import then close dialog
                                    nts.uk.request.asyncTask.requestToCancel(self.taskId());
                                    $('.countdown').stopCount();
                                    self.isFinish(false);
                                    self.executionState(nts.uk.resource.getText("CMM001_57"));
                                };
                                ScreenModel.prototype.getExecutionStartDate = function () {
                                    var currentDate;
                                    //                currentDate = moment().toDate().toString();
                                    currentDate = new Date();
                                    var year = currentDate.getFullYear();
                                    var mount = currentDate.getMonth() + 1;
                                    var testMount = mount + "";
                                    if (mount < 10) {
                                        testMount = "0" + mount;
                                    }
                                    var day = currentDate.getDate();
                                    var testDay = day + "";
                                    if (day < 10) {
                                        testDay = "0" + day;
                                    }
                                    var hour = currentDate.getHours();
                                    var minute = currentDate.getMinutes();
                                    var second = currentDate.getSeconds();
                                    var date;
                                    date = year + "/" + testMount + "/" + testDay + " " + hour + ":" + minute + ":" + second;
                                    return date;
                                };
                                ScreenModel.prototype.cancelDialog = function () {
                                    nts.uk.ui.windows.close();
                                };
                                ScreenModel.prototype.exportFileError = function () {
                                    var self = this;
                                    var errors = [];
                                    errors = self.errorLogs();
                                    f.service.exportFileError(errors).done(function () {
                                    });
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = f.viewmodel || (f.viewmodel = {}));
                    })(f = cmm001.f || (cmm001.f = {}));
                })(cmm001 = view.cmm001 || (view.cmm001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm001.f.vm.js.map