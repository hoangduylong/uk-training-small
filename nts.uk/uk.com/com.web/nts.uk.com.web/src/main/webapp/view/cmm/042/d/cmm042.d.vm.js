var cmm042;
(function (cmm042) {
    var d;
    (function (d_1) {
        var viewmodel;
        (function (viewmodel) {
            var setShared = nts.uk.ui.windows.setShared;
            var getShared = nts.uk.ui.windows.getShared;
            var close = nts.uk.ui.windows.close;
            var __viewContext = window['__viewContext'] || {}, block = window["nts"]["uk"]["ui"]["block"]["grayout"], unblock = window["nts"]["uk"]["ui"]["block"]["clear"], invisible = window["nts"]["uk"]["ui"]["block"]["invisible"];
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                    this.locations = ko.observableArray([]);
                    this.location = ko.observable(new Location({ id: '', code: null, name: null }));
                    this.idSelected = '';
                    this.dataShare = null;
                    var self = this, location = self.location(), locations = self.locations;
                    self.dataShare = getShared('CMM042D_PARAM');
                    location.id.subscribe(function (id) {
                        if (id) {
                            console.log(id);
                            self.idSelected = id;
                        }
                        else {
                            console.log('id undefined');
                        }
                    });
                    self.start();
                }
                ViewModel.prototype.start = function () {
                    var self = this, dfd = $.Deferred(), location = self.location(), locations = self.locations;
                    // get all Setting
                    locations.removeAll();
                    var _data = [];
                    for (i = 0; i < 30; i++) {
                        var obj = {
                            id: nts.uk.util.randomId(),
                            name: 'location ' + i,
                            code: '00000' + i
                        };
                        _data.push(obj);
                    }
                    _.each(_data, function (d) { return locations.push(d); });
                    console.log('start');
                    location.id(_data[0].id);
                    location.id.valueHasMutated();
                    dfd.resolve();
                    return dfd.promise();
                };
                ViewModel.prototype.pushDataToAScreen = function () {
                    var self = this, location = self.location(), locations = self.locations();
                    if (nts.uk.ui.errors.hasError()) {
                        return;
                    }
                    var objSelected = _.find(locations, function (o) { return o.id == self.idSelected; });
                    setShared('CMM042D_VALUE', objSelected);
                    close();
                };
                ViewModel.prototype.close = function () {
                    close();
                };
                return ViewModel;
            }());
            viewmodel.ViewModel = ViewModel;
            var Location = /** @class */ (function () {
                function Location(param) {
                    this.id = ko.observable('');
                    this.code = ko.observable('');
                    this.name = ko.observable('');
                    var self = this;
                    if (param) {
                        self.id(param.id || '');
                        self.code(param.code || '');
                        self.name(param.name || '');
                    }
                }
                return Location;
            }());
        })(viewmodel = d_1.viewmodel || (d_1.viewmodel = {}));
    })(d = cmm042.d || (cmm042.d = {}));
})(cmm042 || (cmm042 = {}));
//# sourceMappingURL=cmm042.d.vm.js.map