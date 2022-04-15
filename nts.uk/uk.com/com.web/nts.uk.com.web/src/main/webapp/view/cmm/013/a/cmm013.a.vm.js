var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm013;
                (function (cmm013) {
                    var a;
                    (function (a) {
                        var viewmodel;
                        (function (viewmodel) {
                            var History = cmm013.base.History;
                            var JobTitle = cmm013.base.JobTitle;
                            var setShared = nts.uk.ui.windows.setShared;
                            var getShared = nts.uk.ui.windows.getShared;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.selectedJobTitleCode = ko.observable("");
                                    this.currentJobTitleName = ko.observable("");
                                    this.currentPositionCode = ko.observable("");
                                    this.currentPositionOrder = ko.observable("");
                                    this.currentPositionName = ko.observable("");
                                    this.selectedHistoryId = ko.observable("");
                                    this.jobTitleIsManager = ko.observable(false);
                                    this.codeEditor = ko.observable(true);
                                    this.jobTitleList = ko.observableArray([]);
                                    this.jobTitleFoundList = ko.observableArray([]);
                                    this.historyList = ko.observableArray([]);
                                    this.enableHistory = ko.observable(true);
                                    var self = this;
                                    // init UI table job title
                                    self.jobTitleColumns = ko.observableArray([
                                        { headerText: 'コード', key: 'jobTitleCode', width: 100 },
                                        { headerText: '名称', key: 'jobTitleName', width: 220 }
                                    ]);
                                    // setup date default for search input
                                    self.baseDate = ko.observable((new Date()).toDateString());
                                    // effect
                                    self.effect();
                                    // get data
                                    self.firstData();
                                    // set active job (job code)
                                    //this.selectedJobTitleCode(this.jobTitleList()[0].jobTitleCode);
                                }
                                ScreenModel.prototype.firstData = function () {
                                    var self = this;
                                    // first request data
                                    a.service.findAllJobTitle()
                                        .done(function (data) {
                                        data.forEach(function (e) {
                                            var _a;
                                            console.log("Success: " + e.jobTitleCode);
                                            self.jobTitleList.push(new JobTitle(e.jobTitleCode, (_a = e.historyTrainings[0]) === null || _a === void 0 ? void 0 : _a.jobTitleName, e.positionCodeTraining, "fake", 1));
                                        });
                                        // select first element of list job
                                        self.selectedJobTitleCode(self.jobTitleList()[0].jobTitleCode);
                                    })
                                        .fail(function (err) {
                                        console.log("Error: " + err);
                                    });
                                    // get data of jobtitle list
                                    /*for (let i = 0; i < 20; i++) {
                                        self.jobTitleList.push(new JobTitle("code_"+i, "name"+i, "position_code_"+i+1, "position_name_"+i+1, 1));
                                        console.log("fake job data success");
                                    }*/
                                };
                                ScreenModel.prototype.effect = function () {
                                    var self = this;
                                    // change events
                                    self.selectedJobTitleCode.subscribe(function (newJobCode) {
                                        if (!self.jobTitleList().some(function (e) { return e.jobTitleCode == newJobCode; })) {
                                            self.historyList([]);
                                            self.currentJobTitleName("");
                                            self.currentPositionCode("");
                                            self.currentPositionName("");
                                            self.jobTitleIsManager(false);
                                            self.codeEditor(true);
                                            return;
                                        }
                                        console.log(newJobCode);
                                        self.codeEditor(false);
                                        self.historyList([]);
                                        // get data of history for job title (get by selected job id)
                                        a.service.findHistoryList(self.selectedJobTitleCode())
                                            .done(function (data) {
                                            // check history list empty
                                            if (data.historyTrainings.length <= 0) {
                                                // error
                                                self.historyList([]);
                                                self.currentJobTitleName("");
                                                self.currentPositionCode("");
                                                self.currentPositionName("");
                                                self.jobTitleIsManager(false);
                                                self.codeEditor(false);
                                                return;
                                            }
                                            // add list history
                                            data.historyTrainings.forEach(function (e) {
                                                self.historyList.push(new History(e.jobTitleCode, e.jobTitleName, e.historyId, e.startDate, e.endDate));
                                            });
                                            self.selectedHistoryId(self.historyList()[0].historyId);
                                            self.currentPositionName(data.positionCodeTraining);
                                            self.currentPositionCode(data.positionCodeTraining);
                                        });
                                    });
                                    self.selectedHistoryId.subscribe(function (newHistoryId) {
                                        console.log(newHistoryId);
                                        // check lastest history local
                                        var isCtrlHistory = self.isLastestHistory(newHistoryId);
                                        self.enableHistory(isCtrlHistory);
                                        // get job of history selected
                                        var histories = self.historyList().filter(function (e) { return (e.historyId == newHistoryId); });
                                        // exist elements
                                        if (histories.length > 0) {
                                            self.currentJobTitleName(histories[0].jobTitleName);
                                        }
                                    });
                                };
                                /**
                                 * start
                                 */
                                ScreenModel.prototype.startPage = function () {
                                    var dfd = $.Deferred();
                                    var self = this;
                                    nts.uk.ui.block.invisible();
                                    nts.uk.ui.block.clear();
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.isLastestHistory = function (historyId) {
                                    var self = this;
                                    return historyId == self.historyList()[0].historyId;
                                };
                                ScreenModel.prototype.deleteHistory = function () {
                                    var self = this;
                                    console.log(self.historyList());
                                    console.log(self.historyList().length);
                                    nts.uk.ui.dialog.confirm({ messageId: "Msg_18" }).ifYes(function () {
                                        if (self.historyList().length == 1) {
                                            nts.uk.ui.dialog.caution({ messageId: "Msg_57" });
                                        }
                                        else {
                                            self.historyList.shift();
                                            self.historyList.valueHasMutated();
                                        }
                                    });
                                };
                                ScreenModel.prototype.createJobtitle = function () {
                                    var self = this;
                                    self.selectedJobTitleCode("");
                                };
                                /**
                                    Dialogs
                                 */
                                ScreenModel.prototype.openDialogB = function () {
                                    var self = this;
                                    setShared('listMasterToB', {
                                        jobTitleCode: self.selectedJobTitleCode(),
                                        jobTitleName: self.currentJobTitleName(),
                                        lastestHistory: self.historyList()[0]
                                    });
                                    nts.uk.ui.windows.sub.modal('/view/cmm/013/b2/index.xhtml').onClosed(function () {
                                        var data = getShared('DialogBToMaster');
                                        console.log(data);
                                        var first = self.historyList.shift();
                                        self.historyList.unshift(new History(first.jobTitleId, first.jobTitleName, first.historyId, first.startDate, data.abrogatedDate));
                                        self.historyList.valueHasMutated();
                                    });
                                };
                                ScreenModel.prototype.openDialogC = function () {
                                    var self = this;
                                    setShared('listMasterToC', {});
                                    nts.uk.ui.windows.sub.modal('/view/cmm/013/c2/index.xhtml').onClosed(function () {
                                        var data = getShared('DialogCToMaster');
                                        self.currentPositionCode(data.positionCode);
                                        self.currentPositionName(data.positionName);
                                    });
                                };
                                ScreenModel.prototype.openDialogD = function () {
                                    var self = this;
                                    setShared('listMasterToD', {
                                        historyList: self.historyList()
                                    });
                                    nts.uk.ui.windows.sub.modal('/view/cmm/013/d/index.xhtml').onClosed(function () {
                                        var data = getShared('DialogDToMaster');
                                        var preEndDate = new Date();
                                        self.historyList().unshift(new History(self.selectedJobTitleCode(), self.currentJobTitleName(), "", moment(data.startDate.toString()).format("YYYY-MM-DD"), data.endDate));
                                        self.historyList.valueHasMutated();
                                        preEndDate.setDate(new Date(data.startDate).getDate() - 1);
                                        self.historyList()[1].endDate = moment(preEndDate).format("YYYY-MM-DD");
                                        self.historyList.valueHasMutated();
                                        console.log(self.historyList());
                                    });
                                };
                                ScreenModel.prototype.openDialogE = function () {
                                    var self = this;
                                    setShared('listMasterToE', {
                                        startDate: self.historyList()[0].startDate,
                                        historyList: self.historyList()
                                    });
                                    nts.uk.ui.windows.sub.modal('/view/cmm/013/e/index.xhtml').onClosed(function () {
                                        var data = getShared('DialogEToMaster');
                                        var preEndDate = new Date();
                                        self.historyList()[0].startDate = data.startDate;
                                        self.historyList.valueHasMutated();
                                        preEndDate.setDate(new Date(data.startDate).getDate() - 1);
                                        self.historyList()[1].endDate = moment(preEndDate).format("YYYY-MM-DD");
                                        self.historyList.valueHasMutated();
                                        console.log(self.historyList());
                                    });
                                };
                                ScreenModel.prototype.openDialogF = function () {
                                    var self = this;
                                    setShared('listMasterToF', {});
                                    nts.uk.ui.windows.sub.modal('/view/cmm/013/f/index.xhtml').onClosed(function () {
                                        var data = getShared('DialogEToMaster');
                                    });
                                };
                                ScreenModel.prototype.prepareToServer = function () {
                                    var self = this;
                                    return {
                                        positionCode: self.currentPositionCode(),
                                        jobTitleCode: self.selectedJobTitleCode(),
                                        historyId: self.historyList().map(function (e) { return e.historyId; }),
                                        jobTitleName: self.historyList().map(function (e) { return e.jobTitleName; }),
                                        startDate: self.historyList().map(function (e) { return e.startDate; }),
                                        endtDate: self.historyList().map(function (e) { return e.endDate; }),
                                        isAbrogated: self.jobTitleIsManager(),
                                        treatAsAManager: self.jobTitleIsManager()
                                    };
                                };
                                ScreenModel.prototype.submitForm = function () {
                                    var self = this;
                                    // insert or update;
                                    var data = self.prepareToServer();
                                    a.service.updateJobTitle(data)
                                        .done(function (result) {
                                        location.reload();
                                    });
                                };
                                /**
                                 * Validate
                                 */
                                ScreenModel.prototype.validate = function () {
                                    var _self = this;
                                    // Clear error
                                    nts.uk.ui.errors.clearAll();
                                    $('#job-title-code').ntsEditor('validate');
                                    $('#job-title-name').ntsEditor('validate');
                                    return !$('.nts-input').ntsError('hasError');
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = cmm013.a || (cmm013.a = {}));
                })(cmm013 = view.cmm013 || (view.cmm013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm013.a.vm.js.map