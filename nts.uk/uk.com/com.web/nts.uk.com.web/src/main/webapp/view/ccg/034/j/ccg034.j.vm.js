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
                    var j;
                    (function (j_1) {
                        var POPUP_ARROW_ID = 'J_1';
                        var MAXIMUM_IMAGE_COUNT = 4;
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.partData = null;
                                _this.arrowImageList = [];
                                return _this;
                            }
                            ScreenModel.prototype.created = function (params) {
                                var vm = this;
                                vm.partData = params;
                            };
                            ScreenModel.prototype.mounted = function () {
                                var vm = this;
                                // Init popup J
                                // Generate image list
                                for (var firstLoopIndex = 0; firstLoopIndex < 40; firstLoopIndex++) {
                                    vm.arrowImageList.push({ code: firstLoopIndex, name: "../../share/resources/ccg034/j/CCG034J_".concat(nts.uk.text.padLeft(String(firstLoopIndex + 1), '0', 3), ".png") });
                                }
                                // Adding images inside popup
                                for (var i_1 = 0; i_1 < 40; i_1 += MAXIMUM_IMAGE_COUNT) {
                                    var $listImage = [];
                                    for (var j_2 = i_1; j_2 < i_1 + MAXIMUM_IMAGE_COUNT; j_2++) {
                                        $listImage.push($('<img>', {
                                            'id': "J1_".concat(j_2),
                                            'class': 'arrow-pic-preview',
                                            'src': vm.arrowImageList[j_2].name,
                                        })
                                            .on('click', function (event) { return vm.chooseArrow(event); })
                                            .attr('arrow-id', j_2));
                                    }
                                    $("#".concat(POPUP_ARROW_ID))
                                        .append($('<div>').append($listImage));
                                }
                                $("#J1").focus();
                            };
                            ScreenModel.prototype.chooseArrow = function (event) {
                                var vm = this;
                                var itemId = $(event.target).attr('arrow-id');
                                var item = vm.arrowImageList[Number(itemId)];
                                // Update data
                                vm.partData.fileName = item.name;
                                vm.partData.fileSrc = item.name;
                                // Close dialog
                                vm.$window.close(vm.partData);
                            };
                            /**
                            * Close dialog
                            */
                            ScreenModel.prototype.closeDialog = function () {
                                var vm = this;
                                vm.$window.close();
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        j_1.ScreenModel = ScreenModel;
                    })(j = ccg034.j || (ccg034.j = {}));
                })(ccg034 = view.ccg034 || (view.ccg034 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg034.j.vm.js.map