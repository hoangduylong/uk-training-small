var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm049;
                (function (cmm049) {
                    var b;
                    (function (b) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.listFunctionID = [];
                                    var _self = this;
                                    _self.items = ko.observableArray([]);
                                    _self.userInfoItemName = ko.observable("");
                                    _self.columns = ko.observableArray([
                                        { headerText: nts.uk.resource.getText(""), key: 'code', width: 250, hidden: true },
                                        { headerText: nts.uk.resource.getText("CMM049_21"), key: 'name', width: 250 }
                                    ]);
                                    _self.currentCodeList = ko.observableArray([]);
                                }
                                /**
                                 * Start page
                                 */
                                ScreenModel.prototype.startPage = function () {
                                    var _self = this;
                                    var dfd = $.Deferred();
                                    var dataObject = nts.uk.ui.windows.getShared("CMM049_DIALOG_B_INPUT_DATA");
                                    _self.settingItem = dataObject.userInfo;
                                    _self.bindingData(dataObject).done(function () {
                                        dfd.resolve();
                                    });
                                    return dfd.promise();
                                };
                                /**
                                * Binding data
                                */
                                ScreenModel.prototype.bindingData = function (dataObject) {
                                    var _self = this;
                                    var dfd = $.Deferred();
                                    _self.userInfoItemName(dataObject.userInfoItemName);
                                    _self.loadListMailFunction(dataObject.listMailFunction);
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                /**
                               * load data UI
                               */
                                ScreenModel.prototype.loadListMailFunction = function (list) {
                                    var _self = this;
                                    if (list) {
                                        var mapped = _.map(list.mailFunctionDto, function (item) { return new ItemModel(item.functionId, item.functionName); });
                                        _self.items(mapped);
                                        //compare and check items in list
                                        _self.checkAlgorthm(list);
                                    }
                                };
                                /**
                                 * Close
                                 */
                                ScreenModel.prototype.close = function () {
                                    nts.uk.ui.windows.close();
                                };
                                /**
                                 * save
                                 */
                                ScreenModel.prototype.save = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    var listOfSendMailFunction = [];
                                    self.listFunctionID.forEach(function (item) {
                                        if (self.currentCodeList().length <= 0) {
                                            listOfSendMailFunction.push({
                                                functionId: item,
                                                sendSetting: SendSetting.CAN_NOT_EDIT
                                            });
                                        }
                                        else {
                                            var check = _.filter(self.currentCodeList(), function (o) { return o == item; });
                                            if (check.length > 0) {
                                                listOfSendMailFunction.push({
                                                    functionId: item,
                                                    sendSetting: SendSetting.CAN_EDIT
                                                });
                                            }
                                            else {
                                                listOfSendMailFunction.push({
                                                    functionId: item,
                                                    sendSetting: SendSetting.CAN_NOT_EDIT
                                                });
                                            }
                                        }
                                    });
                                    var data = {
                                        mailDestinationFunctionDto: {
                                            settingItem: self.settingItem,
                                            sendByFunctionSetting: listOfSendMailFunction
                                        }
                                    };
                                    b.service.saveMailDestinationFunction(data).done(function () {
                                        nts.uk.ui.windows.close();
                                        dfd.resolve();
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.checkAlgorthm = function (data) {
                                    var self = this;
                                    var listOfMailFunction = [];
                                    data.mailFunctionDto.forEach(function (item, index) {
                                        self.listFunctionID.push(item.functionId);
                                    });
                                    if (data.mailDestinationFunctionDto) {
                                        data.mailFunctionDto.forEach(function (item, index) {
                                            listOfMailFunction.push(item.functionId);
                                        });
                                        data.mailDestinationFunctionDto.sendByFunctionSetting.forEach(function (item, index) {
                                            if (item.sendSetting == SendSetting.CAN_EDIT) {
                                                var returnArray = _.find(listOfMailFunction, function (o) {
                                                    return o == item.functionId;
                                                });
                                                if (returnArray) {
                                                    self.currentCodeList.push(item.functionId);
                                                }
                                            }
                                        });
                                    }
                                    else {
                                        self.currentCodeList([]);
                                    }
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var ItemModel = /** @class */ (function () {
                                function ItemModel(code, name) {
                                    this.code = code;
                                    this.name = name;
                                }
                                return ItemModel;
                            }());
                            var SendMailFunction = /** @class */ (function () {
                                function SendMailFunction(functionId, sendSetting) {
                                    this.functionId = functionId;
                                    this.sendSetting = sendSetting;
                                }
                                return SendMailFunction;
                            }());
                            var SendSetting;
                            (function (SendSetting) {
                                SendSetting[SendSetting["CAN_NOT_EDIT"] = 0] = "CAN_NOT_EDIT";
                                SendSetting[SendSetting["CAN_EDIT"] = 1] = "CAN_EDIT";
                            })(SendSetting = viewmodel.SendSetting || (viewmodel.SendSetting = {}));
                            var UserInfoItem;
                            (function (UserInfoItem) {
                                UserInfoItem[UserInfoItem["COMPANY_PC_MAIL"] = 0] = "COMPANY_PC_MAIL";
                                UserInfoItem[UserInfoItem["PERSONAL_PC_MAIL"] = 1] = "PERSONAL_PC_MAIL";
                                UserInfoItem[UserInfoItem["COMPANY_MOBILE_MAIL"] = 2] = "COMPANY_MOBILE_MAIL";
                                UserInfoItem[UserInfoItem["PERSONAL_MOBILE_MAIL"] = 3] = "PERSONAL_MOBILE_MAIL";
                                UserInfoItem[UserInfoItem["COMPANY_MOBILE_PHONE"] = 4] = "COMPANY_MOBILE_PHONE";
                                UserInfoItem[UserInfoItem["PERSONAL_MOBILE_PHONE"] = 5] = "PERSONAL_MOBILE_PHONE";
                                UserInfoItem[UserInfoItem["PASSWORD"] = 6] = "PASSWORD";
                            })(UserInfoItem = viewmodel.UserInfoItem || (viewmodel.UserInfoItem = {}));
                        })(viewmodel = b.viewmodel || (b.viewmodel = {}));
                    })(b = cmm049.b || (cmm049.b = {}));
                })(cmm049 = view.cmm049 || (view.cmm049 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm049.b.vm.js.map