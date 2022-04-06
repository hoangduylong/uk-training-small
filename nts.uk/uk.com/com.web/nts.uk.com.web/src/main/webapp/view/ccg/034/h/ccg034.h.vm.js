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
                    var h;
                    (function (h) {
                        var getText = nts.uk.resource.getText;
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.partData = null;
                                _this.originalFileId = null;
                                // File name
                                _this.fileName = ko.observable('');
                                // Upload file
                                _this.uploadedFileName = ko.observable('');
                                _this.fileSize = ko.observable(0);
                                _this.displayFileSize = ko.computed(function () {
                                    var vm = _this;
                                    return nts.uk.text.format(getText("CCG034_105"), vm.fileSize()) + "KB";
                                });
                                _this.fileId = ko.observable('');
                                // Common text attribute
                                _this.fontSize = ko.observable(11);
                                _this.isBold = ko.observable(true);
                                _this.horizontalAlign = ko.observable(HorizontalAlign.LEFT);
                                _this.verticalAlign = ko.observable(VerticalAlign.TOP);
                                _this.horizontalAlignList = [
                                    { code: HorizontalAlign.LEFT, name: getText('CCG034_110') },
                                    { code: HorizontalAlign.MIDDLE, name: getText('CCG034_111') },
                                    { code: HorizontalAlign.RIGHT, name: getText('CCG034_112') }
                                ];
                                _this.verticalAlignList = [
                                    { code: VerticalAlign.TOP, name: getText('CCG034_114') },
                                    { code: VerticalAlign.CENTER, name: getText('CCG034_115') },
                                    { code: VerticalAlign.BOTTOM, name: getText('CCG034_116') }
                                ];
                                _this.isNewMode = true;
                                return _this;
                            }
                            ScreenModel.prototype.created = function (params) {
                                var vm = this;
                                vm.partData = params;
                            };
                            ScreenModel.prototype.mounted = function () {
                                var vm = this;
                                // Binding part data
                                vm.horizontalAlign(vm.partData.alignHorizontal);
                                vm.verticalAlign(vm.partData.alignVertical);
                                vm.fileId(vm.partData.fileId);
                                vm.fileName(vm.partData.linkContent);
                                vm.fontSize(vm.partData.fontSize);
                                vm.isBold(vm.partData.isBold);
                                vm.uploadedFileName(vm.partData.fileName);
                                vm.fileSize(vm.partData.fileSize || 0);
                                vm.originalFileId = vm.fileId();
                                if (!nts.uk.text.isNullOrEmpty(vm.fileId())) {
                                    vm.isNewMode = false;
                                    vm.$ajax("/shr/infra/file/storage/isexist/" + vm.fileId()).then(function (isExist) {
                                        if (isExist) {
                                            vm.$ajax("/shr/infra/file/storage/infor/" + vm.fileId())
                                                .then(function (res) {
                                                $("#H2_2 .filenamelabel").text(res.originalName);
                                                vm.fileSize(Math.round(Number(res.originalSize) / 1024));
                                            });
                                        }
                                    });
                                }
                                $("#H1_2").focus();
                            };
                            ScreenModel.prototype.uploadFinished = function (data) {
                                var vm = this;
                                if (vm.fileId() !== vm.originalFileId) {
                                    nts.uk.request.file.remove(vm.fileId());
                                }
                                vm.fileId(data.id);
                                vm.fileSize(Math.round(Number(data.originalSize) / 1024));
                                if (!vm.fileName()) {
                                    vm.fileName(data.originalName);
                                }
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
                                vm.$validate("#H1_2", "#H2_2").then(function (validUpload) {
                                    if (validUpload || !nts.uk.text.isNullOrEmpty(vm.fileId())) {
                                        vm.$validate().then(function (valid) {
                                            if (valid) {
                                                // Update part data
                                                vm.partData.originalFileId = vm.originalFileId;
                                                vm.partData.alignHorizontal = vm.horizontalAlign();
                                                vm.partData.alignVertical = vm.verticalAlign();
                                                vm.partData.linkContent = vm.fileName().trim();
                                                vm.partData.fontSize = Number(vm.fontSize());
                                                vm.partData.isBold = vm.isBold();
                                                vm.partData.fileId = vm.fileId();
                                                vm.partData.fileName = vm.uploadedFileName();
                                                vm.partData.fileSize = vm.fileSize();
                                                vm.partData.fileLink = nts.uk.request.liveView(vm.fileId());
                                                // Return data
                                                vm.$window.close({ isSaving: true, partData: vm.partData });
                                            }
                                        });
                                    }
                                });
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        h.ScreenModel = ScreenModel;
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
                    })(h = ccg034.h || (ccg034.h = {}));
                })(ccg034 = view.ccg034 || (view.ccg034 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg034.h.vm.js.map