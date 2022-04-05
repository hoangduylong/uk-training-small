///<reference path='../../../../lib/nittsu/viewcontext.d.ts' />
module nts.uk.at.view.cdl010.test.screenModel {

  @bean()
  export class ViewModel extends ko.ViewModel {
    employeeId: KnockoutObservable<string> = ko.observable('');
    
    mounted() {
      $('#employeeId').focus();
    }

    openDialog() {
      const vm = this;
      if (_.isEmpty(vm.employeeId())) {
        return;
      }
      const data = {
        employeeId: vm.employeeId(),
        referenceDate: new Date(),
      };
      vm.$window.modal('com', '/view/cdl/010/a/index.xhtml', data);
    }
  }
}
