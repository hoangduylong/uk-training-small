module nts.uk.com.view.cmm013.a {

    export module viewmodel {

        import Constants = base.Constants;

        import JobTitleHistoryAbstract = base.JobTitleHistoryAbstract;
        import History = base.History;
        import Period = base.Period;

        import JobTitle = base.JobTitle;
        import SequenceMaster = base.SequenceMaster;

        export class ScreenModel {

            listJobTitleOption: any;    //ComponentOption;

            baseDate: KnockoutObservable<Date>;
            isShowAlreadySet: KnockoutObservable<boolean>;
            selectedJobTitleId: KnockoutObservable<string>;
            isShowNoSelectRow: KnockoutObservable<boolean>;



            createMode: KnockoutObservable<boolean>;

            jobTitleHistoryModel: KnockoutObservable<JobTitleHistoryModel>;

            jobTitleCode: KnockoutObservable<string>;
            jobTitleName: KnockoutObservable<string>;
            jobTitleIsManager: KnockoutObservable<boolean>;
            sequenceCode: KnockoutObservable<string>;
            sequenceName: KnockoutObservable<string>;

            // UI binding
            enable_button_create_mode: KnockoutObservable<boolean>;
            enable_button_delete: KnockoutObservable<boolean>;
            enable_button_add_history: KnockoutObservable<boolean>;
            enable_button_update_history: KnockoutObservable<boolean>;
            enable_button_delete_history: KnockoutObservable<boolean>;
            enable_input_job_title_code: KnockoutObservable<boolean>;

            constructor() {
                let _self = this;
                
                _self.jobTitleHistoryModel = ko.observable(new JobTitleHistoryModel(_self));

                _self.createMode = ko.observable(null);
                _self.createMode.subscribe((newValue) => {
                    _self.changeMode(newValue);
                });

                // Init list JobTitle setting
                _self.baseDate = ko.observable(moment(new Date()).toDate());

                _self.selectedJobTitleId = ko.observable("");
                _self.selectedJobTitleId.subscribe((newValue) => {
                    if (_.isEmpty(newValue) || newValue == "undefined") {
                        _self.startCreateMode();
                    } else {
                        _self.findJobHistoryById(newValue);
                    }
                });

                _self.isShowAlreadySet = ko.observable(false);
                _self.isShowAlreadySet.subscribe(() => {
                    _self.reloadComponent();
                });
                _self.isShowNoSelectRow = ko.observable(false);
                _self.isShowNoSelectRow.subscribe(() => {
                    _self.reloadComponent();
                });

                _self.listJobTitleOption = {
                    baseDate: _self.baseDate,
                    isShowAlreadySet: _self.isShowAlreadySet(),
                    isMultiSelect: false,
                    listType: 3,
                    selectType: 3,
                    selectedCode: _self.selectedJobTitleId,
                    isDialog: false,
                    isShowNoSelectRow: _self.isShowNoSelectRow(),
                    maxRows: 13,
                    tabindex: 6
                };

                // Init JobTitle form
                _self.jobTitleCode = ko.observable("");
                _self.jobTitleName = ko.observable("");
                _self.jobTitleIsManager = ko.observable(false);
                _self.sequenceCode = ko.observable("");
                _self.sequenceName = ko.observable("");

                // UI
                _self.enable_button_create_mode = ko.observable(null);
                _self.enable_button_delete = ko.observable(null);
                _self.enable_button_add_history = ko.observable(null);
                _self.enable_button_update_history = ko.observable(null);
                _self.enable_button_delete_history = ko.observable(null);
                _self.enable_input_job_title_code = ko.observable(null);
            }

            /**
             * Reload component
             */
            public reloadComponent(): JQueryPromise<void> {
                let _self = this;
                let dfd = $.Deferred<any>();
                
                _self.listJobTitleOption.isShowAlreadySet = _self.isShowAlreadySet();
                _self.listJobTitleOption.isShowNoSelectRow = _self.isShowNoSelectRow();
                $('#job-title-items-list').ntsListComponent(_self.listJobTitleOption)
                    .then(() => {
                        let dataList: any = $('#job-title-items-list').getDataList();
                        if (dataList && _self.selectedJobTitleId()) {
                            let filtered = _.filter(dataList, (item: any) => item.id === _self.selectedJobTitleId());
                            if (filtered.length == 0) {
                                _self.selectedJobTitleId(dataList[0].id);
                            } else {
                                // Reload history
                                _self.findJobHistoryById(_self.selectedJobTitleId());
                            }
                        } else {
                            // Set create mode
                            _self.createMode(true);
                        }
                        dfd.resolve();
                    }).done(()=>{
                        nts.uk.ui.block.clear();
                    });
                if (_self.listJobTitleOption.selectType === 3) {
                    _self.listJobTitleOption.selectType = 1;
                }
                return dfd.promise();
            }
            private reloadDoneComponent():any{
                let _self= this;
                _self.reloadComponent().done(() => {
                    service.findJobInfoByJobCode(_self.jobTitleCode())
                        .done((data: any) => {
                            _self.selectedJobTitleId(data.jobTitleId);
                            _self.createMode(false);
                        })
                        .fail((res: any) => {

                        })
                });
            }
            /**
             * Start page
             */
            public startPage(): JQueryPromise<any> {
                let _self = this;
                let dfd = $.Deferred<any>();

                _self.reloadComponent();

                dfd.resolve();
                return dfd.promise();
            }

            /**
             * Find JobTitle history by id
             */
            private findJobHistoryById(jobTitleId: string): void {
                let _self = this;

                if (!jobTitleId) {
                    // No JobTitle has been choosed, switch to create mode
                    _self.createMode(true);
                    return;                  
                }

                // Load JobTitle history info 
                //nts.uk.ui.block.grayout();
                _self.jobTitleHistoryModel().clearData();
                service.findJobHistoryList(jobTitleId)
                    .done((data: any) => {
                        //nts.uk.ui.block.clear();
                        if (data) {
                            // Load JobTitle History
                            let listHistory: History[] = _.map(data.jobTitleHistory, (item: any) => {
                                return new History(data.jobTitleId, item.historyId, item.period);
                            });
                            _self.jobTitleHistoryModel().init(listHistory);
                        }
                    })
                    .fail((res: any) => {
                        //nts.uk.ui.block.clear();
                    });
            }

            /**
             * Find JobTitle info by job title id and job history id
             */
            public findJobInfo(jobTitleId: string, jobHistoryId: string): void {
                let _self = this;

                if (!jobTitleId || !jobHistoryId) {
                    return;
                }

                //nts.uk.ui.block.grayout();    // Cause history list lost focus
                service.findJobInfoByJobIdAndHistoryId(jobTitleId, jobHistoryId)
                    .done((data: any) => {
                        //nts.uk.ui.block.clear();
                        if (data) {
                            _self.createMode(false);
                            _self.jobTitleCode(data.jobTitleCode);
                            _self.jobTitleName(data.jobTitleName);
                            _self.jobTitleIsManager(data.manager);
                            _self.sequenceCode(data.sequenceCode);
                            _self.sequenceName(data.sequenceName);
                            // Set focus
                            $('#job-title-name').focus();
                        }
                    })
                    .fail((res: any) => {
                        //nts.uk.ui.block.clear();
                    });
            }

            /**
             * Callback: change mode based on createMode value
             */
            public changeMode(newValue: boolean): void {
                let _self = this;
                
                if (newValue) {
                    let defaultHistory: History[] = [];
                    defaultHistory.push(_self.createHistory());
                    _self.selectedJobTitleId(null);
                    _self.jobTitleHistoryModel().clearData();
                    _self.jobTitleHistoryModel().init(defaultHistory);
                    _self.jobTitleCode("");
                    _self.jobTitleName("");
                    _self.jobTitleIsManager(false);
                    _self.sequenceCode("");
                    _self.sequenceName("");

                    // UI
                    _self.enable_button_create_mode(false);
                    _self.enable_button_delete(false);
                    _self.enable_button_add_history(false);
                    _self.enable_button_update_history(false);
                    _self.enable_button_delete_history(false);
                    _self.enable_input_job_title_code(true);

                    // Set focus
                    $('#job-title-code').focus();
                } else {
                    // UI
                    _self.enable_button_create_mode(true);
                    _self.enable_input_job_title_code(false);

                    // Set focus
                    $('#job-title-name').focus();
                }

                // Clear error
                nts.uk.ui.errors.clearAll();
            }

            /**
             * Callback: change history mode based on A3_2 value
             */
            public historyChangeMode(newValue: boolean): void {
                let _self = this;

                _self.enable_button_delete(newValue);
                _self.enable_button_add_history(newValue);
                _self.enable_button_update_history(newValue);
                _self.enable_button_delete_history(newValue);
            }

            /**
             * Validate
             */
            private validate(): any {
                let _self = this;
                
                // Clear error
                nts.uk.ui.errors.clearAll();

                $('#job-title-code').ntsEditor('validate');
                $('#job-title-name').ntsEditor('validate');

                return !$('.nts-input').ntsError('hasError');
            }

            /**
             * toJSON
             */
            private toJSON(): any {
                let _self = this;
                return {
                    isCreateMode: _self.createMode(),
                    jobTitleInfo: {
                        jobTitleId: _self.selectedJobTitleId(),
                        jobTitleHistoryId: _self.jobTitleHistoryModel().selectedHistoryId(),
                        isManager: _self.jobTitleIsManager(),
                        jobTitleCode: _self.jobTitleCode(),
                        jobTitleName: _self.jobTitleName(),
                        sequenceCode: _self.sequenceCode()
                    }
                }
            }

            /**
             * Create default history
             */
            private createHistory(): History {
                let _self = this;
                return new History("", "", new Period("1900/01/01", "9999/12/31"));
            }

            /**
             * Show Error Message
             */
            public showMessageError(res: any): void {
                // check error business exception
                if (!res.businessException) {
                    return;
                }
                
                // show error message
                if (Array.isArray(res.errors)) {
                    nts.uk.ui.dialog.bundledErrors(res);
                } else {
                    nts.uk.ui.dialog.alertError({ messageId: res.messageId, messageParams: res.parameterIds });
                }
            }   

            /**
             * Start create mode
             */
            public startCreateMode(): void {
                let _self = this;
                _self.createMode(true);
            }

            /**
             * Save JobTitle
             */
            public saveJobTitle(): void {
                let _self = this;

                // Validate
                if (!_self.validate()) {
                    return;
                }
                $('#job-title-code').trigger('validate');
                $('#job-title-name').trigger('validate');
                if (nts.uk.ui.errors.hasError()) {
                    return;
                }
                nts.uk.ui.block.grayout();
                service.saveJobTitle(_self.toJSON())
                    .done(() => {
                        nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(() => {
                            _self.reloadDoneComponent();
                        });
                    })
                    .fail((res: any) => {                      
                        _self.showMessageError(res);
                    })
                    .always(() => {
                        nts.uk.ui.block.clear();
                    });
            }

            /**
             * Remove history
             */
            public removeHistory(): void {
                let _self = this;
                if (!nts.uk.text.isNullOrEmpty(_self.jobTitleHistoryModel().selectedHistoryId())) {
                    nts.uk.ui.dialog.confirm({ messageId: "Msg_18" })
                        .ifYes(() => {
                            nts.uk.ui.block.grayout();
                            let removeCommand: any = {};
                            removeCommand.jobTitleId = _self.selectedJobTitleId();
                            removeCommand.historyId = _self.jobTitleHistoryModel().selectedHistoryId();

                            service.removeJobTitleHistory(removeCommand)
                                .done(() => {
                                    // Show message
                                    nts.uk.ui.dialog.info({ messageId: "Msg_16" }).then(() => {
                                        // Reload list
                                      _self.reloadDoneComponent();
                                    });                                   
                                })
                                .fail((res: any) => {                                   
                                    // Show error list
                                    nts.uk.ui.dialog.bundledErrors(res);
                                })
                                .always(() => {
                                    nts.uk.ui.block.clear();
                                });
                        })
                        .ifNo(() => {

                        });
                }
            }





            // Load Dialog
            /**
             * Screen B - openDeleteDialog
             */
            public openDeleteDialog() {
                let _self = this;
                let transferObj: any = {};
                transferObj.jobTitleId = _self.selectedJobTitleId();
                transferObj.jobTitleCode = _self.jobTitleCode();
                transferObj.jobTitleName = _self.jobTitleName();
                nts.uk.ui.windows.setShared(Constants.SHARE_IN_DIALOG_REMOVE_JOB, transferObj);
                nts.uk.ui.windows.sub.modal('/view/cmm/013/b/index.xhtml').onClosed(() => {
                    let isSuccess: boolean = nts.uk.ui.windows.getShared(Constants.SHARE_OUT_DIALOG_REMOVE_JOB);
                    if (isSuccess) {
                        // Reload list
                        _self.reloadComponent();
                    }
                });
            }

            /**
             * Screen C - checkSequenceList
             */
            public checkSequenceList() {
                let _self = this;
                
                // Load sequence data list
                nts.uk.ui.block.grayout();
                service.findAllSequenceMaster()
                    .done((data: SequenceMaster[]) => {         
                        // Load data
                        _self.openSelectSequenceDialog(data);
                    })
                    .fail((res: any) => {
                        nts.uk.ui.dialog.bundledErrors(res).then(() => {
                            // Load sequence register screen
                            _self.openSequenceManageDialog();                     
                        });     
                    })
                    .always(() => {
                        nts.uk.ui.block.clear();       
                    });
            }
            
            /**
             * Screen C - openSelectSequenceDialog
             */
            public openSelectSequenceDialog(data: SequenceMaster[]) {
                let _self = this;
                nts.uk.ui.windows.setShared("currentSelectedCode", _self.sequenceCode());
                nts.uk.ui.windows.setShared(Constants.SHARE_IN_DIALOG_SELECT_SEQUENCE, data);
                nts.uk.ui.windows.sub.modal('/view/cmm/013/c/index.xhtml').onClosed(() => {
                    // Check if apply button was clicked
                    let isSelected: boolean = nts.uk.ui.windows.getShared(Constants.IS_ACCEPT_DIALOG_SELECT_SEQUENCE);
                    if (!isSelected) {
                        return;
                    }
                    
                    // Get data
                    let dialogData: SequenceMaster = nts.uk.ui.windows.getShared(Constants.SHARE_OUT_DIALOG_SELECT_SEQUENCE);
                    if (!dialogData) {
                        _self.sequenceCode("");
                        _self.sequenceName("");
                        return;
                    }
                    _self.sequenceCode(dialogData.sequenceCode);
                    _self.sequenceName(dialogData.sequenceName);
                });
            }                 

            /**
             * Screen D - openAddHistoryDialog
             */
            public openAddHistoryDialog() {
                let _self = this;
                nts.uk.ui.windows.setShared(Constants.SHARE_IN_DIALOG_ADD_HISTORY, _self.selectedJobTitleId());
                nts.uk.ui.windows.sub.modal('/view/cmm/013/d/index.xhtml').onClosed(() => {
                    let isSuccess: boolean = nts.uk.ui.windows.getShared(Constants.SHARE_OUT_DIALOG_ADD_HISTORY);
                    if (isSuccess) {
                        // Reload list
                        _self.reloadDoneComponent();
                    }
                });
            }

            /**
             * Screen E - openUpdateHistoryDialog
             */
            public openUpdateHistoryDialog() {
                let _self = this;
                let transferObj: any = {};
                transferObj.jobTitleId = _self.selectedJobTitleId();
                transferObj.historyId = _self.jobTitleHistoryModel().selectedHistoryId();
                transferObj.startDate = _self.jobTitleHistoryModel().getSelectedHistoryByHistoryId().period.startDate;
                nts.uk.ui.windows.setShared(Constants.SHARE_IN_DIALOG_EDIT_HISTORY, transferObj);
                nts.uk.ui.windows.sub.modal('/view/cmm/013/e/index.xhtml').onClosed(() => {
                    let isSuccess: boolean = nts.uk.ui.windows.getShared(Constants.SHARE_OUT_DIALOG_EDIT_HISTORY);
                    if (isSuccess) {
                        // Reload list
                        _self.reloadDoneComponent();
                    }
                });
            }

            /**
             * Screen F - openSequenceManageDialog
             */
            public openSequenceManageDialog() {
                let _self = this;
                nts.uk.ui.windows.sub.modal('/view/cmm/013/f/index.xhtml').onClosed(() => { });
            }
            
            
            public opencdl028Dialog() {
                var self = this;
                let params = {
                    //    date: moment(new Date()).toDate(),
                    mode: 1 
                };
                nts.uk.ui.windows.setShared("CDL028_INPUT", params);

                nts.uk.ui.windows.sub.modal("com", "/view/cdl/028/a/index.xhtml").onClosed(function() {
                    var params = nts.uk.ui.windows.getShared("CDL028_A_PARAMS");
                    if (params.status) {
                        self.exportExcel(params.mode, params.standardDate);
                    }
                });
            }

            exportExcel(mode: string, baseDate: string): void {
                var self = this;
                nts.uk.ui.block.grayout();
                service.saveAsExcel(mode, baseDate).done(function() {
                }).fail(function(error) {
                    nts.uk.ui.dialog.alertError({ messageId: error.messageId });
                }).always(function() {
                    nts.uk.ui.block.clear();
                });
            }
            
            public openHScreen() {
                var self = this;
                nts.uk.ui.windows.sub.modal("/view/cmm/013/h/index.xhtml").onClosed(function() {
                    
                });
            }

        }

        /**
         * JobTitleHistoryModel
         */
        class JobTitleHistoryModel extends JobTitleHistoryAbstract {

            parentModel: ScreenModel;

            constructor(parentModel: ScreenModel) {
                super();
                let _self = this;
                _self.parentModel = parentModel;
                _self.selectedHistoryId.subscribe((jobHistoryId: string) => {
                    _self.parentModel.findJobInfo(_self.parentModel.selectedJobTitleId(), jobHistoryId);
                    _self.validateHistory();
                })
                _self.init([]);
            }

            public init(data: History[]): void {
                let _self = this;
                _self.listJobTitleHistory(data);
                _self.selectFirst();
            }

            public clearData(): void {
                let _self = this;
                _self.listJobTitleHistory([]);
                _self.selectedHistoryId(null);
            }

            public validateHistory(): void {
                let _self = this;
                let currentHistory: History = _self.getSelectedHistoryByHistoryId();
                if (currentHistory && _self.isSelectedLatestHistory() && currentHistory.period.endDate === "9999/12/31") {
                    _self.parentModel.historyChangeMode(true);
                } else {
                    _self.parentModel.historyChangeMode(false);
                }
            }
        }
    }
}