import { Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';
import * as _ from 'lodash';

@component({
    name: 'cdls03a',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {},
    constraints: []
})
export class CdlS03AComponent extends Vue {
    @Prop({
        default: () => ({
            isShowNoSelectRow: false,
            selectedCode: null
        })
    })
    public readonly params!: IParameter;
    public title: string = 'CdlS03A';
    public allData: Array<any> = [];
    public data: Array<any> = [];
    public activeNoSelect: boolean = true;
    public searchText: string = '';

    public created() {
        let self = this;
        self.$http.post('com', servicePath.findAllClassification).then((result: any) => {
            if (_.isEmpty(result.data)) {
                this.$modal.error({ messageId: 'Msg_1566', messageParams: ['Com_Class'] }).then(() => self.$close());
            } else {
                if (self.params.isShowNoSelectRow) {
                    result.data.push({
                        code: '',
                        name: ''
                    });
                }               
                self.allData = _.sortBy(result.data,['code']);
                self.data = self.allData;

                if (!_.isEmpty(self.params.selectedCode) || _.find(self.allData, (item) => item.code == self.params.selectedCode) != undefined) {
                    self.activeNoSelect = false;
                } else {
                    self.activeNoSelect = true;
                }
            }     
            self.$mask('hide');         
        }).catch((res: any) => {
            this.$modal.error(res.messageId).then(() => self.$close());
        });
        
    }

    public mounted() {
        this.$mask('show', { message: true });
    }

    public searchList() {
        this.data = _.filter(this.allData, (item) => item.code.indexOf(this.searchText) != -1 || item.name.indexOf(this.searchText) != -1 );
    }
}

interface IParameter {
    isShowNoSelectRow: boolean;
    selectedCode: string;
}
const servicePath = {
    findAllClassification: 'bs/employee/classification/findAll'
};