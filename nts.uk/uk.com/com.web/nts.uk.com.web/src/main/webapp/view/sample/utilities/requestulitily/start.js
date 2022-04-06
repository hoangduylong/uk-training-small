var ScreenModel = /** @class */ (function () {
    function ScreenModel() {
        this.asyncTask = new AsyncTask();
    }
    ScreenModel.prototype.exportFile = function () {
        nts.uk.request.exportFile('/sample/report/generate', { value: 'abc' }).done(function () {
            console.log('DONE!!');
        });
    };
    return ScreenModel;
}());
var AsyncTask = /** @class */ (function () {
    function AsyncTask() {
    }
    AsyncTask.prototype.run = function () {
        var _this = this;
        var self = this;
        nts.uk.request.ajax('/sample/asynccmd/test').done(function (info) {
            self.taskId = info.id;
            nts.uk.deferred.repeat(function (conf) { return conf
                .task(function () {
                return nts.uk.request.asyncTask.getInfo(_this.taskId).done(function (res) {
                    console.log(res.status);
                });
            })
                .while(function (info) { return info.pending || info.running; })
                .pause(1000); });
        });
    };
    AsyncTask.prototype.cancel = function () {
        nts.uk.request.asyncTask.requestToCancel(this.taskId);
    };
    return AsyncTask;
}());
__viewContext.ready(function () {
    this.transferred.ifPresent(function (data) {
        console.log(data);
    });
    this.bind(new ScreenModel());
});
//# sourceMappingURL=start.js.map