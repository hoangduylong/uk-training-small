var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var at;
        (function (at) {
            var view;
            (function (view) {
                var cps013;
                (function (cps013) {
                    var e;
                    (function (e) {
                        var block = nts.uk.ui.block;
                        var getText = nts.uk.resource.getText;
                        var kibanTimer = nts.uk.ui.sharedvm.KibanTimer;
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.startTime = ko.observable("");
                                    this.endTime = ko.observable("");
                                    this.elapseTime = new kibanTimer('elapseTime');
                                    this.taskId = ko.observable("");
                                    this.executeId = ko.observable("");
                                    this.numberEmpChecked = ko.observable(0);
                                    this.daucach = ko.observable("");
                                    this.countEmp = ko.observable(0);
                                    this.isComplete = ko.observable(false);
                                    this.statusCheck = ko.observable("");
                                    this.aggCreateHasError = ko.observable("");
                                    this.logId = ko.observable("");
                                    this.peopleCount = ko.observable('0');
                                    this.executionStatus = ko.observable('');
                                    //
                                    this.errorMessageInfo = ko.observableArray([]);
                                    this.currentCode = ko.observable();
                                    this.dataShare = ko.observableArray();
                                    // disable gridlist
                                    this.error = ko.observable(false);
                                    // show table error
                                    this.showTableResult = ko.observable(false);
                                    var self = this;
                                    self.elapseTime.start();
                                    self.mode = ko.observable(false);
                                    self.isComplete = ko.observable(false);
                                    self.showTableResult = ko.observable(false);
                                    $("#button3001").focus();
                                    self.columns = ko.observableArray([
                                        { headerText: getText('CPS013_26'), key: 'employeeCode', width: 150 },
                                        { headerText: getText('CPS013_27'), key: 'bussinessName', width: 200 },
                                        { headerText: getText('CPS013_28'), key: 'clsCategoryCheck', width: 200 },
                                        { headerText: getText('CPS013_29'), key: 'categoryName', width: 200 },
                                        { headerText: getText('CPS013_30'), key: 'error', width: 350, formatter: makeIcon },
                                        { headerText: '', key: 'employeeId', width: 1, hidden: true },
                                        { headerText: '', key: 'categoryId', width: 1, hidden: true },
                                        { headerText: '', key: 'GUID', width: 1, hidden: true },
                                    ]);
                                    self.errorMessageInfo.subscribe(function (value) {
                                        if (value.length) {
                                            self.error(true);
                                            self.showTableResult(true);
                                            var selfDialog = nts.uk.ui.windows.getSelf();
                                            selfDialog.$dialog.data('__size__', { width: 1170, height: 615 });
                                            selfDialog.setSize(615, 1170);
                                            window.parent.dispatchEvent(new Event('resize'));
                                        }
                                    });
                                }
                                // dataShare từ màn A.
                                ScreenModel.prototype.start = function (dataShare) {
                                    var self = this;
                                    $(".closebutton").focus();
                                    //system date
                                    if (dataShare !== undefined) {
                                        self.dataShare(dataShare);
                                        //method execute
                                        e.service.executeCheck(dataShare).done(function (res) {
                                            self.taskId(res.id);
                                            nts.uk.deferred.repeat(function (conf) { return conf
                                                .task(function () {
                                                return nts.uk.request.asyncTask.getInfo(self.taskId()).done(function (info) {
                                                    self.startTime(self.getAsyncData(info.taskDatas, "startTime").valueAsString);
                                                    self.numberEmpChecked(self.getAsyncData(info.taskDatas, "numberEmpChecked").valueAsNumber);
                                                    self.countEmp(self.getAsyncData(info.taskDatas, "countEmp").valueAsNumber);
                                                    if (self.countEmp()) {
                                                        self.daucach("/");
                                                    }
                                                    self.statusCheck(self.getAsyncData(info.taskDatas, "statusCheck").valueAsString);
                                                    if (!info.pending && !info.running || info.requestedToCancel) {
                                                        self.isComplete(true);
                                                        // End count time
                                                        self.elapseTime.end();
                                                        var timeAction = self.elapseTime.elapsedSeconds;
                                                        self.endTime(moment.utc(self.startTime()).add(timeAction, 'second').format("YYYY/MM/DD HH:mm:ss"));
                                                        $("#elapseTime").text(self.formatTime(timeAction));
                                                        if (info.requestedToCancel) {
                                                            self.statusCheck(getText('CPS013_51'));
                                                        }
                                                        self.numberEmpChecked(self.getAsyncData(info.taskDatas, "numberEmpChecked").valueAsNumber);
                                                        self.bindingDataToGrid(info.taskDatas);
                                                        setTimeout(function () {
                                                            $("#button3001").focus();
                                                        }, 1500);
                                                    }
                                                });
                                            })
                                                .while(function (info) { return (info.pending || info.running) && (!info.requestedToCancel); })
                                                .pause(1000); });
                                        });
                                    }
                                };
                                ScreenModel.prototype.exportCsv = function () {
                                    var self = this;
                                    var info = self.errorMessageInfo();
                                    var listError = [];
                                    _.forEach(info, function (row) {
                                        var data = {
                                            employeeCode: row.employeeCode,
                                            employeeName: row.bussinessName,
                                            checkAtr: row.clsCategoryCheck,
                                            categoryName: row.categoryName,
                                            contentError: row.error
                                        };
                                        listError.push(data);
                                    });
                                    block.invisible();
                                    nts.uk.request.exportFile('com', 'person/consistency/check/report/print/error', listError)
                                        .done(function (data) { })
                                        .fail(function (mes) { })
                                        .always(function () { return block.clear(); });
                                };
                                ScreenModel.prototype.RecheckTheSameConditions = function () {
                                    var self = this;
                                    self.elapseTime.start();
                                    self.startTime('');
                                    self.numberEmpChecked(0);
                                    self.daucach("");
                                    self.countEmp(0);
                                    self.statusCheck('');
                                    self.endTime('');
                                    self.showTableResult(false);
                                    self.isComplete(false);
                                    // change size dialog
                                    var selfDialog = nts.uk.ui.windows.getSelf();
                                    selfDialog.$dialog.data('__size__', { width: 600, height: 250 });
                                    selfDialog.setSize(250, 600);
                                    window.parent.dispatchEvent(new Event('resize'));
                                    // focus 
                                    $("#buttoncancelTask").focus();
                                    self.errorMessageInfo([]);
                                    var conditions = self.dataShare();
                                    self.start(conditions);
                                };
                                ScreenModel.prototype.cancelTask = function () {
                                    var self = this;
                                    nts.uk.request.asyncTask.requestToCancel(self.taskId());
                                    self.elapseTime.end();
                                };
                                ScreenModel.prototype.closeDialog = function () {
                                    nts.uk.ui.windows.close();
                                };
                                ScreenModel.prototype.bindingDataToGrid = function (data) {
                                    var self = this;
                                    var data_employee = [], errs = [];
                                    data_employee = _.filter(data, function (item) { return item.key.substring(0, 10) === "employeeId"; });
                                    for (var i = 0; i < data_employee.length; i++) {
                                        var obj = JSON.parse(data_employee[i].valueAsString);
                                        var errorInfo = {
                                            employeeId: obj.employeeId,
                                            categoryId: obj.categoryId,
                                            employeeCode: obj.employeeCode,
                                            bussinessName: obj.bussinessName,
                                            clsCategoryCheck: obj.clsCategoryCheck,
                                            categoryName: obj.categoryName,
                                            error: obj.error
                                        };
                                        errs.push(new PersonInfoErrMessageLog(errorInfo));
                                    }
                                    // order 
                                    self.errorMessageInfo(_.sortBy(errs, ['employeeCode', 'clsCategoryCheck', 'categoryName', 'error']));
                                };
                                ScreenModel.prototype.getAsyncData = function (data, key) {
                                    var result = _.find(data, function (item) {
                                        return item.key == key;
                                    });
                                    return result || { valueAsString: "", valueAsNumer: 0, valueAsBoolean: false };
                                };
                                ScreenModel.prototype.formatTime = function (second) {
                                    var d = function (s) { f = Math.floor; g = function (n) { return ('00' + n).slice(-2); }; return f(s / 3600) + ':' + g(f(s / 60) % 60) + ':' + g(s % 60); };
                                    return d(second);
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = e.viewmodel || (e.viewmodel = {}));
                        var PersonInfoErrMessageLog = /** @class */ (function () {
                            function PersonInfoErrMessageLog(data) {
                                this.GUID = nts.uk.util.randomId();
                                this.employeeId = data.employeeId;
                                this.categoryId = data.categoryId;
                                this.employeeCode = data.employeeCode;
                                this.bussinessName = data.bussinessName;
                                this.clsCategoryCheck = data.clsCategoryCheck;
                                this.categoryName = data.categoryName;
                                this.error = data.error;
                            }
                            return PersonInfoErrMessageLog;
                        }());
                        e.PersonInfoErrMessageLog = PersonInfoErrMessageLog;
                        var ExecutionStatus;
                        (function (ExecutionStatus) {
                            // 0:完了
                            ExecutionStatus[ExecutionStatus["Done"] = 0] = "Done";
                            // 1:完了（エラーあり）
                            ExecutionStatus[ExecutionStatus["DoneWitdError"] = 1] = "DoneWitdError";
                            // 2:中断終了
                            ExecutionStatus[ExecutionStatus["EndOfInterruption"] = 2] = "EndOfInterruption";
                            // 3:処理中 
                            ExecutionStatus[ExecutionStatus["Processing"] = 3] = "Processing";
                            // 4:中断開始
                            ExecutionStatus[ExecutionStatus["StartOfInterruption"] = 4] = "StartOfInterruption";
                            // 5:実行中止
                            ExecutionStatus[ExecutionStatus["StopExecution"] = 5] = "StopExecution";
                        })(ExecutionStatus = e.ExecutionStatus || (e.ExecutionStatus = {}));
                        var EmployeInfoErrorDataSource = /** @class */ (function () {
                            function EmployeInfoErrorDataSource(data) {
                                this.employeeCode = data.employeeCode;
                                this.employeeName = data.employeeName;
                                this.checkAtr = data.checkAtr;
                                this.categoryName = data.categoryName;
                                this.contentError = data.contentError;
                            }
                            return EmployeInfoErrorDataSource;
                        }());
                        e.EmployeInfoErrorDataSource = EmployeInfoErrorDataSource;
                        function makeIcon(value, row) {
                            if (value == '1')
                                return '<img style="margin-left: 15px; width: 20px; height: 20px;" />';
                            return '<div>' + '<div class="jumpButton">' + value + '</div>' + '<div style = "display: inline-block; position: relative;">' + '<button tabindex = "6" class="open-dialog-i" onclick="jumtoCPS001A(\'' + row.employeeId + '\', \'' + row.categoryId + '\')">' + nts.uk.resource.getText("CPS013_31") + '</button>' + '</div>' + '</div>';
                        }
                    })(e = cps013.e || (cps013.e = {}));
                })(cps013 = view.cps013 || (view.cps013 = {}));
            })(view = at.view || (at.view = {}));
        })(at = uk.at || (uk.at = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
function jumtoCPS001A(employeeId, categoryId) {
    nts.uk.request.jumpToNewWindow('com', '/view/cps/001/a/index.xhtml', { employeeId: employeeId, categoryId: categoryId });
}
//# sourceMappingURL=cps013.e.vm.js.map