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
/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var at;
        (function (at) {
            var view;
            (function (view) {
                var ccg005;
                (function (ccg005) {
                    var d;
                    (function (d) {
                        var screenModel;
                        (function (screenModel) {
                            var setShared = nts.uk.ui.windows.setShared;
                            var getShared = nts.uk.ui.windows.getShared;
                            var modal = nts.uk.ui.windows.sub.modal;
                            var API = {
                                getFavoriteInformation: "screen/com/ccg005/get-favorite-information",
                                save: "ctx/office/favorite/save",
                                delete: "ctx/office/favorite/delete"
                            };
                            var ViewModel = /** @class */ (function (_super) {
                                __extends(ViewModel, _super);
                                function ViewModel() {
                                    var _this = _super !== null && _super.apply(this, arguments) || this;
                                    //favorite
                                    _this.favoriteList = ko.observableArray([]);
                                    _this.favoriteName = ko.observable("");
                                    _this.selectedFavoriteInputDate = ko.observable();
                                    _this.selectedFavorite = ko.observable();
                                    //work place
                                    _this.workPlaceIdList = ko.observableArray([]);
                                    _this.choosenWkspNames = ko.observableArray([]);
                                    _this.displayChoosenWkspName = ko.computed(function () {
                                        return _this.choosenWkspNames().join('、');
                                    });
                                    //target select
                                    _this.roundingRules = ko.observableArray([
                                        { code: TargetSelection.WORKPLACE, name: _this.$i18n("CCG005_14") },
                                        { code: TargetSelection.AFFILIATION_WORKPLACE, name: _this.$i18n("CCG005_16") }
                                    ]);
                                    _this.selectedRuleCode = ko.observable(TargetSelection.WORKPLACE);
                                    _this.buttonSelectWkspDisable = ko.computed(function () { return _this.selectedRuleCode() === 0; });
                                    //grid column
                                    _this.columns = ko.observableArray([
                                        { headerText: "id", key: "inputDate", width: 150, hidden: true },
                                        { headerText: _this.$i18n("CCG005_11"), key: "favoriteName", width: 150 },
                                    ]);
                                    //mode
                                    _this.mode = ko.observable(Mode.INSERT);
                                    _this.enableDeleteBtn = ko.computed(function () { return _this.mode() === Mode.UPDATE; });
                                    return _this;
                                }
                                ViewModel.prototype.mounted = function () {
                                    var vm = this;
                                    vm.$blockui("grayout");
                                    vm.$ajax(API.getFavoriteInformation).then(function (data) {
                                        vm.favoriteList(data);
                                        if (!(_.isEmpty(data))) {
                                            var first = data[0].inputDate;
                                            vm.selectedFavoriteInputDate(first);
                                            vm.bindingData(first);
                                            vm.mode(Mode.UPDATE);
                                        }
                                        vm.$blockui("clear");
                                    })
                                        .always(function () { return vm.$blockui("clear"); });
                                    vm.selectedFavoriteInputDate.subscribe(function (inputDate) {
                                        vm.mode(Mode.UPDATE);
                                        vm.bindingData(inputDate);
                                    });
                                    vm.selectedRuleCode.subscribe(function (selectRule) {
                                        if (selectRule === TargetSelection.AFFILIATION_WORKPLACE) {
                                            vm.$errors("clear");
                                        }
                                    });
                                    $("#D5_1").focus();
                                };
                                ViewModel.prototype.bindingData = function (inputDate) {
                                    var vm = this;
                                    vm.$errors("clear");
                                    var currentFavor = _.find(vm.favoriteList(), (function (item) { return item.inputDate === inputDate; }));
                                    vm.favoriteName('');
                                    if (currentFavor) {
                                        vm.selectedFavorite(currentFavor);
                                        vm.favoriteName(currentFavor.favoriteName);
                                        vm.selectedRuleCode(currentFavor.targetSelection);
                                        vm.choosenWkspNames(currentFavor.wkspNames);
                                        vm.workPlaceIdList(currentFavor.workplaceId);
                                    }
                                };
                                ViewModel.prototype.callData = function () {
                                    var vm = this;
                                    vm.$blockui("grayout");
                                    vm.$ajax(API.getFavoriteInformation).then(function (data) {
                                        if (data) {
                                            vm.favoriteList(data);
                                            if (vm.mode() === Mode.INSERT) {
                                                var inputDate = data[data.length - 1].inputDate;
                                                vm.selectedFavoriteInputDate(inputDate);
                                                vm.bindingData(inputDate);
                                                vm.mode(Mode.UPDATE);
                                                return;
                                            }
                                            vm.bindingData(vm.selectedFavoriteInputDate());
                                        }
                                    })
                                        .always(function () { return vm.$blockui("clear"); });
                                };
                                ViewModel.prototype.onClickCancel = function () {
                                    var vm = this;
                                    this.$window.close(_.isEmpty(vm.favoriteList()) ? undefined : vm.favoriteList());
                                };
                                ViewModel.prototype.createNewFavorite = function () {
                                    var vm = this;
                                    vm.selectedFavoriteInputDate('');
                                    vm.favoriteName("");
                                    vm.choosenWkspNames([]);
                                    vm.workPlaceIdList([]);
                                    vm.selectedRuleCode(TargetSelection.WORKPLACE);
                                    $("#D5_1").focus();
                                    vm.mode(Mode.INSERT);
                                };
                                ViewModel.prototype.saveFavorite = function () {
                                    var vm = this;
                                    //set error for workplace display name if null
                                    if (vm.buttonSelectWkspDisable() && vm.workPlaceIdList().length === 0) {
                                        $('#D5_4').ntsError('set', { messageId: "Msg_2076" });
                                    }
                                    else {
                                        $('#D5_4').ntsError('clear');
                                    }
                                    vm.$validate().then(function (valid) {
                                        if (valid) {
                                            //new item
                                            if (vm.mode() === Mode.INSERT) {
                                                var favoriteSpecify = new FavoriteSpecifyData({
                                                    favoriteName: vm.favoriteName(),
                                                    creatorId: __viewContext.user.employeeId,
                                                    inputDate: moment().format(),
                                                    targetSelection: vm.selectedRuleCode(),
                                                    workplaceId: vm.selectedRuleCode() === TargetSelection.WORKPLACE ? vm.workPlaceIdList() : [],
                                                    order: vm.getNewOrder(),
                                                    wkspNames: vm.choosenWkspNames()
                                                });
                                                vm.favoriteList.push(favoriteSpecify);
                                            }
                                            else {
                                                _.map(vm.favoriteList(), function (item, index) {
                                                    if (item.inputDate === vm.selectedFavoriteInputDate()) {
                                                        item.favoriteName = vm.favoriteName();
                                                        item.targetSelection = vm.selectedRuleCode();
                                                        item.workplaceId = vm.selectedRuleCode() === TargetSelection.WORKPLACE ? vm.workPlaceIdList() : [];
                                                    }
                                                    item.order = index;
                                                });
                                            }
                                            //Call API
                                            vm.$blockui("grayout");
                                            vm.$ajax(API.save, vm.favoriteList()).then(function () {
                                                vm.callData();
                                                vm.$blockui("clear");
                                                return vm.$dialog.info({ messageId: "Msg_15" });
                                            })
                                                .always(function () { return vm.$blockui("clear"); });
                                        }
                                    });
                                };
                                ViewModel.prototype.getNewOrder = function () {
                                    var vm = this;
                                    if (vm.favoriteList().length === 0) {
                                        return 0;
                                    }
                                    return (vm.favoriteList()[vm.favoriteList().length - 1].order + 1);
                                };
                                ViewModel.prototype.deleteFavorite = function () {
                                    var vm = this;
                                    vm.$dialog.confirm({ messageId: "Msg_18" }).then(function (result) {
                                        if (result === "yes") {
                                            var currentFavor = _.find(vm.favoriteList(), (function (item) { return item.inputDate === vm.selectedFavoriteInputDate(); }));
                                            var index_1 = _.findIndex(vm.favoriteList(), (function (item) { return item.inputDate === vm.selectedFavoriteInputDate(); }));
                                            if (currentFavor) {
                                                var favoriteSpecify = new FavoriteSpecifyDelCommand({
                                                    creatorId: currentFavor.creatorId,
                                                    inputDate: currentFavor.inputDate
                                                });
                                                vm.$blockui("grayout");
                                                vm.$ajax(API.delete, favoriteSpecify).then(function () {
                                                    vm.callData();
                                                    vm.$blockui("clear");
                                                    vm.$dialog.info({ messageId: "Msg_16" }).then(function () {
                                                        if (vm.favoriteList().length === 0) {
                                                            vm.createNewFavorite();
                                                        }
                                                        if (index_1 >= vm.favoriteList().length) {
                                                            vm.selectedFavoriteInputDate(vm.favoriteList()[index_1 - 1].inputDate);
                                                        }
                                                        else {
                                                            vm.selectedFavoriteInputDate(vm.favoriteList()[index_1].inputDate);
                                                        }
                                                    });
                                                })
                                                    .always(function () { return vm.$blockui("clear"); });
                                            }
                                        }
                                    });
                                };
                                ViewModel.prototype.openCDL008Dialog = function () {
                                    var vm = this;
                                    var inputCDL008 = {
                                        startMode: 0,
                                        isMultiple: true,
                                        showNoSelection: false,
                                        selectedCodes: vm.workPlaceIdList(),
                                        isShowBaseDate: true,
                                        baseDate: moment.utc().toISOString(),
                                        selectedSystemType: 2,
                                        isrestrictionOfReferenceRange: false // 参照範囲の絞込 : しない
                                    };
                                    setShared('inputCDL008', inputCDL008);
                                    modal('/view/cdl/008/a/index.xhtml').onClosed(function () {
                                        var isCancel = getShared('CDL008Cancel');
                                        if (isCancel) {
                                            return;
                                        }
                                        var selectedInfo = getShared('workplaceInfor');
                                        var listWorkPlaceId = [];
                                        var listWorkPlaceName = [];
                                        _.map(selectedInfo, (function (item) {
                                            listWorkPlaceId.push(item.id);
                                            listWorkPlaceName.push(item.displayName);
                                        }));
                                        vm.workPlaceIdList(listWorkPlaceId);
                                        vm.choosenWkspNames(listWorkPlaceName);
                                        if (listWorkPlaceId.length > 0) {
                                            $('#D5_4').ntsError('clear');
                                        }
                                    });
                                };
                                ViewModel = __decorate([
                                    bean()
                                ], ViewModel);
                                return ViewModel;
                            }(ko.ViewModel));
                            screenModel.ViewModel = ViewModel;
                            var TargetSelection;
                            (function (TargetSelection) {
                                // 職場
                                TargetSelection[TargetSelection["WORKPLACE"] = 0] = "WORKPLACE";
                                // 所属職場
                                TargetSelection[TargetSelection["AFFILIATION_WORKPLACE"] = 1] = "AFFILIATION_WORKPLACE";
                            })(TargetSelection || (TargetSelection = {}));
                            var Mode;
                            (function (Mode) {
                                Mode[Mode["INSERT"] = 0] = "INSERT";
                                Mode[Mode["UPDATE"] = 1] = "UPDATE";
                            })(Mode || (Mode = {}));
                            var FavoriteSpecifyData = /** @class */ (function () {
                                function FavoriteSpecifyData(init) {
                                    $.extend(this, init);
                                }
                                return FavoriteSpecifyData;
                            }());
                            var FavoriteSpecifyDelCommand = /** @class */ (function () {
                                function FavoriteSpecifyDelCommand(init) {
                                    $.extend(this, init);
                                }
                                return FavoriteSpecifyDelCommand;
                            }());
                        })(screenModel = d.screenModel || (d.screenModel = {}));
                    })(d = ccg005.d || (ccg005.d = {}));
                })(ccg005 = view.ccg005 || (view.ccg005 = {}));
            })(view = at.view || (at.view = {}));
        })(at = uk.at || (uk.at = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg005.d.vm.js.map