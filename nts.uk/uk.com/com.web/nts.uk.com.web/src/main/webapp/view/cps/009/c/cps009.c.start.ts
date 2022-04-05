module nts.uk.com.view.cps009.c {
    __viewContext.ready(function() {
        __viewContext["viewModel"] = new viewmodel.ViewModel();
        __viewContext.bind(__viewContext["viewModel"]);
        $("#codeInput").focus();
        
        $(document).ready(function() {
            let beforeIndex = 1;
            $(window).keyup((e) => {
                if (e.which === 9) {
                    let tabindex = e.target.attributes.tabindex ? e.target.attributes.getNamedItem("tabindex").value : e.target.attributes.getNamedItem("tab-index").value;
                    if (beforeIndex == 5) {
                        $("#codeInput").focus();
                    }
                    beforeIndex = parseInt(tabindex);
                }
            });
            
            $("#copyCheck").on('click', function(evt){
                 $("#copyCheck").focus();
                    
            })
        });
    });
}