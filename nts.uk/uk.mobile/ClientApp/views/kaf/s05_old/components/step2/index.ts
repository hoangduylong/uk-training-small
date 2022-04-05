import { _, Vue } from '@app/provider';
import { component, Prop, Watch } from '@app/core/component';
import { Kafs05Model } from '../common/CommonClass';

@component({
    name: 'KafS05_2',
    template: require('./index.html'),
    resource: require('../../resources.json'),
    validations: {
        kafs05ModelStep2: {
            overtimeHours: {
                applicationTime: {
                    loop: true,
                    min: 0,
                    max: 2880,
                    valueType: 'Duration',
                },
            },
            bonusTimes: {
                applicationTime: {
                    loop: true,
                    min: 0,
                    max: 2880,
                    valueType: 'Duration',
                },
            },
            selectedReason: {
                checkNull: {
                    test(value: any) {
                        if (this.kafs05ModelStep2.requiredReason && (this.kafs05ModelStep2.typicalReasonDisplayFlg || this.kafs05ModelStep2.displayAppReasonContentFlg)) {
                            if ((value + this.kafs05ModelStep2.multilContent).length == 0) {
                                return false;
                            }

                            return true;
                        }

                        return true;
                    },
                    messageId: 'Msg_115'
                },
                checkMaxLength: {
                    test(value: any) {
                        let comboBoxReason: string = this.getComboBoxReason(value, this.kafs05ModelStep2.reasonCombo, this.kafs05ModelStep2.typicalReasonDisplayFlg);
                        if (this.kafs05ModelStep2.typicalReasonDisplayFlg || this.kafs05ModelStep2.displayAppReasonContentFlg) {
                            if (this.countHalf(comboBoxReason + '\n' + this.kafs05ModelStep2.multilContent) > 400) {
                                return false;
                            }
                        }

                        return true;
                    },
                    messageId: 'Msg_960'
                }
            },
            multilContent: {
                checkNull: {
                    test(value: any) {
                        if (this.kafs05ModelStep2.requiredReason && (this.kafs05ModelStep2.typicalReasonDisplayFlg || this.kafs05ModelStep2.displayAppReasonContentFlg)) {
                            if ((value + this.kafs05ModelStep2.selectedReason).length == 0) {
                                return false;
                            }

                            return true;
                        }

                        return true;
                    },
                    messageId: 'Msg_115'
                },
                checkMaxLength: {
                    test(value: any) {
                        let comboBoxReason: string = this.getComboBoxReason(this.kafs05ModelStep2.selectedReason, this.kafs05ModelStep2.reasonCombo, this.kafs05ModelStep2.typicalReasonDisplayFlg);
                        if (this.kafs05ModelStep2.typicalReasonDisplayFlg || this.kafs05ModelStep2.displayAppReasonContentFlg) {
                            if (this.countHalf(comboBoxReason + '\n' + value) > 400) {
                                return false;
                            }
                        }

                        return true;
                    },
                    messageId: 'Msg_960'
                }
            },
            selectedReason2: {
                checkMaxLength: {
                    test(value: any) {
                        let comboDivergenceReason = this.getComboBoxReason(value, this.kafs05ModelStep2.reasonCombo2, this.kafs05ModelStep2.displayDivergenceReasonForm);
                        if (this.kafs05ModelStep2.displayDivergenceReasonForm || this.kafs05ModelStep2.displayDivergenceReasonInput) {
                            if (this.countHalf(comboDivergenceReason + '\n' + this.kafs05ModelStep2.multilContent2) > 400) {
                                return false;
                            }
                        }

                        return true;
                    },
                    messageId: 'Msg_960'
                }
            },
            multilContent2: {
                checkMaxLength: {
                    test(value: any) {
                        let comboDivergenceReason = this.getComboBoxReason(this.kafs05ModelStep2.selectedReason2, this.kafs05ModelStep2.reasonCombo2, this.kafs05ModelStep2.displayDivergenceReasonForm);
                        if (this.kafs05ModelStep2.displayDivergenceReasonForm || this.kafs05ModelStep2.displayDivergenceReasonInput) {
                            if (this.countHalf(comboDivergenceReason + '\n' + value) > 400) {
                                return false;
                            }
                        }

                        return true;
                    },
                    messageId: 'Msg_960'
                }
            },
            constraint: 'AppReason'
        },
        hasInputOverTime: {
            test(value: boolean) {
                return value ? '' : 'Msg_1562';
            },
        }

    },
    constraints: ['nts.uk.ctx.at.request.dom.application.AppReason'],
})
export class KafS05aStep2Component extends Vue {
    @Prop()
    public kafs05ModelStep2: Kafs05Model;

    private hasPreAppError: boolean = false;
    private hasActualError: boolean = false;

    @Watch('kafs05ModelStep2.selectedReason')
    public validateSelectedReason() {
        this.$validate('kafs05ModelStep2.multilContent');
        this.$validate('kafs05ModelStep2.selectedReason');
    }

    @Watch('kafs05ModelStep2.multilContent')
    public validateMultilContent() {
        this.$validate('kafs05ModelStep2.multilContent');
        this.$validate('kafs05ModelStep2.selectedReason');
    }

    @Watch('kafs05ModelStep2.selectedReason2')
    public validateSelectedReason2() {
        this.$validate('kafs05ModelStep2.multilContent2');
        this.$validate('kafs05ModelStep2.selectedReason2');
    }

    @Watch('kafs05ModelStep2.multilContent2')
    public validateMultilContent2() {
        this.$validate('kafs05ModelStep2.multilContent2');
        this.$validate('kafs05ModelStep2.selectedReason2');
    }

    get hasInputOverTime() {
        let result = _.find(this.kafs05ModelStep2.overtimeHours, (item) => !_.isNil(item.applicationTime));
        if (!_.isEmpty(result)) {
            return true;
        }

        return false;
    }

    public created() {
        this.kafs05ModelStep2.step1Start = false;
        this.kafs05ModelStep2.overtimeHours.forEach((overtimeHour) => {
            if (overtimeHour.preAppExceedState) {
                this.hasPreAppError = true;
            }
            if (overtimeHour.actualExceedState != 0) {
                this.hasActualError = true;
            }
        });
    }

    public mounted() {
        setTimeout(() => {
            document.scrollingElement.scrollTop = 0;
        }, 0);
    }

    public updated() {
        this.$mask('hide');
    }

    public next() {
        let self = this.kafs05ModelStep2;

        this.$validate();
        if (!this.$valid) {
            document.scrollingElement.scrollTop = 0;

            return;
        }

        this.calculate();
    }

    public calculate() {
        let self = this.kafs05ModelStep2;
        let self2 = this;
        self2.$mask('show', { message: true });
        let param: any = {
            overtimeHours: _.map(self.overtimeHours, (item) => self2.initCalculateData(item)),
            bonusTimes: _.map(self.bonusTimes, (item) => self2.initCalculateData(item)),
            prePostAtr: self.prePostSelected,
            appDate: _.isNil(self.appDate) ? null : self2.$dt(self.appDate),
            siftCD: self.siftCD,
            workTypeCode: self.workTypeCd,
            startTimeRests: _.isEmpty(self.restTime) ? [] : _.map(self.restTime, (x) => x.restTimeInput.start),
            endTimeRests: _.isEmpty(self.restTime) ? [] : _.map(self.restTime, (x) => x.restTimeInput.end),
            startTime: _.isNil(self.workTimeInput.start) ? null : self.workTimeInput.start,
            endTime: _.isNil(self.workTimeInput.end) ? null : self.workTimeInput.end,
            displayCaculationTime: self.displayCaculationTime,
            isFromStepOne: false,
            opAppBefore: self.opAppBefore,
            beforeAppStatus: self.beforeAppStatus,
            actualStatus: self.actualStatus,
            actualLst: self.actualLst,
            overtimeSettingDataDto: self.overtimeSettingDataDto
        };

        let overtimeHoursResult: Array<any>;
        let overtimeHoursbk = self.overtimeHours.slice().concat(self.bonusTimes.slice());

        self2.$http.post('at', servicePath.getCalculationResultMob, param).then((result: { data: any }) => {
            _.remove(self.overtimeHours);
            _.remove(self.bonusTimes);
            self.beforeAppStatus = result.data.beforeAppStatus;
            self.actualStatus = result.data.actualStatus;
            overtimeHoursResult = result.data.resultLst;
            if (overtimeHoursResult != null) {
                for (let i = 0; i < overtimeHoursResult.length; i++) {
                    //残業時間
                    if (overtimeHoursResult[i].attendanceID == 1) {
                        if (overtimeHoursResult[i].frameNo != 11 && overtimeHoursResult[i].frameNo != 12) {
                            self.overtimeHours.push({
                                companyID: '',
                                appID: '',
                                attendanceID: overtimeHoursResult[i].attendanceID,
                                attendanceName: '',
                                frameNo: overtimeHoursResult[i].frameNo,
                                timeItemTypeAtr: 0,
                                frameName: overtimeHoursbk[i].frameName,
                                applicationTime: overtimeHoursResult[i].appTime,
                                preAppTime: overtimeHoursResult[i].preAppTime,
                                caculationTime: overtimeHoursResult[i].actualTime,
                                nameID: '#[KAF005_55]',
                                itemName: 'KAF005_55',
                                color: '',
                                preAppExceedState: overtimeHoursResult[i].preAppError,
                                actualExceedState: overtimeHoursResult[i].actualError,
                            });
                        } else if (overtimeHoursResult[i].frameNo == 11) {
                            self.overtimeHours.push({
                                companyID: '',
                                appID: '',
                                attendanceID: overtimeHoursResult[i].attendanceID,
                                attendanceName: '',
                                frameNo: overtimeHoursResult[i].frameNo,
                                timeItemTypeAtr: 0,
                                frameName: 'KAF005_63',
                                applicationTime: overtimeHoursResult[i].appTime,
                                preAppTime: overtimeHoursResult[i].preAppTime,
                                caculationTime: overtimeHoursResult[i].actualTime,
                                nameID: '#[KAF005_64]',
                                itemName: 'KAF005_55',
                                color: '',
                                preAppExceedState: overtimeHoursResult[i].preAppError,
                                actualExceedState: overtimeHoursResult[i].actualError,
                            });
                        } else if (overtimeHoursResult[i].frameNo == 12) {
                            self.overtimeHours.push({
                                companyID: '',
                                appID: '',
                                attendanceID: overtimeHoursResult[i].attendanceID,
                                attendanceName: '',
                                frameNo: overtimeHoursResult[i].frameNo,
                                timeItemTypeAtr: 0,
                                frameName: 'KAF005_65',
                                applicationTime: overtimeHoursResult[i].appTime,
                                preAppTime: overtimeHoursResult[i].preAppTime,
                                caculationTime: overtimeHoursResult[i].actualTime,
                                nameID: '#[KAF005_66]',
                                itemName: 'KAF005_55',
                                color: '',
                                preAppExceedState: overtimeHoursResult[i].preAppError,
                                actualExceedState: overtimeHoursResult[i].actualError,
                            });
                        }
                    }
                    //加給時間
                    if (overtimeHoursResult[i].attendanceID == 3) {
                        self.bonusTimes.push({
                            companyID: '',
                            appID: '',
                            attendanceID: overtimeHoursResult[i].attendanceID,
                            attendanceName: '',
                            frameNo: overtimeHoursResult[i].frameNo,
                            timeItemTypeAtr: overtimeHoursbk[i].timeItemTypeAtr,
                            frameName: overtimeHoursbk[i].frameName,
                            applicationTime: overtimeHoursResult[i].appTime,
                            preAppTime: overtimeHoursResult[i].preAppTime,
                            caculationTime: null,
                            nameID: '',
                            itemName: '',
                            color: '',
                            preAppExceedState: overtimeHoursResult[i].preAppError,
                            actualExceedState: overtimeHoursResult[i].actualError,
                        });
                    }
                }
            }

            self2.hasPreAppError = false;
            self2.hasActualError = false;
            self2.kafs05ModelStep2.overtimeHours.forEach((overtimeHour) => {
                if (overtimeHour.preAppExceedState) {
                    self2.hasPreAppError = true;
                }
                if (overtimeHour.actualExceedState != 0) {
                    self2.hasActualError = true;
                }
            });
            self2.$mask('hide');
            // 打刻漏れ 超過エラー
            if ((self2.hasActualError && self.performanceExcessAtr == 2)) {
                document.scrollingElement.scrollTop = 0;

                return;
            }

            this.$emit('toStep3', this.kafs05ModelStep2);
        }).catch((res: any) => {
            if (res.messageId == 'Msg_424') {
                self2.$modal.error({ messageId: 'Msg_424', messageParams: [res.parameterIds[0], res.parameterIds[1], res.parameterIds[2]] });
            } else if (res.messageId == 'Msg_1508') {
                self2.$modal.error({ messageId: 'Msg_1508', messageParams: [res.parameterIds[0]] });
            } else if (res.messageId == 'Msg_426') {
                self2.$modal.error({ messageId: 'Msg_426', messageParams: [res.parameterIds[0]] }).then(() => {
                    self2.$goto('ccg007b');
                    self2.$auth.logout();
                });
            } else {
                self2.$modal.error({ messageId: res.messageId }).then(() => {
                    self2.$goto('ccg008a');
                });
            }
        });
    }

    public getComboBoxReason(selectID: string, listID: Array<any>, displaySet: boolean): string {
        if (!displaySet || _.isNil(selectID) || selectID == '') {
            return '';
        }
        let reasonValue = _.find(listID, (o) => o.reasonId == selectID).reasonName;
        if (_.isNil(reasonValue)) {
            return '';
        }

        return reasonValue;
    }

    public countHalf(text: string) {
        let count = 0;
        for (let i = 0; i < text.length; i++) {
            let c = text.charCodeAt(i);

            // 0x20 ～ 0x80: 半角記号と半角英数字
            // 0xff61 ～ 0xff9f: 半角カタカナ
            if ((0x20 <= c && c <= 0x7e) || (0xff61 <= c && c <= 0xff9f)) {
                count += 1;
            } else {
                count += 2;
            }
        }

        return count;
    }

    public initCalculateData(item: any): any {
        return {
            companyID: item.companyID,
            appID: item.appID,
            attendanceID: item.attendanceID,
            attendanceName: item.attendanceName,
            frameNo: item.frameNo,
            timeItemTypeAtr: item.timeItemTypeAtr,
            frameName: item.frameName,
            applicationTime: item.applicationTime,
            preAppTime: null,
            caculationTime: null,
            nameID: item.nameID,
            itemName: item.itemName
        };
    }
}

const servicePath = {
    getCalculationResultMob: 'at/request/application/overtime/getCalculationResultMob',
};