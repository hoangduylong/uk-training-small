module nts.uk.at.view.cps013.e {
    import block = nts.uk.ui.block;
    import getText = nts.uk.resource.getText;
    import kibanTimer = nts.uk.ui.sharedvm.KibanTimer;
    export module viewmodel {
        export class ScreenModel {
            mode: KnockoutObservable<boolean>;
            startTime: KnockoutObservable<string> = ko.observable("");
            endTime: KnockoutObservable<string> = ko.observable("");
            elapseTime: kibanTimer = new kibanTimer('elapseTime');
            taskId: KnockoutObservable<string> = ko.observable("");
            executeId: KnockoutObservable<string> = ko.observable("");
            numberEmpChecked: KnockoutObservable<number> = ko.observable(0);
            daucach: KnockoutObservable<string> = ko.observable("");
            countEmp: KnockoutObservable<number> = ko.observable(0);
            isComplete: KnockoutObservable<boolean> = ko.observable(false);
            statusCheck: KnockoutObservable<string> = ko.observable("");
            aggCreateHasError: KnockoutObservable<string> = ko.observable("");
            logId: KnockoutObservable<string> = ko.observable("");
            columns: KnockoutObservableArray<any>;
            peopleCount: KnockoutObservable<string> = ko.observable('0');
            executionStatus: KnockoutObservable<string> = ko.observable('');

            //
            errorMessageInfo: KnockoutObservableArray<PersonInfoErrMessageLog> = ko.observableArray([]);
            currentCode: KnockoutObservable<any> = ko.observable();

            //
            startDateTime: KnockoutObservable<string>;
            endDateTime: KnockoutObservable<string>;

            dataShare: KnockoutObservable<IDataShare>= ko.observableArray();

            // disable gridlist
            error: KnockoutObservable<boolean> = ko.observable(false);
            
            // show table error
            showTableResult: KnockoutObservable<boolean> = ko.observable(false);
            constructor() {
                var self = this;
                self.elapseTime.start();
                self.mode = ko.observable(false);
                self.isComplete = ko.observable(false);
                self.showTableResult = ko.observable(false);
                $("#button3001").focus();
                self.columns = ko.observableArray([
                    { headerText: getText('CPS013_26'), key: 'employeeCode', width: 150 },
                    { headerText: getText('CPS013_27'), key: 'bussinessName', width: 200 },
                    { headerText: getText('CPS013_28'), key: 'clsCategoryCheck', width: 200 },
                    { headerText: getText('CPS013_29'), key: 'categoryName', width: 200 },
                    { headerText: getText('CPS013_30'), key: 'error', width: 350, formatter: makeIcon},
                    { headerText: '', key: 'employeeId', width: 1, hidden: true },
                    { headerText: '', key: 'categoryId', width: 1, hidden: true },
                    { headerText: '', key: 'GUID', width: 1, hidden: true },
                ]);
                self.errorMessageInfo.subscribe((value)=>{
                    if(value.length){
                        self.error(true);
                        self.showTableResult(true);
                        let selfDialog = nts.uk.ui.windows.getSelf();
                        selfDialog.$dialog.data('__size__', {width : 1170 , height : 615});
                        selfDialog.setSize(615, 1170);
                        window.parent.dispatchEvent(new Event('resize'));
                    }
                });
            }
            // dataShare từ màn A.
            start(dataShare: IDataShare) {
                var self = this;
                $(".closebutton").focus();
                //system date
                if (dataShare !== undefined) {
                    self.dataShare(dataShare);
                    //method execute
                    service.executeCheck(dataShare).done(res => {
                        self.taskId(res.id);
                        nts.uk.deferred.repeat(conf => conf
                            .task(() => {
                                return nts.uk.request.asyncTask.getInfo(self.taskId()).done(info => {
                                    self.startTime(self.getAsyncData(info.taskDatas, "startTime").valueAsString);
                                    self.numberEmpChecked(self.getAsyncData(info.taskDatas, "numberEmpChecked").valueAsNumber);
                                    self.countEmp(self.getAsyncData(info.taskDatas, "countEmp").valueAsNumber);
                                    if(self.countEmp()){
                                        self.daucach("/");
                                    }    
									
									self.statusCheck(self.getAsyncData(info.taskDatas, "statusCheck").valueAsString);

                                    if (!info.pending && !info.running || info.requestedToCancel) {
                                        self.isComplete(true);
                                        // End count time
                                        self.elapseTime.end();
                                        let timeAction = self.elapseTime.elapsedSeconds;
                                        self.endTime(moment.utc(self.startTime()).add(timeAction, 'second').format("YYYY/MM/DD HH:mm:ss"));
                                        $("#elapseTime").text(self.formatTime(timeAction));
                                        
										if(info.requestedToCancel){
											self.statusCheck(getText('CPS013_51'));
										}
                                        
										self.numberEmpChecked(self.getAsyncData(info.taskDatas, "numberEmpChecked").valueAsNumber);
                                        										
                                        self.bindingDataToGrid(info.taskDatas);
                                        setTimeout(() => {
                                           $("#button3001").focus();
                                        }, 1500);
                                    }
                                });
                            })
                            .while(info => (info.pending || info.running) && (!info.requestedToCancel))
                            .pause(1000)
                        );
                    });
                }
            }
            
            exportCsv(): void {
                var self = this;
                let info = self.errorMessageInfo();
                var listError = []; 
                _.forEach(info, function(row) {
                    let data = {
                        employeeCode: row.employeeCode,
                        employeeName: row.bussinessName,
                        checkAtr: row.clsCategoryCheck,
                        categoryName: row.categoryName,
                        contentError: row.error
                    };
                    listError.push(data);
                });
                block.invisible();
                nts.uk.request.exportFile('com', 'person/consistency/check/report/print/error', listError)
                .done(data => {})
                .fail((mes) => {})
                .always(()=>block.clear());
            }
            
            RecheckTheSameConditions() : void {
               var self = this;
               self.elapseTime.start();
               self.startTime('');
               self.numberEmpChecked(0);
               self.daucach("");
               self.countEmp(0);
               self.statusCheck('');
               self.endTime('');
                
                self.showTableResult(false);
                self.isComplete(false);
                // change size dialog
                let selfDialog = nts.uk.ui.windows.getSelf();
                selfDialog.$dialog.data('__size__', { width: 600, height: 250 });
                selfDialog.setSize(250, 600);
                window.parent.dispatchEvent(new Event('resize'));
                
                // focus 
                $("#buttoncancelTask").focus();
                
               self.errorMessageInfo([]);
               let conditions = self.dataShare();
               self.start(conditions);
            }
            
            cancelTask(): void {
                var self = this;
                nts.uk.request.asyncTask.requestToCancel(self.taskId());
                self.elapseTime.end();
            }

            closeDialog(): void {
                nts.uk.ui.windows.close();
            }

           private bindingDataToGrid(data: Array<any>): void {
                var self = this;

                let  data_employee = [],
                     errs = [];

               data_employee = _.filter(data, function(item) { return item.key.substring(0, 10) === "employeeId"; });
               
               for (let i = 0; i < data_employee.length; i++) {
                   var obj = JSON.parse(data_employee[i].valueAsString);
                   var errorInfo = {
                       employeeId: obj.employeeId,
                       categoryId: obj.categoryId,
                       employeeCode: obj.employeeCode,
                       bussinessName: obj.bussinessName,
                       clsCategoryCheck: obj.clsCategoryCheck,
                       categoryName: obj.categoryName,
                       error: obj.error
                   };

                   errs.push(new PersonInfoErrMessageLog(errorInfo));
               }
               
               // order 
               self.errorMessageInfo(_.sortBy(errs, ['employeeCode', 'clsCategoryCheck', 'categoryName', 'error']));
            
            }

            private getAsyncData(data: Array<any>, key: string): any {
                var result = _.find(data, (item) => {
                    return item.key == key;
                });
                return result || { valueAsString: "", valueAsNumer: 0, valueAsBoolean: false};
            }
            
            formatTime(second: number) {
                let d = (s) => { f = Math.floor; g = (n) => ('00' + n).slice(-2); return f(s / 3600) + ':' + g(f(s / 60) % 60) + ':' + g(s % 60) };
                return d(second);
            }
        }
    }
    
    export interface PersonInfoErrMessageLogDto {
        employeeId: string;
        categoryId: string;
        employeeCode: string;
        bussinessName: string;
        clsCategoryCheck: string;
        categoryName: string;
        error: string;
    }

    export class PersonInfoErrMessageLog {
        GUID: string;
        employeeId: string;
        categoryId: string;
        employeeCode: string;
        bussinessName: string;
        clsCategoryCheck: string;
        categoryName: string;
        error: string;
        constructor(data: PersonInfoErrMessageLogDto) {
            this.GUID = nts.uk.util.randomId();
            this.employeeId = data.employeeId;
            this.categoryId = data.categoryId;
            this.employeeCode = data.employeeCode;
            this.bussinessName = data.bussinessName;
            this.clsCategoryCheck = data.clsCategoryCheck;
            this.categoryName = data.categoryName;
            this.error = data.error;
        }
    }
    export enum ExecutionStatus {
        // 0:完了
        Done = 0,
        // 1:完了（エラーあり）
        DoneWitdError = 1,
        // 2:中断終了
        EndOfInterruption = 2,
        // 3:処理中 
        Processing = 3,
        // 4:中断開始
        StartOfInterruption = 4,
        // 5:実行中止
        StopExecution = 5
    }

    interface IDataShare {
        perInfoCheck: boolean,
        masterCheck: boolean,
        scheduleMngCheck: boolean,
        dailyPerforMngCheckL: boolean,
        monthPerforMngCheck: boolean,
        payRollMngCheck: boolean,
        bonusMngCheck: boolean,
        yearlyMngCheck: boolean,
        monthCalCheck: boolean,
        peopleCount: number,
        startDateTime: Date,
    }
    export interface EmployeInfoErrorDataSourceDto {
        employeeCode: string;
        employeeName: string;
        checkAtr: string;
        categoryName: string;
        contentError: string;
    }
    
    export class EmployeInfoErrorDataSource {
        employeeCode: string;
        employeeName: string;
        checkAtr: string;
        categoryName: string;
        contentError: string;
        constructor(data: EmployeInfoErrorDataSourceDto) {
            this.employeeCode = data.employeeCode;
            this.employeeName = data.employeeName;
            this.checkAtr = data.checkAtr;
            this.categoryName = data.categoryName;
            this.contentError = data.contentError;
        }
    }

    function makeIcon(value, row) {
        if (value == '1')
            return '<img style="margin-left: 15px; width: 20px; height: 20px;" />';
        return '<div>' + '<div class="jumpButton">' + value + '</div>' + '<div style = "display: inline-block; position: relative;">' + '<button tabindex = "6" class="open-dialog-i" onclick="jumtoCPS001A(\'' + row.employeeId + '\', \'' + row.categoryId + '\')">' + nts.uk.resource.getText("CPS013_31") + '</button>' + '</div>' + '</div>';
    }
}

function jumtoCPS001A(employeeId: string, categoryId: string) {
    nts.uk.request.jumpToNewWindow('com', '/view/cps/001/a/index.xhtml', { employeeId, categoryId });
}

 