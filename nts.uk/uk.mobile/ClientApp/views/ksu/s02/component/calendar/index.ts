import { component, Prop, Watch } from '@app/core/component';
import { _, Vue, moment } from '@app/provider';
import * as $ from 'jquery';


import { CalendarAComponent } from 'views/ksu/s02/component/a';

import { CalendarBComponent } from 'views/ksu/s02/component/b';

@component({
    // name: 'calendarksus02',
    template: require('./index.vue'),
    constraints: [],
    components: {
        'calendarb': CalendarBComponent,
        'calendara': CalendarAComponent
    }
})
export class CalendarComponent extends Vue {

    @Prop({
        default: () => ({
            datas: null
        })
    })
    public params!: { datas: any, checkRegister: boolean };
    public clnLst = [];
    public mode = null;
    public dataFromParent = { data: this.params.datas,checkRegister:this.params.checkRegister };


    @Watch('params.datas')
    public changeYearMonth(datas: any) {
        let vm = this;
        if (datas.data != null && vm.mode == null) {
            vm.mode = datas.data.specifyWorkPre;
        }
        this.dataFromParent = { data: datas.data,checkRegister:datas.checkRegister };

    }

    public created() {
        let vm = this;
        if (vm.dataFromParent.data != null) {
            vm.mode = vm.dataFromParent.data.specifyWorkPre;
        }

    }

    public mounted() {
    }

    public dataFromChild(dataFromChild) {
        this.$emit('dataFromComponent', dataFromChild);
        let d = dataFromChild;
        let i = 0;

    }
    public dataChange(dataFromChild) {
        this.$emit('dataChangeMonth', dataFromChild);
        let d = dataFromChild;
        let i = 0;

    }



}







