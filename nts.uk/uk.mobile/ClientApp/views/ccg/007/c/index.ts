import { _ } from '@app/provider';
import { component, Prop } from '@app/core/component';
import { NavMenu, SideMenu } from '@app/services';
import { CCG007Login } from '../common/ccg007base';
import { storage } from '@app/utils';

@component({
    route: '/ccg/007/c',
    style: require('./style.scss'),
    template: require('./index.vue'),
    validations: {
        model: {
            currentPassword: {
                required: true
            },
            newPassword: {
                required: true
            },
            newPasswordConfirm: {
                required: true
            }
        }
    },
    name: 'ccg007c'
})
export class Ccg007CComponent extends CCG007Login {
    @Prop({ default: () => ({}) })
    public params!: any;

    public userId: string;
    public changeReason: string;

    public policy: PassWordPolicy = {
        lowestDigits: 0,
        alphabetDigit: 0,
        numberOfDigits: 0,
        symbolCharacters: 0,
        historyCount: 0,
        validPeriod: 0,
        isUse: false,
        complex: []
    };

    public model = {
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
        userName: ''
    };

    public get message() {
        const vm = this,
            params = vm.params;

        return {
            params: [!_.isNil(params.spanDays) && params.spanDays || ''],
            resource: !_.isNil(params.spanDays) && params.changePassReason || params.mesId
        };
    }

    public created() {
        let self = this,
            $post = self.$http.post,
            { companyCode, contractCode, employeeCode } = self.params;

        Promise.all([
            $post(servicePath.getPasswordPolicy + contractCode),
            $post(servicePath.getUserName, { companyCode, contractCode, employeeCode })
        ])
            .then((values: Array<any>) => {
                let policy: PassWordPolicy = values[0].data,
                    user: LoginInfor = values[1].data;

                self.userId = user.userId;
                self.model.userName = user.userName;

                self.policy.isUse = policy.isUse;

                self.policy.lowestDigits = policy.lowestDigits;
                self.policy.alphabetDigit = policy.alphabetDigit;
                self.policy.numberOfDigits = policy.numberOfDigits;
                self.policy.symbolCharacters = policy.symbolCharacters;

                self.policy.historyCount = policy.historyCount;
                self.policy.validPeriod = policy.validityPeriod;

                if (policy.alphabetDigit > 0) {
                    self.policy.complex.push({ rid: 'CCGS07_25', params: [policy.alphabetDigit] });
                }

                if (policy.numberOfDigits > 0) {
                    self.policy.complex.push({ rid: 'CCGS07_26', params: [policy.numberOfDigits] });
                }

                if (policy.symbolCharacters > 0) {
                    self.policy.complex.push({ rid: 'CCGS07_27', params: [policy.symbolCharacters] });
                }
            });
    }

    public mounted() {
        // Hide top & side menu
        NavMenu.visible = false;
        SideMenu.visible = false;
    }

    public destroyed() {
        // Show menu
        NavMenu.visible = true;
        SideMenu.visible = true;
    }

    public changePass() {
        this.$validate();

        if (!this.$valid) {
            return;
        }

        let self = this,
            command: ChangePasswordCommand = new ChangePasswordCommand(self.model.currentPassword,
                self.model.newPassword,
                self.model.newPasswordConfirm,
                self.userId);

        self.$mask('show');

        // submitChangePass
        self.$http.post(servicePath.changePass, command).then((res) => {
            self.login({
                saveInfo: self.params.autoLogin,
                companyCode: self.params.companyCode,
                employeeCode: self.params.employeeCode,
                password: command.newPassword,
                contractCode: self.params.contractCode,
                contractPassword: self.params.contractPassword,
                loginDirect: true
            }, () => {
                self.model.currentPassword = '';
                self.model.newPassword = '';
                self.model.newPasswordConfirm = '';
            });
        }).catch((res) => {
            // Return Dialog Error
            self.$mask('hide');
            self.showMessageError(res);
        });
    }

    public loginOnly() {
        let self = this;

        storage.local.setItem('companyCode', self.params.companyCode);

        if (self.params.saveInfo) {
            storage.local.setItem('employeeCode', self.params.employeeCode);
        }

        self.$goto({ name: 'HomeComponent', params: { screen: 'login' } });
    }

    public showMessageError(res: any) {
        // check error business exception
        if (!res.businessException) {
            return;
        }
        /** TODO: show error message */
        if (_.isArray(res.errors) && !_.isEmpty(res.errors)) {
            // nts.uk.ui.dialog.bundledErrors(res);
            /** TODO: show multi line message */
            this.$modal.error({ messageId: res.errors[0].messageId, messageParams: res.errors[0].parameterIds });
        } else {
            this.$modal.error({ messageId: res.messageId, messageParams: res.parameterIds });
        }
    }
}

const servicePath = {
    getPasswordPolicy: 'ctx/sys/gateway/changepassword/getPasswordPolicy/',
    changePass: 'ctx/sys/gateway/changepassword/submitchangepass/mobile',
    loginWithNoChangePass: 'ctx/sys/gateway/login/submit/mobile/nochangepass',
    getUserName: 'ctx/sys/gateway/changepassword/username/mobile'
};

class ChangePasswordCommand {
    public oldPassword: string;
    public newPassword: string;
    public confirmNewPassword: string;
    public userId: string;

    constructor(oldPassword: string, newPassword: string, confirmNewPassword: string, userId: string) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
        this.confirmNewPassword = confirmNewPassword;
        this.userId = userId;
    }
}

interface LoginInfor {
    loginId: string;
    userName: string;
    userId: string;
    contractCode: string;
}

interface PassWordPolicy {
    notificationPasswordChange?: number;
    loginCheck?: boolean;
    initialPasswordChange?: boolean;
    isUse: boolean;
    historyCount: number;
    lowestDigits: number;
    validPeriod: number;
    validityPeriod?: number;
    numberOfDigits: number;
    symbolCharacters: number;
    alphabetDigit: number;
    complex: { rid: string; params: any[] }[];
}