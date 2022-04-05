import { Vue, _ } from '@app/provider';
import { component } from '@app/core/component';
import { CmmS45CComponent } from 'views/cmm/s45/c/index';
import { CmmS45DComponent } from 'views/cmm/s45/d/index';
import { storage } from '@app/utils';

@component({
    name: 'ccg033a',
    route: '/ccg/033/a',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {},
    constraints: [],
    components: {
        'cmms45c': CmmS45CComponent,
        'cmms45d': CmmS45DComponent
    }
})
export class Ccg033AComponent extends Vue {
    public created() {
        let self = this;
        let appId = self.$route.query.appId;
        let programID = self.$route.query.programID;
        storage.local.removeItem('CMMS45_AppListExtractCondition');
        if (programID == 'cmm045') {
            //CMMS45_申請一覧・承認一覧の「B：承認一覧」へ遷移する
            self.$goto('cmms45b');
        } else if (programID == 'kaf005') {
            let userAtr = self.$route.query.userAtr;
            if (userAtr == '1' || userAtr == '2') {//利用者 = 承認者 || 申請本人&承認者
                //CMMS45_申請一覧・承認一覧の「D：申請内容確認（承認）」へ遷移する
                self.$modal('cmms45d', { 'listAppMeta': [appId], 'currentApp': appId });
            } else {
                //CMMS45_申請一覧・承認一覧の「C：申請内容確認」へ遷移する
                self.$modal('cmms45c', { 'listAppMeta': [appId], 'currentApp': appId });
            }
        }
    }
}