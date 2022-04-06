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
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg;
                (function (ccg) {
                    var model;
                    (function (model) {
                        var ntsNumber = nts.uk.ntsNumber;
                        var ntsFile = nts.uk.request.file;
                        var resource = nts.uk.resource;
                        var ENUM_STANDART_WIDGET = 0;
                        var ENUM_OPTIONAL_WIDGET = 1;
                        var ENUM_DASBOARD = 2;
                        var ENUM_FLOWMENU = 3;
                        var ENUM_EXTERNALURL = 4;
                        /** Client Placement class */
                        var Placement = /** @class */ (function () {
                            function Placement(placementDto) {
                                // External Url info
                                this.url = "";
                                // External Url for standard Widget
                                this.origin = window.location.origin;
                                // Placement
                                this.placementID = placementDto.placementID;
                                this.row = ntsNumber.getDecimal(placementDto.row, 0);
                                this.column = ntsNumber.getDecimal(placementDto.column, 0);
                                // Placement Part
                                var placementPartDto = placementDto.placementPartDto;
                                this.width = ntsNumber.getDecimal(placementPartDto.width, 0);
                                this.height = ntsNumber.getDecimal(placementPartDto.height, 0);
                                this.type = placementPartDto.type;
                                this.topPagePartID = placementPartDto.topPagePartID;
                                if (this.type == ENUM_FLOWMENU) {
                                    this.topPagePart = new FlowMenu(placementPartDto);
                                    this.name = placementPartDto.topPageName;
                                }
                                else if (this.type == ENUM_EXTERNALURL) {
                                    this.name = "外部URL";
                                    this.url = placementPartDto.url;
                                }
                                else if (this.type == ENUM_STANDART_WIDGET) {
                                    this.topPagePart = new StandardWidget(placementPartDto);
                                    this.name = placementPartDto.topPageName;
                                    if (placementPartDto.topPageCode === "0001") {
                                        this.url = this.origin + "/nts.uk.at.web/view/ktg/001/a/index.xhtml";
                                    }
                                    else if (placementPartDto.topPageCode === "0002") {
                                        this.url = this.origin + "/nts.uk.at.web/view/ktg/002/a/index.xhtml";
                                    }
                                    else if (placementPartDto.topPageCode === "0003") {
                                        this.url = this.origin + "/nts.uk.at.web/view/ktg/027/a/index.xhtml";
                                    }
                                    else if (placementPartDto.topPageCode === "0004") {
                                        this.url = this.origin + "/nts.uk.at.web/view/ktg/030/a/index.xhtml";
                                    }
                                    else if (placementPartDto.topPageCode === "0005") {
                                        this.url = this.origin + "";
                                    }
                                    else if (placementPartDto.topPageCode === "0006") {
                                        this.url = this.origin + "/nts.uk.com.web/view/ktg/031/a/index.xhtml";
                                    }
                                    else if (placementPartDto.topPageCode === "9999") {
                                        this.url = this.origin + "/nts.uk.hr.web/view/jcg/004/a/index.xhtml";
                                    }
                                }
                                else if (this.type == ENUM_OPTIONAL_WIDGET) {
                                    this.topPagePart = new OptionalWidget(placementPartDto);
                                    this.name = placementPartDto.topPageName;
                                    this.url = this.origin + "/nts.uk.at.web/view/ktg/029/a/index.xhtml?code=" + this.topPagePart.topPageCode();
                                }
                            }
                            Placement.prototype.buildPlacementDto = function () {
                                var placementPartDto = {
                                    "type": this.type,
                                    width: this.width,
                                    height: this.height,
                                    url: this.url
                                };
                                if (this.isFlowMenu()) {
                                    var flowmenu = this.topPagePart;
                                    placementPartDto.topPagePartID = flowmenu.topPagePartID(),
                                        placementPartDto.topPageCode = flowmenu.topPageCode(),
                                        placementPartDto.topPageName = flowmenu.topPageName(),
                                        placementPartDto.fileID = flowmenu.fileID(),
                                        placementPartDto.fileName = flowmenu.fileName(),
                                        placementPartDto.defClassAtr = flowmenu.defClassAtr();
                                }
                                else if (this.isStandardWidget()) {
                                    placementPartDto.topPagePartID = this.topPagePartID,
                                        placementPartDto.topPageCode = this.topPagePart.topPageCode(),
                                        placementPartDto.topPageName = this.topPagePart.topPageName();
                                }
                                else if (this.isOptionalWidget()) {
                                    placementPartDto.topPagePartID = this.topPagePartID,
                                        placementPartDto.topPageCode = this.topPagePart.topPageCode(),
                                        placementPartDto.topPageName = this.topPagePart.topPageName();
                                }
                                else if (this.isDashBoard()) {
                                }
                                return {
                                    placementID: this.placementID,
                                    column: this.column,
                                    row: this.row,
                                    placementPartDto: placementPartDto
                                };
                            };
                            Placement.prototype.isExternalUrl = function () {
                                return this.type == ENUM_EXTERNALURL;
                            };
                            Placement.prototype.isFlowMenu = function () {
                                return this.type == ENUM_FLOWMENU;
                            };
                            Placement.prototype.isStandardWidget = function () {
                                return this.type == ENUM_STANDART_WIDGET;
                            };
                            Placement.prototype.isOptionalWidget = function () {
                                return this.type == ENUM_OPTIONAL_WIDGET;
                            };
                            Placement.prototype.isDashBoard = function () {
                                return this.type == ENUM_DASBOARD;
                            };
                            return Placement;
                        }());
                        model.Placement = Placement;
                        var TopPagePart = /** @class */ (function () {
                            function TopPagePart() {
                            }
                            return TopPagePart;
                        }());
                        var FlowMenu = /** @class */ (function (_super) {
                            __extends(FlowMenu, _super);
                            function FlowMenu(dto) {
                                var _this = _super.call(this) || this;
                                _this.topPagePartID = ko.observable((dto && dto.topPagePartID) ? dto.topPagePartID : "");
                                _this.fileID = ko.observable((dto && dto.fileID) ? dto.fileID : "");
                                _this.fileName = ko.observable((dto && dto.fileName) ? dto.fileName : resource.getText("CCG030_25"));
                                _this.defClassAtr = ko.observable((dto && dto.defClassAtr) ? dto.defClassAtr : 0);
                                _this.topPageCode = ko.observable((dto && dto.topPageCode) ? dto.topPageCode : "");
                                _this.topPageName = ko.observable((dto && dto.topPageName) ? dto.topPageName : "");
                                _this.width = ko.observable((dto && dto.width) ? dto.width : 4);
                                _this.height = ko.observable((dto && dto.height) ? dto.height : 4);
                                _this.type = ENUM_FLOWMENU;
                                return _this;
                            }
                            FlowMenu.prototype.getPreviewURL = function () {
                                return ntsFile.liveViewUrl(this.fileID(), "index.htm");
                            };
                            return FlowMenu;
                        }(TopPagePart));
                        model.FlowMenu = FlowMenu;
                        var StandardWidget = /** @class */ (function (_super) {
                            __extends(StandardWidget, _super);
                            function StandardWidget(dto) {
                                var _this = _super.call(this) || this;
                                _this.topPagePartID = ko.observable((dto && dto.topPagePartID) ? dto.topPagePartID : "");
                                _this.topPageCode = ko.observable((dto && dto.topPageCode) ? dto.topPageCode : "");
                                _this.topPageName = ko.observable((dto && dto.topPageName) ? dto.topPageName : "");
                                _this.width = ko.observable((dto && dto.width) ? dto.width : 4);
                                _this.height = ko.observable((dto && dto.height) ? dto.height : 4);
                                _this.type = ENUM_STANDART_WIDGET;
                                return _this;
                            }
                            return StandardWidget;
                        }(TopPagePart));
                        model.StandardWidget = StandardWidget;
                        var OptionalWidget = /** @class */ (function (_super) {
                            __extends(OptionalWidget, _super);
                            function OptionalWidget(dto) {
                                var _this = _super.call(this) || this;
                                _this.topPagePartID = ko.observable((dto && dto.topPagePartID) ? dto.topPagePartID : "");
                                _this.topPageCode = ko.observable((dto && dto.topPageCode) ? dto.topPageCode : "");
                                _this.topPageName = ko.observable((dto && dto.topPageName) ? dto.topPageName : "");
                                _this.width = ko.observable((dto && dto.width) ? dto.width : 4);
                                _this.height = ko.observable((dto && dto.height) ? dto.height : 4);
                                _this.type = ENUM_OPTIONAL_WIDGET;
                                return _this;
                            }
                            return OptionalWidget;
                        }(TopPagePart));
                        model.OptionalWidget = OptionalWidget;
                        var HorizontalAlign = /** @class */ (function () {
                            function HorizontalAlign() {
                            }
                            HorizontalAlign.LEFT = 0;
                            HorizontalAlign.MIDDLE = 1;
                            HorizontalAlign.RIGHT = 2;
                            return HorizontalAlign;
                        }());
                        model.HorizontalAlign = HorizontalAlign;
                        var VerticalAlign = /** @class */ (function () {
                            function VerticalAlign() {
                            }
                            VerticalAlign.TOP = 0;
                            VerticalAlign.CENTER = 1;
                            VerticalAlign.BOTTOM = 2;
                            return VerticalAlign;
                        }());
                        model.VerticalAlign = VerticalAlign;
                    })(model = ccg.model || (ccg.model = {}));
                })(ccg = view.ccg || (view.ccg = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=model.js.map