/// <reference path="../../reference.ts"/>

module nts.uk.ui.koExtentions {
    
    class NtsLegentButtonBindingHandler implements KnockoutBindingHandler {
        
        /**
         * Init. 
         */
        init(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
            let data = valueAccessor();
            let $container = $(element);
            
            $container.text("■ " + toBeResource.legendExample);
            
            $container.click(() => {
                showLegendPanel($container, data);
            });
        }
        
        /**
         * Update
         */
        update(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
        }
    }
    
    interface LegendOptions {
        items: LegendItem[];
        template: string;
    }
    
    interface LegendItem {
        cssClass: LegendCssClass;
        colorCode: string;
        labelText: string;
        
    }
    
    interface LegendCssClass {
        className: string;
        colorPropertyName: string;
    }
    
    function getColorCodeFromItem(legendItem: LegendItem) {
        return util.optional.of(legendItem.cssClass)
            .map(cc => getColorCodeFromCssClass(cc))
            .orElse(legendItem.colorCode);
    }

    function getColorCodeFromCssClass(legendCssClass: LegendCssClass) {
        let $temp = $('<span/>').addClass(legendCssClass.className)
            .hide()
            .appendTo('body');
        let colorCode = $temp.css(legendCssClass.colorPropertyName);
        $temp.remove();
        return colorCode;
    }
    
    function showLegendPanel($legendButton: any, options: LegendOptions) {
        
        let legendSize = 18;
        let hasTemplate = !nts.uk.util.isNullOrEmpty(options.template);
        let $panel = $('<div/>').addClass('nts-legendbutton-panel');
        
        options.items.forEach(item => {
            if(hasTemplate){
                $('<div/>').addClass('legend-item')
                    .append(extractTemplate(options.template, item))
                    .appendTo($panel);           
            } else {
                $('<div/>').addClass('legend-item')
                .append($('<div/>')
                    .addClass('legend-item-symbol')
                    .css({
                        'background-color': getColorCodeFromItem(item),
                        width: legendSize + 'px',
                        height: legendSize + 'px'
                    })
                    .text('　'))
                .append($('<div/>')
                    .addClass('legend-item-label')
                    .text(item.labelText))
                .appendTo($panel);    
            }
        });
        
        $panel.appendTo('body').position({
            my: 'left top',
            at: 'left bottom',
            of: $legendButton
        });
        
        _.defer(() => {
            $(window).bind('mousedown.legendpanel', () => {
                $panel.remove();
                $(window).unbind('mousedown.legendpanel');
            });
        });
    }
    
    function extractTemplate(template: string, item: LegendItem): string {
        let extracted = _.clone(template);
        let changeTextIndex = extracted.indexOf("#{");
        while(changeTextIndex > -1){
            let closeComa = extracted.indexOf("}", changeTextIndex);    
            let textToChange = extracted.substring(changeTextIndex, closeComa + 1); 
            extracted = extracted.replace(new RegExp(textToChange, 'g'), item[textToChange.substring(2, textToChange.length - 1)]);   
            changeTextIndex = extracted.indexOf("#{");     
        }   
        return extracted;      
    }

    ko.bindingHandlers['ntsLegendButton'] = new NtsLegentButtonBindingHandler();
}