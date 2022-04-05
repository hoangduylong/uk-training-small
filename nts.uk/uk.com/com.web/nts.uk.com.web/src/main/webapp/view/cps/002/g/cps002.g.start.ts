
module cps002.g {
    let __viewContext: any = window['__viewContext'] || {};
    __viewContext.ready(() => {
        __viewContext['viewModel'] = new vm.ViewModel();
        __viewContext['viewModel'].start().done(() => {
            __viewContext.bind(__viewContext['viewModel']);
            $("#multiList_headers th:first-child").append(nts.uk.resource.getText("CPS002_74"));
            $("#empInitGroup").focus();
        });
    });
}