class ScreenModel {
    asyncTask = new AsyncTask();
    
    exportFile() {
        nts.uk.request.exportFile('/sample/report/generate', { value: 'abc' }).done(() => {
            console.log('DONE!!');
        });
    }
}

class AsyncTask {
    taskId: string;
    
    run() {
        var self = this;
        nts.uk.request.ajax('/sample/asynccmd/test').done(info => {
            self.taskId = info.id;
        
            nts.uk.deferred.repeat(conf => conf
                .task(() => {
                    return nts.uk.request.asyncTask.getInfo(this.taskId).done(res => {
                        console.log(res.status);
                    });
                })
                .while(info => info.pending || info.running)
                .pause(1000));
        });
            
    }
    
    cancel() {
        nts.uk.request.asyncTask.requestToCancel(this.taskId);
    }
}
    
__viewContext.ready(function () {


    this.transferred.ifPresent(data => {
        console.log(data);
    });
    
    this.bind(new ScreenModel());
    
});