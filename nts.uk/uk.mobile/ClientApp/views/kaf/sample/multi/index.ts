import { _, Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';
import { StepwizardComponent } from '@app/components';
import { KafSampleMultiStep1Component } from 'views/kaf/sample/multi/step1';
import { KafSampleMultiStep2Component } from 'views/kaf/sample/multi/step2';
import { KafS00ShrComponent, AppType, Application, InitParam } from 'views/kaf/s00/shr';

@component({
    name: 'kafsamplemulti',
    route: '/kaf/sample/multi',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {},
    constraints: [],
    components: {
        'step-wizard': StepwizardComponent,
        'kafsamplemultistep1': KafSampleMultiStep1Component,
        'kafsamplemultistep2': KafSampleMultiStep2Component
    }
})
export class KafSampleMultiComponent extends KafS00ShrComponent {
    private numb: number = 1;
    public text1: string = null;
    public text2: string = 'step2';
    public isValidateAll: boolean = true;
    public user: any = null;
    public modeNew: boolean = true;
    public application: Application = null;
    @Prop() 
    public readonly params: InitParam;

    public get step() {
        return `step_${this.numb}`;
    }

    public created() {
        const vm = this;
        if (vm.params) {
            vm.modeNew = false;
            vm.appDispInfoStartupOutput = vm.params.appDispInfoStartupOutput;
        }
        if (vm.modeNew) {
            vm.application = vm.createApplicationInsert(AppType.WORK_CHANGE_APPLICATION);
        } else {
            vm.application = vm.createApplicationUpdate(vm.params.appDispInfoStartupOutput.appDetailScreenInfo);
        }
        vm.$auth.user.then((user: any) => {
            vm.user = user;
        }).then(() => {
            if (vm.modeNew) {
                return vm.loadCommonSetting(AppType.WORK_CHANGE_APPLICATION);
            }
            
            return true;
        }).then((loadData: any) => {
            if (loadData) {
                vm.updateKaf000_A_Params(vm.user);
                vm.updateKaf000_B_Params(vm.modeNew);
                vm.updateKaf000_C_Params(vm.modeNew);
                if (vm.modeNew) {
                    return vm.$http.post('at', API.initAppNew, {});  
                }
                
                return true;
            }
        }).then((result: any) => {
            if (result) {
                if (vm.modeNew) {
                    
                } else {

                }   
            }
        }).catch((error: any) => {
            vm.handleErrorCustom(error).then((result) => {
                if (result) {
                    vm.handleErrorCommon(error);
                }
            });
        }).then(() => vm.$mask('hide'));
    }

    public kaf000BChangeDate(objectDate) {
        const vm = this;
        if (objectDate.startDate) {
            if (vm.modeNew) {
                vm.application.appDate = vm.$dt.date(objectDate.startDate, 'YYYY/MM/DD');
                vm.application.opAppStartDate = vm.$dt.date(objectDate.startDate, 'YYYY/MM/DD');
                vm.application.opAppEndDate = vm.$dt.date(objectDate.endDate, 'YYYY/MM/DD');
                // console.log('changeDateCustom');
            }
        }
    }
    
    public kaf000BChangePrePost(prePostAtr) {
        const vm = this;
        vm.application.prePostAtr = prePostAtr;
    }

    public kaf000CChangeReasonCD(opAppStandardReasonCD) {
        const vm = this;
        vm.application.opAppStandardReasonCD = opAppStandardReasonCD;
    }

    public kaf000CChangeAppReason(opAppReason) {
        const vm = this;
        vm.application.opAppReason = opAppReason;
    }

    public toStep(value: number) {
        const vm = this;
        vm.isValidateAll = vm.customValidate(vm);
        vm.$validate();
        if (!vm.$valid || !vm.isValidateAll) {

            return;
        }
        vm.numb = value;
    }

    public customValidate(viewModel: any) {
        const vm = this;
        let validAllChild = true;
        for (let child of viewModel.$children) {
            let validChild = true;
            if (child.$children) {
                validChild = vm.customValidate(child); 
            }
            child.$validate();
            if (!child.$valid || !validChild) {
                validAllChild = false;
            }
        }

        return validAllChild;
    }

    public register() {
        const vm = this;
        vm.isValidateAll = vm.customValidate(vm);
        vm.$validate();
        if (!vm.$valid || !vm.isValidateAll) {

            return;
        }
        vm.$mask('show');
        vm.$http.post('at', API.checkBeforeRegisterSample, ['Msg_260', 'Msg_261'])
        .then((result: any) => {
            if (result) {
                // xử lý confirmMsg
                return vm.handleConfirmMessage(result.data);
            }
        }).then((result: any) => {
            if (result) {
                // đăng kí 
                return vm.$http.post('at', API.registerSample, ['Msg_15']).then(() => {
                    return vm.$modal.info({ messageId: 'Msg_15'}).then(() => {
                        return true;
                    });	
                });
            }
        }).then((result: any) => {
            if (result) {
                // gửi mail sau khi đăng kí
                // return vm.$ajax('at', API.sendMailAfterRegisterSample);
                return true;
            }
        }).catch((failData) => {
            // xử lý lỗi nghiệp vụ riêng
            vm.handleErrorCustom(failData).then((result: any) => {
                if (result) {
                    // xử lý lỗi nghiệp vụ chung
                    vm.handleErrorCommon(failData);
                }
            });
        }).then(() => {
            vm.$mask('hide');    	
        });
    }
    
    public handleErrorCustom(failData: any): any {
        const vm = this;

        return new Promise((resolve) => {
            if (failData.messageId == 'Msg_26') {
                vm.$modal.error({ messageId: failData.messageId, messageParams: failData.parameterIds })
                .then(() => {
                    vm.$goto('ccg008a');
                });

                return resolve(false);		
            }

            return resolve(true);
        });
    }

    public handleConfirmMessage(listMes: any): any {
        const vm = this;

        return new Promise((resolve) => {
            if (_.isEmpty(listMes)) {
                return resolve(true);
            }
            let msg = listMes[0];
    
            return vm.$modal.confirm({ messageId: msg.msgID, messageParams: msg.paramLst })
            .then((value) => {
                if (value === 'yes') {
                    return vm.handleConfirmMessage(_.drop(listMes)).then((result) => {
                        if (result) {
                            return resolve(true);    
                        }

                        return resolve(false);
                    });
                }
                
                return resolve(false);
            });
        });
    }
}

const API = {
    initAppNew: 'at/request/application/initApp',
    checkBeforeRegisterSample: 'at/request/application/checkBeforeSample',
    registerSample: 'at/request/application/changeDataSample',
    sendMailAfterRegisterSample: ''
};