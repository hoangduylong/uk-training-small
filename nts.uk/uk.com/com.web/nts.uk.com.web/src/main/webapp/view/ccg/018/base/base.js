var ccg018;
(function (ccg018) {
    var base;
    (function (base) {
        /**
         * Shared view model.
         */
        var viewModel;
        (function (viewModel) {
            /**
             * Base screen model.
             */
            var ScreenModelBase = /** @class */ (function () {
                function ScreenModelBase(baseModel) {
                    var self = this;
                    self.title = ko.observable(baseModel.title);
                    self.comboItemsAfterLogin = ko.observableArray(baseModel.comboItemsAfterLogin);
                    self.comboItemsAsTopPage = ko.observableArray(baseModel.comboItemsAsTopPage);
                    self.screenTemplateUrl = ko.observable(baseModel.screenTemplateUrl);
                    self.categorySet = ko.observable(baseModel.categorySet);
                }
                /**
                 * Jump to screen CCG015
                 */
                ScreenModelBase.prototype.jumpToCcg015 = function () {
                    nts.uk.request.jump("/view/ccg/015/a/index.xhtml");
                };
                return ScreenModelBase;
            }());
            viewModel.ScreenModelBase = ScreenModelBase;
        })(viewModel = base.viewModel || (base.viewModel = {}));
        /**
         * Contain base result model.
         */
        var result;
        (function (result) {
            /**
             * Base result model.
             */
            var BaseResultModel = /** @class */ (function () {
                function BaseResultModel() {
                }
                return BaseResultModel;
            }());
            result.BaseResultModel = BaseResultModel;
            var ComboBox = /** @class */ (function () {
                function ComboBox(param) {
                    this.code = param.code;
                    this.name = param.name;
                    this.system = param.system;
                    this.menuCls = param.menuCls;
                    this.uniqueCode = nts.uk.text.format("{0}{1}{2}", param.code, param.system, param.menuCls);
                }
                return ComboBox;
            }());
            result.ComboBox = ComboBox;
        })(result = base.result || (base.result = {}));
    })(base = ccg018.base || (ccg018.base = {}));
})(ccg018 || (ccg018 = {}));
//# sourceMappingURL=base.js.map