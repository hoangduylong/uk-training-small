/// <reference path="../../reference.ts"/>

module nts.uk.ui.koExtentions {

    /**
	 * Accordion binding handler
	 */
    class NtsAccordionBindingHandler implements KnockoutBindingHandler {

        /**
		 * Init.
		 */
        init(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
            var data = valueAccessor();
            var active: any = (data.active !== undefined) ? (data.active) : ko.observable(false);
            var realActive = (nts.uk.ntsNumber.isNumber(ko.unwrap(active))) ? Number(ko.unwrap(active)) : ko.unwrap(active);
            var animate: any = (data.animate !== undefined) ? ko.unwrap(data.animate) : {};
            var collapsible: boolean = (data.collapsible !== undefined) ? ko.unwrap(data.collapsible) : true;
            var event: string = (data.event !== undefined) ? ko.unwrap(data.event) : "click";
            var header: any = (data.header !== undefined) ? ko.unwrap(data.header) : "> li > :first-child,> :not(li):even";
            var heightStyle: any = (data.heightStyle !== undefined) ? ko.unwrap(data.heightStyle) : "content";
            var enable: boolean = (data.enable !== undefined) ? ko.unwrap(data.enable) : true;
            var activate: any = (data.activate !== undefined) ? (data.activate) : (event, ui) => {};
            var create: any = (data.create !== undefined) ? (data.create) : (event, ui) => {};
            
            var container = $(element);            
            container.accordion({
				active: realActive,
				animate: animate,
				collapsible: collapsible,
				event: event,
				header: header,
				heightStyle: heightStyle,
				disabled: !enable,
				beforeActivate: function(event, ui) {
					ui.newPanel.removeClass("disappear");
					ui.newPanel.stop(false, false);
				},
				activate: function(event, ui) {
					if (ko.isObservable(active))
						active(container.accordion("option", "active"));
					ui.oldPanel.addClass("disappear");
					ui.newPanel.removeClass("disappear");
					activate.call(this, event, ui);
				},
				create: function(event, ui: any) {
					container.find(".nts-accordion-content").addClass("disappear");
					ui.panel.removeClass("disappear");
					create.call(this, event, ui);
				},
				icons: { "header": "ui-icon-caret-1-s", "activeHeader": "ui-icon-caret-1-n" },
			    classes: {
			    	"ui-accordion": "ntsAccordion",
			    	"ui-accordion-content": "ui-corner-bottom nts-accordion-content"
				}
        	});
            
            
        }

        /**
		 * Update
		 */
        update(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
            var data = valueAccessor();
            var active: any = (data.active !== undefined) ? (data.active) : ko.observable(false);
            var animate: any = (data.animate !== undefined) ? ko.unwrap(data.animate) : {};
            var collapsible: boolean = (data.collapsible !== undefined) ? ko.unwrap(data.collapsible) : true;
            var event: string = (data.event !== undefined) ? ko.unwrap(data.event) : "click";
            var heightStyle: any = (data.heightStyle !== undefined) ? ko.unwrap(data.heightStyle) : "content";
            var enable: boolean = (data.enable !== undefined) ? ko.unwrap(data.enable) : true;
            
            var container = $(element);
            var currentOption: any = container.accordion( "option" );
            if (ko.isObservable(active) && currentOption.active !== ko.unwrap(active))
	            container.accordion("option", "active", Number(ko.unwrap(active)));
            if (currentOption.animate != animate)
	            container.accordion("option", "animate", animate);
            if (currentOption.collapsible != collapsible)
	            container.accordion("option", "collapsible", collapsible);
            if (currentOption.event != event)
	            container.accordion("option", "event", event);
            if (currentOption.heightStyle != heightStyle)
	            container.accordion("option", "heightStyle", heightStyle);
            if (currentOption.disabled != !enable)
	            container.accordion("option", "disabled", !enable);
        }
    }

    
    ko.bindingHandlers['ntsAccordion'] = new NtsAccordionBindingHandler();
}