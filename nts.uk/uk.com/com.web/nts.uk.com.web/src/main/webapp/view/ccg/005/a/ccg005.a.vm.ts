/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />
module nts.uk.at.view.ccg005.a.screenModel {
  import object = nts.uk.at.view.ccg005.a.object;
  import setShared = nts.uk.ui.windows.setShared;
  import getShared = nts.uk.ui.windows.getShared;

  const API = {
    getDisplayAttendanceData: 'screen/com/ccg005/get-display-attendance-data',
    getDisplayInfoAfterSelect: 'screen/com/ccg005/get-information-after-select',
    getAttendanceInformation: 'screen/com/ccg005/get-attendance-information',
    searchForEmployee: 'screen/com/ccg005/get-employee-search',
    saveFavorite: 'ctx/office/favorite/save',
    registerComment: 'ctx/office/comment/register',
    deleteComment: 'ctx/office/comment/delete',
    saveStatus: 'ctx/office/status/save'
  };
  const ID_AVATAR_CHANGE = 'ccg005-avatar-change';

  @component({
    name: 'ccg005-component',
    template: 
    `
    <div class="widget-title">
      <table style="width: 100%;">
        <colgroup>
          <col width="auto" />
          <col width="70px" />
          <col width="40px" />
        </colgroup>
        <thead>
          <tr>
            <th class="ccg005-fs-biger">
              <!-- A0 -->
              <div data-bind="ntsFormLabel: { required: false, text: $component.$i18n('CCG005_1') }"></div>
            </th>
            <th>
              <!-- A2_1 -->
              <button tabindex=11 id="ccg005-legends" style="margin-left: 5px;"
                data-bind="visible: $component.isBaseDate, ntsLegendButton: legendOptions"></button>
            </th>
            <th>
              <!-- A1_5 -->
              <i tabindex=3 style="position: relative; right: 0; top: 5px;" data-bind="visible: $component.inCharge, ntsIcon: {no: 5, width: 25, height: 25}, click: $component.openScreenCCG005B"></i>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div data-bind="widget-content: 200, default: 430" id="ccg005-watching">
    <div id="ccg005-content" style="padding-bottom: 0px;">
      <div style="height: 100%; position: relative;">
        <div class="grade-header-center" style="padding-bottom: 5px;">
          <table>
            <colgroup>
              <col width="40px"/>
              <col width="370px"/>
              <col width="auto"/>
            </colgroup>
            <tr>
              <td class="ccg005-bottom-unset">
                <!-- A1_1 -->
                <div id="ccg005-avatar-change" tabindex=1
                  data-bind="click: $component.onClickAvatar.bind($component, loginSid)"></div>
              </td>
              <td class="ccg005-bottom-unset" style="padding-left: 5px; width: 370px;">
                <!-- A1_2 -->
                <span class="ccg005-bold" data-bind="text: $component.businessName()"></span>
                <div class="ccg005-flex none-enter-icon">
                  <!-- A1_3 -->
                  <i class="ccg005-currentEmoji"></i>
                  <div style="position: relative; height: 30px;" class="CCG005-A1_4-border">
                    <!-- A1_4 -->
                    <input 
                      tabindex=2 
                      id="CCG005-A1_4"
                      style="border: none !important; padding-right: 30px; background: none !important;" 
                      data-bind="ntsTextEditor: {
                          enterkey: $component.registerComment,
                          name: '#[CCG005_37]',
                          value: $component.comment,
                          constraint: 'DailyContactComment',
                          enable: $component.isBaseDate,
                          option: ko.mapping.fromJS(new nts.uk.ui.option.TextEditorOption({
                            textmode: 'text',
                            width: '250px',
                            placeholder: $component.$i18n('CCG005_35')
                          }))
                        }, visible: $component.isSameOrBeforeBaseDate" />
                    <i class="ccg005-clearbtn" style="position: absolute; right: 5px; display: none;"
                      data-bind="click: $component.deleteComment(), ntsIcon: {no: 198, width: 20, height: 28}"></i>
                  </div>
                </div>
              </td>
              <td class="ccg005-bottom-unset">
                <!-- A1_7 -->
                <i tabindex=5 class="ccg005-status-img-A1_7"
                  data-bind="ntsIcon: { no: $component.activityStatusIcon(), width: 20, height: 20 }, visible: $component.isBaseDate"></i>
                <i
                  data-bind="click: $component.openFutureScreenCCG005E.bind($component, true, '', '') ,ntsIcon: { no: 191, width: 20, height: 20 }, visible: $component.isAfter"></i>
              </td>
            </tr>
          </table>
        </div>
        <div id="A2_3" class="grade-header-bottom ccg005-flex" style="position: relative;">
          <!-- A2_3 -->
          <div tabindex=6 id="ccg005-selected-date" data-bind="ntsDatePicker: {
                name: '#[CCG005_36]',
                value: selectedDate,
                required: true,
                dateFormat: 'YYYY/MM/DD',
                fiscalMonthsMode: true,
                showJumpButtons: true
              }" style="display: inline-flex;"></div>
          <div style="right: 0; position: absolute; display: flex; align-items: center;">
            <!-- A3_2 -->
            <i tabindex=9 id="ccg005-star-img" style="margin-right: 5px;"
              data-bind="ntsIcon: {no: 184, width: 20, height: 20}"></i>
            <!-- A3_1 -->
            <div tabindex=10 data-bind="ntsComboBox: {
                  width: '160px',
                  options: favoriteSpecifyData,
                  editable: true,
                  visibleItemsCount: 5,
                  value: favoriteInputDate,
                  selectFirstIfNull: false,
                  optionsValue: 'inputDate',
                  optionsText: 'favoriteName',
                  required: true,
                  columns: [
                    { prop: 'favoriteName' }
                  ]}"></div>
          </div>
        </div>
        <!-- A5 -->
        <div class="grade-body-bottom" style="min-height: 55px; height: 55px">
          <table style="width: 100%; border-collapse: separate; border-spacing: 0 5px">
            <tbody data-bind="foreach: attendanceInformationDtosDisplay">
              <tr style="height: 42px;" class="ccg005-tr-background" data-bind="attr:{ id: backgroundColor }">
                <td style="padding-right: 5px; width: 30px; background-color: white;"
                  class="ccg005-apply-binding-avatar ccg005-bottom-unset">
                  <!-- A4_1 -->
                  <div tabindex=12
                    data-bind="attr:{ id: 'ccg005-avatar-change-'+sid }, click: $component.onClickAvatar.bind($component, sid)" />
                </td>
                <td class="ccg005-w100 ccg005-pl-5 ccg005-border-groove ccg005-right-unset">
                  <!-- A4_8 -->
                  <div style="height: 20px">
                    <label class="limited-label ccg005-w100" style="display: inline-block;"
                      data-bind="text: businessName" />
                  </div>
                  <!-- A4_5 -->
                  <div style="height: 20px;">
                    <i tabindex=13 data-bind="ntsIcon: {no: emojiIconNo, width: 20, height: 15}, visible: emojiVisitable"></i>
                  </div>
                </td>
                <td class="ccg005-w100 ccg005-pl-5 ccg005-border-groove ccg005-right-unset ccg005-left-unset">
                  <div class="ccg005-w100" style="position: relative; height: 20px">
                    <!-- A4_2 -->
                    <label
                      data-bind="text: attendanceDetailDto.workName, attr:{ class: 'limited-label '+ attendanceDetailDto.workColorClass }"
                      style="max-width: 85px; width: auto !important;" />
                    <!-- A4_4 -->
                    <i tabindex=14 style="position: absolute; top: 3px; right: 0;"
                      data-bind="visible: displayAppIcon, click: $component.initPopupA4_4InList.bind($component, $index, sid), attr:{ class: 'A4-4-application-icon-'+sid }, ntsIcon: {no: 190, width: 13, height: 13}"></i>
                  </div>
                  <div style="height: 20px; position: relative;">
                    <!-- A4_3 -->
                    <span style="white-space: nowrap; position: absolute; bottom: 2px;">
                      <label id="check-in-out"
                        data-bind="text: attendanceDetailDto.checkInTime, attr:{ class: attendanceDetailDto.checkInColorClass }" />
                      <label id="check-in-out"
                        data-bind="text: attendanceDetailDto.checkOutTime, attr:{ class: attendanceDetailDto.checkOutColorClass }" />
                    </span>
                  </div>
                </td>
                <td class="ccg005-pl-5 ccg005-border-groove ccg005-right-unset ccg005-left-unset">
                  <!-- A4_7 -->
                  <span class="ccg005-flex">
                    <i tabindex=15 class="ccg005-status-img"
                      data-bind="click: $component.initPopupInList.bind($component, $index, sid, businessName), ntsIcon: {no: activityStatusIconNo, width: 20, height: 20}, visible: $component.isBaseDate"></i>
                    <i
                      data-bind="click: $component.openFutureScreenCCG005E.bind($component, false, sid, businessName) ,ntsIcon: { no: 191, width: 20, height: 20 }, visible: $component.isAfter"></i>
                  </span>
                </td>
                <td class="ccg005-pl-5 ccg005-border-groove ccg005-left-unset">
                  <!-- A4_6 time -->
                  <p style="max-width: 125px; line-height: 20px;"
                    data-bind="text: goOutDto.goOutPeriod, visible: $component.goOutDisplay()" />
                  <!-- A4_6 text go out reason -->
                  <p style="max-width: 125px; line-height: 20px;" class="limited-label ccg005-block"
                    data-bind="text: goOutDto.goOutReason, visible: $component.goOutDisplay()" />
                  <!-- A4_6 text comment -->
                  <p style="max-width: 125px; line-height: 20px;" class="limited-label ccg005-block"
                    data-bind="text: comment, visible: $component.commentDisplay()" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="grade-bottom ccg005-flex"
          style="width: 100%; align-items: center; position: absolute; margin-top: 5px; bottom: 0;">
          <table style="width: 100%;">
            <tr style=" background: white;">
              <td class="ccg005-bottom-unset">
                <div class="ccg005-pagination ccg005-flex">
                  <!-- A5_1 -->
                  <i tabindex=16 class="ccg005-pagination-btn"
                    data-bind="ntsIcon: {no: 193, width: 15, height: 20}, click: $component.previousPage"></i>
                  <!-- A5_2 -->
                  <span style="white-space: nowrap; width: auto; text-align: center;"
                    data-bind="text: $component.paginationText()"></span>
                  <!-- A5_3 -->
                  <i tabindex=17 class="ccg005-pagination-btn"
                    data-bind="ntsIcon: {no: 192, width: 15, height: 20}, click: $component.nextPage"></i>
                </div>
              </td>
              <td class="ccg005-bottom-unset" style="width: 100%">
                <div class="ccg005-switch-btn" style="float: right;">
                  <!-- A5_4 -->
                  <div tabindex=18 class="cf ccg005-switch" data-bind="ntsSwitchButton: {
                        options: contentSelections,
                        optionsValue: 'code',
                        optionsText: 'name',
                        value: contentSelected }"></div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- A3_2 Popup -->
      <div id="ccg005-star-popup" style="width: 212px;">
        <!-- A3_2.1 -->
        <table>
          <tr style="height: 25px">
            <td class="ccg005-bottom-unset" style="text-align: right;">
              <a style="color: blue; text-decoration: underline; cursor: pointer;"
                data-bind="i18n: 'CCG005_34', click: $component.openScreenCCG005D"></a>
            </td>
          </tr>
          <tr>
            <td class="ccg005-bottom-unset">
              <!-- A3_2.2 -->
              <input data-bind="ntsTextEditor: {
                    value: searchValue,
                    enterkey: $component.onSearchEmployee,
                    option: ko.mapping.fromJS(new nts.uk.ui.option.TextEditorOption({
                      textmode: 'text',
                      width: '190px',
                      placeholder: $component.$i18n('CCG005_45')
                    }))
                  }"></input>
            </td>
          </tr>
          <tr>
            <td class="ccg005-bottom-unset">
              <!-- A3_2.3 -->
              <button data-bind="i18n: 'CCG005_32', click: $component.openCDL008"></button>
              <!-- A3_2.4 -->
              <label class="limited-label" style="max-width: 125px;"
                data-bind="text: $component.workplaceNameFromCDL008"></label>
            </td>
          </tr>
        </table>
      </div>
      <!-- A4_4 popup -->
      <div id="ccg005-A4-4-popup">
        <div data-bind="foreach: $component.applicationNameDisplayBySid">
          <p data-bind="text: $data" />
        </div>
      </div>
    </div>
  </div>
  <!-- A1_7 & A4_7 Popup -->
  <div id="ccg005-status-popup">
    <table>
      <tr style="height: 30px" data-bind="click: $component.registerAttendanceStatus.bind($component, 0, 196)">
        <td class="ccg005-bottom-unset">
          <i data-bind="visible: $component.visibleNotPresent(), ntsIcon: {no: 78, width: 15, height: 25}"></i>
        </td>
        <!-- A1_7.1 -->
        <td class="ccg005-bottom-unset">
          <i data-bind="ntsIcon: {no: 196, width: 20, height: 20}"></i>
        </td>
        <td class="ccg005-bottom-unset" data-bind="i18n: 'CCG005_43'"></td>
      </tr>
      <tr style="height: 30px" data-bind="click: $component.registerAttendanceStatus.bind($component, 1, 195)">
        <td class="ccg005-bottom-unset">
          <i data-bind="visible: $component.visiblePresent(), ntsIcon: {no: 78, width: 15, height: 25}"></i>
        </td>
        <!-- A1_7.2 -->
        <td class="ccg005-bottom-unset">
          <i data-bind="ntsIcon: {no: 195, width: 20, height: 20}"></i>
        </td>
        <td class="ccg005-bottom-unset" data-bind="i18n: 'CCG005_22'"></td>
      </tr>
      <tr style="height: 30px" data-bind="click: $component.openScreenCCG005E">
        <td class="ccg005-bottom-unset">
          <i data-bind="visible: $component.visibleGoOut(), ntsIcon: {no: 78, width: 15, height: 25}"></i>
        </td>
        <!-- A1_7.3 -->
        <td class="ccg005-bottom-unset">
          <i data-bind="ntsIcon: {no: 191, width: 20, height: 20}"></i>
        </td>
        <td class="ccg005-bottom-unset" data-bind="i18n: 'CCG005_39'"></td>
      </tr>
      <tr style="height: 30px" data-bind="click: $component.registerAttendanceStatus.bind($component,3, 196)">
        <td class="ccg005-bottom-unset">
          <i data-bind="visible: $component.visibleGoHome(), ntsIcon: {no: 78, width: 15, height: 25}"></i>
        </td>
        <!-- A1_7.4 -->
        <td class="ccg005-bottom-unset">
          <i data-bind="ntsIcon: {no: 196, width: 20, height: 20}"></i>
        </td>
        <td class="ccg005-bottom-unset" data-bind="i18n: 'CCG005_44'"></td>
      </tr>
      <tr style="height: 30px" data-bind="click: $component.registerAttendanceStatus.bind($component, 4, 197)">
        <td class="ccg005-bottom-unset">
          <i data-bind="visible: $component.visibleHoliday(), ntsIcon: {no: 78, width: 15, height: 25}"></i>
        </td>
        <!-- A1_7.5 -->
        <td class="ccg005-bottom-unset">
          <i data-bind="ntsIcon: {no: 197, width: 20, height: 20}"></i>
        </td>
        <td class="ccg005-bottom-unset" data-bind="i18n: 'CCG005_40'"></td>
      </tr>
    </table>
  </div>
  <!--------------------------------------- CSS --------------------------------------->
  <style>
    .ccg005-block {
      display: block;
    }
    .ccg005-fs-biger div.form-label>span.text {
      font-size: 1.2rem;
    }
    .widget-container > #ccg005-watching > #ccg005-content table tr td {
      border-width: 1px !important;
    } 

    .ccg005-border-groove {
      border: 1px groove !important;
    }

    .ccg005-right-unset {
      border-right: none !important;
    }

    .ccg005-left-unset {
      border-left: none !important;
    }

    .ccg005-bottom-unset {
      border-bottom: none !important;
    }

    .ccg005-w100 {
      width: 100px;
    }

    .ccg005-bold {
      font-weight: bold;
    }

    .ccg005-bold span {
      font-size: 1rem !important;
      font-weight: bolder !important;
    }

    .ccg005-1rem span {
      font-size: 1rem !important;
    }

    .ccg005-pl-5 {
      padding-left: 5px;
    }

    .ccg005-flex {
      display: flex;
    }

    .grade-header-top {
      display: flex;
      margin-top: 5px;
    }

    .grade-header-top span {
      width: 390px;
    }

    .bg-white-ccg005 {
      background-color: #FFFFFF;
    }

    .bg-green-ccg005 {
      background-color: #DDFFDD
    }

    .bg-yellow-ccg005 {
      background-color: #FFE1E1
    }

    .bg-gray-ccg005 {
      background-color: #F2F2F2
    }

    #ccg005-content {
      width: 100%;
      overflow: hidden;
    }

    #ccg005-status-popup table tr,
    #ccg005-content i, #ccg005-content img {
      cursor: pointer;
    }

    #ccg005-status-popup table tr td {
      padding-right: 5px;
    }

    #CCG005_A1_1 {
      max-height: 40px;
      max-width: 40px;
      min-height: 40px;
      min-width: 40px;
      border-radius: 50%;
    }

    #CCG005_A1_1_small {
      max-height: 30px;
      max-width: 30px;
      min-height: 30px;
      min-width: 30px;
      border-radius: 50%;
    }

    #CCG005_no_avatar {
      display: flex;
      align-items: center;
      background-color: #eeeeee;
      color: blue;
      border: 1px solid #333688;
      border-radius: 50%;
      width: 40px;
      height: 40px;
    }

    #CCG005_no_avatar_small {
      cursor: pointer;
      display: flex;
      align-items: center;
      background-color: #eeeeee;
      color: blue;
      border: 1px solid #333688;
      border-radius: 50%;
      width: 30px;
      height: 30px;
    }

    .ccg005-switch > .nts-switch-button {
      width: 80px;
    }

    #check-in-out {
      font-size: 80%;
    }

    .display-color-scheduled {
      color: #00CC00;
    }

    .display-color-alarm {
      color: red;
    }

    .pd-left-35 {
      padding-left: 35px;
    }

    #background-color-present {
      background-color: #DDFFDD;
    }

    #background-color-go-out {
      background-color: #FFE1E1;
    }

    #background-color-holiday {
      background-color: #F2F2F2;
    }

    #A2_3 .ntsDatePickerButton { height: 30px !important; }

  </style>`
  })

  export class ViewModel extends ko.ViewModel {
    widget: string = 'CCG_005';
    selectedDate: KnockoutObservable<string> = ko.observable('');
    legendOptions: any = {
      items: [
        { cssClass: { className: 'bg-white-ccg005', colorPropertyName: 'background-color' }, labelText: this.$i18n('CCG005_26') },  // A2_1.1
        { cssClass: { className: 'bg-green-ccg005', colorPropertyName: 'background-color' }, labelText: this.$i18n('CCG005_22') },  // A2_1.2
        { cssClass: { className: 'bg-yellow-ccg005', colorPropertyName: 'background-color' }, labelText: this.$i18n('CCG005_39') }, // A2_1.3
        { cssClass: { className: 'bg-gray-ccg005', colorPropertyName: 'background-color' }, labelText: this.$i18n('CCG005_40') }    // A2_1.4
      ]
    };
    contentSelections: KnockoutObservableArray<any> = ko.observableArray([
      { code: 0, name: this.$i18n('CCG005_37') },
      { code: 1, name: this.$i18n('CCG005_38') }
    ]);
    contentSelected: KnockoutObservable<number> = ko.observable(0);
    commentDisplay: KnockoutObservable<boolean> = ko.computed(() => this.contentSelected() === 0);
    goOutDisplay: KnockoutObservable<boolean> = ko.computed(() => this.contentSelected() === 1);
    favoriteInputDate: KnockoutObservable<any> = ko.observable(null);
    searchValue: KnockoutObservable<string> = ko.observable('');
    workplaceNameFromCDL008: KnockoutObservable<string> = ko.observable('');

    // Pagination
    currentPage: KnockoutObservable<number> = ko.observable(1);
    perPage: KnockoutObservable<number> = ko.observable(1);
    totalElement: KnockoutObservable<number> = ko.observable(0);
    totalRow: KnockoutComputed<number> = ko.computed(() =>
      this.perPage() * this.currentPage() > this.totalElement()
        ? this.totalElement() - this.perPage() * (this.currentPage() - 1)
        : this.perPage());
    startPage: KnockoutComputed<number> = ko.computed(() => this.perPage() * (this.currentPage() - 1) + 1);
    endPage: KnockoutComputed<number> = ko.computed(() => this.startPage() + this.totalRow() - 1);
    paginationText: KnockoutComputed<string> = ko.computed(() => {
      return ((this.totalElement() === 0) ? '0-0/0' : (`${this.startPage()}-${this.endPage()}/${this.totalElement()}`));
    });
    // End pagination

    activityStatus: KnockoutObservable<number> = ko.observable();
    activatedStatus: KnockoutObservable<number> = ko.observable();
    activityStatusIcon: KnockoutComputed<number> = ko.computed(() => this.initActivityStatus(this.activityStatus()));
    businessName: KnockoutObservable<string> = ko.observable('');
    originalComment: KnockoutObservable<string> = ko.observable('');
    comment: KnockoutObservable<string> = ko.observable('');
    commentDate: KnockoutObservable<any> = ko.observable('');
    avatarPath: KnockoutObservable<string> = ko.observable('');
    visibleNotPresent: KnockoutComputed<boolean> = ko.computed(() => this.activatedStatus() === StatusClassfication.NOT_PRESENT);
    visiblePresent: KnockoutComputed<boolean> = ko.computed(() => this.activatedStatus() === StatusClassfication.PRESENT);
    visibleGoOut: KnockoutComputed<boolean> = ko.computed(() => this.activatedStatus() === StatusClassfication.GO_OUT);
    visibleGoHome: KnockoutComputed<boolean> = ko.computed(() => this.activatedStatus() === StatusClassfication.GO_HOME);
    visibleHoliday: KnockoutComputed<boolean> = ko.computed(() => this.activatedStatus() === StatusClassfication.HOLIDAY);
    favoriteSpecifyData: KnockoutObservableArray<any> = ko.observableArray([]);
    emojiUsage: KnockoutObservable<boolean> = ko.observable(false);
    isBaseDate: KnockoutObservable<boolean> = ko.observable(true);
    isSameOrBeforeBaseDate: KnockoutObservable<boolean> = ko.observable(true);
    isAfter: KnockoutObservable<boolean> = ko.observable(false);
    inCharge: KnockoutObservable<boolean> = ko.observable(true);
    workplaceFromCDL008: KnockoutObservableArray<string> = ko.observableArray([]);
    employeeIdList: KnockoutObservableArray<string> = ko.observableArray([]);
    personalIdList: KnockoutObservableArray<string> = ko.observableArray([]);
    attendanceInformationDtos: KnockoutObservableArray<object.AttendanceInformationDto> = ko.observableArray([]);
    attendanceInformationDtosDisplay: KnockoutObservableArray<AttendanceInformationViewModel> = ko.observableArray([]);
    // attendanceInformationDtosDisplayClone: KnockoutObservableArray<AttendanceInformationViewModel> = ko.observableArray([]);
    listPersonalInfo: KnockoutObservableArray<object.EmployeeBasicImport> = ko.observableArray([]);

    //data for screen E
    goOutParams: KnockoutObservable<GoOutParam> = ko.observable();

    sIdUpdateStatus: KnockoutObservable<string> = ko.observable('');
    indexUpdateItem: KnockoutObservable<number> = ko.observable();

    //Application name
    applicationNameInfo: KnockoutObservableArray<object.ApplicationNameDto> = ko.observableArray([]);
    applicationNameDisplay: KnockoutObservableArray<ApplicationNameViewModel> = ko.observableArray([]);
    applicationNameDisplayBySid: KnockoutObservableArray<string> = ko.observableArray([]);
    loginSid: string = __viewContext.user.employeeId;

    //current selected index of loop
    currentIndex: KnockoutObservable<number> = ko.observable(-1);

    mounted() {
      const vm = this;
      let reloadAvatar: any;
      $('#ccg005-legends').click(() => {
        $('.nts-legendbutton-panel').css('padding', '5px 10px');
        $('.legend-item-symbol').first().css('border', '1px groove').height(16).width(16);
        $('.legend-item').css('margin-bottom', '5px');
      });
      vm.selectedDate(moment().format('YYYYMMDD'));
      vm.toStartScreen();
      vm.initResizeable(vm);
      vm.initPopupArea();
      vm.initPopupStatus();
      vm.initChangeFavorite();
      vm.initFocusA1_4();
      vm.initChangeSelectedDate();
      vm.perPage.subscribe((val: any) => {
        vm.resetPagination();
        vm.getAttendanceData();  // #116839
        // if(val > vm.attendanceInformationDtosDisplayClone().length) {
        //   vm.getAttendanceData(); 
        // }
        // vm.attendanceInformationDtosDisplay(_.slice(vm.attendanceInformationDtosDisplayClone(), vm.startPage() - 1, vm.endPage()));
      });

      vm.attendanceInformationDtosDisplay.subscribe(() => {
        clearTimeout(reloadAvatar);
        reloadAvatar = setTimeout(() => { vm.bindingLoopData(); }, 1);
      });

      (ko.bindingHandlers.ntsIcon as any).init($('.ccg005-status-img-A1_7'), () => ({ no: vm.activityStatusIcon(), width: 20, height: 20 }));

      //focus
      $("#ccg005-selected-date").focus();
    }

    private toStartScreen() {
      const vm = this;
      //set characteristic
      vm.restoreCharacteristic().then((inputDate: any) => {
        vm.$blockui('show');
        vm.$ajax('com', API.getDisplayAttendanceData).then((response: object.DisplayAttendanceDataDto) => {
          vm.emojiUsage(!!response.emojiUsage);
          // A1_2 表示初期の在席データDTO.自分のビジネスネーム
          vm.businessName(response.bussinessName);
          vm.favoriteSpecifyData(response.favoriteSpecifyDto);
          vm.inCharge(response.inCharge);
          if (response && response.attendanceInformationDtos) {
            vm.updateLoginData(response.attendanceInformationDtos);
  
            if (_.isEmpty(vm.favoriteSpecifyData())) {
              vm.createdDefaultFavorite();
            }
          }
          vm.currentPage(1);
          //get application name info
          vm.applicationNameInfo(response.applicationNameDtos);
          //set characteristic
          if (inputDate) {
            vm.favoriteInputDate(inputDate);
          } else {
            vm.favoriteInputDate(vm.favoriteSpecifyData()[0].inputDate);
          }
        }).always(() => vm.$blockui('clear'));
      });
    }

    /**
     * 日付を更新する時
     */
    private initChangeSelectedDate() {

      const vm = this;

      vm.selectedDate.subscribe(() => {

        //fix bug #115338 
        if ((nts.uk.ui.errors as any).getErrorByElement($("#ccg005-selected-date")).length != 0) {
          return;
        }

        const selectedDate = moment(vm.selectedDate()).startOf("day");
        const baseDate = moment().startOf("day");
        vm.isSameOrBeforeBaseDate(selectedDate.isSameOrBefore(baseDate));
        vm.isAfter(selectedDate.isAfter(baseDate));
        vm.isBaseDate(selectedDate.isSame(baseDate));

        // パラメータ「在席情報を取得」
        vm.dataToDisplay();
      });
    }

    /**
     * お気に入りを選択する時
     */
    private initChangeFavorite() {
      const vm = this;
      vm.favoriteInputDate.subscribe((newVal) => {
        if (newVal) {
          vm.saveCharacteristic(newVal);
          vm.subscribeFavorite();
        }
      });
    }


    private initEmojiType(emojiType: number): number {
      switch (emojiType) {
        case EmojiType.WEARY: return Emoji.WEARY;
        case EmojiType.SAD: return Emoji.SAD;
        case EmojiType.AVERAGE: return Emoji.AVERAGE;
        case EmojiType.GOOD: return Emoji.GOOD;
        case EmojiType.HAPPY: return Emoji.HAPPY;
        default: return Emoji.AVERAGE;
      }
    }

    private initActivityStatus(status: number): number {
      switch (status) {
        case StatusClassfication.NOT_PRESENT: return StatusClassficationIcon.NOT_PRESENT;
        case StatusClassfication.PRESENT: return StatusClassficationIcon.PRESENT;
        case StatusClassfication.GO_OUT: return StatusClassficationIcon.GO_OUT;
        case StatusClassfication.GO_HOME: return StatusClassficationIcon.GO_HOME;
        case StatusClassfication.HOLIDAY: return StatusClassficationIcon.HOLIDAY;
        default: return StatusClassficationIcon.GO_OUT;
      }
    }

    private initResizeable(vm: any) {
      $('.widget-container .widget-content.ui-resizable')
        .on('wg.resize', () => {
          vm.onResizeable(vm);
        });
    }

    /**
     * Popup A3_2
     */
    private initPopupArea() {
      const vm = this;
      $('#ccg005-star-popup').ntsPopup({
        position: {
          my: 'left top',
          at: 'left-100 bottom',
          of: $('#ccg005-star-img')
        },
        showOnStart: false,
        dismissible: true
      });
      $('#ccg005-star-img').click(() => $('#ccg005-star-popup').ntsPopup('toggle'));
    }

    /**
     * Popup A4_4
     */
    public initPopupA4_4InList(index: any, sid: string) {
      const vm = this;
      const element = $(`.A4-4-application-icon-${sid}`);
      $('#ccg005-A4-4-popup').ntsPopup({
        position: {
          my: 'left top',
          at: 'right bottom',
          of: element
        },
        showOnStart: false,
        dismissible: true
      });
      $('#ccg005-A4-4-popup').ntsPopup('toggle');
      const appName = _.find(vm.applicationNameDisplay(), (item => item.sid === sid));
      if (appName) {
        vm.applicationNameDisplayBySid(appName.appName);
      }

      //update currentIndex
      vm.currentIndex(index());
    }

    private initFocusA1_4() {
      const vm = this;
      let isDelAble: boolean = false;
      $('.ccg005-clearbtn').hover(
        () => {
         isDelAble = true;
        },
        () => {
          isDelAble = false;
        });

      $('#CCG005-A1_4')
      .focusin(() => $('.ccg005-clearbtn').css('display', 'inline'))
      .focusout(() => {
        $('.ccg005-clearbtn').css('display', 'none');
        if(isDelAble) {
          vm.deleteComment();
        }
      });
    }

    /**
     * Popup A1_7
     */
    private initPopupStatus() {
      const vm = this;
      $('#ccg005-status-popup').ntsPopup({
        position: {},
        showOnStart: false,
        dismissible: true
      });
      $('.ccg005-status-img-A1_7').click(() => {
        vm.currentIndex(-1);
        vm.sIdUpdateStatus(vm.loginSid);
        if (!vm.isBaseDate()) {
          return;
        }
        vm.goOutParams(new GoOutParam({
          sid: vm.loginSid,
          businessName: vm.businessName(),
          goOutDate: moment().format("YYYY/MM/DD")
        }));
        vm.activatedStatus(vm.activityStatus());
        $('#ccg005-status-popup').ntsPopup({
          position: { my: 'right top', at: 'left top', of: $('.ccg005-status-img-A1_7') },
          showOnStart: false,
          dismissible: true
        });
        $('#ccg005-status-popup').ntsPopup('toggle')
        vm.indexUpdateItem(-1);
      });
    }

    /**
     * Popup A4_7
     */
    public initPopupInList(index: any, sid: string, businessName: string) {
      const vm = this;
      const element = $('.ccg005-status-img')[index()];
      vm.indexUpdateItem(index());
      vm.sIdUpdateStatus(sid);
      if (!vm.isBaseDate()) {
        return;
      }
      $('#ccg005-status-popup').ntsPopup({
        position: { my: 'left top', at: 'right top', of: element },
        showOnStart: false,
        dismissible: true
      });
      $('#ccg005-status-popup').ntsPopup('toggle')

      //reset goOutParams to screen E
      vm.goOutParams(new GoOutParam({
        sid: sid,
        businessName: businessName,
        goOutDate: moment().format("YYYY/MM/DD")
      }));

      //update current status
      vm.activatedStatus(vm.attendanceInformationDtosDisplay()[index()].status);

      //set current index
      vm.currentIndex(index());
    }

    private subscribeFavorite() {
      const vm = this;
      const selectedFavorite = _.find(vm.favoriteSpecifyData(), item => item.inputDate === vm.favoriteInputDate());
      if (!selectedFavorite) {
        if (_.isEmpty(vm.favoriteSpecifyData())) {
          vm.createdDefaultFavorite();
        } else {
          vm.favoriteInputDate(vm.favoriteSpecifyData()[0].inputDate);
        }
        return;
      }
      const param: DisplayInfoAfterSelectParam = new DisplayInfoAfterSelectParam({
        baseDate: vm.selectedDate(),
        emojiUsage: vm.emojiUsage(),
        wkspIds: selectedFavorite ? selectedFavorite.workplaceId : []
      });
      vm.$blockui('show');
      vm.clearDataDisplay();
      vm.$ajax('com', API.getDisplayInfoAfterSelect, param).then((res: object.DisplayInformationDto) => {
        vm.dataToDisplay(res);
      })
        .always(() => vm.$blockui('clear'));
    }

    //handle loop by jquery
    private bindingLoopData() {
      const vm = this;
      _.forEach(vm.attendanceInformationDtosDisplay(), (item, index) => {

        //handle avatar
        if (_.isEmpty($(`#ccg005-avatar-change-${item.sid}`).children())) {
          if (item.avatarDto && item.avatarDto.fileId) {
            $(`#ccg005-avatar-change-${item.sid}`)
              .append($("<img/>")
                .attr("id", 'CCG005_A1_1_small')
                .attr("src", (nts.uk.request as any).liveView(item.avatarDto.fileId))
              );
          } else {
            $(`#ccg005-avatar-change-${item.sid}`).ready(() => {
              $(`#ccg005-avatar-change-${item.sid}`).append(
                `<div id='CCG005_no_avatar_small'>
                  <p style="text-align: center; margin: 0 auto; font-size: 12px">
                    ${item.businessName.replace(/\s/g, '').substring(0, 2)}
                  </p>
                </div>`
              );
            });
          }
        }

        //handle status icon
        const element = $('.ccg005-status-img')[index];
        (ko.bindingHandlers.ntsIcon as any).init(element, () => ({ no: vm.initActivityStatus(item.status), width: 20, height: 20 }));
      });
    }

    //handle attendance data for all employee in loop
    private getAttendanceInformationDtosDisplay(res: object.AttendanceInformationDto[]): AttendanceInformationViewModel[] {
      const vm = this;
      const listModel = _.map(res, (item => {
        let businessName = "";
        const personalInfo = _.find(vm.listPersonalInfo(), (emp => emp.employeeId === item.sid));
        if (personalInfo) {
          businessName = personalInfo.businessName;
        }
        const emojiVisitable = item.emojiDto.emojiType !== null;
        return new AttendanceInformationViewModel({
          applicationDtos: item.applicationDtos,
          sid: item.sid,
          attendanceDetailDto: vm.getAttendanceDetailViewModel(item.attendanceDetailDto),
          avatarDto: item.avatarDto,
          activityStatusIconNo: vm.initActivityStatus(item.activityStatusDto),
          status: item.activityStatusDto,
          comment: item.commentDto.comment,
          goOutDto: vm.getGoOutViewModel(item.goOutDto),
          emojiIconNo: vm.initEmojiType(item.emojiDto.emojiType),
          emojiVisitable: emojiVisitable,
          businessName: businessName,
          displayAppIcon: (item.applicationDtos.length > 0),
          backgroundColor: vm.getBackgroundColorClass(item.activityStatusDto)
        });
      }));
      return listModel;
    }

    //handle check-in check-out display
    private getAttendanceDetailViewModel(attendanceDetailDto: any): AttendanceDetailViewModel {
      const vm = this;

      //set color for text
      const workColorClass = vm.getClassNameColor(attendanceDetailDto.workColor);
      const checkOutColorClass = vm.getClassNameColor(attendanceDetailDto.checkOutColor);
      const checkInColorClass = vm.getClassNameColor(attendanceDetailDto.checkInColor);

      //handle ' - '
      const checkOutTime = attendanceDetailDto.checkOutTime === ""  ? "" :  ('- ' + attendanceDetailDto.checkOutTime);

      return new AttendanceDetailViewModel({
        workName: attendanceDetailDto.workName,
        workColorClass: workColorClass,
        checkOutTime: checkOutTime,
        checkOutColorClass: checkOutColorClass,
        checkInTime: attendanceDetailDto.checkInTime,
        checkInColorClass: checkInColorClass,
        workDivision: attendanceDetailDto.workDivision,
      });
    }

    //handle go-out display
    private getGoOutViewModel(goOutDto: object.GoOutEmployeeInformationDto): GoOutEmployeeInformationViewModel {
      const vm = this;
      let period = "";
      if (goOutDto.goOutTime && goOutDto.comebackTime) {
        period = vm.covertNumberToTime(goOutDto.goOutTime) + " - " + vm.covertNumberToTime(goOutDto.comebackTime);
      }
      return new GoOutEmployeeInformationViewModel({
        goOutReason: goOutDto.goOutReason,
        goOutPeriod: period
      });
    }

    //convert time(minutes) to H:mm
    private covertNumberToTime(time: number): string {
      return moment.utc(moment.duration(time, "m").asMilliseconds()).format("H:mm");
    }

    //handle color for workName, checkIn, checkOut
    private getClassNameColor(color: number): string {
      switch (color) {
        case DisplayColor.SCHEDULED:
          return "display-color-scheduled"; //Color = green
        case DisplayColor.ALARM:
          return "display-color-alarm";  //Color = red
        default:
          return "display-color-achievement";  //Color = default
      }
    }

    //handle background color by activity status
    private getBackgroundColorClass(status: number): string {
      const vm = this;

      //fix bug #115227
      if(!vm.isBaseDate()) {
        return "background-color-default";
      }

      switch (status) {
        case StatusClassfication.PRESENT:
          return "background-color-present";  //グリーン（#DDFFDD）
        case StatusClassfication.GO_OUT:
          return "background-color-go-out";  //黄色（#FFE1E1）
        case StatusClassfication.HOLIDAY:
          return "background-color-holiday";  //グレー（#F2F2F2）
        case StatusClassfication.NOT_PRESENT:
        case StatusClassfication.GO_HOME:
        default:
          return "background-color-default";  //白 (none)
      }
    }

    private onResizeable(vm: any) {
      const lineHeight = 47;
      const paddingInContent = 10;
      const subHeight = $('#ccg005-content').height()
        - $('.grade-header-center').height()
        - $('.grade-header-bottom').height()
        - $('.grade-bottom').height()
        - paddingInContent;
      if (subHeight >= lineHeight) {
        vm.perPage(_.floor(subHeight / lineHeight));
      }
      $('.grade-body-bottom').height(subHeight);
    }

    public nextPage() {
      const vm = this;
      if (vm.currentPage() * vm.perPage() < vm.totalElement()) {
        vm.currentPage(vm.currentPage() + 1);
        vm.getAttendanceData(); // #116839
      }
    }

    public previousPage() {
      const vm = this;
      if (vm.currentPage() > 1) {
        vm.currentPage(vm.currentPage() - 1);
        vm.getAttendanceData(); // #116839
      }
    }

    private resetPagination() {
      const vm = this;
      vm.currentPage(1);
      vm.totalElement(vm.listPersonalInfo().length);
    }

    public openScreenCCG005B() {
      const vm = this;
      vm.$window.modal('/view/ccg/005/b/index.xhtml');
    }

    /**
     * A3_2.1をクリックする（お気に入りダイアログを起動する）
     */
    public openScreenCCG005D() {
      const vm = this;
      $('#ccg005-star-popup').ntsPopup('hide');
      vm.$window.modal('/view/ccg/005/d/index.xhtml').then((data) => {
        if (data === undefined) {
          vm.createdDefaultFavorite();
        } else {
          vm.favoriteSpecifyData(data);
        }
        vm.subscribeFavorite();
      });
    }

    /**
     * A1_7.3をクリックする　OR　外出アイコンをクリックする（外出入力ダイアログを起動する）
     */
    public openScreenCCG005E() {
      const vm = this;
      $('#ccg005-status-popup').ntsPopup('hide');
      vm.$window.modal('/view/ccg/005/e/index.xhtml', vm.goOutParams()).then((x: Boolean) => {
        if (x) {
          vm.registerAttendanceStatus(2, 191);
          vm.contentSelected(1);
        }
        vm.dataToDisplay();
      });
    }

    /**
     * A1_7 or A4_7  をクリックする
     */
    public openFutureScreenCCG005E(isLoginUser: boolean, sid: string, businessName: string) {
      const vm = this;
      if (isLoginUser) {
        vm.goOutParams(new GoOutParam({
          sid: __viewContext.user.employeeId,
          businessName: vm.businessName(),
          goOutDate: moment(vm.selectedDate()).format("YYYY/MM/DD")
        }));
      } else {
        vm.goOutParams(new GoOutParam({
          sid: sid,
          businessName: businessName,
          goOutDate: moment(vm.selectedDate()).format("YYYY/MM/DD")
        }));
      }
      vm.$window.modal('/view/ccg/005/e/index.xhtml', vm.goOutParams()).then((x: Boolean) => {
        if (x) {
          vm.registerAttendanceStatus(2, 191);
        }
      });
    }

    /**
     * 顔写真をクリックする（CDL010を起動する）
     */
    public onClickAvatar(sid?: string) {
      const vm = this;
      const data = {
        employeeId: !!sid ? sid : vm.loginSid,
        referenceDate: new Date(),
        startMode: 0
      };
      vm.$window.modal('com', '/view/cdl/010/a/index.xhtml', data);
    }

    public resetLastestData() {
      const vm = this;

      //reset search value
      vm.workplaceNameFromCDL008('');
      vm.searchValue('');

      //reset pagination
      vm.currentPage(1);

      vm.subscribeFavorite();
    }

    private updateLoginData(atds: any) {
      const vm = this;
      // 条件：在席情報DTO.社員ID＝ログイン社員ID
      const atdInfo = _.find(atds, (item: any) => item.sid === vm.loginSid);
      if (!atdInfo) {
        return;
      }
      // A1_1 表示初期の在席データDTO.在席情報DTO.個人の顔写真.顔写真ファイルID
      $(`#${ID_AVATAR_CHANGE}`).empty();
      if (atdInfo.avatarDto && atdInfo.avatarDto.fileId) {
        $(`#${ID_AVATAR_CHANGE}`)
          .append($("<img/>")
            .attr("id", 'CCG005_A1_1')
            .attr("src", (nts.uk.request as any).liveView(atdInfo.avatarDto.fileId))
          );
      } else {
          $(`#${ID_AVATAR_CHANGE}`).ready(() => {
            if( $(`#${ID_AVATAR_CHANGE}`).empty()) {
              $(`#${ID_AVATAR_CHANGE}`).append(
                `<div id='CCG005_no_avatar'>
                  <p style="text-align: center; margin: 0 auto; font-size: 15px">
                    ${vm.businessName().replace(/\s/g, '').substring(0, 2)}
                  </p>
                </div>`
              );
            }
          });
      }
      // 表示初期の在席データDTO.在席情報DTO.在席のステータス
      vm.activityStatus(atdInfo.activityStatusDto);
      // A1_3 表示初期の在席データDTO.在席情報DTO.社員の外出情報.感情種類
      if (atdInfo.emojiDto && atdInfo.emojiDto.emojiType !== null) {
        (ko.bindingHandlers.ntsIcon as any)
          .init($('.ccg005-currentEmoji')[0], () => ({ no: vm.initEmojiType(atdInfo.emojiDto.emojiType), width: 20, height: 30 }));
      }
      //binding activity
      const element = $('.ccg005-status-img-A1_7');
      (ko.bindingHandlers.ntsIcon as any).init(element, () => ({ no: vm.initActivityStatus(atdInfo.activityStatusDto), width: 20, height: 20 }));

      // A1_4
      if (atdInfo.commentDto) {
        vm.originalComment(atdInfo.commentDto.comment);
        vm.comment(atdInfo.commentDto.comment);
        vm.commentDate(atdInfo.commentDto.date);
      }
    }

    private createdDefaultFavorite() {
      const vm = this;
      const inputDate = moment.utc().toISOString();
      const favoriteSpecify = new FavoriteSpecifyData({
        favoriteName: vm.$i18n('CCG005_27'),
        creatorId: vm.loginSid,
        inputDate: inputDate,
        targetSelection: 1,
        workplaceId: [],
        order: 0,
        wkspNames: []
      });
      vm.favoriteSpecifyData([favoriteSpecify]);
    }

    /**
     * コメントを登録する
     */
    public registerComment() {
      const vm = this;
      const command = {
        comment: vm.comment(),
        date: moment.utc().toISOString(),
        sid: vm.loginSid
      };
      vm.$blockui('show');
      vm.$ajax('com', API.registerComment, command)
        .then(() => {
          vm.$dialog.info({ messageId: 'Msg_15' });
          $('#CCG005-A1_4').blur();
        })
        .always(() => vm.$blockui('clear'));
    }

    /**
     * コメントを削除する
     */
    public deleteComment() {
      const vm = this;
      if (_.isEmpty(vm.comment())) {
        return;
      }
      vm.comment('');
      const command = {
        date: moment.utc(vm.commentDate()).toISOString(),
        sid: vm.loginSid
      };
      vm.$blockui('show');
      vm.$ajax('com', API.deleteComment, command)
        .always(() => vm.$blockui('clear'));
    }

    /**
     * A3_2.3職場選択ボタンをクリックする　（職場：CDL008へ）
     */
    public openCDL008() {
      const vm = this;
      const inputCDL008: any = {
        startMode: StartMode.WORKPLACE,
        isMultiple: true,
        showNoSelection: false,
        selectedCodes: vm.workplaceFromCDL008(),
        isShowBaseDate: true,
        baseDate: moment.utc().toISOString(),
        selectedSystemType: SystemType.EMPLOYMENT,
        isrestrictionOfReferenceRange: false
      };
      $('#ccg005-star-popup').ntsPopup('hide');
      setShared('inputCDL008', inputCDL008);
      vm.$window.modal('/view/cdl/008/a/index.xhtml').then(() => {
        if (getShared('CDL008Cancel')) {
          setShared('CDL008Cancel', null);
          return;
        }
        const workplaceInfor = getShared('workplaceInfor');
        vm.workplaceNameFromCDL008(_.map(workplaceInfor, (wkp: any) => wkp.displayName).join('、'));
        // 職場を選択する時
        vm.workplaceFromCDL008(getShared('outputCDL008'));
        const param: DisplayInfoAfterSelectParam = new DisplayInfoAfterSelectParam({
          baseDate: vm.selectedDate(),
          emojiUsage: vm.emojiUsage(),
          wkspIds: vm.workplaceFromCDL008()
        });
        vm.$blockui('show');
        vm.clearDataDisplay();
        vm.$ajax('com', API.getDisplayInfoAfterSelect, param).then((res: object.DisplayInformationDto) => {
          vm.dataToDisplay(res);
        }).always(() => vm.$blockui('clear'));
      });
    }

    /**
     * 検索する時
     */
    public onSearchEmployee() {
      const vm = this;
      let reloadAvatar: any;
      if (vm.searchValue().trim().length > 0) {
        const param = {
          keyWorks: vm.searchValue(),
          baseDate: vm.selectedDate(),
          emojiUsage: vm.emojiUsage()
        };
        $('#ccg005-star-popup').ntsPopup('hide');
        vm.$blockui('show');
        vm.$ajax('com', API.searchForEmployee, param)
          .then((res: object.DisplayInformationDto) => {
            vm.dataToDisplay(res);
          })
          .always(() => vm.$blockui('clear'));
      }
    }

    private clearDataDisplay() {
      const vm = this;
      vm.totalElement(0);
      vm.attendanceInformationDtos([]);
      vm.attendanceInformationDtosDisplay([]);
      // vm.attendanceInformationDtosDisplayClone([]);
    }

    private dataToDisplay(res?: object.DisplayInformationDto) {
      const vm = this;

      vm.onResizeable(vm);

      if (!res) {
        res = { listPersonalInfo: vm.listPersonalInfo() };
      }
      vm.totalElement(res.listPersonalInfo.length);
      vm.getAttendanceData(res.listPersonalInfo);
    }

    private getAttendanceData(listPersonalInfo?: object.EmployeeBasicImport[]) {

      const vm = this;

      if (!listPersonalInfo) {
        listPersonalInfo = vm.listPersonalInfo();
      }

      const availEmp = _.slice(listPersonalInfo, vm.startPage() - 1, vm.endPage()); // #116839
      const empIds = _.map(availEmp, (person: object.EmployeeBasicImport) => {
        return {
          sid: person.employeeId,
          pid: person.personalId
        };
      });

      const param = {
        empIds: empIds,
        baseDate: vm.selectedDate(),
        emojiUsage: vm.emojiUsage()
      }

      vm.$blockui('show');
      vm.$ajax('com', API.getAttendanceInformation, param).then((response: object.AttendanceInformationDto[]) => {

        vm.updateLoginData(response);
        response = _.filter(response, item => item.sid !== vm.loginSid);
        vm.attendanceInformationDtos(response);
        vm.listPersonalInfo(listPersonalInfo);
  
        //set data view model to set data on screen
        const display = vm.getAttendanceInformationDtosDisplay(response);
        
        if (display.length > vm.perPage()) {
          vm.attendanceInformationDtosDisplay(_.slice(display, 0, vm.perPage()));
        } else {
          vm.attendanceInformationDtosDisplay(display);
        }

        // vm.attendanceInformationDtosDisplayClone(display);
  
        //handle application display
        const data = response;
        const appNames: object.ApplicationNameDto[] = vm.applicationNameInfo();
        const appModel = _.map(data, ((attendanceInfo: object.AttendanceInformationDto) => {
          const applicationDtos: object.ApplicationDto[] = attendanceInfo.applicationDtos;
          const appName1 = _.map(applicationDtos, (appDto => {
            const app = _.find(appNames, (appName => (appDto.appType === appName.appType && appDto.otherType === appName.otherType)));
            if (app) {
              return app.appName;
            }
            return undefined;
          }));
          return new ApplicationNameViewModel({
            sid: attendanceInfo.sid,
            appName: _.filter(appName1, (item => item !== undefined))
          });
        }));
        vm.applicationNameDisplay(appModel);
        vm.onResizeable(vm);
      })
      .always(() => vm.$blockui('hide'));
    }

    /**
     * 在席のステータスを登録する
     */
    private registerAttendanceStatus(selectedStatus: number, activityStatusIcon: number) {
      const vm = this;
      const params: ActivityStatusParam = {
        activity: selectedStatus,
        sid: vm.sIdUpdateStatus(),
        date: moment(moment(new Date()).format("YYYY/MM/DD"))
      }
      vm.$ajax(API.saveStatus, params).then(() => {
        $('#ccg005-status-popup').ntsPopup('hide');
        if (selectedStatus !== StatusClassfication.GO_OUT) {
          if (vm.indexUpdateItem() > -1) {
            //This case for now
            const element = $('.ccg005-status-img')[vm.indexUpdateItem()];
            (ko.bindingHandlers.ntsIcon as any).init(element, () => ({ no: activityStatusIcon, width: 20, height: 20 }));
          } else {
            (ko.bindingHandlers.ntsIcon as any).init($('.ccg005-status-img-A1_7'), () => ({ no: activityStatusIcon, width: 20, height: 20 }));
          }
        }
      });

      if (selectedStatus !== StatusClassfication.GO_OUT) {
        //update view model
        if (vm.currentIndex() !== -1) {
          //This case for now
          vm.attendanceInformationDtosDisplay()[vm.currentIndex()].status = selectedStatus;
          const newBgClass = vm.getBackgroundColorClass(selectedStatus);
          $('.ccg005-tr-background')[vm.currentIndex()].id = newBgClass;

          //This case for change page or resize
          const updateSid = vm.attendanceInformationDtosDisplay()[vm.currentIndex()].sid;
          _.map(vm.attendanceInformationDtosDisplay(), (item) => {
            if(item.sid === updateSid) {
              item.status = selectedStatus;
              item.backgroundColor = vm.getBackgroundColorClass(selectedStatus);
            }
          });
          ko.applyBindings(vm, $('.ccg005-tr-background')[vm.currentIndex()]);
        } else {
          vm.activityStatus(selectedStatus);
        }
      }
    }

    private saveCharacteristic(inputDateTime: any): void {
      (nts.uk as any).characteristics.save("ccg005Favorite"
        + "_companyId_" + __viewContext.user.companyId
        + "_userId_" + __viewContext.user.employeeId, inputDateTime);
    }

    private restoreCharacteristic(): JQueryPromise<any> {
      return (nts.uk as any).characteristics.restore("ccg005Favorite"
        + "_companyId_" + __viewContext.user.companyId
        + "_userId_" + __viewContext.user.employeeId);
    }
  }

  enum StartMode {
    WORKPLACE = 0,
    DEPARTMENT = 1
  }

  enum SystemType {
    PERSONAL_INFORMATION = 1,
    EMPLOYMENT = 2,
    SALARY = 3,
    HUMAN_RESOURCES = 4,
    ADMINISTRATOR = 5
  }

  enum EmojiType {
    WEARY = 0, // どんより: アイコン#189
    SAD = 1, // ゆううつ: アイコン#188
    AVERAGE = 2, // 普通: アイコン#187
    GOOD = 3, // ぼちぼち: アイコン#186
    HAPPY = 4 // いい感じ: アイコン#185
  }

  enum Emoji {
    WEARY = 189, // どんより: アイコン#189
    SAD = 188, // ゆううつ: アイコン#188
    AVERAGE = 187, // 普通: アイコン#187
    GOOD = 186, // ぼちぼち: アイコン#186
    HAPPY = 185 // いい感じ: アイコン#185
  }

  enum StatusClassfication {
    NOT_PRESENT = 0, // 未出社: アイコン#196
    PRESENT = 1, // 在席: アイコン#195
    GO_OUT = 2, // 外出: アイコン#191
    GO_HOME = 3, // 帰宅: アイコン#196
    HOLIDAY = 4 // 休み: アイコン#197
  }

  enum StatusClassficationIcon {
    NOT_PRESENT = 196, // 未出社: アイコン#196
    PRESENT = 195, // 在席: アイコン#195
    GO_OUT = 191, // 外出: アイコン#191
    GO_HOME = 196, // 帰宅: アイコン#196
    HOLIDAY = 197 // 休み: アイコン#197
  }

  // 表示色区分
  enum DisplayColor {
    ACHIEVEMENT = 0, // 実績色
    SCHEDULED = 1, // 予定色
    ALARM = 2 // アラーム色
  }

  class FavoriteSpecifyData {
    favoriteName: string;
    creatorId: string;
    inputDate: string;
    targetSelection: number;
    workplaceId: string[];
    order: number;
    wkspNames: string[];

    constructor(init?: Partial<FavoriteSpecifyData>) {
      $.extend(this, init);
    }
  }

  class DisplayInfoAfterSelectParam {
    wkspIds: string[];
    baseDate: any;
    emojiUsage: boolean;

    constructor(init?: DisplayInfoAfterSelectParam) {
      $.extend(this, init);
    }
  }

  class GoOutParam {
    sid: string;
    businessName: string;
    goOutDate: string;

    constructor(init?: Partial<GoOutParam>) {
      $.extend(this, init);
    }
  }

  class AttendanceInformationViewModel {
    applicationDtos: any[];
    sid: string;
    attendanceDetailDto: AttendanceDetailViewModel;
    avatarDto: object.UserAvatarDto;
    activityStatusIconNo: number;
    status: number;
    comment: string;
    goOutDto: GoOutEmployeeInformationViewModel;
    emojiIconNo: number;
    emojiVisitable: boolean;
    businessName: string;
    displayAppIcon: boolean;
    backgroundColor: string;

    constructor(init?: Partial<AttendanceInformationViewModel>) {
      $.extend(this, init);
    }
  }

  class ActivityStatusParam {
    activity: number; // ステータス分類
    date: any; // 年月日
    sid: string; // 社員ID

    constructor(init?: Partial<GoOutEmployeeInformationViewModel>) {
      $.extend(this, init);
    }
  }

  class GoOutEmployeeInformationViewModel {
    goOutPeriod: string;
    goOutReason: string;

    constructor(init?: Partial<GoOutEmployeeInformationViewModel>) {
      $.extend(this, init);
    }
  }

  class AttendanceDetailViewModel {
    workName: string; // 勤務名
    workColorClass: string;
    checkOutTime: string; // 終了時刻
    checkOutColorClass: string;
    checkInTime: string; // 開始時刻
    checkInColorClass: string;
    workDivision: number; // 勤務区分
    constructor(init?: Partial<AttendanceDetailViewModel>) {
      $.extend(this, init);
    }
  }

  class ApplicationNameViewModel {
    sid: string;
    appName: string[];
    constructor(init?: Partial<ApplicationNameViewModel>) {
      $.extend(this, init);
    }
  }
}
