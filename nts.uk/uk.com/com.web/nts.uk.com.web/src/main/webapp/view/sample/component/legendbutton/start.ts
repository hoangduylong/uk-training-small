__viewContext.ready(function () {
    class ScreenModel {
        
        legendOptions: any;
        
        legendWithTemplateOptions: any;
        
        constructor() {
            var self = this;
            
            this.legendOptions = {
                items: [
                    { cssClass: { className: 'bg-red', colorPropertyName: 'background-color' }, labelText: 'RED' },
                    { cssClass: { className: 'bg-green', colorPropertyName: 'background-color' }, labelText: 'GREEN' },
                    { cssClass: { className: 'bg-blue', colorPropertyName: 'background-color' }, symbolText: '○', labelText: 'BLUE' }
                ]
            };
            this.legendWithTemplateOptions = {
                items: [
                    { colorCode: '#ff0000', labelText: 'RED' },
                    { colorCode: '#00AA00', labelText: 'GREEN' },
                    { colorCode: '#0000FF', labelText: 'BLUE' }
                ],
                template : '<div style="color: #{colorCode}; "> #{labelText} </div>'
            };
            
        }
    }
    
    this.bind(new ScreenModel());
    
});