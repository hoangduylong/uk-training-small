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
                    var m;
                    (function (m) {
                        var block = nts.uk.ui.block;
                        var vmbase = cmm018.shr.vmbase;
                        var servicebase = cmm018.shr.servicebase;
                        var getText = nts.uk.resource.getText;
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel(params) {
                                    this.isCompany = ko.observable(false);
                                    this.isWorkplace = ko.observable(false);
                                    this.isPerson = ko.observable(false);
                                    this.date = ko.observable(moment(new Date()).toDate());
                                    this.sysAtr = ko.observable(0);
                                    this.sv = new SettingVisible();
                                    var self = this;
                                    var param = nts.uk.ui.windows.getShared('CMM018M_PARAM');
                                    self.sysAtr(param.sysAtr || 0);
                                    // self.lstAppName = param.lstName || [];
                                    self.start();
                                }
                                ScreenModel.prototype.start = function () {
                                    var self = this;
                                    block.invisible();
                                    var companyId = __viewContext.user.companyId;
                                    var command = {
                                        systemAtr: ko.toJS(self.sysAtr),
                                        companyId: companyId
                                    };
                                    // Refactor5 ver10 CMM018
                                    m.service.getSetting(command)
                                        .then(function (res) {
                                        self.sv.changeValue(res.companyUnit == 1, res.workplaceUnit == 1, res.employeeUnit == 1);
                                        self.setUnit(res);
                                        return self.getAppDis();
                                    }).done(function (res) {
                                        block.clear();
                                    })
                                        .fail(function (res) {
                                        nts.uk.ui.dialog.alert({ messageId: res.messageId || res.message });
                                        block.clear();
                                    });
                                };
                                ScreenModel.prototype.findName = function (lstName, appType) {
                                    return _.find(lstName, function (name) {
                                        return name.value == appType;
                                    });
                                };
                                // Refactor5 利用している申請承認ルート
                                // UKDesign.ドメインモデル."NittsuSystem.UniversalK".ワークフロー.承認設定.アルゴリズム.利用している申請承認ルート
                                ScreenModel.prototype.getAppDis = function () {
                                    var dfd = $.Deferred();
                                    var self = this;
                                    var tab = 0;
                                    if (!(ko.toJS(self.isCompany) && !ko.toJS(self.isWorkplace))) {
                                        tab = 2;
                                    }
                                    else if (ko.toJS(self.isCompany)) {
                                        tab = 0;
                                    }
                                    else {
                                        tab = 1;
                                    }
                                    var param = { tab: tab, workplaceID: '', employeeId: '' };
                                    if (self.sysAtr() == vmbase.SystemAtr.WORK) { //就業
                                        servicebase.setAppUseKaf022(param).done(function (lstUse) {
                                            self.lstNameAppType = ko.observableArray([]);
                                            servicebase.getNameAppType().done(function (lstName) {
                                                _.each(lstUse, function (item) {
                                                    // refactor5 remove 36 application
                                                    if (item.useAtr == 1) {
                                                        self.lstNameAppType.push(new vmbase.ApplicationType(item.appType, self.findName(lstName, item.appType).localizedName, 1, null));
                                                    }
                                                });
                                                self.lstNameAppType.push(new vmbase.ApplicationType(0, getText('CMM018_107'), 2, null));
                                                self.lstNameAppType.push(new vmbase.ApplicationType(1, getText('CMM018_108'), 2, null));
                                                dfd.resolve();
                                            });
                                        });
                                    }
                                    else { //人事
                                        servicebase.settingJnh011().done(function (lstNotice) {
                                            servicebase.settingJmm018().done(function (lstEvent) {
                                                self.lstNameAppType = ko.observableArray([]);
                                                //                                /**届出*/
                                                //                                NOTICE(4),
                                                //                                /**各業務エベント*/
                                                //                                BUS_EVENT(5);
                                                _.each(lstNotice, function (notice) {
                                                    self.lstNameAppType.push(new vmbase.ApplicationType(notice.reportClsId.toString(), notice.reportName, 4, notice.noRankOrder));
                                                });
                                                _.each(lstEvent, function (event) {
                                                    self.lstNameAppType.push(new vmbase.ApplicationType(event.programId, event.programName, 5, event.noRankOrder == 1 ? true : false));
                                                });
                                                dfd.resolve();
                                            });
                                        });
                                    }
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.setUnit = function (param) {
                                    var self = this;
                                    self.isCompany(param.companyUnit == 1);
                                    self.isWorkplace(param.workplaceUnit == 1);
                                    self.isPerson(param.employeeUnit == 1);
                                };
                                //閉じるボタン
                                ScreenModel.prototype.closeDialog = function () {
                                    nts.uk.ui.windows.close();
                                };
                                ScreenModel.prototype.printExcel = function () {
                                    if (nts.uk.ui.errors.hasError()) {
                                        return;
                                    }
                                    var self = this;
                                    //会社別、職場別、個人別のチェック状態をチェックする(kiểm tra trạng thái check của 会社別、職場別、個人別)
                                    //１件もチェック入れていない場合(không check cái nào)
                                    if (!self.isCompany() && !self.isWorkplace() && !self.isPerson()) {
                                        nts.uk.ui.dialog.alert({ messageId: "Msg_199" });
                                        return;
                                    }
                                    var master = new m.service.MasterApproverRootQuery(self.date(), ko.toJS(self.isCompany), ko.toJS(self.isWorkplace), ko.toJS(self.isPerson), self.sysAtr(), ko.toJS(self.lstNameAppType));
                                    block.grayout();
                                    m.service.saveAsExcel(master).done(function (data) {
                                        block.clear();
                                    }).fail(function (res) {
                                        nts.uk.ui.dialog.alert({ messageId: res.messageId });
                                        block.clear();
                                    });
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var SettingVisible = /** @class */ (function () {
                                function SettingVisible() {
                                    this.isCompany = ko.observable(false);
                                    this.isWorkplace = ko.observable(false);
                                    this.isPerson = ko.observable(false);
                                }
                                SettingVisible.prototype.changeValue = function (isCompany, isWorkplace, isPerson) {
                                    this.isCompany(isCompany);
                                    this.isWorkplace(isWorkplace);
                                    this.isPerson(isPerson);
                                };
                                return SettingVisible;
                            }());
                        })(viewmodel = m.viewmodel || (m.viewmodel = {}));
                    })(m = cmm018.m || (cmm018.m = {}));
                })(cmm018 = view.cmm018 || (view.cmm018 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm018.m.vm.js.map