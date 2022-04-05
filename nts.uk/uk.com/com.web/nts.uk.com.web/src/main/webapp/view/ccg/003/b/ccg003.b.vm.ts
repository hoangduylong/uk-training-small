/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />
module nts.uk.com.view.ccg003.b {

  const API = {
    // <<ScreenQuery>> 社員が作成したお知らせの内容を取得する
    getContentOfNotification: 'sys/portal/notice/getContentOfNotification'
  };

  @bean()
  export class ViewModel extends ko.ViewModel {
    dateValue: KnockoutObservable<DatePeriod> = ko.observable(new DatePeriod({
      startDate: moment.utc().format('YYYY/MM/DD'),
      endDate: moment.utc().format('YYYY/MM/DD')
    }));

    itemList: KnockoutObservableArray<ItemModel> = ko.observableArray([]);
    msgNotice: MessageNotice[] = [];
    role: Role = new Role();

    created(role: Role) {
      const vm = this;
      vm.role = role;
      vm.searchMessage(null);
    }

    mounted() {
      $('#B20_1').focus();
    }

    searchMessage(param: DatePeriod): void {
      const vm = this;
      vm.$blockui('show');
      vm.$ajax('com', API.getContentOfNotification, param).then((response: MessageNotice[]) => {
        if (response) {
          vm.msgNotice = response;
          const itemList = _.map(response, msg => new ItemModel({
            creatorID: msg.creatorID,
            inputDate: msg.inputDate,
            ymDisplay: moment.utc(msg.startDate, 'YYYYMMDD').format('M/D').toString()
              + ' ' + vm.$i18n('CCG003_15').toString() + ' '
              + moment.utc(msg.endDate, 'YYYYMMDD').format('M/D').toString(),
            content: msg.notificationMessage
          }));
          vm.itemList(itemList);
        }
      })
        .fail(error => this.$dialog.error(error))
        .always(() => vm.$blockui('hide'));
    }

    /**
     * B3:検索をクリックする
     */
    onClickSearch(): void {
      const vm = this;
      vm.$validate('#B2_2').then((valid: boolean) => {
        if (!valid) {
          nts.uk.ui.errors.show();
          return;
        };
        const param: DatePeriod = new DatePeriod({
          startDate: moment.utc(vm.dateValue().startDate).toISOString(),
          endDate: moment.utc(vm.dateValue().endDate).toISOString()
        });
        vm.searchMessage(param);
      });
    }

    /**
     * B20_1:新規をクリックする
     */
    openScreenCInNewMode(): void {
      const vm = this;
      vm.$window.modal('/view/ccg/003/c/index.xhtml', {
        isNewMode: true,
        role: vm.role,
        messageNotice: null
      })
        .then(result => {
          if (result && !result.isClose) {
            vm.onClickSearch();
          }
        });
    }

    /**
     * B4_2:対象のリンクラベルをクリックする
     */
    onClickTargetLink(data: ItemModel): void {
      const vm = this;
      vm.$window.modal('/view/ccg/003/c/index.xhtml', {
        isNewMode: false,
        role: vm.role,
        messageNotice: vm.findMessage(data)
      })
        .then(() => {
          vm.onClickSearch();
        });
    }

    findMessage(data: ItemModel): MessageNotice {
      return _.find(this.msgNotice, m => m.creatorID === data.creatorID && m.inputDate === data.inputDate);
    }

    closeDialog(): void {
      this.$window.close();
    }

  }

  class Role {
    companyId: string;
    roleId: string;
    roleCode: string;
    roleName: string;
    assignAtr: number;
    employeeReferenceRange: number;
  }

  class DatePeriod {
    startDate: string;
    endDate: string;

    constructor(init?: Partial<DatePeriod>) {
      $.extend(this, init);
    }
  }

  class ItemModel {
    creatorID: string;
    inputDate: string;
    ymDisplay: string;
    content: string;

    constructor(init?: Partial<ItemModel>) {
      $.extend(this, init);
    }
  }

  class MessageNotice {
    creatorID: string;
    inputDate: string;
    modifiedDate: string;
    targetInformation: any;
    startDate: any;
    endDate: any;
    employeeIdSeen: string[];
    notificationMessage: string;
  }
}
