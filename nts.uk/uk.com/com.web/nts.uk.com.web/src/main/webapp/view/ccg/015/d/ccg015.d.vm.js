/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />
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
                var ccg015;
                (function (ccg015) {
                    var d;
                    (function (d) {
                        var ntsFile = nts.uk.request.file;
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.params = {};
                                _this.flowMenuSelectedCode = ko.observable('');
                                _this.toppageSelectedCode = ko.observable('');
                                _this.listFlowMenu = ko.observableArray([]);
                                _this.listTopPagePart = ko.observableArray([]);
                                _this.columnsFlowMenu = ko.observableArray([]);
                                _this.columnsTopPagePart = ko.observableArray([]);
                                _this.itemList = ko.observableArray([]);
                                _this.isRequired = ko.observable(true);
                                _this.contentFlowMenu = ko.observable(true);
                                _this.contentTopPagePart = ko.observable(false);
                                _this.contentUrl = ko.observable(false);
                                _this.urlIframe1 = ko.observable('');
                                _this.urlIframe2 = ko.observable('');
                                _this.urlIframe3 = ko.observable('');
                                _this.isNewMode = ko.observable(true);
                                _this.topPageCode = ko.observable('');
                                _this.layoutNo = ko.observable(0);
                                _this.layoutType = ko.observable(null);
                                _this.flowMenuCd = ko.observable('');
                                _this.flowMenuUpCd = ko.observable('');
                                _this.url = ko.observable('');
                                _this.fileID = ko.observable('');
                                _this.filePath = ko.observable('');
                                return _this;
                            }
                            ScreenModel.prototype.created = function (params) {
                                var vm = this;
                                vm.params = params;
                                vm.topPageCode(params.topPageModel.topPageCode);
                                vm.getFlowmenuUpload();
                                vm.getFlowmenu();
                                vm.checkDataLayout(vm.params);
                                vm.itemList([
                                    new ItemModel(LayoutType.FLOW_MENU, vm.$i18n('Enum_LayoutType_FLOW_MENU')),
                                    new ItemModel(LayoutType.FLOW_MENU_UPLOAD, vm.$i18n('Enum_LayoutType_FLOW_MENU_UPLOAD')),
                                    new ItemModel(LayoutType.EXTERNAL_URL, vm.$i18n('Enum_LayoutType_EXTERNAL_URL')),
                                ]);
                                vm.columnsFlowMenu([
                                    { headerText: vm.$i18n('CCG015_68'), width: "50px", key: 'flowCode' },
                                    { headerText: vm.$i18n('CCG015_69'), width: "300px", key: 'flowName' },
                                ]);
                                vm.columnsTopPagePart([
                                    { headerText: vm.$i18n('CCG015_68'), width: "50px", key: 'flowCode' },
                                    { headerText: vm.$i18n('CCG015_69'), width: "300px", key: 'flowName' },
                                ]);
                                vm.layoutType.subscribe(function (value) {
                                    vm.$errors('clear');
                                    vm.$blockui('grayout');
                                    vm.changeLayout(value)
                                        .then(function () {
                                        if (value === LayoutType.FLOW_MENU) {
                                            vm.contentFlowMenu(true);
                                            vm.contentTopPagePart(false);
                                            vm.contentUrl(false);
                                            var flowMenuChoose = _.findIndex(vm.listFlowMenu(), function (item) { return item.flowCode === vm.flowMenuSelectedCode(); });
                                            var fileIdChoose = vm.listFlowMenu()[flowMenuChoose].fileId;
                                            if (!!fileIdChoose) {
                                                vm.$blockui('grayout');
                                                vm.$ajax('sys/portal/createflowmenu/extract/' + fileIdChoose).then(function (item) {
                                                    if (!_.isEmpty(item)) {
                                                        vm.renderHTML(item.htmlContent, 'frame1');
                                                        _.each(document.getElementById("frameF1").contentDocument.getElementsByTagName("a"), function (link) {
                                                            link.addEventListener('click', function (event) { return event.preventDefault(); });
                                                        });
                                                    }
                                                }).always(function () { return vm.$blockui('clear'); });
                                            }
                                            else {
                                                var ifr = document.getElementById('frameF1');
                                                var iframedoc = ifr.contentDocument || ifr.contentWindow.document;
                                                iframedoc.body.innerHTML = "";
                                            }
                                        }
                                        else if (value === LayoutType.FLOW_MENU_UPLOAD) {
                                            vm.contentFlowMenu(false);
                                            vm.contentTopPagePart(true);
                                            vm.contentUrl(false);
                                            var topPagePartChoose = _.findIndex(vm.listTopPagePart(), function (item) { return item.flowCode === vm.toppageSelectedCode(); });
                                            var fileIdChoose = vm.listTopPagePart()[topPagePartChoose].fileId;
                                            vm.fileID(fileIdChoose);
                                            vm.filePath(ntsFile.liveViewUrl(fileIdChoose, 'index.htm'));
                                            $('#frameF2').on('load', function () {
                                                vm.$nextTick(function () {
                                                    _.each(document.getElementById("frameF2").contentDocument.getElementsByTagName("a"), function (link) {
                                                        link.removeAttribute('onclick');
                                                        link.removeAttribute('href');
                                                    });
                                                });
                                            });
                                        }
                                        else {
                                            vm.contentFlowMenu(false);
                                            vm.contentTopPagePart(false);
                                            vm.contentUrl(true);
                                        }
                                    })
                                        .always(function () { return vm.$blockui('clear'); });
                                });
                                vm.flowMenuSelectedCode.subscribe(function (data) {
                                    var flowMenuChoose = _.findIndex(vm.listFlowMenu(), function (item) { return item.flowCode === data; });
                                    vm.flowMenuSelectedCode(vm.listFlowMenu()[flowMenuChoose].flowCode);
                                    var fileIdChoose = vm.listFlowMenu()[flowMenuChoose].fileId;
                                    if (!!fileIdChoose) {
                                        vm.$blockui('grayout');
                                        vm.$ajax('sys/portal/createflowmenu/extract/' + fileIdChoose).then(function (item) {
                                            if (!_.isEmpty(item)) {
                                                vm.renderHTML(item.htmlContent, 'frame1');
                                                _.each(document.getElementById("frameF1").contentDocument.getElementsByTagName("a"), function (link) {
                                                    link.addEventListener('click', function (event) { return event.preventDefault(); });
                                                });
                                            }
                                        }).fail(function () {
                                            var ifr = document.getElementById('frameF1');
                                            var iframedoc = ifr.contentDocument || ifr.contentWindow.document;
                                            iframedoc.body.innerHTML = "";
                                        }).always(function () { return vm.$blockui('clear'); });
                                    }
                                    else {
                                        var ifr = document.getElementById('frameF1');
                                        var iframedoc = ifr.contentDocument || ifr.contentWindow.document;
                                        iframedoc.body.innerHTML = "";
                                    }
                                });
                                vm.toppageSelectedCode.subscribe(function (data) {
                                    var topPagePartChoose = _.findIndex(vm.listTopPagePart(), function (item) { return item.flowCode === data; });
                                    vm.toppageSelectedCode(vm.listTopPagePart()[topPagePartChoose].flowCode);
                                    var fileIdChoose = vm.listTopPagePart()[topPagePartChoose].fileId;
                                    vm.fileID(fileIdChoose);
                                    vm.filePath(ntsFile.liveViewUrl(fileIdChoose, 'index.htm'));
                                    $('#frameF2').on('load', function () {
                                        vm.$nextTick(function () {
                                            _.each(document.getElementById("frameF2").contentDocument.getElementsByTagName("a"), function (link) {
                                                link.removeAttribute('onclick');
                                                link.removeAttribute('href');
                                            });
                                        });
                                    });
                                });
                            };
                            ScreenModel.prototype.mounted = function () {
                                var vm = this;
                                $('#D2_2').focus();
                                vm.checkDataLayout(vm.params);
                            };
                            ScreenModel.prototype.changeLayout = function (layoutType) {
                                var vm = this;
                                var data = {
                                    topPageCd: vm.topPageCode(),
                                    layoutType: layoutType,
                                };
                                return vm.$ajax('/toppage/changeFlowMenu', data)
                                    .then(function (result) {
                                    if (result && layoutType === LayoutType.FLOW_MENU) {
                                        vm.listFlowMenu(_.orderBy(result, ['flowCode'], ['asc']));
                                        if (vm.flowMenuSelectedCode() === '') {
                                            vm.flowMenuSelectedCode(vm.listFlowMenu()[0].flowCode);
                                        }
                                    }
                                    else if (result && layoutType === LayoutType.FLOW_MENU_UPLOAD) {
                                        if (result.length > 0) {
                                            vm.listTopPagePart(_.orderBy(result, ['flowCode'], ['asc']));
                                            if (vm.toppageSelectedCode() === '') {
                                                vm.toppageSelectedCode(vm.listTopPagePart()[0].flowCode);
                                            }
                                        }
                                    }
                                    else {
                                        // Do nothing
                                    }
                                });
                            };
                            ScreenModel.prototype.getFlowmenuUpload = function () {
                                var vm = this;
                                var data = {
                                    topPageCd: vm.topPageCode(),
                                    layoutType: 1,
                                };
                                return vm.$ajax('/toppage/changeFlowMenu', data)
                                    .then(function (result) {
                                    if (result) {
                                        vm.listTopPagePart(_.orderBy(result, ['flowCode'], ['asc']));
                                    }
                                });
                            };
                            ScreenModel.prototype.getFlowmenu = function () {
                                var vm = this;
                                var data = {
                                    topPageCd: vm.topPageCode(),
                                    layoutType: 0,
                                };
                                return vm.$ajax('/toppage/changeFlowMenu', data)
                                    .then(function (result) {
                                    if (result) {
                                        vm.listFlowMenu(_.orderBy(result, ['flowCode'], ['asc']));
                                    }
                                });
                            };
                            ScreenModel.prototype.checkDataLayout = function (params) {
                                var vm = this;
                                if (params && params.frame === 1) {
                                    vm.layoutNo(LayoutType.FLOW_MENU);
                                }
                                var layoutRquest = {
                                    topPageCode: vm.topPageCode(),
                                    layoutNo: vm.layoutNo()
                                };
                                vm.$blockui("grayout");
                                vm.$ajax('/toppage/getLayout', layoutRquest)
                                    .then(function (result) {
                                    if (result) {
                                        vm.isNewMode(false);
                                        vm.layoutType(result.layoutType);
                                        if (result.flowMenuCd && vm.layoutType() === 0) {
                                            var flowMenuChoose = _.findIndex(vm.listFlowMenu(), function (item) { return item.flowCode === result.flowMenuCd; });
                                            vm.flowMenuSelectedCode(vm.listFlowMenu()[flowMenuChoose].flowCode);
                                        }
                                        if (result.flowMenuUpCd && vm.layoutType() === 1) {
                                            var topPagePartChoose = _.findIndex(vm.listTopPagePart(), function (item) { return item.flowCode === result.flowMenuUpCd; });
                                            vm.toppageSelectedCode(vm.listTopPagePart()[topPagePartChoose].flowCode);
                                        }
                                        if (result.url && result.url !== '') {
                                            vm.url(result.url);
                                        }
                                        vm.urlIframe3(result.url);
                                    }
                                    else {
                                        vm.isNewMode(true);
                                        vm.layoutType(0);
                                    }
                                })
                                    .always(function () { return vm.$blockui("clear"); });
                            };
                            ScreenModel.prototype.renderHTML = function (htmlSrc, frame) {
                                var vm = this;
                                var $iframe;
                                if (frame === 'frame1') {
                                    $iframe = $("#frameF1");
                                }
                                else {
                                    $iframe = $("#frameF2");
                                }
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
                            ScreenModel.prototype.checkSaveLayout = function () {
                                var vm = this;
                                console.log();
                                if (vm.layoutType() === LayoutType.EXTERNAL_URL) {
                                    vm.$errors('clear');
                                    vm.$validate()
                                        .then(function (valid) {
                                        if (valid) {
                                            vm.saveLayout();
                                        }
                                    });
                                }
                                else {
                                    vm.saveLayout();
                                }
                            };
                            ScreenModel.prototype.saveLayout = function () {
                                var vm = this;
                                if (vm.layoutType() !== LayoutType.FLOW_MENU) {
                                    vm.flowMenuSelectedCode('');
                                }
                                if (vm.layoutType() !== LayoutType.FLOW_MENU_UPLOAD) {
                                    vm.toppageSelectedCode('');
                                }
                                if (vm.layoutType() !== LayoutType.EXTERNAL_URL) {
                                    vm.url('');
                                }
                                var data = {
                                    widgetSettings: null,
                                    topPageCode: vm.topPageCode(),
                                    layoutNo: vm.layoutNo(),
                                    layoutType: vm.layoutType(),
                                    cid: null,
                                    flowMenuCd: vm.flowMenuSelectedCode(),
                                    flowMenuUpCd: vm.toppageSelectedCode(),
                                    url: vm.url()
                                };
                                vm.$blockui("grayout");
                                vm.$ajax('/toppage/saveLayoutFlowMenu', data)
                                    .then(function () {
                                    vm.isNewMode(false);
                                    vm.$blockui('clear');
                                    vm.$dialog.info({ messageId: "Msg_15" }).then(function () { return $('#D2_2').focus(); });
                                })
                                    .always(function () { return vm.$blockui('clear'); });
                            };
                            // URLの内容表示するを
                            ScreenModel.prototype.showUrl = function () {
                                var vm = this;
                                vm.urlIframe3(vm.url());
                            };
                            ScreenModel.prototype.close = function () {
                                var vm = this;
                                vm.$window.close();
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        d.ScreenModel = ScreenModel;
                        var ItemModel = /** @class */ (function () {
                            function ItemModel(code, name) {
                                this.code = code;
                                this.name = name;
                            }
                            return ItemModel;
                        }());
                        var LayoutType;
                        (function (LayoutType) {
                            LayoutType[LayoutType["FLOW_MENU"] = 0] = "FLOW_MENU";
                            LayoutType[LayoutType["FLOW_MENU_UPLOAD"] = 1] = "FLOW_MENU_UPLOAD";
                            LayoutType[LayoutType["EXTERNAL_URL"] = 2] = "EXTERNAL_URL";
                        })(LayoutType = d.LayoutType || (d.LayoutType = {}));
                    })(d = ccg015.d || (ccg015.d = {}));
                })(ccg015 = view.ccg015 || (view.ccg015 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg015.d.vm.js.map