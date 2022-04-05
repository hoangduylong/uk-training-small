module nts.uk.hr.view.ccg029.a {
    __viewContext.ready(function() {
        var screenModel =  __viewContext.vm = new viewmodel.ScreenModel(undefined, function (data) {
            console.log(data);
        });
        screenModel.startPage().done(function() {
            __viewContext.bind(screenModel);
        });
    });
}