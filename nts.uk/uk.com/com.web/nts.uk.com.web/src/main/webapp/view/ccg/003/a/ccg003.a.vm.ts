/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />
module nts.uk.com.view.ccg003.a {

  const API = {
    // <<ScreenQuery>> 社員のお知らせの画面を表示する
    getEmployeeNotification: 'sys/portal/notice/getEmployeeNotification',
    // <<ScreenQuery>> 社員が宛先のお知らせの内容を取得する
    getContentOfDestinationNotification: 'sys/portal/notice/getContentOfDestinationNotification',
    // <<Command>> お知らせを閲覧する
    viewMessageNotice: 'sys/portal/notice/viewMessageNotice',
    // <<Command>> 個人の記念日を閲覧する
    updateAnnivesaryNotice: 'ctx/bs/person/personal/anniversary/updateAnnivesaryNotice',
    isDisplayNewNotice: 'sys/portal/notice/is-new-notice'
  };

  const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;

  @component({
    name: 'ccg003-component',
    template: `<div>
    <!-- A0 お知らせ表示 -->
    <div id="A0-CCG003" class="panel panel-frame panel-ccg003">
      <div class="ccg003-top-content">
        <!-- A1 対象日 -->
        <div><span data-bind="text: systemDate" style="color: black !important;"></span></div>
        <div class="ccg003-fw-right">
          <div data-bind="if: roleFlag">
            <!-- A2 メッセージ入力 -->
            <div data-bind="ntsFormLabel: { required: false, text: $i18n('CCG003_4') }"></div>
            <!-- A2_1 -->
            <a class="ccg003-a2" class="mr-5" href="#" data-bind="click: openScreenCInNewMode, text: $component.$i18n('CCG003_17')"></a>
            <!-- A2_2 -->
            <a class="ccg003-a2" class="mr-5" href="#" data-bind="click: openScreenB, text: $component.$i18n('CCG003_18')"></a>
          </div>
          <div>
            <!-- A3 ☓アイコン -->
            <i id="A3-CCG003" data-bind="ntsIcon: { no: 174, width: 25, height: 15 }, click: closeWindow"></i>
          </div>
        </div>
      </div>
      <!-- A4 絞り込み -->
      <div id="A4-CCG003" class="w-490 ccg003-no-radius" data-bind="ntsAccordion: {}">
        <div id="top-title-ccg003" class="bg-schedule-focus bg-accordion-1">
          <!-- ヘッダテキスト -->
          <h3 data-bind="text: $component.$i18n('CCG003_5')" style="display: inline;"></h3>
        </div>
        <div id="body-title-ccg003" class="bg-accordion-1 no-border-radius pl-10">

          <table style="width: 100%;">
            <colgroup>
                <col width="auto" />
                <col width="auto" />
                <col width="auto" />
            </colgroup>
            <tbody>
              <tr>
                <td>
                  <!-- A4_1 表示期間(ラベル) -->
                  <span class="auto-margin" data-bind="text: $component.$i18n('CCG003_6')"></span>
                </td>
                <td>
                  <!-- A4_2 表示期間 -->
                  <div id="ccg003-A4_2" tabindex="1" class="ml-10" data-bind="ntsDateRangePicker: {
                    required: true,
                    enable: true,
                    name: $i18n('CCG003_6'),
                    showNextPrevious: false,
                    value: dateValue,
                    maxRange: 'oneMonth'}"
                  />
                </td>
                <td>
                  <!-- A4_3 絞込 -->
                  <button tabindex="2" class="small pl-10 pr-10" data-bind="click: onClickFilter, text: $component.$i18n('CCG003_7')"></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="ccg003-auto-overflow">
        <div data-bind="foreach: anniversaries">
          <!-- A5 記念日 -->
          <div class="w-490 ccg003-no-radius" data-bind="ntsAccordion: {}, click: $component.onClickAnniversary.bind($component, $index)">
            <div class="bg-schedule-focus">
              <!-- ヘッダテキスト -->
              <span class="limited-label-custom  mw-400" data-bind="text: anniversaryNotice.anniversaryTitle"></span>
              <!-- A5_1 NEWアイコン -->
              <span data-bind="if: $component.anniversaries()[$index()].flag">
                <i data-bind="ntsIcon: { no: 175, width: 25, height: 15 }"></i>
              </span>
            </div>
            <div class="mr-data no-border-radius">
              <!-- A5_2 記念日内容 -->
              <div>
                <span class="ccg003-data" data-bind="text: anniversaryNotice.notificationMessage"></span>
              </div>
            </div>
          </div>
        </div>
        <div data-bind="foreach: msgNotices">
          <!-- A6 メッセージ -->
          <div class="w-490 ccg003-no-radius" data-bind="ntsAccordion: {activate: $component.onClickMessageNotice.bind($component, message.creatorID, message.inputDate, $index)}">
            <h3 class="bg-schedule-focus">
              <!-- ヘッダテキスト -->
              <span class="limited-label-custom  mw-400" data-bind="text: message.notificationMessage"></span>
              <!-- A6_1 NEWアイコン -->
              <span data-bind="if: $component.msgNotices()[$index()].flag">
                <i data-bind="ntsIcon: { no: 175, width: 25, height: 15 }"></i>
              </span>
            </h3>
            <!-- A6_2 メッセージ内容 -->
            <div class="mr-data no-border-radius">
              <div>
                <span class="ccg003-data" data-bind="html: messageDisplay"></span>
                <span class="ccg003-block-5" data-bind="text: $component.$i18n('CCG003_8', [creator])"></span>
                <span class="ccg003-block-5" data-bind="text: $component.$i18n('CCG003_9', [dateDisplay])"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <style>
    .ccg003-data {
      white-space: pre-wrap;
      word-break: break-all;
      display: inline-block;
      width: 430px;
    }
    #A0-CCG003 {
      min-height: 150px;
      z-index: 99 !important;
    }
    #A3-CCG003 {
      cursor: pointer;
    }
    #body-title-ccg003 {
      border-bottom: 0;
    }
    .ccg003-a2 {
      color: #0D86D1 !important;
      text-decoration: underline;
      padding-left: 10px;
      padding-right: 10px;
    }
    .w-490 {
      width: 490px;
    }
    .ccg003-top-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .ccg003-fw-right {
      display: flex;
      float: right;
      justify-content: end;
    }
    .panel-ccg003 {
      position: absolute;
      max-height: 460px;
      background-color: #f2f8ee !important;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      width: 510px;
      border-radius: 0px !important;
    }
    .bg-accordion-1 {
      background-color: #e1eed7 !important;
    }
    .ccg003-no-radius > .ui-accordion-header {
      margin: 0 0 0 0 !important;
      border-radius: 0px !important;
    }
    .no-border-radius {
      border-radius: 0px !important;
    }
    .pl-10 {
      padding-left: 10px !important;
    }
    .pr-10 {
      padding-right: 10px !important;
    }
    .auto-margin {
      margin: auto;
    }
    .ml-10 {
      margin-left: 10px;
    }
    .ml-90 {
      margin-left: 90px;
    }
    .mw-400 {
      max-width: 400px;
    }
    .mr-5 {
      margin-right: 5px;
    }
    .ccg003-auto-overflow {
      overflow-y: auto;
      max-height: 385px;
      -moz-transition: 0.5s;
      -ms-transition: 0.5s;
      -o-transition: 0.5s;
      -webkit-transition: 0.5s;
      transition: 0.5s;
    }
    .ccg003-block-5 {
      display: block;
      margin-top: 5px;
    }
    .limited-label-custom {
      width: 99%;
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .datepicker-container {
      z-index: 999999999 !important;
    }
  </style>`
  })
  export class ViewModel extends ko.ViewModel {
    isStartScreen = true;
    formatType = 'YYYY/MM/DD';
    dateValue: KnockoutObservable<DatePeriod> = ko.observable(new DatePeriod({
      startDate: moment.utc().format(this.formatType),
      endDate: moment.utc().format(this.formatType)
    }));
    systemDate: KnockoutObservable<string> = ko.observable('');

    // Map<お知らせメッセージ、作成者> (List)
    msgNotices: KnockoutObservableArray<MsgNotices> = ko.observableArray([]);
    // Map<個人の記念日情報、新記念日Flag> (List)
    anniversaries: KnockoutObservableArray<AnniversaryNotices> = ko.observableArray([]);
    // ロール
    roleFlag: KnockoutObservable<boolean> = ko.observable(false);
    role: KnockoutObservable<Role> = ko.observable(new Role());
    isShow: KnockoutObservable<boolean> = ko.observable(true);
    isEmployee: KnockoutComputed<boolean> = ko.computed(() => __viewContext.user.isEmployee);

    created() {
      const vm = this;
      if (!vm.isEmployee()) {
        return;
      }
      vm.$ajax('com', API.getEmployeeNotification)
        .then((response: EmployeeNotification) => {
          if (response) {
            vm.systemDate(moment.utc(response.systemDate).locale('ja').format('YYYY/M/D(dd)'));
            _.map(response.anniversaryNotices, item => item.anniversaryNotice.anniversaryTitle = vm.convertTitleAnniversaries(item.anniversaryNotice));
            vm.anniversaries(response.anniversaryNotices);
            const msgNotices = vm.listMsgNotice(response.msgNotices);
            vm.msgNotices(msgNotices);
            if (response.role) {
              vm.role(response.role);
              vm.roleFlag(response.role.employeeReferenceRange !== 3);
            }
          }
        })
        .fail(error => vm.$dialog.error(error))
        .always(() => vm.$blockui('clearView'));
      vm.isShowNewMark();
    }

    mounted() {
      const vm = this;
      $('#A0-CCG003').ntsPopup({
        position: {
          my: 'right top',
          at: `right bottom`,
          of: $('#header')
        },
        showOnStart: false,
        dismissible: false
      });

      $('#notice-msg').click(() => {
        if (vm.isShow()) {
          $('#A0-CCG003').ntsPopup('show');
        } else {
          vm.isShowNewMark();
          $('#A0-CCG003').ntsPopup('hide');
        }
        vm.isShow(!vm.isShow());
      });
      $('#top-title-ccg003').dblclick(e => e.preventDefault());
      $('#top-title-ccg003').click(() => {
        $('#top-title-ccg003').css('border-bottom', 'none');
        const maxHeight = $('.ccg003-auto-overflow').css('max-height');
        if (maxHeight === '320px') {
          $('.ccg003-auto-overflow').css('max-height', '385px');
        } else {
          $('.ccg003-auto-overflow').css('max-height', '320px');
        }

        if (!_.isEmpty(vm.anniversaries()) || !_.isEmpty(vm.msgNotices())) {
          $('#A4-CCG003').css('border-bottom', 'unset');
        } else {
          $('#A4-CCG003').css('border-bottom', '1px groove');
        }
      });
    }

    /**
     * A4_3:絞込をクリックする
     */
    onClickFilter(): void {
      const vm = this;
      vm.$validate('#ccg003-A4_2').then(valid => {
        if (!valid) {
          nts.uk.ui.errors.show();
          return;
        }
        vm.$blockui('grayoutView');
        const startDate = moment.utc(vm.dateValue().startDate, vm.formatType);
        const endDate = moment.utc(vm.dateValue().endDate, vm.formatType);
        const baseDate = moment.utc(new Date(), vm.formatType);
        if (startDate.isAfter(baseDate) || endDate.isAfter(baseDate)) {
          vm.$dialog.error({ messageId: 'Msg_1833' });
          vm.$blockui('clearView');
          return;
        }
        vm.anniversaries([]);
        vm.msgNotices([]);

        const param: DatePeriod = new DatePeriod({
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        });
        vm.$ajax('com', API.getContentOfDestinationNotification, param)
          .then((response: DestinationNotification) => {
            if (response) {
              _.map(response.anniversaryNotices, item => item.anniversaryNotice.anniversaryTitle = vm.convertTitleAnniversaries(item.anniversaryNotice));
              vm.anniversaries(response.anniversaryNotices);
              const msgNotices = vm.listMsgNotice(response.msgNotices);
              vm.msgNotices(msgNotices);

              if (!_.isEmpty(response.anniversaryNotices || !_.isEmpty(response.msgNotices))) {
                $('#A4-CCG003').css('border-bottom', 'unset');
              }
            }
          })
          .fail(error => vm.$dialog.error(error))
          .always(() => vm.$blockui('clearView'));
      });
    }

    listMsgNotice(messages: any[]): MsgNotices[] {
      const vm = this;
      if (_.isEmpty(messages)) {
        return [];
      }
      return _.map(messages, (item: any) => {
        const msg = new MsgNotices();
        msg.creator = item.creator;
        msg.flag = item.flag;
        msg.message = item.message;
        msg.dateDisplay = item.message
          ? `${moment.utc(item.message.startDate, 'YYYY/MM/DD').format('M/D')} ${vm.$i18n('CCG003_15')} ${moment.utc(item.message.endDate, 'YYYY/MM/DD').format('M/D')}`
          : '';
        msg.messageDisplay = vm.replaceUrl(item.message.notificationMessage);
        return msg;
      });
    }

    replaceUrl(text: string): string {
      return text.replace(urlRegex, (url, b, c) => {
        const url2 = (c == 'www.') ? 'http://' + url : url;
        return '<a style="color: blue !important;" href="' + url2 + '" target="_blank">' + url + '</a>';
      });
    }

    /**
     * A5、アコーディオンを広げて内容を表示する
     */
    onClickAnniversary(index: any): void {
      const vm = this;
      if (_.isNil(vm.anniversaries()[index()])) {
        return;
      }
      if (!vm.anniversaries()[index()].flag) {
        return;
      }
      const anniversary = vm.anniversaries()[index()].anniversaryNotice.displayDate;
      const command = {
        personalId: vm.anniversaries()[index()].anniversaryNotice.personalId,
        anniversary: moment.utc(anniversary, 'MM-DD').format('MMDD'),
        referDate: moment.utc(vm.dateValue().endDate).toISOString(),
      }
      vm.$blockui('grayoutView');
      vm.$ajax('com', API.updateAnnivesaryNotice, command)
        .then(() => {
          const anniversaries = vm.anniversaries();
          anniversaries[index()].flag = false;
          vm.anniversaries(anniversaries);
        })
        .fail(error => vm.$dialog.error(error))
        .always(() => vm.$blockui('clearView'));
    }

    /**
     * A6、アコーディオンを広げて内容を表示する
     */
    onClickMessageNotice(creator: string, inputDate: string, index: any): void {
      const vm = this;
      if (!vm.msgNotices()[index()].flag) {
        return;
      }
      const command: any = {
        msgInfors: [{
          creatorId: creator,
          inputDate: inputDate
        }],
        sid: __viewContext.user.employeeId
      }
      vm.$blockui('grayoutView');
      vm.$ajax('com', API.viewMessageNotice, command)
        .then(() => {
          const msgNotices = vm.msgNotices();
          msgNotices[index()].flag = false;
          vm.msgNotices(msgNotices);
        })
        .fail(error => vm.$dialog.error(error))
        .always(() => vm.$blockui('clearView'));
    }

    /**
     * A2:メッセージ入力のリンクをクリックする
     */
    openScreenB(): void {
      const vm = this;
      vm.$window.modal('com', '/view/ccg/003/b/index.xhtml', vm.role())
        .then(() => vm.onClickFilter());
    }

    /**
     * 記念日のタイトル部分の表示について ver5
     */
    convertTitleAnniversaries(param: AnniversaryNoticeImport): string {
      if (!param) {
        return '';
      }
      const vm = this;
      let displayDate = '';
      const startDate = moment.utc(vm.dateValue().startDate, 'YYYY/MM/DD');
      const endDate = moment.utc(vm.dateValue().endDate, 'YYYY/MM/DD');
      const systemDate = moment.utc(vm.systemDate(), 'YYYY/MM/DD');
      let anniversaryDate = moment.utc(`${startDate.year()}-${param.displayDate}`, 'YYYY-MM-DD');
      // 条件：期間が「システム日～システム日」の場合
      if (startDate.isSame(systemDate) && endDate.isSame(systemDate)) {
        // 1	システム日.月日　≦　個人の記念日.記念日(月日)
        if (startDate.isSameOrBefore(anniversaryDate)) {
          //システム日.年月日 ≦	システム日.年+個人の記念日.記念日(月日) ≦	システム日.年月日＋日数前の通知
          if (systemDate.isSameOrBefore(anniversaryDate) && anniversaryDate.isSameOrBefore(systemDate.add(param.noticeDay, 'd'))) {
            //システム日.年＋個人の記念日.記念日(月日)
            displayDate = anniversaryDate.locale('ja').format('M/D(dd)');
          } else {
            //システム日.年+「-1年」+個人の記念日.記念日(月日)
            displayDate = anniversaryDate.subtract(1, 'y').locale('ja').format('M/D(dd)');
          }
        } else { // 2	システム日.月日　＞   個人の記念日.記念日(月日)
          // システム日.年+「1年」＋個人の記念日.記念日(月日)
          const anniversaryNextYear = moment.utc(`${systemDate.year() + 1}-${param.displayDate}`, 'YYYY-MM-DD');
          if (systemDate.isSameOrBefore(anniversaryNextYear) && anniversaryNextYear.isSameOrBefore(systemDate.add(param.noticeDay, 'd'))) {
            // システム日.年+「1年」＋個人の記念日.記念日(月日)
            displayDate = anniversaryNextYear.locale('ja').format('M/D(dd)');
          } else {
            // システム日.年+個人の記念日.記念日(月日)
            displayDate = anniversaryNextYear.subtract(1, 'y').locale('ja').format('M/D(dd)');
          }
        }
      }
      // 条件：期間開始日、終了日がどちらかまたは共に「システム日」ではない場合
      // 1	期間開始日.年月日　≦　期間開始日.年＋個人の記念日.月日　≦　期間終了日.年月日
      if (startDate.isSameOrBefore(anniversaryDate) && anniversaryDate.isSameOrBefore(endDate)) {
        displayDate =  anniversaryDate.locale('ja').format('M/D(dd)');
      }
      // 2	期間開始日.年月日　≦　期間終了日.年＋個人の記念日.月日　≦　期間終了日.年月日
      anniversaryDate = moment.utc(`${endDate.year}-${param.displayDate}`, 'YYYY-MM-DD');
      if (startDate.isBefore(anniversaryDate) && anniversaryDate.isBefore(endDate)) {
        displayDate = anniversaryDate.locale('ja').format('M/D(dd)');
      }

      return `${displayDate} ${param.anniversaryTitle}`;
    }

    /**
     * A2_1:メッセージ追加のリンクをクリックする
     */
     openScreenCInNewMode(): void {
      const vm = this;
      vm.$window.modal('com', '/view/ccg/003/c/index.xhtml', {
        isNewMode: true,
        role: vm.role(),
        messageNotice: null
      })
        .then(result => {
          if (result && !result.isClose) {
            vm.onClickFilter();
          }
        });
    }

    closeWindow(): void {
      const vm = this;
      vm.isShow(!vm.isShow());
      vm.isShowNewMark();
      $('#A0-CCG003').ntsPopup('hide');
    }

    private isShowNewMark(): void {
      const vm = this;
      vm.$ajax('com', API.isDisplayNewNotice)
      .then((response) => {
        if (response) {
          $("#new-mark-msg").css({ display: "" });
        } else {
          $("#new-mark-msg").css({ display: "none" });
        }
      })
      .fail(() => $("#new-mark-msg").css({ display: "none" }));
    }
  }

  class DestinationNotification {
    msgNotices: MsgNotices[];
    anniversaryNotices: AnniversaryNotices[];
  }

  class DatePeriod {
    startDate: string;
    endDate: string;

    constructor(init?: Partial<DatePeriod>) {
      $.extend(this, init);
    }
  }

  class EmployeeNotification {
    msgNotices: MsgNotices[];
    anniversaryNotices: AnniversaryNotices[];
    role: Role;
    systemDate: string;
  }

  class MsgNotices {
    message: MessageNotice;
    creator: string;
    dateDisplay: string;
    flag: boolean;
    messageDisplay: string;
  }

  class AnniversaryNotices {
    anniversaryNotice: AnniversaryNoticeImport;
    flag: boolean;
  }

  class AnniversaryNoticeImport {
    personalId: string;
    noticeDay: number;
    seenDate: string;
    anniversary: string;
    anniversaryTitle: string;
    notificationMessage: string;
    displayDate: string;
  }

  class Role {
    companyId: string;
    roleId: string;
    roleCode: string;
    roleName: string;
    assignAtr: number;
    employeeReferenceRange: number;
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
