module nts.uk.com.view.cmf005.f.viewmodel {

    import close = nts.uk.ui.windows.close;
    import model = cmf005.share.model;
    import getText = nts.uk.resource.getText;

    export class ScreenModel {
        // dialog mode
        dialogMode: KnockoutObservable<string>;

        // interval 1000ms request to server
        interval: any;

        // received delId from E
        delId: KnockoutObservable<string>;

        // time when start process
        timeStart: any;
        timeNow: any;

        // F2_1_2
        timeOver: KnockoutObservable<string>;
        // F2_2_2, F2_2_3,F2_2_4
        status: KnockoutObservable<string>;
        categoryCount: KnockoutObservable<number>;
        categoryTotalCount: KnockoutObservable<number>;
        categoryPercentProcess: KnockoutObservable<string>;
        errorCount: KnockoutObservable<String>;

        // F3
        deleteSetName: string;
        saveBeforDelete: string;
        dateStartValue: string;
        dateEndValue: string;
        monthStartValue: string;
        monthEndValue: string;
        yearStartValue: string;
        yearEndValue: string;

        // received dataManagementDel from server
        dataManagementDel: KnockoutObservable<string>;
        
        //button
        btnCloseDisplay: KnockoutObservable<boolean>;
        
        enableDate: KnockoutObservable<boolean>;
        enableMonth: KnockoutObservable<boolean>;
        enableYear: KnockoutObservable<boolean>;
        modal: any;
        
        constructor() {
            var self = this;
            var params = nts.uk.ui.windows.getShared("CMF005_E_PARAMS");
            self.delId = ko.observable("");
            self.timeStart = new Date();
            self.timeOver = ko.observable('00:00:00');
            self.dataManagementDel = ko.observable({});
            self.modal = params.modal;

            self.delId(params.delId);

            //F3
            self.deleteSetName = params.deleteSetName;
            if (params.saveBeforDelete == model.SAVE_BEFOR_DELETE_ATR.YES) {
                self.saveBeforDelete = getText('CMF005_35');
            } else if (params.saveBeforDelete == model.SAVE_BEFOR_DELETE_ATR.NO) {
                self.saveBeforDelete = getText('CMF005_36');
            }
            
            if (params.dateValue.startDate) {
                self.dateStartValue = moment.utc(params.dateValue.startDate, 'YYYY/MM/DD').format("YYYY/MM/DD");
            }
            else {
                self.dateStartValue = '';
            }
            
            if (params.dateValue.endDate) {
                self.dateEndValue = moment.utc(params.dateValue.endDate, 'YYYY/MM/DD').format("YYYY/MM/DD");
            } 
            else {
                self.dateEndValue = '';
            }
            
            if (params.monthValue.startDate) {
                self.monthStartValue = moment.utc(params.monthValue.startDate, 'YYYY/MM/DD').format("YYYY/MM");
            }
            else {
                self.monthStartValue = '';
            }
            
            if (params.monthValue.endDate) {
                self.monthEndValue = moment.utc(params.monthValue.endDate, 'YYYY/MM/DD').format("YYYY/MM");
            }
            else {
                self.monthEndValue = '';
            }
            
            if (params.yearValue.startDate) {
                self.yearStartValue = moment.utc(params.yearValue.startDate, 'YYYY/MM/DD').format("YYYY");
            }
            else {
                self.yearStartValue = '';
            }
            
            if (params.yearValue.endDate) {
                self.yearEndValue = moment.utc(params.yearValue.endDate, 'YYYY/MM/DD').format("YYYY");
            }
            else {
                self.yearEndValue = '';
            }

            // init F2_2_2, F2_2_3,F2_2_4
            self.status = ko.observable('');
            self.categoryCount = ko.observable(0);
            self.categoryTotalCount = ko.observable(0);
            self.categoryPercentProcess = ko.observable("0/0");
            self.errorCount = ko.observable("0件");
            self.dialogMode = ko.observable("deleting"); 
             $("#F10_1").focus();
            
            self.enableDate = ko.observable(true);
            self.enableMonth = ko.observable(true);
            self.enableYear = ko.observable(true);
            
            if (self.dateStartValue == '' && self.dateEndValue == '') {
                self.enableDate(false);
            }
            
             if (self.monthStartValue == '' && self.monthEndValue == '') {
                self.enableMonth(false);
            }
            
             if (self.yearStartValue == '' && self.yearEndValue == '') {
                self.enableYear(false);
            }

        }

        start(): JQueryPromise<any> {
            let self = this,
                dfd = $.Deferred();
            // Management deletion monitoring process 
            service.addManualSetDel(self.modal).then(data => {
              self.delId(data);
              self.interval = setInterval(() => self.confirmProcess(), 1000);
            });
            $("#F10_2").focus();
            dfd.resolve();
            return dfd.promise();
        }
        /**
           * confirm process after 1s
           */
        public confirmProcess(): void {
            let self = this;
            let delId = self.delId();
                
            // F2_1_2 set time over 
            self.timeNow = new Date();
            let over = (self.timeNow.getSeconds() + self.timeNow.getMinutes() * 60 + self.timeNow.getHours() * 60) - (self.timeStart.getSeconds() + self.timeStart.getMinutes() * 60 + self.timeStart.getHours() * 60);
            let time = new Date(null);
            time.setSeconds(over); // setting value for SECONDS here
            let result = time.toISOString().substr(11, 8);
            self.timeOver(result);
          
            // get information managerment Deletion
            service.findManagementDel(delId).done(function(res: any) {
                var managementDel = res;
                
                // F2_2_2, F2_2_3,F2_2_4
                self.status(getStatusEnum(managementDel.operatingCondition));
                self.categoryPercentProcess(managementDel.categoryCount + "/" + managementDel.totalCategoryCount);
                self.errorCount(managementDel.errorCount+"件");

                // update mode when end: DONE, INTERRUPTION_END, ABNORMAL_TERMINATION
                // 完了, 中断終了, 異常終了
                if ((managementDel.operatingCondition == 4) || (managementDel.operatingCondition == 5) || (managementDel.operatingCondition == 6)) {
                    
                    // stop auto request to server
                    window.clearInterval(self.interval);

                    // end: update dialog to Error/Interrupt mode
                    if ((managementDel.operatingCondition == 5) || (managementDel.operatingCondition == 6)) {
                        self.dialogMode("error_interrupt");
                    }

                    // end: update dialog to complete mode
                    if (managementDel.operatingCondition == 4) {
                        self.dialogMode("done");
                        $("#F10_2").focus();
                    }

                    
                    
                     // delete dataManagementDel of process when end
                     let dataManagementDel = new DataManagementDel(delId, 0, 0, 0, 0, 0);
                     service.deleteManagementDel(dataManagementDel).done(function(res: any) {
                     }).fail(function(res: any) {
    
                    });
                }

            }).fail(function(res: any) {

            });
        }

        // process when click button interrupt
        public interrupt(): void {
            let self = this;
            let dataManagementDel = new DataManagementDel(self.delId(), 1, 0, 0, 0, 5);

            nts.uk.ui.dialog.confirm({ messageId: "Msg_387" })
                .ifYes(() => {
                    service.setInterruptDeleting(dataManagementDel).done(function(res: any) {
                        self.dialogMode("done");
                        $("#F10_2").focus();
                    }).fail(function(res: any) {

                    });
                })
                .ifNo(() => {
                    return;
                });
        }

        //  process when click button closePopup 
        closePopup() {
            close();
        }
    }
    class DataManagementDel {
        delId : string;
        isInterruptedFlg: number;
        categoryCount: number;
        totalCategoryCount: number;
        errorCount: number;
        operatingCondition: number;
        
        constructor(delId : string, isInterruptedFlg: number, categoryCount: number,
                totalCategoryCount: number, errorCount: number, operatingCondition: number) {
            this.delId = delId;
            this.isInterruptedFlg = isInterruptedFlg;
            this.categoryCount = categoryCount;
            this.totalCategoryCount = totalCategoryCount;
            this.errorCount = errorCount;
            this.operatingCondition = operatingCondition;
            }
    }

    function getStatusEnum(value) {
       
        if (value && value == model.OPERATING_CONDITION.INPREPARATION) {
            return getText('Enum_OperatingCondition_INPREPARATION');
        } else if (value && value == model.OPERATING_CONDITION.SAVING) {
            return getText('Enum_OperatingCondition_SAVING');
        } else if (value && value == model.OPERATING_CONDITION.INPROGRESS) {
            return getText('Enum_OperatingCondition_INPROGRESS');
        } else if (value && value == model.OPERATING_CONDITION.DELETING) {
            return getText('Enum_OperatingCondition_DELETING');
        } else if (value && value == model.OPERATING_CONDITION.DONE) {
            return getText('Enum_OperatingCondition_DONE');
        } else if (value && value == model.OPERATING_CONDITION.INTERRUPTION_END) {
            return getText('Enum_OperatingCondition_INTERRUPTION_END');
        } else if (value && value == model.OPERATING_CONDITION.ABNORMAL_TERMINATION) {
            return getText('Enum_OperatingCondition_ABNORMAL_TERMINATION');
        }
    }

}






