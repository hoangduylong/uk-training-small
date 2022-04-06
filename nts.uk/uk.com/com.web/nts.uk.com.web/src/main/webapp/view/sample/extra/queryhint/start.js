__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            this.cacheUsages = [{ name: "UseEntityDefault", value: "UseEntityDefault" },
                { name: "DoNotCheckCache", value: "DoNotCheckCache" },
                { name: "CheckCacheByExactPrimaryKey", value: "CheckCacheByExactPrimaryKey" },
                { name: "CheckCacheByPrimaryKey", value: "CheckCacheByPrimaryKey" },
                { name: "CheckCacheThenDatabase", value: "CheckCacheThenDatabase" },
                { name: "CheckCacheOnly", value: "CheckCacheOnly" },
                { name: "NoCache", value: "NoCache" },
                { name: "Invalidate", value: "Invalidate" }];
            this.batchTypes = [{ name: "JOIN", value: "JOIN" },
                { name: "EXISTS", value: "EXISTS" },
                { name: "IN", value: "IN" }];
            this.batchWrites = [{ name: "None", value: "None" },
                { name: "JDBC", value: "JDBC" },
                { name: "Buffered", value: "Buffered" },
                { name: "OracleJDBC", value: "Oracle-JDBC" }];
            this.fetchSize = ko.observable(0);
            this.cacheStatement = ko.observable(false);
            this.cacheStatementSize = ko.observable(0);
            this.cacheQueryResultSize = ko.observable(0);
            this.cacheUsage = ko.observable("");
            this.batchSize = ko.observable(0);
            this.batchType = ko.observable("");
            this.batchWrite = ko.observable("");
            this.batchWriteSize = ko.observable(0);
            this.flushMode = ko.observable(false);
            this.autoSetHint = ko.observable(false);
        }
        ScreenModel.prototype.load = function () {
            var _this = this;
            nts.uk.request.ajax("query/hint/setting/get").done(function (res) {
                _this.autoSetHint(res.setting.autoSetHint);
                _this.fetchSize(res.setting.fetchSize);
                _this.cacheStatement(res.setting.cacheStatement);
                _this.cacheStatementSize(res.setting.cacheStatementSize);
                _this.cacheQueryResultSize(res.setting.cacheQueryResultSize);
                _this.cacheUsage(res.setting.cacheUsage);
                _this.batchSize(res.setting.batchSize);
                _this.batchType(res.setting.batchType);
                _this.batchWrite(res.setting.batchWriteType);
                _this.batchWriteSize(res.setting.batchWriteSize);
                _this.flushMode(res.setting.flushMode);
            });
        };
        ScreenModel.prototype.update = function () {
            nts.uk.request.ajax("query/hint/setting/update", {
                setting: {
                    fetchSize: this.fetchSize(),
                    cacheStatement: this.cacheStatement(),
                    cacheStatementSize: this.cacheStatementSize(),
                    cacheQueryResultSize: this.cacheQueryResultSize(),
                    cacheUsage: this.cacheUsage(),
                    batchSize: this.batchSize(),
                    batchType: this.batchType(),
                    batchWriteType: this.batchWrite(),
                    batchWriteSize: this.batchWriteSize(),
                    flushMode: this.flushMode(),
                    autoSetHint: this.autoSetHint()
                }
            }).done(function (res) {
                nts.uk.ui.dialog.info("Done!");
            });
        };
        return ScreenModel;
    }());
    var sm = new ScreenModel();
    this.bind(sm);
    sm.load();
});
//# sourceMappingURL=start.js.map