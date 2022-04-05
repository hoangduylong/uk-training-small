__viewContext.ready(function () {
    class ScreenModel {

        site: KnockoutObservable<string>;
        ccd: KnockoutObservable<string>;
        scd: KnockoutObservable<string>;
        password: KnockoutObservable<string>;
        pubclass: KnockoutObservable<string>;
        method: KnockoutObservable<string>;
        params: KnockoutObservable<string>;
        bool_value: KnockoutObservable<boolean>;
        num_value: KnockoutObservable<string>;
        str_value: KnockoutObservable<string>;
        date_value: KnockoutObservable<string>;
        period_str: KnockoutObservable<string>;
        period_end: KnockoutObservable<string>;
        list_value: KnockoutObservable<string>;
        result: KnockoutObservable<string>;
        paramsJSON: string;

        constructor() {
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

        add_bol() {
    		this.paramsJSON = JSON.parse(this.params());
    		this.paramsJSON.push({
    			type: 'boolean',
    			value: this.bool_value()
            });
    		this.params(JSON.stringify(this.paramsJSON).replace(/},/g,'},\r\n'));
        }

        add_num() {
    		this.paramsJSON = JSON.parse(this.params());
    		this.paramsJSON.push({
    			type: 'int',
    			value: parseInt(this.num_value())
            });
    		this.params(JSON.stringify(this.paramsJSON).replace(/},/g,'},\r\n'));
        }

        add_str() {
    		this.paramsJSON = JSON.parse(this.params());
    		this.paramsJSON.push({
    			type: 'string',
    			value: this.str_value()
            });
    		this.params(JSON.stringify(this.paramsJSON).replace(/},/g,'},\r\n'));
        }

        add_dt() {
    		this.paramsJSON = JSON.parse(this.params());
    		this.paramsJSON.push({
    			type: 'generaldate',
    			value: this.date_value()
            });
    		this.params(JSON.stringify(this.paramsJSON).replace(/},/g,'},\r\n'));
        }

        add_prd() {
    		this.paramsJSON = JSON.parse(this.params());
    		this.paramsJSON.push({
    			type: 'dateperiod',
    			value: this.period_str() + '-' + this.period_end()
            });
    		this.params(JSON.stringify(this.paramsJSON).replace(/},/g,'},\r\n'));
        }

        add_lst() {
    		this.paramsJSON = JSON.parse(this.params());
    		this.paramsJSON.push({
    			type: 'list',
    			value: this.list_value().split(',')
            });
    		this.params(JSON.stringify(this.paramsJSON).replace(/},/g,'},\r\n'));
        }

        clear() {
    		this.paramsJSON = [];
    		this.params(JSON.stringify(this.paramsJSON).replace(/},/g,'},\r\n'));
        }

        run() {
    		this.paramsJSON = JSON.parse(this.params());
    		nts.uk.request.ajax('/test/cdi/invoke', {
    			pubClass: this.pubclass(),
    			method: this.method(),
    			params: this.paramsJSON
            }).done(res => {
    			this.result("success\r\n" + res);
            }).fail(function(rej){
    			this.result("failure\r\n" + rej);
    		});
        }

    }
    this.bind(new ScreenModel());
});
