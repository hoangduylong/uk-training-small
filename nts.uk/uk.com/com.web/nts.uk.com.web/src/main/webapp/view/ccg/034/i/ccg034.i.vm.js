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
                    var i;
                    (function (i) {
                        var getText = nts.uk.resource.getText;
                        var MAXIMUM_IMAGE_COUNT = 4;
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.partData = null;
                                _this.originalFileId = null;
                                //Choose file
                                _this.imageOption = [
                                    { code: 0, name: getText('CCG034_121') },
                                    { code: 1, name: getText('CCG034_123') }
                                ];
                                _this.imageType = ko.observable(0);
                                _this.imageSrc = ko.observable(null);
                                _this.imageList = [];
                                // Upload file
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
                                return _this;
                            }
                            ScreenModel.prototype.created = function (params) {
                                var vm = this;
                                vm.partData = params;
                            };
                            ScreenModel.prototype.mounted = function () {
                                var vm = this;
                                vm.imageType.subscribe(function (value) {
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
                                });
                                // Binding part data
                                vm.fileId(vm.partData.fileId);
                                vm.imageSrc(vm.partData.fileName);
                                vm.uploadedFileName(vm.partData.uploadedFileName);
                                vm.fileId(vm.partData.fileId);
                                vm.fileSize(vm.partData.uploadedFileSize ? vm.partData.uploadedFileSize : 0);
                                vm.imageType(vm.partData.isFixed);
                                vm.originalFileId = vm.fileId();
                                vm.createPopUp();
                                $("#I2").focus();
                            };
                            ScreenModel.prototype.uploadFinished = function (data) {
                                var vm = this;
                                if (vm.fileId() !== vm.originalFileId) {
                                    nts.uk.request.file.remove(vm.fileId());
                                }
                                vm.fileId(data.id);
                                vm.fileSize(Math.round(Number(data.originalSize) / 1024));
                                vm.updatePreview();
                            };
                            ScreenModel.prototype.updatePreview = function () {
                                var vm = this;
                                var container = $("#I2_2_2");
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
                                        toAppend += "<img id=\"I2_2_1_".concat(imageCol, "\" src=\"").concat(vm.imageList[imageCol].name, "\" class=\"pic-choose\" data-bind=\"click: chooseImage\" />");
                                    }
                                    var template_1 = "<div>".concat(toAppend, "</div>");
                                    $("#I2_4").append(template_1);
                                    // Rebind Knockout for the newly added div
                                    ko.applyBindings(vm, $("#I2_4 > div:last-child")[0]);
                                }
                                $("#I2_4").ntsPopup({
                                    trigger: "#I2_1_1",
                                    position: {
                                        my: "left top",
                                        at: "left bottom",
                                        of: "#I2_1_1"
                                    },
                                    showOnStart: false,
                                    dismissible: true
                                });
                            };
                            ScreenModel.prototype.chooseImage = function (data, event) {
                                var vm = this;
                                var itemId = event.currentTarget.id;
                                var item = vm.imageList[Number(itemId.substr(7))];
                                vm.imageSrc(item.name);
                                $("#I2_4").ntsPopup("hide");
                            };
                            /**
                            * Close dialog
                            */
                            ScreenModel.prototype.closeDialog = function () {
                                var vm = this;
                                if (vm.fileId() !== vm.partData.originalFileId) {
                                    vm.$window.close({ isSaving: false, fileId: vm.fileId() });
                                }
                                else {
                                    vm.$window.close({ isSaving: false });
                                }
                            };
                            /**
                             * Update part data and close dialog
                             */
                            ScreenModel.prototype.updatePartDataAndCloseDialog = function () {
                                var vm = this;
                                vm.$validate().then(function (valid) {
                                    if (valid) {
                                        // Update part data
                                        var image = new Image();
                                        // ImageType === 0
                                        vm.partData.fileName = vm.imageSrc();
                                        image.src = vm.imageSrc();
                                        // ImageType === 1
                                        vm.partData.fileId = vm.fileId();
                                        vm.partData.uploadedFileName = vm.uploadedFileName();
                                        vm.partData.uploadedFileSize = vm.fileSize();
                                        image.src = vm.fileId() ? nts.uk.request.liveView(vm.fileId()) : null;
                                        vm.partData.originalFileId = vm.originalFileId;
                                        // Common
                                        vm.partData.ratio = image.naturalHeight / image.naturalWidth;
                                        vm.partData.isFixed = vm.imageType();
                                        // Return data
                                        vm.$window.close({ isSaving: true, partData: vm.partData });
                                    }
                                });
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        i.ScreenModel = ScreenModel;
                    })(i = ccg034.i || (ccg034.i = {}));
                })(ccg034 = view.ccg034 || (view.ccg034 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg034.i.vm.js.map