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
                    var f;
                    (function (f) {
                        var getText = nts.uk.resource.getText;
                        // URL API backend
                        var API = {
                            getMenuList: "sys/portal/standardmenu/findByMenuAndWebMenu"
                        };
                        var MAXIMUM_IMAGE_COUNT = 4;
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super.call(this) || this;
                                //Data
                                _this.partData = null;
                                // System combo box
                                _this.selectedSystemType = ko.observable(0);
                                _this.systemList = ko.observableArray([
                                    { code: 0, name: getText("CCG034_70") },
                                    { code: 1, name: getText("Enum_System_COMMON") },
                                    { code: 2, name: getText("Enum_System_TIME_SHEET") },
                                    { code: 3, name: getText("Enum_System_OFFICE_HELPER") },
                                    { code: 4, name: getText("Enum_System_KYUYOU") },
                                    { code: 5, name: getText("Enum_System_JINJIROU") }
                                ]);
                                // Menu list
                                _this.selectedMenuCode = ko.observable('');
                                _this.displayMenuName = ko.observable('');
                                _this.menuName = ko.observable('');
                                _this.menuCode = ko.observable('');
                                _this.menuClassification = ko.observable(0);
                                _this.menuSystemType = ko.observable(0);
                                _this.menuList = ko.observableArray([]);
                                _this.filteredMenuList = ko.observableArray([]);
                                _this.menuColumns = [
                                    { headerText: '', key: 'id', hidden: true },
                                    { headerText: getText('CCG034_72'), key: 'code', width: 60 },
                                    { headerText: getText('CCG034_73'), key: 'name', width: 300 }
                                ];
                                _this.menuUrl = ko.observable(null);
                                // Common text attribute
                                _this.fontSize = ko.observable(11);
                                _this.isBold = ko.observable(false);
                                _this.textColorValue = ko.observable(null);
                                _this.horizontalAlign = ko.observable(nts.uk.com.view.ccg034.share.model.HorizontalAlign.LEFT);
                                _this.verticalAlign = ko.observable(nts.uk.com.view.ccg034.share.model.VerticalAlign.TOP);
                                _this.horizontalAlignList = [
                                    { code: HorizontalAlign.LEFT, name: getText('CCG034_79') },
                                    { code: HorizontalAlign.MIDDLE, name: getText('CCG034_80') },
                                    { code: HorizontalAlign.RIGHT, name: getText('CCG034_81') }
                                ];
                                _this.verticalAlignList = [
                                    { code: VerticalAlign.TOP, name: getText('CCG034_83') },
                                    { code: VerticalAlign.CENTER, name: getText('CCG034_84') },
                                    { code: VerticalAlign.BOTTOM, name: getText('CCG034_85') }
                                ];
                                // Image menu
                                _this.originalFileId = null;
                                _this.imageOption = [
                                    { code: -1, name: getText('CCG034_131') },
                                    { code: 0, name: getText('CCG034_132') },
                                    { code: 1, name: getText('CCG034_133') }
                                ];
                                _this.imageType = ko.observable(null);
                                _this.imageSrc = ko.observable(null);
                                _this.imageList = [];
                                _this.uploadedFileName = ko.observable(null);
                                _this.fileSize = ko.observable(0);
                                _this.displayFileSize = ko.computed(function () {
                                    var vm = _this;
                                    if (vm.fileSize() >= 1024) {
                                        return nts.uk.text.format(getText("CCG034_125"), vm.fileSize() / 1024) + "MB";
                                    }
                                    return nts.uk.text.format(getText("CCG034_125"), vm.fileSize()) + "KB";
                                });
                                _this.fileId = ko.observable(null);
                                _this.uploadSrc = ko.observable(null);
                                var vm = _this;
                                vm.isDisplayFileSize = ko.computed(function () {
                                    if (vm.imageType() === 1 && !_.isNil(vm.fileId()) && !_.isEmpty(vm.fileId())) {
                                        var isExist_1 = ko.observable(false);
                                        vm.$ajax("/shr/infra/file/storage/isexist/" + vm.fileId()).then(function (result) { return isExist_1(result); });
                                        return isExist_1();
                                    }
                                    return false;
                                });
                                return _this;
                            }
                            ScreenModel.prototype.created = function (params) {
                                var vm = this;
                                vm.partData = params;
                                vm.selectedMenuCode.subscribe(function (value) {
                                    var item = _.find(vm.menuList(), { id: value });
                                    if (item) {
                                        vm.displayMenuName("".concat(item.code, " ").concat(item.name));
                                        vm.menuName(item.name);
                                        vm.menuCode(item.code);
                                        vm.menuClassification(item.menuClassification);
                                        vm.menuSystemType(item.systemType);
                                        if (nts.uk.text.isNullOrEmpty(item.queryString)) {
                                            vm.menuUrl(item.url);
                                        }
                                        else {
                                            vm.menuUrl("".concat(item.url, "?").concat(item.queryString));
                                        }
                                        //Revalidate
                                        vm.$validate("#F6_2");
                                    }
                                });
                                vm.selectedSystemType.subscribe(function (value) {
                                    if (Number(value) > 0) {
                                        vm.filteredMenuList(_.filter(vm.menuList(), { systemType: value - 1 }));
                                    }
                                    else {
                                        vm.filteredMenuList(vm.menuList());
                                    }
                                });
                                vm.imageType.subscribe(function (value) {
                                    $("#F9_10").ntsPopup("hide");
                                    if (value === 1 && !nts.uk.text.isNullOrEmpty(vm.fileId())) {
                                        vm.$ajax("/shr/infra/file/storage/isexist/" + vm.fileId()).then(function (isExist) {
                                            if (isExist) {
                                                vm.$ajax("/shr/infra/file/storage/infor/" + vm.fileId()).then(function (res) {
                                                    vm.fileSize(Math.round(Number(res.originalSize) / 1024));
                                                    vm.updatePreview();
                                                });
                                            }
                                        });
                                    }
                                    // Fix tabindex
                                    $("#F9_3_3 .browser-button").attr("tabindex", value === 1 ? 7 : -1);
                                });
                            };
                            ScreenModel.prototype.mounted = function () {
                                var _a;
                                var vm = this;
                                // Binding part data
                                vm.horizontalAlign(vm.partData.alignHorizontal);
                                vm.verticalAlign(vm.partData.alignVertical);
                                vm.menuName(vm.partData.menuName);
                                vm.menuCode(vm.partData.menuCode);
                                vm.menuClassification(vm.partData.menuClassification);
                                vm.menuSystemType(vm.partData.systemType);
                                vm.fontSize(vm.partData.fontSize);
                                vm.isBold(vm.partData.isBold);
                                vm.menuUrl(vm.partData.menuUrl);
                                vm.textColorValue(vm.partData.textColor);
                                vm.fileId(vm.partData.fileId);
                                vm.imageType((_a = vm.partData.isFixed) !== null && _a !== void 0 ? _a : -1);
                                vm.originalFileId = vm.fileId();
                                if (!nts.uk.text.isNullOrEmpty(vm.partData.fileName)) {
                                    vm.imageSrc(vm.partData.fileName);
                                }
                                vm.findMenuData();
                                vm.createPopUp();
                                $("#F6_2").focus();
                            };
                            ScreenModel.prototype.findMenuData = function () {
                                var vm = this;
                                vm.$blockui("grayout");
                                vm.$ajax(API.getMenuList)
                                    .then(function (data) {
                                    vm.menuList(_.map(data, function (menu) { return ({
                                        id: nts.uk.util.randomId(),
                                        code: menu.code,
                                        name: menu.displayName,
                                        systemType: menu.system,
                                        menuClassification: menu.classification,
                                        url: menu.url,
                                        queryString: menu.queryString
                                    }); }));
                                    vm.filteredMenuList(vm.menuList());
                                })
                                    .then(function () {
                                    if (vm.menuCode()) {
                                        vm.selectedMenuCode(_.find(vm.menuList(), { code: vm.menuCode(), menuClassification: vm.menuClassification(), systemType: vm.menuSystemType() }).id);
                                        vm.menuName(vm.partData.menuName);
                                    }
                                })
                                    .always(function () { return vm.$blockui("clear"); });
                            };
                            ScreenModel.prototype.uploadFinished = function (data) {
                                var vm = this;
                                if (vm.fileId() !== vm.originalFileId && !nts.uk.text.isNullOrEmpty(vm.fileId())) {
                                    nts.uk.request.file.remove(vm.fileId());
                                }
                                vm.fileId(data.id);
                                vm.fileSize(Math.round(Number(data.originalSize) / 1024));
                                vm.updatePreview();
                            };
                            ScreenModel.prototype.updatePreview = function () {
                                var vm = this;
                                var container = $("#F9_4_3");
                                container.html("");
                                container.append($("<img class='pic-preview'/>").attr("src", nts.uk.request.liveView(vm.fileId())));
                            };
                            ScreenModel.prototype.createPopUp = function () {
                                var vm = this;
                                // Generate image list
                                for (var index = 0; index < 40; index++) {
                                    vm.imageList.push({ code: index, name: "../../share/resources/ccg034/i/CCG034I_".concat(nts.uk.text.padLeft(String(index + 1), '0', 3), ".png") });
                                }
                                // Adding images inside popup
                                for (var imageRow = 0; imageRow < vm.imageList.length; imageRow += MAXIMUM_IMAGE_COUNT) {
                                    var toAppend = "";
                                    for (var imageCol = imageRow; imageCol < imageRow + MAXIMUM_IMAGE_COUNT; imageCol++) {
                                        toAppend += "<img id=\"F9_10_1_".concat(imageCol, "\" data-index=\"").concat(imageCol, "\" src=\"").concat(vm.imageList[imageCol].name, "\" class=\"pic-choose\" data-bind=\"click: chooseImage\" tabindex=\"8\" />");
                                    }
                                    var template_1 = "<div>".concat(toAppend, "</div>");
                                    $("#F9_10").append(template_1);
                                    // Rebind Knockout for the newly added div
                                    ko.applyBindings(vm, $("#F9_10 > div:last-child")[0]);
                                }
                                $("#F9_10").ntsPopup({
                                    position: {
                                        my: "left top",
                                        at: "left bottom",
                                        of: "#F9_3_2"
                                    },
                                    showOnStart: false,
                                    dismissible: false
                                });
                                $("#F9_3_2").on("click", function () { return $("#F9_10").ntsPopup("toggle"); });
                            };
                            ScreenModel.prototype.chooseImage = function (data, event) {
                                var vm = this;
                                var index = $(event.currentTarget).data("index");
                                var item = vm.imageList[index];
                                vm.imageSrc(item.name);
                                $("#F9_10").ntsPopup("hide");
                            };
                            /**
                             * Close dialog
                             */
                            ScreenModel.prototype.closeDialog = function () {
                                var vm = this;
                                if (vm.fileId() !== vm.partData.originalFileId && !nts.uk.text.isNullOrEmpty(vm.fileId())) {
                                    nts.uk.request.file.remove(vm.fileId());
                                }
                                vm.$window.close();
                            };
                            /**
                            * Update part data and close dialog
                            */
                            ScreenModel.prototype.updatePartDataAndCloseDialog = function () {
                                var vm = this;
                                vm.$validate().then(function (valid) {
                                    if (valid) {
                                        var image = new Image();
                                        // Update part data
                                        vm.partData.alignHorizontal = vm.horizontalAlign();
                                        vm.partData.alignVertical = vm.verticalAlign();
                                        vm.partData.menuCode = vm.menuCode();
                                        vm.partData.menuName = vm.menuName();
                                        vm.partData.menuClassification = vm.menuClassification();
                                        vm.partData.systemType = vm.menuSystemType();
                                        vm.partData.fontSize = Number(vm.fontSize());
                                        vm.partData.isBold = vm.isBold();
                                        vm.partData.menuUrl = vm.menuUrl();
                                        vm.partData.textColor = vm.textColorValue();
                                        vm.partData.isFixed = vm.imageType() === -1 ? null : vm.imageType();
                                        // ImageType === 0
                                        if (vm.imageType() === 0) {
                                            vm.partData.fileName = vm.imageSrc();
                                            image.src = vm.imageSrc();
                                            if (vm.fileId() !== vm.partData.originalFileId && !nts.uk.text.isNullOrEmpty(vm.fileId())) {
                                                nts.uk.request.file.remove(vm.fileId());
                                            }
                                        }
                                        else if (vm.imageType() === 1) {
                                            // ImageType === 1
                                            vm.partData.fileId = vm.fileId();
                                            image.src = vm.fileId() ? nts.uk.request.liveView(vm.fileId()) : null;
                                            vm.partData.originalFileId = vm.originalFileId;
                                        }
                                        vm.partData.ratio = (image.naturalHeight / image.naturalWidth) || 0;
                                        // Return data
                                        vm.$window.close(vm.partData);
                                    }
                                });
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        f.ScreenModel = ScreenModel;
                        var HorizontalAlign;
                        (function (HorizontalAlign) {
                            HorizontalAlign[HorizontalAlign["LEFT"] = 0] = "LEFT";
                            HorizontalAlign[HorizontalAlign["MIDDLE"] = 1] = "MIDDLE";
                            HorizontalAlign[HorizontalAlign["RIGHT"] = 2] = "RIGHT";
                        })(HorizontalAlign || (HorizontalAlign = {}));
                        var VerticalAlign;
                        (function (VerticalAlign) {
                            VerticalAlign[VerticalAlign["TOP"] = 0] = "TOP";
                            VerticalAlign[VerticalAlign["CENTER"] = 1] = "CENTER";
                            VerticalAlign[VerticalAlign["BOTTOM"] = 2] = "BOTTOM";
                        })(VerticalAlign || (VerticalAlign = {}));
                    })(f = ccg034.f || (ccg034.f = {}));
                })(ccg034 = view.ccg034 || (view.ccg034 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg034.f.vm.js.map