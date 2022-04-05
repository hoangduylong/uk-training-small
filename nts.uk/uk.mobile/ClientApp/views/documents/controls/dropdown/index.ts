import { Vue } from '@app/provider';
import { component } from '@app/core/component';

@component({
    name: 'documentscontrolsdropdown',
    route: { 
        url: '/controls/dropdown',
        parent: '/documents'
    },
    template: require('./index.vue'),
    resource: require('./resources.json'),
    markdown: {
        vi: require('./content/vi.md'),
        jp: require('./content/jp.md')
    }
})
export class DocumentsControlsDropdownComponent extends Vue {

    public dropdownList: Array<Object> = [{
        code: '1',
        text: 'The First'
    }, {
        code: '2',
        text: 'The Second'
    }, {
        code: '3',
        text: 'The Third'
    }, {
        code: '4',
        text: 'The Fourth'
    }, {
        code: '5',
        text: 'The Fifth'
    }];

    public selectedValue: string = '3';
}