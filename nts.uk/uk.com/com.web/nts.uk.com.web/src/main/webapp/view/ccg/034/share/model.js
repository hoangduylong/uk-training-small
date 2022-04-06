var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg034;
                (function (ccg034) {
                    var share;
                    (function (share) {
                        var model;
                        (function (model) {
                            var HorizontalAlign = /** @class */ (function () {
                                function HorizontalAlign() {
                                }
                                HorizontalAlign.LEFT = 0;
                                HorizontalAlign.MIDDLE = 1;
                                HorizontalAlign.RIGHT = 2;
                                return HorizontalAlign;
                            }());
                            model.HorizontalAlign = HorizontalAlign;
                            var VerticalAlign = /** @class */ (function () {
                                function VerticalAlign() {
                                }
                                VerticalAlign.TOP = 0;
                                VerticalAlign.CENTER = 1;
                                VerticalAlign.BOTTOM = 2;
                                return VerticalAlign;
                            }());
                            model.VerticalAlign = VerticalAlign;
                            var customload;
                            (function (customload) {
                                function loadLimitedLabelForIframe() {
                                    $("iframe").contents().on('mouseenter', '.limited-label', function (e) {
                                        var $label = $(e.target);
                                        // Check if contents is overflow
                                        if (isOverflow($label)) {
                                            var $view_1 = $('<div />').addClass('limited-label-view')
                                                .text($label.text() || $label.val())
                                                .appendTo($("iframe").contents().find("body"))
                                                .position({
                                                my: 'left top',
                                                at: 'left bottom',
                                                of: $label,
                                                collision: 'flipfit'
                                            }).css("z-index", "999");
                                            if ($label.attr("disabled")) {
                                                var id_1 = "#" + $label.attr("id");
                                                $(document).on('mouseleave.limitedlabel', id_1, function () {
                                                    $(document).off('mouseleave.limitedlabel', id_1);
                                                    $view_1.remove();
                                                });
                                                return;
                                            }
                                            $label.bind('mouseleave.limitedlabel', function () {
                                                $label.unbind('mouseleave.limitedlabel');
                                                $view_1.remove();
                                            });
                                            $label.on('remove', function () {
                                                $view_1.remove();
                                            });
                                        }
                                    });
                                }
                                customload.loadLimitedLabelForIframe = loadLimitedLabelForIframe;
                                function isOverflow($label) {
                                    if ($label[0].nodeName === "INPUT"
                                        && (window.navigator.userAgent.indexOf("MSIE") > -1
                                            || !!window.navigator.userAgent.match(/trident/i))) {
                                        var $div = $("<div/>").appendTo($(document.body));
                                        var style = $label[0].currentStyle;
                                        if (style) {
                                            for (var p in style) {
                                                $div[0].style[p] = style[p];
                                            }
                                        }
                                        $div.html($label.val());
                                        var width = $div.outerWidth();
                                        var scrollWidth = $div[0].scrollWidth;
                                        $div.remove();
                                        return width < scrollWidth;
                                    }
                                    return $label[0].offsetWidth < $label[0].scrollWidth;
                                }
                            })(customload = model.customload || (model.customload = {}));
                        })(model = share.model || (share.model = {}));
                    })(share = ccg034.share || (ccg034.share = {}));
                })(ccg034 = view.ccg034 || (view.ccg034 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=model.js.map