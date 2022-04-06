var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg031;
                (function (ccg031) {
                    var b;
                    (function (b) {
                        var viewmodel;
                        (function (viewmodel) {
                            var util = nts.uk.util;
                            var windows = nts.uk.ui.windows;
                            var resource = nts.uk.resource;
                            var block = nts.uk.ui.block;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    // PGType
                                    this.pgType = 0;
                                    // Position
                                    this.positionRow = ko.observable(null);
                                    this.positionColumn = ko.observable(null);
                                    // TopPage Part Type
                                    this.listPartType = ko.observableArray([]);
                                    this.selectedPartType = ko.observable(null);
                                    //TopPage Part
                                    this.allPart = ko.observableArray([]);
                                    this.listPart = ko.observableArray([]);
                                    this.selectedPartID = ko.observable(null);
                                    this.selectedPart = ko.observable(null);
                                    // External Url
                                    this.isExternalUrl = ko.observable(false);
                                    this.urlWidth = ko.observable(null);
                                    this.urlHeight = ko.observable(null);
                                    this.url = ko.observable(null);
                                    // UI Binding
                                    this.instructionText = ko.observable('');
                                    var self = this;
                                    // TopPage Part
                                    self.selectedPartType.subscribe(function (value) {
                                        self.filterPartType(value);
                                    });
                                    self.selectedPartID.subscribe(function (value) { self.changeSelectedPart(value); });
                                    self.listPartColumn = [
                                        { headerText: "ID", key: "topPagePartID", dataType: "string", hidden: true },
                                        { headerText: resource.getText("CCG031_27"), key: "code", dataType: "string", width: 50 },
                                        { headerText: resource.getText("CCG031_28"), key: "name", dataType: "string", formatter: _.escape },
                                    ];
                                }
                                /** Start Page */
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    block.invisible();
                                    // Shared
                                    self.pgType = windows.getShared("pgtype");
                                    self.positionRow(windows.getShared("size").row);
                                    self.positionColumn(windows.getShared("size").column);
                                    // Get Type and Part
                                    b.service.findAll(self.pgType).done(function (data) {
                                        // Binding TopPage Part Type
                                        _.each(data.listTopPagePartType, function (partType) {
                                            partType.localizedName = resource.getText(partType.localizedName);
                                        });
                                        self.listPartType(data.listTopPagePartType);
                                        // Binding TopPage Part
                                        self.allPart(data.listTopPagePart);
                                        // Default value
                                        if (data.listTopPagePartType.length > 0)
                                            self.selectedPartType(data.listTopPagePartType[0].value);
                                        self.selectFirstPart();
                                        dfd.resolve();
                                    }).fail(function (res) {
                                        dfd.fail();
                                    }).always(function () {
                                        block.clear();
                                    });
                                    return dfd.promise();
                                };
                                /** Submit Dialog */
                                ScreenModel.prototype.submitDialog = function () {
                                    var self = this;
                                    if (self.isExternalUrl() === true)
                                        $(".nts-validate").trigger("validate");
                                    if (!$(".nts-validate").ntsError("hasError")) {
                                        var placement = self.buildReturnPlacement();
                                        windows.setShared("placement", placement, false);
                                        windows.close();
                                    }
                                };
                                /** Close Dialog */
                                ScreenModel.prototype.closeDialog = function () {
                                    windows.close();
                                };
                                /** Filter by Type */
                                ScreenModel.prototype.filterPartType = function (partType) {
                                    var isExternalUrl = (partType === 4);
                                    this.isExternalUrl(isExternalUrl);
                                    if (isExternalUrl !== true) {
                                        if (nts.uk.ui._viewModel)
                                            $(".nts-validate").ntsError("clear");
                                        var listPart = _.chain(this.allPart()).filter(['type', partType]).sortBy("code").value();
                                        this.listPart(listPart);
                                        this.isExternalUrl(isExternalUrl);
                                        this.selectFirstPart();
                                    }
                                    // UI binding: Instruction Text
                                    if (partType === 0)
                                        this.instructionText(resource.getText("CCG031_17"));
                                    if (partType === 1)
                                        this.instructionText(resource.getText("CCG031_17"));
                                    if (partType === 2)
                                        this.instructionText(resource.getText("CCG031_18"));
                                    if (partType === 3)
                                        this.instructionText(resource.getText("CCG031_19"));
                                };
                                /** Change Selected Part */
                                ScreenModel.prototype.changeSelectedPart = function (partID) {
                                    var selectedPart = _.find(this.allPart(), ['topPagePartID', partID]);
                                    if (selectedPart != undefined) {
                                        selectedPart.codeName = nts.uk.text.padLeft(selectedPart.code, '0', 4) + ' ' + selectedPart.name;
                                        this.selectedPart(selectedPart);
                                    }
                                    else {
                                        this.selectedPart(null);
                                    }
                                };
                                /** Select first Part */
                                ScreenModel.prototype.selectFirstPart = function () {
                                    var firstPart = _.head(this.listPart());
                                    (firstPart !== undefined) ? this.selectedPartID(firstPart.topPagePartID) : this.selectedPartID(null);
                                };
                                /** Build a return Placement for LayoutSetting */
                                ScreenModel.prototype.buildReturnPlacement = function () {
                                    var self = this;
                                    // Default is External Url
                                    var placementPartDto = {
                                        topPagePartID: "",
                                        "type": 4,
                                        width: self.urlWidth(),
                                        height: self.urlHeight(),
                                        url: self.url(),
                                    };
                                    // In case is TopPagePart
                                    if (self.selectedPartType() !== 4) {
                                        if (!util.isNullOrUndefined(self.selectedPart())) {
                                            placementPartDto.topPagePartID = self.selectedPart().topPagePartID;
                                            placementPartDto.type = self.selectedPartType();
                                        }
                                        else {
                                            return null;
                                        }
                                    }
                                    var placementDto = {
                                        placementID: util.randomId(),
                                        column: self.positionColumn(),
                                        row: self.positionRow(),
                                        placementPartDto: placementPartDto
                                    };
                                    return placementDto;
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = b.viewmodel || (b.viewmodel = {}));
                    })(b = ccg031.b || (ccg031.b = {}));
                })(ccg031 = view.ccg031 || (view.ccg031 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg031.b.vm.js.map