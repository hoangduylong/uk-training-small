var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg;
                (function (ccg_1) {
                    var share;
                    (function (share) {
                        var dialog;
                        (function (dialog) {
                            var ccg;
                            (function (ccg) {
                                var SelectType = kcp.share.list.SelectType;
                                var viewmodel;
                                (function (viewmodel) {
                                    /**
                                    * Screen Model.
                                    */
                                    var ScreenModel = /** @class */ (function () {
                                        function ScreenModel() {
                                            var self = this;
                                            self.baseDate = ko.observable(new Date());
                                            self.selectedCodeWorkplace = ko.observableArray([]);
                                            self.baseDate(nts.uk.ui.windows.getShared('baseDate'));
                                            self.selectedCodeWorkplace(nts.uk.ui.windows.getShared('selectedCodeWorkplace'));
                                            self.startMode = nts.uk.ui.windows.getShared('startMode');
                                            self.workplaces = {
                                                isShowAlreadySet: false,
                                                isMultiSelect: true,
                                                startMode: self.startMode,
                                                selectType: SelectType.SELECT_BY_SELECTED_CODE,
                                                isShowSelectButton: true,
                                                selectedId: self.selectedCodeWorkplace,
                                                baseDate: self.baseDate,
                                                isDialog: true
                                            };
                                            $('#workplaceList').ntsTreeComponent(self.workplaces);
                                        }
                                        ScreenModel.prototype.saveWorkplace = function () {
                                            var self = this;
                                            nts.uk.ui.windows.setShared('selectedCodeWorkplace', self.selectedCodeWorkplace());
                                            nts.uk.ui.windows.close();
                                        };
                                        return ScreenModel;
                                    }());
                                    viewmodel.ScreenModel = ScreenModel;
                                })(viewmodel = ccg.viewmodel || (ccg.viewmodel = {}));
                            })(ccg = dialog.ccg || (dialog.ccg = {}));
                        })(dialog = share.dialog || (share.dialog = {}));
                    })(share = ccg_1.share || (ccg_1.share = {}));
                })(ccg = view.ccg || (view.ccg = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg.dialog.vm.js.map