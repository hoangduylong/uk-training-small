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
                            var JobTitle = cmm013.base.JobTitle;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.selectedJobTitleCode = ko.observable("");
                                    this.selectedHistoryId = ko.observable("");
                                    this.jobTitleIsManager = ko.observable(false);
                                    this.jobTitleList = ko.observableArray([]);
                                    var self = this;
                                    // init UI table job title
                                    self.jobTitleColumns = ko.observableArray([
                                        { headerText: 'コード', key: 'jobTitleCode', width: 100 },
                                        { headerText: '名称', key: 'jobTitleName', width: 150 }
                                    ]);
                                    // get data
                                    self.effect();
                                    // set active job (job code)
                                    //this.selectedJobTitleCode(this.jobTitleList()[0].jobTitleCode);
                                }
                                ScreenModel.prototype.effect = function () {
                                    var self = this;
                                    // first request data
                                    /*service.findAllJobTitle()
                                        .done((data: any) => {
                                            console.log(data)
                                        })
                                        .fail((err: any) => {
                                            console.log(err)
                                        })*/
                                    // get data of jobtitle list
                                    for (var i = 0; i < 20; i++) {
                                        self.jobTitleList.push(new JobTitle("code_" + i, "name" + i));
                                        console.log("fake data success");
                                    }
                                    // change events
                                    self.selectedJobTitleCode.subscribe(function (newJobCode) {
                                        // reload job title info
                                        /*service.findHistoryList(newJobCode)
                                            .done((data: any) => {
                                                console.log(data)
                                            })
                                            .fail((err: any) => {
                                                console.log(err)
                                            })*/
                                        // reset all state
                                    });
                                    self.selectedHistoryId.subscribe(function (newHistoryId) {
                                        // check lastest history local
                                        if (newHistoryId == self.historyList()[0].historyId) {
                                            self.enable_button_history(true);
                                        }
                                        else {
                                            self.enable_button_history(false);
                                        }
                                    });
                                };
                                /**
                                 * Reload component
                                 */
                                ScreenModel.prototype.startPage = function () {
                                    var dfd = $.Deferred();
                                    var self = this;
                                    nts.uk.ui.block.invisible();
                                    nts.uk.ui.block.clear();
                                    dfd.resolve();
                                    return dfd.promise();
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
                                /**
                                 * Show Error Message
                                 */
                                ScreenModel.prototype.showMessageError = function (res) {
                                    // check error business exception
                                    if (!res.businessException) {
                                        return;
                                    }
                                    // show error message
                                    if (Array.isArray(res.errors)) {
                                        nts.uk.ui.dialog.bundledErrors(res);
                                    }
                                    else {
                                        nts.uk.ui.dialog.alertError({ messageId: res.messageId, messageParams: res.parameterIds });
                                    }
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            /**
                             * JobTitleHistoryModel
                             */
                            /*
                    class JobTitleHistoryModel extends JobTitleHistoryAbstract {
                    
                                parentModel: ScreenModel;
                    
                                constructor(parentModel: ScreenModel) {
                                    super();
                                    let _self = this;
                                    _self.parentModel = parentModel;
                                    _self.selectedHistoryId.subscribe((jobHistoryId: string) => {
                                        _self.parentModel.findJobInfo(_self.parentModel.selectedJobTitleId(), jobHistoryId);
                                        _self.validateHistory();
                                    })
                                    _self.init([]);
                                }
                    
                                public init(data: History[]): void {
                                    let _self = this;
                                    _self.listJobTitleHistory(data);
                                    _self.selectFirst();
                                }
                    
                                public clearData(): void {
                                    let _self = this;
                                    _self.listJobTitleHistory([]);
                                    _self.selectedHistoryId(null);
                                }
                    
                                public validateHistory(): void {
                                    let _self = this;
                                    let currentHistory: History = _self.getSelectedHistoryByHistoryId();
                                    if (currentHistory && _self.isSelectedLatestHistory() && currentHistory.period.endDate === "9999/12/31") {
                                        _self.parentModel.historyChangeMode(true);
                                    } else {
                                        _self.parentModel.historyChangeMode(false);
                                    }
                                }
                            }
                             */
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = cmm013.a || (cmm013.a = {}));
                })(cmm013 = view.cmm013 || (view.cmm013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm013.a.vm.js.map