var nts;
(function (nts) {
    var custombinding;
    (function (custombinding) {
        var SortListControl = /** @class */ (function () {
            function SortListControl() {
                var _this = this;
                this.style = "<style type=\"text/css\" id=\"sortable-style\">\n            .sortable-container {\n                width: 100%;\n                display: block;\n                border: 1px solid #ccc;\n            }\n\n            .sortable-container .fixed-header {\n                line-height: 24px;\n                background-color: #CFF1A5;\n                border-bottom: 1px solid #ccc;\n            }\n\n            .sortable-container .sortable-area {\n                cursor: pointer;\n                overflow-x: hidden;\n                overflow-y: scroll;\n                position: relative;\n            }\n\n            .sortable-container .sort-row-item {\n                line-height: 24px;\n                border: 1px solid #ccc;\n                border-top: 0;\n                border-left: 0;\n                border-right: 0;                \n                padding-left: 10px;\n                overflow: hidden;\n                text-overflow: ellipsis;\n                font-size: 14px;\n                font-family: \"DroidSansMono\", \"Meiryo\";\n            }\n\n            .sortable-container .sort-row-item.ui-sortable-helper {\n                background-color: #fff;\n                border-top: 1px solid #ccc;\n            }\n\n            .sortable-container .sort-row-item.ui-sortable-placeholder {\n                background-color: #fff;\n                visibility: visible !important;\n            }\n          </style>";
                this.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                    var self = _this, data = valueAccessor(), key = data.optionValue || 'id', text = data.optionText || 'name', height = data.height || ((data.rows || 15) * 24), $element = $(element), $head = $('<div>', { 'class': 'fixed-header', text: '名称' }), $body = $('<ul>', { 'class': 'sortable-area', 'height': String(height).replace(/[pxt]/g, '') + 'px' });
                    // add style to <head> on first run
                    if (!$('#sortable-style').length) {
                        $('head').append(self.style);
                    }
                    $element
                        .append($head)
                        .append($body)
                        .addClass('sortable-container');
                    $body
                        .sortable({
                        axis: "y",
                        items: ".sort-row-item",
                        update: function (event, ui) {
                            var _options = [], rows = $(event.target).find('li.sort-row-item');
                            _.each(rows, function (element) {
                                _options.push($(element).data("item"));
                            });
                            data.options(_.filter(_options, function (x) { return !!x; }));
                        }
                    }).disableSelection();
                };
                this.update = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                    var $element = $(element), data = valueAccessor(), key = data.optionsValue || 'id', text = data.optionText || 'name', $body = $element.find('ul.sortable-area'), options = ko.unwrap(data.options);
                    $body.empty();
                    _.each(options, function (row) {
                        var $div = $('<li>', {
                            text: row[text],
                            'class': 'sort-row-item'
                        })
                            .data('item', row)
                            .disableSelection();
                        $body.append($div);
                    });
                };
            }
            return SortListControl;
        }());
        custombinding.SortListControl = SortListControl;
    })(custombinding = nts.custombinding || (nts.custombinding = {}));
})(nts || (nts = {}));
ko.bindingHandlers["ntsSortList"] = new nts.custombinding.SortListControl();
//# sourceMappingURL=sort-list-control-ko-ext.js.map