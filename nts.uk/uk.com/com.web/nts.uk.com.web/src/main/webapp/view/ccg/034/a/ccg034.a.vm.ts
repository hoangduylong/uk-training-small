/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />

module nts.uk.com.view.ccg034.a {

  // URL API backend
  const API = {
    getFlowMenuList: "sys/portal/createflowmenu/getFlowMenu",
    getFlowMenu: "sys/portal/createflowmenu/getFlowMenu/{0}",
    register: "sys/portal/createflowmenu/register",
    update: "sys/portal/createflowmenu/update",
    delete: "sys/portal/createflowmenu/delete",
    copy: "sys/portal/createflowmenu/copy",
  };

  @bean()
  export class ScreenModel extends ko.ViewModel {
    constraints: KnockoutObservableArray<string> = ko.observableArray(['TopPagePartCode', 'TopPagePartName']);
    toppagePartCode: KnockoutObservable<string> = ko.observable(null);
    toppagePartName: KnockoutObservable<string> = ko.observable(null);
    flowMenuList: KnockoutObservableArray<FlowMenuModel> = ko.observableArray([]);
    flowMenuColumns: { headerText: string, key: string, width: string }[] = [];
    selectedFlowMenuId: KnockoutObservable<string> = ko.observable('');
    selectedFlowMenu: KnockoutObservable<FlowMenuModel> = ko.observable(null);
    isNewMode: KnockoutObservable<boolean> = ko.observable(true).extend({
      notify: 'always'
    });
    enablePreview: KnockoutObservable<boolean> = ko.computed(() => {
      const vm = this;
      return !vm.isNewMode() && vm.selectedFlowMenu() && vm.selectedFlowMenu().fileId != null;
    });

    created() {
      const vm = this;
      vm.flowMenuColumns = [
        { headerText: vm.$i18n('CCG034_21'), key: 'flowMenuCode', width: '50px' },
        { headerText: vm.$i18n('CCG034_22'), key: 'flowMenuName', width: '250px' }
      ];
    }

    mounted() {
      const vm = this;
      vm.$blockui("grayout");
      vm.selectedFlowMenuId.subscribe(value => {
        if (value) {
          vm.selectFlowMenu();
        }
      });
      vm.isNewMode.subscribe(value => {
        if (value) {
          $("input").filter("#A4_2").focus();
        } else {
          $("input").filter("#A4_3").focus();
        }
      });
      vm.isNewMode.valueHasMutated();

      vm.getFlowMenuList()
        .then(() => {
          if (vm.flowMenuList().length > 0) {
            vm.selectedFlowMenuId(vm.flowMenuList()[0].flowMenuCode);
          }
        })
        .always(() => vm.$blockui("clear"));
    }

    public changeToNewMode() {
      const vm = this;
      vm.isNewMode(true);
      vm.selectedFlowMenuId('');
      vm.selectedFlowMenu(null);
      vm.toppagePartCode('');
      vm.toppagePartName('');
    }

    private selectFlowMenu() {
      const vm = this;
      vm.isNewMode(false);
      vm.$blockui("grayout");
      const path = nts.uk.text.format(API.getFlowMenu, vm.selectedFlowMenuId());
      vm.$ajax(path)
        .then((res: FlowMenuModel) => {
          vm.toppagePartCode(res.flowMenuCode);
          vm.toppagePartName(res.flowMenuName);
          vm.selectedFlowMenu(res);
          vm.$validate();
        })
        .always(() => vm.$blockui("clear"));
    }

    private getFlowMenuList(): JQueryPromise<any> {
      const vm = this;
      return vm.$ajax(API.getFlowMenuList)
        .then((res: Map<string, string>) => {
          const arr: FlowMenuModel[] = [];
          _.forEach(res, (value, key) => arr.push({ flowMenuCode: key, flowMenuName: value }));
          vm.flowMenuList(_.orderBy(arr, 'flowMenuCode', 'asc'));
        });
    }

    // Open Preview dialog
    public openDialogB() {
      const vm = this;
      const params = {
        fileId: vm.selectedFlowMenu().fileId,
      };
      if (params.fileId) {
        vm.$window.modal('/view/ccg/034/b/index.xhtml', params, {
          width: Math.round(Number(window.innerWidth) * 80 / 100),
          height: Math.round(Number(window.innerHeight) * 80 / 100),
          resizable: true,
        });
      } else {
        vm.$dialog.error({ messageId: "Msg_1908" });
      }
    }

    // Open duplicate dialog
    public openDialogC() {
      const vm = this;
      vm.$window.modal("/view/ccg/034/c/index.xhtml", vm.selectedFlowMenu())
        .then((res: FlowMenuModel) => {
          if (res) {
            vm.getFlowMenuList().then(() => {
              vm.selectedFlowMenuId(res.flowMenuCode);
              vm.selectedFlowMenuId.valueHasMutated();
            });
          } else {
            vm.isNewMode.valueHasMutated();
          }
        });
    }

    // Open Create flow menu dialog
    public openDialogD() {
      const vm = this;
      const params = {
        flowMenuCode: vm.selectedFlowMenuId(),
        flowMenuData: vm.selectedFlowMenu(),
      };
      vm.$window.modal('/view/ccg/034/d/index.xhtml', params, {
        minWidth: 800,
        minHeight: 500,
        width: Math.round(Number(window.innerWidth) * 80 / 100),
        height: Math.round(Number(window.innerHeight) * 80 / 100),
        resizable: true,
      })
      .then(() => vm.getFlowMenuList())
      .then(() => vm.selectFlowMenu());
    }

    public register() {
      const vm = this;
      vm.$validate()
        .then((valid: boolean) => {
          if (valid) {
            vm.isNewMode() ? vm.performRegister() : vm.performUpdate();
          }
        });
    }

    private performRegister(): void {
      const vm = this;
      vm.$blockui("grayout");
      vm.$ajax(API.register, { flowMenuCode: vm.toppagePartCode(), flowMenuName: vm.toppagePartName() })
        // Show message + reload list
        .then(() => vm.saveSuccessHandler())
        // Select created item
        .then(() => vm.selectedFlowMenuId(vm.toppagePartCode()))
        .fail((err) => vm.$dialog.error({ messageId: err.messageId }))
        .always(() => vm.$blockui("clear"));
    }

    private performUpdate(): void {
      const vm = this;
      vm.$blockui("grayout");
      vm.$ajax(API.update, { flowMenuCode: vm.toppagePartCode(), flowMenuName: vm.toppagePartName() })
        // Show message + reload list
        .then(() => vm.saveSuccessHandler())
        .fail((err) => vm.$dialog.error({ messageId: err.messageId }))
        .always(() => vm.$blockui("clear"));
    }

    private saveSuccessHandler(): JQueryPromise<any> {
      const vm = this;
      vm.$blockui("clear");
      return vm.$dialog.info({ messageId: 'Msg_15' })
        .then(() => vm.getFlowMenuList());
    }

    public deleteFlowMenu() {
      const vm = this;
      if (!vm.selectedFlowMenuId()) {
        return;
      }
      const oldIndex = _.findIndex(vm.flowMenuList(), { flowMenuCode: vm.selectedFlowMenuId() });
      vm.$dialog.confirm({ messageId: "Msg_18" })
        .then((result: 'no' | 'yes' | 'cancel') => {
          if (result === 'yes') {
            // CALL API
            vm.$blockui("grayout");
            vm.$ajax(API.delete, { flowMenuCode: vm.selectedFlowMenuId() })
              // Show message + reload list
              .then(() => {
                vm.$blockui("clear");
                return vm.$dialog.info({ messageId: "Msg_16" });
              })
              .then(() => vm.getFlowMenuList())
              .then(() => {
                if (vm.flowMenuList().length > 0) {
                  vm.selectAfterDelete(oldIndex);
                } else {
                  vm.changeToNewMode();
                }
              })
              .fail((err) => vm.$dialog.error({ messageId: err.messageId }))
              .always(() => vm.$blockui("clear"));
          } else {
            vm.isNewMode.valueHasMutated();
          }
        });
    }

    private selectAfterDelete(deletedIndex: number) {
      const vm = this;
      if (deletedIndex === vm.flowMenuList().length) {
        deletedIndex--;
      }
      vm.selectedFlowMenuId(vm.flowMenuList()[deletedIndex].flowMenuCode);
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
