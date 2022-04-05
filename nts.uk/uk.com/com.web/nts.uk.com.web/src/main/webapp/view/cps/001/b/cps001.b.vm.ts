module cps001.b.vm {
    import text = nts.uk.resource.getText;
    import alert = nts.uk.ui.dialog.alert;
    import close = nts.uk.ui.windows.close;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import showDialog = nts.uk.ui.dialog;

    let __viewContext: any = window['__viewContext'] || {},
        block = window["nts"]["uk"]["ui"]["block"]["grayout"],
        unblock = window["nts"]["uk"]["ui"]["block"]["clear"],
        invisible = window["nts"]["uk"]["ui"]["block"]["invisible"];

    export class ViewModel {

        empDelete: KnockoutObservable<ModelDelete> = ko.observable(new ModelDelete({ code: '', name: '', reason: '' }));

        constructor() {
            let self = this,
                empDelete: ModelDelete = self.empDelete(),
                dataShare: IDataShare = getShared('CPS001B_PARAMS') || null;

            if (dataShare) {

                // Gọi service tải dữ liệu employee
                service.getEmployeeInfo(dataShare.sid).done((data: IModelDto) => {
                    if (data) {
                        empDelete.code(data.code); // scd
                        empDelete.reason(data.reason); // reason delete
                    }
                });

                // Gọi service tải dữ liệu name of person
                service.getPersonInfo(dataShare.pid).done((data: IModelDto) => {
                    if (data) {
                        empDelete.name(data.name);
                    }
                });

            }
        }

        pushData() {
            let self = this,
                empDelete: IModelDto = ko.toJS(self.empDelete);

            if (nts.uk.ui.errors.hasError()) {
                return;
            }

            nts.uk.ui.dialog.confirm({ messageId: "Msg_18" }).ifYes(() => {
                let self = this,
                    dataShare: IDataShare = getShared('CPS001B_PARAMS') || null;
                if (dataShare) {
                    let command = { sId: dataShare.sid, reason: empDelete.reason };
                    block();
                    service.deleteEmp(command).done(() => {
                        showDialog.info({ messageId: "Msg_16" }).then(function() {
                            setShared('CPS001B_VALUES', {
                                status: 'deleled'
                            });
                            unblock();
                            close();
                        });
                    }).fail((mes) => {
                        unblock();
                    });
                }
            }).ifNo(() => {
                unblock();
            });
        }

        close() {
            close();
        }
    }

    // Object truyen tu man A sang
    interface IDataShare {
        sid: string;
        pid: string;
    }

    interface IModelDto {
        code: string;
        name: string;
        reason: string;
    }

    class ModelDelete {
        code: KnockoutObservable<string> = ko.observable('');
        name: KnockoutObservable<string> = ko.observable('');
        reason: KnockoutObservable<string> = ko.observable('');

        constructor(param: IModelDto) {
            let self = this;

            if (param) {
                self.code(param.code || '');
                self.name(param.name || '');
                self.reason(param.reason || '');
            }
        }
    }
}