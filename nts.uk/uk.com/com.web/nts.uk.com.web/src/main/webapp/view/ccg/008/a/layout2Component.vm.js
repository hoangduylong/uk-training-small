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
var character = nts.uk.characteristics;
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
                        var Layout2ComponentViewModel;
                        (function (Layout2ComponentViewModel_1) {
                            var Layout2ComponentViewModel = /** @class */ (function (_super) {
                                __extends(Layout2ComponentViewModel, _super);
                                function Layout2ComponentViewModel() {
                                    var _this = _super !== null && _super.apply(this, arguments) || this;
                                    _this.lstWidgetLayout = ko.observableArray([]);
                                    return _this;
                                }
                                Layout2ComponentViewModel.prototype.created = function (param) {
                                    var vm = this;
                                    var layout2 = param.item();
                                    var origin = window.location.origin;
                                    vm.isLayout = param.isLayout;
                                    var dataLayout = [];
                                    vm.lstWidgetLayout([]);
                                    if (layout2) {
                                        _.each(layout2, function (item) {
                                            var itemLayout = new ItemLayout();
                                            itemLayout.url = origin + vm.getUrlAndName(item.widgetType).url;
                                            itemLayout.name = vm.getUrlAndName(item.widgetType).name;
                                            itemLayout.order = item.order;
                                            dataLayout.push(itemLayout);
                                        });
                                        dataLayout = _.orderBy(dataLayout, ["order"], ["asc"]);
                                        vm.lstWidgetLayout(dataLayout);
                                    }
                                    character.restore("widgetSize").then(function (data) {
                                        if (data) {
                                            if (data.sId === __viewContext.user.employeeId) {
                                                var _loop_1 = function (i) {
                                                    if ($("#WG2-".concat(i))) {
                                                        var wg0 = $("#WG2-".concat(i))[0];
                                                        if (wg0) {
                                                            var wg0Child_1 = wg0.firstElementChild.firstElementChild;
                                                            if (wg0Child_1) {
                                                                var dataWg = data.widget.filter(function (e) { return e.widgetName === wg0Child_1.id; });
                                                                if (dataWg.length > 0) {
                                                                    wg0Child_1.style.height = dataWg[0].height + "px";
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if ($("#WG3-".concat(i))) {
                                                        var wg1 = $("#WG3-".concat(i))[0];
                                                        if (wg1) {
                                                            var wg1Child_1 = wg1.firstElementChild.firstElementChild;
                                                            var dataWg = data.widget.filter(function (e) { return e.widgetName === wg1Child_1.id; });
                                                            if (dataWg.length > 0) {
                                                                wg1Child_1.style.height = dataWg[0].height + "px";
                                                            }
                                                        }
                                                    }
                                                };
                                                for (var i = 0; i < 6; i++) {
                                                    _loop_1(i);
                                                }
                                            }
                                        }
                                    });
                                };
                                Layout2ComponentViewModel.prototype.getUrlAndName = function (type) {
                                    var url = "";
                                    var name = "";
                                    switch (type) {
                                        case 0:
                                            url = "/view/ktg/005/a/ktg005.a.component.js";
                                            name = "ktg-005-a";
                                            break;
                                        case 1:
                                            url = "/view/ktg/001/a/ktg001.a.component.js";
                                            name = "ktg-001-a";
                                            break;
                                        case 2:
                                            url = "/view/ktg/004/a/ktg004.a.component.js";
                                            name = "ktg-004-a";
                                            break;
                                        case 3:
                                            url = "/view/ktg/026/a/ktg026component.a.vm.js";
                                            name = "ktg-026-a";
                                            break;
                                        case 4:
                                            url = "/view/ktg/027/a/ktg027.a.vm.js";
                                            name = "ktg-027-a";
                                            break;
                                        case 5:
                                            url = "/view/ktg/027/a/kdp001.a.component.js";
                                            name = "kdp-001-a";
                                            break;
                                        case 6:
                                            url = "/view/ktg/031/a/ktg031.a.vm.js";
                                            name = "ktg031-component";
                                            break;
                                        case 7:
                                            url = "/nts.uk.com.web//view/ccg/005/a/ccg005.a.vm.js";
                                            name = 'ccg005-component';
                                            break;
                                    }
                                    return { url: url, name: name };
                                };
                                Layout2ComponentViewModel.prototype.mounted = function () {
                                    var vm = this;
                                    var resizeTimer = 0;
                                    var _loop_2 = function (i) {
                                        if ($("#WG2-".concat(i))) {
                                            $("#WG2-".concat(i)).resizable({
                                                grid: [10000, 1]
                                            });
                                            $("#WG2-".concat(i)).resize(function () {
                                                var wg0 = $("#WG2-".concat(i))[0];
                                                var wg0Child = wg0.firstElementChild.firstElementChild;
                                                character.restore("widgetSize").then(function (data) {
                                                    if (data) {
                                                        if (data.sId === __viewContext.user.employeeId) {
                                                            var dataWg = data.widget.filter(function (e) { return e.widgetName === wg0Child.id; });
                                                            if (dataWg.length > 0) {
                                                                var dataUpdate = data.widget.filter(function (e) { return e.widgetName !== wg0Child.id; });
                                                                dataWg[0].height = wg0.scrollHeight;
                                                                dataUpdate.push(dataWg[0]);
                                                                data.widget = dataUpdate;
                                                                character.save("widgetSize", data);
                                                            }
                                                            else {
                                                                var widget = new WidgetSize();
                                                                widget.widgetName = wg0Child.id;
                                                                widget.height = wg0.scrollHeight;
                                                                data.widget.push(widget);
                                                                character.save("widgetSize", data);
                                                            }
                                                        }
                                                        else {
                                                            var widgetWithUser = new WidgetSizeWithUser();
                                                            var widget = new WidgetSize();
                                                            widgetWithUser.sId = __viewContext.user.employeeId;
                                                            widget.widgetName = wg0Child.id;
                                                            widget.height = wg0.scrollHeight;
                                                            widgetWithUser.widget.push(widget);
                                                            character.save("widgetSize", widgetWithUser);
                                                        }
                                                    }
                                                    else {
                                                        var widgetWithUser = new WidgetSizeWithUser();
                                                        var widget = new WidgetSize();
                                                        widgetWithUser.sId = __viewContext.user.employeeId;
                                                        widget.widgetName = wg0Child.id;
                                                        widget.height = wg0.scrollHeight;
                                                        widgetWithUser.widget.push(widget);
                                                        character.save("widgetSize", widgetWithUser);
                                                    }
                                                });
                                                wg0Child.style.height = '100%';
                                                if (wg0Child.getAttribute('id').indexOf('ccg005') >= 0) {
                                                    $(window).trigger('ccg005.resize');
                                                }
                                            });
                                        }
                                    };
                                    for (var i = 0; i < 6; i++) {
                                        _loop_2(i);
                                    }
                                    var _loop_3 = function (i) {
                                        if ($("#WG3-".concat(i))) {
                                            $("#WG3-".concat(i)).resizable({
                                                grid: [10000, 1]
                                            });
                                            $("#WG3-".concat(i)).resize(function () {
                                                var wg0 = $("#WG3-".concat(i))[0];
                                                var wg0Child = wg0.firstElementChild.firstElementChild;
                                                character.restore("widgetSize").then(function (data) {
                                                    if (data) {
                                                        if (data.sId === __viewContext.user.employeeId) {
                                                            var dataWg = data.widget.filter(function (e) { return e.widgetName === wg0Child.id; });
                                                            if (dataWg.length > 0) {
                                                                var dataUpdate = data.widget.filter(function (e) { return e.widgetName !== wg0Child.id; });
                                                                dataWg[0].height = wg0.scrollHeight;
                                                                dataUpdate.push(dataWg[0]);
                                                                data.widget = dataUpdate;
                                                                character.save("widgetSize", data);
                                                            }
                                                            else {
                                                                var widget = new WidgetSize();
                                                                widget.widgetName = wg0Child.id;
                                                                widget.height = wg0.scrollHeight;
                                                                data.widget.push(widget);
                                                                character.save("widgetSize", data);
                                                            }
                                                        }
                                                        else {
                                                            var widgetWithUser = new WidgetSizeWithUser();
                                                            var widget = new WidgetSize();
                                                            widgetWithUser.sId = __viewContext.user.employeeId;
                                                            widget.widgetName = wg0Child.id;
                                                            widget.height = wg0.scrollHeight;
                                                            widgetWithUser.widget.push(widget);
                                                            character.save("widgetSize", widgetWithUser);
                                                        }
                                                    }
                                                    else {
                                                        var widgetWithUser = new WidgetSizeWithUser();
                                                        var widget = new WidgetSize();
                                                        widgetWithUser.sId = __viewContext.user.employeeId;
                                                        widget.widgetName = wg0Child.id;
                                                        widget.height = wg0.scrollHeight;
                                                        widgetWithUser.widget.push(widget);
                                                        character.save("widgetSize", widgetWithUser);
                                                    }
                                                });
                                                wg0Child.style.height = '100%';
                                                if (wg0Child.getAttribute('id').indexOf('ccg005') >= 0) {
                                                    $(window).trigger('ccg005.resize');
                                                }
                                            });
                                        }
                                    };
                                    for (var i = 0; i < 6; i++) {
                                        _loop_3(i);
                                    }
                                    vm.$el.querySelectorAll("iframe").forEach(function (frame) {
                                        var targetNode = frame.contentDocument;
                                        if (targetNode) {
                                            var config = { childList: true, subtree: true };
                                            var callback = function () {
                                                var width = frame.contentWindow.innerWidth;
                                                var height = frame.contentWindow.innerHeight;
                                                frame.style.width = width.toString();
                                                frame.style.height = height.toString();
                                            };
                                            var observer = new MutationObserver(callback);
                                            observer.observe(targetNode, config);
                                        }
                                    });
                                };
                                Layout2ComponentViewModel = __decorate([
                                    component({
                                        name: "layout2-component",
                                        template: "\n      <!-- ko if: $component.isLayout == 2 -->\n        <!-- ko foreach: $component.lstWidgetLayout -->\n          <!-- ko if: url.indexOf('.xhtml') > -1 -->\n            <iframe style=\"width:450px\" data-bind=\"attr: { src: url }\" />\n          <!-- /ko -->  \n          <!-- ko if: url.indexOf('.js') > -1 -->\n              <div data-bind=\"widget: { name: name }\" ></div>\n          <!-- /ko -->  \n        <!-- /ko -->\n      <!-- /ko -->  \n      <!-- ko if: $component.isLayout == 3 -->\n        <!-- ko foreach: $component.lstWidgetLayout -->\n          <!-- ko if: url.indexOf('.xhtml') > -1 -->\n            <iframe style=\"width:450px\" data-bind=\"attr: { src: url }\" />\n          <!-- /ko -->  \n          <!-- ko if: url.indexOf('.js') > -1 -->\n              <div data-bind=\"widget: name\" ></div>\n          <!-- /ko -->\n        <!-- /ko -->\n      <!-- /ko -->  \n    ",
                                    })
                                ], Layout2ComponentViewModel);
                                return Layout2ComponentViewModel;
                            }(ko.ViewModel));
                            Layout2ComponentViewModel_1.Layout2ComponentViewModel = Layout2ComponentViewModel;
                            var ItemLayout = /** @class */ (function () {
                                function ItemLayout(init) {
                                    $.extend(this, init);
                                }
                                return ItemLayout;
                            }());
                            Layout2ComponentViewModel_1.ItemLayout = ItemLayout;
                            var WidgetSettingDto = /** @class */ (function () {
                                function WidgetSettingDto(init) {
                                    $.extend(this, init);
                                }
                                return WidgetSettingDto;
                            }());
                            Layout2ComponentViewModel_1.WidgetSettingDto = WidgetSettingDto;
                            var WidgetSize = /** @class */ (function () {
                                function WidgetSize(init) {
                                    $.extend(this, init);
                                }
                                return WidgetSize;
                            }());
                            Layout2ComponentViewModel_1.WidgetSize = WidgetSize;
                            var WidgetSizeWithUser = /** @class */ (function () {
                                function WidgetSizeWithUser(init) {
                                    this.widget = [];
                                    $.extend(this, init);
                                }
                                return WidgetSizeWithUser;
                            }());
                            Layout2ComponentViewModel_1.WidgetSizeWithUser = WidgetSizeWithUser;
                        })(Layout2ComponentViewModel = a.Layout2ComponentViewModel || (a.Layout2ComponentViewModel = {}));
                    })(a = ccg008.a || (ccg008.a = {}));
                })(ccg008 = view.ccg008 || (view.ccg008 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=layout2Component.vm.js.map