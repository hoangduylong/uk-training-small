import { DirectiveBinding, Vue } from '@app/provider';
import { component,Prop } from '@app/core/component';
import * as _ from 'lodash';
import * as moment from 'moment';

@component({
    name: 'cmms45componentsapp3',
    template: require('./index.vue'),
    style: require('./style.scss'),
    validations: {},
    directives: {
        'date': {
            bind(el: HTMLElement, binding: DirectiveBinding) {
                const mm = moment(binding.value, 'YYYY/MM/DD');
                el.innerHTML = mm.format('MM/DD(ddd)');
                el.className = mm.clone().locale('en').format('dddd').toLocaleLowerCase();
            }
        }
    },
    constraints: []
})
export class CmmS45ComponentsApp3Component extends Vue {
    public title: string = 'CmmS45ComponentsApp3';
    //public mtable = require('../../../../../kaf/s08/a2/mock_data.json');

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

    public dataFetch: any;
    public isCondition1: boolean = false;
    public isCondition2: boolean = false;
    public businessTrip: any = new BusinessTrip();
    public table: [] = [] ;
    public time: {} = {} ;


    public $app() {
        return this.businessTrip;
    }

    public user: any;
    public created() {
        const vm = this;
        vm.params.appDetail = {};
        vm.$auth.user.then((usr: any) => {
            vm.user = usr;
        }).then((res: any) => {
            this.fetchData(vm.params);
        });
        vm.$watch('params.appDispInfoStartupOutput', (newV, oldV) => {
            vm.$emit('loading-complete');
        });
    }

    public mounted() {

    }

    public fetchData(getParams: any) {
        const vm = this;
        vm.$http.post('at', API.startDetailBScreen, {
            companyId: vm.user.companyId,
            appId: vm.params.appDispInfoStartupOutput.appDetailScreenInfo.application.appID,
            appDispInfoStartup: vm.params.appDispInfoStartupOutput
        })
            .then((res: any) => {
                vm.time = res.data.businessTripDto;
                vm.table = res.data.businessTripDto.tripInfos.map((item: any) => {
                    const workTime = res.data.businessTripInfoOutputDto.appDispInfoStartup.appDispInfoWithDateOutput.opWorkTimeLst.find((i: any) => i.worktimeCode == item.wkTimeCd);
                    const workType = res.data.businessTripInfoOutputDto.infoBeforeChange.find((i: any) => i.date == item.date).workTypeDto;
                    
                    return {
                        date: item.date,
                        wkTypeCd: item.wkTypeCd,
                        wkTimeCd: item.wkTimeCd,
                        startWorkTime: item.startWorkTime,
                        endWorkTime: item.endWorkTime,
                        workTypeName: workType.name,
                        workTimeName: workTime ? workTime.workTimeDisplayName.workTimeName : null
                    };
                });
                vm.params.appDetail = res.data;
                vm.$emit('loading-complete');
                //vm.dataFetch = res.data.
                //vm.bindStart();
                //vm.params.appDetail = vm.dataFetch;
                // self.bindCodition(self.dataFetch.appWorkChangeDispInfo);
            })
            .catch((res: any) => {
                vm.$emit('loading-complete');
                if (res.messageId) {
                    vm.$modal.error({ messageId: res.messageId, messageParams: res.parameterIds });
                } else {

                    if (_.isArray(res.errors)) {
                        vm.$modal.error({ messageId: res.errors[0].messageId, messageParams: res.parameterIds });
                    } else {
                        vm.$modal.error({ messageId: res.errors.messageId, messageParams: res.parameterIds });
                    }
                }
            });
    }
}

class BusinessTrip {
    constructor() {

    }
    public departureTime: number;
    public returnTime: number;
    public date: String;
    public wkTypeCd: String;
    public wkTimeCd: String;
    public startWorkTime: number;
    public endWorkTime: number;
}

const API = {
    startDetailBScreen : 'at/request/application/businesstrip/mobile/startScreenB'
};