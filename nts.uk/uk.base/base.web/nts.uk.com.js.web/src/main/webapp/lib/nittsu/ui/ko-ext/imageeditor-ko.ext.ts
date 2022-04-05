/// <reference path="../../reference.ts"/>

module nts.uk.ui.koExtentions {

    /**
     * Dialog binding handler
     */
    class NtsImageEditorBindingHandler implements KnockoutBindingHandler {

        /**
         * Init. 
         */
        init(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext) {
            let data = valueAccessor();
            let editable = nts.uk.util.isNullOrUndefined(data.editable) ? false : ko.unwrap(data.editable);
            let zoomble = nts.uk.util.isNullOrUndefined(data.zoomble) ? false : ko.unwrap(data.zoomble);
            let width = nts.uk.util.isNullOrUndefined(data.width) ? 600 : ko.unwrap(data.width);
            let freeResize = nts.uk.util.isNullOrUndefined(data.freeResize) ? true : ko.unwrap(data.freeResize);
            let resizeRatio = nts.uk.util.isNullOrUndefined(data.resizeRatio) ? 1 : ko.unwrap(data.resizeRatio);
            let height = nts.uk.util.isNullOrUndefined(data.height) ? 600 : ko.unwrap(data.height);
            let extension = nts.uk.util.isNullOrUndefined(data.accept) ? [] : ko.unwrap(data.accept);
            let msgIdForUnknownFile = nts.uk.util.isNullOrUndefined(data.msgIdForUnknownFile) ? 'Msg_77' : ko.unwrap(data.msgIdForUnknownFile);
            let croppable = false;
			let maxSize = nts.uk.util.isNullOrUndefined(data.maxSize) ? undefined : ko.unwrap(data.maxSize);
            
            let helper: ImageEditorHelper = new ImageEditorHelper(extension, msgIdForUnknownFile, undefined, maxSize);

            let $container = $("<div>", { 'class': 'image-editor-container' }),
                $element = $(element).append($container);

            let constructSite: ImageEditorConstructSite = new ImageEditorConstructSite($element, helper);


            let $uploadArea = $("<div>", { "class": "image-upload-container image-editor-area cf" });
            $container.append($uploadArea);

            if (editable === true) {
                croppable = true;
                let confirm = { checked: ko.observable(true) };
                $(element).data('checkbox', confirm);

                let $editContainer = $("<div>", { "class": "edit-action-container image-editor-area" });
                $container.append($editContainer);

                constructSite.buildCheckBoxArea(allBindingsAccessor, viewModel, bindingContext);
            } 

            constructSite.buildActionArea();
            constructSite.$imageInfomation.width(width - 110);

            constructSite.buildUploadAction();

            constructSite.buildImagePreviewArea();

            constructSite.buildFileChangeHandler();

            let customOption = {
                aspectRatio: freeResize ? 0 : resizeRatio,
                dragMode: croppable ? "crop" : "none",
                modal: false
            };
            constructSite.buildImageLoadedHandler(zoomble, customOption);

            constructSite.buildSrcChangeHandler();

            constructSite.buildImageDropEvent();
            
            $element.find(".image-holder").width(width - 12).height(height - 12);

            return { 'controlsDescendantBindings': true };
        }

        /**
         * Update
         */
        update(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
            let data = valueAccessor(),
                $element = $(element),
                confirm = $(element).data('checkbox'),
                $checkbox = $element.find('.comfirm-checkbox');

            if (!nts.uk.util.isNullOrEmpty($checkbox)) {
                (<any>ko).bindingHandlers["ntsCheckBox"].update($checkbox[0], function() {
                    return confirm;
                }, allBindingsAccessor, viewModel, bindingContext);
            }
        }
    }

    class ImageEditorConstructSite {
        $root: JQuery;
        $previewArea: JQuery;
        $imagePreview: JQuery;
        $imageInfomation: JQuery;
        $imageSizeLbl: JQuery;
        $imageNameLbl: JQuery;
        $inputFile: JQuery;
        $uploadBtn: JQuery;
        $checkbox: JQuery;

        helper: ImageEditorHelper;
        cropper: Cropper;
        constructor($root: JQuery, helper: ImageEditorHelper) {
            this.$root = $root;
            this.helper = helper;
        }

        buildCheckBoxArea(allBindingsAccessor, viewModel, bindingContext) {
            let self = this;
            let $checkboxHolder = $("<div>", { "class": "checkbox-holder image-editor-component" });
            let $editContainer = this.$root.find(".edit-action-container");
            $editContainer.append($checkboxHolder);

            this.$checkbox = $("<div>", { "class": "comfirm-checkbox style-button", text: toBeResource.selectViewArea });
            let $comment = $("<div>", { "class": "crop-description cf" });
            $checkboxHolder.append(this.$checkbox);
            $checkboxHolder.append($comment);

            let $cropAreaIcon = $("<div>", { "class": "crop-icon inline-container" });
            let $cropText = $("<div>", { "class": "crop-description-text inline-container" });
            let $mousePointerIcon = $("<div>", { "class": "mouse-icon inline-container" });
            let $mouseText = $("<div>", { "class": "mouse-description-text inline-container" });

            $("<label>", { "class": "info-label", "text": toBeResource.showInsideAreaToMain }).appendTo($cropText);
            $("<label>", { "class": "info-label", "text": toBeResource.dragAndDropToChangeArea }).appendTo($mouseText);

            $comment.append($cropAreaIcon).append($cropText).append($mousePointerIcon).append($mouseText);

            let checkboxId = nts.uk.util.randomId();

            ko.bindingHandlers["ntsCheckBox"].init(this.$checkbox[0], function() {
                return self.$root.data('checkbox');
            }, allBindingsAccessor, viewModel, bindingContext);
        }

        buildActionArea() {
            let self = this;
            self.$uploadBtn = $("<button>", { "class": "upload-btn" })
                .appendTo($("<div>", { "class": "image-editor-component inline-container" }));
            
            self.$imageInfomation = $("<div>", { "class": "image-editor-component inline-container" });
            self.$imageNameLbl = $("<label>", { "class": "image-name-lbl info-label limited-label" })
                .appendTo(self.$imageInfomation);
            self.$imageSizeLbl = $("<label>", { "class": "image-info-lbl info-label" })
                .appendTo(self.$imageInfomation);
            
            self.$inputFile = $("<input>", { "class": "fileinput", "type": "file", "accept": self.helper.toStringExtension() })
                .appendTo($("<div>", { "class": "image-editor-component inline-container nts-fileupload-container" }));
            
            let $uploadArea = self.$root.find(".image-upload-container");
            $uploadArea.append(self.$uploadBtn.parent());
            $uploadArea.append(self.$imageInfomation);
            $uploadArea.append(self.$inputFile.parent());
        }

        buildImagePreviewArea() {
            this.$previewArea = $("<div>", { "class": "image-preview-container image-editor-area" });
            this.$previewArea.appendTo(this.$root.find(".image-editor-container"));
            let imagePreviewId = nts.uk.util.randomId();

            let $imageContainer = $("<div>", { "class": "image-container container-no-upload-background" }).appendTo(this.$previewArea);
            let $imageHolder = $("<div>", { "class": "image-holder image-editor-component image-upload-icon" }).appendTo($imageContainer);
            this.$imagePreview = $("<img>", { "class": "image-preview", "id": imagePreviewId }).appendTo($imageHolder);
        }

        buildUploadAction() {
            let self = this;
            self.$uploadBtn.text(toBeResource.refer).click(function(evt) {
                self.$inputFile.click();
            });
        }

        buildImageDropEvent() {
            let self = this;
            self.$previewArea.on('drop dragdrop', function(evt, ui) {
                event.preventDefault();
                let files = evt.originalEvent["dataTransfer"].files;
                if (!nts.uk.util.isNullOrEmpty(files)) {
                    let firstImageFile = self.helper.getFirstFile(files);
                    if (self.validateFile(firstImageFile)) {
                        self.assignImageToView(firstImageFile);
                    } else {
                        self.changeStatus(ImageStatus.FAIL);
                    }
                }
            });

            this.$previewArea.on('dragenter', function(event) {
                event.preventDefault();
            });
            this.$previewArea.on('dragleave', function(evt, ui) {
            });
            this.$previewArea.on('dragover', function(event) {
                event.preventDefault();
            });
        }

        buildImageLoadedHandler(zoomble: boolean, customOption: any) {
            let self = this;
            //self.$root.data("img-status", self.buildImgStatus("not init", 0));
            self.changeStatus(ImageStatus.NOT_INIT);
            self.$imagePreview.on('load', function() {
                var image = new Image();
                image.src = self.$imagePreview.attr("src");
                image.onload = function() {
                    self.$imageSizeLbl.text("　(大きさ " + this.height + "x" + this.width + "　　サイズ " + self.helper.getFileSize(self.$root.data("size")) + ")");

                    if (!nts.uk.util.isNullOrUndefined(self.cropper)) {
                        self.cropper.destroy();
                    }
                    self.$root.data("original-img", image.src);
                    let option = {
                        viewMode: 1,
                        guides: false,
                        autoCrop: false,
                        highlight: false,
                        zoomable: zoomble,
                        crop: function(e) {
//                            console.log(e);
                        }, cropstart: function(e){
//                            e.preventDefault();
//                            console.log(e);
//                            return croppable;
                        }
                    };
                    jQuery.extend(option, customOption);
                    self.cropper = new Cropper(self.$imagePreview[0], option);
                    self.$root.data("cropper", self.cropper);
                    //self.$root.data("img-status", self.buildImgStatus("loaded", 4));
                    self.changeStatus(ImageStatus.LOADED);
                    let evtData = {
                        size: self.$root.data("size"), 
                        height: this.height, 
                        width: this.width, 
                        name: self.$root.data("file-name"), 
                        fileType: self.$root.data("file-type")
                    };
                    self.$root.trigger("imgloaded", evtData);
                };
            }).on("error", function(){
                //self.$root.data("img-status", self.buildImgStatus("load fail", 3));
                self.changeStatus(ImageStatus.FAIL);
            });
        }
        
        changeStatus(status: ImageStatus) {
            let self = this;
            let dataStatus = self.$root.data("img-status");
            let imgOnView = false;
            if (dataStatus) {
                imgOnView = dataStatus.imgOnView;    
            }  
            
            if (status == ImageStatus.LOADED) {
                imgOnView = true;    
            }
            self.$root.data("img-status", {
                imgOnView : imgOnView,
                status : status 
            });
        }
        
//        buildImgStatus(status: string, statusCode: number, imgOnView: boolean){
//            return {
//                imgOnView: imgOnView,
//                imgStatus: status,
//                imgStatusCode: statusCode    
//            };
//        }

        buildSrcChangeHandler() {
            let self = this;
            self.$root.bind("srcchanging", function(evt, query?: SrcChangeQuery) {
                //self.$root.data("img-status", self.buildImgStatus("img loading", 2, false));
                self.changeStatus(ImageStatus.lOADING);
                let target = self.helper.getUrl(query);

                const uri = self.helper.data.url;

                // support base64 url
                if (uri.match(/^(data:image\/)/)) {
                    const fileName = nts.uk.util.randomId();
                    const fileType = uri.substring(uri.indexOf('/') + 1, uri.indexOf(';base64'));

                    self.backupData(null, `${fileName}.${fileType}`, fileType, 3 * (uri.length / 4));

                    self.$imagePreview.attr("src", uri);
                    self.$imagePreview.closest(".image-holder").removeClass(".image-upload-icon");
                    self.$imagePreview.closest(".image-container").removeClass(".container-no-upload-background");

                    return;
                }
                
                var xhr = self.getXRequest();
                if(xhr === null){
                    self.destroyImg(query);
                    return;
                }
                xhr.open('GET', target);
                xhr.responseType = 'blob';

                xhr.onload = function(e) {
                    if (this.status == 200) {
                        if(xhr.response.type.indexOf("image") >= 0){
                            var reader = new FileReader();
                            reader.readAsDataURL(xhr.response);
                            reader.onload = function() {
                                self.helper.getFileNameFromUrl().done(function(fileName) {
                                    var fileType = xhr.response.type.split("/")[1],
                                        fileName = self.helper.data.isOutSiteUrl ? (fileName + "." + fileType) : fileName;
                                    self.backupData(null, fileName, fileType, xhr.response.size);
                                    self.$imagePreview.attr("src", reader.result);
                                    self.$imagePreview.closest(".image-holder").removeClass(".image-upload-icon");
                                    self.$imagePreview.closest(".image-container").removeClass(".container-no-upload-background");
                                });
                            };    
                        } else {
                            self.destroyImg(query);  
                        }
                    } else {
                        self.destroyImg(query);
                    }
                }; 
                xhr.send();
            });
        }
        
        destroyImg(query?: SrcChangeQuery){
            let self = this;
            nts.uk.ui.dialog.alert(toBeResource.invalidImageData).then(function(){
                //self.$root.data("img-status", self.buildImgStatus("load fail", 3));
                self.changeStatus(ImageStatus.FAIL);
                self.backupData(null, "", "", 0);
                self.$imagePreview.attr("src", "");
                self.$imagePreview.closest(".image-holder").addClass(".image-upload-icon");
                self.$imagePreview.closest(".image-container").addClass(".container-no-upload-background");
                self.$imageSizeLbl.text("");
                if(!nts.uk.util.isNullOrUndefined(self.cropper)){
                    self.cropper.destroy();     
                }   
                self.$root.data("cropper", self.cropper);
                query.actionOnClose();    
            });
        }
        
        getXRequest(){
            return new XMLHttpRequest();
        }

        buildFileChangeHandler() {
            let self = this;
            self.$inputFile.change(function() {
                //self.$root.data("img-status", self.buildImgStatus("img loading", 2));
                self.changeStatus(ImageStatus.lOADING);
                
                if (nts.uk.util.isNullOrEmpty(this.files)) {
                    self.changeStatus(ImageStatus.FAIL);
                    return;
                }
                
                let firstImageFile = self.helper.getFirstFile(this.files);
                
                if (!self.validateFile(firstImageFile)) {
                    // remove file
                    $(this).val('');    
                    self.changeStatus(ImageStatus.FAIL);
                    return;
                }
                    
                self.assignImageToView(firstImageFile);
                
            });
        }
        
        validateFile(firstImageFile: File): boolean {
            let self = this;

            if (nts.uk.util.isNullOrUndefined(firstImageFile)) {
                nts.uk.ui.dialog.alertError({ messageId: self.helper.getMsgIdForUnknownFile(), 
                                                messageParams: [self.helper.toStringExtension()] });
                return false;
            }

            let MAX_SIZE = self.helper.maxSize;

            // if MAX_SIZE == undefined => do not check size
            if (!MAX_SIZE) {
                return true;
            }

            if (firstImageFile.size > MAX_SIZE * 1048576) {
                nts.uk.ui.dialog.alertError({ messageId: 'Msg_70', messageParams: [self.helper.maxSize] });
                return false;
            }

            return true;
        }

        assignImageToView(file) {
            let self = this;
            if (FileReader && file) {
                var fr = new FileReader();
                fr.onload = function() {
                    self.$imagePreview.attr("src", fr.result);
                    self.backupData(file, file.name, file.type.split("/")[1], file.size);
                }
                fr.onerror = function(){
                    self.destroyImg({actionOnClose: $.noop});
                }
                fr.readAsDataURL(file);
            }
        }

        private backupData(file, name, format, size) {
            let self = this;
            self.$root.data("file", file);
            self.$root.data("file-name", name);
            self.$root.data("file-type", format);
            self.$root.data("size", size);
            self.$imageNameLbl.text(name);
        }
    }

    class ImageEditorHelper {
        IMAGE_EXTENSION: Array<string> = [".png",".PNG", ".jpg",".JPG",".JPEG", ".jpeg"]; 
        data: SrcChangeQuery;
        BYTE_SIZE: number = 1024;
        SIZE_UNITS: Array<string> = ["BYTE", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        msgIdForUnknownFile: string;
		maxSize : number;

        constructor(extensions?: Array<string>, msgIdForUnknownFile?: string, query?: SrcChangeQuery, maxSize: number) {
            let self = this;
            self.data = query;
            self.msgIdForUnknownFile = msgIdForUnknownFile;
            if (!nts.uk.util.isNullOrEmpty(extensions)) {
                self.IMAGE_EXTENSION = [];
                _.forEach(extensions, function(ex: string){
                    self.IMAGE_EXTENSION.push(ex.toLowerCase());
                    self.IMAGE_EXTENSION.push(ex.toUpperCase());
                });
            }
			self.maxSize = maxSize;
        }

        toStringExtension() {
            return this.IMAGE_EXTENSION.join(", ");
        }

        getMsgIdForUnknownFile() {
            return this.msgIdForUnknownFile;
        }

        getFirstFile(files: Array<File>) {
            let IMAGE_EXTENSION = this.IMAGE_EXTENSION; 
            return _.find(files, function(file: File) {
                return _.find(IMAGE_EXTENSION, function(ie: string) {
                    let isType = file.type === ie.replace(".", "");
                    let isType2 = file.name.substr(file.name.lastIndexOf(".")) === ie;
                    return  isType || isType2;
                }) !== undefined;
            });
        }

        getFileSize(originalSize: number) {
            let i = 0, result = originalSize;
            while (result > 5 * this.BYTE_SIZE) {
                result = result / this.BYTE_SIZE;
                i++; 
            }
            let idx = i < this.SIZE_UNITS.length ? i : this.SIZE_UNITS.length - 1;
            return ntsNumber.trunc(result) + this.SIZE_UNITS[idx];
        }

        getUrl(query?: SrcChangeQuery) {
            if (!nts.uk.util.isNullOrUndefined(query)) {
                this.data = query;
            }

            if (!this.isOutSiteUrl(this.data.url)) {
                return this.data.url;
            } else {
                return `http://cors-anywhere.herokuapp.com/${this.data.url}`; 
            }
        }

        getFileNameFromUrl() {
            let dfd = $.Deferred();
            let urlElements = this.data.url.split("/"),
                fileName = urlElements[urlElements.length - 1];
            if (this.data.isOutSiteUrl) {
                dfd.resolve(fileName);
            } else {
                nts.uk.request.ajax("/shr/infra/file/storage/infor/" + fileName).done(function(res) {
                    dfd.resolve(res.originalName);
                }).fail(function(error) {
                    dfd.reject(error);
                });
            }

            return dfd.promise();
        }

        private isOutSiteUrl(url: string): boolean {
            return url.indexOf(nts.uk.request.location.siteRoot.rawUrl) < 0;
        }
    }

    enum ImageStatus {
        NOT_INIT,
        lOADING,
        FAIL,
        LOADED,
    }

    interface SrcChangeQuery {
        url: string,
        isOutSiteUrl: boolean,
        actionOnClose: Function
    }

    ko.bindingHandlers['ntsImageEditor'] = new NtsImageEditorBindingHandler();
}
