module nts.uk.com.view.cmm014.a {
    import ClassificationDto = service.model.ClassificationFindDto;
    import blockUI = nts.uk.ui.block;

    export module viewmodel {
        export class ScreenModel {
            enableDelete: KnockoutObservable<boolean>;
            classificationModel: KnockoutObservable<ClassificationModel>;
            selectedCode: KnockoutObservable<string>;
            listComponentOption: any;
            clfList: KnockoutObservableArray<ItemModel>;
            enableClfCode: KnockoutObservable<boolean>;
            isUpdateMode: KnockoutObservable<boolean>;
            
            constructor() {
                var self = this;
                self.isUpdateMode = ko.observable(false);
                self.enableDelete = ko.observable(true);
                self.classificationModel = ko.observable(new ClassificationModel);
                self.selectedCode = ko.observable("");
                self.selectedCode.subscribe(function(clfCode) {
                    if (clfCode) {
                        self.clearErrors();
                        self.loadClassification(clfCode);
                    } else {
                        self.clearData();
                    }
                });
                
                // Initial listComponentOption
                self.listComponentOption = {
                    isMultiSelect: false,
                    listType: ListType.Classification,
                    selectType: SelectType.SELECT_BY_SELECTED_CODE,
                    selectedCode: self.selectedCode,
                    isDialog: false,
                    tabindex: 5
                };

                self.clfList = ko.observableArray<ItemModel>([]);
                self.enableClfCode = ko.observable(false);
            }

            /**
             * Start Page
             */
            public startPage(): JQueryPromise<void> {
                var dfd = $.Deferred<void>();
                var self = this;
                blockUI.invisible();
                
                // Load Component
                $('#clf-component').ntsListComponent(self.listComponentOption).done(function() {

                    // Get Data List
                    if (($('#clf-component').getDataList() == undefined) || ($('#clf-component').getDataList().length <= 0)) {
                        self.clearData();
                    }
                    else {
                        // Get Classification List after Load Component
                        self.clfList($('#clf-component').getDataList());

                        // Select first Item in Classification List
                        self.selectedCode(self.clfList()[0].code);

                        // Find and bind selected Classification
                        self.loadClassification(self.selectedCode());
                    }
                    blockUI.clear();
                });
                dfd.resolve();
                return dfd.promise();
            }

            /**
             * load Classification
             */
            private loadClassification(code: string): void {
                let self = this;
                service.findClassification(code).done(function(classification: any) {
                    if (classification) {
                        self.selectedCode(classification.code);
                        self.classificationModel().updateData(classification);
                        self.classificationModel().isEnableCode(false);
                        self.enableDelete(true);
                        self.isUpdateMode(true);
                        $('#clfName').focus();
                    }
                });
            }

            /**
             * Clear Data
             */
            private clearData(): void {
                let self = this;
                self.selectedCode("");
                self.classificationModel().resetData();
                self.enableDelete(false);
                self.clearErrors();
                self.isUpdateMode(false);
                $('#clfCode').focus();
            }

            /**
             * Create Employment
             */
            private createClassification(): void {
                let self = this;
                // Validate
                if (self.hasError()) {
                    return;
                }
                let command: any = {};
                    command.classificationCode = self.classificationModel().classificationCode();
                    command.classificationName = self.classificationModel().classificationName();
                    command.memo = self.classificationModel().memo();
                    command.isUpdateMode = self.isUpdateMode();
                
                service.saveClassification(command).done(() => {
                    blockUI.invisible();
                    nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function() {
                        
                        // ReLoad Component
                        $('#clf-component').ntsListComponent(self.listComponentOption).done(function() {
                            // Get Classification List after Load Component
                            self.clfList($('#clf-component').getDataList());
                            self.enableDelete(true);
                            self.classificationModel().isEnableCode(false);
                            self.selectedCode(self.classificationModel().classificationCode());
                            $('#clfName').focus();
                        });
                    });
                    
                    blockUI.clear();
                }).fail(error => {
                    $('#clfCode').ntsError('set', {messageId: error.messageId});
                });
            }

            /**
             * Delete Classification
             */
            private deleteClassification(): void {
                let self = this;
                // Validate
                if (self.hasError()) {
                    return;
                }
                
                // Remove
                nts.uk.ui.dialog.confirm({ messageId: "Msg_18" }).ifYes(() => {
                    
                    let command = {
                        classificationCode: self.classificationModel().classificationCode()
                    }
                    blockUI.invisible();
                    service.removeClassification(command).done(() => {
                        nts.uk.ui.dialog.info({ messageId: "Msg_16" }).then(function() {
                            // Reload Component
                            $('#clf-component').ntsListComponent(self.listComponentOption).done(function() {
                                // Filter selected Item
                                var existItem = self.clfList().filter((item) => {
                                    return item.code == self.classificationModel().classificationCode();
                                })[0];

                                // Check Data List
                                if (($('#clf-component').getDataList() == undefined) || ($('#clf-component').getDataList().length <= 0)) {
                                    self.clearData();
                                }
                                else {
                                    self.enableDelete(true);
                                    let index = self.clfList().indexOf(existItem);
                                    // Get Classification List after Load Component
                                    self.clfList($('#clf-component').getDataList());
                                    let emplistLength = self.clfList().length;
                                    if (index == (self.clfList().length)) {
                                        self.selectedCode(self.clfList()[index - 1].code);
                                    } else {
                                        self.selectedCode(self.clfList()[index].code);
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
                    $('#clfName').focus();
                });
            }

            /**
             * Check Errors all input.
             */
            private hasError(): boolean {
                var self = this;
                self.clearErrors();
                $('#clfCode').ntsEditor("validate");
                $('#clfName').ntsEditor("validate");
                 $('#memo').ntsEditor("validate");
                if ($('.nts-input').ntsError('hasError')) {
                    return true;
                }
                return false;
            }

            /**
             * Clear Errors
             */
            private clearErrors(): void {
                var self = this;
                //                // Clear errors
                $('#clfCode').ntsError('clear');
                $('#clfName').ntsError('clear');
 
                $('#memo').ntsError('clear');
                // Clear error inputs
                $('.nts-input').ntsError('clear');
            }
            
            
            //exportExcel
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
         * ClassificationModel
         */
        export class ClassificationModel {
            classificationCode: KnockoutObservable<string>;
            classificationName: KnockoutObservable<string>;
            memo: KnockoutObservable<string>;
            isEnableCode: KnockoutObservable<boolean>;
            
            constructor() {
                this.classificationCode = ko.observable("");
                this.classificationName = ko.observable("");
                this.memo = ko.observable("");
                this.isEnableCode = ko.observable(true);
            }
            /**
             * Reset Data
             */
            resetData() {
                this.classificationCode('');
                this.classificationName('');
                
                this.memo('');
                this.isEnableCode(true);
                this.classificationCode.subscribe(function() {
                    
                });
            }
            
            /**
             * update Data
             */
            updateData(dto: ClassificationDto) {
                this.classificationCode(dto.code);
                this.classificationName(dto.name);
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
    }
}