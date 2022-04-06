var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cli001;
                (function (cli001) {
                    var a;
                    (function (a) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.items = ko.observableArray([]);
                                    this.columns = ko.observableArray([
                                        { headerText: nts.uk.resource.getText(""), key: "userId", dataType: "string", hidden: true },
                                        { headerText: nts.uk.resource.getText("CLI001_12"), key: "loginId", dataType: "string", width: 120 },
                                        { headerText: nts.uk.resource.getText('CLI001_27'), key: 'companyCode', width: 80 },
                                        { headerText: nts.uk.resource.getText('CLI001_28'), key: 'employeeCode', width: 180 },
                                        { headerText: nts.uk.resource.getText("CLI001_13"), key: "userName", dataType: "string", width: 170 },
                                        { headerText: nts.uk.resource.getText("CLI001_14"), key: "lockOutDateTime", dataType: "string", width: 200 },
                                        { headerText: nts.uk.resource.getText("CLI001_15"), key: "logType", dataType: "string", width: 250,
                                            formatter: function (v) { return v == 1 ? '強制ロック' : '自動ロック'; }
                                        },
                                    ]);
                                    this.currentCodeList = ko.observableArray([]);
                                }
                                /**
                                 * Start page
                                 */
                                ScreenModel.prototype.startPage = function () {
                                    var _self = this;
                                    var dfd = $.Deferred();
                                    a.service.findAll().done(function (data) {
                                        data = _.uniqBy(data, 'userId');
                                        data.forEach(function (item) {
                                            item.lockOutDateTime = moment.utc(item.lockOutDateTime).format('YYYY/MM/DD HH:mm:ss');
                                        });
                                        _self.items(_.sortBy(data, function (item) { return item.loginId; }));
                                        dfd.resolve();
                                    }).fail(function (res) {
                                        dfd.reject();
                                    });
                                    return dfd.promise();
                                };
                                /**
                                * open dialog
                                */
                                ScreenModel.prototype.openDialogAddLockOutData = function () {
                                    var _self = this;
                                    nts.uk.ui.windows.sub.modal("/view/cli/001/b/index.xhtml").onClosed(function () {
                                        var data = nts.uk.ui.windows.getShared("dataCd001.a");
                                        if (!_.isNil(data)) {
                                            $('#tableGrid').focus();
                                            var userId = { userId: data.userID };
                                            a.service.findByUserId(data.userID).done(function (dto) {
                                                _self.items.push({ logType: dto.lockType, loginId: data.loginID, userId: dto.userId, userName: data.userName, lockOutDateTime: moment.utc(dto.logoutDateTime).format('YYYY/MM/DD HH:mm:ss') });
                                                _self.items(_.sortBy(_self.items(), function (item) { return item.loginId; }));
                                                if (!_.isEmpty($('.ntsSearchBox ')[0].value)) {
                                                    $('.search-btn').click();
                                                }
                                            });
                                        }
                                        nts.uk.ui.block.clear();
                                    });
                                };
                                /**
                                * Set focus
                                */
                                ScreenModel.prototype.setInitialFocus = function () {
                                    var self = this;
                                    if (_.isEmpty(self.items())) {
                                        $('#add-Lock').focus();
                                    }
                                    else {
                                        $('#tableGrid').focus();
                                    }
                                };
                                /**
                                * Save
                                */
                                ScreenModel.prototype.unLock = function () {
                                    var self = this;
                                    if (_.isEmpty(self.currentCodeList())) {
                                        $('#add-Lock').focus();
                                        nts.uk.ui.dialog.error({ messageId: "Msg_218", messageParams: [nts.uk.resource.getText('CLI001_25')] });
                                    }
                                    else {
                                        $('#tableGrid').focus();
                                        nts.uk.ui.dialog.confirm({ messageId: "Msg_1347" })
                                            .ifYes(function () {
                                            var command = { lstUserId: self.currentCodeList() };
                                            a.service.removeLockOutData(command).done(function () {
                                                nts.uk.ui.dialog.info({ messageId: 'Msg_221' }).then(function () {
                                                    //Search again and display the screen
                                                    a.service.findAll().done(function (data) {
                                                        data = _.uniqBy(data, 'userId');
                                                        data.forEach(function (item) {
                                                            item.lockOutDateTime = moment.utc(item.lockOutDateTime).format('YYYY/MM/DD HH:mm:ss');
                                                        });
                                                        self.items(_.sortBy(data, function (item) { return item.loginId; }));
                                                        self.currentCodeList([]);
                                                        if (_.isEmpty(self.items())) {
                                                            $('#add-Lock').focus();
                                                        }
                                                    });
                                                });
                                            });
                                        });
                                    }
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = cli001.a || (cli001.a = {}));
                })(cli001 = view.cli001 || (view.cli001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cli001.a.vm.js.map