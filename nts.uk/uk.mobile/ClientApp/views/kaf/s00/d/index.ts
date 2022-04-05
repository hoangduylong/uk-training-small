import { Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';
import { ScreenMode } from 'views/kaf/s00/b';
import { CmmS45AComponent } from 'views/cmm/s45/a/index';
import { CmmS45CComponent } from 'views/cmm/s45/c/index';

@component({
    name: 'kafs00d',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {},
    constraints: [],
    components: {
        'cmms45a': CmmS45AComponent,
        'cmms45c': CmmS45CComponent
    }
})
export class KafS00DComponent extends Vue {
    @Prop({ default: () => ({}) })
    public params: { 
        // 画面モード
        mode: ScreenMode;
        // 申請ID
        appID: string;
    };

    get ScreenMode() {
        return ScreenMode;
    }

    private goToDetail() {
        const self = this;
        let lstAppID = [self.params.appID];
        self.$modal('cmms45c', { 'listAppMeta': lstAppID, 'currentApp': self.params.appID })
            .then((res: any) => {
                self.$emit('close-modal', res);
                self.$close(res);
            });
    }

    private goToAppLst() {
        const self = this;
        self.$goto('cmms45a');
    }

}
