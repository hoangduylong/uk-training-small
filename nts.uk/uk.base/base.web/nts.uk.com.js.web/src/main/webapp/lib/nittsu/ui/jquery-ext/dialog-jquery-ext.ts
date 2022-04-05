/// <reference path="../../reference.ts"/>

module nts.uk.ui.jqueryExtentions {
    export module ntsDialogEx {
        $.fn.ntsDialogEx = function(action: string, winContainer: any): any {

            var $dialog = $(this);

            switch (action) {
                case 'centerUp':
                    centerUp($dialog, winContainer);
                default:
                    break;
            }
        };

        function centerUp($dialog: JQuery, winContainer: ScreenWindow) {
//            let currentInfo = winContainer;
            let top=0, left=0;
            let dialog = $dialog.closest("div[role='dialog']");
            dialog.addClass("disappear");
            if(!winContainer.isRoot){
                var offset = winContainer.$dialog.closest("div[role='dialog']").offset(); 
                console.log(dialog.offset());
                top += offset.top;
                left += offset.left;
            }
            
            setTimeout(function(){
                let isFrame = nts.uk.util.isInFrame();
                let dialogM = winContainer.isRoot ? isFrame ? window.parent.window.parent.$("body") : $("body") 
                                            : winContainer.$dialog.closest("div[role='dialog']");
                let topDiff = (dialogM.innerHeight() - dialog.innerHeight()) / 2;
                let leftDiff = (dialogM.innerWidth() - dialog.innerWidth()) / 2;
                if(topDiff > 0){
                    top += topDiff;
                }
                if(leftDiff > 0){
                    left += leftDiff;
                }
                dialog.css({top: top, left: left});
                dialog.removeClass("disappear");
            }, 33);
        }
    }
}
