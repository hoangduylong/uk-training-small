/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />
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
                var ccg034;
                (function (ccg034) {
                    var d;
                    (function (d) {
                        // URL API backend
                        var API = {
                            generateHtml: "sys/portal/createflowmenu/generateHtml",
                            updateLayout: "sys/portal/createflowmenu/updateLayout",
                            getMenuList: "sys/portal/standardmenu/findByMenuAndWebMenu",
                            copyFile: "sys/portal/createflowmenu/copyFile/{0}"
                        };
                        var KEY_DATA_PART_TYPE = 'data-part-type';
                        var MENU_CREATION_LAYOUT_ID = 'menu-creation-layout';
                        var ITEM_HIGHLIGHT_ID = 'item-highlight';
                        var ITEM_COPY_PLACEHOLDER_ID = 'item-copy-placeholder';
                        var KEY_DATA_ITEM_CLIENT_ID = 'data-item-client-id';
                        var CSS_CURSOR_NOT_ALLOWED = 'not-allowed';
                        var CSS_CLASS_UI_SELECTED = 'ui-selected';
                        var CSS_CLASS_UI_RESIZABLE_S = 'ui-resizable-s';
                        var CSS_CLASS_UI_RESIZABLE_E = 'ui-resizable-e';
                        var CSS_CLASS_UI_RESIZABLE_SE = 'ui-resizable-se';
                        var CSS_CLASS_PART_SETTING_POPUP_OPTION = 'part-setting-popup-option';
                        var CSS_CLASS_MENU_CREATION_ITEM_CONTAINER = 'menu-creation-item-container';
                        var CSS_CLASS_MENU_CREATION_ITEM = 'menu-creation-item';
                        var CSS_CLASS_MENU_CREATION_ITEM_COPY_PLACEHOLDER = 'menu-creation-item-copy-placeholder';
                        var CSS_CLASS_CCG034_HYPERLINK = 'ccg034-hyperlink';
                        var CELL_SIZE = 40;
                        var CREATION_LAYOUT_WIDTH = 1920;
                        var CREATION_LAYOUT_HEIGHT = 1080;
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.$menuCreationLayoutContainer = null;
                                _this.$menuCreationLayout = null;
                                _this.$hoverHighlight = null;
                                _this.$copyPlaceholder = null;
                                _this.$listPart = [];
                                _this.partClientId = 0;
                                _this.mapPartData = {};
                                _this.modifiedPartList = new ModifiedPartList();
                                _this.maxHeight = ko.observable(0);
                                _this.maxWidth = ko.observable(0);
                                _this.flowMenuCode = ko.observable(null);
                                _this.flowMenuFileId = ko.observable(null);
                                _this.flowMenuData = ko.observable(null);
                                _this.menuName = ko.observable(null);
                                _this.isMouseInsideLayout = ko.observable(false);
                                _this.isCopying = ko.observable(false);
                                _this.copyingPartId = ko.observable(null);
                                _this.layoutOffsetLeft = ko.observable(null);
                                _this.layoutOffsetTop = ko.observable(null);
                                return _this;
                            }
                            ScreenModel.prototype.created = function (params) {
                                var vm = this;
                                vm.flowMenuCode(params.flowMenuCode);
                                if (params.flowMenuData) {
                                    var flowMenuData = params.flowMenuData;
                                    vm.flowMenuFileId(flowMenuData.fileId);
                                    vm.flowMenuData(flowMenuData);
                                    vm.menuName("".concat(vm.flowMenuCode(), " ").concat(vm.flowMenuData().flowMenuName));
                                }
                                // Init text resource
                                vm.layoutSizeText = ko.computed(function () { return vm.$i18n('CCG034_50', [vm.maxWidth().toString(), vm.maxHeight().toString()]); });
                            };
                            ScreenModel.prototype.mounted = function () {
                                var vm = this;
                                // Store creation layout as class variable for easier access
                                vm.$menuCreationLayout = $("#".concat(MENU_CREATION_LAYOUT_ID));
                                vm.$menuCreationLayoutContainer = $('.menu-creation-layout-container');
                                vm.$menuCreationLayout
                                    .outerWidth(CREATION_LAYOUT_WIDTH)
                                    .outerHeight(CREATION_LAYOUT_HEIGHT);
                                // Init dragable item
                                $(".menu-creation-option").draggable({
                                    appendTo: "#".concat(MENU_CREATION_LAYOUT_ID),
                                    helper: "clone",
                                    start: function (event, ui) {
                                        LayoutUtils.startDragItemFromMenu(ui);
                                    },
                                    drag: function (event, ui) {
                                        var partSize = LayoutUtils.getPartSize(ui.helper.attr(KEY_DATA_PART_TYPE));
                                        vm.renderHoveringItemOnDrag(ui, partSize.width, partSize.height);
                                    },
                                    stop: function (event, ui) {
                                        vm.$hoverHighlight.remove();
                                        if (vm.isMouseInsideLayout()) {
                                            vm.createItemFromMenu(ui, ui.helper.attr(KEY_DATA_PART_TYPE));
                                        }
                                    },
                                });
                                // Init dropable layout
                                vm.$menuCreationLayout
                                    .droppable({
                                    accept: ".menu-creation-item-container",
                                })
                                    .mouseenter(function () { return vm.isMouseInsideLayout(true); })
                                    .mouseleave(function () { return vm.isMouseInsideLayout(false); })
                                    .mousedown(function (event) {
                                    $(".part-setting").filter(function (index, e) { return $(e).css('display') === ('block'); }).removeAttr("style");
                                    // If layout in copy mode and mouse cursor is stay inside layout
                                    if (vm.isCopying() && vm.isMouseInsideLayout()) {
                                        // Stop copy mode
                                        vm.isCopying(false);
                                        // Clear mouse event handler
                                        vm.$menuCreationLayout.off('mousemove');
                                        // Remove placeholder
                                        vm.$copyPlaceholder.remove();
                                        vm.$hoverHighlight.remove();
                                        // Create copy item
                                        var offsetX = event.pageX - vm.layoutOffsetLeft();
                                        var offsetY = event.pageY - vm.layoutOffsetTop();
                                        // Calculate copy item div position
                                        var oldPartData = vm.mapPartData[vm.copyingPartId()];
                                        var positionTop = LayoutUtils.calculatePositionTop(oldPartData.height, offsetY);
                                        var positionLeft = LayoutUtils.calculatePositionLeft(oldPartData.width, offsetX);
                                        // Check overlap
                                        var overlappingParts = vm.getOverlappingPart(new PartDataModel({
                                            width: oldPartData.width,
                                            height: oldPartData.height,
                                            positionTop: positionTop,
                                            positionLeft: positionLeft,
                                        }));
                                        if (!overlappingParts.length) {
                                            // Create new part div
                                            var newPartData = vm.copyPartData(oldPartData, positionTop, positionLeft);
                                            vm.createDOMFromData(newPartData);
                                        }
                                    }
                                });
                                // Load part DOMs to creation layout
                                if (vm.flowMenuData()) {
                                    vm.$blockui('grayout');
                                    vm.loadPartDomToLayout(vm.flowMenuData());
                                    vm.$blockui('clear');
                                }
                                // Get standardMenu
                                vm.getStandardMenu();
                                // Re-calculate resolution
                                vm.calculateResolution();
                                // Focus
                                $("#D6").focus();
                            };
                            /**
                             * Load part DOMs to creation layout
                             */
                            ScreenModel.prototype.loadPartDomToLayout = function (flowData) {
                                var vm = this;
                                var $partDOMs = [];
                                // MenuSettingDto
                                for (var _i = 0, _a = flowData.menuData; _i < _a.length; _i++) {
                                    var partDataDto = _a[_i];
                                    var newPartData = vm.createPartDataFromDtoMenu(partDataDto);
                                    // Set part data to layout
                                    $partDOMs.push(vm.createDOMFromData(newPartData));
                                }
                                // LabelSettingDto
                                for (var _b = 0, _c = flowData.labelData; _b < _c.length; _b++) {
                                    var partDataDto = _c[_b];
                                    var newPartData = vm.createPartDataFromDtoLabel(partDataDto);
                                    // Set part data to layout
                                    $partDOMs.push(vm.createDOMFromData(newPartData));
                                }
                                // LinkSettingDto
                                for (var _d = 0, _e = flowData.linkData; _d < _e.length; _d++) {
                                    var partDataDto = _e[_d];
                                    var newPartData = vm.createPartDataFromDtoLink(partDataDto);
                                    // Set part data to layout
                                    $partDOMs.push(vm.createDOMFromData(newPartData));
                                }
                                var _loop_1 = function (partDataDto) {
                                    var newPartData = vm.createPartDataFromDtoFileAttachment(partDataDto);
                                    if (LayoutUtils.isValidFile(newPartData.fileId)) {
                                        vm.$ajax("/shr/infra/file/storage/isexist/" + newPartData.fileId).then(function (isExist) {
                                            if (isExist) {
                                                vm.$ajax("/shr/infra/file/storage/infor/" + newPartData.fileId)
                                                    .then(function (res) {
                                                    newPartData.fileName = res.originalName;
                                                    // Set part data to layout
                                                    $partDOMs.push(vm.createDOMFromData(newPartData));
                                                });
                                            }
                                            else {
                                                // Set part data to layout
                                                $partDOMs.push(vm.createDOMFromData(newPartData));
                                            }
                                        });
                                    }
                                    else {
                                        // Set part data to layout
                                        $partDOMs.push(vm.createDOMFromData(newPartData));
                                    }
                                };
                                // FileAttachmentSettingDto
                                for (var _f = 0, _g = flowData.fileAttachmentData; _f < _g.length; _f++) {
                                    var partDataDto = _g[_f];
                                    _loop_1(partDataDto);
                                }
                                // ImageSettingDto
                                for (var _h = 0, _j = flowData.imageData; _h < _j.length; _h++) {
                                    var partDataDto = _j[_h];
                                    var newPartData = vm.createPartDataFromDtoImage(partDataDto);
                                    // Set part data to layout
                                    $partDOMs.push(vm.createDOMFromData(newPartData));
                                }
                                // ArrowSettingDto
                                for (var _k = 0, _l = flowData.arrowData; _k < _l.length; _k++) {
                                    var partDataDto = _l[_k];
                                    var newPartData = vm.createPartDataFromDtoArrow(partDataDto);
                                    // Set part data to layout
                                    $partDOMs.push(vm.createDOMFromData(newPartData));
                                }
                                // Append new part to layout
                                vm.$menuCreationLayout.append($partDOMs);
                                // Re-calculate resolution
                                vm.calculateResolution();
                            };
                            /**
                             * Create new item on drop from menu
                             * @param item
                             */
                            ScreenModel.prototype.createItemFromMenu = function (part, partType) {
                                var vm = this;
                                var partSize = LayoutUtils.getPartSize(partType);
                                // Calculate new part div position
                                var positionTop = part.position.top > 0 ? Math.round(part.position.top / CELL_SIZE) * CELL_SIZE : 0;
                                var positionLeft = part.position.left > 0 ? Math.round(part.position.left / CELL_SIZE) * CELL_SIZE : 0;
                                // Check overlap
                                var overlappingParts = vm.getOverlappingPart(new PartDataModel({
                                    width: partSize.width,
                                    height: partSize.height,
                                    positionTop: positionTop,
                                    positionLeft: positionLeft,
                                }));
                                if (!overlappingParts.length) {
                                    // Create new part div
                                    var newPartData = vm.createDefaultPartData(partType, partSize, positionTop, positionLeft);
                                    // Check if overlap is allowed or not
                                    var $newPart = vm.createDOMFromData(newPartData);
                                    // Open PartSetting Dialog
                                    vm.openPartSettingDialog($newPart, true);
                                }
                            };
                            /**
                             * Create new DOM based on part data
                             */
                            ScreenModel.prototype.createDOMFromData = function (partData) {
                                var vm = this;
                                var $newPartTemplate = null;
                                var isInside = false;
                                switch (partData.partType) {
                                    case MenuPartType.PART_MENU:
                                        $newPartTemplate = $("<div>", { "class": CSS_CLASS_MENU_CREATION_ITEM_CONTAINER }).append($('<div>', { 'class': "".concat(CSS_CLASS_MENU_CREATION_ITEM, " part-menu") }));
                                        break;
                                    case MenuPartType.PART_LABEL:
                                        $newPartTemplate = $("<div>", { "class": CSS_CLASS_MENU_CREATION_ITEM_CONTAINER }).append($('<div>', { 'class': "".concat(CSS_CLASS_MENU_CREATION_ITEM, " part-label") }));
                                        break;
                                    case MenuPartType.PART_LINK:
                                        $newPartTemplate = $("<div>", { "class": CSS_CLASS_MENU_CREATION_ITEM_CONTAINER }).append($('<div>', { 'class': "".concat(CSS_CLASS_MENU_CREATION_ITEM, " part-link") }));
                                        break;
                                    case MenuPartType.PART_ATTACHMENT:
                                        $newPartTemplate = $("<div>", { "class": CSS_CLASS_MENU_CREATION_ITEM_CONTAINER }).append($('<div>', { 'class': "".concat(CSS_CLASS_MENU_CREATION_ITEM, " part-attachment") }));
                                        break;
                                    case MenuPartType.PART_IMAGE:
                                        $newPartTemplate = $("<div>", { "class": CSS_CLASS_MENU_CREATION_ITEM_CONTAINER }).append($('<div>', { 'class': "".concat(CSS_CLASS_MENU_CREATION_ITEM, " part-image") }));
                                        break;
                                    case MenuPartType.PART_ARROW:
                                        $newPartTemplate = $("<div>", { "class": CSS_CLASS_MENU_CREATION_ITEM_CONTAINER }).append($('<div>', { 'class': "".concat(CSS_CLASS_MENU_CREATION_ITEM, " part-arrow") }));
                                        break;
                                    default:
                                        $newPartTemplate = $("<div>", { "class": CSS_CLASS_MENU_CREATION_ITEM_CONTAINER }).append($('<div>', { 'class': "".concat(CSS_CLASS_MENU_CREATION_ITEM, " part-menu") }));
                                        break;
                                }
                                var $newPart = LayoutUtils.renderPartDOM($newPartTemplate, partData)
                                    .hover(function (handlerIn) { return LayoutUtils.onPartHover($newPart, true); }, function (handlerOut) { return LayoutUtils.onPartHover($newPart, false); })
                                    .on("mousedown", function (event) { return LayoutUtils.onPartClickSetting($newPart, isInside); });
                                // Render div setting
                                var $partSetting = $("<div>", { "class": 'part-setting' })
                                    .hover(function (handlerIn) { return isInside = true; }, function (handlerOut) { return isInside = false; })
                                    .on("click", function (event) {
                                    event.stopPropagation();
                                    // Ignore when clicked inside the popup option
                                    if (event.target.classList.contains("part-setting-popup-option")) {
                                        isInside = false;
                                    }
                                    LayoutUtils.onPartClickSetting($newPart, isInside);
                                });
                                var $partSettingPopup = $("<div>", { "class": 'part-setting-popup' })
                                    .css({ 'display': 'none' })
                                    .append($("<div>", { "class": CSS_CLASS_PART_SETTING_POPUP_OPTION, text: vm.$i18n('CCG034_150') })
                                    .on('click', function (event) {
                                    LayoutUtils.onPartClickSetting($newPart, false);
                                    vm.openPartSettingDialog($newPart);
                                }))
                                    .append($("<div>", { "class": CSS_CLASS_PART_SETTING_POPUP_OPTION, text: vm.$i18n('CCG034_151') })
                                    .on('click', function (event) {
                                    LayoutUtils.onPartClickSetting($newPart, false);
                                    vm.copyPart($newPart);
                                }))
                                    .append($("<div>", { "class": CSS_CLASS_PART_SETTING_POPUP_OPTION, text: vm.$i18n('CCG034_152') })
                                    .on('click', function (event) {
                                    LayoutUtils.onPartClickSetting($newPart, false);
                                    vm.removePart($newPart);
                                }));
                                $partSettingPopup.appendTo($partSetting);
                                $partSetting.appendTo($newPart);
                                // Check and remove overlap part (both DOM element and data by calling JQuery.remove())
                                // vm.filterOverlappingPart(partData); // No need for filter overlap part
                                // Add new item to origin list
                                vm.$listPart.push($newPart);
                                // Append to creation layout
                                vm.$menuCreationLayout.append($newPart);
                                // Init selectable creation layout
                                vm.$menuCreationLayout.selectable({
                                    // To disable lasso, set this distance value (pixels) high enough so that selecting will not start
                                    distance: 1000000,
                                    selected: function (event, ui) {
                                        $(ui.selected)
                                            .addClass(CSS_CLASS_UI_SELECTED)
                                            .siblings()
                                            .removeClass(CSS_CLASS_UI_SELECTED);
                                    },
                                    unselected: function (event, ui) {
                                        // Hide part setting on unselected menu item
                                        if ($(ui.unselected).hasClass(CSS_CLASS_MENU_CREATION_ITEM_CONTAINER)) {
                                            $(ui.unselected)
                                                .find('.part-setting-popup')
                                                .css({ 'display': 'none' });
                                        }
                                    }
                                });
                                // Wait for UI refresh
                                vm.$nextTick(function () {
                                    $newPart
                                        // Init/enable resize
                                        .resizable({
                                        disabled: false,
                                        resize: function (eventResizing, uiResizing) { return vm.onItemResizing(eventResizing, uiResizing); },
                                        stop: function (eventResizeStop, uiResizeStop) { return vm.onItemStopResize(eventResizeStop, uiResizeStop); },
                                    })
                                        // Init/enable dragable
                                        .draggable({
                                        disabled: false,
                                        containment: "#".concat(MENU_CREATION_LAYOUT_ID),
                                        drag: function (eventDraging, uiDraging) { return vm.onItemDraging(eventDraging, uiDraging); },
                                        stop: function (eventDragStop, uiDragStop) { return vm.onItemDragStop(eventDragStop, uiDragStop); },
                                    })
                                        // Fix bug when resizable/draggable conflict with selectable
                                        .on("click", function () {
                                        $newPart
                                            .addClass(CSS_CLASS_UI_SELECTED)
                                            .siblings()
                                            .removeClass(CSS_CLASS_UI_SELECTED);
                                    });
                                    vm.$menuCreationLayout.on("click", function (e) {
                                        if (e.target.id === MENU_CREATION_LAYOUT_ID) {
                                            $(".".concat(CSS_CLASS_UI_SELECTED)).removeClass(CSS_CLASS_UI_SELECTED);
                                            LayoutUtils.onPartClickSetting($newPart, false);
                                        }
                                    });
                                });
                                // Re-calculate resolution
                                vm.calculateResolution();
                                return $newPart;
                            };
                            ScreenModel.prototype.onItemResizing = function (event, ui) {
                                var vm = this;
                                var partClientId = Number(ui.element.attr(KEY_DATA_ITEM_CLIENT_ID));
                                var partData = vm.mapPartData[partClientId];
                                vm.renderHoveringItemOnResize(ui, partData);
                            };
                            ScreenModel.prototype.onItemStopResize = function (event, ui) {
                                var vm = this;
                                vm.$hoverHighlight.remove();
                                vm.resizeItem(ui);
                            };
                            ScreenModel.prototype.onItemDraging = function (event, ui) {
                                var vm = this;
                                var partDataClientId = Number(ui.helper.attr(KEY_DATA_ITEM_CLIENT_ID));
                                var partData = vm.mapPartData[partDataClientId];
                                vm.renderHoveringItemOnDrag(ui, partData.width, partData.height);
                            };
                            ScreenModel.prototype.onItemDragStop = function (event, ui) {
                                var vm = this;
                                vm.$hoverHighlight.remove();
                                if (vm.isMouseInsideLayout()) {
                                    vm.moveItem(ui);
                                }
                                else {
                                    vm.cancelMoveItem(ui);
                                }
                            };
                            /**
                             * Render hovering highlight effect on drag
                             * @param item
                             */
                            ScreenModel.prototype.renderHoveringItemOnDrag = function (item, width, height) {
                                var vm = this;
                                // Parent layout must have position: relative for item.position to be corrected
                                var partClientId = Number(item.helper.attr(KEY_DATA_ITEM_CLIENT_ID));
                                // Calculate highlight div position
                                var positionTop = LayoutUtils.calculatePositionTop(height, item.position.top);
                                var positionLeft = LayoutUtils.calculatePositionLeft(width, item.position.left);
                                vm.renderHoveringItem(item.helper, partClientId, width, height, positionTop, positionLeft);
                            };
                            /**
                             * Render hovering highlight effect on resize
                             * @param item
                             * @param minWidth
                             * @param minHeight
                             */
                            ScreenModel.prototype.renderHoveringItemOnResize = function (item, partData) {
                                var vm = this;
                                // Calculate highlight div size
                                var width = item.element.width() > partData.minWidth ? Math.ceil(item.element.width() / CELL_SIZE) * CELL_SIZE : partData.minWidth;
                                var height = item.element.height() > partData.minHeight ? Math.ceil(item.element.height() / CELL_SIZE) * CELL_SIZE : partData.minHeight;
                                vm.renderHoveringItem(item.element, partData.clientId, width, height, partData.positionTop, partData.positionLeft);
                            };
                            /**
                             * Render hovering highlight effect
                             * @param width
                             * @param height
                             * @param positionTop
                             * @param positionLeft
                             */
                            ScreenModel.prototype.renderHoveringItem = function ($originPart, partClientId, width, height, positionTop, positionLeft) {
                                var vm = this;
                                // If not existed, create new highlight div
                                if (!vm.$hoverHighlight) {
                                    vm.$hoverHighlight = $("<div>", { id: ITEM_HIGHLIGHT_ID, "class": "menu-creation-item-highlight" });
                                }
                                // Set more attr (highlight width, height, position)
                                if (vm.isMouseInsideLayout()) {
                                    vm.$hoverHighlight
                                        .outerWidth(width)
                                        .outerHeight(height)
                                        .css({
                                        'visibility': 'visible',
                                        'top': "".concat(positionTop, "px"),
                                        'left': "".concat(positionLeft, "px")
                                    });
                                }
                                else {
                                    vm.$hoverHighlight.css({
                                        'visibility': 'hidden',
                                    });
                                }
                                // Append to creation layout
                                vm.$menuCreationLayout.append(vm.$hoverHighlight);
                                // Check overlap
                                var overlappingParts = vm.getOverlappingPart(new PartDataModel({
                                    clientId: partClientId,
                                    width: width,
                                    height: height,
                                    positionTop: positionTop,
                                    positionLeft: positionLeft,
                                }));
                                if (overlappingParts.length) {
                                    // Overlapped, change cursor to not allow
                                    $originPart.css({ 'cursor': CSS_CURSOR_NOT_ALLOWED });
                                    $originPart
                                        .children(".".concat(CSS_CLASS_UI_RESIZABLE_E))
                                        .css({ 'cursor': CSS_CURSOR_NOT_ALLOWED });
                                    $originPart
                                        .children(".".concat(CSS_CLASS_UI_RESIZABLE_S))
                                        .css({ 'cursor': CSS_CURSOR_NOT_ALLOWED });
                                    $originPart
                                        .children(".".concat(CSS_CLASS_UI_RESIZABLE_SE))
                                        .css({ 'cursor': CSS_CURSOR_NOT_ALLOWED });
                                }
                                else {
                                    // Not overlapped, change cursor to normal
                                    $originPart.css({ 'cursor': 'auto' });
                                    $originPart
                                        .children(".".concat(CSS_CLASS_UI_RESIZABLE_E))
                                        .css({ 'cursor': 'e-resize' });
                                    $originPart
                                        .children(".".concat(CSS_CLASS_UI_RESIZABLE_S))
                                        .css({ 'cursor': 's-resize' });
                                    $originPart
                                        .children(".".concat(CSS_CLASS_UI_RESIZABLE_SE))
                                        .css({ 'cursor': 'se-resize' });
                                }
                            };
                            /**
                             * Resize item on stop resizing
                             * @param item
                             */
                            ScreenModel.prototype.resizeItem = function (item) {
                                var vm = this;
                                var partClientId = Number(item.element.attr(KEY_DATA_ITEM_CLIENT_ID));
                                var partData = vm.mapPartData[partClientId];
                                // Calculate highlight div size
                                var width = item.element.width() > partData.minWidth ? Math.ceil(item.element.width() / CELL_SIZE) * CELL_SIZE : partData.minWidth;
                                var height = item.element.height() > partData.minHeight ? Math.ceil(item.element.height() / CELL_SIZE) * CELL_SIZE : partData.minHeight;
                                // Update width + height
                                var resizedPartData = $.extend({}, partData);
                                resizedPartData.width = width;
                                resizedPartData.height = height;
                                // Check overlap
                                var overlappingParts = vm.getOverlappingPart(resizedPartData);
                                if (overlappingParts.length) {
                                    // Revert
                                    item.element.css({ 'cursor': 'auto' });
                                    item.element
                                        .children(".".concat(CSS_CLASS_UI_RESIZABLE_E))
                                        .css({ 'cursor': 'e-resize' });
                                    item.element
                                        .children(".".concat(CSS_CLASS_UI_RESIZABLE_S))
                                        .css({ 'cursor': 's-resize' });
                                    item.element
                                        .children(".".concat(CSS_CLASS_UI_RESIZABLE_SE))
                                        .css({ 'cursor': 'se-resize' });
                                    vm.cancelResizeItem(item);
                                }
                                else {
                                    // Update part data to map, Update part DOM, Check and remove overlap part (both DOM element and data by calling JQuery.remove())
                                    vm.mapPartData[partClientId] = resizedPartData;
                                    LayoutUtils.renderPartDOM(item.element, resizedPartData);
                                    // Re-calculate resolution
                                    vm.calculateResolution();
                                }
                            };
                            /**
                             * Move item on stop dragging
                             * @param item
                             */
                            ScreenModel.prototype.moveItem = function (item) {
                                var vm = this;
                                var partClientId = Number(item.helper.attr(KEY_DATA_ITEM_CLIENT_ID));
                                var partData = vm.mapPartData[partClientId];
                                // Calculate highlight div position
                                var positionTop = LayoutUtils.calculatePositionTop(partData.height, item.position.top);
                                var positionLeft = LayoutUtils.calculatePositionLeft(partData.width, item.position.left);
                                // Update positionTop + positionLeft
                                var movedPartData = $.extend({}, partData);
                                movedPartData.positionTop = positionTop;
                                movedPartData.positionLeft = positionLeft;
                                // Check overlap
                                var overlappingParts = vm.getOverlappingPart(movedPartData);
                                if (overlappingParts.length) {
                                    // Revert
                                    item.helper.css({ 'cursor': 'auto' });
                                    item.helper
                                        .children(".".concat(CSS_CLASS_UI_RESIZABLE_E))
                                        .css({ 'cursor': 'e-resize' });
                                    item.helper
                                        .children(".".concat(CSS_CLASS_UI_RESIZABLE_S))
                                        .css({ 'cursor': 's-resize' });
                                    item.helper
                                        .children(".".concat(CSS_CLASS_UI_RESIZABLE_SE))
                                        .css({ 'cursor': 'se-resize' });
                                    vm.cancelMoveItem(item);
                                }
                                else {
                                    // Update part data to map, Update part DOM, Check and remove overlap part (both DOM element and data by calling JQuery.remove())
                                    vm.mapPartData[partClientId] = movedPartData;
                                    LayoutUtils.renderPartDOM(item.helper, movedPartData);
                                    // Re-calculate resolution
                                    vm.calculateResolution();
                                }
                            };
                            /**
                             * Cancel resize item
                             */
                            ScreenModel.prototype.cancelResizeItem = function (item) {
                                var vm = this;
                                var partClientId = Number(item.element.attr(KEY_DATA_ITEM_CLIENT_ID));
                                var partData = vm.mapPartData[partClientId];
                                // Update part DOM
                                LayoutUtils.renderPartDOM(item.element, partData);
                            };
                            /**
                             * Cancel move item
                             */
                            ScreenModel.prototype.cancelMoveItem = function (item) {
                                var vm = this;
                                var partClientId = Number(item.helper.attr(KEY_DATA_ITEM_CLIENT_ID));
                                var partData = vm.mapPartData[partClientId];
                                // Update part DOM
                                LayoutUtils.renderPartDOM(item.helper, partData);
                            };
                            /**
                             * Check and remove overlapping part from creation layout
                             * @param checkingPart
                             */
                            ScreenModel.prototype.filterOverlappingPart = function (checkingPart) {
                                var vm = this;
                                // Check and remove overlap part (both DOM element and data by calling JQuery.remove())
                                var overlappingParts = vm.getOverlappingPart(checkingPart);
                                _.forEach(overlappingParts, function (part) { return part.remove(); });
                                // Filter overlap part reference from origin list
                                vm.$listPart = _.filter(vm.$listPart, function ($part) {
                                    var partClientId = Number($part.attr(KEY_DATA_ITEM_CLIENT_ID));
                                    return !LayoutUtils.isItemOverlapping(checkingPart, vm.mapPartData[partClientId]);
                                });
                            };
                            /**
                             * Get overlapping Part
                             */
                            ScreenModel.prototype.getOverlappingPart = function (checkingPart) {
                                var vm = this;
                                // Check and remove overlap part (both DOM element and data by calling JQuery.remove())
                                return _.filter(vm.$listPart, function ($part) {
                                    var partClientId = Number($part.attr(KEY_DATA_ITEM_CLIENT_ID));
                                    return LayoutUtils.isItemOverlapping(checkingPart, vm.mapPartData[partClientId]);
                                });
                            };
                            /**
                             * Create default part data
                             * @param partType
                             * @param partSize
                             * @param positionTop
                             * @param positionLeft
                             */
                            ScreenModel.prototype.createDefaultPartData = function (partType, partSize, positionTop, positionLeft) {
                                var vm = this;
                                var newPartData = null;
                                switch (partType) {
                                    case MenuPartType.PART_MENU:
                                        newPartData = new PartDataMenuModel({
                                            // PartData
                                            clientId: vm.partClientId,
                                            width: partSize.width,
                                            height: partSize.height,
                                            minWidth: CELL_SIZE,
                                            minHeight: CELL_SIZE,
                                            partType: partType,
                                            positionTop: positionTop,
                                            positionLeft: positionLeft,
                                            // PartDataMenuModel
                                        });
                                        break;
                                    case MenuPartType.PART_LABEL:
                                        newPartData = new PartDataLabelModel({
                                            // PartData
                                            clientId: vm.partClientId,
                                            width: partSize.width,
                                            height: partSize.height,
                                            minWidth: CELL_SIZE,
                                            minHeight: CELL_SIZE,
                                            partType: partType,
                                            positionTop: positionTop,
                                            positionLeft: positionLeft,
                                            // PartDataLabelModel
                                        });
                                        break;
                                    case MenuPartType.PART_LINK:
                                        newPartData = new PartDataLinkModel({
                                            // PartData
                                            clientId: vm.partClientId,
                                            width: partSize.width,
                                            height: partSize.height,
                                            minWidth: CELL_SIZE,
                                            minHeight: CELL_SIZE,
                                            partType: partType,
                                            positionTop: positionTop,
                                            positionLeft: positionLeft,
                                            // PartDataLinkModel
                                        });
                                        break;
                                    case MenuPartType.PART_ATTACHMENT:
                                        newPartData = new PartDataAttachmentModel({
                                            // PartData
                                            clientId: vm.partClientId,
                                            width: partSize.width,
                                            height: partSize.height,
                                            minWidth: CELL_SIZE,
                                            minHeight: CELL_SIZE,
                                            partType: partType,
                                            positionTop: positionTop,
                                            positionLeft: positionLeft,
                                            // PartDataAttachmentModel
                                        });
                                        break;
                                    case MenuPartType.PART_IMAGE:
                                        newPartData = new PartDataImageModel({
                                            // PartData
                                            clientId: vm.partClientId,
                                            width: partSize.width,
                                            height: partSize.height,
                                            minWidth: CELL_SIZE,
                                            minHeight: CELL_SIZE,
                                            partType: partType,
                                            positionTop: positionTop,
                                            positionLeft: positionLeft,
                                            // PartDataImageModel
                                        });
                                        break;
                                    case MenuPartType.PART_ARROW:
                                        newPartData = new PartDataArrowModel({
                                            // PartData
                                            clientId: vm.partClientId,
                                            width: partSize.width,
                                            height: partSize.height,
                                            minWidth: CELL_SIZE,
                                            minHeight: CELL_SIZE,
                                            partType: partType,
                                            positionTop: positionTop,
                                            positionLeft: positionLeft,
                                            // PartDataArrowModel
                                        });
                                        break;
                                    default:
                                        newPartData = new PartDataMenuModel();
                                        break;
                                }
                                // Set part data to map
                                vm.mapPartData[vm.partClientId] = newPartData;
                                vm.partClientId++;
                                // Re-calculate resolution
                                vm.calculateResolution();
                                return newPartData;
                            };
                            /**
                             * Create part data from MenuSettingDto
                             */
                            ScreenModel.prototype.createPartDataFromDtoMenu = function (dto) {
                                var vm = this;
                                var newPartData = new PartDataMenuModel({
                                    // Common data
                                    clientId: vm.partClientId,
                                    width: dto.width,
                                    height: dto.height,
                                    minWidth: CELL_SIZE,
                                    minHeight: CELL_SIZE,
                                    partType: MenuPartType.PART_MENU,
                                    positionTop: dto.row * CELL_SIZE,
                                    positionLeft: dto.column * CELL_SIZE,
                                    // Menu data
                                    alignHorizontal: dto.horizontalPosition,
                                    alignVertical: dto.verticalPosition,
                                    menuCode: dto.menuCode,
                                    menuName: dto.menuName,
                                    menuClassification: dto.menuClassification,
                                    systemType: dto.systemType,
                                    fontSize: dto.fontSize,
                                    isBold: dto.bold === 1,
                                    menuUrl: null,
                                    textColor: dto.textColor,
                                    isFixed: dto.isFixed,
                                    ratio: dto.ratio,
                                    fileId: dto.fileId,
                                    fileName: dto.fileName,
                                    originalFileId: dto.fileId
                                });
                                // Set part data to map
                                vm.mapPartData[vm.partClientId] = newPartData;
                                vm.partClientId++;
                                return newPartData;
                            };
                            /**
                             * Create part data from LabelSettingDto
                             */
                            ScreenModel.prototype.createPartDataFromDtoLabel = function (dto) {
                                var vm = this;
                                var newPartData = new PartDataLabelModel({
                                    // Common data
                                    clientId: vm.partClientId,
                                    width: dto.width,
                                    height: dto.height,
                                    minWidth: CELL_SIZE,
                                    minHeight: CELL_SIZE,
                                    partType: MenuPartType.PART_LABEL,
                                    positionTop: dto.row * CELL_SIZE,
                                    positionLeft: dto.column * CELL_SIZE,
                                    // Label data
                                    alignHorizontal: dto.horizontalPosition,
                                    alignVertical: dto.verticalPosition,
                                    labelContent: dto.labelContent,
                                    fontSize: dto.fontSize,
                                    isBold: dto.bold === 1,
                                    textColor: dto.textColor,
                                    backgroundColor: dto.backgroundColor,
                                });
                                // Set part data to map
                                vm.mapPartData[vm.partClientId] = newPartData;
                                vm.partClientId++;
                                return newPartData;
                            };
                            /**
                             * Create part data from LinkSettingDto
                             */
                            ScreenModel.prototype.createPartDataFromDtoLink = function (dto) {
                                var vm = this;
                                var newPartData = new PartDataLinkModel({
                                    // Common data
                                    clientId: vm.partClientId,
                                    width: dto.width,
                                    height: dto.height,
                                    minWidth: CELL_SIZE,
                                    minHeight: CELL_SIZE,
                                    partType: MenuPartType.PART_LINK,
                                    positionTop: dto.row * CELL_SIZE,
                                    positionLeft: dto.column * CELL_SIZE,
                                    // Link data
                                    alignHorizontal: dto.horizontalPosition,
                                    alignVertical: dto.verticalPosition,
                                    url: dto.url,
                                    linkContent: dto.linkContent,
                                    fontSize: dto.fontSize,
                                    isBold: dto.bold === 1,
                                });
                                // Set part data to map
                                vm.mapPartData[vm.partClientId] = newPartData;
                                vm.partClientId++;
                                return newPartData;
                            };
                            /**
                             * Create part data from FileAttachmentSettingDto
                             */
                            ScreenModel.prototype.createPartDataFromDtoFileAttachment = function (dto) {
                                var vm = this;
                                var newPartData = new PartDataAttachmentModel({
                                    // Common data
                                    clientId: vm.partClientId,
                                    width: dto.width,
                                    height: dto.height,
                                    minWidth: CELL_SIZE,
                                    minHeight: CELL_SIZE,
                                    partType: MenuPartType.PART_ATTACHMENT,
                                    positionTop: dto.row * CELL_SIZE,
                                    positionLeft: dto.column * CELL_SIZE,
                                    // Attachment data
                                    alignHorizontal: dto.horizontalPosition,
                                    alignVertical: dto.verticalPosition,
                                    fileId: dto.fileId,
                                    fileSize: null,
                                    fileName: null,
                                    fileLink: null,
                                    linkContent: dto.linkContent,
                                    fontSize: dto.fontSize,
                                    isBold: dto.bold === 1,
                                    originalFileId: dto.fileId
                                });
                                // Set part data to map
                                vm.mapPartData[vm.partClientId] = newPartData;
                                vm.partClientId++;
                                return newPartData;
                            };
                            /**
                             * Create part data from ImageSettingDto
                             */
                            ScreenModel.prototype.createPartDataFromDtoImage = function (dto) {
                                var vm = this;
                                var newPartData = new PartDataImageModel({
                                    // Common data
                                    clientId: vm.partClientId,
                                    width: dto.width,
                                    height: dto.height,
                                    minWidth: CELL_SIZE,
                                    minHeight: CELL_SIZE,
                                    partType: MenuPartType.PART_IMAGE,
                                    positionTop: dto.row * CELL_SIZE,
                                    positionLeft: dto.column * CELL_SIZE,
                                    // Image data
                                    fileId: dto.fileId,
                                    fileName: dto.fileName,
                                    uploadedFileName: null,
                                    uploadedFileSize: null,
                                    isFixed: dto.isFixed,
                                    ratio: dto.ratio,
                                    originalFileId: dto.fileId
                                });
                                // Set part data to map
                                vm.mapPartData[vm.partClientId] = newPartData;
                                vm.partClientId++;
                                return newPartData;
                            };
                            /**
                             * Create part data from ArrowSettingDto
                             */
                            ScreenModel.prototype.createPartDataFromDtoArrow = function (dto) {
                                var vm = this;
                                var newPartData = new PartDataArrowModel({
                                    // Common data
                                    clientId: vm.partClientId,
                                    width: dto.width,
                                    height: dto.height,
                                    minWidth: CELL_SIZE,
                                    minHeight: CELL_SIZE,
                                    partType: MenuPartType.PART_ARROW,
                                    positionTop: dto.row * CELL_SIZE,
                                    positionLeft: dto.column * CELL_SIZE,
                                    // Arrow data
                                    fileName: dto.fileName,
                                    fileSrc: dto.fileName,
                                });
                                // Set part data to map
                                vm.mapPartData[vm.partClientId] = newPartData;
                                vm.partClientId++;
                                return newPartData;
                            };
                            /**
                             * Copy part data
                             */
                            ScreenModel.prototype.copyPartData = function (originPartData, positionTop, positionLeft) {
                                var vm = this;
                                var newPartData = null;
                                switch (originPartData.partType) {
                                    case MenuPartType.PART_MENU:
                                        newPartData = new PartDataMenuModel(originPartData);
                                        var menuFileId = originPartData.fileId;
                                        if (LayoutUtils.isValidFile(menuFileId)) {
                                            vm.$ajax(nts.uk.text.format(API.copyFile, originPartData.fileId))
                                                .then(function (res) {
                                                newPartData.fileId = res.fileId;
                                                newPartData.originalFileId = null;
                                                vm.modifiedPartList.added.push(res.fileId);
                                            });
                                        }
                                        else {
                                            newPartData.fileId = "";
                                            newPartData.originalFileId = null;
                                            vm.modifiedPartList.added.push(null);
                                        }
                                        break;
                                    case MenuPartType.PART_LABEL:
                                        newPartData = new PartDataLabelModel(originPartData);
                                        break;
                                    case MenuPartType.PART_LINK:
                                        newPartData = new PartDataLinkModel(originPartData);
                                        break;
                                    case MenuPartType.PART_ATTACHMENT:
                                        newPartData = new PartDataAttachmentModel(originPartData);
                                        var attachmentFileId = originPartData.fileId;
                                        if (LayoutUtils.isValidFile(attachmentFileId)) {
                                            vm.$ajax(nts.uk.text.format(API.copyFile, originPartData.fileId))
                                                .then(function (res) {
                                                newPartData.fileId = res.fileId;
                                                newPartData.originalFileId = null;
                                                vm.modifiedPartList.added.push(res.fileId);
                                            });
                                        }
                                        else {
                                            newPartData.fileId = "";
                                            newPartData.originalFileId = null;
                                            vm.modifiedPartList.added.push(null);
                                        }
                                        break;
                                    case MenuPartType.PART_IMAGE:
                                        newPartData = new PartDataImageModel(originPartData);
                                        var imageFileId = originPartData.fileId;
                                        if (originPartData.isFixed === 1) {
                                            if (LayoutUtils.isValidFile(imageFileId)) {
                                                vm.$ajax(nts.uk.text.format(API.copyFile, originPartData.fileId))
                                                    .then(function (res) {
                                                    newPartData.fileId = res.fileId;
                                                    newPartData.originalFileId = null;
                                                    vm.modifiedPartList.added.push(res.fileId);
                                                });
                                            }
                                            else {
                                                newPartData.fileId = "";
                                                newPartData.originalFileId = null;
                                                vm.modifiedPartList.added.push(null);
                                            }
                                        }
                                        break;
                                    case MenuPartType.PART_ARROW:
                                        newPartData = new PartDataArrowModel(originPartData);
                                        break;
                                    default:
                                        newPartData = new PartDataMenuModel(originPartData);
                                        break;
                                }
                                // Set part data to map
                                newPartData.clientId = vm.partClientId;
                                newPartData.positionTop = positionTop;
                                newPartData.positionLeft = positionLeft;
                                vm.mapPartData[vm.partClientId] = newPartData;
                                vm.partClientId++;
                                return newPartData;
                            };
                            /**
                             * Open Part Setting Dialog
                             * @param partClientId
                             */
                            ScreenModel.prototype.openPartSettingDialog = function ($part, isCreateDialog) {
                                if (isCreateDialog === void 0) { isCreateDialog = false; }
                                var vm = this;
                                var partClientId = Number($part.attr(KEY_DATA_ITEM_CLIENT_ID));
                                var selectedPartData = vm.mapPartData[partClientId];
                                if (!selectedPartData) {
                                    return;
                                }
                                switch (selectedPartData.partType) {
                                    case MenuPartType.PART_MENU:
                                        vm.$window.modal('/view/ccg/034/f/index.xhtml', selectedPartData)
                                            .then(function (result) {
                                            if (result && !nts.uk.text.isNullOrEmpty(String(result.clientId))) {
                                                var partMenu = result;
                                                // Only prepare for delete if has changes
                                                if (!_.find(vm.modifiedPartList.added, partMenu.fileId) && partMenu.fileId !== partMenu.originalFileId) {
                                                    vm.modifiedPartList.added.push(partMenu.fileId);
                                                }
                                                if (!_.find(vm.modifiedPartList.deleted, partMenu.originalFileId)
                                                    && (partMenu.fileId !== partMenu.originalFileId || (partMenu.isFixed !== 1 && !_.isEmpty(partMenu.originalFileId)))) {
                                                    vm.modifiedPartList.deleted.push(partMenu.originalFileId);
                                                }
                                                // Update part data
                                                vm.mapPartData[partClientId] = result;
                                                // Update part DOM
                                                LayoutUtils.renderPartDOMMenu($part, result);
                                            }
                                            else if (isCreateDialog) {
                                                // If this is dialog setitng when create => remove part
                                                vm.removePart($part);
                                            }
                                        });
                                        break;
                                    case MenuPartType.PART_LABEL:
                                        vm.$window.modal('/view/ccg/034/e/index.xhtml', selectedPartData)
                                            .then(function (result) {
                                            if (result && !nts.uk.text.isNullOrEmpty(String(result.clientId))) {
                                                // Update part data
                                                vm.mapPartData[partClientId] = result;
                                                // Update part DOM
                                                LayoutUtils.renderPartDOMLabel($part, result);
                                            }
                                            else if (isCreateDialog) {
                                                // If this is dialog setitng when create => remove part
                                                vm.removePart($part);
                                            }
                                        });
                                        break;
                                    case MenuPartType.PART_LINK:
                                        vm.$window.modal('/view/ccg/034/g/index.xhtml', selectedPartData)
                                            .then(function (result) {
                                            if (result && !nts.uk.text.isNullOrEmpty(String(result.clientId))) {
                                                // Update part data
                                                vm.mapPartData[partClientId] = result;
                                                // Update part DOM
                                                LayoutUtils.renderPartDOMLink($part, result);
                                            }
                                            else if (isCreateDialog) {
                                                // If this is dialog setitng when create => remove part
                                                vm.removePart($part);
                                            }
                                        });
                                        break;
                                    case MenuPartType.PART_ATTACHMENT:
                                        vm.$window.modal('/view/ccg/034/h/index.xhtml', selectedPartData)
                                            .then(function (result) {
                                            if (result.isSaving) {
                                                var partAttachment = result.partData;
                                                // Only prepare for delete if has changes
                                                if (!_.find(vm.modifiedPartList.added, partAttachment.fileId) && partAttachment.fileId !== partAttachment.originalFileId) {
                                                    vm.modifiedPartList.added.push(partAttachment.fileId);
                                                }
                                                if (!_.find(vm.modifiedPartList.deleted, partAttachment.originalFileId) && partAttachment.fileId !== partAttachment.originalFileId) {
                                                    vm.modifiedPartList.deleted.push(partAttachment.originalFileId);
                                                }
                                                // Update part data
                                                vm.mapPartData[partClientId] = result.partData;
                                                // Update part DOM
                                                LayoutUtils.renderPartDOMAttachment($part, result.partData);
                                            }
                                            else {
                                                if (isCreateDialog) {
                                                    // If this is dialog setitng when create => remove part
                                                    vm.removePart($part);
                                                }
                                                vm.removeFile(result.fileId);
                                            }
                                        });
                                        break;
                                    case MenuPartType.PART_IMAGE:
                                        vm.$window.modal('/view/ccg/034/i/index.xhtml', selectedPartData)
                                            .then(function (result) {
                                            if (result.isSaving) {
                                                var partImage = result.partData;
                                                // Only prepare for delete if has changes
                                                if (!_.find(vm.modifiedPartList.added, partImage.fileId) && partImage.fileId !== partImage.originalFileId) {
                                                    vm.modifiedPartList.added.push(partImage.fileId);
                                                }
                                                if (!_.find(vm.modifiedPartList.deleted, partImage.originalFileId) && partImage.fileId !== partImage.originalFileId) {
                                                    vm.modifiedPartList.deleted.push(partImage.originalFileId);
                                                }
                                                // Update part data
                                                vm.mapPartData[partClientId] = result.partData;
                                                // Update part DOM
                                                LayoutUtils.renderPartDOMImage($part, result.partData);
                                            }
                                            else {
                                                if (isCreateDialog) {
                                                    // If this is dialog setitng when create => remove part
                                                    vm.removePart($part);
                                                }
                                                vm.removeFile(result.fileId);
                                            }
                                        });
                                        break;
                                    case MenuPartType.PART_ARROW:
                                        vm.$window.modal('/view/ccg/034/j/index.xhtml', selectedPartData)
                                            .then(function (result) {
                                            if (result && !nts.uk.text.isNullOrEmpty(String(result.clientId))) {
                                                // Update part data
                                                vm.mapPartData[partClientId] = result;
                                                // Update part DOM
                                                LayoutUtils.renderPartDOMArrow($part, result);
                                            }
                                            else if (isCreateDialog) {
                                                // If this is dialog setitng when create => remove part
                                                vm.removePart($part);
                                            }
                                        });
                                        break;
                                    default:
                                        break;
                                }
                                // Re-calculate resolution
                                vm.calculateResolution();
                            };
                            /**
                             * Copy part
                             * @param $part
                             */
                            ScreenModel.prototype.copyPart = function ($part) {
                                var vm = this;
                                var partClientId = Number($part.attr(KEY_DATA_ITEM_CLIENT_ID));
                                var partData = vm.mapPartData[partClientId];
                                // Start copy mode
                                vm.isCopying(true);
                                vm.copyingPartId(partClientId);
                                // Create new placeholder div
                                switch (partData.partType) {
                                    case MenuPartType.PART_MENU:
                                        vm.$copyPlaceholder = $("<div>", { id: ITEM_COPY_PLACEHOLDER_ID, "class": CSS_CLASS_MENU_CREATION_ITEM_COPY_PLACEHOLDER })
                                            .append($('<div>', { 'class': "".concat(CSS_CLASS_MENU_CREATION_ITEM, " part-menu") }));
                                        break;
                                    case MenuPartType.PART_LABEL:
                                        vm.$copyPlaceholder = $("<div>", { id: ITEM_COPY_PLACEHOLDER_ID, "class": CSS_CLASS_MENU_CREATION_ITEM_COPY_PLACEHOLDER })
                                            .append($('<div>', { 'class': "".concat(CSS_CLASS_MENU_CREATION_ITEM, " part-label") }));
                                        break;
                                    case MenuPartType.PART_LINK:
                                        vm.$copyPlaceholder = $("<div>", { id: ITEM_COPY_PLACEHOLDER_ID, "class": CSS_CLASS_MENU_CREATION_ITEM_COPY_PLACEHOLDER })
                                            .append($('<div>', { 'class': "".concat(CSS_CLASS_MENU_CREATION_ITEM, " part-link") }));
                                        break;
                                    case MenuPartType.PART_ATTACHMENT:
                                        vm.$copyPlaceholder = $("<div>", { id: ITEM_COPY_PLACEHOLDER_ID, "class": CSS_CLASS_MENU_CREATION_ITEM_COPY_PLACEHOLDER })
                                            .append($('<div>', { 'class': "".concat(CSS_CLASS_MENU_CREATION_ITEM, " part-attachment") }));
                                        break;
                                    case MenuPartType.PART_IMAGE:
                                        vm.$copyPlaceholder = $("<div>", { id: ITEM_COPY_PLACEHOLDER_ID, "class": CSS_CLASS_MENU_CREATION_ITEM_COPY_PLACEHOLDER })
                                            .append($('<div>', { 'class': "".concat(CSS_CLASS_MENU_CREATION_ITEM, " part-image") }));
                                        break;
                                    case MenuPartType.PART_ARROW:
                                        vm.$copyPlaceholder = $("<div>", { id: ITEM_COPY_PLACEHOLDER_ID, "class": CSS_CLASS_MENU_CREATION_ITEM_COPY_PLACEHOLDER })
                                            .append($('<div>', { 'class': "".concat(CSS_CLASS_MENU_CREATION_ITEM, " part-arrow") }));
                                        break;
                                    default:
                                        vm.$copyPlaceholder = $("<div>");
                                        break;
                                }
                                // Set more attr (highlight width, height, position)
                                LayoutUtils.renderPartDOM(vm.$copyPlaceholder, partData);
                                // Append to creation layout
                                vm.$menuCreationLayout.append(vm.$copyPlaceholder);
                                // Move placeholder on mouse move
                                var layoutOffset = vm.$menuCreationLayout.offset();
                                vm.layoutOffsetTop(layoutOffset.top);
                                vm.layoutOffsetLeft(layoutOffset.left);
                                vm.$menuCreationLayout.mousemove(function (event) {
                                    var offsetX = event.pageX - layoutOffset.left;
                                    var offsetY = event.pageY - layoutOffset.top;
                                    vm.$copyPlaceholder.css({ 'top': "".concat(offsetY, "px"), 'left': "".concat(offsetX, "px") });
                                    // Calculate highlight div position
                                    var positionTop = LayoutUtils.calculatePositionTop(partData.height, offsetY);
                                    var positionLeft = LayoutUtils.calculatePositionLeft(partData.width, offsetX);
                                    vm.renderHoveringItem(vm.$copyPlaceholder, vm.partClientId, partData.width, partData.height, positionTop, positionLeft);
                                });
                            };
                            /**
                             * Remove part
                             */
                            ScreenModel.prototype.removePart = function ($part) {
                                var vm = this;
                                var partClientId = Number($part.attr(KEY_DATA_ITEM_CLIENT_ID));
                                var partData = vm.mapPartData[partClientId];
                                switch (partData.partType) {
                                    case MenuPartType.PART_MENU:
                                    case MenuPartType.PART_ATTACHMENT:
                                    case MenuPartType.PART_IMAGE:
                                        var part = partData;
                                        // If newly added component -> delete immediately
                                        // Or else will put to remove list
                                        if (!part.originalFileId) {
                                            vm.removeFile(part.fileId);
                                        }
                                        else {
                                            vm.modifiedPartList.deleted.push(part.fileId);
                                            vm.modifiedPartList.deleted.push(part.originalFileId);
                                        }
                                        break;
                                }
                                delete vm.mapPartData[partClientId];
                                vm.$listPart = _.filter(vm.$listPart, function ($item) { return Number($item.attr(KEY_DATA_ITEM_CLIENT_ID)) !== partClientId; });
                                $part.remove();
                                // Re-calculate resolution
                                vm.calculateResolution();
                            };
                            /**
                             * Close dialog
                             */
                            ScreenModel.prototype.closeDialog = function () {
                                var vm = this;
                                _.forEach(_.uniq(vm.modifiedPartList.added), function (fileId) { return vm.removeFile(fileId); });
                                vm.$window.close();
                            };
                            /**
                             * Open preview dialog
                             */
                            ScreenModel.prototype.openPreviewDialog = function () {
                                var vm = this;
                                var $layout = $('<div>')
                                    .css({ 'width': CREATION_LAYOUT_WIDTH, 'height': CREATION_LAYOUT_HEIGHT });
                                for (var partClientId in vm.mapPartData) {
                                    $layout.append(LayoutUtils.buildPartHTML(vm.mapPartData[partClientId]));
                                }
                                var params = {
                                    fileId: vm.flowMenuFileId(),
                                    htmlSrc: vm.createHTMLLayout($layout),
                                };
                                vm.$window.modal('/view/ccg/034/b/index.xhtml', params, {
                                    width: Math.round(Number(window.parent.innerWidth) * 70 / 100),
                                    height: Math.round(Number(window.parent.innerHeight) * 80 / 100),
                                    resizable: true,
                                });
                            };
                            /**
                             * Save layout
                             */
                            ScreenModel.prototype.saveLayout = function () {
                                var vm = this;
                                // Save html as file
                                var listPartData = [];
                                var $layout = $('<div>')
                                    .css({ 'width': CREATION_LAYOUT_WIDTH, 'height': CREATION_LAYOUT_HEIGHT });
                                for (var partClientId in vm.mapPartData) {
                                    listPartData.push(vm.mapPartData[partClientId]);
                                    $layout.append(LayoutUtils.buildPartHTML(vm.mapPartData[partClientId]));
                                }
                                vm.$blockui('grayout');
                                var generateHtmlParams = {
                                    flowMenuCode: vm.flowMenuCode(),
                                    htmlContent: vm.createHTMLLayout($layout),
                                };
                                // アップロードファイルの保存及びHTMLのファイルを作成ZIPファイルとし保存する
                                vm.$ajax(API.generateHtml, generateHtmlParams)
                                    // [After] generate html file
                                    .then(function (res) {
                                    vm.flowMenuFileId(res.taskId);
                                    // Prepare command
                                    var listMenuSettingDto = _.chain(listPartData)
                                        .filter(function (data) { return data.partType === MenuPartType.PART_MENU; })
                                        .map(function (data) { return new MenuSettingDto({
                                        flowMenuCode: vm.flowMenuCode(),
                                        column: (data.positionLeft / CELL_SIZE),
                                        row: (data.positionTop / CELL_SIZE),
                                        width: data.width,
                                        height: data.height,
                                        fontSize: data.fontSize,
                                        bold: data.isBold ? 1 : 0,
                                        horizontalPosition: _.isNil(data.isFixed) ? data.alignHorizontal : HorizontalAlign.MIDDLE,
                                        verticalPosition: _.isNil(data.isFixed) ? data.alignVertical : VerticalAlign.BOTTOM,
                                        systemType: data.systemType,
                                        menuClassification: data.menuClassification,
                                        menuCode: data.menuCode,
                                        menuName: data.menuName,
                                        textColor: data.textColor,
                                        isFixed: data.isFixed,
                                        ratio: data.ratio,
                                        fileId: data.isFixed === 1 ? data.fileId : null,
                                        fileName: data.fileName
                                    }); })
                                        .value();
                                    var listLabelSettingDto = _.chain(listPartData)
                                        .filter(function (data) { return data.partType === MenuPartType.PART_LABEL; })
                                        .map(function (data) { return new LabelSettingDto({
                                        flowMenuCode: vm.flowMenuCode(),
                                        column: (data.positionLeft / CELL_SIZE),
                                        row: (data.positionTop / CELL_SIZE),
                                        width: data.width,
                                        height: data.height,
                                        labelContent: data.labelContent,
                                        fontSize: data.fontSize,
                                        bold: data.isBold ? 1 : 0,
                                        textColor: data.textColor,
                                        backgroundColor: data.backgroundColor,
                                        horizontalPosition: data.alignHorizontal,
                                        verticalPosition: data.alignVertical,
                                    }); })
                                        .value();
                                    var listLinkSettingDto = _.chain(listPartData)
                                        .filter(function (data) { return data.partType === MenuPartType.PART_LINK; })
                                        .map(function (data) { return new LinkSettingDto({
                                        flowMenuCode: vm.flowMenuCode(),
                                        column: (data.positionLeft / CELL_SIZE),
                                        row: (data.positionTop / CELL_SIZE),
                                        width: data.width,
                                        height: data.height,
                                        linkContent: data.linkContent,
                                        url: data.url,
                                        fontSize: data.fontSize,
                                        bold: data.isBold ? 1 : 0,
                                        horizontalPosition: data.alignHorizontal,
                                        verticalPosition: data.alignVertical,
                                    }); })
                                        .value();
                                    var listFileAttachmentSettingDto = _.chain(listPartData)
                                        .filter(function (data) { return data.partType === MenuPartType.PART_ATTACHMENT; })
                                        .map(function (data) { return new FileAttachmentSettingDto({
                                        flowMenuCode: vm.flowMenuCode(),
                                        column: (data.positionLeft / CELL_SIZE),
                                        row: (data.positionTop / CELL_SIZE),
                                        width: data.width,
                                        height: data.height,
                                        fileId: data.fileId,
                                        linkContent: data.linkContent,
                                        fontSize: data.fontSize,
                                        bold: data.isBold ? 1 : 0,
                                        horizontalPosition: data.alignHorizontal,
                                        verticalPosition: data.alignVertical,
                                    }); })
                                        .value();
                                    var listImageSettingDto = _.chain(listPartData)
                                        .filter(function (data) { return data.partType === MenuPartType.PART_IMAGE; })
                                        .map(function (data) { return new ImageSettingDto({
                                        flowMenuCode: vm.flowMenuCode(),
                                        column: (data.positionLeft / CELL_SIZE),
                                        row: (data.positionTop / CELL_SIZE),
                                        width: data.width,
                                        height: data.height,
                                        fileId: data.fileId,
                                        fileName: data.fileName,
                                        isFixed: data.isFixed,
                                        ratio: nts.uk.ntsNumber.getDecimal(Number(data.ratio), 2)
                                    }); })
                                        .value();
                                    var listArrowSettingDto = _.chain(listPartData)
                                        .filter(function (data) { return data.partType === MenuPartType.PART_ARROW; })
                                        .map(function (data) { return new ArrowSettingDto({
                                        flowMenuCode: vm.flowMenuCode(),
                                        column: (data.positionLeft / CELL_SIZE),
                                        row: (data.positionTop / CELL_SIZE),
                                        width: data.width,
                                        height: data.height,
                                        fileName: data.fileName,
                                    }); })
                                        .value();
                                    var updateLayoutParams = new UpdateFlowMenuLayoutCommand({
                                        flowMenuCode: vm.flowMenuCode(),
                                        flowMenuLayout: new FlowMenuLayoutDto({
                                            fileId: res.taskId,
                                            menuSettings: listMenuSettingDto,
                                            labelSettings: listLabelSettingDto,
                                            linkSettings: listLinkSettingDto,
                                            fileAttachmentSettings: listFileAttachmentSettingDto,
                                            imageSettings: listImageSettingDto,
                                            arrowSettings: listArrowSettingDto,
                                        }),
                                    });
                                    // Filter for unused fileIds and deleted them
                                    _.remove(vm.modifiedPartList.deleted, function (fileId) { return _.isEmpty(_.filter(listMenuSettingDto, function (data) { return data.isFixed !== null && data.fileId === fileId; }))
                                        && _.isEmpty(_.filter(listFileAttachmentSettingDto, function (data) { return data.fileId === fileId; }))
                                        && _.isEmpty(_.filter(listImageSettingDto, function (data) { return data.fileId === fileId; })); })
                                        .forEach(function (fileId) { return vm.removeFile(fileId); });
                                    _.remove(vm.modifiedPartList.added, function (fileId) { return !_.isEmpty(_.filter(listMenuSettingDto, function (data) { return data.isFixed !== null && data.fileId === fileId; }))
                                        || !_.isEmpty(_.filter(listFileAttachmentSettingDto, function (data) { return data.fileId === fileId; }))
                                        || !_.isEmpty(_.filter(listImageSettingDto, function (data) { return data.fileId === fileId; })); });
                                    return vm.$ajax(API.updateLayout, updateLayoutParams);
                                })
                                    // [After] save layout data
                                    .then(function () {
                                    vm.$blockui('clear');
                                    vm.modifiedPartList = new ModifiedPartList();
                                    vm.updateOriginalFileId();
                                    vm.$dialog.info({ messageId: 'Msg_15' });
                                })
                                    .fail(function (err) { return vm.$dialog.error({ messageId: err.messageId }); })
                                    .always(function () { return vm.$blockui('clear'); });
                            };
                            /**
                             * create HTML Layout
                             */
                            ScreenModel.prototype.createHTMLLayout = function ($layout) {
                                var vm = this;
                                var htmlContent = "<!DOCTYPE html>";
                                htmlContent += "<html xmlns=\"http://www.w3.org/1999/xhtml\"";
                                htmlContent += " xmlns:ui=\"http://java.sun.com/jsf/facelets\"";
                                htmlContent += " xmlns:com=\"http://xmlns.jcp.org/jsf/component\"";
                                htmlContent += " xmlns:com=\"http://xmlns.jcp.org/jsf/html\"";
                                htmlContent += "<head>";
                                htmlContent += "<style>";
                                htmlContent += ".ccg034-component-container { word-break: break-all; word-break: break-word; word-wrap: break-word }";
                                htmlContent += "</style>";
                                htmlContent += "<link rel=\"stylesheet\" type=\"text/css\" href=\"/nts.uk.com.js.web/lib/nittsu/ui/style/stylesheets/base.css\">";
                                htmlContent += "</head>";
                                htmlContent += "<body>";
                                htmlContent += "<div class=\"content-container\" style=\"width: ".concat(vm.maxWidth(), "px; height: ").concat(vm.maxHeight(), "px; margin: auto; position: relative;\">");
                                htmlContent += $layout.html();
                                htmlContent += "</div>";
                                htmlContent += "</body>";
                                htmlContent += "</html>";
                                return htmlContent;
                            };
                            /**
                             * Calculate layout resolution
                             */
                            ScreenModel.prototype.calculateResolution = function () {
                                var vm = this;
                                var topHeight = 0;
                                var topWidth = 0;
                                for (var partClientId in vm.mapPartData) {
                                    var part = vm.mapPartData[partClientId];
                                    if (part.height + part.positionTop > topHeight) {
                                        topHeight = part.height + part.positionTop;
                                    }
                                    if (part.width + part.positionLeft > topWidth) {
                                        topWidth = part.width + part.positionLeft;
                                    }
                                }
                                vm.maxHeight(topHeight);
                                vm.maxWidth(topWidth);
                            };
                            /**
                             * Get standard menu list
                             */
                            ScreenModel.prototype.getStandardMenu = function () {
                                var vm = this;
                                vm.$ajax(API.getMenuList).then(function (data) {
                                    for (var partClientId in vm.mapPartData) {
                                        var part = vm.mapPartData[partClientId];
                                        if (part.partType === MenuPartType.PART_MENU) {
                                            var menuPart = part;
                                            var chosenMenu = _.find(data, { 'code': menuPart.menuCode, 'system': menuPart.systemType, 'classification': menuPart.menuClassification });
                                            if (chosenMenu) {
                                                if (nts.uk.text.isNullOrEmpty(chosenMenu.queryString)) {
                                                    menuPart.menuUrl = "".concat(chosenMenu.url);
                                                }
                                                else {
                                                    menuPart.menuUrl = "".concat(chosenMenu.url, "?").concat(chosenMenu.queryString);
                                                }
                                            }
                                            vm.mapPartData[partClientId] = menuPart;
                                        }
                                    }
                                });
                            };
                            /**
                             * 変更前のファイルは削除
                             */
                            ScreenModel.prototype.removeFile = function (fileId) {
                                if (!nts.uk.text.isNullOrEmpty(fileId)) {
                                    nts.uk.request.file.remove(fileId);
                                }
                            };
                            ScreenModel.prototype.updateOriginalFileId = function () {
                                var vm = this;
                                for (var partClientId in vm.mapPartData) {
                                    var part = vm.mapPartData[partClientId];
                                    switch (part.partType) {
                                        case MenuPartType.PART_ATTACHMENT:
                                            var attachmentPartData = part;
                                            attachmentPartData.originalFileId = attachmentPartData.fileId;
                                            break;
                                        case MenuPartType.PART_IMAGE:
                                            var imagePartData = part;
                                            imagePartData.originalFileId = imagePartData.fileId;
                                            break;
                                    }
                                }
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        d.ScreenModel = ScreenModel;
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
                            /**
                             * On click part setting
                             * @param partClientId
                             */
                            LayoutUtils.onPartClickSetting = function ($part, visible) {
                                var $partSetting = $part.find('.part-setting');
                                var $partSettingPopup = $part.find('.part-setting-popup');
                                if ($partSettingPopup) {
                                    if (visible) {
                                        $partSettingPopup.css('display', 'block');
                                        $partSetting.css('display', 'block');
                                    }
                                    else {
                                        $partSettingPopup.css('display', 'none');
                                    }
                                }
                            };
                            LayoutUtils.onPartHover = function ($part, isHoverIn) {
                                var $partSetting = $part.find('.part-setting');
                                var $partSettingPopup = $part.find('.part-setting-popup');
                                if ($partSettingPopup.css("display") === "none") {
                                    if (isHoverIn) {
                                        $partSetting.css('display', 'block');
                                    }
                                    else {
                                        $partSetting.css('display', 'none');
                                    }
                                }
                            };
                            /**
                             * Create part class
                             * @param partType
                             */
                            LayoutUtils.renderPartDOM = function ($part, partData) {
                                var vm = this;
                                switch (partData.partType) {
                                    case MenuPartType.PART_MENU:
                                        return vm.renderPartDOMMenu($part, partData);
                                    case MenuPartType.PART_LABEL:
                                        return vm.renderPartDOMLabel($part, partData);
                                    case MenuPartType.PART_LINK:
                                        return vm.renderPartDOMLink($part, partData);
                                    case MenuPartType.PART_ATTACHMENT:
                                        return vm.renderPartDOMAttachment($part, partData);
                                    case MenuPartType.PART_IMAGE:
                                        return vm.renderPartDOMImage($part, partData);
                                    case MenuPartType.PART_ARROW:
                                        return vm.renderPartDOMArrow($part, partData);
                                    default:
                                        return vm.renderPartDOMMenu($part, partData);
                                }
                            };
                            /**
                             * Render PartDataMenuModel
                             * @param partData
                             */
                            LayoutUtils.renderPartDOMMenu = function ($partContainer, partData) {
                                var vm = this;
                                var hasImg = !_.isNil(partData.isFixed);
                                $partContainer
                                    // Set PartData attr
                                    .outerWidth(partData.width)
                                    .outerHeight(partData.height)
                                    .css({
                                    'top': "".concat(partData.positionTop, "px"),
                                    'left': "".concat(partData.positionLeft, "px"),
                                })
                                    // Update item data object
                                    .attr(KEY_DATA_ITEM_CLIENT_ID, partData.clientId);
                                var $part = $partContainer.find(".".concat(CSS_CLASS_MENU_CREATION_ITEM));
                                $part
                                    // Set PartDataLabelModel attr
                                    .css({
                                    'display': 'flex',
                                    'justify-content': vm.getHorizontalClass(!hasImg ? partData.alignHorizontal : HorizontalAlign.MIDDLE),
                                    'align-items': vm.getVerticalClass(!hasImg ? partData.alignVertical : VerticalAlign.BOTTOM),
                                });
                                // Render menu image
                                if (hasImg) {
                                    $part.css({ 'display': 'grid', 'grid-auto-columns': '100%', 'grid-auto-rows': 'minmax(0, 1fr) max-content' });
                                    var $imageContent = $part.find('.part-image-content');
                                    var src = (partData.isFixed === 0) ? partData.fileName : (this.isValidFile(partData.fileId) ? nts.uk.request.liveView(partData.fileId) : '');
                                    if (!$imageContent.length) {
                                        $imageContent = $("<img>", { 'class': 'part-image-content' });
                                    }
                                    $imageContent
                                        .attr('src', src);
                                    // Set image scale by original ratio
                                    var partRatio = partData.height / partData.width;
                                    var imageRatio = partData.ratio;
                                    if (partRatio > imageRatio) {
                                        $imageContent.css({
                                            'width': '100%',
                                            'height': 'auto',
                                        });
                                    }
                                    else {
                                        $imageContent.css({
                                            'width': 'auto',
                                            'height': '100%',
                                        });
                                    }
                                    $imageContent.css({
                                        'display': 'block',
                                        'margin': '5px auto auto',
                                        'max-height': '90%',
                                        'object-fit': 'contain'
                                    });
                                    $imageContent.appendTo($part);
                                }
                                else {
                                    $part.removeProp("grid-auto-columns");
                                    $part.removeProp("grid-auto-rows");
                                    $part.find("img").remove();
                                }
                                // Render label
                                var $menuName = $part.find('.part-menu-name');
                                if (!$menuName.length) {
                                    $menuName = $("<span>", { 'class': 'part-menu-name' });
                                }
                                if (hasImg) {
                                    $menuName.addClass("limited-label").css("text-align", "center");
                                }
                                else {
                                    $menuName.removeProp("text-align");
                                    $menuName.removeClass("limited-label");
                                }
                                $menuName
                                    .text(partData.menuName)
                                    .css({
                                    'font-size': partData.fontSize,
                                    'font-weight': partData.isBold ? 'bold' : 'normal',
                                    'color': partData.textColor
                                })
                                    .addClass('hyperlink');
                                $menuName.appendTo($part);
                                return $partContainer;
                            };
                            /**
                             * Render PartDataLabelModel
                             * @param partData
                             */
                            LayoutUtils.renderPartDOMLabel = function ($partContainer, partData) {
                                var vm = this;
                                $partContainer
                                    // Set PartData attr
                                    .outerWidth(partData.width)
                                    .outerHeight(partData.height)
                                    .css({
                                    'top': "".concat(partData.positionTop, "px"),
                                    'left': "".concat(partData.positionLeft, "px"),
                                })
                                    // Update item data object
                                    .attr(KEY_DATA_ITEM_CLIENT_ID, partData.clientId);
                                var $part = $partContainer.find(".".concat(CSS_CLASS_MENU_CREATION_ITEM));
                                $part
                                    // Set PartDataLabelModel attr
                                    .css({
                                    'background-color': partData.backgroundColor,
                                    'display': 'flex',
                                    'justify-content': vm.getHorizontalClass(partData.alignHorizontal),
                                    'align-items': vm.getVerticalClass(partData.alignVertical),
                                });
                                // Render label
                                var $labelContent = $part.find('.part-label-content');
                                if (!$labelContent.length) {
                                    $labelContent = $("<span>", { 'class': 'part-label-content' });
                                }
                                $labelContent
                                    .text(partData.labelContent)
                                    .css({
                                    'color': partData.textColor,
                                    'font-size': partData.fontSize,
                                    'font-weight': partData.isBold ? 'bold' : 'normal',
                                    'white-space': 'pre-wrap',
                                });
                                $labelContent.appendTo($part);
                                return $partContainer;
                            };
                            /**
                             * Render PartDataLinkModel
                             * @param partData
                             */
                            LayoutUtils.renderPartDOMLink = function ($partContainer, partData) {
                                var vm = this;
                                $partContainer
                                    // Set PartData attr
                                    .outerWidth(partData.width)
                                    .outerHeight(partData.height)
                                    .css({
                                    'top': "".concat(partData.positionTop, "px"),
                                    'left': "".concat(partData.positionLeft, "px"),
                                })
                                    // Update item data object
                                    .attr(KEY_DATA_ITEM_CLIENT_ID, partData.clientId);
                                var $part = $partContainer.find(".".concat(CSS_CLASS_MENU_CREATION_ITEM));
                                $part
                                    // Set PartDataLabelModel attr
                                    .css({
                                    'display': 'flex',
                                    'justify-content': vm.getHorizontalClass(partData.alignHorizontal),
                                    'align-items': vm.getVerticalClass(partData.alignVertical),
                                });
                                // Render label
                                var $linkContent = $part.find('.part-link-content');
                                if (!$linkContent.length) {
                                    $linkContent = $("<span>", { 'class': 'part-link-content' });
                                }
                                $linkContent
                                    .text(partData.linkContent || partData.url)
                                    .css({
                                    'font-size': partData.fontSize,
                                    'font-weight': partData.isBold ? 'bold' : 'normal',
                                })
                                    .addClass('hyperlink');
                                $linkContent.appendTo($part);
                                return $partContainer;
                            };
                            /**
                             * Render PartDataAttachmentModel
                             * @param partData
                             */
                            LayoutUtils.renderPartDOMAttachment = function ($partContainer, partData) {
                                var vm = this;
                                $partContainer
                                    // Set PartData attr
                                    .outerWidth(partData.width)
                                    .outerHeight(partData.height)
                                    .css({
                                    'top': "".concat(partData.positionTop, "px"),
                                    'left': "".concat(partData.positionLeft, "px"),
                                })
                                    // Update item data object
                                    .attr(KEY_DATA_ITEM_CLIENT_ID, partData.clientId);
                                var $part = $partContainer.find(".".concat(CSS_CLASS_MENU_CREATION_ITEM));
                                $part
                                    // Set PartDataLabelModel attr
                                    .css({
                                    'display': 'flex',
                                    'justify-content': vm.getHorizontalClass(partData.alignHorizontal),
                                    'align-items': vm.getVerticalClass(partData.alignVertical),
                                });
                                // Render label
                                var $fileContent = $part.find('.part-file-content');
                                if (!$fileContent.length) {
                                    $fileContent = $("<span>", { 'class': 'part-file-content' });
                                }
                                $fileContent
                                    .text(partData.linkContent || partData.fileName)
                                    .css({
                                    'font-size': partData.fontSize,
                                    'font-weight': partData.isBold ? 'bold' : 'normal',
                                })
                                    .addClass('hyperlink');
                                $fileContent.appendTo($part);
                                return $partContainer;
                            };
                            /**
                             * Render PartDataImageModel
                             * @param partData
                             */
                            LayoutUtils.renderPartDOMImage = function ($partContainer, partData) {
                                $partContainer
                                    // Set PartData attr
                                    .outerWidth(partData.width)
                                    .outerHeight(partData.height)
                                    .css({
                                    'top': "".concat(partData.positionTop, "px"),
                                    'left': "".concat(partData.positionLeft, "px"),
                                    'align-items': 'center'
                                })
                                    // Update item data object
                                    .attr(KEY_DATA_ITEM_CLIENT_ID, partData.clientId);
                                var $part = $partContainer.find(".".concat(CSS_CLASS_MENU_CREATION_ITEM));
                                $part
                                    // Set PartDataLabelModel attr
                                    .css({
                                    'display': 'flex',
                                });
                                // Render label
                                var $imageContent = $part.find('.part-image-content');
                                if (!$imageContent.length) {
                                    $imageContent = $("<img>", { 'class': 'part-image-content' });
                                }
                                $imageContent
                                    .attr('src', (partData.isFixed === 0) ? partData.fileName : (this.isValidFile(partData.fileId) ? nts.uk.request.liveView(partData.fileId) : ''));
                                // Set image scale by original ratio
                                var partRatio = partData.height / partData.width;
                                var imageRatio = partData.ratio;
                                if (partRatio > imageRatio) {
                                    $imageContent.css({
                                        'width': '100%',
                                        'height': 'auto',
                                    });
                                }
                                else {
                                    $imageContent.css({
                                        'width': 'auto',
                                        'height': '100%',
                                    });
                                }
                                $imageContent.appendTo($part);
                                return $partContainer;
                            };
                            /**
                             * Render PartDataArrowModel
                             * @param partData
                             */
                            LayoutUtils.renderPartDOMArrow = function ($partContainer, partData) {
                                $partContainer
                                    // Set PartData attr
                                    .outerWidth(partData.width)
                                    .outerHeight(partData.height)
                                    .css({
                                    'top': "".concat(partData.positionTop, "px"),
                                    'left': "".concat(partData.positionLeft, "px"),
                                })
                                    // Update item data object
                                    .attr(KEY_DATA_ITEM_CLIENT_ID, partData.clientId);
                                var $part = $partContainer.find(".".concat(CSS_CLASS_MENU_CREATION_ITEM));
                                $part
                                    // Set PartDataLabelModel attr
                                    .css({
                                    'display': 'flex',
                                });
                                // Render label
                                var $arrowContent = $part.find('.part-arrow-content');
                                if (!$arrowContent.length) {
                                    $arrowContent = $("<img>", { 'class': 'part-arrow-content' });
                                }
                                $arrowContent.attr('src', partData.fileSrc);
                                $arrowContent.css({
                                    'width': '100%',
                                    'height': '100%',
                                });
                                $arrowContent.appendTo($part);
                                return $partContainer;
                            };
                            /**
                             * getHorizontalClass
                             */
                            LayoutUtils.getHorizontalClass = function (alignHorizontal) {
                                var horizontalPosition = null;
                                switch (alignHorizontal) {
                                    case HorizontalAlign.LEFT:
                                        horizontalPosition = 'flex-start';
                                        break;
                                    case HorizontalAlign.MIDDLE:
                                        horizontalPosition = 'center';
                                        break;
                                    case HorizontalAlign.RIGHT:
                                        horizontalPosition = 'flex-end';
                                        break;
                                    default:
                                        horizontalPosition = 'flex-start';
                                        break;
                                }
                                return horizontalPosition;
                            };
                            /**
                             * getVerticalClass
                             */
                            LayoutUtils.getVerticalClass = function (alignVertical) {
                                var verticalPosition = null;
                                switch (alignVertical) {
                                    case VerticalAlign.TOP:
                                        verticalPosition = 'flex-start';
                                        break;
                                    case VerticalAlign.CENTER:
                                        verticalPosition = 'center';
                                        break;
                                    case VerticalAlign.BOTTOM:
                                        verticalPosition = 'flex-end';
                                        break;
                                    default:
                                        verticalPosition = 'flex-start';
                                        break;
                                }
                                return verticalPosition;
                            };
                            LayoutUtils.calculatePositionTop = function (itemHeight, positionTop) {
                                var maxPositionTop = CREATION_LAYOUT_HEIGHT - itemHeight;
                                if (positionTop <= 0) {
                                    return 0;
                                }
                                return positionTop + itemHeight <= CREATION_LAYOUT_HEIGHT
                                    ? Math.round(positionTop / CELL_SIZE) * CELL_SIZE
                                    : (maxPositionTop / CELL_SIZE) * CELL_SIZE;
                            };
                            LayoutUtils.calculatePositionLeft = function (itemWidth, positionLeft) {
                                var maxPositionLeft = CREATION_LAYOUT_WIDTH - itemWidth;
                                if (positionLeft <= 0) {
                                    return 0;
                                }
                                return positionLeft + itemWidth <= CREATION_LAYOUT_WIDTH
                                    ? Math.round(positionLeft / CELL_SIZE) * CELL_SIZE
                                    : (maxPositionLeft / CELL_SIZE) * CELL_SIZE;
                            };
                            /**
                             * Detects if two item part are colliding
                             * https://gist.github.com/jtsternberg/c272d7de5b967cec2d3d
                             * @param partData1
                             * @param partData2
                             */
                            LayoutUtils.isItemOverlapping = function (partData1, partData2) {
                                if (partData1.clientId === partData2.clientId) {
                                    return false;
                                }
                                // Part data 1
                                var partData1DistanceFromTop = partData1.positionTop + partData1.height;
                                var partData1DistanceFromLeft = partData1.positionLeft + partData1.width;
                                // Part data 2
                                var partData2DistanceFromTop = partData2.positionTop + partData2.height;
                                var partData2DistanceFromLeft = partData2.positionLeft + partData2.width;
                                var notColliding = (partData1DistanceFromTop <= partData2.positionTop
                                    || partData1.positionTop >= partData2DistanceFromTop
                                    || partData1DistanceFromLeft <= partData2.positionLeft
                                    || partData1.positionLeft >= partData2DistanceFromLeft);
                                // Return whether it IS colliding
                                return !notColliding;
                            };
                            /**
                             * Get part size by type
                             * @param partType
                             */
                            LayoutUtils.getPartSize = function (partType) {
                                switch (partType) {
                                    case MenuPartType.PART_MENU:
                                        // 3 x 3 cell
                                        return new PartSize({ width: CELL_SIZE * 3, height: CELL_SIZE * 3 });
                                    case MenuPartType.PART_LABEL:
                                        // 4 x 2 cell
                                        return new PartSize({ width: CELL_SIZE * 4, height: CELL_SIZE * 2 });
                                    case MenuPartType.PART_LINK:
                                        // 4 x 2 cell
                                        return new PartSize({ width: CELL_SIZE * 4, height: CELL_SIZE * 2 });
                                    case MenuPartType.PART_ATTACHMENT:
                                        // 4 x 2 cell
                                        return new PartSize({ width: CELL_SIZE * 4, height: CELL_SIZE * 2 });
                                    case MenuPartType.PART_IMAGE:
                                        // 2 x 2 cell
                                        return new PartSize({ width: CELL_SIZE * 2, height: CELL_SIZE * 2 });
                                    case MenuPartType.PART_ARROW:
                                        // 2 x 2 cell
                                        return new PartSize({ width: CELL_SIZE * 2, height: CELL_SIZE * 2 });
                                    default:
                                        // 4 x 2 cell
                                        return new PartSize({ width: CELL_SIZE * 4, height: CELL_SIZE * 2 });
                                }
                            };
                            /**
                             * build PartHTML from PartData
                             */
                            LayoutUtils.buildPartHTML = function (partData) {
                                var $partHTML = null;
                                switch (partData.partType) {
                                    case MenuPartType.PART_MENU:
                                        var partDataMenuModel = partData;
                                        partDataMenuModel.originalFileId = partDataMenuModel.fileId;
                                        var hasImg = !_.isNil(partDataMenuModel.isFixed);
                                        var $partMenuHTML = $('<a>', { 'href': "".concat(location.origin).concat(partDataMenuModel.menuUrl), 'target': '_top' })
                                            .text(partDataMenuModel.menuName)
                                            .addClass(CSS_CLASS_CCG034_HYPERLINK)
                                            .css({
                                            'font-size': "".concat(partDataMenuModel.fontSize, "px"),
                                            'font-weight': partDataMenuModel.isBold ? 'bold' : 'normal',
                                            'color': partDataMenuModel.textColor,
                                            'text-decoration': 'underline',
                                            'cursor': 'pointer',
                                        });
                                        $partHTML = $("<div>")
                                            .addClass("ccg034-component-container")
                                            .css({
                                            'position': 'absolute',
                                            'top': "".concat(partDataMenuModel.positionTop, "px"),
                                            'left': "".concat(partDataMenuModel.positionLeft, "px"),
                                            'width': "".concat(partDataMenuModel.width, "px"),
                                            'height': "".concat(partDataMenuModel.height, "px"),
                                            'display': 'flex',
                                            'justify-content': LayoutUtils.getHorizontalClass(!hasImg ? partDataMenuModel.alignHorizontal : HorizontalAlign.MIDDLE),
                                            'align-items': LayoutUtils.getVerticalClass(!hasImg ? partDataMenuModel.alignHorizontal : VerticalAlign.BOTTOM),
                                            'overflow': 'hidden',
                                            'text-overflow': 'ellipsis',
                                        });
                                        if (hasImg) {
                                            var src = (partDataMenuModel.isFixed === 0) ? partDataMenuModel.fileName : (this.isValidFile(partDataMenuModel.fileId) ? nts.uk.request.liveView(partDataMenuModel.fileId) : '');
                                            var partRatio = partDataMenuModel.height / partDataMenuModel.width;
                                            var imageRatio = partDataMenuModel.ratio;
                                            $partHTML.css({ 'display': 'grid', 'grid-auto-columns': '100%', 'grid-auto-rows': 'minmax(0, 1fr) max-content' });
                                            var $partImageContainer = $('<a>', { 'href': "".concat(location.origin).concat(partDataMenuModel.menuUrl), 'target': '_top' })
                                                .addClass(CSS_CLASS_CCG034_HYPERLINK)
                                                .css({ "align-self": "start", "height": "100%" });
                                            var $partImage = $("<img>")
                                                .addClass("ccg034-hyperlink")
                                                .attr("src", src);
                                            if (partRatio > imageRatio) {
                                                $partImage.css({
                                                    'width': '100%',
                                                    'height': 'auto',
                                                });
                                            }
                                            else {
                                                $partImage.css({
                                                    'width': 'auto',
                                                    'height': '100%',
                                                });
                                            }
                                            $partImage.css({
                                                'display': 'block',
                                                'margin': '5px auto auto',
                                                'max-height': '90%',
                                                'object-fit': 'contain'
                                            });
                                            $partMenuHTML.addClass("limited-label").css("text-align", "center");
                                            $partHTML.prepend($partImageContainer.append($partImage));
                                        }
                                        $partHTML.append($partMenuHTML);
                                        break;
                                    case MenuPartType.PART_LABEL:
                                        var partDataLabelModel = partData;
                                        var $partLabelHTML = $('<span>')
                                            .text(partDataLabelModel.labelContent)
                                            .css({
                                            'font-size': "".concat(partDataLabelModel.fontSize, "px"),
                                            'font-weight': partDataLabelModel.isBold ? 'bold' : 'normal',
                                            'color': partDataLabelModel.textColor,
                                            'white-space': 'pre-wrap',
                                        });
                                        $partHTML = $("<div>")
                                            .addClass("ccg034-component-container")
                                            .css({
                                            'position': 'absolute',
                                            'top': "".concat(partDataLabelModel.positionTop, "px"),
                                            'left': "".concat(partDataLabelModel.positionLeft, "px"),
                                            'width': "".concat(partDataLabelModel.width, "px"),
                                            'height': "".concat(partDataLabelModel.height, "px"),
                                            'display': 'flex',
                                            'align-items': LayoutUtils.getVerticalClass(partDataLabelModel.alignVertical),
                                            'justify-content': LayoutUtils.getHorizontalClass(partDataLabelModel.alignHorizontal),
                                            'overflow': 'hidden',
                                            'text-overflow': 'ellipsis',
                                            'background-color': partDataLabelModel.backgroundColor,
                                        })
                                            .append($partLabelHTML);
                                        break;
                                    case MenuPartType.PART_LINK:
                                        var partDataLinkModel = partData;
                                        var $partLinkHTML = $('<a>', { 'href': partDataLinkModel.url, 'target': '_blank' })
                                            .text(partDataLinkModel.linkContent || partDataLinkModel.url)
                                            .addClass(CSS_CLASS_CCG034_HYPERLINK)
                                            .css({
                                            'font-size': "".concat(partDataLinkModel.fontSize, "px"),
                                            'font-weight': partDataLinkModel.isBold ? 'bold' : 'normal',
                                            'color': '#0066CC',
                                            'text-decoration': 'underline',
                                            'cursor': 'pointer',
                                        });
                                        $partHTML = $("<div>")
                                            .addClass("ccg034-component-container")
                                            .css({
                                            'position': 'absolute',
                                            'top': "".concat(partDataLinkModel.positionTop, "px"),
                                            'left': "".concat(partDataLinkModel.positionLeft, "px"),
                                            'width': "".concat(partDataLinkModel.width, "px"),
                                            'height': "".concat(partDataLinkModel.height, "px"),
                                            'display': 'flex',
                                            'align-items': LayoutUtils.getVerticalClass(partDataLinkModel.alignVertical),
                                            'justify-content': LayoutUtils.getHorizontalClass(partDataLinkModel.alignHorizontal),
                                            'overflow': 'hidden',
                                            'text-overflow': 'ellipsis',
                                        })
                                            .append($partLinkHTML);
                                        break;
                                    case MenuPartType.PART_ATTACHMENT:
                                        var partDataAttachmentModel = partData;
                                        partDataAttachmentModel.originalFileId = partDataAttachmentModel.fileId;
                                        var fileLink = "".concat(location.origin, "/nts.uk.com.web/webapi/shr/infra/file/storage/get/").concat(partDataAttachmentModel.fileId);
                                        var $partAttachmentHTML = $('<a>', { 'href': fileLink, 'target': '_blank' })
                                            .text(partDataAttachmentModel.linkContent || partDataAttachmentModel.fileName)
                                            .addClass(CSS_CLASS_CCG034_HYPERLINK)
                                            .css({
                                            'font-size': "".concat(partDataAttachmentModel.fontSize, "px"),
                                            'font-weight': partDataAttachmentModel.isBold ? 'bold' : 'normal',
                                            'color': '#0066CC',
                                            'text-decoration': 'underline',
                                            'cursor': 'pointer',
                                        });
                                        $partHTML = $("<div>")
                                            .addClass("ccg034-component-container")
                                            .css({
                                            'position': 'absolute',
                                            'top': "".concat(partDataAttachmentModel.positionTop, "px"),
                                            'left': "".concat(partDataAttachmentModel.positionLeft, "px"),
                                            'width': "".concat(partDataAttachmentModel.width, "px"),
                                            'height': "".concat(partDataAttachmentModel.height, "px"),
                                            'display': 'flex',
                                            'align-items': LayoutUtils.getVerticalClass(partDataAttachmentModel.alignVertical),
                                            'justify-content': LayoutUtils.getHorizontalClass(partDataAttachmentModel.alignHorizontal),
                                            'overflow': 'hidden',
                                            'text-overflow': 'ellipsis',
                                        })
                                            .append($partAttachmentHTML);
                                        break;
                                    case MenuPartType.PART_IMAGE:
                                        var partDataImageModel = partData;
                                        partDataImageModel.originalFileId = partDataImageModel.fileId;
                                        var $partImageHTML = $('<img>', {
                                            'src': partDataImageModel.isFixed === 0
                                                ? partDataImageModel.fileName
                                                : partDataImageModel.fileId
                                                    ? nts.uk.request.liveView(partDataImageModel.fileId)
                                                    : null
                                        })
                                            .css({
                                            'width': (partDataImageModel.width > partDataImageModel.height) ? 'auto' : '100%',
                                            'height': (partDataImageModel.width > partDataImageModel.height) ? '100%' : 'auto',
                                        });
                                        $partHTML = $("<div>")
                                            .css({
                                            'position': 'absolute',
                                            'top': "".concat(partDataImageModel.positionTop, "px"),
                                            'left': "".concat(partDataImageModel.positionLeft, "px"),
                                            'width': "".concat(partDataImageModel.width, "px"),
                                            'height': "".concat(partDataImageModel.height, "px"),
                                            'display': 'flex',
                                            'align-items': 'center',
                                            'justify-content': 'center',
                                            'overflow': 'hidden',
                                        })
                                            .append($partImageHTML);
                                        break;
                                    case MenuPartType.PART_ARROW:
                                        var partDataArrowModel = partData;
                                        var $partArrowHTML = $('<img>', { 'src': partDataArrowModel.fileSrc })
                                            .css({
                                            'width': '100%',
                                            'height': '100%',
                                        });
                                        $partHTML = $("<div>")
                                            .css({
                                            'position': 'absolute',
                                            'top': "".concat(partDataArrowModel.positionTop, "px"),
                                            'left': "".concat(partDataArrowModel.positionLeft, "px"),
                                            'width': "".concat(partDataArrowModel.width, "px"),
                                            'height': "".concat(partDataArrowModel.height, "px"),
                                            'display': 'flex',
                                            'align-items': 'center',
                                            'justify-content': 'center',
                                            'overflow': 'hidden',
                                        })
                                            .append($partArrowHTML);
                                        break;
                                    default:
                                        $partHTML = $("<div>")
                                            .css({
                                            'position': 'absolute',
                                            'top': "".concat(partData.positionTop, "px"),
                                            'left': "".concat(partData.positionLeft, "px"),
                                            'width': "".concat(partData.width, "px"),
                                            'height': "".concat(partData.height, "px"),
                                        });
                                        break;
                                }
                                return $partHTML;
                            };
                            LayoutUtils.isValidFile = function (fileId) {
                                return !nts.uk.text.isNullOrEmpty(fileId);
                            };
                            return LayoutUtils;
                        }());
                        d.LayoutUtils = LayoutUtils;
                        var PartSize = /** @class */ (function () {
                            function PartSize(init) {
                                $.extend(this, init);
                            }
                            return PartSize;
                        }());
                        d.PartSize = PartSize;
                        var MenuPartType;
                        (function (MenuPartType) {
                            MenuPartType["PART_MENU"] = "1";
                            MenuPartType["PART_LABEL"] = "2";
                            MenuPartType["PART_LINK"] = "3";
                            MenuPartType["PART_ATTACHMENT"] = "4";
                            MenuPartType["PART_IMAGE"] = "5";
                            MenuPartType["PART_ARROW"] = "6";
                        })(MenuPartType = d.MenuPartType || (d.MenuPartType = {}));
                        var HorizontalAlign;
                        (function (HorizontalAlign) {
                            HorizontalAlign[HorizontalAlign["LEFT"] = 0] = "LEFT";
                            HorizontalAlign[HorizontalAlign["MIDDLE"] = 1] = "MIDDLE";
                            HorizontalAlign[HorizontalAlign["RIGHT"] = 2] = "RIGHT";
                        })(HorizontalAlign = d.HorizontalAlign || (d.HorizontalAlign = {}));
                        var VerticalAlign;
                        (function (VerticalAlign) {
                            VerticalAlign[VerticalAlign["TOP"] = 0] = "TOP";
                            VerticalAlign[VerticalAlign["CENTER"] = 1] = "CENTER";
                            VerticalAlign[VerticalAlign["BOTTOM"] = 2] = "BOTTOM";
                        })(VerticalAlign = d.VerticalAlign || (d.VerticalAlign = {}));
                        var PartDataModel = /** @class */ (function () {
                            function PartDataModel(init) {
                                $.extend(this, init);
                            }
                            return PartDataModel;
                        }());
                        d.PartDataModel = PartDataModel;
                        var PartDataMenuModel = /** @class */ (function (_super) {
                            __extends(PartDataMenuModel, _super);
                            function PartDataMenuModel(init) {
                                var _this = _super.call(this, init) || this;
                                _this.alignHorizontal = HorizontalAlign.MIDDLE;
                                _this.alignVertical = VerticalAlign.CENTER;
                                _this.menuCode = null;
                                _this.menuName = "";
                                _this.menuClassification = 0;
                                _this.systemType = 0;
                                _this.fontSize = 11;
                                _this.isBold = true;
                                _this.menuUrl = null;
                                _this.textColor = "#000000";
                                _this.isFixed = null;
                                _this.ratio = null;
                                _this.fileId = "";
                                _this.fileName = "";
                                _this.originalFileId = "";
                                $.extend(_this, init);
                                return _this;
                            }
                            return PartDataMenuModel;
                        }(PartDataModel));
                        d.PartDataMenuModel = PartDataMenuModel;
                        var PartDataLabelModel = /** @class */ (function (_super) {
                            __extends(PartDataLabelModel, _super);
                            function PartDataLabelModel(init) {
                                var _this = _super.call(this, init) || this;
                                // Default data
                                _this.alignHorizontal = HorizontalAlign.LEFT;
                                _this.alignVertical = VerticalAlign.CENTER;
                                _this.labelContent = '';
                                _this.fontSize = 11;
                                _this.isBold = true;
                                _this.textColor = '#000000';
                                _this.backgroundColor = '#ffffff';
                                $.extend(_this, init);
                                return _this;
                            }
                            return PartDataLabelModel;
                        }(PartDataModel));
                        d.PartDataLabelModel = PartDataLabelModel;
                        var PartDataLinkModel = /** @class */ (function (_super) {
                            __extends(PartDataLinkModel, _super);
                            function PartDataLinkModel(init) {
                                var _this = _super.call(this, init) || this;
                                // Default data
                                _this.alignHorizontal = HorizontalAlign.LEFT;
                                _this.alignVertical = VerticalAlign.CENTER;
                                _this.url = null;
                                _this.linkContent = '';
                                _this.fontSize = 11;
                                _this.isBold = true;
                                $.extend(_this, init);
                                return _this;
                            }
                            return PartDataLinkModel;
                        }(PartDataModel));
                        d.PartDataLinkModel = PartDataLinkModel;
                        var PartDataAttachmentModel = /** @class */ (function (_super) {
                            __extends(PartDataAttachmentModel, _super);
                            function PartDataAttachmentModel(init) {
                                var _this = _super.call(this, init) || this;
                                // Default data
                                _this.alignHorizontal = HorizontalAlign.LEFT;
                                _this.alignVertical = VerticalAlign.CENTER;
                                _this.fileId = null;
                                _this.fileSize = 0;
                                _this.fileName = null;
                                _this.linkContent = '';
                                _this.fileLink = null;
                                _this.fontSize = 11;
                                _this.isBold = true;
                                _this.originalFileId = null;
                                $.extend(_this, init);
                                return _this;
                            }
                            return PartDataAttachmentModel;
                        }(PartDataModel));
                        d.PartDataAttachmentModel = PartDataAttachmentModel;
                        var PartDataImageModel = /** @class */ (function (_super) {
                            __extends(PartDataImageModel, _super);
                            function PartDataImageModel(init) {
                                var _this = _super.call(this, init) || this;
                                // Default data
                                _this.fileId = null;
                                _this.fileName = null;
                                _this.uploadedFileName = null;
                                _this.uploadedFileSize = 0;
                                _this.isFixed = 0;
                                _this.ratio = 1;
                                _this.originalFileId = null;
                                $.extend(_this, init);
                                return _this;
                            }
                            return PartDataImageModel;
                        }(PartDataModel));
                        d.PartDataImageModel = PartDataImageModel;
                        var PartDataArrowModel = /** @class */ (function (_super) {
                            __extends(PartDataArrowModel, _super);
                            function PartDataArrowModel(init) {
                                var _this = _super.call(this, init) || this;
                                // Default data
                                _this.fileName = null;
                                _this.fileSrc = null;
                                $.extend(_this, init);
                                return _this;
                            }
                            return PartDataArrowModel;
                        }(PartDataModel));
                        d.PartDataArrowModel = PartDataArrowModel;
                        var UpdateFlowMenuLayoutCommand = /** @class */ (function () {
                            function UpdateFlowMenuLayoutCommand(init) {
                                $.extend(this, init);
                            }
                            return UpdateFlowMenuLayoutCommand;
                        }());
                        var FlowMenuLayoutDto = /** @class */ (function () {
                            function FlowMenuLayoutDto(init) {
                                $.extend(this, init);
                            }
                            return FlowMenuLayoutDto;
                        }());
                        var MenuSettingDto = /** @class */ (function () {
                            function MenuSettingDto(init) {
                                $.extend(this, init);
                            }
                            return MenuSettingDto;
                        }());
                        d.MenuSettingDto = MenuSettingDto;
                        var LabelSettingDto = /** @class */ (function () {
                            function LabelSettingDto(init) {
                                $.extend(this, init);
                            }
                            return LabelSettingDto;
                        }());
                        d.LabelSettingDto = LabelSettingDto;
                        var LinkSettingDto = /** @class */ (function () {
                            function LinkSettingDto(init) {
                                $.extend(this, init);
                            }
                            return LinkSettingDto;
                        }());
                        d.LinkSettingDto = LinkSettingDto;
                        var FileAttachmentSettingDto = /** @class */ (function () {
                            function FileAttachmentSettingDto(init) {
                                $.extend(this, init);
                            }
                            return FileAttachmentSettingDto;
                        }());
                        d.FileAttachmentSettingDto = FileAttachmentSettingDto;
                        var ImageSettingDto = /** @class */ (function () {
                            function ImageSettingDto(init) {
                                $.extend(this, init);
                            }
                            return ImageSettingDto;
                        }());
                        d.ImageSettingDto = ImageSettingDto;
                        var ArrowSettingDto = /** @class */ (function () {
                            function ArrowSettingDto(init) {
                                $.extend(this, init);
                            }
                            return ArrowSettingDto;
                        }());
                        d.ArrowSettingDto = ArrowSettingDto;
                        var ModifiedPartList = /** @class */ (function () {
                            function ModifiedPartList() {
                                this.added = [];
                                this.deleted = [];
                            }
                            return ModifiedPartList;
                        }());
                        d.ModifiedPartList = ModifiedPartList;
                    })(d = ccg034.d || (ccg034.d = {}));
                })(ccg034 = view.ccg034 || (view.ccg034 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg034.d.vm.js.map