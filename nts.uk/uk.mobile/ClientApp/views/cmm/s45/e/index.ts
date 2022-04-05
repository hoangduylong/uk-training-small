import { Vue, _ } from '@app/provider';
import { component, Prop } from '@app/core/component';
import { CmmS45FComponent } from '../f/index';

@component({
    name: 'cmms45e',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {
        reasonRemand: {
            required: true,
            constraint: 'AppReason'
        }
    },
    constraints: ['nts.uk.ctx.at.request.dom.application.AppReason'],
    components: {
        'cmms45f': CmmS45FComponent
    }
})
export class CmmS45EComponent extends Vue {
    public title: string = 'CmmS45E';

    @Prop({ default: () => ({ listAppMeta: [], currentApp: '', version: 0}) })
    public readonly params: { listAppMeta: Array<string>, currentApp: string, version: number };
    public reasonRemand: string = '';//差し戻しコメント
    public selectedValue: string = '1';
    public apprList: Array<{id: string, content: string}> = [{id: '1', content: ''}];//差し戻し先
    public appInfo: any = null;
    
    public created() {
        let self = this;
        self.$http.post('at', servicePath.getAppInfoByAppID, [self.params.currentApp]).then((result: any) => {
            self.appInfo = result.data;
            if (!self.$data) {
                return;
            }
            let lstAppr = [];
            //push　申請者
            lstAppr.push({
                sId: self.appInfo.applicantId,
                atr: 0,
                name: self.appInfo.applicantName,
                phaseOrder: null
            });
            //push 承認者・代行者
            let groupByPhase = _.groupBy(self.appInfo.lstApprover, 'phaseOrder');
            let arrayPhase = [];
            for (let key in groupByPhase) {
                arrayPhase.push(groupByPhase[key]);
            }
            arrayPhase.forEach(function(approverLst) {
                let name: string = '';
                for (let i = 0; i < approverLst.length; i++) {
                    if (result.data.phaseLogin == 0 || approverLst[i].phaseOrder > result.data.phaseLogin) {
                        if (approverLst[i].agentFlag) {
                            name = name.concat(self.$i18n('CMMS45_73', [approverLst[i].approverName]));
                        } else {
                            name = name.concat(approverLst[i].approverName);
                        }
                        if (i != approverLst.length - 1) {
                            name = name.concat('、');
                        }
                    }
                }
                if (approverLst.length > 0 && name != '') {
                    lstAppr.push({ 
                        sId: approverLst[0].approverID,
                        atr: 1,
                        name,
                        phaseOrder: approverLst[0].phaseOrder
                        });
                }
            });
            // self.appInfo.lstApprover.forEach(function(approver: any) {
            //     lstAppr.push({
            //         sId: approver.approverID,
            //         atr: approver.agentFlag ? 2 : 1,
            //         name: approver.approverName,
            //         phaseOrder: approver.phaseOrder
            //     });
            // });
            self.apprList = self.creatContent(lstAppr);
            //起動する時、先頭に選択する
            self.selectedValue = self.appInfo.applicantId;
        });
    }

    //戻る
    private callBack() {
        //「D：申請内容確認（承認）」に戻る
        this.$close();
    }

    //差し戻す
    private remand() {
        let self = this;
        self.$validate();
        if (!self.$valid) {
            return;
        }
        // 確認メッセージ（Msg_384）を表示する
        self.$modal.confirm('Msg_384').then((res) => {
            if (res == 'no') {
                return;
            }
            self.$mask('show');
            let phaseOrder = (_.find(self.appInfo.lstApprover, (c) => c.approverID == self.selectedValue) || {phaseOrder: null}).phaseOrder;
            let remandParam = {
                appID: [self.params.currentApp],
                applicaintName: self.appInfo.applicantName,//申請本人の名前
                order: phaseOrder,//差し戻し先
                remandReason: self.reasonRemand,//差し戻しコメント
                version: self.params.version
            };
            // アルゴリズム「差戻処理」を実行する
            self.$http.post('at', servicePath.remand, remandParam).then((res) => {
                self.$mask('hide');
                console.log('remand');
                // 「F：処理完了」画面に遷移する
                this.$modal('cmms45f', { 'action': 3, 'listAppMeta': self.params.listAppMeta, 'currentApp': self.params.currentApp }).then((result: any) => {
                    self.$close(result);   
                });
            }).catch((res) => {
                self.$modal.error(res.messageId).then(() => {
                    self.$mask('hide');
                });
            });
        });
    }
    //E2_2差し戻し先
    private creatContent(lstAppr: Array<IApproverInfo>) {
        let lstResult = [];
        lstAppr.forEach((appr) => {
            let contentApp = '';
            if (appr.atr == 0) {//申請者
                contentApp = this.$i18n('CMMS45_71') + appr.name;
            }
            if (appr.atr == 1) {//承認者
                contentApp = this.$i18n('CMMS45_72', appr.phaseOrder.toString()) + appr.name;
            }
            lstResult.push({ id: appr.sId, content: contentApp});
        });

        return lstResult;
    }
}

const servicePath = {
    getAppInfoByAppID: 'at/request/application/getAppInfoForRemandByAppId',
    remand: 'at/request/app/smartphone/remandapp'
};

interface IApproverInfo {
    sId: string;//社員Id
    atr: number;//0: 申請者, 1: 承認者, 2: 代行者
    name: string;//ビジネスネーム
    phaseOrder: number;//フェーズ番号
}