module cps002.i.vm {
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import close = nts.uk.ui.windows.close;
    import modal = nts.uk.ui.windows.sub.modal;
    import alert = nts.uk.ui.dialog.alert;
    import alertError = nts.uk.ui.dialog.alertError;
    import getText = nts.uk.resource.getText;


    export class ViewModel {
        imageId: KnockoutObservable<IImageId> = ko.observable(<IImageId>{});
        isChange: KnockoutObservable<boolean> = ko.observable(false);
        isInit = true;
        isEdit: KnockoutObservable<boolean> = ko.observable(false);
        constructor() {
            let self = this;



            self.imageId.subscribe((oldId) => {
                if (oldId) {
                    $(".checkbox-holder").show();
                } else {
                    $(".checkbox-holder").hide();
                }
            });

            $("#test").bind("imgloaded", function(evt, query?: SrcChangeQuery) {
                $(".checkbox-holder").show();
            });
            $(".upload-btn").focus();

        }
        start() {
            let self = this,
                dImageId = getShared("CPS002A"),
                dataShare = getShared("imageId");
            if (dImageId != "" && dImageId != undefined) {
                self.imageId().defaultImgId = dImageId;
                //$(".ntsCheckBox-label input:checkbox").prop('checked', false);
                //$(".ntsCheckBox-label input:checkbox").trigger("change");
                $('input[type=checkbox]').prop('checked', false);
                $(".comfirm-checkbox").hide();
                self.getImage();
                $("#test").bind("imgloaded", function(evt, query?: SrcChangeQuery) {
                    $(".checkbox-holder").show();
                    $('input[type=checkbox]').prop('checked', true);
                    if (!self.isInit) {
                        self.isChange(true);
                        return;
                    }
                    self.isInit = false;
                });
            } else self.isChange(true);
            $(".upload-btn").focus();
        }
        upload() {
            let self = this;
            nts.uk.ui.block.grayout();
            let isImageLoaded = $("#test").ntsImageEditor("getImgStatus");
            if ($("#test").data("cropper") == undefined) {
                self.close();
                return;
            }
            if ($("#test").data("cropper").cropped)
                self.isChange(true);
            if (isImageLoaded.imgOnView) {
                if (self.isChange()) {
                    $("#test").ntsImageEditor("upload", { stereoType: "avatarfile" }).done(function(data) {
                        self.imageId().cropImgId = data.id;
                        $("#test").ntsImageEditor("uploadOriginal", { stereoType: "avatarfile" }).done(function(data2) {
                            self.imageId().defaultImgId = data2.id;
                            nts.uk.ui.block.clear();
                            let dataShare = {
                               imageCropedId : data.id,
                               imageOriginalId : data2.id,
                               fileName : data2.originalName,
                            }
                            setShared("imageId", dataShare);
                            self.close();
                        });


                    });
                } else self.close();
            } else self.close();
        }
        getImage() {
            let self = this,
                id = self.imageId().defaultImgId;
            $("#test").ntsImageEditor("selectByFileId", id);
        }
        close() {
            let self = this;
            nts.uk.ui.block.clear();
            close();
        }

    }

    export interface IImageId {
        defaultImgId: string;
        cropImgId: string;
    }
}