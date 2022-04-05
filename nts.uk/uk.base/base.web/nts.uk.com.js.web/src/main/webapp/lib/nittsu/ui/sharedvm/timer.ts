module nts.uk.ui.sharedvm {

    export class KibanTimer {
        elapsedSeconds: number;
        formatted: KnockoutObservable<string>;
        targetComponent: string;
        isTimerStart: KnockoutObservable<boolean>;
        oldDated: KnockoutObservable<Date>;
        interval: any;
        timeUnit: number;

        constructor(target: string, timeUnit?: number) {
            var self = this;
            self.elapsedSeconds = 0;
            self.formatted = ko.observable(time.formatSeconds(this.elapsedSeconds, 'hh:mm:ss'));
            self.targetComponent = target;
            self.isTimerStart = ko.observable(false);
            self.oldDated = ko.observable(undefined);
            self.timeUnit = nts.uk.util.isNullOrUndefined(timeUnit) ? 1000 : timeUnit;
            document.getElementById(self.targetComponent).innerHTML = self.formatted(); 
        }
        run(timer) {
            var x = new Date().getTime() - timer.oldDated().getTime();
            x = Math.floor(x/1000);
            timer.elapsedSeconds = x;
            document.getElementById(timer.targetComponent).innerHTML 
                = time.formatSeconds(x, 'hh:mm:ss');
        }
        
        start() {
            var self = this;
            if(!self.isTimerStart()){
                self.oldDated(new Date());
                self.isTimerStart(true); 
                self.interval = setInterval(self.run, self.timeUnit, self);
            }
        }

        end() {
            var self = this;
            if(self.isTimerStart()){
                self.oldDated(undefined);
                self.isTimerStart(false);
                clearInterval(self.interval);    
            }
        }

    }
}
