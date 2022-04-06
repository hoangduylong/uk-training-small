var cps007;
(function (cps007) {
    var b;
    (function (b) {
        var vm;
        (function (vm) {
            var alert = nts.uk.ui.dialog.alert;
            var close = nts.uk.ui.windows.close;
            var setShared = nts.uk.ui.windows.setShared;
            var getShared = nts.uk.ui.windows.getShared;
            var __viewContext = window['__viewContext'] || {};
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                    this.allItems = ko.observableArray([]);
                    this.chooseItems = ko.observableArray([]);
                    this.category = ko.observable(new ItemCategory({ id: undefined }));
                    var self = this, cat = self.category(), dto = getShared('CPS007B_PARAM') || { chooseItems: [] };
                    if (dto.category && dto.category.id) {
                        cat.id(dto.category.id);
                    }
                    else {
                        self.close();
                    }
                    // paser default choose item
                    self.chooseItems(dto.chooseItems);
                    // when cat id is change
                    // get category info and get all item define in this category
                    cat.id.subscribe(function (x) {
                        if (x) {
                            b.service.getCategory(x).done(function (data) {
                                if (data && !data.isAbolition) {
                                    cat.categoryType(data.categoryType);
                                    cat.categoryName(data.categoryName);
                                    // get all item in category
                                    b.service.getItemDefinitions(data.id).done(function (data) {
                                        data = _.filter(data, function (x) { return !x.isAbolition; });
                                        self.allItems(data);
                                    });
                                }
                                else {
                                    cat.id(undefined);
                                }
                            });
                        }
                        else {
                            // close dialog if category is not present
                            self.close();
                        }
                    });
                    cat.id.valueHasMutated();
                }
                ViewModel.prototype.pushData = function () {
                    var self = this, cat = ko.toJS(self.category), data = ko.unwrap(self.chooseItems);
                    if (!data.length) {
                        alert({ messageId: 'Msg_203' });
                        return;
                    }
                    setShared('CPS007B_VALUE', { category: cat, chooseItems: data });
                    self.close();
                };
                ViewModel.prototype.close = function () {
                    close();
                };
                return ViewModel;
            }());
            vm.ViewModel = ViewModel;
            var ItemCategory = /** @class */ (function () {
                function ItemCategory(param) {
                    this.id = ko.observable('');
                    this.categoryName = ko.observable('');
                    this.categoryType = ko.observable(-1);
                    var self = this;
                    self.id(param.id || '');
                    self.categoryName(param.categoryName || '');
                    self.categoryType(param.categoryType || -11);
                }
                return ItemCategory;
            }());
        })(vm = b.vm || (b.vm = {}));
    })(b = cps007.b || (cps007.b = {}));
})(cps007 || (cps007 = {}));
//# sourceMappingURL=cps007.b.vm.js.map