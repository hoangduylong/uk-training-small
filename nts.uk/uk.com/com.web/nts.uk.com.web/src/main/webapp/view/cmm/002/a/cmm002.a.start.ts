module nts.uk.com.view.cmm002.a {
	__viewContext.ready(function() {
		$("#contents-area").css("display", "");
	    var screenModel = new cmm002.a.ViewModel();
	    screenModel.start().done(function(){
	        __viewContext.bind(screenModel);
	    });
	});
}
   