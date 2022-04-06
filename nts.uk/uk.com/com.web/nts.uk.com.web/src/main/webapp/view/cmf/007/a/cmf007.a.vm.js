var cmf007;
(function (cmf007) {
    var a;
    (function (a) {
        var viewmodel;
        (function (viewmodel) {
            var block = nts.uk.ui.block;
            var ScreenModel = /** @class */ (function () {
                function ScreenModel() {
                    this.multiDate = ko.observable(true);
                    this.dateSingle = ko.observable(null);
                    this.datePeriod = ko.observable({});
                    var self = this;
                    var today = new Date();
                    var dd = today.getDate();
                    self.dateSingle = ko.observable(new Date());
                    self.dateValue = ko.observable({});
                    self.startDateString = ko.observable("");
                    self.endDateString = ko.observable("");
                    self.timeSingle = ko.observable(moment(new Date()).format('YYYY/MM/DD HH:MM'));
                    self.start = ko.observable(moment(new Date()).format('YYYY/MM/DD HH:MM'));
                    self.end = ko.observable(moment(new Date()).format('YYYY/MM/DD HH:MM'));
                }
                ScreenModel.prototype.startPage = function () {
                    var self = this;
                    var dfd = $.Deferred();
                    self.multiDate.subscribe(function (value) {
                        nts.uk.ui.errors.clearAll();
                        /*if(value){
                            //self.datePeriod({ startDate: self.dateSingle(), endDate: self.dateSingle() });
                            self.start(self.timeSingle());
                        } else {
                            //self.dateSingle(self.datePeriod().startDate);
                            self.timeSingle(self.start());
                        }*/
                    });
                    dfd.resolve();
                    return dfd.promise();
                };
                ScreenModel.prototype.download = function () {
                    var self = this;
                    var startDate = "";
                    var endDate = "";
                    if (self.multiDate()) {
                        //startDate = self.datePeriod().startDate;
                        //endDate = self.datePeriod().endDate;
                        startDate = self.start();
                        endDate = self.end();
                    }
                    else {
                        //startDate = self.dateSingle();
                        //endDate = self.dateSingle();
                        startDate = self.timeSingle();
                        endDate = self.timeSingle();
                    }
                    if (startDate != '') {
                        block.invisible();
                        nts.uk.request.exportLog({ start: moment(startDate).utc().format(), end: moment(endDate).utc().format() }).done(function (data) {
                            block.clear();
                        }).fail(function (data) {
                            block.clear();
                        });
                    }
                };
                return ScreenModel;
            }());
            viewmodel.ScreenModel = ScreenModel;
        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
    })(a = cmf007.a || (cmf007.a = {}));
})(cmf007 || (cmf007 = {}));
//# sourceMappingURL=cmf007.a.vm.js.map