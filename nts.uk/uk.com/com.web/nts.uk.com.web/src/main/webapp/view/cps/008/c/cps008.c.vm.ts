module cps008.c.viewmodel {

    import modal = nts.uk.ui.windows.sub.modal;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import close = nts.uk.ui.windows.close;
    import showDialog = nts.uk.ui.dialog;

    let __viewContext: any = window['__viewContext'] || {},
        block = window["nts"]["uk"]["ui"]["block"]["grayout"],
        unblock = window["nts"]["uk"]["ui"]["block"]["clear"],
        invisible = window["nts"]["uk"]["ui"]["block"]["invisible"];

    export class ViewModel {
        layout: KnockoutObservable<Layout> = ko.observable(new Layout({ id: '', code: '', name: '' }));
        overrideMode: KnockoutObservable<boolean> = ko.observable(false);

        constructor() {
            let self = this,
                layout: Layout = self.layout(),
                _data = getShared('CPS008_PARAM');

            layout.id.subscribe(id => {
                // call service for get code, name of layout
                service.getDetails(id).done((data: any) => {
                    if (data) {
                        layout.code(data.layoutCode);
                        layout.name(data.layoutName);
                        $("#C_INP_CODE").focus();
                    }
                });
            });
            layout.id(_data.id);
        }

        coppyBtn() {
            let self = this,
                layout: ILayout = ko.toJS(self.layout),
                _data = getShared('CPS008_PARAM');

            $("#C_INP_CODE").trigger("validate");
            $("#C_INP_NAME").trigger("validate");

            if (nts.uk.ui.errors.hasError()) {
                return;
            }

            if (layout.newCode == layout.code) {
                nts.uk.ui.dialog.alert({ messageId: "Msg_355" });
                return;
            } else if (layout.newCode && layout.newName) {
                let command = {
                    id: layout.id,
                    code: layout.newCode,
                    name: layout.newName,
                    classifications: _data.outData,
                    action: self.overrideMode() ? LAYOUT_ACTION.OVERRIDE : LAYOUT_ACTION.COPY
                };
                // call saveData service
                invisible();
                service.saveData(command).done((data: any) => {
                    showDialog.info({ messageId: "Msg_20" }).then(function() {
                        unblock();
                        setShared('CPS008C_RESPONE', command.code);
                        self.close();
                    });
                }).fail((error: any) => {
                    if (error.message == 'Msg_3') {
                        showDialog.alert({ messageId: "Msg_3" }).then(function() {
                            unblock();
                            $("#C_INP_CODE").focus();
                            setShared('CPS008C_RESPONE', null);
                        });
                    }
                });
            }
        }

        close() {
            close();
        }
    }

    interface ILayout {
        id: string;
        code: string;
        name: string;
        newCode?: string;
        newName?: string;
        overrideMode?: boolean;
    }

    enum LAYOUT_ACTION {
        INSERT = 0,
        UPDATE = 1,
        COPY = 2,
        OVERRIDE = 3,
        REMOVE = 4
    }

    class Layout {
        id: KnockoutObservable<string> = ko.observable('');
        code: KnockoutObservable<string> = ko.observable('');
        name: KnockoutObservable<string> = ko.observable('');

        newCode: KnockoutObservable<string> = ko.observable('');
        newName: KnockoutObservable<string> = ko.observable('');


        constructor(param: ILayout) {
            let self = this;

            if (param) {
                self.id(param.id || '');
                self.code(param.code || '');
                self.name(param.name || '');

                self.newCode(param.newCode || '');
                self.newName(param.newName || '');
                //self.overrideMode(param.overrideMode || false);
            }
        }
    }
}