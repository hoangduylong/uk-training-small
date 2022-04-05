__viewContext.ready(function () {
    class ScreenModel {
        contextMenu: Array<any>;
        source: KnockoutObservableArray<any>;
        selected: KnockoutObservable<any>;
        constructor(){  
            let self = this;
            
            self.source = ko.observableArray([
                [ {}, {}, {text: "test", tooltip: "test"}, {}],
                [],
                []
                ]);
            self.contextMenu = [
                    {id: "cut", text: "切り取り", action: self.openDialog, style: "icon icon-dot"},
                    {id: "copy", text: "名前を変更", action: self.openDialog, style: "icon icon-dot"},
                    {id: "delete", text: "削除", action: self.remove, style: "icon icon-close"}
                ];
            $("#test2").ntsButtonTable("init", {row: 3, column: 10, source: self.source(), contextMenu: self.contextMenu, disableMenuOnDataNotSet: [1,2], mode: "normal"});
            self.selected = ko.observable({});
            self.selected.subscribe(function(value){  
                console.log(value);
            });
        }
        
        selectFirst(){
            let self = this;
            self.selected({column: 0, row: 0});            
        }
        
        clear(){
            let self = this;
            self.source([]);    
        }
        
        openDialog() {
            let dfd = $.Deferred();
            // Set parent value
            nts.uk.ui.windows.setShared("parentValue", "test");
            nts.uk.ui.windows.setShared("isTransistReturnData", false);
            nts.uk.ui.windows.sub.modal("/view/sample/functionwrap/window/subwindow.xhtml").onClosed(() => {
                // Get child value
                var returnValue = nts.uk.ui.windows.getShared("childValue");
                dfd.resolve({text: returnValue, tooltip: returnValue});
            });
            
            return dfd.promise();
        }
        
        remove() {
            let dfd = $.Deferred();
            
            setTimeout(function(){
                dfd.resolve(undefined);
            }, 10);
            
            return dfd.promise();
        }
    }
    
    this.bind(new ScreenModel());
    
});