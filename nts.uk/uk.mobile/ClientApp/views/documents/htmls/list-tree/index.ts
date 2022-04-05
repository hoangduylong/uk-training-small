import { obj, date } from '@app/utils';
import { _, Vue } from '@app/provider';
import { component } from '@app/core/component';

@component({
    name: 'documentshtmlslist-tree',
    route: {
        url: '/htmls/list-tree',
        parent: '/documents'
    },
    template: require('./index.vue'),
    resource: require('./resources.json'),
    markdown: {
        vi: require('./content/vi.md'),
        jp: require('./content/jp.md')
    }
})
export class DocumentsHtmlsListTreeComponent extends Vue {
    public single: boolean = true;
    public selected: any = {};
    public selecteds: any[] = [];

    public items: Array<any> = [];

    get flatten() {
        return obj.hierarchy(this.items, 'childs');
    }

    public addTopItem() {
        this.items.unshift({
            workplaceId: Math.random() * 100,
            code: Math.random() * 100,
            name: 'Add new item',
            childs: [{
                workplaceId: 7,
                code: Math.random() * 100,
                name: 'Sub Folder 1.2.1'
            }, {
                workplaceId: 8,
                code: Math.random() * 100,
                name: 'Sub Folder 1.2.2'
            }]
        });
    }

    public addBottomItem() {
        this.items.push({
            workplaceId: Math.random() * 100,
            code: Math.random() * 100,
            name: 'Add new item',
            childs: [{
                workplaceId: 7,
                code: Math.random() * 100,
                name: 'Sub Folder 1.2.1'
            }, {
                workplaceId: 8,
                code: Math.random() * 100,
                name: 'Sub Folder 1.2.2'
            }]
        });
    }

    public removeTopItem() {
        this.items.shift();
    }

    public removeBottomItem() {
        this.items.pop();
    }

    public created() {
        let items = require('./mock-data.json');

        this.items = _.chain(items)
            // sắp xếp đối tượng theo mã quan hệ
            .orderBy((item) => item.hierarchyCode, 'asc')
            // Lọc những đối tượng con
            .map((item) => {
                const childs = items.filter((f) => {
                    // không phải là chính đối tương
                    const notself = f.hierarchyCode !== item.hierarchyCode;
                    // là những đối tượng con của đối tượng
                    const ischilds = f.hierarchyCode.startsWith(item.hierarchyCode);

                    return notself && ischilds;
                })
                    // dựng bản đồ quan hệ con - cha
                    .map((child) => _.extend(child, { parent: item }));

                // dựng bản đồ quan hệ cha - con
                return _.extend(item, { childs });
            })
            // lọc những đối tượng con không hợp lệ (cháu, chắt)
            .map((item) => {
                item.childs = item.childs.filter((child) => child.parent.hierarchyCode == item.hierarchyCode);

                return item;
            })
            // Lọc những đối tượng không có cha (là những đối tượng root)
            .filter((item) => !item.parent)
            // sắp xếp lại các đối tượng
            // .orderBy((item) => item.code, 'asc')
            .value();
    }
}