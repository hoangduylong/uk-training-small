var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps017;
                (function (cps017) {
                    var c;
                    (function (c) {
                        var viewmodel;
                        (function (viewmodel) {
                            var getShared = nts.uk.ui.windows.getShared;
                            var block = nts.uk.ui.block;
                            var dialog = nts.uk.ui.dialog;
                            var formatDate = nts.uk.time.formatDate;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.selectionName = ko.observable(null);
                                    this.selectionItemId = ko.observable('');
                                    this.selectingHistId = ko.observable('');
                                    this.startDate = ko.observable(formatDate(new Date()) || undefined);
                                    var self = this;
                                    var data = getShared('CPS017C_PARAMS');
                                    //get name from screen main
                                    self.selectionName(data.name);
                                    self.selectionItemId(data.id);
                                    self.selectingHistId(data.histId);
                                }
                                ScreenModel.prototype.closeDialog = function () {
                                    nts.uk.ui.windows.close();
                                };
                                ScreenModel.prototype.addHistory = function () {
                                    block.invisible();
                                    var self = this;
                                    var command = {
                                        selectionItemId: self.selectionItemId(),
                                        selectingHistId: self.selectingHistId(),
                                        startDate: self.startDate()
                                    };
                                    c.service.addHistoryData(command).done(function () {
                                        dialog.info({ messageId: "Msg_15" }).then(function () {
                                            nts.uk.ui.windows.close();
                                        });
                                    }).fail(function (res) {
                                        $('#start-date-sel').ntsError('set', { messageId: res.messageId });
                                    }).always(function () {
                                        block.clear();
                                    });
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = c.viewmodel || (c.viewmodel = {}));
                    })(c = cps017.c || (cps017.c = {}));
                })(cps017 = view.cps017 || (view.cps017 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps017.c.vm.js.map