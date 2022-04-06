var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg026;
                (function (ccg026) {
                    var component;
                    (function (component) {
                        var ajax = nts.uk.request.ajax;
                        var text = nts.uk.resource.getText;
                        var fetch = {
                            com_mngr: function (roleId) { return ajax('com', 'sys/auth/workplace/get-list', roleId); },
                            person_info: function (roleId) { return ajax('com', 'ctx/pereg/functions/auth/find-with-role', roleId); }
                        };
                        ko.components.register('ccg026-component', {
                            template: "\n        <!-- ko let: { text: nts.uk.resource.getText } -->\n        <!-- ko if: ko.toJS(label.text) -->\n        <div data-bind=\"ntsFormLabel: {\n                required: label.require,\n                text: text(ko.toJS(label.text))\n            },\n            style: {\n                'margin-bottom': '10px'\n            }\"></div>\n        <!-- /ko -->\n        <style type=\"text/css\">\n            [id^=\"permision_grid\"] td,\n            [id^=\"permision_grid\"][id$=\"_headers\"] th {\n                border-top: 0;\n                border-right: 0;\n                line-height: 24px;\n            }\n\n            [id^=\"permision_grid\"] td:first-child,\n            [id^=\"permision_grid\"][id$=\"_headers\"] th:first-child {\n                border-left: 0;\n            }\n            \n            [id^=\"permision_grid\"] tr:last-child td {\n                border-bottom: 0;\n            }\n    \n            [id^=\"permision_grid\"] td .ntsCheckBox {\n                display: block;\n                text-align: center;\n            }\n\n            [id^=\"container_permision_grid\"] {\n                border: 1px solid #ccc;\n            }\n\n            [id^=\"permision_grid\"] .ntsCheckBox-label {\n                outline: none;\n                display: inline;\n            }\n\n            [id^=\"permision_grid\"] .ntsCheckBox-label:focus span.box {\n                border-color: #0096f2;\n                box-shadow: 0 0 1px 1px #0096f2;\n            }\n\n            [id^=\"permision_grid\"] td[role=\"gridcell\"] {\n                white-space: nowrap;\n            }\n\n            [id^=\"container_permision_grid\"] .ui-tooltip {\n                border: none;\n                background: none;\n                box-shadow: none;\n                width: auto !important;\n                max-width: 800px !important;\n            }\n\n            [id^=\"container_permision_grid\"] .ui-tooltip .ui-tooltip-content {\n                white-space: nowrap;\n                background: #ffc;\n                border: solid 1px #b85;\n                padding: 5px;\n                width: auto !important;\n                max-width: 800px !important;\n            }\n        </style>\n        <div id=\"container_permision_grid\">\n            <table id='permision_grid'></table>\n        </div>\n        <!-- /ko -->\n    ",
                            viewModel: {
                                createViewModel: function (params, componentInfo) {
                                    var defaultGridId = 'permision_grid', defaultContainerId = 'container_permision_grid', compId = componentInfo.element.id, finalGridId = _.isEmpty(compId) ? defaultGridId : defaultGridId + '_' + compId, $element = $(componentInfo.element), $grid = $element.find('#' + defaultGridId), $container = $element.find('#' + defaultContainerId);
                                    if (!_.isEmpty(compId)) {
                                        $grid.attr('id', finalGridId);
                                        $container.attr('id', defaultContainerId + '_' + compId);
                                    }
                                    var requestDone = function (data, rechange) {
                                        if (rechange === void 0) { rechange = CHANGED.LOAD_AND_CHANGE; }
                                        //Get
                                        var scrollTop = $("#".concat($grid.attr('id'), "_scroll")).scrollTop();
                                        data = _.orderBy(data, ['orderNumber']);
                                        // fire changeDate for first action
                                        if (rechange == CHANGED.CHANGE) {
                                            params.changeData(data);
                                        }
                                        else if (rechange == CHANGED.LOAD) {
                                            // change grid dataSource
                                            $grid = $element.find('#' + finalGridId);
                                            $grid.igGrid("option", "dataSource", ko.toJS(data));
                                            setTimeout(function () {
                                                $("#".concat($grid.attr('id'), "_scroll")).scrollTop(scrollTop);
                                            }, 0);
                                        }
                                        else {
                                            params.changeData(data);
                                            // change grid dataSource
                                            $grid = $element.find('#' + finalGridId);
                                            $grid.igGrid("option", "dataSource", ko.toJS(data));
                                        }
                                    };
                                    _.extend(params, {
                                        label: {
                                            text: ((params || { label: { text: '' } }).label || { text: '' }).text,
                                            require: ((params || { label: { require: false } }).label || { require: false }).require
                                        }
                                    });
                                    // extend roleId & roleType
                                    if (params.roleId && params.roleType) {
                                        if (!ko.isObservable(params.roleId)) {
                                            _.extend(params, {
                                                roleId: ko.observable(params.roleId)
                                            });
                                        }
                                        if (!ko.isObservable(params.roleType)) {
                                            _.extend(params, {
                                                roleType: ko.observable(params.roleType)
                                            });
                                        }
                                    }
                                    else {
                                        _.extend(params, {
                                            roleId: ko.observable(''),
                                            roleType: ko.observable('')
                                        });
                                    }
                                    params.roleId.subscribe(function (v) {
                                        params.roleType.valueHasMutated();
                                    });
                                    // fetch data when subscribe
                                    params.roleType.subscribe(function (v) {
                                        var roleId = ko.toJS(params.roleId), oldData = $element.data('OLD_DATA') || { roleId: undefined, roleType: undefined }, compare = {
                                            roleId: roleId,
                                            roleType: v
                                        };
                                        if (!_.isEmpty(roleId) && !_.isEqual(oldData, compare) && !ko.isObservable(params.changeData)) {
                                            switch (v) {
                                                case ROLE_TYPE.COMPANY_MANAGER:
                                                    fetch.com_mngr(roleId).done(function (data) {
                                                        requestDone(data, CHANGED.LOAD_AND_CHANGE);
                                                    });
                                                    break;
                                                case ROLE_TYPE.PERSONAL_INFO:
                                                    fetch.person_info(roleId).done(function (data) {
                                                        requestDone(data, CHANGED.LOAD_AND_CHANGE);
                                                    });
                                                    break;
                                                default:
                                                    requestDone([], CHANGED.LOAD_AND_CHANGE);
                                                    break;
                                            }
                                        }
                                        $element.data('OLD_DATA', compare);
                                    });
                                    params.roleType.valueHasMutated();
                                    $grid
                                        .igGrid({
                                        width: "100%",
                                        height: "".concat((ko.toJS(params.maxRow) || 10) * 32 + 27, "px"),
                                        primaryKey: "functionNo",
                                        enableHoverStyles: false,
                                        features: [
                                            {
                                                name: "Tooltips"
                                            }
                                        ],
                                        columns: [
                                            { headerText: 'コード', key: 'functionNo', hidden: true },
                                            { headerText: text('CCG026_2'), key: 'functionName', width: "240px" },
                                            {
                                                headerText: text('CCG026_3'), key: 'available', width: "70px",
                                                template: '<div class="ntsControl ntsCheckBox">\
                                            <label class="ntsCheckBox-label">\
                                                <input type="checkbox" value="${functionNo}">\
                                                <span class="box"></span>\
                                            </label>\
                                       </div>'
                                            },
                                            { headerText: text('CCG026_4'), key: 'description' }
                                        ],
                                        dataRendered: function (evt, ui) {
                                            // remove all tabindex of control
                                            $container.find('[tabindex=0]').removeAttr('tabindex');
                                            // set tabindex for checkbox
                                            $container.find('label.ntsCheckBox-label')
                                                .attr('tabindex', params.tabindex || 0)
                                                .on('keypress', function (evt) {
                                                if ([13, 32].indexOf(evt.keyCode) > -1) {
                                                    $(evt.target).find('input[type="checkbox"]').trigger('click');
                                                    return false;
                                                }
                                            });
                                            // check and bind change event to checkbox
                                            $container.find('input[type="checkbox"]')
                                                .each(function (i, input) {
                                                $grid = $element.find('#' + finalGridId);
                                                var data = $grid.igGrid("option", "dataSource"), row = _.find(data, function (r) { return _.isEqual(Number(r['functionNo']), Number(input.value)); });
                                                if (row && row['available']) {
                                                    input.checked = true;
                                                }
                                                input.disabled = row && row['disabled'] == true ? true : false;
                                                $(input)
                                                    .on('change', function (evt) {
                                                    // change
                                                    row['available'] = !!input.checked;
                                                    $element.data('nts_focus', input.value);
                                                    // push data to viewModel
                                                    requestDone(data, CHANGED.CHANGE);
                                                });
                                            });
                                        },
                                        dataSource: []
                                    });
                                    if (ko.isObservable(params.changeData)) {
                                        params.changeData.subscribe(function (data) {
                                            $grid = $element.find('#' + finalGridId);
                                            if (!_.isEqual($grid.igGrid("option", "dataSource"), data)) {
                                                requestDone(data, CHANGED.LOAD);
                                            }
                                            // set weight of grid
                                            $grid.igGrid("option", "height", "".concat(_.min([ko.toJS(params.maxRow) || 0, _.size(data)]) * 32 + 27, "px"));
                                        });
                                    }
                                    return params;
                                }
                            }
                        });
                        var CHANGED;
                        (function (CHANGED) {
                            CHANGED[CHANGED["LOAD"] = 0] = "LOAD";
                            CHANGED[CHANGED["CHANGE"] = 1] = "CHANGE";
                            CHANGED[CHANGED["LOAD_AND_CHANGE"] = 2] = "LOAD_AND_CHANGE";
                        })(CHANGED = component.CHANGED || (component.CHANGED = {}));
                        var ROLE_TYPE;
                        (function (ROLE_TYPE) {
                            /** The system manager. */
                            // システム管理者
                            ROLE_TYPE[ROLE_TYPE["SYSTEM_MANAGER"] = 0] = "SYSTEM_MANAGER";
                            /** The company manager. */
                            // 会社管理者
                            ROLE_TYPE[ROLE_TYPE["COMPANY_MANAGER"] = 1] = "COMPANY_MANAGER";
                            /** The group comapny manager. */
                            // グループ会社管理者
                            ROLE_TYPE[ROLE_TYPE["GROUP_COMAPNY_MANAGER"] = 2] = "GROUP_COMAPNY_MANAGER";
                            /** The employment. */
                            // 就業
                            ROLE_TYPE[ROLE_TYPE["EMPLOYMENT"] = 3] = "EMPLOYMENT";
                            /** The salary. */
                            // 給与
                            ROLE_TYPE[ROLE_TYPE["SALARY"] = 4] = "SALARY";
                            /** The human resource. */
                            // 人事
                            ROLE_TYPE[ROLE_TYPE["HUMAN_RESOURCE"] = 5] = "HUMAN_RESOURCE";
                            /** The office helper. */
                            // オフィスヘルパー
                            ROLE_TYPE[ROLE_TYPE["OFFICE_HELPER"] = 6] = "OFFICE_HELPER";
                            /** The my number. */
                            // マイナンバー
                            ROLE_TYPE[ROLE_TYPE["MY_NUMBER"] = 7] = "MY_NUMBER";
                            /** The personal info. */
                            // 個人情報
                            ROLE_TYPE[ROLE_TYPE["PERSONAL_INFO"] = 8] = "PERSONAL_INFO";
                        })(ROLE_TYPE = component.ROLE_TYPE || (component.ROLE_TYPE = {}));
                    })(component = ccg026.component || (ccg026.component = {}));
                })(ccg026 = view.ccg026 || (view.ccg026 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=component.js.map