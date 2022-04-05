/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />

module nts.uk.com.view.cmm007.i {

  @bean()
  export class ViewModel extends ko.ViewModel {
    com_work_Name: KnockoutObservable<string> = ko.observable(null);
    com_work_Name1: KnockoutObservable<string> = ko.observable(null);
    com_work_Name2: KnockoutObservable<string> = ko.observable(null);
    com_work_Name3: KnockoutObservable<string> = ko.observable(null);
    com_work_Name4: KnockoutObservable<string> = ko.observable(null);
    com_work_Name5: KnockoutObservable<string> = ko.observable(null);

    /**
    * リソーステキストを取得する
    */
    mounted() {
      const vm = this;
      vm.$blockui("grayout");
      service.findList()
        .then((response: SystemResourceDto[]) => {
          response.forEach(e => {
            switch (e.resourceId) {
              case SystemResourceId.Com_work_Name:
                vm.com_work_Name(e.resourceContent);
                break;
              case SystemResourceId.Com_work_Name1:
                vm.com_work_Name1(e.resourceContent);
                break;
              case SystemResourceId.Com_work_Name2:
                vm.com_work_Name2(e.resourceContent);
                break;
              case SystemResourceId.Com_work_Name3:
                vm.com_work_Name3(e.resourceContent);
                break;
              case SystemResourceId.Com_work_Name4:
                vm.com_work_Name4(e.resourceContent);
                break;
              case SystemResourceId.Com_work_Name5:
                vm.com_work_Name5(e.resourceContent);
                break;
            }
          })
        })
        .always(() => vm.$blockui("clear"));
    }

    /**
    * table [CISMT_I18N_RESOURCE_CUS] に追加する
    */
    public save() {
      const vm = this;
      const listData: SystemResourceDto[] = [
        new SystemResourceDto({
          resourceId: 'Work_Name',
          resourceContent: vm.com_work_Name(),
        }),
        new SystemResourceDto({
          resourceId: 'Work_Name1',
          resourceContent: vm.com_work_Name1(),
        }),
        new SystemResourceDto({
          resourceId: 'Work_Name2',
          resourceContent: vm.com_work_Name2(),
        }),
        new SystemResourceDto({
          resourceId: 'Work_Name3',
          resourceContent: vm.com_work_Name3(),
        }),
        new SystemResourceDto({
          resourceId: 'Work_Name4',
          resourceContent: vm.com_work_Name4(),
        }),
        new SystemResourceDto({
          resourceId: 'Work_Name5',
          resourceContent: vm.com_work_Name5(),
        })
      ];
      const command: SystemResourceSaveCommand = new SystemResourceSaveCommand(listData);
      vm.$blockui("grayout");
      // Clear error
      vm.$errors("clear")
        // Validate
        .then(() => vm.$validate())
        .then((valid: boolean) => {
          if (!valid) {
            return $.Deferred().reject();
          }
          // Save
          return service.save(command);
        })
        .then((response) => {
          vm.$blockui("clear");
          vm.$dialog.info({ messageId: "Msg_15" });
        })
        .always(() => vm.$blockui("clear"));
    }
  }

  export class SystemResourceDto {
    resourceId: string;
    resourceContent: string;

    constructor(init?: Partial<SystemResourceDto>) {
      $.extend(this, init);
    }
  }

  export class SystemResourceSaveCommand {
    listData: SystemResourceDto[];

    constructor(data: SystemResourceDto[]) {
      this.listData = data;
    }
  }

  module SystemResourceId {
    export const Com_work_Name = "Work_Name";
    export const Com_work_Name1 = "Work_Name1";
    export const Com_work_Name2 = "Work_Name2";
    export const Com_work_Name3 = "Work_Name3";
    export const Com_work_Name4 = "Work_Name4";
    export const Com_work_Name5 = "Work_Name5";
  }
}