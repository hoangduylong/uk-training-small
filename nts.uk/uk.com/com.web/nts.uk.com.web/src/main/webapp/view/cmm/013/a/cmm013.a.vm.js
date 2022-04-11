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
                                    // get data
                                    self.effect();
                                    // set active job (job code)
                                    //this.selectedJobTitleCode(this.jobTitleList()[0].jobTitleCode);
                                }
                                ScreenModel.prototype.effect = function () {
                                    var self = this;
                                    // first request data
                                    a.service.findAllJobTitle()
                                        .done(function (data) {
                                        console.log("Success: " + data);
                                    })
                                        .fail(function (err) {
                                        console.log("Error: " + err);
                                    });
                                    // get data of jobtitle list
                                    for (var i = 0; i < 20; i++) {
                                        self.jobTitleList.push(new JobTitle("code_" + i, "name" + i, "position_code_" + i + 1, "position_name_" + i + 1, 1));
                                        console.log("fake job data success");
                                    }
                                    // select first element of list job
                                    self.selectedJobTitleCode(self.jobTitleList()[0].jobTitleCode);
                                    // change events
                                    self.selectedJobTitleCode.subscribe(function (newJobCode) {
                                        console.log(newJobCode);
                                        // reload job title info
                                        /*service.findHistoryList(newJobCode)
                                            .done((data: any) => {
                                                console.log(data)
                                            })
                                            .fail((err: any) => {
                                                console.log(err)
                                            })*/
                                        // get data of history for job title (get by selected job id)
                                        for (var i = 0; i < 20; i++) {
                                            self.historyList.push(new History("job", "history_name_" + i, "historyId_" + i, "3/1/2020", "1/3/2021"));
                                            console.log("fake history data success");
                                        }
                                        // select first element of list history
                                        self.selectedHistoryId(self.historyList()[0].historyId);
                                        // reset all state
                                        var jobs = self.jobTitleList().filter(function (e) { return (e.jobTitleCode == newJobCode); });
                                        if (jobs.length > 0) {
                                            self.currentPositionName(jobs[0].position.positionName);
                                            self.currentPositionCode(jobs[0].position.positionCode);
                                            self.currentPositionOrder(jobs[0].position.order + "");
                                        }
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
                                /**
                                    Dialogs
                                 */
                                ScreenModel.prototype.openDialogB = function () {
                                    var self = this;
                                    setShared('listMasterToB', {
                                        jobTitleCode: self.selectedJobTitleCode(),
                                        jobTitleName: self.currentJobTitleName()
                                    });
                                    nts.uk.ui.windows.sub.modal('/view/cmm/013/b2/index.xhtml').onClosed(function () {
                                        var data = getShared('DialogBToMaster');
                                        console.log(data);
                                        /*let arrrew: any = [];
                                        for (let i = 0; i < self.historyList().length; i++) {
                                            arrrew.push(new History())
                                        }*/
                                        //self.historyList()[0].updateEndDate(data.abrogatedDate)
                                        //let newHistories = [...self.historyList()]
                                        //newHistories[0].updateEndDate(data.abrogatedDate);
                                        //self.historyList(arrrew);
                                        var first = self.historyList.shift();
                                        self.historyList.unshift(new History(first.jobTitleId, first.jobTitleName, first.historyId, first.startDate, data.abrogatedDate));
                                        self.historyList.valueHasMutated();
                                        console.log(self.historyList()[0].endDate);
                                        console.log(123);
                                        console.log(self.historyList());
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
                                    nts.uk.ui.windows.sub.modal('/view/cmm/022/d/index.xhtml').onClosed(function () {
                                        var data = getShared('DialogDToMaster');
                                        console.log(data);
                                    });
                                };
                                ScreenModel.prototype.openDialogE = function () {
                                    var self = this;
                                    setShared('listMasterToE', {});
                                    nts.uk.ui.windows.sub.modal('/view/cmm/013/e/index.xhtml').onClosed(function () {
                                        var data = getShared('DialogEToMaster');
                                    });
                                };
                                ScreenModel.prototype.prepareToServer = function (isAbrogated) {
                                    var self = this;
                                    return {
                                        positionCode: self.currentPositionCode(),
                                        jobTitleCode: self.selectedJobTitleCode(),
                                        historyId: self.historyList().map(function (e) { return e.historyId; }),
                                        jobTitleName: self.historyList().map(function (e) { return e.jobTitleName; }),
                                        startDate: self.historyList().map(function (e) { return e.startDate; }),
                                        endtDate: self.historyList().map(function (e) { return e.endDate; }),
                                        isAbrogated: isAbrogated,
                                        treatAsAManager: self.jobTitleIsManager()
                                    };
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