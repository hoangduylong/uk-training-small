var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var ui;
        (function (ui) {
            var jqueryExtentions;
            (function (jqueryExtentions) {
                var ntsSwitchMasterLanguageButton;
                (function (ntsSwitchMasterLanguageButton) {
                    $.fn.ntsSwitchMasterLanguage = function () {
                        var $container = $(this);
                        if (nts.uk.util.isNullOrEmpty($container.attr('id'))) {
                            $container.attr('id', nts.uk.util.randomId());
                        }
                        var tabIndex = $container.attr("tabindex");
                        $container.removeAttr("tabindex");
                        $container.append("<div class='switch_master_language_container'/>");
                        $container.append("<div class='language_select_container'/>");
                        $container.find(".switch_master_language_container").append("<button class='ntsButton ntsSwitchLanguage'>他言語切替</button>");
                        var $button = $container.find(".ntsSwitchLanguage");
                        var $languageSelect = $container.find(".language_select_container");
                        $button.attr("tabindex", tabIndex).click(function (evt) {
                            $languageSelect.append("<div class='language_body'><div class='language_select_contents'/><div id='functions-area-bottom'/></div>");
                            var $functionArea = $languageSelect.find("#functions-area-bottom");
                            $functionArea.css({ 'display': 'flex', 'justify-content': 'center' });
                            var $language = $languageSelect.find(".language_select_contents");
                            $language.css({ 'margin': '0 20px' });
                            $functionArea.append("<button class='ntsButton ntsSelect large proceed'/><button class='ntsButton ntsClose large'/>");
                            $language.append("<table><tbody><tr><td><div class='form-label'><label><span>言語</span></label></div></td>"
                                + "<td><div id='" + nts.uk.util.randomId() + "' class='language_select'/></td></tr></tbody></table>");
                            var $languageCbx = $language.find(".language_select");
                            $languageSelect.find(".language_body").css({ width: '100%', height: '100%' });
                            // Create igCombo.
                            $languageCbx.igCombo({
                                valueKey: "languageId",
                                visibleItemsCount: 5,
                                textKey: 'languageName',
                                mode: "dropdown",
                                placeHolder: '',
                                tabIndex: -1,
                                enableClearButton: false
                            });
                            getSystemLanguage().done(function (data) {
                                $languageCbx.igCombo("option", "dataSource", data);
                                $languageCbx.igCombo("dataBind");
                                if (data.length > 0) {
                                    $languageCbx.igCombo("value", data[0].languageId);
                                }
                            });
                            var $dropDown = $languageCbx.igCombo("dropDown");
                            $languageSelect.dialog({
                                title: "他言語切替",
                                dialogClass: "no-close-btn",
                                modal: true,
                                resizable: false,
                                width: 300,
                                height: $languageSelect.data("firstTime") === false ? 160 : 200,
                                closeOnEscape: false,
                                open: function () {
                                    var dialogZIndex = $language.closest(".ui-dialog").css("z-index");
                                    $dropDown.css("z-index", parseInt(dialogZIndex) + 100);
                                    $language.closest(".ui-dialog-content").css("padding", "0px");
                                    $functionArea.find(".ntsSelect").text("決定").click(function (evt) {
                                        var languages = $languageCbx.igCombo("selectedItems");
                                        if (languages === null) {
                                            nts.uk.ui.dialog.alert("言語を選択してください");
                                            return;
                                        }
                                        var language = languages[0].data;
                                        var changingEvent = new CustomEvent("selectionChanged", {
                                            detail: language,
                                            cancelable: false,
                                        });
                                        clearArea($languageSelect, $languageCbx);
                                        document.getElementById($container.attr('id')).dispatchEvent(changingEvent);
                                    });
                                    $functionArea.find(".ntsClose").text("キャンセル").click(function (evt) {
                                        clearArea($languageSelect, $languageCbx);
                                    });
                                },
                                close: function (event) {
                                }
                            });
                            $languageSelect.data("firstTime", false);
                        });
                    };
                    function getSystemLanguage() {
                        var dfd = $.Deferred();
                        nts.uk.request.ajax("com", "/language/findall")
                            .done(function (res) {
                            dfd.resolve(res);
                        }).fail(function (res) {
                            dfd.reject(res);
                        });
                        return dfd.promise();
                    }
                    function clearArea($languageSelect, $languageCbx) {
                        $languageCbx.igCombo("destroy");
                        $languageSelect.dialog("destroy");
                        $languageSelect.empty();
                    }
                })(ntsSwitchMasterLanguageButton || (ntsSwitchMasterLanguageButton = {}));
            })(jqueryExtentions = ui.jqueryExtentions || (ui.jqueryExtentions = {}));
        })(ui = uk.ui || (uk.ui = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=languagemasterselect-jquery-ext.js.map