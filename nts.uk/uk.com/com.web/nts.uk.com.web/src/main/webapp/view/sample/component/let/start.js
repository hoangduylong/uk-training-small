__viewContext.ready(function () {
    var viewModel = {
        model: ko.observable({
            id: 1,
            name: 'Root',
            childrens: ko.observableArray([{
                    id: 2,
                    name: 'Child first'
                }, {
                    id: 3,
                    name: 'Child second'
                }])
        })
    };
    __viewContext.bind(viewModel);
});
//# sourceMappingURL=start.js.map