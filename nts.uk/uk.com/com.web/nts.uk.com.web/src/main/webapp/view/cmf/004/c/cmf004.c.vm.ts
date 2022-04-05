module nts.uk.com.view.cmf004.c {
  export module viewmodel {
    import getText = nts.uk.resource.getText;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    export class ScreenModel {
      fileName: KnockoutObservable<string> = ko.observable('');
      fileId: KnockoutObservable<string> = ko.observable('');
      password: KnockoutObservable<string> = ko.observable('');
      storeProcessingId: KnockoutObservable<string> = ko.observable('');
      fromServerFile: KnockoutObservable<boolean> = ko.observable(false);

      constructor() {
        let self = this;
        let fileInfo = getShared('CMF004lParams');
        if (fileInfo) {
          self.fileName(fileInfo.fileName);
          self.fileId(fileInfo.fileId);
          self.storeProcessingId(fileInfo.storeProcessingId);
          self.fromServerFile(fileInfo.fromServerFile);
        }
      }

      private processing(): void {
        let self = this;
        let fileInfo = {
          fileId: self.fileId(),
          fileName: self.fileName(),
          password: self.password()
        };
        if (self.fromServerFile()) {
          var param: any = { storeProcessingId: self.storeProcessingId(), password: self.password() }
          var data: any;

          service.checkPassword(param).done((res: boolean) => {
            if (!res) {
              data = { continuteProcessing: false, message: 'Msg_606' };
            } else {
              data = { fileInfo: fileInfo, continuteProcessing: true };
            }
          }).always(() => {
            console.log(data);
            setShared("CMF004_D_PARAMS", data);
            nts.uk.ui.windows.close();
          });
        } else {
          setShared("CMF004_D_PARAMS", { storeProcessingId: self.storeProcessingId(), fileInfo: fileInfo, continuteProcessing: true });
          nts.uk.ui.windows.close();
        }
      }

      private cancelProcessing(): void {
        setShared("CMF004_D_PARAMS", { continuteProcessing: false });
        nts.uk.ui.windows.close();
      }
    }
  }
}