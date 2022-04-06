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
/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg008;
                (function (ccg008) {
                    var a;
                    (function (a) {
                        var Layout1ComponentViewModel;
                        (function (Layout1ComponentViewModel_1) {
                            var ntsFile = nts.uk.request.file;
                            var Layout1ComponentViewModel = /** @class */ (function (_super) {
                                __extends(Layout1ComponentViewModel, _super);
                                function Layout1ComponentViewModel() {
                                    var _this = _super !== null && _super.apply(this, arguments) || this;
                                    _this.urlIframe1 = ko.observable("");
                                    _this.lstHtml = ko.observableArray([]);
                                    _this.isShowUrlLayout1 = ko.observable(false);
                                    _this.isFlowmenu = ko.observable(false);
                                    _this.isFlowmenuUp = ko.observable(false);
                                    _this.filePath = ko.observable("");
                                    return _this;
                                }
                                Layout1ComponentViewModel.prototype.created = function (param) {
                                    var vm = this;
                                    var data = param.item();
                                    var layout1 = param.item().layout1;
                                    if (layout1[0]) {
                                        vm.isFlowmenu(layout1[0].isFlowmenu);
                                    }
                                    if (layout1) {
                                        if (data.urlLayout1) {
                                            vm.isShowUrlLayout1(true);
                                            vm.urlIframe1(data.urlLayout1);
                                        }
                                        else if (layout1[0].isFlowmenu) {
                                            var lstFileId_1 = ko.observableArray([]);
                                            _.each(layout1, function (item) {
                                                var fileId = item.fileId;
                                                lstFileId_1().push(fileId);
                                            });
                                            var param_1 = {
                                                lstFileId: lstFileId_1(),
                                            };
                                            vm.$ajax("com", 'sys/portal/createflowmenu/extractListFileId', param_1).then(function (res) {
                                                var mappedList = _.map(res, function (item) {
                                                    return { html: "<iframe id=\"frameF1\" ></iframe>" };
                                                });
                                                vm.lstHtml(mappedList);
                                                if (!_.isEmpty(res)) {
                                                    vm.renderHTML(res[0].htmlContent);
                                                    // ddaay la voi void()
                                                    vm.$nextTick(function () {
                                                        if ($('.contents_layout_ccg015')[0]) {
                                                            _.each(document.getElementById("frameF1").contentDocument.getElementsByTagName("a"), function (link) {
                                                                link.addEventListener('click', function (event) { return event.preventDefault(); });
                                                            });
                                                        }
                                                    });
                                                }
                                            }).fail(function () {
                                                var ifr = document.getElementById('frameF1');
                                                var iframedoc = ifr.contentDocument || ifr.contentWindow.document;
                                                iframedoc.body.innerHTML = "";
                                            });
                                        }
                                        else {
                                            vm.isFlowmenuUp(true);
                                            vm.filePath(ntsFile.liveViewUrl(layout1[0].fileId, 'index.htm'));
                                            var ifr = document.getElementById('F2-frame');
                                            var width = ifr.scrollWidth;
                                            if ($('.contents_layout_ccg015')[0]) {
                                                var ifrParent = $('.contents_layout_ccg015');
                                                var height = ifrParent.innerHeight();
                                                ifr.width = "".concat(width.toString(), "px");
                                                ifr.height = "".concat(height.toString(), "px");
                                                $('#F2-frame').on('load', function () {
                                                    vm.$nextTick(function () {
                                                        _.each(document.getElementById("F2-frame").contentDocument.getElementsByTagName("a"), function (link) {
                                                            link.removeAttribute('onclick');
                                                            link.removeAttribute('href');
                                                        });
                                                    });
                                                });
                                            }
                                            else {
                                                var ifrParent = $('.contents_layout');
                                                var height = ifrParent.innerHeight();
                                                ifr.width = "".concat(width.toString(), "px");
                                                ifr.height = "".concat(height.toString(), "px");
                                            }
                                        }
                                    }
                                };
                                Layout1ComponentViewModel.prototype.mounted = function () {
                                    var vm = this;
                                    var ifr = document.getElementById('preview-iframe1');
                                    var ifrParent;
                                    if ($('.contents_layout_ccg015')[0]) {
                                        ifrParent = $('.contents_layout_ccg015');
                                    }
                                    else {
                                        ifrParent = $('.contents_layout');
                                    }
                                    var height = ifrParent.innerHeight() - 10;
                                    ifr.height = "".concat(height.toString(), "px");
                                };
                                Layout1ComponentViewModel.prototype.renderHTML = function (htmlSrc) {
                                    var vm = this;
                                    var $iframe = $("#frameF1");
                                    // If browser supports srcdoc for iframe
                                    // then add src to srcdoc attr
                                    if ("srcdoc" in $iframe) {
                                        $iframe.attr("srcdoc", htmlSrc);
                                    }
                                    else {
                                        // Fallback to IE... (doesn't support srcdoc)
                                        // Write directly into iframe body
                                        var ifr = document.getElementById('frameF1');
                                        var iframedoc = ifr.contentDocument || ifr.contentWindow.document;
                                        iframedoc.body.innerHTML = htmlSrc;
                                        var width = iframedoc.activeElement.scrollWidth + 20;
                                        var height = iframedoc.activeElement.scrollHeight + 20;
                                        ifr.width = "".concat(width.toString(), "px");
                                        ifr.height = "".concat(height.toString(), "px");
                                    }
                                    nts.uk.com.view.ccg034.share.model.customload.loadLimitedLabelForIframe();
                                };
                                Layout1ComponentViewModel = __decorate([
                                    component({
                                        name: 'layout1-component',
                                        template: "\n        <div>\n          <div data-bind=\"if: $component.isShowUrlLayout1()\">\n            <iframe class=\"iframe_fix\" id=\"preview-iframe1\" data-bind=\"attr:{src: $component.urlIframe1}\"></iframe>\n          </div>\n          <!-- ko if: $component.isFlowmenu() -->\n            <div data-bind=\"foreach: $component.lstHtml\" style=\"display: flex; place-content: center;\">\n              <div data-bind=\"html: html\" id=\"F1-frame\" ></div>\n            </div>\n          <!-- /ko -->  \n          <!-- ko if: $component.isFlowmenuUp() -->\n            <iframe style=\"width: 100%\" data-bind=\"attr: {src: $component.filePath}\" id=\"F2-frame\" ></iframe>\n          <!-- /ko -->  \n        </div>\n    "
                                    })
                                ], Layout1ComponentViewModel);
                                return Layout1ComponentViewModel;
                            }(ko.ViewModel));
                            Layout1ComponentViewModel_1.Layout1ComponentViewModel = Layout1ComponentViewModel;
                        })(Layout1ComponentViewModel = a.Layout1ComponentViewModel || (a.Layout1ComponentViewModel = {}));
                    })(a = ccg008.a || (ccg008.a = {}));
                })(ccg008 = view.ccg008 || (view.ccg008 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=layout1Component.vm.js.map