var cli001;
(function (cli001) {
    var b;
    (function (b) {
        var viewmodel;
        (function (viewmodel) {
            var block = nts.uk.ui.block;
            var getText = nts.uk.resource.getText;
            var alertError = nts.uk.ui.dialog.alertError;
            var ScreenModel = /** @class */ (function () {
                //rows: KnockoutObservable<number> = ko.observable(20);
                function ScreenModel() {
                    this.count = 100;
                    this.items = ko.observableArray([]);
                    this.columns = ko.observableArray([
                        { key: 'userID', hidden: true },
                        { headerText: getText('CLI001_21'), key: 'loginID', width: 140 },
                        { headerText: getText('CLI001_27'), key: 'companyCD', width: 50 },
                        { headerText: getText('CLI001_28'), key: 'empCD', width: 160 },
                        { headerText: getText('CLI001_22'), key: 'userName', width: 220 },
                    ]);
                    this.searchText = ko.observable();
                    this.currentId = ko.observable();
                    //let tableHeight = (window.innerHeight - 150) >= 480 ? 480 : window.innerHeight - 150; 
                    //this.rows(Math.round(tableHeight/24));
                }
                ScreenModel.prototype.search = function () {
                    var self = this;
                    self.searchText(self.searchText().trim());
                    if (_.isEmpty(self.searchText())) {
                        nts.uk.ui.dialog.error({ messageId: "Msg_438", messageParams: [getText('CLI001_16')] });
                        return;
                    }
                    block.invisible();
                    b.service.findUserByUserIDName(self.searchText()).done(function (data) {
                        self.items(data);
                    }).fail(function (error) {
                        alertError(error);
                    }).always(function () {
                        block.clear();
                    });
                };
                ScreenModel.prototype.lockData = function () {
                    var self = this;
                    if (_.isEmpty(self.currentId())) {
                        nts.uk.ui.dialog.error({ messageId: "Msg_218", messageParams: [getText('CLI001_26')] });
                        return;
                    }
                    block.invisible();
                    b.service.lockUserByID(self.currentId()).done(function (data) {
                        nts.uk.ui.windows.setShared("dataCd001.a", data);
                        nts.uk.ui.windows.close();
                    }).fail(function (error) {
                        alertError(error);
                    }).always(function () {
                        block.clear();
                    });
                };
                ScreenModel.prototype.cancel = function () {
                    nts.uk.ui.windows.close();
                };
                return ScreenModel;
            }());
            viewmodel.ScreenModel = ScreenModel;
            var ItemModel = /** @class */ (function () {
                function ItemModel(userID, loginID, companyId, employeeId, userName) {
                    this.userID = userID;
                    this.loginID = loginID;
                    this.companyCD = companyId;
                    this.empCD = employeeId;
                    this.userName = userName;
                }
                return ItemModel;
            }());
        })(viewmodel = b.viewmodel || (b.viewmodel = {}));
    })(b = cli001.b || (cli001.b = {}));
})(cli001 || (cli001 = {}));
//# sourceMappingURL=cli001.b.vm.js.map