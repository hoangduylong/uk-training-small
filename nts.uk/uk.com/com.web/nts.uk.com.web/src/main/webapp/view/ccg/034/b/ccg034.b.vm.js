/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />
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
                var ccg034;
                (function (ccg034) {
                    var b;
                    (function (b) {
                        // URL API backend
                        var API = {
                            extract: "sys/portal/createflowmenu/extract/{0}"
                        };
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.fileId = ko.observable('');
                                _this.htmlSrc = ko.observable('');
                                return _this;
                            }
                            ScreenModel.prototype.created = function (params) {
                                var vm = this;
                                vm.fileId(params.fileId);
                                vm.htmlSrc(params.htmlSrc);
                            };
                            ScreenModel.prototype.mounted = function () {
                                var vm = this;
                                vm.extract();
                                $("#B1_1").focus();
                            };
                            ScreenModel.prototype.extract = function () {
                                var vm = this;
                                if (vm.htmlSrc()) {
                                    vm.renderHTML(vm.htmlSrc());
                                }
                                else {
                                    // Render from file
                                    vm.$blockui("grayout");
                                    var path = nts.uk.text.format(API.extract, vm.fileId());
                                    vm.$ajax(path)
                                        .then(function (res) {
                                        if (!!res) {
                                            vm.htmlSrc(res.htmlContent);
                                            vm.renderHTML(vm.htmlSrc());
                                        }
                                    })
                                        .always(function () { return vm.$blockui("clear"); });
                                }
                            };
                            ScreenModel.prototype.renderHTML = function (htmlSrc) {
                                var vm = this;
                                var $iframe = $("#B1_1");
                                var ifr = document.getElementById('B1_1');
                                var iframedoc = ifr.contentDocument || ifr.contentWindow.document;
                                // If browser supports srcdoc for iframe
                                // then add src to srcdoc attr
                                if ("srcdoc" in $iframe) {
                                    $iframe.attr("srcdoc", htmlSrc);
                                }
                                else {
                                    // Fallback to IE... (doesn't support srcdoc)
                                    // Write directly into iframe body
                                    iframedoc.body.innerHTML = htmlSrc;
                                }
                                ccg034.share.model.customload.loadLimitedLabelForIframe();
                                vm.$nextTick(function () {
                                    $("#B1_1").width($("#B1_1").contents().find(".content-container").width());
                                    $("#B1_1").height($("#B1_1").contents().find(".content-container").height());
                                    _.each(iframedoc.getElementsByClassName("ccg034-hyperlink"), function (link) {
                                        link.addEventListener('click', function (event) { return event.preventDefault(); });
                                    });
                                });
                            };
                            ScreenModel.prototype.closeDialog = function () {
                                var vm = this;
                                vm.$window.close();
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        b.ScreenModel = ScreenModel;
                    })(b = ccg034.b || (ccg034.b = {}));
                })(ccg034 = view.ccg034 || (view.ccg034 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg034.b.vm.js.map