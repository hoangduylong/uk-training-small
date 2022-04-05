module nts.uk.com.view.cdl002.a {
    import close = nts.uk.ui.windows.close;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import SelectType = kcp.share.list.SelectType;
    export module viewmodel {
        export class ScreenModel {
            selectedMulEmployment: KnockoutObservableArray<string>;
            selectedSelEmployment: KnockoutObservable<string>;
            isMultiSelect: KnockoutObservable<boolean>;
            isDisplayUnselect: KnockoutObservable<boolean>;
            isShowWorkClosure: KnockoutObservable<boolean>;
            isCheckShowWorkClosure: boolean;
            
            listComponentOption: any;
            constructor() {
                let self = this;
                var params = getShared('CDL002Params');
                self.selectedMulEmployment = ko.observableArray([]);
                self.selectedSelEmployment = ko.observable('');
                self.isMultiSelect = ko.observable(params.isMultiple);
                self.isShowWorkClosure = ko.observable(false);
                 self.isCheckShowWorkClosure = false;
                if (self.isMultiSelect()) {
                    self.selectedMulEmployment(params.selectedCodes ? params.selectedCodes : []);
                }
                else {
                    if (params.selectedCodes.length > 0) {
                        self.selectedSelEmployment(params.selectedCodes[0]);
                    }
                }
                
                // If Selection Mode is Multiple Then not show Unselected Row
                self.isDisplayUnselect = ko.observable(self.isMultiSelect() ? false : params.showNoSelection);
                
                // Set value for Multiple Use by isShowWorkClosure 
                if(_.isNil(params.isShowWorkClosure)){
                    self.isCheckShowWorkClosure = true;                             
                } else{
                    self.isCheckShowWorkClosure = params.isShowWorkClosure ? true : false;    
                }
                
                
                // Initial listComponentOption
                self.listComponentOption = {
                    isMultiSelect: self.isMultiSelect(),
                    isDisplayClosureSelection: self.isCheckShowWorkClosure,
                    listType: ListType.EMPLOYMENT,
                    selectType: SelectType.SELECT_BY_SELECTED_CODE,
                    selectedCode: params.selectedCodes,
                    isDialog: true,
                    selectedClosureId: ko.observable(null),
                    isShowNoSelectRow: self.isDisplayUnselect(),
                    maxRows: 10,
                    isSelectAllAfterReload: false,
                    tabindex: 1,
                    backupSelectedCode: params.selectedCodes
                };
                if (self.isMultiSelect()) {
                    self.listComponentOption.selectedCode = self.selectedMulEmployment;
                }
                else {
                    self.listComponentOption.selectedCode = self.selectedSelEmployment;
                }
            }

            /**
             * Close dialog.
             */
            closeDialog(): void {
                setShared('CDL002Cancel', true);
                nts.uk.ui.windows.close();
            }
            
            getClosureByEmployment(employmentId: string): JQueryPromise<any> {
                let dfd = $.Deferred<any>();

                nts.uk.request.ajax('at', "ctx/at/shared/workrule/closure/getclosuretiedbyemployment/" + employmentId).done((closureId: any) => {
                    dfd.resolve(closureId);
                });
                    return dfd.promise();
            }

            /**
             * Decide Employment
             */
            decideData = () => {
                let self = this;
                if(self.isMultiSelect() && self.selectedMulEmployment().length == 0) {
                    nts.uk.ui.dialog.alertError({ messageId: "Msg_640" });
                    return;
                }
                var isNoSelectRowSelected = $("#jobtitle").isNoSelectRowSelected();
                if (!self.isMultiSelect() && !self.selectedSelEmployment() && !isNoSelectRowSelected) {
                    nts.uk.ui.dialog.alertError({ messageId: "Msg_640" });
                    return;
                }
                setShared('CDL002Output', self.isMultiSelect() ? self.selectedMulEmployment() : self.selectedSelEmployment());
                close();
            }
            
            /**
             * function check employment
             */
            public checkExistEmployment(code: string, data: UnitModel[]): boolean {
                for (var item of data) {
                    if (code === item.code) {
                        return true;
                    }
                }
                return false;
            }
        }
        
        /**
        * List Type
        */
        export class ListType {
            static EMPLOYMENT = 1;
            static Classification = 2;
            static JOB_TITLE = 3;
            static EMPLOYEE = 4;
        }
        
    }
}