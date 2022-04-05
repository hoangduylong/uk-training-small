/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />

module nts.uk.com.view.ccg034.e {
  import CCG034D = nts.uk.com.view.ccg034.d;

  @bean()
  export class ScreenModel extends ko.ViewModel {
    partData: CCG034D.PartDataLabelModel = null;
    labelContentValue: KnockoutObservable<string> = ko.observable('');
    fontSizeValue: KnockoutObservable<number> = ko.observable(14);
    isBoldValue: KnockoutObservable<boolean> = ko.observable(false);
    textColorValue: KnockoutObservable<string> = ko.observable(null);
    backgroundColorValue: KnockoutObservable<string> = ko.observable(null);

    listHorizontalPosition: ItemModel[] = [];
    listVerticalPosition: ItemModel[] = [];
    selectedHorizontalPosition: KnockoutObservable<number> = ko.observable(HorizontalAlign.LEFT);
    selectedVerticalPosition: KnockoutObservable<number> = ko.observable(VerticalAlign.CENTER);

    created(params: any) {
      const vm = this;
      vm.partData = params;
      // Init data
      vm.listHorizontalPosition = [
        { code: HorizontalAlign.LEFT, name: vm.$i18n('CCG034_56') },
        { code: HorizontalAlign.MIDDLE, name: vm.$i18n('CCG034_57') },
        { code: HorizontalAlign.RIGHT, name: vm.$i18n('CCG034_58') },
      ];
      vm.listVerticalPosition = [
        { code: VerticalAlign.TOP, name: vm.$i18n('CCG034_60') },
        { code: VerticalAlign.CENTER, name: vm.$i18n('CCG034_61') },
        { code: VerticalAlign.BOTTOM, name: vm.$i18n('CCG034_62') },
      ];
    }

    mounted() {
      const vm = this;
      // Binding part data
      vm.selectedHorizontalPosition(vm.partData.alignHorizontal);
      vm.selectedVerticalPosition(vm.partData.alignVertical);
      vm.labelContentValue(vm.partData.labelContent);
      vm.fontSizeValue(vm.partData.fontSize);
      vm.isBoldValue(vm.partData.isBold);
      vm.textColorValue(vm.partData.textColor);
      vm.backgroundColorValue(vm.partData.backgroundColor);
      $("#E1_2").focus();
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
          vm.partData.alignHorizontal = vm.selectedHorizontalPosition();
          vm.partData.alignVertical = vm.selectedVerticalPosition();
          vm.partData.labelContent = vm.labelContentValue();
          vm.partData.fontSize = Number(vm.fontSizeValue());
          vm.partData.isBold = vm.isBoldValue();
          vm.partData.textColor = vm.textColorValue();
          vm.partData.backgroundColor = vm.backgroundColorValue();
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
