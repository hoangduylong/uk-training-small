interface JQuery {
    exposeVertically($target: JQuery);
    onkey(command: "down"|"up"|"press", keyCode: number, handler: (JQueryEventObject) => void): JQuery;
    dialogPositionControl(): JQuery;
    exposeOnTabPanel(): JQuery;
    ctState(name: "selected"|"required"|"name", method: "set"|"get", value?: any): any; 
}

module nts.uk.ui.jqueryExtentions {
    // This file left here for log purpose
    
    $.fn.exposeVertically = function ($target: JQuery) {
        let $scroll = $(this);
        let currentViewTopPosition = $scroll.scrollTop();
        let currentViewBottomPosition = currentViewTopPosition + $scroll.height();
        let targetTopPosition = $target.position().top + currentViewTopPosition;
        let targetBottomPosition = targetTopPosition + $target.outerHeight();
        
        if (currentViewTopPosition <= targetTopPosition && targetBottomPosition <= currentViewBottomPosition) {
            return;
        }
        
        if (targetTopPosition <= currentViewTopPosition) {
            let gap = currentViewTopPosition - targetTopPosition;
            $scroll.scrollTop(currentViewTopPosition - gap);
            return;
        }
        
        if (currentViewBottomPosition <= targetBottomPosition) {
            let gap = targetBottomPosition - currentViewBottomPosition;
            $scroll.scrollTop(currentViewTopPosition + gap);
            return;
        }
    }
    
    $.fn.onkey = function (command: "down"|"up"|"press", keyCode: number, handler: (JQueryEventObject) => void) {
        var $element = $(this);
        
        $element.on("key" + command, e => {
            if (e.keyCode === keyCode) {
                return handler(e);
            }
        });
        
        return $element;
    };
    
    $.fn.dialogPositionControl = function () {
        let $dialog = $(this);
        
        $dialog.dialog("option", "position", {
            my: "center",
            at: "center",
            of: document.body,
            collision: "none"
        });
        
        let $container = $dialog.closest(".ui-dialog");
        
        //let offsetContentsArea = window.parent.$("#header").height();
        let offsetContentsArea = 0;
        let offsetDialog = $container.offset();
        
        if (offsetDialog.top < offsetContentsArea) {
            offsetDialog.top = offsetContentsArea;
        }
        
        if (offsetDialog.left < 0) {
            offsetDialog.left = 0;
        }
        
        $container.offset(offsetDialog);
        
        $dialog.dialog({dragStop: (event, ui) => {
            
            let offsetDialog = $container.offset();
            
            if (offsetDialog.top < offsetContentsArea) {
                offsetDialog.top = offsetContentsArea;
                $container.offset(offsetDialog);
                return false;
            }
            $dialog.data("stopdrop", offsetDialog)
        }});
        
        return $dialog;
    };
    
    $.fn.exposeOnTabPanel = function () {
        
        let $target = $(this);
        
        let $tabPanel = $target.closest(".ui-tabs-panel");
        if ($tabPanel.length === 0) {
            return $target;
        }
        
        let tabId = $tabPanel.attr("id");
        let $tabsContainer = $tabPanel.closest(".ui-tabs");
        
        // 先に親から
        $tabsContainer.exposeOnTabPanel();
        
        $tabsContainer.trigger("change-tab", tabId);
        
        return $target;
    };
    
    $.fn.ctState = function (name: string, method: string, value: any): any {
        
        let $this = $(this);
        
        let dataName = {
            selected: "ctstate-selected",
            required: "ctstate-required",
            name: "ctstate-name"
        }[name];
        
        switch (method) {
            case "set":
                return $this.data(dataName, value);
            case "get":
                return $this.data(dataName);
        }
    }
    
    $.fn.tooltipWhenReadonly = function () {
        
        let $this = $(this);
        let border = 2;
        
        $this.mouseenter(e => {
            if (!$this.prop("readonly") || !$this.isOverflow()) {
                return;
            }
            
            $this.showTextContentAsTooltip(() => $this.val());
        });
    };
    
    $.fn.isOverflowContent = function (border) {
        let $this = $(this);
        return $this.prop("offsetWidth") - border < $this.prop("scrollWidth");
    };
    
    $.fn.isOverflow = function() {
        let $label = $(this); 
        if ($label[0].nodeName === "INPUT" 
            && (window.navigator.userAgent.indexOf("MSIE") > -1
            || !!window.navigator.userAgent.match(/trident/i)
            || window.navigator.userAgent.indexOf("Edge") > -1)) {
            let $div = $("<div/>").appendTo($(document.body));
            let style = $label[0].currentStyle || window.getComputedStyle($label[0]); //$label[0].style;
            if (style) {
                for (let p in style) {
                    $div[0].style[p] = style[p];
                }
            }
            
            $div.html($label.val());
            let width = $label.outerWidth();
            let scrollWidth = $div[0].scrollWidth;
            $div.remove();
            return width < scrollWidth;
        }
        
        return $label.outerWidth() < $label[0].scrollWidth;
    }
    
    $.fn.showTextContentAsTooltip = function (textContentGetter) {
        
        let $this = $(this);
        
        let $view = $('<div />').addClass('limited-label-view')
                    .text(textContentGetter())
                    .appendTo('body')
                    .position({
                        my: 'left top',
                        at: 'left bottom',
                        of: $this,
                        collision: 'flip'
                    });
        
        $this.bind('mouseleave.limitedlabel', () => {
            $this.unbind('mouseleave.limitedlabel');
            $view.remove();
        });
    };
}
