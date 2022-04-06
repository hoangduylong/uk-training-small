var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cas001;
                (function (cas001) {
                    var c;
                    (function (c_1) {
                        var viewmodel;
                        (function (viewmodel) {
                            var text = nts.uk.resource.getText;
                            var close = nts.uk.ui.windows.close;
                            var dialog = nts.uk.ui.dialog;
                            var getShared = nts.uk.ui.windows.getShared;
                            var setShared = nts.uk.ui.windows.setShared;
                            var block = nts.uk.ui.block;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.roleList = ko.observableArray([]);
                                    this.roleCodeArray = [];
                                    this.roleCopy = ko.observable(getShared('currentRole'));
                                    var self = this;
                                    self.roleList.subscribe(function (data) {
                                        if (data) {
                                            $("#roles").igGrid("option", "dataSource", data);
                                        }
                                        else {
                                            $("#roles").igGrid("option", "dataSource", []);
                                        }
                                    });
                                    self.start();
                                }
                                ScreenModel.prototype.start = function () {
                                    var self = this;
                                    self.roleList.removeAll();
                                    if (self.roleCopy().roleList.length > 0) {
                                        _.each(self.roleCopy().roleList, function (c) {
                                            if (c.roleId !== self.roleCopy().personRole.roleId) {
                                                self.roleList.push(new PersonRole(c.roleId, c.roleCode, c.roleName));
                                            }
                                        });
                                    }
                                    else {
                                        dialog.alert(text('CAS001_7'));
                                    }
                                };
                                ScreenModel.prototype.createCategory = function () {
                                    var self = this, data = $("#grid0").ntsGrid("updatedCells"), objSet = { isCancel: true, id: null };
                                    self.roleCodeArray = _.map(data, function (x) { return x.rowId; });
                                    if (self.roleCodeArray.length > 0) {
                                        dialog.confirm({ messageId: "Msg_64" }).ifYes(function () {
                                            var roleObj = { roleIdDestination: self.roleCopy().personRole.roleId, roleIds: self.roleCodeArray };
                                            block.invisible();
                                            c_1.service.update(roleObj).done(function (obj) {
                                                dialog.info({ messageId: "Msg_926" }).then(function () {
                                                    objSet.id = self.roleCodeArray[0];
                                                    objSet.isCancel = false;
                                                    setShared('isCanceled', objSet);
                                                    close();
                                                });
                                            }).fail(function (res) {
                                                dialog.alert(res.message);
                                            }).always(function () {
                                                block.clear();
                                            });
                                        }).ifCancel(function () {
                                        });
                                    }
                                    else {
                                        dialog.alert({ messageId: "Msg_365" });
                                    }
                                    objSet.isCancel = false;
                                    setShared('isCanceled', objSet);
                                };
                                ScreenModel.prototype.closeDialog = function () {
                                    var self = this, objSet = {};
                                    objSet.isCancel = true;
                                    setShared('isCanceled', objSet);
                                    close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var PersonRole = /** @class */ (function () {
                                function PersonRole(roleId, roleCode, roleName) {
                                    this.check = false;
                                    this.roleId = roleId;
                                    this.roleCode = roleCode;
                                    this.roleName = roleName;
                                }
                                return PersonRole;
                            }());
                            viewmodel.PersonRole = PersonRole;
                        })(viewmodel = c_1.viewmodel || (c_1.viewmodel = {}));
                    })(c = cas001.c || (cas001.c = {}));
                })(cas001 = view.cas001 || (view.cas001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cas001.c.vm.js.map