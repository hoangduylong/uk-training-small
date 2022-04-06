__viewContext.ready(function () {
    $("#button").click(function () {
        $("#custom-upload").ntsFileUpload({ stereoType: "flowmenu" }).done(function (res) {
            nts.uk.ui.dialog.info("Upload successfully!");
        }).fail(function (err) {
            nts.uk.ui.dialog.alertError(err);
        });
    });
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            this.controlName = ko.observable("テスト");
            this.required = ko.observable(true);
            this.stereoType = ko.observable("samplefile");
            this.fileId = ko.observable("");
            this.filename = ko.observable("");
            this.zipEntry = ko.observable("");
            this.fileInfo = ko.observable(null);
            this.accept = ko.observableArray([".png", '.gif', '.jpg', '.jpeg', ".zip"]);
            this.textId = ko.observable("KMF004_106");
            this.asLink = ko.observable(true);
            this.enable = ko.observable(true);
            this.immediate = ko.observable(true);
            this.onchange = function (filename) {
                console.log(filename);
            };
            this.onfilenameclick = function (filename) {
                alert(filename);
            };
        }
        ScreenModel.prototype.validate = function () {
            $("#file-upload").ntsError("check");
        };
        ScreenModel.prototype.upload = function () {
            var self = this;
            $("#file-upload").ntsFileUpload({ stereoType: "flowmenu" }).done(function (res) {
                self.fileId(res[0].id);
            }).fail(function (err) {
                nts.uk.ui.dialog.alertError(err);
            });
        };
        ScreenModel.prototype.download = function () {
            if (!_.isEmpty(this.zipEntry()))
                nts.uk.request.specials.donwloadFile(this.fileId() + "/" + this.zipEntry());
            else
                nts.uk.request.specials.donwloadFile(this.fileId());
        };
        ScreenModel.prototype.isExist = function () {
            nts.uk.request.specials.isFileExist(this.fileId()).done(function (res) {
                $("#check-exist").text(res);
            });
        };
        ScreenModel.prototype.preview = function () {
            var self = this;
            var liveviewcontainer = $("#file-review");
            liveviewcontainer.html("");
            var fileId = self.fileId();
            if (!_.isEmpty(this.zipEntry()))
                fileId = self.fileId() + "/" + this.zipEntry();
            liveviewcontainer.append($("<img/>").attr("src", nts.uk.request.liveView(fileId)));
            liveviewcontainer.append($("<iframe/>").css("width", "100%").attr("src", nts.uk.request.liveView(fileId)));
        };
        ScreenModel.prototype.getInfo = function () {
            var self = this;
            nts.uk.request.ajax("/shr/infra/file/storage/infor/" + this.fileId()).done(function (res) {
                self.fileInfo(res);
            });
        };
        ScreenModel.prototype.finished = function (fileInfo) {
            var self = this;
            self.fileId(fileInfo.id);
            console.log(fileInfo);
        };
        return ScreenModel;
    }());
    this.bind(new ScreenModel());
});
//# sourceMappingURL=start.js.map