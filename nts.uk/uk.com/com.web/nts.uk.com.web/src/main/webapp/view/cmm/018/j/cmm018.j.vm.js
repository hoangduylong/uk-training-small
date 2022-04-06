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
                    var j;
                    (function (j) {
                        var viewmodel;
                        (function (viewmodel) {
                            var servicebase = cmm018.shr.servicebase;
                            var close = nts.uk.ui.windows.close;
                            var block = nts.uk.ui.block;
                            var vmbase = cmm018.shr.vmbase;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.item = ko.observable('');
                                    this.selectedId = ko.observable(1);
                                    var self = this;
                                    self.itemList = ko.observableArray([
                                        { code: 0, name: nts.uk.resource.getText("CMM018_54") },
                                        { code: 1, name: nts.uk.resource.getText("CMM018_55") }
                                    ]);
                                    var data = nts.uk.ui.windows.getShared('CMM018J_PARAM');
                                    self.dataSource = data;
                                    self.beginStartDate = ko.observable(moment(self.dataSource.startDate).add(1, 'days').format("YYYY/MM/DD"));
                                    self.item(self.dataSource.name);
                                    self.newStartDate = ko.observable(self.dataSource.startDate); //startDate
                                    self.isUpdate = ko.observable(true);
                                    self.selectedId.subscribe(function (codeChange) {
                                        if (codeChange == 0) { //delete
                                            self.isUpdate(false);
                                        }
                                        else { //update
                                            self.isUpdate(true);
                                        }
                                    });
                                }
                                /**
                                 * update/delete data when no error and close dialog
                                 */
                                ScreenModel.prototype.registration = function () {
                                    block.invisible();
                                    var self = this;
                                    //data
                                    var dataFix = new vmbase.JData(self.newStartDate(), '9999-12-31', self.dataSource.workplaceId, self.dataSource.employeeId, self.dataSource.check, self.selectedId(), self.dataSource.startDate, self.dataSource.lstUpdate, self.dataSource.mode, self.dataSource.sysAtr);
                                    if (self.isUpdate()) { //TH: edit
                                        //                //編集後の履歴の開始年月日 > 取得した履歴の開始年月日 が falseの場合
                                        //                    if(self.newStartDate() < self.beginStartDate()){
                                        //                        //エラーメッセージ(Msg_156)(error mesage (Msg_156))
                                        //                        nts.uk.ui.dialog.alertError({ messageId: "Msg_156", messageParams: nts.uk.resource.getText("CMM018_48")  }).then(function(res){
                                        //                            block.clear();
                                        //                        });
                                        //                        return;
                                        //                    }
                                        //履歴編集を実行する(Update history)
                                        servicebase.updateHistory(dataFix).done(function () {
                                            //情報メッセージ（Msg_15）(Show message Msg_15)
                                            nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                                                //close dialog
                                                close();
                                            });
                                            block.clear();
                                        }).fail(function (res) {
                                            nts.uk.ui.dialog.alertError({ messageId: res.messageId, messageParams: res.parameterIds }).then(function (res) {
                                                $("#startDateInput").focus();
                                                block.clear();
                                            });
                                        });
                                    }
                                    else { //TH: delete
                                        //削除する期間が最新なのかチェックする (Check history the last)
                                        if (self.dataSource.endDate != '9999/12/31') {
                                            nts.uk.ui.dialog.alertError({ messageId: "Msg_154" }).then(function (res) {
                                                block.clear();
                                            });
                                            return;
                                        }
                                        //TH: まとめて設定モード
                                        if (self.dataSource.mode == 0) {
                                            //編集対象期間履歴が重なっているかチェックする(Check ls co bị chồng chéo k?)
                                            if (self.dataSource.overlapFlag) {
                                                nts.uk.ui.dialog.alertError({ messageId: "Msg_319" }).then(function (res) {
                                                    block.clear();
                                                });
                                                return;
                                            }
                                        }
                                        //削除前の確認処理(xác nhận trước khi xóa)
                                        //確認メッセージ（Msg_18）を表示する(Show Confirm Message Msg_18)
                                        nts.uk.ui.dialog.confirm({ messageId: 'Msg_18' }).ifYes(function () {
                                            //履歴の削除を実行する(Delete history) 
                                            servicebase.updateHistory(dataFix).done(function () {
                                                //情報メッセージ（Msg_16）(Show message Msg_16)
                                                nts.uk.ui.dialog.info({ messageId: "Msg_16" }).then(function () {
                                                    close();
                                                });
                                            }).fail(function (res) {
                                                nts.uk.ui.dialog.alertError({ messageId: res.messageId, messageParams: res.parameterIds }).then(function (res) {
                                                    $("#startDateInput").focus();
                                                    block.clear();
                                                });
                                            });
                                        }).ifNo(function () {
                                            block.clear();
                                        });
                                    }
                                };
                                /**
                                 * close dialog and do nothing
                                 */
                                ScreenModel.prototype.closeDialog = function () {
                                    $("#startDateInput").ntsError('clear');
                                    nts.uk.ui.windows.setShared('CMM018J_OUTPUT', { cancel: true });
                                    close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = j.viewmodel || (j.viewmodel = {}));
                    })(j = cmm018.j || (cmm018.j = {}));
                })(cmm018 = view.cmm018 || (view.cmm018 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm018.j.vm.js.map