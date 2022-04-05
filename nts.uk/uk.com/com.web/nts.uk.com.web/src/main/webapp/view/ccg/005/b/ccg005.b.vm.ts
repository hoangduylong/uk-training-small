/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />
module nts.uk.at.view.ccg005.b.screenModel {

  const API = {
    getPermissionSettings: "screen/com/ccg005/get-permission-settings",
    save: "ctx/office/reference/auth/save",
  }
  @bean()
  export class ViewModel extends ko.ViewModel {
    listDataMulti: KnockoutObservableArray<any> = ko.observableArray([]);
    isEnable: KnockoutObservable<boolean> = ko.observable(true);
    isEditable: KnockoutObservable<boolean> = ko.observable(false);
    isRequired: KnockoutObservable<boolean> = ko.observable(false);
    selectFirstIfNull: KnockoutObservable<boolean> = ko.observable(false);

    selectedRole: KnockoutObservable<string> = ko.observable();
    cId: KnockoutObservable<string> = ko.observable("");

    lstRole: KnockoutObservableArray<RoleDto> = ko.observableArray([]);
    listJobTitle: KnockoutObservableArray<JobTitleExport> = ko.observableArray([]);
    listSpecifyAuthInquiry: KnockoutObservableArray<SpecifyAuthInquiry> = ko.observableArray([]);
    listJobDataSource: KnockoutObservableArray<any> = ko.observableArray([]);

    columns: KnockoutObservableArray<any> = ko.observableArray([
      { headerText: this.$i18n("CCG005_5"), key: "name", width: 130 },
      { headerText: 'code', key: "roleId", hidden: true },
    ]);

    mounted() {
      const vm = this;
      vm.callData();
      vm.selectedRole.subscribe((newValue) => {
        if ($("#grid").data("igGrid")) {
          $("#grid").ntsGrid("destroy");
        }
        vm.initGrid(newValue);
      });
    }

    private callData() {
      const vm = this;
      vm.$blockui("grayout");
      vm.$ajax(API.getPermissionSettings).then((data: PermissionSettingDto) => {
        if(_.isEmpty(data.role)) {
          return vm.$dialog.error({messageId: 'Msg_2078'}).then(() => vm.$window.close());
        }
        if(_.isEmpty(data.jobTitle)) {
          return vm.$dialog.error({messageId: 'Msg_2079'}).then(() => vm.$window.close());
        }
        vm.lstRole(data.role);
        vm.listJobTitle(data.jobTitle);
        vm.listSpecifyAuthInquiry(data.specifyAuthInquiry);
        if (!vm.selectedRole()) {
          const selectedRoleId = data.role[0].roleId;
          vm.selectedRole(selectedRoleId);
          vm.initGrid(selectedRoleId);
        }
        vm.$blockui("clear");
      })
      .always(() => vm.$blockui("clear"));
    }

    private initGrid(selectedRole: string) {
      const vm = this;
      const currentAuth = _.find(vm.listSpecifyAuthInquiry(), (auth => auth.employmentRoleId === selectedRole));

      const jobGridDataSource = _.map(vm.listJobTitle(), job => {
        if (currentAuth) {
          return { jobTitleId: job.jobTitleId, flag: currentAuth.positionIdSeen.some(item => item === job.jobTitleId), jobTitleName: job.jobTitleName }
        }
        return { jobTitleId: job.jobTitleId, flag: false, jobTitleName: job.jobTitleName }
      });
      vm.listJobDataSource(jobGridDataSource);

      $("#grid").ntsGrid({
        width: "240px",
        height: "240px",
        dataSource: vm.listJobDataSource(),
        primaryKey: "jobTitleId",
        virtualization: true,
        rowVirtualization: true,
        virtualizationMode: "continuous",
        columns: [
          { headerText: "ID", key: "jobTitleId", dataType: "string", width: "50px", hidden: true },
          {
            headerText: vm.$i18n("CCG005_7"),
            key: "flag",
            dataType: "boolean",
            width: "65px",
            ntsControl: "Checkbox",
            columnCssClass: "center-align-for-ccg005-b"
          },
          {
            headerText: vm.$i18n("CCG005_6"),
            key: "jobTitleName",
            dataType: "string",
            width: "175px",
          }
        ],
        features: [{ name: "Sorting", type: "local" }],
        ntsControls: [
          {
            name: "Checkbox",
            options: { value: 1, text: "" },
            optionsValue: "value",
            optionsText: "text",
            controlType: "CheckBox",
            enable: true,
          }
        ]
      });
    }

    public onClickCancel() {
      this.$window.close();
    }

    public onClickSave() {
      const vm = this;
      vm.$validate().then((valid: boolean) => {
        if(valid) {

          const currentPositionIdSeen = _.map(vm.listJobDataSource(), dataSource => dataSource.flag ? dataSource.jobTitleId : null)
            .filter(item => item !== null);

          const auth = new SpecifyAuthInquiryCommand({
            cid: __viewContext.user.companyId,
            employmentRoleId: vm.selectedRole(),
            positionIdSeen: currentPositionIdSeen
          })

          vm.$blockui("grayout");
          vm.$ajax(API.save, auth).then(() => {
            vm.callData();
            vm.$blockui("clear");
            return vm.$dialog.info({ messageId: "Msg_15" });
          })
          .always(() => vm.$blockui("clear"));
        }
      });
    }
  }

  interface PermissionSettingDto {
    //	List<在席照会で参照できる権限の指定>
    specifyAuthInquiry: SpecifyAuthInquiry[];

    //	List<ロール>
    role: RoleDto[];

    //	List<職位情報>
    jobTitle: JobTitleExport[];
  }

  interface SpecifyAuthInquiry {
    // 会社ID
    cid: string;

    // 就業ロールID
    employmentRoleId: string;

    // 見られる職位ID
    positionIdSeen: string[];
  }

  interface RoleDto {
    /** The role id. */
    // Id
    roleId: string;

    /** The role code. */
    // コード
    roleCode: string;

    /** The role type. */
    // ロール種類
    roleType: string;

    /** The employee reference range. */
    // 参照範囲
    employeeReferenceRange: string;

    /** The name. */
    // ロール名称
    name: string;

    /** The contract code. */
    // 契約コード
    contractCode: string;

    /** The assign atr. */
    // 担当区分
    assignAtr: string;

    /** The company id. */
    // 会社ID
    companyId: string;
  }

  interface JobTitleExport {
    /** The company id. */
    companyId: string;

    /** The job title id. */
    jobTitleId: string;

    /** The job title code. */
    jobTitleCode: string;

    /** The job title name. */
    jobTitleName: string;

    /** The sequence code. */
    sequenceCode: string;

    /** The start date. */
    startDate: string;

    /** The end date. */
    endDate: string;

    /** The is manager. #100055*/
    isManager: boolean;
  }

  class SpecifyAuthInquiryCommand {
    // 会社ID
    cid: string;

    // 就業ロールID
    employmentRoleId: string;

    // 見られる職位ID
    positionIdSeen: string[];

    constructor(init?: Partial<SpecifyAuthInquiryCommand>) {
      $.extend(this, init);
    }
  }
}
