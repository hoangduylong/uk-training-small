module nts.uk.com.view.cmf002.y {
    import getText = nts.uk.resource.getText;
    import alertError = nts.uk.ui.dialog.alertError;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    export module viewmodel {
        export class ScreenModel {
            //param
            storeProcessingId: string;
            logSequenceNumber: number;

            iErrorContentCSV: KnockoutObservable<IErrorContentCSV>;
            exterOutExecLog: KnockoutObservable<ExterOutExecLog>;
            externalOutLog: KnockoutObservableArray<ExternalOutLog> = ko.observableArray([]);
            columnsExternalOutLog: KnockoutObservableArray<NtsGridListColumn>;
            currentCode: KnockoutObservableArray<any>;
            count: number = 100;

            //grid error
            processCount: KnockoutObservable<string> = ko.observable('');
            errorItem: KnockoutObservable<string> = ko.observable('');
            errorTargetValue: KnockoutObservable<string> = ko.observable('');
            errorContent: KnockoutObservable<string> = ko.observable('');
            errorEmployee: KnockoutObservable<string> = ko.observable('');

            normalCount: KnockoutObservable<number> = ko.observable(0);
            totalCount: KnockoutObservable<number> = ko.observable(0);
            totalErrorCount: KnockoutObservable<number> = ko.observable(0);
            groupProcessCount: KnockoutObservable<number> = ko.observable(0);

            constructor() {
                let self = this;
                let params = getShared('CMF002_Y_PROCESINGID');
                self.storeProcessingId = params;

                self.exterOutExecLog = ko.observable(new ExterOutExecLog('', '', '', 0, 0, '', 0, 0, '', 0, '', '', '', 0, 0, '', '', '', '', '', 0, ''));

//                self.totalCount.subscribe(function(value) {
//                    self.normalCount(self.totalCount() - self.totalErrorCount());
//                });
//                self.totalErrorCount.subscribe(function(value) {
//                    self.normalCount(self.totalCount() - self.totalErrorCount());
//                });
                
                self.groupProcessCount.subscribe(function(value) {
                    self.normalCount(self.totalCount() - self.groupProcessCount());
                });

                self.iErrorContentCSV = ko.observable(new IErrorContentCSV("", self.exterOutExecLog(), self.externalOutLog()));

                service.getExterOutExecLog(self.storeProcessingId).done(function(res: ExterOutExecLog) {
                    if (res) {
                        self.totalCount(res.totalCount);
                        self.totalErrorCount(res.totalErrorCount);
                        self.exterOutExecLog(res);
                        self.iErrorContentCSV(new IErrorContentCSV(self.exterOutExecLog().nameSetting, self.exterOutExecLog(), self.externalOutLog()));
                    }
                }).fail(function(res: any) {
                    console.log("FindExterOutExecLog fail");
                });

                service.getExternalOutLog(self.storeProcessingId).done(function(res: Array<ExternalOutLog>) {
                    nts.uk.ui.block.invisible();
                    if (res) {
                        let sortByExternalOutLog = _.orderBy(res, ["logRegisterDateTime"]);
                        if (sortByExternalOutLog && sortByExternalOutLog.length) {
                            let temp: Array<ExternalOutLog> = [];
							_.forOwn(sortByExternalOutLog, function(index) {
                                temp.push(new ExternalOutLog(
                                    index.processCount,
                                    index.errorContent,
                                    index.errorTargetValue,
                                    index.errorEmployee,
                                    index.errorItem
                                ));     
                            });
                            
                            for(let i = 0; i<temp.length; i++){
                                temp[i]['no'] = i;
                            }
							self.externalOutLog(temp);
							self.iErrorContentCSV(new IErrorContentCSV(self.exterOutExecLog().nameSetting, self.exterOutExecLog(), self.externalOutLog()));
                            self.groupProcessCount(_.size(_.countBy(sortByExternalOutLog, 'processCount')));
                        }
                    }
                }).fail(function(res: any) {
                    console.log("FindgetExternalOutLog fail");
                }).always(function() {
                    nts.uk.ui.block.clear();
                });

                this.columnsExternalOutLog = ko.observableArray([
                    { headerText: '', key: 'no', formatter: _.escape, hidden: true},
                    { headerText: getText('CMF002_336'), key: 'processCount', width: 40, formatter: _.escape},
                    { headerText: getText('CMF002_337'), key: 'errorItem', width: 80, formatter: _.escape },
                    { headerText: getText('CMF002_338'), key: 'errorTargetValue', width: 80, formatter: _.escape },
                    { headerText: getText('CMF002_339'), key: 'customerrorContent', width: 340, formatter: _.escapes }
                ]);
                this.currentCode = ko.observableArray();
            }
            //開始
            start(): JQueryPromise<any> {
                $('#listlog_container').removeAttr('tabindex');
                let self = this,
                    dfd = $.Deferred();

                dfd.resolve();
                return dfd.promise();
            }

            // エラー出力
            errorExport() {
                let self = this;
                nts.uk.ui.block.invisible();
                service.exportDatatoCsv(self.iErrorContentCSV()).fail(function(res: any) {
                    alertError({ messageId: res.messageId });
                }).always(function() {
                    nts.uk.ui.block.clear();
                });
            }
            // close popup
            public close(): void {
                nts.uk.ui.windows.close();
            }
        }

        class IErrorContentCSV {
            nameSetting: string;
            resultLog: ExterOutExecLog;
            errorLog: ExternalOutLog[];
            constructor(nameSetting: string, resultLog: ExterOutExecLog, errorLog: ExternalOutLog[]) {
                this.nameSetting = nameSetting;
                this.resultLog = resultLog;
                this.errorLog = errorLog;
            }
        }

        //外部出力結果ログ
        export class ExternalOutLog {
            companyId: string;
            outputProcessId: string;
            errorContent: string;
            errorTargetValue: string;
            errorDate: string;
            errorEmployee: string;
            errorItem: string;
            logRegisterDateTime: string;
            logSequenceNumber: number;
            processCount: number;
            processContent: string;
            customerrorContent: string;

            constructor(processCount : number, errorContent?: string, errorTargetValue?: string, errorEmployee?: string, errorItem?: string) {
                this.processCount = processCount ? processCount : null;
                this.errorContent = errorContent ? errorContent : null;
                this.errorTargetValue = errorTargetValue ? errorTargetValue : null;
                this.errorEmployee = errorEmployee ? errorEmployee : null;
                this.errorItem = errorItem ? errorItem : null;
                this.customerrorContent = errorEmployee != null ? errorContent + "(" + getText('CMF002_356') + errorEmployee + ")" : errorContent;   
            }
        }

        //外部出力実行結果ログ
        export class ExterOutExecLog {
            companyId: string;
            outputProcessId: string;
            userId: string;
            totalErrorCount: number;
            totalCount: number;
            fileId: string;
            fileSize: number;
            deleteFile: number;
            fileName: string;
            roleType: number;
            processUnit: string;
            processEndDateTime: string;
            processStartDateTime: string;
            standardClass: number;
            executeForm: number;
            executeId: string;
            designatedReferenceDate: string;
            specifiedEndDate: string;
            specifiedStartDate: string;
            codeSettingCondition: string;
            resultStatus: number;
            nameSetting: string;

            constructor(companyId: string, outputProcessId: string, userId: string,
                totalErrorCount: number,
                totalCount: number, fileId: string,
                fileSize: number, deleteFile: number, fileName: string,
                roleType: number, processUnit: string, processEndDateTime: string,
                processStartDateTime: string, standardClass: number, executeForm: number,
                executeId: string, designatedReferenceDate: string, specifiedEndDate: string,
                specifiedStartDate: string, codeSettingCondition: string,
                resultStatus: number, nameSetting: string) {

                this.companyId = companyId;
                this.outputProcessId = outputProcessId;
                this.userId = userId;
                this.totalErrorCount = totalErrorCount;
                this.totalCount = totalCount;
                this.fileId = fileId;
                this.fileSize = fileSize;
                this.deleteFile = deleteFile;
                this.fileName = fileName;
                this.roleType = roleType;
                this.processUnit = processUnit;
                this.processEndDateTime = processEndDateTime;
                this.processStartDateTime = processStartDateTime;
                this.standardClass = standardClass;
                this.executeForm = executeForm;
                this.executeId = executeId;
                this.designatedReferenceDate = designatedReferenceDate;
                this.specifiedEndDate = specifiedEndDate;
                this.specifiedStartDate = specifiedStartDate;
                this.codeSettingCondition = codeSettingCondition;
                this.resultStatus = resultStatus;
                this.nameSetting = nameSetting;
            }
        }
    }
}