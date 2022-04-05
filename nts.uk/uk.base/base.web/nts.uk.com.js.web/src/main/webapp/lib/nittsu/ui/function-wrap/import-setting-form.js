var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var ui;
        (function (ui) {
            var importSettingForm;
            (function (importSettingForm) {
                var ImportSettingForm = (function () {
                    function ImportSettingForm(option) {
                        this.defaultOption = {
                            selector: ".import-setting-trigger",
                            features: [
                                { name: 'Encoding' }
                            ],
                            onClosed: $.noop()
                        };
                        this.isInit = false;
                        this.EncodeTypes = [
                            {
                                value: 0,
                                fieldName: "ShiftJIS",
                                localizedName: "Shift-JIS"
                            },
                            {
                                value: 1,
                                fieldName: "UTF8",
                                localizedName: "UTF-8"
                            },
                            {
                                value: 2,
                                fieldName: "UTF8BOM",
                                localizedName: "UTF-8 BOM"
                            },
                        ];
                        this.init(option);
                    }
                    ImportSettingForm.prototype.init = function (option) {
                        var self = this;
                        if (self.isInit === false) {
                            var rootScreen = nts.uk.ui.windows.container.windows["MAIN_WINDOW"];
                            var currentScreen = nts.uk.ui.windows.getSelf();
                            var $rootBody = $(rootScreen.globalContext.document).find("body");
                            self.isInit = true;
                            self.option = $.extend({}, this.defaultOption, option);
                            self.$dialog = $("<div id='" + nts.uk.util.randomId() + "'/>")
                                .css({
                                padding: '0px',
                                overflow: 'hidden'
                            })
                                .appendTo($rootBody)
                                .dialog({
                                autoOpen: false,
                                modal: true,
                                width: 500,
                                height: 400,
                                closeOnEscape: false,
                                open: function () {
                                    self.result = undefined;
                                },
                                close: function (event) {
                                    self.option.onClosed.call(this, self.result);
                                }
                            });
                            var $dialogTemplate = $("<div class='import-setting-container'/>").append("<div id='functions-area-bottom'/>").append("<div class='import-setting-body'/>");
                            self.buildEncodeType($dialogTemplate);
                            var $proccedButton = $("<button class='x-large proceed'>決定</button>").on("click", function (event) {
                                self.result = {
                                    encodeType: self.getEncodeType(),
                                    linebreakCode: null,
                                    fileFormat: null,
                                    includeHeader: null
                                };
                                self.$dialog.dialog("close");
                            });
                            var $closeButton = $("<button class='large'>キャンセル</button>").on("click", function (event) { self.$dialog.dialog("close"); });
                            $dialogTemplate.find("#functions-area-bottom").append($proccedButton).append($closeButton);
                            $dialogTemplate.appendTo(self.$dialog);
                            $(self.option.selector).on("click.ImportSettingForm", self.show.bind(self));
                        }
                    };
                    ImportSettingForm.prototype.destroy = function () {
                        var self = this;
                        if (self.isInit) {
                            self.isInit = false;
                            self.$encodeTypeCombo.igCombo("destroy");
                            self.$dialog.dialog("destroy").remove();
                            $(self.option.selector).off("click.ImportSettingForm");
                        }
                    };
                    ImportSettingForm.prototype.refresh = function (option) {
                        this.destroy();
                        this.init(option || this.option);
                    };
                    ImportSettingForm.prototype.show = function () {
                        if (this.isInit)
                            this.$dialog.dialog("open");
                    };
                    ImportSettingForm.prototype.hide = function () {
                        if (this.isInit)
                            this.$dialog.dialog("close");
                    };
                    ImportSettingForm.prototype.buildEncodeType = function ($dialogTemplate) {
                        var self = this;
                        self.$encodeTypeCombo = $("<div id='" + nts.uk.util.randomId() + "' class='encode-type'/>").appendTo($dialogTemplate.find(".import-setting-body"));
                        self.$encodeTypeCombo.igCombo({
                            visibleItemsCount: 5,
                            dataSource: self.EncodeTypes,
                            valueKey: "value",
                            textKey: 'localizedName',
                            mode: "dropdown",
                            placeHolder: '',
                            tabIndex: -1,
                            enableClearButton: false
                        });
                        var dialogZindex = self.$dialog.closest(".ui-dialog").css("z-index");
                        var $encodeTypeDropdown = self.$encodeTypeCombo.igCombo("dropDown").css("z-index", Number(dialogZindex) + 10);
                    };
                    ImportSettingForm.prototype.getEncodeType = function () {
                        var self = this;
                        var encodeType = _.find(self.EncodeTypes, function (item) {
                            return item.value == self.$encodeTypeCombo.igCombo("value");
                        });
                        return encodeType;
                    };
                    return ImportSettingForm;
                }());
                importSettingForm.ImportSettingForm = ImportSettingForm;
            })(importSettingForm = ui.importSettingForm || (ui.importSettingForm = {}));
        })(ui = uk.ui || (uk.ui = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=import-setting-form.js.map