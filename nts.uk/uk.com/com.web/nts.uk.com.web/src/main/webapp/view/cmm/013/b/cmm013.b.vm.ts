module nts.uk.com.view.cmm013.b {
    // import JobTitleDto = service.model.JobTitleDto;
    // import blockUI = nts.uk.ui.block;

    export module viewModel {
        export class ScreenModel {
			jobTitleCode: KnockoutObservable<string>
			jobTitleName: KnockoutObservable<string>
			endDate: KnockoutObservable<string>

			

			constructor(code: string, name: string){
				let self = this;
				self.jobTitleCode(code)
				self.jobTitleName(name)

				const now = new Date();
				self.endDate(now.toString());
			}

			/**
			 * execution
			 */
			public execution(): void{
				let self = this
				service.abrogateJobTItle(self.jobTitleCode(), self.jobTitleName())
			}

			/**
			 *  end date change
			 * @param date 
			 */
			public endDateChange(date: string): void{
				let self = this;

				if(moment(date, "MM/DD/YYYY", true).isValid()){
					self.endDate(date)
				} else{
					return;
				}
			}

			 
            /**
             * Close
             */
            public close(): void {
                nts.uk.ui.windows.close();
            }

			public finishHandle(): void{
				let self = this;

				service.abrogateJobTItle(self.jobTitleCode(), self.jobTitleName())
				
			}
		}
			
    }
}