module nts.uk.com.view.cmm013.a {

    export module viewmodel {

        import Constants = base.Constants;

        import History = base.History;

        import JobTitle = base.JobTitle;

        export class ScreenModel {

			jobTitleColumns: KnockoutObservableArray<any>

            baseDate: KnockoutObservable<Date>;

            selectedJobTitleCode: KnockoutObservable<string> = ko.observable("");
			selectedHistoryId: KnockoutObservable<string> = ko.observable("");
            jobTitleIsManager: KnockoutObservable<boolean> = ko.observable(false);

			jobTitleList: KnockoutObservableArray<JobTitle> = ko.observableArray([]);
			historyList: KnockoutObservableArray<History>;

            enable_button_history: KnockoutObservable<boolean>;
			

            constructor() {
                let self = this;

				// init UI table job title
				self.jobTitleColumns = ko.observableArray([
	                { headerText: 'コード', key: 'code', width: 100, hidden: true },
	                { headerText: '名称', key: 'name', width: 150, hidden: true }, 
	            ]); 
				
				// get data
				//this.effect()
                
				
				// set active job (job code)
				//this.selectedJobTitleCode(this.jobTitleList()[0].jobTitleCode);
            }

			private effect(): void {
				// first request data
				service.findAllJobTitle()
					.done((data: any) => {
						console.log(data)
					})
					.fail((err: any) => {
						console.log(err)
					})
					
				// get data of jobtitle list
                for (let i = 0; i < 20; i++) {
					this.jobTitleList.push(new JobTitle("code_"+i, "name"+i));
				}
					
				// change events
				this.selectedJobTitleCode.subscribe(newJobCode => {
					// reload job title info
					/*service.findHistoryList(newJobCode)
						.done((data: any) => {
							console.log(data)
						})
						.fail((err: any) => {
							console.log(err)
						})*/
					
					// reset all state
					
				})
				
				this.selectedHistoryId.subscribe(newHistoryId => {
					// check lastest history local
					if (newHistoryId == this.historyList()[0].historyId) {
						this.enable_button_history(true);
					} else {
						this.enable_button_history(false);
					}
				})
			}

            /**
             * Reload component
             */
			public startPage(): JQueryPromise<void> {
                var dfd = $.Deferred<void>();
                var self = this;
                nts.uk.ui.block.invisible();
                
                
                nts.uk.ui.block.clear();
                dfd.resolve();
                return dfd.promise();
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


            


            // Load Dialog
            /**
             * Screen B - openDeleteDialog
             */
            /*public openDeleteDialog() {
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
            }*/

            

        }

        /**
         * JobTitleHistoryModel
         */
        /*
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
		 */

    }
}