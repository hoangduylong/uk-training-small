module nts.uk.com.view.cmm008.a {
    import EmploymentDto = service.model.EmploymentDto;
    import blockUI = nts.uk.ui.block;

    export module viewmodel {
        export class ScreenModel {
            enableDelete: KnockoutObservable<boolean>;
            employmentModel: KnockoutObservable<EmploymentModel>;
            selectedCode: KnockoutObservable<string>;
            listComponentOption: any;
            empList: KnockoutObservableArray<ItemModel>;
            enableEmpCode: KnockoutObservable<boolean>;
            isUpdateMode: KnockoutObservable<boolean>;
            itemListMatter: KnockoutObservableArray<ItemModel>;
            selectedCodeMaster: KnockoutObservable<string>;
            showsGroupCompany: KnockoutObservable<boolean>;
            commonMasterName : KnockoutObservable<string>;
            commonMasterItemId : KnockoutObservable<string>;
            constructor() {
                var self = this;

                self.showsGroupCompany = ko.observable(true);
                self.isUpdateMode = ko.observable(false);
                self.enableDelete = ko.observable(true);
                self.employmentModel = ko.observable(new EmploymentModel);
                self.selectedCode = ko.observable("");
                self.commonMasterName = ko.observable("");
                self.selectedCodeMaster =  ko.observable("");
                self.commonMasterItemId =  ko.observable("");
                
                //Item List Master Common
                self.itemListMatter = ko.observableArray([]);
                self.selectedCode.subscribe(function(empCode) {
                    if (empCode) {
                        self.clearErrors();
                        self.loadEmployment(empCode);
                    } else {
                        self.clearData();
                    }
                });
                
                // Initial listComponentOption
                self.listComponentOption = {
                    isMultiSelect: false,
                    listType: ListType.EMPLOYMENT,
                    selectType: SelectType.SELECT_BY_SELECTED_CODE,
                    selectedCode: self.selectedCode,
                    isDialog: false,
                    tabindex: 6
                };

                self.empList = ko.observableArray<ItemModel>([]);
                self.enableEmpCode = ko.observable(false);
                
                
                
            }

            /**
             * Start Page
             */
            public startPage(): JQueryPromise<void> {
                var dfd = $.Deferred<void>();
                var self = this;
                blockUI.invisible();

                $('#emp-component').ntsListComponent(self.listComponentOption).done(function() {

                    // Get Data List
                    if (($('#emp-component').getDataList() == undefined) || ($('#emp-component').getDataList().length <= 0)) {
                        self.clearData();
                    }
                    else {
                        // Get Employment List after Load Component
                        self.empList($('#emp-component').getDataList());

                        // Select first Item in Employment List
                        self.selectedCode(self.empList()[0].code);

                        // Find and bind selected Employment
                        //self.loadEmployment(self.selectedCode());
                    }

                service.findGroupCommonMaster().done(function(data) {
                    // self.itemListMatter(data.commonMasterItems);
                   self.commonMasterName(data.commonMasterName);
                     self.itemListMatter(data.commonMasterItems);        
                });
                    blockUI.clear();
                });
                
               // $.when(taskNtsComponent, taskFindGroupCommonMaster).then(function() {
                    dfd.resolve();
               // });
                return dfd.promise();
            }

            /**
             * load Employment
             */
            private loadEmployment(code: string): void {
                let self = this;
                service.findEmployment(code).done(function(employment) {
                    if (employment) {
                        self.selectedCode(employment.code);
                        self.employmentModel().updateEmpData(employment);
                        self.employmentModel().isEnableCode(false);
                        self.enableDelete(true);
                        self.isUpdateMode(true);
                        self.itemListMatter(employment.commonMasterItems);
                        self.commonMasterName(employment.commonMasterName);
                        self.selectedCodeMaster(employment.empCommonMasterItemId);
						// => dong nay rat la nham nhi =>> self.commonMasterItemId(employment.commonMasterItemId);
                      	console.log("yeah");
                        if(employment.errMessage !== null) {
                            self.showsGroupCompany(false);
                            self.selectedCode(employment.code);
                           nts.uk.ui.dialog.alertError({ messageId: employment.errMessage });
                            
                            }
                        $('#empName').focus();
                    }
                });
            }

            /**
             * Clear Data
             */
            private clearData(): void {
                let self = this;
                self.selectedCode("");
                self.employmentModel().resetEmpData();
                self.selectedCodeMaster("");
                self.enableDelete(false);   
                self.clearErrors();
                self.isUpdateMode(false);
                $('#empCode').focus(); 
            }

            /**
             * Create Employment
             */
            private createEmployment(): void {
                let self = this;
                // Validate
                if (self.hasError()) {
                    return;
                }
                let command: any = {};
                command.employmentCode = self.employmentModel().employmentCode();
                command.employmentName = self.employmentModel().employmentName();
                command.empExternalCode = self.employmentModel().empExternalCode();
                command.memo = self.employmentModel().memo();
                command.isUpdateMode = self.isUpdateMode();
                command.commonMasterName = 'M000031';
                command.selectedCodeMaster = self.selectedCodeMaster();

                blockUI.invisible();
                service.saveEmployment(command).done(() => {
                    nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function() {

                        // ReLoad Component
                        $('#emp-component').ntsListComponent(self.listComponentOption).done(function() {
                            // Get Employment List after Load Component
                            self.empList($('#emp-component').getDataList());
                            self.enableDelete(true);
                            self.employmentModel().isEnableCode(false);
                            self.selectedCode(self.employmentModel().employmentCode());
                            $('#empName').focus();
                        });
                    });
                    
                    blockUI.clear();
                }).fail(error => {
                    blockUI.clear();
                    if (error.messageId == 'Msg_3') {
                        blockUI.clear();
                        $('#empCode').ntsError('set', { messageId: "Msg_3" });
                    } else {
                        nts.uk.ui.dialog.alertError(error);
                    }
                    
                });
            }

            /**
             * Delete Employment
             */
            private deleteEmployment(): void {
                let self = this;
                // Validate
                if (self.hasError()) {
                    return;
                }
                
                // Remove
                nts.uk.ui.dialog.confirm({ messageId: "Msg_18" }).ifYes(() => {
                    
                    let command = {
                        employmentCode: self.employmentModel().employmentCode()
                    }
                    blockUI.invisible();
                    service.removeEmployment(command).done(() => {
                        nts.uk.ui.dialog.info({ messageId: "Msg_16" }).then(function() {
                            // Reload Component
                            $('#emp-component').ntsListComponent(self.listComponentOption).done(function() {
                                // Filter selected Item
                                var existItem = self.empList().filter((item) => {
                                    return item.code == self.employmentModel().employmentCode();
                                })[0];

                                // Check Data List
                                if (($('#emp-component').getDataList() == undefined) || ($('#emp-component').getDataList().length <= 0)) {
                                    self.clearData();
                                }
                                else {
                                    self.enableDelete(true);
                                    let index = self.empList().indexOf(existItem);
                                    // Get Employment List after Load Component
                                    self.empList($('#emp-component').getDataList());
                                    let emplistLength = self.empList().length;
                                    if (index == (self.empList().length)) {
                                        self.selectedCode(self.empList()[index - 1].code);
                                    } else {
                                        self.selectedCode(self.empList()[index].code);
                                    }
                                }
                            });
                        });
                        
                        
                        blockUI.clear();
                    }).fail((res) => {
                        nts.uk.ui.dialog.alertError(res.message).then(() => {blockUI.clear();});
                        
                    });
                }).ifNo(function() {
                    blockUI.clear();
                    $('#empName').focus();
                });
            }

            /**
             * Check Errors all input.
             */
            private hasError(): boolean {
                var self = this;
                self.clearErrors();
                $('#empCode').ntsEditor("validate");
                $('#empName').ntsEditor("validate");
                if ($('.nts-input').ntsError('hasError')) {
                    return true;
                }
                return false;
                //                return $('.nts-editor').ntsError('hasError');
            }

            /**
             * Clear Errors
             */
            private clearErrors(): void {
                var self = this;
                //                // Clear errors
                $('#empCode').ntsError('clear');
                $('#empName').ntsError('clear');
                $('#extCode').ntsError('clear');
                $('#memo').ntsError('clear');
                // Clear error inputs
                $('.nts-input').ntsError('clear');
            }

            private exportExcel(): void {
                var self = this;
                nts.uk.ui.block.grayout();
                let langId = "ja";
                service.saveAsExcel(langId).done(function() {
                }).fail(function(error) {
                    nts.uk.ui.dialog.alertError({ messageId: error.messageId });
                }).always(function() {
                    nts.uk.ui.block.clear();
                });
            }


        }

        /**
         * EmploymentModel
         */
        export class EmploymentModel {
            employmentCode: KnockoutObservable<string>;
            employmentName: KnockoutObservable<string>;
            empExternalCode: KnockoutObservable<string>;
            memo: KnockoutObservable<string>;
            isEnableCode: KnockoutObservable<boolean>;
           
            
            constructor() {
                this.employmentCode = ko.observable("");
                this.employmentName = ko.observable("");
                this.empExternalCode = ko.observable("");
                this.memo = ko.observable("");
                this.isEnableCode = ko.observable(true);
            }
            /**
             * Reset Data
             */
            resetEmpData() {
                this.employmentCode('');
                this.employmentName('');
                this.empExternalCode('');
                this.memo('');
                this.isEnableCode(true);
                this.employmentCode.subscribe(function() {
                    
                });
            }
            
            /**
             * update Data
             */
            updateEmpData(dto: EmploymentDto) {
                this.employmentCode(dto.code);
                this.employmentName(dto.name);
                this.empExternalCode(dto.empExternalCode);
                this.memo(dto.memo);
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

        /**
         * SelectType
         */
        export class SelectType {
            static SELECT_BY_SELECTED_CODE = 1;
            static SELECT_ALL = 2;
            static SELECT_FIRST_ITEM = 3;
            static NO_SELECT = 4;
        }

        /**
         * Class ItemModel
         */
        class ItemModel {
            code: string;
            name: string;
            constructor(code: string, name: string) {
                this.code = code;
                this.name = name;
            }
        }
        /** Item MasterCombobox **/
        class ItemMaster {
            commonMasterName: string;
            commonMasterItemID: string;
            constructor(commonMasterName: string, commonMasterItemID: string) {
                this.commonMasterName = commonMasterName;
                this.commonMasterItemID = commonMasterItemID;
            }
        }
    }
}