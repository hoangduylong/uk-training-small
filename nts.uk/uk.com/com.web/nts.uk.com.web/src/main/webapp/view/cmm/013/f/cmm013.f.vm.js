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
                                    self.createNew = ko.observable(null);
                                    self.positionList = ko.observableArray([]);
                                    self.positionCode = ko.observable("");
                                    self.positionName = ko.observable("");
                                    self.order = ko.observable(0);
                                }
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    self.loadPositionList()
                                        .done(function (data) {
                                        // Update position mode
                                        self.createNew(false);
                                        self.positionList(data);
                                    })
                                        .fail(function (res) {
                                        // Create new position mode
                                        self.createNew(true);
                                        self.positionList([]);
                                    });
                                    return dfd.promise();
                                    ;
                                };
                                /* load position list */
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
                                /* create new position */
                                ScreenModel.prototype.createNewPositionMode = function () {
                                    var self = this;
                                    self.createNew(true);
                                    self.positionCode("");
                                    self.positionName("");
                                };
                                /* save position */
                                ScreenModel.prototype.save = function () {
                                    var self = this;
                                    // Validate
                                    if (!self.validate()) {
                                        return;
                                    }
                                    var newPosition = new Position(self.positionCode(), self.positionName(), self.order());
                                    if (self.createNew()) {
                                        f.service.addPosition(newPosition)
                                            .done(function (data) {
                                            self.positionList().push(newPosition);
                                            self.loadPositionList()
                                                .done(function (data) {
                                                // Update position mode
                                                self.createNew(false);
                                                self.positionList(data);
                                            })
                                                .fail(function (res) {
                                                // Create new position mode
                                                self.createNew(true);
                                                self.positionList([]);
                                            });
                                        })
                                            .fail(function (res) {
                                            self.showMessageError(res);
                                        });
                                    }
                                    else {
                                        f.service.updatePosition(newPosition);
                                    }
                                    self.updatePositionOrder()
                                        .done(function (data) {
                                    })
                                        .fail(function (res) {
                                        self.showMessageError(res);
                                    });
                                };
                                /* remove position */
                                ScreenModel.prototype.remove = function () {
                                    var self = this;
                                    if (self.positionCode() !== "") {
                                        var currentIndex_1 = null;
                                        for (var _i = 0, _a = self.positionList(); _i < _a.length; _i++) {
                                            var item = _a[_i];
                                            if (item.positionCode === self.positionCode()) {
                                                currentIndex_1 = self.positionList.indexOf(item);
                                            }
                                        }
                                        nts.uk.ui.dialog.confirm({ messageId: "Msg_18" })
                                            .ifYes(function () {
                                            f.service.removePosition(self.positionCode())
                                                .done(function (data) {
                                                self.positionList.splice(currentIndex_1, 1);
                                                self.loadPositionList()
                                                    .done(function (data) {
                                                    // Update position mode
                                                    self.createNew(false);
                                                    self.positionList(data);
                                                })
                                                    .fail(function (res) {
                                                    // Create new position mode
                                                    self.createNew(true);
                                                    self.positionList([]);
                                                });
                                            })
                                                .fail(function (res) {
                                                self.showMessageError(res);
                                            });
                                        });
                                    }
                                };
                                /* close dialog */
                                ScreenModel.prototype.close = function () {
                                    nts.uk.ui.windows.close();
                                };
                                /* validate */
                                ScreenModel.prototype.validate = function () {
                                    // clear error
                                    nts.uk.ui.errors.clearAll();
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
                                    f.service.updateOrder(positionList)
                                        .done(function (data) {
                                        dfd.resolve(data);
                                    })
                                        .fail(function (res) {
                                        dfd.reject(res);
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.showMessageError = function (res) {
                                    // check error business exception
                                    if (!res.businessException) {
                                        return;
                                    }
                                    // show error message
                                    if (Array.isArray(res.errors)) {
                                        // nts.uk.ui.dialog.bundledErrors(res);
                                    }
                                    else {
                                        // nts.uk.ui.dialog.alertError({ messageId: res.messageId, messageParams: res.parameterIds });
                                    }
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