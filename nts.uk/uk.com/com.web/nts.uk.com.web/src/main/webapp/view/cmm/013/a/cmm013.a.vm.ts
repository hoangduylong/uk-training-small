module nts.uk.com.view.cmm013.a {

	export module viewmodel {

		import History = base.History;
		import JobTitle = base.JobTitle;
		import Position = base.Position;
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

			codeEditor: KnockoutObservable<boolean> = ko.observable(true);

			jobTitleList: KnockoutObservableArray<JobTitle> = ko.observableArray([]);
			jobTitleFoundList: KnockoutObservableArray<JobTitle> = ko.observableArray([]);
			positionList: KnockoutObservableArray<Position> = ko.observableArray([]);;
			historyList: KnockoutObservableArray<History> = ko.observableArray([]);

			enableHistoryCreate: KnockoutObservable<boolean> = ko.observable(true);
			enableHistoryEdit: KnockoutObservable<boolean> = ko.observable(true);
			enableHistoryDelete: KnockoutObservable<boolean> = ko.observable(true);
			isAdd: boolean = false;
			texteditor: any;

			allJob: any = [];

			test: any;
			constructor() {
				let self = this;

				// init UI table job title
				self.jobTitleColumns = ko.observableArray([
					{ headerText: 'コード', key: 'jobTitleCode', width: 100 },
					{ headerText: '名称', key: 'jobTitleName', width: 220 }
				]);

				// setup date default for search input
				self.baseDate = ko.observable((new Date()).toDateString());

				// effect
				self.effect()

				// get data
				self.firstData()


				// set active job (job code)
				//this.selectedJobTitleCode(this.jobTitleList()[0].jobTitleCode);
			}

			private firstData(): void {
				let self = this;
				// first request data
				service.findAllJobTitle()
					.done((data: Array<service.model.JobTitleDto>) => {
						data.forEach(e => {
							console.log("Success: " + e.jobTitleCode);
							self.jobTitleList.push(
								new JobTitle(
									e.jobTitleCode,
									e.historyTrainings[0]?.jobTitleName,
									e.positionCodeTraining,
									"fake", 1)
							);

							self.allJob.push(e);
						})
						// select first element of list job
						self.selectedJobTitleCode(self.jobTitleList()[0].jobTitleCode);

					})
					.fail((err: any) => {
						console.log("Error: " + err)
					})

				// get data of jobtitle list
                /*for (let i = 0; i < 20; i++) {
					self.jobTitleList.push(new JobTitle("code_"+i, "name"+i, "position_code_"+i+1, "position_name_"+i+1, 1));
					console.log("fake job data success");
				}*/


			}

			public effect() {
				let self = this;
				// change events
				self.selectedJobTitleCode.subscribe(newJobCode => {
					if (!self.jobTitleList().some(e => e.jobTitleCode == newJobCode)) {
						self.historyList([new History(
							self.selectedJobTitleCode(),
							self.currentJobTitleName(),
							util.randomId(),
							"1900/01/01",
							"9999/12/31")]);
							self.historyList()[0].displayString = `${self.historyList()[0].startDate} ~ ${self.historyList()[0].endDate}`;
					
						self.currentJobTitleName("");
						self.loadPositionList().done((data: []) => {
							self.positionList(data);
							self.currentPositionCode(self.positionList()[0]?.positionCode);
							self.currentPositionName(self.positionList()[0]?.positionName);
						});
						self.jobTitleIsManager(false);
						self.codeEditor(true)
						return;
					}
					console.log(newJobCode);

					self.codeEditor(false);
					self.historyList([]);
					// get data of history for job title (get by selected job id)
					service.findHistoryList(self.selectedJobTitleCode())
						.done((data: service.model.JobTitleDtoTraining) => {

							// check history list empty
							if (data.historyTrainings.length <= 0) {
								// error
								self.historyList([]);
								self.currentJobTitleName("");
								self.currentPositionCode("");
								self.currentPositionName("");
								self.jobTitleIsManager(false);
								self.codeEditor(false);
								self.enableHistoryCreate(true);
								self.enableHistoryEdit(true);
								self.enableHistoryDelete(true);
								return;
							}
							// check single element of history list

							// add list history
							data.historyTrainings.forEach(e => {
								self.historyList.push(
									new History(
										e.jobTitleCode,
										e.jobTitleName,
										e.historyId,
										e.startDate,
										e.endDate)
								);
							});

							self.selectedHistoryId(self.historyList()[0].historyId);

							self.currentPositionName(data.positionName);
							self.currentPositionCode(data.positionCodeTraining);
						});
				})

				self.selectedHistoryId.subscribe(newHistoryId => {
					console.log(newHistoryId);
					// check lastest history local
					let isCtrlHistory = self.isLastestHistory(newHistoryId);
					// check single history
					let isSingleHistory = self.historyList().length > 1 ? false : true
					self.enableHistoryCreate(isCtrlHistory);
					self.enableHistoryEdit(isCtrlHistory);
					self.enableHistoryDelete(isCtrlHistory && !isSingleHistory);
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
				if (self.historyList().length == 1) {
					nts.uk.ui.dialog.caution({ messageId: "Msg_57" });
				}
				else {
					nts.uk.ui.dialog.confirm({ messageId: "Msg_18" }).ifYes(() => {
						self.historyList.shift();
						let secondHistory = self.historyList.shift();
						self.historyList().unshift(new History(
							secondHistory.jobTitleCode,
							secondHistory.jobTitleName,
							secondHistory.historyId,
							secondHistory.startDate,
							"9999/12/31"
						));
						nts.uk.ui.dialog.info({ messageId: "Msg_16" })
						self.selectedHistoryId(self.historyList()[0].historyId);
						self.historyList.valueHasMutated();
					});
				}
				console.log(self.historyList());
			}

			public createJobtitle() {
				let self = this;

				self.selectedJobTitleCode("");
				self.isAdd = true;

			}

			public dateFilter(): void {
				let self = this;
				let newFound: any = [];
				newFound = self.allJob.filter((x: any) => {
					let startDate = new Date(x.historyTrainings[x.historyTrainings.length - 1].startDate);
					let endDate = new Date(x.historyTrainings[0].endDate);
					let now = new Date(self.baseDate());
					
					return now >= startDate && now <= endDate;
				})
				console.log(newFound);
				self.jobTitleList([]);
				newFound.forEach((x: any) => {					
					self.jobTitleList.push(new JobTitle(
						x.jobTitleCode,
						x.historyTrainings[0].jobTitleName,
						x.positionCode,
						x.positionName,
						1
					))
				})
			}

			// load all positions to position list
			public loadPositionList(): JQueryPromise<any> {
				let dfd = $.Deferred<any>();

				// get all positions
				service.findAllPosition()
					.done((data: []) => {
						dfd.resolve(data);
					})
					.fail((res: any) => {
						dfd.reject(res);
					});

				return dfd.promise();
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
					self.historyList.unshift(new History(first.jobTitleCode, first.jobTitleName, first.historyId, first.startDate, data.abrogatedDate));
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
					jobTitleCode: self.selectedJobTitleCode(),
					jobTitleName: self.currentJobTitleName(),
					historyList: self.historyList()
				});
				nts.uk.ui.windows.sub.modal('/view/cmm/013/d/index.xhtml').onClosed(function(): any {
					let data: any = getShared('DialogDToMaster');
					self.historyList(data?.listHistory);
					self.historyList()[0].jobTitleName = self.currentJobTitleName();
					self.selectedHistoryId(self.historyList()[0].historyId);

					console.log(self.historyList());
				});
			}


			public openDialogE() {
				let self = this;
				setShared('listMasterToE', {
					jobTitleCode: self.selectedJobTitleCode(),
					jobTitleName: self.currentJobTitleName(),
					startDate: self.historyList()[0].startDate,
					historyList: self.historyList()
				});
				nts.uk.ui.windows.sub.modal('/view/cmm/013/e/index.xhtml').onClosed(function(): any {
					let data: any = getShared('DialogEToMaster');
					self.historyList(data.listHistory);
					self.historyList.valueHasMutated();
					self.selectedHistoryId(self.historyList()[0].historyId);

					console.log(self.historyList());
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


			public prepareToServer(): any {
				let self = this;
				return {
					positionCodeTraining: self.currentPositionCode(),
					positionName: self.currentPositionName(),
					jobTitleCode: self.selectedJobTitleCode(),
					historyTrainings: self.historyList(),
					isAbrogated: self.jobTitleIsManager(),
					treatAsAManager: self.jobTitleIsManager(),
					isAdd: self.isAdd
				}
			}

			public submitForm() {
				let self = this;
				// insert or update;
				let data = self.prepareToServer();
				self.updateJobTitleName();
				console.log(data);
				service.addJobTitle(data)
					.done((result: any) => {
						location.reload();
						self.isAdd = false;
					});
			}

			private updateJobTitleName() {
				let self = this;
				if (!self.isAdd) {
					ko.utils.arrayFirst(self.historyList(), function(history) {
						return history.historyId == self.selectedHistoryId();
					}).jobTitleName = self.currentJobTitleName();
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