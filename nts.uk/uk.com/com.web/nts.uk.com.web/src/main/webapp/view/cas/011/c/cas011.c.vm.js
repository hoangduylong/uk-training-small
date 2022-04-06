var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cas011;
                (function (cas011) {
                    var c;
                    (function (c) {
                        var viewmodel;
                        (function (viewmodel) {
                            var errors = nts.uk.ui.errors;
                            var dialog = nts.uk.ui.dialog;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.listDefaultRoleSets = ko.observableArray([]);
                                    this.currentDefaultRoleSet = ko.observable(new DefaultRoleSet({
                                        roleSetCd: '',
                                        roleSetName: ''
                                    }));
                                }
                                //initial screen
                                ScreenModel.prototype.start = function () {
                                    var self = this, dfd = $.Deferred(), listDefaultRoleSets = self.listDefaultRoleSets, currentDefaultRoleSet = self.currentDefaultRoleSet();
                                    errors.clearAll();
                                    listDefaultRoleSets.removeAll();
                                    c.service.getAllRoleSet().done(function (itemList) {
                                        // in case number of RoleSet is greater then 0
                                        if (itemList && itemList.length > 0) {
                                            listDefaultRoleSets(itemList);
                                            self.settingSelectedDefaultRoleSet();
                                            $('#combo-box').focus();
                                        }
                                    }).always(function () {
                                        dfd.resolve();
                                    });
                                    return dfd.promise();
                                };
                                /**
                                 * Setting selected Default Role Set
                                 */
                                ScreenModel.prototype.settingSelectedDefaultRoleSet = function () {
                                    var self = this, currentDefaultRoleSet = self.currentDefaultRoleSet(), listDefaultRoleSets = self.listDefaultRoleSets;
                                    c.service.getCurrentDefaultRoleSet().done(function (item) {
                                        // in case exist default role set
                                        if (item) {
                                            currentDefaultRoleSet.roleSetCd(item.roleSetCd);
                                            currentDefaultRoleSet.roleSetName(item.roleSetName);
                                        }
                                        else {
                                            if (listDefaultRoleSets && listDefaultRoleSets().length > 0) {
                                                currentDefaultRoleSet.roleSetCd(listDefaultRoleSets()[0].roleSetCd);
                                                currentDefaultRoleSet.roleSetName(listDefaultRoleSets()[0].roleSetName);
                                            }
                                            else {
                                                currentDefaultRoleSet.roleSetCd('');
                                                currentDefaultRoleSet.roleSetName('');
                                            }
                                        }
                                    }).fail(function (error) {
                                        currentDefaultRoleSet.roleSetCd('');
                                        currentDefaultRoleSet.roleSetName('');
                                    });
                                };
                                ScreenModel.prototype.closeDialog = function () {
                                    nts.uk.ui.windows.close();
                                };
                                /**
                                 * Request to register Default Role Set
                                 */
                                ScreenModel.prototype.addDefaultRoleSet = function () {
                                    var self = this, currentDefaultRoleSet = self.currentDefaultRoleSet();
                                    c.service.addDefaultRoleSet(ko.toJS(currentDefaultRoleSet)).done(function () {
                                        dialog.info({ messageId: "Msg_15" }).then(function () {
                                            nts.uk.ui.windows.close();
                                        });
                                    });
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var DefaultRoleSet = /** @class */ (function () {
                                function DefaultRoleSet(param) {
                                    this.roleSetCd = ko.observable('');
                                    this.roleSetName = ko.observable('');
                                    var self = this;
                                    self.roleSetCd(param.roleSetCd || '');
                                    self.roleSetName(param.roleSetName || '');
                                }
                                return DefaultRoleSet;
                            }());
                        })(viewmodel = c.viewmodel || (c.viewmodel = {}));
                    })(c = cas011.c || (cas011.c = {}));
                })(cas011 = view.cas011 || (view.cas011 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cas011.c.vm.js.map