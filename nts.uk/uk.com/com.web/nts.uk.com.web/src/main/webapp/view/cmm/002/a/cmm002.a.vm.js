var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm002;
                (function (cmm002) {
                    var a;
                    (function (a) {
                        var block = nts.uk.ui.block;
                        var getText = nts.uk.resource.getText;
                        var dialog = nts.uk.ui.dialog;
                        var errors = nts.uk.ui.errors;
                        var ViewModel = /** @class */ (function () {
                            function ViewModel() {
                                this.accessLimitUseAtr = ko.observable(0);
                                this.accessLimitUseAtrList = _.orderBy(__viewContext.enums.NotUseAtr, ['value'], ['desc']);
                                this.ipInputTypeList = _.orderBy(__viewContext.enums.IPAddressRegistrationFormat, ['value'], ['asc']);
                                this.allowedIPAddressList = ko.observableArray([]);
                                this.allowedIPAddress = new AllowedIPAddress();
                                this.selectedAllowedIPAddress = ko.observable('');
                                this.columns = ko.observableArray([
                                    { headerText: getText('CMM002_5'), key: 'id', width: 150 }
                                ]);
                                this.currentIpText = ko.observable();
                                this.currentIpAddress = null;
                                var self = this;
                                self.selectedAllowedIPAddress.subscribe(function (value) {
                                    if (value != "") {
                                        self.allowedIPAddress.update(_.find(self.allowedIPAddressList(), ['id', value]));
                                        $('input').ntsError('check');
                                    }
                                    else {
                                        self.allowedIPAddress.update(ko.toJS(new AllowedIPAddress()));
                                    }
                                });
                            }
                            ;
                            /** start page */
                            ViewModel.prototype.start = function () {
                                var self = this;
                                var dfd = $.Deferred();
                                self.getData().done(function () {
                                    if (self.allowedIPAddressList().length != 0) {
                                        self.selectedAllowedIPAddress(self.allowedIPAddressList()[0].id);
                                    }
                                    dfd.resolve();
                                }).fail(function () {
                                    dfd.reject();
                                });
                                return dfd.promise();
                            };
                            /** Get Data */
                            ViewModel.prototype.getData = function () {
                                var self = this;
                                var dfd = $.Deferred();
                                block.invisible();
                                a.service.getData().done(function (data) {
                                    self.accessLimitUseAtr(data.accessLimitUseAtr);
                                    var tg = [];
                                    _.forEach(data.whiteList, function (item) {
                                        tg.push(new AllowedIPAddressDto(item));
                                    });
                                    self.allowedIPAddressList(_.orderBy(tg, ['startAddress.net1', 'startAddress.net2', 'startAddress.host1', 'startAddress.host2', 'endAddress.net1', 'endAddress.net2', 'endAddress.host1', 'endAddress.host2'], ['asc', 'asc', 'asc', 'asc', 'asc', 'asc', 'asc', 'asc']));
                                    self.currentIpText(nts.uk.text.format(getText("CMM002_13"), data.userIpAddress));
                                    var ipParts = data.userIpAddress.split('.');
                                    self.currentIpAddress = new AllowedIPAddress({
                                        ipInputType: 0,
                                        startAddress: new IPAddressSetting(ipParts),
                                        endAddress: undefined,
                                        comment: undefined
                                    });
                                    dfd.resolve();
                                }).fail(function (error) {
                                    dfd.reject();
                                    dialog.alertError({ messageId: error.messageId });
                                }).always(function () {
                                    block.clear();
                                });
                                return dfd.promise();
                            };
                            ViewModel.prototype.newIp = function () {
                                var self = this;
                                self.selectedAllowedIPAddress('');
                                self.selectedAllowedIPAddress.valueHasMutated();
                                errors.clearAll();
                            };
                            ViewModel.prototype.save = function () {
                                var self = this;
                                $('input').ntsError('check');
                                if (!errors.hasError()) {
                                    if (self.selectedAllowedIPAddress() == '') {
                                        block.invisible();
                                        var param = {
                                            accessLimitUseAtr: self.accessLimitUseAtr(),
                                            allowedIPAddress: ko.toJS(self.allowedIPAddress),
                                            ipAddressToCheck: ko.toJS(self.currentIpAddress)
                                        };
                                        a.service.add(param).done(function () {
                                            self.getData().done(function () {
                                                self.selectedAllowedIPAddress(new AllowedIPAddressDto(ko.toJS(self.allowedIPAddress)).id);
                                            });
                                            dialog.info({ messageId: "Msg_15" });
                                        }).fail(function (error) {
                                            dialog.alertError({ messageId: error.messageId });
                                            block.clear();
                                        });
                                    }
                                    else {
                                        block.invisible();
                                        var param = {
                                            accessLimitUseAtr: self.accessLimitUseAtr(),
                                            allowedIPAddressNew: ko.toJS(self.allowedIPAddress),
                                            allowedIPAddressOld: _.find(self.allowedIPAddressList(), ['id', self.selectedAllowedIPAddress()]),
                                            ipAddressToCheck: ko.toJS(self.currentIpAddress)
                                        };
                                        a.service.update(param).done(function () {
                                            self.getData().done(function () {
                                                self.selectedAllowedIPAddress(new AllowedIPAddressDto(ko.toJS(self.allowedIPAddress)).id);
                                            });
                                            dialog.info({ messageId: "Msg_15" });
                                        }).fail(function (error) {
                                            dialog.alertError({ messageId: error.messageId });
                                            block.clear();
                                        });
                                    }
                                }
                            };
                            ViewModel.prototype.del = function () {
                                var self = this;
                                if (self.selectedAllowedIPAddress() != '') {
                                    dialog.confirm({ messageId: 'Msg_18' }).ifYes(function () {
                                        block.invisible();
                                        var param = {
                                            accessLimitUseAtr: self.accessLimitUseAtr(),
                                            ipAddress: _.find(self.allowedIPAddressList(), ['id', self.selectedAllowedIPAddress()]),
                                            ipAddressToCheck: ko.toJS(self.currentIpAddress)
                                        };
                                        var index = _.findIndex(self.allowedIPAddressList(), ['id', self.selectedAllowedIPAddress()]);
                                        a.service.del(param).done(function () {
                                            self.getData().done(function () {
                                                if (self.allowedIPAddressList().length == 0) {
                                                    self.selectedAllowedIPAddress('');
                                                }
                                                else {
                                                    if (index < 1) {
                                                        self.selectedAllowedIPAddress(self.allowedIPAddressList()[0].id);
                                                    }
                                                    else {
                                                        self.selectedAllowedIPAddress(self.allowedIPAddressList()[index - 1].id);
                                                    }
                                                }
                                            });
                                            dialog.info({ messageId: "Msg_16" });
                                        }).fail(function (error) {
                                            dialog.alertError({ messageId: error.messageId });
                                        }).always(function () {
                                            block.clear();
                                        });
                                    });
                                }
                            };
                            return ViewModel;
                        }());
                        a.ViewModel = ViewModel;
                        var AllowedIPAddressDto = /** @class */ (function () {
                            function AllowedIPAddressDto(param) {
                                var self = this;
                                self.startAddress = param.startAddress;
                                self.ipInputType = param.ipInputType;
                                self.endAddress = param.endAddress;
                                self.comment = param.comment;
                                self.id = param.startAddress.net1 + '.' +
                                    param.startAddress.net2 + '.' +
                                    param.startAddress.host1 + '.' +
                                    param.startAddress.host2;
                                if (param.ipInputType === 1) {
                                    self.id += '～' +
                                        param.endAddress.net1 + '.' +
                                        param.endAddress.net2 + '.' +
                                        param.endAddress.host1 + '.' +
                                        param.endAddress.host2;
                                }
                            }
                            return AllowedIPAddressDto;
                        }());
                        var AllowedIPAddress = /** @class */ (function () {
                            function AllowedIPAddress(param) {
                                /** IPアドレスの登録形式 */
                                this.ipInputType = ko.observable(0);
                                /** 開始アドレス */
                                this.startAddress = new IPAddressSetting();
                                /** 終了アドレス */
                                this.endAddress = new IPAddressSetting();
                                /** 備考 */
                                this.comment = ko.observable('');
                                var self = this;
                                if (param) {
                                    self.ipInputType = ko.observable(param.ipInputType);
                                    self.startAddress = param.startAddress;
                                    self.endAddress = param.endAddress;
                                    self.comment = param.comment;
                                }
                                self.ipInputType.subscribe(function (item) {
                                    if (item == 0) {
                                        $('.endIP input').ntsError('clear');
                                    }
                                });
                            }
                            AllowedIPAddress.prototype.update = function (data) {
                                var self = this;
                                if (data) {
                                    self.ipInputType(data.ipInputType);
                                    self.startAddress.update(data.startAddress);
                                    self.endAddress.update(data.endAddress);
                                    self.comment(data.comment);
                                }
                            };
                            return AllowedIPAddress;
                        }());
                        var IPAddressSetting = /** @class */ (function () {
                            function IPAddressSetting(param) {
                                /** IPアドレス1 */
                                this.net1 = ko.observable('');
                                /** IPアドレス2 */
                                this.net2 = ko.observable('');
                                /** IPアドレス3 */
                                this.host1 = ko.observable('');
                                /** IPアドレス4 */
                                this.host2 = ko.observable('');
                                var self = this;
                                if (!!param) {
                                    self.net1 = ko.observable(param[0]);
                                    self.net2 = ko.observable(param[1]);
                                    self.host1 = ko.observable(param[2]);
                                    self.host2 = ko.observable(param[3]);
                                }
                            }
                            IPAddressSetting.prototype.update = function (data) {
                                var self = this;
                                self.net1(data ? data.net1 : '');
                                self.net2(data ? data.net2 : '');
                                self.host1(data ? data.host1 : '');
                                self.host2(data ? data.host2 : '');
                            };
                            return IPAddressSetting;
                        }());
                    })(a = cmm002.a || (cmm002.a = {}));
                })(cmm002 = view.cmm002 || (view.cmm002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm002.a.vm.js.map