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
                    var d;
                    (function (d) {
                        var viewmodel;
                        (function (viewmodel) {
                            var getShared = nts.uk.ui.windows.getShared;
                            var dialog = nts.uk.ui.dialog;
                            var block = nts.uk.ui.block;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.selectionName = ko.observable('');
                                    this.selectionItemId = ko.observable('');
                                    this.selectingHistId = ko.observable('');
                                    this.startDate = ko.observable('');
                                    var self = this;
                                    var data = getShared('CPS017D_PARAMS');
                                    self.selectionName(data.name);
                                    self.selectionItemId(data.id);
                                    self.selectingHistId(data.histId);
                                    self.startDate(data.startDate);
                                }
                                /**
                                 * close dialog when click button キャンセル
                                 */
                                ScreenModel.prototype.closeDialog = function () {
                                    nts.uk.ui.windows.close();
                                };
                                /**
                                 * update history when click button 決定
                                 */
                                ScreenModel.prototype.editHistory = function () {
                                    block.invisible();
                                    var self = this;
                                    var command = {
                                        selectionItemId: self.selectionItemId(),
                                        selectingHistId: self.selectingHistId(),
                                        newStartDate: self.startDate()
                                    };
                                    d.service.editHistoryData(command).done(function () {
                                        dialog.info({ messageId: "Msg_15" }).then(function () {
                                            nts.uk.ui.windows.close();
                                        });
                                    }).fail(function (res) {
                                        if (res.messageId == 'Msg_127') {
                                            $('#start-date-sel').ntsError('set', { messageId: res.messageId });
                                        }
                                        else {
                                            nts.uk.ui.dialog.alertError({ messageId: res.messageId });
                                        }
                                    }).always(function () {
                                        block.clear();
                                    });
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = d.viewmodel || (d.viewmodel = {}));
                    })(d = cps017.d || (cps017.d = {}));
                })(cps017 = view.cps017 || (view.cps017 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps017.d.vm.js.map