/// <reference path="../../reference.ts"/>

module nts.uk.ui.koExtentions {
    let $: any = window["$"],
        _: any = window["_"],
        ko: any = window["ko"],
        text: any = window["nts"]["uk"]["text"],
        util: any = window["nts"]["uk"]["util"],
        request: any = window["nts"]["uk"]["request"],
        resource: any = window["nts"]["uk"]["resource"];

    /**
     * HelpButton binding handler
     */
    class NtsHelpButtonBindingHandler implements KnockoutBindingHandler {
        
        constructor() { }
        
        init(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext) {
            // Get data
            var data = valueAccessor();
            var image: string = ko.unwrap(data.image);
            var popUpId: string = ko.unwrap(data.popUpId);
            var textId: string = ko.unwrap(data.textId);
            var textParams: string = ko.unwrap(data.textParams);
            var enable: boolean = (data.enable !== undefined) ? ko.unwrap(data.enable) : true;
            var position: string = ko.unwrap(data.position);
            
            var isText = !util.isNullOrUndefined(textId) || !util.isNullOrUndefined(textParams);

            //Position
            var myPositions: Array<string> = position.replace(/[^a-zA-Z ]/gmi, "").split(" ");
            var atPositions: Array<string> = position.split(" ");
            var operator: number = 1;
            var marginDirection: string = "";
            var caretDirection: string = "";
            var caretPosition: string = "";
            if (myPositions[0].search(/(top|left)/i) !== -1) {
                operator = -1;
            }
            if (myPositions[0].search(/(left|right)/i) === -1) {
                atPositions[0] = atPositions.splice(1, 1, atPositions[0])[0];
                myPositions[0] = myPositions.splice(1, 1, myPositions[0])[0];
                caretDirection = myPositions[1] = text.reverseDirection(myPositions[1]);
                caretPosition = "left";
                marginDirection = "margin-top";
            }
            else {
                caretDirection = myPositions[0] = text.reverseDirection(myPositions[0]);
                caretPosition = "top";
                marginDirection = "margin-left";
            }

            // Container
            $(element).on("click", function() {
                if ($popup.is(":visible")) {
                    $popup.hide();
                }
                else {
                    let CARET_WIDTH = parseFloat($caret.css("font-size")) * 2;
                    $popup.show()
                        .css(marginDirection, 0)
                        .position({
                            my: myPositions[0] + " " + myPositions[1],
                            at: atPositions[0] + " " + atPositions[1],
                            of: $(element),
                            collision: "none"
                        })
                        .css(marginDirection, CARET_WIDTH * operator);
                    $caret.css(caretPosition, parseFloat($popup.css(caretPosition)) * -1);
                }
            }).on( "mouseleave", function() {
                if ($popup.is(":visible")) {
                    $popup.hide();
                }
            }).wrap($("<div class='ntsControl ntsHelpButton'></div>"));
            
            var $container = $(element).closest(".ntsHelpButton");
            var $content;

            if (_.has(data, 'image')) {
                $content = $("<img>");

                ko.computed({
                    read: () => {
                        let _image = ko.toJS(data.image);

                        $content.attr('src', request.resolvePath(_image));
                    }
                });
            } else if (_.has(data, 'popUpId')) {
                $content = $('#' + popUpId);
                // add pop-up-container
            } else {
                $content = $("<span>", {
                    style: { 'white-space': 'pre-line' }
                });

                ko.computed({
                    read: () => {
                        let _textId = ko.toJS(data.textId),
                            _textParams = ko.toJS(data.textParams);

                        $content.text(resource.getText(_textId, _textParams));
                    }
                });
            }
            
            var $caret = $("<span class='caret-helpbutton caret-" + caretDirection + "'></span>");
            var $popup = $("<div class='nts-help-button-image'></div>")
                .append($caret)
                .append($content)
                .appendTo($container).hide();
            if (isText) {
                let CHARACTER_DEFAULT_WIDTH = 7;
                let DEFAULT_SPACE = 5;
                let textLengths = _.map($content.text().split(/\r\n/g), function(o) { return nts.uk.text.countHalf(o); });
                let WIDTH_SHOULD_NEED = CHARACTER_DEFAULT_WIDTH * _.max(textLengths) + DEFAULT_SPACE;
                $popup.width(WIDTH_SHOULD_NEED > 300 ? 300 : WIDTH_SHOULD_NEED);
            }
            // Click outside event
            $("html").on("click", function(event) {
                if (!$container.is(event.target) && $container.has(event.target).length === 0) {
                    $container.find(".nts-help-button-image").hide();
                }
            });
        }

        update(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
            // Get data
            var data = valueAccessor();
            var enable: boolean = (data.enable !== undefined) ? ko.unwrap(data.enable) : true;

            // Enable
            (enable === true) ? $(element).removeAttr("disabled") : $(element).attr("disabled", "disabled");

        }
    }
    
    ko.bindingHandlers['ntsHelpButton'] = new NtsHelpButtonBindingHandler();
}
