module cmm042.d.viewmodel {
    import modal = nts.uk.ui.windows.sub.modal;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import showDialog = nts.uk.ui.dialog;
    import Text = nts.uk.resource.getText;
    import vl = nts.Setting.validate;
    import close = nts.uk.ui.windows.close;

    let __viewContext: any = window['__viewContext'] || {},
        block = window["nts"]["uk"]["ui"]["block"]["grayout"],
        unblock = window["nts"]["uk"]["ui"]["block"]["clear"],
        invisible = window["nts"]["uk"]["ui"]["block"]["invisible"];


    export class ViewModel {
        locations: KnockoutObservableArray<ILocation> = ko.observableArray([]);
        location: KnockoutObservable<Location> = ko.observable(new Location({ id: '', code: null, name: null }));
        idSelected = '';
        dataShare = null;

        constructor() {
            let self = this,
                location = self.location(),
                locations = self.locations;
            
            self.dataShare = getShared('CMM042D_PARAM');
            
            location.id.subscribe(id => {
                if (id) {
                    console.log(id);
                    self.idSelected = id;
                } else {
                    console.log('id undefined');
                }
            });
            
            self.start();
        }

        start(): JQueryPromise<any> {
            let self = this,
                dfd = $.Deferred(),
                location = self.location(),
                locations = self.locations;

            // get all Setting
            locations.removeAll();
            let _data: Array<ILocation> = [];
            for (i = 0; i < 30; i++) {
                let obj = {
                    id: nts.uk.util.randomId(),
                    name: 'location ' + i,
                    code: '00000' + i
                }
                _data.push(obj);
            }
            _.each(_data, d => locations.push(d));
            console.log('start');
            location.id(_data[0].id);
            location.id.valueHasMutated();
            dfd.resolve();
            return dfd.promise();
        }

        pushDataToAScreen() {
            let self = this,
                location = self.location(),
                locations = self.locations();

            if (nts.uk.ui.errors.hasError()) {
                return;
            }
        
            let objSelected = _.find(locations, function(o) { return o.id == self.idSelected; });
            setShared('CMM042D_VALUE', objSelected);
            close();
        }

        close() {
            close();
        }
    }
    
    interface ILocation {
        id: string;
        code: string;
        name: string;
    }

    class Location {
        id: KnockoutObservable<string> = ko.observable('');
        code: KnockoutObservable<string> = ko.observable('');
        name: KnockoutObservable<string> = ko.observable('');
        constructor(param: ISetting) {
            let self = this;

            if (param) {
                self.id(param.id || '');
                self.code(param.code || '');
                self.name(param.name || '');
            }
        }
    }

}