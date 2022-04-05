module nts.uk.com.view.cdl028.a.viewmodel {

    import setShared = nts.uk.ui.windows.setShared;

    export class ScreenModel {
        required: KnockoutObservable<boolean>;
        enable: KnockoutObservable<boolean>;
        yearValue: KnockoutObservable<any> = ko.observable({startDate: null, endDate: null});
        startDateString: KnockoutObservable<string>;
        endDateString: KnockoutObservable<string>;
        modeScreen : KnockoutObservable<number> = ko.observable(null);

        firstMonth : KnockoutObservable<number> =ko.observable(null);
        financialYear: KnockoutObservable<number> =ko.observable(null);
        standardDate: KnockoutObservable<number> =ko.observable(null);

        startDateFiscalYear: KnockoutObservable<number> =ko.observable(null);
        endDateFiscalYear: KnockoutObservable<number> =ko.observable(null);
        endDateDay: KnockoutObservable<number> =ko.observable(null);
        standardYearMonth: KnockoutObservable<number> = ko.observable(null);

        constructor() {
            var self = this;
            let params: any = nts.uk.ui.windows.getShared("CDL028_INPUT");
            if (params == null || params === undefined) {
                return;
            }
            self.standardYearMonth(parseInt(moment(Date.now()).format("YYYYMM")));
            self.modeScreen(params.mode);
            self.standardDate(params.date == null ? parseInt(moment().utc().format("YYYYMMDD")) : nts.uk.time.parseYearMonthDate(moment(params.date).format("YYYYMMDD")).toValue());
        }
        /**
         * startPage
         */
        public startPage(): JQueryPromise<any> {
            let self = this, dfd = $.Deferred();
            var now = moment().utc();
            let newDate : string = now.format("YYYY/MM/DD");
            self.required = ko.observable(false);
            self.startDateString = ko.observable();
            self.endDateString = ko.observable("");
            self.standardDate() == null ? newDate : self.standardDate();
            let startDateTemp:number = self.convertYearToInt(self.standardDate());
            let startMonthDB: number;
            switch (self.modeScreen()){

                case MODE_SCREEN.BASE_DATE:
                    self.standardDate();
                    break;

                case MODE_SCREEN.ALL:
                    self.standardDate();
                    service.getStartMonth().done(function(response: IStartMonth) {
                        if(response.startMonth != null){
                            startMonthDB = response.startMonth;
                            if(startMonthDB > self.getMonthToInt(self.standardDate())){
                                self.yearValue({startDate: (startDateTemp - 1) + "",endDate : (startDateTemp - 1) + "" });
                            }else{
                                self.yearValue({startDate: moment.utc().format("YYYY"), endDate: moment.utc().format("YYYY")});
                            }
                            if(( startMonthDB) >= self.getMonthToInt(self.standardDate())){
                                self.financialYear(startDateTemp+""+startMonthDB +"01");
                            } else {
                                self.financialYear((startDateTemp - 1)+""+startMonthDB+"01");
                            }
                            self.firstMonth(startMonthDB);

                        }
                    }).fail(function() {
                        setShared('CDL028_A_PARAMS', {
                            status: false
                        });
                        nts.uk.ui.windows.close();
                    });
                    break;

                case MODE_SCREEN.YEAR_PERIOD_FINANCE:
                    service.getStartMonth().done((response: IStartMonth)=> {
                        if(response.startMonth != null){
                            startMonthDB = response.startMonth;
                            if(startMonthDB > self.getMonthToInt(self.standardDate())){
                                self.yearValue({startDate: (startDateTemp - 1) + "",endDate : (startDateTemp - 1) + "" });
                            }else{
                                self.yearValue({startDate: moment.utc().format("YYYY"), endDate: moment.utc().format("YYYY")});
                            }
                            if(( startMonthDB) >= self.getMonthToInt(self.standardDate())){
                                self.financialYear(startDateTemp+""+startMonthDB +"01");
                            } else {
                                self.financialYear((startDateTemp - 1)+""+startMonthDB+"01");
                            }
                            self.firstMonth(startMonthDB);
                        }
                    }).fail(function() {
                        setShared('CDL028_A_PARAMS', {
                            status: false
                        });
                        nts.uk.ui.windows.close();
                    });

                    break;

                case MODE_SCREEN.YEAR_PERIOD:
                    self.standardDate(self.convertYearToInt(self.standardDate())+"0101");
                    self.yearValue({startDate: moment.utc().format("YYYY"), endDate: moment.utc().format("YYYY")});
                    break;

            }

            dfd.resolve();
            return dfd.promise();
        }

        /**
         * proceed
         */
        proceed(){
            let self = this, dfd = $.Deferred();
            switch (self.modeScreen()){

                case MODE_SCREEN.BASE_DATE:
                    self.standardDate();
                    self.startDateFiscalYear(null);
                    self.endDateFiscalYear(null);
                    break;
                case MODE_SCREEN.ALL:
                case MODE_SCREEN.YEAR_PERIOD_FINANCE:
                    self.standardDate();
                    self.startDateFiscalYear(self.yearValue().startDate+""+ self.getFullMonth(self.firstMonth()) +"01");
                    if( self.firstMonth()!= 1){
                        self.endDateDay (moment((parseInt(self.yearValue().endDate)+1)+"-"+ self.getFullMonth(self.firstMonth() - 1) , "YYYY-MM").daysInMonth());
                        self.endDateFiscalYear(self.yearValue().endDate === "9999" ? "99991231" : (self.convertYearToInt(self.yearValue().endDate)+1)+""+ self.getFullMonth(self.firstMonth() - 1) +""+self.endDateDay());
                    } else {
                        self.endDateFiscalYear(self.convertYearToInt((self.yearValue().endDate)) + "1231");
                    }
                    break;
                case MODE_SCREEN.YEAR_PERIOD:
                    self.standardDate();
                    self.startDateFiscalYear(self.convertYearToInt(self.yearValue().startDate)+"0101");
                    self.endDateFiscalYear(self.convertYearToInt(self.yearValue().endDate)+"1231");
                    break;
            }
               /**
               * share param
               * status,standardDate,startDateFiscalYear,endDateFiscalYear
               */
               let paramsCdl : IPARAMS_CDL = {
                   status : true,
                   mode : self.modeScreen() == MODE_SCREEN.YEAR_PERIOD ? MODE_SCREEN.YEAR_RANGE : self.modeScreen(),
                   standardDate :((self.modeScreen() == MODE_SCREEN.BASE_DATE) || (self.modeScreen() == MODE_SCREEN.ALL)) ? self.convertMonthYearToString(self.standardDate())  : null,
                   startDateFiscalYear : (self.modeScreen() == MODE_SCREEN.BASE_DATE || self.modeScreen() == MODE_SCREEN.YEAR_MONTH) ? null : self.convertMonthYearToString(self.startDateFiscalYear()),
                   endDateFiscalYear : (self.modeScreen() == MODE_SCREEN.BASE_DATE || self.modeScreen() == MODE_SCREEN.YEAR_MONTH) ? null : self.convertMonthYearToString(self.endDateFiscalYear()),
                   standardYearMonth: self.standardYearMonth()
               };

                $("#A2_2 .ntsDatepicker").trigger("validate");
                if (!nts.uk.ui.errors.hasError()) {
                    setShared('CDL028_A_PARAMS', paramsCdl);
                    nts.uk.ui.windows.close();
                    return false;
                }
                 dfd.resolve();
                 return dfd.promise();
        };

        /**
         * cancel
         */
        cancel(){
            let status: boolean = false;
            setShared('CDL028_A_PARAMS', status);
            nts.uk.ui.windows.close();
        };

        convertYearToInt(standardDate: any) {
            let year: string;
            standardDate = standardDate+"";
            year = standardDate.slice(0, 4);
            return parseInt(year);
        }

        getMonthToInt(standardDate: any){
            let month: string;
            standardDate = standardDate+"";
            month = standardDate.slice(4, 6);
            return parseInt(month,10);
        }

        getFullMonth(month: number): string {
            if(month < 10) {
                return "0" + month;
            } else {
                return "" + month;
            }
        }

        convertMonthYearToString(yearMonth: any) {
            let self = this;
            let year: string, month: string, date: string;
            yearMonth = yearMonth.toString();
            year = yearMonth.slice(0, 4);
            month = yearMonth.slice(4, 6);
            date = yearMonth.slice(6,8);
            return year + "/" + month + "/" + date;
        }
    }
    export enum MODE_SCREEN {
        //mode standard date
        BASE_DATE = 1,

        //YEAR PERIOD FINANCE
        YEAR_PERIOD_FINANCE = 2,

        //All
        ALL = 3,

        //YEAR PERIOD
        YEAR_PERIOD = 5,
        
        // YEAR PERIOD MAPPING WITH SERVER
        YEAR_RANGE = 4,

        //Mode YEARMONTH
        YEAR_MONTH = 6
    }
    interface IPARAMS_CDL {
        status: boolean;
        mode: number;
        standardDate: KnockoutObservable<number>;
        startDateFiscalYear: KnockoutObservable<number>;
        endDateFiscalYear: KnockoutObservable<number>;
        standardYearMonth: KnockoutObservable<number>;
    }

    class PARAMS_CDL {
        status: boolean;
        mode: number;
        standardDate: KnockoutObservable<number>;
        startDateFiscalYear: KnockoutObservable<number>;
        endDateFiscalYear: KnockoutObservable<number>;
        standardYearMonth: KnockoutObservable<number>;

        constructor(paramsCdl: IPARAMS_CDL){
            this.status = paramsCdl.status;
            this.mode = paramsCdl.mode;
            this.standardDate = paramsCdl.standardDate;
            this.startDateFiscalYear = paramsCdl.startDateFiscalYear;
            this.endDateFiscalYear = paramsCdl.endDateFiscalYear;
            this.standardYearMonth = paramsCdl.standardYearMonth;
        }
    }



    interface  IStartMonth{
        startMonth: number;
        companyId : string;
    }
    class StartMonth {
        startMonth: number;
        companyId : string;
        constructor(startMonth: IStartMonth) {
            this.startMonth = startMonth.startMonth;
            this.companyId = startMonth.companyId;

        }
    }
}

