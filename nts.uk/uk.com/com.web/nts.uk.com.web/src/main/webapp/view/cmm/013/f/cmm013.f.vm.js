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
                            var UpdatePositionCommand = f.service.model.UpdatePositionCommand;
                            var AddPositionCommand = f.service.model.AddPositionCommand;
                            var RemovePositionCommand = f.service.model.RemovePositionCommand;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.isCreateNew = ko.observable(false);
                                    self.positionList = ko.observableArray([]);
                                    self.positionCode = ko.observable("");
                                    self.positionName = ko.observable("");
                                    self.order = ko.observable(0);
                                    self.currentCode = ko.observable(null);
                                    self.currentCode.subscribe(function (selectedCode) {
                                        self.select(selectedCode);
                                        if (!_.isEmpty(selectedCode)) {
                                            nts.uk.ui.errors.clearAll();
                                        }
                                    });
                                    self.index = 0;
                                    self.positionColumns = ko.observableArray([
                                        { headerText: 'コード', key: 'positionCode', width: 70 },
                                        { headerText: '名称', key: 'positionName', width: 120 }
                                    ]);
                                    // get data
                                    self.selectNext();
                                }
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    self.loadPositionList()
                                        .done(function (data) {
                                        // Update position mode
                                        self.isCreateNew(false);
                                        self.positionList(data);
                                    })
                                        .fail(function (res) {
                                        // Create new position mode
                                        console.log("fail");
                                        //self.isCreateNew(true);
                                        self.positionList([]);
                                    });
                                    dfd.resolve();
                                    return dfd.promise();
                                    ;
                                };
                                ScreenModel.prototype.select = function (selectedCode) {
                                    var self = this;
                                    if (selectedCode) {
                                        self.positionCode(selectedCode);
                                        // Find position by position code
                                        f.service.findByPositionCode(selectedCode)
                                            .done(function (data) {
                                            if (data) {
                                                // position found
                                                console.log("position found");
                                                self.isCreateNew(false);
                                                self.positionCode(data.positionCode);
                                                self.positionName(data.positionName);
                                                self.order(data.positionOrder);
                                                //console.log(data.positionName);                      
                                            }
                                            else {
                                                // position not found
                                                console.log("position not found");
                                                /*self.positionCode("");
                                                self.positionName("");*/
                                            }
                                            // Set focus
                                            if (self.isCreateNew()) {
                                                $('#position-code').focus();
                                            }
                                            else {
                                                $('#position-code').disable();
                                                $('#position-name').focus();
                                            }
                                        })
                                            .fail(function (res) {
                                            self.showMessageError(res);
                                        });
                                    }
                                    else {
                                        // No position selected, switch to create new
                                        console.log("huhu");
                                        self.isCreateNew(true);
                                    }
                                };
                                ScreenModel.prototype.selectNext = function () {
                                    var self = this;
                                    //self.positionList()[0].positionCode;
                                };
                                // create new position mode
                                ScreenModel.prototype.createNewPositionMode = function () {
                                    var self = this;
                                    self.isCreateNew(true);
                                    self.positionCode("");
                                    self.positionName("");
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
                                ScreenModel.prototype.addPosition = function (addCommand) {
                                    var self = this;
                                    var newPosition = new Position(addCommand.positionCode, addCommand.positionName, addCommand.positionOrder);
                                    f.service.addPosition(addCommand)
                                        .done(function (data) {
                                        console.log("add success");
                                        // add new position into list in UI
                                        self.positionList().push(newPosition);
                                        self.loadPositionList()
                                            .done(function (data) {
                                            // Update position mode
                                            self.isCreateNew(false);
                                            self.positionList(data);
                                        })
                                            .fail(function (res) {
                                            // Create new position mode
                                            self.isCreateNew(true);
                                            self.positionList([]);
                                        });
                                    })
                                        .fail(function (res) {
                                        console.log("add fail");
                                        self.showMessageError(res);
                                    });
                                };
                                // save position
                                ScreenModel.prototype.save = function () {
                                    var self = this;
                                    // Validate
                                    if (!self.validate()) {
                                        return;
                                    }
                                    var addCommand = new AddPositionCommand(self.positionCode(), self.positionName(), 0);
                                    var updateCommand = new UpdatePositionCommand(self.positionCode(), self.positionName(), 0);
                                    if (self.isCreateNew()) {
                                        self.addPosition(addCommand);
                                    }
                                    else {
                                        console.log("huhu");
                                        f.service.updatePosition(updateCommand);
                                        console.log(self.positionList());
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
                                        var currentIndex_1 = null;
                                        // get the index of removed position in list
                                        for (var _i = 0, _a = self.positionList(); _i < _a.length; _i++) {
                                            var item = _a[_i];
                                            if (item.positionCode === self.positionCode()) {
                                                currentIndex_1 = self.positionList.indexOf(item);
                                            }
                                        }
                                        var removeCommand_1 = new RemovePositionCommand(self.positionCode());
                                        nts.uk.ui.dialog.confirm({ messageId: "Msg_18" })
                                            .ifYes(function () {
                                            f.service.removePosition(removeCommand_1)
                                                .done(function (data) {
                                                console.log("remove ok");
                                                self.positionList.splice(currentIndex_1, 1);
                                                console.log(self.positionList());
                                                self.loadPositionList()
                                                    .done(function (data) {
                                                    // Update position mode
                                                    self.isCreateNew(false);
                                                    self.positionList(data);
                                                })
                                                    .fail(function (res) {
                                                    // Create new position mode
                                                    self.isCreateNew(true);
                                                    self.positionList([]);
                                                });
                                            })
                                                .fail(function (res) {
                                                console.log("remove failed");
                                                //self.showMessageError(res);
                                            });
                                        });
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
                                ScreenModel.prototype.updatePositionOrder = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    var positionList = self.positionList();
                                    var order = 1;
                                    // update all position's order in list in UI side
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