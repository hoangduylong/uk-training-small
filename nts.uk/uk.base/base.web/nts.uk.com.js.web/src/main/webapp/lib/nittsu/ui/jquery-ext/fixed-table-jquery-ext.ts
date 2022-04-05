/// <reference path="../../reference.ts"/>

interface JQuery {
    ntsFixedTable(action?: string, param?: any): any;
}

module nts.uk.ui.jqueryExtentions {

    module ntsFixedTable {

        $.fn.ntsFixedTable = ntsFixedTable;

        function ntsFixedTable(action?: string, options?: any): any {
            var $controls = $(this);
            if (typeof arguments[0] !== 'string') {
                return ntsFixedTable.apply($controls, _.concat("init", action));
            }

            if (action === "init") {
                return init($controls, options);
            }
            else {
                return $controls;
            };
        }

        function init(controls: JQuery, options?: any): JQuery {
            controls.each(function() {
                let $originTable = $(this);
                $originTable.addClass("fixed-table");
                let $colgroup = $originTable.find("colgroup");
                let $thead = $originTable.find("thead");
                let setting = $.extend({ height: "auto" }, options);
                let viewWidth = setting.width;
                let width = 0;
                $colgroup.find("col").each(function() {
                    width += Number($(this).attr("width").replace(/px/gi, ''));
                });
                width++;
                
                if (options.autoResize) {
                    viewWidth = Math.min(window.innerWidth - 60, width);
                } else if(nts.uk.util.isNullOrUndefined(viewWidth)){
                    viewWidth = width;
                }
                
                let $container = $("<div class='nts-fixed-table cf'/>");
                $originTable.after($container);
                
                
                let $headerContainer = $("<div class='nts-fixed-header-container ui-iggrid nts-fixed-header'/>").css({"max-width": viewWidth});
                let $headerWrapper = $("<div class='nts-fixed-header-wrapper'/>").width(width);
                let $headerTable = $("<table class='fixed-table'></table>");
                
                
                $headerTable.append($colgroup.clone()).append($thead);
                $headerTable.appendTo($headerWrapper);
                $headerContainer.append($headerWrapper);
                
                let $header = $("<div>");
                $headerContainer.appendTo($header);
                $header.appendTo($container);
                $header.height($headerContainer.height());
                let $headerScroll = $("<div>", {"class": "scroll-header nts-fixed-header", width: 16, height: $headerWrapper.outerHeight()}); 
                $headerScroll.appendTo($header);
                
                $originTable.addClass("nts-fixed-body-table");
                let $bodyContainer = $("<div class='nts-fixed-body-container ui-iggrid'/>"); 
                let $bodyWrapper = $("<div class='nts-fixed-body-wrapper'/>");
                let bodyHeight: any = "auto";
                if (options.autoResize) {
                    $bodyContainer.css("max-width", viewWidth);
                    bodyHeight = window.innerHeight - $headerTable.find("thead").outerHeight() - 240;
                
                    $(window).on("resize", evt => {
                        let tableWidth = Math.max(0, Math.min(width, window.innerWidth - 60));
                        $headerContainer.css("max-width", tableWidth);
                        $bodyContainer.css("max-width", tableWidth);
                        bodyHeight = window.innerHeight - $headerTable.find("thead").outerHeight() - 240;
                        $bodyWrapper.height(Math.max(0, bodyHeight));
                    });
                } else if (setting.height !== "auto") {
                    $bodyContainer.css("max-width", viewWidth);
                    bodyHeight = Number(setting.height.toString().replace(/px/mi)) - $headerTable.find("thead").outerHeight();
                }
                
                let resizeEvent = function () {
                    $header.height($headerContainer.height());
                    if(bodyHeight < $originTable.height()){
//                        if(/Edge/.test(navigator.userAgent)){
//                            $headerScroll.width(11);
//                            $bodyContainer.css("padding-right", "12px");
//                        }else {
                            $headerScroll.width(16);
                            $bodyContainer.css("padding-right", "17px");
//                        }    
                        $headerScroll.css({ "border-right": "1px #CCC solid", "border-top": "1px #CCC solid", "border-bottom": "1px #CCC solid" });    
                    } else {
                        $headerScroll.width(0);
                        $headerScroll.css({ "border-right": "0px", "border-top": "0px", "border-bottom": "0px" });   
                        $bodyContainer.css("padding-right", "0px");
                    }
                
                    setTimeout(resizeEvent, 20);
                }
                
                
                
                $bodyContainer.scroll(function(evt, ui) {
                    $headerContainer.scrollLeft($bodyContainer.scrollLeft());
                    
                });
                $bodyWrapper.width(width).height(bodyHeight);
                $bodyWrapper.append($originTable);
                $bodyContainer.append($bodyWrapper);
                $container.append($bodyContainer);
                if (setting.height !== "auto" && bodyHeight < $originTable.height()){
                    if(/Edge/.test(navigator.userAgent)){
                        $bodyContainer.css("padding-right", "12px");
                    }else {
                        $bodyContainer.css("padding-right", "17px");
                    }   
                }
                resizeEvent();
            });
            return controls;
        }
    }
}