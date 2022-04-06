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
                    var v1;
                    (function (v1) {
                        var viewmodel;
                        (function (viewmodel) {
                            var block = nts.uk.ui.block;
                            var alertError = nts.uk.ui.dialog.alertError;
                            var setShared = nts.uk.ui.windows.setShared;
                            var getShared = nts.uk.ui.windows.getShared;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.listCategoryItem = ko.observableArray([]);
                                    this.currentCode = ko.observable('');
                                    this.hasData = true;
                                    var self = this;
                                    self.selectedCategoryCode = ko.observable(new Category('', 0, '', 0, 0, 0, 0, 0, '', '', 0, true));
                                    var params = getShared("CMF002_V_PARAMS");
                                    if (params.categoryId !== '') {
                                        self.currentCode(params.categoryId);
                                    }
                                    self.roleAuthority = params.roleAuthority;
                                    self.currentCode.subscribe(function (categoryId) {
                                        var getCategoryId = _.find(self.listCategoryItem(), function (x) { return x.categoryId == categoryId; });
                                        self.selectedCategoryCode(getCategoryId);
                                    });
                                }
                                ScreenModel.prototype.start = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    block.invisible();
                                    v1.service.getCategory(self.roleAuthority).done(function (data) {
                                        if (data && data.length) {
                                            self.hasData = true;
                                            var sortCategory = _.sortBy(data, ['categoryId']);
                                            sortCategory.forEach(function (x) { return self.listCategoryItem.push(x); });
                                            if (self.currentCode() == '') {
                                                self.currentCode(self.listCategoryItem()[0].categoryId);
                                            }
                                            var params_1 = getShared("CMF002_V_PARAMS");
                                            if (!_.isEmpty(params_1)) {
                                                var getCategoryId = _.find(self.listCategoryItem(), function (x) { return x.categoryId == params_1.categoryId; });
                                                if (!_.isEmpty(getCategoryId))
                                                    self.selectedCategoryCode(getCategoryId);
                                            }
                                        }
                                        else {
                                            self.hasData = false;
                                            //alertError({ messageId: "Msg_656" });
                                        }
                                        dfd.resolve();
                                    }).fail(function (err) {
                                        alertError(err);
                                        dfd.reject();
                                    }).always(function () {
                                        block.clear();
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.selectCategoryItem = function () {
                                    var self = this;
                                    if (!self.hasData) {
                                        alertError({ messageId: "Msg_656" });
                                        return;
                                    }
                                    setShared('CMF002_B_PARAMS', {
                                        categoryName: self.selectedCategoryCode().categoryName,
                                        categoryId: self.selectedCategoryCode().categoryId
                                    });
                                    nts.uk.ui.windows.close();
                                };
                                ScreenModel.prototype.cancelSelectCategoryItem = function () {
                                    nts.uk.ui.windows.close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var Category = /** @class */ (function () {
                                function Category(categoryId, officeHelperSysAtr, categoryName, categorySet, personSysAtr, attendanceSysAtr, payrollSysAtr, functionNo, functionName, explanation, displayOrder, defaultValue) {
                                    this.categoryId = categoryId;
                                    this.officeHelperSysAtr = officeHelperSysAtr;
                                    this.categoryName = categoryName;
                                    this.categorySet = categorySet;
                                    this.personSysAtr = personSysAtr;
                                    this.attendanceSysAtr = attendanceSysAtr;
                                    this.payrollSysAtr = payrollSysAtr;
                                    this.functionNo = functionNo;
                                    this.functionName = functionName;
                                    this.explanation = explanation;
                                    this.displayOrder = displayOrder;
                                    this.defaultValue = defaultValue;
                                }
                                return Category;
                            }());
                            viewmodel.Category = Category;
                        })(viewmodel = v1.viewmodel || (v1.viewmodel = {}));
                    })(v1 = cmf002.v1 || (cmf002.v1 = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.v1.vm.js.map