/// <reference path="../../reference.ts"/>

interface JQuery {
    ntsDatepicker(action: string, param?: any): any;
}

module nts.uk.ui.jqueryExtentions {

    module ntsDatepicker {
        
        let CONTAINER_CLASSES = ["arrow-bottom", "arrow-top", "arrow-right", "arrow-left"];
        let PICKER_CLASSES = ["datepicker-top-left", "datepicker-top-right", "datepicker-bottom-left", "datepicker-bottom-right"];
        
        $.fn.ntsDatepicker = function(action: string, index?: number): any {
            var $container = $(this);
            if (action === "bindFlip") {
                return bindFlip($container);
            }
            return $container;
        }

        function bindFlip($input: JQuery): JQuery{
//            let container = $input.parent();
            
            $input.on('show.datepicker', function (evt) {
                let picker = $(this); 
                picker.data("showed", true);
                setTimeout(function (){
                    picker.trigger("flippickercontainer");
                }, 10);
            });
            $input.on('hide.datepicker', function (evt) {
                let picker = $(this); 
                picker.data("showed", false); 
                CONTAINER_CLASSES.forEach(cls => picker.parent().removeClass(cls));
//                let currentShowContainer = $(".datepicker-container:not(.datepicker-hide)");
//                $("body").append(currentShowContainer);
            });
            $( window ).resize(function() {
                let picker = $(this); 
                if(picker.data("showed")){
                    picker.datepicker('hide');
                    setTimeout(function (){
                        picker.datepicker('show');
                    }, 10);   
                }
            });
            
            $input.bind("flippickercontainer", function(evt, data){
                let picker = $(this); 
                let container = picker.parent();
                let currentShowContainer = $(".datepicker-container:not(.datepicker-hide)");
                let datepickerID = picker.attr("id");
//                let container = $input.parent();
//                container.append(currentShowContainer);
                let ePos = container.offset();
                if(ePos.top < 0 && ePos.left < 0){
                    return;
                }
                
                CONTAINER_CLASSES.forEach(cls => container.removeClass(cls));
                PICKER_CLASSES.forEach(cls => currentShowContainer.removeClass(cls)); 
                
                let containerHeight = container.outerHeight(true); 
                let containerWidth = container.outerWidth(true);
                let showContainerHeight = currentShowContainer.outerHeight(true);
                let showContainerWidth = currentShowContainer.outerWidth(true);
                let documentHeight = document.body.clientHeight;
                let documentWidth = document.body.clientWidth;
                let headerHeight = $("#functions-area").outerHeight(true) + $("#header").outerHeight(true);
                let bottomHeight = $("#functions-area-bottom").outerHeight(true);
                let spaceBottom = documentHeight - ePos.top - containerHeight;
                let spaceTop = ePos.top;// - headerHeight;
                let spaceRight = documentWidth - ePos.left - containerWidth;
                let spaceLeft = ePos.left;
                // case 1: show below
                if(showContainerHeight + 10 <= spaceBottom){ 
                    //currentShowContainer.css({top: containerHeight + 5, left: 0});
                    container.addClass("arrow-bottom");
                    //container.addClass("caret-bottom");
                    currentShowContainer.position({
                        my: "left bottom+" + (showContainerHeight + 10),
                        at: "left bottom",
                        'of': "#" + datepickerID
                    });
                    return;
                }
                //case 2: show above
                if(showContainerHeight + 10 <= spaceTop){
                    //currentShowContainer.css({top: 0 - showContainerHeight - 5, left: 0});
                    container.addClass("arrow-top");
                    currentShowContainer.position({
                        my: "left top-" +  (showContainerHeight + 10),
                        at: "left top",
                        'of': "#" + datepickerID
                    });
                    return;
                }
                // case 3: show right
                let diaTop = ePos.top <= 0 ? 0 : ePos.top - showContainerHeight + containerHeight + headerHeight;
                if(ePos.top <= diaTop){
                    diaTop = ePos.top;
                }
                if(showContainerWidth + 10 <= spaceRight){ 
//                    currentShowContainer.css({top: 0, left: containerWidth + 5 + 2});
                    let diaRight = ePos.left + containerWidth + 10;
                    container.addClass("arrow-right");
                    currentShowContainer.css({top: diaTop, left: diaRight});
                    
                    return;
                }
                //case 4: show left
                if(showContainerWidth + 10 <= spaceLeft){
                    let diaLeft = ePos.left - 10 - showContainerWidth;
//                    currentShowContainer.css({top: 0, left: 0 - showContainerWidth - 5 - 2 });
                    container.addClass("arrow-left");
                    currentShowContainer.css({top: diaTop, left: diaLeft});
                    return;
                }
                
                container.addClass("arrow-bottom");
                currentShowContainer.position({
                    my: "left bottom+" + (showContainerHeight + 10),
                    at: "left bottom",
                    'of': "#" + datepickerID
                });
            });
            return $input;
        }

    }
}
