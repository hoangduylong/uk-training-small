module nts.uk.com.view.cmf004.d {
  export module viewmodel {
    import block = nts.uk.ui.block;
    import close = nts.uk.ui.windows.close;
    import getText = nts.uk.resource.getText;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import dialog = nts.uk.ui.dialog;
    export class ScreenModel {
      isSuccess: KnockoutObservable<boolean> = ko.observable(true);
      fileName: KnockoutObservable<string> = ko.observable('');
      fileId: KnockoutObservable<string> = ko.observable('');
      password: KnockoutObservable<string> = ko.observable('');
      timeLabel: KnockoutObservable<string> = ko.observable("00:00:00");
      statusLabel: KnockoutObservable<string> = ko.observable('');
      statusUpload: KnockoutObservable<string> = ko.observable('');
      statusDecom: KnockoutObservable<string> = ko.observable('');
      statusCheck: KnockoutObservable<string> = ko.observable('');
      dataRecoveryProcessId: string = nts.uk.util.randomId();
      storeProcessingId: string;
      timeStart: any;
      isWrongPassword = false;

      constructor() {
        let self = this;
        self.timeStart = new Date();
        let dParams = getShared("CMF004_D_PARAMS");
        if (dParams) {
          let fileInfo = dParams.fileInfo;
          if (fileInfo) {
            self.storeProcessingId = fileInfo.storeProcessingId;
            self.fileId(fileInfo.fileId);
            self.fileName(fileInfo.fileName);
            self.password(fileInfo.password);
          }
        }
      }

      startPage(): JQueryPromise<any> {
        let self = this;
        let dfd = $.Deferred();
        let fileInfo = {
          processingId: self.dataRecoveryProcessId,
          fileId: self.fileId(),
          fileName: self.fileName(),
          password: self.password()
        };
        service.extractData(fileInfo).done(function (data) {
          dfd.resolve();
          block.invisible();
          let taskId = data.id;
          // 1秒おきに下記を実行
          nts.uk.deferred.repeat(conf => conf
            .task(() => {
              return nts.uk.request.asyncTask.getInfo(taskId).done(function (res: any) {
                // update state on screen
                let status;
                if (res.taskDatas.length > 0) {
                  status = JSON.parse((_.filter(res.taskDatas, { key: 'status' }).pop() as any).valueAsString);
                  self.statusLabel(getText(status.conditionName));
                }
                if (res.succeeded || res.failed) {
                  if (status) {
                    self.convertToDisplayStatus(status);
                    if (status.processingType == 3 && status.processingStatus == 2) {
                      self.storeProcessingId = (_.filter(res.taskDatas, { key: 'dataStorageProcessId' }).pop() as any).valueAsString;
                      self.isSuccess(true);
                      $('#D3_2').focus();
                    } else {
                      self.isSuccess(false);
                      if (status.processingStatus == 1) {
                        if (status.conditionValue == 8) self.isWrongPassword = true;
                        dialog.alertError({ messageId: status.messageId }).then(() => {
                          $('#D3_1').focus();
                        });
                      }
                    }
                  }
                  if (res.failed) {
                    $('#D3_1').focus();
                  }
                  block.clear();
                }
                if (res.running) {
                  // 経過時間＝現在時刻－開始時刻
                  let startTime = self.timeStart;
                  let timeNow = new Date();
                  let result = moment.utc(moment(timeNow, "HH:mm:ss").diff(moment(startTime, "HH:mm:ss"))).format("HH:mm:ss");
                  self.timeLabel(result);
                  if (status) {
                    self.convertToDisplayStatus(status);
                  }
                }
              });
            }).while(infor => {
              return infor.pending || infor.running;
            }).pause(1000));
        }).fail(function (result) {
          dfd.reject();
        });
        return dfd.promise();
      }

      closeUp() {
        let self = this;
        setShared("CMF004_E_PARAMS", { storeProcessingId: self.storeProcessingId, continueShowHandleDialog: self.isWrongPassword, continuteProcessing: false });
        close();
      }

      continueProcessing() {
        let self = this;
        let fileInfo = {
          fileId: self.fileId(),
          fileName: self.fileName(),
          password: self.password()
        };
        setShared("CMF004_E_PARAMS", { storeProcessingId: self.storeProcessingId, processingId: self.dataRecoveryProcessId, fileInfo: fileInfo, continuteProcessing: true });
        close();
      }

      convertToDisplayStatus(status) {
        let self = this;
        if (status.processingType == 1) {
          self.statusUpload(self.convertToName(status.processingStatus));
        }
        if (status.processingType == 2) {
          // If status is 2, upload is compelete
          self.statusUpload(self.convertToName(2));
          self.statusDecom(self.convertToName(status.processingStatus));
        }
        if (status.processingType == 3) {
          // If status is 3, upload and extract is compelete
          self.statusUpload(self.convertToName(2));
          self.statusDecom(self.convertToName(2));
          self.statusCheck(self.convertToName(status.processingStatus));
        }
      }

      convertToName(processingType) {
        switch (processingType) {
          //処理中
          case 0: return getText("CMF004_302");
          // 失敗
          case 1: return getText("CMF004_303");
          // 完了
          case 2: return getText("CMF004_304");
        }
      }
    }
  }
}