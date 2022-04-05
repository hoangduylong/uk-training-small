/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />

module nts.uk.com.view.ccg015.f {

  @bean()
  export class ScreenModel extends ko.ViewModel {
    topPageCd: KnockoutObservable<string> = ko.observable(null);
    paramWidgetLayout2: KnockoutObservableArray<WidgetSettingDto> = ko.observableArray([]);
    paramWidgetLayout3: KnockoutObservableArray<WidgetSettingDto> = ko.observableArray([]);
    paramIframe1: KnockoutObservable<DisplayInTopPageDto> = ko.observable();
    layoutDisplayType: KnockoutObservable<number> = ko.observable(null);
    visible: KnockoutObservable<boolean> = ko.observable(false);
    isNoContent : KnockoutObservable<boolean> = ko.observable(false);
    isNoContentLayout2 : KnockoutObservable<boolean> = ko.observable(false);
    isNoContentLayout3 : KnockoutObservable<boolean> = ko.observable(false);
    created(params: any) {
      const vm = this;
      if (params.topPageModel) {
        vm.topPageCd(params.topPageModel.topPageCode);
      }

      vm.$blockui('grayout');
      vm.$ajax(`/toppage/getDisplayTopPage/${vm.topPageCd()}`)
        .then((result: any) =>{
          vm.layoutDisplayType(result.layoutDisplayType);
          vm.getToppage(result);
        })
        .always(() => vm.$blockui('clear'));
    }

    private getToppage(data: DisplayInTopPageDto) {
      const vm = this;
      if (data.layout1) {
        vm.getLayout1(data);
      }
      vm.visible(true)
      if (data.layout2) {
        vm.getLayout2(data);
      }
      if (data.layout3) {
        vm.getLayout3(data);
      }
      if (!data.layout1 && data.layout2.length < 1 && data.layout3.length < 1) {
        vm.isNoContent(true);
      }
      if(data.layout2.length < 1) {
        vm.isNoContentLayout2(true);
      }
      if(data.layout3.length < 1) {
        vm.isNoContentLayout3(true);
      }
    }

    private getLayout1(data: DisplayInTopPageDto) {
      const vm = this;
      vm.paramIframe1(data);
      vm.visible(true)
    }

    private getLayout2(data: DisplayInTopPageDto) {
      const vm = this;
      vm.paramWidgetLayout2(data.layout2);
    }

    private getLayout3(data: DisplayInTopPageDto) {
      const vm = this;
      vm.paramWidgetLayout3(data.layout3);
    }

    close() {
      const vm = this;
      vm.$window.close();
    }
  }

  export class DataTopPageDto {
    displayTopPage: DisplayInTopPageDto;
    menuClassification: number;
    standardMenu: StandardMenuDto;

    constructor(init?: Partial<DataTopPageDto>) {
      $.extend(this, init);
    }
  }

  export class DisplayInTopPageDto {
    layout1: Array<FlowMenuOutputCCG008>;
    layout2: Array<WidgetSettingDto>;
    layout3: Array<WidgetSettingDto>;
    urlLayout1: string;
    layoutDisplayType: number;

    constructor(init?: Partial<DisplayInTopPageDto>) {
      $.extend(this, init);
    }
  }

  export class WidgetSettingDto {
    widgetType: number;
    order: number;

    constructor(init?: Partial<WidgetSettingDto>) {
      $.extend(this, init);
    }
  }

  export class FlowMenuOutputCCG008 {
    flowCode: string;
    flowName: string;
    fileId: string;

    constructor(init?: Partial<FlowMenuOutputCCG008>) {
      $.extend(this, init);
    }
  }

  export class StandardMenuDto {
    companyId: string;
    code: string;
    targetItems: string;
    displayName: string;
    displayOrder: number;
    menuAtr: number;
    url: string;
    system: number;
    classification: number;
    webMenuSetting: number;
    afterLoginDisplay: number;
    logLoginDisplay: number;
    logStartDisplay: number;
    logUpdateDisplay: number;
    logSettingDisplay: LogSettingDisplayDto;

    constructor(init?: Partial<StandardMenuDto>) {
      $.extend(this, init);
    }
  }
  export class LogSettingDisplayDto {
    logLoginDisplay: number;
    logStartDisplay: number;
    logUpdateDisplay: number;
  }

}