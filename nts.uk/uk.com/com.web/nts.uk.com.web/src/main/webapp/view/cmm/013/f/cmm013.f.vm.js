var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm013;
                (function (cmm013) {
                    var f;
                    (function (f) {
                        var viewmodel;
                        (function (viewmodel) {
                            var Position = cmm013.base.Position;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.isCreateNew = ko.observable(null);
                                    self.positionList = ko.observableArray([]);
                                    self.positionCode = ko.observable("");
                                    self.positionName = ko.observable("");
                                    self.order = ko.observable(0);
                                    self.currentCode = ko.observable(null);
                                    self.currentCode.subscribe(function (newValue) {
                                        self.select(newValue);
                                        if (!_.isEmpty(newValue)) {
                                            nts.uk.ui.errors.clearAll();
                                        }
                                    });
                                    self.index = 0;
                                    self.positionColumns = ko.observableArray([
                                        { headerText: 'コード', key: 'positionCode', width: 70 },
                                        { headerText: '名称', key: 'positionName', width: 120 }
                                    ]);
                                    // get data
                                    self.loadPositionList2();
                                }
                                ScreenModel.prototype.select = function (selectedValue) {
                                    var self = this;
                                    if (selectedValue) {
                                        self.positionCode(selectedValue);
                                        // Find sequence by sequence code
                                        /*service.findByPositionCode(newValue)
                                            .done((data: Position) => {
                                                if (data) {
                                                    // Found sequence
                                                    self.isCreateNew(false);
                                                    self.positionCode(data.positionCode);
                                                    self.positionName(data.positionName);
                                                    self.order(data.order);
                                                } else {
                                                    // Sequence not found
                                                    self.positionCode("");
                                                    self.positionName("");
                                                }
                                                // Set focus
                                                if (self.isCreateNew()) {
                                                    $('#position-code').focus();
                                                } else {
                                                    $('#position-name').focus();
                                                }
                                            })
                                            .fail((res: any) => {
                                                self.showMessageError(res);
                                            });*/
                                    }
                                    else {
                                        // No position selected, switch to create new
                                        self.isCreateNew(true);
                                    }
                                };
                                ScreenModel.prototype.loadPositionList2 = function () {
                                    var self = this;
                                    for (var i = 0; i < 20; i++) {
                                        self.positionList.push(new Position("" + i, "基本給", 0));
                                        console.log("fake data success");
                                    }
                                };
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    //var dfd = $.Deferred<void>();
                                    /*self.loadPositionList2()
                                        .done((data: Position[]) => {
                                            // Update position mode
                                            self.createNew(false);
                                            self.positionList(data);
                                        })
                                        .fail((res: any) => {
                                            // Create new position mode
                                            self.createNew(true);
                                            self.positionList([]);
                                        })*/
                                    dfd.resolve();
                                    return dfd.promise();
                                    ;
                                };
                                // load position list
                                ScreenModel.prototype.loadPositionList = function () {
                                    var dfd = $.Deferred();
                                    f.service.findAllPosition()
                                        .done(function (data) {
                                        dfd.resolve(data);
                                    })
                                        .fail(function (res) {
                                        dfd.reject(res);
                                    });
                                    return dfd.promise();
                                };
                                // create new position mode
                                ScreenModel.prototype.createNewPositionMode = function () {
                                    var self = this;
                                    self.isCreateNew(true);
                                    self.positionCode("");
                                    self.positionName("");
                                };
                                ScreenModel.prototype.addPosition = function (newPosition) {
                                    var self = this;
                                    // add new position into list in UI
                                    self.positionList().push(newPosition);
                                    /*service.addPosition(newPosition)
                                        .done((data: any) => {
                                            self.positionList().push(newPosition);
                                            self.loadPositionList2()
                                                .done((data: Position[]) => {
                                                    // Update position mode
                                                    self.isCreateNew(false);
                                                    self.positionList(data);
                                                })
                                                .fail((res: any) => {
                                                    // Create new position mode
                                                    self.isCreateNew(true);
                                                    //self.positionList([]);
                                                })
                                        })
                                        .fail((res: any) => {
                                            self.showMessageError(res);
                                        })*/
                                };
                                // save position
                                ScreenModel.prototype.save = function () {
                                    var self = this;
                                    // Validate
                                    /*if (!self.validate()) {
                                        return;
                                    }*/
                                    var newPosition = new Position(self.positionCode(), self.positionName(), 0);
                                    if (self.isCreateNew()) {
                                        console.log(newPosition);
                                        // self.loadPositionList();
                                        self.addPosition(newPosition);
                                        console.log(self.positionList());
                                    }
                                    else {
                                        console.log("huhu");
                                        f.service.updatePosition(newPosition);
                                    }
                                    self.updatePositionOrder()
                                        .done(function (data) {
                                    })
                                        .fail(function (res) {
                                        self.showMessageError(res);
                                    });
                                };
                                ScreenModel.prototype.changeToUpdateMode = function () {
                                    var self = this;
                                    self.isCreateNew(false);
                                };
                                // remove position
                                ScreenModel.prototype.remove = function () {
                                    var self = this;
                                    if (self.positionCode() !== "") {
                                        var currentIndex = null;
                                        // get the index of removed position in list
                                        for (var _i = 0, _a = self.positionList(); _i < _a.length; _i++) {
                                            var item = _a[_i];
                                            if (item.positionCode === self.positionCode()) {
                                                currentIndex = self.positionList.indexOf(item);
                                            }
                                        }
                                        self.positionList.splice(currentIndex, 1);
                                        console.log(self.positionList());
                                        /*nts.uk.ui.dialog.confirm({ messageId: "Msg_18" })
                                            .ifYes(() => {
                                                service.removePosition(self.positionCode())
                                                    .done((data: any) => {
                                                        self.positionList.splice(currentIndex, 1);
                                                        self.loadPositionList()
                                                            .done((data: Position[]) => {
                                                                // Update position mode
                                                                self.createNew(false);
                                                                self.positionList(data);
                                                            })
                                                            .fail((res: any) => {
                                                                // Create new position mode
                                                                self.createNew(true);
                                                                self.positionList([]);
                                                            })
                                                    })
                                                    .fail((res: any) => {
                                                        self.showMessageError(res);
                                                    })
                                            });*/
                                    }
                                    else {
                                        console.log("huhu");
                                    }
                                    self.updatePositionOrder()
                                        .done(function (data) {
                                    })
                                        .fail(function (res) {
                                        self.showMessageError(res);
                                    });
                                };
                                // close dialog
                                ScreenModel.prototype.close = function () {
                                    nts.uk.ui.windows.close();
                                };
                                // validate
                                ScreenModel.prototype.validate = function () {
                                    // clear error
                                    nts.uk.ui.errors.clearAll();
                                    $('#position-code').ntsEditor('validate');
                                    $('#position-name').ntsEditor('validate');
                                    return !$('.nts-input').ntsError('hasError');
                                };
                                ScreenModel.prototype.updatePositionOrder = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    var positionList = self.positionList();
                                    var order = 1;
                                    /* update all position's order in list in UI side */
                                    for (var _i = 0, positionList_1 = positionList; _i < positionList_1.length; _i++) {
                                        var position = positionList_1[_i];
                                        position.order = order;
                                        order++;
                                    }
                                    console.log(self.positionList());
                                    /*service.updateOrder(positionList)
                                        .done((data: any) => {
                                            dfd.resolve(data);
                                        })
                                        .fail((res: any) => {
                                            dfd.reject(res);
                                        });*/
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.showMessageError = function (res) {
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = f.viewmodel || (f.viewmodel = {}));
                    })(f = cmm013.f || (cmm013.f = {}));
                })(cmm013 = view.cmm013 || (view.cmm013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm013.f.vm.js.map