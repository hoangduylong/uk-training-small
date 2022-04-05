# Template code of widget

``` js
@component({
    name: 'widget-name',
    template: `
        <div class="widget-title">
            <!-- title of widget -->
        </div>
        <!-- 200: min-height of widget content -->
        <div data-bind="widget-content: 200">
            <div>
                <!-- content of widget -->
            </div>
        </div>
    `
})
export class ComponentViewModel extends ko.ViewModel {
    // require: need for storage size of widget when resize
    widget: string = 'widget-name';

    constructor(private params: any) {
        super();
        // check parameter prop at here
    }

    created() {
        const vm = this;
        // query data from server at here
    }

    mounted() {
        const vm = this;
        // bussiness logic with dom/element
    }

    destroyed() {
        const vm = this
        // clear memory or unbind global event
    }
}
```

# Use widget at any view

``` xml
<ui:define name="htmlHead">
    <com:scriptfile path="/view/path_to_widget_file.js" />
</ui:define>

<ui:define name="content">
    <div data-bind="widget: 'widget-name'">
</ui:define>
```

# Support for old type widget (iframe)

``` js
@component({
    name: 'ccg-widget-frame',
    template: `<div data-bind="widget-content: 200, src: '/nts.uk.at.web/view/ktg/004/a/index.xhtml'"></div>`
})
export class WidgetFrameComponent extends ko.ViewModel {
    widget: string = 'CCG_WF';
}
```
