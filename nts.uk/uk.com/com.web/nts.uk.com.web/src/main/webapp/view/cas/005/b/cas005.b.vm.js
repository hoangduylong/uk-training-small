var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var csa005;
                (function (csa005) {
                    var b;
                    (function (b) {
                        var block = nts.uk.ui.block;
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.newRoleCode = ko.observable("");
                                    self.newRoleName = ko.observable("");
                                    //checker
                                    self.checked = ko.observable(false);
                                    self.enable = ko.observable(true);
                                    self.roleCode = ko.observable("");
                                    self.roleName = ko.observable("");
                                    //
                                    self.objCommandScreenB = ko.observable(null);
                                    self.copyRoleCas005Command = ko.observable(null);
                                    var param = nts.uk.ui.windows.getShared("openB");
                                    if (param != null) {
                                        self.objCommandScreenB(param);
                                        self.roleCode(self.objCommandScreenB().roleCode);
                                        self.roleName(self.objCommandScreenB().name);
                                    }
                                }
                                /**
                                 * functiton start page
                                 */
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    dfd.resolve();
                                    return dfd.promise();
                                }; //end start page
                                ScreenModel.prototype.closeDialog = function () {
                                    nts.uk.ui.windows.close();
                                };
                                //btn copy role cas005
                                ScreenModel.prototype.buttonCopy = function () {
                                    var self = this;
                                    $("#newRoleName").trigger("validate");
                                    if (!$(".nts-input").ntsError("hasError")) {
                                        if (self.newRoleCode()) {
                                            self.objCommandScreenB().roleCode = self.newRoleCode();
                                            self.objCommandScreenB().name = self.newRoleName();
                                            self.copyRoleCas005Command(new model.CopyRoleCas005Command(self.objCommandScreenB(), self.checked()));
                                            self.copyRoleCas005(self.copyRoleCas005Command());
                                        }
                                        else {
                                            $("#newRoleCode").focus();
                                        }
                                    }
                                };
                                // 
                                ScreenModel.prototype.copyRoleCas005 = function (copyRoleCas005Command) {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    block.invisible();
                                    b.service.copyRoleCas005(copyRoleCas005Command).done(function (data) {
                                        nts.uk.ui.dialog.info({ messageId: "Msg_20" }).then(function () {
                                            nts.uk.ui.windows.setShared("closeB", self.newRoleCode());
                                            nts.uk.ui.windows.close();
                                        });
                                        dfd.resolve(data);
                                    }).fail(function (res) {
                                        dfd.reject();
                                        nts.uk.ui.dialog.alertError(res.message).then(function () { nts.uk.ui.block.clear(); });
                                    }).always(function () {
                                        block.clear();
                                    });
                                    dfd.resolve();
                                };
                                return ScreenModel;
                            }()); //end screenModel
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = b.viewmodel || (b.viewmodel = {})); //end viewmodel
                        //module model
                        var model;
                        (function (model) {
                            /**
                             * class Role
                             */
                            var CopyRoleCas005Command = /** @class */ (function () {
                                function CopyRoleCas005Command(roleCas005Command, checkUpdate) {
                                    this.roleCas005Command = roleCas005Command;
                                    this.checkUpdate = checkUpdate;
                                }
                                return CopyRoleCas005Command;
                            }()); //end class Role
                            model.CopyRoleCas005Command = CopyRoleCas005Command;
                        })(model = b.model || (b.model = {})); //end module model
                    })(b = csa005.b || (csa005.b = {}));
                })(csa005 = view.csa005 || (view.csa005 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {})); //end module
//# sourceMappingURL=cas005.b.vm.js.map