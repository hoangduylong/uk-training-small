var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm018;
                (function (cmm018) {
                    var i;
                    (function (i) {
                        var viewmodel;
                        (function (viewmodel) {
                            var vmbase = cmm018.shr.vmbase;
                            var getShared = nts.uk.ui.windows.getShared;
                            var setShared = nts.uk.ui.windows.setShared;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.addNew = false;
                                    var self = this;
                                    self.copyDataFlag = ko.observable(true);
                                    self.dataSource = getShared('CMM018I_PARAM');
                                    self.item = ko.observable(self.dataSource.name);
                                    //TH: add New
                                    if (self.dataSource.startDate == '') {
                                        self.addNew = true;
                                        self.beginStartDate = ko.observable(moment('1900/01/01').format("YYYY/MM/DD"));
                                    }
                                    else {
                                        self.beginStartDate = ko.observable(moment(self.dataSource.startDate).add(1, 'days').format("YYYY/MM/DD"));
                                    }
                                    self.newStartDate = ko.observable(null);
                                }
                                /**
                                 * process parameter and close dialog
                                 */
                                ScreenModel.prototype.submitAndCloseDialog = function () {
                                    var self = this;
                                    $("#startDateInput").trigger("validate");
                                    if (!self.addNew) {
                                        if (!vmbase.ProcessHandler.validateDateInput(self.newStartDate(), self.beginStartDate())) {
                                            //$("#startDateInput").ntsError('set', {messageId:"Msg_153"});
                                            nts.uk.ui.dialog.alertError({ messageId: "Msg_153" }).then(function () {
                                                $("#startDateInput").focus();
                                            });
                                            return;
                                        }
                                    }
                                    if (!nts.uk.ui.errors.hasError()) {
                                        var data = new vmbase.IData(self.newStartDate(), self.dataSource.startDate, self.dataSource.check, self.dataSource.mode, self.copyDataFlag(), self.dataSource.lstAppType, self.dataSource.overLap);
                                        setShared('CMM018I_DATA', data);
                                        nts.uk.ui.windows.close();
                                    }
                                };
                                /**
                                 * close dialog and do nothing
                                 */
                                ScreenModel.prototype.closeDialog = function () {
                                    $("#startDateInput").ntsError('clear');
                                    setShared('CMM018I_DATA', null);
                                    nts.uk.ui.windows.close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = i.viewmodel || (i.viewmodel = {}));
                    })(i = cmm018.i || (cmm018.i = {}));
                })(cmm018 = view.cmm018 || (view.cmm018 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm018.i.vm.js.map