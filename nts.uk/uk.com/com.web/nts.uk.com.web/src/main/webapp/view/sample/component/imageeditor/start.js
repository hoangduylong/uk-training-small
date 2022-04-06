__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            this.url = ko.observable("");
        }
        ScreenModel.prototype.upload = function () {
            var self = this;
            nts.uk.ui.block.grayout();
            $("#test").ntsImageEditor("upload", { stereoType: "samplefile" }).done(function (data) {
                self.uploaded = data;
                nts.uk.ui.block.clear();
            }).fail(function (error) {
                alert(error.message);
                nts.uk.ui.block.clear();
            });
        };
        ScreenModel.prototype.uploadOriginal = function () {
            var self = this;
            nts.uk.ui.block.grayout();
            $("#test").ntsImageEditor("uploadOriginal", { stereoType: "samplefile" }).done(function (data) {
                self.originalUpload = data;
                nts.uk.ui.block.clear();
            }).fail(function (error) {
                alert(error.message);
                nts.uk.ui.block.clear();
            });
        };
        ScreenModel.prototype.getImage = function () {
            if (!nts.uk.util.isNullOrUndefined(this.uploaded)) {
                $("#test").ntsImageEditor("selectByFileId", this.uploaded.id);
            }
        };
        ScreenModel.prototype.getOriginalImage = function () {
            if (!nts.uk.util.isNullOrUndefined(this.uploaded)) {
                $("#test").ntsImageEditor("selectByFileId", this.originalUpload.id);
            }
        };
        ScreenModel.prototype.show = function () {
            if (!nts.uk.util.isNullOrEmpty(this.url().trim())) {
                $("#test").ntsImageEditor("showByUrl", this.url());
            }
        };
        ScreenModel.prototype.clear = function () {
            $("#test").ntsImageEditor("clear");
        };
        ScreenModel.prototype.dialog = function () {
            nts.uk.ui.windows.sub.modal("/view/sample/component/imageeditor/imageeditor.xhtml");
        };
        return ScreenModel;
    }());
    this.bind(new ScreenModel());
});
//# sourceMappingURL=start.js.map