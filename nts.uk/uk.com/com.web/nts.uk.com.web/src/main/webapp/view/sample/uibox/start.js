var sample = template.sample;
__viewContext.ready(function () {
    var _this = this;
    var htmlCode, jsCode, validatorCode;
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            this.enable = ko.observable(false);
            this.enable.subscribe(function (enable) {
                if (enable)
                    $select.removeAttr("disabled");
                else
                    $select.attr("disabled", "disabled");
            });
        }
        ScreenModel.prototype.run = function () {
            if ($preview.length == 0)
                return;
            var self = this, pWindow = $preview[0].contentWindow;
            htmlCode.save();
            jsCode.save();
            validatorCode.save();
            var html = htmlCode.getDoc().getValue(), js = jsCode.getDoc().getValue(), validator = validatorCode.getDoc().getValue();
            if (validator != "") {
                nts.uk.request.ajax("/code/env/validator", { validator: validator }).done(function (script) {
                    try {
                        pWindow.build(html, "".concat(script, "\n").concat(js));
                        var msg_1 = "";
                        _.split(validator, '\n').filter(function (pv) {
                            return pv.trim() !== "" && !pWindow.__viewContext.primitiveValueConstraints[pv.substr(_.lastIndexOf(pv, '.') + 1)];
                        }).forEach(function (pv) {
                            msg_1 += "".concat(pv, "\n");
                        });
                        if (msg_1 !== "") {
                            nts.uk.ui.dialog.info(_.escape(msg_1) + nts.uk.resource.getMessage("Msg_1027"));
                        }
                    }
                    catch (e) {
                        nts.uk.ui.dialog.alert(e.message);
                    }
                });
            }
            else {
                try {
                    pWindow.build(html, "__viewContext.primitiveValueConstraints = {};\n".concat(js));
                }
                catch (e) {
                    nts.uk.ui.dialog.alert(e.message);
                }
            }
        };
        return ScreenModel;
    }());
    var vm = new ScreenModel();
    this.bind(vm);
    var $window = $(".preview .window"), runSelected = function (value) {
        var temp = template.sample[value];
        if (!temp)
            return;
        if (!_.isNil(value) && value.indexOf("ntsTextEditor") > -1) {
            loadEC().done(function (ec) {
                if (!_.isNil(ec))
                    $preview[0].contentWindow.__viewContext.primitiveValueConstraints.EmployeeCode = ec;
                htmlCode.getDoc().setValue(!_.isNil(temp.html) ? temp.html : "");
                jsCode.getDoc().setValue(!_.isNil(temp.js) ? temp.js : "");
                validatorCode.getDoc().setValue(!_.isNil(temp.script) ? temp.script : "");
                vm.run();
            });
        }
        else {
            htmlCode.getDoc().setValue(!_.isNil(temp.html) ? temp.html : "");
            jsCode.getDoc().setValue(!_.isNil(temp.js) ? temp.js : "");
            validatorCode.getDoc().setValue(!_.isNil(temp.script) ? temp.script : "");
            vm.run();
        }
    }, loadEC = function () {
        var self = _this, dfd = $.Deferred();
        nts.uk.request.ajax("com", "/bs/employee/setting/code/find").done(function (res) {
            var formatOption = {
                autofill: true
            };
            if (res.ceMethodAttr === 0) {
                formatOption.filldirection = "left";
                formatOption.fillcharacter = "0";
            }
            else if (res.ceMethodAttr === 1) {
                formatOption.filldirection = "right";
                formatOption.fillcharacter = "0";
            }
            else if (res.ceMethodAttr === 2) {
                formatOption.filldirection = "left";
                formatOption.fillcharacter = " ";
            }
            else {
                formatOption.filldirection = "right";
                formatOption.fillcharacter = " ";
            }
            dfd.resolve({
                valueType: "String",
                charType: "AlphaNumeric",
                maxLength: res.numberOfDigits,
                formatOption: formatOption
            });
        }).fail(function (res) {
            dfd.reject();
        });
        return dfd.promise();
    }, $select = $("<select/>").attr("disabled", "disabled").appendTo($("<div id='select-div'/>").appendTo($window)).on("change", function (event) {
        runSelected(event.target.value);
    }), $preview = $("<iframe/>").appendTo($window);
    _.keys(sample).sort(function (c1, c2) {
        var s1 = sample[c1], s2 = sample[c2], order = s1.order - s2.order;
        if (!order)
            return s1.name.localeCompare(s2.name);
        return order;
    }).forEach(function (ctrl) {
        $("<option value=\"".concat(ctrl, "\"/>")).text("".concat(ctrl, " \u25CF ").concat(sample[ctrl].name)).appendTo($select);
    });
    $preview.on("load", function () {
        var viewContext = $preview[0].contentWindow.__viewContext, vmBind = function () {
            runSelected($select[0].options[$select[0].selectedIndex].value);
            $preview[0].contentWindow.nts.uk.ui.viewModelApplied.remove(vmBind);
            vm.enable(true);
        };
        viewContext.program = _.cloneDeep(__viewContext.program);
        viewContext.user = _.cloneDeep(__viewContext.user);
        viewContext.env = _.cloneDeep(__viewContext.env);
        $preview[0].contentWindow.nts.uk.ui.viewModelApplied.add(vmBind);
    });
    $preview[0].contentWindow.location.href = "preview.html";
    htmlCode = CodeMirror.fromTextArea($(".view-area.html textarea")[0], { mode: { name: "xml", htmlMode: true }, lineNumbers: true, styleActiveLine: true, matchBrackets: true, theme: "cobalt" });
    jsCode = CodeMirror.fromTextArea($(".view-area.js textarea")[0], { mode: "javascript", lineNumbers: true, styleActiveLine: true, matchBrackets: true, theme: "cobalt" });
    validatorCode = CodeMirror.fromTextArea($(".view-area.validator textarea")[0], { mode: { name: "xml", htmlMode: true }, lineNumbers: true, styleActiveLine: true, matchBrackets: true, theme: "cobalt" });
});
//# sourceMappingURL=start.js.map