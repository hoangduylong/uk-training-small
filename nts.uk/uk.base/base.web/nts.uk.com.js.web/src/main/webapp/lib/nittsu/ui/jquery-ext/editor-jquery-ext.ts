/// <reference path="../../reference.ts"/>

module nts.uk.ui.jqueryExtentions {

    module ntsEditor {
        $.fn.ntsEditor = function(action: string): any {

            var $editor = $(this);

            switch (action) {
                case 'validate':
                    validate($editor);
                default:
                    break;
            }
        };

        function validate($editor: JQuery) {
            var validateEvent = new CustomEvent("validate", {

            });
            $editor.each(function(index) {
                var $input = $(this);
                document.getElementById($input.attr('id')).dispatchEvent(validateEvent);
            });
            //            document.getElementById($editor.attr('id')).dispatchEvent(validateEvent);
            //            $editor.trigger("validate");
        }
    }
}