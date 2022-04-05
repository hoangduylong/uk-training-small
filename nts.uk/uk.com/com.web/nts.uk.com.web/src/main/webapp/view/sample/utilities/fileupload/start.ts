__viewContext.ready(function() {

    $("#button").click(function() {
        $("#custom-upload").ntsFileUpload({ stereoType: "flowmenu" }).done(function(res) {
            nts.uk.ui.dialog.info("Upload successfully!");
        }).fail(function(err) {
            nts.uk.ui.dialog.alertError(err);
        });
    });

    class ScreenModel {
        controlName: KnockoutObservable<string>;
        required: KnockoutObservable<boolean>;
        stereoType: KnockoutObservable<string>;
        fileId: KnockoutObservable<string>;
        filename: KnockoutObservable<string>;
        zipEntry: KnockoutObservable<string>;
        fileInfo: KnockoutObservable<any>;
        textId: KnockoutObservable<string>;
        accept: KnockoutObservableArray<string>;
        asLink: KnockoutObservable<boolean>;
        enable: KnockoutObservable<boolean>;
        immediate: KnockoutObservable<boolean>;
        onchange: (filename) => void;
        onfilenameclick: (filename) => void;
        
        constructor() {
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
            this.onchange = (filename) => {
                console.log(filename);
            };
            this.onfilenameclick = (filename) => {
                alert(filename);
            };
        }
        
        validate() {
            $("#file-upload").ntsError("check");
        }

        upload() {
            var self = this;
            $("#file-upload").ntsFileUpload({ stereoType: "flowmenu" }).done(function(res) {
                self.fileId(res[0].id);
            }).fail(function(err) {
                nts.uk.ui.dialog.alertError(err);
            });
        }

        download() {
            if (!_.isEmpty(this.zipEntry())) 
                nts.uk.request.specials.donwloadFile(this.fileId() + "/" + this.zipEntry());
            else nts.uk.request.specials.donwloadFile(this.fileId());
        }
        
        isExist() {
           nts.uk.request.specials.isFileExist(this.fileId()).done(function(res) {
               $("#check-exist").text(res);
           });
        }
        
        preview() {
            var self = this;
            var liveviewcontainer = $("#file-review");
            liveviewcontainer.html("");
            let fileId = self.fileId();
            if (!_.isEmpty(this.zipEntry())) fileId = self.fileId() + "/" + this.zipEntry();
            liveviewcontainer.append($("<img/>").attr("src", nts.uk.request.liveView(fileId)));
            liveviewcontainer.append($("<iframe/>").css("width", "100%").attr("src", nts.uk.request.liveView(fileId)));
        }
        
        getInfo() {
            var self = this;
            nts.uk.request.ajax("/shr/infra/file/storage/infor/" + this.fileId()).done(function(res) {
                self.fileInfo(res);
            });
        }
        
        finished(fileInfo: any) {
            var self = this;
            self.fileId(fileInfo.id);
            console.log(fileInfo);
        }

    }

    this.bind(new ScreenModel());

});