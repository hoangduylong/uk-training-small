import { Vue } from '@app/provider';
import { component } from '@app/core/component';

@component({
    name: 'documentsdirectivesfxtable',
    route: {
        url: '/directives/fxtable',
        parent: '/documents'
    },
    template: require('./index.vue'),
    resource: require('./resources.json'),
    markdown: {
        vi: require('./content/vi.md'),
        jp: require('./content/jp.md')
    }
})
export class DocumentsDirectivesFxtableComponent extends Vue {

    public hide: number = -1;
    public fixed: {
        [key: string]: any;
    } = {
            displayRow: 5,
            fixedColumn: 1,
            columns: [30, 40, 200, 100, 50]
        };

    public items: any[] = [];

    public created() {
        for (let i = 1; i <= 20; i++) {
            this.items.push({
                id: i,
                name: `Nguyen Van ${i}`,
                address: `Ha Noi ${i}`
            });
        }
    }

    public insertItem() {
        this.items.push({
            id: this.items.length + 1,
            name: 'Nguyen Van A',
            address: 'Ha Noi'
        });
    }

    public hideRow() {
        this.hide = 7;
    }

    public changeBindValue() {
        // tslint:disable-next-line: no-string-literal
        let fixed = this.toJS(this.fixed);
        fixed.fixedColumn = 1;

        Vue.set(this, 'fixed', fixed);
    }

    public removeItem(item: any) {
        this.items.splice(this.items.indexOf(item), 1);
    }
}