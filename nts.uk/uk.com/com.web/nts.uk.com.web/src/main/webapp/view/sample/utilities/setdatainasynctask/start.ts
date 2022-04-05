__viewContext.ready(function () {

    $("#start").click(function(){
        
        nts.uk.request.ajax("loadresource1/test").done(function(res){
        });
    })
//    function checkFinished(taskid){
//       return  nts.uk.request.specials.getAsyncTaskInfo(taskid);
//    }
});