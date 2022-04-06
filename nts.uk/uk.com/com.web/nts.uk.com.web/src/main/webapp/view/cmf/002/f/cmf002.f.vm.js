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
                    var f;
                    (function (f) {
                        var viewmodel;
                        (function (viewmodel) {
                            var close = nts.uk.ui.windows.close;
                            var getText = nts.uk.resource.getText;
                            var model = cmf002.share.model;
                            var info = nts.uk.ui.dialog.info;
                            var alertError = nts.uk.ui.dialog.alertError;
                            var setShared = nts.uk.ui.windows.setShared;
                            var getShared = nts.uk.ui.windows.getShared;
                            var block = nts.uk.ui.block;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.condSetCd = ko.observable('');
                                    this.conditionSetName = ko.observable('');
                                    this.categoryName = ko.observable('');
                                    this.externalOutputCategoryItemData = ko.observable(new ExternalOutputCategoryItemData({
                                        itemNo: '',
                                        itemName: '',
                                        categoryId: '',
                                        itemType: ''
                                    }));
                                    this.outputItemList = ko.observableArray([]);
                                    this.categoryItemList = ko.observableArray([]);
                                    this.selectionItemList = ko.observableArray([]);
                                    this.selectedOutputItemCode = ko.observable(-1);
                                    this.selectedCategoryItemCodeList = ko.observableArray([]);
                                    this.selectedSelectionItemList = ko.observableArray([]);
                                    this.itemTypeItems = ko.observableArray(getItemType());
                                    this.selectedItemType = ko.observable(-1);
                                    this.selectedAddOutputItem = ko.observableArray([]);
                                    // getShared from screen B
                                    this.categoryId = ko.observable('');
                                    this.excursionMode = ko.observable(false);
                                    var self = this;
                                    paramC = getShared('CMF002_F_PARAMS');
                                    self.condSetCd(paramC.conditionSetCode);
                                    self.conditionSetName(paramC.conditionSetName);
                                    self.categoryId(paramC.categoryId);
                                    self.categoryName(paramC.categoryName);
                                    self.initScreen();
                                }
                                ScreenModel.prototype.initScreen = function () {
                                    var self = this;
                                    block.invisible();
                                    f.service.getOutputItem(self.condSetCd()).done(function (data) {
                                        if (data && data.length) {
                                            _.sortBy(data, [function (o) { return o.outputItemCode; }]);
                                            self.outputItemList(data);
                                        }
                                    });
                                    f.service.getCtgData(self.categoryId()).done(function (data) {
                                        if (data && data.length) {
                                            data = _.map(data, function (item) {
                                                // [ver62] ドメインモデル「外部出力カテゴリ項目データ.予約語区分」の値から予約語に変換するかどうか判断する
                                                var itemName = item.keywordAtr === 1
                                                    ? self.reverseWord(item.itemName)
                                                    : item.itemName;
                                                item.itemName = itemName;
                                                return item;
                                            });
                                            var listcategoryItemData_1 = _.sortBy(data, ['itemNo']);
                                            self.categoryItemList(listcategoryItemData_1);
                                            self.selectedItemType.subscribe(function (code) {
                                                if (code == 10) {
                                                    self.categoryItemList(listcategoryItemData_1);
                                                }
                                                else {
                                                    self.categoryItemList(_.filter(listcategoryItemData_1, ['itemType', code]));
                                                }
                                            });
                                        }
                                    }).always(function () {
                                        block.clear();
                                    });
                                };
                                //終了する
                                ScreenModel.prototype.closeDialog = function () {
                                    var self = this;
                                    setShared('CMF002_C_PARAMS_FROM_F', { isUpdateExecution: self.excursionMode() });
                                    close();
                                };
                                ScreenModel.prototype.btnRightClick = function () {
                                    var self = this;
                                    var count = 0;
                                    if (self.selectionItemList().length) {
                                        var _listselectionItemId = _.map(self.selectionItemList(), function (o) { return parseInt(o.id); });
                                        count = (_.max(_listselectionItemId) + 1);
                                    }
                                    if (self.selectedCategoryItemCodeList()) {
                                        var _dataTemp = [];
                                        var _loop_1 = function (item) {
                                            var _selectedItem = _.find(self.categoryItemList(), function (x) { return x.itemNo == item; });
                                            var _outputSelection = {
                                                id: count.toString(),
                                                itemNo: _selectedItem.itemNo,
                                                itemName: _selectedItem.itemName,
                                                categoryId: _selectedItem.categoryId,
                                                itemType: _selectedItem.itemType
                                            };
                                            _dataTemp.push(_outputSelection);
                                            count++;
                                        };
                                        for (var _i = 0, _a = self.selectedCategoryItemCodeList(); _i < _a.length; _i++) {
                                            var item = _a[_i];
                                            _loop_1(item);
                                        }
                                        self.selectionItemList.push.apply(self.selectionItemList, _dataTemp);
                                    }
                                };
                                ScreenModel.prototype.btnLeftClick = function () {
                                    var self = this;
                                    if (self.selectedSelectionItemList()) {
                                        var _loop_2 = function (id) {
                                            var _selectedItem = _.find(self.selectionItemList(), function (x) { return x.id == id; });
                                            self.selectionItemList.remove(_selectedItem);
                                        };
                                        for (var _i = 0, _a = self.selectedSelectionItemList(); _i < _a.length; _i++) {
                                            var id = _a[_i];
                                            _loop_2(id);
                                        }
                                    }
                                };
                                ScreenModel.prototype.register = function () {
                                    var self = this;
                                    if (self.selectionItemList().length) {
                                        block.invisible();
                                        self.selectedAddOutputItem.removeAll();
                                        var _listOutputItemCode = _.map(self.outputItemList(), function (o) { return parseInt(o.outputItemCode); });
                                        var _loop_3 = function (item) {
                                            _selectedItem = _.find(self.selectionItemList(), function (x) { return x.id == item.id; });
                                            self.selectedAddOutputItem.push(ko.toJS(new AddOutputItem(parseInt(_.max(_listOutputItemCode)), self.condSetCd(), _selectedItem.itemName, _selectedItem.itemType, _selectedItem.itemNo, _selectedItem.categoryId)));
                                        };
                                        var _selectedItem;
                                        for (var _i = 0, _a = self.selectionItemList(); _i < _a.length; _i++) {
                                            var item = _a[_i];
                                            _loop_3(item);
                                        }
                                        var _outputItemCode = self.outputItemList().length == 0 ? 0 : parseInt(_.max(_listOutputItemCode));
                                        if ((_outputItemCode + self.selectedAddOutputItem().length) <= 999) {
                                            f.service.addOutputItem(self.selectedAddOutputItem()).done(function () {
                                                self.excursionMode(true);
                                                info({ messageId: "Msg_15" });
                                                f.service.getOutputItem(self.condSetCd()).done(function (data) {
                                                    if (data && data.length) {
                                                        _.sortBy(data, [function (o) { return o.outputItemCode; }]);
                                                        self.outputItemList(data);
                                                    }
                                                });
                                                self.selectionItemList.removeAll();
                                            }).always(function () {
                                                block.clear();
                                            });
                                        }
                                        else {
                                            alertError({ messageId: 'Msg_1444' });
                                            block.clear();
                                        }
                                    }
                                    else {
                                        alertError({ messageId: 'Msg_656' });
                                    }
                                };
                                ScreenModel.prototype.start = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                // Reverse word
                                ScreenModel.prototype.reverseWord = function (word) {
                                    var mapReveseWord = {
                                        employment: '雇用呼称',
                                        department: '部門呼称',
                                        class: '分類呼称',
                                        jobTitle: '職位呼称',
                                        person: '社員呼称',
                                        office: '事業所呼称',
                                        work: '作業呼称',
                                        workPlace: '職場呼称',
                                        project: 'プロジェクト',
                                        adHocWork: '臨時勤務',
                                        substituteHoliday: '振休',
                                        substituteWork: '振出',
                                        compensationHoliday: '代休',
                                        exsessHoliday: '60H超過休暇',
                                        bindingTime: '拘束時間',
                                        payAbsenseDays: '給与欠勤日数',
                                        payAttendanceDays: '給与出勤日数',
                                        import: '取込',
                                        toppage: 'トップページ',
                                        code: 'コード',
                                        name: '名称',
                                    };
                                    var keyword = word.substring(word.lastIndexOf("{#") + 2, word.lastIndexOf("#}"));
                                    var reveseWord = mapReveseWord[keyword];
                                    if (!reveseWord) {
                                        return word;
                                    }
                                    return word.replace("{#".concat(keyword, "#}"), reveseWord);
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            //項目型
                            function getItemType() {
                                return [
                                    new model.ItemModel(10, getText("CMF002_406")),
                                    new model.ItemModel(0, getText("Enum_ItemType_NUMERIC")),
                                    new model.ItemModel(1, getText("Enum_ItemType_CHARACTER")),
                                    new model.ItemModel(2, getText("Enum_ItemType_DATE")),
                                    new model.ItemModel(3, getText("Enum_ItemType_TIME")),
                                    new model.ItemModel(4, getText("Enum_ItemType_INS_TIME")),
                                    new model.ItemModel(7, getText("Enum_ItemType_IN_SERVICE"))
                                ];
                            }
                            viewmodel.getItemType = getItemType;
                            var OutputItem = /** @class */ (function () {
                                function OutputItem(param) {
                                    this.outputItemCode = ko.observable('');
                                    this.outputItemname = ko.observable('');
                                    var self = this;
                                    self.outputItemCode(param.outputItemCode || '');
                                    self.outputItemname(param.outputItemName || '');
                                }
                                return OutputItem;
                            }());
                            viewmodel.OutputItem = OutputItem;
                            var ExternalOutputCategoryItemData = /** @class */ (function () {
                                function ExternalOutputCategoryItemData(param) {
                                    this.itemNo = ko.observable('');
                                    this.itemName = ko.observable('');
                                    this.categoryId = ko.observable('');
                                    this.itemType = ko.observable('');
                                    var self = this;
                                    self.itemNo(param.itemNo || '');
                                    self.itemName(param.itemName || '');
                                    self.categoryId(param.categoryId || '');
                                    self.itemType(param.itemType || '');
                                }
                                return ExternalOutputCategoryItemData;
                            }());
                            viewmodel.ExternalOutputCategoryItemData = ExternalOutputCategoryItemData;
                            var ExternalOutputSelection = /** @class */ (function () {
                                function ExternalOutputSelection(param) {
                                    this.id = 0;
                                    this.itemNo = ko.observable('');
                                    this.itemName = ko.observable('');
                                    this.categoryId = ko.observable('');
                                    this.itemType = ko.observable('');
                                    var self = this;
                                    self.id = param.id;
                                    self.itemNo(param.itemNo || '');
                                    self.itemName(param.itemName || '');
                                    self.categoryId(param.categoryId || '');
                                    self.itemType(param.itemType || '');
                                }
                                return ExternalOutputSelection;
                            }());
                            viewmodel.ExternalOutputSelection = ExternalOutputSelection;
                            var AddOutputItem = /** @class */ (function () {
                                function AddOutputItem(outItemCd, condSetCd, outItemName, itemType, itemNo, categoryId) {
                                    this.outItemCd = ko.observable('');
                                    this.condSetCd = ko.observable('');
                                    this.outItemName = ko.observable('');
                                    this.itemType = ko.observable('');
                                    this.itemNo = ko.observable('');
                                    this.categoryId = ko.observable('');
                                    var self = this;
                                    self.outItemCd(outItemCd);
                                    self.condSetCd(condSetCd);
                                    self.outItemName(outItemName);
                                    self.itemType(itemType);
                                    self.itemNo(itemNo);
                                    self.categoryId(categoryId);
                                }
                                return AddOutputItem;
                            }());
                            viewmodel.AddOutputItem = AddOutputItem;
                        })(viewmodel = f.viewmodel || (f.viewmodel = {}));
                    })(f = cmf002.f || (cmf002.f = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.f.vm.js.map