module nts.uk.com.view.cmm018.i {
    export module viewmodel {
        import vmbase = cmm018.shr.vmbase;
        import getShared = nts.uk.ui.windows.getShared;
        import setShared = nts.uk.ui.windows.setShared;
        export class ScreenModel {
            copyDataFlag: KnockoutObservable<boolean>;
            beginStartDate: KnockoutObservable<string>;
            newStartDate: KnockoutObservable<string>;
            item: KnockoutObservable<string>;
            dataSource: vmbase.IData_Param;
            addNew: boolean = false;
            constructor() {
                var self = this;
                self.copyDataFlag = ko.observable(true);
                self.dataSource = getShared('CMM018I_PARAM');
                self.item = ko.observable(self.dataSource.name);
                //TH: add New
                if (self.dataSource.startDate == '') {
                    self.addNew = true;
                    self.beginStartDate = ko.observable(moment('1900/01/01').format("YYYY/MM/DD"));
                }else{
                    self.beginStartDate = ko.observable(moment(self.dataSource.startDate).add(1, 'days').format("YYYY/MM/DD"));
                }
                self.newStartDate = ko.observable(null);
            }
            
            /**
             * process parameter and close dialog 
             */
            submitAndCloseDialog(): void {
                var self = this;
                $("#startDateInput").trigger("validate");
                if(!self.addNew){
                    if(!vmbase.ProcessHandler.validateDateInput(self.newStartDate(),self.beginStartDate())){
                        //$("#startDateInput").ntsError('set', {messageId:"Msg_153"});
                        nts.uk.ui.dialog.alertError({messageId: "Msg_153"}).then(function(){
                            $("#startDateInput").focus();
                        });
                        return;
                    }
                }
                if (!nts.uk.ui.errors.hasError()){
                    let data: vmbase.IData = new vmbase.IData(self.newStartDate(), self.dataSource.startDate, self.dataSource.check, self.dataSource.mode, self.copyDataFlag(),self.dataSource.lstAppType, self.dataSource.overLap);
                    setShared('CMM018I_DATA', data);
                    nts.uk.ui.windows.close();
                }
                
            }
            /**
             * close dialog and do nothing
             */
            closeDialog(): void {
                $("#startDateInput").ntsError('clear');
                setShared('CMM018I_DATA', null);
                nts.uk.ui.windows.close();   
            }
        }

    }
}