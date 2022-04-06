// blockui all ajax request on layout
$(document)
    .ajaxStart(function () {
    $.blockUI({
        message: null,
        overlayCSS: { opacity: 0.1 }
    });
}).ajaxStop(function () {
    $.unblockUI();
});
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
                    var d;
                    (function (d) {
                        var viewmodel;
                        (function (viewmodel) {
                            var close = nts.uk.ui.windows.close;
                            var alert = nts.uk.ui.dialog.alert;
                            var getShared = nts.uk.ui.windows.getShared;
                            var setShared = nts.uk.ui.windows.setShared;
                            var block = nts.uk.ui.block;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.categoryList = ko.observableArray([]);
                                    this.currentRoleCode = ko.observable('');
                                    this.currentRole = ko.observable(getShared('personRole'));
                                    this.selectedList = ko.observableArray([]);
                                    var self = this;
                                    //            self.start();
                                }
                                ;
                                ScreenModel.prototype.start = function () {
                                    var self = this, dfd = $.Deferred(), role = ko.toJS(self.currentRole);
                                    block.grayout();
                                    self.categoryList.removeAll();
                                    d.service.getAllCategory(role.roleId).done(function (data) {
                                        if (data.length > 0) {
                                            self.categoryList(_.map(data, function (x) { return new CategoryAuth({
                                                categoryId: x.categoryId,
                                                categoryCode: x.categoryCode,
                                                categoryName: x.categoryName,
                                                selfAuth: !!x.allowPersonRef,
                                                otherAuth: !!x.allowOtherRef
                                            }); }));
                                            dfd.resolve();
                                        }
                                    }).always(function () {
                                        block.clear();
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.creatCategory = function () {
                                    var self = this, role = ko.toJS(self.currentRole), category = $("#grid").igGrid("option", "dataSource");
                                    self.update(category, role.roleId);
                                };
                                ScreenModel.prototype.closeDialog = function () {
                                    var self = this;
                                    self.isCanceled = true;
                                    setShared('isCanceled', self.isCanceled);
                                    close();
                                };
                                ScreenModel.prototype.update = function (items, roleId) {
                                    var self = this, data = _.uniqBy(items, 'categoryId'), datas = _(data)
                                        .map(function (x) {
                                        return {
                                            roleId: roleId,
                                            categoryId: x.categoryId,
                                            allowPersonRef: Number(x.selfAuth),
                                            allowOtherRef: Number(x.otherAuth)
                                        };
                                    })
                                        .value();
                                    d.service.updateCategory({ lstCategory: datas }).done(function (data) {
                                        nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                                            close();
                                        });
                                    }).fail(function (res) {
                                        alert(res.message);
                                    });
                                    self.isCanceled = false;
                                    setShared('isCanceled', self.isCanceled);
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var PersonRole = /** @class */ (function () {
                                function PersonRole(params) {
                                    this.roleId = params.roleId;
                                    this.roleCode = params.roleCode;
                                    this.roleName = params.roleName;
                                }
                                return PersonRole;
                            }());
                            viewmodel.PersonRole = PersonRole;
                            var CategoryAuth = /** @class */ (function () {
                                function CategoryAuth(param) {
                                    this.categoryId = param.categoryId;
                                    this.categoryCode = param.categoryCode;
                                    this.categoryName = param.categoryName;
                                    this.selfAuth = param.selfAuth;
                                    this.otherAuth = param.otherAuth;
                                }
                                return CategoryAuth;
                            }());
                        })(viewmodel = d.viewmodel || (d.viewmodel = {}));
                    })(d = cas001.d || (cas001.d = {}));
                })(cas001 = view.cas001 || (view.cas001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cas001.d.vm.js.map