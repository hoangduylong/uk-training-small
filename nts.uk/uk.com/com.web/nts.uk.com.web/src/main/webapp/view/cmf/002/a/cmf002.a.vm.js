var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf002;
                (function (cmf002) {
                    var a;
                    (function (a) {
                        var viewmodel;
                        (function (viewmodel) {
                            var block = nts.uk.ui.block;
                            var alertError = nts.uk.ui.dialog.alertError;
                            var jump = nts.uk.request.jump;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.setRoleAuthority([], []);
                                }
                                ScreenModel.prototype.startPage = function () {
                                    var self = this, dfd = $.Deferred();
                                    block.invisible();
                                    a.service.startMenu().done(function (data) {
                                        self.setRoleAuthority(data.inChargeRole, data.empRole);
                                        block.clear();
                                        dfd.resolve();
                                    }).fail(function (err) {
                                        alertError(err);
                                        block.clear();
                                        dfd.reject();
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.setRoleAuthority = function (inChargeRole, empRole) {
                                    var self = this;
                                    self.roleAuthority = {
                                        inChargeRole: inChargeRole,
                                        empRole: empRole
                                    };
                                };
                                /**
                                 * request to create creation screen
                                 */
                                ScreenModel.prototype.importScreen = function () {
                                    var self = this;
                                    jump("/view/cmf/002/o/index.xhtml", { roleAuthority: self.roleAuthority });
                                };
                                /**
                                 * request to create creation screen
                                 */
                                ScreenModel.prototype.settingScreen = function () {
                                    var self = this;
                                    jump("/view/cmf/002/b/index.xhtml", { roleAuthority: self.roleAuthority });
                                };
                                /**
                                 * request to reference history screen
                                 */
                                ScreenModel.prototype.referenceHistoryScreen = function () {
                                    var self = this;
                                    jump("/view/cmf/002/x/index.xhtml", { roleAuthority: self.roleAuthority });
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = cmf002.a || (cmf002.a = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.a.vm.js.map