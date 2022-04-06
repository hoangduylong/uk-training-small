var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps006;
                (function (cps006) {
                    var a;
                    (function (a) {
                        var viewmodel;
                        (function (viewmodel) {
                            var text = nts.uk.resource.getText;
                            var dialog = nts.uk.ui.dialog;
                            var getShared = nts.uk.ui.windows.getShared;
                            var setShared = nts.uk.ui.windows.setShared;
                            var block = nts.uk.ui.block;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.id = ko.observable('');
                                    this.ctgColums = ko.observableArray([
                                        { headerText: 'id', key: 'id', width: 100, hidden: true },
                                        { headerText: text('CPS006_6'), key: 'categoryName', width: 230, formatter: _.escape },
                                        {
                                            headerText: text('CPS006_7'), key: 'isAbolition', width: 50,
                                            formatter: makeIcon
                                        }
                                    ]);
                                    this.langId = ko.observable('ja');
                                    this.categoryList = ko.observableArray([]);
                                    this.categorySourceLst = ko.observableArray([]);
                                    this.currentCategory = ko.observable((new CategoryInfoDetail({
                                        id: '', categoryNameDefault: '',
                                        categoryName: '', categoryType: 4, isAbolition: "",
                                        personEmployeeType: 0, itemList: []
                                    })));
                                    // nếu sử dụng thì bằng true và ngược lại __viewContext["viewModel"].currentCategory().personEmployeeType
                                    this.isAbolished = ko.observable(false);
                                    this.isFiltered = false;
                                    this.ctgLstFilter = [];
                                    var self = this;
                                    self.start(undefined);
                                    self.id.subscribe(function (value) {
                                        $('#ctgName').focus();
                                        nts.uk.ui.errors.clearAll();
                                        if (nts.uk.text.isNullOrEmpty(value))
                                            return;
                                        self.getDetailCategory(value);
                                    });
                                    self.isAbolished.subscribe(function (value) {
                                        nts.uk.ui.errors.clearAll();
                                        if (value) {
                                            if (!self.isFiltered) {
                                                self.categoryList.removeAll();
                                                a.service.getAllCategory().done(function (data) {
                                                    if (data.length > 0) {
                                                        self.categoryList(_.map(data, function (x) { return new CategoryInfo({
                                                            id: x.id,
                                                            categoryCode: x.categoryCode,
                                                            categoryName: x.categoryName,
                                                            categoryType: x.categoryType,
                                                            isAbolition: x.isAbolition
                                                        }); }));
                                                        $("#category_grid").igGrid("option", "dataSource", self.categoryList());
                                                        self.id(self.categoryList()[0].id);
                                                    }
                                                });
                                            }
                                            else {
                                                a.service.getAllCategory().done(function (data) {
                                                    if (data.length > 0) {
                                                        self.categoryList(data);
                                                        $("#category_grid").igGrid("option", "dataSource", self.categoryList());
                                                        $('.search-btn').trigger('click');
                                                    }
                                                });
                                                $("#category_grid").igGrid("option", "dataSource", self.ctgLstFilter);
                                            }
                                        }
                                        else {
                                            if (self.isFiltered) {
                                                $("#category_grid").igGrid("option", "dataSource", _.filter(self.ctgLstFilter, function (x) { return x.isAbolition == 0; }));
                                            }
                                            else {
                                                var oldlst_1 = _.map(ko.toJS(self.categoryList), function (x) { return x; });
                                                self.categoryList.removeAll();
                                                a.service.getAllCategory().done(function (data) {
                                                    if (data.length > 0) {
                                                        self.categoryList(_.map(_.filter(data, function (x) { return x.isAbolition == 0; }), function (x) { return new CategoryInfo({
                                                            id: x.id,
                                                            categoryCode: x.categoryCode,
                                                            categoryName: x.categoryName,
                                                            categoryType: x.categoryType,
                                                            isAbolition: x.isAbolition
                                                        }); }));
                                                        var category = _.find(self.categoryList(), function (x) { return x.id == self.currentCategory().id(); });
                                                        if (category === undefined) {
                                                            var oldIndex = oldlst_1.indexOf(_.find(oldlst_1, function (x) { return x.id == self.currentCategory().id(); }));
                                                            var _loop_1 = function () {
                                                                var curCtg = oldlst_1[i];
                                                                var newctg = _.find(self.categoryList(), function (x) { return x.id == curCtg.id; });
                                                                if (newctg != undefined) {
                                                                    self.currentCategory().id(newctg.id);
                                                                    return "break";
                                                                }
                                                            };
                                                            for (var i = oldIndex; i >= 0; i--) {
                                                                var state_1 = _loop_1();
                                                                if (state_1 === "break")
                                                                    break;
                                                            }
                                                        }
                                                        $("#category_grid").igGrid("option", "dataSource", self.categoryList());
                                                        self.id(self.categoryList()[0].id);
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                                ScreenModel.prototype.exportExcel = function (domainId) {
                                    var self = this;
                                    nts.uk.ui.block.grayout();
                                    var program = nts.uk.ui._viewModel.kiban.programName().split(" ");
                                    var domainType = "CPS006";
                                    if (program.length > 1) {
                                        program.shift();
                                        domainType = domainType + program.join(" ");
                                    }
                                    a.service.exportExcel(self.langId(), domainId, domainType)
                                        .fail(function (res) {
                                        nts.uk.ui.dialog.alertError(res);
                                    }).always(function () {
                                        nts.uk.ui.block.clear();
                                    });
                                };
                                ScreenModel.prototype.getDetailCategory = function (id) {
                                    var self = this;
                                    a.service.getDetailCtgInfo(id).done(function (data) {
                                        nts.uk.ui.errors.clearAll();
                                        if (data) {
                                            self.currentCategory().setData({
                                                categoryNameDefault: data.categoryNameDefault, categoryName: data.categoryName,
                                                categoryType: data.categoryType, isAbolition: data.abolition,
                                                personEmployeeType: data.personEmployeeType, itemList: data.itemLst
                                            }, data.canAbolition, data.isExistedItemLst);
                                            //                    if (data.itemLst.length > 0) {
                                            //                        self.currentCategory().currentItemId(data.itemLst[0].id);
                                            //                    }
                                        }
                                    });
                                };
                                ScreenModel.prototype.start = function (id) {
                                    var self = this, dfd = $.Deferred();
                                    self.categoryList.removeAll();
                                    if (self.isAbolished()) {
                                        a.service.getAllCategory().done(function (data) {
                                            if (data.length > 0) {
                                                self.categoryList(_.map(data, function (x) { return new CategoryInfo({
                                                    id: x.id,
                                                    categoryCode: x.categoryCode,
                                                    categoryName: x.categoryName,
                                                    categoryType: x.categoryType,
                                                    isAbolition: x.isAbolition,
                                                }); }));
                                                self.categorySourceLst(_.map(data, function (x) { return new CategoryInfo({
                                                    id: x.id,
                                                    categoryCode: x.categoryCode,
                                                    categoryName: x.categoryName,
                                                    categoryType: x.categoryType,
                                                    isAbolition: x.isAbolition
                                                }); }));
                                                if (id === undefined) {
                                                    self.id(self.categoryList()[0].id);
                                                }
                                                else {
                                                    self.id(id);
                                                }
                                            }
                                            else {
                                                dialog.alertError({ messageId: 'Msg_291' });
                                            }
                                            dfd.resolve();
                                        });
                                    }
                                    else {
                                        a.service.getAllCategory().done(function (data) {
                                            if (data.length > 0) {
                                                self.categoryList(_.map(_.filter(data, function (x) { return x.isAbolition == 0; }), function (x) { return new CategoryInfo({
                                                    id: x.id,
                                                    categoryCode: x.categoryCode,
                                                    categoryName: x.categoryName,
                                                    categoryType: x.categoryType,
                                                    isAbolition: x.isAbolition
                                                }); }));
                                                self.categorySourceLst(_.map(data, function (x) { return new CategoryInfo({
                                                    id: x.id,
                                                    categoryCode: x.categoryCode,
                                                    categoryName: x.categoryName,
                                                    categoryType: x.categoryType,
                                                    isAbolition: x.isAbolition
                                                }); }));
                                                if (id === undefined) {
                                                    self.id(self.categoryList()[0].id);
                                                }
                                                else {
                                                    self.id(id);
                                                }
                                            }
                                            else {
                                                dialog.alertError({ messageId: 'Msg_291' });
                                            }
                                            dfd.resolve();
                                        });
                                    }
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.reload = function (id, index) {
                                    var self = this, dfd = $.Deferred();
                                    self.categoryList.removeAll();
                                    if (self.isAbolished()) {
                                        a.service.getAllCategory().done(function (data) {
                                            if (data.length > 0) {
                                                self.categoryList(_.map(data, function (x) { return new CategoryInfo({
                                                    id: x.id,
                                                    categoryCode: x.categoryCode,
                                                    categoryName: x.categoryName,
                                                    categoryType: x.categoryType,
                                                    isAbolition: x.isAbolition,
                                                }); }));
                                                self.categorySourceLst(_.map(data, function (x) { return new CategoryInfo({
                                                    id: x.id,
                                                    categoryCode: x.categoryCode,
                                                    categoryName: x.categoryName,
                                                    categoryType: x.categoryType,
                                                    isAbolition: x.isAbolition
                                                }); }));
                                                var categoryOld = _.filter(self.categoryList(), function (cate) { return cate.id == id; });
                                                if (categoryOld.length == 0) {
                                                    if (self.categoryList().length > index) {
                                                        self.id(self.categoryList()[index].id);
                                                    }
                                                    else if (self.categoryList().length === 0) {
                                                        self.id(self.categoryList()[0].id);
                                                    }
                                                    else if (self.categoryList().length > index) {
                                                        self.id(self.categoryList()[self.categoryList().length - 1]);
                                                    }
                                                }
                                                else if (categoryOld.length > 0) {
                                                    self.id(categoryOld[0].id);
                                                }
                                            }
                                            else {
                                                dialog.alertError({ messageId: 'Msg_291' });
                                            }
                                            dfd.resolve();
                                        });
                                    }
                                    else {
                                        a.service.getAllCategory().done(function (data) {
                                            if (data.length > 0) {
                                                self.categoryList(_.map(_.filter(data, function (x) { return x.isAbolition == 0; }), function (x) { return new CategoryInfo({
                                                    id: x.id,
                                                    categoryCode: x.categoryCode,
                                                    categoryName: x.categoryName,
                                                    categoryType: x.categoryType,
                                                    isAbolition: x.isAbolition
                                                }); }));
                                                self.categorySourceLst(_.map(data, function (x) { return new CategoryInfo({
                                                    id: x.id,
                                                    categoryCode: x.categoryCode,
                                                    categoryName: x.categoryName,
                                                    categoryType: x.categoryType,
                                                    isAbolition: x.isAbolition
                                                }); }));
                                                var categoryOld = _.filter(self.categoryList(), function (cate) { return cate.id == id; });
                                                if (categoryOld.length == 0) {
                                                    if (self.categoryList().length > index) {
                                                        self.id(self.categoryList()[index].id);
                                                    }
                                                    else if (self.categoryList().length === 0) {
                                                        self.id(self.categoryList()[0].id);
                                                    }
                                                    else if (self.categoryList().length > index) {
                                                        self.id(self.categoryList()[self.categoryList().length - 1]);
                                                    }
                                                }
                                                else if (categoryOld.length > 0) {
                                                    self.id(categoryOld[0].id);
                                                }
                                            }
                                            else {
                                                dialog.alertError({ messageId: 'Msg_291' });
                                            }
                                            dfd.resolve();
                                        });
                                    }
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.openBModal = function () {
                                    var self = this;
                                    setShared('categoryInfo', {
                                        id: self.id(),
                                        personEmployeeType: self.currentCategory().personEmployeeType
                                    });
                                    if (nts.uk.text.isNullOrEmpty(self.id())) {
                                        return;
                                    }
                                    block.invisible();
                                    nts.uk.ui.windows.sub.modal('/view/cps/006/b/index.xhtml', { title: '' }).onClosed(function () {
                                        self.getDetailCategory(self.id());
                                        block.clear();
                                    });
                                };
                                ScreenModel.prototype.openCDL022Modal = function () {
                                    var self = this, cats = _.map(ko.toJS(self.categorySourceLst), function (x) { return { id: x.id, name: x.categoryName }; });
                                    block.invisible();
                                    setShared('CDL020_PARAMS', cats);
                                    nts.uk.ui.windows.sub.modal('/view/cdl/022/a/index.xhtml', { title: '' }).onClosed(function () {
                                        var CTGlist = getShared('CDL020_VALUES');
                                        if (CTGlist) {
                                            var CTGsorrList = _.map(CTGlist, function (x, i) { return ({
                                                id: x.id,
                                                order: i + 1
                                            }); });
                                            a.service.updateCtgOrder(CTGsorrList).done(function (data) {
                                                self.start(self.id()).done(function () {
                                                    block.clear();
                                                });
                                            });
                                        }
                                        $('#ctgName').focus();
                                    });
                                };
                                ScreenModel.prototype.registerCategoryInfo = function () {
                                    var self = this, cat = ko.toJS(self.currentCategory), command = {
                                        categoryId: self.id(),
                                        categoryName: cat.categoryName,
                                        isAbolition: cat.isAbolition
                                    };
                                    block.grayout();
                                    a.service.updateCtgInfo(command).done(function (data) {
                                        dialog.info({ messageId: "Msg_15" }).then(function () {
                                            var index = _.indexOf(_.map(self.categoryList(), function (obj) { return obj.id; }), command.categoryId);
                                            if (index >= 0) {
                                                self.reload(command.categoryId, index);
                                            }
                                        });
                                    }).fail(function (res) {
                                        if (res.messageId == "Msg_928") {
                                            dialog.alertError({
                                                messageId: res.messageId,
                                                messageParams: ["個人情報カテゴリ"]
                                            }).then(function () {
                                                $('#ctgName').focus();
                                            });
                                        }
                                        else {
                                            dialog.alertError({ messageId: res.messageId });
                                        }
                                    }).always(function () {
                                        $('#ctgName').focus();
                                        block.clear();
                                    });
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var CategoryInfo = /** @class */ (function () {
                                function CategoryInfo(params) {
                                    this.id = params.id;
                                    this.categoryName = params.categoryName;
                                    this.categoryCode = params.categoryCode;
                                    this.categoryType = params.categoryType;
                                    this.isAbolition = params.isAbolition;
                                }
                                return CategoryInfo;
                            }());
                            viewmodel.CategoryInfo = CategoryInfo;
                            var ItemInfo = /** @class */ (function () {
                                function ItemInfo(params) {
                                    this.id = params.id;
                                    this.perInfoCtgId = params.perInfoCtgId;
                                    this.itemName = params.itemName;
                                    this.systemRequired = params.systemRequired;
                                    this.isAbolition = params.isAbolition;
                                }
                                return ItemInfo;
                            }());
                            viewmodel.ItemInfo = ItemInfo;
                            function makeIcon(value, row) {
                                if (value == '1')
                                    return '<img src="images/checked.png" style="margin-left: 15px; width: 20px; height: 20px;" />';
                                return '<span></span>';
                            }
                            var CategoryInfoDetail = /** @class */ (function () {
                                function CategoryInfoDetail(params) {
                                    this.displayIsAbolished = ko.observable(0);
                                    this.currentItemId = ko.observable('');
                                    this.itemColums = ko.observableArray([
                                        { headerText: 'id', key: 'id', width: 100, hidden: true },
                                        { headerText: text('CPS006_16'), key: 'itemName', width: 250, formatter: _.escape },
                                        {
                                            headerText: text('CPS006_17'), key: 'isAbolition', width: 50,
                                            formatter: makeIcon,
                                        }
                                    ]);
                                    this.id = ko.observable("");
                                    this.categoryNameDefault = ko.observable(params.categoryNameDefault);
                                    this.categoryName = ko.observable(params.categoryName);
                                    this.categoryType = ko.observable(params.categoryType);
                                    this.isAbolition = ko.observable(false);
                                    this.canAbolition = ko.observable(params.canAbolition);
                                    this.itemList = ko.observableArray(params.itemList || []);
                                    this.personEmployeeType = params.personEmployeeType || 1;
                                    this.isExistedItemLst = ko.observable(0);
                                }
                                CategoryInfoDetail.prototype.setData = function (params, displayIsAbolished, isExistedItemLst) {
                                    this.id(params.id);
                                    this.categoryNameDefault(params.categoryNameDefault);
                                    this.categoryName(params.categoryName);
                                    this.categoryType(params.categoryType);
                                    this.isAbolition(params.isAbolition);
                                    this.canAbolition(params.canAbolition);
                                    this.displayIsAbolished(displayIsAbolished == true ? 1 : 0);
                                    this.isExistedItemLst(isExistedItemLst);
                                    this.personEmployeeType = params.personEmployeeType;
                                    this.itemList(params.itemList);
                                };
                                return CategoryInfoDetail;
                            }());
                            viewmodel.CategoryInfoDetail = CategoryInfoDetail;
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = cps006.a || (cps006.a = {}));
                })(cps006 = view.cps006 || (view.cps006 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps006.a.vm.js.map