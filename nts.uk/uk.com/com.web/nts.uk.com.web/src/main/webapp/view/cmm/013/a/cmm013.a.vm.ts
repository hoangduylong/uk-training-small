module nts.uk.com.view.cmm013.a {

    export module viewmodel {

        import Constants = base.Constants;

        import History = base.History;
        import JobTitle = base.JobTitle;

		import setShared = nts.uk.ui.windows.setShared;
    	import getShared = nts.uk.ui.windows.getShared;

        export class ScreenModel {

			jobTitleColumns: KnockoutObservableArray<any>

            baseDate: KnockoutObservable<string>;

            selectedJobTitleCode: KnockoutObservable<string> = ko.observable("");
			currentJobTitleName: KnockoutObservable<string> = ko.observable("");
			currentPositionCode: KnockoutObservable<string> = ko.observable("");
			currentPositionOrder: KnockoutObservable<string> = ko.observable("");
			currentPositionName: KnockoutObservable<string> = ko.observable("");
			selectedHistoryId: KnockoutObservable<string> = ko.observable("");
            jobTitleIsManager: KnockoutObservable<boolean> = ko.observable(false);

			jobTitleList: KnockoutObservableArray<JobTitle> = ko.observableArray([]);
			jobTitleFoundList: KnockoutObservableArray<JobTitle> = ko.observableArray([]);
			
			historyList: KnockoutObservableArray<History> = ko.observableArray([]);

            enableHistory: KnockoutObservable<boolean> = ko.observable(true);

			texteditor: any;
			
            constructor() {
                let self = this;

				// init UI table job title
				self.jobTitleColumns = ko.observableArray([
	                { headerText: 'コード', key: 'jobTitleCode', width: 100 },
	                { headerText: '名称', key: 'jobTitleName', width: 220 }
	            ]); 

				// setup date default for search input
				self.baseDate = ko.observable((new Date()).toDateString());
				
				// get data
				self.effect()
                
				
				// set active job (job code)
				//this.selectedJobTitleCode(this.jobTitleList()[0].jobTitleCode);
            }

			private effect(): void {
				let self = this;
				// first request data
				service.findAllJobTitle()
					.done((data: any) => {
						console.log("Success: " + data)
					})
					.fail((err: any) => {
						console.log("Error: " + err)
					})
					
				// get data of jobtitle list
                for (let i = 0; i < 20; i++) {
					self.jobTitleList.push(new JobTitle("code_"+i, "name"+i, "position_code_"+i+1, "position_name_"+i+1, 1));
					console.log("fake job data success");
				}
				// select first element of list job
				self.selectedJobTitleCode(self.jobTitleList()[0].jobTitleCode);
				
				// change events
				self.selectedJobTitleCode.subscribe(newJobCode => {
					console.log(newJobCode);
					// reload job title info
					/*service.findHistoryList(newJobCode)
						.done((data: any) => {
							console.log(data)
						})
						.fail((err: any) => {
							console.log(err)
						})*/
					
					// get data of history for job title (get by selected job id)
					self.historyList([]);
					self.historyList.valueHasMutated();
					for (let i = 0; i < 20; i++) {
						self.historyList.push(new History("job", "history_name_"+i, "historyId_"+i, "3/1/2020", "1/3/2021"));
						console.log("fake history data success");
					}
					self.historyList.valueHasMutated();
					// select first element of list history
					self.selectedHistoryId(self.historyList()[0].historyId);
 
					// reset all state
					
					let jobs = self.jobTitleList().filter(e => (e.jobTitleCode == newJobCode));
					if (jobs.length > 0) {						
						self.currentPositionName(jobs[0].position.positionName);
						self.currentPositionCode(jobs[0].position.positionCode);
						self.currentPositionOrder(jobs[0].position.positionOrder+"");
					}
				})
				
				self.selectedHistoryId.subscribe(newHistoryId => {
					console.log(newHistoryId);
					// check lastest history local
					let isCtrlHistory = self.isLastestHistory(newHistoryId);
					self.enableHistory(isCtrlHistory);
					
					// get job of history selected
					let histories = self.historyList().filter(e => (e.historyId == newHistoryId));
					// exist elements
					if (histories.length > 0) {					
						self.currentJobTitleName(histories[0].jobTitleName);
					}
				})
			}

            /**
             * start
             */
			public startPage(): JQueryPromise<void> {
                var dfd = $.Deferred<void>();
                var self = this;
               nts.uk.ui.block.invisible();
                
                
                nts.uk.ui.block.clear();
                dfd.resolve();
                return dfd.promise();
            }

			private isLastestHistory(historyId: string): boolean {
				let self = this;
				return historyId == self.historyList()[0].historyId;
			}
			
			public deleteHistory() {
				let self = this;
				self.historyList.shift();
				self.historyList.valueHasMutated();
			}


			/**
				Dialogs
			 */
			public openDialogB() {
                let self = this;
                setShared('listMasterToB', {
					jobTitleCode: self.selectedJobTitleCode(),
					jobTitleName: self.currentJobTitleName(),
					lastestHistory: self.historyList()[0]
                });
                nts.uk.ui.windows.sub.modal('/view/cmm/013/b2/index.xhtml').onClosed(function(): any {
                    let data: any = getShared('DialogBToMaster');
					console.log(data);
					let first = self.historyList.shift();
					self.historyList.unshift(new History(first.jobTitleId, first.jobTitleName, first.historyId, first.startDate, data.abrogatedDate));
					self.historyList.valueHasMutated();
                });
            } 

			public openDialogC() {
                let self = this;
                setShared('listMasterToC', {
                });
                nts.uk.ui.windows.sub.modal('/view/cmm/013/c2/index.xhtml').onClosed(function(): any {
                    let data: any = getShared('DialogCToMaster');
					self.currentPositionCode(data.positionCode);
					self.currentPositionName(data.positionName);
                });
            }

			public openDialogD() {
                let self = this;
                setShared('listMasterToD', {
					historyList: self.historyList()
                });
                nts.uk.ui.windows.sub.modal('/view/cmm/013/d/index.xhtml').onClosed(function(): any {
                    let data: any = getShared('DialogDToMaster');
					self.historyList()[0].startDate = data.startDate;
					let preEndDate = new Date();
					preEndDate.setDate(new Date(data.startDate).getDate() - 1);
					self.historyList()[1].endDate = preEndDate.toString();
                });
            }


			public openDialogE() {
                let self = this;
                setShared('listMasterToE', {
					startDate: self.historyList()[0].startDate,
					historyList: self.historyList()
                });
                nts.uk.ui.windows.sub.modal('/view/cmm/013/e/index.xhtml').onClosed(function(): any {
                    let data: any = getShared('DialogEToMaster');
					self.historyList()[0].startDate = data.startDate;
					let preEndDate = new Date();
					preEndDate.setDate(new Date(data.startDate).getDate() - 1);
					self.historyList()[1].endDate = preEndDate.toString();			
                });
            }

			public openDialogF() {
                let self = this;
                setShared('listMasterToF', {
                });
                nts.uk.ui.windows.sub.modal('/view/cmm/013/f/index.xhtml').onClosed(function(): any {
                    let data: any = getShared('DialogEToMaster');
                });
            }


			public prepareToServer(isAbrogated: boolean): any {
				let self = this;
				
				return {
					positionCode: self.currentPositionCode(),
					jobTitleCode: self.selectedJobTitleCode(),
					historyId: self.historyList().map(e => e.historyId),
					jobTitleName: self.historyList().map(e => e.jobTitleName),
					startDate: self.historyList().map(e => e.startDate),
					endtDate: self.historyList().map(e => e.endDate),
					isAbrogated,
					treatAsAManager: self.jobTitleIsManager()
				}
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

        }
    }
}