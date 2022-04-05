/// <reference path="../../reference.ts"/>

module nts.uk.enums {
    export var NtsCharset: nts.uk.enums.EnumConstant[] = [
        {
            value: 1,
            fieldName: "UTF8",
            localizedName: "UTF-8"
        },
        {
            value: 2,
            fieldName: "UTF8_WITH_BOM",
            localizedName: "UTF-8 BOM"
        },
        {
            value: 3,
            fieldName: "SHIFT_JIS",
            localizedName: "Shift-JIS"
        },
    ];
}

module nts.uk.ui.koExtentions {

    /**
     * Accordion binding handler
     */
    class NtsCharsetSettingBindingHandler implements KnockoutBindingHandler {
    
        /**
         * Init.
         */
        init(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
            var data = valueAccessor();
            var value: any = (data.value !== undefined) ? ko.unwrap(data.value) : null;
            var enable: boolean = (data.enable !== undefined) ? ko.unwrap(data.enable) : true;
            
            var container = $(element);
            container.addClass("ntsControl nts-charset-setting");
            if (nts.uk.util.isNullOrUndefined(container.attr("tabindex"))) {
                container.attr("tabindex", "0");
            }
            container.keypress(function(evt, ui) {
                let code = evt.which || evt.keyCode;
                if (code === 32) {
                    container.igCombo("openDropDown");
                    evt.preventDefault();
                }
            });

            container.igCombo({
                dataSource: nts.uk.enums.NtsCharset,
                valueKey: "value",
                textKey: 'localizedName',
                mode: "dropdown",
                visibleItemsCount: 5,
                disabled: !enable,
                placeHolder: '',
                tabIndex: -1,
                enableClearButton: false,
                initialSelectedItems: [
                    { value: value }
                ],
                selectionChanged: function(evt: any, ui: any) {
                    if (ui.items.length > 0) {
                        data.value(ui.items[0].data["value"]);
                    }
                }
            });
        }

        /**
         * Update
         */
        update(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
            var data = valueAccessor();
            var value: any = (data.value !== undefined) ? ko.unwrap(data.value) : null;
            var enable: boolean = (data.enable !== undefined) ? ko.unwrap(data.enable) : true;

            var container = $(element);
            container.igCombo("option", "disabled", !enable);
            if (!nts.uk.util.isNullOrUndefined(value) && container.igCombo("value") != value) {
                container.igCombo("value", value);
            }
        }
    }


    ko.bindingHandlers['ntsCharsetSetting'] = new NtsCharsetSettingBindingHandler();
}