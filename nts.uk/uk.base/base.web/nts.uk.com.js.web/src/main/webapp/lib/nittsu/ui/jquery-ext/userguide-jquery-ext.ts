/// <reference path="../../reference.ts"/>

interface JQuery {
    ntsUserGuide(action?: string, param?: any): any;
}

module nts.uk.ui.jqueryExtentions {

    module ntsUserGuide {

        $.fn.ntsUserGuide = function(action?: string): any {
            var $controls = $(this);
            if (nts.uk.util.isNullOrUndefined(action) || action === "init") {
                return init($controls);
            }
            else if (action === "destroy") {
                return destroy($controls);
            }
            else if (action === "show") {
                return show($controls);
            }
            else if (action === "hide") {
                return hide($controls);
            }
            else if (action === "toggle") {
                return toggle($controls);
            }
            else if (action === "isShow") {
                return isShow($controls);
            }
            else {
                return $controls;
            };
        }

        function init(controls: JQuery): JQuery {
            controls.each(function() {
                // UserGuide container
                let $control = $(this);
                $control.remove();
                if (!$control.hasClass("ntsUserGuide"))
                    $control.addClass("ntsUserGuide");
                $($control).appendTo($("body")).show();
                let target = $control.data('target');
                let direction = $control.data('direction');

                // Userguide Information Box
                $control.children().each(function() {
                    let $box = $(this);
                    let boxDirection = $box.data("direction");
                    $box.addClass("userguide-box caret-" + getReveseDirection(boxDirection) + " caret-overlay");
                });

                // Userguide Overlay
                let $overlay = $("<div class='userguide-overlay'></div>")
                    .addClass("overlay-" + direction)
                    .appendTo($control);
                $control.hide();

            });

            // Hiding when click outside
            $("html").on("mouseup keypress", { controls: controls }, hideBinding);

            return controls;
        }

        function destroy(controls: JQuery) {
            controls.each(function() {
                $(this).remove();
            });

            // Unbind Hiding when click outside
            $("html").off("mouseup keypress", hideBinding);
            return controls;
        }

        function hideBinding(e): JQuery {
            e.data.controls.each(function() {
                $(this).hide();
            });
            return e.data.controls;
        }

        function show(controls: JQuery): JQuery {
            controls.each(function() {
                let $control = $(this);
                $control.show();

                let target = $control.data('target');
                let direction = $control.data('direction');
                $control.find(".userguide-overlay").each(function(index, elem) {
                    calcOverlayPosition($(elem), target, direction)
                });
                $control.children().each(function() {
                    let $box = $(this);
                    let boxTarget = $box.data("target");
                    let boxDirection = $box.data("direction");
                    let boxMargin = ($box.data("margin")) ? $box.data("margin") : "20";
                    calcBoxPosition($box, boxTarget, boxDirection, boxMargin);
                });
            });
            return controls;
        }


        function hide(controls: JQuery): JQuery {
            controls.each(function() {
                $(this).hide();
            });
            return controls;
        }

        function toggle(controls: JQuery): JQuery {
            if (isShow(controls))
                hide(controls);
            else
                show(controls);
            return controls;
        }

        function isShow(controls: JQuery): boolean {
            let result = true;
            controls.each(function() {
                if (!$(this).is(":visible"))
                    result = false;
            });
            return result;
        }

        function calcOverlayPosition(overlay: JQuery, target: string, direction: string): JQuery {
            if (direction === "left")
                return overlay.css("right", "auto")
                    .css("width", $(target).offset().left);
            else if (direction === "right")
                return overlay.css("left", $(target).offset().left + $(target).outerWidth());
            else if (direction === "top")
                return overlay.css("position", "absolute")
                    .css("bottom", "auto")
                    .css("height", $(target).offset().top);
            else if (direction === "bottom")
                return overlay.css("position", "absolute")
                    .css("top", $(target).offset().top + $(target).outerHeight())
                    .css("height", $("body").height() - $(target).offset().top);
        }

        function calcBoxPosition(box: JQuery, target: string, direction: string, margin: string): JQuery {
            let operation = "+";
            if (direction === "left" || direction === "top")
                operation = "-";
            return box.position({
                my: getReveseDirection(direction) + operation + margin,
                at: direction,
                of: target,
                collision: "none"
            });
        }

        function getReveseDirection(direction: string): string {
            if (direction === "left")
                return "right";
            else if (direction === "right")
                return "left";
            else if (direction === "top")
                return "bottom";
            else if (direction === "bottom")
                return "top";
        }
    }
}