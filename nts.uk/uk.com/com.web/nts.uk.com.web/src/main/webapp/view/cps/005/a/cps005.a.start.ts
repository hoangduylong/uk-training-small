module nts.uk.com.view.cps005.a {
    __viewContext.ready(function() {
        __viewContext['screenModel'] = new viewmodel.ScreenModel();
        let vm: any = __viewContext['screenModel'];
        vm.startPage().done(function() {
            __viewContext.bind(vm);
            ko.computed(function() {
                vm.isEnableButtonProceedA(nts.uk.ui._viewModel.errors.isEmpty() && vm.currentData().isEnableButtonProceed());
            });
        });
    });
}