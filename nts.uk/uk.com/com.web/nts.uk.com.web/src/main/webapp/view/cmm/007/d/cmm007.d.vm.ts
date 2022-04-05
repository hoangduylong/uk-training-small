module nts.uk.com.view.cmm007.d {
    import PlanYearHdFrameDto = model.PlanYearHdFrameDto;
    import PlanYearHdFrameSaveCommand = model.PlanYearHdFrameSaveCommand;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import blockUI = nts.uk.ui.block;
    
    export module viewmodel {
        export class ScreenModel {
            
            planYearHdFrNo1:  KnockoutObservable<number>;
            planYearHdFrCheckboxLabel1: string;
            isCheckedNo1: KnockoutObservable<boolean>;
            planYearHdFrName1:  KnockoutObservable<string>;
            enablePlanYearHdFrName1: KnockoutObservable<boolean>;
            requiredPlanYearHdFrName1: KnockoutObservable<boolean>;
            useAtrPlanYearHdFrName1: KnockoutObservable<number>;
            
            planYearHdFrNo2:  KnockoutObservable<number>;
            planYearHdFrCheckboxLabel2: string;
            isCheckedNo2: KnockoutObservable<boolean>;
            planYearHdFrName2:  KnockoutObservable<string>;
            enablePlanYearHdFrName2: KnockoutObservable<boolean>;
            requiredPlanYearHdFrName2: KnockoutObservable<boolean>;
            useAtrPlanYearHdFrName2: KnockoutObservable<number>;
            
            planYearHdFrNo3:  KnockoutObservable<number>;
            planYearHdFrCheckboxLabel3: string;
            isCheckedNo3: KnockoutObservable<boolean>;
            planYearHdFrName3:  KnockoutObservable<string>;
            enablePlanYearHdFrName3: KnockoutObservable<boolean>;
            requiredPlanYearHdFrName3: KnockoutObservable<boolean>;
            useAtrPlanYearHdFrName3: KnockoutObservable<number>;
            
            planYearHdFrNo4:  KnockoutObservable<number>;
            planYearHdFrCheckboxLabel4: string;
            isCheckedNo4: KnockoutObservable<boolean>;
            planYearHdFrName4:  KnockoutObservable<string>;
            enablePlanYearHdFrName4: KnockoutObservable<boolean>;
            requiredPlanYearHdFrName4: KnockoutObservable<boolean>;
            useAtrPlanYearHdFrName4: KnockoutObservable<number>;
            
            planYearHdFrNo5:  KnockoutObservable<number>;
            planYearHdFrCheckboxLabel5: string;
            isCheckedNo5: KnockoutObservable<boolean>;
            planYearHdFrName5:  KnockoutObservable<string>;
            enablePlanYearHdFrName5: KnockoutObservable<boolean>;
            requiredPlanYearHdFrName5: KnockoutObservable<boolean>;
            useAtrPlanYearHdFrName5: KnockoutObservable<number>;
            
            constructor(){
                let _self = this;
                
                _self.isCheckedNo1 = ko.observable(true);
                _self.planYearHdFrNo1 = ko.observable(PlanYearHdFrameNo.ONE);
                _self.planYearHdFrCheckboxLabel1 = nts.uk.resource.getText("CMM007_28");
                _self.planYearHdFrName1 = ko.observable("");
                _self.enablePlanYearHdFrName1 = ko.observable(true);
                _self.requiredPlanYearHdFrName1 = ko.observable(true);
                _self.useAtrPlanYearHdFrName1 = ko.observable(USE_CLASSIFICATION.USE);
                _self.isCheckedNo1.subscribe(function(value){
                    if(value == true){ 
                        _self.enablePlanYearHdFrName1(true);
                        _self.requiredPlanYearHdFrName1(true);
                        _self.useAtrPlanYearHdFrName1(USE_CLASSIFICATION.USE);
                        $('#plan_year_hd_frame1').ntsEditor("validate");
                    }else{ 
                        _self.enablePlanYearHdFrName1(false);
                        _self.requiredPlanYearHdFrName1(false);
                        _self.useAtrPlanYearHdFrName1(USE_CLASSIFICATION.NOT_USE);
                    }
                    
                });
                
                _self.isCheckedNo2 = ko.observable(true);
                _self.planYearHdFrNo2 = ko.observable(PlanYearHdFrameNo.TWO);
                _self.planYearHdFrCheckboxLabel2 = nts.uk.resource.getText("CMM007_29");
                _self.planYearHdFrName2 = ko.observable("");
                _self.enablePlanYearHdFrName2 = ko.observable(true);
                _self.requiredPlanYearHdFrName2 = ko.observable(true);
                _self.useAtrPlanYearHdFrName2 = ko.observable(USE_CLASSIFICATION.USE);
                _self.isCheckedNo2.subscribe(function(value){
                    if(value == true){ 
                        _self.enablePlanYearHdFrName2(true);
                        _self.requiredPlanYearHdFrName2(true);
                        _self.useAtrPlanYearHdFrName2(USE_CLASSIFICATION.USE);
                        $('#plan_year_hd_frame2').ntsEditor("validate");
                    }else{ 
                        _self.enablePlanYearHdFrName2(false);
                        _self.requiredPlanYearHdFrName2(false);
                        _self.useAtrPlanYearHdFrName2(USE_CLASSIFICATION.NOT_USE);
                    }
                    
                });
                
                _self.isCheckedNo3 = ko.observable(true);
                _self.planYearHdFrNo3 = ko.observable(PlanYearHdFrameNo.THREE);
                _self.planYearHdFrCheckboxLabel3 = nts.uk.resource.getText("CMM007_30");
                _self.planYearHdFrName3 = ko.observable("");
                _self.enablePlanYearHdFrName3 = ko.observable(true);
                _self.requiredPlanYearHdFrName3 = ko.observable(true);
                _self.useAtrPlanYearHdFrName3 = ko.observable(USE_CLASSIFICATION.USE);
                _self.isCheckedNo3.subscribe(function(value){
                    if(value == true){ 
                        _self.enablePlanYearHdFrName3(true);
                        _self.requiredPlanYearHdFrName3(true);
                        _self.useAtrPlanYearHdFrName3(USE_CLASSIFICATION.USE);
                        $('#plan_year_hd_frame3').ntsEditor("validate");
                    }else{ 
                        _self.enablePlanYearHdFrName3(false);
                        _self.requiredPlanYearHdFrName3(false);
                        _self.useAtrPlanYearHdFrName3(USE_CLASSIFICATION.NOT_USE);
                    }
                    
                });
                
                _self.isCheckedNo4 = ko.observable(true);
                _self.planYearHdFrNo4 = ko.observable(PlanYearHdFrameNo.FOUR);
                _self.planYearHdFrCheckboxLabel4 = nts.uk.resource.getText("CMM007_31");
                _self.planYearHdFrName4 = ko.observable("");
                _self.enablePlanYearHdFrName4 = ko.observable(true);
                _self.requiredPlanYearHdFrName4 = ko.observable(true);
                _self.useAtrPlanYearHdFrName4 = ko.observable(USE_CLASSIFICATION.USE);
                _self.isCheckedNo4.subscribe(function(value){
                    if(value == true){ 
                        _self.enablePlanYearHdFrName4(true);
                        _self.requiredPlanYearHdFrName4(true);
                        _self.useAtrPlanYearHdFrName4(USE_CLASSIFICATION.USE);
                        $('#plan_year_hd_frame4').ntsEditor("validate");
                    }else{ 
                        _self.enablePlanYearHdFrName4(false);
                        _self.requiredPlanYearHdFrName4(false);
                        _self.useAtrPlanYearHdFrName4(USE_CLASSIFICATION.NOT_USE);
                    }
                    
                });
                
                _self.isCheckedNo5 = ko.observable(true);
                _self.planYearHdFrNo5 = ko.observable(PlanYearHdFrameNo.FIVE);
                _self.planYearHdFrCheckboxLabel5 = nts.uk.resource.getText("CMM007_32");
                _self.planYearHdFrName5 = ko.observable("");
                _self.enablePlanYearHdFrName5 = ko.observable(true);
                _self.requiredPlanYearHdFrName5 = ko.observable(true);
                _self.useAtrPlanYearHdFrName5 = ko.observable(USE_CLASSIFICATION.USE);
                _self.isCheckedNo5.subscribe(function(value){
                    if(value == true){ 
                        _self.enablePlanYearHdFrName5(true);
                        _self.requiredPlanYearHdFrName5(true);
                        _self.useAtrPlanYearHdFrName5(USE_CLASSIFICATION.USE);
                        $('#plan_year_hd_frame5').ntsEditor("validate");
                    }else{ 
                        _self.enablePlanYearHdFrName5(false);
                        _self.requiredPlanYearHdFrName5(false);
                        _self.useAtrPlanYearHdFrName5(USE_CLASSIFICATION.NOT_USE);
                    }
                    
                });
                
            }
            
             /**
             * init default data when start page
             */
            public start_page(): JQueryPromise<void> {
                var dfd = $.Deferred<void>();
                var _self = this;
                
                service.findListPlanYearHdFrame().done((data: Array<PlanYearHdFrameDto>) => {
                     data.forEach(function(e){
                        switch (e.planYearHdFrameNo){
                            case PlanYearHdFrameNo.ONE:
                               _self.planYearHdFrName1(e.planYearHdFrameName);
                               e.useAtr == USE_CLASSIFICATION.NOT_USE ? _self.isCheckedNo1(false) :_self.isCheckedNo1(true);
                               break;
                            case PlanYearHdFrameNo.TWO:
                               _self.planYearHdFrName2(e.planYearHdFrameName);
                               e.useAtr == USE_CLASSIFICATION.NOT_USE ? _self.isCheckedNo2(false) :_self.isCheckedNo2(true);
                               break;
                            case PlanYearHdFrameNo.THREE:
                               _self.planYearHdFrName3(e.planYearHdFrameName);
                                e.useAtr == USE_CLASSIFICATION.NOT_USE ? _self.isCheckedNo3(false) :_self.isCheckedNo3(true);
                               break;
                            case PlanYearHdFrameNo.FOUR:
                               _self.planYearHdFrName4(e.planYearHdFrameName);
                               e.useAtr == USE_CLASSIFICATION.NOT_USE ? _self.isCheckedNo4(false) :_self.isCheckedNo4(true);
                               break;
                            case PlanYearHdFrameNo.FIVE:
                               _self.planYearHdFrName5(e.planYearHdFrameName);
                               e.useAtr == USE_CLASSIFICATION.NOT_USE ? _self.isCheckedNo5(false) :_self.isCheckedNo5(true);
                               break;
                        }
                    });
                    dfd.resolve();
                });
                
                
                return dfd.promise();
            }
            
            /**
             * Save plan year holiday name setting
             */
            public savePlanYearHdFrSetting(): JQueryPromise<void> {
                let _self = this;
                
                 // Validate
                if (_self.hasError()) {
                    return;    
                }
                
                var dfd = $.Deferred<void>();
                blockUI.invisible();
                
                var params = new PlanYearHdFrameSaveCommand(_self.prepareDataToSave());
                
                service.savePlanYearHdFrame(params).done(() => {
                    _self.start_page().done(() => {
                        nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(() => { 
                            dfd.resolve();
                            blockUI.clear();
                            $('#plan_year_hd_frame1').focus();
                        });
                    });
                });
                  
                return dfd.promise();
            }
            
            /**
             * Prepare data for saving.
             */
            private prepareDataToSave() : Array<PlanYearHdFrameDto> {
                let _self = this;
                
                let planYearHdFr1 = new PlanYearHdFrameDto(PlanYearHdFrameNo.ONE, _self.planYearHdFrName1(), _self.useAtrPlanYearHdFrName1());
                let planYearHdFr2 = new PlanYearHdFrameDto(PlanYearHdFrameNo.TWO, _self.planYearHdFrName2(), _self.useAtrPlanYearHdFrName2());
                let planYearHdFr3 = new PlanYearHdFrameDto(PlanYearHdFrameNo.THREE, _self.planYearHdFrName3(), _self.useAtrPlanYearHdFrName3());
                let planYearHdFr4 = new PlanYearHdFrameDto(PlanYearHdFrameNo.FOUR, _self.planYearHdFrName4(), _self.useAtrPlanYearHdFrName4());
                let planYearHdFr5 = new PlanYearHdFrameDto(PlanYearHdFrameNo.FIVE, _self.planYearHdFrName5(), _self.useAtrPlanYearHdFrName5());
                
                let data: Array<PlanYearHdFrameDto> = [planYearHdFr1, planYearHdFr2, planYearHdFr3, planYearHdFr4, planYearHdFr5];
                return data;
            }
            
             /**
             * Check Errors all input.
             */
            private hasError(): boolean {
                let _self = this;
                _self.clearErrors();
                if (_self.useAtrPlanYearHdFrName1() == USE_CLASSIFICATION.USE) {
                    $('#plan_year_hd_frame1').ntsEditor("validate");    
                }
                if (_self.useAtrPlanYearHdFrName2() == USE_CLASSIFICATION.USE) {
                    $('#plan_year_hd_frame2').ntsEditor("validate");    
                }
                if (_self.useAtrPlanYearHdFrName3() == USE_CLASSIFICATION.USE) {
                    $('#plan_year_hd_frame3').ntsEditor("validate");    
                }
                if (_self.useAtrPlanYearHdFrName4() == USE_CLASSIFICATION.USE) {
                    $('#plan_year_hd_frame4').ntsEditor("validate");    
                }
                if (_self.useAtrPlanYearHdFrName5() == USE_CLASSIFICATION.USE) {
                    $('#plan_year_hd_frame5').ntsEditor("validate");    
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
    
                 // Clear errors
                $('#plan_year_hd_frame1').ntsEditor("clear");
                $('#plan_year_hd_frame2').ntsEditor("clear");
                $('#plan_year_hd_frame3').ntsEditor("clear");
                $('#plan_year_hd_frame4').ntsEditor("clear");
                $('#plan_year_hd_frame5').ntsEditor("clear");
                
                // Clear error inputs
                $('.nts-input').ntsError('clear');
            }
       }
           
    }
    
     module USE_CLASSIFICATION {
        export const NOT_USE: number = 0;                        
        export const USE: number = 1;                           
    }
    
    module PlanYearHdFrameNo {
        export const ONE: number = 1;                        
        export const TWO: number = 2;                           
        export const THREE: number = 3;                      
        export const FOUR: number = 4;                                 
        export const FIVE: number = 5; 
    }
}