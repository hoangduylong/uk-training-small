module cdl022.a.vm {
    import text = nts.uk.resource.getText;
    import alert = nts.uk.ui.dialog.alert;
    import close = nts.uk.ui.windows.close;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    let __viewContext: any = window['__viewContext'] || {};

    export class ViewModel {
        sorts: KnockoutObservableArray<IModel> = ko.observableArray([]);

        constructor() {
            let self = this,
                params: Array<IModel> = getShared('CDL020_PARAMS') || [];

            if (!params || !params.length) {
                self.close();
            }

            self.sorts(params);
        }

        pushData = () => {
            let self = this,
                sorts: Array<IModel> = _.map(ko.unwrap(self.sorts), (x: IModel) => x);

            setShared('CDL020_VALUES', sorts);
            close();
        }

        close = () => {
            setShared('CDL020_VALUES', undefined);
            close();
        }
    }

    interface IModel {
        id: any;
        name: string;
    }
}