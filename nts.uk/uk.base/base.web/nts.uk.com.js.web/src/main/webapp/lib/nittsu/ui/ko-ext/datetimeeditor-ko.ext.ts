/// <reference path="../../reference.ts"/>

module nts.uk.ui.koExtentions {

    /**
     * Dialog binding handler
     */
    class NtsDateTimePairEditorBindingHandler implements KnockoutBindingHandler {

        /**
         * Init. 
         */
        init(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext) {
            let data = valueAccessor(),
                $element = $(element);
            let editable = nts.uk.util.isNullOrUndefined(data.editable) ? false : ko.unwrap(data.editable);
                        
            let construct: EditorConstructSite = new EditorConstructSite($element);
            
            construct.build(data, allBindingsAccessor, viewModel, bindingContext);
            
            $element.data("construct", construct);
            
            return { 'controlsDescendantBindings': true };
        }

        /**
         * Update
         */
        update(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
            let data = valueAccessor(),
                $element = $(element),
                timeData = $element.data('timeData'),
                dateData = $element.data('dateData'),
                construct: EditorConstructSite = $element.data("construct");
            ko.bindingHandlers["ntsDatePicker"].update(construct.$date[0], function() {
                return construct.createDateData(data);
            }, allBindingsAccessor, viewModel, bindingContext);
            ko.bindingHandlers["ntsTimeEditor"].update(construct.$time[0], function() {
                return construct.createTimeData(data);
            }, allBindingsAccessor, viewModel, bindingContext);
    
        }
    }
    
    class EditorConstructSite {
        $root: JQuery;
        dateValue: KnockoutObservable<string>;
        timeValue: KnockoutObservable<string>;
        dateValueBind: KnockoutComputed<string>;
        timeValueBind: KnockoutComputed<string>;
        dateFormat: string = "YYYY/MM/DD";
        timeFormat: string = "H:mm:ss";
        timeMode: string = "time";
        timeSignal: string = ":";
        dateSignal: string = "/";
        $date: JQuery;
        $time: JQuery;
        
        constructor($root: JQuery) {
            this.$root = $root;
        }
        
        build(allBindData, allBindingsAccessor, viewModel, bindingContext){
            let self = this;
            
            self.initVal(allBindData);
            
            let $container = $("<div>", { "class": "datetime-editor datetimepair-container ntsControl control-container" }),
                                $dateContainer = $("<div>", { "class": "date-container component-container" }),
                                $timeContainer = $("<div>", { "class": "time-container component-container" });
            self.$date = $("<div>", { "class": "date-picker datetimepair-component" });
            self.$time = $("<input>", { "class": "time-editor datetimepair-component" });  
            $dateContainer.append(self.$date);
            $timeContainer.append(self.$time);
            $container.append($dateContainer);
            $container.append($timeContainer);
            self.$root.append($container);
            
            ko.bindingHandlers["ntsDatePicker"].init(self.$date[0], function() {
                return self.createDateData(allBindData);
            }, allBindingsAccessor, viewModel, bindingContext);
            ko.bindingHandlers["ntsTimeEditor"].init(self.$time[0], function() {
                return self.createTimeData(allBindData);
            }, allBindingsAccessor, viewModel, bindingContext);  
        }
        
        initVal(allBindData){
            let self = this;
            self.timeValueBind = ko.observable();
            self.dateValueBind = ko.observable();
            self.timeValue = ko.computed({
                read: function() {
                    let value = allBindData.value();
                    if(nts.uk.util.isNullOrEmpty(value) || !self.isExistTime(value)){
                        self.timeValueBind("");
                        return "";
                    }
                    let format = self.getFormat(value);
                    if(nts.uk.util.isNullOrEmpty(format)){
                        self.timeValueBind("");
                        return "";
                    }
                    if(format.indexOf("Y") < 0){
                        let v = value.split(" ");
                        value = _.size(v) == 2 ? v[1] : v[0];
                    }
                    let timeVal = nts.uk.time.secondsBased.duration.parseString(
                                            moment(value, format).format(self.timeFormat)).toValue();
                    self.timeValueBind(timeVal);
                    return timeVal;
                }, write: function(val) {
                    let dateVal = self.dateValueBind();
                    let timeVal = nts.uk.time.secondsBased.duration.create(val)
                                        .formatById(nts.uk.time.secondsBased.duration.DurationFormatId);
                    allBindData.value(dateVal + " " + timeVal);
                },
                owner: this  
            });
            self.dateValue = ko.computed({
                read: function() {
                    let value = allBindData.value();
                    if(nts.uk.util.isNullOrEmpty(value) || !self.isExistDate(value)){
                        self.dateValueBind("");
                        return "";
                    }
                    let format = self.getFormat(value);
                    if(nts.uk.util.isNullOrEmpty(format)){
                        self.timeValueBind("");
                        return "";
                    }
                    
                    let val = moment(value, format).format(self.dateFormat);
                    self.dateValueBind(val);
                    return val;
                }, write: function(val) {
                    let tv = self.timeValueBind();
                    let timeVal = nts.uk.time.secondsBased.duration.create(tv)
                                        .formatById(nts.uk.time.secondsBased.duration.DurationFormatId);
                    if(_.isNil(val)){
                        val = "";
                    }
                    allBindData.value(val + " " + timeVal);
                },
                owner: this  
            });  
            self.timeValueBind.subscribe((v) => {
                self.timeValue(v);    
            });
            self.dateValueBind.subscribe((v) => {
                self.dateValue(v);    
            });     
        }
        
        getFormat(val: string){
            let self = this;
            let format = "";
            if(self.isExistDate(val)){
                format += self.dateFormat + " ";
            }
            if(self.isExistTime(val)){
                format += self.timeFormat;
            }
            return format;
        }
        
        isExistDate(val: string): boolean{
            let self = this;
            return val.toString().indexOf(self.dateSignal) > 0;
        }
        
        isExistTime(val: string): boolean{
            let self = this;
            return val.toString().indexOf(self.timeSignal) > 0;
        }
        
        createDateData(allBindData: any): any{
            let self = this;
            return { required: allBindData.required, 
                     name: allBindData.name, 
                     value: self.dateValueBind, 
                     dateFormat: self.dateFormat, 
                     valueFormat: self.dateFormat, 
                     enable: allBindData.enable, 
                     disabled: allBindData.disabled, 
                     startDate: allBindData.startDate, 
                     endDate: allBindData.endDate };    
        }
        
        createTimeData(allBindData: any): any{
            let self = this;
            return { required: allBindData.required, 
                     name: allBindData.name, 
                     value: self.timeValueBind, 
                     inputFormat: self.timeFormat, 
                     mode: self.timeMode, 
                     enable: allBindData.enable, 
                     disabled: allBindData.disabled,
                     option: { width: "70" },
                     constraint: 'TimeClockWithSeconds' };    
        }
    }


    ko.bindingHandlers['ntsDateTimePairEditor'] = new NtsDateTimePairEditorBindingHandler();
}
