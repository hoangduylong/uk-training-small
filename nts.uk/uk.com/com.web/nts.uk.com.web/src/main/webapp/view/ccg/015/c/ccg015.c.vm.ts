/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />

module nts.uk.pr.view.ccg015.c {

  // URL API backend
  const API = {
    copyPath: "toppage/copyTopPage",
    copyLayout: "toppage/copyLayout"
  };

  @bean()
  export class ScreenModel extends ko.ViewModel {
    parentTopPageCode: KnockoutObservable<string> = ko.observable(null);
    parentTopPageName: KnockoutObservable<string> = ko.observable(null);
    parentLayoutId: KnockoutObservable<number> = ko.observable(0);
    newTopPageCode: KnockoutObservable<string> = ko.observable("");
    newTopPageName: KnockoutObservable<string> = ko.observable("");
    isDuplicateCode: KnockoutObservable<boolean> = ko.observable(false);
    check: KnockoutObservable<boolean> = ko.observable(false);

    created(params: any) {
      const vm = this;
      if (params && params.topPageCode) {
        vm.parentTopPageCode = ko.observable(params.topPageCode);
      }
      if (params && params.topPageName) {
        vm.parentTopPageName = ko.observable(params.topPageName);
      }
      if (params && params.layoutDisp) {
        vm.parentLayoutId(params.layoutDisp);
      }
    }

    mounted() {
      $("#inp-code").focus();
    }

    closeDialog() {
      const vm = this;
      vm.$window.close();
    }

    copyTopPage() {
      const vm = this;
      const data: TopPageModel = new TopPageModel({
        topPageCode: vm.newTopPageCode(),
        topPageName: vm.newTopPageName(),
        layoutDisp: vm.parentLayoutId(),
        isCheckOverwrite: vm.check(),
        copyCode: vm.parentTopPageCode(),
      });
      vm.$blockui("grayout");
      vm.$ajax(API.copyPath, data)
        .then(() => {
          vm.$blockui("clear");
          vm.$dialog.info({ messageId: "Msg_20" })
            .then(() => vm.$window.close(vm.newTopPageCode()));
        })
        .fail((res: any) => {
          vm.$blockui("clear");
          vm.$dialog.alert({ messageId: res.messageId, messageParams: res.parameterIds })
            .then(() => $("#inp-code").focus());
        });
    }
  }

  export class TopPageModel {
    topPageCode: string;
    topPageName: string;
    layoutDisp: number;
    isCheckOverwrite: boolean;
    copyCode: string;

    constructor(init?: Partial<TopPageModel>) {
      $.extend(this, init);
    }
  }
}