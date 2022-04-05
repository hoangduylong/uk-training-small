/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />

module nts.uk.com.view.ccg034.c {

  // URL API backend
  const API = {
    getFlowMenu: "sys/portal/createflowmenu/getFlowMenu/{0}",
    duplicate: "sys/portal/createflowmenu/copy",
    copyFile: "sys/portal/createflowmenu/copyFile",
    generateHtml: "sys/portal/createflowmenu/generateHtml",
  };

  @bean()
  export class ScreenModel extends ko.ViewModel {
    flowMenu: FlowMenuModel;
    flowMenuInfo: KnockoutObservable<string> = ko.observable('');
    flowMenuCode: KnockoutObservable<string> = ko.observable('');
    flowMenuName: KnockoutObservable<string> = ko.observable('');
    isChecked: KnockoutObservable<boolean> = ko.observable(false);

    created(params: any) {
      const vm = this;
      vm.flowMenu = params;
      vm.flowMenuInfo(`${vm.flowMenu.flowMenuCode} ${vm.flowMenu.flowMenuName}`);
    }

    mounted() {
      $("#C3_3").focus();
    }

    public duplicate() {
      const vm = this;
      vm.$validate().then((valid: boolean) => {
        if (!valid) {
          return;
        }

        if (vm.isChecked()) {
          vm.$dialog.confirm({ messageId: 'Msg_64' }).then((result: 'no' | 'yes' | 'cancel') => {
            if (result === 'yes') {
              vm.$blockui("grayout");
              vm.performDuplicate()
                .always(() => {
                  vm.$blockui("clear");
                });
            }
          });
        } else {
          vm.$blockui("grayout");
          vm.performFindFlowMenu()
            .then(res => {
              if (res) {
                vm.$dialog.error({ messageId: "Msg_3" })
                  .then(() => {
                    vm.$blockui("clear");
                  });
              } else {
                vm.performDuplicate();
              }
            })
            .always(() => {
              vm.$blockui("clear");
            });
        }
      });
    }

    public closeDialog(data: FlowMenuModel = null) {
      const vm = this;
      vm.$window.close(data);
    }

    private performDuplicate(): JQueryPromise<any> {
      const vm = this;
      let newFlowMenu: FlowMenuModel = null;
      // Try copy all the uploaded files and update the layout file
      return vm.$ajax(API.copyFile, { flowMenuCode: vm.flowMenu.flowMenuCode, newFlowMenuCode: vm.flowMenuCode(), flowMenuName: vm.flowMenuName() })
        .then(result => {
          if (result) {
            vm.deleteUnknownData(result.createFlowMenuDto);
            newFlowMenu = result.createFlowMenuDto;
            return vm.$ajax(API.generateHtml, { flowMenuCode: vm.flowMenuCode(), htmlContent: result.htmlContent })
            // 4. Input内容のファイルIDを別のファイルIDで作成する
            .then(res => nts.uk.deferred.repeat(conf => conf
              .task(() => (nts.uk.request as any).asyncTask.getInfo(res.taskId)
                .done((taskResult: any) => {
                  if (taskResult.succeeded) {
                    newFlowMenu.fileId = res.taskId;
                    return vm.$ajax(API.duplicate, { flowMenuCode: vm.flowMenuCode(), createFlowMenu: newFlowMenu});
                  }
                }))
              .while(infor => infor.pending || infor.running)
              .pause(1000))
            );
          } else {
            return vm.$ajax(API.duplicate, { flowMenuCode: vm.flowMenuCode(), createFlowMenu: {
              flowMenuCode: vm.flowMenuCode(),
              flowMenuName: vm.flowMenuName(),
              cid: __viewContext.user.companyId
            } });
          }
        })
        // Perform save the copied flow menu
        .then(() => vm.$dialog.info({ messageId: "Msg_15" }))
        .then(() => vm.closeDialog(newFlowMenu))
        .fail(err => vm.$dialog.error({ messageId: err.messageId }));
    }

    private performFindFlowMenu(): JQueryPromise<any> {
      const vm = this;
      return vm.$ajax(nts.uk.text.format(API.getFlowMenu, vm.flowMenuCode()));
    }

    /**
     * Delete duplicate data due to Jackson
     * @param flowMenu 
     */
    private deleteUnknownData(flowMenu: any) {
      delete flowMenu.arrowSettings;
      delete flowMenu.fileAttachmentSettings;
      delete flowMenu.imageSettings;
      delete flowMenu.labelSettings;
      delete flowMenu.linkSettings;
      delete flowMenu.menuSettings;
    }
  }

  export class FlowMenuModel {
    flowMenuCode: string;
    flowMenuName: string;
    fileId?: string;
    menuData?: nts.uk.com.view.ccg034.d.MenuSettingDto[];
    labelData?: nts.uk.com.view.ccg034.d.LabelSettingDto[];
    linkData?: nts.uk.com.view.ccg034.d.LinkSettingDto[];
    fileAttachmentData?: nts.uk.com.view.ccg034.d.FileAttachmentSettingDto[];
    imageData?: nts.uk.com.view.ccg034.d.ImageSettingDto[];
    arrowData?: nts.uk.com.view.ccg034.d.ArrowSettingDto[];
  }
}
