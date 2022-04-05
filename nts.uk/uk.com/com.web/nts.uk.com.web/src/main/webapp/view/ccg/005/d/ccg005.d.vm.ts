/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />
module nts.uk.at.view.ccg005.d.screenModel {

  import setShared = nts.uk.ui.windows.setShared;
  import getShared = nts.uk.ui.windows.getShared;
  import modal = nts.uk.ui.windows.sub.modal;
  import Output = nts.uk.com.view.cdl008.a.viewmodel.OutPut;
  const API = {
    getFavoriteInformation: "screen/com/ccg005/get-favorite-information",
    save: "ctx/office/favorite/save",
    delete: "ctx/office/favorite/delete"
  };
  @bean()
  export class ViewModel extends ko.ViewModel {

    //favorite
    favoriteList: KnockoutObservableArray<FavoriteSpecifyData> = ko.observableArray([]);
    favoriteName: KnockoutObservable<string> = ko.observable("");
    selectedFavoriteInputDate: KnockoutObservable<string> = ko.observable();
    selectedFavorite: KnockoutObservable<FavoriteSpecifyData> = ko.observable();

    //work place
    workPlaceIdList: KnockoutObservableArray<string> = ko.observableArray([]);
    choosenWkspNames: KnockoutObservableArray<string> = ko.observableArray([]);
    displayChoosenWkspName: KnockoutObservable<string> = ko.computed(() => {
      return this.choosenWkspNames().join('、');
    });

    //target select
    roundingRules: KnockoutObservableArray<any> = ko.observableArray([
      { code: TargetSelection.WORKPLACE, name: this.$i18n("CCG005_14") },
      { code: TargetSelection.AFFILIATION_WORKPLACE, name: this.$i18n("CCG005_16") }
    ]);
    selectedRuleCode: KnockoutObservable<number> = ko.observable(TargetSelection.WORKPLACE);
    buttonSelectWkspDisable: KnockoutObservable<boolean> = ko.computed(() => this.selectedRuleCode() === 0);

    //grid column
    columns: KnockoutObservableArray<any> = ko.observableArray([
      { headerText: "id", key: "inputDate", width: 150, hidden: true },
      { headerText: this.$i18n("CCG005_11"), key: "favoriteName", width: 150 },
    ]);

    //mode
    mode: KnockoutObservable<number> = ko.observable(Mode.INSERT);
    enableDeleteBtn: KnockoutObservable<boolean> = ko.computed(() => this.mode() === Mode.UPDATE);

    mounted() {
      const vm = this;
      vm.$blockui("grayout");
      vm.$ajax(API.getFavoriteInformation).then((data: FavoriteSpecifyData[]) => {
        vm.favoriteList(data);
        if (!(_.isEmpty(data))) {
          const first = data[0].inputDate;
          vm.selectedFavoriteInputDate(first);
          vm.bindingData(first);
          vm.mode(Mode.UPDATE);
        }
        vm.$blockui("clear");
      })
      .always(() => vm.$blockui("clear"));

      vm.selectedFavoriteInputDate.subscribe((inputDate: string) => {
        vm.mode(Mode.UPDATE);
        vm.bindingData(inputDate);
      });

      vm.selectedRuleCode.subscribe((selectRule: number) => {
        if(selectRule === TargetSelection.AFFILIATION_WORKPLACE) {
          vm.$errors("clear");
        }
      });
      $("#D5_1").focus();
    }

    private bindingData(inputDate: string) {
      const vm = this;
      vm.$errors("clear");
      const currentFavor = _.find(vm.favoriteList(), (item => item.inputDate === inputDate));
      vm.favoriteName('');
      if (currentFavor) {
        vm.selectedFavorite(currentFavor);
        vm.favoriteName(currentFavor.favoriteName);
        vm.selectedRuleCode(currentFavor.targetSelection);
        vm.choosenWkspNames(currentFavor.wkspNames);
        vm.workPlaceIdList(currentFavor.workplaceId);
      }
    }

    private callData() {
      const vm = this;
      vm.$blockui("grayout");
      vm.$ajax(API.getFavoriteInformation).then((data: FavoriteSpecifyData[]) => {
        if (data) {
          vm.favoriteList(data);
          if(vm.mode() === Mode.INSERT) {
            const inputDate = data[data.length - 1].inputDate
            vm.selectedFavoriteInputDate(inputDate);
            vm.bindingData(inputDate);
            vm.mode(Mode.UPDATE);
            return;
          }
          vm.bindingData(vm.selectedFavoriteInputDate());
        }
      })
      .always(() => vm.$blockui("clear"));
    }

    public onClickCancel() {
      const vm = this;
      this.$window.close(_.isEmpty(vm.favoriteList()) ? undefined : vm.favoriteList());
    }

    public createNewFavorite() {
      const vm = this;
      vm.selectedFavoriteInputDate('');
      vm.favoriteName("");
      vm.choosenWkspNames([]);
      vm.workPlaceIdList([]);
      vm.selectedRuleCode(TargetSelection.WORKPLACE);
      $("#D5_1").focus();
      vm.mode(Mode.INSERT);
    }

    public saveFavorite() {
      const vm = this;
      //set error for workplace display name if null
      if (vm.buttonSelectWkspDisable() && vm.workPlaceIdList().length === 0) {
        $('#D5_4').ntsError('set', { messageId: "Msg_2076" });
      } else {
        $('#D5_4').ntsError('clear');
      }
      
      vm.$validate().then((valid: boolean) => {
        if (valid) {
          //new item
          if (vm.mode() === Mode.INSERT) {
            const favoriteSpecify = new FavoriteSpecifyData({
              favoriteName: vm.favoriteName(),
              creatorId: __viewContext.user.employeeId,
              inputDate: moment().format(),
              targetSelection: vm.selectedRuleCode(),
              workplaceId: vm.selectedRuleCode() === TargetSelection.WORKPLACE ? vm.workPlaceIdList() : [],
              order: vm.getNewOrder(),
              wkspNames: vm.choosenWkspNames()
            });
            vm.favoriteList.push(favoriteSpecify);
          } else {
            _.map(vm.favoriteList(), (item, index) => {
              if (item.inputDate === vm.selectedFavoriteInputDate()) {
                item.favoriteName = vm.favoriteName();
                item.targetSelection = vm.selectedRuleCode();
                item.workplaceId = vm.selectedRuleCode() === TargetSelection.WORKPLACE ? vm.workPlaceIdList() : [];
              }
              item.order = index;
            });
          }
          //Call API
          vm.$blockui("grayout");
          vm.$ajax(API.save, vm.favoriteList()).then(() => {
            vm.callData();
            vm.$blockui("clear");
            return vm.$dialog.info({ messageId: "Msg_15" });
          })
          .always(() => vm.$blockui("clear"));
        }
      });
    }

    private getNewOrder() {
      const vm = this;
      if (vm.favoriteList().length === 0) {
        return 0;
      }
      return (vm.favoriteList()[vm.favoriteList().length - 1].order + 1);
    }

    public deleteFavorite() {
      const vm = this;
      vm.$dialog.confirm({ messageId: "Msg_18" }).then((result) => {
        if (result === "yes") {
          const currentFavor = _.find(vm.favoriteList(), (item => item.inputDate === vm.selectedFavoriteInputDate()));
          const index = _.findIndex(vm.favoriteList(), (item => item.inputDate === vm.selectedFavoriteInputDate()));
          if (currentFavor) {
            const favoriteSpecify = new FavoriteSpecifyDelCommand({
              creatorId: currentFavor.creatorId,
              inputDate: currentFavor.inputDate
            });
            vm.$blockui("grayout");
            vm.$ajax(API.delete, favoriteSpecify).then(() => {
              vm.callData();
              vm.$blockui("clear");
              vm.$dialog.info({ messageId: "Msg_16" }).then(() => {
                if(vm.favoriteList().length === 0) {
                  vm.createNewFavorite();
                }
                if (index >= vm.favoriteList().length) {
                  vm.selectedFavoriteInputDate(vm.favoriteList()[index - 1].inputDate);
                } else {
                  vm.selectedFavoriteInputDate(vm.favoriteList()[index].inputDate);
                }
              });
            })
            .always(() => vm.$blockui("clear"));
          }
        }
      });
    }

    openCDL008Dialog(): void {
      const vm = this;
      const inputCDL008: any = {
        startMode: 0, // 起動モード : 職場 (WORKPLACE = 0)
        isMultiple: true, //選択モード : 複数選択
        showNoSelection: false, //未選択表示 : 非表示
        selectedCodes: vm.workPlaceIdList(), //選択済項目 : 先頭
        isShowBaseDate: true, //基準日表示区分 : 表示
        baseDate: moment.utc().toISOString(), // 基準日 : システム日
        selectedSystemType: 2, //システム区分 : 就業
        isrestrictionOfReferenceRange: false // 参照範囲の絞込 : しない
      };
      setShared('inputCDL008', inputCDL008);
      modal('/view/cdl/008/a/index.xhtml').onClosed(() => {
        const isCancel = getShared('CDL008Cancel');
        if (isCancel) {
          return;
        }
        const selectedInfo: Output[] = getShared('workplaceInfor');
        const listWorkPlaceId: string[] = [];
        const listWorkPlaceName: string[] = [];
        _.map(selectedInfo, ((item: Output) => {
          listWorkPlaceId.push(item.id);
          listWorkPlaceName.push(item.displayName);

        }))
        vm.workPlaceIdList(listWorkPlaceId);
        vm.choosenWkspNames(listWorkPlaceName);
        if(listWorkPlaceId.length > 0) {
          $('#D5_4').ntsError('clear');
        }
      });
    }

  }

  enum TargetSelection {
    // 職場
    WORKPLACE = 0,

    // 所属職場
    AFFILIATION_WORKPLACE = 1
  }

  enum Mode {
    INSERT = 0,
    UPDATE = 1
  }
  class FavoriteSpecifyData {

    // お気に入り名
    favoriteName: string;

    // 作成者ID
    creatorId: string;

    // 入力日
    inputDate: string;

    // 対象選択
    targetSelection: number;

    // 職場ID
    workplaceId: string[];

    // 順序
    order: number;

    wkspNames: string[];

    constructor(init?: Partial<FavoriteSpecifyData>) {
      $.extend(this, init);
    }
  }

  class FavoriteSpecifyDelCommand {
    // 作成者ID
    creatorId: string;

    // 入力日
    inputDate: string;

    constructor(init?: Partial<FavoriteSpecifyDelCommand>) {
      $.extend(this, init);
    }
  }
}
