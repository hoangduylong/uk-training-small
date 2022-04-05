/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />

module nts.uk.com.view.ccg015.b {

  // URL API backend
  const API = {
    findAllTopPageItem: "/toppage/findAll",
    getTopPageItemDetail: "/toppage/topPageDetail",
    registerTopPage: "/toppage/create",
    updateTopPage: "/toppage/update",
    removeTopPage: "/toppage/remove"
  };
  @bean()
  export class ScreenModel extends ko.ViewModel {
    listTopPage: KnockoutObservableArray<Node> = ko.observableArray<Node>([]);
    toppageSelectedCode: KnockoutObservable<string> = ko.observable(null);
    topPageModel: KnockoutObservable<TopPageViewModel> = ko.observable(new TopPageViewModel());
    topPageModelParam: KnockoutObservable<TopPageModelParams> = ko.observable(new TopPageModelParams());
    columns: KnockoutObservable<any> = ko.observableArray([]);
    isNewMode: KnockoutObservable<boolean> = ko.observable(true);
    isDisableButton: KnockoutObservable<boolean> = ko.observable(true);
    selectedId: KnockoutObservable<number> = ko.observable(null);
    isVisiableButton1: KnockoutObservable<boolean> = ko.observable(true);
    isVisiableButton2: KnockoutObservable<boolean> = ko.observable(false);
    isVisiableButton3: KnockoutObservable<boolean> = ko.observable(false);
    text1: KnockoutObservable<String> = ko.observable('');
    text2: KnockoutObservable<String> = ko.observable('');
    text3: KnockoutObservable<String> = ko.observable('');
    button1Text: KnockoutObservable<string> = ko.observable('');
    button2Text: KnockoutObservable<string> = ko.observable('');
    isDisableNewBtn: KnockoutObservable<boolean> = ko.observable(false);

    breakNewMode = false;
    itemList: KnockoutObservableArray<ItemModel> = ko.observableArray([
      new ItemModel(0, ''),
      new ItemModel(1, ''),
      new ItemModel(2, ''),
      new ItemModel(3, '')
    ]);

    created() {
      // トップページを選択する
      const vm = this;
      vm.columns = ko.observableArray([
        { headerText: vm.$i18n("CCG015_11"), width: "50px", key: 'code', dataType: "string", hidden: false },
        { headerText: vm.$i18n("CCG015_12"), width: "260px", key: 'nodeText', dataType: "string", formatter: _.escape }
      ]);
      const text470px = vm.$i18n("CCG015_62").toString();
      vm.selectedId.subscribe((value: number) => {
        const isLayout2or3: boolean = (value === LayoutType.LAYOUT_TYPE_2 || value === LayoutType.LAYOUT_TYPE_3);
        vm.button1Text(isLayout2or3 ? vm.$i18n("CCG015_60") : vm.$i18n("CCG015_59"));
        vm.button2Text(isLayout2or3 ? vm.$i18n("CCG015_59") : vm.$i18n("CCG015_60"));
        // Render layout
        if (value === LayoutType.LAYOUT_TYPE_0) {
          vm.isVisiableButton1(true);
          vm.isVisiableButton2(false);
          vm.isVisiableButton3(false);
          vm.text1('');
          vm.text2('');
          vm.text3('');
        } else if (value === LayoutType.LAYOUT_TYPE_1 || value === LayoutType.LAYOUT_TYPE_2) {
          vm.isVisiableButton1(true);
          vm.isVisiableButton2(true);
          vm.isVisiableButton3(false);
        } else {
          vm.isVisiableButton1(true);
          vm.isVisiableButton2(true);
          vm.isVisiableButton3(true);
          vm.text1(text470px);
          vm.text2('');
          vm.text3(text470px);
        }
        if (value === LayoutType.LAYOUT_TYPE_1) {
          vm.text1('');
          vm.text2(text470px);
          vm.text3('');
        }
        if (value === LayoutType.LAYOUT_TYPE_2) {
          vm.text1(text470px);
          vm.text2('');
          vm.text3('');
        }
      });
      vm.loadTopPageList();
    }

    mounted() {
      const vm = this;
      vm.selectedId(0);
      vm.toppageSelectedCode.subscribe((selectedTopPageCode: string) => {
        if (selectedTopPageCode) {
          vm.isNewMode(false);
          vm.breakNewMode = false;
          vm.$blockui("grayout");
          vm.$ajax(`${API.getTopPageItemDetail}/${selectedTopPageCode}`)
            .then((data: TopPageDto) => {
              vm.loadTopPageItemDetail(data);
              $('.save-error').ntsError('clear');
            })
            .always(() => vm.$blockui("clear"));
          if (selectedTopPageCode !== "") {
            $("#inp_name").focus();
          }
        } else {
          // 新規のトップページを作成する
          vm.isNewMode(true);
          vm.breakNewMode = true;
          vm.topPageModel(new TopPageViewModel());
          if (nts.uk.ui.errors.hasError()) {
            nts.uk.ui.errors.clearAll();
          }
        }
      });
      
      vm.isNewMode.subscribe((x:any) => {
        if(x) {
          vm.isDisableButton(true);
        } else {
          vm.isDisableButton(false);
        }
      });
     

    }

    private loadTopPageList(selectedCode?: string): JQueryPromise<void> {
      const vm = this;
      const dfd = $.Deferred<void>();
      vm.$blockui("grayout");
      vm.$ajax(API.findAllTopPageItem)
        .then((data: Array<TopPageItemDto>) => {
          // if data # empty
          if (data.length > 0) {
            const listTopPage: Node[] = _.map(data, (item) => new Node(item.topPageCode, item.topPageName, null));
            const lstSort =  _.orderBy(listTopPage, ["code"], ["asc"]);
            vm.listTopPage(lstSort);
            const selectToppage = _.find(vm.listTopPage(), item => { return item.code === selectedCode; })
            vm.isDisableNewBtn(false);
            vm.toppageSelectedCode(selectedCode || lstSort[0].code);
            vm.topPageModel().topPageName(selectToppage.name)
            $("#inp_name").focus();
          } else {
            vm.listTopPage([]);
            vm.topPageModel(new TopPageViewModel());
            vm.isDisableNewBtn(true);
            vm.isNewMode(true);
            $("#inp_code").focus();
          }
          dfd.resolve();
        })
        .fail((err) => dfd.fail(err))
        .always(() => vm.$blockui("clear"));
      return dfd.promise();
    }

    //load top page Item
    private loadTopPageItemDetail(data: TopPageDto) {
      const vm = this;
      vm.topPageModel().topPageCode(data.topPageCode);
      vm.topPageModel().topPageName(data.topPageName);
      vm.topPageModel().layoutDisp(data.layoutDisp);
      vm.selectedId(data.layoutDisp);
    }

    private collectData(): TopPageModelParams {
      const vm = this;
      return new TopPageModelParams({
        topPageCode: vm.topPageModel().topPageCode(),
        topPageName: vm.topPageModel().topPageName(),
        layoutDisp: vm.selectedId(),
      });
    }

    newTopPage() {
      const vm = this;
      vm.topPageModel(new TopPageViewModel());
      vm.isNewMode(true);
      vm.selectedId(0);
      this.$nextTick(()=>  $("#inp_code").focus());
      vm.breakNewMode = true;
      vm.toppageSelectedCode("");
      if (nts.uk.ui.errors.hasError()) {
        nts.uk.ui.errors.clearAll();
      }
    }

    saveTopPage() {
      const vm = this;
      vm.$validate()
        .then((valid: boolean) => {
          if (valid) {
            //check update or create
            if (vm.listTopPage().length === 0) {
              vm.isNewMode(true);
            }
            const param = vm.collectData();
            if (vm.isNewMode()) {
              vm.$blockui('grayout');
              vm.$ajax(API.registerTopPage, param)
                .then(() => {
                  vm.$blockui("clear");
                  vm.$dialog.info({ messageId: "Msg_15" });
                  $("#inp_name").focus();
                  vm.loadTopPageList(param.topPageCode);
                })
                .fail((err) => {
                  vm.$blockui("clear");
                  vm.$dialog.alert({ messageId: err.messageId, messageParams: err.parameterIds });
                });
            } else {
              vm.$blockui('grayout');
              vm.$ajax(API.updateTopPage, param)
                .then(() => {
                  vm.$blockui("clear");
                  vm.$dialog.info({ messageId: "Msg_15" });
                  vm.loadTopPageList(param.topPageCode);
                  $("#inp_name").focus();
                })
                .fail((err) => {
                  vm.$blockui("clear");
                  vm.$dialog.alert({ messageId: err.messageId, messageParams: err.parameterIds });
                });
            }
          }
        });
    }

    copyTopPage() {
      const vm = this;
      const dataCopy = {
        topPageCode: vm.topPageModel().topPageCode(),
        topPageName: vm.topPageModel().topPageName(),
        layoutDisp: vm.topPageModel().layoutDisp()
      };
      vm.$window.modal("/view/ccg/015/c/index.xhtml", dataCopy)
        .then((codeOfNewTopPage: string) => {
          if (codeOfNewTopPage) {
            vm.loadTopPageList(codeOfNewTopPage);
          }
        });
    }

    removeTopPage() {
      const vm = this;
      vm.$dialog.confirm({ messageId: 'Msg_18' })
        .then((result: 'no' | 'yes' | 'cancel') => {
          if (result === 'yes') {
            const removeCode = vm.toppageSelectedCode();
            const removeIndex = vm.getIndexOfRemoveItem(removeCode);
            vm.$blockui("grayout");
            vm.$ajax(API.removeTopPage, { topPageCode: vm.toppageSelectedCode() })
              .then(() => {
                // delete success
                vm.$blockui("clear");
                vm.$dialog.info({ messageId: "Msg_16" })
                  .then(() => {
                    //remove follow
                      const lst = vm.listTopPage();
                      if (lst.length > 0) {
                        if (removeIndex === 0) {
                          vm.toppageSelectedCode(lst[removeIndex + 1].code);
                        } else {
                          vm.toppageSelectedCode(lst[removeIndex - 1].code);
                        }
                        vm.loadTopPageList(vm.toppageSelectedCode());
                      }
                  });
              })
              .always(() => vm.$blockui("clear"));
          }
        });
    }

    private getIndexOfRemoveItem(code: string): number {
      const vm = this;
      let itemIndex:any;
      _.forEach(vm.listTopPage(), (item) => {
        if (item.code === code) {
          itemIndex =  item
        }
      });
      return vm.listTopPage().indexOf(itemIndex);
    }

    // レイアウト設定を起動する
    openDialogButton1() {
      const vm = this;
      const frame: number = (vm.selectedId() === LayoutType.LAYOUT_TYPE_0 || vm.selectedId() === LayoutType.LAYOUT_TYPE_1) ? 1 : 2;
      const topPageModel: TopPageModelParams = vm.topPageModelParam();
      topPageModel.topPageCode = vm.topPageModel().topPageCode();
      topPageModel.topPageName = vm.topPageModel().topPageName();
      topPageModel.layoutDisp = vm.topPageModel().layoutDisp();
      vm.topPageModelParam(topPageModel);
      const dataScreen = {
        topPageModel: vm.topPageModelParam(),
        frame: frame
      };
      if (vm.selectedId() === LayoutType.LAYOUT_TYPE_0 || vm.selectedId() === LayoutType.LAYOUT_TYPE_1) {
        vm.$window.modal('/view/ccg/015/d/index.xhtml', dataScreen);
      } else {
        vm.$window.modal('/view/ccg/015/e/index.xhtml', dataScreen);
      }
    }

    // レイアウト設定を起動する
    openDialogButton2() {
      const vm = this;
      const frame: number = (vm.selectedId() === LayoutType.LAYOUT_TYPE_2 || vm.selectedId() === LayoutType.LAYOUT_TYPE_3) ? 1 : 2;
      const topPageModel: TopPageModelParams = vm.topPageModelParam();
      topPageModel.topPageCode = vm.topPageModel().topPageCode();
      topPageModel.topPageName = vm.topPageModel().topPageName();
      vm.topPageModelParam(topPageModel);
      const dataScreen = {
        topPageModel: vm.topPageModelParam(),
        frame: frame
      };
      if (vm.selectedId() === LayoutType.LAYOUT_TYPE_2 || vm.selectedId() === LayoutType.LAYOUT_TYPE_3) {
        vm.$window.modal('/view/ccg/015/d/index.xhtml', dataScreen);
      } else {
        vm.$window.modal('/view/ccg/015/e/index.xhtml', dataScreen);
      }
    }

    // レイアウト設定を起動する
    openDialogButton3() {
      const vm = this;
      const topPageModel: TopPageModelParams = vm.topPageModelParam();
      topPageModel.topPageCode = vm.topPageModel().topPageCode();
      topPageModel.topPageName = vm.topPageModel().topPageName();
      vm.topPageModelParam(topPageModel);
      const dataScreen = {
        topPageModel: vm.topPageModelParam(),
        frame: 3
      };
      vm.$window.modal('/view/ccg/015/e/index.xhtml', dataScreen);
    }

    // プレビューを表示する
    openDialogCCG015F() {
      const vm = this;
      const topPageModel: TopPageModelParams = vm.topPageModelParam();
      topPageModel.topPageCode = vm.toppageSelectedCode();
      topPageModel.topPageName = vm.topPageModel().topPageName();
      vm.topPageModelParam(topPageModel);
      const data = {
        topPageModel: vm.topPageModelParam(),
        selectedId: vm.selectedId(),
      };
      const size = {
        width: Math.round(Number(window.innerWidth) * 80 / 100),
        height: Math.round(Number(window.innerHeight) * 80 / 100),
        resizable: false, 
      }
      vm.$window.modal('/view/ccg/015/f/index.xhtml', data, size);
    }
  }

  export class Node {
    code: string;
    name: string;
    nodeText: string;
    custom: string;
    childs: Array<Node>;

    constructor(code: string, name: string, childs: Array<Node>) {
      const vm = this;
      vm.code = code;
      vm.name = name;
      vm.nodeText = name;
      vm.childs = childs;
      vm.custom = 'Random' + new Date().getTime();
    }
  }

  export class TopPageViewModel {
    topPageCode: KnockoutObservable<string>;
    topPageName: KnockoutObservable<string>;
    layoutDisp: KnockoutObservable<number>;

    constructor() {
      this.topPageCode = ko.observable('');
      this.topPageName = ko.observable('');
      this.layoutDisp = ko.observable(0);
    }
  }

  export interface TopPageItemDto {
    topPageCode: string;
    topPageName: string;
  }

  export interface TopPageDto {
    cid: string;
    topPageCode: string;
    topPageName: string;
    layoutDisp: number;
  }

  export class TopPageModelParams {
    topPageCode?: string;
    topPageName?: string;
    layoutDisp?: number;

    constructor(init?: Partial<TopPageModelParams>) {
      $.extend(this, init);
    }
  }

  class ItemModel {
    code: number;
    name: string;
    constructor(code: number, name: string) {
      this.code = code;
      this.name = name;
    }
  }

  enum LayoutType {
    LAYOUT_TYPE_0 = 0,
    LAYOUT_TYPE_1 = 1,
    LAYOUT_TYPE_2 = 2,
    LAYOUT_TYPE_3 = 3,
  }
}