var ccg013;
(function (ccg013) {
    var a;
    (function (a) {
        __viewContext.ready(function () {
            var screenModel = new a.viewmodel.ScreenModel();
            screenModel.startPage().done(function () {
                __viewContext.bind(screenModel);
            });
        });
    })(a = ccg013.a || (ccg013.a = {}));
})(ccg013 || (ccg013 = {}));
// 
//$(window).on('resize', function() {
//    let container = $('#menu_container'),
//        parent = container.parent('div');
//    container
//        .css('max-width', parent.width() + 'px')
//        .css('min-height', (window.innerHeight - 240) + 'px')
//        .css('max-height', (window.innerHeight - 240) + 'px');
//    $('.ui-tabs-panel')
//        .css('min-width', (parent.width() - 20) + 'px')
//        .css('min-height', (window.innerHeight - 300) + 'px');
//});
//# sourceMappingURL=ccg013.a.start.js.map