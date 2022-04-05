__viewContext.ready(function () {
    class ScreenModel {
        
        autoSetHint: KnockoutObservable<boolean>;
        fetchSize: KnockoutObservable<number>;
        cacheStatement: KnockoutObservable<boolean>;
        cacheStatementSize: KnockoutObservable<number>;
        cacheQueryResultSize: KnockoutObservable<number>;
        cacheUsage: KnockoutObservable<string>;
        batchSize: KnockoutObservable<number>;
        batchType: KnockoutObservable<string>;
        batchWrite: KnockoutObservable<string>;
        batchWriteSize: KnockoutObservable<number>;
        flushMode: KnockoutObservable<boolean>;
        cacheUsages:Array<any> = [ {name: "UseEntityDefault", value: "UseEntityDefault"},
                        {name: "DoNotCheckCache", value: "DoNotCheckCache"},
                        {name: "CheckCacheByExactPrimaryKey", value: "CheckCacheByExactPrimaryKey"},
                        {name: "CheckCacheByPrimaryKey", value: "CheckCacheByPrimaryKey"},
                        {name: "CheckCacheThenDatabase", value: "CheckCacheThenDatabase"},
                        {name: "CheckCacheOnly", value: "CheckCacheOnly"},
                        {name: "NoCache", value: "NoCache"},
                        {name: "Invalidate", value: "Invalidate"}];
        batchTypes:Array<any> = [ {name: "JOIN", value: "JOIN"},
                        {name: "EXISTS", value: "EXISTS"},
                        {name: "IN", value: "IN"}];
        batchWrites:Array<any> = [ {name: "None", value: "None"},
                        {name: "JDBC", value: "JDBC"},
                        {name: "Buffered", value: "Buffered"},
                        {name: "OracleJDBC", value: "Oracle-JDBC"}];
        
        constructor() {
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
    
        load() {
            nts.uk.request.ajax("query/hint/setting/get").done(res => {
                this.autoSetHint(res.setting.autoSetHint);
                this.fetchSize(res.setting.fetchSize);
                this.cacheStatement(res.setting.cacheStatement);
                this.cacheStatementSize(res.setting.cacheStatementSize);
                this.cacheQueryResultSize(res.setting.cacheQueryResultSize);
                this.cacheUsage(res.setting.cacheUsage);
                this.batchSize(res.setting.batchSize);
                this.batchType(res.setting.batchType);
                this.batchWrite(res.setting.batchWriteType);
                this.batchWriteSize(res.setting.batchWriteSize);
                this.flushMode(res.setting.flushMode);
            });
        }
        
        update() {
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
            }).done(res => {
                nts.uk.ui.dialog.info("Done!");
            });
        }
        
    }
    
    var sm = new ScreenModel();
    this.bind(sm);
    
        sm.load();
    
});
