import { $ } from '@app/utils';
import { _, Vue } from '@app/provider';
import { component } from '@app/core/component';

@component({
    name: 'documentspluginsvalidation',
    route: {
        url: '/plugins/validation',
        parent: '/documents'
    },
    template: require('./index.vue'),
    resource: require('./resources.json'),
    markdown: {
        vi: require('./content/vi.md'),
        jp: require('./content/jp.md')
    },
    validations: {
        textValue: {
            required: true
        },
        numberValue: {
            required: true
        },
        items: {
            name: {
                loop: true,
                required: true,
                constraint: 'SampleStringKana'
            },
            age: {
                loop: true,
                required: true
            }
        }
    },
    constraints: [
        'nts.uk.shr.sample.primitive.strings.SampleStringAny',
        'nts.uk.shr.sample.primitive.strings.SampleStringKana'
    ]
})
export class DocumentsPluginsValidationComponent extends Vue {

    public textValue: string = 'nittsu';
    public numberValue: number = 1;

    public items: Array<{ name: string; age: number; }> = [{
        name: 'a',
        age: 100
    }, {
        name: 'b',
        age: 100
    }, {
        name: 'c',
        age: 100
    }, {
        name: 'd',
        age: 100
    }, {
        name: 'e',
        age: 100
    }];

    public created() {
        Object.assign(window, { _, vm: this });
    }
}