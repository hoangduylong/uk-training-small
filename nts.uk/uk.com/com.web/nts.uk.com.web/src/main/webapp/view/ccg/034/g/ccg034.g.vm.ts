/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />

module nts.uk.com.view.ccg034.g {
  import CCG034D = nts.uk.com.view.ccg034.d;
  import getText = nts.uk.resource.getText;

  @bean()
  export class ScreenModel extends ko.ViewModel {
    partData: CCG034D.PartDataLinkModel = null;
    // Link name
    linkName: KnockoutObservable<string> = ko.observable('');
    // URL
    url: KnockoutObservable<string> = ko.observable('');
    // Common text attribute
    fontSize: KnockoutObservable<number> = ko.observable(11);
    isBold: KnockoutObservable<boolean> = ko.observable(true);
    horizontalAlign: KnockoutObservable<number> = ko.observable(HorizontalAlign.LEFT);
    verticalAlign: KnockoutObservable<number> = ko.observable(VerticalAlign.TOP);
    horizontalAlignList: ItemModel[] = [
      { code: HorizontalAlign.LEFT, name: getText('CCG034_93') },
      { code: HorizontalAlign.MIDDLE, name: getText('CCG034_94') },
      { code: HorizontalAlign.RIGHT, name: getText('CCG034_95') }
    ];
    verticalAlignList: ItemModel[] = [
      { code: VerticalAlign.TOP, name: getText('CCG034_97') },
      { code: VerticalAlign.CENTER, name: getText('CCG034_98') },
      { code: VerticalAlign.BOTTOM, name: getText('CCG034_99') }
    ];

    created(params: any) {
      const vm = this;
      vm.partData = params;
    }

    mounted() {
      const vm = this;
      // Binding part data
      vm.horizontalAlign(vm.partData.alignHorizontal);
      vm.verticalAlign(vm.partData.alignVertical);
      vm.linkName(vm.partData.linkContent);
      vm.url(vm.partData.url);
      vm.fontSize(vm.partData.fontSize);
      vm.isBold(vm.partData.isBold);
      $("#G1_2").focus();
    }

    /**
     * Close dialog
     */
    public closeDialog() {
      const vm = this;
      vm.$window.close();
    }

    /**
     * Update part data and close dialog
     */
    public updatePartDataAndCloseDialog() {
      const vm = this;
      vm.$validate().then((valid: boolean) => {
        if (valid) {
          // Update part data
          vm.partData.alignHorizontal = vm.horizontalAlign();
          vm.partData.alignVertical = vm.verticalAlign();
          vm.partData.linkContent = vm.linkName().trim();
          vm.partData.fontSize = Number(vm.fontSize());
          vm.partData.isBold = vm.isBold();
          vm.partData.url = vm.url().trim();
          // Return data
          vm.$window.close(vm.partData);
        }
      });
    }

  }

  interface ItemModel {
    code: number;
    name: string;
  }

  enum HorizontalAlign {
    LEFT = 0,
    MIDDLE = 1,
    RIGHT = 2,
  }

  enum VerticalAlign {
    TOP = 0,
    CENTER = 1,
    BOTTOM = 2,
  }
}
