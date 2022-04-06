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
/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm048;
                (function (cmm048) {
                    var e;
                    (function (e) {
                        var ViewModel = /** @class */ (function (_super) {
                            __extends(ViewModel, _super);
                            function ViewModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.fileId = ko.observable('');
                                return _this;
                            }
                            ViewModel.prototype.created = function (params) {
                                var vm = this;
                                vm.fileId(params);
                            };
                            ViewModel.prototype.mounted = function () {
                                var vm = this;
                                //check HTTPs and Browser version
                                var isAbleCapBtn = vm.isHttps() && vm.isChromeOrEdge();
                                //add button take photo in ntsImageEditor
                                $("#upload").ready(function () {
                                    $(".comfirm-checkbox").remove();
                                    $(".edit-action-container").hide();
                                    if (isAbleCapBtn) {
                                        $("<button> ".concat(vm.$i18n('CMM048_107'), " </button>"))
                                            .attr('id', 'upload-webcam')
                                            .insertAfter(".upload-btn");
                                        //Handle no webcam
                                        $("#upload-webcam").ready(function () {
                                            navigator.getUserMedia = (navigator.getUserMedia
                                                || navigator.webkitGetUserMedia
                                                || navigator.mozGetUserMedia
                                                || navigator.msGetUserMedia);
                                            if (navigator.getUserMedia) {
                                                navigator.getUserMedia({ video: true }, function () { return $("#upload-webcam").click(function () { return vm.openDialogE2(); }); }, function () { return vm.handleBtnSnapWithoutCamera(); });
                                            }
                                            else {
                                                vm.handleBtnSnapWithoutCamera();
                                            }
                                        });
                                    }
                                });
                                if (vm.fileId()) {
                                    $(".edit-action-container").show();
                                    $("#upload").ntsImageEditor("selectByFileId", vm.fileId());
                                    vm.imagePreviewZoneHalfHeight(isAbleCapBtn);
                                }
                                else {
                                    vm.imagePreviewZoneFullHeight(isAbleCapBtn);
                                }
                                $("#upload").bind("imgloaded", function () {
                                    $(".edit-action-container").show();
                                });
                                try {
                                    $("#upload").ntsImageEditor("selectByFileId", {
                                        actionOnClose: function () {
                                            $(".checkbox-holder").hide();
                                            $('.upload-btn').focus();
                                        }
                                    });
                                }
                                catch (Error) {
                                    $('.upload-btn').focus();
                                }
                                //reset hight of image preview when image is loaded
                                $("#upload").bind("imgloaded", function (evt, query) {
                                    if (query) {
                                        vm.imagePreviewZoneHalfHeight(isAbleCapBtn);
                                    }
                                });
                            };
                            ViewModel.prototype.isHttps = function () {
                                if (window.location.protocol === "https:") {
                                    return true;
                                }
                                return false;
                            };
                            ViewModel.prototype.isChromeOrEdge = function () {
                                var browser = String(nts.uk.util.browser.version);
                                if (browser.search("Chrome") !== -1) {
                                    return true;
                                }
                                return false;
                            };
                            ViewModel.prototype.imagePreviewZoneFullHeight = function (bool) {
                                if (bool) {
                                    $('.image-preview-container').css('height', "325px");
                                    $('.image-upload-icon').css('height', "240px");
                                    $('.container-no-upload-background').css('height', "325px");
                                }
                                else {
                                    $('.image-preview-container').css('height', "340px");
                                    $('.image-upload-icon').css('height', "275px");
                                    $('.container-no-upload-background').css('height', "340px");
                                }
                            };
                            ViewModel.prototype.imagePreviewZoneHalfHeight = function (bool) {
                                if (bool) {
                                    $('.image-preview-container').css('height', "240px");
                                    $('.image-upload-icon').css('height', "240px");
                                    $('.container-no-upload-background').css('height', "240px");
                                }
                                else {
                                    $('.image-preview-container').css('height', "275px");
                                    $('.image-upload-icon').css('height', "275px");
                                    $('.container-no-upload-background').css('height', "275px");
                                }
                            };
                            ViewModel.prototype.handleBtnSnapWithoutCamera = function () {
                                var vm = this;
                                $("#upload-webcam").attr('disabled', 'true');
                                $("<span>".concat(vm.$i18n('CMM048_115'), "</span>"))
                                    .css("color", "red")
                                    .css("margin-left", "10px")
                                    .insertAfter("#upload-webcam");
                            };
                            ViewModel.prototype.openDialogE2 = function () {
                                var vm = this;
                                vm.$window.modal("/view/cmm/048/f/index.xhtml").then(function (uri) {
                                    if (uri) {
                                        $(".edit-action-container").show();
                                        $("#upload").ntsImageEditor("showByUrl", { url: uri });
                                    }
                                });
                            };
                            ViewModel.prototype.closeDialog = function () {
                                var vm = this;
                                var fileId = vm.fileId();
                                vm.$window.close(fileId);
                            };
                            ViewModel.prototype.upload = function () {
                                var vm = this;
                                if (nts.uk.ui.errors.hasError()) {
                                    return;
                                }
                                vm.$blockui('grayout');
                                var isImageLoaded = $("#upload").ntsImageEditor("getImgStatus");
                                if (isImageLoaded.imgOnView) {
                                    if ($("#upload").data("cropper") == undefined) {
                                        vm.closeDialog();
                                        return;
                                    }
                                    if ($("#upload").data("cropper").cropped) {
                                        $("#upload").ntsImageEditor("upload", { stereoType: "image" }).then(function (data) {
                                            vm.fileId(data.id);
                                            vm.closeDialog();
                                        }).fail(function (error) {
                                            vm.$blockui('clear');
                                            vm.$dialog.error(error);
                                        })
                                            .always(function () {
                                            vm.$blockui('clear');
                                        });
                                    }
                                    else {
                                        vm.closeDialog();
                                    }
                                }
                                else {
                                    vm.$dialog.error({ messageId: "Msg_617" });
                                    vm.$blockui('clear');
                                }
                            };
                            ViewModel = __decorate([
                                bean()
                            ], ViewModel);
                            return ViewModel;
                        }(ko.ViewModel));
                        e.ViewModel = ViewModel;
                    })(e = cmm048.e || (cmm048.e = {}));
                })(cmm048 = view.cmm048 || (view.cmm048 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm048.e.vm.js.map