module nts.uk.ui.sample.widget {
    type mode = 'a' | 'b' | 'c' | 'd';

    @bean()
    export class ViewModel extends ko.ViewModel {
        kmode: KnockoutObservable<mode> = ko.observable('a');

        changeMode() {
            const vm = this;
            const { kmode } = vm;

            switch (ko.unwrap<mode>(kmode)) {
                case 'a':
                    kmode('b');
                    break;
                case 'b':
                    kmode('c');
                    break;
                case 'c':
                    kmode('d');
                    break;
                case 'd':
                    kmode('a');
                    break;
            }
        }
    }

    @component({
        name: 'ccg-widget-1',
        template: `
        <div class="widget-title">
            <table>
                <colgroup>
                    <col width="auto" />
                    <col width="auto" />
                    <col width="41px" />
                </colgroup>
                <thead>
                    <tr>
                        <th colspan="2" data-bind="i18n: 'COMPONENT_TITLE'"></th>
                        <th>
                            <button class="icon" data-bind="
                                    click : function() {},
                                    timeClick: -1,
                                    visible: true
                                ">
                                <i data-bind="ntsIcon: { no: 5 }"></i>
                            </button>
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
        <div data-bind="widget-content: 200">
            <div>
                <table>
                    <colgroup>
                        <col width="auto" />
                        <col width="auto" />
                        <col width="41px" />
                    </colgroup>
                    <tbody data-bind="foreach: [1,2,3,4,5,6,7,8,9,0]">
                        <tr>
                            <td data-bind="i18n: 'OPTION_NAME'"></td>
                            <td>
                                <button class="icon" data-bind="
                                        click: function() {},
                                        visible: true
                                    ">
                                    <i data-bind="ntsIcon: { no: 145 }"></i>
                                </button>
                            </td>
                            <td data-bind="i18n: 'COUNT'"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>`
    })
    export class WidgetComponent extends ko.ViewModel {
        widget: string = 'CCG023A';

        constructor(private params: any) {
            super();
        }

        created() {

        }

        mounted() {

        }

        destroyed() {

        }
    }

    @component({
        name: 'ccg-widget-frame',
        template: `<div data-bind="widget-content: 200, src: '/nts.uk.at.web/view/ktg/004/a/index.xhtml'"></div>`
    })
    export class WidgetFrameComponent extends ko.ViewModel {
        widget: string = 'CCG_WF';

        constructor(private params: any) {
            super();
        }

        created() {

        }

        mounted() {

        }

        destroyed() {

        }
    }

}