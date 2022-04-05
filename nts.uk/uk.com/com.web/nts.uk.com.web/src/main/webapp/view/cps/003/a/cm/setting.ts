module nts.custombinding {
    enum USE_SETTING {
        USE = <any>'USE',
        NOT_USE = <any>'NOT_USE'
    }

    enum CURSOR_DIRC {
        VERTICAL = <any>'VERTICAL',
        HORIZONTAL = <any>'HORIZONTAL'
    }

    interface ISetting {
        "cursorDirection": CURSOR_DIRC | KnockoutObservable<CURSOR_DIRC>;
        "clsATR": USE_SETTING | KnockoutObservable<USE_SETTING>;
        "jobATR": USE_SETTING | KnockoutObservable<USE_SETTING>;
        "workPlaceATR": USE_SETTING | KnockoutObservable<USE_SETTING>;
        "departmentATR": USE_SETTING | KnockoutObservable<USE_SETTING>;
        "employmentATR": USE_SETTING | KnockoutObservable<USE_SETTING>;
    }

    const USE = USE_SETTING.USE,
        NOT_USE = USE_SETTING.NOT_USE;

    export class SettingButtonControl implements KnockoutBindingHandler {
        init = (element: HTMLElement, valueAccessor: () => KnockoutObservable<ISetting>, allBindingsAccessor: () => { settingChange: Function }, viewModel: any, bindingContext: KnockoutBindingContext) => {
            let dialog = document.createElement('div'),
                dialogHtml = `<style type='text/css' rel='stylesheet'>
                .cps003.setting-dialog {
                    position: absolute;
                    width: 385px;
                    border: 1px solid #aaa;
                    border-radius: 7px;
                    background-color: #ececec;
                    z-index: 9999;
                    padding: 7px;
                    box-sizing: border-box;
                }
                .cps003.setting-dialog .form-group {
                    position: relative;
                    margin-bottom: 5px;
                }
                .cps003.setting-dialog .form-group>* {
                    vertical-align: middle;                    
                }
                .cps003.setting-dialog .ui-igcombo-wrapper {                    
                    position: absolute;
                    top: 1px;
                    left: 205px;
                }
                .cps003.setting-dialog .form-group .checkbox-multi {
                    margin-top: -30px;
                    padding-left: 175px;
                }
                .cps003.setting-dialog .form-group .checkbox-multi .checkbox-wrapper {
                    display: block;
                    padding-top: 0px;
                }
                .cps003.setting-dialog .form-group.btn-group {
                    text-align: center;
                    background-color: #fff;
                    padding: 7px;
                    margin: 0 -7px -7px -7px;
                    border-radius: 0 0 7px 7px;
                }
                .cps003.setting-dialog .form-group .ntsHelpButton button {
                  font-size: 0.8rem;
                }
                </style>
                <div class="form-group">
                    <div data-bind="ntsFormLabel: { text: i18n('CPS003_25') }"></div>
                    <button data-bind="ntsHelpButton: {textId: 'CPS003_26', position: 'bottom center' }">?</button>
                    <div data-bind="ntsComboBox: {
                            width: 60,
                            name: i18n('CPS003_25'),
                            value: cursorDirection,
                            options: ko.observableArray([
                                { type: 'VERTICAL', name: '縦' },
                                { type: 'HORIZONTAL', name: '横' }
                            ]),
                            optionsText: 'name',
                            optionsValue: 'type',
                            visibleItemsCount: 10,
                            dropDownAttachedToBody: true,
                            columns: [
                                { prop: 'name', length: 14}
                            ]
                        }"></div>
                </div>
                <div class="form-group">
                    <div class="checkbox-label" data-bind="ntsFormLabel: { text: i18n('CPS003_27') }"></div>
                    <div class="checkbox-multi" data-bind="ntsMultiCheckBox: {
                            options: ko.observableArray([
                                { id: 1, name: i18n('CPS003_28'), enable: false },
                                { id: 2, name: i18n('CPS003_29'), enable: false },
                                { id: 3, name: i18n('CPS003_30'), enable: true },
                                { id: 4, name: i18n('CPS003_31'), enable: true },
                                { id: 5, name: i18n('CPS003_32'), enable: true },
                                { id: 6, name: i18n('CPS003_33'), enable: true },
                                { id: 7, name: i18n('CPS003_34'), enable: true }
                            ]),
                            optionsValue: 'id',
                            optionsText: 'name',
                            value: fixCols,
                            enable: true
                        }"></div>
                </div>
                <div class="form-group btn-group">
                    <button class="x-large proceed" data-bind="text: i18n('CPS003_35'), click: pushData"></button>
                </div>`,
                dialogVm = {
                    i18n: nts.uk.resource.getText,
                    cursorDirection: ko.observable(CURSOR_DIRC.VERTICAL),
                    fixCols: ko.observableArray([]),
                    pushData: () => {
                        let fixCols: Array<number> = ko.toJS(dialogVm.fixCols) || [],
                            access: KnockoutObservable<ISetting> = valueAccessor() ||
                                ko.observable({
                                    "cursorDirection": CURSOR_DIRC.VERTICAL,
                                    "clsATR": NOT_USE,
                                    "jobATR": NOT_USE,
                                    "workPlaceATR": NOT_USE,
                                    "departmentATR": NOT_USE,
                                    "employmentATR": NOT_USE,
                                }), setting: ISetting = {
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
                        }).done(() => {
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
            ko.utils.registerEventHandler(element, 'click', (evt: MouseEvent) => {
                if (document.body.contains(dialog)) {
                    document.body.removeChild(dialog);
                } else {
                    let bound = element.getBoundingClientRect(),
                        access: ISetting = ko.toJS(valueAccessor()) || {
                            "cursorDirection": CURSOR_DIRC.VERTICAL,
                            "clsATR": NOT_USE,
                            "jobATR": NOT_USE,
                            "workPlaceATR": NOT_USE,
                            "departmentATR": NOT_USE,
                            "employmentATR": NOT_USE,
                        }, fixCols: Array<number> = [
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
                    dialogVm.fixCols(fixCols.filter(f => f != -1));
                    dialogVm.cursorDirection(access.cursorDirection || CURSOR_DIRC.VERTICAL);
                }
            });

            // hide dialog
            ko.utils.registerEventHandler(document, 'click', (evt: MouseEvent) => {
                if (evt.target != element && document.body.contains(dialog) && !dialog.contains(evt.target)) {
                    let bound = dialog.getBoundingClientRect();

                    if (bound.top > evt.pageY || bound.right < evt.pageX || bound.bottom < evt.pageY || bound.left > evt.pageX) {
                        document.body.removeChild(dialog);
                    }
                }
            });

            return { controlsDescendantBindings: true };
        }
    }
}

ko.bindingHandlers["cps003Setting"] = new nts.custombinding.SettingButtonControl();