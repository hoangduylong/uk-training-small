var nts;
(function (nts) {
    var custombinding;
    (function (custombinding) {
        var $ = window['$'], _ = window['_'], ko = window['ko'], moment = window['moment'];
        // blockui all ajax request on layout
        var ajax = nts.uk.request.ajax;
        var random = nts.uk.util.randomId;
        var text = nts.uk.resource.getText;
        var info = nts.uk.ui.dialog.info;
        var alert = nts.uk.ui.dialog.alert;
        var modal = nts.uk.ui.windows.sub.modal;
        var setShared = nts.uk.ui.windows.setShared;
        var getShared = nts.uk.ui.windows.getShared;
        var parseTime = nts.uk.time.parseTime;
        var __viewContext = window['__viewContext'] || {}, rmError = window['nts']['uk']['ui']['errors']['removeByCode'], getError = window['nts']['uk']['ui']['errors']['getErrorList'], clearError = window['nts']['uk']['ui']['errors']['clearAll'], writeConstraint = window['nts']['uk']['ui']['validation']['writeConstraint'], writeConstraints = window['nts']['uk']['ui']['validation']['writeConstraints'], parseTimeWidthDay = window['nts']['uk']['time']['minutesBased']['clock']['dayattr']['create'];
        var space_character_JP = '　';
        var PropControl = /** @class */ (function () {
            function PropControl() {
                this.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                    var $element = $(element), accessor = valueAccessor();
                    var inter = window.setInterval(function () {
                        if (_.has(accessor, "width") && ko.isObservable(accessor.width)) {
                            accessor.width(element.offsetWidth);
                        }
                        if (_.has(accessor, "height") && ko.isObservable(accessor.height)) {
                            accessor.height(element.offsetHeight);
                        }
                        if (_.has(accessor, "hasScrollX") && ko.isObservable(accessor.hasScrollX)) {
                            accessor.hasScrollX(element.scrollWidth > element.clientWidth);
                        }
                        if (_.has(accessor, "hasScrollY") && ko.isObservable(accessor.hasScrollY)) {
                            accessor.hasScrollY(element.scrollHeight > element.clientHeight);
                        }
                        if (_.has(accessor, "top") && ko.isObservable(accessor.top)) {
                            accessor.top($element.offset().top);
                        }
                        if (_.has(accessor, "left") && ko.isObservable(accessor.left)) {
                            accessor.left($element.offset().left);
                        }
                        var _down = ko.toJS(accessor.scrollDown);
                        if (!!_down) {
                            var _len = $element.find(_down).length, _olen = $element.data('length');
                            $element.data('length', _len);
                            if (_olen < _len) {
                                $element.scrollTop($element.prop("scrollHeight"));
                            }
                        }
                        if (_.has(accessor, "maxHeight")) {
                            var m = ko.toJS(accessor.maxHeight), c = m.byChild, l = m.length, r = $element.find(c), h = r.height();
                            if (r.length <= 5) {
                                $element.css('overflow-y', 'hidden');
                            }
                            else {
                                $element.css('overflow-y', 'auto');
                            }
                            if (element.scrollWidth > element.clientWidth) {
                                $element.css('max-height', ((h * l) + 17) + 'px');
                            }
                            else {
                                $element.css('max-height', ((h * l) + 4) + 'px');
                            }
                        }
                        if (!element) {
                            clearInterval(inter);
                        }
                    }, 100);
                };
            }
            return PropControl;
        }());
        custombinding.PropControl = PropControl;
        var LayoutControl = /** @class */ (function () {
            function LayoutControl() {
                var _this = this;
                this.style = "<style type=\"text/css\" rel=\"stylesheet\" id=\"layout_style\">\n                    .layout-control.dragable{\n                        width: 1245px;\n                    }\n                    .layout-control .left-area,\n                    .layout-control .right-area,\n                    .layout-control .add-buttons,\n                    .layout-control .drag-panel {\n                        float: left;\n                    }\n\n                    .layout-control .left-area {\n                        margin-right: 15px;\n                    }\n\n                    .layout-control .form-group {\n                        margin-bottom: 5px;\n                    }\n\n                    .layout-control .control-group {\n                        padding-left: 10px;\n                    }\n\n                    .layout-control #cps007_cbx_control {\n                        min-width: 248px;\n                    }\n\n                    .layout-control .ntsControl.radio-control {\n                        width: 100%;\n                        padding-bottom: 3px;\n                    }\n\n                    .layout-control .ntsControl.radio-control .ntsRadioBox {\n                        width: 50%;\n                        padding-right: 5px;\n                        box-sizing: border-box;\n                    }\n\n                    .layout-control .ntsControl.search-control .nts-editor {\n                        width: 141px !important;\n                    }\n\n                    .layout-control .ui-iggrid-scrolldiv {\n                        background-color: #fff;\n                    }\n\n                    .layout-control #cps007_lst_header {\n                        display: block;\n                        line-height: 23px;\n                        background-color: #CFF1A5;\n                        box-sizing: border-box;\n                        border-bottom: none;\n                        width: calc(100% - 1px);\n                        padding-left: 3px;\n                    }\n\n                    .layout-control .add-buttons {\n                        margin-right: 15px;\n                        padding-top: 220px;\n                    }\n\n                    .layout-control .drag-panel {\n                        border: 1px solid #ccc;\n                        border-radius: 10px;\n                        width: 810px;\n                        height: 615px;\n                        padding: 10px;\n                        box-sizing: border-box;\n                    }\n\n                    .layout-control div.ui-sortable {\n                        overflow-x: hidden;\n                        overflow-y: scroll;\n                        padding-right: 10px;\n                        box-sizing: border-box;\n                    }\n\n                    .layout-control.readonly div.ui-sortable {\n                        height: 100%;\n                    }\n\n                    .layout-control.dragable div.ui-sortable {\n                        max-height: 94%;\n                        margin-bottom: 3px;\n                    }\n\n                    .layout-control .item-classification {\n                        padding: 3px;\n                        position: relative;\n                        box-sizing: border-box;\n                        background-color: #fff;\n                        border: 1px dashed transparent;\n                    }\n\n                    .layout-control .item-classification div.item-control>.ntsControl .nts-input,\n                    .layout-control .item-classification div.item-control div.childs-row>.ntsControl .nts-input {\n                        margin-top: 3px;\n                    }\n\n                    .layout-control .item-classification div.item-control>*,\n                    .layout-control .item-classification div.item-controls>* {\n                        vertical-align: top;\n                    }\n                    \n                    .layout-control .item-classification div.item-control~.item-control {\n                        margin-top: 15px;\n                    }\n\n                    .layout-control .item-classification div.item-control>.set-items,\n                    .layout-control .item-classification div.item-control>.single-items {\n                        margin-top: 3px;\n                        max-width: 535px;\n                    }\n\n                    .layout-control .item-classification div.item-control>.set-items .set-group {\n                        min-height: 34px;\n                    }\n\n                    .layout-control .item-classification div.item-control>.set-items .set-group>* {\n                        vertical-align: top;\n                        display: inline-block;\n                    }\n\n                    .layout-control .item-classification div.item-control>.set-items .set-group.math-title {\n                        line-height: 30px;\n                        font-weight: bold;\n                    }\n\n                    .layout-control .item-classification div.item-control>.set-items .set-group:not(:first-child) {\n                        margin-left: -165px;\n                        padding-top: 5px;\n                        padding-bottom: 5px;\n                    }\n\n                    .layout-control .item-classification div.item-control>.set-items .childs-row .ntsControl .nts-input {\n                        width: 85px;\n                    }\n\n                    .layout-control .item-classification div.item-control>.set-items .childs-row {\n                        width: 530px;\n                    }\n                    \n                    .layout-control .item-classification div.item-control>.set-items .childs-row~.childs-row {\n                        display: block;\n                        margin-top: 10px;\n                        margin-left: 165px;\n                    }\n\n                    .layout-control .item-classification div.item-control .child-label {\n                        width: 160px;\n                        vertical-align: top;\n                        line-height: 35px;\n                        display: inline-block;\n                    }\n\n                    .layout-control .item-classification div.item-control .childs-row .child-label {\n                        width: 130px;\n                    }\n                    \n                    .layout-control .item-classification div.item-control .childs-row .ntsControl~.child-label {\n                        padding-left: 25px;\n                    } \n\n                    .layout-control .item-classification div.multiple-items {\n                        overflow: hidden;\n                    }\n\n                    .layout-control .item-classification div.item-control .set-group:first-child .child-label {\n                        display: none;\n                    }\n\n                    .layout-control .item-classification div.set-item,\n                    .layout-control .item-classification div.item-control>div {\n                        display: inline-block;\n                    }\n\n                    .layout-control .item-controls {\n                        min-height: 145px;\n                    }\n\n                    .layout-control .item-controls .table-container {\n                        color: #000;\n                        overflow: hidden;\n                        padding-top: 31px;\n                        position: relative;\n                        border: 1px solid #aaa;\n                        display: inline-block;\n                        max-width: calc(100% - 240px);\n                        background-color: #CFF1A5;\n                        background: -webkit-repeating-linear-gradient(#CFF1A5, #CFF1A5 31px, #757575 31px, #CFF1A5 32px);\n                        background: -o-repeating-linear-gradient(#CFF1A5, #CFF1A5 31px, #757575 31px, #CFF1A5 32px);\n                        background: -moz-repeating-linear-gradient(#CFF1A5, #CFF1A5 31px, #757575 31px, #CFF1A5 32px);\n                        background: repeating-linear-gradient(#CFF1A5, #CFF1A5 31px, #757575 31px, #CFF1A5 32px);\n                    }\n\n                    .layout-control .item-controls .table-container .ntsCheckBox {\n                        padding: 0;\n                        width: 30px;\n                        height: 29px;\n                        box-sizing: border-box;\n                        margin: 0;\n                    }\n\n                    .layout-control .item-controls .table-container .ntsCheckBox:focus {\n                        box-shadow: none;\n                        outline: none;\n                    }\n\n                    .layout-control .item-controls .table-container .ntsCheckBox label{\n                        width: 28px;\n                        height: 26px;\n                        display: block;\n                        margin-top: -1px;\n                        text-align: center;\n                        padding-top: 3px;\n                    }\n\n                    .layout-control .item-controls .table-container .ntsCheckBox:focus label {\n                        outline: 1px dashed #0096f2;\n                    }\n                \n                    .layout-control .item-controls .table-container.header-1rows {\n                        padding-top: 31px;\n                    }\n                \n                    .layout-control .item-controls .table-container.header-2rows {\n                        padding-top: 62px;\n                    }\n                \n                    .layout-control .item-controls .table-container.header-3rows {\n                        padding-top: 105px;\n                    }\n                \n                    .layout-control .item-controls .table-container>div {\n                        overflow-y: auto;\n                        max-height: 159px;\n                        border-top: 1px solid #aaa;\n                    }\n                \n                    .layout-control .item-controls .table-container>div table {\n                        border-collapse: collapse;\n                    }\n                \n                    .layout-control .item-controls td {\n                        background-color: #fff;\n                        border-left: 1px solid #aaa;\n                    }\n\n                    .layout-control .item-control td>div,\n                    .layout-control .item-controls td>div {\n                        background-color: rgb(217, 217, 217);\n                        height: 31px;\n                        width: 100%;\n                        display: block;\n                    }\n\n                    .layout-control .item-control td>div.nts-datepicker-wrapper,\n                    .layout-control .item-controls td>div.nts-datepicker-wrapper {                        \n                        background-color: #fff;\n                    }\n\n                    .layout-control .item-control td>div .ui-state-default,\n                    .layout-control .item-controls td>div .ui-state-default,\n                    .layout-control .item-control td>div .ui-state-default:hover,\n                    .layout-control .item-controls td>div .ui-state-default:hover {\n                        border: none;\n                    }\n                \n                    .layout-control .item-control td,\n                    .layout-control .item-control th,\n                    .layout-control .item-controls td,\n                    .layout-control .item-controls th {\n                        padding: 0px;\n                        border: 1px solid #aaa;\n                    }\n\n                    .layout-control .item-control td,\n                    .layout-control .item-control th {\n                        background-color: #CFF1A5;\n                    }\n                \n                    .layout-control .item-controls td:first-child {\n                        border-left: none;\n                    }\n                \n                    .layout-control .item-controls td:last-child {\n                        border-right: none;\n                    }\n                \n                    .layout-control .item-controls th {\n                        height: 0;\n                        line-height: 0;\n                        border: none;\n                        color: transparent;\n                        white-space: nowrap;\n                    }\n                \n                    .layout-control .item-controls th div {\n                        top: 0;\n                        height: 31px;\n                        color: #000;\n                        padding: 0;\n                        overflow: hidden;\n                        line-height: 31px;\n                        position: absolute;\n                        background: #CFF1A5;\n                        box-sizing: border-box;\n                        border-left: 1px solid #aaa;\n                    }\n\n                    .layout-control .item-controls th div>i,\n                    .layout-control .item-controls th div>label {\n                        line-height: 31px;                        \n                    }\n\n                    .layout-control .item-controls th div.required {\n                        background-color: #FAC002;\n                    }\n                \n                    .layout-control .item-controls thead>tr:first-child div {\n                        top: 0;\n                    }\n                \n                    .layout-control .item-controls thead>tr:nth-child(2) div {\n                        top: 35px;\n                    }\n                \n                    .layout-control .item-controls thead>tr:nth-child(3) div {\n                        top: 70px;\n                    }\n\n                    .layout-control .item-controls tr * {\n                        background-color: transparent;\n                    }\n\n                    .layout-control .item-control td input,\n                    .layout-control .item-control td textarea,\n                    .layout-control .item-controls td input,\n                    .layout-control .item-controls td textarea {\n                        border: 1px solid transparent;\n                        border-radius: 0;\n                    }\n\n                    .layout-control .item-control td .ntsControl.error input,\n                    .layout-control .item-control td .ntsControl.error textarea{\n                        border-style: dashed;\n                    }\n\n                    .layout-control .item-control td input:focus,\n                    .layout-control .item-control td textarea:focus,\n                    .layout-control .item-controls td input:focus,\n                    .layout-control .item-controls td textarea:focus {\n                        border: 1px dashed #0096f2;\n                        box-shadow: none;\n                    }\n                \n                    .layout-control .item-controls th:first-child div {\n                        border: none;\n                    }\n                \n                    .layout-control .item-controls tbody tr:first-child td {\n                        border-top: none;\n                    }\n                \n                    .layout-control .item-controls tbody tr:last-child td {\n                        border-bottom: none;\n                    }\n                \n                    .layout-control .set-table-items thead th {\n                        padding: 0 3px;\n                        line-height: 32px;\n                        background-color: #CFF1A5;\n                    }\n\n                    .layout-control .item-classification div.item-sperator>hr {\n                        padding: 0;\n                        margin: 6px 2px 6px 0;\n                    }\n\n                    .layout-control.dragable .item-classification div.item-sperator>hr {\n                        margin-right: 20px;\n                    }\n\n                    .layout-control .item-classification.ui-sortable-helper {\n                        cursor: pointer;\n                    }\n\n                    .layout-control .item-classification.ui-sortable-placeholder {\n                        border: 1px dashed #ddd;\n                        visibility: visible !important;\n                    }\n\n                    .layout-control.dragable .item-classification:hover,\n                    .layout-control.dragable .item-classification.selected {\n                        background-color: #eee;\n                        border: 1px dashed #aaa;\n                    }\n\n                    .layout-control .item-classification .item-control textarea.nts-editor,\n                    .layout-control .item-classification .item-controls textarea.nts-editor {\n                        width: 368px;\n                        height: 70px;\n                        overflow-y: scroll;\n                    }\n\n                    .layout-control .item-classification .ntsControl.radio-wrapper {\n                        line-height: 30px;\n                        margin-bottom: 10px;\n                    }\n\n                    .layout-control .item-classification .value-text {\n                        padding-left: 20px;\n                        display: inline-block;\n                    }\n\n                    .layout-control .item-classification .ntsRadioBox {\n                        margin-right: 25px;\n                    }\n\n                    .layout-control .item-classification .item-controls .ntsControl,\n                    .layout-control .item-classification .item-controls textarea.nts-editor,\n                    .layout-control .item-classification .item-controls .ui-igcombo-wrapper {\n                        display: block;\n                    }\n\n                    .layout-control .item-classification .numeric-button .nts-editor.nts-input {\n                        width: 65px;\n                    }\n\n                    .layout-control .item-classification .set-item-sperator {\n                        text-align: center;\n                        min-width: 25px !important;\n                        line-height: 30px !important;\n                    }\n\n                    .layout-control .item-classification .value-text.readonly,\n                    .layout-control .item-classification .relate-button .value-text,\n                    .layout-control .item-classification .readonly-button .value-text {\n                        padding: 0;\n                        min-width: 65px;\n                        line-height: 35px;\n                    }\n\n                    .layout-control .item-classification .set-table-items .value-text.readonly {\n                        padding-left: 15px;\n                        width: 100%;\n                        line-height: 30px;\n                    }\n\n                    .layout-control .item-classification .form-label {\n                        width: 210px;\n                        white-space: nowrap;\n                        overflow: hidden;\n                        text-overflow: ellipsis;\n                        padding-right: 0;\n                    }\n\n                    .layout-control .item-classification .set-group>.form-label {\n                        width: 160px;\n                    }\n\n                    .layout-control .item-classification th>.form-label {\n                        line-height: 31px !important;\n                        height: 31px !important;\n                    }\n\n                    .layout-control .item-classification th>.form-label>* {\n                        line-height: unset !important;\n                        height: unset !important;                        \n                    }\n\n                    .layout-control .item-classification>.close-btn {\n                        top: 0;\n                        right: 5px;\n                        display: none;\n                        cursor: pointer;\n                        position: absolute;\n                    }\n\n                    .layout-control .item-classification>.close-btn:hover {\n                        color: #f00;\n                    }\n\n                    .layout-control.dragable .item-classification:hover>.close-btn {\n                        display: block;\n                    }\n\n                    .layout-control.readonly:not(.inputable) [disabled],\n                    .layout-control.dragable:not(.inputable) [disabled] {\n                        background-color: #fff;\n                    }\n\n                    .layout-control .index .remove-btn,\n                    .layout-control.dragable .index:hover .remove-btn {\n                        display: none;\n                    }\n\n                    .layout-control.inputable tr:hover .number,\n                    .layout-control.inputable .index:hover .number {\n                        display: block;\n                    }\n\n                    .layout-control.inputable tr:hover .remove-btn,\n                    .layout-control.inputable .index:hover .remove-btn {\n                        display: none;\n                    }\n\n                    .layout-control.inputable .remove-btn:hover {\n                        color: #f00;\n                        cursor: pointer;\n                        -webkit-touch-callout: none;\n                        -webkit-user-select: none;\n                        -khtml-user-select: none;\n                        -moz-user-select: none;\n                        -ms-user-select: none;\n                        user-select: none;\n                    }\n\n                    .layout-control.dragable .add-rows,\n                    .layout-control.dragable .add-rows button,\n                    .layout-control.inputable .add-rows,\n                    .layout-control.inputable .add-rows button,\n                    .layout-control.readonly:not(.inputable) .add-rows,\n                    .layout-control.readonly:not(.inputable) .add-rows button {\n                        display: none;\n                    }\n\n                    .layout-control.dragable .color-operation-case-character,\n                    .layout-control.readonly:not(.inputable) .color-operation-case-character {\n                        color: #000 !important;\n                    }\n                    \n                    .layout-control .ntsHelpButton {\n                        margin-left: -50px;\n                        margin-right: 15px;\n                    }\n\n                    .layout-control .ntsHelpButton button {\n                        top: 3px;\n                        height: 27px;\n                        vertical-align: middle;\n                    }\n                    #cps007_lbl_control {\n                        padding-left: 10px;\n                    }\n                </style>";
                this.tmp = "<div class=\"left-area\">\n                    <div id=\"cps007_lbl_control\"></div>\n                    <div class=\"control-group\">\n                        <div>\n                            <div id=\"cps007_rdg_control\" class=\"radio-control ntsControl\"></div>\n                        </div>\n                        <div>\n                            <div id=\"cps007_cbx_control\" class=\"combobox-control ntsControl\"></div>\n                        </div>\n                        <div>\n                            <div id=\"cps007_sch_control\" class=\"search-control ntsControl\"></div>\n                        </div>\n                        <div>\n                            <div id=\"cps007_lst_header\"></div>\n                            <div id=\"cps007_lst_control\" class=\"listbox-control ntsControl\"></div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"right-area cf\">\n                    <div class=\"add-buttons\">\n                        <button id=\"cps007_btn_add\"></button>\n                    </div>\n                    <div class=\"drag-panel\">\n                        <div id=\"cps007_srt_control\">\n                            <div class=\"form-group item-classification\" \n                                    data-bind=\"let: {\n                                        text: nts.uk.resource.getText,\n                                        LAYOUT_TYPE: {\n                                            ITEM: 'ITEM',\n                                            LIST: 'LIST',\n                                            SEPRL: 'SeparatorLine'\n                                        },\n                                        DISP_TYPE: {\n                                            SINGLE: 'SINGLE',\n                                            SET_TABLE: 'SET_TABLE',\n                                            SET_INLINE: 'SET_INLINE',\n                                            SET_MULTILINE: 'SET_MULTILINE',\n                                            SET_MULTILINE_W_RADIO: 'SET_MULTILINE_W_RADIO',\n                                            SET_MULTILINE_W_TITLE: 'SET_MULTILINE_W_TITLE'\n                                        }\n                                    }\">\n                                <!-- ko let: { _index: $index() } -->\n                                    <!-- ko if: layoutItemType == LAYOUT_TYPE.ITEM -->\n                                        <!-- ko foreach: { data: renders(), as: '_item' } -->\n                                            <div class=\"item-control\" data-bind=\"let: { _item: _item }\">\n                                                <div data-bind=\"ntsFormLabel: { \n                                                    text: _item.itemName || '',\n                                                    cssClass: cssClass,\n                                                    required: _item.required,\n                                                    constraint: _item.constraint }\" class=\"limited-label\"></div>\n                \n                                                <!-- ko if: _item.dispType == DISP_TYPE.SINGLE -->\n                                                    <!-- ko template: { data: _item, name: 'ctr_template' } --><!-- /ko -->\n                                                <!-- /ko -->\n        \n                                                <!-- ko if: _item.dispType == DISP_TYPE.SET_INLINE -->\n                                                    <!-- ko template: { data: _item.childs[0], name: 'ctr_template' } --><!-- /ko -->\n                                                    <span class=\"value-text readonly set-item-sperator\" data-bind=\"text: text('CPS001_89')\"></span>\n                                                    <!-- ko template: { data: _item.childs[1], name: 'ctr_template' } --><!-- /ko -->\n                                                <!-- /ko -->\n                \n                                                <!-- ko if: [\n                                                                DISP_TYPE.SET_MULTILINE, \n                                                                DISP_TYPE.SET_MULTILINE_W_RADIO,\n                                                                DISP_TYPE.SET_MULTILINE_W_TITLE\n                                                            ].indexOf(_item.dispType) > -1 -->\n                                                    <div class=\"set-items\">\n                                                        <!-- ko if: _item.dispType == DISP_TYPE.SET_MULTILINE -->\n                                                            <div class=\"set-group\"></div>\n                                                        <!-- /ko -->\n            \n                                                        <!-- ko ifnot: _item.dispType == DISP_TYPE.SET_MULTILINE_W_TITLE -->\n                                                            <!-- ko foreach: { data: _item.childs, as: '_sitem' } -->\n                                                                <div class=\"set-group\">\n                                                                    <span class=\"child-label\" data-bind=\"text: _sitem.itemName\"></span>\n                                                                    <!-- ko if: _sitem.dispType == DISP_TYPE.SINGLE -->\n                                                                        <!-- ko template: { data: _sitem, name: 'ctr_template' } --><!-- /ko -->\n                                                                    <!-- /ko -->\n                    \n                                                                    <!-- ko if: _sitem.dispType == DISP_TYPE.SET_INLINE -->\n                                                                        <!-- ko template: { data: _sitem.childs[0], name: 'ctr_template' } --><!-- /ko -->\n                                                                        <span class=\"value-text readonly set-item-sperator\" data-bind=\"text: text('CPS001_89')\"></span>\n                                                                        <!-- ko template: { data: _sitem.childs[1], name: 'ctr_template' } --><!-- /ko -->\n                                                                    <!-- /ko -->\n                                                                </div>\n                                                            <!-- /ko -->\n                                                        <!-- /ko -->\n            \n                                                        <!-- ko if: _item.dispType == DISP_TYPE.SET_MULTILINE_W_TITLE -->\n                                                            <div class=\"set-group math-title\" data-bind=\"text: text('CPS001_114')\"></div>\n                                                            <!-- ko foreach: { data: _item.childs, as: '_sitem' } -->\n                                                                <div class=\"set-group\">\n                                                                    <div data-bind=\"ntsFormLabel: { \n                                                                            text: _sitem.itemName,\n                                                                            cssClass: cssClass,\n                                                                            required: _sitem.required \n                                                                        }\" class=\"limited-label\"></div>\n                                                                    <!-- ko if: _sitem.dispType == DISP_TYPE.SINGLE -->\n                                                                        <div class=\"childs-row\" data-bind=\"template: { data: _sitem, name: 'ctr_template' }\"></div>\n                                                                    <!-- /ko -->\n                    \n                                                                    <!-- ko if: _sitem.dispType == DISP_TYPE.SET_INLINE -->\n                                                                        <!-- ko foreach: {\n                                                                                data: _(_sitem.childs).map(function(v, i) { \n                                                                                    return { \n                                                                                        i: Math.floor(i / 2),\n                                                                                        v: v\n                                                                                    }\n                                                                                })\n                                                                                .groupBy(function(x) { return x.i; })\n                                                                                .map(function(x) {  \n                                                                                    return x.map(function(k) { \n                                                                                        return k.v;\n                                                                                    }); \n                                                                                })\n                                                                                .value(), as: '_group' } -->\n                                                                            <div class=\"childs-row\">\n                                                                                <!-- ko foreach: { data: _group, as: 'young' } -->\n                                                                                    <!-- ko if: young.title -->\n                                                                                        <span class=\"child-label\" data-bind=\"text: young.itemName\"></span>\n                                                                                    <!-- /ko -->\n                                                                                    <!-- ko template: { data: young, name: 'ctr_template' } --><!-- /ko -->\n                                                                                <!-- /ko -->\n                                                                            </div>\n                                                                        <!-- /ko -->\n                                                                    <!-- /ko -->\n                                                                </div>\n                                                            <!-- /ko -->\n                                                        <!-- /ko -->\n                                                    </div>\n                                                <!-- /ko -->\n                \n                                                <!-- ko if: _item.dispType == DISP_TYPE.SET_TABLE -->\n                                                    <div class=\"set-table-items\" data-bind=\"template: { data: _item.childs, name: 'set_table_template' }\"></div>\n                                                <!-- /ko -->\n                                            </div>\n                                        <!-- /ko -->\n                                    <!-- /ko -->\n    \n                                    <!-- ko if: layoutItemType == LAYOUT_TYPE.LIST -->\n                                        <div class=\"item-controls\">\n                                            <div data-bind=\"ntsFormLabel: { required: false, text: className || '' }\" class=\"limited-label\"></div>\n                                            <!-- ko if: ko.toJS($show) -->\n                                            <div class=\"table-container header-1rows\" data-bind=\"let: {\n                                                        __lft: ko.observable(0),\n                                                        __flft: ko.observable(0)\n                                                    }\">\n                                                <div class=\"table-scroll\" data-bind=\"ntsProp: {\n                                                            left: __lft,\n                                                            scrollDown: 'tbody>tr',\n                                                            maxHeight: {\n                                                                byChild: 'tbody>tr',\n                                                                length: 5\n                                                            }\n                                                        }\">\n                                                    <table>\n                                                        <thead>\n                                                            <tr>\n                                                                <th data-bind=\"ntsProp: { left: __flft }\">\n                                                                    <div data-bind=\"style: { 'margin-left': (__flft() - __lft()) + 'px' }, text: text('CPS001_146')\"></div>\n                                                                </th>\n                                                                <!-- ko foreach: { data: _.first(renders()).items, as: 'header' } -->\n                                                                    <!-- ko let: { __wdt: ko.observable(0) } -->\n                                                                    <th data-bind=\"ntsProp: { width: __wdt }\">\n                                                                        <div data-bind=\"ntsFormLabel: { \n                                                                                text: header.itemName,\n                                                                                required: header.required,\n                                                                                constraint: header.constraint,\n                                                                                inline: true\n                                                                            },\n                                                                            style: {\n                                                                                'width': __wdt() + 'px',\n                                                                                'margin-left': (__flft() - __lft()) + 'px'\n                                                                            }\" class=\"limited-label\"></div>\n                                                                    </th>\n                                                                    <!-- /ko -->\n                                                                <!-- /ko -->\n                                                            </tr>\n                                                        </thead>\n                                                        <tbody data-bind=\"foreach: { data: renders(), as: 'row', afterRender: function(element, data) { let _renders = _.map(ko.toJS(renders), function(m) { return m.recordId; }); if(_.indexOf(_renders, data.recordId) == _renders.length - 1) { let tout = setTimeout(function() { $(element[1]).find('input').unbind('blur'); clearTimeout(tout); }, 100) } } }\">\n                                                            <tr data-bind=\"attr: { 'data-id': row.recordId }, style: {'background-color': ko.toJS(row.checked) ? '#ccc' : '#fff'}\">\n                                                                <td>\n                                                                    <span data-bind=\"ntsCheckBox: { checked: row.checked, enable: row.enable }\"></span>\n                                                                </td>\n                                                                <!-- ko foreach: { data: row.items, as: 'col' } -->\n                                                                <td data-bind=\"template: { data: col, name: 'ctr_template' }\"></td>\n                                                                <!-- /ko -->\n                                                            </tr>\n                                                        </tbody>\n                                                    </table>\n                                                </div>\n                                            </div>\n                                            <!-- /ko -->\n                                        </div>\n                                    <!-- /ko -->\n    \n                                    <!-- ko if: layoutItemType == LAYOUT_TYPE.SEPRL -->\n                                        <div class=\"item-sperator\"><hr /></div>\n                                    <!-- /ko -->\n                                <!-- /ko -->\n                                <span class=\"close-btn\" data-bind=\"click: function($data, event) { ko.bindingHandlers['ntsLayoutControl'].remove($data, event); }\">\u2716</span>\n                            </div>\n                        </div>\n                        <button id=\"cps007_btn_line\"></button>\n                    </div>\n                </div>\n                <script type=\"text/html\" id=\"set_table_template\">\n                    <table>\n                        <thead>\n                            <tr data-bind=\"foreach: { data: $data, as: '_column' }\">\n                                <th data-bind=\"text: _column.itemName\"></th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr data-bind=\"foreach: { data: $data, as: '_column' }\">\n                                <td data-bind=\"template: { \n                                            data: _column,\n                                            name: 'ctr_template'\n                                        }\"></td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </script>\n                <script type=\"text/html\" id=\"ctr_template\">\n                    <!-- ko if: resourceId -->\n                        <button class=\"inline\" data-bind=\"ntsHelpButton: { position: !_index ? 'bottom left' : 'right center', textId: resourceId, textParams: resourceParams }, text: text('\uFF1F')\">\uFF1F</button>\n                    <!-- /ko -->                    \n                    <!-- ko let: {\n                                DATE_TYPE: {\n                                    YYYYMMDD: 1,\n                                    YYYYMM: 2,\n                                    YYYY: 3\n                                },\n                                STRING_TYPE: {\n                                    ANY: 1,\n                                    ANYHALFWIDTH: 2,\n                                    ALPHANUMERIC: 3,\n                                    NUMERIC: 4,\n                                    KANA: 5,\n                                    CARDNO: 6,\n                                    EMPLOYEE_CODE: 7\n                                },\n                                CAT_TYPE: {  \n                                    SINGLE : 1,\n                                    MULTI: 2,\n                                    CONTI: 3, /* continuos history hasn't end date */\n                                    NODUP: 4,\n                                    DUPLI: 5,\n                                    CONTIWED: 6 /* continuos history has end date */\n                                },\n                                ITEM_TYPE: {\n                                    STRING: 1,\n                                    NUMERIC: 2,\n                                    DATE: 3,\n                                    TIME: 4,\n                                    TIMEPOINT: 5,\n                                    SELECTION: 6,\n                                    SEL_RADIO: 7,\n                                    SEL_BUTTON: 8,\n                                    READONLY: 9,\n                                    RELATE_CATEGORY: 10,\n                                    NUMBERIC_BUTTON: 11,\n                                    READONLY_BUTTON: 12\n                                }\n                            } -->\n                        <!-- ko if: item.dataTypeValue == ITEM_TYPE.STRING -->\n                            <!-- ko if: [STRING_TYPE.NUMERIC, STRING_TYPE.CARDNO, STRING_TYPE.EMPLOYEE_CODE].indexOf(item.stringItemType) > -1 || ([STRING_TYPE.ANY, STRING_TYPE.ANYHALFWIDTH, STRING_TYPE.ALPHANUMERIC, STRING_TYPE.KANA].indexOf(item.stringItemType) > -1 && item.stringItemLength <= 80) -->\n                            <input data-bind=\" ntsTextEditor: {\n                                    name: itemName,\n                                    value: value,\n                                    constraint: constraint || nameid,\n                                    required: required,\n                                    option: {\n                                        textmode: 'text'\n                                    },\n                                    enable: editable,\n                                    readonly: readonly,\n                                    immediate: false\n                                }, attr: {\n                                    id: nameid,\n                                    nameid: nameid,\n                                    title: itemName,\n                                    'data-title': itemName,\n                                    'data-code': itemCode,\n                                    'data-category': categoryCode,\n                                    'data-required': required,\n                                    'data-defv': defValue\n                                }, hasFocus: hasFocus\" />                                    \n                            <!-- /ko -->\n                            <!-- ko if: ([STRING_TYPE.ANY, STRING_TYPE.ANYHALFWIDTH, STRING_TYPE.ALPHANUMERIC, STRING_TYPE.KANA].indexOf(item.stringItemType) == -1 && item.stringItemLength >= 40) || ([STRING_TYPE.ANY, STRING_TYPE.ANYHALFWIDTH, STRING_TYPE.ALPHANUMERIC, STRING_TYPE.KANA].indexOf(item.stringItemType) > -1 && item.stringItemLength > 80) -->\n                            <textarea data-bind=\"ntsMultilineEditor: {\n                                    name: itemName,\n                                    value: value,\n                                    constraint: constraint || nameid,\n                                    required: required,\n                                    option: {\n                                        textmode: 'text'\n                                    },\n                                    enable: editable,\n                                    readonly: readonly,\n                                    immediate: false \n                                }, attr: { \n                                    id: nameid, \n                                    nameid: nameid,\n                                    title: itemName,\n                                    'data-title': itemName,\n                                    'data-code': itemCode,\n                                    'data-category': categoryCode,\n                                    'data-required': required,\n                                    'data-defv': defValue\n                                }, hasFocus: hasFocus\" />\n                            <!-- /ko -->\n                        <!-- /ko -->\n                        <!-- ko if: item.dataTypeValue == ITEM_TYPE.NUMERIC -->\n                        <input data-bind=\"ntsNumberEditor: { \n                                    name: itemName,\n                                    value: value,\n                                    constraint: constraint || nameid,\n                                    required: required,\n                                    option: {\n                                        textalign: 'left',\n                                        decimallength: Number(item.decimalPart),\n                                        grouplength: item.numericItemAmount && 3\n                                    },\n                                    enable: editable,\n                                    readonly: readonly\n                                }, attr: {\n                                    id: nameid, \n                                    nameid: nameid,\n                                    title: itemName,\n                                    'data-title': itemName,\n                                    'data-code': itemCode,\n                                    'data-category': categoryCode,\n                                    'data-required': required,\n                                    'data-defv': defValue\n                                }, hasFocus: hasFocus\" />\n                        <!-- /ko -->\n                        <!-- ko if: item.dataTypeValue == ITEM_TYPE.DATE -->\n                        <!-- ko if: index != 2 -->\n                        <div data-bind=\"ntsDatePicker: {\n                                name: itemName,\n                                value: value,\n                                type: item.dateItemType == DATE_TYPE.YYYYMMDD ? 'date' : (item.dateItemType == DATE_TYPE.YYYYMM ? 'yearmonth' : 'year'),\n                                startDate: startDate,\n                                endDate: endDate,\n                                constraint: constraint || nameid,\n                                dateFormat: item.dateItemType == DATE_TYPE.YYYYMMDD ? 'YYYY/MM/DD' : (item.dateItemType == DATE_TYPE.YYYYMM ? 'YYYY/MM' : 'YYYY'),\n                                enable: editable,\n                                readonly: readonly,\n                                required: required\n                            }, attr: { \n                                id: nameid, \n                                nameid: nameid,\n                                title: itemName,\n                                'data-title': itemName,\n                                'data-code': itemCode,\n                                'data-category': categoryCode,\n                                'data-required': required,\n                                'data-defv': defValue\n                            }, hasFocus: hasFocus\"></div>\n                        <!-- /ko -->\n                        <!-- ko if: index == 2 -->\n                        <!-- ko if: typeof ctgType !== 'undefined' -->\n                            <!-- ko if: [CAT_TYPE.CONTI].indexOf(ctgType) > -1 -->\n                            <div class=\"value-text readonly\" data-bind=\"text: value, attr: { title: itemName}\"></div>\n                            <!-- /ko -->\n                            <!-- ko if: [CAT_TYPE.CONTI].indexOf(ctgType) == -1 -->\n                            <div data-bind=\"ntsDatePicker: {\n                                    name: itemName,\n                                    value: value,\n                                    type: item.dateItemType == DATE_TYPE.YYYYMMDD ? 'date' : (item.dateItemType == DATE_TYPE.YYYYMM ? 'yearmonth' : 'year'),\n                                    startDate: startDate,\n                                    endDate: endDate,\n                                    constraint: constraint || nameid,\n                                    dateFormat: item.dateItemType == DATE_TYPE.YYYYMMDD ? 'YYYY/MM/DD' : (item.dateItemType == DATE_TYPE.YYYYMM ? 'YYYY/MM' : 'YYYY'),\n                                    enable: editable,\n                                    readonly: readonly,\n                                    required: required\n                                }, attr: { \n                                    id: nameid, \n                                    nameid: nameid,\n                                    title: itemName,\n                                    'data-title': itemName,\n                                    'data-code': itemCode,\n                                    'data-category': categoryCode,\n                                    'data-required': required,\n                                    'data-defv': defValue\n                                }, hasFocus: hasFocus\"></div>\n                            <!-- /ko -->\n                        <!-- /ko -->\n                        <!-- ko if: typeof ctgType === 'undefined' -->\n                            <div data-bind=\"ntsDatePicker: {\n                                    name: itemName,\n                                    value: value,\n                                    type: item.dateItemType == DATE_TYPE.YYYYMMDD ? 'date' : (item.dateItemType == DATE_TYPE.YYYYMM ? 'yearmonth' : 'year'),\n                                    startDate: startDate,\n                                    endDate: endDate,\n                                    constraint: constraint || nameid,\n                                    dateFormat: item.dateItemType == DATE_TYPE.YYYYMMDD ? 'YYYY/MM/DD' : (item.dateItemType == DATE_TYPE.YYYYMM ? 'YYYY/MM' : 'YYYY'),\n                                    enable: editable,\n                                    readonly: readonly,\n                                    required: required\n                                }, attr: { \n                                    id: nameid, \n                                    nameid: nameid,\n                                    title: itemName,\n                                    'data-title': itemName,\n                                    'data-code': itemCode,\n                                    'data-category': categoryCode,\n                                    'data-required': required,\n                                    'data-defv': defValue\n                                }, hasFocus: hasFocus\"></div>\n                        <!-- /ko -->\n                        <!-- /ko -->\n                        <!-- /ko -->\n                        <!-- ko if: item.dataTypeValue == ITEM_TYPE.TIME -->\n                        <input data-bind=\"ntsTimeEditor: {\n                                    name: itemName,\n                                    value: value,\n                                    constraint: constraint || nameid,\n                                    required: required,\n                                    inputFormat: 'time',\n                                    enable: editable,\n                                    mode: 'time',\n                                    readonly: readonly\n                                }, attr: {\n                                    id: nameid, \n                                    nameid: nameid,\n                                    title: itemName,\n                                    'data-title': itemName,\n                                    'data-code': itemCode,\n                                    'data-category': categoryCode,\n                                    'data-required': required,\n                                    'data-defv': defValue\n                                }, hasFocus: hasFocus\" />\n                        <!-- /ko -->\n                        <!-- ko if: item.dataTypeValue == ITEM_TYPE.TIMEPOINT -->\n                        <input data-bind=\"ntsTimeWithDayEditor: { \n                                    name: itemName,\n                                    constraint: constraint || nameid,\n                                    value: value,\n                                    enable: editable, \n                                    readonly: readonly,\n                                    required: required\n                                }, attr: {\n                                    id: nameid, \n                                    nameid: nameid,\n                                    title: itemName,\n                                    'data-title': itemName,\n                                    'data-code': itemCode,\n                                    'data-category': categoryCode,\n                                    'data-required': required,\n                                    'data-defv': defValue\n                                }, hasFocus: hasFocus\" />\n                        <!-- /ko -->\n                        <!-- ko if: item.dataTypeValue == ITEM_TYPE.SELECTION -->\n                        <!-- ko if: location.href.indexOf('cps/007') > -1 || location.href.indexOf('cps/008') > -1 -->\n                        <div style=\"width: 200px;\" class=\"ui-igcombo-wrapper ui-igCombo-disabled ui-state-disabled ntsControl\">\n                            <div class=\"ui-igcombo ui-widget ui-state-default ui-corner-all ui-unselectable\" unselectable=\"on\" style=\"overflow: hidden; position: relative;\">\n                                <div class=\"ui-igcombo-button ui-state-default ui-unselectable ui-igcombo-button-ltr ui-corner-right\" style=\"float: none; width: 100%; border: 0px; padding: 0px; position: absolute; box-sizing: border-box; background-color: transparent;\">\n                                    <div class=\"ui-igcombo-buttonicon\" style=\"right: 0px; font-size: 0.85rem; top: 0px; bottom: 0px; display: block; background-color: rgb(236, 236, 236); width: 30px; text-align: center; line-height: 30px; margin: 0px; border-left: 1px solid rgb(204, 204, 204);\">\u25BC</div>\n                                </div>\n                            </div>\n                        </div>\n                        <!-- /ko -->\n                        <!-- ko if: location.href.indexOf('cps/001') > -1 || location.href.indexOf('cps/002') > -1 -->\n                        <div data-bind=\"ntsComboBox: {\n                                    width: '200px',\n                                    name: itemName,\n                                    value: value,\n                                    options: lstComboBoxValue,\n                                    optionsText: 'optionText',\n                                    optionsValue: 'optionValue',\n                                    editable: true,\n                                    enable: editable,\n                                    required: required,\n                                    visibleItemsCount: 5,\n                                    selectFirstIfNull: false,\n                                    dropDownAttachedToBody: true,\n                                    columns: [{ prop: 'optionText', length: _.max(ko.toJS(lstComboBoxValue).map(function(v) {return v['optionText'].length; }))}]\n                                }, attr: {\n                                    id: nameid,\n                                    nameid: nameid,\n                                    title: itemName,\n                                    'data-title': itemName,\n                                    'data-code': itemCode,\n                                    'data-category': categoryCode,\n                                    'data-required': required,\n                                    'data-defv': defValue\n                                }, hasFocus: hasFocus\", style='width: 200px; min-width: 200px; max-width: 580px;'></div>\n                        <!-- /ko -->\n                        <!-- /ko -->\n                        <!-- ko if: item.dataTypeValue == ITEM_TYPE.SEL_RADIO -->\n                            <div data-bind=\"ntsRadioBoxGroup: {\n                                name: itemName,\n                                value: value,\n                                options: lstComboBoxValue,\n                                optionsText: 'optionText',\n                                optionsValue: 'optionValue',\n                                enable: editable\n                            }, attr: {\n                                id: nameid,\n                                'data-code': itemCode,\n                                'data-category': categoryCode,\n                                'data-required': required,\n                                'data-defv': defValue,\n                                title: itemName,\n                                'data-title': itemName,\n                            }, hasFocus: hasFocus\"></div>\n                        <!-- /ko -->\n                        <!-- ko if: item.dataTypeValue == ITEM_TYPE.SEL_BUTTON -->\n                            <button data-bind=\"attr: { \n                                id: nameid,\n                                title: itemName,\n                                'data-title': itemName,\n                                'data-code': itemCode,\n                                'data-category': categoryCode,\n                                'data-required': required,\n                                'data-defv': defValue\n                             }, text: text('CPS001_106'), enable: editable, hasFocus: hasFocus\">\u9078\u629E</button>\n                            <label class=\"value-text readonly\" data-bind=\"html: textValue\"></label>\n                        <!-- /ko -->\n                        <!-- ko if: item.dataTypeValue == ITEM_TYPE.READONLY -->\n                            <label class=\"value-text readonly\" data-bind=\"\n                                text: value,\n                                attr: { \n                                    id: nameid, \n                                    title: itemName,\n                                    'data-title': itemName,\n                                    'data-code': itemCode,\n                                    'data-category': categoryCode,\n                                    'data-required': required,\n                                    'data-defv': defValue\n                                 }\"></label>\n                        <!-- /ko -->\n                        <!-- ko if: item.dataTypeValue == ITEM_TYPE.RELATE_CATEGORY -->\n                            <div class=\"relate-button\">\n                                <label class=\"value-text readonly\" data-bind=\"text: value\"></label>\n                                <button data-bind=\"attr: { \n                                    id: nameid, \n                                    title: itemName,\n                                    'data-title': itemName,\n                                    'data-code': itemCode,\n                                    'data-category': categoryCode,\n                                    'data-required': required,\n                                    'data-defv': defValue\n                                 }, text: text('CPS001_127'), enable: editable, hasFocus: hasFocus\">\u9078\u629E</button>\n                            </div>\n                        <!-- /ko -->\n                        <!-- ko if: item.dataTypeValue == ITEM_TYPE.NUMBERIC_BUTTON -->\n                            <div class=\"numeric-button\">\n                                <input data-bind=\"ntsNumberEditor: { \n                                            name: itemName,\n                                            value: value,\n                                            constraint: constraint || nameid,\n                                            required: required,\n                                            option: {\n                                                textalign: 'left',\n                                                decimallength: Number(item.decimalPart),\n                                                grouplength: item.numericItemAmount && 3\n                                            },\n                                            enable: editable() && numberedit(),\n                                            readonly: readonly\n                                        }, attr: {\n                                            id: nameid, \n                                            nameid: nameid,\n                                            title: itemName,\n                                            'data-title': itemName,\n                                            'data-code': itemCode,\n                                            'data-category': categoryCode,\n                                            'data-required': required,\n                                            'data-defv': defValue\n                                        }, hasFocus: hasFocus\" />                            \n                                <button data-bind=\"attr: { \n                                    id: nameid, \n                                    title: itemName,\n                                    'data-title': itemName,\n                                    'data-code': itemCode,\n                                    'data-category': categoryCode,\n                                    'data-required': required,\n                                    'data-defv': defValue\n                                 }, text: text('CPS001_127'), enable: editable\" class=\"hidden\">\u9078\u629E</button>\n                            </div>\n                        <!-- /ko -->\n                        <!-- ko if: item.dataTypeValue == ITEM_TYPE.READONLY_BUTTON -->\n                            <div class=\"readonly-button\">\n                                <label class=\"value-text readonly\" class=\"value-text\" data-bind=\"text: value\"></label>\n                                <button data-bind=\"attr: { \n                                    id: nameid, \n                                    title: itemName,\n                                    'data-title': itemName,\n                                    'data-code': itemCode,\n                                    'data-category': categoryCode,\n                                    'data-required': required,\n                                    'data-defv': defValue\n                                 }, text: text('CPS001_127'), enable: editable, hasFocus: hasFocus\" class=\"hidden\">\u9078\u629E</button>\n                            </div>\n                        <!-- /ko -->\n                    <!-- /ko -->\n                </script>";
                this.services = {
                    getCat: function (cid) { return ajax("ctx/pereg/person/info/category/find/companyby/".concat(cid)); },
                    getCats: function () { return ajax("ctx/pereg/person/info/category/findby/companyv2/".concat(location.href.indexOf('cps/007') > -1)); },
                    getGroups: function () { return ajax("ctx/pereg/person/groupitem/getAll"); },
                    getItemByCat: function (cid) { return ajax("ctx/pereg/person/info/ctgItem/layout/findby/categoryId/".concat(cid)); },
                    getItemByGroup: function (gid) { return ajax("ctx/pereg/person/groupitem/getAllItemDf/".concat(gid)); },
                    getItemByGroups: function (gids) { return ajax("ctx/pereg/person/groupitem/findby/listgroupId", gids); },
                    getItemsById: function (id) { return ajax("ctx/pereg/person/info/ctgItem/layout/findby/itemId/".concat(id)); },
                    getItemsByIds: function (ids) { return ajax("ctx/pereg/person/info/ctgItem/layout/findby/listItemIdv2", ids); }
                };
                this.remove = function (item, sender) {
                    var target = $(sender.target), layout = target.parents('.layout-control'), opts = layout.data('options'), ctrls = layout.data('controls'), clst = $(ctrls.sortable).scrollTop();
                    opts.sortable.removeItem(item, false);
                    var tout = setTimeout(function () {
                        $(ctrls.sortable).scrollTop(clst);
                        clearInterval(tout);
                    }, 0);
                };
                this._constructor = function (element, valueAccessor) {
                    var vm = new ko.ViewModel();
                    var self = _this, services = self.services, $element = $(element), opts = {
                        callback: function () {
                        },
                        radios: {
                            enable: ko.observable(true),
                            value: ko.observable(0),
                            options: ko.observableArray([{
                                    id: CAT_OR_GROUP.CATEGORY,
                                    name: text('CPS007_6'),
                                    enable: ko.observable(true)
                                }, {
                                    id: CAT_OR_GROUP.GROUP,
                                    name: text('CPS007_7'),
                                    enable: ko.observable(true)
                                }]),
                            optionsValue: 'id',
                            optionsText: 'name'
                        },
                        combobox: {
                            enable: ko.observable(true),
                            editable: ko.observable(false),
                            visibleItemsCount: 10,
                            value: ko.observable(''),
                            options: ko.observableArray([]),
                            optionsValue: 'id',
                            optionsText: 'categoryName',
                            columns: [
                                { prop: 'categoryCode', 'toggle': 'hidden', length: 20 },
                                { prop: 'categoryName', length: 20 }
                            ]
                        },
                        searchbox: {
                            mode: 'listbox',
                            comId: 'cps007_lst_control',
                            items: ko.observableArray([]),
                            selected: ko.observableArray([]),
                            targetKey: 'id',
                            selectedKey: 'id',
                            fields: ['itemName'],
                            placeHolder: '名称で検索・・・'
                        },
                        listbox: {
                            enable: ko.observable(true),
                            multiple: ko.observable(true),
                            rows: 10,
                            options: ko.observableArray([]),
                            value: ko.observableArray([]),
                            optionsValue: 'id',
                            optionsText: 'itemName',
                            columns: [{ key: 'itemName', headerText: text('CPS007_9'), length: 15 }]
                        },
                        sortable: {
                            data: ko.observableArray([]),
                            outData: ko.observableArray([]),
                            isEnabled: ko.observable(true),
                            isEditable: ko.observable(0),
                            showColor: ko.observable(false),
                            beforeMove: function (data, evt, ui) {
                                var sindex = data.sourceIndex, tindex = data.targetIndex, direct = sindex > tindex, item = data.item, source = ko.unwrap(opts.sortable.data);
                                // cancel drop if two line is sibling
                                if (item.layoutItemType == IT_CLA_TYPE.SPER) {
                                    var front = source[tindex - 1] || { layoutID: '-1', layoutItemType: -1 }, replc = source[tindex] || { layoutID: '-1', layoutItemType: -1 }, next = source[tindex + 1] || { layoutID: '-1', layoutItemType: -1 };
                                    if (!direct) { // drag from top to below
                                        if ([next.layoutItemType, replc.layoutItemType].indexOf(IT_CLA_TYPE.SPER) > -1) {
                                            data.cancelDrop = true;
                                        }
                                    }
                                    else { // drag from below to top
                                        if ([replc.layoutItemType, front.layoutItemType].indexOf(IT_CLA_TYPE.SPER) > -1) {
                                            data.cancelDrop = true;
                                        }
                                    }
                                }
                                else { // if item is list or object
                                    var front = source[sindex - 1] || { layoutID: '-1', layoutItemType: -1 }, next = source[sindex + 1] || { layoutID: '-1', layoutItemType: -1 };
                                    if (front.layoutItemType == IT_CLA_TYPE.SPER && next.layoutItemType == IT_CLA_TYPE.SPER) {
                                        data.cancelDrop = true;
                                    }
                                }
                            },
                            removeItem: function (data, byItemId) {
                                var items = _(ko.toJS(opts.sortable.data))
                                    .map(function (x) { return _.omit(x, "items"); })
                                    .value();
                                if (!byItemId) { // remove item by classification id (virtual id)
                                    items = _.filter(items, function (x) { return x.layoutID != data.layoutID; });
                                }
                                else if (data.listItemDf) { // remove item by item definition id
                                    items = _.filter(items, function (x) { return x.layoutItemType == IT_CLA_TYPE.SPER || (x.listItemDf && x.listItemDf[0].id != data.listItemDf[0].id); });
                                }
                                var maps = _(items).map(function (x, i) { return (x.layoutItemType == IT_CLA_TYPE.SPER) ? i : -1; })
                                    .filter(function (x) { return x != -1; })
                                    .orderBy(function (x) { return x; }).value();
                                // remove next line if two line is sibling
                                _.each(maps, function (x, i) {
                                    if (maps[i + 1] == x + 1) {
                                        _.remove(items, function (m) {
                                            var item = ko.unwrap(items)[maps[i + 1]];
                                            return item && item.layoutItemType == IT_CLA_TYPE.SPER && item.layoutID == m.layoutID;
                                        });
                                    }
                                });
                                opts.sortable.data(items);
                                return opts.sortable;
                            },
                            removeItems: function (data) {
                                if (data && data.length) {
                                    _.each(data, function (x) { return opts.sortable.removeItem(x, true); });
                                }
                            },
                            findExist: function (ids) {
                                if (!ids || !ids.length) {
                                    return [];
                                }
                                var items = opts.sortable.data();
                                // return items if it's exist in list
                                return _(items)
                                    .map(function (x) { return x.listItemDf; })
                                    .flatten()
                                    .filter(function (x) { return x && ids.indexOf(x.id) > -1; })
                                    .value();
                            },
                            pushItem: function (data) {
                                if (data.layoutItemType == IT_CLA_TYPE.SPER) {
                                    // add line to list sortable
                                    var last = _.last(ko.unwrap(opts.sortable.data));
                                    if (last && last.layoutItemType != IT_CLA_TYPE.SPER) {
                                        opts.sortable.data.push(data);
                                    }
                                }
                            },
                            pushItems: function (defs) {
                                var is_new = location.href.indexOf('/view/cps/007') > -1, relates = _(defs).map(function (x) { return ((x.itemTypeState || {}).dataTypeState || {}).relatedCtgCode; })
                                    .filter(function (x) { return x; })
                                    .value();
                                var items1 = _(ko.toJS(opts.sortable.data))
                                    .map(function (x) {
                                    if (x.listItemDf && !Array.isArray(x.listItemDf)) {
                                        x.listItemDf = Object.keys(x.listItemDf).map(function (key) { return x.listItemDf[key]; });
                                    }
                                    return _.omit(x, "items");
                                })
                                    .value(), items2 = _(defs)
                                    .filter(function (def) {
                                    return !def.itemParentCode
                                        && relates.indexOf(def.perInfoCtgId) == -1;
                                })
                                    .map(function (def) {
                                    var is_relate = ((def.itemTypeState || {}).dataTypeState || {}).relatedCtgCode, new_mode = !!is_relate && !!is_new, dispOrder = ko.toJS(opts.sortable.data).length, item = {
                                        layoutID: random(),
                                        dispOrder: -1,
                                        personInfoCategoryID: undefined,
                                        layoutItemType: IT_CLA_TYPE.ITEM,
                                        listItemDf: []
                                    };
                                    def.dispOrder = dispOrder + 1;
                                    item.listItemDf = !new_mode ? [def] : _(defs).filter(function (f) { return f.perInfoCtgId == is_relate; }).value();
                                    item.className = !new_mode ? def.itemName : undefined;
                                    item.personInfoCategoryID = def.perInfoCtgId;
                                    // setitem
                                    if ([ITEM_TYPE.SET, ITEM_TYPE.SET_TABLE].indexOf(def.itemTypeState.itemType) > -1) {
                                        var childs = _(defs)
                                            .filter(function (x) { return x.itemParentCode == def.itemCode; })
                                            .orderBy(function (x) { return x.dispOrder; })
                                            .value();
                                        item.listItemDf = _.concat(item.listItemDf, childs);
                                        _.each(childs, function (c) {
                                            // setitem
                                            if ([ITEM_TYPE.SET, ITEM_TYPE.SET_TABLE].indexOf(c.itemTypeState.itemType) > -1) {
                                                var newchilds = _(defs)
                                                    .filter(function (x) { return x.itemParentCode == c.itemCode; })
                                                    .orderBy(function (x) { return x.dispOrder; })
                                                    .value();
                                                item.listItemDf = _.concat(item.listItemDf, newchilds);
                                            }
                                        });
                                    }
                                    if (item.listItemDf[0] && item.personInfoCategoryID != item.listItemDf[0].perInfoCtgId) {
                                        item.personInfoCategoryID = item.listItemDf[0].perInfoCtgId;
                                    }
                                    if (item.listItemDf[0] && item.personInfoCategoryID != item.listItemDf[0].perInfoCtgId) {
                                        item.personInfoCategoryID = item.listItemDf[0].perInfoCtgId;
                                    }
                                    return item;
                                })
                                    .filter(function (x) { return x.listItemDf && x.listItemDf.length; })
                                    .value();
                                opts.sortable.data(_.concat(items1, items2));
                                scrollDown();
                            },
                            pushAllItems: function (defs, groupMode) {
                                var self = _this, services = self.services;
                                if (!defs || !defs.length) {
                                    return;
                                }
                                // remove all item if it's cancelled by user
                                defs = _.filter(defs, function (x) { return !x.isAbolition; });
                                // find duplicate items
                                var dups = opts.sortable.findExist(defs.map(function (x) { return x.id; }));
                                if (groupMode) {
                                    if (dups && dups.length) {
                                        // 情報メッセージ（#Msg_204#,既に配置されている項目名,選択したグループ名）を表示する
                                        // Show Msg_204 if itemdefinition is exist
                                        var groupNames = _.uniqBy(defs, function (x) { return x.fieldGroupName; }).map(function (x) { return x.fieldGroupName; });
                                        var itemNames = dups.map(function (x) { return x.itemName; });
                                        info({
                                            messageId: 'Msg_204',
                                            messageParams: [itemNames.join("、"), groupNames.join("、")]
                                        })
                                            .then(function () {
                                            opts.sortable.removeItems(dups.map(function (x) {
                                                return {
                                                    layoutID: random(),
                                                    dispOrder: -1,
                                                    personInfoCategoryID: undefined,
                                                    layoutItemType: IT_CLA_TYPE.ITEM,
                                                    listItemDf: [x]
                                                };
                                            }));
                                            opts.sortable.pushItems(defs);
                                        });
                                    }
                                    else {
                                        opts.sortable.pushItems(defs);
                                    }
                                }
                                else {
                                    var dupids_1 = dups.map(function (x) { return x.id; }), nodups = defs.filter(function (x) { return dupids_1.indexOf(x.id) == -1; });
                                    if (dupids_1 && dupids_1.length) {
                                        // 画面項目「選択可能項目一覧」で選択している項目が既に画面に配置されている場合
                                        // When the item selected in the screen item "selectable item list" has already been arranged on the screen
                                        alert({
                                            messageId: 'Msg_202',
                                            messageParams: dups.map(function (x) { return x.itemName; })
                                        });
                                    }
                                    if (dups.length == 1 && ((dups[0].itemTypeState || {}).dataTypeState || {}).dataTypeValue == ITEM_SINGLE_TYPE.RELATE_CATEGORY) {
                                        return;
                                    }
                                    opts.sortable.pushItems(nodups);
                                }
                                // remove all item selected in list box
                                opts.listbox.value.removeAll();
                            }
                        }
                    }, ctrls = {
                        label: undefined,
                        radios: undefined,
                        combobox: undefined,
                        searchbox: undefined,
                        listbox: undefined,
                        button: undefined,
                        sortable: undefined,
                        line: undefined,
                    }, access = valueAccessor(), $editable = ko.toJS(valueAccessor().editAble), editable = function (x) {
                        if (typeof x == 'number') {
                            opts.sortable.isEditable(x);
                            if (x == 1) {
                                opts.sortable.isEnabled(true);
                            }
                            else {
                                opts.sortable.isEnabled(false);
                            }
                            if (x == 2) {
                                $element.addClass("inputable");
                            }
                        }
                        else {
                            opts.sortable.isEditable(0);
                            if (x) {
                                opts.sortable.isEnabled(true);
                            }
                            else {
                                opts.sortable.isEnabled(false);
                            }
                        }
                    }, exceptConsts = [], 
                    // render primative value to viewContext
                    primitiveConst = function (x) {
                        var dts = x.item, constraint = {
                            itemName: x.itemName,
                            itemCode: x.itemDefId.replace(/[-_]/g, ""),
                            required: x.required // !!x.isRequired
                        };
                        if (dts) {
                            switch (dts.dataTypeValue) {
                                default:
                                case ITEM_SINGLE_TYPE.STRING:
                                    constraint.valueType = "String";
                                    constraint.maxLength = dts.stringItemLength || dts.maxLength;
                                    constraint.stringExpression = /(?:)/;
                                    switch (dts.stringItemType) {
                                        default:
                                        case ITEM_STRING_TYPE.ANY:
                                            constraint.charType = 'Any';
                                            break;
                                        case ITEM_STRING_TYPE.CARDNO:
                                            constraint.itemCode = 'StampNumber';
                                            constraint.charType = 'AnyHalfWidth';
                                            constraint.stringExpression = /^[a-zA-Z0-9\s"#$%&(~|{}\[\]@:`*+?;\\/_\-><)]{1,20}$/;
                                            break;
                                        case ITEM_STRING_TYPE.EMPLOYEE_CODE:
                                            constraint.itemCode = 'EmployeeCode';
                                            constraint.charType = 'AnyHalfWidth';
                                            break;
                                        case ITEM_STRING_TYPE.ANYHALFWIDTH:
                                            constraint.charType = 'AnyHalfWidth';
                                            break;
                                        case ITEM_STRING_TYPE.ALPHANUMERIC:
                                            constraint.charType = 'AlphaNumeric';
                                            break;
                                        case ITEM_STRING_TYPE.NUMERIC:
                                            constraint.charType = 'Numeric';
                                            break;
                                        case ITEM_STRING_TYPE.KANA:
                                            constraint.charType = 'Kana';
                                            break;
                                    }
                                    break;
                                case ITEM_SINGLE_TYPE.NUMERIC:
                                case ITEM_SINGLE_TYPE.NUMBERIC_BUTTON:
                                    constraint.charType = 'Numeric';
                                    if (dts.decimalPart == 0) {
                                        constraint.valueType = "Integer";
                                    }
                                    else {
                                        constraint.valueType = "Decimal";
                                        constraint.mantissaMaxLength = dts.decimalPart;
                                    }
                                    var max = (Math.pow(10, dts.integerPart) - Math.pow(10, -(dts.decimalPart || 0)));
                                    constraint.min = dts.numericItemMin || (!!dts.numberItemMinus ? -max : 0);
                                    constraint.max = dts.numericItemMax || max;
                                    break;
                                case ITEM_SINGLE_TYPE.DATE:
                                    constraint.valueType = "Date";
                                    constraint.max = parseTime(dts.max, true).format() || '';
                                    constraint.min = parseTime(dts.min, true).format() || '';
                                    break;
                                case ITEM_SINGLE_TYPE.TIME:
                                    constraint.valueType = "Time";
                                    constraint.max = parseTime(dts.max, true).format();
                                    constraint.min = parseTime(dts.min, true).format();
                                    break;
                                case ITEM_SINGLE_TYPE.TIMEPOINT:
                                    constraint.valueType = "Clock";
                                    constraint.max = parseTimeWidthDay(dts.timePointItemMax).shortText;
                                    constraint.min = parseTimeWidthDay(dts.timePointItemMin).shortText;
                                    break;
                                case ITEM_SINGLE_TYPE.SELECTION:
                                    constraint.valueType = "Selection";
                                    break;
                                case ITEM_SINGLE_TYPE.SEL_RADIO:
                                    constraint.valueType = "Radio";
                                    break;
                                case ITEM_SINGLE_TYPE.SEL_BUTTON:
                                    constraint.valueType = "Button";
                                    break;
                                case ITEM_SINGLE_TYPE.READONLY:
                                    constraint.valueType = "READONLY";
                                    break;
                                case ITEM_SINGLE_TYPE.RELATE_CATEGORY:
                                    constraint.valueType = "RELATE_CATEGORY";
                                    break;
                                case ITEM_SINGLE_TYPE.READONLY_BUTTON:
                                    constraint.valueType = "READONLY_BUTTON";
                                    break;
                            }
                        }
                        return constraint;
                    }, primitiveConsts = function () {
                        var constraints = _(ko.unwrap(opts.sortable.data))
                            .map(function (x) { return _.has(x, "items") && x.items; })
                            .flatten()
                            .flatten()
                            .filter(function (x) { return _.has(x, "item") && !_.isEqual(x.item, {}); })
                            .map(function (x) { return primitiveConst(x); })
                            .filter(function (x) { return exceptConsts.indexOf(x.itemCode) == -1; })
                            .filter(function (x) { return ['EmployeeCode'].indexOf(x.itemCode) == -1; })
                            .value();
                        if (constraints && constraints.length) {
                            exceptConsts = [];
                            writeConstraints(constraints);
                        }
                    }, dateTimeConsts = function () {
                        var range = [
                            ITEM_SINGLE_TYPE.DATE,
                            ITEM_SINGLE_TYPE.TIME,
                            ITEM_SINGLE_TYPE.TIMEPOINT
                        ], controls = _(ko.unwrap(opts.sortable.data))
                            .filter(function (x) { return _.has(x, "items") && !!x.items; })
                            .map(function (x) { return x.items; })
                            .flatten()
                            .flatten()
                            .filter(function (x) { return !!x; })
                            .value();
                        // validate for singe date
                        _(controls)
                            .filter(function (x) {
                            return x.item
                                && x.item.dataTypeValue == ITEM_SINGLE_TYPE.DATE;
                        })
                            .each(function (x) {
                            x.startDate = ko.observable();
                            x.endDate = ko.observable();
                        });
                        if ($editable === 2) {
                            // validate date, time, timepoint range
                            _(controls)
                                .filter(function (x) { return x.type == ITEM_TYPE.SET; })
                                .each(function (x) {
                                var childs = _(controls)
                                    .filter(function (c) { return c.itemParentCode == x.itemCode; })
                                    //.orderBy(c => c)
                                    .value(), is_range = _.filter(childs, function (c) { return c.item && range.indexOf(c.item.dataTypeValue) > -1; });
                                if (childs.length == 2 && childs.length == is_range.length) {
                                    var first_1 = childs[0], second_1 = childs[1], validate = function (prev, next) {
                                        var id1 = '#' + prev.itemDefId.replace(/[-_]/g, ""), id2 = '#' + next.itemDefId.replace(/[-_]/g, "");
                                        var _bind = $(document).data('_nts_bind') || {};
                                        if (!_bind["BLUR_".concat(id1, "_").concat(id2)]) {
                                            _bind["BLUR_".concat(id1, "_").concat(id2)] = true;
                                            $(document).data('_nts_bind', _bind);
                                            $(document).on('blur', "".concat(id1, ", ").concat(id2), function (evt) {
                                                var tout = setTimeout(function () {
                                                    var dom1 = $(id1), dom2 = $(id2), pv = ko.toJS(prev.value), nv = ko.toJS(next.value), tpt = _.isNumber(pv), tnt = _.isNumber(nv);
                                                    if (!tpt && tnt) {
                                                        if (!dom1.is(':disabled') && !dom1.ntsError('hasError')) {
                                                            dom1.ntsError('set', { messageId: "Msg_858" });
                                                        }
                                                    }
                                                    else {
                                                        rmError(dom1, "Msg_858");
                                                    }
                                                    if (tpt && !tnt) {
                                                        if (!dom2.is(':disabled') && !dom2.ntsError('hasError')) {
                                                            dom2.ntsError('set', { messageId: "Msg_858" });
                                                        }
                                                    }
                                                    else {
                                                        rmError(dom2, "Msg_858");
                                                    }
                                                    clearTimeout(tout);
                                                }, 5);
                                            });
                                        }
                                    };
                                    if (first_1.item.dataTypeValue == second_1.item.dataTypeValue) {
                                        switch (first_1.item.dataTypeValue) {
                                            case ITEM_SINGLE_TYPE.DATE:
                                                first_1.startDate = ko.observable();
                                                first_1.endDate = ko.computed({
                                                    read: function () {
                                                        return moment.utc(ko.toJS(second_1.value) || '9999/12/31', "YYYY/MM/DD")
                                                            .toDate();
                                                    },
                                                    disposeWhen: function () { return !second_1.value; }
                                                });
                                                second_1.startDate = ko.computed({
                                                    read: function () {
                                                        return moment.utc(ko.toJS(first_1.value) || '1900/01/01', "YYYY/MM/DD")
                                                            .toDate();
                                                    },
                                                    disposeWhen: function () { return !first_1.value; }
                                                });
                                                second_1.endDate = ko.observable();
                                                break;
                                            case ITEM_SINGLE_TYPE.TIME:
                                                validate(first_1, second_1);
                                                ko.computed({
                                                    read: function () {
                                                        var v = ko.toJS(first_1.value), t = typeof v == 'number', clone = _.cloneDeep(second_1);
                                                        clone.item.min = first_1.value() + 1;
                                                        var primi = primitiveConst(t ? clone : second_1);
                                                        exceptConsts.push(primi.itemCode);
                                                        writeConstraint(primi.itemCode, primi);
                                                    },
                                                    disposeWhen: function () { return !first_1.value; }
                                                });
                                                ko.computed({
                                                    read: function () {
                                                        var v = ko.toJS(second_1.value), t = typeof v == 'number', clone = _.cloneDeep(first_1);
                                                        clone.item.max = second_1.value() - 1;
                                                        var primi = primitiveConst(t ? clone : first_1);
                                                        exceptConsts.push(primi.itemCode);
                                                        writeConstraint(primi.itemCode, primi);
                                                    },
                                                    disposeWhen: function () { return !second_1.value; }
                                                });
                                                break;
                                            case ITEM_SINGLE_TYPE.TIMEPOINT:
                                                validate(first_1, second_1);
                                                ko.computed({
                                                    read: function () {
                                                        var v = ko.toJS(first_1.value), t = typeof v == 'number', clone = _.cloneDeep(second_1);
                                                        clone.item.timePointItemMin = first_1.value() + 1;
                                                        var primi = primitiveConst(t ? clone : second_1);
                                                        exceptConsts.push(primi.itemCode);
                                                        writeConstraint(primi.itemCode, primi);
                                                    },
                                                    disposeWhen: function () { return !first_1.value; }
                                                });
                                                ko.computed({
                                                    read: function () {
                                                        var v = ko.toJS(second_1.value), t = typeof v == 'number', clone = _.cloneDeep(first_1);
                                                        clone.item.timePointItemMax = second_1.value() - 1;
                                                        var primi = primitiveConst(t ? clone : first_1);
                                                        exceptConsts.push(primi.itemCode);
                                                        writeConstraint(primi.itemCode, primi);
                                                    },
                                                    disposeWhen: function () { return !second_1.value; }
                                                });
                                                break;
                                        }
                                    }
                                }
                            });
                        }
                    }, 
                    // define common function for init new item value
                    isStr = function (item) {
                        if (!item) {
                            return false;
                        }
                        switch (item.dataTypeValue) {
                            default:
                                return false;
                            case ITEM_SINGLE_TYPE.STRING:
                            case ITEM_SINGLE_TYPE.SELECTION:
                                return true;
                        }
                    }, modifitem = function (def, item) {
                        var lstItem = [
                            { optionValue: '1', optionText: text('CPS001_100') },
                            { optionValue: '0', optionText: text('CPS001_99') }
                        ];
                        if (!item) {
                            item = {};
                        }
                        // focus flag of control
                        def.hasFocus = ko.observable(false);
                        def.itemCode = _.has(def, "itemCode") && def.itemCode || item.itemCode;
                        def.itemName = _.has(def, "itemName") && def.itemName || item.itemName;
                        def.itemDefId = _.has(def, "itemDefId") && def.itemDefId || item.id;
                        def.required = _.has(def, "required") && def.required || !!item.isRequired;
                        //def.required = _.has(def, "required") ? (ko.isObservable(def.required) ? def.required : ko.observable(def.required)) : ko.observable(!!item.isRequired);
                        def.resourceId = _.has(def, "resourceId") ? ko.isObservable(def.resourceId) ? def.resourceId : ko.observable(def.resourceId) : ko.observable();
                        def.resourceParams = _.has(def, "resourceParams") ? ko.isObservable(def.resourceParams) ? def.resourceParams : ko.observableArray(def.resourceParams) : ko.observableArray();
                        def.itemParentCode = _.has(def, "itemParentCode") && def.itemParentCode || item.itemParentCode;
                        def.categoryCode = _.has(def, "categoryCode") && def.categoryCode || '';
                        def.lstComboBoxValue = _.has(def, "lstComboBoxValue") ? (ko.isObservable(def.lstComboBoxValue) ? def.lstComboBoxValue : ko.observableArray(def.lstComboBoxValue || lstItem)) : ko.observableArray(lstItem);
                        def.hidden = _.has(def, "actionRole") ? def.actionRole == ACTION_ROLE.HIDDEN : true;
                        def.readonly = ko.observable(_.has(def, "actionRole") ? def.actionRole == ACTION_ROLE.VIEW_ONLY : !!opts.sortable.isEnabled());
                        def.editable = ko.observable(_.has(def, "actionRole") ? def.actionRole == ACTION_ROLE.EDIT : !!opts.sortable.isEditable());
                        def.numberedit = ko.observable(true);
                        def.showColor = _.has(def, "showColor") ? (ko.isObservable(def.showColor) ? def.showColor : ko.observable(def.showColor)) :
                            (ko.isObservable(opts.sortable.showColor) ? opts.sortable.showColor : ko.observable(opts.sortable.showColor));
                        def.type = _.has(def, "type") ? def.type : (item.itemTypeState || {}).itemType;
                        def.item = _.has(def, "item") ? def.item : $.extend({}, ((item || {}).itemTypeState || {}).dataTypeState || {});
                        def.value = ko.isObservable(def.value) ? def.value : ko.observable(isStr(def.item) && def.value ? String(def.value) : def.value);
                        def.textValue = ko.observable('');
                        def.defValue = ko.toJS(def.value);
                        ko.computed({
                            read: function () {
                                var editable = ko.toJS(def.editable);
                                if (!editable && $('#' + def.nameid).ntsError('hasError')) {
                                    $('#' + def.nameid).trigger('change');
                                }
                            },
                            disposeWhen: function () { return !def.value; }
                        });
                        if (def.item && [ITEM_SINGLE_TYPE.SELECTION, ITEM_SINGLE_TYPE.SEL_RADIO, ITEM_SINGLE_TYPE.SEL_BUTTON].indexOf(def.item.dataTypeValue) > -1) {
                            var fl = true, val_1 = ko.toJS(def.value), data = ko.toJS(def.lstComboBoxValue), selected = _.find(data, function (f) { return _.isEqual(f.optionValue, val_1); });
                            if (selected) {
                                def.defText = selected.optionText;
                            }
                            ko.computed({
                                read: function () {
                                    var cbv = ko.toJS(def.value);
                                    if (cbv) {
                                        var data_1 = ko.toJS(def.lstComboBoxValue), selected_1 = _.find(data_1, function (f) { return f.optionValue == cbv; });
                                        if (selected_1) {
                                            def.textValue(selected_1.optionText);
                                        }
                                        else {
                                            switch (def.item.referenceType) {
                                                case ITEM_SELECT_TYPE.DESIGNATED_MASTER:
                                                    if (cbv.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
                                                        def.textValue(text('CPS001_107'));
                                                        def.value(undefined);
                                                    }
                                                    else {
                                                        var childData = getShared('childData');
                                                        var childDataKDL001 = getShared('kml001selectedTimes');
                                                        if (childData) {
                                                            // Set name workTime after select workTime in dialog KDL003
                                                            if (childData.selectedWorkTimeCode === cbv) {
                                                                def.textValue(cbv + space_character_JP + childData.selectedWorkTimeName);
                                                            }
                                                            // Set name workTime after select workTime in dialog KDL001
                                                        }
                                                        else if (childDataKDL001 && childDataKDL001.length > 0) {
                                                            if (childDataKDL001[0].selectedWorkTimeCode === cbv) {
                                                                def.textValue(cbv + space_character_JP + childDataKDL001[0].selectedWorkTimeName);
                                                            }
                                                        }
                                                        else {
                                                            // Lấy name workTime trong trường hợp workTime được chọn không được setting ở màn hình KMK017.
                                                            if (def.defValue) {
                                                                if (def.itemCode === 'IS00131' || def.itemCode === 'IS00140' || def.itemCode === 'IS00194' || def.itemCode === 'IS00203' ||
                                                                    def.itemCode === 'IS00212' || def.itemCode === 'IS00221' || def.itemCode === 'IS00230' || def.itemCode === 'IS00239' ||
                                                                    def.itemCode === 'IS00185') {
                                                                    nts.uk.request.ajax('com', 'ctx/pereg/layout/find/nameWorkTime/' + def.defValue).done(function (data) {
                                                                        if (data) {
                                                                            def.textValue(cbv + space_character_JP + data.name);
                                                                        }
                                                                        else {
                                                                            def.textValue(def.defValue + space_character_JP + text('CPS001_107'));
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        }
                                                    }
                                                    break;
                                                case ITEM_SELECT_TYPE.CODE_NAME:
                                                case ITEM_SELECT_TYPE.ENUM:
                                                    def.textValue(text('CPS001_107'));
                                                    def.value(undefined);
                                                    break;
                                            }
                                        }
                                    }
                                    else {
                                        def.textValue('');
                                    }
                                },
                                disposeWhen: function () { return !def.value; }
                            });
                        }
                    }, proc = function (data) {
                        if (!data.item) {
                            return {
                                text: undefined,
                                value: !_.isNil(data.value) ? String(data.value) : undefined,
                                defText: undefined,
                                defValue: !_.isNil(data.defValue) ? String(data.defValue) : undefined,
                                typeData: 1
                            };
                        }
                        switch (data.item.dataTypeValue) {
                            default:
                            case ITEM_SINGLE_TYPE.STRING:
                                return {
                                    text: undefined,
                                    value: !_.isNil(data.value) ? String(data.value) : undefined,
                                    defText: undefined,
                                    defValue: !_.isNil(data.defValue) ? String(data.defValue) : undefined,
                                    typeData: 1
                                };
                            case ITEM_SINGLE_TYPE.NUMERIC:
                            case ITEM_SINGLE_TYPE.TIME:
                            case ITEM_SINGLE_TYPE.TIMEPOINT:
                                return {
                                    text: undefined,
                                    value: !_.isNil(data.value) ? String(data.value).replace(/:/g, '') : undefined,
                                    defText: undefined,
                                    defValue: !_.isNil(data.defValue) ? String(data.defValue) : undefined,
                                    typeData: 2
                                };
                            case ITEM_SINGLE_TYPE.DATE:
                                return {
                                    text: undefined,
                                    value: !_.isNil(data.value) ? moment.utc(data.value, "YYYY/MM/DD").format("YYYY/MM/DD") : undefined,
                                    defText: undefined,
                                    defValue: !_.isNil(data.defValue) ? moment.utc(data.defValue, "YYYY/MM/DD").format("YYYY/MM/DD") : undefined,
                                    typeData: 3
                                };
                            case ITEM_SINGLE_TYPE.SELECTION:
                            case ITEM_SINGLE_TYPE.SEL_RADIO:
                            case ITEM_SINGLE_TYPE.SEL_BUTTON:
                                switch (data.item.referenceType) {
                                    case ITEM_SELECT_TYPE.ENUM:
                                        return {
                                            text: _.isNil(data.textValue) ? (!_.isNil(data.value) ? String(data.value) : undefined) : String(data.textValue),
                                            value: !_.isNil(data.value) ? (String(data.value) || undefined) : undefined,
                                            defText: _.isNil(data.defText) ? (!_.isNil(data.defValue) ? String(data.defValue) : undefined) : String(data.defText),
                                            defValue: !_.isNil(data.defValue) ? String(data.defValue) : undefined,
                                            typeData: 2
                                        };
                                    case ITEM_SELECT_TYPE.CODE_NAME:
                                        return {
                                            text: _.isNil(data.textValue) ? (!_.isNil(data.value) ? String(data.value) : undefined) : String(data.textValue),
                                            value: !_.isNil(data.value) ? (String(data.value) || undefined) : undefined,
                                            defText: _.isNil(data.defText) ? (!_.isNil(data.defValue) ? String(data.defValue) : undefined) : String(data.defText),
                                            defValue: !_.isNil(data.defValue) ? String(data.defValue) : undefined,
                                            typeData: 1
                                        };
                                    case ITEM_SELECT_TYPE.DESIGNATED_MASTER:
                                        var value = !_.isNil(data.value) ? Number(data.value) : undefined;
                                        if (!_.isNil(value)) {
                                            if (String(value) == String(data.value)) {
                                                return {
                                                    text: _.isNil(data.textValue) ? (!_.isNil(data.value) ? String(data.value) : undefined) : String(data.textValue),
                                                    value: !_.isNil(data.value) ? (String(data.value) || undefined) : undefined,
                                                    defText: _.isNil(data.defText) ? (!_.isNil(data.defValue) ? String(data.defValue) : undefined) : String(data.defText),
                                                    defValue: !_.isNil(data.defValue) ? String(data.defValue) : undefined,
                                                    typeData: 2
                                                };
                                            }
                                            else {
                                                return {
                                                    text: _.isNil(data.textValue) ? (!_.isNil(data.value) ? String(data.value) : undefined) : String(data.textValue),
                                                    value: !_.isNil(data.value) ? (String(data.value) || undefined) : undefined,
                                                    defText: _.isNil(data.defText) ? (!_.isNil(data.defValue) ? String(data.defValue) : undefined) : String(data.defText),
                                                    defValue: !_.isNil(data.defValue) ? String(data.defValue) : undefined,
                                                    typeData: 1
                                                };
                                            }
                                        }
                                        else {
                                            return {
                                                text: _.isNil(data.textValue) ? (!_.isNil(data.value) ? String(data.value) : undefined) : String(data.textValue),
                                                value: !_.isNil(data.value) ? (String(data.value) || undefined) : undefined,
                                                defText: _.isNil(data.defText) ? (!_.isNil(data.defValue) ? String(data.defValue) : undefined) : String(data.defText),
                                                defValue: !_.isNil(data.defValue) ? String(data.defValue) : undefined,
                                                typeData: 1
                                            };
                                        }
                                }
                            case ITEM_SINGLE_TYPE.READONLY:
                            case ITEM_SINGLE_TYPE.RELATE_CATEGORY:
                                return null;
                            case ITEM_SINGLE_TYPE.NUMBERIC_BUTTON:
                                return {
                                    text: undefined,
                                    value: !_.isNil(data.value) ? String(data.value) : undefined,
                                    defText: undefined,
                                    defValue: !_.isNil(data.defValue) ? String(data.defValue) : undefined,
                                    typeData: 2
                                };
                            case ITEM_SINGLE_TYPE.READONLY_BUTTON:
                                return null;
                        }
                    }, calc_data = function () {
                        if ($editable === 2) {
                            var inputs_1 = [], grbc_1 = _(opts.sortable.data())
                                .filter(function (x) { return _.has(x, "items") && !!x.items; })
                                .map(function (x) { return ko.toJS(x.items); })
                                .flatten()
                                .filter(function (x) { return _.has(x, "item") && !!x.item; })
                                .map(function (x) {
                                var data = proc(x);
                                return data ? {
                                    checked: x.checked,
                                    recordId: x.recordId,
                                    categoryId: x.categoryId,
                                    categoryCd: x.categoryCode,
                                    categoryName: x.categoryName,
                                    categoryType: x.ctgType,
                                    definitionId: x.itemDefId,
                                    itemCode: x.itemCode,
                                    itemName: x.itemName,
                                    text: data.text,
                                    value: data.value,
                                    defText: data.defText,
                                    defValue: data.defValue,
                                    'type': data.typeData,
                                    logType: x.item.dataTypeValue
                                } : null;
                            })
                                .filter(function (x) { return !!x; })
                                .groupBy(function (x) { return x.categoryCd; })
                                .value(), categoryCds = _.keys(grbc_1);
                            _(categoryCds).each(function (categoryCd) {
                                var group = _.groupBy(grbc_1[categoryCd], function (m) { return m.recordId; }), recordIds = _.keys(group);
                                _.each(recordIds, function (recordId) {
                                    var _recordId = ["undefined", "null"].indexOf(recordId) > -1 ? undefined : recordId.indexOf("NID_") > -1 ? undefined : recordId, _categoryCd = ["undefined", "null"].indexOf(categoryCd) > -1 ? undefined : categoryCd, deleted = group[recordId].map(function (m) { return m.checked; }).filter(function (m) { return !m; }).length == 0;
                                    if (_recordId || (!_recordId && !deleted)) {
                                        var ctg = _.head(group[recordId]);
                                        // delete check for CARD_NO
                                        if (_categoryCd == "CS00069" && !ctg.value) {
                                            deleted = true;
                                        }
                                        inputs_1.push({
                                            recordId: _recordId,
                                            categoryCd: _categoryCd,
                                            categoryId: ctg.categoryId,
                                            categoryName: ctg.categoryName,
                                            categoryType: ctg.categoryType,
                                            'delete': deleted,
                                            items: group[recordId].map(function (m) {
                                                return {
                                                    definitionId: m.definitionId,
                                                    itemCode: m.itemCode,
                                                    itemName: m.itemName,
                                                    text: m.text,
                                                    value: deleted ? m.dvalue : m.value,
                                                    defText: m.defText,
                                                    defValue: m.defValue,
                                                    'type': m.type,
                                                    logType: m.logType
                                                };
                                            })
                                        });
                                    }
                                });
                            });
                            // filter group input has record id
                            // or no record id but has data
                            // or has record id and delete flag is true
                            inputs_1 = _(inputs_1).filter(function (f) {
                                return f.recordId || (!f.recordId && f.items.filter(function (m) { return !!m.value; }).length > 0) || (f.recordId && f.delete);
                            }).value();
                            // fix CS00070
                            if (location.href.indexOf('/view/cps/002/') > -1) {
                                var cs00020 = _.find(inputs_1, function (f) { return f.categoryCd == 'CS00020'; }), cs00070 = _.find(inputs_1, function (f) { return f.categoryCd == 'CS00070'; });
                                if (cs00020) {
                                    if (cs00070) {
                                        var items = _.filter(cs00070.items, function (t) { return ['IS00780', 'IS00781', 'IS00782'].indexOf(t.itemCode) == -1; });
                                        cs00020.items = _.concat(cs00020.items, items);
                                    }
                                }
                                else if (cs00070) {
                                    cs00070.categoryCd = 'CS00020';
                                    _.each(cs00070.items, function (t) {
                                        switch (t.itemCode) {
                                            default:
                                                break;
                                            case 'IS00780':
                                                t.itemCode = 'IS00118';
                                                break;
                                            case 'IS00781':
                                                t.itemCode = 'IS00119';
                                                break;
                                            case 'IS00782':
                                                t.itemCode = 'IS00120';
                                                break;
                                        }
                                    });
                                }
                                inputs_1 = _(inputs_1).filter(function (f) { return f.categoryCd != 'CS00070'; }).value();
                            }
                            // change value
                            opts.sortable.outData(inputs_1);
                        }
                        else {
                            // init data for save layout
                            opts.sortable.data.valueHasMutated();
                        }
                    }, def_type = function (items) {
                        var SET_MULTILINE_W_TITLE = _.filter(items, function (f) { return !f.itemParentCode; }).length > 1;
                        _(items).each(function (x, i) {
                            var single = _.map(x.childs, function (m) { return m.childs.length; }).filter(function (m) { return m != 0; }).length == 0;
                            x.index = i;
                            x.cssClass = ko.toJS(x.showColor) && 'color-operation-case-character';
                            if (x.childs.length == 0 || x.type == ITEM_TYPE.SINGLE) {
                                x.dispType = DISP_TYPE.SINGLE;
                                if (x.parent && x.parent.parent) {
                                    var parent_1 = x.parent, grandp = parent_1.parent, has_single = _.map(grandp.childs, function (m) { return m.childs.length; }).filter(function (m) { return m == 0; }).length > 0, has_multiple = _.map(grandp.childs, function (m) { return m.childs.length; }).filter(function (m) { return m > 0; }).length > 0;
                                    if (has_single && has_multiple && parent_1.childs.indexOf(x) == 0) {
                                        x.title = false;
                                    }
                                    else {
                                        x.title = true;
                                    }
                                }
                                else {
                                    x.title = true;
                                }
                            }
                            else if (x.childs.length == 1) {
                                if ((x.childs[0].item || {}).dataTypeValue == ITEM_SINGLE_TYPE.SEL_RADIO) {
                                    x.dispType = DISP_TYPE.SET_MULTILINE_W_RADIO;
                                }
                                else if (single && SET_MULTILINE_W_TITLE) {
                                    x.dispType = DISP_TYPE.SET_INLINE;
                                }
                                else {
                                    x.dispType = DISP_TYPE.SET_MULTILINE;
                                }
                            }
                            else if (x.childs.length == 2 && x.type == ITEM_TYPE.SET) {
                                if (single) {
                                    x.dispType = DISP_TYPE.SET_INLINE;
                                }
                                else {
                                    if ((x.childs[0].item || {}).dataTypeValue == ITEM_SINGLE_TYPE.SEL_RADIO) {
                                        x.dispType = DISP_TYPE.SET_MULTILINE_W_RADIO;
                                    }
                                    else {
                                        if (!SET_MULTILINE_W_TITLE) {
                                            x.dispType = DISP_TYPE.SET_MULTILINE;
                                        }
                                        else {
                                            x.dispType = DISP_TYPE.SET_MULTILINE_W_TITLE;
                                        }
                                    }
                                }
                            }
                            else if (x.type == ITEM_TYPE.SET) {
                                if (single && SET_MULTILINE_W_TITLE) {
                                    x.dispType = DISP_TYPE.SET_INLINE;
                                }
                                else {
                                    if ((x.childs[0].item || {}).dataTypeValue == ITEM_SINGLE_TYPE.SEL_RADIO) {
                                        x.dispType = DISP_TYPE.SET_MULTILINE_W_RADIO;
                                    }
                                    else {
                                        if (!SET_MULTILINE_W_TITLE) {
                                            x.dispType = DISP_TYPE.SET_MULTILINE;
                                        }
                                        else {
                                            x.dispType = DISP_TYPE.SET_MULTILINE_W_TITLE;
                                        }
                                    }
                                }
                            }
                            else if (x.type == ITEM_TYPE.SET_TABLE) {
                                x.dispType = DISP_TYPE.SET_TABLE;
                            }
                            if (x.itemCode == 'IS00129' || x.itemCode == 'IS00138') {
                                x.dispType = DISP_TYPE.SET_MULTILINE;
                            }
                        });
                    }, hierarchies = function (cls) {
                        if (cls.layoutItemType == IT_CLA_TYPE.ITEM) {
                            cls.renders = ko.observableArray(_(cls.items)
                                .map(function (x) {
                                var parent = _.find(cls.items, function (f) { return f.itemCode == x.itemParentCode; }), childs = _.filter(cls.items, function (f) { return f.itemParentCode == x.itemCode; }), constraint = !childs.length &&
                                    [
                                        ITEM_SINGLE_TYPE.STRING,
                                        ITEM_SINGLE_TYPE.NUMERIC,
                                        ITEM_SINGLE_TYPE.NUMBERIC_BUTTON,
                                        ITEM_SINGLE_TYPE.TIME,
                                        ITEM_SINGLE_TYPE.TIMEPOINT
                                    ].indexOf((x.item || {}).dataTypeValue) > -1 &&
                                    x.itemDefId.replace(/[-_]/g, ''), nameid = x.itemDefId.replace(/[-_]/g, '');
                                // fix stampcard validate
                                if ([ITEM_STRING_TYPE.CARDNO].indexOf((x.item || {}).stringItemType) > -1) {
                                    constraint = 'StampNumber';
                                }
                                //EmployeeCode
                                if ([ITEM_STRING_TYPE.EMPLOYEE_CODE].indexOf((x.item || {}).stringItemType) > -1) {
                                    constraint = 'EmployeeCode';
                                }
                                return _.extend(x, {
                                    nameid: nameid,
                                    parent: parent,
                                    childs: childs,
                                    constraint: constraint || undefined
                                });
                            })
                                .orderBy(function (o) { return o.dispOrder; })
                                .filter(function (x) { return !x.itemParentCode; })
                                .value());
                            // define type of item definition
                            def_type(cls.items);
                        }
                        else if (cls.layoutItemType == IT_CLA_TYPE.LIST) {
                            var editable_1 = opts.sortable.isEditable() == 2, rows_1 = _.groupBy(cls.items, function (r) { return r.recordId; }), keys = _.keys(rows_1), renders_1 = ko.observableArray(_.map(keys, function (k) { return ({
                                recordId: ["undefined", "null"].indexOf(k) > -1 ? undefined : k,
                                items: rows_1[k],
                                checked: ko.observable(false),
                                enable: ko.observable(editable_1)
                            }); })), clone_1 = function (row) {
                                var recordId = 'NID_' + random(), _row = {
                                    recordId: recordId,
                                    checked: ko.observable(false),
                                    enable: ko.observable(true),
                                    items: []
                                };
                                _(row.items).each(function (r) {
                                    var c = ko.toJS(r), _r = _.omit(c, [
                                        "readonly",
                                        "editable",
                                        "lstComboBoxValue",
                                        "numberedit",
                                        "showColor",
                                        "textValue",
                                        "value",
                                        "recordId",
                                        "checked",
                                        "defValue"
                                    ]);
                                    ko.utils.extend(_r, {
                                        checked: _row.checked,
                                        checkable: _row.enable,
                                        recordId: recordId,
                                        readonly: ko.observable(c.readonly),
                                        editable: ko.observable(c.editable),
                                        lstComboBoxValue: ko.observableArray(c.lstComboBoxValue),
                                        numberedit: ko.observable(c.numberedit),
                                        showColor: ko.observable(c.showColor),
                                        textValue: ko.observable(c.textValue),
                                        value: ko.observable(undefined),
                                        defValue: undefined
                                    });
                                    ko.computed({
                                        read: function () {
                                            var editable = ko.toJS(_r.editable);
                                            if (!editable && $('#' + _r.nameid).ntsError('hasError')) {
                                                $('#' + _r.nameid).trigger('change');
                                            }
                                        },
                                        disposeWhen: function () { return !_r.value; }
                                    });
                                    _r.value.subscribe(function (v) {
                                        if (!!v) {
                                            var rids = _.map(cls.renders(), function (m) { return m.recordId; });
                                            if (rids.indexOf(_row.recordId) == rids.length - 1) {
                                                clone_1(_row);
                                            }
                                        }
                                    });
                                    cls.items.push(_r);
                                    _row.items.push(_r);
                                });
                                row_render(_row);
                                renders_1.push(_row);
                            };
                            var _rows = ko.toJS(renders_1), _row_1 = _.last(_rows);
                            if (!editable_1) {
                                renders_1.removeAll();
                                _.each([1, 2, 3], function (r) {
                                    clone_1(_row_1);
                                });
                            }
                            else {
                                if (_row_1) {
                                    if (!_row_1.recordId && _rows.length == 1) {
                                        renders_1.removeAll();
                                    }
                                    else {
                                        _.each(renders_1(), function (row, rid) {
                                            _(row.items).each(function (r) {
                                                ko.utils.extend(r, {
                                                    checked: row.checked,
                                                    checkable: row.enable
                                                });
                                            });
                                        });
                                    }
                                    clone_1(_row_1);
                                }
                            }
                            _.each(renders_1(), function (row, rid) {
                                row_render(row);
                            });
                            cls.renders = renders_1;
                        }
                        else {
                            cls.renders = undefined;
                        }
                    }, row_render = function (row) {
                        row.renders = _(row.items).map(function (col) {
                            var parent = _.find(row.items, function (f) { return f.itemCode == col.itemParentCode; }), childs = _.filter(row.items, function (f) { return f.itemParentCode == col.itemCode; }), constraint = !childs.length &&
                                [
                                    ITEM_SINGLE_TYPE.STRING,
                                    ITEM_SINGLE_TYPE.NUMERIC,
                                    ITEM_SINGLE_TYPE.TIME,
                                    ITEM_SINGLE_TYPE.TIMEPOINT
                                ].indexOf((col.item || {}).dataTypeValue) > -1 &&
                                col.itemDefId.replace(/[-_]/g, ''), nameid = col.itemDefId.replace(/[-_]/g, '');
                            // fix stampcard validate
                            if ([ITEM_STRING_TYPE.CARDNO].indexOf((col.item || {}).stringItemType) > -1) {
                                constraint = 'StampNumber';
                            }
                            //EmployeeCode
                            if ([ITEM_STRING_TYPE.EMPLOYEE_CODE].indexOf((col.item || {}).stringItemType) > -1) {
                                constraint = 'EmployeeCode';
                            }
                            return _.extend(col, {
                                nameid: nameid,
                                parent: parent,
                                childs: childs,
                                constraint: constraint || undefined
                            });
                        })
                            .orderBy(function (o) { return o.dispOrder; })
                            .filter(function (x) { return !x.itemParentCode; })
                            .value();
                        def_type(row.items);
                    }, scrollDown = function () {
                        // remove old selected items
                        $(ctrls.sortable)
                            .find('.form-group.item-classification')
                            .removeClass('selected');
                        // scroll to bottom
                        $(ctrls.sortable).scrollTop($(ctrls.sortable).prop("scrollHeight"));
                        // select lastest item
                        var tout = setTimeout(function () {
                            $(ctrls.sortable)
                                .find('.form-group.item-classification:last-child')
                                .addClass('selected');
                            clearTimeout(tout);
                        }, 0);
                    };
                    // add style to <head> on first run
                    if (!$('#layout_style').length) {
                        $('head').append(self.style);
                    }
                    $element
                        .append(self.tmp)
                        .addClass('ntsControl layout-control');
                    // binding callback function to control
                    if (access.callback) {
                        $.extend(opts, { callback: access.callback });
                    }
                    // binding output data value 
                    if (access.outData) {
                        $.extend(opts.sortable, { outData: access.outData });
                        // add refresh method
                        $.extend(opts.sortable.outData, {
                            refresh: calc_data
                        });
                    }
                    // change color text
                    if (_.has(access, "showColor")) {
                        $.extend(opts.sortable, { showColor: access.showColor });
                    }
                    // validate editAble
                    if (ko.unwrap(access.editAble) != undefined) {
                        if (ko.isObservable(access.editAble)) {
                            access.editAble.subscribe(editable);
                            access.editAble.valueHasMutated();
                        }
                        else {
                            editable(access.editAble);
                        }
                    }
                    // sortable
                    opts.sortable.isEnabled.subscribe(function (x) {
                        if (!x) {
                            $element
                                .addClass('readonly')
                                .removeClass('dragable');
                            $element.find('.left-area, .add-buttons, #cps007_btn_line').hide();
                        }
                        else {
                            $element
                                .addClass('dragable')
                                .removeClass('readonly');
                            $element.find('.left-area, .add-buttons, #cps007_btn_line').show();
                        }
                    });
                    opts.sortable.isEnabled.valueHasMutated();
                    // inputable (editable)
                    opts.sortable.isEditable.subscribe(function (x) {
                        var data = ko.unwrap(opts.sortable.data);
                        _.each(data, function (icl) {
                            _.each(icl.listItemDf, function (e) {
                                if (e.itemTypeState && e.itemTypeState.dataTypeState) {
                                    var state = e.itemTypeState.dataTypeState;
                                    if (x == 2) {
                                        if (state.editable && ko.isObservable(state.editable)) {
                                            state.editable(true);
                                        }
                                        else {
                                            state.editable = ko.observable(true);
                                        }
                                        if (state.readonly && ko.isObservable(state.readonly)) {
                                            state.readonly(false);
                                        }
                                        else {
                                            state.readonly = ko.observable(false);
                                        }
                                    }
                                    else {
                                        if (state.editable && ko.isObservable(state.editable)) {
                                            state.editable(false);
                                        }
                                        else {
                                            state.editable = ko.observable(false);
                                        }
                                        if (state.readonly && ko.isObservable(state.readonly)) {
                                            state.readonly(true);
                                        }
                                        else {
                                            state.readonly = ko.observable(true);
                                        }
                                    }
                                    state.editable.valueHasMutated();
                                }
                            });
                        });
                    });
                    opts.sortable.isEditable.valueHasMutated();
                    // extend option
                    $.extend(opts.combobox, {
                        enable: ko.computed({
                            read: function () { return !opts.radios.value(); },
                            disposeWhen: function () { return !opts.radios.value; }
                        })
                    });
                    $.extend(opts.searchbox, {
                        items: ko.computed({
                            read: opts.listbox.options,
                            disposeWhen: function () { return !opts.listbox.options; }
                        }),
                        selected: opts.listbox.value
                    });
                    // extend data of sortable with valueAccessor data prop
                    $.extend(opts.sortable, { data: access.data });
                    opts.sortable.data.subscribe(function (data) {
                        //opts.sortable.isEditable.valueHasMutated();
                        _.each(data, function (x, i) {
                            x.dispOrder = i + 1;
                            x.layoutID = random();
                            if (!_.has(x, '$show') || !ko.isObservable(x.$show)) {
                                x.$show = ko.observable(true);
                            }
                            if ((!_.has(x, "items") || !x.items)) {
                                if (x.layoutItemType != IT_CLA_TYPE.SPER) {
                                    x.items = [];
                                    if (_.has(x, "listItemDf")) {
                                        _.each((x.listItemDf || []), function (item, i) {
                                            var def = _.find(x.items, function (m) { return m.itemDefId == item.id; });
                                            if (!def) {
                                                def = {
                                                    categoryCode: x.categoryCode || x.personInfoCategoryID,
                                                    itemCode: item.itemCode,
                                                    itemName: item.itemName,
                                                    itemDefId: item.id,
                                                    value: undefined
                                                };
                                                x.items.push(def);
                                            }
                                            modifitem(def, item);
                                        });
                                    }
                                }
                                else {
                                    x.items = undefined;
                                }
                            }
                            else {
                                switch (x.layoutItemType) {
                                    case IT_CLA_TYPE.ITEM:
                                    case IT_CLA_TYPE.LIST:
                                        _.each(x.items, function (def, i) { return modifitem(def); });
                                        if (x.layoutItemType == IT_CLA_TYPE.LIST) {
                                            x.$show(false);
                                            var sto_1 = setTimeout(function () {
                                                x.$show(true);
                                                clearTimeout(sto_1);
                                            }, 0);
                                        }
                                        break;
                                    case IT_CLA_TYPE.SPER:
                                        x.items = undefined;
                                        break;
                                }
                            }
                            hierarchies(x);
                        });
                        // clear all error on switch new layout
                        clearError();
                        // write date/time/timepoint 
                        // primitive constraint to viewContext
                        dateTimeConsts();
                        // write primitive constraints to viewContext
                        primitiveConsts();
                        if (typeof $editable === 'boolean' || $editable !== 2) {
                            // init data for save layout
                            opts.sortable.outData(_(data || []).map(function (item, i) {
                                return {
                                    dispOrder: Number(i) + 1,
                                    personInfoCategoryID: item.personInfoCategoryID,
                                    layoutItemType: _(IT_CLA_TYPE).map(function (x) { return x; }).indexOf(item.layoutItemType),
                                    listItemClsDf: _(_.map(item.listItemDf, function (m) { return m; }) || []).map(function (def, j) {
                                        return {
                                            dispOrder: Number(j) + 1,
                                            personInfoItemDefinitionID: def.id
                                        };
                                    }).value()
                                };
                            }).value());
                        }
                    });
                    // get all id of controls
                    $.extend(ctrls, {
                        label: $element.find('#cps007_lbl_control')[0],
                        radios: $element.find('#cps007_rdg_control')[0],
                        combobox: $element.find('#cps007_cbx_control')[0],
                        searchbox: $element.find('#cps007_sch_control')[0],
                        listbox: $element.find('#cps007_lst_control')[0],
                        button: $element.find('#cps007_btn_add')[0],
                        sortable: $element.find('#cps007_srt_control')[0],
                        line: $element.find('#cps007_btn_line')[0]
                    });
                    if (typeof $editable == 'boolean' ? $editable === true : $editable === 0) {
                        // change text of label
                        $(ctrls.label).text(text('CPS007_5'));
                        $(ctrls.line).text(text('CPS007_19'));
                        $(ctrls.button).text(text('CPS007_11'));
                        // subscribe handle
                        // load combobox data
                        opts.radios.value.subscribe(function (mode) {
                            // remove all data in listbox
                            opts.listbox.options.removeAll();
                            if (mode == CAT_OR_GROUP.CATEGORY) { // get item by category
                                opts.combobox.options.removeAll();
                                services.getCats().done(function (data) {
                                    if (data && data.categoryList && data.categoryList.length) {
                                        var cats = _.filter(data.categoryList, function (x) { return !x.isAbolition && !x.categoryParentCode; });
                                        if (location.href.indexOf('/view/cps/007/a/') > -1) {
                                            cats = _.filter(cats, function (c) { return c.categoryCode != 'CS00069' && c.categoryCode != 'CS00100'; });
                                        }
                                        if (cats && cats.length) {
                                            opts.combobox.options(cats);
                                            // set first id
                                            var options = ko.toJS(opts.combobox.options);
                                            if (options[0]) {
                                                if (ko.toJS(opts.combobox.value) != options[0].id) {
                                                    opts.combobox.value(options[0].id);
                                                }
                                                else {
                                                    opts.combobox.value.valueHasMutated();
                                                }
                                            }
                                            else {
                                                opts.combobox.value(undefined);
                                            }
                                        }
                                        else {
                                            // show message if hasn't any category
                                            if (ko.toJS(opts.sortable.isEnabled)) {
                                                alert({ messageId: 'Msg_288' }).then(opts.callback);
                                            }
                                        }
                                    }
                                    else {
                                        // show message if hasn't any category
                                        if (ko.toJS(opts.sortable.isEnabled)) {
                                            alert({ messageId: 'Msg_288' }).then(opts.callback);
                                        }
                                    }
                                });
                            }
                            else { // get item by group
                                // change text in add-button to [グループを追加　→]
                                $(ctrls.button).text(text('CPS007_20'));
                                services.getGroups().done(function (data) {
                                    // prevent if slow networks
                                    if (opts.radios.value() != CAT_OR_GROUP.GROUP) {
                                        return;
                                    }
                                    if (data && data.length) {
                                        // map Array<IItemGroup> to Array<IItemDefinition>
                                        // 「個人情報項目定義」が取得できなかった「項目グループ」以外を、画面項目「グループ一覧」に表示する
                                        // remove groups when it does not contains any item definition (by hql)
                                        var _opts = _.map(data, function (group) {
                                            return {
                                                id: group.personInfoItemGroupID,
                                                itemName: group.fieldGroupName,
                                                itemTypeState: undefined,
                                                dispOrder: group.dispOrder
                                            };
                                        });
                                        opts.listbox.options(_opts);
                                    }
                                });
                            }
                            // remove listbox data
                            opts.listbox.value.removeAll();
                        });
                        opts.radios.value.valueHasMutated();
                        // load listbox data
                        opts.combobox.value.subscribe(function (cid) {
                            if (cid) {
                                var data = ko.toJS(opts.combobox.options), item_1 = _.find(data, function (x) { return x.id == cid; });
                                // remove all item in list item for init new data
                                opts.listbox.options.removeAll();
                                if (item_1) {
                                    switch (item_1.categoryType) {
                                        case IT_CAT_TYPE.SINGLE:
                                        case IT_CAT_TYPE.CONTINU:
                                        case IT_CAT_TYPE.CONTINUWED:
                                        case IT_CAT_TYPE.NODUPLICATE:
                                            $(ctrls.button).text(text('CPS007_11'));
                                            services.getItemByCat(item_1.id).done(function (data) {
                                                // prevent if slow networks
                                                if (opts.radios.value() != CAT_OR_GROUP.CATEGORY) {
                                                    return;
                                                }
                                                if (data && data.length) {
                                                    // get all item defined in category with abolition = 0
                                                    // order by dispOrder asc
                                                    data = _(data)
                                                        .filter(function (m) { return !m.isAbolition; })
                                                        .filter(function (f) {
                                                        if (location.href.indexOf('/view/cps/007/a/') > -1) {
                                                            if (item_1.categoryCode === "CS00001") {
                                                                return f.itemCode !== "IS00001";
                                                            }
                                                            if (item_1.categoryCode === "CS00002") {
                                                                return f.itemCode !== "IS00003";
                                                            }
                                                            if (item_1.categoryCode === "CS00003") {
                                                                return f.itemCode !== "IS00020";
                                                            }
                                                        }
                                                        return true;
                                                    })
                                                        .orderBy(function (m) { return m.dispOrder; }).value();
                                                    opts.listbox.options(data);
                                                    opts.listbox.value.removeAll();
                                                }
                                            });
                                            break;
                                        case IT_CAT_TYPE.MULTI:
                                        case IT_CAT_TYPE.DUPLICATE:
                                            $(ctrls.button).text(text('CPS007_10'));
                                            // create item for listbox
                                            // itemname: categoryname + text('CPS007_21')
                                            var def = {
                                                id: item_1.id,
                                                itemName: item_1.categoryName + text('CPS007_21'),
                                                itemTypeState: undefined, // item.categoryType
                                            };
                                            opts.listbox.value.removeAll();
                                            opts.listbox.options.push(def);
                                            break;
                                    }
                                }
                                else {
                                    // select undefine
                                    opts.listbox.value.removeAll();
                                }
                            }
                        });
                        opts.listbox.options.subscribe(function (x) {
                            if (!x || !x.length) {
                                $(ctrls.button).prop('disabled', true);
                            }
                            else {
                                $(ctrls.button).prop('disabled', false);
                            }
                        });
                        // disable group if not has any group
                        services.getGroups().done(function (data) {
                            if (!data || !data.length) {
                                opts.radios.options().filter(function (x) { return x.id == CAT_OR_GROUP.GROUP; }).forEach(function (x) { return x.enable(false); });
                            }
                        });
                        // events handler
                        $(ctrls.line).on('click', function () {
                            var item = {
                                layoutID: random(),
                                dispOrder: -1,
                                personInfoCategoryID: undefined,
                                listItemDf: undefined,
                                layoutItemType: IT_CLA_TYPE.SPER
                            };
                            // add line to list sortable
                            opts.sortable.pushItem(item);
                            scrollDown();
                        });
                        $(ctrls.sortable)
                            .on('click', function (evt) {
                            var tout = setTimeout(function () {
                                $(ctrls.sortable)
                                    .find('.form-group.item-classification')
                                    .removeClass('selected');
                                clearTimeout(tout);
                            }, 0);
                        })
                            .on('mouseover', '.form-group.item-classification', function (evt) {
                            $(evt.target)
                                .removeClass('selected');
                        });
                        $(ctrls.button)
                            .data('safeClick', new Date().getTime())
                            .on('click', function () {
                            var timeClick = new Date().getTime(), safeClick = $(ctrls.button).data('safeClick');
                            // prevent multi click
                            $(ctrls.button).data('safeClick', timeClick);
                            if (timeClick - safeClick <= 500) {
                                return;
                            }
                            // アルゴリズム「項目追加処理」を実行する
                            // Execute the algorithm "項目追加処理"
                            var ids = ko.toJS(opts.listbox.value);
                            if (!ids || !ids.length) {
                                alert({ messageId: 'Msg_203' });
                                return;
                            }
                            // category mode
                            if (ko.unwrap(opts.radios.value) == CAT_OR_GROUP.CATEGORY) {
                                var cid_1 = ko.toJS(opts.combobox.value), cats = ko.toJS(opts.combobox.options), cat_1 = _.find(cats, function (x) { return x.id == cid_1; });
                                if (cat_1) {
                                    // multiple items
                                    if ([IT_CAT_TYPE.MULTI, IT_CAT_TYPE.DUPLICATE].indexOf(cat_1.categoryType) > -1) {
                                        // 画面項目「カテゴリ選択」で選択している情報が、既に配置されているかチェックする
                                        // if category is exist in sortable box.
                                        var _catcls = _.find(ko.unwrap(opts.sortable.data), function (x) { return x.personInfoCategoryID == cat_1.id; });
                                        if (_catcls) {
                                            alert({
                                                messageId: 'Msg_202',
                                                messageParams: [cat_1.categoryName]
                                            });
                                            return;
                                        }
                                        setShared('CPS007B_PARAM', { category: cat_1, chooseItems: [] });
                                        modal('../../007/b/index.xhtml').onClosed(function () {
                                            var dfds = [], data = getShared('CPS007B_VALUE') || { category: undefined, chooseItems: [] };
                                            if (data.category && data.category.id && data.chooseItems && data.chooseItems.length) {
                                                services.getCat(data.category.id).done(function (_cat) {
                                                    if (!_cat || !!_cat.isAbolition) {
                                                        return;
                                                    }
                                                    var ids = data.chooseItems.map(function (x) { return x.id; });
                                                    services.getItemsByIds(ids).done(function (_data) {
                                                        // sort againt by ids
                                                        _.each(_data, function (x) { return x.dispOrder = ids.indexOf(x.id) + 1; });
                                                        _data = _.orderBy(_data, function (x) { return x.dispOrder; });
                                                        // get set item
                                                        _.each(_data, function (x) {
                                                            var dfd = $.Deferred();
                                                            if (x.itemTypeState.itemType == ITEM_TYPE.SET) {
                                                                services.getItemsByIds(x.itemTypeState.items).done(function (_items) {
                                                                    dfd.resolve([x].concat(_items));
                                                                }).fail(function (msg) {
                                                                    dfd.resolve(x);
                                                                });
                                                            }
                                                            else {
                                                                dfd.resolve(x);
                                                            }
                                                            dfds.push(dfd);
                                                        });
                                                        $.when.apply($, dfds).then(function () {
                                                            var args = _.flatten(arguments), items = _(args)
                                                                .filter(function (x) { return !!x && x.itemTypeState.itemType == ITEM_TYPE.SINGLE; })
                                                                .uniqBy(function (x) { return x.id; })
                                                                .map(function (x) {
                                                                if (ids.indexOf(x.id) > -1) {
                                                                    x.dispOrder = (ids.indexOf(x.id) + 1) * 1000;
                                                                }
                                                                else {
                                                                    var parent_2 = _.find(args, function (p) { return p.itemCode == x.itemParentCode; });
                                                                    if (parent_2) {
                                                                        x.dispOrder += (ids.indexOf(parent_2.id) + 1) * 1000;
                                                                    }
                                                                }
                                                                return x;
                                                            })
                                                                .orderBy(function (x) { return x.dispOrder; })
                                                                .value(), item = {
                                                                layoutID: random(),
                                                                dispOrder: -1,
                                                                className: _cat.categoryName,
                                                                personInfoCategoryID: _cat.id,
                                                                layoutItemType: IT_CLA_TYPE.LIST,
                                                                listItemDf: items
                                                            };
                                                            opts.sortable.data.push(item);
                                                            opts.listbox.value.removeAll();
                                                            scrollDown();
                                                        });
                                                    });
                                                });
                                            }
                                        });
                                    }
                                    else { // set or single item
                                        var idefid_1 = ko.toJS(opts.listbox.value), idefs = _.filter(ko.toJS(opts.listbox.options), function (x) { return idefid_1.indexOf(x.id) > -1; });
                                        if (idefs && idefs.length) {
                                            services.getItemsByIds(idefs.map(function (x) { return x.id; })).done(function (defs) {
                                                if (defs && defs.length) {
                                                    opts.sortable.pushAllItems(defs, false);
                                                    scrollDown();
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                            else { // group mode
                                var ids_1 = ko.toJS(opts.listbox.value), groups = ko.unwrap(opts.listbox.options), filters = _(groups)
                                    .filter(function (x) { return ids_1.indexOf(x.id) > -1; })
                                    .map(function (x) { return x.id; })
                                    .value();
                                if (filters && filters.length) {
                                    services.getItemByGroups(filters).done(function (defs) {
                                        if (defs && defs.length) {
                                            opts.sortable.pushAllItems(defs, true);
                                            scrollDown();
                                        }
                                    });
                                }
                            }
                        });
                    }
                    // set data controls and option to element
                    $element.data('options', opts);
                    $element.data('controls', ctrls);
                };
                this.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                    // call private constructor
                    _this._constructor(element, valueAccessor);
                    var $element = $(element), opts = $element.data('options'), ctrls = $element.data('controls'), editable = ko.toJS(valueAccessor().editAble);
                    if (editable === true || editable === 0) {
                        ko.bindingHandlers['ntsFormLabel'].init(ctrls.label, function () { return ({}); }, allBindingsAccessor, viewModel, bindingContext);
                        // init radio box group
                        ko.bindingHandlers['ntsRadioBoxGroup'].init(ctrls.radios, function () { return opts.radios; }, allBindingsAccessor, viewModel, bindingContext);
                        ko.bindingHandlers['ntsComboBox'].init(ctrls.combobox, function () { return opts.combobox; }, allBindingsAccessor, viewModel, bindingContext);
                        ko.bindingHandlers['ntsSearchBox'].init(ctrls.searchbox, function () { return opts.searchbox; }, allBindingsAccessor, viewModel, bindingContext);
                        ko.bindingHandlers['ntsListBox'].init(ctrls.listbox, function () { return opts.listbox; }, allBindingsAccessor, viewModel, bindingContext);
                    }
                    ko.bindingHandlers['ntsSortable'].init(ctrls.sortable, function () { return opts.sortable; }, allBindingsAccessor, viewModel, bindingContext);
                    // Also tell KO *not* to bind the descendants itself, otherwise they will be bound twice
                    return { controlsDescendantBindings: true };
                };
                this.update = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                    var $element = $(element), opts = $element.data('options'), ctrls = $element.data('controls'), editable = ko.toJS(valueAccessor().editAble);
                    if (editable === true || editable === 0) {
                        ko.bindingHandlers['ntsFormLabel'].update(ctrls.label, function () { return ({}); }, allBindingsAccessor, viewModel, bindingContext);
                        ko.bindingHandlers['ntsRadioBoxGroup'].update(ctrls.radios, function () { return opts.radios; }, allBindingsAccessor, viewModel, bindingContext);
                        ko.bindingHandlers['ntsComboBox'].update(ctrls.combobox, function () { return opts.combobox; }, allBindingsAccessor, viewModel, bindingContext);
                        ko.bindingHandlers['ntsSearchBox'].update(ctrls.searchbox, function () { return opts.searchbox; }, allBindingsAccessor, viewModel, bindingContext);
                        ko.bindingHandlers['ntsListBox'].update(ctrls.listbox, function () { return opts.listbox; }, allBindingsAccessor, viewModel, bindingContext);
                        // fix header off listbox
                        $('#cps007_lst_header').text(text('CPS007_9'));
                    }
                    ko.bindingHandlers['ntsSortable'].update(ctrls.sortable, function () { return opts.sortable; }, allBindingsAccessor, viewModel, bindingContext);
                };
            }
            return LayoutControl;
        }());
        custombinding.LayoutControl = LayoutControl;
        // define ITEM_CLASSIFICATION_TYPE
        var IT_CLA_TYPE;
        (function (IT_CLA_TYPE) {
            IT_CLA_TYPE[IT_CLA_TYPE["ITEM"] = "ITEM"] = "ITEM";
            IT_CLA_TYPE[IT_CLA_TYPE["LIST"] = "LIST"] = "LIST";
            IT_CLA_TYPE[IT_CLA_TYPE["SPER"] = "SeparatorLine"] = "SPER"; // line item
        })(IT_CLA_TYPE || (IT_CLA_TYPE = {}));
        // define ITEM_CATEGORY_TYPE
        var IT_CAT_TYPE;
        (function (IT_CAT_TYPE) {
            IT_CAT_TYPE[IT_CAT_TYPE["SINGLE"] = 1] = "SINGLE";
            IT_CAT_TYPE[IT_CAT_TYPE["MULTI"] = 2] = "MULTI";
            IT_CAT_TYPE[IT_CAT_TYPE["CONTINU"] = 3] = "CONTINU";
            IT_CAT_TYPE[IT_CAT_TYPE["NODUPLICATE"] = 4] = "NODUPLICATE";
            IT_CAT_TYPE[IT_CAT_TYPE["DUPLICATE"] = 5] = "DUPLICATE";
            IT_CAT_TYPE[IT_CAT_TYPE["CONTINUWED"] = 6] = "CONTINUWED"; // Continuos history with end date
        })(IT_CAT_TYPE || (IT_CAT_TYPE = {}));
        // defined CATEGORY or GROUP mode
        var CAT_OR_GROUP;
        (function (CAT_OR_GROUP) {
            CAT_OR_GROUP[CAT_OR_GROUP["CATEGORY"] = 0] = "CATEGORY";
            CAT_OR_GROUP[CAT_OR_GROUP["GROUP"] = 1] = "GROUP"; // group mode
        })(CAT_OR_GROUP || (CAT_OR_GROUP = {}));
        // define ITEM_TYPE is set or single item
        var ITEM_TYPE;
        (function (ITEM_TYPE) {
            ITEM_TYPE[ITEM_TYPE["SET"] = 1] = "SET";
            ITEM_TYPE[ITEM_TYPE["SINGLE"] = 2] = "SINGLE";
            ITEM_TYPE[ITEM_TYPE["SET_TABLE"] = 3] = "SET_TABLE";
        })(ITEM_TYPE || (ITEM_TYPE = {}));
        // define ITEM_SINGLE_TYPE
        // type of item if it's single item
        var ITEM_SINGLE_TYPE;
        (function (ITEM_SINGLE_TYPE) {
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["STRING"] = 1] = "STRING";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["NUMERIC"] = 2] = "NUMERIC";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["DATE"] = 3] = "DATE";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["TIME"] = 4] = "TIME";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["TIMEPOINT"] = 5] = "TIMEPOINT";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["SELECTION"] = 6] = "SELECTION";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["SEL_RADIO"] = 7] = "SEL_RADIO";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["SEL_BUTTON"] = 8] = "SEL_BUTTON";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["READONLY"] = 9] = "READONLY";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["RELATE_CATEGORY"] = 10] = "RELATE_CATEGORY";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["NUMBERIC_BUTTON"] = 11] = "NUMBERIC_BUTTON";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["READONLY_BUTTON"] = 12] = "READONLY_BUTTON";
        })(ITEM_SINGLE_TYPE || (ITEM_SINGLE_TYPE = {}));
        // define ITEM_STRING_DATA_TYPE
        var ITEM_STRING_DTYPE;
        (function (ITEM_STRING_DTYPE) {
            ITEM_STRING_DTYPE[ITEM_STRING_DTYPE["FIXED_LENGTH"] = 1] = "FIXED_LENGTH";
            ITEM_STRING_DTYPE[ITEM_STRING_DTYPE["VARIABLE_LENGTH"] = 2] = "VARIABLE_LENGTH"; // variable length
        })(ITEM_STRING_DTYPE || (ITEM_STRING_DTYPE = {}));
        var ITEM_STRING_TYPE;
        (function (ITEM_STRING_TYPE) {
            ITEM_STRING_TYPE[ITEM_STRING_TYPE["ANY"] = 1] = "ANY";
            // 2:全ての半角文字(AnyHalfWidth)
            ITEM_STRING_TYPE[ITEM_STRING_TYPE["ANYHALFWIDTH"] = 2] = "ANYHALFWIDTH";
            // 3:半角英数字(AlphaNumeric)
            ITEM_STRING_TYPE[ITEM_STRING_TYPE["ALPHANUMERIC"] = 3] = "ALPHANUMERIC";
            // 4:半角数字(Numeric)
            ITEM_STRING_TYPE[ITEM_STRING_TYPE["NUMERIC"] = 4] = "NUMERIC";
            // 5:全角カタカナ(Kana)
            ITEM_STRING_TYPE[ITEM_STRING_TYPE["KANA"] = 5] = "KANA";
            // 6: カードNO
            ITEM_STRING_TYPE[ITEM_STRING_TYPE["CARDNO"] = 6] = "CARDNO";
            // 7: 社員コード
            ITEM_STRING_TYPE[ITEM_STRING_TYPE["EMPLOYEE_CODE"] = 7] = "EMPLOYEE_CODE";
        })(ITEM_STRING_TYPE || (ITEM_STRING_TYPE = {}));
        // define ITEM_SELECT_TYPE
        // type of item if it's selection item
        var ITEM_SELECT_TYPE;
        (function (ITEM_SELECT_TYPE) {
            // 1:専用マスタ(DesignatedMaster)
            ITEM_SELECT_TYPE[ITEM_SELECT_TYPE["DESIGNATED_MASTER"] = "DESIGNATED_MASTER"] = "DESIGNATED_MASTER";
            // 2:コード名称(CodeName)
            ITEM_SELECT_TYPE[ITEM_SELECT_TYPE["CODE_NAME"] = "CODE_NAME"] = "CODE_NAME";
            // 3:列挙型(Enum)
            ITEM_SELECT_TYPE[ITEM_SELECT_TYPE["ENUM"] = "ENUM"] = "ENUM";
        })(ITEM_SELECT_TYPE || (ITEM_SELECT_TYPE = {}));
        var DateType;
        (function (DateType) {
            DateType[DateType["YEARMONTHDAY"] = 1] = "YEARMONTHDAY";
            DateType[DateType["YEARMONTH"] = 2] = "YEARMONTH";
            DateType[DateType["YEAR"] = 3] = "YEAR";
        })(DateType || (DateType = {}));
        var ACTION_ROLE;
        (function (ACTION_ROLE) {
            ACTION_ROLE[ACTION_ROLE["HIDDEN"] = "HIDDEN"] = "HIDDEN";
            ACTION_ROLE[ACTION_ROLE["VIEW_ONLY"] = "VIEW_ONLY"] = "VIEW_ONLY";
            ACTION_ROLE[ACTION_ROLE["EDIT"] = "EDIT"] = "EDIT";
        })(ACTION_ROLE || (ACTION_ROLE = {}));
        var DISP_TYPE;
        (function (DISP_TYPE) {
            DISP_TYPE[DISP_TYPE["SINGLE"] = "SINGLE"] = "SINGLE";
            DISP_TYPE[DISP_TYPE["SET_TABLE"] = "SET_TABLE"] = "SET_TABLE";
            DISP_TYPE[DISP_TYPE["SET_INLINE"] = "SET_INLINE"] = "SET_INLINE";
            DISP_TYPE[DISP_TYPE["SET_MULTILINE"] = "SET_MULTILINE"] = "SET_MULTILINE";
            DISP_TYPE[DISP_TYPE["SET_MULTILINE_W_RADIO"] = "SET_MULTILINE_W_RADIO"] = "SET_MULTILINE_W_RADIO";
            DISP_TYPE[DISP_TYPE["SET_MULTILINE_W_TITLE"] = "SET_MULTILINE_W_TITLE"] = "SET_MULTILINE_W_TITLE";
        })(DISP_TYPE || (DISP_TYPE = {}));
    })(custombinding = nts.custombinding || (nts.custombinding = {}));
})(nts || (nts = {}));
ko.bindingHandlers["ntsProp"] = new nts.custombinding.PropControl();
ko.bindingHandlers["ntsLayoutControl"] = new nts.custombinding.LayoutControl();
//# sourceMappingURL=layout-control-ko-ext.js.map