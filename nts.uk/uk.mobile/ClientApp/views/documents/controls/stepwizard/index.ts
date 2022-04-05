import { Vue } from '@app/provider';
import { component } from '@app/core/component';
import { StepwizardComponent } from '@app/components';

@component({
    name: 'documentscontrolsstepwizard',
    route: {
        url: '/controls/stepwizard',
        parent: '/documents'
    },
    template: require('./index.vue'),
    resource: require('./resources.json'),
    markdown: {
        vi: require('./content/vi.md'),
        jp: require('./content/jp.md')
    },
    components: {
        'step-wizard': StepwizardComponent
    }
})
export class DocumentsHtmlsStepwizardComponent extends Vue {
    public get step() {
        return `step_${this.numb + 1}`;
    }

    private numb: number = 0;

    public prevStep() {
        this.numb = Math.abs(this.numb - 1 + 4) % 4;
    }

    public nextStep() {
        this.numb = Math.abs(this.numb + 1) % 4;
    }
}