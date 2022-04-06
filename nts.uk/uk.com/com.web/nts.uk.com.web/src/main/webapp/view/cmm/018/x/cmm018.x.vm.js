var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm018;
                (function (cmm018) {
                    var x;
                    (function (x) {
                        var viewmodel;
                        (function (viewmodel) {
                            var Cmm018XViewModel = /** @class */ (function (_super) {
                                __extends(Cmm018XViewModel, _super);
                                function Cmm018XViewModel() {
                                    var _this = _super !== null && _super.apply(this, arguments) || this;
                                    _this.systemAtr = ko.observable(viewmodel.SystemAtr.EMPLOYMENT);
                                    return _this;
                                }
                                Cmm018XViewModel.prototype.created = function () {
                                    var self = this;
                                    var url = $(location).attr('search');
                                    var urlParam = url.split("=")[1];
                                    self.systemAtr(urlParam || viewmodel.SystemAtr.EMPLOYMENT);
                                };
                                Cmm018XViewModel.prototype.mounted = function () {
                                    $('#btnM').focus();
                                };
                                Cmm018XViewModel.prototype.openDialogQ = function () {
                                    console.log('openDialogQ');
                                    var self = this;
                                    var param = {
                                        systemAtr: ko.toJS(self.systemAtr)
                                    };
                                    self.$window
                                        .modal('com', '/view/cmm/018/q/index.xhtml', param)
                                        .then(function (result) {
                                        // bussiness logic after modal closed
                                        // location.reload();
                                    });
                                };
                                Cmm018XViewModel.prototype.jumpToA = function () {
                                    var self = this;
                                    self.$jump('com', '/view/cmm/018/a/index.xhtml', ko.toJS(self.systemAtr));
                                };
                                Cmm018XViewModel.prototype.jumpToCmm013H = function () {
                                    var self = this;
                                    self.$window
                                        .modal('com', '/view/cmm/013/h/index.xhtml', {})
                                        .then(function (result) {
                                        // bussiness logic after modal closed
                                        // location.reload();
                                    });
                                };
                                Cmm018XViewModel.prototype.openDialogM = function () {
                                    var self = this;
                                    var param = {
                                        sysAtr: ko.toJS(self.systemAtr)
                                    };
                                    self.$window.storage('CMM018M_PARAM', param)
                                        .then(function () { return self.$window.modal('com', '/view/cmm/018/m/index.xhtml'); })
                                        .then(function (result) {
                                        // bussiness logic after modal closed
                                    });
                                };
                                Cmm018XViewModel = __decorate([
                                    bean()
                                ], Cmm018XViewModel);
                                return Cmm018XViewModel;
                            }(ko.ViewModel));
                            viewmodel.Cmm018XViewModel = Cmm018XViewModel;
                            viewmodel.SystemAtr = {
                                EMPLOYMENT: 0,
                                HUMAN_RESOURSE: 1
                            };
                            viewmodel.MODE_SYSTEM = 'SYSTEM_MODE';
                        })(viewmodel = x.viewmodel || (x.viewmodel = {}));
                    })(x = cmm018.x || (cmm018.x = {}));
                })(cmm018 = view.cmm018 || (view.cmm018 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm018.x.vm.js.map