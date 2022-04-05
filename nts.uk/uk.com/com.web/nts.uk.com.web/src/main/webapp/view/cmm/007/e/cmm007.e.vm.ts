module nts.uk.com.view.cmm007.e {
    
    import OvertimeWorkFrameDto = model.OvertimeWorkFrameDto;
    import OvertimeWorkFrameSaveCommand = model.OvertimeWorkFrameSaveCommand;
    import blockUI = nts.uk.ui.block;
    
    export module viewmodel {
        export class ScreenModel {
            mapObj: KnockoutObservable<Map<number, model.OvertimeWorkFrameDto>>;
            checkStatusSetOptions: KnockoutObservableArray<any>;
            
            constructor(){
                let _self = this;
                _self.mapObj = new Map<number, model.OvertimeWorkFrameDto>();
                _self.checkStatusSetOptions = ko.observableArray([
                    { code: true, name: nts.uk.resource.getText("CMM007_101") },
                    { code: false, name: nts.uk.resource.getText("CMM007_102") }
                ]);
            }
            
             /**
             * init default data when start page
             */
            public start_page(): JQueryPromise<void> {
                let dfd = $.Deferred<void>();
                let _self = this;
                
                _self.findAll().done(() => {
                    dfd.resolve();
                });

                return dfd.promise();
            }
            
            /**
             * Save overtime work frame setting
             */
            public saveOvertimeWorkFrSetting(): JQueryPromise<void> {
                let _self = this;
                
                if (_self.hasError()) {
                    return true;    
                }
                
                var dfd = $.Deferred<void>();
               
               let arrDto = new Array<model.OvertimeWorkFrameDto>();
                
                _self.mapObj.forEach((value: number, key: model.OvertimeWorkFrameDto) => {
                    arrDto.push(value); 
                });
                
                nts.uk.ui.block.grayout();
                service.saveOvertimeWorkFrame(arrDto).done(() => {
                    _self.findAll().done(() => {
                    });
                    nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(() => {
                        $('#overtime_work_name1').focus();
                    });
                    dfd.resolve();
                    
                }).fail(function() {
//                    console.log("fail");
                }).always(() => {
                    nts.uk.ui.block.clear();
                });
                  
                return dfd.promise();
            }
            
            public findAll(): JQueryPromise<void> {
                let _self = this;
                let dfd = $.Deferred<void>();
                service.findListOvertimeWorkFrame().done((data) => {
                    let objTemp: model.OvertimeWorkFrameDto;
                    
                    _.forEach(data, function(value) {
                        if (typeof _self.mapObj.get(value.overtimeWorkFrNo) === "undefined") {
                            objTemp = new model.OvertimeWorkFrameDto(value.overtimeWorkFrNo, value.overtimeWorkFrName, value.transferFrName, value.useAtr);
                            _self.mapObj.set(value.overtimeWorkFrNo, objTemp);      
                        } else {
                            _self.mapObj.get(value.overtimeWorkFrNo).overtimeWorkFrName(value.overtimeWorkFrName);
                            _self.mapObj.get(value.overtimeWorkFrNo).transferFrName(value.transferFrName);
                            _self.mapObj.get(value.overtimeWorkFrNo).useAtr(value.useAtr);
                        }
                        
                    });
                    
                    dfd.resolve();
                    
                }).fail(function(data) {
//                    console.log(data);
                });
                return dfd.promise();
            }
        
            public checkStatusEnable(value): KnockoutComputed<boolean> {
                let _self = this;
                return ko.computed(() => _self.mapObj.get(value).useAtr() == USE_CLASSIFICATION.USE);
            }
        
            public myFunction(value): void {
                let _self = this;
                _self.mapObj.get(value).useAtr() == USE_CLASSIFICATION.USE ? _self.mapObj.get(value).useAtr(0) : _self.mapObj.get(value).useAtr(1);
                if (_self.mapObj.get(value).useAtr() == USE_CLASSIFICATION.USE) {
                    $('#overtime_work_name' + value).ntsEditor("validate");
                    $('#tranfer_work_name' + value).ntsEditor("validate");
                } else {
                    $('#overtime_work_name' + value).ntsEditor("clear");
                    $('#tranfer_work_name' + value).ntsEditor("clear");    
                }
            }
            
             /**
             * Check Errors all input.
             */
            private hasError(): boolean {
                let _self = this;
                _self.clearErrors();
                for (let i=1; i<=10; i++) {
                    if (_self.mapObj.get(i).useAtr() == USE_CLASSIFICATION.USE) {
                        $('#overtime_work_name' + i).ntsEditor("validate");
                        $('#tranfer_work_name' + i).ntsEditor("validate");    
                    }
                        
                }
                if ($('.nts-input').ntsError('hasError')) {
                    return true;
                }
                return false;
            }

            /**
             * Clear Errors
             */
            private clearErrors(): void {
                let _self = this;
                 // Clear errors
                for (let i=1; i<=10; i++) {
                    if (_self.mapObj.get(i).useAtr() == USE_CLASSIFICATION.USE) {
                        $('#overtime_work_name' + i).ntsEditor("clear");
                        $('#tranfer_work_name' + i).ntsEditor("clear");    
                    }    
                }
                
                // Clear error inputs
                $('.nts-input').ntsError('clear');
            }
       }
    }
    
     module USE_CLASSIFICATION {
        export const NOT_USE: number = 0;                        
        export const USE: number = 1;                           
    }
}