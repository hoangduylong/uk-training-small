var cmm042;
(function (cmm042) {
    var f;
    (function (f) {
        var viewmodel;
        (function (viewmodel) {
            var setShared = nts.uk.ui.windows.setShared;
            var close = nts.uk.ui.windows.close;
            var __viewContext = window['__viewContext'] || {}, block = window["nts"]["uk"]["ui"]["block"]["grayout"], unblock = window["nts"]["uk"]["ui"]["block"]["clear"], invisible = window["nts"]["uk"]["ui"]["block"]["invisible"];
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                    this.modems = ko.observableArray([]);
                    this.modem = ko.observable(new Modem({ id: '', code: null, name: null, commandCode: null }));
                    this.idSelected = '';
                    var self = this, modem = self.modem(), modems = self.modems;
                    modem.id.subscribe(function (id) {
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
                    var self = this, dfd = $.Deferred(), modem = self.modem(), modems = self.modems;
                    // get all Setting
                    modems.removeAll();
                    var _data = [];
                    var obj1 = {
                        id: '1',
                        name: 'NEC COMSTARZ MULTI 144 ',
                        code: '1',
                        commandCode: 'ATQ0V0E0&D2X0&S0%C1&W'
                    };
                    var obj2 = {
                        id: '2',
                        name: 'NEC COMSTARZ MULTI 336 ',
                        code: '2',
                        commandCode: 'ATQ0V0E0&D2X0\N6\Q0&S0%X0%C1&W'
                    };
                    var obj3 = {
                        id: '3',
                        name: 'NEC COMSTARZ MULTI 560 ',
                        code: '3',
                        commandCode: 'ATQ0V0E0&D2X0\N3&K3&S0'
                    };
                    var obj4 = {
                        id: '4',
                        name: 'NEC AtermIT25/DSU ',
                        code: '4',
                        commandCode: 'ATQ0V0E0&D0X0N0W2&K0&S0\Q0$N1=0$N2=0$N5=0$N6=1S0=1$S'
                    };
                    var obj5 = {
                        id: '5',
                        name: 'NEC AtermIT45/DSU ',
                        code: '5',
                        commandCode: 'ATQ0V0E0&D0X0N0W2&K0&S0\Q0$N1=0$N2=0$N5=0$N6=1S0=1$S'
                    };
                    var obj6 = {
                        id: '6',
                        name: 'NEC AtermIT55/DSU ',
                        code: '6',
                        commandCode: 'ATQ0V0E0&D0X0N0W2&K0&S0\Q0$N1=0$N2=0$N5=0$N6=1S0=1$S'
                    };
                    var obj7 = {
                        id: '7',
                        name: 'NEC AtermIT65/DSU ',
                        code: '7',
                        commandCode: 'ATQ0V0E0&D0X0N0W2&K0&S0\Q0$N1=0$N2=0$N5=0$N6=1S0=1$S'
                    };
                    var obj8 = {
                        id: '8',
                        name: 'OMRON ME1414VB3 ',
                        code: '8',
                        commandCode: 'ATQ0V0E0&D2X0\N3\Q0&S0$M5B2%C3%G0$W'
                    };
                    var obj9 = {
                        id: '9',
                        name: 'OMRON ME3314VB3 ',
                        code: '9',
                        commandCode: 'ATQ0V0E0&D2X0&R2&S0'
                    };
                    _data.push(obj1);
                    _data.push(obj2);
                    _data.push(obj3);
                    _data.push(obj4);
                    _data.push(obj5);
                    _data.push(obj6);
                    _data.push(obj7);
                    _data.push(obj8);
                    _data.push(obj9);
                    _.each(_data, function (d) { return modems.push(d); });
                    console.log('start');
                    modem.id(_data[0].id);
                    modem.id.valueHasMutated();
                    dfd.resolve();
                    return dfd.promise();
                };
                ViewModel.prototype.pushDataToEScreen = function () {
                    var self = this, modem = self.modem(), modems = self.modems();
                    if (nts.uk.ui.errors.hasError()) {
                        return;
                    }
                    var objSelected = _.find(modems, function (o) { return o.id == self.idSelected; });
                    setShared('CMM042F_VALUE', { id: objSelected.id, resultFromF: objSelected.name, codeCommand: objSelected.commandCode });
                    debugger;
                    close();
                };
                ViewModel.prototype.close = function () {
                    close();
                };
                return ViewModel;
            }());
            viewmodel.ViewModel = ViewModel;
            var Modem = /** @class */ (function () {
                function Modem(param) {
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
                return Modem;
            }());
        })(viewmodel = f.viewmodel || (f.viewmodel = {}));
    })(f = cmm042.f || (cmm042.f = {}));
})(cmm042 || (cmm042 = {}));
//# sourceMappingURL=cmm042.f.vm.js.map