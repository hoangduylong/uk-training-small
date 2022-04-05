__viewContext.ready(function() {
    var screenModel = new sample.sidebar.viewmodel.ScreenModel();
    
    $("#sidebar").ntsSideBar("init", {
        activate: (event, info) => {
            console.log(info);
        }
    });
    
    __viewContext.bind(screenModel);
});