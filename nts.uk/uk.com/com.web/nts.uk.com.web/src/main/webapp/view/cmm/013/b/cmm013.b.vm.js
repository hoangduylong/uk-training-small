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
                    var b;
                    (function (b) {
                        // import JobTitleDto = service.model.JobTitleDto;
                        // import blockUI = nts.uk.ui.block;
                        var viewModel;
                        (function (viewModel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel(code, name) {
                                    var self = this;
                                    self.jobTitleCode(code);
                                    self.jobTitleName(name);
                                    var now = new Date();
                                    self.endDate(now.toString());
                                }
                                /**
                                 * execution
                                 */
                                ScreenModel.prototype.execution = function () {
                                    var self = this;
                                    b.service.abrogateJobTItle(self.jobTitleCode(), self.jobTitleName());
                                };
                                /**
                                 *  end date change
                                 * @param date
                                 */
                                ScreenModel.prototype.endDateChange = function (date) {
                                    var self = this;
                                    if (moment(date, "MM/DD/YYYY", true).isValid()) {
                                        self.endDate(date);
                                    }
                                    else {
                                        return;
                                    }
                                };
                                /**
                                 * Close
                                 */
                                ScreenModel.prototype.close = function () {
                                    nts.uk.ui.windows.close();
                                };
                                ScreenModel.prototype.finishHandle = function () {
                                    var self = this;
                                    b.service.abrogateJobTItle(self.jobTitleCode(), self.jobTitleName());
                                };
                                return ScreenModel;
                            }());
                            viewModel.ScreenModel = ScreenModel;
                        })(viewModel = b.viewModel || (b.viewModel = {}));
                    })(b = cmm013.b || (cmm013.b = {}));
                })(cmm013 = view.cmm013 || (view.cmm013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm013.b.vm.js.map