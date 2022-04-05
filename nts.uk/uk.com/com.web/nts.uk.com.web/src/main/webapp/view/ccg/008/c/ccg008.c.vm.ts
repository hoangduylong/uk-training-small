module nts.uk.com.view.ccg008.c {
    export module viewmodel {
        export class ScreenModel {
            dataItems: KnockoutObservableArray<model.Node>;
            selectedCode: KnockoutObservable<string>;
            columns: KnockoutObservableArray<any>;
            itemSelected: KnockoutObservable<model.TopPageSelfSet>;
            constructor() {
                var self = this;
                self.columns = ko.observableArray([
                    { headerText: 'コード', key: 'code', width: 100, hidden: true},
                    { headerText: nts.uk.resource.getText("CCG008_8"), key: 'name', formatter: _.escape }
                ]);
                self.dataItems = ko.observableArray([]);
                self.itemSelected = ko.observable(null);
                self.selectedCode = ko.observable(null);
            }
            /**
             * When 起動 
             * Get data from domain トップページ va 標準メニュー
             * Get data from domain 本人トップページ設定 
             */
            start(): JQueryPromise<any> {
                var self = this;
                var dfd = $.Deferred<void>();
                //Get data from domain トップページ
                service.getSelectMyTopPage().done(function(lst: Array<model.Node>) {
                    $("#btnSave").focus();
                    if (lst === null || lst === undefined || lst.length == 0) {
                        self.dataItems([]);
                        self.selectedCode();
                    } else {
                        var items = [];
                        _.map(lst, function(item: any) {
                            items.push({"code":item.code , "name": item.name});
                        });
                        self.dataItems(items);
                        //Get data from domain 本人トップページ設定 
                        service.getTopPageSelfSet().done(function(topPageSelfSet: model.TopPageSelfSet) {
                            if(topPageSelfSet===null|| topPageSelfSet===undefined){
                                //data is empty
                                self.selectedCode();
                            }else{
                                self.selectedCode(topPageSelfSet.code);
                            }
                        })
                        dfd.resolve();
                    }
                    dfd.resolve();
                }).fail(function(err) {
                    nts.uk.ui.dialog.alert(err);
                });
                return dfd.promise();
            }
            /**
             * Find item is selected
             */
            find(code: string): any {
                let self = this;
                var itemModel = null;
                return _.find(self.dataItems(), function(obj: any) {
                return  obj.code == code;
                })
            }
            /**
             * When click button 決定
             * Regidter top page self set
             */
            register(): void {
                var self = this;
                let test = self.find(self.selectedCode());
                //khong co item nao duoc chon
                if(!test){
                    nts.uk.ui.dialog.alertError({ messageId: "Msg_218",  messageParams: [nts.uk.resource.getText("CCG008_1")]});
                }else{
                    //co item duoc chon
                    let data = new model.TopPageSelfSet(self.selectedCode());
                    service.save(data).done(function(res) {
                        nts.uk.ui.windows.close();
                    }).fail(function(err) {
                        nts.uk.ui.dialog.alert(err);
                    });
                }
            }
            /**
             * When click button キャンセル
             * Close dialof
             */
            closeDialog() {
                nts.uk.ui.windows.close();
            }
        }
    }
    export module model {
        export class Node {
            code: string;
            name: string;
            constructor(code: string, name: string) {
                this.code = code;
                this.name = name;
            }
        }
        export class TopPageSelfSet {
            code: string;
            constructor(code: string) {
                this.code = code;
            }
        }
    }
}