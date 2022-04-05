module cps003.c {
    __viewContext.ready(function() {
        __viewContext.viewModel = new vm.ScreenModel();
        __viewContext.viewModel.start();
        setTimeout(() => {
			__viewContext.bind(__viewContext.viewModel);
		}, 100);
    });
}