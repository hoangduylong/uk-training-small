module nts.uk.com.view.cmm018.l {
    export module viewmodel {
        export class ScreenModel {
            date: KnockoutObservable<Date>;
            sysAtr: number;
            lstAppName : Array<any> = [];
            constructor() {
                let self = this;
                self.date =ko.observable(moment(new Date()).toDate());
                let param = nts.uk.ui.windows.getShared('CMM018L_PARAM');
                self.sysAtr = param.sysAtr || 0;
                _.each(param.lstName, function(app){
                    self.lstAppName.push({value: app.value, name: app.localizedName, empRAtr: app.employRootAtr});
                });
            }
            //閉じるボタン
            closeDialog(){
                nts.uk.ui.windows.close();    
            }
            //Excel出力
            printExcel(){
                if(nts.uk.ui.errors.hasError()) { return; }
                var self = this;
                nts.uk.ui.block.grayout();
                service.saveExcel({sysAtr: self.sysAtr, baseDate: self.date(), lstAppName: self.lstAppName})
                .done(function(){nts.uk.ui.block.clear();})
                .fail(function(res: any){
					nts.uk.ui.dialog.alert({ messageId: res.messageId || res.message});  
                    nts.uk.ui.block.clear();
                })
            }
        }
    }
}
