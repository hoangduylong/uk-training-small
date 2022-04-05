/// <reference path="../../reference.ts"/>

module nts.uk.ui.jqueryExtentions {
    import isNotNull = nts.uk.util.isNullOrUndefined;
    module ntsImageEditor {

        $.fn.ntsImageEditor = function(method: string, option?: any) {
            let $element = $(this);
            switch(method){
                case "upload": {
                    return uploadImage($element, option);     
                } 
                case "uploadOriginal": {
                    return uploadImageOriginal($element, option);     
                } 
                case "selectByFileId": {
                    return downloadImage($element, option);     
                } 
                case "showByUrl": {
                    return viewByUrl($element, option);     
                } 
                case "clear": {
                    return clear($element);     
                } 
                case "getImgStatus": {
                    return getImgStatus($element);     
                } 
                default: 
                    return; 
            }            
        }
         
        function getImgStatus($element: JQuery){
            return $element.data("img-status");
        }

        function uploadImage($element: JQuery, option){
            let dataFile = $element.find(".image-preview").attr("src");
            return upload($element, option, dataFile, isNotNull($element.data('checkbox')) ? false : $element.data('checkbox').checked());   
        }
        
        function uploadImageOriginal($element: JQuery, option){
            return upload($element, option, $element.data("original-img"), false);   
        }
        
        function upload($element: JQuery, option, fileData, isCrop){
            let dfd = $.Deferred();
            
            if (!isNotNull(fileData)) {
                
                let cropper = $element.data("cropper");
                let cropperData = cropper.getData(true);
                
                var formData = {
                        "fileName": $element.data("file-name"), 
                        "stereoType": isNotNull(option) ? "image" : option.stereoType,
                        "file": fileData,
                        "format": $element.data("file-type"),
                        "x": cropperData.x,
                        "y": cropperData.y, 
                        "width": cropperData.width,
                        "height": cropperData.height,
                        "crop": isCrop 
                     };
                
                nts.uk.request.ajax("com", "image/editor/cropimage", formData).done(function(data) {
                    if (nts.uk.util.exception.isBusinessError(data)) {
                        dfd.reject(data);
                    } else {
                        dfd.resolve(data);
                    }
                }).fail(function() {
                    dfd.reject({ message: "Please check your network", messageId: "1" });
                });
            }
            else {
                dfd.reject({ message: "Please select file", messageId: "0" });
            }
            return dfd.promise();    
        }
        
        function downloadImage($element: JQuery, option){
            let fileId = option;
            let actionOnClose = $.noop;
            if(typeof option === 'object'){
                fileId = option.fileId;
                if(!nts.uk.util.isNullOrUndefined(option.actionOnClose)){
                    actionOnClose = option.actionOnClose;    
                }
            }
            $element.trigger("srcchanging", {url: nts.uk.request.liveView(fileId), isOutSiteUrl: false, actionOnClose: actionOnClose});
        }
        
        function viewByUrl($element: JQuery, option){
            let fileId = option;
            let actionOnClose = $.noop;
            if(typeof option === 'object'){
                fileId = nts.uk.util.isNullOrEmpty(option.url) ? option.fileId : option.url;
                if(!nts.uk.util.isNullOrUndefined(option.actionOnClose)){
                    actionOnClose = option.actionOnClose;    
                }
            }
            $element.trigger("srcchanging", {url: fileId, isOutSiteUrl: true, actionOnClose: actionOnClose});
        }
            
        function clear($element: JQuery){
            let cropper = $element.data("cropper");
            if (!isNotNull(cropper)) {
                cropper.clear();    
            }
        }   
    }
}
