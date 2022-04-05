module nts.uk.com.view.cmf002.s {
    import getText = nts.uk.resource.getText;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import getStatusEnumS = cmf002.share.model.getStatusEnumS;
    import getEnums = cmf002.share.model.EXIOOPERATIONSTATE;
    export module viewmodel {
        export class ScreenModel {
            // interval 1000ms request to server
            interval: any;
            // time when start process
            timeStart: any;
            // S2_1_2
            timeOver: KnockoutObservable<string>;
            // S2_2_1
            status: KnockoutObservable<string>;
            proCnt: KnockoutObservable<number>;
            totalProCnt: KnockoutObservable<number>;
            proUnit: KnockoutObservable<string>;
            errCnt: KnockoutObservable<number>;

            opCond: number;

            // S3
            dataSaveSetCode: string;
            dataSaveSetName: string;
            dayStartValue: string;
            dayEndValue: string;

            // dialog mode
            dialogMode: KnockoutObservable<string>;

            // check file has been downloaded already
            isDownloaded: KnockoutObservable<boolean>;

            // received storeProcessingId from R
            storeProcessingId: string;

            //nextToY
            isToNext: KnockoutObservable<boolean> = ko.observable(true);

            constructor() {
                let self = this;

                let params = getShared("CMF002_R_PARAMS");
                self.timeStart = new Date();
                self.timeOver = ko.observable('00:00:00');
                self.dataSaveSetCode = params.selectedConditionCd;
                self.dataSaveSetName = params.selectedConditionName;
                self.storeProcessingId = params.processingId;

                self.status = ko.observable('');
                self.proCnt = ko.observable(0);
                self.totalProCnt = ko.observable(0);
                self.proUnit = ko.observable('');
                self.errCnt = ko.observable(0);
                self.dialogMode = ko.observable("saving");
                self.isDownloaded = ko.observable(false);

                //date
                self.opCond = 0;
                if (_.isNil(params.startDate)) {
                    self.dayStartValue = ""
                } else {
                    self.dayStartValue = moment.utc(params.startDate, 'YYYY/MM/DD').format("YYYY/MM/DD");
                }

                if (_.isNil(params.endDate)) {
                    self.dayEndValue = ""
                } else {
                    self.dayEndValue = moment.utc(params.endDate, 'YYYY/MM/DD').format("YYYY/MM/DD");
                }

            }
            //開始
            start(): JQueryPromise<any> {
                let self = this,
                    dfd = $.Deferred();

                //データ保存監視処理: 
                self.interval = setInterval(self.confirmProcess, 1000, self);

                dfd.resolve();
                return dfd.promise();
            }

            public confirmProcess(self): void {

                // ドメインモデル「外部出力動作管理」
                service.findExOutOpMng(self.storeProcessingId).done(function(res: any) {
                    if (res) {
                        //S1
                        let timeNow = new Date();
                        let over = (timeNow.getSeconds() + timeNow.getMinutes() * 60 + timeNow.getHours() * 60 * 60) - (self.timeStart.getSeconds() + self.timeStart.getMinutes() * 60 + self.timeStart.getHours() * 60 * 60);
                        let time = new Date(null);
                        time.setSeconds(over); // specify value for SECONDS here
                        let result = time.toISOString().substr(11, 8);
                        self.timeOver(result);

                        //S3
                        let itemModel = _.find(getStatusEnumS(), function(x) { return x.code == res.opCond; });
                        self.status(itemModel.name);
                        self.proCnt(res.proCnt);
                        self.totalProCnt(res.totalProCnt);
                        self.proUnit(res.proUnit);
                        self.errCnt(res.errCnt);
                        if (self.errCnt() == 0) {
                            self.isToNext(false);
                        }
                        self.opCond = res.opCond;
                        // update mode 
                        if ((res.opCond == getEnums.EXPORT_FINISH) || (res.opCond == getEnums.INTER_FINISH) || (res.opCond == getEnums.FAULT_FINISH)) {
                            // stop auto request to server
                            clearInterval(self.interval);
                            // end: update dialog to complete mode
                            if (res.opCond == getEnums.EXPORT_FINISH) {
                                self.dialogMode("done");
                                service.getExterOutExecLog(self.storeProcessingId).done(function(data: any) {
                                    if (data) {
                                        let delFile = data.deleteFile;
                                        let fileId = data.fileId;
                                        self.isDownloaded(delFile == 0);
                                        if (delFile == 1) {
                                            self.dialogMode("File_delete");
                                            $('#S10_2').focus();
                                        } else {
                                            service.updateFileSize(self.storeProcessingId, fileId).done(function(updatedata: any) {
                                            });
                                            $('#S10_3').focus();

                                            // confirm down load when done
                                            nts.uk.ui.dialog.confirm({ messageId: "Msg_334" })
                                                .ifYes(() => {
                                                    if (fileId) {
                                                        nts.uk.request.specials.donwloadFile(fileId);
                                                        $('#S10_2').focus();
                                                    }
                                                })
                                                .ifNo(() => {
                                                    $('#S10_2').focus();
                                                    return;
                                                });
                                            if (self.errCnt() == 0) {
                                                self.isToNext(false);
                                            }
                                        }
                                    }
                                }).fail(function(res: any) {
                                    console.log("Get fileId fail");
                                    $('#S10_2').focus();
                                });
                            }
                            // end: update dialog to Error/Interrupt mode
                            if ((res.opCond == getEnums.INTER_FINISH) || (res.opCond == getEnums.FAULT_FINISH)) {
                                self.dialogMode("error_interrupt");
                                $('#S10_2').focus();
                            }
                            //delete dataStorageMng of process when end
                            let exOutOpMng = new ExOutOpMng(self.storeProcessingId, 0, 0, 0, 0, '0', 0);
                            service.deleteexOutOpMng(exOutOpMng).done(function(res: any) {
                                console.log("delete success");
                            }).fail(function(res: any) {
                                console.log("delete fails");
                            });
                        }
                    }
                }).fail(function(res: any) {
                    console.log("findexOutOpMng fail");
                });
            }

            //中断をする
            public interrupt(): void {
                let self = this;
                let exOutOpMng = new ExOutOpMng(self.storeProcessingId, self.proCnt(), self.errCnt(), self.totalProCnt(), 1, self.proUnit(), self.opCond);
                nts.uk.ui.dialog.confirm({ messageId: "Msg_387" })
                    .ifYes(() => {
                        self.dialogMode("error_interrupt");
                        let itemModel = _.find(getStatusEnumS(), function(x) { return x.code == getEnums.INTER_FINISH; });
                        self.status(itemModel.name);
                        // stop auto request to server
                        clearInterval(self.interval);
                        $('#S10_2').focus();
                        // don't nextTo ScreenY
                        if (self.errCnt() == 0) {
                            self.isToNext(false);
                        }

                        //delete dataStorageMng of process when interrupt
                        let exOutOpMng = new ExOutOpMng(self.storeProcessingId, 0, 0, 0, 0, '0', 0);
                        service.updateexOutOpMng(exOutOpMng).done(function(res: any) {
                            console.log("update interrupt success");
                        }).fail(function(res: any) {
                            console.log("interrupt fails");
                        });
                    })
                    .ifNo(() => {
                        $('#S10_2').focus();
                        return;
                    });
            }

            //ダウンロードをする
            public download(): void {
                let self = this;

                // confirm down load when click button
                nts.uk.ui.dialog.confirm({ messageId: "Msg_388" })
                    .ifYes(() => {
                        service.getExterOutExecLog(self.storeProcessingId).done(function(res: any) {
                            let fileId = res.fileId;
                            nts.uk.request.specials.donwloadFile(fileId);
                            //self.isDownloaded(true);
                            $('#S10_2').focus();
                        }).fail(function(res: any) {
                            console.log("Get fileId fail");
                        });
                    })
                    .ifNo(() => {
                        $('#S10_2').focus();
                        return;
                    });
            }

            public close(): void {
                nts.uk.ui.windows.close();
            }

            public nextToScreenY(): void {
                let self = this;
                setShared("CMF002_Y_PROCESINGID", self.storeProcessingId);
                nts.uk.ui.windows.sub.modal('../y/index.xhtml').onClosed(() => {

                });
            }
        }

        export class ExOutOpMng {
            exOutProId: string;
            proCnt: number;
            errCnt: number;
            totalProCnt: number;
            doNotInterrupt: number;
            proUnit: string;
            opCond: number;
            constructor(exOutProId: string, proCnt: number, errCnt: number, totalProCnt: number,
                doNotInterrupt: number, proUnit: string, opCond: number) {
                this.exOutProId = exOutProId;
                this.proCnt = proCnt;
                this.errCnt = errCnt;
                this.totalProCnt = totalProCnt;
                this.doNotInterrupt = doNotInterrupt;
                this.proUnit = proUnit;
                this.opCond = opCond;
            }
        }
    }
}