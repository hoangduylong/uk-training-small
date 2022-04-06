var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm011;
                (function (cmm011) {
                    var v2;
                    (function (v2) {
                        var c;
                        (function (c) {
                            var viewmodel;
                            (function (viewmodel) {
                                var getText = nts.uk.resource.getText;
                                var setShared = nts.uk.ui.windows.setShared;
                                var getShared = nts.uk.ui.windows.getShared;
                                var alertError = nts.uk.ui.dialog.alertError;
                                var ScreenModel = /** @class */ (function () {
                                    function ScreenModel() {
                                        this.screenMode = 0;
                                        var self = this;
                                        self.inputList = ko.observableArray([]);
                                        var params = getShared("CMM011DParams");
                                        if (params) {
                                            self.screenMode = params.initMode;
                                            self.inputList(params.listDuplicate);
                                            self.inputList(_.orderBy(self.inputList(), ['date'], ['desc']));
                                        }
                                        self.itemList = ko.observableArray([
                                            new BoxModel(CREATE_METHOD.CREATE_NEW, self.screenMode == SCREEN_MODE.WORKPLACE ? getText('CMM011_208') : getText('CMM011_308')),
                                            new BoxModel(CREATE_METHOD.RECOVER_PAST, self.screenMode == SCREEN_MODE.WORKPLACE ? getText('CMM011_209') : getText('CMM011_309'))
                                        ]);
                                        self.createMethod = ko.observable(CREATE_METHOD.RECOVER_PAST);
                                        //Grid list columns
                                        self.listColums = ko.observableArray([
                                            { headerText: 'historyId', key: 'historyId', hidden: true },
                                            { headerText: getText('CMM011_130'), key: 'targetCode', width: 100, formatter: _.escape },
                                            { headerText: getText('CMM011_131'), key: 'targetName', width: 150, formatter: _.escape },
                                            { headerText: getText('CMM011_132'), key: 'deleteDate', width: 100, format: 'YYYY/MM/DD', formatter: _.escape }
                                        ]);
                                        this.targetHistId = ko.observable(null);
                                    }
                                    ScreenModel.prototype.create = function () {
                                        var self = this;
                                        if (self.createMethod() == CREATE_METHOD.CREATE_NEW) {
                                            setShared("CMM011CParams", { targetId: null, historyId: null });
                                            nts.uk.ui.windows.close();
                                        }
                                        else if (self.targetHistId()) {
                                            var item = _.find(self.inputList(), function (x) { return x.historyId == self.targetHistId(); });
                                            setShared("CMM011CParams", {
                                                targetId: item.targetId,
                                                historyId: item.historyId
                                            });
                                            nts.uk.ui.windows.close();
                                        }
                                        else {
                                            alertError({ messageId: "Msg_1504" });
                                        }
                                    };
                                    ScreenModel.prototype.close = function () {
                                        nts.uk.ui.windows.close();
                                    };
                                    return ScreenModel;
                                }());
                                viewmodel.ScreenModel = ScreenModel;
                                var CREATE_METHOD;
                                (function (CREATE_METHOD) {
                                    CREATE_METHOD[CREATE_METHOD["CREATE_NEW"] = 1] = "CREATE_NEW";
                                    CREATE_METHOD[CREATE_METHOD["RECOVER_PAST"] = 2] = "RECOVER_PAST";
                                })(CREATE_METHOD || (CREATE_METHOD = {}));
                                var SCREEN_MODE;
                                (function (SCREEN_MODE) {
                                    SCREEN_MODE[SCREEN_MODE["WORKPLACE"] = 0] = "WORKPLACE";
                                    SCREEN_MODE[SCREEN_MODE["DEPARTMENT"] = 1] = "DEPARTMENT";
                                })(SCREEN_MODE || (SCREEN_MODE = {}));
                                var BoxModel = /** @class */ (function () {
                                    function BoxModel(id, name) {
                                        var self = this;
                                        self.id = id;
                                        self.name = name;
                                    }
                                    return BoxModel;
                                }());
                                var InputItems = /** @class */ (function () {
                                    function InputItems(targetId, code, name, date, historyId) {
                                        this.targetId = targetId;
                                        this.targetCode = code;
                                        this.targetName = name;
                                        this.deleteDate = date;
                                        this.historyId = historyId;
                                    }
                                    return InputItems;
                                }());
                            })(viewmodel = c.viewmodel || (c.viewmodel = {}));
                        })(c = v2.c || (v2.c = {}));
                    })(v2 = cmm011.v2 || (cmm011.v2 = {}));
                })(cmm011 = view.cmm011 || (view.cmm011 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm011.v2.c.vm.js.map