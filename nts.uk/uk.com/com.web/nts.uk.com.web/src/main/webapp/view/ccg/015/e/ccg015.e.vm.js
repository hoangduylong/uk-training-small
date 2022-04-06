/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />
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
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg015;
                (function (ccg015) {
                    var e;
                    (function (e) {
                        var MENU_CREATION_LAYOUT_ID = 'menu-creation-layout';
                        var CSS_CLASS_MENU_CREATION_ITEM_CONTAINER = 'menu-creation-item-container';
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.params = {};
                                _this.topPageCode = ko.observable('');
                                _this.layoutNo = ko.observable(0);
                                _this.$menuCreationLayout = null;
                                _this.isMouseInsideLayout = ko.observable(false);
                                _this.itemList = ko.observableArray([]);
                                _this.isRenderKTG001 = ko.observable(true);
                                _this.isRenderKTG004 = ko.observable(true);
                                _this.isRenderKTG005 = ko.observable(true);
                                _this.sortedIds = [];
                                return _this;
                            }
                            ScreenModel.prototype.created = function (params) {
                                var vm = this;
                                vm.params = params;
                            };
                            ScreenModel.prototype.mounted = function () {
                                var vm = this;
                                // Init dropable layout
                                vm.$menuCreationLayout = $("#".concat(MENU_CREATION_LAYOUT_ID));
                                vm.$menuCreationLayout
                                    .mouseenter(function () {
                                    vm.isMouseInsideLayout(true);
                                })
                                    .mouseleave(function () {
                                    vm.isMouseInsideLayout(false);
                                });
                                // Init dragable item
                                var menuPosition = -1;
                                $(".menu-creation-option:not(.disabled)").draggable({
                                    connectToSortable: "#".concat(MENU_CREATION_LAYOUT_ID),
                                    helper: "clone",
                                    start: function (event, ui) {
                                        LayoutUtils.startDragItemFromMenu(ui);
                                    },
                                    drag: function (event, ui) {
                                        menuPosition = _.findIndex(vm.$menuCreationLayout.children(), function (item) { return item.classList.contains('menu-creation-option'); });
                                    },
                                    stop: function (event, ui) {
                                        var itemType = ui.helper.prevObject.attr('id');
                                        // Remove drag item
                                        ui.helper.remove();
                                        setTimeout(function () {
                                            if (vm.isMouseInsideLayout() && menuPosition >= 0) {
                                                vm.createItem(itemType, menuPosition);
                                            }
                                        }, 300);
                                    },
                                });
                                vm.loadData(vm.params);
                            };
                            /**
                             * Create new item on drop from menu
                             * @param item
                             */
                            ScreenModel.prototype.createItem = function (partType, position) {
                                var vm = this;
                                // Disable menu
                                LayoutUtils.disableMenu(partType);
                                var lastOrder = 0;
                                // Find max order in list
                                for (var _i = 0, _a = vm.itemList(); _i < _a.length; _i++) {
                                    var item = _a[_i];
                                    if (item.order > lastOrder) {
                                        lastOrder = item.order;
                                    }
                                }
                                // Add new item
                                var newItem = LayoutUtils.convertWidgetToItem(partType, lastOrder + 1);
                                if (newItem) {
                                    vm.itemList.splice(position, 0, newItem);
                                }
                                vm.checkData();
                            };
                            // ウィジェットを取消する
                            ScreenModel.prototype.removeItem = function (itemType) {
                                var vm = this;
                                // Remove item in menu creation layout
                                var itemindex = _.findIndex(vm.itemList(), function (item) { return item.itemType === itemType; });
                                if (itemindex >= 0) {
                                    // Remove item data
                                    var tempList = vm.itemList();
                                    tempList.splice(itemindex, 1);
                                    vm.itemList(tempList);
                                    // Remove item DOM
                                    vm.$menuCreationLayout
                                        .find(".".concat(CSS_CLASS_MENU_CREATION_ITEM_CONTAINER, "[id=").concat(itemType, "]"))
                                        .remove();
                                }
                                // Enable item drag in menu
                                LayoutUtils.enableMenu(itemType);
                            };
                            ScreenModel.prototype.onClickSetting = function (itemType) {
                                var vm = this;
                                var StandardWidgetTypeKTG004 = "0003";
                                var StandardWidgetTypeKTG005 = "0001";
                                var StandardWidgetTypeKTG001 = "0002";
                                if (itemType === MenuPartType.PART_KTG_004) {
                                    vm.$window
                                        .modal('at', '/view/ktg/004/b/index.xhtml', StandardWidgetTypeKTG004)
                                        .then(function () { return vm.isRenderKTG004(false); })
                                        .then(function () { return vm.isRenderKTG004(true); });
                                }
                                else if (itemType === MenuPartType.PART_KTG_005) {
                                    vm.$window
                                        .modal('at', '/view/ktg/005/b/index.xhtml', StandardWidgetTypeKTG005)
                                        .then(function () { return vm.isRenderKTG005(false); })
                                        .then(function () { return vm.isRenderKTG005(true); });
                                }
                                else {
                                    vm.$window
                                        .modal('at', '/view/ktg/001/b/index.xhtml', StandardWidgetTypeKTG001)
                                        .then(function () { return vm.isRenderKTG001(false); })
                                        .then(function () { return vm.isRenderKTG001(true); });
                                }
                            };
                            ScreenModel.prototype.close = function () {
                                var vm = this;
                                vm.$window.close();
                            };
                            ScreenModel.prototype.loadData = function (params) {
                                var vm = this;
                                if (params) {
                                    if (params.topPageModel && params.topPageModel.topPageCode) {
                                        vm.topPageCode(params.topPageModel.topPageCode);
                                    }
                                    if (params.frame === 2) {
                                        vm.layoutNo(1);
                                    }
                                    else if (params.frame === 3) {
                                        vm.layoutNo(2);
                                    }
                                }
                                var layoutRquest = {
                                    topPageCode: vm.topPageCode(),
                                    layoutNo: vm.layoutNo()
                                };
                                vm.$blockui("grayout");
                                vm.$ajax('/toppage/getLayout', layoutRquest)
                                    .then(function (result) {
                                    if (result.widgetSettings && result.widgetSettings.length) {
                                        // Save item list
                                        var itemList = _.chain(result.widgetSettings)
                                            .map(function (item) { return new WidgetTypeModel({
                                            order: item.order,
                                            widgetType: item.widgetType,
                                        }); })
                                            .orderBy('order', 'asc')
                                            .map(function (widget) { return LayoutUtils.convertWidgetToItem(widget.widgetType.toString(), widget.order); })
                                            .filter(function (item) { return item; })
                                            .value();
                                        vm.itemList(itemList);
                                        // Disable menu
                                        for (var _i = 0, itemList_1 = itemList; _i < itemList_1.length; _i++) {
                                            var item = itemList_1[_i];
                                            LayoutUtils.disableMenu(item.itemType);
                                        }
                                    }
                                })
                                    .always(function () { return vm.$blockui("clear"); });
                            };
                            ScreenModel.prototype.saveData = function () {
                                var vm = this;
                                var sortedWidgetList = _.map(vm.itemList(), function (item, index) { return new WidgetTypeModel({
                                    order: index,
                                    widgetType: Number(item.itemType),
                                }); });
                                var requestParams = {
                                    topPageCode: vm.topPageCode(),
                                    layoutNo: vm.layoutNo(),
                                    layoutType: 3,
                                    widgetSettings: sortedWidgetList,
                                };
                                vm.$blockui("grayout");
                                vm.$ajax('/toppage/saveLayoutWidget', requestParams)
                                    .then(function () {
                                    vm.$blockui("clear");
                                    vm.$dialog.info({ messageId: "Msg_15" });
                                })
                                    .always(function () { return vm.$blockui("clear"); });
                            };
                            ScreenModel.prototype.checkData = function () {
                                var vm = this;
                                var sortedWidgetList = _.map(vm.itemList(), function (item, index) { return new WidgetTypeModel({
                                    order: index,
                                    widgetType: Number(item.itemType),
                                }); });
                                var listItem = _.map(sortedWidgetList, function (item) { return item.widgetType; });
                                vm.$ajax('/toppage/checkData', listItem).then(function (flag) {
                                    if (!flag) {
                                        vm.$dialog.error({ messageId: "Msg_2140" });
                                    }
                                });
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        e.ScreenModel = ScreenModel;
                        var LayoutUtils = /** @class */ (function () {
                            function LayoutUtils() {
                            }
                            /**
                             * Start drag item from menu
                             * @param item
                             * @param width
                             * @param height
                             */
                            LayoutUtils.startDragItemFromMenu = function (item) {
                                // Init size + style for dragging item
                                item.helper.css({ 'opacity': '0.7' });
                            };
                            LayoutUtils.enableMenu = function (partType) {
                                $("#menu-item-container #".concat(partType, ".menu-creation-option"))
                                    .removeClass('disabled')
                                    .draggable('enable');
                            };
                            LayoutUtils.disableMenu = function (partType) {
                                $("#menu-item-container #".concat(partType, ".menu-creation-option"))
                                    .addClass('disabled')
                                    .draggable('disable');
                            };
                            LayoutUtils.convertWidgetToItem = function (type, order) {
                                var newItem = null;
                                switch (type) {
                                    case MenuPartType.PART_KTG_005:
                                        newItem = new ItemModel({
                                            itemType: type,
                                            url: '/nts.uk.at.web/view/ktg/005/a/index.xhtml',
                                            order: order,
                                        });
                                        break;
                                    case MenuPartType.PART_KTG_001:
                                        newItem = new ItemModel({
                                            itemType: type,
                                            url: '/nts.uk.at.web/view/ktg/001/a/index.xhtml',
                                            order: order,
                                        });
                                        break;
                                    case MenuPartType.PART_KTG_004:
                                        newItem = new ItemModel({
                                            itemType: type,
                                            url: '/nts.uk.at.web/view/ktg/004/a/index.xhtml',
                                            order: order,
                                        });
                                        break;
                                    case MenuPartType.PART_KTG_026:
                                        newItem = new ItemModel({
                                            itemType: type,
                                            url: '/nts.uk.at.web/view/ktg/026/a/index.xhtml',
                                            order: order,
                                        });
                                        break;
                                    case MenuPartType.PART_KTG_027:
                                        newItem = new ItemModel({
                                            itemType: type,
                                            url: '/nts.uk.at.web/view/ktg/027/a/index.xhtml',
                                            order: order,
                                        });
                                        break;
                                    case MenuPartType.PART_KDP_001:
                                        newItem = new ItemModel({
                                            itemType: type,
                                            url: '/nts.uk.at.web/view/kdp/001/a/index.xhtml',
                                            order: order,
                                        });
                                        break;
                                    case MenuPartType.PART_KTG_031:
                                        newItem = new ItemModel({
                                            itemType: type,
                                            url: '/nts.uk.at.web/view/ktg/031/a/index.xhtml',
                                            order: order,
                                        });
                                        break;
                                    case MenuPartType.PART_CCG_005:
                                        newItem = new ItemModel({
                                            itemType: type,
                                            url: '/nts.uk.com.web/view/ccg/005/a/index.xhtml',
                                            order: order,
                                        });
                                        break;
                                    default:
                                        break;
                                }
                                return newItem;
                            };
                            return LayoutUtils;
                        }());
                        e.LayoutUtils = LayoutUtils;
                        var MenuPartType;
                        (function (MenuPartType) {
                            MenuPartType["PART_KTG_005"] = "0";
                            MenuPartType["PART_KTG_001"] = "1";
                            MenuPartType["PART_KTG_004"] = "2";
                            MenuPartType["PART_KTG_026"] = "3";
                            MenuPartType["PART_KTG_027"] = "4";
                            MenuPartType["PART_KDP_001"] = "5";
                            MenuPartType["PART_KTG_031"] = "6";
                            MenuPartType["PART_CCG_005"] = "7";
                        })(MenuPartType = e.MenuPartType || (e.MenuPartType = {}));
                        var WidgetTypeModel = /** @class */ (function () {
                            function WidgetTypeModel(init) {
                                $.extend(this, init);
                            }
                            return WidgetTypeModel;
                        }());
                        e.WidgetTypeModel = WidgetTypeModel;
                        var ItemModel = /** @class */ (function () {
                            function ItemModel(init) {
                                $.extend(this, init);
                                this.isShowSetting = (init.itemType === MenuPartType.PART_KTG_004
                                    || init.itemType === MenuPartType.PART_KTG_005
                                    || init.itemType === MenuPartType.PART_KTG_001);
                            }
                            ItemModel.prototype.isComponent = function () {
                                return this.isKTG026() || this.isKTG027() || this.isKTG031() || this.isCCG005() || this.isKTG001() || this.isKTG005 || this.isKTG004 || this.isKDP001();
                            };
                            ItemModel.prototype.isKTG026 = function () {
                                return this.itemType === MenuPartType.PART_KTG_026;
                            };
                            ItemModel.prototype.isKTG027 = function () {
                                return this.itemType === MenuPartType.PART_KTG_027;
                            };
                            ItemModel.prototype.isKTG031 = function () {
                                return this.itemType === MenuPartType.PART_KTG_031;
                            };
                            ItemModel.prototype.isCCG005 = function () {
                                return this.itemType === MenuPartType.PART_CCG_005;
                            };
                            ItemModel.prototype.isKTG001 = function () {
                                return this.itemType === MenuPartType.PART_KTG_001;
                            };
                            ItemModel.prototype.isKTG004 = function () {
                                return this.itemType === MenuPartType.PART_KTG_004;
                            };
                            ItemModel.prototype.isKTG005 = function () {
                                return this.itemType === MenuPartType.PART_KTG_005;
                            };
                            ItemModel.prototype.isKDP001 = function () {
                                return this.itemType === MenuPartType.PART_KDP_001;
                            };
                            return ItemModel;
                        }());
                        e.ItemModel = ItemModel;
                    })(e = ccg015.e || (ccg015.e = {}));
                })(ccg015 = view.ccg015 || (view.ccg015 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg015.e.vm.js.map