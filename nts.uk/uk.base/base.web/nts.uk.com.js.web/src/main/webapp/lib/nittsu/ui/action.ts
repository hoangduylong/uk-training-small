/// <reference path="../reference.ts"/>

module nts.uk.ui.action {

    module content {

        ui.documentReady.add(() => {
            $('#functions-area').addClass("disappear");
            $('#functions-area-bottom').addClass("disappear");
            $('#contents-area').addClass("disappear");
            $('#master-content').addClass("disappear");
        });

        ui.viewModelApplied.add(() => {
            $('#functions-area').removeClass("disappear");
            $('#functions-area-bottom').removeClass("disappear");
            $('#contents-area').removeClass("disappear");
            $('#master-content').removeClass("disappear");
            if($('#sidebar').length > 0){
                $('#sidebar').ntsSideBar("reactive");
            }
        });
        
         ui.viewModelApplied.add(function () {
            if(!nts.uk.util.isNullOrUndefined(__viewContext.program.operationSetting) 
                && (__viewContext.program.operationSetting.state == 1 || __viewContext.program.operationSetting.state == 2)){
                let operationInfo = $("<div>", { 'class': 'operation-info-container marquee', 'id': 'operation-info' }),
                    moving = $("<div>"), text = $("<label>"), text2 = $("<label>");
                moving.append(text).append(text2);
                operationInfo.append(moving).css({ right: ($("#manual").outerWidth() + 5) + "px" });
                text.text(__viewContext.program.operationSetting.message);
                text2.text(__viewContext.program.operationSetting.message);
                $("#pg-area").append(operationInfo);
                
                operationInfo.hover(
                    function() {
                        moving.addClass( "animate-stopping" );
                    }, function() {
                        moving.removeClass( "animate-stopping" );
                    }
                );
                
                let limit = Math.floor(0 - moving.width()), current = limit, id = setInterval(running, 50);
                moving.css({ "right": current + "px" });
                operationInfo.data("animate-id", id);
                function running() {
                    if(moving.hasClass("animate-stopping")){
                        return;
                    }
                    if (current >= 200) {
                        current = limit;
                    } else {
                        current++;
                    }
                    moving.css({ "right": current + "px" });
                }
            }
        });

    }
}
