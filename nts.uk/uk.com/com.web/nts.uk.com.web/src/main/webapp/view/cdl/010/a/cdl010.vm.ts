/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />
module nts.uk.at.view.cdl010.a.screenModel {

  const API = {
    getContactInfomation: 'query/refercontactinfor/get'
  };

  @bean()
  export class ViewModel extends ko.ViewModel {

    detailData: KnockoutObservable<ContactInformationRefer> = ko.observable(new ContactInformationRefer());
    otherContact: KnockoutObservableArray<OtherContact> = ko.observableArray([]);

    created(param: ObjectParam) {
      const vm = this;
      vm.$blockui('grayout');
      vm.$ajax('com', API.getContactInfomation, { employeeId: param.employeeId, startMode: param.startMode })
      .then((detailData: ContactInformationRefer) => {
        if (detailData && detailData.contactInformation) {
          const companyEmailAddress = detailData.contactInformation.companyEmailAddress;
          const companyMobileEmailAddress = detailData.contactInformation.companyMobileEmailAddress;
          const personalEmailAddress = detailData.contactInformation.personalEmailAddress;
          const personalMobileEmailAddress = detailData.contactInformation.personalMobileEmailAddress;
          detailData.contactInformation.companyEmailAddress = _.isEmpty(companyEmailAddress)
            ? '' : `<a href="mailto:${companyEmailAddress}"><span class="limited-label">${companyEmailAddress}</span></a>`;
          detailData.contactInformation.companyMobileEmailAddress = _.isEmpty(companyMobileEmailAddress)
            ? '' : `<a href="mailto:${companyMobileEmailAddress}"><span class="limited-label">${companyMobileEmailAddress}</span></a>`;
          detailData.contactInformation.personalEmailAddress = _.isEmpty(personalEmailAddress)
            ? '' : `<a href="mailto:${personalEmailAddress}"><span class="limited-label">${personalEmailAddress}</span></a>`;
          detailData.contactInformation.personalMobileEmailAddress = _.isEmpty(personalMobileEmailAddress)
            ? '' : `<a href="mailto:${personalMobileEmailAddress}"><span class="limited-label">${personalMobileEmailAddress}</span></a>`;
          vm.otherContact(detailData.contactInformation.otherContactsInfomation);
        }
        vm.detailData(detailData);
      })
      .fail(() => vm.$blockui('clear'))
      .always(() => {
        const contentHeight = $('#content-cdl010').height();
        nts.uk.ui.windows.getSelf().setHeight(contentHeight + 110);
        vm.$blockui('clear');
      });
    }

    closeDialog() {
      const vm = this;
      vm.$window.close();
    }

  }

  class ObjectParam {
    employeeId: string;
    referenceDate: any;
    startMode: number;
  }

  /** ???????????????????????? */
  class ContactInformationRefer {
    /** ????????????????????? */
    businessName: string = '';
    /** ???????????????DTO */
    contactInformation: ContactInformation = new ContactInformation();
    /** ????????? */
    employmentName: string = '';
    /** ????????? */
    workplaceName: string = '';
    /** ????????? */
    classificationName: string = '';
    /** ????????? */
    jobTitleName: string = '';

    constructor(init?: Partial<ContactInformationRefer>) {
      $.extend(this, init);
    }
  }

  class ContactInformation {
    /** ??????????????????????????? */
    companyMobilePhoneNumber: string = '';
    /** ??????????????????????????? */
    personalMobilePhoneNumber: string = '';
    /** ?????????????????? */
    emergencyNumber1: string = '';
    /** ?????????????????? */
    emergencyNumber2: string = '';
    /** ???????????????????????? */
    seatDialIn: string = '';
    /** ?????????????????? */
    seatExtensionNumber: string = '';
    /** ?????????????????????????????? */
    companyEmailAddress: string = '';
    /** ???????????????????????????????????? */
    companyMobileEmailAddress: string = '';
    /** ?????????????????????????????? */
    personalEmailAddress: string = '';
    /** ???????????????????????????????????? */
    personalMobileEmailAddress: string = '';
    /** ???????????? + ????????????????????? */
    otherContactsInfomation: OtherContact[] = [];

    constructor(init?: Partial<ContactInformation>) {
      $.extend(this, init);
    }
  }

  class OtherContact {
    /** ???????????? */
    contactName: string = '';
    /** ????????????????????? */
    contactAddress: string = '';

    constructor(init?: Partial<OtherContact>) {
      $.extend(this, init);
    }
  }

}
