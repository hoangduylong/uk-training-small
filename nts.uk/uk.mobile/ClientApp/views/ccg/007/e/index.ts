import { Vue, _ } from '@app/provider';
import { component } from '@app/core/component';
import { SideMenu, NavMenu } from '@app/services';

@component({
    route: '/ccg/007/e',
    style: require('./style.scss'),
    template: require('./index.vue'),
    validations: {
        model: {
            newPassword: {
                required: true
            },
            newPasswordConfirm: {
                required: true
            }
        }
    },
    name: 'ccg007e'
})
export class Ccg007eComponent extends Vue {
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
        newPassword: '',
        newPasswordConfirm: '',
        userName: '',
        contractCode: '',
        loginId: '',
        userId: ''
    };

    public created() {
        let self = this,
            $route = self.$route;

        self.$http.post(servicePath.getUserName + $route.query.id)
            .then((res: { data: LoginInfor }) => {
                let user: LoginInfor = res.data;

                self.model.userName = user.userName;
                self.model.contractCode = user.contractCode;
                self.model.loginId = user.loginId;
                self.model.userId = user.userId;

                return user;
            }).then((user) => {
                return self.$http.post(servicePath.getPasswordPolicy + self.model.contractCode);
            }).then((res: { data: PassWordPolicy }) => {
                let policy = res.data;

                self.policy = _.extend(policy, {
                    complex: [],
                    validPeriod: policy.validityPeriod
                });

                if (policy.alphabetDigit > 0) {
                    self.policy.complex.push({
                        rid: 'CCGS07_25',
                        params: [self.policy.alphabetDigit]
                    });
                }

                if (policy.numberOfDigits > 0) {
                    self.policy.complex.push({
                        rid: 'CCGS07_26',
                        params: [self.policy.numberOfDigits]
                    });
                }

                if (policy.symbolCharacters > 0) {
                    self.policy.complex.push({
                        rid: 'CCGS07_27',
                        params: [self.policy.symbolCharacters]
                    });
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
            $route = self.$route,
            command: ResetPasswordCommand = {
                embeddedId: $route.query.id as string,
                newPassword: self.model.newPassword,
                confirmNewPassword: self.model.newPasswordConfirm,
                userId: self.model.userId
            };

        self.$mask('show');

        // submitChangePass
        self.$http.post(servicePath.changePass, command).then(() => {
            return {
                loginId: _.padEnd(self.model.loginId, 12, ' '),
                password: self.model.newPassword,
                contractCode: self.model.contractCode,
                contractPassword: null
            };
        }).then((loginData) => self.$http.post(servicePath.submitLogin, loginData))
            .then((messError: any) => {
                // Remove LoginInfo
                self.$goto.home({ screen: 'login' });
            }).catch((res) => {
                // Return Dialog Error
                self.$mask('hide');
                self.showMessageError(res);
            });
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
    changePass: 'ctx/sys/gateway/changepassword/submitforgotpass',
    getUserName: 'ctx/sys/gateway/changepassword/getUserNameByURL/',
    submitLogin: 'ctx/sys/gateway/login/submit/form1'
};

interface LoginData {
    loginId: string;
    password: string;
    contractCode: string;
    contractPassword: string;
}

interface ResetPasswordCommand {
    embeddedId: string;
    newPassword: string;
    confirmNewPassword: string;
    userId: string;
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
    validityPeriod?: number;
    numberOfDigits: number;
    symbolCharacters: number;
    alphabetDigit: number;
    validPeriod?: number;
    complex: { rid: string; params: any[] }[];
}