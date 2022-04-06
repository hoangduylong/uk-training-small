var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm020;
                (function (cmm020) {
                    var a;
                    (function (a) {
                        var blockUI = nts.uk.ui.block;
                        var LAST_INDEX_ERA_NAME_SYTEM = 3;
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.indexOfDelete = ko.observable(-1);
                                    self.activeUpdate = ko.observable(false);
                                    self.activeDelete = ko.observable(false);
                                    self.isFocus = ko.observable(false);
                                    self.texteditor = {
                                        value: ko.observable(''),
                                        constraint: 'ResidenceCode',
                                        option: ko.mapping.fromJS(new nts.uk.ui.option.TextEditorOption({
                                            textmode: "text",
                                            placeholder: "Placeholder for text editor",
                                            width: "100px",
                                            textalign: "left"
                                        })),
                                        required: ko.observable(true),
                                        enable: ko.observable(true),
                                        readonly: ko.observable(false)
                                    };
                                    self.columns = ko.observableArray([
                                        { headerText: 'eraId', key: 'eraId', width: 100, hidden: true },
                                        { headerText: nts.uk.resource.getText('CMM020_6'), key: 'eraName', width: 60, formatter: _.escape },
                                        { headerText: nts.uk.resource.getText('CMM020_7'), key: 'eraSymbol', width: 45, formatter: _.escape },
                                        { headerText: nts.uk.resource.getText('CMM020_8'), key: 'startDate', width: 70, formatter: _.escape }
                                    ]);
                                    self.eraSelected = ko.observable(null);
                                    self.dataSource = ko.observableArray([]);
                                    self.eraName = ko.observable('');
                                    self.eraSymbol = ko.observable('');
                                    self.startDate = ko.observable('');
                                    self.currentName = ko.observable('');
                                    self.currentSymbol = ko.observable('');
                                    self.currentStartDate = ko.observable('');
                                    self.currentCode = ko.observable('');
                                    self.currentCode.subscribe(function (codeChanged) {
                                        self.clearError();
                                        if (codeChanged == undefined || codeChanged == "") {
                                            self.refreshEraShow();
                                            self.activeUpdate(false);
                                            self.activeDelete(false);
                                        }
                                        else {
                                            var currentEra = self.dataSource().filter(function (e) { return e.eraId === codeChanged; })[0];
                                            if (!_.isEmpty(currentEra)) {
                                                self.eraSelected(currentEra);
                                                //check era is system value, set active btn update and delete
                                                var indexOfEraSelected = self.dataSource().indexOf(currentEra);
                                                if (currentEra.systemType == 1) {
                                                    self.activeUpdate(false);
                                                    self.activeDelete(false);
                                                }
                                                else {
                                                    self.activeUpdate(indexOfEraSelected > LAST_INDEX_ERA_NAME_SYTEM);
                                                    self.activeDelete(indexOfEraSelected == self.dataSource().length - 1);
                                                }
                                                self.setValueCurrentEraShow(currentEra);
                                            }
                                            ;
                                        }
                                    });
                                }
                                /**
                                 * start page
                                 */
                                ScreenModel.prototype.start_page = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    //call ws get all era
                                    //var listEraName: model.EraItem[] = [];
                                    //                for (let i = 0; i <= 3; i++) {
                                    //                    listEraName.push(new model.EraItem("code" + i, "Nam" + i, "Sb" + i, "2016/06/1" + (5 - i), true));
                                    //                }
                                    //                listEraName.push(new model.EraItem("code5", "T", "CusSb", "2018/06/25", false));
                                    //                listEraName.push(new model.EraItem("code6", "D", "222", "2018/3/28", false));
                                    self.loadEraNameList(null);
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.loadEraNameList = function (code) {
                                    var self = this;
                                    a.service.getAllEraNameItem().done(function (listEraName) {
                                        if (listEraName === undefined || listEraName.length == 0) {
                                            self.dataSource();
                                        }
                                        else {
                                            var listEraName = _.orderBy(listEraName, [function (item) { return new Date(item.startDate); }], ['asc']);
                                            self.dataSource(listEraName);
                                            if (code != null) {
                                                // focus on current item
                                                var eraNameCurrent = _.find(listEraName, function (o) { return o.eraId == code; });
                                                self.currentCode(eraNameCurrent.eraId);
                                                self.eraSelected(eraNameCurrent);
                                            }
                                            else {
                                                // focus on the last item
                                                var eraNameLast = _.last(listEraName);
                                                self.currentCode(eraNameLast.eraId);
                                                self.eraSelected(eraNameLast);
                                            }
                                            self.setValueCurrentEraShow(self.eraSelected());
                                        }
                                    });
                                };
                                ScreenModel.prototype.newItem = function () {
                                    var self = this;
                                    self.clearError();
                                    self.refreshEraShow();
                                    self.currentCode(null);
                                    self.activeUpdate(true);
                                    self.isFocus(true);
                                };
                                /**
                                 * createEra
                                 */
                                ScreenModel.prototype.createEra = function () {
                                    var self = this;
                                    blockUI.grayout();
                                    self.activeUpdate(false);
                                    var currentDate = moment(self.currentStartDate()).format('YYYY/MM/DD').toString();
                                    $('.nts-input').trigger("validate");
                                    _.defer(function () {
                                        if (!$('.nts-editor').ntsError("hasError")) {
                                            if (self.currentCode() == null) {
                                                var list = self.dataSource();
                                                var last = list[list.length - 1];
                                                console.log(last);
                                                if (currentDate > last.startDate) {
                                                    var eraNameCreate = new model.EraItem(self.currentCode(), self.currentName(), self.currentSymbol(), currentDate, 0);
                                                    a.service.saveEraName(eraNameCreate).done(function () {
                                                        blockUI.grayout();
                                                        nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                                                            blockUI.clear();
                                                            self.loadEraNameList(null);
                                                            location.reload();
                                                        });
                                                    }).always(function () { return blockUI.clear(); });
                                                }
                                                else {
                                                    nts.uk.ui.dialog.info({ messageId: "Msg_142" });
                                                    return false;
                                                }
                                            }
                                            else {
                                                var currentEraNameIndex = self.dataSource().indexOf(self.eraSelected());
                                                var preEraName = self.dataSource()[currentEraNameIndex - 1];
                                                if (currentDate <= preEraName.startDate) {
                                                    nts.uk.ui.dialog.info({ messageId: "Msg_452" });
                                                    return false;
                                                }
                                                else {
                                                    if (currentEraNameIndex != (self.dataSource().length - 1)) {
                                                        var nextEraName = self.dataSource()[currentEraNameIndex + 1];
                                                        if (currentDate >= nextEraName.startDate) {
                                                            nts.uk.ui.dialog.info({ messageId: "Msg_453" });
                                                            return false;
                                                        }
                                                        else {
                                                            var eraNameCreate = new model.EraItem(self.currentCode(), self.currentName(), self.currentSymbol(), currentDate, 0);
                                                            a.service.saveEraName(eraNameCreate).done(function () {
                                                                blockUI.grayout();
                                                                nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                                                                    blockUI.clear();
                                                                    self.loadEraNameList(self.currentCode());
                                                                });
                                                            }).always(function () { return blockUI.clear(); });
                                                        }
                                                    }
                                                    else {
                                                        var eraNameCreate = new model.EraItem(self.currentCode(), self.currentName(), self.currentSymbol(), currentDate, 0);
                                                        a.service.saveEraName(eraNameCreate).done(function () {
                                                            blockUI.grayout();
                                                            nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                                                                blockUI.clear();
                                                                self.loadEraNameList(null);
                                                            });
                                                        }).always(function () { return blockUI.clear(); });
                                                    }
                                                }
                                            }
                                        }
                                    });
                                    self.activeUpdate(true);
                                    blockUI.clear();
                                };
                                /**
                                 * deleteEra
                                 */
                                ScreenModel.prototype.deleteEra = function () {
                                    var self = this;
                                    nts.uk.ui.dialog.confirm({ messageId: 'Msg_18' }).ifYes(function () {
                                        blockUI.invisible();
                                        self.indexOfDelete(_.findIndex(self.dataSource(), function (e) {
                                            return e.eraId == self.currentCode();
                                        }));
                                        var eraNameDelete = new model.EraItem(self.currentCode(), self.currentName(), self.currentSymbol(), self.currentStartDate(), 0);
                                        console.log(eraNameDelete);
                                        a.service.deleteEraName(eraNameDelete).done(function () {
                                            blockUI.clear();
                                            nts.uk.ui.dialog.info({ messageId: "Msg_16" }).then(function () {
                                                self.loadEraNameList(null);
                                            });
                                        });
                                    }).ifNo(function () {
                                        return;
                                    });
                                };
                                ScreenModel.prototype.setValueCurrentEraShow = function (currentEra) {
                                    var self = this;
                                    self.isFocus(true);
                                    self.currentName(currentEra.eraName);
                                    self.currentSymbol(currentEra.eraSymbol);
                                    self.currentStartDate(currentEra.startDate);
                                };
                                ScreenModel.prototype.refreshEraShow = function () {
                                    var self = this;
                                    self.currentName('');
                                    self.currentSymbol('');
                                    self.currentStartDate('');
                                };
                                ScreenModel.prototype.clearError = function () {
                                    if ($('.nts-editor').ntsError("hasError")) {
                                        $('.nts-input').ntsError('clear');
                                    }
                                };
                                ScreenModel.prototype.getEraNameAfterDelete = function () {
                                    var self = this;
                                    a.service.getAllEraNameItem().done(function (listEraName) {
                                        self.dataSource(listEraName);
                                        var lastEraName = _.last(listEraName);
                                        self.currentCode(lastEraName.eraId);
                                    });
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var model;
                            (function (model) {
                                var EraItem = /** @class */ (function () {
                                    function EraItem(eraId, eraName, eraSysbol, startDate, systemType) {
                                        this.eraId = eraId;
                                        this.eraName = eraName;
                                        this.eraSymbol = eraSysbol;
                                        this.startDate = startDate;
                                        this.systemType = systemType;
                                    }
                                    return EraItem;
                                }());
                                model.EraItem = EraItem;
                            })(model = viewmodel.model || (viewmodel.model = {}));
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = cmm020.a || (cmm020.a = {}));
                })(cmm020 = view.cmm020 || (view.cmm020 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm020.a.vm.js.map