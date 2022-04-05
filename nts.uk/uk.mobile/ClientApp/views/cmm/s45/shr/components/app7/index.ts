import { Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';
import { CmmS45ShrComponentsApp70Component} from '../app7/app70';
import { CmmS45ShrComponentsApp71Component} from '../app7/app71';

@component({
    name: 'cmms45shrcomponentsapp7',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {},
    constraints: [],
    components: {
        'app70': CmmS45ShrComponentsApp70Component,
        'app71': CmmS45ShrComponentsApp71Component
    }
})
export class CmmS45ShrComponentsApp7Component extends Vue {
    public title: string = 'CmmS45ShrComponentsApp7';

    @Prop({
        default: () => ({
            appDispInfoStartupOutput: null,
            appDetail: null
        })

    })
    public readonly params: {
        appDispInfoStartupOutput: any,
        appDetail: any
    };
}