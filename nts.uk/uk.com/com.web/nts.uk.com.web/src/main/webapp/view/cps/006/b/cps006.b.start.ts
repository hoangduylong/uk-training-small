module nts.uk.com.view.cps006.b {
    __viewContext.ready(function() {
        __viewContext['screenModel'] = new viewmodel.ScreenModel();
        __viewContext['screenModel'].start().done(function() {
            __viewContext.bind(__viewContext['screenModel']);
            $("#itemName").focus();
        });

    });
}

//$(function() {
//    $(document).on('click', '.search-btn', function(evt) {
//        let dataSoureFilter: Array<any> = $("#B1_3").igGrid("option", "dataSource");
//        if(dataSoureFilter.length > 0){
//            __viewContext['screenModel'].currentSelectId(dataSoureFilter[0].id);
//        }
//    });
//
//    $(document).on('click', '.clear-btn', function(evt) {
//
//
//    });
//})