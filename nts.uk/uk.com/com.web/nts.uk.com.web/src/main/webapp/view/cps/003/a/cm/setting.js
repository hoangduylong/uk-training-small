var nts;
(function (nts) {
    var custombinding;
    (function (custombinding) {
        var USE_SETTING;
        (function (USE_SETTING) {
            USE_SETTING[USE_SETTING["USE"] = 'USE'] = "USE";
            USE_SETTING[USE_SETTING["NOT_USE"] = 'NOT_USE'] = "NOT_USE";
        })(USE_SETTING || (USE_SETTING = {}));
        var CURSOR_DIRC;
        (function (CURSOR_DIRC) {
            CURSOR_DIRC[CURSOR_DIRC["VERTICAL"] = 'VERTICAL'] = "VERTICAL";
            CURSOR_DIRC[CURSOR_DIRC["HORIZONTAL"] = 'HORIZONTAL'] = "HORIZONTAL";
        })(CURSOR_DIRC || (CURSOR_DIRC = {}));
        var USE = USE_SETTING.USE, NOT_USE = USE_SETTING.NOT_USE;
        var SettingButtonControl = /** @class */ (function () {
            function SettingButtonControl() {
                this.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                    var dialog = document.createElement('div'), dialogHtml = "<style type='text/css' rel='stylesheet'>\n                .cps003.setting-dialog {\n                    position: absolute;\n                    width: 385px;\n                    border: 1px solid #aaa;\n                    border-radius: 7px;\n                    background-color: #ececec;\n                    z-index: 9999;\n                    padding: 7px;\n                    box-sizing: border-box;\n                }\n                .cps003.setting-dialog .form-group {\n                    position: relative;\n                    margin-bottom: 5px;\n                }\n                .cps003.setting-dialog .form-group>* {\n                    vertical-align: middle;                    \n                }\n                .cps003.setting-dialog .ui-igcombo-wrapper {                    \n                    position: absolute;\n                    top: 1px;\n                    left: 205px;\n                }\n                .cps003.setting-dialog .form-group .checkbox-multi {\n                    margin-top: -30px;\n                    padding-left: 175px;\n                }\n                .cps003.setting-dialog .form-group .checkbox-multi .checkbox-wrapper {\n                    display: block;\n                    padding-top: 0px;\n                }\n                .cps003.setting-dialog .form-group.btn-group {\n                    text-align: center;\n                    background-color: #fff;\n                    padding: 7px;\n                    margin: 0 -7px -7px -7px;\n                    border-radius: 0 0 7px 7px;\n                }\n                .cps003.setting-dialog .form-group .ntsHelpButton button {\n                  font-size: 0.8rem;\n                }\n                </style>\n                <div class=\"form-group\">\n                    <div data-bind=\"ntsFormLabel: { text: i18n('CPS003_25') }\"></div>\n                    <button data-bind=\"ntsHelpButton: {textId: 'CPS003_26', position: 'bottom center' }\">?</button>\n                    <div data-bind=\"ntsComboBox: {\n                            width: 60,\n                            name: i18n('CPS003_25'),\n                            value: cursorDirection,\n                            options: ko.observableArray([\n                                { type: 'VERTICAL', name: '\u7E26' },\n                                { type: 'HORIZONTAL', name: '\u6A2A' }\n                            ]),\n                            optionsText: 'name',\n                            optionsValue: 'type',\n                            visibleItemsCount: 10,\n                            dropDownAttachedToBody: true,\n                            columns: [\n                                { prop: 'name', length: 14}\n                            ]\n                        }\"></div>\n                </div>\n                <div class=\"form-group\">\n                    <div class=\"checkbox-label\" data-bind=\"ntsFormLabel: { text: i18n('CPS003_27') }\"></div>\n                    <div class=\"checkbox-multi\" data-bind=\"ntsMultiCheckBox: {\n                            options: ko.observableArray([\n                                { id: 1, name: i18n('CPS003_28'), enable: false },\n                                { id: 2, name: i18n('CPS003_29'), enable: false },\n                                { id: 3, name: i18n('CPS003_30'), enable: true },\n                                { id: 4, name: i18n('CPS003_31'), enable: true },\n                                { id: 5, name: i18n('CPS003_32'), enable: true },\n                                { id: 6, name: i18n('CPS003_33'), enable: true },\n                                { id: 7, name: i18n('CPS003_34'), enable: true }\n                            ]),\n                            optionsValue: 'id',\n                            optionsText: 'name',\n                            value: fixCols,\n                            enable: true\n                        }\"></div>\n                </div>\n                <div class=\"form-group btn-group\">\n                    <button class=\"x-large proceed\" data-bind=\"text: i18n('CPS003_35'), click: pushData\"></button>\n                </div>", dialogVm = {
                        i18n: nts.uk.resource.getText,
                        cursorDirection: ko.observable(CURSOR_DIRC.VERTICAL),
                        fixCols: ko.observableArray([]),
                        pushData: function () {
                            var fixCols = ko.toJS(dialogVm.fixCols) || [], access = valueAccessor() ||
                                ko.observable({
                                    "cursorDirection": CURSOR_DIRC.VERTICAL,
                                    "clsATR": NOT_USE,
                                    "jobATR": NOT_USE,
                                    "workPlaceATR": NOT_USE,
                                    "departmentATR": NOT_USE,
                                    "employmentATR": NOT_USE,
                                }), setting = {
                                cursorDirection: ko.toJS(dialogVm.cursorDirection),
                                "clsATR": fixCols.indexOf(7) > -1 ? USE : NOT_USE,
                                "jobATR": fixCols.indexOf(5) > -1 ? USE : NOT_USE,
                                "workPlaceATR": fixCols.indexOf(4) > -1 ? USE : NOT_USE,
                                "departmentATR": fixCols.indexOf(3) > -1 ? USE : NOT_USE,
                                "employmentATR": fixCols.indexOf(6) > -1 ? USE : NOT_USE
                            }, changed = allBindingsAccessor().settingChange;
                            cps003.a.service.push.setting({
                                maxtrixDisplays: {
                                    cursorDirection: setting.cursorDirection == CURSOR_DIRC.HORIZONTAL ? 1 : 0,
                                    clsATR: setting.clsATR == USE_SETTING.USE ? 1 : 0,
                                    positionATR: setting.jobATR == USE_SETTING.USE ? 1 : 0,
                                    workPlaceATR: setting.workPlaceATR == USE_SETTING.USE ? 1 : 0,
                                    departmentATR: setting.departmentATR == USE_SETTING.USE ? 1 : 0,
                                    employmentATR: setting.employmentATR == USE_SETTING.USE ? 1 : 0,
                                }
                            }).done(function () {
                                // bind data out
                                access(setting);
                                if (changed) {
                                    changed.apply(viewModel, [setting]);
                                }
                                // hide dialog
                                ko.utils.triggerEvent(element, 'click');
                            });
                        }
                    };
                    // set root class for dialog container
                    dialog.className = 'cps003 setting-dialog';
                    // apply new $vm to dialog
                    ko.utils.setHtml(dialog, dialogHtml);
                    ko.applyBindingsToDescendants(dialogVm, dialog);
                    // show dialog
                    ko.utils.registerEventHandler(element, 'click', function (evt) {
                        if (document.body.contains(dialog)) {
                            document.body.removeChild(dialog);
                        }
                        else {
                            var bound = element.getBoundingClientRect(), access = ko.toJS(valueAccessor()) || {
                                "cursorDirection": CURSOR_DIRC.VERTICAL,
                                "clsATR": NOT_USE,
                                "jobATR": NOT_USE,
                                "workPlaceATR": NOT_USE,
                                "departmentATR": NOT_USE,
                                "employmentATR": NOT_USE,
                            }, fixCols = [
                                1,
                                2,
                                access.clsATR == USE ? 7 : -1,
                                access.jobATR == USE ? 5 : -1,
                                access.workPlaceATR == USE ? 4 : -1,
                                access.departmentATR == USE ? 3 : -1,
                                access.employmentATR == USE ? 6 : -1
                            ];
                            document.body.appendChild(dialog);
                            dialog.style.top = (bound.bottom + 5) + 'px';
                            dialog.style.left = (bound.left + bound.width - dialog.offsetWidth) + 'px';
                            // bind data in
                            dialogVm.fixCols(fixCols.filter(function (f) { return f != -1; }));
                            dialogVm.cursorDirection(access.cursorDirection || CURSOR_DIRC.VERTICAL);
                        }
                    });
                    // hide dialog
                    ko.utils.registerEventHandler(document, 'click', function (evt) {
                        if (evt.target != element && document.body.contains(dialog) && !dialog.contains(evt.target)) {
                            var bound = dialog.getBoundingClientRect();
                            if (bound.top > evt.pageY || bound.right < evt.pageX || bound.bottom < evt.pageY || bound.left > evt.pageX) {
                                document.body.removeChild(dialog);
                            }
                        }
                    });
                    return { controlsDescendantBindings: true };
                };
            }
            return SettingButtonControl;
        }());
        custombinding.SettingButtonControl = SettingButtonControl;
    })(custombinding = nts.custombinding || (nts.custombinding = {}));
})(nts || (nts = {}));
ko.bindingHandlers["cps003Setting"] = new nts.custombinding.SettingButtonControl();
//# sourceMappingURL=setting.js.map