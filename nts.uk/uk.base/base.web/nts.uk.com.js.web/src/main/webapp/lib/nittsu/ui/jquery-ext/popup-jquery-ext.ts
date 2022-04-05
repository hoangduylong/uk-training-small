/// <reference path="../../reference.ts"/>

interface JQuery {
    ntsPopup(action?: string, option?: nts.uk.ui.jqueryExtentions.ntsPopup.PopupSetting): JQuery;
}

module nts.uk.ui.jqueryExtentions {

    export module ntsPopup {
        let DATA_INSTANCE_NAME = 'nts-popup-panel';

        export interface PopupSetting {
            trigger?: string;
            position?: any;
            showOnStart?: boolean,
            dismissible?: boolean,
        };

        $.fn.ntsPopup = handler;
        function handler(action?: string, option?: PopupSetting) {
            var $control = $(this);
            if (typeof action !== 'string') {
                handler.call(this, "init", action);
            }

            switch (action) {
                case 'init':
                    init($control, option); break;
                case 'show':
                    show($control); break;
                case 'hide':
                    hide($control); break;
                case 'destroy':
                    destroy($control); break;
                case 'toggle':
                    toggle($control); break;
            }

        }

        function init(control: JQuery, option?: PopupSetting): JQuery {
            control.addClass("popup-panel").css("z-index", 100).show();

            // Default Setting
            var defaultoption: PopupSetting = {
                trigger: "",
                position: {
                    my: 'left top',
                    at: 'left bottom',
                    of: control.siblings('.show-popup')
                },
                showOnStart: false,
                dismissible: true
            };
            var setting = $.extend({}, defaultoption, option);
            control.data("option", setting);

            // Trigger Element
            $(setting.trigger).on("click.popup", function(e) {
                show(control);
            });

            // Dismissible
            if (setting.dismissible) {
                $(window).on("mousedown.popup", function(e) {
                    if (!$(e.target).is(control) // Target isn't Popup
                        && control.has(e.target).length === 0 // Target isn't Popup's children
                        && !$(e.target).is(setting.trigger)) { // Target isn't Trigger element
                        hide(control);
                    }
                });
            }

            // Show on Start
            if (setting.showOnStart)
                show(control);
            else
                hide(control);

            return control;
        }

        function show(control: JQuery): JQuery {
            control.css({
                visibility: 'visible',
            });
            control.position(control.data("option").position);
            return control;
        }

        function hide(control: JQuery): JQuery {
            control.css({
                visibility: 'hidden',
                top: "-9999px",
                left: "-9999px"
            });
            return control;
        }

        function destroy(control: JQuery): JQuery {
            hide(control);
            $(control.data("option").trigger).off("click.popup");
            $(window).off("click.popup");
            return control;
        }

        function toggle(control: JQuery): JQuery {
            var isDisplaying = control.css("visibility");
            if (isDisplaying === 'hidden') {
                show(control);
            } else {
                hide(control);
            }
            return control;
        }


        class NtsPopupPanel {
            $panel: JQuery;
            position: any;
            constructor($panel: JQuery, option?: PopupSetting) {
                var parent = $panel.parent();
                this.$panel = $panel
                    .data(DATA_INSTANCE_NAME, this)
                    .addClass('popup-panel')
                    .appendTo(parent);
                this.$panel.css("z-index", 100);
            }
        }
    }
}