module nts.uk.com.view.cdl004.a {

    import ListType = kcp.share.list.ListType;
    import SelectType = kcp.share.list.SelectType;
    import ComponentOption = kcp.share.list.ComponentOption;

    export module viewmodel {
        /**
        * Screen Model.
        */
        export class ScreenModel {
            selectedMulJobtitle: KnockoutObservableArray<string>;
            selectedSelJobtitle: KnockoutObservable<string>;
            baseDate: KnockoutObservable<Date>;
            jobtitles: ComponentOption;
            isMultiple: boolean;
            isMultipleUse: boolean;
            isShowAlreadySet: boolean;
            isShowNoSelectRow: boolean;
            constructor(){
                var self = this;
                self.selectedMulJobtitle = ko.observableArray([]);
                self.selectedSelJobtitle = ko.observable('');
                self.isMultiple = false;
                self.isMultipleUse = false;
                self.isShowAlreadySet = false;
                self.isShowNoSelectRow = false;
                self.baseDate = ko.observable(new Date());
                var inputCDL004 = nts.uk.ui.windows.getShared('inputCDL004');
                if(inputCDL004){
                    self.isMultiple = inputCDL004.isMultiple;
                     if (_.isNil(inputCDL004.isShowBaseDate)) {
                        self.isMultipleUse = true;
                    } else {
                        self.isMultipleUse = inputCDL004.isShowBaseDate ? true : false;
                    }
                    self.baseDate(inputCDL004.baseDate);
                    self.isShowNoSelectRow = inputCDL004.showNoSelection;
                    if (self.isMultiple) {
                        self.selectedMulJobtitle(inputCDL004.selectedCodes ? inputCDL004.selectedCodes : []);
                    }   
                    else {
                        self.selectedSelJobtitle(inputCDL004.selectedCodes);
                    } 
                }
                
                self.jobtitles = {
                    isShowAlreadySet: self.isShowAlreadySet,
                    baseDate: self.baseDate,
                    isMultiSelect: self.isMultiple,
                    isMultipleUse: self.isMultipleUse,
                    listType: ListType.JOB_TITLE,
                    selectType: SelectType.SELECT_BY_SELECTED_CODE,
                    isShowNoSelectRow:  self.isShowNoSelectRow,
                    selectedCode: null,
                    isDialog: true,
                    maxRows: 12,
                    tabindex: 1
                }
                if (self.isMultiple) {
                    self.jobtitles.selectedCode = self.selectedMulJobtitle;
                }
                else {
                    self.jobtitles.selectedCode = self.selectedSelJobtitle;
                }
            }
            
            /**
             * function on click button selected job title
             */
            private selectedJobtitle() :void {
                let self = this;
                if(self.isMultiple && self.selectedMulJobtitle().length == 0) {
                    nts.uk.ui.dialog.alertError({ messageId: "Msg_642" });
                    return;
                }
                var isNoSelectRowSelected = $("#jobtitle").isNoSelectRowSelected();
                if (!self.isMultiple && !self.selectedSelJobtitle() && !isNoSelectRowSelected) {
                    nts.uk.ui.dialog.alertError({ messageId: "Msg_642" });
                    return;
                }
                nts.uk.ui.windows.setShared('outputCDL004', self.isMultiple ? self.selectedMulJobtitle() : self.selectedSelJobtitle());
                nts.uk.ui.windows.close();   
            }
            
            /**
             * function check job title
             */
            public checkExistJobtile(code: string, data: UnitModel[]): boolean {
                for (var item of data) {
                    if (code === item.id) {
                        return true;
                    }
                }
                return false;
            }
            /**
             * close windows
             */
            private closeWindows(): void{
                nts.uk.ui.windows.setShared('CDL004Cancel', true);
                nts.uk.ui.windows.close();  
            }
        }
    }
}