var cps002;
(function (cps002) {
    var i;
    (function (i) {
        var vm;
        (function (vm) {
            var setShared = nts.uk.ui.windows.setShared;
            var getShared = nts.uk.ui.windows.getShared;
            var close = nts.uk.ui.windows.close;
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                    this.imageId = ko.observable({});
                    this.isChange = ko.observable(false);
                    this.isInit = true;
                    this.isEdit = ko.observable(false);
                    var self = this;
                    self.imageId.subscribe(function (oldId) {
                        if (oldId) {
                            $(".checkbox-holder").show();
                        }
                        else {
                            $(".checkbox-holder").hide();
                        }
                    });
                    $("#test").bind("imgloaded", function (evt, query) {
                        $(".checkbox-holder").show();
                    });
                    $(".upload-btn").focus();
                }
                ViewModel.prototype.start = function () {
                    var self = this, dImageId = getShared("CPS002A"), dataShare = getShared("imageId");
                    if (dImageId != "" && dImageId != undefined) {
                        self.imageId().defaultImgId = dImageId;
                        //$(".ntsCheckBox-label input:checkbox").prop('checked', false);
                        //$(".ntsCheckBox-label input:checkbox").trigger("change");
                        $('input[type=checkbox]').prop('checked', false);
                        $(".comfirm-checkbox").hide();
                        self.getImage();
                        $("#test").bind("imgloaded", function (evt, query) {
                            $(".checkbox-holder").show();
                            $('input[type=checkbox]').prop('checked', true);
                            if (!self.isInit) {
                                self.isChange(true);
                                return;
                            }
                            self.isInit = false;
                        });
                    }
                    else
                        self.isChange(true);
                    $(".upload-btn").focus();
                };
                ViewModel.prototype.upload = function () {
                    var self = this;
                    nts.uk.ui.block.grayout();
                    var isImageLoaded = $("#test").ntsImageEditor("getImgStatus");
                    if ($("#test").data("cropper") == undefined) {
                        self.close();
                        return;
                    }
                    if ($("#test").data("cropper").cropped)
                        self.isChange(true);
                    if (isImageLoaded.imgOnView) {
                        if (self.isChange()) {
                            $("#test").ntsImageEditor("upload", { stereoType: "avatarfile" }).done(function (data) {
                                self.imageId().cropImgId = data.id;
                                $("#test").ntsImageEditor("uploadOriginal", { stereoType: "avatarfile" }).done(function (data2) {
                                    self.imageId().defaultImgId = data2.id;
                                    nts.uk.ui.block.clear();
                                    var dataShare = {
                                        imageCropedId: data.id,
                                        imageOriginalId: data2.id,
                                        fileName: data2.originalName,
                                    };
                                    setShared("imageId", dataShare);
                                    self.close();
                                });
                            });
                        }
                        else
                            self.close();
                    }
                    else
                        self.close();
                };
                ViewModel.prototype.getImage = function () {
                    var self = this, id = self.imageId().defaultImgId;
                    $("#test").ntsImageEditor("selectByFileId", id);
                };
                ViewModel.prototype.close = function () {
                    var self = this;
                    nts.uk.ui.block.clear();
                    close();
                };
                return ViewModel;
            }());
            vm.ViewModel = ViewModel;
        })(vm = i.vm || (i.vm = {}));
    })(i = cps002.i || (cps002.i = {}));
})(cps002 || (cps002 = {}));
//# sourceMappingURL=cps002.i.vm.js.map