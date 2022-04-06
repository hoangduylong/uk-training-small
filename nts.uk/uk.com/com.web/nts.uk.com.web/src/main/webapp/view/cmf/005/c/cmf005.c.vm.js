// module nts.uk.com.view.cmf005.c.viewmodel {
//     import getText = nts.uk.resource.getText;
//     import close = nts.uk.ui.windows.close;
//     import setShared = nts.uk.ui.windows.setShared;
//     import getShared = nts.uk.ui.windows.getShared;
//     import model = cmf005.share.model;
//     import alertError = nts.uk.ui.dialog.alertError;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//     export class ScreenModel extends ko.ViewModel {
//         // swapList category
//         listCategory: KnockoutObservableArray<model.ItemCategory> = ko.observableArray([]);
//         listCategoryChosed: KnockoutObservableArray<model.ItemCategory> = ko.observableArray([]);
//         columns: KnockoutObservableArray<nts.uk.ui.NtsGridListColumn>;
//         currentCategorySelected: KnockoutObservableArray<any>;
//         listCateIdIgnore: KnockoutObservableArray<string> = ko.observableArray([]);
//         // comboBox system type
//         systemTypes: KnockoutObservableArray<any>;
//         selectedCode: KnockoutObservable<string>;
//         currentItem: KnockoutObservable<model.ItemModel>;
//         isEnable: KnockoutObservable<boolean>;
//         isEditable: KnockoutObservable<boolean>;
//         headerCodeCategories: string = getText("CMF005_19");
//         headerNameCategories: string = getText("CMF005_20");
//         constructor() {
//             var self = this;
//             // get param from screen B 
//             let listCategoryB = getShared('CMF005CParams_ListCategory');
//             let systemTypeB = getShared('CMF005CParams_SystemType');
//             self.currentCategorySelected = ko.observableArray([]);
//             var systemIdSelected;
//             self.systemTypes = ko.observableArray([]);
//             self.isEnable = ko.observable(true);
//             self.isEditable = ko.observable(true);
//             self.listCategory = ko.observableArray([]);
//             self.selectedCode = ko.observable('');
//             service.getSysTypes().done(function(data: Array<any>) {
//                     if (data && data.length) {
//                         _.forOwn(data, function(index) {
//                             self.systemTypes.push(new model.ItemModel(index.systemTypeValue+'', index.systemTypeName));
//                         });
//                         if (systemTypeB != undefined) { 
//                             systemIdSelected = systemTypeB.code; 
//                         } else { 
//                             systemIdSelected = self.systemTypes()[0].code; 
//                         }
//                         self.selectedCode(systemIdSelected);
//                     } else {
//                     }
//                 }).fail(function(error) {
//                     alertError(error);
//                 }).always(() => {
//                 });
//             self.isEnable = ko.observable(true);
//                 self.isEditable = ko.observable(true);
//                 self.listCategory = ko.observableArray([]);
//                 self.selectedCode.subscribe(value => {
//                     if (value && value.length > 0) {
//                     self.currentItem = _.find(self.systemTypes(), a => a.code === value);
//                         service.getConditionList(parseInt(self.selectedCode())).done(function(data: Array<any>) {
//                             data = _.sortBy(data, ["categoryId"]);
//                             if (systemTypeB != undefined) {
//                                 _.forOwn(listCategoryB, function(index) {
//                                      _.remove(data, function (e) {
//                                             return e.categoryId == index.categoryId;
//                                         });
//                                 });
//                                 self.currentCategorySelected(listCategoryB);
//                            }
//                             self.listCategory(data);
//                             $("#swap-list-grid1 tr:first-child").focus();
//                         }).fail(function(error) {
//                             alertError(error);
//                         }).always(() => {
//                             _.defer(() => {
//                                 $("#grd_Condition tr:first-child").focus();
//                             });
//                         });
//                     }
//                 });
//                 self.columns = ko.observableArray([
//                     { headerText: self.headerCodeCategories, key: 'categoryId', width: 70 },
//                     { headerText: self.headerNameCategories, key: 'categoryName', width: 250 }
//                 ]);
//                 self.listCategoryChosed = self.currentCategorySelected;
//         }
//         closePopup() {
//             close();
//         }
//         remove() {
//             let self = this;
//             self.listCategory.shift();
//         }
//         submit() {
//             let self = this;
//             if (self.currentCategorySelected().length == 0) {
//                 alertError({ messageId: "Msg_471" });
//             } else {
//                 setShared("CMF005COutput_ListCategoryChose", self.currentCategorySelected());
//                 setShared("CMF005COutput_SystemTypeChose", self.currentItem);
//                 close();
//             }
//         }
//     }
// }
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf005;
                (function (cmf005) {
                    var c;
                    (function (c_1) {
                        var getText = nts.uk.resource.getText;
                        var TextEditorOption = nts.uk.ui.option.TextEditorOption;
                        var ViewModel = /** @class */ (function (_super) {
                            __extends(ViewModel, _super);
                            function ViewModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.screenMode = ko.observable();
                                _this.isNewMode = ko.computed(function () {
                                    var vm = _this;
                                    return vm.screenMode() === ScreenMode.NEW;
                                });
                                //Pattern list
                                _this.patternList = ko.observableArray([]);
                                _this.selectedPatternCode = ko.observable('');
                                _this.patternColumns = ko.observableArray([
                                    { headerText: getText('CMF005_19'), key: 'displayCode', width: 75 },
                                    { headerText: getText('CMF005_224'), key: 'patternName', width: 250 }
                                ]);
                                //Pattern
                                _this.codeValue = ko.observable('');
                                _this.nameValue = ko.observable('');
                                _this.options = new TextEditorOption({
                                    width: '150px'
                                });
                                //Category list
                                _this.categoriesDefault = ko.observableArray([]);
                                _this.categoriesFiltered = ko.observableArray([]);
                                _this.leftColumns = ko.observableArray([
                                    { headerText: '', key: 'id', hidden: true },
                                    { headerText: getText('CMF005_19'), key: 'categoryId', width: 70 },
                                    { headerText: getText('CMF005_226'), key: 'displayName', width: 250 }
                                ]);
                                _this.rightColumns = ko.observableArray([
                                    { headerText: '', key: 'id', hidden: true },
                                    { headerText: getText('CMF005_19'), key: 'categoryId', width: 70 },
                                    { headerText: getText('CMF005_226'), key: 'displayName', width: 250 },
                                    { headerText: getText('CMF005_25'), key: 'retentionPeriod', width: 70 }
                                ]);
                                _this.currentCateSelected = ko.observableArray([]);
                                _this.systemTypes = ko.observableArray([
                                    new ItemModel(0, ' '),
                                ]);
                                _this.selectedSystemType = ko.observable(0);
                                //Auto execution
                                _this.saveFormatChecked = ko.observable(false);
                                _this.saveFormatEnabled = ko.observable(true);
                                _this.disableMoveButton = ko.observable(false);
                                _this.usePasswordChecked = ko.observable(false);
                                _this.targetYearDD = ko.observableArray([
                                    new ItemModel(1, getText('CMF003_405')),
                                    new ItemModel(2, getText('CMF003_406')),
                                    new ItemModel(3, getText('CMF003_407'))
                                ]);
                                _this.targetMonthDD = ko.observableArray([
                                    new ItemModel(1, getText('CMF003_408')),
                                    new ItemModel(2, getText('CMF003_409')),
                                    new ItemModel(3, getText('CMF003_410')),
                                    new ItemModel(4, getText('CMF003_411')),
                                    new ItemModel(5, getText('CMF003_412')),
                                    new ItemModel(6, getText('CMF003_413')),
                                    new ItemModel(7, getText('CMF003_414')),
                                    new ItemModel(8, getText('CMF003_415')),
                                    new ItemModel(9, getText('CMF003_416')),
                                    new ItemModel(10, getText('CMF003_417')),
                                    new ItemModel(11, getText('CMF003_418')),
                                    new ItemModel(12, getText('CMF003_419'))
                                ]);
                                _this.selectedDailyTargetYear = ko.observable(1);
                                _this.selectedDailyTargetMonth = ko.observable(1);
                                _this.selectedMonthlyTargetYear = ko.observable(1);
                                _this.selectedMonthlyTargetMonth = ko.observable(1);
                                _this.selectedAnnualTargetYear = ko.observable(1);
                                _this.password = ko.observable('');
                                _this.confirmPassword = ko.observable('');
                                _this.isCheckboxActive = ko.observable(false);
                                _this.explanation = ko.observable('');
                                return _this;
                            }
                            ViewModel.prototype.mounted = function () {
                                var vm = this;
                                vm.usePasswordChecked.subscribe(function (value) {
                                    if (value) {
                                        $(".password-input").trigger("validate");
                                    }
                                    else {
                                        $('.password-input').ntsError('clear');
                                    }
                                });
                                vm.selectedSystemType.subscribe(function (value) {
                                    var chain = _.chain(vm.categoriesDefault())
                                        .filter(function (item) { return !_.find(vm.currentCateSelected(), { categoryId: item.categoryId, systemType: item.systemType }); }); // Filter out selected categories
                                    if (Number(value) !== 0) {
                                        chain = chain.filter({ systemType: Number(value) - 1 }); // Filter only selected systemType (if needed)
                                    }
                                    vm.categoriesFiltered(chain.sortBy("categoryId").value()); // Sort categories by categoryId asc
                                    vm.categoriesFiltered.valueHasMutated();
                                });
                                vm.usePasswordChecked.subscribe(function (value) {
                                    if (!value) {
                                        vm.password('');
                                        vm.confirmPassword('');
                                    }
                                });
                                vm.selectedPatternCode.subscribe(function (value) {
                                    var pattern = vm.getPatternById(value);
                                    if (pattern) {
                                        vm.selectPattern(pattern.code, pattern.patternClassification);
                                    }
                                });
                                vm.screenMode.subscribe(function (value) {
                                    if (Number(value) === ScreenMode.NEW) {
                                        vm.selectedPatternCode('');
                                        $("#C10_2 input").focus();
                                    }
                                    else {
                                        $("#C10_4 input").focus();
                                    }
                                });
                                vm.initDisplay();
                            };
                            ViewModel.prototype.initDisplay = function () {
                                var vm = this;
                                vm.screenMode(ScreenMode.NEW);
                                vm.$blockui("grayout").then(function () {
                                    return c_1.service.initDisplay()
                                        .then(function (res) {
                                        vm.checkInCharge(res.pic);
                                        var patternArr = [];
                                        _.map(res.patterns, function (x) {
                                            var p = new Pattern();
                                            p.code = x.patternCode;
                                            p.patternName = x.patternName;
                                            p.patternClassification = x.patternClassification;
                                            p.displayCode = x.patternClassification + x.patternCode;
                                            patternArr.push(p);
                                        });
                                        var arr = [];
                                        _.map(res.categories, function (x) {
                                            var c = vm.convertToCategory(x);
                                            arr.push(c);
                                        });
                                        vm.categoriesDefault(arr);
                                        _.forEach(vm.categoriesDefault(), function (item) { return vm.categoriesFiltered().push(item); });
                                        vm.categoriesFiltered.valueHasMutated();
                                        if (patternArr.length > 0) {
                                            vm.patternList(patternArr);
                                            vm.patternList(_.orderBy(vm.patternList(), ['patternClassification', 'code'], ['desc', 'asc']));
                                            vm.selectedPatternCode(vm.patternList()[0].displayCode);
                                        }
                                    }).fail(function (err) { return vm.$dialog.error({ messageId: err.messageId }); });
                                }).always(function () {
                                    vm.$blockui("clear");
                                    // Move C3_2 into position
                                    $("#C3_2").appendTo("#C4-search-area");
                                });
                            };
                            ViewModel.prototype.refreshNew = function () {
                                var vm = this;
                                vm.screenMode(ScreenMode.NEW);
                                vm.selectedAnnualTargetYear(vm.getDefaultItem(vm.targetYearDD()).code);
                                vm.selectedDailyTargetYear(vm.getDefaultItem(vm.targetYearDD()).code);
                                vm.selectedMonthlyTargetYear(vm.getDefaultItem(vm.targetYearDD()).code);
                                vm.selectedDailyTargetMonth(vm.getDefaultItem(vm.targetMonthDD()).code);
                                vm.selectedMonthlyTargetMonth(vm.getDefaultItem(vm.targetMonthDD()).code);
                                vm.codeValue('');
                                vm.nameValue('');
                                vm.selectedSystemType(0);
                                vm.saveFormatChecked(false);
                                vm.usePasswordChecked(false);
                                vm.password('');
                                vm.confirmPassword('');
                                vm.explanation('');
                                vm.categoriesFiltered([]);
                                _.forEach(vm.categoriesDefault(), function (item) { return vm.categoriesFiltered().push(item); });
                                vm.currentCateSelected([]);
                                vm.disableMoveButton(false);
                                vm.saveFormatEnabled(true);
                                vm.$errors("clear");
                            };
                            ViewModel.prototype.register = function () {
                                var vm = this;
                                if (vm.validateBeforeRegister()) {
                                    vm.$blockui("grayout");
                                    var param_1 = {};
                                    param_1.screenMode = Number(vm.screenMode());
                                    param_1.patternCode = vm.codeValue();
                                    param_1.patternName = vm.nameValue();
                                    param_1.categoriesMaster = vm.currentCateSelected();
                                    param_1.idenSurveyArch = vm.saveFormatChecked();
                                    param_1.dailyReferYear = Number(vm.selectedDailyTargetYear());
                                    param_1.dailyReferMonth = Number(vm.selectedDailyTargetMonth());
                                    param_1.monthlyReferMonth = Number(vm.selectedMonthlyTargetMonth());
                                    param_1.monthlyReferYear = Number(vm.selectedMonthlyTargetYear());
                                    param_1.annualReferYear = Number(vm.selectedAnnualTargetYear());
                                    param_1.patternCompressionPwd = vm.password();
                                    param_1.withoutPassword = Boolean(vm.usePasswordChecked()) ? 1 : 0;
                                    param_1.patternSuppleExplanation = vm.explanation();
                                    c_1.service.addPattern(param_1).then(function () {
                                        vm.$dialog.info({ messageId: "Msg_15" });
                                        if (vm.screenMode() === ScreenMode.NEW) {
                                            var pattern = new Pattern();
                                            pattern.code = param_1.patternCode;
                                            pattern.patternClassification = 0;
                                            pattern.patternName = param_1.patternName;
                                            pattern.displayCode = pattern.patternClassification + pattern.code;
                                            vm.patternList.push(pattern);
                                            vm.patternList(_.orderBy(vm.patternList(), ['patternClassification', 'code'], ['desc', 'asc']));
                                            vm.selectPattern(pattern.code, pattern.patternClassification);
                                            if (vm.selectedPatternCode() === '') {
                                                vm.selectedPatternCode(pattern.displayCode);
                                            }
                                        }
                                        else {
                                            _.find(vm.patternList(), { 'code': param_1.patternCode }).patternName = param_1.patternName;
                                            vm.patternList.valueHasMutated();
                                        }
                                    }).fail(function (err) {
                                        vm.$dialog.error({ messageId: 'Msg_3' });
                                    }).always(function () {
                                        vm.$blockui("clear");
                                    });
                                }
                            };
                            ViewModel.prototype.duplicate = function () {
                                var vm = this;
                                vm.screenMode(ScreenMode.NEW);
                                vm.saveFormatEnabled(true);
                                vm.codeValue('');
                                vm.nameValue('');
                            };
                            ViewModel.prototype.deletePattern = function () {
                                var vm = this;
                                /**
                                 * 確認メッセージ（Msg_18）を表示する
                                 */
                                vm.$dialog.confirm({ messageId: "Msg_18" }).then(function (result) {
                                    /**
                                     * 「いいえ」（ID：Msg_36）をクリック
                                     */
                                    if (result === 'no') {
                                        /**
                                         * 終了状態：削除処理をキャンセル
                                         */
                                        return;
                                    }
                                    /**
                                     * 「はい」（ID：Msg_35）をクリック
                                     */
                                    if (result === 'yes') {
                                        /**
                                         * 終了状態：削除処理を実行
                                         */
                                        var param = {};
                                        vm.$blockui("grayout");
                                        var pattern_1 = vm.getPatternById(vm.selectedPatternCode());
                                        param.patternCode = pattern_1.code;
                                        param.patternClassification = pattern_1.patternClassification;
                                        c_1.service.deletePattern(param).then(function () {
                                            var index = vm.patternList().indexOf(pattern_1);
                                            if (index > -1) {
                                                vm.patternList().splice(index, 1);
                                                vm.patternList.valueHasMutated();
                                                vm.selectedPatternCode('');
                                                if (vm.patternList().length === 0) {
                                                    vm.refreshNew();
                                                }
                                                else if (vm.patternList().length === index) {
                                                    vm.selectPatternByIndex(index - 1);
                                                }
                                                else {
                                                    vm.selectPatternByIndex(index);
                                                }
                                            }
                                            vm.$dialog.info({ messageId: "Msg_16" });
                                        }).always(function () {
                                            vm.$blockui("clear");
                                        });
                                    }
                                });
                            };
                            ViewModel.prototype.selectPattern = function (patternCode, patternClassification) {
                                var vm = this;
                                vm.$blockui("grayout");
                                var param = {};
                                param.patternCode = patternCode;
                                param.patternClassification = patternClassification;
                                param.categories = vm.categoriesDefault();
                                c_1.service.selectPattern(param).then(function (res) {
                                    vm.screenMode(ScreenMode.UPDATE);
                                    vm.screenMode.valueHasMutated();
                                    if (res.pattern) {
                                        var pattern = res.pattern;
                                        vm.codeValue(pattern.patternCode);
                                        vm.nameValue(pattern.patternName);
                                        vm.categoriesFiltered([]);
                                        var arr_1 = [];
                                        _.forEach(res.selectableCategories, function (c) {
                                            var category = vm.convertToCategory(c);
                                            arr_1.push(category);
                                        });
                                        vm.categoriesFiltered(arr_1);
                                        arr_1 = [];
                                        vm.currentCateSelected([]);
                                        _.forEach(res.pattern.selectCategories, function (c) {
                                            var category = vm.convertToCategory(c);
                                            arr_1.push(category);
                                        });
                                        vm.currentCateSelected(arr_1);
                                        vm.saveFormatChecked(pattern.idenSurveyArch === 1);
                                        vm.saveFormatEnabled(pattern.patternClassification === 0);
                                        vm.disableMoveButton(pattern.patternClassification === 1);
                                        vm.selectedDailyTargetMonth(vm.getReferValue(pattern.dailyReferMonth));
                                        vm.selectedDailyTargetYear(vm.getReferValue(pattern.dailyReferYear));
                                        vm.selectedMonthlyTargetMonth(vm.getReferValue(pattern.monthlyReferMonth));
                                        vm.selectedMonthlyTargetYear(vm.getReferValue(pattern.monthlyReferYear));
                                        vm.selectedAnnualTargetYear(vm.getReferValue(pattern.annualReferYear));
                                        vm.usePasswordChecked(pattern.withoutPassword === 1);
                                        vm.password(pattern.patternCompressionPwd);
                                        vm.confirmPassword(pattern.patternCompressionPwd);
                                        vm.explanation(pattern.patternSuppleExplanation);
                                        vm.selectedSystemType(0);
                                    }
                                    //revalidate
                                    vm.$errors("clear");
                                }).always(function () {
                                    vm.$blockui("clear");
                                });
                            };
                            ViewModel.prototype.selectPatternByIndex = function (index) {
                                var vm = this;
                                var pattern = vm.patternList()[index];
                                if (pattern) {
                                    if (vm.selectedPatternCode() === '') {
                                        vm.selectedPatternCode(pattern.displayCode);
                                    }
                                    vm.selectPattern(pattern.code, pattern.patternClassification);
                                }
                            };
                            ViewModel.prototype.getDefaultItem = function (arr) {
                                return arr[0];
                            };
                            ViewModel.prototype.getReferValue = function (value) {
                                return value !== null && value !== void 0 ? value : 1;
                            };
                            ViewModel.prototype.getSystemText = function (type) {
                                switch (type) {
                                    case 0: return getText('Enum_SystemType_PERSON_SYSTEM');
                                    case 1: return getText('Enum_SystemType_ATTENDANCE_SYSTEM');
                                    case 2: return getText('Enum_SystemType_PAYROLL_SYSTEM');
                                    case 3: return getText('Enum_SystemType_OFFICE_HELPER');
                                }
                            };
                            ViewModel.prototype.getPatternById = function (id) {
                                var vm = this;
                                return _.filter(vm.patternList(), function (p) { return p.code === id.substring(1); }).pop();
                            };
                            ViewModel.prototype.convertToCategory = function (c) {
                                var vm = this;
                                var category = new Category();
                                category.categoryId = c.categoryId;
                                category.categoryName = c.categoryName;
                                category.retentionPeriod = getText(c.retentionPeriod);
                                category.systemType = c.systemType;
                                category.contractCode = c.contractCode;
                                category.patternCode = c.patternCode;
                                category.patternClassification = c.patternClassification;
                                category.displayName = c.categoryName + nts.uk.text.format(getText('CMF003_634'), vm.getSystemText(c.systemType));
                                return category;
                            };
                            ViewModel.prototype.checkInCharge = function (pic) {
                                var vm = this;
                                if (pic.personnel)
                                    vm.systemTypes.push(new ItemModel(1, getText('CMF003_400')));
                                if (pic.attendance)
                                    vm.systemTypes.push(new ItemModel(2, getText('CMF003_401')));
                                if (pic.payroll)
                                    vm.systemTypes.push(new ItemModel(3, getText('CMF003_402')));
                                if (pic.officeHelper)
                                    vm.systemTypes.push(new ItemModel(4, getText('CMF003_403')));
                            };
                            ViewModel.prototype.validateBeforeRegister = function () {
                                var vm = this;
                                $("#C7_2 input").trigger("validate");
                                $("#C7_4 input").trigger("validate");
                                if (vm.usePasswordChecked()) {
                                    $("#C9_3 input").trigger("validate");
                                    $("#C9_6 input").trigger("validate");
                                    if (!nts.uk.ui.errors.hasError()) {
                                        if (vm.password() !== vm.confirmPassword()) {
                                            vm.$dialog.error({ messageId: 'Msg_566' });
                                            return false;
                                        }
                                    }
                                }
                                if (Number(vm.currentCateSelected().length) === 0) {
                                    vm.$dialog.error({ messageId: 'Msg_577' });
                                    return false;
                                }
                                if (nts.uk.ui.errors.hasError()) {
                                    return false;
                                }
                                return true;
                            };
                            ViewModel.prototype.checkAfterMoveLeft = function (toRight, oldSource, newI) {
                                var vm = nts.uk.ui._viewModel.content;
                                vm.selectedSystemType.valueHasMutated();
                            };
                            ViewModel.prototype.checkAfterMoveRight = function (toRight, oldSource, newI) {
                                var vm = nts.uk.ui._viewModel.content;
                                vm.currentCateSelected(_.orderBy(vm.currentCateSelected(), ["categoryId"], ["asc"]));
                                vm.currentCateSelected.valueHasMutated();
                            };
                            ViewModel = __decorate([
                                bean()
                            ], ViewModel);
                            return ViewModel;
                        }(ko.ViewModel));
                        c_1.ViewModel = ViewModel;
                        var Pattern = /** @class */ (function () {
                            function Pattern() {
                            }
                            return Pattern;
                        }());
                        c_1.Pattern = Pattern;
                        var Category = /** @class */ (function () {
                            function Category() {
                                this.id = nts.uk.util.randomId();
                            }
                            return Category;
                        }());
                        c_1.Category = Category;
                        var ItemModel = /** @class */ (function () {
                            function ItemModel(code, name) {
                                this.code = code;
                                this.name = name;
                            }
                            return ItemModel;
                        }());
                        c_1.ItemModel = ItemModel;
                        var ScreenMode = /** @class */ (function () {
                            function ScreenMode() {
                            }
                            ScreenMode.NEW = 0;
                            ScreenMode.UPDATE = 1;
                            return ScreenMode;
                        }());
                        c_1.ScreenMode = ScreenMode;
                    })(c = cmf005.c || (cmf005.c = {}));
                })(cmf005 = view.cmf005 || (view.cmf005 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf005.c.vm.js.map