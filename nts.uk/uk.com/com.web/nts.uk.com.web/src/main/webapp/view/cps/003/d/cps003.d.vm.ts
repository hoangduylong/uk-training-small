module cps003.d.vm {
    import text = nts.uk.resource.getText;
    import alert = nts.uk.ui.dialog.alert;
    import close = nts.uk.ui.windows.close;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    let __viewContext: any = window['__viewContext'] || {};

    export class ViewModel {
        ctgId: KnockoutObservable<string> = ko.observable('');
        ctgName: KnockoutObservable<string> = ko.observable('');
        selecteds: KnockoutObservableArray<string> = ko.observableArray([]);
        dataSources: KnockoutObservableArray<any> = ko.observableArray([]);

        constructor() {
            let self = this,
                data: IModelDto = getShared('CPS003D_PARAM') || {};

            if (!data.id || !data.name) {
                self.close();
            } else {
                self.ctgId(data.id);
                self.ctgName(data.name);

                service.fetch.setting(data.id).done(resp => {
                    self.dataSources(_.orderBy(resp.perInfoData, ['dispOrder', 'itemCD']));
                });
            }
        }

        pushData() {
            let self = this,
                ctgId = ko.toJS(self.ctgId),
                selecteds = ko.toJS(self.selecteds),
                dataSources = ko.toJS(self.dataSources),
                personItems = dataSources.map(m => ({
                    pInfoCategoryID: ctgId,
                    pInfoItemDefiID: m.perInfoItemDefID,
                    columnWidth: m.width || 100,
                    regulationATR: selecteds.indexOf(m.perInfoItemDefID) > -1 ? 1 : 0
                }));

            service.push.setting({
                personInfoItems: personItems
            }).done(() => {
                setShared('CPS003D_VALUE', selecteds);

                self.close();
            });
        }

        close() {
            close();
        }
    }

    interface IModelDto {
        id: string;
        name: string;
    }
}