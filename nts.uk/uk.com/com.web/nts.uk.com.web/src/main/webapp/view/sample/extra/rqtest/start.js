__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            this.paramsJSON = [];
            this.site = ko.observable('');
            this.ccd = ko.observable('');
            this.scd = ko.observable('');
            this.password = ko.observable('');
            this.pubclass = ko.observable('');
            this.method = ko.observable('');
            this.params = ko.observable('[]');
            this.bool_value = ko.observable(false);
            this.num_value = ko.observable('');
            this.str_value = ko.observable('');
            this.date_value = ko.observable('');
            this.period_str = ko.observable('');
            this.period_end = ko.observable('');
            this.list_value = ko.observable('');
            this.result = ko.observable('');
        }
        ScreenModel.prototype.add_bol = function () {
            this.paramsJSON = JSON.parse(this.params());
            this.paramsJSON.push({
                type: 'boolean',
                value: this.bool_value()
            });
            this.params(JSON.stringify(this.paramsJSON).replace(/},/g, '},\r\n'));
        };
        ScreenModel.prototype.add_num = function () {
            this.paramsJSON = JSON.parse(this.params());
            this.paramsJSON.push({
                type: 'int',
                value: parseInt(this.num_value())
            });
            this.params(JSON.stringify(this.paramsJSON).replace(/},/g, '},\r\n'));
        };
        ScreenModel.prototype.add_str = function () {
            this.paramsJSON = JSON.parse(this.params());
            this.paramsJSON.push({
                type: 'string',
                value: this.str_value()
            });
            this.params(JSON.stringify(this.paramsJSON).replace(/},/g, '},\r\n'));
        };
        ScreenModel.prototype.add_dt = function () {
            this.paramsJSON = JSON.parse(this.params());
            this.paramsJSON.push({
                type: 'generaldate',
                value: this.date_value()
            });
            this.params(JSON.stringify(this.paramsJSON).replace(/},/g, '},\r\n'));
        };
        ScreenModel.prototype.add_prd = function () {
            this.paramsJSON = JSON.parse(this.params());
            this.paramsJSON.push({
                type: 'dateperiod',
                value: this.period_str() + '-' + this.period_end()
            });
            this.params(JSON.stringify(this.paramsJSON).replace(/},/g, '},\r\n'));
        };
        ScreenModel.prototype.add_lst = function () {
            this.paramsJSON = JSON.parse(this.params());
            this.paramsJSON.push({
                type: 'list',
                value: this.list_value().split(',')
            });
            this.params(JSON.stringify(this.paramsJSON).replace(/},/g, '},\r\n'));
        };
        ScreenModel.prototype.clear = function () {
            this.paramsJSON = [];
            this.params(JSON.stringify(this.paramsJSON).replace(/},/g, '},\r\n'));
        };
        ScreenModel.prototype.run = function () {
            var _this = this;
            this.paramsJSON = JSON.parse(this.params());
            nts.uk.request.ajax('/test/cdi/invoke', {
                pubClass: this.pubclass(),
                method: this.method(),
                params: this.paramsJSON
            }).done(function (res) {
                _this.result("success\r\n" + res);
            }).fail(function (rej) {
                this.result("failure\r\n" + rej);
            });
        };
        return ScreenModel;
    }());
    this.bind(new ScreenModel());
});
//# sourceMappingURL=start.js.map